import Vue from 'vue';
import Vuex from 'vuex';

import TopPicksModule from '@/store/TopPicks';
import MostPopularModule from '@/store/MostPopular';
import DeviceListModule from '@/store/DeviceList';

Vue.use(Vuex);

const createStore = () => {
	return new Vuex.Store({

		modules: {
			TopPicksModule,
			MostPopularModule,
			DeviceListModule
		},

		state: () => ({
			selectedCountry: "US",
			shopOldCountry: "US",
			homeOldCountry: "US",
			flagUrl: `url(${require(`assets/images/country-flags/US.png`)})`,
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
				} else if (country == 'US' || country == "IN" || country == "CA" || country == "GB") {
					
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
					case "US": currency = "$"; break;
					case "IN": currency = "₹"; break;
					case "CA": currency = "CDN$"; break;
					case "GB": currency = "£"; break;
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