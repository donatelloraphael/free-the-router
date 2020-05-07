//Automatic Update

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const tomatoRef = db.collection("tomatobyshibby-main-list");
const advancedtomatoRef = db.collection("advancedtomato-main-list");

let routerList = [];
let tomatobyshibbyList = [];

// exports.createAdvancedtomatoList = async function() {
async function createAdvancedtomatoList() {
	await axios.get("https://advancedtomato.com/downloads")
		.then((res) => {
			$(".router-name", res.data).each((i, element) => {
				routerList.push($(element).text());
			})
		}).then(() => {
			return true;
		})

	await tomatoRef.get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			tomatobyshibbyList.push(doc.data());
		});
	})
	
	let nameIndex = await advancedtomatoRef.doc("index").get()
								.then((doc) => {
									return doc.data().fullNameIndex;
								})


	routerListLength = routerList.length;
	shibbyLength = tomatobyshibbyList.length;

	for (let i = 0; i < routerListLength; i++) {
		if (!nameIndex.includes(routerList[i])) {

			for (let j = 0; j < shibbyLength - 1; j++) {

				let routerParsed = routerList[i].split(/[\s,.&\(]+/gi).join("");
				let shibbyParsed = tomatobyshibbyList[j].fullName.split(/[\s,&\(\)]+/gi).join("");
				
				let regex = new RegExp(routerParsed, "gi")
				if (regex.test(shibbyParsed)) {
					
					await advancedtomatoRef.doc(routerList[i]).set({
					fullName: routerList[i],
					company: tomatobyshibbyList[j].company,
					model: tomatobyshibbyList[j].model,
					version: "",
					notes: "",
					specs: tomatobyshibbyList[j].specs
					}).then(() => {
						advancedtomatoRef.doc("index").update({
								fullNameIndex: admin.firestore.FieldValue.arrayUnion(routerList[i])
						})
					}).then(() => {
							return true;
					}).catch((error) => {
							console.log(error);
					});

					db.collection("mail").add({
						to: "freetherouter@gmail.com",
						message: {
							subject: "AdvancedTomato has been updated",
							text: "AdvancedTomato device list has been updated"
						}
					}).then(() => console.log('Queued email for delivery!'));

				} 
			}
		}
	}
}

createAdvancedtomatoList();