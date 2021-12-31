<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger px-5 py-3">
      <router-link  class="nav-link" :to="{name: 'posts'}"><img src="../../public/img/icons/icon-left-font-monochrome-white.svg" alt="Logo groupomania"></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link  class="nav-link" :class="{ 'active-link': isActive  }" :to="{name: 'profile'}">MON COMPTE</router-link>
          </li>
          <li class="nav-item">
            <router-link  class="nav-link" :to="{name: 'login'}">DECONNEXION</router-link>
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
        userId: '',
        profileId: '',
        isActive: true
      }
    },
    methods: {
      getProfileId(){
        this.userId = sessionStorage.getItem('userId');
        this.profileId = this.$route.params.id;
      },
      activeLink(){
        if(this.profileId == this.userId){
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      }
    },
    created(){
      this.getProfileId()
      this.activeLink()
    }
}
</script>

<style lang="scss" scoped>
  .active-link {
    color: rgba(255,255,255,0.55)!important;
    font-size: 1em!important;
    font-weight: 500!important;
  }
</style>