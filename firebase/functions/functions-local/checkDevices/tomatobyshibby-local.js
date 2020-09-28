// Checks and Updates Automatically

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const tomatobyshibbyRef = db.collection('tomatobyshibby-main-list');
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const indicesRef = db.collection("indices");

// exports.checkAndUpdateTomatobyshibby = async function() {
async function checkAndUpdateTomatobyshibby() {

	let mainTable = [];
	let loaded = false;
	let isModified = false;

	return await axios.get("https://tomato.groov.pl/download/")
	.then(result => {
		//Checks if there is any change in last uploaded dates
		
		$('.fb-d', result.data).each(async function (i, element) {
			if (i > 1) {
				let year = $(element).text().slice(0, 4);

				/////////////// checkForChange(year);//////////////////////////

				if (Number(year) > 2014 && loaded === false) {
					
					loaded = true;	// DON'T change position

					///////////// await getMainTable(); from tomatobyshibby site//////////////

					await axios.get("https://tomato.groov.pl/?page_id=69")
					.then(result => {
						$('tbody', result.data).each((i, element) => { 
							if (i === 0) {
								$('tr', $(element)).each((j, element) => {					
									if (j > 0) {
										$("td", $(element)).each((k, element) => {

											switch (k) {

												case 0: 
													//Needs to push an object first to initialize mainTable as an array of objects and avoid undefined errors
													mainTable.push({ "fullName" : $(element).text().replace(/\//g, '&').replace('(', '').replace(')', '')});
													let nameArray = $(element).text().split(" ");
													mainTable[j-1].company = nameArray[0];
													mainTable[j-1].model = nameArray[1];
													if (nameArray[2]) {
														mainTable[j-1].version = nameArray[2].split('/').join('&').replace("(", "").replace(")", "").replace(/\./gm, "_");
													} else {
														mainTable[j-1].version = 'default';
													}
													break;

												case 4:
													let specsArray = $(element).text().split("/");
													mainTable[j-1].specs = specsArray[0] + "MB Flash, " + specsArray[1] + " RAM";
													mainTable[j-1].Flash = parseInt(specsArray[0]);
													mainTable[j-1].RAM = parseInt(specsArray[1]);
													break;

												case 3:
													mainTable[j-1].LAN = $(element).text();
													break;

												case 5:
													mainTable[j-1].firmwareVersion = $(element).text();
													break;

												case 6:
													if (!$(element).text()) {
														mainTable[j-1].notes = "";
													}
													mainTable[j-1].notes = $(element).text();
													break;
											}
										});
									}
								});
							}
			 			});
					}).catch(error => console.log(error));

					//////////////////////////////////////////////////////////////////////////
					// console.log(mainTable);
					///////////await setMainTable(mainTable);/////////////////////////////////
					
					let fullNameIndex = [];
					let dbAllRoutersList = [];

					await indicesRef.doc("tomatobyshibby-index").get()
					.then((doc) => {
						if (doc.data()) {
							fullNameIndex = doc.data().fullNameIndex;
						}
					});

					//	Get index of all routers supporting all firmwares

					await indicesRef.doc("all-routers-index").get()
					.then((doc) => {
						if (doc.data()) {
							dbAllRoutersList = doc.data().fullNameIndex;
						}
					});

					// console.dir(mainTable, {'maxArrayLength': null});

					const batchArray = [];
					let operationsCounter = 0;
					let batchIndex = 0;
					const BATCH_NUM_ITEMS = 450;

					batchArray.push(db.batch());

					let newDevices = [];

					let arrayLength = mainTable.length;
					for (let i = 0; i < arrayLength; i++) {
						if (!fullNameIndex.includes(mainTable[i].fullName)) {

							isModified = true;
							newDevices.push(mainTable[i].fullName);

							if (operationsCounter >= BATCH_NUM_ITEMS) {
								batchIndex++;
								batchArray.push(db.batch());
								operationsCounter = 0;
							}

							// tomatobyshibbyRef.doc(mainTable[i].fullName).set({
							batchArray[batchIndex].set(tomatobyshibbyRef.doc(mainTable[i].fullName), {
								fullName: mainTable[i].fullName,
								company: mainTable[i].company,
								model: mainTable[i].model,
								version: mainTable[i].version,
								specs: mainTable[i].specs,
								LAN: mainTable[i].LAN,
								firmwareVersion: mainTable[i].firmwareVersion,
								notes: mainTable[i].notes,
								Flash: mainTable[i].Flash,
								RAM: mainTable[i].RAM
							});

							// tomatobyshibbyRef.doc("index").set({
							batchArray[batchIndex].set(indicesRef.doc("tomatobyshibby-index"), {
								fullNameIndex: admin.firestore.FieldValue.arrayUnion(mainTable[i].fullName)
							}, {merge: true});

							// Add routers to aggragated router list supporting all firmwares/////
							//////////////////////////////////////////////////////////////////////

							let altModels = mainTable[i].model.split("/");
							let baseModel = altModels[0];
							let companyModel = "";
							
							for (let j = 0; j < altModels.length; j++) {
								if (j > 0) {
									if (isNaN(altModels[j])) {
										companyModel = mainTable[i].company + " " + baseModel.replace(/[a-zA-Z]+\ *$/gmi, altModels[j]).replace(/-/gm, " ");
									} else {
										companyModel = mainTable[i].company + " " + baseModel.replace(/\d+\ *$/gmi, altModels[j]).replace(/-/gm, " ");
									}
								} else {
									companyModel = mainTable[i].company + " " + baseModel.replace(/-/gm, " ");
								}

								companyModel = companyModel.replace(/\/|_/gm, " ").trim().toUpperCase();

								if (!(dbAllRoutersList.includes(companyModel))) {

									// allFirmwareRoutersRef.doc(companyModel).set({
									batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel), {
										fullName: companyModel,
										company: mainTable[i].company,
										model: mainTable[i].model,
										tomatobyshibbySupport: true,
										tomatobyshibbySupportedVersions: admin.firestore.FieldValue.arrayUnion(mainTable[i].version),						
										specs: {[mainTable[i].version ? mainTable[i].version : "default"]: mainTable[i].specs},
										LAN: {[mainTable[i].version ? mainTable[i].version : "default"]: mainTable[i].LAN},											
										USB: {[mainTable[i].version ? mainTable[i].version : "default"]: ""},
										WiFi: "",
										tomatobyshibbyFirmwareVersion: mainTable[i].firmwareVersion,
										tomatobyshibbyNotes: mainTable[i].notes,
										Flash: mainTable[i].Flash,
										RAM: mainTable[i].RAM
									}, {merge: true});
		
									batchArray[batchIndex].set(indicesRef.doc("all-routers-index"), {
										fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel)
									}, {merge: true});							

								} else {
									// Only need some fields if router already exists in list
								
									batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel), {
										tomatobyshibbyFirmwareVersion: mainTable[i].firmwareVersion,
										tomatobyshibbyNotes: mainTable[i].notes,
										tomatobyshibbySupport: true,
										tomatobyshibbySupportedVersions: admin.firestore.FieldValue.arrayUnion(mainTable[i].version),
										Flash: mainTable[i].Flash,
										RAM: mainTable[i].RAM
									}, {merge: true});

									batchArray[batchIndex].update(allFirmwareRoutersRef.doc(companyModel), {
										[`specs.${mainTable[i].version ? mainTable[i].version : "default"}`]: mainTable[i].specs,
										[`LAN.${mainTable[i].version ? mainTable[i].version : "default"}`]: mainTable[i].LAN
									}, {merge: true});
								}

								// Number of operations in each loop = 5
								operationsCounter += 5;
							}
						}
					}

					if (isModified) {
					
						batchArray[batchIndex].set(indicesRef.doc("tomatobyshibby-index"), {
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
								subject: "Tomato by Shibby has been updated",
								text: `Tomato by Shibby device list has been updated. New Devices: ${newDevices}`
							}
						}).then(() => console.log('[Tomato by Shibby]: Queued email for delivery!'))
						.catch(error => console.log(error));

						console.log('[Tomato by Shibby]: New builds are available!');
					} else {
						console.log("[Tomato by Shibby]: No change in device list.");
					}
				}
			}
		});

	}).then(() => {
		if (!isModified) {
			console.log('[Tomato by Shibby]: No new devices.');
		}
		return true;
	}).catch((error) => {
		console.log(error);
		return false;
	});
}



