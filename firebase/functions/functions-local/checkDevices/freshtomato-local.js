// Checks and updates automatically

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const freshtomatoRef = db.collection("freshtomato-main-list");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const indicesRef = db.collection("indices");
const deviceArray = [];


// exports.checkAndUpdateFreshtomato = async function() {
async function checkAndUpdateFreshtomato() {
	let isModified = false;
	let lastModified = '';
	let modString = '';
	let dbDeviceList = [];
	let dbAllRoutersList = [];

	await indicesRef.doc("freshtomato-index").get()
	.then(doc => {
		if (doc.data()) {
			modString = doc.data().modString;
			dbDeviceList = doc.data().fullNameIndex;
		}
	}).catch(error => {
		console.log(error);
		return false;
	});

	
	return axios.get("https://wiki.freshtomato.org/doku.php?id=hardware_compatibility")
	.then(async res => {
		lastModified = $(".docInfo", res.data).text();

		if (lastModified != modString) {

			////////////////////await createFreshtomatoList();////////////////////
			//////////////////////////////////////////////////////////////////////

			$("td", "table", res.data).each((i, element) => {

				//13 is the number of columns
				switch(i % 13) {
					case 0:
						deviceArray[i / 13] = { "fullName": $(element).text().trim().replace(/\//g, "&").replace('(', '').replace(')', '')};
						let nameArray = $(element).text().trim().split(" ");
						if (!nameArray[2]) {
							nameArray[2] = '';
						}
						deviceArray[Math.trunc(i / 13)].company = nameArray[0];
						deviceArray[Math.trunc(i / 13)].model = (nameArray[1] + " " + nameArray[2]).trim();
						break;
					case 1:
						deviceArray[Math.trunc(i / 13)].version = $(element).text().trim().split('/').join('&').replace(/\./gm, "_");
						break;
					case 4:
						deviceArray[Math.trunc(i / 13)].LAN = $(element).text().trim();
						break;
					case 5:
						deviceArray[Math.trunc(i / 13)].USB = Number($(element).text().trim()) > 0 ? true : false;
						break;
					case 6:
						deviceArray[Math.trunc(i / 13)].USB = Number($(element).text().trim()) > 0 ? true : deviceArray[Math.trunc(i / 13)].USB;
						break;
					case 7:
						deviceArray[Math.trunc(i / 13)].WiFi = $(element).text().trim();
						break;
					case 8: 
						deviceArray[Math.trunc(i / 13)].specs = $(element).text().trim() + " Flash, ";
						deviceArray[Math.trunc(i / 13)].Flash = parseInt($(element).text().trim());
						break;
					case 10:
						deviceArray[Math.trunc(i / 13)].specs += ($(element).text().trim() + " RAM");
						deviceArray[Math.trunc(i / 13)].RAM = parseInt($(element).text().trim());
						break;
					case 11:
						deviceArray[Math.trunc(i / 13)].firmwareVersion = $(element).text().trim();
						break;
					case 12:
						deviceArray[Math.trunc(i / 13)].notes = $(element).text().trim();
						break;
				}
			});

			//	Get index of all routers supporting all firmwares

			await indicesRef.doc("all-routers-index").get()
			.then(doc => {
				if (doc.data()) {
					dbAllRoutersList = doc.data().fullNameIndex;
				}
			});

			////////////////////////Adding routers to the database////////////////
			//////////////////////////////////////////////////////////////////////
			const batchArray = [];
			const BATCH_NUM_ITEMS = 450;
			let operationsCounter = 0;
			let batchIndex = 0;

			let newDevices = [];

			batchArray.push(db.batch());
			
			let deviceLength = deviceArray.length;

			for (let i = 0; i < deviceLength; i++) {
				if (!(dbDeviceList.includes((deviceArray[i].fullName + " " + deviceArray[i].version).trim()))) {

					isModified = true;
					newDevices.push((deviceArray[i].fullName + " " + deviceArray[i].version).trim());

					if (operationsCounter >= BATCH_NUM_ITEMS) {
						batchIndex++;
						batchArray.push(db.batch());
						operationsCounter = 0;
					}

					batchArray[batchIndex].set(freshtomatoRef.doc((deviceArray[i].fullName + " " + deviceArray[i].version).trim()), {
						fullName: (deviceArray[i].fullName + " " + deviceArray[i].version).trim(),
						company: deviceArray[i].company,
						model: deviceArray[i].model,
						version: deviceArray[i].version,
						LAN: deviceArray[i].LAN,
						USB: deviceArray[i].USB,
						WiFi: deviceArray[i].WiFi,
						specs: deviceArray[i].specs,
						firmwareVersion: deviceArray[i].firmwareVersion,
						notes: deviceArray[i].notes,
						Flash: deviceArray[i].Flash,
						RAM: deviceArray[i].RAM
					}, {merge: true});

					batchArray[batchIndex].set(indicesRef.doc("freshtomato-index"), {
						fullNameIndex: admin.firestore.FieldValue.arrayUnion((deviceArray[i].fullName + " " + deviceArray[i].version).trim())
					}, {merge: true});

					// Add routers to aggragated router list supporting all firmwares/////
					//////////////////////////////////////////////////////////////////////

					let altModels = deviceArray[i].model.split("/");
					let baseModel = altModels[0];
					let companyModel = "";
					
					for (let j = 0; j < altModels.length; j++) {
						if (j > 0) {
							if (isNaN(altModels[j])) {
								companyModel = deviceArray[i].company + " " + baseModel.replace(/[a-zA-Z]+\ *$/gmi, altModels[j]).replace(/-/gm, " ");
							} else {
								companyModel = deviceArray[i].company + " " + baseModel.replace(/\d+\ *$/gmi, altModels[j]).replace(/-/gm, " ");
							}
						} else {
							companyModel = deviceArray[i].company + " " + baseModel.replace(/-/gm, " ");
						}

						companyModel = companyModel.replace(/\/|_/gm, " ").trim().toUpperCase();
					
						if (!(dbAllRoutersList.includes(companyModel))) {
							batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel), {
								fullName: companyModel,
								company: deviceArray[i].company,
								model: deviceArray[i].model,
								LAN: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].LAN},											
								USB: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].USB},											
								WiFi: deviceArray[i].WiFi,
								specs: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].specs},
								freshtomatoSupport: true,
								freshtomatoSupportedVersions: admin.firestore.FieldValue.arrayUnion(deviceArray[i].version ? deviceArray[i].version : "default"),						
								freshtomatoFirmwareVersion: deviceArray[i].firmwareVersion,
								freshtomatoNotes: deviceArray[i].notes,
								Flash: deviceArray[i].Flash,
								RAM: deviceArray[i].RAM
							}, {merge: true});

							batchArray[batchIndex].set(indicesRef.doc("all-routers-index"), {
								fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel)
							}, {merge: true});

						} else {
							// Only need some fields if router already exists in list
							batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel), {
								freshtomatoFirmwareVersion: deviceArray[i].firmwareVersion,	
								freshtomatoNotes: deviceArray[i].notes,																					
								freshtomatoSupportedVersions: admin.firestore.FieldValue.arrayUnion(deviceArray[i].version ? deviceArray[i].version : "default"),
								freshtomatoSupport: true,	
								WiFi: deviceArray[i].WiFi,
								Flash: deviceArray[i].Flash,
								RAM: deviceArray[i].RAM
							}, {merge: true});

							batchArray[batchIndex].update(allFirmwareRoutersRef.doc(companyModel), {
								[`specs.${deviceArray[i].version ? deviceArray[i].version : "default"}`]: deviceArray[i].specs,
								[`LAN.${deviceArray[i].version ? deviceArray[i].version : "default"}`]: deviceArray[i].LAN,											
								[`USB.${deviceArray[i].version ? deviceArray[i].version : "default"}`]: deviceArray[i].USB
							}, {merge: true});
						}

						// Number of operations in each loop = 5
						operationsCounter += 5;

					}
					
				}
			}

			if (isModified) {
					
				batchArray[batchIndex].set(indicesRef.doc("freshtomato-index"), {
					modString: lastModified,
					updatedOn: new Date()
				}, {merge: true});

				batchArray[batchIndex].set(indicesRef.doc("all-routers-index"), {
					updatedOn: new Date()
				}, {merge: true});

				batchArray.forEach(async batch => {
					await batch.commit();
				});

				await db.collection("mail").add({
					to: "freetherouter@gmail.com",
					message: {
						subject: "FreshTomato has been updated",
						text: `FreshTomato device list has been updated. New Devices: ${newDevices}`
					}
				}).then(() => console.log('FreshTomato: Queued email for delivery!'))
				.catch(error => console.log(error));

				console.log("[Fresh Tomato]: New builds are available!");
			} else {
				console.log("[FreshTomato]: No change in device list.");
			}
		}
		
	}).then(() => {
		return true;
	}).catch(error => {
		console.log(error);
		return false;
	});		
}



