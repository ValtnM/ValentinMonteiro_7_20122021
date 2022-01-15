<template>
  <div>
      <div class="card" v-if="comment">
        <div class="card-header comment-header" v-if="comment.User">
            <bubble class="user-photo" :photo="comment.User.photo" :userId="comment.User.id"></bubble>
            <div class="comment-header__informations">
                <div class="comment-header__informations__user">
                    <h5>{{comment.User.firstname}} {{ comment.User.lastname }}</h5>
                    <p>Publié le {{ getDate(comment.createdAt) }}</p>
                </div>
                <p>{{ comment.text }}</p>
            </div>
            <button class="btn btn-danger delete-button" v-if="user.id == comment.User.id || isAdmin" @click.prevent="deleteComment">Supprimer</button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

import Bubble from './Bubble.vue';

export default {
    name: "Comment",
    data() {
        return {
            
        }
    },
    props: ['comment','comments', 'user', "isAdmin", "getAllPosts", "getUserPost"],
    components: {
        "bubble": Bubble
    },
    methods: {
        // Formatage de la date
         getDate(date){
            const newDate = date.slice(0,-8);
            const time = newDate.split('T')[1];
            const day = newDate.split('T')[0].split('-').reverse().join('-');
            return `${day} à ${time}`;
        },

        // Suppression du commentaire
        deleteComment(){
            const token = sessionStorage.getItem('token')
            const commentId = this.comment.id;

            axios.delete(`http://localhost:3000/api/posts/comment/${commentId}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .then(() => this.deleteToCommentList())
                .catch(err => console.log(err))
        },

        // Mise à jour de la variable 'comments' dans l'élément parent
        deleteToCommentList(){
            this.selectCommentToDelete()
            if(this.$route.params.id) {
                this.getUserPost()
            } else {
                this.getAllPosts()                
            }
        },

        // Suppression du post de la props 'comments'
        selectCommentToDelete(){
            for(let i = 0; i < this.comments.length; i++){
                if(this.comments[i].id == this.comment.id){
                    this.comments.splice(i, 1);
                }
            }
        },

    },
}
</script>

<style lang="scss" scoped>
    .card {
        margin: 10px 10px;
    }

    .comment-header {
        display: flex;
        align-items: center;

        .user-photo {
            height: 70px;
            width: 70px;
        }


        &__informations {
            width: 100%;
            margin-left: 20px;

            &__user {
                display: flex;
                justify-content: space-between;
            }

            h5 {
                font-size: 1.1em;
            }

            p {
                font-size: 0.8em;
                margin: 0;
            }
        }
    }

    .delete-button{
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 0.7em;
    }
</style>