import Vue from 'vue';
import Vuex from 'vuex';

import TopPicksMostPopularModule from '@/store/TopPicksMostPopular';
import DeviceListModule from '@/store/DeviceList';

Vue.use(Vuex);

const createStore = () => {
	return new Vuex.Store({

		modules: {
			TopPicksMostPopularModule,
			DeviceListModule
		},

		state: () => ({
			selectedCountry: "us",
			shopOldCountry: "us",
			homeOldCountry: "us",
			flagUrl: `url(${require(`assets/images/country-flags/us.png`)})`,
			currency: '$'
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
			},
			setShopOldCountry(state) {
				state.shopOldCountry = state.selectedCountry;
			},
			setHomeOldCountry(state) {
				state.homeOldCountry = state.selectedCountry;
			},
			setCurrency(state, currency) {
				state.currency = currency;
			}
		},


		actions: {
			setCountry(vuexContext, country) {
				if (!country) {
					return;
				} else if (country == 'us' || country == "in" || country == "ca" || country == "gb") {
					
    			vuexContext.dispatch("setShopOldCountry", vuexContext.getters.getCountry);
    			vuexContext.dispatch("setHomeOldCountry", vuexContext.getters.getCountry);

					vuexContext.commit("setCountry", country);
					vuexContext.dispatch("setFlagUrl", country);
					vuexContext.dispatch("setCurrency", vuexContext.getters.getCountry);
				}
				
			},
			setShopOldCountry(vuexContext) {
				vuexContext.commit("setShopOldCountry");
			},
			setHomeOldCountry(vuexContext) {
				vuexContext.commit("setHomeOldCountry");
			},
			setFlagUrl(vuexContext, country) {
				if (!country) {
					return;
				}
				vuexContext.commit("setFlagUrl", country);
			},
			setCurrency(vuexContext, country) {
				let currency = "$";
				switch (country) {
					case "us": currency = "$"; break;
					case "in": currency = "₹"; break;
					case "ca": currency = "CDN$"; break;
					case "gb": currency = "£"; break;
				}
				vuexContext.commit("setCurrency", currency);
			}
		},
		
		getters: {
			getCountry(state) {
				return state.selectedCountry;
			},
			getFlagUrl(state) {
				return state.flagUrl;
			},
			getShopOldCountry(state) {
				return state.shopOldCountry;
			},
			getHomeOldCountry(state) {
				return state.homeOldCountry;
			},
			getCurrency(state) {
				return state.currency;
			}
		}
	});
};

export default createStore;