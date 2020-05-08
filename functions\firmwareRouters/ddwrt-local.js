const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const ddwrtRef = db.collection("ddwrt-main-list");

// exports.updateDdwrtList = async function() {
async function updateDdwrtList() {
	let lastModified = "";
	let currentModified = "";

	await ddwrtRef.doc("lastModified").get()
	.then((doc) => {
		lastModified = doc.data().modString;
	}).catch(error => console.log(error));

	axios.get("https://wiki.dd-wrt.com/wiki/index.php/Supported_Devices")
	.then((res) => {	
		currentModified = $("#f-lastmod", res.data).text().trim();

		if (!(lastModified === currentModified)) {
			console.log("DD-WRT device list has been modified!");

			db.collection("mail").add({
				to: "freetherouter@gmail.com",
				message: {
					subject: "DD-WRT has been updated",
					text: "DD-WRT device list has been updated"
				}
			}).then(() => console.log('Queued email for delivery!'));

			ddwrtRef.doc("lastModified").set({
				modString: currentModified
			}).catch(error => console.log(error));

			getDdwrtList(res.data);
		} else {
			console.log('Device list has not been modified.');
		}

	}).catch(error => console.log(error));
}

async function getDdwrtList(html) {
	let brandList = [];
	let deviceArray = [];

	$("h3, h4", html).each((i, element) => {
		if (i > 3) {
			let brand = $(element).text().split("]")[1].trim();

			switch (brand) {
				case "Linksys (Wireless a/b/g/n/ac)":
				case "Cisco":
				case "EnGenius":
				case "Ovislink":
				case "Verizon":
					//do nothing
					break;
				case "Linksys (Wireless a/b/g)":
					brandList.push("Linksys/Cisco");
					break;
				case "Linksys":
					brandList.push("Linksys/Cisco");
					break;
				case "Linksys Valet":
					brandList.push("Linksys Valet/Cisco Valet");
					break;
				case "Airlive":
					brandList.push("Airlive/Ovislink");
					break;
				case "Planex aka PCi":
					brandList.push("Planex/PCi");
					break;
				case "Senao / EnGenius":
					brandList.push("Senao/EnGenius");
					break;
				case "Actiontec":
					brandList.push("Actiontec/Verizon");
					break;
				default:
					brandList.push(brand);
					break;
			}
		}
	});
	// console.log(brandList);

	$("table", html).each((i, element) => {
		if (i > 0) {
			let PoE = false;

			// Select the brand tables that have a "PoE" column
			$("th", $(element).html()).each((j, element) => {
				if (/PoE/g.test($(element).text())) {
					PoE = true;
				}
			});

			$("tr", $(element).html()).each((j, element) => {
				let device = {};
				let RAM = "";
				let companyArray = [];
				let altBrandDevice = {};

				if (j > 0) {
					$("td", $(element).html()).each((k, element) => {

						switch(k) {
							case 0:
								let nameArray = $(element).html().replace(/<br>/gmi, " ").replace(/(<a.*">)|<\/a>|(&amp;)|\n/gmi, "").replace(/-\s/gmi, "-").split("(");
								// console.log(nameArray);
								device["model"] = nameArray[0];
								if (nameArray[1]) {
									device["WiFi"] = nameArray[1].replace(")", "");
								} else {
									device["WiFi"] = "";
								}
								break;
							case 1:
								device["version"] = $(element).html().replace(/<br>/gi, "&").replace(/\n|(&quot;)|(&#xA0;)|(&#xA0;?)|\-|\?/gmi, "").trim();
								break;
							case 4:
								RAM = $(element).text().trim();
								break;
							case 5:
								device["specs"] = $(element).text().trim() + "MB Flash, " + RAM + "MB RAM";
								break;
							case 13:
								if (!PoE) {
									device["featureNotes"] = $(element).text().trim().replace(/(^\-$)|\?/, "");
									if (/USB/gi.test($(element).text())) {
										device["USB"] = true;
									} else {
										device["USB"] = false;
									}
								}
								break;
							case 14:
								if (!PoE) {
									if (/(TBD)|(WIP)/gm.test($(element).text().trim())) {
										device["ddwrtSupport"] = false;
									} else {
										device["ddwrtSupport"] = true;
									}
								} else {
									device["featureNotes"] = $(element).text().trim().replace(/^\-$/, "");
									if (/USB/gi.test($(element).text())) {
										device["USB"] = true;
									} else {
										device["USB"] = false;
									}
								}
								break;
							case 15:
								if (!PoE) {
									if (/(donated\s?router\s?needed)/gmi.test($(element).text().trim())) {
										device["ddwrtSupport"] = false;
									} else if (/(needs\s?DD-WRT\s?activation)/gmi.test($(element).text().trim())) {
										device["needsActivation"] = true;
									} else {
										device["needsActivation"] = false;
									}
								} else {
									if (/(TBD)|(WIP)/gm.test($(element).text().trim())) {
										device["ddwrtSupport"] = false;
									} else {
										device["ddwrtSupport"] = true;
									}
								}						
								break;
							case 16:
								if (PoE) {
									if (/(donated\s?router\s?needed)/gmi.test($(element).text().trim())) {
										device["ddwrtSupport"] = false;
									} else if (/(needs\s?DD-WRT\s?activation)/gmi.test($(element).text().trim())) {
										device["needsActivation"] = true;
									} else {
										device["needsActivation"] = false;
									}
									break;
								}
						}	
					});
					companyArray = brandList[i-1].split("/");
					//Copy the array for alt Brand device
					altBrandDevice = { ...device };

					device["company"] = companyArray[0];
					device["fullName"] = device.company + " " + device.model;
					deviceArray.push(device);
		
					if (companyArray[1]) {
						altBrandDevice["company"] = companyArray[1];
						altBrandDevice["fullName"] = altBrandDevice.company + " " + altBrandDevice.model;
						deviceArray.push(altBrandDevice);
					}
					
				}
			})

		}
		
	});
	// console.dir(deviceArray, {'maxArrayLength': null});
	modifyDatabase(deviceArray);
}

async function modifyDatabase(deviceArray) {
	ddwrtRef.doc("index").get()
	.then(async (doc) => {
		let index = doc.data().fullNameIndex;

		let length = deviceArray.length;
		for (let i = 0; i < length; i++) {
			if (!(index.includes(deviceArray[i].fullName.replace(/\//gmi, "-") + deviceArray[i].version.replace(/\//gmi, "-")))) {
				if (deviceArray[i].ddwrtSupport) {
					await ddwrtRef.doc(deviceArray[i].fullName.replace(/\//gmi, "-") + deviceArray[i].version.replace(/\//gmi, "-")).set({
						fullName: deviceArray[i].fullName,
						company: deviceArray[i].company,
						model: deviceArray[i].model,
						version: deviceArray[i].version,
						specs: deviceArray[i].specs,
						WiFi: deviceArray[i].WiFi,
						USB: deviceArray[i].USB,
						notes: deviceArray[i].featureNotes,
						needsActivation: deviceArray[i].needsActivation,
						LAN: ""
					}).catch(error => console.log(error));

					await ddwrtRef.doc("index").update({
						fullNameIndex: admin.firestore.FieldValue.arrayUnion(deviceArray[i].fullName.replace(/\//gmi, "-") + deviceArray[i].version.replace(/\//gmi, "-"))
					}, {merge: true})
					.catch(error => console.log(error));
				}
			}
		}
		ddwrtRef.doc("index").set({
			updatedOn: new Date()
		}, {merge: true})
		.catch(error => console.log(error));
	})
}

// async function modifyDatabase(deviceArray) {
// 	let length = deviceArray.length;
// 	for (let i = 0; i < length; i++) {
// 		if (deviceArray[i].ddwrtSupport) {
// 			console.log(deviceArray[i].fullName.replace(/\//gmi, "-") + deviceArray[i].version.replace(/\//gmi, "-"));
// 			console.log(i)
// 		}
// 	}
// }

updateDdwrtList();