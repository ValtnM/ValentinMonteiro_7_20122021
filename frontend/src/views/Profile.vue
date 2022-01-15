<template>
  <div class="profile-container">
    <navbar-user></navbar-user>
    <member :user.sync="user" :isAdmin="authUser.isAdmin" :posts.sync="posts" @showConfirmation="showConfirmationMessage($event)"></member>
    <div>
      <post class="post" v-for="(post, index) in posts" :key="index" :post="post" :user="authUser" :posts.sync="posts" :isAdmin="authUser.isAdmin">{{ post }}</post>
    </div>
    <confirmation v-if="confirmationMessage" @hideConfirmation="hideConfirmationMessage($event)"></confirmation>
  </div>
</template>

<script>
import axios from 'axios';

import NavbarUser from '../components/NavbarUser.vue'
import Member from '../components/Member.vue'
import Post from '../components/Post.vue'
import Confirmation from '../components/Confirmation.vue'

export default {
  name: 'Profile',
  data(){
    return {
      user: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        photo: '',        
      },
      authUser: {
        id: "",
        isAdmin: false,
      },
      posts: [],
      postsDisplay: false,
      confirmationMessage: false
    } 
  },
  components: {
    'navbar-user': NavbarUser,
    'member': Member,
    'post': Post,
    'confirmation': Confirmation
  },  
  methods: {
    // Récupération des information de l'utilisateur connecté
    getAuthentifiedUser(){
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token')
        axios.get(`http://localhost:3000/api/users/profile/${userId}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then((res) => {
            this.authUser.id = res.data.id;
            this.authUser.isAdmin = res.data.isAdmin;
        }).catch(err => console.log(err))
    },
       

    // Récupération des informations de l'utilisateur
    getUser(){
      const userId = this.$route.params.id;
      const token = sessionStorage.getItem('token');
      axios.get(`http://localhost:3000/api/users/profile/${userId}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }).then(res => {
        this.user.id = res.data.id;
        this.user.firstname = res.data.firstname;
        this.user.lastname = res.data.lastname;
        this.user.email = res.data.email;
        this.user.photo = res.data.photo;
      }).catch(err => console.log(err))
    },

    // Récupération des posts de l'utilisateur
    getUserPost(){
      const userId = this.$route.params.id;
      const token = sessionStorage.getItem('token');
      axios.get(`http://localhost:3000/api/posts/${userId}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }).then(res => {
        this.posts = res.data
      }).catch(err => {
        console.log(err);
      })
    },
   
    // Afficher le message de confirmation
    showConfirmationMessage(value){
      this.confirmationMessage = value;
    },

    // Masquer le message de confirmation
    hideConfirmationMessage(value){
      this.confirmationMessage = value;
    }
  },

  // Appel des fonction lors de la création du composant
  created(){
    this.getUser();
    this.getAuthentifiedUser();
    this.getUserPost();
  }
}
</script>



<style lang="scss" scoped>
  .profile-container {
    min-height: 1000px;
  }

  .post{
    max-width: 1000px;
  }

  .display-posts {
    max-width: 800px;
    margin: 40px auto 30px auto;

    .btn {
      width: 100%;
      margin: auto;
      text-align: center;
    }
  }

  @media screen and (max-width: 770px) {
    // .profile-container {
    //   padding: 10px;
    // }
  }
</style>