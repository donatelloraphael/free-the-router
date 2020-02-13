<template>
  <div class="container-grid fluid">
    <section class="body">
      
      <div class="top-picks">
        
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

    <section class="footer">
      <div class="main-footer">
        
      </div>
      <div class="copyright">
        
      </div>
    </section>
    
  </div>
</template>

<script>

export default {
  head() {
    return {
      script: [
        { src: "https://code.jquery.com/jquery-3.4.1.slim.min.js" },
        { src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" },
        { src: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" }
      ]
    }
  }
};
  
</script>

<style scoped>

  /*Main grid*/
  .container-grid {
    display: grid;
    position: absolute;
    /*top: 8rem;*/
    /*bottom: 0;*/
    z-index: 5;
    /*grid-gap: 10px;*/
    min-height: 100%; /*Height of header '8rem' + footer '10rem'*/
    width: 100vw;
    grid-template-areas: "bg-left body body body body bg-right";
                         /*". . . . . .";*/
  }

  .bg-left {
    grid-area: bg-left;
    background-color: pink;
  }

 .bg-right {
    grid-area: bg-right;
    background-color: pink;
  }

  .body {
    grid-area: body;
    background-color: green;
  }

  .top-picks {
    width: 200px;
    height: 1600px;
    background-color: magenta;  
  }



</style>

