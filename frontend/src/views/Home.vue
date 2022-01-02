<template>
  <div id="app container">
    <navbar-home></navbar-home>
      <div class="card">
          <img class="card-img-top" src="../../public/img/icons/icon.svg" alt="">
          <div class="card-body p-4">
              <h2 class="card-title"><h1>Bienvenue sur le réseau social de Groupomania !</h1></h2>
              <hr>
              <router-link :to="{name: 'login'}"><button class="btn btn-success">Me connecter</button></router-link>
              <br>
              <router-link :to="{name: 'signup'}"><button class="btn btn-danger">M'inscrire</button></router-link>              
          </div>
      </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarHome from '../components/NavbarHome.vue'

export default {
  name: 'Home',
  components: {
    'navbar-home': NavbarHome
  }
}
</script>
  

<style lang="scss" scoped>
  h1 {
    font-size: 0.7em;
  }

  .card-body .btn {
    width: 100%;
    margin-top: 20px;
    a {
      color: white;
      text-decoration: none;
    }
  }

</style>
