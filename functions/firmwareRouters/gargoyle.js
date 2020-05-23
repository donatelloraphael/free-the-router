// Check Only. Manual Update Needed

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

exports.checkGargoyle = async function() {
// async function checkGargoyleList() {
	axios.get("https://www.gargoyle-router.com/wiki/doku.php?id=supported_routers_-_tested_routers")
	.then(async function(res) {
		let updatedOn = await gargoyleRef.doc("index").get()
										.then((doc) => {
											return doc.data().updatedOn;
										});


		$(".doc", res.data).each((i, element) => {
			let currentUpdationStatus = $(element).text();
		
			if (currentUpdationStatus != updatedOn) {
				
				db.collection("mail").add({
					to: "freetherouter@gmail.com",
					message: {
						subject: "Gargoyle has been updated [Manual Updation needed]",
						text: `Gargoyle device list has been updated. Updation String: ${currentUpdationStatus}`
					}
				}).then(() => console.log('Gargoyle: Queued email for delivery!'));
				
				console.log("Gargoyle: Router list has been modified!");
			} else {
				console.log("Gargoyle: No modification to supported devices list.");
			}
		});	
	});
};

// checkGargoyle();