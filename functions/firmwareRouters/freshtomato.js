const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
}, "freshtomato");
const db = admin.firestore();

const freshtomatoRef = db.collection("freshtomato-main-list");
const deviceArray = [];

async function createFreshtomatoList() {
	
	axios.get("https://en.wikipedia.org/wiki/Tomato_(firmware)")
		.then((res) => {
			$("td", "p + table", res.data).each((i, element) => {

				//13 is the number of columns
				switch(i % 13) {
					case 0:
						deviceArray[i / 13] = { "fullName": $(element).text().trim().replace(/\//g, "&") };
						let nameArray = $(element).text().trim().split(" ");
						if (!nameArray[2]) {
							nameArray[2] = '';
						}
						deviceArray[Math.trunc(i / 13)]["company"] = nameArray[0];
						deviceArray[Math.trunc(i / 13)]["model"] = nameArray[1] + " " + nameArray[2];
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
		}).then(async function() {
				deviceLength = deviceArray.length;

				for (let i = 0; i < deviceLength; i++) {
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
				}
				freshtomatoRef.doc("index").set({
						updatedOn: new Date()
					}, {merge: true});

			// console.log(deviceArray);
		}).catch(error => console.log(error));
}

// createFreshtomatoList();

exports.checkFreshTomato = async function() {
// async function checkFreshTomato() {
	let isModified = false;

	freshtomatoRef.doc("index").get()
	.then(async function(doc) {
		let currentYear = doc.data().currentYear;
		let currentBuild = doc.data().currentBuild;		

		axios.get("https://freshtomato.org/downloads/freshtomato-arm/")
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
		}).then(() => {
			axios.get("https://freshtomato.org/downloads/freshtomato-arm/" + currentYear + "/")
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
			}).then(() => {
					if (isModified) {
						console.log("New builds are available!");
					} else {
						console.log("No new builds are available.");
					}
			});	
		})	
	})
}

// checkFreshTomato();