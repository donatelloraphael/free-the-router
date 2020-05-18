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

const tomatoshibbyRef = db.collection("tomatobyshibby-main-list");
const advancedtomatoRef = db.collection("advancedtomato-main-list");

let routerList = [];
let nameIndex = [];

// exports.checkAdvancedtomato = async function() {
async function checkAdvancedtomato() {

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
	
	await advancedtomatoRef.doc("index").get()
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
		console.log(routerList[i]);

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
	}
}

checkAdvancedtomato();