/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////Add Extra Routers//////////////////////////////////////////////////////
//////////////Routers not included in the Main Table/////////////////////////////////////////

let extraRouters = [];

function createExtraRouters() {

	extraRouters.push({
		fullName: "Belkin F5D8235-4 v3",
		company: "Belkin",
		model: "F5D8235-4",
		version: "v3",
		specs: "8MB Flash, 32MB RAM",
		firmwareVersion: "K26",
		notes: "",
		LAN: "1 Gbps",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "Belkin F7D3301",
		company: "Belkin",
		model: "F7D3301",
		version: "default",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		notes: "",
		LAN: "1 Gbps",
		Flash: 8,
		RAM: 64
	});
		

	extraRouters.push({
		fullName: "Belkin F7D3302",
		company: "Belkin",
		model: "F7D3302",
		version: "default",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		notes: "",
		LAN: "1 Gbps",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Belkin F7D4302",
		company: "Belkin",
		model: "F7D4302",
		version: "default",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		notes: "",
		LAN: "100 Mbps",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Asus RT-AC56S",
		company: "Asus",
		model: "RT-AC56S",
		version: "default",
		specs: "128MB Flash, 128MB RAM",
		firmwareVersion: "K26ARM",
		notes: "",
		LAN: "1 Gbps",
		Flash: 128,
		RAM: 128
	});
		
	extraRouters.push({
		fullName: "Buffalo WZR-1750DHP",
		company: "Buffalo",
		model: "WZR-1750DHP",
		version: "default",
		specs: "128MB Flash, 512MB RAM",
		firmwareVersion: "K26ARM",
		notes: "",
		LAN: "1 Gbps",
		Flash: 128,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Tenda W1800R",
		company: "Tenda",
		model: "W1800R",
		version: "default",
		specs: "16MB Flash, 256MB RAM",
		firmwareVersion: "K26RT-AC",
		notes: "",
		LAN: "1 Gbps",
		Flash: 16,
		RAM: 256
	});
		
	extraRouters.push({
		fullName: "Linksys E1200 v2",
		company: "Linksys",
		model: "E1200",
		version: "v2",
		specs: "8MB Flash, 32MB RAM",
		firmwareVersion: "K26RT-N",
		notes: "",
		LAN: "100 Mbps",
		Flash: 8,
		RAM: 32
	});

}

