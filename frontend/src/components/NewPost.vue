<template>
  <div>
      <div class="card">
          <div class="card-body">
            <h2 class="card-title">Nouvelle publication</h2>
            <hr>
            <!-- <div class="alert alert-danger" role="alert" v-if="!title">
                Veuillez saisir un titre
            </div>
            <div class="alert alert-danger" role="alert" v-if="!content">
                Veuillez ajouter un texte ou une image
            </div> -->
            <form action="">
                <div class="form-group">
                    <label class="pe-2">Choisissez un contenu :</label><br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="text-post" checked value="text" v-model="content">
                        <label class="form-check-label" for="text-post">
                            Texte
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="img-post" value="img" v-model="content">
                        <label class="form-check-label" for="img-post">
                            Image
                        </label>
                    </div>
                </div>
                <!-- <div class="form-group">
                    <label for="title">Titre :</label>
                    <input class="form-control undefined-field" type="text" id="title" placeholder="Saisissez un titre..." v-model="newPost.title">
                </div> -->
                <div class="form-group" v-if="content==='text'">
                    <label for="text">Texte :</label>
                    <textarea class="form-control" id="text" name="text" placeholder="Saisissez un texte..." v-model="newPost.text"></textarea>
                </div>
                <div class="form-group" v-if="content==='img'">
                    <label for="image">Ajoutez une image :</label><br>
                    <input type="file" id="image" @change="onFileSelected">
                </div>

                <button class="btn btn-primary" @click.prevent="createPost">Publier</button>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
    name: "NewPost",
    data() {
        return {
            newPost: {
                title: '',
                text: '',
                image: ''
            },
            // text: true
            // title: true,
            content: 'text'
        }
    },
    methods: {
        onFileSelected(event) {
            this.formResult.image = event.target.files[0].name
        },
        // createPost() {       
        //     this.title = true;
        //     this.content = true;     
        //     if(!this.newPost.title) {
        //         this.title = false;
        //     } else if (!this.newPost.text && !this.newPost.image) {
        //         this.content = false;
        //     } else {
        //         axios('http://localhost:3000/api/post/', this.newPost)
        //             .then(res => console.log(res))
        //             .catch(err => console.log(err))
        //     }
        // }
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