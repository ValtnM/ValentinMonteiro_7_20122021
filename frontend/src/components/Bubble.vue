<template>
  <div>
      <router-link :to="{name: 'profile'}"><img class="photo-profil" :src="photo" :alt="`Photo de ${name}`"></router-link>
      <!-- <button class="btn btn-primary">TEST</button> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Post',
    data(){
        return {
            photo: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg'  ,
            name: ''          
        }
    },
    // props: ['photo'],
    methods: {
        getUser() {
            axios.get('http://localhost:3000/api/users/profile')
                .then(res => console.log(res))
                .catch(err => console.log(err))
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