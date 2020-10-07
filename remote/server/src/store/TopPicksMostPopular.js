import Vuex from 'vuex';
import axios from 'axios';

// axios.defaults.withCredentials = true;

import { HOST, PROTOCOL, PORT } from '../../env';

const TopPicksMostPopularModule = {
	namespaced: true,

	state() {
		return {
			mostPopular: [],
			topPicks: {},
			selectedFirmware: "openwrt"
		};
	},

	mutations: {
		setTopPicks(state, routers ) {
			state.topPicks = routers;
		},
		setMostPopular(state, mostPopularArray) {
			state.mostPopular = mostPopularArray;
		}
	},

	getters: {
		getTopPicks(state) {
			return state.topPicks;
		},
		getSelectedFirmware(state) {
			return state.selectedFirmware;
		},
		getMostPopular(state) {
			return state.mostPopular;
		}
	},

	actions: {

		async populateTopPicksMostPopular(vuexContext) {

			if (Object.keys(vuexContext.getters.getTopPicks).length > 0 && vuexContext.getters.getMostPopular.length > 0 && vuexContext.rootGetters.getHomeOldCountry == vuexContext.rootGetters.getCountry) {
	    	return [vuexContext.getters.getTopPicks, vuexContext.getters.getMostPopular];

	    } else {

				let featured;

				if (process.server) {
					featured = (await axios.get(`http://127.0.0.1:9000/api/${vuexContext.rootGetters.getCountry}-featured`)).data;
				} else {
					featured = (await axios.get(`${PROTOCOL}://${HOST}:${PORT}/api/${vuexContext.rootGetters.getCountry}-featured`)).data;
				}

				if (featured[0].name == "top picks") {
					vuexContext.commit("setTopPicks", featured[0]);
					vuexContext.commit("setMostPopular", featured[1].devices);
				} else {
					vuexContext.commit("setTopPicks", featured[1]);
					vuexContext.commit("setMostPopular", featured[0].devices);
				}

				return [vuexContext.getters.getTopPicks, vuexContext.getters.getMostPopular];
			}
		}
	}

};

export default TopPicksMostPopularModule;