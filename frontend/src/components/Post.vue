<template>    
    <div class="card">
        <div class="card-header post-header">
            <bubble class="member-photo" :photo="post.User.photo" :userId="post.User.id"></bubble>
            <div class="post-details">
                <h4 class="post-author">{{post.User.firstname}} {{post.User.lastname}}</h4>          
                <p class="post-date">Publiée le {{ getDate(post.createdAt) }} </p>
            </div>
        </div>
        <div class="post-modifier" v-if="updateMode">
            <div class="alert alert-danger" role="alert" v-if="!content">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Veuillez ajouter un texte ou une image
            </div>
            <form>
                <div class="form-group">
                    <label class="pe-2">Mofifier le contenu :</label><br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="text-post" checked value="text" v-model="contentType">
                        <label class="form-check-label" for="text-post">Texte</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="img-post" value="img" v-model="contentType">
                        <label class="form-check-label" for="img-post">Image</label>
                    </div>
                </div>
                <div class="form-group" v-if="contentType === 'text'">
                    <label for="text">Texte :</label>
                    <textarea class="form-control" id="text" name="text" placeholder="Saisissez un texte..." v-model="textContent"></textarea>
                </div>
                <div class="form-group" v-if="contentType === 'img'">
                    <label for="image">Ajoutez une image :</label><br>
                    <input type="file" id="image" name="image" @change="onFileSelected">
                </div>
                <div class="post-modifier__form-buttons">
                    <button class="btn btn-primary" @click.prevent="updatePost">Publier</button>
                    <button class="btn btn-danger" @click.prevent="updateMode = false">Annuler</button>
                </div>
            </form>
        </div>
        <div class="card-body post-body">
            <h3 class="fs-3" v-if="post.textContent">{{ post.textContent }}</h3>
            <img :src="post.imageContent" v-if="post.imageContent">
        </div>
        <div class="post-footer">
            <div class="post-footer__like">
                <button class="btn btn-primary" :class="{ liked: alreadyLiked }" @click.prevent="addLike">
                    <div><i class="fas fa-thumbs-up like"></i>{{ post.like }}</div>
                </button>
            </div>
            <div class="post-footer__comment">
                <h5>Commentaires :</h5>
                <form>
                    <div class="form-group">
                        <textarea class="form-control" id="comment" name="comment" placeholder="Saisissez un commentaire..." v-model="textComment"></textarea>
                    </div>
                    <button class="btn btn-primary" @click.prevent="createComment">Publier</button>
                </form>
                <comment class="comment-card" v-for="(comment, index) in comments" :key="index" :comment="comment" :comments.sync="comments" :user="user"></comment>
            </div>
            <!-- <button class="btn btn-danger">
                <div><i class="fas fa-thumbs-down dislike"></i>{{ dislike }}</div>
            </button> -->
            <!-- <div><i class="fas fa-comment-dots comment"></i></div> -->
        </div>
        <div class="post-button" v-if="user.id == this.post.userId">
            <button class="btn btn-primary" @click="updateMode = true">Modifier</button>
            <button class="btn btn-danger" @click="deletePost">Supprimer</button>
        </div>
    </div>    
</template>

<script>
import axios from 'axios'

import Bubble from './Bubble.vue'
import Comment from './Comment.vue'

