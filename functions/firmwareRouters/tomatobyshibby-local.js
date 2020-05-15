// Checks and Updates Automatically

const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const tomatobyshibbyRef = db.collection('tomatobyshibby-main-list');
const allFirmwareRoutersRef = db.collection("all-firmware-routers");

// exports.checkAndUpdateTomatobyshibby = async function() {
async function checkAndUpdateTomatobyshibby() {

	let mainTable = [];
	let loaded = false;

	return await axios.get("https://tomato.groov.pl/download/")
	.then(result => {
		//Checks if there is any change in last uploaded dates
		
		$('.fb-d', result.data).each(async function (i, element) {
			if (i > 1) {
				let year = $(element).text().slice(0, 4);

				/////////////// checkForChange(year);//////////////////////////

				if (Number(year) > 2014 && loaded === false) {
					
					loaded = true;	// DON'T change position

					///////////// await getMainTable(); from tomatobyshibby site//////////////

					await axios.get("https://tomato.groov.pl/?page_id=69")
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
													mainTable[j-1].company = nameArray[0];
													mainTable[j-1].model = nameArray[1];
													if (nameArray[2]) {
														mainTable[j-1].version = nameArray[2].split('/').join('&');
													} else {
														mainTable[j-1].version = '';
													}
													break;

												case 4:
													let specsArray = $(element).text().split("/");
													mainTable[j-1].specs = specsArray[0] + "MB Flash, " + specsArray[1] + " RAM";
													break;

												case 5:
													mainTable[j-1].firmwareVersion = $(element).text();
													break;

												case 6:
													if (!$(element).text()) {
														mainTable[j-1].notes = "";
													}
													mainTable[j-1].notes = $(element).text();
													break;
											}
										});
									}
								});
							}
			 			});
					}).catch(error => console.log(error));

					//////////////////////////////////////////////////////////////////////////

					///////////await setMainTable(mainTable);/////////////////////////////////

					let fullNameIndex = await tomatobyshibbyRef.doc("index").get()
					.then((doc) => {
						return doc.data().fullNameIndex;
					});

					//	Get index of all routers supporting all firmwares

					let dbAllRoutersList = await allFirmwareRoutersRef.doc("index").get()
					.then((doc) => {
						return doc.data().fullNameIndex;
					});

					// console.dir(mainTable, {'maxArrayLength': null});

					let modified = false;
					let tomatobyshibbyArray = [];
					let tomatobyshibbyIndex = [];
					let allRoutersArray = [];
					let allRoutersIndex = [];
					let allRoutersModifyArrray = [];


					let arrayLength = mainTable.length;
					for (let i = 0; i < arrayLength; i++) {
						if (!fullNameIndex.includes(mainTable[i].fullName)) {

							modified = true;

							// tomatobyshibbyRef.doc(mainTable[i].fullName).set({
							tomatobyshibbyArray.push({
								fullName: mainTable[i].fullName,
								company: mainTable[i].company,
								model: mainTable[i].model,
								version: mainTable[i].version,
								specs: mainTable[i].specs,
								firmwareVersion: mainTable[i].firmwareVersion,
								notes: mainTable[i].notes
							});

							// tomatobyshibbyRef.doc("index").set({
							tomatobyshibbyIndex.push(mainTable[i].fullName);

							// Add routers to aggragated router list supporting all firmwares/////
							//////////////////////////////////////////////////////////////////////

							let companyModel = ((mainTable[i].company + " " + mainTable[i].model).replace(/\//gi, "&")).toUpperCase();

							if (!(dbAllRoutersList.includes(companyModel))) {

								// allFirmwareRoutersRef.doc(companyModel).set({
								allRoutersArray.push({
									fullName: companyModel,
									company: mainTable[i].company,
									model: mainTable[i].model,
									tomatobyshibbySupport: true,
									tomatobyshibbySupportedVersions: admin.firestore.FieldValue.arrayUnion(mainTable[i].version),						
									specs: {[mainTable[i].version ? mainTable[i].version : "specs"]: mainTable[i].specs},
									USB: {USB: ""},
									LAN: {LAN: ""},
									tomatobyshibbyFirmwareVersion: mainTable[i].firmwareVersion,
									tomatobyshibbyNotes: mainTable[i].notes
								});

								allRoutersIndex.push(companyModel);									

							} else {
								// Only need some fields if router already exists in list

								// allFirmwareRoutersRef.doc(companyModel).set({							
								allRoutersModifyArrray.push({
									tomatobyshibbyFirmwareVersion: mainTable[i].firmwareVersion,
									tomatobyshibbyNotes: mainTable[i].notes,
									tomatobyshibbySupport: true,
									tomatobyshibbySupportedVersions: admin.firestore.FieldValue.arrayUnion(mainTable[i].version),
									[`${'specs.' + mainTable[i].version ? mainTable[i].version : "specs"}`]: mainTable[i].specs
								});
							}
						}
					}

					if (modified) {
						await Promise.all([
							tomatobyshibbyArray.map((device, index) => tomatobyshibbyRef.doc(device.fullName).set(device, {merge: true})),
							tomatobyshibbyRef.doc("index").set({
								fullNameIndex: admin.firestore.FieldValue.arrayUnion(...tomatobyshibbyIndex)
							}, {merge: true}),

							allRoutersArray.map((device, index) => allFirmwareRoutersRef.doc(device.fullName).set(device, {merge: true})),
							allFirmwareRoutersRef.doc("index").set({
								fullNameIndex: admin.firestore.FieldValue.arrayUnion(...allRoutersIndex)
							}, {merge: true}),

							allRoutersModifyArrray.map((device, index) => allFirmwareRoutersRef.doc(device.fullName).set(device, {merge: true}))
						]);

						tomatobyshibbyRef.doc("index").set({
							updatedOn: new Date()
						}, {merge: true});

						allFirmwareRoutersRef.doc("index").set({
							updatedOn: new Date()
						}, {merge: true});
					}

					await db.collection("mail").add({
						to: "freetherouter@gmail.com",
						message: {
							subject: "Tomato by Shibby has been updated",
							text: "Tomato by Shibby device list has been updated"
						}
					}).then(() => console.log('Tomato by Shibby: Queued email for delivery!'))
					.catch(error => console.log(error));

				}
			}
		});

	}).then(() => {
		return true;
	}).catch((error) => {
		console.log(error);
		return false;
	});
};



