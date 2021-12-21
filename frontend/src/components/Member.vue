<template>
  <div>
    <div class="member-card">
      <div class="card">
        <bubble class="member-photo"></bubble>
        <div class="card-body">
          <h2 class="card-title">John Doe</h2>
          <div class="email">
            <i class="fas fa-at"></i>
            <h3>john.doe@gmail.com</h3>
          </div>
          <div class="modify-user">
            <button class="btn btn-primary">Modifier le profil</button>
            <button class="btn btn-danger">Supprimer le profil</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bubble from '../components/Bubble.vue'

export default {
  name: 'Account',
  components: {
    'bubble': Bubble,
  }
}
</script>



<style lang="scss" scoped>
  .card {
    width: 100%;
    margin: 100px auto 0 auto;    
    
  }

  .member {
    &-card {
        max-width: 800px;
        // height: 800px;
        margin: auto;
    }
    &-photo {
      position: relative;
      top: -20px;
      z-index: 1;
      margin: auto;
      width: 100%;
      clip-path: circle();
    }
  }
  .email {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    i {
        // width: 10%;
        font-size: 1.4em;
    }
    h3 {
        font-size: 1.4em;
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