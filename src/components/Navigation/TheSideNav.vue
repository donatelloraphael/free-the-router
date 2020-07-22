<template>
  <div>

    <div class="sidenav-backdrop" @click="dropdownDelayedToggle(); closeSideMenuStateChanges() " :class="{ closing: closingState, closed: setClosingState() }">
    </div>
    
    <div class="menu" :class="{ active: isActive, closing: closingState, closed: setClosingState() }">
      <nuxt-link to="/"><span @click="closeSideMenuStateChanges()">Home</span></nuxt-link>
      <!-- <nuxt-link to="/signin"><span @click="closeSideMenuStateChanges()">Sign In</span></nuxt-link> -->
      <!-- <nuxt-link to="/register"><span @click="closeSideMenuStateChanges()">Register</span></nuxt-link> -->
      <nuxt-link to="/shop" :class="{activeAlt: path == '/shop'}"><span @click="closeSideMenuStateChanges()">Shop</span></nuxt-link>
      <nuxt-link to="/firmware"><span @click="closeSideMenuStateChanges()">Firmware</span></nuxt-link>
      <!-- <nuxt-link to="/wishlist"><span @click="closeSideMenuStateChanges()">Wishlist</span></nuxt-link> -->
      <nuxt-link to="/supported-devices"><span @click="closeSideMenuStateChanges()">Supported Devices</span></nuxt-link>
      <nuxt-link to="/resources"><span @click="closeSideMenuStateChanges()">Resources</span></nuxt-link>
      <nuxt-link to="/about"><span @click="closeSideMenuStateChanges()">About Us</span></nuxt-link>

      <div class="nav-country-dropdown">
  
        <select class="dropdown-menu-sidebar" @change="setCountry($event.target.value);" aria-labelledby="navbarDropdown">
          <option class="dropdown-item" value="US" :selected="'US' == $store.getters.getCountry" href="#">USA</option>
          <option class="dropdown-item" value="IN" :selected="'IN' == $store.getters.getCountry" href="#">India</option>
          <option class="dropdown-item" value="CA" :selected="'CA' == $store.getters.getCountry" href="#">Canada</option>
          <option class="dropdown-item" value="UK" :selected="'UK' == $store.getters.getCountry" href="#">UK</option>
        </select>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "TheSideNav",
    data() {
      return {
        closedState: true,
        closingState: false,
      }
    },

    props: ["isActive"],

    computed: {
      path() {
        return this.$route.path;
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
      ///////////Delayed toggle to keep country dropdown in screen through closing action///////////////
      dropdownDelayedToggle() {
        setTimeout(() => {
          this.dropdownState = false;
        }, 500);
      },        
      closeSideMenuStateChanges() {
        this.closingState = true; 
        this.closeSideMenu(); 
        this.toggleClosingState(); 
        this.toggleClosedState();
      },
      setCountry(country) {
        this.$store.dispatch("setCountry", country);
        // console.log("this: ", this.$store.getters.getCountry);
      }
    }
  };
</script>

<style scoped>
  .menu {
    position: fixed;
    z-index: 998;
    display: flex;
    left: -50vw;
    width: auto;
    height: 100%;
    min-width: 180px;
    padding: 10rem 30px;
    flex-direction: column;
    background-color: #2e3192;
    overflow-y: auto;
    animation-name: nav-slide;
    animation-duration: .5s;
    box-shadow: 0px 0 10px rgba(0, 0, 0, 1);
  }

  .menu.active {
    left: 0;
  }

  .menu.closing {
    animation-name: nav-slide-out;
    animation-duration: .5s;
  }

  .menu.closed {
    display: none;
  }

  @keyframes nav-slide {
    from{left: -100vw;}
    to{left: 0;}
  }

  @keyframes nav-slide-out {
    from{left: 0;}
    to{left: -100vw;}
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
    
  .menu span{
    font-size: 1.2rem;
    font-family: "Courier Prime", monospace;
    color: white;
    display: block;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    cursor: ponter;
  }

  .menu span:hover{
    background-color: #0b0e85;
  }

  .menu a{
    text-decoration: none;
  }

  .menu a.nuxt-link-exact-active span, .menu a.activeAlt span {
    color: #deff00;
    background-color: #4146c1;
  }

  /*************************************Country dropdown************************************/
  
  .dropdown-menu-sidebar {
    display: flex;
    position: relative;
    left: 8px;
    top: 18px;
    color: black;
    flex-direction: column;
    padding: 5px 12px;
    border-radius: 10px;

  }

  .dropdown-menu-sidebar a {
    color: white;
    border-radius: 5px;
    font-family: "Courier Prime", monospace;
  }

</style>