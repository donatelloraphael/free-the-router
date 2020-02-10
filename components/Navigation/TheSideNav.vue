<template>
   <div class="menu active">
      <p>Home</p>
      <p>CSSSCRIPT.COM</p>
      <p>About Us</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TheSideNav"
  };
</script>

<style>
  .menu {
    position: absolute;
    left: -30%;
    z-index: 998;
    color: #005c9c;
    background: rgba(250, 250, 250, 0.7);
    /*-webkit-clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
            clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);*/
    width: 30%;
    height: 100%;
    padding: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 300ms left cubic-bezier(0.77, 0, 0.175, 1);
  }
  @media only screen and (max-width: 768px) {
    .menu {
      width: 250px;
      left: -250px;
      padding: 50px;
    }
  }
  .menu.active {
    left: 0;
  }
  .menu p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
</style>