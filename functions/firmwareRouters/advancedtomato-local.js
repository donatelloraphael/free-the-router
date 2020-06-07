// Check only [Manual Update needed]

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const advancedtomatoRef = db.collection("advancedtomato-main-list");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const indicesRef = db.collection("indices");

// exports.checkAdvancedtomato = async function() {
async function checkAdvancedtomato() {

	let routerList = [];
	let nameIndex = [];

	await axios.get("https://advancedtomato.com/downloads")
	.then((res) => {
		$(".router-name", res.data).each((i, element) => {
			let routerVersion = $(element).text().match(/v\d/gmi) ? $(element).text().match(/v\d/gmi)[0] : "";
			let routerModel = $(element).text().split(/v\d/gmi)[0];

			routerList.push((routerModel + " " + routerVersion).trim());
		});
	}).catch(error => {
		console.log(error);
		return false;
	});
	
	await indicesRef.doc("advancedtomato-index").get()
	.then(doc => {
		if (doc.data()) {
			nameIndex = doc.data().fullNameIndex;										
		}
	}).catch(error => {
		console.log(error);
		return false;
	});

	let newDevices = [];
	let isModified = false;

	for (let i = 0; i < routerList.length; i++) {
		// console.log(routerList[i]);

		if (!nameIndex.includes(routerList[i])) {
			newDevices.push(routerList[i]);
			isModified = true;
		}
	}

	if (isModified) {
		db.collection("mail").add({
			to: "freetherouter@gmail.com",
			message: {
				subject: "AdvancedTomato has been updated [Manual Update required]",
				text: `AdvancedTomato device list has been updated [Manual Update required]. New Devices: ${newDevices}`
			}
		}).then(() => console.log('Advanced Tomato: Queued email for delivery!'));
	} else {
		console.log("AdvancedTomato device list has not been modified.");
	}
}


/////////////////////Manually Adding Routers////////////////////////////////
////////////////////////////////////////////////////////////////////////////

let extraRouters = [];

async function createExtraRouters() {

	extraRouters.push({
		fullName: "Asus RT-AC3200",
		company: "Asus",
		model: "RT-AC3200",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac3200",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-AC56U",
		company: "Asus",
		model: "RT-AC56U",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1200",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-AC66U",
		company: "Asus",
		model: "RT-AC66U",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1750",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-AC68U",
		company: "Asus",
		model: "RT-AC68U",
		version: "",
		specs: "128Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1900",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-AC68R",
		company: "Asus",
		model: "RT-AC68R",
		version: "",
		specs: "128Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1900",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-N10U",
		company: "Asus",
		model: "RT-N10U",
		version: "A1&B1&C1",
		specs: "8MB Flash, 32MB RAM",
		LAN: "100 Mbps",
		USB: true,
		WiFi: "n150",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-N16",
		company: "Asus",
		model: "RT-N16",
		version: "",
		specs: "32MB Flash, 128MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n300",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-N18U",
		company: "Asus",
		model: "RT-N18U",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n600",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-N53",
		company: "Asus",
		model: "RT-N53",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		LAN: "100 Mbps",
		USB: false,
		WiFi: "n600",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-N66U",
		company: "Asus",
		model: "RT-N66U",
		version: "A1&B1",
		specs: "32MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n900",
		notes: ""
	});

	extraRouters.push({
		fullName: "D-LINK DIR-868L",
		company: "D-Link",
		model: "DIR-868L",
		version: "",
		specs: "128MB Flash, 128MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1750",
		notes: ""
	});

	extraRouters.push({
		fullName: "D-LINK DIR868L",
		company: "D-Link",
		model: "DIR868L",
		version: "",
		specs: "128MB Flash, 128MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1750",
		notes: ""
	});

	extraRouters.push({
		fullName: "Huawei WS880",
		company: "Hauwei",
		model: "WS880",
		version: "",
		specs: "128MB Flash, 128MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1750",
		notes: ""
	});

	extraRouters.push({
		fullName: "Linksys E1550",
		company: "Linksys",
		model: "E1550",
		version: "",
		specs: "16MB Flash, 64MB RAM",
		LAN: "100 Mbps",
		USB: true,
		WiFi: "n300",
		notes: ""
	});

	extraRouters.push({
		fullName: "Linksys E2500 v1",
		company: "Linksys",
		model: "E2500",
		version: "v1",
		specs: "8MB Flash, 64MB RAM",
		LAN: "100 Mbps",
		USB: false,
		WiFi: "n300",
		notes: ""
	});

	extraRouters.push({
		fullName: "Linksys E2500 v3",
		company: "Linksys",
		model: "E2500",
		version: "v3",
		specs: "16MB Flash, 64MB RAM",
		LAN: "100 Mbps",
		USB: true,
		WiFi: "n600",
		notes: ""
	});

	extraRouters.push({
		fullName: "Linksys E3200",
		company: "Linksys",
		model: "E3200",
		version: "",
		specs: "16MB Flash, 64MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n600",
		notes: ""
	});

	extraRouters.push({
		fullName: "Linksys E4200",
		company: "Linksys",
		model: "E4200",
		version: "",
		specs: "16MB Flash, 64MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n750",
		notes: ""
	});

	extraRouters.push({
		fullName: "Linksys EA6500 v2",
		company: "Linksys",
		model: "EA6500",
		version: "v2",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1750",
		notes: ""
	});

	extraRouters.push({
		fullName: "Linksys EA6700",
		company: "Linksys",
		model: "EA6700",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1750",
		notes: ""
	});

	extraRouters.push({
		fullName: "Linksys EA6900",
		company: "Linksys",
		model: "EA6900",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1900",
		notes: ""
	});

	extraRouters.push({
		fullName: "NETGEAR R6250",
		company: "Netgear",
		model: "R6250",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1600",
		notes: ""
	});

	extraRouters.push({
		fullName: "NETGEAR R6300 v2",
		company: "Netgear",
		model: "R6300",
		version: "v2",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1750",
		notes: ""
	});

	extraRouters.push({
		fullName: "NETGEAR R6400",
		company: "Netgear",
		model: "R6400",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1750",
		notes: ""
	});

	extraRouters.push({
		fullName: "NETGEAR R7000",
		company: "Netgear",
		model: "R7000",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1900",
		notes: ""
	});

	extraRouters.push({
		fullName: "NETGEAR R8000",
		company: "Netgear",
		model: "R8000",
		version: "",
		specs: "128MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac3200",
		notes: ""
	});

	extraRouters.push({
		fullName: "NETGEAR WNDR3700 v3",
		company: "Netgear",
		model: "WNDR3700",
		version: "v3",
		specs: "8MB Flash, 64MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n600",
		notes: ""
	});

	extraRouters.push({
		fullName: "NETGEAR WNR3500L v2",
		company: "Netgear",
		model: "WNR3500L",
		version: "v2",
		specs: "128MB Flash, 128MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n300",
		notes: ""
	});

	extraRouters.push({
		fullName: "Tenda N6",
		company: "Tenda",
		model: "N6",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		LAN: "100 Mbps",
		USB: false,
		WiFi: "n600",
		notes: ""
	});

	extraRouters.push({
		fullName: "Tenda N60",
		company: "Tenda",
		model: "N60",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "n600",
		notes: ""
	});

	extraRouters.push({
		fullName: "Tenda W1800R",
		company: "Tenda",
		model: "W1800R",
		version: "",
		specs: "16MB Flash, 256MB RAM",
		LAN: "1 Gbps",
		USB: true,
		WiFi: "ac1750",
		notes: ""
	});

}

