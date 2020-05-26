//Check only. Manual Update needed

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
}, "merlin");
const db = admin.firestore();

exports.checkAsusMerlin = async function() {
// async function checkAsusMerlin() {
	let fullNameIndex = [];
	let routerList = [];
	let indicesRef = db.collection("indices");

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
};

// checkAsusMerlin();