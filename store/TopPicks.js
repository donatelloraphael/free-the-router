import Vuex from 'vuex';
import axios from 'axios';

import {db} from '~/plugins/firebase.js'

const TopPicksModule = {
	namespaced: true,

	state() {
		return {
			topPicks: {},
			selectedFirmware: "openwrt"
		}
	},
	mutations: {
		setTopPicks(state, { selectedFirmware, routers }) {
			state.topPicks[selectedFirmware] = routers;
		}
	},
	actions: {

		/////////////////////////API method//////////////////////////////////////////////////////
		//
		// populateTopPicks(vuexContext, selectedFirmware) {
		// 	return axios.get("https://firestore.googleapis.com/v1/projects/free-the-router/databases/(default)/documents/top-picks/" + selectedFirmware + "/1")
		// 		.then(response =>	vuexContext.dispatch("parseFirestore", response, { root: true }))	//dispatches in the global context
		// 		.then(parsedArray => {
		// 				if (!parsedArray) {
		// 					return;
		// 				}
		// 				vuexContext.commit("setTopPicks", parsedArray);
		// 				return parsedArray;
		// 			})
		// 			.catch(error => console.log(error));
		// }

		////////////////////////////SDK Method//////////////////////////////////////////////////

		populateTopPicks(vuexContext, selectedFirmware) {
			
			const routers = [];
			 return db.collection("top-picks").doc(selectedFirmware).collection("1").get()
				.then(topPicks => {
					if (!topPicks) {
						return;
					}
					topPicks.forEach(router => {
						routers.push(router.data());
					})
				})
				.then(() => vuexContext.commit("setTopPicks", { selectedFirmware, routers }))
				.then(() => vuexContext.getters.getTopPicks);
			

		}
	},
	getters: {
		getTopPicks(state) {
			return state.topPicks;
		},
		getSelectedFirmware(state) {
			return state.selectedFirmware;
		}
	}


};

export default TopPicksModule;