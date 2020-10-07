import Vuex from 'vuex';
import axios from 'axios';

import { HOST, PROTOCOL } from '../../env';

const DeviceListModule = {
	namespaced: true,

	state() {
		return {
			deviceList: [],
			searchResult: [],
			oldSearch: "",
			oldCategory: "",
			filtersToggle: false
		};
	},

	getters: {
		getDeviceList(state) {
			return state.deviceList;
		},
		getSearchResult(state) {
			return state.searchResult;
		},
		getFiltersToggle(state) {
			return state.filtersToggle;
		}
	},

	mutations: {
		setDeviceList(state, devices) {
			state.deviceList = devices;
		},
		clearDeviceList(state) {
			state.deviceList = [];
		},
		setSearchResult(state, result) {
			state.searchResult = result;
		},
		clearSearchResult(state) {
			state.searchResult = [];
		},
		setOldSearch(state, term) {
			state.oldSearch = term;
		},
		setOldCategory(state, category) {
			state.oldCategory = category;
		},
		setFiltersToggle(state) {
			state.filtersToggle = !state.filtersToggle;
		}
	},

	actions: {
		async populateDeviceList(vuexContext, query) {
			let devices = [];
			let category = query.category || "routers";

			// If there are query strings
			if (Object.keys(query).length > 0) {
				// If the query is a search
				if (query.search) {
					let devices = [...(await vuexContext.dispatch("searchDevices", {query, category}))];

					return vuexContext.dispatch("filterResults", {devices, query});

				} else {

					if (category != vuexContext.state.oldCategory) {

						try {
							if (process.server) {
								devices = (await axios.get(`http://127.0.0.1:9000/category/${vuexContext.rootGetters.getCountry}-${category}`)).data;
							} else {
								devices = (await axios.get(`${PROTOCOL}://${HOST}/api/category/${vuexContext.rootGetters.getCountry}-${category}`)).data;
							}
						} catch (error) {
							console.log(error);
						}

						vuexContext.commit("setDeviceList", devices);
						vuexContext.commit("setOldCategory", category);

						return vuexContext.dispatch("filterResults", {devices, query});

					} else {
						devices = [...vuexContext.getters.getDeviceList];

						return vuexContext.dispatch("filterResults", {devices, query});
					}
				}

			} else {
				if (vuexContext.state.oldCategory != "routers" || vuexContext.rootGetters.getShopOldCountry != vuexContext.rootGetters.getCountry) {

					try {
						if (process.server) {
							devices = (await axios.get(`http://127.0.0.1:9000/category/${vuexContext.rootGetters.getCountry}-routers`)).data;
						} else {
							devices = (await axios.get(`${PROTOCOL}://${HOST}/api/category/${vuexContext.rootGetters.getCountry}-routers`)).data;
						}
					} catch (error) {
						console.log(error);
					}

					vuexContext.commit("setDeviceList", devices);
					vuexContext.commit("setOldCategory", "routers");

					return vuexContext.dispatch("splitForPagination", {devices, query});

				} else {
					devices = [...vuexContext.getters.getDeviceList];

					return vuexContext.dispatch("splitForPagination", {devices, query});
				}
				
			}
		},

		async searchDevices(vuexContext, {query, category}) {

			if (vuexContext.state.oldSearch != query.search || vuexContext.state.oldCategory != category) {

				vuexContext.commit("clearSearchResult");

				let dbAllDevicesIndex = [];
				const matchDevicesIndex = new Set();

				try {
					if (process.server) {
						dbAllDevicesIndex = (await axios.get(`http://127.0.0.1:9000/devices/indices/${vuexContext.rootGetters.getCountry}-${category}-index`)).data.fullNameIndex;
					} else {
						dbAllDevicesIndex = (await axios.get(`${PROTOCOL}://${HOST}/api/devices/indices/${vuexContext.rootGetters.getCountry}-${category}-index`)).data.fullNameIndex;
					}
				} catch (error) {
					console.log(error);
				}

				let searchArray = query.search.split(/_|-/gmi);

				let indexLength = dbAllDevicesIndex.length;
				for (let i = 0; i < indexLength; i++) {
					let matchCount = 0;
					for (let j = 0; j < searchArray.length; j++) {
						let regex = new RegExp(searchArray[j], "gmi");
							
						if (regex.test(dbAllDevicesIndex[i])) {
							matchCount++;
						}
						if (matchCount == searchArray.length) {
							matchDevicesIndex.add(dbAllDevicesIndex[i].replace(/\ /gm, "-"));
						}
					}
				}

				let allDevices = {};
				const searchResult = [];

				try {
					if (process.server) {
						allDevices = (await axios.get(`http://127.0.0.1:9000/search/${vuexContext.rootGetters.getCountry}-${category}`)).data;
					} else {
						allDevices = (await axios.get(`${PROTOCOL}://${HOST}/api/search/${vuexContext.rootGetters.getCountry}-${category}`)).data;
					}
				} catch (error) {
					console.log(error);
				}

				matchDevicesIndex.forEach(device => {
					if (allDevices[device]) {
						searchResult.push(allDevices[device]);
					}
				});

				vuexContext.commit("setSearchResult", searchResult);
				vuexContext.commit("setOldSearch", query.search);
				vuexContext.commit("setOldCategory", category);
			}

			// Return new search result if different search terms.
			// Return old search results if no change in search terms.

			return vuexContext.getters.getSearchResult;			
		},

		filterResults(vuexContext, {devices, query}) {

			// Filtering by FLASH
			if (query.flash) {
				if (Array.isArray(query.flash)) {
					devices = devices.filter(device => {

						for (let i = 0; i < query.flash.length; i++) {

							let flashArray = query.flash[i].match(/\d+/gm);
							let maxFlash, minFlash = parseInt(flashArray[0]) ? parseInt(flashArray[0]) : 0;
							if (parseInt(flashArray[1]) > minFlash) {
								maxFlash = parseInt(flashArray[1]);
							} else {
								maxFlash = "100000";
							}
							if (device.Flash >= minFlash && device.Flash <= maxFlash) {
								return true;
							}
						}
					});			
				} else {
					let flashArray = query.flash.match(/\d+/gm);
					let maxFlash, minFlash = parseInt(flashArray[0]) || 0;
					if (parseInt(flashArray[1]) > minFlash) {
						maxFlash = parseInt(flashArray[1]);
					} else {
						maxFlash = 100000;
					}
					devices = devices.filter(device => device.Flash >= minFlash && device.Flash <= maxFlash);
				}
			}

			// Filtering by RAM
			if (query.ram) {
				if (Array.isArray(query.ram)) {
					devices = devices.filter(device => {

						for (let i = 0; i < query.ram.length; i++) {

							let ramArray = query.ram[i].match(/\d+/gm);
							let maxRam, minRam = parseInt(ramArray[0]) || 0;
							if (parseInt(ramArray[1]) > minRam) {
								maxRam = parseInt(ramArray[1]);
							} else {
								maxRam = "100000";
							}
							if (device.RAM >= minRam && device.RAM <= maxRam) {
								return true;
							}
						}
					});			
				} else {
					let ramArray = query.ram.match(/\d+/gm);
					let maxRam, minRam = parseInt(ramArray[0]) || 0;
					if (parseInt(ramArray[1]) > minRam) {
						maxRam = parseInt(ramArray[1]);
					} else {
						maxRam = 100000;
					}
					devices = devices.filter(device => device.RAM >= minRam && device.RAM <= maxRam);
				}
			}

			// Filtering by price
			if (query.price) {
				switch (query.price) {
					case '0-1500': devices = devices.filter(device => device.amazonPrice <= 1500);
												break;
					case '1500-3000': devices = devices.filter(device => (device.amazonPrice >= 1500 && device.amazonPrice <= 3000));
												break;
					case '3000-6000': devices = devices.filter(device => (device.amazonPrice >= 3000 && device.amazonPrice <= 6000));
												break;
					case '6000-10000': devices = devices.filter(device => (device.amazonPrice >= 6000 && device.amazonPrice <= 10000));
												break;
					case '10000': devices = devices.filter(device => device.amazonPrice >= 10000);
												break;
					default: let minPrice = 0, maxPrice = 100000;
									 let priceArray = query.price.split("-");
									 minPrice = parseInt(priceArray[0]);
									 if (priceArray[1]) {
									 	 maxPrice = parseInt(priceArray[1]);
									 }								 

									 if (!isNaN(maxPrice) && maxPrice >= minPrice) {
									   devices = devices.filter(device => (device.amazonPrice >= minPrice && device.amazonPrice <= maxPrice));
									 }
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

			// Filtering by brand
			if (query.brand) {
				if (Array.isArray(query.brand)) {							
					devices = devices.filter(device => {
						for (let i = 0; i < query.brand.length; i++) {
							if (device.brand == query.brand[i].toUpperCase()) {
								return true;
							}
						}
					});
				} else {
					devices = devices.filter(device => device.brand == query.brand.toUpperCase());
				}
			}

			// Sorting resulting array according to price
			if (query.sort == "lth") {	// Low to High
				devices.sort((a, b) => parseInt(a.amazonPrice) - parseInt(b.amazonPrice));
			} else if (query.sort == "htl") {	// High to Low
				devices.sort((a, b) => parseInt(b.amazonPrice) - parseInt(a.amazonPrice));
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
		},

		setFiltersToggle(vuexContext) {
			vuexContext.commit("setFiltersToggle");
		}
	}
};

export default DeviceListModule;