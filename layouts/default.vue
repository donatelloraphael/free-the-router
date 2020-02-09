<template>
  <div>
    <app-header></app-header>
    <nuxt />
  </div>
</template>

<script>
  import TheHeader from '@/components/Navigation/TheHeader';

  export default {
    components: {
      appHeader: TheHeader
    }
  };
</script>

<style>

</style>
