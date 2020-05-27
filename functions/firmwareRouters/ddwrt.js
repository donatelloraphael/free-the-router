// Automatic Check and Update

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
}, "ddwrt");
const db = admin.firestore();

const ddwrtRef = db.collection("ddwrt-main-list");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const indicesRef = db.collection("indices");

exports.checkAndUpdateDdwrt = async function() {
// async function checkAndUpdateDdwrt() {

	let modString = "";
	let currentModified = "";
	let isModified = false;
	let deviceArray = [];
	let dbDeviceList = [];

	await indicesRef.doc("ddwrt-index").get()
	.then((doc) => {
		if (doc.data()) {
			modString = doc.data().modString;
			dbDeviceList = doc.data().fullNameIndex;
		}
	}).catch(error => console.log(error));

	return await axios.get("https://wiki.dd-wrt.com/wiki/index.php/Supported_Devices")
	.then(async res => {	
		currentModified = $("#f-lastmod", res.data).text().trim();

		if (modString !== currentModified) {

		isModified = true;
		
		////////////////Make Brand List///////////////////

		let brandList = [];
		
		$("h3, h4", res.data).each((i, element) => {
			if (i > 3) {
				let brand = $(element).text().split("]")[1].trim();

				switch (brand) {
					case "Linksys (Wireless a/b/g/n/ac)":
					case "Cisco":
					case "EnGenius":
					case "Ovislink":
					case "Verizon":
						//do nothing
						break;
					case "Linksys (Wireless a/b/g)":
						brandList.push("Linksys/Cisco");
						break;
					case "Linksys":
						brandList.push("Linksys/Cisco");
						break;
					case "Linksys Valet":
						brandList.push("Linksys Valet/Cisco Valet");
						break;
					case "Airlive":
						brandList.push("Airlive/Ovislink");
						break;
					case "Planex aka PCi":
						brandList.push("Planex/PCi");
						break;
					case "Senao / EnGenius":
						brandList.push("Senao/EnGenius");
						break;
					case "Actiontec":
						brandList.push("Actiontec/Verizon");
						break;
					default:
						brandList.push(brand);
						break;
				}
			}
		});
		// console.log(brandList);

		//////////////// Append Properties to device ////////////////////////

		$("table", res.data).each((i, element) => {
			if (i > 0) {
				let PoE = false;

				// Select the brand tables that have a "PoE" column
				$("th", $(element).html()).each((j, element) => {
					if (/PoE/g.test($(element).text())) {
						PoE = true;
					}
				});

				$("tr", $(element).html()).each((j, element) => {
					let device = {};
					let RAM = "";
					let companyArray = [];
					let altBrandDevice = {};

					if (j > 0) {
						$("td", $(element).html()).each((k, element) => {

							switch(k) {
								case 0:
									let nameArray = $(element).html().replace(/<br>/gmi, " ").replace(/(<a.*">)|<\/a>|(&amp;)|\n/gmi, "").replace(/-\s/gmi, "-").split("(");
									// console.log(nameArray);
									device.model = nameArray[0].trim();
									if (nameArray[1]) {
										device.WiFi = nameArray[1].replace(")", "").toLowerCase();
									} else {
										device.WiFi = "";
									}
									break;
								case 1:
									device.version = $(element).html().replace(/<br>|\//gmi, "&").replace(/\n|(&quot;)|(&#xA0;)|(&#xA0;?)|\-|\?/gmi, "").trim();
									break;
								case 4:
									RAM = $(element).text().trim();
									break;
								case 5:
									device.specs = $(element).text().trim() + "MB Flash, " + RAM + "MB RAM";
									break;
								case 13:
									if (!PoE) {
										device.notes = $(element).text().trim().replace(/(^\-$)|\?/, "");
										if (/USB/gi.test($(element).text()) && !(/(w\/o)/gmi.test($(element).text()))) {
											device.USB = true;
										} else {
											device.USB = false;
										}
										if (/Gbit/gmi.test($(element).text())) {
											device.LAN = "1 Gbps";
										} else {
											device.LAN = "100 Mbps";
										}
									}
									break;
								case 14:
									if (!PoE) {
										if (/(TBD)|(WIP)/gm.test($(element).text().trim())) {
											device.ddwrtSupport = false;
										} else {
											device.ddwrtSupport = true;
										}
									} else {
										device.notes = $(element).text().trim().replace(/^\-$/, "");
										if (/USB/gi.test($(element).text()) && !(/(w\/o)/gmi.test($(element).text()))) {
											device.USB = true;
										} else {
											device.USB = false;
										}
										if (/Gbit/gmi.test($(element).text())) {
											device.LAN = "1 Gbps";
										} else {
											device.LAN = "100 Mbps";
										}
									}
									break;
								case 15:
									if (!PoE) {
										if (/(donated\s?router\s?needed)/gmi.test($(element).text().trim())) {
											device.ddwrtSupport = false;
										} else if (/(needs\s?DD-WRT\s?activation)/gmi.test($(element).text().trim())) {
											device.needsActivation = true;
										} else {
											device.needsActivation = false;
										}
									} else {
										if (/(TBD)|(WIP)/gm.test($(element).text().trim())) {
											device.ddwrtSupport = false;
										} else {
											device.ddwrtSupport = true;
										}
									}						
									break;
								case 16:
									if (PoE) {
										if (/(donated\s?router\s?needed)/gmi.test($(element).text().trim())) {
											device.ddwrtSupport = false;
										} else if (/(needs\s?DD-WRT\s?activation)/gmi.test($(element).text().trim())) {
											device.needsActivation = true;
										} else {
											device.needsActivation = false;
										}
										break;
									}
							}	
						});
						companyArray = brandList[i-1].split("/");

						//Copy the array for alt Brand device
						altBrandDevice = { ...device };

						device.company = companyArray[0];
						device.fullName = (device.company.trim() + " " + device.model.trim() + " " + device.version).replace(/\//gmi, "&").trim();
						deviceArray.push(device);
			
						if (companyArray[1]) {
							altBrandDevice.company = companyArray[1];
							altBrandDevice.fullName = (altBrandDevice.company.trim() + " " + altBrandDevice.model.trim() + " " + altBrandDevice.version).replace(/\//gmi, "&").trim();
							deviceArray.push(altBrandDevice);
						}
						
					}
				});

			}
			
		});

		// console.dir(deviceArray, {'maxArrayLength': null});

		////////////////////////Adding routers to the database////////////////
		//////////////////////////////////////////////////////////////////////

		const batchArray = [];
		const BATCH_NUM_ITEMS = 400;
		let operationsCounter = 0;
		let batchIndex = 0;

		let newDevices = [];

		batchArray.push(db.batch());

		let dbAllRoutersList = [];

		await indicesRef.doc("all-routers-index").get()
		.then(doc => {
			if (doc.data()) {
				dbAllRoutersList = doc.data().fullNameIndex;
			}
		}).catch(error => {
			console.log(error);
			return false;
		});

		let length = deviceArray.length;
		for (let i = 0; i < length; i++) {
			if (!(dbDeviceList.includes(deviceArray[i].fullName))) {
				if (deviceArray[i].ddwrtSupport) {

					newDevices.push(deviceArray[i].fullName);

					if (operationsCounter >= BATCH_NUM_ITEMS) {
						batchIndex++;
						batchArray.push(db.batch());
						operationsCounter = 0;
					}

					batchArray[batchIndex].set(ddwrtRef.doc(deviceArray[i].fullName), {
						fullName: deviceArray[i].fullName,
						company: deviceArray[i].company,
						model: deviceArray[i].model,
						version: deviceArray[i].version,
						specs: deviceArray[i].specs,
						WiFi: deviceArray[i].WiFi,
						USB: deviceArray[i].USB,
						notes: deviceArray[i].notes,
						needsActivation: deviceArray[i].needsActivation,
						LAN: deviceArray[i].LAN
					});

					batchArray[batchIndex].set(indicesRef.doc("ddwrt-index"), {
						fullNameIndex: admin.firestore.FieldValue.arrayUnion(deviceArray[i].fullName)
					}, {merge: true});

					///// Add routers to aggragated router list supporting all firmwares/////
					/////////////////////////////////////////////////////////////////////////

					let companyModel = (deviceArray[i].company + " " + deviceArray[i].model).replace(/\//gmi, "&").toUpperCase();

					if (!(dbAllRoutersList.includes(companyModel))) {
						batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel), {
							fullName: companyModel,
							company: deviceArray[i].company,
							model: deviceArray[i].model,
							LAN: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].LAN},											
							USB: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].USB},											
							WiFi: deviceArray[i].WiFi,
							specs: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].specs},
							ddwrtSupport: true,
							ddwrtSupportedVersions: admin.firestore.FieldValue.arrayUnion(deviceArray[i].version ? deviceArray[i].version : "default"),
							ddwrtActivationNeeded: deviceArray[i].needsActivation,
							ddwrtNotes: deviceArray[i].notes
						}, {merge: true});

						batchArray[batchIndex].set(indicesRef.doc("all-routers-index"), {
							fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel)
						}, {merge: true});

					} else {
						// Only need some fields if router already exists in list
						batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel), {
							ddwrtNotes: deviceArray[i].notes,
							ddwrtActivationNeeded: deviceArray[i].needsActivation,																		
							ddwrtSupportedVersions: admin.firestore.FieldValue.arrayUnion(deviceArray[i].version ? deviceArray[i].version : "default"),
							ddwrtSupport: true,	
						}, {merge: true});

						if (deviceArray[i].WiFi) {
							batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel), {
								WiFi: deviceArray[i].WiFi
							}, {merge: true});
						}

						batchArray[batchIndex].update(allFirmwareRoutersRef.doc(companyModel), {
							[`LAN.${deviceArray[i].version ? deviceArray[i].version : "default"}`]: deviceArray[i].LAN,
							[`specs.${deviceArray[i].version ? deviceArray[i].version : "default"}`]: deviceArray[i].specs,										
							[`USB.${deviceArray[i].version ? deviceArray[i].version : "default"}`]: deviceArray[i].USB
						}, {merge: true});
					}

					// Number of operations in each loop = 6
					operationsCounter += 6;
				}
			}
		}

		/////////////////Upload new routers and produces log messages if router list has been updated////////////////

		if (isModified) {

			batchArray[batchIndex].set(indicesRef.doc("ddwrt-index"), {
				updatedOn: new Date()
			}, {merge: true});

			batchArray[batchIndex].set(indicesRef.doc("all-routers-index"), {
				updatedOn: new Date()
			}, {merge: true});

			batchArray[batchIndex].set(indicesRef.doc("ddwrt-index"), {
				modString: currentModified
			}, {merge: true});

			db.collection("mail").add({
				to: "freetherouter@gmail.com",
				message: {
					subject: "DD-WRT has been updated",
					text: `[DD-WRT]: device list has been updated. New Devices: ${newDevices}`
				}
			}).then(() => console.log('[DD-WRT]: Queued email for delivery!'))
			.catch(error => console.log(error));

			console.log("[DD-WRT]: device list has been modified!");

			return batchArray.forEach(async batch => {
				return await batch.commit()
				.then(() => {
					return true;
				}).catch(error => {
					console.log(error);
					return false;
				});
			});

		} else {
			console.log('[DD-WRT]: Device list has not been modified.');
			return true;
		}
	
	}}).then(() => {
		return true;
	}).catch(error => console.log(error));

};


// checkAndUpdateDdwrt();