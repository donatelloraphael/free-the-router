import Vuex from 'vuex';
import axios from 'axios';

const TopPicksModule = {
	namespaced: true,

	state() {
		return {
			topPicks: []
		}
	},
	mutations: {
		setTopPicks(state, parsedArray) {
			state.topPicks = parsedArray;
		}
	},
	actions: {
		populateTopPicks(vuexContext) {
			axios.get("https://firestore.googleapis.com/v1/projects/free-the-router/databases/(default)/documents/top-picks/openwrt/1")
				.then(response => vuexContext.dispatch("parseFirestore", response, { root: true }))	//dispatches in the global context
				.then(parsedArray => vuexContext.dispatch("setTopPicks", parsedArray));
		},
		setTopPicks(vuexContext, array ) {
			vuexContext.commit('setTopPicks', array);
		}
	},
	getters: {
		getTopPicks(state) {
			return state.topPicks;
		}
	}


};

export default TopPicksModule;