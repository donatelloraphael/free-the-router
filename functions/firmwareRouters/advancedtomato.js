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
const tomatoRef = db.collection("tomatobyshibby-main-list");

exports.createAdvancedtomatoList = function() {

}

axios.get("https://advancedtomato.com/downloads")
	.then((res) => {
		$(".router-name", res.data).each((i, element) => {
			routerList.push({ fullName: $(element).text() });
		})
	}).then(() => {
		console.log(routerList);
	})

	

tomatoRef.get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			// console.log(doc.data());
		})
	});