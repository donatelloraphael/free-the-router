const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const freshtomatoRef = db.collection("freshtomato-main-list");
const deviceArray = [];

async function createFreshtomatoList() {
	let dbDeviceList = [];
	
	axios.get("https://wiki.freshtomato.org/doku.php?id=hardware_compatibility")
		.then((res) => {
			// console.log(res.data);
			$("td", "table", res.data).each((i, element) => {

				//13 is the number of columns
				switch(i % 13) {
					case 0:
						deviceArray[i / 13] = { "fullName": $(element).text().trim().replace(/\//g, "&") };
						let nameArray = $(element).text().trim().split(" ");
						if (!nameArray[2]) {
							nameArray[2] = '';
						}
						deviceArray[Math.trunc(i / 13)]["company"] = nameArray[0];
						deviceArray[Math.trunc(i / 13)]["model"] = (nameArray[1] + " " + nameArray[2]).trim();
						break;
					case 1:
						deviceArray[Math.trunc(i / 13)]["version"] = $(element).text().trim();
						break;
					case 4:
						deviceArray[Math.trunc(i / 13)]["LAN"] = $(element).text().trim();
						break;
					case 5:
						deviceArray[Math.trunc(i / 13)]["USB"] = Number($(element).text().trim()) > 0 ? "Yes" : "No";
						break;
					case 6:
						deviceArray[Math.trunc(i / 13)]["USB"] = Number($(element).text().trim()) > 0 ? "Yes" : deviceArray[Math.trunc(i / 13)]["USB"];
						break;
					case 7:
						deviceArray[Math.trunc(i / 13)]["WiFi"] = $(element).text().trim();
						break;
					case 8: 
						deviceArray[Math.trunc(i / 13)]["specs"] = $(element).text().trim() + " Flash, ";
						break;
					case 10:
						deviceArray[Math.trunc(i / 13)]["specs"] += ($(element).text().trim() + " RAM");
						break;
					case 11:
						deviceArray[Math.trunc(i / 13)]["firmwareVersion"] = $(element).text().trim();
						break;
					case 12:
						deviceArray[Math.trunc(i / 13)]["notes"] = $(element).text().trim();
						break;
				}
			});
		}).then(() => {
			// console.log(deviceArray);
				freshtomatoRef.doc("index").get()
				.then((doc) => {
					dbDeviceList = doc.data().fullNameIndex
				});
		}).then(async function() {
				deviceLength = deviceArray.length;

				for (let i = 0; i < deviceLength; i++) {
					if (!(dbDeviceList.includes(deviceArray[i]["fullName"]))) {

						freshtomatoRef.doc(deviceArray[i]["fullName"]).set({
							fullName: deviceArray[i]["fullName"],
							company: deviceArray[i]["company"],
							model: deviceArray[i]["model"],
							version: deviceArray[i]["version"],
							LAN: deviceArray[i]["LAN"],
							USB: deviceArray[i]["USB"],
							WiFi: deviceArray[i]["WiFi"],
							specs: deviceArray[i]["specs"],
							firmwareVersion: deviceArray[i]["firmwareVersion"],
							notes: deviceArray[i]["notes"]
						}, {merge: true});

						await freshtomatoRef.doc("index").update({
							fullNameIndex: admin.firestore.FieldValue.arrayUnion(deviceArray[i]["fullName"])
						}, {merge: true});

						await freshtomatoRef.doc("index").set({
							updatedOn: new Date()
						}, {merge: true});
					}

				}
			// console.log(deviceArray);
		}).catch(error => console.log(error));
}

// exports.checkFreshTomato = async function() {
async function checkFreshTomato() {
	let isModified = false;
	let currentYear = '';
	let currentBuild = '';

	await freshtomatoRef.doc("index").get()
	.then(async function(doc) {
		currentYear = doc.data().currentYear;
		currentBuild = doc.data().currentBuild;
	});

	await axios.get("https://freshtomato.org/downloads/freshtomato-arm/")
	.then((res) => {
		$("a", ".fb-n", res.data).each((i, element) => {
			let year = Number($(element).text());
			if (Number(year > currentYear)) {
				freshtomatoRef.doc("index").set({
					currentYear: year
				}, {merge: true});
				currentYear = year;
			}
		})
	});

	await	axios.get("https://freshtomato.org/downloads/freshtomato-arm/" + currentYear + "/")
	.then((res) => {
		$("a", ".fb-n", res.data).each((i, element) => {

			if (Number($(element).text()) > currentBuild) {

				freshtomatoRef.doc("index").set({
					currentBuild: Number($(element).text()),
					updatedOn: new Date()
				}, {merge: true});

				isModified = true;
			}
		})
	}).then(async function() {
			if (isModified) {

				await createFreshtomatoList();

				db.collection("mail").add({
					to: "freetherouter@gmail.com",
					message: {
						subject: "FreshTomato has been updated",
						text: "FreshTomato device list has been updated"
					}
				}).then(() => console.log('Queued email for delivery!'));

				console.log("New builds are available!");
			} else {
				console.log("No new builds are available.");
			}
	});	
}

async function addExtraRouters() {
	freshtomatoRef.doc("Buffalo WZR-1750DHP").set({
		fullName: "Buffalo WZR-1750DHP",
		company: "Buffalo",
		model: "WZR-1750DHP",
		specs: "128MB Flash, 512MB RAM",
		firmwareVersion: "K26ARM",
		LAN: "1 Gbps",
		USB: "yes",
		WiFi: "AC1750",
		version: "",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Buffalo WZR-1750DHP")
	}, {merge: true});

	freshtomatoRef.doc("Belkin F5D8235 v3").set({
		fullName: "Belkin F5D8235 v3",
		company: "Belkin",
		model: "F5D8235",
		version: "v3",
		specs: "8MB Flash, 32MB RAM",
		firmwareVersion: "K26",
		LAN: "1 Gbps",
		USB: "yes",
		WiFi: "n300",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin F5D8235 v3")
	}, {merge: true});

	freshtomatoRef.doc("Belkin F7D3301").set({
		fullName: "Belkin F7D3301",
		company: "Belkin",
		model: "F7D3301",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "1 Gbps",
		USB: "yes",
		WiFi: "n300",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin F7D3301")
	}, {merge: true});

freshtomatoRef.doc("Belkin F7D7301").set({
		fullName: "Belkin F7D7301",
		company: "Belkin",
		model: "F7D7301",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "1 Gbps",
		USB: "yes",
		WiFi: "n300",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin F7D7301")
	}, {merge: true});

	freshtomatoRef.doc("Belkin F7D3302").set({
		fullName: "Belkin F7D3302",
		company: "Belkin",
		model: "F7D3302",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "100 Mbps",
		USB: "yes",
		WiFi: "n300",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin F7D3302")
	}, {merge: true});

	freshtomatoRef.doc("Belkin F7D7302 v1").set({
		fullName: "Belkin F7D7302 v1",
		company: "Belkin",
		model: "F7D7302",
		version: "v1",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "100 Mbps",
		USB: "yes",
		WiFi: "n300",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin F7D7302 v1")
	}, {merge: true});

	freshtomatoRef.doc("Belkin Play F7D4302").set({
		fullName: "Belkin Play F7D4302",
		company: "Belkin",
		model: "Play F7D4302",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		LAN: "100 Mbps",
		USB: "yes",
		WiFi: "n600",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin Play F7D4302")
	}, {merge: true});

	freshtomatoRef.doc("Linksys E2500 v3").set({
		fullName: "Linksys E2500 v3",
		company: "Linksys",
		model: "E2500",
		version: "v3",
		specs: "16MB Flash, 64MB RAM",
		firmwareVersion: "K26RT-N",
		LAN: "100 Mbps",
		USB: "yes",
		WiFi: "n600",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys E2500 v3")
	}, {merge: true});

	freshtomatoRef.doc("Linksys E4200").set({
		fullName: "Linksys E4200",
		company: "Linksys",
		model: "E4200",
		version: "",
		specs: "16MB Flash, 64MB RAM",
		firmwareVersion: "K26RT-N",
		LAN: "1 Gbps",
		USB: "yes",
		WiFi: "ac750",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys E4200")
	}, {merge: true});

	freshtomatoRef.doc("Netgear WNDR3400 v1&v2&v3").set({
		fullName: "Netgear WNDR3400 v1&v2&v3",
		company: "Netgear",
		model: "WNDR3400",
		version: "v1&v2&v3",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26RT-N",
		LAN: "100 Mbps",
		USB: "yes",
		WiFi: "n600",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netgear WNDR3400 v1&v2&v3")
	}, {merge: true});

	freshtomatoRef.doc("Netgear WNDR3700 v3").set({
		fullName: "Netgear WNDR3700 v3",
		company: "Netgear",
		model: "WNDR3700",
		version: "v3",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26RT-N",
		LAN: "1 Gbps",
		USB: "yes",
		WiFi: "n600",
		notes: ""
	})

	await freshtomatoRef.doc("index").update({
		fullNameIndex: admin.firestore.FieldValue.arrayUnion("Netgear WNDR3700 v3")
	}, {merge: true});

}

// addExtraRouters();
// createFreshtomatoList();
checkFreshTomato();