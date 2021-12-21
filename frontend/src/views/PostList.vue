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
        <div class="container-fluid">
            <div class="row">          
                <div class="col-lg-9 post-card">
                    <post v-for="(post, index) in $store.state.posts" :key="index" :post="post">{{post}}</post>
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
import NavbarUser from '../components/NavbarUser.vue'
import Member from '../components/Member.vue'
import Post from '../components/Post.vue'

export default {
    name: 'Post',
    data(){
        return {
                
        }
    },
    components: {
        "navbar-user": NavbarUser,
        "member": Member,
        "post": Post
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