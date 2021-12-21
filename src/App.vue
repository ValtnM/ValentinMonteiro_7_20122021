<template>
  <div id="app container">
    <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-danger px-5 py-3">
      <a href="#" class="navbar-brand"><img src="../public/img/icons/icon-left-font-monochrome-white.svg" alt="Logo groupomania"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!connected">
            <router-link  class="nav-link" :to="{name: 'login'}">CONNEXION</router-link>
          </li>
          <li class="nav-item" v-if="!connected">
            <router-link  class="nav-link" :to="{name: 'signup'}">INSCRIPTION</router-link>
          </li>
          <li class="nav-item" v-if="connected">
            <router-link  class="nav-link" :to="{name: 'account'}">MON COMPTE</router-link>
          </li>
          <li class="nav-item" v-if="connected" @click="connected = false">
            <router-link  class="nav-link" :to="{name: 'login'}">DECONNEXION</router-link>
          </li>
        </ul>
      </div>
    </nav> -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        connected: true
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