/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////Add Extra Routers//////////////////////////////////////////////////////

let extraRouters = [];

function createExtraRouters() {

	extraRouters.push({
		fullName: "Buffalo WZR-1750DHP",
		company: "Buffalo",
		model: "WZR-1750DHP",
		specs: "128MB Flash, 512MB RAM",
		firmwareVersion: "K26ARM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "AC1750",
		version: "",
		notes: "",
		Flash: 128,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Belkin F5D8235 v3",
		company: "Belkin",
		model: "F5D8235",
		version: "v3",
		specs: "8MB Flash, 32MB RAM",
		firmwareVersion: "K26",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n300",
		notes: "",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "Belkin F7D3301",
		company: "Belkin",
		model: "F7D3301",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n300",
		notes: "",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Belkin F7D7301",
		company: "Belkin",
		model: "F7D7301",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n300",
		notes: "",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Belkin F7D3302",
		company: "Belkin",
		model: "F7D3302",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "100 Mbps",
		USB: true,
		WiFi: "n300",
		notes: "",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Belkin F7D7302 v1",
		company: "Belkin",
		model: "F7D7302",
		version: "v1",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "100 Mbps",
		USB: true,
		WiFi: "n300",
		notes: "",
		Flash: 8,
		RAM: 64
	});


	extraRouters.push({
		fullName: "Belkin Play F7D4302",
		company: "Belkin",
		model: "Play F7D4302",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "100 Mbps",
		USB: true,
		WiFi: "n600",
		notes: "",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Linksys E2500 v3",
		company: "Linksys",
		model: "E2500",
		version: "v3",
		specs: "16MB Flash, 64MB RAM",
		firmwareVersion: "K26RT-N",
		LAN: "100 Mbps",
		USB: true,
		WiFi: "n600",
		notes: "",
		Flash: 16,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Linksys E4200",
		company: "Linksys",
		model: "E4200",
		version: "",
		specs: "16MB Flash, 64MB RAM",
		firmwareVersion: "K26RT-N",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac750",
		notes: "",
		Flash: 16,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Netgear WNDR3400 v1&v2&v3",
		company: "Netgear",
		model: "WNDR3400",
		version: "v1&v2&v3",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26RT-N",
		LAN: "100 Mbps",
		USB: true,
		WiFi: "n600",
		notes: "",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Netgear WNDR3700 v3",
		company: "Netgear",
		model: "WNDR3700",
		version: "v3",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26RT-N",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n600",
		notes: "",
		Flash: 8,
		RAM: 64
	});
}


