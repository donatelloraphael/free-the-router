const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
}, "ddwrt");
const db = admin.firestore();

const ddwrtRef = db.collection("ddwrt-main-list");

exports.checkDdwrt = async function() {
// async function checkDdwrt() {
	let lastModified = "";
	let currentModified = "";

	await ddwrtRef.doc("lastModified").get()
	.then((doc) => {
		lastModified = doc.data().modString;
	}).catch(error => console.log(error));

	axios.get("https://wiki.dd-wrt.com/wiki/index.php/Supported_Devices")
	.then((res) => {	
		currentModified = $("#f-lastmod", res.data).text().trim();

		if (!(lastModified === currentModified)) {
			console.log("DD-WRT device list has been modified!");

			db.collection("mail").add({
				to: "freetherouter@gmail.com",
				message: {
					subject: "DD-WRT has been updated",
					text: "DD-WRT device list has been updated"
				}
			}).then(() => console.log('Queued email for delivery!'))
			.catch(error => console.log(error));

			ddwrtRef.doc("lastModified").set({
				modString: currentModified
			}).catch(error => console.log(error));

			// getDdwrtList(res.data);
		} else {
			console.log('Device list has not been modified.');
		}

	}).catch(error => console.log(error));
}


// checkDdwrt();