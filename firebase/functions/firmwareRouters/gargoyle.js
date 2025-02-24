// Check Only. Manual Update Needed

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../firebase-adminsdk.json");

	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	});
}

const db = admin.firestore();

const gargoyleRef = db.collection("gargoyle-main-list");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const indicesRef = db.collection("indices");

exports.checkGargoyle = async function() {
// async function checkGargoyleList() {

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
};

// checkGargoyle();