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
                    <button class="btn btn-primary" @click="getAllPosts">Afficher</button>
                    <post v-for="(post, index) in posts" :key="index" :post="post">{{post}}</post>
                </div>
                <div class="col-lg-3 user-card">
                    <member></member>
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
            posts: [] 
        }
    },
    components: {
        "navbar-user": NavbarUser,
        "member": Member,
        "post": Post,
        "new-post": NewPost
    },
    methods: {
        getAllPosts(){
            const token = sessionStorage.getItem('token')
           axios.get('http://localhost:3000/api/posts', {
               headers: {
                   'authorization': `Bearer ${token}`
               }
           })
            // .then(res => this.posts = res.data)
            .then((res) => {
                this.posts = res.data
                console.log(res.data);
            })
                
            .catch(() => console.log('Impossible de récupérer les posts !'))
        },
        
    },
    beforeMount(){
        this.getAllPosts()
    }
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