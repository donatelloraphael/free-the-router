
<template>
<div>
  <div class="container container-grid fluid">
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
        <h1>Why custom firmware?</h1>
        <p>
          Your router's factory firmware might be enough for a majority of people. More and more features are being implemented on factory firmwares these days so it is not necessary to get the feature you want straight out of the box. But for people who want something better and likes to tinker with stuff, custom firmware is the way to go.
        </p>
        <p>
          These provide various features that the factory firmware doesn't provide or implemented poorly, like file sharing by SAMBA, VPN support, Quality of Service (QoS) implementation, Dynamic DNS, Mesh networking, additional hardware support such as for web cams, better security and easier management, and many more. Some custom firmwares such as OpenWRT support installation of third party packages that increases the router's capabilities such as installing a torrent client, streaming music, printer sharing, etc.
        </p>
        <p>
          Unfortunately, the various custom firmwares support only certain models of routers commercially available and some routers might be limited by the Flash Memory size or RAM size to use full ability of custom firmwares unimpeded and might be forced to use lighter versions of custom firmwares. Chances are, if you just bought a new router, it is not guaranteed to work with a custom firmware. So it is important to choose a router supporting installation of the custom firmware you want before buying it. Selecting a compatable router is hard as there is half a dozen major router custom firmwares supporting many different devices. This site aims to make choosing a compatable router easier as it makes it easy to find a router in your budget comaptable with your custom firmware of choice.
        </p>
        <p>
          Even though we try to make this site accurate as possible, sellers might sell routers of different versions. This might be a problem as some versions of routers might not be supported by your preferred custom firmware. We try to make the versions of the router supported by the custom firmwares available in this website for your easy access. <strong>It is advised to check with the sellers what they are selling is the correct version of router you want so you can avoid any unwanted results. Also, it is important to follow the installation instructions that comes with different custom firmwares to avoid bricking your device. Be aware that installing custom firmware in your brand new router voids any warranty it may have in most cases.</strong>
        </p>
      </div>

      <div class="divider">
        <hr class="dotted-divider">
      </div>

      <div class="custom-firmwares">
        <h1>Custom Firmwares</h1>
        <div class="firmwares">
          <div class="openwrt firmware left">
            <img alt="openwrt logo" src="../assets/images/firmwares/openwrt.png">
          </div>
          <div class="ddwrt firmware right">
            <img alt="ddwrt logo" src="../assets/images/firmwares/ddwrt.png">
          </div>
          <div class="gargoyle firmware left">
            <img alt="gargoyle logo" src="../assets/images/firmwares/gargoyle.png">
          </div>
          <div class="freshtomato firmware right">
            <img alt="freshtomato logo" src="../assets/images/firmwares/freshtomato.png">
          </div>
          <div class="advancedtomato firmware left">
            <img alt="advancedtomato logo" src="../assets/images/firmwares/advancedtomato.png">
          </div>
          <div class="tomatobyshibby firmware right">
            <img alt="tomatobyshibby logo" src="../assets/images/firmwares/tomatobyshibby.png">
          </div>
        </div>
        
      </div>
    </section>

    <div class="bg-left">
      
    </div>
    <div class="bg-right">
  
    </div>
    
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
      ]);

    ////////////////////////////return asyncData variables//////////////////////////////////
    return { 
      topPicks: topPicksArray ,
      mostPopular: mostPopularArray
    };
  }
};
  
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}

.container-grid {
  display: grid;
  grid-template-areas: "bg-left body body body body body body bg-right";
}

.bg-left {
    grid-area: bg-left;
    background-color: #2e3192;
    width: 50px;
    padding: 8rem 0 0 0;
    height: 100%;
  }

 .bg-right {
    grid-area: bg-right;
    background-color: #2e3192;
    width: 50px;
    height: 100%;
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
    height: auto;
    width: 70%;
    /*background-color: yellow;*/
    margin: auto;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
  }

  .blue-container {
    background-color: #2e3192;
    width: 40%;
    margin: 0 0 0 3%;
    border-radius: 20px;
    margin-bottom: 2vw;
  }

  .price-card {
    background: no-repeat center / 40% url('../assets/images/router.png');
    color: white;
    height: 10rem;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .price-card h2 {
    font-family: "Montserrat", "Open Sans", sans-serif;
    margin: auto;

  }

  /********************************FIRMWARE INFO**************************/
  .cf-info {
    width: 60%;
    margin: auto;
  }

  .cf-info p {
    font-family: "Montserrat", "Open Sans", sans-serif;
    line-height: 2;
    text-align: left;
    margin: 0 0 30px 0;
  }

  /***********************************CUSTOM FIRMWARES***********************/
  .firmwares {
    display: flex;
    height: auto;
    width: 100%;
    flex-wrap: wrap;
    margin: 30px auto;
    justify-content: center;
  }

  .firmware {
    width: 30%;
    height: 10vw;
    margin-bottom: 40px;
    margin-right: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .right {
    margin-right: 0;
  }

 .firmware img {
  height: 50%;
  width: 60%;
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

    .cf-info {
      width: 80%;
    }

    .firmware {
      height: 20vw;
      width: 70%;
      margin-bottom: 20px;
    }

    .left {
      margin-right: 0;
    }
  }



</style>
