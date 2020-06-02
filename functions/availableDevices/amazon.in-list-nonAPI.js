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
const allFirmwareRoutersRef = db.collection("all-firmware-routers");

let fullNameIndex = [];
let allDevices = [];

async function getPages() {

	const amazonRouters = "https://www.amazon.in/s?i=computers&rh=n%3A976392031%2Cn%3A976393031%2Cn%3A1375427031%2Cn%3A1375439031&qid=1590958154&page=";

	await indicesRef.doc("all-routers-index").get()
	.then(doc => {
		if (doc.data()) {
			fullNameIndex = doc.data().fullNameIndex;
		}
	});

	// console.dir(fullNameIndex, {maxArrayLength: null});

	for (let page = 1;; page++) {	// TODO: remove page < 2

		let doc = await axios.get(amazonRouters + page);
				
		if ($("span", ".s-result-item", doc.data).attr("class") == "celwidget slot=MAIN template=TOP_BANNER_MESSAGE widgetId=messaging-messages-no-results") {
			console.log("__________No more items.___________");
			break;
		} else {
			console.log(`PAGE: ${page} has items`);
			getDevices(doc.data);
		}
	}

	console.dir(allDevices, {maxArrayLength: null});

}

function getDevices(html) {

	$(".s-result-item", html).each((i, element) => {
		let device = {};

		if ($(element).attr("data-asin")) {
			device.asin = $(element).attr("data-asin");
			device.name = $("h2", $(element).html()).text().trim();
			device.link = "https://www.amazon.in/dp/" + device.asin;
			
			allDevices.push(device);
		}
	});
}

getPages();