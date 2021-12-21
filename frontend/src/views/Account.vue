<template>
  <div>
    <navbar-user></navbar-user>
    <member></member>
  </div>
</template>

<script>
import NavbarUser from '../components/NavbarUser.vue'
import Member from '../components/Member.vue'

export default {
  name: 'Account',
  components: {
    'navbar-user': NavbarUser,
    'member': Member,
  }
}
</script>



<style lang="scss" scoped>
  .card {
    margin: 0 auto;    
    &-body {
      padding-top: 175px;
    }
  }

  .user {
    &-photo {
      position: relative;
      top: 150px;
      z-index: 1;
      margin: auto;
      width: 300px;
      height: 300px;
    }
  }
  .email {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 1.4em;
    }
    h3 {
      margin: auto 0 auto 10px;
    }
  }
  .modify-user {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .btn {
      margin-top: 15px;
    }
  }
</style>