async function uploadExtraRouters() {
	let dbDeviceList = [];
	let dbAllRoutersList = [];

	await indicesRef.doc("freshtomato-index").get()
	.then((doc) => {
		if (doc.data()) {
			dbDeviceList = doc.data().fullNameIndex;
		}
	});

	//	Get index of all routers supporting all firmwares

	await indicesRef.doc("all-routers-index").get()
	.then((doc) => {
		if (doc.data()) {
			dbAllRoutersList = doc.data().fullNameIndex;
		}
	});

	////////////////////////////////////////////////////////////////////

	for (let i = 0; i < extraRouters.length; i++) {

		////////////Add to Freshtomato routers list////////////////////////		

		if (!(dbDeviceList.includes(extraRouters[i].fullName))) {

			freshtomatoRef.doc(extraRouters[i].fullName).set({
				fullName: extraRouters[i].fullName,
				company: extraRouters[i].company,
				model: extraRouters[i].model,
				version: extraRouters[i].version.replace(/\./gm, "_"),
				LAN: extraRouters[i].LAN,
				USB: extraRouters[i].USB,
				WiFi: extraRouters[i].WiFi,
				specs: extraRouters[i].specs,
				firmwareVersion: extraRouters[i].firmwareVersion,
				notes: extraRouters[i].notes,
				Flash: extraRouters[i].Flash,
				RAM: extraRouters[i].RAM
			}, {merge: true});

			await indicesRef.doc("freshtomato-index").set({
				fullNameIndex: admin.firestore.FieldValue.arrayUnion(extraRouters[i].fullName)
			}, {merge: true});

			// Add routers to aggragated router list supporting all firmwares/////
			//////////////////////////////////////////////////////////////////////

			let companyModel = ((extraRouters[i].company + " " + extraRouters[i].model).replace(/\//gi, "&")).trim().toUpperCase();
			
			if (!(dbAllRoutersList.includes(companyModel))) {
				allFirmwareRoutersRef.doc(companyModel).set({
					fullName: companyModel,
					company: extraRouters[i].company,
					model: extraRouters[i].model,
					LAN: {[extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"]: extraRouters[i].LAN},											
					USB: {[extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"]: extraRouters[i].USB},											
					WiFi: extraRouters[i].WiFi,
					specs: {[extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"]: extraRouters[i].specs},
					freshtomatoSupport: true,
					freshtomatoSupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version ? extraRouters[i].version : "default"),						
					freshtomatoFirmwareVersion: extraRouters[i].firmwareVersion,
					freshtomatoNotes: extraRouters[i].notes,
					Flash: extraRouters[i].Flash,
					RAM: extraRouters[i].RAM
				}, {merge: true});

				indicesRef.doc("all-routers-index").set({
					fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel)
				}, {merge: true});

			} else {
				// Only need some fields if router already exists in list
				allFirmwareRoutersRef.doc(companyModel).set({
					freshtomatoFirmwareVersion: extraRouters[i].firmwareVersion,	
					freshtomatoNotes: extraRouters[i].notes,																					
					freshtomatoSupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version ? extraRouters[i].version : "default"),
					freshtomatoSupport: true,	
					WiFi: extraRouters[i].WiFi,
					Flash: extraRouters[i].Flash,
					RAM: extraRouters[i].RAM
				}, {merge: true});

				allFirmwareRoutersRef.doc(companyModel).update({
					[`specs.${extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"}`]: extraRouters[i].specs,
					[`LAN.${extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"}`]: extraRouters[i].LAN,											
					[`USB.${extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"}`]: extraRouters[i].USB
				}, {merge: true});

			}
		}
	}

	indicesRef.doc("freshtomato-index").set({
		updatedOn: new Date()
	}, {merge: true});

	indicesRef.doc("all-routers-index").set({
		updatedOn: new Date()
	}, {merge: true});

}

// createExtraRouters();
// uploadExtraRouters();
checkAndUpdateFreshtomato();