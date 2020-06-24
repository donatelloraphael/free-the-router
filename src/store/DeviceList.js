import Vuex from 'vuex';

import {db} from '~/plugins/firebase.js';

const DeviceListModule = {
	namespaced: true,

	state() {
		return {
			deviceList: []
		};
	},

	getters: {
		getDeviceList(state) {
			return state.deviceList;
		}
	},

	mutations: {
		setDeviceList(state, devices) {
			state.deviceList = devices;
		}
	},

	actions: {
		populateDeviceList(vuexContext, query) {
			let devices = [];

			if (query.q) {

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
	}
};

export default DeviceListModule;