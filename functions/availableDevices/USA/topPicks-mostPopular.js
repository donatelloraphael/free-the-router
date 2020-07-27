const COUNTRY = "US";

const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../../firebase-adminsdk.json");
	admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
  	databaseURL: "https://free-the-router-13e19.firebaseio.com"
	});
}

const db = admin.firestore();

const firmwares = ["advancedtomato", "asusMerlin", "ddwrt", 
									"freshtomato", "openwrt", "gargoyle", "tomatobyshibby"];

async function createTopPicks() {

	try {
		for (let i = 0; i < firmwares.length; i++) {
			let firmwareArray = [];

			db.collection(COUNTRY).doc("all-sites").collection("routers").where(`${firmwares[i]}Support`, "==", true).limit(3).get()
			.then(docs => {
				docs.forEach((doc, index) => {
					db.doc(`${COUNTRY}/top-picks/${firmwares[i]}/${doc.data().id}`).set(doc.data());
				});
			});
		}
	} catch (error) {
		console.log(error);
	}
}

async function createMostPopular() {
	let mostPopular = [];
	db.collection(COUNTRY).doc("all-sites").collection("routers").orderBy("serialNumber").limit(18).get()
	.then(result => {
		result.forEach(doc => {
			db.doc(`${COUNTRY}/most-popular/routers/${doc.data().id}`).set(doc.data());
		});
	});
}

createTopPicks();
createMostPopular();