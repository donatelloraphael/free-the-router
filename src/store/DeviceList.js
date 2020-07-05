import Vuex from 'vuex';

import {db} from '~/plugins/firebase.js';

const DeviceListModule = {
	namespaced: true,

	state() {
		return {
			deviceList: [],
			searchResult: [],
			oldSearch: "",
			oldCategory: "",
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
		},
		setOldCategory(state, category) {
			state.oldCategory = category;
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
				default: category = "routers"; break;
			}

			// If there are query strings
			if (query.q) {
				// If the query is a search
				if (query.search) {
					let devices = await vuexContext.dispatch("searchDevices", {query, category});

					return vuexContext.dispatch("filterResults", {devices, query});

				} else {

					if (category != vuexContext.state.oldCategory) {

						return db.collection("india").doc("amazon.in").collection(category).orderBy("serialNumber").get()
						.then(docs => {
							docs.forEach(doc => {
								devices.push(doc.data());
							});
						}).then(() => {
							vuexContext.commit("setDeviceList", devices);
							vuexContext.commit("setOldCategory", category);

							return vuexContext.dispatch("filterResults", {devices, query});

						}).catch(error => console.log(error));

					} else {
						devices = vuexContext.getters.getDeviceList;

						return vuexContext.dispatch("filterResults", {devices, query});
					}
				}

			} else {

				if (vuexContext.state.oldCategory != "routers") {

					return db.collection("india").doc("amazon.in").collection("routers").orderBy("serialNumber").get()
					.then(docs => {
						docs.forEach(doc => {
							devices.push(doc.data());
						});
					}).then(() => {
						vuexContext.commit("setDeviceList", devices);
						vuexContext.commit("setOldCategory", "routers");

						return vuexContext.dispatch("splitForPagination", {devices, query});
					}).catch(error => console.log(error));

				} else {

					devices = vuexContext.getters.getDeviceList;
					return vuexContext.dispatch("splitForPagination", {devices, query});
				}
				
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

			// Return new search result if different search terms.
			// Return old search results if no change in search terms.
			return vuexContext.getters.getSearchResult;			
		},

		filterResults(vuexContext, {devices, query}) {
			
			// Sorting resulting array according to price
			if (query.sort == "lth") {	// Low to High
				devices.sort((a, b) => parseInt(a.price) - parseInt(b.price));
			} else if (query.sort == "htl") {	// High to Low
				devices.sort((a, b) => parseInt(b.price) - parseInt(a.price));
			}

			// Filtering by brand
			if (query.brands) {
				if (Array.isArray(query.brands)) {							
					devices = devices.filter(device => {
						for (let i = 0; i < query.brands.length; i++) {
							if (device.brand == query.brands[i].toUpperCase()) {
								return true;
							}
						}
					});
				} else {
					devices = devices.filter(device => device.brand == query.brands.toUpperCase());
				}
			}

			// Filtering by RAM
			if (query.ram) {
				switch(query.ram) {
					case '0-64': devices = devices.filter(device => device.RAM <= 64);
												break;
					case '64-128': devices = devices.filter(device => (device.RAM >= 64 && device.RAM <= 128));
												break;
					case '128-256': devices = devices.filter(device => (device.RAM >= 128 && device.RAM <=256));
												break;
					case '256': devices = devices.filter(device => device.RAM >= 256);
												break;
				}
			}

			// Filtering by Flash Memory
			if (query.flash) {
				switch(query.flash) {
					case '0-8': devices = devices.filter(device => device.Flash <= 8);
												break;
					case '8-32': devices = devices.filter(device => (device.Flash >= 8 && device.Flash <= 32));
												break;
					case '32-128': devices = devices.filter(device => (device.Flash >= 32 && device.Flash <= 128));
												break;
					case '128': devices = devices.filter(device => device.Flash >= 128);
												break;
				}
			}

			// Filtering by price
			if (query.price) {
				switch (query.price) {
					case '0-1500': devices = devices.filter(device => device.price <= 1500);
												break;
					case '1500-3000': devices = devices.filter(device => (device.price >= 1500 && device.price <= 3000));
												break;
					case '3000-6000': devices = devices.filter(device => (device.price >= 3000 && device.price <= 6000));
												break;
					case '6000-10000': devices = devices.filter(device => (device.price >= 1500 && device.price <= 3000));
												break;
					case '10000': devices = devices.filter(device => device.price >= 10000);
												break;
					default: let minPrice, maxPrice;
									 let priceArray = query.price.split("-");
									 minPrice = parseInt(priceArray[0]);
									 if (priceArray[1]) {
									 	 maxPrice = parseInt(priceArray[1]);
									 } else {
									 	 maxPrice = 100000;
									 }
									 devices = devices.filter(device => (device.price >= minPrice && device.price <= maxPrice));
									 break;
				}
			}

			// Filtering by firmware
			if (query.firmware) {
				if (Array.isArray(query.firmware)) {
					devices = devices.filter(device => {
						for (let i = 0; i < query.firmware.length; i++) {
							if (device.supportedFirmwares.includes(query.firmware[i])) {
								return true;
							}
						}
					});
				} else {
					devices = devices.filter(device => device.supportedFirmwares.includes(query.firmware));
				}
			}
			return vuexContext.dispatch("splitForPagination", {devices, query});
		},

		// Split search result array into chunks for pagination
		splitForPagination(vuexContext, {devices, query}) {

			const NUMBER_OF_DEVICES = 18;
			let page = 1;
			const numPages = Math.ceil(devices.length / NUMBER_OF_DEVICES);
			const numDevices = devices.length;

			if (query.page) {
				page = parseInt(query.page);
			}
			devices = devices.slice(page * NUMBER_OF_DEVICES - NUMBER_OF_DEVICES, page * NUMBER_OF_DEVICES);

			if (!devices.length) {
				devices = null;
			}

			return [devices, numPages, numDevices];
		}
	}
};

export default DeviceListModule;