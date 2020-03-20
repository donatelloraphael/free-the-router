const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
}, "merlin");
const db = admin.firestore();

exports.checkMerlin = async function() {
	let fullNameIndex = [];
	let routerList = [];
	let indexDocRef = db.collection("asuswrt-merlin-main-list").doc("index");

	await axios.get("https://sourceforge.net/projects/asuswrt-merlin/files/")
		.then((res) => {
			$(".name", res.data).each((i, element) => {
				let innerText = $(element).text();
				if (innerText != "Documentation" && innerText != "README.TXT") {
					routerList.push(innerText);
				}
			})
		});

	await indexDocRef.get()
	.then((doc) => {
		fullNameIndex = doc.data().fullNameIndex;
	});
	
	sortedRouterList = routerList.sort();
	sortedFullNameIndex = fullNameIndex.sort();

	for (let i = 0; i < sortedRouterList.length; i++) {

		if (sortedRouterList[i] != sortedFullNameIndex[i]) {

			console.log('Supported router list changed!');
			if (fullNameIndex.length === 0) {
				for (let i = 0; i < sortedRouterList.length; i++) {
					indexDocRef.update({
						fullNameIndex: admin.firestore.FieldValue.arrayUnion(sortedRouterList[i])
					})
				}
			}
			indexDocRef.set({
				changedOn: (new Date())
			}, { merge: true })
			return;
		}
	}
	console.log('No change in supported devices.')
}