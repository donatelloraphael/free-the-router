<template>
  <div id="root-container">
    <app-header></app-header>
    <nuxt />
    <app-footer></app-footer>
    
  </div>
</template>

<script>
  import TheHeader from '@/components/Navigation/TheHeader';
  import TheFooter from '@/components/Navigation/TheFooter';

  export default {
    
    components: {
      appHeader: TheHeader,
      appFooter: TheFooter
    }
  };
</script>

<style>

</style>
