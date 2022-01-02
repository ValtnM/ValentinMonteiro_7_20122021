<template>
    <div>
        <navbar-user></navbar-user>
        <!-- <div class="container">
            <div class="row">
                <div class="col">
                    <post v-for="(post, index) in $store.state.posts" :key="index" :post="post">{{post}}</post>
                </div>
            </div>
        </div> -->
        <div class="container-fluid p-4" >
            <div class="row">          
                <div class="col-lg-9 post-card">
                    <new-post></new-post>
                    <post v-for="(post, index) in posts" :key="index" :post="post">{{post}}</post>
                </div>
                <div class="col-lg-3 user-card">
                    <member :user="user"></member>
                </div>
            </div>
            <!-- <img :src="{{ photo }}" :alt="Photo de {{ name }}"> -->
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
            }
        }
    },
    components: {
        "navbar-user": NavbarUser,
        "member": Member,
        "post": Post,
        "new-post": NewPost
    },
    methods: {
        async getAllPosts(){
            const token = sessionStorage.getItem('token')
           axios.get('http://localhost:3000/api/posts', {
               headers: {
                   'authorization': `Bearer ${token}`
               }
           })
            // .then(res => this.posts = res.data)
            .then((res) => {
                this.posts = res.data
            })
                
            .catch(() => console.log('Impossible de récupérer les posts !'))
        },
        async getUser(){
            const userId = sessionStorage.getItem('userId');
            const token = sessionStorage.getItem('token')
            axios.get(`http://localhost:3000/api/users/profile/${userId}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }).then(res => {
                this.user.id = res.data.id;
                this.user.email = res.data.email;
                this.user.firstname = res.data.firstname;
                this.user.lastname = res.data.lastname;
                this.user.photo = res.data.photo;
            }).catch(err => console.log(err))
        }
        
    },
    async created(){
        await this.getAllPosts()
        await this.getUser()
    },
    // beforeUpdate(){
    //     this.getAllPosts()
    // }
}
</script>

<style lang="scss">

    // .post-card {
    //     .post-title {
    //         font-size: 60%!important;
    //     }
    // }
         
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