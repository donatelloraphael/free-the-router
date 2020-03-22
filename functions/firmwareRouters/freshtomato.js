const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const deviceArray = [];

async function createFreshtomatoList() {
	axios.get("https://en.wikipedia.org/wiki/Tomato_(firmware)")
		.then((res) => {
			$("td", "p + table", res.data).each((i, element) => {

				//13 is the number of columns
				switch(i % 13) {
					case 0:
						deviceArray[i / 13] = { "fullName": $(element).text().trim() };
						let nameArray = $(element).text().trim().split(" ");
						if (!nameArray[2]) {
							nameArray[2] = '';
						}
						deviceArray[Math.trunc(i / 13)]["company"] = nameArray[0];
						deviceArray[Math.trunc(i / 13)]["model"] = nameArray[1] + " " + nameArray[2];
						break;
					case 1:
						deviceArray[Math.trunc(i / 13)]["version"] = $(element).text().trim();
						break;
					case 4:
						deviceArray[Math.trunc(i / 13)]["LAN"] = $(element).text().trim();
						break;
					case 5:
						deviceArray[Math.trunc(i / 13)]["USB"] = Number($(element).text().trim()) > 0 ? "Yes" : "No";
						break;
					case 6:
						deviceArray[Math.trunc(i / 13)]["USB"] = Number($(element).text().trim()) > 0 ? "Yes" : deviceArray[Math.trunc(i / 13)]["USB"];
						break;
					case 7:
						deviceArray[Math.trunc(i / 13)]["WiFi"] = $(element).text().trim();
						break;
					case 8: 
						deviceArray[Math.trunc(i / 13)]["specs"] = $(element).text().trim() + " Flash, ";
						break;
					case 10:
						deviceArray[Math.trunc(i / 13)]["specs"] += ($(element).text().trim() + " RAM");
						break;
					case 11:
						deviceArray[Math.trunc(i / 13)]["firmwareVersion"] = $(element).text().trim();
						break;
					case 12:
						deviceArray[Math.trunc(i / 13)]["notes"] = $(element).text().trim();
						break;
				}
			});
		}).then(() => {
			console.log(deviceArray);
		});
}

createFreshtomatoList();