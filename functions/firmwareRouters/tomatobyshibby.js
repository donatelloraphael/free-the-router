const {PubSub} = require('@google-cloud/pubsub');
const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});

const pubSubClient = new PubSub();

let mainTable = [];

exports.createTomatobyshibbyList = function() {
	
}

axios.get("https://tomato.groov.pl/download/")
	.then(result => {
		//Checks if there is any change in last uploaded dates
		let loaded = false;
		$('.fb-d', result.data).each((i, element) => {
			if (i > 0) {
				let year = $(element).text().slice(0, 4);
				if (Number(year) > 2016 && loaded === false) {
					getMainTable()
						.then((devices) => {
							setMainTable(devices);
						});
					loaded = true;
				}
			}
		});
	}).catch(error => {
		console.log(error);
	})

function getMainTable() {
	return axios.get("https://tomato.groov.pl/?page_id=69")
		.then(result => {
			$('tbody', result.data).each((i, element) => { 
				if (i === 0) {
					$('tr', $(element)).each((j, element) => {					
						if (j > 0) {
							$("td", $(element)).each((k, element) => {

								switch (k) {

									case 0: 
										//Needs to push an object first to initialize mainTable as an array of objects and avoid undefined errors
										mainTable.push({ "fullName" : $(element).text()});
										let nameArray = $(element).text().split(" ");
										mainTable[j-1]["company"] = nameArray[0];
										mainTable[j-1]["model"] = nameArray[1];
										if (nameArray[2]) {
											mainTable[j-1]["version"] = nameArray[2];
										} else {
											mainTable[j-1]["version"] = '';
										}
										break;

									case 4:
										let specsArray = $(element).text().split("/");
										mainTable[j-1]["specs"] = specsArray[0] + "MB Flash, " + specsArray[1] + " RAM";
										break;

									case 5:
										mainTable[j-1]["firmwareVersion"] = $(element).text();
										break;

									case 6:
										if (!$(element).text()) {
											mainTable[j-1]["notes"] = "";
										}
										mainTable[j-1]["notes"] = $(element).text();
										break;
								}
							})							
						}
					});
				}
 			})
		}).then(() => {
			return mainTable});
}

funtion setMainTable() {

}
