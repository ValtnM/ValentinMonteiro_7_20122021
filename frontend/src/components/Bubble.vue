<template>
  <div>
      <router-link :to="{name: 'profile', params: { id: userId }}"><img class="photo-profil" :src="photo" alt="`Photo de profil`"></router-link>
  </div>
</template>

<script>
export default {
    name: 'Bubble',    
    props: ['userId', 'photo'],
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