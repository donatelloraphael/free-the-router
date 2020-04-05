const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const openwrtRef = db.collection("openwrt-main-list");

// exports.checkOpenwrt = async function() {
async function checkOpenwrt() {
	let lastModified = "";
	let currentModified = "";

	await openwrtRef.doc("lastModified").get()
	.then((doc) => {
		lastModified = doc.data().modString;
	}).catch(error => console.log(error));

	await axios.get("https://openwrt.org/toh/views/toh_extended_all")
	.then((res) => {
		currentModified = $(".docInfo", res.data).text().trim();

		if (!(lastModified === currentModified)) {
			console.log("OpenWrt device list has been modified!");

			// db.collection("mail").add({
			// 	to: "freetherouter@gmail.com",
			// 	message: {
			// 		subject: "OpenWrt has been updated",
			// 		text: "OpenWrt device list has been updated"
			// 	}
			// }).then(() => console.log('Queued email for delivery!'));

			// openwrtRef.doc("lastModified").set({
			// 	modString: currentModified
			// }).catch(error => console.log(error));

			getOpenwrtList(res.data);
		} else {
			console.log('Device list has not been modified.');
		}
	}).catch(error => console.log(error));
}

async function getOpenwrtList(html) {
	let deviceArray = [];

	$("tr", ".dataplugin_table", html).each((i, element) => {
		let device = {};
		//skip headings and get device rows
		if (i > 1) {
			device["deviceType"] = $(".device_type", $(element).html()).text();
			device["company"] = $(".brand", $(element).html()).text();
			device["model"] = $(".model", $(element).html()).text();
			device["version"] = $(".version", $(element).html()).text();
			device["fullName"] = device.company + " " + device.model + " " + device.version.replace(/\//gmi, "-").trim();
			device["supportedCurrentRelease"] = $(".supported_current_rel", $(element).html()).text();
			device["specs"] = $(".flash_mb", $(element).html()).text() + "MB Flash, " + $(".ram_mb", $(element).html()).text() + "MB RAM";
			device["LAN"] = typeof Number($(".ethernet_gbit_ports", $(element).html()).text()) === 'number' ? "1 Gbps" : "100 Mbps";
			device["modem"] = $(".modem", $(element).html()).text() === "-" ? false : $(".modem", $(element).html()).text();
			device["USB"] = $(".usb_ports", $(element).html()).text() === "-" ? false : $(".usb_ports", $(element).html()).text();
			device["SATA"] = $(".sata_ports", $(element).html()).text() === "-" ? false : $(".sata_ports", $(element).html()).text();
			device["techData"] = "https://openwrt.org" + $("a", ".device_techdata", $(element).html()).attr('href');
			device["notes"] = $(".comments", $(element).html()).text();

			deviceArray.push(device);
		}
	})
	console.dir(deviceArray, { "maxArrayLength": null });
}

checkOpenwrt();