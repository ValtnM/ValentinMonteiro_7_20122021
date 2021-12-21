<template>
  <div>
      <img class="photo-profil" :src="photo" :alt="`Photo de ${name}`">
      <h4 class="prenom-profil">{{ firstname }}</h4>
      
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

<style lang="scss">
 .photo-profil {
     margin-top: 20px;
     object-fit: cover;
     height: 100px;
     width: 100px;
     border-radius: 50%;
 }

 .prenom-profil {
     width: 100%;
     margin: auto;
     font-size: 1.1em;
     text-align: center;
 }
</style>