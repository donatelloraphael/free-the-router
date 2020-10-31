const COUNTRY = "fr";
const AMAZON = "https://www.amazon.fr";
const PRICE_COMMA = true;

const axios = require('axios');
const $ = require('cheerio');

const MONGO_PWD = require("../../../env").MONGO_PWD;
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://defaultReadWrite:${MONGO_PWD}@freetherouter.dm5jh.mongodb.net/freetherouter?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let mdb;

let fullNameIndex = [];
let allDevices = [];
let supportedDevices = [];

const deviceType = "modems";
const amazonLinks = { "routers": "https://www.amazon.fr/s?rh=n%3A430397031&_encoding=UTF8&qid=1603655196&page=",
											"modems": "https://www.amazon.fr/s?rh=n%3A430394031&_encoding=UTF8&qid=1603655154&page=",
											"wireless-access-points": "https://www.amazon.fr/s?rh=n%3A430395031&_encoding=UTF8&qid=1603657628&page=",
											"repeaters-extenders": "https://www.amazon.fr/s?rh=n%3A430396031&_encoding=UTF8&qid=1603655158&page="
										}

let axiosInstance = axios.create({
  headers: {
    common: {        // can be common or any other method
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
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

	await client.connect();
	mdb = client.db("freetherouter");
	
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

				process.exit(0);
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
		let deviceNumbers = $("span", ".s-breadcrumb", res.data).html()?.split(" ")[0]?.split("-");

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

			device.amazonLink = AMAZON + $(aTag).attr("href")?.split("?").shift();
			device.amazonAsin = device.amazonLink?.split("/dp/")?.pop();
			device.amazonName = $(aTag).attr("title").trim();
			device.amazonThumbnail = $("img", $(element).html()).attr("data-a-hires");
			device.amazonCategory = deviceType;
			if (PRICE_COMMA) {
				device.amazonPrice = parseFloat($(".a-price-whole", $(element).html()).text()?.split(",").join("."));
			} else {
				device.amazonPrice = parseFloat($(".a-price-whole", $(element).html()).text()?.replace(/\,/gm, "") + $(".a-price-fraction", $(element).html()).text());
			}

			if (device.amazonPrice) {
				allDevices.push(device);
			}
			if (page == 1) {
				console.log("OCTOPUS: ", device.amazonName ? device.amazonName : "FIRST PAGE NOT LOADED!");
			}
		});
		return;
	} 
	
	if (/* page > 1 && */ $(".s-result-item", html).html()) {

		$(".s-result-item", html).each((i, element) => {
			let device = {};
			// console.log($(element).html());

			if ($(element).attr("data-asin")) {
				device.amazonAsin = $(element).attr("data-asin");
				if ($(".s-label-popover-hover", $(element).html()).text()) {
					device.amazonLink = `${AMAZON}/dp/` + device.amazonAsin;
				} else {
					device.amazonLink = AMAZON + $(".rush-component a", $(element).html()).attr("href")?.split("ref=")?.shift();
				}
				device.amazonThumbnail = $(".rush-component a img", $(element).html()).attr("src")?.replace(/_[a-z]{2}\d{3}_/gi, "_UY436_");
				device.amazonCategory = deviceType;
				device.amazonName = $(".a-size-medium.a-color-base.a-text-normal", $(element).html()).text();
				if (PRICE_COMMA) {
					device.amazonPrice = parseFloat($(".a-price-whole", $(element).html()).text()?.split(",").join("."));
				} else {
					device.amazonPrice = parseFloat($(".a-price-whole", $(element).html()).text()?.replace(/\,/gm, "") + $(".a-price-fraction", $(element).html()).text());
				}

				if (device.amazonPrice) {
					allDevices.push(device);
				}
			}
			if (page == 1) {
				console.log("DATA: ", device.amazonName ? device.amazonName : "FIRST PAGE NOT LOADED!");
			}
			
		});
		return;
	} else {
		$(".s-result-item", html).each((i, element) => {
			let device = {};
			let price;

			if (PRICE_COMMA) {
				price = parseFloat($(".a-color-price", $(element).html()).text()?.slice(1)?.replace(",", "."));
			} else {
				price = parseFloat($(".a-color-price", $(element).html()).text()?.slice(1));
			}

			if (price) {
				device.amazonLink = $("a", $(element).html()).attr("href")?.split("/ref=")[0];
				device.amazonAsin = device.amazonLink?.split("/dp/")[1];
				device.amazonLink = device.amazonLink + "/";
				device.amazonThumbnail = $("img", $(element).html()).attr("src")?.replace(/_[a-z]{2}\d{3}_/gi, "_UY436_");
				device.amazonCategory = deviceType;
				device.amazonName = $(".s-access-title", $(element).html()).text();
				device.amazonPrice = isNaN(price) ? price.match(/\d+(\.|\,)*\d*/)[0] : price;

				allDevices.push(device);
			}
		});
		return;
	}
}


