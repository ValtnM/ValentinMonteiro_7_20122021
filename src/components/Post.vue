<template>
  <div class="card">
      <div class="card-body">
          <div class="card-title">{{ posts.title }}</div>
          <div class="card-text">{{ posts.user }}</div>
      </div>
      <img :src="posts.image" alt="" class="card-img-bottom">
  </div>
</template>

<script>

export default {
    name: 'Post',
    data(){
        return {
           
        }
    },
    props: ['posts'],
    components: {
        
    }
}
</script>

<style>
   
</style>