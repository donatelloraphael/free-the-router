const {PubSub} = require('@google-cloud/pubsub');
const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const pubSubClient = new PubSub();

let routerList = [];
tomatobyshibbyList = [];
const tomatoRef = db.collection("tomatobyshibby-main-list");
const advancedtomatoRef = db.collection("advancedtomato-main-list");

exports.createAdvancedtomatoList = function() {

}

async function createAdvancedtomato() {
	await axios.get("https://advancedtomato.com/downloads")
		.then((res) => {
			$(".router-name", res.data).each((i, element) => {
				routerList.push($(element).text());
			})
		}).then(() => {
			return true;
		})

	tomatobyshibbyList = await tomatoRef.get()
												.then((querySnapshot) => {
													querySnapshot.forEach((doc) => {
														tomatobyshibbyList.push(doc.data());
													});
													return tomatobyshibbyList;
												})
	
	let nameIndex = await advancedtomatoRef.doc("index").get()
								.then((doc) => {
									return doc.data().fullNameIndex;
								})


	routerListLength = routerList.length;
	shibbyLength = tomatobyshibbyList.length;

	for (let i = 0; i < routerListLength; i++) {
		if (!nameIndex.includes(routerList[i])) {
			routerListParsed = routerList[i].split(/[\s,.&\(]+/gi).join("");
			console.log("+: ", routerListParsed);
			for (let j = 0; j < shibbyLength - 1; j++) {
				shibbyParsed = tomatobyshibbyList[j].fullName.split(/[\s,.&\(]+/gi).join("");
				console.log("-: ", shibbyParsed);

			}
		}
	}
}


	

tomatoRef.get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			
		})
	});

createAdvancedtomato();