/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////Add Extra Routers//////////////////////////////////////////////////////
//////////////Routers not included in the Main Table/////////////////////////////////////////

let extraRouters = [];

function createExtraRouters() {

	extraRouters.push({
		fullName: "Belkin F5D8235-4 v3",
		company: "Belkin",
		model: "F5D8235-4",
		version: "v3",
		specs: "8MB Flash, 32MB RAM",
		firmwareVersion: "K26",
		notes: ""
	});

	extraRouters.push({
		fullName: "Belkin F7D3301",
		company: "Belkin",
		model: "F7D3301",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		notes: ""
	});
		

	extraRouters.push({
		fullName: "Belkin F7D3302",
		company: "Belkin",
		model: "F7D3302",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		notes: ""
	});

	extraRouters.push({
		fullName: "Belkin F7D4302",
		company: "Belkin",
		model: "F7D4302",
		version: "",
		specs: "8MB Flash, 64MB RAM",
		firmwareVersion: "K26",
		notes: ""
	});

	extraRouters.push({
		fullName: "Asus RT-AC56S",
		company: "Asus",
		model: "RT-AC56S",
		version: "",
		specs: "128MB Flash, 128MB RAM",
		firmwareVersion: "K26ARM",
		notes: ""
	});
		
	extraRouters.push({
		fullName: "Buffalo WZR-1750DHP",
		company: "Buffalo",
		model: "WZR-1750DHP",
		version: "",
		specs: "128MB Flash, 512MB RAM",
		firmwareVersion: "K26ARM",
		notes: ""
	});

	extraRouters.push({
		fullName: "Tenda W1800R",
		company: "Tenda",
		model: "W1800R",
		version: "",
		specs: "16MB Flash, 256MB RAM",
		firmwareVersion: "K26RT-AC",
		notes: ""
	});
		
	extraRouters.push({
		fullName: "Linksys E1200 v2",
		company: "Linksys",
		model: "E1200",
		version: "v2",
		specs: "8MB Flash, 32MB RAM",
		firmwareVersion: "K26RT-N",
		notes: ""
	});

}

