<template>
  <div>

    <div class="sidenav-backdrop" @click="closeSideMenuStateChanges() " :class="{ closing: closingState, closed: setClosingState() }">
    </div>
    
    <div class="menu" :class="{ active: isActive, closing: closingState, shopPage: isShopPage, closed: setClosingState() }">
      <h3>Category</h3>
      <nuxt-link :to="{ path: 'shop', query: { category: 'all-devices' }}"><span :class="{ active: 'all-devices' == category }" @click="closeSideMenuStateChanges()">All Devices</span></nuxt-link>
      <nuxt-link :to="{ path: 'shop', query: { category: 'routers' }}"><span :class="{ active: 'routers' == category }" @click="closeSideMenuStateChanges()">Routers</span></nuxt-link>
      <nuxt-link :to="{ path: 'shop', query: { category: 'wireless-access-points' }}"><span :class="{ active: 'wireless-access-points' == category }" @click="closeSideMenuStateChanges()">Wireless Access Points</span></nuxt-link>
      <nuxt-link :to="{ path: 'shop', query: { category: 'repeaters-extenders' }}"><span :class="{ active: 'repeaters-extenders' == category }" @click="closeSideMenuStateChanges()">Repeaters & Extenders</span></nuxt-link>
      <nuxt-link :to="{ path: 'shop', query: { category: 'modems' }}"><span :class="{ active: 'modems' == category }" @click="closeSideMenuStateChanges()">Modems</span></nuxt-link>

      <h3>By Firmware</h3>
      <nuxt-link to="/wishlist"><span @click="closeSideMenuStateChanges()">Wishlist</span></nuxt-link>
      <nuxt-link to="/supported-devices"><span @click="closeSideMenuStateChanges()">Supported Devices</span></nuxt-link>
      <nuxt-link to="/resources"><span @click="closeSideMenuStateChanges()">Resources</span></nuxt-link>
      <nuxt-link to="/about"><span @click="closeSideMenuStateChanges()">About Us</span></nuxt-link>

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
      }
    },
    props: ["isActive"],
    computed: {
      isShopPage() {
        return "/shop" == this.$route.path;
      },
      category() {
        return this.$route.query.category;
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
      closeSideMenuStateChanges() {
        if (window.matchMedia("(max-width: 768px)").matches) {
          console.log("MATCHES");
          this.closingState = true; 
          this.closeSideMenu(); 
          this.toggleClosingState(); 
          this.toggleClosedState();
        }
      }
    },

    mounted() {
      console.log(this.category);
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
    color: #deff00;
  }

  .menu span:hover{
    background-color: #0b0e85;
  }

  .menu a{
    text-decoration: none;
  }

  .menu h3 {
    font-size: 1.4rem;
    color: white;
    padding: 10px;
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