<template>
  <div>

    <div class="sidenav-backdrop" @click="closeSideMenuStateChanges(true) " :class="{ closing: closingState, closed: setClosingState() }">
    </div>
    
    <div class="menu" :class="{ active: isActive, closing: closingState, shopPage: isShopPage, closed: setClosingState() }">

      <!-- CATEGORYS -->
      <h3>Category</h3>
      <nuxt-link :to="{ path: 'shop', query: { category: 'all-devices' }}"><span :class="{ active: 'all-devices' == category }" @click="closeSideMenuStateChanges()">All Devices</span></nuxt-link>
      <nuxt-link :to="{ path: 'shop', query: { category: 'routers' }}"><span :class="{ active: 'routers' == category }" @click="closeSideMenuStateChanges()">Routers</span></nuxt-link>
      <nuxt-link :to="{ path: 'shop', query: { category: 'wireless-access-points' }}"><span :class="{ active: 'wireless-access-points' == category }" @click="closeSideMenuStateChanges()">Wireless Access Points</span></nuxt-link>
      <nuxt-link :to="{ path: 'shop', query: { category: 'repeaters-extenders' }}"><span :class="{ active: 'repeaters-extenders' == category }" @click="closeSideMenuStateChanges()">Repeaters & Extenders</span></nuxt-link>
      <nuxt-link :to="{ path: 'shop', query: { category: 'modems' }}"><span :class="{ active: 'modems' == category }" @click="closeSideMenuStateChanges()">Modems</span></nuxt-link>

      <!-- SORT BY PRICE -->
      <h3>Sort By</h3>
      <select v-model="selectedSort" @click="navigateSort(selectedSort)" aria-haspopup="true" aria-expanded="false" aria-labelledby="sort by dropdown">
        <option value="default">Default</option>
        <option value="lth">Price: Low to High</option>
        <option value="htl">Price: High to Low</option>
      </select>

      <!-- FILTER BY FIRMWARE -->
      <h3>By Firmware</h3>
      <div class="firmware">
        <input type="checkbox" id="openwrt" value="openwrt" v-model="checkedFirmwares">
        <label for="openwrt" :class="{ active: checkedFirmwares.includes('openwrt') }">OpenWrt</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="ddwrt" value="ddwrt" v-model="checkedFirmwares">
        <label for="ddwrt" :class="{ active: checkedFirmwares.includes('ddwrt') }">DD-WRT</label>
      </div>            
      <div class="firmware">
        <input type="checkbox" id="freshtomato" value="freshtomato" v-model="checkedFirmwares">
        <label for="freshtomato" :class="{ active: checkedFirmwares.includes('freshtomato') }">FreshTomato</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="asusmerlin" value="asusmerlin" v-model="checkedFirmwares">
        <label for="asusmerlin" :class="{ active: checkedFirmwares.includes('asusmerlin') }">Asuswrt-Merlin</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="gargoyle" value="gargoyle" v-model="checkedFirmwares">
        <label for="gargoyle" :class="{ active: checkedFirmwares.includes('gargoyle') }">Gargoyle</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="advancedtomato" value="advancedtomato" v-model="checkedFirmwares">
        <label for="advancedtomato" :class="{ active: checkedFirmwares.includes('advancedtomato') }">AdvancedTomato</label>
      </div>
      <div class="firmware">
        <input type="checkbox" id="tomatobyshibby" value="tomatobyshibby" v-model="checkedFirmwares">
        <label for="tomatobyshibby" :class="{ active: checkedFirmwares.includes('tomatobyshibby') }">Tomato by Shibby</label>
      </div>
      
      <!-- FILTER BY PRICE -->
      <h3>By Price</h3>
      <div class="filter-price" @click="navigatePrice('0-1500')" :class="{ active: query.price == '0-1500' }">Under Rs. 1500</div>
      <div class="filter-price" @click="navigatePrice('1500-3000')" :class="{ active: query.price == '1500-3000' }">Rs. 1500 - Rs. 3000</div>
      <div class="filter-price" @click="navigatePrice('3000-6000')":class="{ active: query.price == '3000-6000' }">Rs. 3000 - Rs. 6000</div>
      <div class="filter-price" @click="navigatePrice('6000-10000')":class="{ active: query.price == '6000-10000' }">Rs. 6000 - Rs. 10000</div>
      <div class="filter-price" @click="navigatePrice('10000')":class="{ active: query.price == '10000' }">Over Rs. 10000</div>
      <div class="filter-price">
        <input v-model.lazy.trim="minPrice" type="number" placeholder="Rs. Min">
        <input v-model.lazy.trim="maxPrice" type="number" placeholder="Rs. Max">
        <input type="submit" class="button" value="Go" @click="navigatePrice()">
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: "TheFilterMenu",
    data() {
      return {
        closedState: false,
        closingState: false,
        selectedSort: "default",
        checkedFirmwares: [],
        minPrice: "",
        maxPrice: "",
        reset: false
      };
    },
    props: ["isActive"],
    computed: {
      isShopPage() {
        return "/shop" == this.$route.path;
      },
      category() {
        return this.$route.query.category || "routers";
      },
      query() {
        return this.$route.query;
      }
    },
    watch: {
      checkedFirmwares(val) {
        let query = this.$route.query;

        delete query.firmware;
        delete query.reset;
      
        if (val.length > 0) {
          this.$router.push({ path: "shop", query: { ...query, firmware: val } });
        } else {
          // Adds "reset" to query to force it to refresh 
          this.$router.push({ path: "shop", query: { ...query, reset: this.reset } });
          this.reset = !this.reset;
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
      navigateSort(sort) {
        let query = this.$route.query;

        delete query.sort;

        if (sort == "default") {
          query = {...query, sort: "default"};
          this.$router.push({ path: "shop", query: query });

        } else {
          query = {...query, sort: sort};

          this.$router.push({ path: "shop", query: query });
        }
      },
      navigatePrice(priceRange) {
        let query = this.query;

        delete query.price;

        if (priceRange) {
          query = {...query, price: priceRange};
          this.$router.push({ path: "shop", query: query });
        } else {
          if ((this.minPrice == "0" && this.maxPrice == "0")||(this.minPrice == "" && this.maxPrice == "")) {
            this.$router.push({ path: "shop", query: { ...query, reset: this.reset }});
            this.reset = !this.reset;

          } else {
            if (this.maxPrice < this.minPrice) {
              this.maxPrice = "100000";
            }
            query = {...query, price: `${this.minPrice}-${this.maxPrice}`};
            this.$router.push({ path: "shop", query: query });
          }
        }

        
      }
    },

    created() {
      // clear filters if navigating back to shop page
      this.$store.watch(state => {
        return this.$store.getters["DeviceListModule/getFiltersToggle"];
      }, () => {
        this.checkedFirmwares = [];
        this.selectedSort = "default";
        this.minPrice = "";
        this.maxPrice = "";
      });
    }
  };
</script>

<style scoped>
  .menu {
    position: fixed;
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
    z-index: 200;
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

  .firmware, .filter-price {
    padding: 5px 10px;
    color: white;
    font-family: "Montserrat", sans-serif;
    font-size: 0.9rem;
  }

  .firmware label {
    margin-left: 5px;
    cursor: pointer;
  }

  .firmware label:hover {
    color: #deff00;
  }

  .firmware label.active {
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
  }

  @media (min-width: 769px) {

    .menu.shopPage {
      display: flex;
      z-index: 40;
    }
  }

</style>