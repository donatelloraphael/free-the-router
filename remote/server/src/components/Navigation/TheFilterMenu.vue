<template>
  <div>

    <div class="sidenav-backdrop" @click="closeSideMenuStateChanges(true) " :class="{ closing: closingState, closed: setClosingState() }">
    </div>
    
    <div class="menu" :class="{ active: isActive, closing: closingState, shopPage: isShopPage, closed: setClosingState() }">

      <!-- CATEGORYS -->
      <h3>Category</h3>
      <nuxt-link :to="{ query: { category: 'all-devices' }}"><span :class="{ active: 'all-devices' == category }" @click="closeSideMenuStateChanges(); clearFilters();">All Devices</span></nuxt-link>
      <nuxt-link :to="{ query: { category: 'routers' }}"><span :class="{ active: 'routers' == category }" @click="closeSideMenuStateChanges(); clearFilters();">Routers</span></nuxt-link>
      <nuxt-link :to="{ query: { category: 'wireless-access-points' }}"><span :class="{ active: 'wireless-access-points' == category }" @click="closeSideMenuStateChanges(); clearFilters();">Wireless Access Points</span></nuxt-link>
      <nuxt-link :to="{ query: { category: 'repeaters-extenders' }}"><span :class="{ active: 'repeaters-extenders' == category }" @click="closeSideMenuStateChanges(); clearFilters();">Repeaters & Extenders</span></nuxt-link>
      <nuxt-link :to="{ query: { category: 'modems' }}"><span :class="{ active: 'modems' == category }" @click="closeSideMenuStateChanges(); clearFilters();">Modems</span></nuxt-link>

      <!-- SORT BY PRICE -->
      <h3><label for="priceSort">Sort By</label></h3>
      <select id="priceSort" v-model="selectedSort" @click="navigateSort(selectedSort)" aria-haspopup="true" aria-expanded="false" aria-label="sort by dropdown">
        <option value="default">Default</option>
        <option value="lth">Price: Low to High</option>
        <option value="htl">Price: High to Low</option>
      </select>

      <!-- FILTER BY FIRMWARE -->
      <h3>By Firmware</h3>
      <div class="firmware">
        <input type="checkbox" id="openwrt-filter" value="openwrt" v-model="checkedFirmwares">
        <label for="openwrt-filter" :class="{ active: checkedFirmwares.includes('openwrt') }">OpenWrt</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="ddwrt-filter" value="ddwrt" v-model="checkedFirmwares">
        <label for="ddwrt-filter" :class="{ active: checkedFirmwares.includes('ddwrt') }">DD-WRT</label>
      </div>            
      <div class="firmware">
        <input type="checkbox" id="freshtomato-filter" value="freshtomato" v-model="checkedFirmwares">
        <label for="freshtomato-filter" :class="{ active: checkedFirmwares.includes('freshtomato') }">FreshTomato</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="asusmerlin-filter" value="asusmerlin" v-model="checkedFirmwares">
        <label for="asusmerlin-filter" :class="{ active: checkedFirmwares.includes('asusmerlin') }">Asuswrt-Merlin</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="gargoyle-filter" value="gargoyle" v-model="checkedFirmwares">
        <label for="gargoyle-filter" :class="{ active: checkedFirmwares.includes('gargoyle') }">Gargoyle</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="advancedtomato-filter" value="advancedtomato" v-model="checkedFirmwares">
        <label for="advancedtomato-filter" :class="{ active: checkedFirmwares.includes('advancedtomato') }">AdvancedTomato</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="tomatobyshibby-filter" value="tomatobyshibby" v-model="checkedFirmwares">
        <label for="tomatobyshibby-filter" :class="{ active: checkedFirmwares.includes('tomatobyshibby') }">Tomato by Shibby</label>
      </div>
      
      <!-- FILTER BY PRICE -->
      <h3>By Price</h3>
      <div class="filter-price" @click="navigatePrice(`0-${priceFilter1}`)" :class="{ active: query.price == `0-${priceFilter1}` }">Under {{currency}} {{priceFilter1}}</div>
      <div class="filter-price" @click="navigatePrice(`${priceFilter2}`)" :class="{ active: query.price == `${priceFilter2}` }">{{currency}} {{priceFilter2}}</div>
      <div class="filter-price" @click="navigatePrice(`${priceFilter3}`)":class="{ active: query.price == `${priceFilter3}` }">{{currency}} {{priceFilter3}}</div>
      <div class="filter-price" @click="navigatePrice(`${priceFilter4}`)":class="{ active: query.price == `${priceFilter4}` }">{{currency}} {{priceFilter4}}</div>
      <div class="filter-price" @click="navigatePrice(`${priceFilter5}`)":class="{ active: query.price == `${priceFilter5}` }">Over {{currency}} {{priceFilter5}}</div>
      <div class="filter-price">
        <label for="minPrice">Min</label>
        <input id="minPrice" v-model.lazy.trim="minPrice" type="number" :placeholder="currency + ' Min'">
        <label for="maxPrice">Max</label>
        <input id="maxPrice" v-model.lazy.trim="maxPrice" type="number" :placeholder="currency + ' Max'">
        <input type="submit" class="button" value="Go" @click="navigatePrice()">
      </div>

      <!-- BY RAM -->
      <h3>By RAM</h3>
      <div class="specs">
        <input type="checkbox" id="0-63" value="0-63" v-model="checkedRam">
        <label for="0-63" :class= "{ active: checkedRam.includes('0-63') }">Upto 63 MB</label>
      </div>
      <div class="specs">
        <input type="checkbox" id="64-127" value="64-127" v-model="checkedRam">
        <label for="64-127" :class= "{ active: checkedRam.includes('64-127') }">64 MB to 127 MB</label>
      </div>
      <div class="specs">
        <input type="checkbox" id="128-255" value="128-255" v-model="checkedRam">
        <label for="128-255" :class= "{ active: checkedRam.includes('128-255') }">128 MB to 255 MB</label>
      </div>
      <div class="specs">
        <input type="checkbox" id="256" value="256" v-model="checkedRam">
        <label for="256" :class= "{ active: checkedRam.includes('256') }">Above 256 MB</label>
      </div>

      <!-- BY FLASH -->
      <h3>By Flash Memory</h3>
      <div class="specs">
        <input type="checkbox" id="0-7" value="0-7" v-model="checkedFlash">
        <label for="0-7" :class= "{ active: checkedFlash.includes('0-7') }">Upto 7 MB</label>
      </div>
      <div class="specs">
        <input type="checkbox" id="8-31" value="8-31" v-model="checkedFlash">
        <label for="8-31" :class= "{ active: checkedFlash.includes('8-31') }">8 MB to 31 MB</label>
      </div>
      <div class="specs">
        <input type="checkbox" id="32-127" value="32-127" v-model="checkedFlash">
        <label for="32-127" :class= "{ active: checkedFlash.includes('32-127') }">32 MB to 127 MB</label>
      </div>
      <div class="specs">
        <input type="checkbox" id="128" value="128" v-model="checkedFlash">
        <label for="128" :class= "{ active: checkedFlash.includes('128') }">Above 128 MB</label>
      </div>

      <!-- BY BRAND -->
      <h3>By Brand</h3>
      <div class="brand">
        <input type="checkbox" id="tp-link" value="tp-link" v-model="checkedBrands">
        <label for="tp-link" :class= "{ active: checkedBrands.includes('tp-link') }">TP-Link</label>
      </div>
      <div class="brand">
        <input type="checkbox" id="d-link" value="d-link" v-model="checkedBrands">
        <label for="d-link" :class= "{ active: checkedBrands.includes('d-link') }">D-Link</label>
      </div>
      <div class="brand">
        <input type="checkbox" id="ubiquiti" value="ubiquiti" v-model="checkedBrands">
        <label for="ubiquiti" :class= "{ active: checkedBrands.includes('ubiquiti') }">Ubiquiti</label>
      </div>
      <div class="brand">
        <input type="checkbox" id="belkin" value="belkin" v-model="checkedBrands">
        <label for="belkin" :class= "{ active: checkedBrands.includes('belkin') }">Belkin</label>
      </div>
      <div class="brand">
        <input type="checkbox" id="netgear" value="netgear" v-model="checkedBrands">
        <label for="netgear" :class= "{ active: checkedBrands.includes('netgear') }">Netgear</label>
      </div>
      <div class="brand">
        <input type="checkbox" id="linksys" value="linksys" v-model="checkedBrands">
        <label for="linksys" :class= "{ active: checkedBrands.includes('linksys') }">Linksys</label>
      </div>
      <div class="brand">
        <input type="checkbox" id="asus" value="asus" v-model="checkedBrands">
        <label for="asus" :class= "{ active: checkedBrands.includes('asus') }">Asus</label>
      </div>
      <div class="brand">
        <input type="checkbox" id="tenda" value="tenda" v-model="checkedBrands">
        <label for="tenda" :class= "{ active: checkedBrands.includes('tenda') }">Tenda</label>
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: "TheFilterMenu",
    watchQuery: true,
    data() {
      return {
        closedState: false,
        closingState: false,
        selectedSort: "default",
        checkedFirmwares: [],
        checkedRam: [],
        checkedFlash: [],
        checkedBrands: [],
        minPrice: "",
        maxPrice: "",
        reset: false, 
        firstLoad: true,

        priceFilter1: "30", 
        priceFilter2: "30-60", 
        priceFilter3: "60-120", 
        priceFilter4: "120-175", 
        priceFilter5: "175",
        currency: "$"
      };
    },
    props: ["isActive"],
    computed: {
      isShopPage() {
        return /\/shop\//g.test(this.$route.path);
      },
      category() {
        return this.$route.query.category ? this.$route.query.category : "routers";
      },
      query() {
        return this.$route.query;
      }
    },
    watch: {
      checkedFirmwares(val) {
        let query = this.query;
        
        query.page = 1; // Reset page

        if (this.firstLoad) {
          if (val.length > 0) {
            this.$router.push({ query: { ...query, firmware: val } });
            return;
          } else {
            return
          }
        } else {

          delete query.firmware;
          delete query.reset;
                  
          if (val.length > 0) {
            this.$router.push({ query: { ...query, firmware: val } });
          } else {
            // Adds "reset" to query to force it to refresh 
            this.$router.push({ query: { ...query, reset: this.reset } });
            this.reset = !this.reset;
          }

        }
        
      },
      checkedRam(val) {
        let query = this.query;

        query.page = 1; // Reset page

        if (this.firstLoad) {
          if (val.length > 0) {
            this.$router.push({ query: { ...query, ram: val } });
            return;
          } else {
            return;
          }
        } else {
          delete query.ram; 
          delete query.reset;

          if (val.length > 0) {
            this.$router.push({ query: { ...query, ram: val } });
          } else {
            this.$router.push({ query: { ...query, reset: this.reset } });
            this.reset = !this.reset;
          }
        }     
      },
      checkedFlash(val) {
        let query = this.query;
        
        query.page = 1; // Reset page

        if (this.firstLoad) {
          if (val.length > 0) {
            this.$router.push({ query: { ...query, flash: val } });
            return;
          } else {
            return;
          }
        } else {
          delete query.flash;
          delete query.reset;

          if (val.length > 0) {
            this.$router.push({ query: { ...query, flash: val } });
          } else {
            this.$router.push({ query: { ...query, reset: this.reset } });
            this.reset = !this.reset;
          }
        }
        
      },
      checkedBrands(val) {
        let query = this.query;

        query.page = 1; // Reset page

        if (this.firstLoad) {
          if (val.length > 0) {
            this.$router.push({ query: { ...query, brand: val } });
            return;
          } else {
            return;
          }
        } else {
          delete query.brand;
          delete query.reset;

          if (val.length > 0) {
            this.$router.push({ query: { ...query, brand: val } });
          } else {
            this.$router.push({ query: { ...query, reset: this.reset } });
            this.reset = !this.reset;
          }
        }  
      }
    },
    methods: {
      closeSideMenu() {
        this.$emit("close");       
      },
      toggleClosingState() {
        const vm = this;
        setTimeout(() => {
          vm.closingState = false;
        }, 500);
      },
      toggleClosedState() {
        const vm = this;
        setTimeout(() => {
          return vm.isActive;
        }, 500);
      },
      setClosingState() {
        return !this.isActive && !this.closingState;
      },
      closeSideMenuStateChanges(backdropClicked) {
        if (window.matchMedia("(max-width: 768px)").matches) {
          this.closingState = true; 
          this.closeSideMenu(); 
          this.toggleClosingState(); 
          this.toggleClosedState();

        } else if (backdropClicked) {
          this.closingState = true; 
          this.closeSideMenu(); 
          this.toggleClosingState(); 
          this.toggleClosedState();
        }
      },
      clearFilters() {
        this.selectedSort = "default";
        this.checkedFirmwares = [];
        this.checkedRam = [];
        this.checkedFlash = [];
        this.checkedBrands = [];
        this.minPrice = "";
        this.maxPrice = "";
      },
      navigateSort(sort) {
        let query = this.$route.query;

        delete query.sort;

        query.page = 1; // Reset page

        if (sort == "default") {
          query = {...query, sort: "default"};
          this.$router.push({ query: query });

        } else {
          query = {...query, sort: sort};

          this.$router.push({ query: query });
        }
      },
      navigatePrice(priceRange) {
        let query = this.query;

        query.page = 1; // Reset page

        if (priceRange && priceRange == query.price) {
          delete query.price;

          this.$router.push({ query: { ...query, reset: this.reset }});
          this.reset = !this.reset;
          return;
        }

        delete query.price;

        if (priceRange) {
          query = {...query, price: priceRange};
          this.$router.push({ query: query });
        } else {
          if ((this.minPrice == "0" && this.maxPrice == "0")||(this.minPrice == "" && this.maxPrice == "")) {
            this.$router.push({ query: { ...query, reset: this.reset }});
            this.reset = !this.reset;

          } else {
            if (this.maxPrice < this.minPrice) {
              this.maxPrice = "100000";
            }
            query = {...query, price: `${this.minPrice}-${this.maxPrice}`};
            this.$router.push({ query: query });
          }
        }        
      }
    },

    created() {
      // clear filters if navigating back to shop page
      this.unwatch = this.$store.watch(state => {
        return this.$store.getters["DeviceListModule/getFiltersToggle"];
      }, () => {
        if (this.firstLoad || this.query.from == "firmware") {
          
          if (this.query.brand) {
            this.checkedBrands = Array.isArray(this.query.brand) ? [...this.query.brand] : [this.query.brand];
          }

          if (this.query.firmware) {
            this.checkedFirmwares = Array.isArray(this.query.firmware) ? [...this.query.firmware] : [this.query.firmware];
          }

          if (this.query.ram) {
            this.checkedRam = Array.isArray(this.query.ram) ? [...this.query.ram] : [this.query.ram];
          }

          if (this.query.flash) {
            this.checkedFlash = Array.isArray(this.query.flash) ? [...this.query.flash] : [this.query.flash];
          }

          this.selectedSort = this.query.sort ? this.query.sort : "default";
          this.minPrice = this.query.price ? (this.query.price.match(/\d+/g)[0] ? this.query.price.match(/\d+/g)[0] : "") : "";
          this.maxPrice = this.query.price ? (this.query.price.match(/\d+/g)[1] ? this.query.price.match(/\d+/g)[1] : ""): "";

          setTimeout(() => {
            this.firstLoad = false;
          }, 50);
          
        } else { 
          this.checkedFirmwares = [];
          this.selectedSort = "default";
          this.minPrice = "";
          this.maxPrice = "";
          this.checkedRam = [];
          this.checkedFlash = [];
          this.checkedBrands = [];
        }
      });

      //////////////////// Set Filters based on country /////////////////////
      this.unwatchCountry = this.$store.watch(state => {
        return this.$store.getters.getCountry;
      }, (country) => {
      	console.log(country);

        if (country == "in") {
          this.priceFilter1 = "1500"; 
          this.priceFilter2 = "1500-3000"; 
          this.priceFilter3 = "3000-6000"; 
          this.priceFilter4 = "6000-10000";
          this.priceFilter5 = "10000";
        } else {
          this.priceFilter1 = "30";
          this.priceFilter2 = "30-60"; 
          this.priceFilter3 = "60-120";
          this.priceFilter4 = "120-175";
          this.priceFilter5 = "175";
        }

        this.currency = this.$store.getters.getCurrency;
      });

      if (this.$store.getters.getCountry == "in") {
        this.priceFilter1 = "1500"; 
        this.priceFilter2 = "1500-3000"; 
        this.priceFilter3 = "3000-6000"; 
        this.priceFilter4 = "6000-10000";
        this.priceFilter5 = "10000";
      } else {
        this.priceFilter1 = "30";
        this.priceFilter2 = "30-60"; 
        this.priceFilter3 = "60-120";
        this.priceFilter4 = "120-175";
        this.priceFilter5 = "175";
      }

      this.currency = this.$store.getters.getCurrency;
    },

    beforeDestroy() {
      this.unwatch();
      this.unwatchCountry();
    }
  };
