<template>
  <div>
      <div class="card">
          <div class="card-body">
            <h2 class="card-title">Nouvelle publication</h2>
            <hr>
            <div class="alert alert-danger" role="alert" v-if="!content">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Veuillez ajouter un texte ou une image
            </div>
            <form>
                <div class="form-group">
                    <label class="pe-2">Choisissez un contenu :</label><br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="text-post" checked value="text" v-model="contentType">
                        <label class="form-check-label" for="text-post">
                            Texte
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="img-post" value="img" v-model="contentType">
                        <label class="form-check-label" for="img-post">
                            Image
                        </label>
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
            textContent: "",
            imageContent: null,
            contentType: 'text',
            content: true
        }
    },
    methods: {
        onFileSelected(event) {
            this.imageContent = event.target.files[0]
        },
        createPost() {    
            const token = sessionStorage.getItem('token');
            this.content = true;    
            // if(this.contentType === "text"){
            //     this.newPost.imageContent = null;
            // } else {
            //     this.newPost.textContent = "";
            // }
            // if(!this.newPost.textContent && !this.newPost.imageContent) {
            //     this.content = false;
            // } else {
            //     console.log('OK');
            //     axios.post('http://localhost:3000/api/posts/new', this.newPost, {
            //         headers: {
            //             'authorization': `Bearer ${token}`,
            //             // 'Content-Type': 'multipart/form-data'
            //         }
            //     })
            //         .then(res => console.log(res))
            //         .catch(() => console.log('Ceci est une erreur'))
            // }

            if(!this.textContent && !this.imageContent){
                this.content = false;
            } else if(this.contentType === "text"){
                this.imageContent = null
                if(!this.textContent){
                    this.content = false;
                } else {
                    const postText = { textContent: this.textContent }
                    axios.post('http://localhost:3000/api/posts/new', postText, {
                        headers: {
                            'authorization': `Bearer ${token}`,
                        }
                    })
                        .then(res => console.log(res))
                        .catch(() => console.log('Ceci est une erreur'))
                }
            } else if(this.contentType === "img") {
                this.textContent = "";
                if (!this.imageContent){
                    this.content = false;
                } else {
                    let formData = new FormData();
                    formData.append('image', this.imageContent)
                    axios.post('http://localhost:3000/api/posts/new', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'authorization': `Bearer ${token}`,
                        }
                    })
                        .then(() => {
                            console.log('ok')
                        })
                        .catch((err) => console.log(err))
                }
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