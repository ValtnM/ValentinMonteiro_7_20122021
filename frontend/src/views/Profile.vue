<template>
  <div class="profile-container">
    <navbar-user></navbar-user>
    <member :user="user" :isAdmin="authUser.isAdmin" :postsDisplay="postsDisplay" @hidePosts="hidePostList($event)" @showConfirmation="showConfirmationMessage($event)"></member>
    <div class="display-posts">
      <button class="btn btn-success" @click.prevent="showPosts" v-if="!postsDisplay">Afficher les publications de {{ user.firstname }}</button>
      <button class="btn btn-success" @click.prevent="showPosts" v-if="postsDisplay">Masquer les publications de {{ user.firstname }}</button>
    </div>
    <div v-if="postsDisplay">
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

    // Afficher la liste des posts
    showPosts(){
      this.getUserPost()
      this.postsDisplay = !this.postsDisplay;
    },

    // Masquer la liste des posts
    hidePostList(value) {
      this.postsDisplay = value;
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

  // .card {
  //   margin: 0 auto 50px auto;    
  //   &-body {
  //     padding-top: 175px;
  //   }
  // }

  // .user {
  //   &-photo {
  //     position: relative;
  //     top: 150px;
  //     z-index: 1;
  //     margin: auto;
  //     width: 300px;
  //     height: 300px;
  //   }
  // }
  // .email {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   i {
  //     font-size: 1.4em;
  //   }
  //   h3 {
  //     margin: auto 0 auto 10px;
  //   }
  // }
  // .modify-user {
  //   display: flex;
  //   flex-direction: column;
  //   margin-top: 20px;
  //   .btn {
  //     margin-top: 15px;
  //   }
  // }
</style>