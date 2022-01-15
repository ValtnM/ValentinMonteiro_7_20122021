<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger px-5 py-3">
      <router-link  class="nav-link" :to="{name: 'home'}"><img src="../../public/img/icons/icon-left-font-monochrome-white.svg" alt="Logo groupomania"></router-link>
      <!-- <a href="#" class="navbar-brand"><img src="../../public/img/icons/icon-left-font-monochrome-white.svg" alt="Logo groupomania"></a> -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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

<style>

</style>