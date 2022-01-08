<template>
    <div>
        <navbar-user></navbar-user>
        
        <div class="container-fluid p-4" >
            <div class="row">          
                <div class="col-lg-9 post-card">
                    <new-post :posts.sync="posts"></new-post>
                    <post v-for="(post, index) in posts" :key="index" :post="post" :user="user" :posts.sync="posts">{{post}}</post>
                </div>
                <div class="col-lg-3 user-card">
                    <member :user="user"></member>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

import NavbarUser from '../components/NavbarUser.vue'
import Member from '../components/Member.vue'
import Post from '../components/Post.vue'
import NewPost from '../components/NewPost.vue'


export default {
    name: 'PostList',
    data(){
        return {
            posts: [],
            user: {
                id: '',
                email: '',
                firstname: '',
                lastname: '',
                photo: ''
            },            
        }
    },
    components: {
        "navbar-user": NavbarUser,
        "member": Member,
        "post": Post,
        "new-post": NewPost
    },
    methods: {

        // Récupération de tous les posts
        getAllPosts(){
            const token = sessionStorage.getItem('token')
            if(!token) {
                this.redirection()
            }
           axios.get('http://localhost:3000/api/posts', {
               headers: {
                   'authorization': `Bearer ${token}`
               }
           })
            .then((res) => {
                console.log(res.data);
                this.posts = res.data
            })
                
            .catch(() => console.log('Impossible de récupérer les posts !'))
        },

        // Récupération des information de l'utilisateur connecté
        async getUser(){
            const userId = sessionStorage.getItem('userId');
            const token = sessionStorage.getItem('token')
            await axios.get(`http://localhost:3000/api/users/profile/${userId}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }).then((res) => {
                this.user.id = res.data.id;
                this.user.email = res.data.email;
                this.user.firstname = res.data.firstname;
                this.user.lastname = res.data.lastname;
                this.user.photo = res.data.photo;
            }).catch(err => console.log(err))
        },
        redirection(){
            this.$router.push({ name: 'login' })
        },

        
        
    },


    // Appel des fonctions lors de la création du composant    
    created(){
        this.getAllPosts()
        this.getUser()
    },
}
</script>

<style lang="scss">

    .user-card{
        .email {
            font-size: 100%;
            i{
                font-size: 80%;
            }
            h3 {
                font-size: 80%;
            }
        }
    }


    
</style>