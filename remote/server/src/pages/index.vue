<template>
<div>
  <div class="container container-grid fluid">
    <h1>Custom Firmware supported Routers / Networking Devices - {{ country }}</h1>

    <section class="body">
      
      <div class="top-picks">
        <app-top-picks :topPicks="topPicks"></app-top-picks>
      </div>
      
      <hr class="dotted-divider">

      <div class="popular">
        <app-most-popular :mostPopular="mostPopular"></app-most-popular>
      </div>
     
      <hr class="dotted-divider">
     
      <div class="by-price">
        <h2>By Price</h2>
        <div class="price-container">
          <nuxt-link class="blue-container" :to="{ path: `/${$store.getters.getCountry}/shop/`, query: { price: `${priceFilter1}` } }">
            <div class="price-card">
              <h3>{{$store.getters.getCurrency}} {{priceFilter1}}</h3>
            </div>
          </nuxt-link>
          <nuxt-link class="blue-container" :to="{ path: `/${$store.getters.getCountry}/shop/`, query: { price: `${priceFilter2}` } }">
            <div class="price-card">
              <h3>{{$store.getters.getCurrency}} {{priceFilter2}}</h3>
            </div>
          </nuxt-link>
          <nuxt-link class="blue-container" :to="{ path: `/${$store.getters.getCountry}/shop/`, query: { price: `${priceFilter3}` } }">
            <div class="price-card">
              <h3>{{$store.getters.getCurrency}} {{priceFilter3}}</h3>
            </div>
          </nuxt-link>
          <nuxt-link class="blue-container" :to="{ path: `/${$store.getters.getCountry}/shop/`, query: { price: `${priceFilter4}-` } }">  
            <div class="price-card">
              <h3>{{$store.getters.getCurrency}} {{priceFilter4}} and up</h3>
            </div>
          </nuxt-link>
        </div>
      </div>
      
      <hr class="dotted-divider">

      <div class="cf-info">
        <h2>Why custom firmware?</h2>
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

      <hr class="dotted-divider">

      <div class="custom-firmwares">
        <h2>Custom Firmwares</h2>
        <div class="firmwares">
          <div class="openwrt firmware left">
            <nuxt-link :to="{ path: `/${$store.getters.getCountry}/firmware/#openwrt` }" @click.native="scrollTo('#openwrt')">
              <img alt="openwrt logo" src="~assets/images/firmwares/openwrt.png">
            </nuxt-link>
          </div>
          <div class="ddwrt firmware right">
            <nuxt-link :to="{ path: `/${$store.getters.getCountry}/firmware/#ddwrt-` }" @click.native="scrollTo('#ddwrt-')">
              <img alt="ddwrt logo" src="~assets/images/firmwares/ddwrt.png">
            </nuxt-link>
          </div>
          <div class="gargoyle firmware left">
            <nuxt-link :to="{ path: `/${$store.getters.getCountry}/firmware/#gargoyle-` }" @click.native="scrollTo('#gargoyle-')">
              <img alt="gargoyle logo" src="~assets/images/firmwares/gargoyle.png">
            </nuxt-link>
          </div>
          <div class="freshtomato firmware right">
            <nuxt-link :to="{ path: `/${$store.getters.getCountry}/firmware/#freshtomato-` }" @click.native="scrollTo('#freshtomato-')">
              <img alt="freshtomato logo" src="~assets/images/firmwares/freshtomato.png">
            </nuxt-link>
          </div>
          <div class="advancedtomato firmware left">
            <nuxt-link :to="{ path: `/${$store.getters.getCountry}/firmware/#advancedtomato-` }" @click.native="scrollTo('#advancedtomato-')">
              <img alt="advancedtomato logo" src="~assets/images/firmwares/advancedtomato.png">
            </nuxt-link>
          </div>
          <div class="tomatobyshibby firmware right">
            <nuxt-link :to="{ path: `/${$store.getters.getCountry}/firmware/#tomatobyshibby-` }" @click.native="scrollTo('#tomatobyshibby-')">
              <img alt="tomatobyshibby logo" src="~assets/images/firmwares/tomatobyshibby.png">
            </nuxt-link>
          </div>
          <div class="asuswrt-merlin firmware right">
            <nuxt-link :to="{ path: `/${$store.getters.getCountry}/firmware/#asuswrt-merlin` }" @click.native="scrollTo('#asuswrt-merlin')">
              <img alt="asuswrt-merlin logo" src="~assets/images/firmwares/asuswrt-merlin.png">
            </nuxt-link>
          </div>
        </div>
        
      </div>
      <div class="statement">Freetherouter.com is a participant in the Amazon Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.</div>

    </section>

    <div class="bg-left">
      
    </div>
    <div class="bg-right">
  
    </div>
    
  </div>