async function uploadExtraRouters() {

	let fullNameIndex = await tomatobyshibbyRef.doc("index").get()
	.then((doc) => {
		return doc.data().fullNameIndex;
	}).catch(error => console.log(error));

	//	Get index of all routers supporting all firmwares

	let dbAllRoutersList = await allFirmwareRoutersRef.doc("index").get()
	.then((doc) => {
		return doc.data().fullNameIndex;
	}).catch(error => console.log(error));

	let arrayLength = extraRouters.length;
	for (let i = 0; i < arrayLength; i++) {
		if (!fullNameIndex.includes(extraRouters[i].fullName)) {
			tomatobyshibbyRef.doc(extraRouters[i].fullName).set({
				fullName: extraRouters[i].fullName,
				company: extraRouters[i].company,
				model: extraRouters[i].model,
				version: extraRouters[i].version,
				specs: extraRouters[i].specs,
				firmwareVersion: extraRouters[i].firmwareVersion,
				notes: extraRouters[i].notes
			});

			tomatobyshibbyRef.doc("index").set({
				fullNameIndex: admin.firestore.FieldValue.arrayUnion(extraRouters[i].fullName),
				updatedOn: new Date()
			}, {merge: true});

			// Add routers to aggragated router list supporting all firmwares/////
			//////////////////////////////////////////////////////////////////////

			let companyModel = ((extraRouters[i].company + " " + extraRouters[i].model).replace(/\//gi, "&")).toUpperCase();

			if (!(dbAllRoutersList.includes(companyModel))) {
				allFirmwareRoutersRef.doc(companyModel).set({
					fullName: companyModel,
					company: extraRouters[i].company,
					model: extraRouters[i].model,
					tomatobyshibbySupport: true,
					tomatobyshibbySupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version),						
					specs: {[extraRouters[i].version ? extraRouters[i].version : "specs"]: extraRouters[i].specs},
					USB: {USB: ""},
					LAN: {LAN: ""},
					tomatobyshibbyFirmwareVersion: extraRouters[i].firmwareVersion,
					tomatobyshibbyNotes: extraRouters[i].notes
				}, {merge: true});

				allFirmwareRoutersRef.doc("index").set({
					fullNameIndex: admin.firestore.FieldValue.arrayUnion(companyModel),
					updatedOn: new Date()
				}, {merge: true});

			} else {
				// Only need some fields if router already exists in list
				allFirmwareRoutersRef.doc(companyModel).set({							
					tomatobyshibbyFirmwareVersion: extraRouters[i].firmwareVersion,
					tomatobyshibbyNotes: extraRouters[i].notes,
					tomatobyshibbySupport: true,
					tomatobyshibbySupportedVersions: admin.firestore.FieldValue.arrayUnion(extraRouters[i].version),
					[`${'specs.' + extraRouters[i].version ? extraRouters[i].version : "specs"}`]: extraRouters[i].specs
				}, {merge: true});

				allFirmwareRoutersRef.doc("index").set({
					updatedOn: new Date()
				}, {merge: true});

			}
		}
	}
}

// createExtraRouters();
// uploadExtraRouters();
checkAndUpdateTomatobyshibby();