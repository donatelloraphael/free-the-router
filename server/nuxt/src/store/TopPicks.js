import Vuex from 'vuex';

import {db} from '~/plugins/firebase.js';

const TopPicksModule = {
	namespaced: true,

	state() {
		return {
			topPicks: {},
			selectedFirmware: "openwrt"
		};
	},

	mutations: {
		setTopPicks(state, { selectedFirmware, routers }) {
			state.topPicks[selectedFirmware] = routers;
		},
		setAllTopPicks(state, topPicks) {
			state.topPicks = topPicks;
		}
	},

	getters: {
		getTopPicks(state) {
			return state.topPicks;
		},
		getSelectedFirmware(state) {
			return state.selectedFirmware;
		}
	},

	actions: {

		////////////////////////////SDK Method//////////////////////////////////////////////////

		populateTopPicksFirmware(vuexContext, selectedFirmware) {
			const routers = [];
			
			return db.collection(vuexContext.rootGetters.getCountry).doc("top-picks").collection(selectedFirmware).get()
			.then(topPicks => {
				if (!topPicks) {
					return;
				}
				topPicks.forEach(router => {
					routers.push(router.data());
				});
			})
			.then(() => vuexContext.commit("setTopPicks", { selectedFirmware, routers }))
			.then(() => vuexContext.getters.getTopPicks)
			.catch(error => console.log(error));
		},

		async populateTopPicks(vuexContext) {
	    let topPicksArray;
	      
	    if (Object.keys(vuexContext.getters.getTopPicks).length > 0 && vuexContext.rootGetters.getHomeOldCountry == vuexContext.rootGetters.getCountry) {
	    	return vuexContext.getters.getTopPicks;
	    } else {
	      [topPicksArray] = await Promise.all([
	      	vuexContext.dispatch("populateTopPicksFirmware", "openwrt"),
		      vuexContext.dispatch("populateTopPicksFirmware", "ddwrt"),
		      vuexContext.dispatch("populateTopPicksFirmware", "gargoyle"),
		      vuexContext.dispatch("populateTopPicksFirmware", "freshtomato"),
		      vuexContext.dispatch("populateTopPicksFirmware", "advancedtomato"),
	      	vuexContext.dispatch("populateTopPicksFirmware", "tomatobyshibby"),
	      	vuexContext.dispatch("populateTopPicksFirmware", "asusMerlin")
	      ]);
				vuexContext.commit("setAllTopPicks", topPicksArray);
				return topPicksArray;
			}
		}


	}
};

export default TopPicksModule;