<template>
  <div>
      <div class="card">
          <div class="card-body">
            <h2 class="card-title">Nouvelle publication</h2>
            <hr>
            <div class="alert alert-danger" role="alert" v-if="!title">
                Veuillez saisir un titre
            </div>
            <div class="alert alert-danger" role="alert" v-if="!content">
                Veuillez ajouter un texte ou une image
            </div>
            <form action="">
                <div class="form-group">
                    <label for="title">Titre :</label>
                    <input class="form-control undefined-field" type="text" id="title" placeholder="Saisissez un titre..." v-model="newPost.title">
                    <!-- <p v-if="!title">Veuillez saisir un titre</p> -->
                </div>
                <div class="form-group">
                    <label for="text">Texte :</label>
                    <textarea class="form-control" id="text" name="text" placeholder="Saisissez un texte..." v-model="newPost.text"></textarea>
                </div>
                <div class="form-group">
                    <label for="image">Ajoutez une image :</label><br>
                    <input type="file" id="image" @change="onFileSelected">
                </div>
                    <!-- <p v-if="!content">Veuillez ajouter un texte ou une image</p> -->

                <button class="btn btn-primary" @click.prevent="createPost">Publier</button>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "NewPost",
    data() {
        return {
            newPost: {
                title: '',
                text: '',
                image: ''
            },
            title: true,
            content: true
        }
    },
    methods: {
        onFileSelected(event) {
            this.formResult.image = event.target.files[0].name
        },
        createPost() {       
            this.title = true;
            this.content = true;     
            if(!this.newPost.title) {
                this.title = false;
            } else if (!this.newPost.text && !this.newPost.image) {
                this.content = false;
            } else {
                axios('http://localhost:3000/api/post/', this.newPost)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .card {
        margin: auto;

        form {
            margin-top: 15px;
        }
        
        label {
            font-size: 1.2em;
            font-weight: 500;
            margin-bottom: 5px;
        }

        .btn {
            margin: 10px 0;
        }
    }
    .form-group {
        margin-bottom: 15px;
    }

    // .undefined-field {
    //     background: red;
    //     color: white;
    //     font-weight: 600;
    // }
</style>