</div>
</template>

<script>
import TopPicks from '~/components/Carousals/TopPicks';
import MostPopular from '~/components/Carousals/MostPopular';
import { HomeLocale } from '~/app/locales';

const TIMEOUT = 1;

export default {
  head() {
    return {
      title: "Free The Router - Custom Firmware supported devices",
      meta: [
        { hid: 'description', name: 'description', content: 'Find routers and networking devices supporting custom firmwares' }
      ],
      link: HomeLocale
    };
  },
  components: {
    appTopPicks: TopPicks,
    appMostPopular: MostPopular
  },

  computed: {
    country() {
      switch(this.$store.getters.getCountry) {
        case "us": return "United States of America (US)";
        case "in": return "India";
        case "gb": return "United Kingdom (UK)";
        case "ca": return "Canada";
        case "fr": return "France";
        case "mx": return "Mexico";
        case "de": return "Germany";
      }
    }
  },

  methods: {
    scrollTo: function (hashtag) {
      setTimeout(() => { location.href = hashtag; }, TIMEOUT);
    }
  },
  
  async asyncData(context) {

    /////////////////////Set Most Popular and topPicks arrays in parallel//////////////////////////////////

    const [topPicks, mostPopular] = await context.store.dispatch("TopPicksMostPopularModule/populateTopPicksMostPopular");
     

    ///////////////////////BY PRICE//////////////////////////////////////////////
    let priceFilter1 = "0-30", priceFilter2 = "30-60", priceFilter3 = "60-120", priceFilter4 = "120";
    if (context.store.getters.getCountry == "in") {
      priceFilter1 = "0-1500"; 
      priceFilter2 = "1500-3000"; 
      priceFilter3 = "3000-6000"; 
      priceFilter4 = "6000";
    }

    ////////////////////////////return asyncData variables//////////////////////////////////
    return { 
      topPicks,
      mostPopular,
      priceFilter1,
      priceFilter2,
      priceFilter3,
      priceFilter4
    };
  },

  mounted() {
    this.$store.dispatch("setHomeOldCountry", this.$store.getters.getCountry);
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
    -webkit-box-shadow: 2px 0px 5px 0px rgba(120,120,120,1);
    -moz-box-shadow: 2px 0px 5px 0px rgba(120,120,120,1);
    box-shadow: 2px 0px 5px 0px rgba(120,120,120,1);
  }

 .bg-right {
    grid-area: bg-right;
    background-color: #2e3192;
    width: 50px;
    height: 100%;
    padding: 8rem 0 0 0;
    -webkit-box-shadow: -2px 0px 5px 0px rgba(120,120,120,1);
    -moz-box-shadow: -2px 0px 5px 0px rgba(120,120,120,1);
    box-shadow: -2px 0px 5px 0px rgba(120,120,120,1);
  }

  .body {
    grid-area: body;
    /*background-color: green;*/
    padding: 8rem 0 0 0;
  }

  /*****************************BY PRICE**********************************/
  h1 {
    position: absolute;
    font-size: 2px;
  }

  h2 {
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
    background: no-repeat center / 40% url('~assets/images/router.png');
    color: white;
    height: 10rem;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .price-card:hover {
    color: yellow;
  }

  .price-card h3 {
    font-family: "Montserrat", sans-serif;
    margin: auto;
    font-size: 1.4rem;
  }

  a {
    text-decoration: none !important;
  }

  /********************************FIRMWARE INFO**************************/
  .cf-info {
    width: 60%;
    margin: auto;
  }

  .cf-info p {
    font-family: "Montserrat", sans-serif;
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

  .firmware a {
    width: 100%;
    height: 100%;
  }

  .firmware img {
    height: 50%;
    width: 60%;
  }

  .statement {
    font-size: 0.9rem;
    color: grey;
    text-align: center;
    margin: 30px 20px;
  }

 /*******************************MEDIA QUERYS****************************/

  @media (max-width: 789px) {

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

    .price-card h3 {
      font-size: 1.2rem;
    }

    .cf-info {
      width: 90%;
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
