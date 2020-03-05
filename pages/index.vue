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
     
      <div class="divider">
        <hr class="dotted-divider">
      </div>

      <div class="by-price">
        <h1>By Price</h1>
        <div class="price-container">
          <div class="blue-container">
            <div class="price-card">
              <h2>Rs. 0-1500</h2>
            </div>
          </div>
          <div class="blue-container">
            <div class="price-card">
              <h2>Rs. 1500-3000</h2>
            </div>
          </div>
          <div class="blue-container">
            <div class="price-card">
              <h2>Rs. 3000-6000</h2>
            </div>
          </div>
          <div class="blue-container">  
            <div class="price-card">
              <h2>Rs. 6000 and up</h2>
            </div>
          </div>
        </div>
      </div>
      
      <div class="divider">
        <hr class="dotted-divider">
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
    height: 2910px;
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
    margin: 30px 0;
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

  /*****************************BY PRICE**********************************/
  h1 {
    font-family: "Courier Prime", monospace;
    margin: 30px auto 15px auto;
    font-size: 1.6rem;
  }

  .price-container {
    display: flex;
    flex-wrap: wrap;
    height: 30rem;
    width: 70%;
    /*background-color: yellow;*/
    margin: auto;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
  }

  .blue-container {
    background-color: #2e3192;
    height: 40%;
    width: 40%;
    margin: 0 0 0 3%;
    border-radius: 20px;
  }

  .price-card {
    background: no-repeat center / 40% url('../assets/images/router.png');
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .price-card h2 {
    font-family: "Montserrat", "Open Sans", sans-serif;
    margin: auto;

  }



  /*******************************MEDIA QUERYS****************************/
  @media (max-width: 769px) {
    .bg-left, .bg-right {
      display: none;
    }

    .price-container {
      width: 90%;
      padding: 0;
    }

    .blue-container {
      width: 45%;
    }

    .price-card h2 {
      font-size: 1.2rem;
    }
  }


</style>

