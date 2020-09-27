const COUNTRY = "US";
const AMAZON = "https://www.amazon.com";

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../../../../firebase-adminsdk.json");
	admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
	});
}

const db = admin.firestore();

const indicesRef = db.collection("indices");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");
const allSitesRef = db.collection(COUNTRY).doc("all-sites");
const countryIndicesRef = db.collection(COUNTRY).doc("meta").collection("indices");

let fullNameIndex = [];
let allDevices = [];
let supportedDevices = [];

const deviceType = "modems";
const amazonLinks = { "routers": "https://amazon.com/s?rh=n%3A300189&page=",
											"modems": "https://www.amazon.com/s?rh=n%3A172282%2Cn%3A493964%2Cn%3A541966%2Cn%3A172504%2Cn%3A17442743011&dc&page=",
											"wireless access points": "https://www.amazon.com/s?rh=n%3A1194486&page=",
											"repeaters & extenders": "https://www.amazon.com/s?rh=n%3A3015439011&page="
										};


// axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; ) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4086.0 Safari/537.36';
let axiosInstance = axios.create({
  headers: {
    common: {        // can be common or any other method
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
      'Accept-Language': 'en-gb,en-US',
      'Referer': 'http://www.google.co.in/',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0'
    }
  }
});


async function main() {	
	let oldLength = 0;
	let page = 1;
	let retry = 0;
	
	function delayedLoop() {
		return setTimeout(async function() {
			let amazonLink = amazonLinks[deviceType] + page;

			let html = await getPage(amazonLink, page, deviceType);

			if (html && page < 101 && retry <= 5) {
				await getDevices(html, page, deviceType);

				if (allDevices.length == oldLength) {
					retry++;
					delayedLoop();
				} else {
					page++;
					retry = 0;
					oldLength = allDevices.length;
					delayedLoop();
				}
			} else {
				await filterDevices();
				await addExtraInfo();
				await addToDatabase();

				// console.dir(allDevices, {maxArrayLength: null});
				console.log('\nNUMBER OF DEVICES: ', allDevices.length);
				console.log("\nNUMBER OF SUPPORTED DEVICES: ", supportedDevices.length);
				// console.dir(supportedDevices, {maxArrayLength: null});

				return true;
			}
		}, 0);
	}

	return await delayedLoop();

}

async function getPage(link, page, deviceType) {

	return await axiosInstance.get(link)
	.then(res => {

		if (page == 1) {
			console.log(`Country: ${COUNTRY}, Category : ${deviceType}, PAGE: ${page} contains devices`);
			return res.data;
		}
		////////////////////////// Set page end //////////////////////////////////////////
		let deviceNumbers = $("span", ".s-breadcrumb", res.data).html().split(" ")[0].split("-");
		if (parseInt(deviceNumbers[0]) > parseInt(deviceNumbers[1])) {
			console.log('__________No more devices_________');
			return false;
		} else {
			console.log(`Country: ${COUNTRY}, Category : ${deviceType}, PAGE: ${page} contains devices`);
			return res.data;
		}

	}).catch(error => {
		console.log(error);
		return getPage(link, page, deviceType);
	});
}


