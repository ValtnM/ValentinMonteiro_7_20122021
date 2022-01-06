<template>
  <div>
    <navbar-user></navbar-user>
    <member :user="user"></member>
    <post class="post" v-for="(post, index) in posts" :key="index" :post="post">{{ post }}</post>
  </div>
</template>

<script>
import axios from 'axios';

import NavbarUser from '../components/NavbarUser.vue'
import Member from '../components/Member.vue'
import Post from '../components/Post.vue'

export default {
  name: 'Profile',
  data(){
    return {
      user: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        photo: ''
      },
      posts: []
    } 
  },
  components: {
    'navbar-user': NavbarUser,
    'member': Member,
    'post': Post
  },  
  methods: {

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
        // console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    }
  },

  // Appel des fonction lors de la création du composant
  created(){
    this.getUser()
    this.getUserPost()
  },
  updated(){
    this.getUser()
  }
}
</script>



<style lang="scss" scoped>
  .post{
    max-width: 1000px;
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