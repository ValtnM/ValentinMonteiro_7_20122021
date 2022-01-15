<template>
  <div>
    <div class="member-card">
      <div class="card">
        <bubble class="member-photo" :photo="user.photo" :userId="user.id"></bubble>
        <div class="card-body">
          <h2 class="card-title">{{user.firstname}} {{ user.lastname }}</h2>
          <div class="email">
            <i class="fas fa-at"></i>
            <h3>{{ user.email }}</h3>
          </div>
          <div class="modify-user" v-if="(userId == profileId || isAdmin) && !updateMode">
            <button class="btn btn-primary" @click="toggleUpdateMode" >Modifier le profil</button>
            <button class="btn btn-danger" @click="showConfirmation">Supprimer le profil</button>
          </div>
          <div class="updateForm" v-if="updateMode">
            <div class="card-body">
              <form method="post">
                  <div class="form-group">
                      <label for="email">Email</label>
                      <input class="form-control" type="text" id="email" placeholder="Entrez votre adresse email..." :value="this.user.email">
                  </div>
                  <!-- <div class="form-group">
                      <label for="password">Mot de passe</label>
                      <input class="form-control" type="password" id="password" placeholder="Entrez un nouveau mot de passe..." v-model="userUpdated.password">
                  </div> -->
                  <div class="form-group">
                      <label for="prenom">Prénom</label>
                      <input class="form-control" type="text" id="prenom" placeholder="Entrez votre prénom..." :value="this.user.firstname">
                  </div>                                
                  <div class="form-group">
                      <label for="nom">Nom</label>
                      <input class="form-control" type="text" id="nom" placeholder="Entrez votre nom..." :value="this.user.lastname">
                  </div>
                  <div class="form-group">
                      <label for="photo">Sélectionnez une photo de profil :</label><br>
                      <input type="file" id="image" name="image" @change="onFileSelected">
                  </div>
                  <button class="btn btn-primary my-3" @click.prevent="updateUser">Mettre à jour</button>
                  <button class="btn btn-danger" @click="toggleUpdateMode">Annuler</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Bubble from '../components/Bubble.vue';

export default {
  name: 'Member',
  props: ['user','isAdmin', 'posts'],
  data(){
    return {
      userId: '',
      profileId: '',
      userUpdated: {
        email: this.user.email,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        photo: null
      },
      updateMode: false
    }
  },
  components: {
    'bubble': Bubble,
  },
  methods: {
    // Récupération du fichier image uploadé
    onFileSelected(event) {
      this.userUpdated.photo = event.target.files[0]
    },

    // Récupération de l'ID de l'utilisateur authentifié et de l'ID présent dans l'URL
    getId(){
      this.userId = sessionStorage.getItem('userId');
      this.profileId = this.$route.params.id
    },

    // Activation et désactivation de l'update mode
    toggleUpdateMode(){
      this.updateMode = !this.updateMode;
    },

    // Récupération des infos saisies par l'utilisateur
    getUserInfo(){
      this.userUpdated.email = document.querySelector('#email').value;
      this.userUpdated.firstname = document.querySelector('#prenom').value;
      this.userUpdated.lastname = document.querySelector('#nom').value;
    },

    // Envoi du formulaire de modification
    updateUser(){
      this.$emit('hidePosts', false)
      const token = sessionStorage.getItem('token');
      this.getUserInfo()
      let formData = new FormData();
      formData.append('firstname', this.userUpdated.firstname)
      formData.append('lastname', this.userUpdated.lastname)
      formData.append('email', this.userUpdated.email)
      formData.append('image', this.userUpdated.photo)
      
      axios.put(`http://localhost:3000/api/users/profile/${this.userId}`, formData, {
          headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
      })
          .then((res) => {
            this.user.email = res.data.email
            this.user.firstname = res.data.firstname
            this.user.lastname = res.data.lastname
            this.user.photo = res.data.photo
            this.updateMode = false;
            this.getUpdatePostsInfo(res.data)
            this.getUserPost();
          })
          .catch((err) => console.log(err))
    },

    // Récupération des posts d'un utilisateur
    getUserPost(){
        const userId = this.$route.params.id;
        const token = sessionStorage.getItem('token');
        axios.get(`http://localhost:3000/api/posts/${userId}`, {
            headers: {
            'authorization': `Bearer ${token}`
            }
        }).then(res => {
            this.$emit('update:posts', res.data)
        }).catch(err => {
            console.log(err);
        })
    },

    // Mise à jour des informations User
    getUpdatePostsInfo(value){
      for(let i = 0; i < this.posts.length; i++){
        this.posts[i].User.id = value.id;
        this.posts[i].User.firstname = value.firstname;
        this.posts[i].User.lastname = value.lastname;
        this.posts[i].User.photo = value.photo;
        this.posts[i].Comment
      }
    },

    // Affichage de la fenêtre de confirmation de suppression de compte
    showConfirmation(){
      this.$emit('showConfirmation', true)
    }
  },

  // Appel de la fonction lors de la création du composant
  created(){
    this.getId();
  },
}
</script>



<style lang="scss" scoped>
  .card {
    width: 100%;
    margin: 100px auto 0 auto;   
    &-title {
      text-align: center;
    }     
  }

  .member {
    &-card {
        max-width: 800px;
        // height: 800px;
        margin: auto;
    }
    &-photo {
      position: relative;
      top: -20px;
      z-index: 1;
      margin: auto;
      width: 300px;
      height: 300px;
      clip-path: circle();
    }
  }

  .email {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    i {
        font-size: 1.4em;
    }
    h3 {
        font-size: 1.4em;
        margin: auto 0 auto 10px;
    }
  }

  .modify-user {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .btn {
      margin-top: 15px;
    }
  }

  
</style>