function getDevices(html, page, deviceType) {

	if ($(".octopus-pc-item", html).html()) {

		$(".octopus-pc-item", html).each((i, element) => {
			let device = {};

			let aTag = $(".octopus-pc-item-link", $(element).html());

			device.amazonLink = AMAZON + $(aTag).attr("href").split("?").shift();
			device.amazonAsin = device.amazonLink.split("/dp/").pop();
			device.amazonName = $(aTag).attr("title").trim();
			device.amazonThumbnail = $("img", $(element).html()).attr("data-a-hires");
			device.amazonCategory = deviceType;
			device.amazonPrice = parseFloat($(".a-price-whole", $(element).html()).text().split(",").join("") + $(".a-price-fraction", $(element).html()).text());
			
			if (device.amazonPrice) {
				allDevices.push(device);
			}
			if (page == 1) {
				console.log("OCTOPUS: ", device.amazonName ? device.amazonName : "FIRST PAGE NOT LOADED!");
			}
		});
	} else {

		$(".s-result-item", html).each((i, element) => {
			let device = {};

			if ($(element).attr("data-asin")) {
				device.amazonAsin = $(element).attr("data-asin");
				if ($(".s-label-popover-hover", $(element).html()).text()) {
					device.amazonLink = `${AMAZON}/dp/` + device.amazonAsin;
				} else {
					device.amazonLink = AMAZON + $(".rush-component a", $(element).html()).attr("href").split("ref=").shift();
				}
				device.amazonThumbnail = $(".rush-component a img", $(element).html()).attr("src").replace(/_[a-z]{2}\d{3}_/gi, "_UY436_");
				device.amazonCategory = deviceType;
				device.amazonName = $(".a-size-medium.a-color-base.a-text-normal", $(element).html()).text();
				device.amazonPrice = parseFloat($(".a-price-whole", $(element).html()).text().split(",").join("") + $(".a-price-fraction", $(element).html()).text());

				if (device.amazonPrice) {
					allDevices.push(device);
				}
			}
			if (page == 1) {
				console.log("DATA: ", device.amazonName ? device.amazonName : "FIRST PAGE NOT LOADED!");
			}
			
		});
	}
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
				// Replacing "X" with matching characters or numbers
				if (k == splitName.length - 1) {
					splitName[k] = splitName[k].replace(/x+$/gi, "");
				}

				// let regex = new RegExp("(\\s|-|^)" + splitName[k] + "(\\s|x|-|$)", "gmi"); //Don't remove extra backslash before \s
				let regex = new RegExp(splitName[k], "gmi");

				if (regex.test(allDevices[i].amazonName)) {
					numTestsPassed++;
					if (numTestsPassed == splitName.length) {
						allDevices[i].id = fullNameIndex[j];
						if (!supportedDevices.includes(allDevices[i])) {
							supportedDevices.push(allDevices[i]);
						}
					}
				}
			}
		}
	}
}

async function addExtraInfo() {
	let serialNumber = 1;
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
					if (!device.company) {
						console.log("Company Problem Device: ", device);
					}
					supportedDevices[i].brand = device.company.toUpperCase();
					supportedDevices[i].amazonUpdatedOn = new Date().toLocaleString(`en-${COUNTRY}`, {timeZone: "UTC"}) + " UTC";
					supportedDevices[i].serialNumber = serialNumber++;

					supportedDevices[i] = {...supportedDevices[i], ...device};

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
	const BATCH_NUM_ITEMS = 300;
	let operationsCounter = 1; // Need to count the device list delete operation.
	let batchIndex = 0;

	let newDevices	= [];
	let fullNameIndex = [];
	let newIndex = [];

	
	batchArray.push(db.batch());

	/*********************** Delete the old Device List *********************/
	
	// batchArray[batchIndex].delete(amazonRef.collection(deviceType));

	/************************************************************************/

	let arrLength = supportedDevices.length;
	for (let i = 0; i < arrLength; i++) {

		if (operationsCounter >= BATCH_NUM_ITEMS) {
			batchIndex++;
			batchArray.push(db.batch());
			operationsCounter = 0;
		}

		batchArray[batchIndex].set(allSitesRef.collection(deviceType).doc(supportedDevices[i].id), 
			supportedDevices[i]
		);

		batchArray[batchIndex].set(allSitesRef.collection("all-devices").doc(supportedDevices[i].id), 
			supportedDevices[i]
		);

		// device details
		batchArray[batchIndex].set(allSitesRef.collection("device-details").doc(supportedDevices[i].id.replace(/\ /gm, "-")),
			supportedDevices[i]
		);

		newIndex.push(supportedDevices[i].id);
		
		operationsCounter += 3;

		//////////////////// Delete outdated devices//////////////////////

		newDevices.push(supportedDevices[i].id);
	}



	await countryIndicesRef.doc(deviceType).get()
	.then(doc => {
		if (doc.data()) {
			fullNameIndex = doc.data().fullNameIndex;
		}
	});

	batchArray[batchIndex].set(countryIndicesRef.doc(deviceType), {
		fullNameIndex: newIndex
	});

	for (let i = 0; i < newIndex.length; i++) {
		batchArray[batchIndex].set(countryIndicesRef.doc("all-devices"), {
			fullNameIndex: admin.firestore.FieldValue.arrayUnion(newIndex[i])
		}, {merge: true});

		operationsCounter++;
	}
	
	let indexLength = fullNameIndex.length;
	for (let i = 0; i < indexLength; i++) {
		if (!newDevices.includes(fullNameIndex[i])) {
			batchArray[batchIndex].delete(allSitesRef.collection(deviceType).doc(fullNameIndex[i]));
			console.log('Deleted: ', fullNameIndex[i]);
			operationsCounter++;
		}
	}

	operationsCounter++;

	batchArray.forEach((batch) => {
		batch.commit();
	});
}

main();
