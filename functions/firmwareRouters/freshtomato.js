// Checks and updates automatically

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../firebase-adminsdk.json");

	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	});
}

const db = admin.firestore();

const freshtomatoRef = db.collection("freshtomato-main-list");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const indicesRef = db.collection("indices");
const deviceArray = [];

exports.checkAndUpdateFreshtomato = async function() {
// async function checkAndUpdateFreshtomato() {	
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
						deviceArray[Math.trunc(i / 13)].version = $(element).text().trim().split('/').join('&');
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

				batchArray.forEach((batch) => {
					batch.commit();
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
};


// checkAndUpdateFreshtomato();