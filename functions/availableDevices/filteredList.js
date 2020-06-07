const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const indicesRef = db.collection("indices");

async function makeFilteredList() {
	let fullNameIndex = [];
	let allDeviceArray = [];

	await indicesRef.doc("all-routers-index").get()
	.then(doc => {
		if (doc.data()) {
			fullNameIndex = doc.data().fullNameIndex;
		}
	});

	let arrLength = fullNameIndex.length;
	for (let i = 0; i < arrLength; i++) {
		let devices = [];
		let formattedName = fullNameIndex[i];
		
		if (/RASPBERRY PI FOUNDATION/gmi.test(fullNameIndex[i])) {
			devices.push({ [fullNameIndex[i].replace("RASPBERRY PI FOUNDATION ", "")]: fullNameIndex[i] });
		} 
		else if (/\(.*\)/gm.test(formattedName)) {
			if ()	{
				
			}
		}

		for (let j = 0; j < devices.length; j++) {
			allDeviceArray.push(devices[j]);
		}
	}

	console.log(allDeviceArray);
}

makeFilteredList();