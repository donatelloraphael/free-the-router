import Vuex from 'vuex';

import {db} from '~/plugins/firebase.js';

const FilterModule = {
	namespaced: true,

	state() {
		return {
			checkedFirmwaresToggle: false
		};
	},

	getters: {
		getCheckedFirmwaresToggle(state) {
			return state.checkedFirmwaresToggle;
		}
	},

	mutations: {
		setCheckedFirmwaresToggle(state) {
			state.checkedFirmwaresToggle = !state.checkedFirmwaresToggle;
		}
	},

	actions: {
		setCheckedFirmwaresToggle(vuexContext) {
			vuexContext.commit("setCheckedFirmwaresToggle");
		}
	}

};

export default FilterModule;