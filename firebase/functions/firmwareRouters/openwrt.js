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

const openwrtRef = db.collection("openwrt-main-list");
const indicesRef = db.collection("indices");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");

exports.checkAndUpdateOpenwrt = async function() {
// async function checkAndUpdateOpenwrt() {
	let numberOfDevices = 0;
	let deviceArray = [];
	let fullNameIndex = [];
	let isModified = false;
	let dbAllRoutersList = [];

	await indicesRef.doc("openwrt-number-of-devices").get()
	.then((doc) => {
		if (doc.data()) {
			numberOfDevices = doc.data().number;
		}
	}).catch(error => console.log(error));

	return await axios.get("https://openwrt.org/toh/views/toh_extended_all")
	.then((res) => {

		$("tr", ".dataplugin_table", res.data).each((i, element) => {
			let device = {};
			let companyArray = [];

			//skip headings and get device rows
			if (i > 1) {
				if (/(\d\d\.\d\d)|(snapshot)/gmi.test($(".supported_current_rel", $(element).html()).text()) && !(/WIP/gmi.test($(".unsupported_functions", $(element).html()).text()))) {
					let device2 = {};

					device.deviceType = $(".device_type", $(element).html()).text();
					device.model = $(".model", $(element).html()).text().replace(/\//gmi, "&");
					device.version = $(".version", $(element).html()).text().replace(/\//gmi, "&").replace(/\*/gmi, "+").replace(/\./gm, "_");
					device.supportedCurrentRelease = $(".supported_current_rel", $(element).html()).text();
					device.specs = $(".flash_mb", $(element).html()).text() + "MB Flash, " + $(".ram_mb", $(element).html()).text() + "MB RAM";
					device.Flash = parseInt($(".flash_mb", $(element).html()).text());
					device.RAM = parseInt($(".ram_mb", $(element).html()).text());
					device.LAN = /\d/gmi.test($(".ethernet_gbit_ports", $(element).html()).text()) ? "1 Gbps" : "100 Mbps";
					device.modem = $(".modem", $(element).html()).text() === "-" ? false : $(".modem", $(element).html()).text();
					device.USB = $(".usb_ports", $(element).html()).text() === "-" ? false : $(".usb_ports", $(element).html()).text();
					device.SATA = $(".sata_ports", $(element).html()).text() === "-" ? false : $(".sata_ports", $(element).html()).text();
					device.techData = "https://openwrt.org" + $("a", ".device_techdata", $(element).html()).attr('href');
					device.notes = $(".comments", $(element).html()).text();
					device.unsupportedFunctions = $(".unsupported_functions", $(element).html()).text();

					device2 = { ...device };
					companyArray = $(".brand", $(element).html()).text().split("/");

					device.company = companyArray[0].trim();
					device.fullName = (device.company + " " + device.model + " " + device.version.replace(/\//gmi, "&")).trim();

					deviceArray.push(device);

					//For devices with multiple brands
					if (companyArray[1]) {
						device2.company = companyArray[1].trim();
						device2.fullName = (device2.company + " " + device2.model + " " + device2.version.replace(/\//gmi, "&")).trim();

						deviceArray.push(device2);
					}
				}
			}
		});
	}).then(async () => {

		// console.dir(deviceArray, { "maxArrayLength": null });

		//////////////// Adding routers to the database batch ////////////////
		//////////////////////////////////////////////////////////////////////
		
		const batchArray = [];
		const BATCH_NUM_ITEMS = 450;
		let operationsCounter = 0;
		let batchIndex = 0;
		let newDevices = [];

		batchArray.push(db.batch());

		if (deviceArray.length !== numberOfDevices) {
			
			isModified = true;

			await indicesRef.doc("openwrt-index").get()
			.then((doc) => {
				if (doc.data()) {
					fullNameIndex = doc.data().fullNameIndex;
				}
			}).catch(error => console.log(error));

			await indicesRef.doc("all-routers-index").get()
			.then((doc) => {
				if (doc.data()) {
					dbAllRoutersList = doc.data().fullNameIndex;
				}
			}).catch(error => console.log(error));

			let arrayLength = deviceArray.length;
			for (let i = 0; i < arrayLength; i++) {

				if (!(fullNameIndex.includes(deviceArray[i].fullName))) {
					newDevices.push(deviceArray[i].fullName);

					if (operationsCounter >= BATCH_NUM_ITEMS) {
							batchIndex++;
							batchArray.push(db.batch());
							operationsCounter = 0;
					}

					batchArray[batchIndex].set(openwrtRef.doc(deviceArray[i].fullName), {
						fullName: deviceArray[i].fullName,
						company: deviceArray[i].company,
						model: deviceArray[i].model,
						version: deviceArray[i].version,
						deviceType: deviceArray[i].deviceType,
						supportedCurrentRelease: deviceArray[i].supportedCurrentRelease,
						specs: deviceArray[i].specs,
						LAN: deviceArray[i].LAN,
						USB: deviceArray[i].USB,
						modem: deviceArray[i].modem,
						SATA: deviceArray[i].SATA,
						unsupportedFunctions: deviceArray[i].unsupportedFunctions,
						techData: deviceArray[i].techData,
						notes: deviceArray[i].notes,
						Flash: deviceArray[i].Flash,
						RAM: deviceArray[i].RAM
					});

					batchArray[batchIndex].set(indicesRef.doc("openwrt-index"), {
						fullNameIndex: admin.firestore.FieldValue.arrayUnion(deviceArray[i].fullName)
					}, {merge: true});


					///// Add routers to aggragated router list supporting all firmwares/////
					/////////////////////////////////////////////////////////////////////////

					let altModels = deviceArray[i].model.split("&");
					let baseModel = altModels[0];
					let companyModel = "";
					let companyModel2 = "";

					for (let j = 0; j < altModels.length; j++) {
						if (deviceArray[i].company.toUpperCase() == "RASPBERRY PI FOUNDATION") {
							companyModel = deviceArray[i].model;
						
						} else	if (j > 0) {

							if (/\w{3,}/gm.test(altModels[j])) {
								companyModel = deviceArray[i].company + " " + altModels[j].replace(/-/gm, " ").trim();
							} else {
								companyModel = deviceArray[i].company + " " + baseModel.replace(/[a-zA-Z]+ *$/gmi, altModels[j]).replace(/-/gm, " ");
							}
						} else {
							companyModel = deviceArray[i].company + " " + baseModel.replace(/-/gm, " ");
						}

						// Without extra model info in brackets
						companyModel2 = companyModel.replace(/\(.*\)/gmi, "").replace(/\(|\)/gmi, "").trim().toUpperCase();

						companyModel = companyModel.replace(/\(|\)/gmi, "").trim().toUpperCase();

						// console.log(companyModel);

						if (!(dbAllRoutersList.includes(companyModel))) {
							batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel), {
								fullName: companyModel,
								company: deviceArray[i].company,
								model: deviceArray[i].model,
								LAN: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].LAN},											
								USB: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].USB},											
								WiFi: "",
								SATA: deviceArray[i].SATA,
								modem: deviceArray[i].modem,
								deviceType: deviceArray[i].deviceType,
								specs: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].specs},
								openwrtSupport: true,
								openwrtSupportedVersions: admin.firestore.FieldValue.arrayUnion(deviceArray[i].version ? deviceArray[i].version : "default"),						
								openwrtSupportedCurrentRelease: deviceArray[i].supportedCurrentRelease,
								openwrtNotes: deviceArray[i].notes,
								openwrtUnsupportedFunctions: deviceArray[i].unsupportedFunctions,
								openwrtTechData: deviceArray[i].techData,
								Flash: deviceArray[i].Flash,
								RAM: deviceArray[i].RAM
							}, {merge: true});

							batchArray[batchIndex].set(indicesRef.doc("all-routers-index"), {
								fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel)
							}, {merge: true});

						} else {
							// Only need some fields if router already exists in list
							batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel), {	
								openwrtNotes: deviceArray[i].notes,																					
								openwrtSupportedVersions: admin.firestore.FieldValue.arrayUnion(deviceArray[i].version ? deviceArray[i].version : "default"),
								openwrtSupport: true,
								SATA: deviceArray[i].SATA,
								modem: deviceArray[i].modem,
								deviceType: deviceArray[i].deviceType,
								openwrtSupportedCurrentRelease: deviceArray[i].supportedCurrentRelease,
								openwrtUnsupportedFunctions: deviceArray[i].unsupportedFunctions,
								openwrtTechData: deviceArray[i].techData,
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

						if (companyModel != companyModel2) {
							if (companyModel2.trim() != "SFR") {
								// console.log('-------------------------: ', companyModel2);

								if (!(dbAllRoutersList.includes(companyModel2))) {
									batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel2), {
										fullName: companyModel2,
										company: deviceArray[i].company,
										model: deviceArray[i].model,
										LAN: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].LAN},											
										USB: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].USB},											
										WiFi: "",
										SATA: deviceArray[i].SATA,
										modem: deviceArray[i].modem,
										deviceType: deviceArray[i].deviceType,
										specs: {[deviceArray[i].version ? deviceArray[i].version : "default"]: deviceArray[i].specs},
										openwrtSupport: true,
										openwrtSupportedVersions: admin.firestore.FieldValue.arrayUnion(deviceArray[i].version ? deviceArray[i].version : "default"),						
										openwrtSupportedCurrentRelease: deviceArray[i].supportedCurrentRelease,
										openwrtNotes: deviceArray[i].notes,
										openwrtUnsupportedFunctions: deviceArray[i].unsupportedFunctions,
										openwrtTechData: deviceArray[i].techData,
										Flash: deviceArray[i].Flash,
										RAM: deviceArray[i].RAM
									}, {merge: true});

									batchArray[batchIndex].set(indicesRef.doc("all-routers-index"), {
										fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel2)
									}, {merge: true});

								} else {
									// Only need some fields if router already exists in list
									batchArray[batchIndex].set(allFirmwareRoutersRef.doc(companyModel2), {	
										openwrtNotes: deviceArray[i].notes,																					
										openwrtSupportedVersions: admin.firestore.FieldValue.arrayUnion(deviceArray[i].version ? deviceArray[i].version : "default"),
										openwrtSupport: true,
										SATA: deviceArray[i].SATA,
										modem: deviceArray[i].modem,
										deviceType: deviceArray[i].deviceType,
										openwrtSupportedCurrentRelease: deviceArray[i].supportedCurrentRelease,
										openwrtUnsupportedFunctions: deviceArray[i].unsupportedFunctions,
										openwrtTechData: deviceArray[i].techData,
										Flash: deviceArray[i].Flash,
										RAM: deviceArray[i].RAM
									}, {merge: true});

									batchArray[batchIndex].update(allFirmwareRoutersRef.doc(companyModel2), {
										[`specs.${deviceArray[i].version ? deviceArray[i].version : "default"}`]: deviceArray[i].specs,
										[`LAN.${deviceArray[i].version ? deviceArray[i].version : "default"}`]: deviceArray[i].LAN,											
										[`USB.${deviceArray[i].version ? deviceArray[i].version : "default"}`]: deviceArray[i].USB
									}, {merge: true});
								}

								operationsCounter += 3;
							}
						}
					}
				}
			}

			
		}

		if (isModified) {

			batchArray[batchIndex].set(indicesRef.doc("openwrt-number-of-devices"), {
				number: deviceArray.length
			}, {merge: true});

			batchArray[batchIndex].set(indicesRef.doc("openwrt-index"), {
				updatedOn: new Date()
			}, {merge: true});

			batchArray[batchIndex].set(indicesRef.doc("all-routers-index"), {
				updatedOn: new Date()
			}, {merge: true});

			db.collection("mail").add({
				to: "freetherouter@gmail.com",
				message: {
					subject: "OpenWRT has been updated",
					text: `[OpenWRT]: device list has been updated. New Devices: ${newDevices}`
				}
			}).then(() => console.log('[OpenWRT]: Queued email for delivery!'))
			.catch(error => console.log(error));

			console.log('[OpenWRT]: device list has been updated.');

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
			console.log("[OpenWrt]: Device list has not been modified.");
		}

	}).then(() => {
		return true;
	}).catch(error => console.log(error));
	
};

// checkAndUpdateOpenwrt();