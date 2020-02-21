import Vuex from 'vuex';
import axios from 'axios';

const TopPicksModule = {
	namespaced: true,

	state() {
		return {
			topPicks: [],
			selectedFirmware: "openwrt"
		}
	},
	mutations: {
		setTopPicks(state, parsedArray) {
			state.topPicks = parsedArray;
		}
	},
	actions: {
		populateTopPicks(vuexContext, selectedFirmware) {
			return axios.get("https://firestore.googleapis.com/v1/projects/free-the-router/databases/(default)/documents/top-picks/" + selectedFirmware + "/1")
				.then(response =>	vuexContext.dispatch("parseFirestore", response, { root: true }))	//dispatches in the global context
				.then(parsedArray => {
						if (!parsedArray) {
							return;
						}
						vuexContext.commit("setTopPicks", parsedArray);
						return parsedArray;
					});
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