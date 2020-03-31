const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const ddwrtRef = db.collection("ddwrt-main-list");

// exports.updateDdwrtList = async function() {

async function updateDdwrtList() {
	let brandList = [];
	axios.get("https://wiki.dd-wrt.com/wiki/index.php/Supported_Devices")
	.then((res) => {
		$("h3", res.data).each((i, element) => {
			if (i > 3) {
				let brand = $(element).text().split("]")[1].trim();
				brandList.push(brand);
			}
		})
		console.log(brandList);
	})
	.catch(error => console.log(error));
}

updateDdwrtList();