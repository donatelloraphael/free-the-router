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

			if (query.q) {
				// If the query is a search
				if (query.search) {
					let dbSearchResult = await vuexContext.dispatch("searchDevices", {query, category});

					// Sorting resulting array according to price
					if (query.sort == "lth") {
						dbSearchResult.sort((a, b) => parseInt(a.price) - parseInt(b.price));
					} else if (query.sort == "htl") {
						dbSearchResult.sort((a, b) => parseInt(b.price) - parseInt(a.price));
					}

					//Filtering by brand
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

					return dbSearchResult;
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

			
		}
	}
};

export default DeviceListModule;