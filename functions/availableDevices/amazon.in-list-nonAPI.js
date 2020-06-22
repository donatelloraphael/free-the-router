const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../firebase-adminsdk.json");
	admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
  	databaseURL: "https://free-the-router-13e19.firebaseio.com"
	});
}

const db = admin.firestore();

const indicesRef = db.collection("indices");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const amazonRef = db.collection("india").doc("amazon.in");

let fullNameIndex = [];
let allDevices = [];
let supportedDevices = [];

let amazonLinks = { "Routers": "https://www.amazon.in/s?i=computers&rh=n%3A976392031%2Cn%3A976393031%2Cn%3A1375427031%2Cn%3A1375439031&qid=1590958154&page=",
										"Modems": "https://www.amazon.in/s?rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375427031%2Cn%3A1375431031&qid=1591803566&page=",
										"Wireless Access Points": "https://www.amazon.in/s?rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375427031%2Cn%3A1375440031&qid=1591803666&page=",
										"Repeaters & Extenders": "https://www.amazon.in/s?rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375427031%2Cn%3A1375438031&qid=1591803568&page="
									};

// axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; ) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4086.0 Safari/537.36';
let axiosInstance = axios.create({
  headers: {
    get: {        // can be common or any other method
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; ) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4086.0 Safari/536.36'
    }
  }
});


async function main() {

	let deviceTypes = Object.keys(amazonLinks);

	for (let i = 0; i < deviceTypes.length; i++) {

		let link = amazonLinks[deviceTypes[i]];

		for (let page = 1;; page++) {	// TODO: remove condition 'page < number' in production

			let html = await getPage(link + page, page, deviceTypes[i]);

			if (html) {
				await getDevices(html, page, deviceTypes[i]);
			} else {
				break;
			}

		}
	}

	await filterDevices();
	await addExtraInfo();
	await addToDatabase();

	// // console.dir(allDevices, {maxArrayLength: null});
	console.log('\nNUMBER OF DEVICES: ', allDevices.length);
	console.dir(supportedDevices, {maxArrayLength: null});
	console.log("\nNUMBER OF SUPPORTED DEVICES: ", supportedDevices.length);

}

	/////////////////////////// Old Version: Set page end /////////////////////////////////

		// if ($("span", ".s-result-item", html).attr("class") == "celwidget slot=MAIN template=TOP_BANNER_MESSAGE widgetId=messaging-messages-no-results") {
		// 	console.log("__________No more items.___________");
		// 	break;
		// } else {
		// 	console.log(`PAGE: ${page} has items`);
		// 	getDevices(html, page);
		// }

async function getPage(link, page, deviceType) {

	return await axiosInstance.get(link)
	.then(res => {

		if (page == 1) {
			console.log(`Category : ${deviceType}, PAGE: ${page} contains devices`);
			return res.data;
		}
		////////////////////////// Set page end //////////////////////////////////////////
		let deviceNumbers = $("span", ".s-breadcrumb", res.data).html().split(" ")[0].split("-");
		if (parseInt(deviceNumbers[0]) > parseInt(deviceNumbers[1])) {
			console.log('__________No more devices_________');
			return false;
		} else {
			console.log(`Category : ${deviceType}, PAGE: ${page} contains devices`);
			return res.data;
		}

	}).catch(error => console.log(error));
}


function getDevices(html, page, deviceType) {

	$(".s-result-item", html).each((i, element) => {
		var device = {};

		if ($(element).attr("data-asin")) {
			device.asin = $(element).attr("data-asin");
			device.name = $("h2", $(element).html()).text().replace(/\[Sponsored\]/gmi, "").trim();
			device.link = "https://www.amazon.in/dp/" + device.asin;
			device.thumbnail = $("img", $(element).html()).attr("src").replace(/[A-Z]{2}((160)|(320)|(218))/gm, "480"); // Thumbnail size 480px
			device.category = deviceType;

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

	let allLength = allDevices.length;
	let indexLength = fullNameIndex.length;

	for (let i = 0; i < allLength; i++) {
		for (let j = 0; j < indexLength; j++) {
			let splitName = fullNameIndex[j].split(" ");
			let numTestsPassed = 0;

			for (let k = 0; k < splitName.length; k++) {
				let regex = new RegExp(splitName[k], 'gmi');
				if (regex.test(allDevices[i].name)) {
					numTestsPassed++;
					if (numTestsPassed == splitName.length) {
						allDevices[i].id = fullNameIndex[j];
						supportedDevices.push(allDevices[i]);
					}
				}
			}
		}
	}
}

async function addExtraInfo() {

	let arrLength = supportedDevices.length;

	for (let i = 0; i < arrLength; i++) {

		let device;

		try {
			await allFirmwareRoutersRef.doc(supportedDevices[i].id).get()
			.then(doc => {
				device = doc.data();

				supportedDevices[i].supportedFirmwares = [];

				if (device) {
					if (device.advancedtomatoSupport) {
						supportedDevices[i].supportedFirmwares.push("advancedtomato");
					}
					if (device.freshtomatoSupport) {
						supportedDevices[i].supportedFirmwares.push("freshtomato");
					}
					if (device.tomatobyshibbySupport) {
						supportedDevices[i].supportedFirmwares.push("tomatobyshibby");
					}
					if (device.gargoyleSupport) {
						supportedDevices[i].supportedFirmwares.push("gargoyle");
					}
					if (device.asusMerlinSupport) {
						supportedDevices[i].supportedFirmwares.push("asusmerlin");
					}
					if (device.ddwrtSupport) {
						supportedDevices[i].supportedFirmwares.push("ddwrt");
					}
					if (device.openwrtSupport) {
						supportedDevices[i].supportedFirmwares.push("openwrt");
					}
					if (device.deviceType) {
						supportedDevices[i].deviceType = device.deviceType;
						// console.log(supportedDevices[i]);
					}

				} else {
					console.log(`ERROR! No device with the id ${supportedDevices[i].id} found!`);
				}
			});
		} catch (error) { 
			console.log(error); 
		}
			
	}
}

async function addToDatabase() {

	const batchArray = [];
	const BATCH_NUM_ITEMS = 450;
	let operationsCounter = 0;
	let batchIndex = 0;
	
	batchArray.push(db.batch());

	let arrLength = supportedDevices.length;
	for (let i = 0; i < arrLength; i++) {

		if (operationsCounter >= BATCH_NUM_ITEMS) {
			batchIndex++;
			batchArray.push(db.batch());
			operationsCounter = 0;
		}

		batchArray[batchIndex].set(amazonRef, {
			supportedDevices: admin.firestore.FieldValue.arrayUnion(supportedDevices[i])
		}, {merge: true});

		operationsCounter++;
	}

	batchArray.forEach((batch) => {
		batch.commit();
	});
}

main();