async function filterDevices() {

	await mdb.collection("indices").findOne({ "name": "all-devices-index" })
	.then(doc => {
		if (doc) {
			fullNameIndex = doc.fullNameIndex;
		}
	}).catch(error => console.log(error));

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
						allDevices[i].id = fullNameIndex[j].replace(/\ /gm, "-");
						allDevices[i].fullName = fullNameIndex[j];
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

	try {

		for (let i = 0; i < arrLength; i++) {

			let device;

			await mdb.collection("all-firmware-devices").findOne({ "fullName": supportedDevices[i].fullName })
			.then(device => {
				
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
					supportedDevices[i].brand = device?.company?.toUpperCase() ?? "Generic";
					supportedDevices[i].amazonUpdatedOn = new Date().toLocaleString(`en-${COUNTRY}`, {timeZone: "UTC"}) + " UTC";
					supportedDevices[i].serialNumber = serialNumber++;

					supportedDevices[i] = {...supportedDevices[i], ...device};

				} else {
					console.log(`ERROR! No device with the name ${supportedDevices[i].fullName} found!`);
				}
			});
		}
	} catch (error) {
		console.log(error);
	}
}

async function addToDatabase() {

	let fullNameIndex = [];
	let newIndex = [];

	try {

		const bulkOpType = mdb.collection(`${COUNTRY}-${deviceType}`).initializeUnorderedBulkOp();
		const bulkOpAll = mdb.collection(`${COUNTRY}-all-devices`).initializeUnorderedBulkOp();
		const bulkOpDetails = mdb.collection(`${COUNTRY}-device-details`).initializeUnorderedBulkOp();

		let arrLength = supportedDevices.length;
		for (let i = 0; i < arrLength; i++) {
			bulkOpType.find({ fullName: supportedDevices[i].fullName }).upsert().updateOne({ $set: supportedDevices[i] });
			bulkOpAll.find({ fullName: supportedDevices[i].fullName }).upsert().updateOne({ $set: supportedDevices[i] });
			bulkOpDetails.find({ fullName: supportedDevices[i].fullName }).upsert().updateOne({ $set: supportedDevices[i] });

			newIndex.push(supportedDevices[i].fullName);
		}

		await bulkOpType.execute();
		await bulkOpAll.execute();
		await bulkOpDetails.execute();

		await mdb.collection("indices").findOne({ name: `${COUNTRY}-${deviceType}-index` })
		.then(doc => {
			if (doc) {
				fullNameIndex = doc.fullNameIndex;
			}
		});

		await mdb.collection("indices").updateOne({ name: `${COUNTRY}-${deviceType}-index` }, 
			{ $set: { fullNameIndex: newIndex } }, { upsert: true });

		await mdb.collection("indices").updateOne({ name: `${COUNTRY}-all-devices-index` }, 
			{ $push: { fullNameIndex: { $each: newIndex } }}, { upsert: true });
		
		let indexLength = fullNameIndex.length;
		for (let i = 0; i < indexLength; i++) {
			if (!newIndex.includes(fullNameIndex[i])) {
				await mdb.collection(`${COUNTRY}-${deviceType}`).deleteMany({ fullName: fullNameIndex[i] });
				console.log('Deleted: ', fullNameIndex[i]);
			}
		}
	} catch (error) {
		console.log(error);
	}

	client.close();

}

main();