<template>
  <div id="root-container">
    <app-header></app-header>
    
    <nuxt id="main"></nuxt>
    
    <app-footer></app-footer>
    
  </div>
</template>

<script>
  import TheHeader from '@/components/Navigation/TheHeader';
  import TheFooter from '@/components/Navigation/TheFooter';
  import {firebase} from "~/plugins/firebase.js";


  export default {
    
    components: {
      appHeader: TheHeader,
      appFooter: TheFooter
    },

    mounted() {
      firebase.analytics();
    }
  };
</script>

<style scoped>

  #root-container {
    position: relative;
    min-height: 100%;
  }

</style>
