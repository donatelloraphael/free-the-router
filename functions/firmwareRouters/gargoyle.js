const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
}, "gargoyle");
const db = admin.firestore();

const gargoyleRef = db.collection("gargoyle-main-list");

exports.checkGargoyleList = async function() {
// async function checkGargoyleList() {
	axios.get("https://www.gargoyle-router.com/wiki/doku.php?id=supported_routers_-_tested_routers")
	.then(async function(res) {
		let updatedOn = await gargoyleRef.doc("index").get()
										.then((doc) => {
											return doc.data().updatedOn;
										})


		$(".doc", res.data).each((i, element) => {
			let currentUpdationStatus = $(element).text();
		
			if (currentUpdationStatus != updatedOn) {
				gargoyleRef.doc("index").set({
					updatedOn: currentUpdationStatus
				}, {merge: true});
				console.log("Router list was modified!");
			} else {
				console.log("No modification to supported devices list.")
			}
		})		
	})
}

// checkGargoyleList();

async function populateRouterList() {
	gargoyleRef.doc("Linksys WRT1200AC v1&v2").set({
		fullName: "Linksys WRT1200AC v1&v2",
		company: "Linksys",
		model: "WRT1200AC v1&v2",
		version: "v1&v2",
		specs: "128MB Flash, 512MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT1200AC v1&v2")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT1900AC v1").set({
		fullName: "Linksys WRT1900AC v1",
		company: "Linksys",
		model: "WRT1900AC v1",
		version: "v1",
		specs: "128MB Flash, 256MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT1900AC v1")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT1900AC v2").set({
		fullName: "Linksys WRT1900AC v2",
		company: "Linksys",
		model: "WRT1900AC v2",
		version: "v2",
		specs: "128MB Flash, 512MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT1900AC v2")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT1900ACS v1&v2").set({
		fullName: "Linksys WRT1900ACS v1&v2",
		company: "Linksys",
		model: "WRT1900ACS v1&v2",
		version: "v1&v2",
		specs: "128MB Flash, 512MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT1900ACS v1&v2")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT3200ACM v1").set({
		fullName: "Linksys WRT3200ACM v1",
		company: "Linksys",
		model: "WRT3200ACM v1",
		version: "v1",
		specs: "256MB Flash, 512MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT3200ACM v1")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT32X v1").set({
		fullName: "Linksys WRT32X v1",
		company: "Linksys",
		model: "WRT32X v1",
		version: "v1",
		specs: "256MB Flash, 512MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT32X v1")
	}, {merge: true});

	gargoyleRef.doc("Turris Omnia").set({
		fullName: "Turris Omnia",
		company: "Turris",
		model: "Omnia",
		version: "",
		specs: "8GB Flash, 1-2GB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Turris Omnia")
	}, {merge: true});

	gargoyleRef.doc("GL.iNet AR150").set({
		fullName: "GL.iNet AR150",
		company: "GL.iNet",
		model: "AR150",
		version: "",
		specs: "16MB Flash, 64MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("GL.iNet AR150")
	}, {merge: true});

	gargoyleRef.doc("TP-Link TL-Archer-C7 v2").set({
		fullName: "TP-Link TL-Archer-C7 v2",
		company: "TP-Link",
		model: "TL-Archer-C7",
		version: "v2",
		specs: "16MB Flash, 128MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("TP-Link TL-Archer-C7 v2")
	}, {merge: true});

	gargoyleRef.doc("TP-Link TL-WDR4300 v1.x").set({
		fullName: "TP-Link TL-WDR4300 v1.x",
		company: "TP-Link",
		model: "TL-WDR4300",
		version: "v1.x",
		specs: "8MB Flash, 128MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("TP-Link TL-WDR4300 v1.x")
	}, {merge: true});

	gargoyleRef.doc("TP-Link TL-WDR3600 v1.x").set({
		fullName: "TP-Link TL-WDR3600 v1.x",
		company: "TP-Link",
		model: "TL-WDR3600",
		version: "v1.x",
		specs: "8MB Flash, 128MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("TP-Link TL-WDR3600 v1.x")
	}, {merge: true});

	gargoyleRef.doc("TP-Link TL-WR1043ND v2&v3").set({
		fullName: "TP-Link TL-WR1043ND v2&v3",
		company: "TP-Link",
		model: "TL-WR1043ND",
		version: "v2&v3",
		specs: "8MB Flash, 64MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("TP-Link TL-WR1043ND v2&v3")
	}, {merge: true});

	gargoyleRef.doc("TP-Link TL-WR1043ND v1.x").set({
		fullName: "TP-Link TL-WR1043ND v1.x",
		company: "TP-Link",
		model: "TL-WR1043ND",
		version: "v1.x",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("TP-Link TL-WR1043ND v1.x")
	}, {merge: true});

	gargoyleRef.doc("TP-Link TL-WDR3700 v2").set({
		fullName: "TP-Link TL-WDR3700 v2",
		company: "TP-Link",
		model: "TL-WDR3700",
		version: "v2",
		specs: "16MB Flash, 16MB RAM",
		USB: true,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("TP-Link TL-WDR3700 v2")
	}, {merge: true});

	gargoyleRef.doc("TP-Link TL-WR941ND v2&v3&v4").set({
		fullName: "TP-Link TL-WR941ND v2&v3&v4",
		company: "TP-Link",
		model: "TL-WR941ND",
		version: "v2&v3&v4",
		specs: "4MB Flash, 32MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("TP-Link TL-WR941ND v2&v3&v4")
	}, {merge: true});

	gargoyleRef.doc("TP-Link TL-WR841ND v3-v9").set({
		fullName: "TP-Link TL-WR841ND v3-v9",
		company: "TP-Link",
		model: "TL-WR841ND",
		version: "v3-v9",
		specs: "4MB Flash, 32MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("TP-Link TL-WR841ND v3-v9")
	}, {merge: true});

	gargoyleRef.doc("TP-Link TL-WR741ND v1-v2.4").set({
		fullName: "TP-Link TL-WR741ND v1-v2.4",
		company: "TP-Link",
		model: "TL-WR741ND",
		version: "v1-v2.4",
		specs: "4MB Flash, 32MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("TP-Link TL-WR741ND v1-v2.4")
	}, {merge: true});

	gargoyleRef.doc("Buffalo WZR-600DHP").set({
		fullName: "Buffalo WZR-600DHP",
		company: "Buffalo",
		model: "WZR-600DHP",
		version: "",
		specs: "32MB Flash, 128MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Buffalo WZR-600DHP")
	}, {merge: true});

	gargoyleRef.doc("Buffalo WZR-HP-G300NH").set({
		fullName: "Buffalo WZR-HP-G300NH",
		company: "Buffalo",
		model: "WZR-HP-G300NH",
		version: "",
		specs: "32MB Flash, 64MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Buffalo WZR-HP-G300NH")
	}, {merge: true});

	gargoyleRef.doc("Netgear WNDR3700 v1").set({
		fullName: "Netgear WNDR3700 v1",
		company: "Netgear",
		model: "WNDR3700",
		version: "v1",
		specs: "8MB Flash, 64MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netgear WNDR3700 v1")
	}, {merge: true});

	gargoyleRef.doc("Netgear WNDR3700 v2").set({
		fullName: "Netgear WNDR3700 v2",
		company: "Netgear",
		model: "WNDR3700",
		version: "v2",
		specs: "16MB Flash, 64MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netgear WNDR3700 v2")
	}, {merge: true});

	gargoyleRef.doc("Netgear WNDR3700 v4").set({
		fullName: "Netgear WNDR3700 v4",
		company: "Netgear",
		model: "WNDR3700",
		version: "v4",
		specs: "128MB Flash, 128MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netgear WNDR3700 v4")
	}, {merge: true});

	gargoyleRef.doc("Netgear WNDR3800").set({
		fullName: "Netgear WNDR3800",
		company: "Netgear",
		model: "WNDR3800",
		version: "",
		specs: "16MB Flash, 128MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netgear WNDR3800")
	}, {merge: true});

	gargoyleRef.doc("Netgear WNDR4300 v1").set({
		fullName: "Netgear WNDR4300 v1",
		company: "Netgear",
		model: "WNDR4300",
		version: "v1",
		specs: "128MB Flash, 128MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netgear WNDR4300 v1")
	}, {merge: true});

	gargoyleRef.doc("Netgear WNDRMAC v1").set({
		fullName: "Netgear WNDRMAC v1",
		company: "Netgear",
		model: "WNDRMAC",
		version: "v1",
		specs: "16MB Flash, 64MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netgear WNDRMAC v1")
	}, {merge: true});

	gargoyleRef.doc("Netgear WNDRMAC v2").set({
		fullName: "Netgear WNDRMAC v2",
		company: "Netgear",
		model: "WNDRMAC",
		version: "v2",
		specs: "16MB Flash, 128MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netgear WNDRMAC v2")
	}, {merge: true});

	gargoyleRef.doc("D-Link DIR-825 B1&B2").set({
		fullName: "D-Link DIR-825 B1&B2",
		company: "D-Link",
		model: "DIR-825",
		version: "B1&B2",
		specs: "8MB Flash, 64MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("D-Link DIR-825 B1&B2")
	}, {merge: true});

	gargoyleRef.doc("Ubiquiti Routerstation Pro").set({
		fullName: "Ubiquiti Routerstation-Pro",
		company: "Ubiquiti",
		model: "Routerstation Pro",
		version: "",
		specs: "16MB Flash, 128MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Ubiquiti Routerstation Pro")
	}, {merge: true});

	gargoyleRef.doc("Ubiquiti Routerstation").set({
		fullName: "Ubiquiti Routerstation",
		company: "Ubiquiti",
		model: "Routerstation",
		version: "",
		specs: "16MB Flash, 64MB RAM",
		USB: true,
		notes: ""
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Ubiquiti Routerstation")
	}, {merge: true});

	gargoyleRef.doc("Ubiquiti NanoSt Loco-M2").set({
		fullName: "Ubiquiti NanoSt Loco-M2",
		company: "Ubiquiti",
		model: "NanoSt Loco-M2",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: false,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Ubiquiti NanoSt Loco-M2")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT160NL").set({
		fullName: "Linksys WRT160NL",
		company: "Linksys",
		model: "WRT160NL",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT160NL")
	}, {merge: true});

	gargoyleRef.doc("Planex MZK-W04NU").set({
		fullName: "Planex MZK-W04NU",
		company: "Planex",
		model: "MZK-W04NU",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Planex MZK-W04NU")
	}, {merge: true});

	gargoyleRef.doc("Asus WL500G Premium v1&v2").set({
		fullName: "Asus WL500G Premium v1&v2",
		company: "Asus",
		model: "WL500G Premium",
		version: "v1&v2",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Asus WL500G Premium v1&v2")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRTSL54GS v1-v3").set({
		fullName: "Linksys WRTSL54GS v1-v3",
		company: "Linksys",
		model: "WRTSL54GS",
		version: "v1-v3",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRTSL54GS v1-v3")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT54G-TM").set({
		fullName: "Linksys WRT54G-TM",
		company: "Linksys",
		model: "WRT54G-TM",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: false,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT54G-TM")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT54GS v1-v3").set({
		fullName: "Linksys WRT54GS v1-v3",
		company: "Linksys",
		model: "WRT54GS",
		version: "v1-v3",
		specs: "8MB Flash, 32MB RAM",
		USB: false,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT54GS v1-v3")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT54GL v1-v4").set({
		fullName: "Linksys WRT54GL v1-v4",
		company: "Linksys",
		model: "WRT54GL",
		version: "v1-v4",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT54GL v1-v4")
	}, {merge: true});

	gargoyleRef.doc("Linksys WRT54GS v4").set({
		fullName: "Linksys WRT54GS v4",
		company: "Linksys",
		model: "WRT54GS v4",
		version: "v4",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys WRT54GS v4")
	}, {merge: true});

	gargoyleRef.doc("Rosewill RNX-GX4").set({
		fullName: "Rosewill RNX-GX4",
		company: "Rosewill",
		model: "RNX-GX4",
		version: "",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Rosewill RNX-GX4")
	}, {merge: true});

	gargoyleRef.doc("Netcore NW618").set({
		fullName: "Netcore NW618",
		company: "Netcore",
		model: "NW618",
		version: "",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netcore NW618")
	}, {merge: true});

	gargoyleRef.doc("Motorola WR850G v1-v3").set({
		fullName: "Motorola WR850G v1-v3",
		company: "Motorola",
		model: "WR850G",
		version: "v1-v3",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Motorola WR850G v1-v3")
	}, {merge: true});

	gargoyleRef.doc("Motorola WE800G v1").set({
		fullName: "Motorola WE800G v1",
		company: "Motorola",
		model: "WE800G",
		version: "v1",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Motorola WE800G v1")
	}, {merge: true});

	gargoyleRef.doc("Buffalo WBR2-G54").set({
		fullName: "Buffalo WBR2-G54",
		company: "Buffalo",
		model: "WBR2-G54",
		version: "",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Buffalo WBR2-G54")
	}, {merge: true});

	gargoyleRef.doc("La Fonera Accton MR3201A").set({
		fullName: "La Fonera Accton MR3201A",
		company: "La Fonera",
		model: "Accton MR3201A",
		version: "",
		specs: "8MB Flash, 32MB RAM",
		USB: false,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("La Fonera Accton MR3201A")
	}, {merge: true});

	gargoyleRef.doc("La Fonera 2 v2202").set({
		fullName: "La Fonera 2 v2202",
		company: "La Fonera",
		model: "La Fonera 2",
		version: "v2202",
		specs: "8MB Flash, 32MB RAM",
		USB: true,
		notes: "Recommended minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("La Fonera 2 v2202")
	}, {merge: true});

	gargoyleRef.doc("La Fonera v2100-v2200").set({
		fullName: "La Fonera v2100-v2200",
		company: "La Fonera",
		model: "La Fonera",
		version: "v2100-v2200",
		specs: "8MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("La Fonera v2100-v2200")
	}, {merge: true});

	gargoyleRef.doc("La Fonera+ v2201").set({
		fullName: "La Fonera+ v2201",
		company: "La Fonera",
		model: "La Fonera+",
		version: "v2201",
		specs: "8MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("La Fonera+ v2201")
	}, {merge: true});

	gargoyleRef.doc("D-Link DIR-300 Rev.A").set({
		fullName: "D-Link DIR-300 Rev.A",
		company: "D-Link",
		model: "DIR-300",
		version: "Rev.A",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("D-Link DIR-300 Rev.A")
	}, {merge: true});

	gargoyleRef.doc("Ubiquiti Nanostation 2").set({
		fullName: "Ubiquiti Nanostation 2",
		company: "Ubiquiti",
		model: "Nanostation 2",
		version: "",
		specs: "4MB Flash, 16MB RAM",
		USB: false,
		notes: "Bare minimum specs"
	});

	await gargoyleRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Ubiquiti Nanostation 2")
	}, {merge: true});

}

// populateRouterList();