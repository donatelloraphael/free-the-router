<template>
  <div class="container-grid fluid">
    <section class="body">
      
      <div class="top-picks">
        <app-top-picks :topPicks="topPicks"></app-top-picks>
      </div>
      
      <div class="divider">
        <hr class="dotted-divider">
      </div>

      <div class="popular">
        <app-most-popular :mostPopular="mostPopular"></app-most-popular>
      </div>
      <div class="deals">
        
      </div>
      <div class="by-price">
        
      </div>
      <div class="cf-info">
        
      </div>
      <div class="custom-firmwares">
        
      </div>
    </section>

    <div class="bg-left">
      
    </div>
    <div class="bg-right">
  
    </div>
    
  </div>
</template>

<script>
import TopPicks from '../components/Carousals/TopPicks';
import MostPopular from '../components/Carousals/MostPopular';

export default {
  components: {
    appTopPicks: TopPicks,
    appMostPopular: MostPopular
  },

  async asyncData(context) {
    // const firmwareList = ["openwrt", "ddwrt", "gargoyle", "freshtomato", "advancedtomato", "tomatobyshibby"];
    
    // set Top Picks
     context.store.dispatch("TopPicksModule/populateTopPicks", "openwrt");
     context.store.dispatch("TopPicksModule/populateTopPicks", "ddwrt");
     context.store.dispatch("TopPicksModule/populateTopPicks", "gargoyle");
     context.store.dispatch("TopPicksModule/populateTopPicks", "freshtomato");
     context.store.dispatch("TopPicksModule/populateTopPicks", "advancedtomato");

     /////////////////////Set Most Popular and topPicks arrays in parallel//////////////////////////////////

     const [topPicksArray, mostPopularArray] = await Promise.all([
        context.store.dispatch("TopPicksModule/populateTopPicks", "tomatobyshibby"),
        context.store.dispatch("MostPopularModule/populateMostPopular")
      ]) ;
    
    // console.log('pages/index:', topPicksArray);

    ////////////////////////////return asyncData variables//////////////////////////////////
    return { 
      topPicks: topPicksArray ,
      mostPopular: mostPopularArray
    };
  }
};
  
</script>

<style scoped>

  /*Main grid*/
  .container-grid {
    display: grid;
    position: absolute;
    z-index: 5;
    min-height: 100vh; /*Height of header '8rem' + footer '10rem'*/
    width: 100%;
    grid-template-areas: "bg-left body body body body body body bg-right";
                         /*". . . . . .";*/
    text-align: center;
    margin-bottom: 250px;
  }

  .bg-left {
    grid-area: bg-left;
    background-color: #2e3192;
    padding: 8rem 0 0 0;
  }

 .bg-right {
    grid-area: bg-right;
    background-color: #2e3192;
    padding: 8rem 0 0 0;
    
  }

  .body {
    grid-area: body;
    /*background-color: green;*/
    padding: 8rem 0 0 0;
  }
  
  .divider {
    padding: 10px 0;
    background-color: #2e3192;
    height: 30px;
    width: 100%;
  }

  hr.dotted-divider {
    border: none;
    border-top: 10px dotted #8384b3;
    width: 100%;
    margin: auto;
  }
  
  @media (max-width: 769px) {
    .bg-left, .bg-right {
      display: none;
    }
  }


</style>

