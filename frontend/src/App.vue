<template>
  <div id="app container">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
      }
    },
    components: {
    }
  }
</script>

<style lang="scss">
  * {
    font-family: 'Roboto', sans-serif;
  }

  body {
    background-color: #f3f3f3!important;
  }

  .navbar img {
    width: 100%;
  }

  .router-link-active {
    color: white!important;
    font-weight: 600;
    font-size: 1.1em;
  }

  @media screen and (max-width: 800px) {
    .navbar-brand {
      width: 60%;
    }
  }
</style>