</script>

<style scoped>
  .menu {
    position: fixed;
    /*position: absolute;*/
    z-index: 1400;
    display: none;
    left: 0;
    min-width: 16rem;
    height: 100%;
    padding: 8rem 1rem 2rem 1rem;
    flex-direction: column;
    background-color: #2e3192;
    overflow-y: auto;
    animation-duration: .5s;
    box-shadow: 0px 0 10px rgba(0, 0, 0, 1);
  }

  .menu.shopPage.active {
    display: flex;
    animation-name: nav-slide;
  }

  .menu.closing {
    animation-name: nav-slide-out;
    animation-duration: .5s;
    display: flex;
  }

  @keyframes nav-slide {
    from{left: -16rem;}
    to{left: 0;}
  }

  @keyframes nav-slide-out {
    from{left: 0;}
    to{left: -16rem;}
  }

  .sidenav-backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 350;
    position: fixed;
    animation-name: backdrop-show;
    animation-duration: .5s;
  }

  .sidenav-backdrop.closing {
    animation-name: backdrop-fade;
    animation-duration: .5s;
  }

  @keyframes backdrop-show {
    from{opacity: 0}
    to{opacity: 100}
  }

  @keyframes backdrop-fade {
    from{opacity: 100}
    to{opacity: 0}
  }

  .sidenav-backdrop.closed {
    display: none;
  }
    
  .menu span {
    font-size: .9rem;
    font-family: "Montserrat", sans-serif;
    color: white;
    display: block;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: ponter;
  }

  .menu span.active {
    background-color: #4146c1;
    font-weight: bold;
    color: #deff00;
    border-left: 5px solid #deff00;
  }

  .menu span:hover{
    background-color: #0b0e85;
  }

  .menu a{
    text-decoration: none;
  }

  .menu h3 {
    font-size: 1.2rem;
    color: white;
    padding: 10px;
    margin-top: 10px;
  }
  
  /*************************FILTERS*******************/

  /******************Firmwares***************/

  .firmware, .filter-price, .specs, .brand {
    padding: 5px 10px;
    color: white;
    font-family: "Montserrat", sans-serif;
    font-size: 0.9rem;
  }

  .firmware label, .specs label, .brand label {
    margin-left: 5px;
    cursor: pointer;
  }

  .firmware label:hover, .specs label:hover, .brand label:hover {
    color: #deff00;
  }

  .firmware label.active , .specs label.active, .brand label.active  {
    color: #deff00;
    font-weight: bold;
  }

  /****************Sort By*****************/

  .menu select {
    margin-left: 10px;
    border-radius: 10px;
    width: 10rem;
    font-family: "Montserrat", sans-serif;
  }

  .menu select option {
    margin-bottom: 10px;
    padding: 5px;
  }

  /******************Filter by price*****************/

  .filter-price {
    padding-right: 0;
  }

  .filter-price:hover {
    color: #deff00;
    cursor: pointer;
  }

  .filter-price.active {
    color: #deff00;
    font-weight: bold;
  }

  .filter-price label {
    font-size: 1px;
    position: absolute;
  }

  .filter-price input {
    display: inline-block;
    width: 5rem;
    height: 2rem;
    border-radius: 5px;
    border: 2px solid rgba(50,50,50,0.2);
  }

  .filter-price input:focus {
    border: 2px solid orange;
  }

  .filter-price input.button {
    width: 2rem;
    background-color: #e2e2e2;
    border: 1px solid grey;
    cursor: pointer;
  }

  .filter-price input.button:hover {
    background-color: #bababa;
  }



  /******************MEDIA QUERYS*********************/
  @media (max-width: 768px) {

    .menu.closed {
      display: none;
    }

    .menu {
      padding: 2rem 1rem;
    }
  }

  @media (min-width: 769px) {

    .menu.shopPage {
      display: flex;
      z-index: 40;
    }
  }

</style>