<template>
  <div>
    <navbar-user></navbar-user>
    <h1>Coucou !</h1>
  </div>
</template>

<script>
import NavbarUser from '../components/NavbarUser.vue'

export default {
  name: 'Account',
  components: {
    'navbar-user': NavbarUser
  }
}
</script>

<style>

</style>