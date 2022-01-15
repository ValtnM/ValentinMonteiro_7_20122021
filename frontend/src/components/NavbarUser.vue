<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger px-5 py-3">
      <router-link  class="nav-link" :to="{name: 'posts'}"><img src="../../public/img/icons/icon-left-font-monochrome-white.svg" alt="Logo groupomania"></router-link>
      <button class="navbar-toggler nav-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a  class="nav-link" :class="{ 'active-link': isActive  }" :href="$router.resolve({name: 'profile', params: { id: userId}}).href">MON COMPTE</a>
          </li>
          <li class="nav-item">
            <a :href="$router.resolve({name: 'login'}).href" class="nav-link" @click="disconnect">DECONNEXION</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'NavbarUser',
    data(){
      return {
        userId: null,
        profileId: '',
        isActive: false
      }
    },
    methods: {

      // Récupération de l'ID de l'utilisateur authentifié et de l'ID présent dans l'URL
      getProfileId(){
        this.userId = parseInt(sessionStorage.getItem('userId'));
        this.profileId = this.$route.params.id;
      },

      // Comparaison des deux ID
      activeLink(){
        if(this.profileId == this.userId){
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },

      // Suppression du contenu du session storage
      disconnect(){
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
      }
    },

    // Appel des fonctions lors de la création du composant
    created(){
      this.getProfileId()
      this.activeLink()
    },
    
}
</script>

<style lang="scss">
  .active-link {
    color: rgba(255,255,255,1)!important;
    font-size: 1em!important;
    font-weight: 500!important;
  }
</style>