async function uploadExtraRouters() {

	let dbDeviceList = [];
	let dbAllRoutersList = [];

	await indicesRef.doc("advancedtomato-index").get()
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

			advancedtomatoRef.doc(extraRouters[i].fullName).set({
				fullName: extraRouters[i].fullName,
				company: extraRouters[i].company,
				model: extraRouters[i].model,
				version: extraRouters[i].version,
				LAN: extraRouters[i].LAN,
				USB: extraRouters[i].USB,
				WiFi: extraRouters[i].WiFi,
				specs: extraRouters[i].specs,
				notes: extraRouters[i].notes
			}, {merge: true});

			indicesRef.doc("advancedtomato-index").set({
				fullNameIndex: admin.firestore.FieldValue.arrayUnion(extraRouters[i].fullName)
			}, {merge: true});

			// Add routers to aggragated router list supporting all firmwares/////
			//////////////////////////////////////////////////////////////////////

			let companyModel = ((extraRouters[i].company + " " + extraRouters[i].model).replace(/\//gi, "&")).toUpperCase();
			
			if (!(dbAllRoutersList.includes(companyModel))) {
				allFirmwareRoutersRef.doc(companyModel).set({
					fullName: companyModel,
					company: extraRouters[i].company,
					model: extraRouters[i].model,
					LAN: {[extraRouters[i].version ? extraRouters[i].version : "default"]: extraRouters[i].LAN},											
					USB: {[extraRouters[i].version ? extraRouters[i].version : "default"]: extraRouters[i].USB},											
					WiFi: extraRouters[i].WiFi,
					specs: {[extraRouters[i].version ? extraRouters[i].version : "default"]: extraRouters[i].specs},
					advancedtomatoSupport: true,
					advancedtomatoSupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version ? extraRouters[i].version : "default"),
					advancedtomatoNotes: extraRouters[i].notes
				}, {merge: true});

				indicesRef.doc("all-routers-index").update({
					fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel)
				}, {merge: true});

			} else {
				// Only need some fields if router already exists in list
				allFirmwareRoutersRef.doc(companyModel).set({
					advancedtomatoNotes: extraRouters[i].notes,																					
					advancedtomatoSupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version ? extraRouters[i].version : "default"),
					advancedtomatoSupport: true,	
					WiFi: extraRouters[i].WiFi,
				}, {merge: true});

				allFirmwareRoutersRef.doc(companyModel).update({
					[`specs.${extraRouters[i].version ? extraRouters[i].version : "default"}`]: extraRouters[i].specs,
					[`LAN.${extraRouters[i].version ? extraRouters[i].version : "default"}`]: extraRouters[i].LAN,											
					[`USB.${extraRouters[i].version ? extraRouters[i].version : "default"}`]: extraRouters[i].USB
				}, {merge: true});

			}
		}
	}

	indicesRef.doc("advancedtomato-index").set({
		updatedOn: new Date()
	}, {merge: true});

	indicesRef.doc("all-routers-index").set({
		updatedOn: new Date()
	}, {merge: true});

}


// checkAdvancedtomato();
// createExtraRouters();
// uploadExtraRouters();