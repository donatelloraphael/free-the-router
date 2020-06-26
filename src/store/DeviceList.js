import Vuex from 'vuex';

import {db} from '~/plugins/firebase.js';

const DeviceListModule = {
	namespaced: true,

	state() {
		return {
			deviceList: [],
			searchResult: [],
			oldSearch: ""
		};
	},

	getters: {
		getDeviceList(state) {
			return state.deviceList;
		},
		getSearchResult(state) {
			return state.searchResult;
		}
	},

	mutations: {
		setDeviceList(state, devices) {
			state.deviceList = devices;
		},
		setSearchResult(state, device) {
			state.searchResult.push(device);
		},
		clearSearchResult(state) {
			state.searchResult = [];
		},
		setOldSearch(state, term) {
			state.oldSearch = term;
		}
	},

	actions: {
		async populateDeviceList(vuexContext, query) {
			let devices = [];
			let category = "";

			switch (query.category) {
				case "all-devices": category = "all-devices"; break;
				case "routers": category = "routers"; break;
				case "modems": category = "modems"; break;
				case "repeaters-extenders": category = "repeaters & extenders"; break;
				case "wireless-access-points": category = "wireless access points"; break;
				default: category = "all-devices"; break;
			}

			// If there are query strings
			if (query.q) {
				// If the query is a search
				if (query.search) {
					let dbSearchResult = await vuexContext.dispatch("searchDevices", {query, category});

					return vuexContext.dispatch("filterSearchResults", {dbSearchResult, query});
				}

			} else {

				return db.collection("india").doc("amazon.in").collection("routers").orderBy("serialNumber").limit(18).get()
				.then(docs => {
					docs.forEach(doc => {
						devices.push(doc.data());
					});
				}).then(() => {
					vuexContext.commit("setDeviceList", devices);
					return devices;
				}).catch(error => console.log(error));
				
			}
		},

		async searchDevices(vuexContext, {query, category}) {
			if (vuexContext.state.oldSearch != query.search) {

				vuexContext.commit("clearSearchResult");

				let dbAllDevicesIndex = [];
				let matchDevicesIndex = [];

				await db.doc(`india/metaData/indices/amazon-${category}-index`).get()
				.then(doc => {
					if (doc.data()) {
						dbAllDevicesIndex = doc.data().fullNameIndex;
					}
				});

				let searchArray = query.search.split(/_|-/gmi);

				let indexLength = dbAllDevicesIndex.length;
				for (let i = 0; i < indexLength; i++) {
					let matchCount = 0;
					for (let j = 0; j < searchArray.length; j++) {
						let regex = new RegExp(searchArray[j], "gmi");
							// console.log("device: ", dbAllDevicesIndex[i]);
							// console.log(regex);
						if (regex.test(dbAllDevicesIndex[i])) {
							matchCount++;
						}
						if (matchCount == searchArray.length) {
							matchDevicesIndex.push(dbAllDevicesIndex[i]);
						}
					}
				}

				let resultLength = matchDevicesIndex.length;

				if (process.client) {
					// console.log("client");
					try {
						for (let i = 0; i < resultLength; i++) {
							db.doc(`india/amazon.in/${category}/${matchDevicesIndex[i]}`).get()
							.then (doc => {
								if (doc.data()) {
									vuexContext.commit("setSearchResult", doc.data());
								}
							});
						}
					} catch (error) {
						console.log(error);
					}
				} else {
					// console.log('server');
					try {
						for (let i = 0; i < resultLength; i++) {
							await db.doc(`india/amazon.in/${category}/${matchDevicesIndex[i]}`).get()
							.then (doc => {
								if (doc.data()) {
									vuexContext.commit("setSearchResult", doc.data());
								}
							});
						}
					} catch (error) {
						console.log(error);
					}
				}
				

				vuexContext.commit("setOldSearch", query.search);
			}
			return vuexContext.getters.getSearchResult;			
		},

		filterSearchResults(vuexContext, {dbSearchResult, query}) {

			// Sorting resulting array according to price
			if (query.sort == "lth") {	// Low to High
				dbSearchResult.sort((a, b) => parseInt(a.price) - parseInt(b.price));
			} else if (query.sort == "htl") {	// High to Low
				dbSearchResult.sort((a, b) => parseInt(b.price) - parseInt(a.price));
			}

			// Filtering by brand
			if (query.brands) {
				if (Array.isArray(query.brands)) {							
					dbSearchResult = dbSearchResult.filter(device => {
						for (let i = 0; i < query.brands.length; i++) {
							if (device.brand == query.brands[i].toUpperCase()) {
								return true;
							}
						}
					});
				} else {
					dbSearchResult = dbSearchResult.filter(device => device.brand == query.brands.toUpperCase());
				}
			}

			// Filtering by RAM
			if (query.ram) {
				switch(query.ram) {
					case '0-64': dbSearchResult = dbSearchResult.filter(device => device.RAM <= 64);
												break;
					case '64-128': dbSearchResult = dbSearchResult.filter(device => (device.RAM >= 64 && device.RAM <= 128));
												break;
					case '128-256': dbSearchResult = dbSearchResult.filter(device => (device.RAM >= 128 && device.RAM <=256));
												break;
					case '256': dbSearchResult = dbSearchResult.filter(device => device.RAM >= 256);
												break;
				}
			}

			// Filtering by Flash Memory
			if (query.flash) {
				switch(query.flash) {
					case '0-8': dbSearchResult = dbSearchResult.filter(device => device.Flash <= 8);
												break;
					case '8-32': dbSearchResult = dbSearchResult.filter(device => (device.Flash >= 8 && device.Flash <= 32));
												break;
					case '32-128': dbSearchResult = dbSearchResult.filter(device => (device.Flash >= 32 && device.Flash <= 128));
												break;
					case '128': dbSearchResult = dbSearchResult.filter(device => device.Flash >= 128);
												break;
				}
			}

			// Filtering by price
			if (query.price) {
				switch (query.price) {
					case '0-1500': dbSearchResult = dbSearchResult.filter(device => device.price <= 1500);
												break;
					case '1500-3000': dbSearchResult = dbSearchResult.filter(device => (device.price >= 1500 && device.price <= 3000));
												break;
					case '3000-6000': dbSearchResult = dbSearchResult.filter(device => (device.price >= 3000 && device.price <= 6000));
												break;
					case '6000-10000': dbSearchResult = dbSearchResult.filter(device => (device.price >= 1500 && device.price <= 3000));
												break;
					case '10000': dbSearchResult = dbSearchResult.filter(device => device.price >= 10000);
												break;
					default: let minPrice, maxPrice;
									 let priceArray = query.price.split("-");
									 minPrice = parseInt(priceArray[0]);
									 if (priceArray[1]) {
									 	 maxPrice = parseInt(priceArray[1]);
									 } else {
									 	 maxPrice = 100000;
									 }
									 dbSearchResult = dbSearchResult.filter(device => (device.price >= minPrice && device.price <= maxPrice));
									 break;
				}
			}

			// Filtering by firmware
			if (query.firmware) {
				if (Array.isArray(query.firmware)) {
					dbSearchResult = dbSearchResult.filter(device => {
						for (let i = 0; i < query.firmware.length; i++) {
							if (device.supportedFirmwares.includes(query.firmware[i])) {
								return true;
							}
						}
					});
				} else {
					dbSearchResult = dbSearchResult.filter(device => device.supportedFirmwares.includes(query.firmware));
				}
			}

			// Split search result array into chunks for pagination
			const NUMBER_OF_DEVICES = 18;
			let page = 1;
			let numPages = Math.ceil(dbSearchResult.length / NUMBER_OF_DEVICES);

			if (query.page) {
				page = parseInt(query.page);
			}
			dbSearchResult = dbSearchResult.slice(page * NUMBER_OF_DEVICES - NUMBER_OF_DEVICES, page * NUMBER_OF_DEVICES);

			if (!dbSearchResult.length) {
				dbSearchResult = null;
			}

			return [dbSearchResult, numPages];
		}
	}
};

export default DeviceListModule;