async function uploadExtraRouters() {

	let fullNameIndex = [];
	let dbAllRoutersList = [];
	let isModified = false;

	await indicesRef.doc("tomatobyshibby-index").get()
	.then((doc) => {
		if (doc.data()) {
			fullNameIndex = doc.data().fullNameIndex;
		}
	}).catch(error => console.log(error));

	//	Get index of all routers supporting all firmwares

	await allFirmwareRoutersRef.doc("all-routers-index").get()
	.then((doc) => {
		if (doc.data()) {
			dbAllRoutersList = doc.data().fullNameIndex;			
		}
	}).catch(error => console.log(error));

	let arrayLength = extraRouters.length;
	for (let i = 0; i < arrayLength; i++) {
		if (!fullNameIndex.includes(extraRouters[i].fullName)) {

			isModified = true;

			tomatobyshibbyRef.doc(extraRouters[i].fullName).set({
				fullName: extraRouters[i].fullName,
				company: extraRouters[i].company,
				model: extraRouters[i].model,
				version: extraRouters[i].version.replace(/\./gm, "_"),
				specs: extraRouters[i].specs,
				LAN: extraRouters[i].LAN,
				firmwareVersion: extraRouters[i].firmwareVersion,
				notes: extraRouters[i].notes,
				Flash: extraRouters[i].Flash,
				RAM: extraRouters[i].RAM
			});

			indicesRef.doc("tomatobyshibby-index").set({
				fullNameIndex: admin.firestore.FieldValue.arrayUnion(extraRouters[i].fullName),
				updatedOn: new Date()
			}, {merge: true});

			// Add routers to aggragated router list supporting all firmwares/////
			//////////////////////////////////////////////////////////////////////

			let companyModel = ((extraRouters[i].company + " " + extraRouters[i].model.replace(/-/gm, " ")).replace(/\//gmi, " ")).trim().toUpperCase();

			if (!(dbAllRoutersList.includes(companyModel))) {
				allFirmwareRoutersRef.doc(companyModel).set({
					fullName: companyModel,
					company: extraRouters[i].company,
					model: extraRouters[i].model,
					tomatobyshibbySupport: true,
					tomatobyshibbySupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version),						
					specs: {[extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "specs"]: extraRouters[i].specs},
					USB: {[extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"]: ""},
					LAN: {[extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"]: extraRouters[i].LAN},
					WiFi: "",
					tomatobyshibbyFirmwareVersion: extraRouters[i].firmwareVersion,
					tomatobyshibbyNotes: extraRouters[i].notes,
					Flash: extraRouters[i].Flash,
					RAM: extraRouters[i].RAM
				}, {merge: true});

				indicesRef.doc("all-routers-index").set({
					fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel),
					updatedOn: new Date()
				}, {merge: true});

			} else {
				// Only need some fields if router already exists in list
				allFirmwareRoutersRef.doc(companyModel).set({							
					tomatobyshibbyFirmwareVersion: extraRouters[i].firmwareVersion,
					tomatobyshibbyNotes: extraRouters[i].notes,
					tomatobyshibbySupport: true,
					tomatobyshibbySupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version),
					Flash: extraRouters[i].Flash,
					RAM: extraRouters[i].RAM
				}, {merge: true});

				allFirmwareRoutersRef.doc(companyModel).update({
					[`specs.${extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"}`]: extraRouters[i].specs,
					[`LAN.${extraRouters[i].version ? extraRouters[i].version.replace(/\./gm, "_") : "default"}`]: extraRouters[i].LAN
				});			
			}
		}
	}

	if (isModified) {
		
		indicesRef.doc("all-routers-index").set({
			updatedOn: new Date()
		}, {merge: true});
	}

}

// createExtraRouters();
// uploadExtraRouters();
checkAndUpdateTomatobyshibby();