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

	for (let page = 1;; page++) {	// TODO: remove condition page < number

		let doc = await axios.get(amazonRouters + page);

		if ($("span", ".s-result-item", doc.data).attr("class") == "celwidget slot=MAIN template=TOP_BANNER_MESSAGE widgetId=messaging-messages-no-results") {
			console.log("__________No more items.___________");
			break;
		} else {
			console.log(`PAGE: ${page} has items`);
			getDevices(doc.data, page);
			// console.log(doc.data);
		}
	}

	console.dir(allDevices, {maxArrayLength: null});
	console.log('\nNUMBER OF DEVICES: ', allDevices.length);
}


function getDevices(html, page) {

	$(".s-result-item", html).each((i, element) => {
		let device = {};

		if ($(element).attr("data-asin")) {
			device.asin = $(element).attr("data-asin");
			device.name = $("h2", $(element).html()).text().trim();
			device.link = "https://www.amazon.in/dp/" + device.asin;
			device.thumbnail = $("img", $(element).html()).attr("src").replace(/(160)|(320)/gm, "480"); // Thumbnail size 480

			if (page == 1) {
				$(".a-color-price", $(element).html()).each((j, prices) => {
					if (j == 0) {
						device.price = parseInt($(prices).text().trim().split(" ")[0].trim().split(",").join(""));
						return;
					}
				});

			} else {
				device.price = parseInt($(".a-price-whole", $(element).html()).text().split(",").join(""));
			}

			if (device.price) {
				allDevices.push(device);
			}
		}
	});
}


async function filterDevices() {

	await indicesRef.doc("all-routers-index").get()
	.then(doc => {
		if (doc.data()) {
			fullNameIndex = doc.data().fullNameIndex;
		}
	});

	// console.dir(fullNameIndex, {maxArrayLength: null});

	let arrLength = allDevices.length;
	for (let i = 0; i < arrLength; i++) {
		
	}
}

getPages();
