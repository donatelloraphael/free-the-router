<template>
  <div>

    <div class="sidenav-backdrop" @click="closingState = true; closeSideMenu(); toggleClosedState(); toggleClosingState();" :class="{ closed: setClosingState() }">
    </div>
    
    <div class="menu" @click="closingState = true; closeSideMenu(); toggleClosingState(); toggleClosedState();" :class="{ active: isActive, closing: closingState, closed: setClosingState() }">
      <nuxt-link to="/"><span>Home</span></nuxt-link>
      <nuxt-link to="/signin"><span>Sign In</span></nuxt-link>
      <nuxt-link to="/register"><span>Register</span></nuxt-link>
      <nuxt-link to="/shop"><span>Shop</span></nuxt-link>
      <nuxt-link to="/deals"><span>Deals</span></nuxt-link>
      <nuxt-link to="/wishlist"><span>Wishlist</span></nuxt-link>
      <nuxt-link to="/supported-devices"><span>Supported Devices</span></nuxt-link>
      <nuxt-link to="/resources"><span>Resources</span></nuxt-link>
      <nuxt-link to="/help"><span>Help</span></nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TheSideNav",
    data() {
      return {
        closedState: true,
        closingState: false
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
      }
    },
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
    min-width: 250px;
    padding: 50px;
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
  }

  .menu span:hover{
    background-color: #0b0e85;
  }

  .menu a{
    text-decoration: none;
  }

</style>