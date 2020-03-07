<template>
  <div>

    <div class="sidenav-backdrop" @click="dropdownDelayedToggle(); closeSideMenuStateChanges() " :class="{ closing: closingState, closed: setClosingState() }">
    </div>
    
    <div class="menu" :class="{ active: isActive, closing: closingState, closed: setClosingState() }">
      <nuxt-link to="/"><span @click="closeSideMenuStateChanges()">Home</span></nuxt-link>
      <nuxt-link to="/signin"><span @click="closeSideMenuStateChanges()">Sign In</span></nuxt-link>
      <nuxt-link to="/register"><span @click="closeSideMenuStateChanges()">Register</span></nuxt-link>
      <nuxt-link to="/shop"><span @click="closeSideMenuStateChanges()">Shop</span></nuxt-link>
      <!-- <nuxt-link to="/deals"><span @click="closeSideMenuStateChanges()">Deals</span></nuxt-link> -->
      <nuxt-link to="/wishlist"><span @click="closeSideMenuStateChanges()">Wishlist</span></nuxt-link>
      <nuxt-link to="/supported-devices"><span @click="closeSideMenuStateChanges()">Supported Devices</span></nuxt-link>
      <nuxt-link to="/resources"><span @click="closeSideMenuStateChanges()">Resources</span></nuxt-link>
      <nuxt-link to="/help"><span @click="closeSideMenuStateChanges()">Help</span></nuxt-link>

      <div class="nav-country-dropdown">
  
        <select class="dropdown-menu-sidebar" @click="setCountry($event.target.value);" aria-labelledby="navbarDropdown">
          <option class="dropdown-item" value="india" :selected="'india' == $store.getters.getCountry" href="#">India</option>
          <option class="dropdown-item" value="usa" :selected="'usa' == $store.getters.getCountry" href="#">USA</option>
          <option class="dropdown-item" value="canada" :selected="'canada' == $store.getters.getCountry" href="#">Canada</option>
          <option class="dropdown-item" value="uk" :selected="'uk' == $store.getters.getCountry" href="#">UK</option>
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
        this.$store.dispatch("setFlagUrl", this.$store.getters.getCountry);
        // console.log(country);
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
    width: 50vw;
    height: 100vh;
    min-width: 180px;
    padding: 30px;
    flex-direction: column;
    background-color: #2e3192;
    overflow-y: auto;
    animation-name: nav-slide;
    animation-duration: .5s;
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
    from{left: -50vw;}
    to{left: 0;}
  }

  @keyframes nav-slide-out {
    from{left: 0;}
    to{left: -50vw;}
  }

  .sidenav-backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 20;
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
    to{opacity: 100%}
  }

  @keyframes backdrop-fade {
    from{opacity: 100%}
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
    border-radius: 5px;
    cursor: ponter;
  }

  .menu span:hover{
    background-color: #0b0e85;
  }

  .menu a{
    text-decoration: none;
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