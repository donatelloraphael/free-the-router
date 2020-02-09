<template>
  <div class="b-container fluid">

    <app-header></app-header>

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
  
</script>

<style>

  /*Main grid*/
  .b-container {
    display: grid;
    /*grid-gap: 10px;*/
    height: 100vh;
    width: 100vw;
    grid-template-areas: "header header header header header header"
                         "bg-left body body body body bg-right"
                         "footer footer footer footer footer footer";
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

  .footer {
    grid-area: footer;
    background-color: blue;
  }



</style>

