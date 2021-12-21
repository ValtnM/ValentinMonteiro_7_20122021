<template>
    <div>
        <navbar-user></navbar-user>
        <div class="container">
            <div class="row">          
                <div class="col-10 carre">
                    <post v-for="(item, index) in post" :key="index">{{item}}</post>
                </div>
                <div class="col-2">
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

<style>
    .carre {
        background: lightgrey;
    }
</style>