export default {
    name: 'Post',
    data(){
        return {
            postButtons: null,
            updateMode: false,
            contentType: 'text',
            content: true,
            textContent: this.post.textContent,
            imageContent: null,
            alreadyLiked: false,
            textComment: "",
            comments: []
        }
    },
    props: ['post', 'user', 'posts'],
    components: {
        'bubble': Bubble,
        'comment': Comment
    },
    methods: {

        // Récupération du fichier image uploadé
        onFileSelected(event) {
            this.imageContent = event.target.files[0];
        },

        // Mise à jour du post
        updatePost() {    
            const token = sessionStorage.getItem('token');
            const postId = this.post.id;
            this.content = true;    
            
            // Aucun contenu ajouté
            if(!this.textContent && !this.imageContent){
                this.content = false;

            // Post avec du texte
            } else if(this.contentType === "text"){
                this.imageContent = null;
                if(!this.textContent){
                    this.content = false;
                } else {
                    const postText = { textContent: this.textContent }
                    axios.put(`http://localhost:3000/api/posts/${postId}`, postText, {
                        headers: {
                            'authorization': `Bearer ${token}`,
                        }
                    })
                        .then(() => {
                            this.updateMode = false;
                            this.getAllPosts();
                        })
                        .catch(() => console.log('Ceci est une erreur'));
                }

            // Post avec une image
            } else if(this.contentType === "img") {
                this.textContent = "";
                if (!this.imageContent){
                    this.content = false;
                } else {
                    let formData = new FormData();
                    formData.append('image', this.imageContent)
                    axios.put(`http://localhost:3000/api/posts/${postId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'authorization': `Bearer ${token}`,
                        }
                    })
                        .then(() => {
                            this.updateMode = false;
                            this.getAllPosts();
                        })
                        .catch((err) => console.log(err));
                }
            }            
        },


        // Formatage de la date de création de post
        getDate(date){
            const newDate = date.slice(0,-8);
            const time = newDate.split('T')[1];
            const day = newDate.split('T')[0].split('-').reverse().join('-');
            return `${day} à ${time}`;
        },

        // Suppression de la publication
        deletePost(){
            const postId = this.post.id;
            const token = sessionStorage.getItem('token');

            axios.delete(`http://localhost:3000/api/posts/${postId}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .then(() => this.deleteToPostList())
                .catch(err => console.log(err))
        },

        // Mise à jour de la variable 'posts' dans l'élément parent
        deleteToPostList(){
            this.selectPostToDelete()
            this.$emit('update:posts', this.posts)
        },

        // Suppression du post de la props 'posts'
        selectPostToDelete(){
            for(let i = 0; i < this.posts.length; i++){
                if(this.posts[i].id == this.post.id){
                    this.posts.splice(i, 1);
                }
            }
        },

        // Ajoût et suppression des likes
        addLike(){
            const token = sessionStorage.getItem('token');
            
            axios.post(`http://localhost:3000/api/posts/${this.post.id}/like`, {like: this.post.like}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    this.post.like = res.data.like;
                    this.checkLike();
                })
                .catch(err => console.log(err))
        },

        // Vérification des like du post
        checkLike(){
            const token = sessionStorage.getItem('token');

            axios.get(`http://localhost:3000/api/posts/${this.post.id}/like`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .then(res => this.alreadyLiked = res.data.message)
                .catch(err => console.log(err))
        },

        // Création d'un commentaire
        createComment(){
            const token = sessionStorage.getItem('token');
            const text = this.textComment;

            axios.post(`http://localhost:3000/api/posts/${this.post.id}/comment`, { text: text }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    this.comments.push(res.data);
                    this.getComments();
                    this.textComment = "";
                })
                .catch(err => console.log(err))
        },


        // Récupération des commentaires
        getComments(){
            const token = sessionStorage.getItem('token');

            axios.get(`http://localhost:3000/api/posts/${this.post.id}/comment`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .then(res => this.comments = res.data)
                .catch(err => console.log(err))
        },


        // Récupération des posts
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
                .then(res => this.$emit('update:posts', res.data))                
                .catch(() => console.log('Impossible de récupérer les posts !'))
        },

    },
    created(){
        this.checkLike()
        this.getComments()
    }
}
</script>

<style lang="scss" scoped>
    .card {
        background: #fff;
        // background: #FCFFF4;
        
        margin: 50px auto 0 auto;        

        &-header {
            display: flex;
            align-items: center;
        }
        .member-photo {
            width: 100px;
            height: 100px;
            margin-right: 25px;
            a {
                width: 100%;
                height: 100%;
            }
        }

        .post {

            &-header {
                // background: #FFE9E9;
                background: #fff;
                border-bottom: none;
            }
            
            &-details {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
            }

            &-author {
                margin: auto 0;
            }

            &-date {
                margin: auto 0;
            }

            &-modifier {
                padding: 30px;

                &__form-buttons {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 20px;

                    .btn {
                        width: 40%;
                    }
                }
            }

            &-body {
                padding: 0;

                h3 {
                    padding: 20px;
                }

                img {
                    width: 100%;
                }
            }

            &-footer {
                padding: 10px;
                display: flex;
                flex-direction: column;
                background: #FFF;

                .liked {
                    background: green!important;
                }                
                i {
                    margin-right: 10px;                
                }
                .like {
                    color: white;
                }

                &__comment {

                    border-top: thick double rgba(0,0,0,.125);
                    margin-top: 10px;
                    padding: 10px;

                    form {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;

                        .form-group {
                            width: 100%;
                            margin-right: 10px;
                        }

                        .btn {
                            width: 100px;
                        }
                    }

                }
            }

            &-button {
                position: absolute;
                top: 20px;
                right: 20px;

                .btn {
                    margin-left: 10px;
                }
            }
        }


    }


</style>