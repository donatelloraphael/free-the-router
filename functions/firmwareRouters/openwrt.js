const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
}, "openwrt");
const db = admin.firestore();

const openwrtRef = db.collection("openwrt-main-list");

exports.checkOpenwrt = async function() {
// async function checkOpenwrt() {
	let numberOfDevices = "";
	let deviceArray = [];
	let fullNameIndex = [];

	await openwrtRef.doc("deviceArrayLength").get()
	.then((doc) => {
		numberOfDevices = doc.data().length;
	}).catch(error => console.log(error));

	await axios.get("https://openwrt.org/toh/views/toh_extended_all")
	.then((res) => {

		$("tr", ".dataplugin_table", res.data).each((i, element) => {
			let device = {};
			let companyArray = [];

			//skip headings and get device rows
			if (i > 1) {
				if (/(\d\d\.\d\d)|(snapshot)/gmi.test($(".supported_current_rel", $(element).html()).text()) && !(/WIP/gmi.test($(".unsupported_functions", $(element).html()).text()))) {
					let device2 = {};

					device["deviceType"] = $(".device_type", $(element).html()).text();
					device["model"] = $(".model", $(element).html()).text().replace(/\//gmi, "-");
					device["version"] = $(".version", $(element).html()).text();
					device["supportedCurrentRelease"] = $(".supported_current_rel", $(element).html()).text();
					device["specs"] = $(".flash_mb", $(element).html()).text() + "MB Flash, " + $(".ram_mb", $(element).html()).text() + "MB RAM";
					device["LAN"] = /\d/gmi.test($(".ethernet_gbit_ports", $(element).html()).text()) ? "1 Gbps" : "100 Mbps";
					device["modem"] = $(".modem", $(element).html()).text() === "-" ? false : $(".modem", $(element).html()).text();
					device["USB"] = $(".usb_ports", $(element).html()).text() === "-" ? false : $(".usb_ports", $(element).html()).text();
					device["SATA"] = $(".sata_ports", $(element).html()).text() === "-" ? false : $(".sata_ports", $(element).html()).text();
					device["techData"] = "https://openwrt.org" + $("a", ".device_techdata", $(element).html()).attr('href');
					device["notes"] = $(".comments", $(element).html()).text();
					device["unsupportedFunctions"] = $(".unsupported_functions", $(element).html()).text();

					device2 = { ...device };
					companyArray = $(".brand", $(element).html()).text().split("/");

					device["company"] = companyArray[0].trim();
					device["fullName"] = (device.company + " " + device.model + " " + device.version.replace(/\//gmi, "-")).trim();

					deviceArray.push(device);

					//For devices with multiple brands
					if (companyArray[1]) {
						device2["company"] = companyArray[1].trim();
						device2["fullName"] = (device2.company + " " + device2.model + " " + device2.version.replace(/\//gmi, "-")).trim();

						deviceArray.push(device2);
					}
				}
			}
		});
	});

	// console.dir(deviceArray, { "maxArrayLength": null });

	if (deviceArray.length !== numberOfDevices) {
		console.log('OpenWrt device list has been modified!');

		db.collection("mail").add({
			to: "freetherouter@gmail.com",
			message: {
				subject: "OpenWrt has been updated",
				text: "OpenWrt device list has been updated"
			}
		}).then(() => console.log('Queued email for delivery!'));

		await openwrtRef.doc("index").get()
		.then((doc) => {
			fullNameIndex = doc.data().fullNameIndex;
		}).catch(error => console.log(error));

		let arrayLength = deviceArray.length;
		for (let i = 0; i < arrayLength; i++) {
			if (!fullNameIndex.includes(deviceArray[i].fullName)) {
				await openwrtRef.doc(deviceArray[i].fullName).set({
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
					notes: deviceArray[i].notes
				}).catch(error => console.log(error));

				await openwrtRef.doc("index").update({
					fullNameIndex: admin.firestore.FieldValue.arrayUnion(deviceArray[i].fullName)
				}, {merge: true})
				.catch(error => console.log(error));
			}
		}

		await openwrtRef.doc("deviceArrayLength").set({
			length: deviceArray.length
		}).catch(error => console.log(error));

		await openwrtRef.doc("index").set({
			updatedOn: new Date()
		}, {merge: true})
		.catch(error => console.log(error));

	} else {
		console.log("OpenWrt device list has not been modified.");
	}
}

// checkOpenwrt();