const COUNTRY = "UK";

const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../../functions/firebase-adminsdk.json");
	admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
	});
}

const db = admin.firestore();

const firmwares = ["advancedtomato", "asusMerlin", "ddwrt", 
									"freshtomato", "openwrt", "gargoyle", "tomatobyshibby"];

async function createTopPicks() {

	try {
		for (let i = 0; i < firmwares.length; i++) {
			let firmwareArray = [];

			db.collection(COUNTRY).doc("all-sites").collection("routers").where(`${firmwares[i]}Support`, "==", true).orderBy("serialNumber").limit(3).get()
			.then(docs => {
				let j = 1;
				docs.forEach( function(doc) {
					db.doc(`${COUNTRY}/top-picks/${firmwares[i]}/${j++}`).set(doc.data());
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
		let i = 1;
		result.forEach(doc => {
			db.doc(`${COUNTRY}/most-popular/routers/${i++}`).set(doc.data());
		});
	});
}

createTopPicks();
createMostPopular();