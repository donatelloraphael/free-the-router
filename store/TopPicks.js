import Vuex from 'vuex';
import axios from 'axios';

import {db} from '~/plugins/firebase.js';

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

		populateTopPicksFirmware(vuexContext, selectedFirmware) {
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
		},

		async populateTopPicks(vuexContext) {
			const expirationTimer = 3600;
	    var topPicksMostPopularTime;
	    var topPicksArray;

	    if (process.client) {
	    	topPicksMostPopularTime = localStorage.getItem("topPicksMostPopularTime");
	    }

	    // set Top Picks
	    if (!topPicksMostPopularTime || (Number.parseInt(topPicksMostPopularTime) + expirationTimer * 1000) < new Date().getTime()) {
	      
	      [topPicksArray] = await Promise.all([
	      	vuexContext.dispatch("populateTopPicksFirmware", "openwrt"),
		      vuexContext.dispatch("populateTopPicksFirmware", "ddwrt"),
		      vuexContext.dispatch("populateTopPicksFirmware", "gargoyle"),
		      vuexContext.dispatch("populateTopPicksFirmware", "freshtomato"),
		      vuexContext.dispatch("populateTopPicksFirmware", "advancedtomato"),
	      	vuexContext.dispatch("populateTopPicksFirmware", "tomatobyshibby")
	      ]);
				return topPicksArray;

			} else {
				// console.log('client: ', JSON.parse(localStorage.topPicksArray));
				return JSON.parse(localStorage.topPicksArray);
			}
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