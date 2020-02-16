import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
	return new Vuex.Store({
		state: () => ({
			selectedCountry: "",
			flagUrl: ""
		}),


		mutations: {
			setCountry(state, country) {
				state.selectedCountry = country;
			},
			setFlagUrl(state, country) {

				// webpack isn’t smart enough to understand that you want some part of some string in your code 
				//interpreted as a path that it should resolve. That works in HTML and CSS because of their 
				//static nature, but not inside of Javasript code. So you have to 'require' the path:

				state.flagUrl = `url(${require(`assets/images/country-flags/${country}.png`)})`;
			}
		},


		actions: {
			nuxtServerInit(vuexContext, context) {

				// TODO: set initial country
				vuexContext.dispatch("setCountry", "india");
				vuexContext.dispatch("setFlagUrl", vuexContext.state.selectedCountry);
			},
			setCountry(vuexContext, country) {
				vuexContext.commit("setCountry", country);
			},
			setFlagUrl(vuexContext, country) {
				vuexContext.commit("setFlagUrl", country);
			}
		},

		
		getters: {
			getCountry(state) {
				return state.selectedCountry;
			},
			getFlagUrl(state) {
				return state.flagUrl;
			}
		}
	});
};

export default createStore;