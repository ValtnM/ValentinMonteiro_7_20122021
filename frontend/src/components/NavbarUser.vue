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
            <!-- <router-link  class="nav-link" :class="{ 'active-link': isActive  }" :to="{name: 'profile', params: { id: userId}}" :key="$route.fullPath">MON COMPTE</router-link> -->
            <a  class="nav-link" :class="{ 'active-link': isActive  }" :href="$router.resolve({name: 'profile', params: { id: userId}}).href">MON COMPTE</a>
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
        userId: null,
        profileId: '',
        isActive: false
      }
    },
    methods: {
      getProfileId(){
        this.userId = parseInt(sessionStorage.getItem('userId'));
        this.profileId = this.$route.params.id;
      },
      activeLink(){
        if(this.profileId == this.userId){
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    },
    created(){
      this.getProfileId()
      this.activeLink()
    },
    
}
</script>

<style lang="scss" scoped>
  .active-link {
    color: rgba(255,255,255,1)!important;
    font-size: 1em!important;
    font-weight: 500!important;
  }
</style>