<template>
  <div class="container-grid fluid">
    <section class="body">
      
      <div class="top-picks">
        <app-top-picks :topPicks="topPicks"></app-top-picks>
        
      </div>
      <div class="popular">
        
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
import TopPicks from '../components/Carousals/TopPicks'

export default {
  // head() {
  //   return {
  //     script: [
  //       { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" },
  //       { src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" },
  //       { src: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" }
  //     ]
  //   }
  // },
  
  components: {
    appTopPicks: TopPicks
  },

  async asyncData(context) {
    const firmwareList = ["openwrt", "ddwrt", "gargoyle", "freshtomato", "advancedtomato", "tomatobyshibby"];
    // set Top Picks
    
     context.store.dispatch("TopPicksModule/populateTopPicks", "openwrt");
     context.store.dispatch("TopPicksModule/populateTopPicks", "ddwrt");
     context.store.dispatch("TopPicksModule/populateTopPicks", "gargoyle");
     context.store.dispatch("TopPicksModule/populateTopPicks", "freshtomato");
     context.store.dispatch("TopPicksModule/populateTopPicks", "advancedtomato");
     let topPicksArray = await context.store.dispatch("TopPicksModule/populateTopPicks", "tomatobyshibby");

    
    console.log('pages/index:', topPicksArray);
    return { topPicks: topPicksArray };
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

 /* .top-picks {
    width: auto;
    height: 40vw;
    background-color: cyan;
    display: block;
    margin: auto;
  }*/

  @media (max-width: 769px) {
    .bg-left, .bg-right {
      display: none;
    }
  }


</style>

