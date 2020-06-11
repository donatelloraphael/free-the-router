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
const amazonRef = db.collection("india").doc("amazon.in");

let fullNameIndex = [];
let allDevices = [];
let availableDevices = [];

// axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; ) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4086.0 Safari/537.36';
let axiosInstance = axios.create({
  headers: {
    get: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; ) AppleWebKit/536.36 (KHTML, like Gecko) Chrome/84.0.4086.0 Safari/536.36'
    }
  }
});

async function test() {

	axiosInstance.get("https://www.amazon.in/s?i=computers&rh=n%3A976392031%2Cn%3A976393031%2Cn%3A1375427031%2Cn%3A1375439031&page=2&qid=1590958154")
	.then(doc => {
		// console.log(doc.data);
		let deviceNumbers = $("span", ".s-breadcrumb", doc.data).html().split(" ")[0].split("-");
		if (parseInt(deviceNumbers[0]) > parseInt(deviceNumbers[1])) {
			console.log('__________No more devices_________');
		} else {
			console.log("PAGE: contains devices");
		}
		// console.log(deviceNumbers);
	})
	.catch(error => console.log(error));

test();