<template>
  <div>
      <router-link :to="{name: 'account'}"><img class="photo-profil" :src="photo" :alt="`Photo de ${name}`"></router-link>
  </div>
</template>

<script>
export default {
    name: 'Post',
    data(){
        return {
            firstname: 'Jean',
            photo: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg'            
        }
    }
}
</script>

<style lang="scss" scoped>
 .photo-profil {
     object-fit: cover;
     width: 100%;
     height: 100%;
     clip-path: circle();
     border-radius: 50%;
 }

</style>