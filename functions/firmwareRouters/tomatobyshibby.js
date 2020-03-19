const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

let mainTable = [];
let loaded = false;

exports.createTomatobyshibbyList = async function() {
	return axios.get("https://tomato.groov.pl/download/")
	.then(result => {
		//Checks if there is any change in last uploaded dates
		
		$('.fb-d', result.data).each((i, element) => {
			if (i > 1) {
				let year = $(element).text().slice(0, 4);
				checkForChange(year);
			}
		});
	}).catch(error => {
		console.log(error);
		return false;
	});
}

async function checkForChange(year) {
	if (Number(year) > 2019 && loaded === false) {
		await getMainTable();
		loaded = true;
		await setMainTable(mainTable);
		return true;
	}
}

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
										mainTable.push({ "fullName" : $(element).text().split('/').join('&')});
										let nameArray = $(element).text().split(" ");
										mainTable[j-1]["company"] = nameArray[0];
										mainTable[j-1]["model"] = nameArray[1];
										if (nameArray[2]) {
											mainTable[j-1]["version"] = nameArray[2].split('/').join('&');
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
				return mainTable
		}).catch(error => {
				console.log(error);
				return false;
		});
}

async function setMainTable(devices) {
	const mainListRef = db.collection('tomatobyshibby-main-list');
	let fullNameIndex = await mainListRef.doc("index").get().then((doc) => {
		return doc.data().fullNameIndex;
	});
	
	let arrayLength = devices.length;
	for (let i = 0; i < arrayLength; i++) {
		if (!fullNameIndex.includes(devices[i].fullName)) {
			await mainListRef.doc(devices[i].fullName).set({
				fullName: devices[i].fullName,
				company: devices[i].company,
				model: devices[i].model,
				version: devices[i].version,
				specs: devices[i].specs,
				firmwareVersion: devices[i].firmwareVersion,
				notes: devices[i].notes
			});

			await mainListRef.doc("index").update({
				fullNameIndex: admin.firestore.FieldValue.arrayUnion(devices[i].fullName)
			});
		}
	}

	//Routers not included in the Main Table

	if (!fullNameIndex.includes("Belkin F5D8235-4 v3")) {
		await mainListRef.doc("Belkin F5D8235-4 v3").set({
			fullName: "Belkin F5D8235-4 v3",
			company: "Belkin",
			model: "F5D8235-4",
			version: "v3",
			specs: "8MB Flash, 32MB RAM",
			firmwareVersion: "K26",
			notes: ""
		})
		await mainListRef.doc("index").update({
			fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin F5D8235-4 v3")
		});
	}

	if (!fullNameIndex.includes("Belkin F7D3301")) {
		await mainListRef.doc("Belkin F7D3301").set({
			fullName: "Belkin F7D3301",
			company: "Belkin",
			model: "F7D3301",
			version: "",
			specs: "8MB Flash, 64MB RAM",
			firmwareVersion: "K26",
			notes: ""
		})
		await mainListRef.doc("index").update({
			fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin F7D3301")
		});
	}

	if (!fullNameIndex.includes("Belkin F7D3302")) {
		await mainListRef.doc("Belkin F7D3302").set({
			fullName: "Belkin F7D3302",
			company: "Belkin",
			model: "F7D3302",
			version: "",
			specs: "8MB Flash, 64MB RAM",
			firmwareVersion: "K26",
			notes: ""
		})
		await mainListRef.doc("index").update({
			fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin F7D3302")
		});
	}

	if (!fullNameIndex.includes("Belkin F7D4302")) {
		await mainListRef.doc("Belkin F7D4302").set({
			fullName: "Belkin F7D4302",
			company: "Belkin",
			model: "F7D4302",
			version: "",
			specs: "8MB Flash, 64MB RAM",
			firmwareVersion: "K26",
			notes: ""
		})
		await mainListRef.doc("index").update({
			fullNameIndex: admin.firestore.FieldValue.arrayUnion("Belkin F7D4302")
		});
	}

	if (!fullNameIndex.includes("Asus RT-AC56S")) {
		await mainListRef.doc("Asus RT-AC56S").set({
			fullName: "Asus RT-AC56S",
			company: "Asus",
			model: "RT-AC56S",
			version: "",
			specs: "128MB Flash, 128MB RAM",
			firmwareVersion: "K26ARM",
			notes: ""
		})
		await mainListRef.doc("index").update({
			fullNameIndex: admin.firestore.FieldValue.arrayUnion("Asus RT-AC56S")
		});
	}

	if (!fullNameIndex.includes("Buffalo WZR-1750DHP")) {
		await mainListRef.doc("Buffalo WZR-1750DHP").set({
			fullName: "Buffalo WZR-1750DHP",
			company: "Buffalo",
			model: "WZR-1750DHP",
			version: "",
			specs: "128MB Flash, 512MB RAM",
			firmwareVersion: "K26ARM",
			notes: ""
		})
		await mainListRef.doc("index").update({
			fullNameIndex: admin.firestore.FieldValue.arrayUnion("Buffalo WZR-1750DHP")
		});
	}

	if (!fullNameIndex.includes("Tenda W1800R")) {
		await mainListRef.doc("Tenda W1800R").set({
			fullName: "Tenda W1800R",
			company: "Tenda",
			model: "W1800R",
			version: "",
			specs: "16MB Flash, 256MB RAM",
			firmwareVersion: "K26RT-AC",
			notes: ""
		})
		await mainListRef.doc("index").update({
			fullNameIndex: admin.firestore.FieldValue.arrayUnion("Tenda W1800R")
		});
	}

	if (!fullNameIndex.includes("Linksys E1200 v2")) {
		await mainListRef.doc("Linksys E1200 v2").set({
			fullName: "Linksys E1200 v2",
			company: "Linksys",
			model: "E1200",
			version: "v2",
			specs: "8MB Flash, 32MB RAM",
			firmwareVersion: "K26RT-N",
			notes: ""
		})
		await mainListRef.doc("index").update({
			fullNameIndex: admin.firestore.FieldValue.arrayUnion("Linksys E1200 v2")
		});
	}
	return true;
}