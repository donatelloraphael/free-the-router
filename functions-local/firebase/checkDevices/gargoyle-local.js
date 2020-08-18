// Check Only. Manual Update Needed

const axios = require('axios');
const $ = require('cheerio');

const AWS = require('aws-sdk/global');
const dynamo = require('aws-sdk/clients/dynamodb');

const admin = require('firebase-admin');
const serviceAccount = require("../../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const gargoyleRef = db.collection("gargoyle-main-list");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const indicesRef = db.collection("indices");

// exports.checkGargoyle = async function() {
async function checkGargoyleList() {

	let modString = "";

	axios.get("https://www.gargoyle-router.com/wiki/doku.php?id=supported_routers_-_tested_routers")
	.then(async function(res) {
		
		await indicesRef.doc("gargoyle-index").get()
		.then((doc) => {
			if (doc.data()) {
				modString = doc.data().modString;									
			}
		});

		$(".doc", res.data).each((i, element) => {
			let currentUpdationStatus = $(element).text();
		
			if (currentUpdationStatus != modString) {
				
				db.collection("mail").add({
					to: "freetherouter@gmail.com",
					message: {
						subject: "Gargoyle has been updated [Manual Updation needed]",
						text: `Gargoyle device list has been updated. Updation String: ${currentUpdationStatus}`
					}
				}).then(() => console.log('Gargoyle: Queued email for delivery!'));
				
				console.log("[Gargoyle]: Router list has been modified!");
			} else {
				console.log("[Gargoyle]: No modification to supported devices list.");
			}
		});	
	});
}


let extraRouters = [];

async function createExtraRouters() {

	extraRouters.push({
		fullName: "Linksys WRT1200AC v1&v2",
		company: "Linksys",
		model: "WRT1200AC",
		version: "v1&v2",
		specs: "128MB Flash, 512MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "ac1200",
		Flash: 128,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Linksys WRT1900AC v1",
		company: "Linksys",
		model: "WRT1900AC",
		version: "v1",
		specs: "128MB Flash, 256MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "ac1900",
		Flash: 128,
		RAM: 256
	});

	extraRouters.push({
		fullName: "Linksys WRT1900AC v2",
		company: "Linksys",
		model: "WRT1900AC",
		version: "v2",
		specs: "128MB Flash, 512MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "ac1900",
		Flash: 128,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Linksys WRT1900ACS v1&v2",
		company: "Linksys",
		model: "WRT1900ACS",
		version: "v1&v2",
		specs: "128MB Flash, 512MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "ac1900",
		Flash: 128,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Linksys WRT3200ACM v1",
		company: "Linksys",
		model: "WRT3200ACM",
		version: "v1",
		specs: "256MB Flash, 512MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "ac3200",
		Flash: 256,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Linksys WRT32X v1",
		company: "Linksys",
		model: "WRT32X",
		version: "v1",
		specs: "256MB Flash, 512MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "ac3200",
		Flash: 256,
		RAM: 512
	});

	extraRouters.push({
		fullName: "Turris Omnia",
		company: "Turris",
		model: "Omnia",
		version: "",
		specs: "8GB Flash, 1-2GB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "ac1750",
		Flash: 8192,
		RAM: 1024
	});

	extraRouters.push({
		fullName: "GL.iNet AR150",
		company: "GL.iNet",
		model: "AR150",
		version: "",
		specs: "16MB Flash, 64MB RAM",
		USB: true,
		notes: "",
		LAN: "100 Mbps",
		WiFi: "n150",
		Flash: 16,
		RAM: 64
	});

	extraRouters.push({
		fullName: "TP-Link TL-Archer-C7 v2",
		company: "TP-Link",
		model: "TL-Archer-C7",
		version: "v2",
		specs: "16MB Flash, 128MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "ac1750",
		Flash: 16,
		RAM: 128
	});

	extraRouters.push({
		fullName: "TP-Link TL-WDR4300 v1.x",
		company: "TP-Link",
		model: "TL-WDR4300",
		version: "v1.x",
		specs: "8MB Flash, 128MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n750",
		Flash: 8,
		RAM: 128
	});

	extraRouters.push({
		fullName: "TP-Link TL-WDR3600 v1.x",
		company: "TP-Link",
		model: "TL-WDR3600",
		version: "v1.x",
		specs: "8MB Flash, 128MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n600",
		Flash: 8,
		RAM: 128
	});

	extraRouters.push({
		fullName: "TP-Link TL-WR1043ND v2&v3",
		company: "TP-Link",
		model: "TL-WR1043ND",
		version: "v2&v3",
		specs: "8MB Flash, 64MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n450",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "TP-Link TL-WR1043ND v1.x",
		company: "TP-Link",
		model: "TL-WR1043ND",
		version: "v1.x",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs",
		LAN: "1 Gbps",
		WiFi: "n450",
		Flash: 8,
		RAM: 32
	});

	// Info not correct. Router does not exist.

	// extraRouters.push({
	// 	fullName: "TP-Link TL-WDR3700 v2",
	// 	company: "TP-Link",
	// 	model: "TL-WDR3700",
	// 	version: "v2",
	// 	specs: "16MB Flash, 16MB RAM",
	// 	USB: true,
	// 	notes: "Recommended minimum specs"
	// });

	extraRouters.push({
		fullName: "TP-Link TL-WR941ND v2&v3&v4",
		company: "TP-Link",
		model: "TL-WR941ND",
		version: "v2&v3&v4",
		specs: "4MB Flash, 32MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "n300",
		Flash: 4,
		RAM: 32
	});

	extraRouters.push({
		fullName: "TP-Link TL-WR841ND v3-v9",
		company: "TP-Link",
		model: "TL-WR841ND",
		version: "v3-v9",
		specs: "4MB Flash, 32MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "n300",
		Flash: 4,
		RAM: 32
	});

	extraRouters.push({
		fullName: "TP-Link TL-WR741ND v1-v2.4",
		company: "TP-Link",
		model: "TL-WR741ND",
		version: "v1-v2.4",
		specs: "4MB Flash, 32MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "n150",
		Flash: 4,
		RAM: 32
	});

	extraRouters.push({
		fullName: "Buffalo WZR-600DHP",
		company: "Buffalo",
		model: "WZR-600DHP",
		version: "",
		specs: "32MB Flash, 128MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n600",
		Flash: 32,
		RAM: 128
	});

	extraRouters.push({
		fullName: "Buffalo WZR-HP-G300NH",
		company: "Buffalo",
		model: "WZR-HP-G300NH",
		version: "",
		specs: "32MB Flash, 64MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n300",
		Flash: 32,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Netgear WNDR3700 v1",
		company: "Netgear",
		model: "WNDR3700",
		version: "v1",
		specs: "8MB Flash, 64MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n600",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Netgear WNDR3700 v2",
		company: "Netgear",
		model: "WNDR3700",
		version: "v2",
		specs: "16MB Flash, 64MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n600",
		Flash: 16,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Netgear WNDR3700 v4",
		company: "Netgear",
		model: "WNDR3700",
		version: "v4",
		specs: "128MB Flash, 128MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n600",
		Flash: 128,
		RAM: 128
	});

	extraRouters.push({
		fullName: "Netgear WNDR3800",
		company: "Netgear",
		model: "WNDR3800",
		version: "",
		specs: "16MB Flash, 128MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n600",
		Flash: 128,
		RAM: 16
	});

	extraRouters.push({
		fullName: "Netgear WNDR4300 v1",
		company: "Netgear",
		model: "WNDR4300",
		version: "v1",
		specs: "128MB Flash, 128MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n750",
		Flash: 128,
		RAM: 128
	});

	extraRouters.push({
		fullName: "Netgear WNDRMAC v1",
		company: "Netgear",
		model: "WNDRMAC",
		version: "v1",
		specs: "16MB Flash, 64MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n600",
		Flash: 16,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Netgear WNDRMAC v2",
		company: "Netgear",
		model: "WNDRMAC",
		version: "v2",
		specs: "16MB Flash, 128MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "n600",
		Flash: 16,
		RAM: 128
	});

	extraRouters.push({
		fullName: "D-Link DIR-825 B1&B2",
		company: "D-Link",
		model: "DIR-825",
		version: "B1&B2",
		specs: "8MB Flash, 64MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "ac1200",
		Flash: 8,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Ubiquiti Routerstation-Pro",
		company: "Ubiquiti",
		model: "Routerstation Pro",
		version: "",
		specs: "16MB Flash, 128MB RAM",
		USB: true,
		notes: "",
		LAN: "1 Gbps",
		WiFi: "nil",
		Flash: 16,
		RAM: 128
	});

	extraRouters.push({
		fullName: "Ubiquiti Routerstation",
		company: "Ubiquiti",
		model: "Routerstation",
		version: "",
		specs: "16MB Flash, 64MB RAM",
		USB: true,
		notes: "",
		LAN: "100 Mbps",
		WiFi: "nil",
		Flash: 16,
		RAM: 64
	});

	extraRouters.push({
		fullName: "Ubiquiti NanoSt Loco-M2",
		company: "Ubiquiti",
		model: "NanoSt Loco-M2",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: false,
		notes: "Recommended minimum specs",
		LAN: "100 Mbps",
		WiFi: "n150",
		Flash: 8,
		RAM: 32
	});

///////////////////////////////////////////
	extraRouters.push({
		fullName: "Linksys WRT160NL",
		company: "Linksys",
		model: "WRT160NL",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs",
		LAN: "100 Mbps",
		WiFi: "n300",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "Planex MZK-W04NU",
		company: "Planex",
		model: "MZK-W04NU",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs",
		LAN: "100 Mbps",
		WiFi: "n300",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "Asus WL500G Premium v1&v2",
		company: "Asus",
		model: "WL500G Premium",
		version: "v1&v2",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "Linksys WRTSL54GS v1-v3",
		company: "Linksys",
		model: "WRTSL54GS",
		version: "v1-v3",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "Linksys WRT54G-TM",
		company: "Linksys",
		model: "WRT54G-TM",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: false,
		notes: "Recommended minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "Linksys WRT54GS v1-v3",
		company: "Linksys",
		model: "WRT54GS",
		version: "v1-v3",
		specs: "8MB Flash, 32MB RAM",
		USB: false,
		notes: "Recommended minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "Linksys WRT54GL v1-v4",
		company: "Linksys",
		model: "WRT54GL",
		version: "v1-v4",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 4,
		RAM: 16
	});

	extraRouters.push({
		fullName: "Linksys WRT54GS v4",
		company: "Linksys",
		model: "WRT54GS v4",
		version: "v4",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 4,
		RAM: 16
	});

	extraRouters.push({
		fullName: "Rosewill RNX-GX4",
		company: "Rosewill",
		model: "RNX-GX4",
		version: "",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 4,
		RAM: 16
	});

	extraRouters.push({
		fullName: "Netcore NW618",
		company: "Netcore",
		model: "NW618",
		version: "",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 4,
		RAM: 16
	});

	extraRouters.push({
		fullName: "Motorola WR850G v1-v3",
		company: "Motorola",
		model: "WR850G",
		version: "v1-v3",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 4,
		RAM: 16
	});

	extraRouters.push({
		fullName: "Motorola WE800G v1",
		company: "Motorola",
		model: "WE800G",
		version: "v1",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 4,
		RAM: 16
	});

	extraRouters.push({
		fullName: "Buffalo WBR2-G54",
		company: "Buffalo",
		model: "WBR2-G54",
		version: "",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 4,
		RAM: 16
	});

	extraRouters.push({
		fullName: "La Fonera Accton MR3201A",
		company: "La Fonera",
		model: "Accton MR3201A",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: false,
		notes: "Recommended minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "La Fonera 2 v2202",
		company: "La Fonera",
		model: "La Fonera 2",
		version: "v2202",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 8,
		RAM: 32
	});

	extraRouters.push({
		fullName: "La Fonera v2100-v2200",
		company: "La Fonera",
		model: "La Fonera",
		version: "v2100-v2200",
		specs: "8MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 8,
		RAM: 16
	});

	extraRouters.push({
		fullName: "La Fonera+ v2201",
		company: "La Fonera",
		model: "La Fonera+",
		version: "v2201",
		specs: "8MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 8,
		RAM: 16
	});

	extraRouters.push({
		fullName: "D-Link DIR-300 Rev.A",
		company: "D-Link",
		model: "DIR-300",
		version: "Rev.A",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 4,
		RAM: 16
	});

	extraRouters.push({
		fullName: "Ubiquiti Nanostation 2",
		company: "Ubiquiti",
		model: "Nanostation 2",
		version: "",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs",
		LAN: "100 Mbps",
		WiFi: "g54",
		Flash: 4,
		RAM: 16
	});

}


async function uploadExtraRouters() {

	let dbDeviceList = [];
	let dbAllRoutersList = [];

	await indicesRef.doc("gargoyle-index").get()
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

			gargoyleRef.doc(extraRouters[i].fullName).set({
				fullName: extraRouters[i].fullName,
				company: extraRouters[i].company,
				model: extraRouters[i].model,
				version: extraRouters[i].version,
				LAN: extraRouters[i].LAN,
				USB: extraRouters[i].USB,
				WiFi: extraRouters[i].WiFi,
				specs: extraRouters[i].specs,
				notes: extraRouters[i].notes,
				Flash: extraRouters[i].Flash,
				RAM: extraRouters[i].RAM
			}, {merge: true});

			indicesRef.doc("gargoyle-index").set({
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
					gargoyleSupport: true,
					gargoyleSupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version ? extraRouters[i].version : "default"),
					gargoyleNotes: extraRouters[i].notes,
					Flash: extraRouters[i].Flash,
					RAM: extraRouters[i].RAM
				}, {merge: true});

				indicesRef.doc("all-routers-index").set({
					fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel)
				}, {merge: true});

			} else {
				// Only need some fields if router already exists in list
				allFirmwareRoutersRef.doc(companyModel).set({
					gargoyleNotes: extraRouters[i].notes,																					
					gargoyleSupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version ? extraRouters[i].version : "default"),
					gargoyleSupport: true,	
					WiFi: extraRouters[i].WiFi,
					Flash: extraRouters[i].Flash,
					RAM: extraRouters[i].RAM
				}, {merge: true});

				allFirmwareRoutersRef.doc(companyModel).update({
					[`specs.${extraRouters[i].version ? extraRouters[i].version : "default"}`]: extraRouters[i].specs,
					[`LAN.${extraRouters[i].version ? extraRouters[i].version : "default"}`]: extraRouters[i].LAN,											
					[`USB.${extraRouters[i].version ? extraRouters[i].version : "default"}`]: extraRouters[i].USB
				}, {merge: true});

			}
		}
	}

	indicesRef.doc("gargoyle-index").set({
		updatedOn: new Date()
	}, {merge: true});

	indicesRef.doc("all-routers-index").set({
		updatedOn: new Date()
	}, {merge: true});

	setModString();
}

async function setModString() {
	let currentUpdationStatus = "";

	await axios.get("https://www.gargoyle-router.com/wiki/doku.php?id=supported_routers_-_tested_routers")
	.then((res) => {
		currentUpdationStatus = $(".doc", res.data).text();
	});

	indicesRef.doc("gargoyle-index").set({
		modString: currentUpdationStatus
	}, {merge: true});
}

// checkGargoyle();
createExtraRouters();
uploadExtraRouters();
setModString();