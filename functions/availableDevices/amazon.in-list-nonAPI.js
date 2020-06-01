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


async function getDevices() {

	const amazonRouters = "https://www.amazon.in/s?i=computers&rh=n%3A976392031%2Cn%3A976393031%2Cn%3A1375427031%2Cn%3A1375439031&qid=1590958154&page=";
	let fullNameIndex = [];

	await indicesRef.doc("all-routers-index").get()
	.then(doc => {
		if (doc.data()) {
			fullNameIndex = doc.data().fullNameIndex;
		}
	});

	// console.dir(fullNameIndex, {maxArrayLength: null});


	let deviceArray = [];
	let numberOfDevices = 0;


	// for (let page = 1;;page++) {

		let isPageContains = false;

		// console.log("PAGE: ", page);

		await axios.get(amazonRouters + 30)
		.then(res => {

			// $(".s-result-item", res.data).each((i, element) => {
			// 	console.log($(element).html());
			// });
				
			if ($("span", ".s-result-item", res.data).attr("class") == "celwidget slot=MAIN template=TOP_BANNER_MESSAGE widgetId=messaging-messages-no-results") {
				console.log("No more items.");
			} else {
				console.log('has items');
			}

			console.log("YES");

			// 	// console.log($(element).html());
			// 	numberOfDevices++;
			// 	console.log("SERIAL NO: ", numberOfDevices);
			// 	isPageContains = true;
			// });
		});

		// if (!isPageContains) {
		// 	console.log('__________End of Pages.____________');
		// 	break;
		// }
	// }

}

getDevices();