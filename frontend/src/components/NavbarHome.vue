<template>
  <div class="navbar-container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger px-5 py-3">
      <router-link  class="nav-link" :to="{name: 'home'}"><img src="../../public/img/icons/icon-left-font-monochrome-white.svg" alt="Logo groupomania"></router-link>
      <button class="navbar-toggler nav-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link  class="nav-link" :to="{name: 'login'}">CONNEXION</router-link>
          </li>
          <li class="nav-item">
            <router-link  class="nav-link" :to="{name: 'signup'}">INSCRIPTION</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'NavbarHome'
}
</script>

<style lang="scss">


  @media screen and (max-width: 700px) {
    .nav-link {
      width: 80%;
    }
    .nav-btn {
      width: 30px;
      padding: 0.1rem !important;
      span {
        width: 100%;
      }
    }
    
  }

  @media screen and (max-width: 350px) {
    .nav-link {
      width: 175px;
      font-size: 0.8em;
    }
    .nav-btn {
      width: 20px;
    }
  }
  
</style>