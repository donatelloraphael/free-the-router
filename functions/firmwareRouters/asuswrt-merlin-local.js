const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

let merlinRef = db.collection("asuswrt-merlin-main-list");
let allFirmwareRoutersRef = db.collection("all-firmware-routers");
let indicesRef = db.collection("indices");


// exports.checkAsusMerlin = async function() {
async function checkAsusMerlin() {
	let fullNameIndex = [];
	let routerList = [];

	await axios.get("https://sourceforge.net/projects/asuswrt-merlin/files/")
		.then((res) => {
			$(".name", res.data).each((i, element) => {
				let innerText = $(element).text();
				if (innerText != "Documentation" && innerText != "README.TXT") {
					routerList.push("Asus " + innerText.replace("_", " "));
				}
			});
		});

	await indicesRef.doc("asuswrt-merlin-index").get()
	.then((doc) => {
		if (doc.data()) {
			fullNameIndex = doc.data().fullNameIndex;
		}
	});
	
	let newRouters = [];
	let isModified = false;

	for (let i = 0; i < routerList.length; i++) {

		if (!fullNameIndex.includes(routerList[i])) {
			newRouters.push(routerList[i]);
			isModified = true;
		}
	}
	
	if (isModified) {
		db.collection("mail").add({
			to: "freetherouter@gmail.com",
			message: {
				subject: "Asuswrt-Merlin list has changed",
				text: `Asuswrt-Merlin device list has been updated. New devices: ${newRouters}`
			}
		}).then(() => {
			console.log('Queued email for delivery!');
			console.log('Asuswrt-Merlin list has changed!');
		});

	}	else {
		console.log("Asuswrt-Merlin list has not been modified.");
	}
}

let extraRouters = [];

function createExtraRouters() {
	extraRouters.push({
		fullName: "Asus RT-AX56U",
		company: "Asus",
		model: "RT-AX56U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "16MB Flash, 256MB RAM",
		notes: "U, R and W variants are all supported",
		Flash: 16,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Asus RT-AX58U",
		company: "Asus",
		model: "RT-AX58U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "256MB Flash, 512MB RAM",
		notes: "U, R and W variants are all supported",
		Flash: 256,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Asus RT-AX3000",
		company: "Asus",
		model: "RT-AX3000",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "256MB Flash, 512MB RAM",
		notes: "U, R and W variants are all supported",
		Flash: 256,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Asus RT-AX88U",
		company: "Asus",
		model: "RT-AX88U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "256MB Flash, 1GB RAM",
		notes: "U, R and W variants are all supported",
		Flash: 256,
		RAM: 1024
	});

	extraRouters.push({
		fullName: "Asus RT-AC66U B1",
		company: "Asus",
		model: "RT-AC66U",
		version: "B1",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 256MB RAM",
		notes: "same firmware as the RT-AC68U. U, R and W variants are all supported",
		Flash: 128,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Asus RT-AC86U",
		company: "Asus",
		model: "RT-AC86U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "256MB Flash, 512MB RAM",
		notes: "same firmware as the RT-AC68U. U, R and W variants are all supported",
		Flash: 256,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Asus RT-AC87U",
		company: "Asus",
		model: "RT-AC87U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 256MB RAM",
		notes: "starting with version 382.1. U, R and W variants are all supported",
		Flash: 128,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Asus RT-N66U",
		company: "Asus",
		model: "RT-N66U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "32MB Flash, 256MB RAM",
		notes: "supported only by older versions of firmware. U, R and W variants are all supported",
		Flash: 32,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Asus RT-AC1900",
		company: "Asus",
		model: "RT-AC1900",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 256MB RAM",
		notes: "same firmware as RT-AC68U. U, R and W variants are all supported",
		Flash: 128,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Asus RT-AC1900P",
		company: "Asus",
		model: "RT-AC1900P",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 256MB RAM",
		notes: "same firmware as RT-AC68U. U, R and W variants are all supported",
		Flash: 128,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Asus RT-AC5300",
		company: "Asus",
		model: "RT-AC5300",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 512MB RAM",
		notes: "U, R and W variants are all supported",
		Flash: 128,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Asus RT-AC3200",
		company: "Asus",
		model: "RT-AC3200",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 256MB RAM",
		notes: "U, R and W variants are all supported",
		Flash: 128,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Asus RT-AC3100",
		company: "Asus",
		model: "RT-AC3100",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 512MB RAM",
		notes: "U, R and W variants are all supported",
		Flash: 128,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Asus RT-AC88U",
		company: "Asus",
		model: "RT-AC88U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 512MB RAM",
		notes: "U, R and W variants are all supported",
		Flash: 128,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Asus RT-AC68U",
		company: "Asus",
		model: "RT-AC68U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 256MB RAM",
		notes: "Including revisions C1 and E1. U, R and W variants are all supported",
		Flash: 128,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Asus RT-AC66U",
		company: "Asus",
		model: "RT-AC66U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 256MB RAM",
		notes: "Only supported by older versions of firmware. U, R and W variants are all supported",
		Flash: 128,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Asus RT-AC56U",
		company: "Asus",
		model: "RT-AC56U",
		version: "",
		LAN: "",
		USB: "",
		WiFi: "",
		specs: "128MB Flash, 256MB RAM",
		notes: "Only supported by older versions of firmware. U, R and W variants are all supported",
		Flash: 128,
		RAM: 256
	});
}

