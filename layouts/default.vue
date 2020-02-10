<template>
  <div>
    <app-header @sidenavToggle="displaySidenav = !displaySidenav"></app-header>
    <app-sidenav v-show="displaySidenav" @click="displaySidenav = false"></app-sidenav>
    <nuxt />
  </div>
</template>

<script>
  import TheHeader from '@/components/Navigation/TheHeader';
  import TheSideNav from '@/components/Navigation/TheSideNav';

  export default {
    data() {
      return {
        displaySidenav: false
      }
    },
    components: {
      appHeader: TheHeader,
      appSidenav: TheSideNav
    }
  };
</script>

<style>

</style>
