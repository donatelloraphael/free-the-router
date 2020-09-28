// Checks and Updates Automatically

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

const tomatobyshibbyRef = db.collection('tomatobyshibby-main-list');
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const indicesRef = db.collection("indices");

exports.checkAndUpdateTomatobyshibby = async function() {
// async function checkAndUpdateTomatobyshibby() {

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

				if (Number(year) > 2019 && loaded === false) {
					
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
};


// checkAndUpdateTomatobyshibby();