async function uploadExtraRouters() {

	let dbDeviceList = [];
	let dbAllRoutersList = [];

	await indicesRef.doc("asuswrt-merlin-index").get()
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
	let isModified = false;

	for (let i = 0; i < extraRouters.length; i++) {

		////////////Add to Freshtomato routers list////////////////////////		

		if (!(dbDeviceList.includes(extraRouters[i].fullName))) {

			isModified = true;

			merlinRef.doc(extraRouters[i].fullName).set({
				fullName: extraRouters[i].fullName,
				company: extraRouters[i].company,
				model: extraRouters[i].model,
				version: extraRouters[i].version,
				LAN: extraRouters[i].LAN ? extraRouters[i].LAN : "",
				USB: extraRouters[i].USB ? extraRouters[i].USB : "",
				WiFi: extraRouters[i].WiFi ? extraRouters[i].WiFi: "",
				specs: extraRouters[i].specs,
				notes: extraRouters[i].notes,
				Flash: extraRouters[i].Flash,
				RAM: extraRouters[i].RAM
			}, {merge: true});

			await indicesRef.doc("asuswrt-merlin-index").set({
				fullNameIndex: admin.firestore.FieldValue.arrayUnion(extraRouters[i].fullName)
			}, {merge: true});

			// Add routers to aggragated router list supporting all firmwares/////
			//////////////////////////////////////////////////////////////////////

			let companyModel = ((extraRouters[i].company + " " + extraRouters[i].model.replace(/-/gm, " ")).replace(/\//gi, " ")).trim().toUpperCase();
			
			if (!(dbAllRoutersList.includes(companyModel))) {
				allFirmwareRoutersRef.doc(companyModel).set({
					fullName: companyModel,
					company: extraRouters[i].company,
					model: extraRouters[i].model,
					LAN: {[extraRouters[i].version ? extraRouters[i].version : "default"]: extraRouters[i].LAN},											
					USB: {[extraRouters[i].version ? extraRouters[i].version : "default"]: extraRouters[i].USB},											
					WiFi: extraRouters[i].WiFi,
					specs: {[extraRouters[i].version ? extraRouters[i].version : "default"]: extraRouters[i].specs},
					asusMerlinSupport: true,
					asusMerlinSupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version ? extraRouters[i].version : "default"),
					asusMerlinNotes: extraRouters[i].notes,
					Flash: extraRouters[i].Flash,
					RAM: extraRouters[i].RAM
				}, {merge: true});

				indicesRef.doc("all-routers-index").update({
					fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel)
				}, {merge: true});

			} else {
				// Only need some fields if router already exists in list
				allFirmwareRoutersRef.doc(companyModel).set({	
					asusMerlinNotes: extraRouters[i].notes,																					
					asusMerlinSupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version ? extraRouters[i].version : "default"),
					asusMerlinSupport: true,
					Flash: extraRouters[i].Flash,
					RAM: extraRouters[i].RAM
				}, {merge: true});

				allFirmwareRoutersRef.doc(companyModel).update({
					[`specs.${extraRouters[i].version ? extraRouters[i].version : "default"}`]: extraRouters[i].specs
				}, {merge: true});

			}
		}
	}

	if (isModified) {
		console.log('AsusWRT Merlin has been updated!');

		indicesRef.doc("asuswrt-merlin-index").set({
			updatedOn: new Date()
		}, {merge: true});

		indicesRef.doc("all-routers-index").set({
			updatedOn: new Date()
		}, {merge: true});
	} else {
		console.log("AsusWRT Merlin has not been updated.");
	}

}

// checkAsusMerlin();
// createExtraRouters();
// uploadExtraRouters();


