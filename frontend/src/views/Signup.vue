<template>
    <div>
        <navbar-home></navbar-home>

        <div class="p-3">

            <div class="alert alert-success signup-message" role="alert" v-if="message == 'success'">
               
                    <i class="fas fa-check"></i>
                    <div>
                        Votre compte a été créé avec succès !
                    </div>
                    <router-link  class="nav-link" :to="{name: 'login'}"><button class="btn btn-success">Se connecter</button></router-link>
                    
            </div>
            <div class="alert alert-danger failure signup-message" role="alert" v-if="message !== 'success' && message != ''">
                
                <i class="fas fa-exclamation-triangle"></i>
                Échec lors de la création du compte ! | {{message}}
                
            </div>

            <div class="card signup-card">
                <div class="row">
                    <div class="col-md-6">
                        <img class="card-img-left signup-img" src="../../public/img/icons/icon.svg" alt="">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h2 class="card-title signup-title">Inscription</h2>
                            <form method="post">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control" type="text" id="email" placeholder="Entrez un email..." v-model="userInfos.email">
                                </div>
                                <div class="form-group">
                                    <label for="password">Mot de passe</label>
                                    <input class="form-control" type="password" id="password" placeholder="Entrez un mot de passe..."  autocomplete="off" v-model="userInfos.password">
                                </div>
                                <div class="form-group">
                                    <label for="prenom">Prénom</label>
                                    <input class="form-control" type="text" id="prenom" placeholder="Entrez votre prénom..." v-model="userInfos.firstname">
                                </div>                                
                                <div class="form-group">
                                    <label for="nom">Nom</label>
                                    <input class="form-control" type="text" id="nom" placeholder="Entrez votre nom..." v-model="userInfos.lastname">
                                </div>
                                <div class="form-group">
                                    <label for="photo">Sélectionnez une photo de profil :</label><br>
                                    <input type="file" id="image" name="image" @change="onFileSelected">
                                </div>
                                <button class="btn btn-danger my-3" @click.prevent="createUser">S'inscrire</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavbarHome from '../components/NavbarHome.vue'

export default {
    name: 'Login',
    data() {
        return {
            userInfos: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                photo: null
            },
            message: ''
        }
    },
    components: {
        'navbar-home': NavbarHome
    },
    methods: {

        // Récupération du fichier image
        onFileSelected(event) {
            this.userInfos.photo = event.target.files[0]
        },

        // Création d'un message de confirmation ou d'erreur
        signupMessage(message){
            this.message = message;
        },

        // Création d'un nouvel utilisateur
        createUser(){
            let formData = new FormData();
            formData.append('firstname', this.userInfos.firstname)
            formData.append('lastname', this.userInfos.lastname)
            formData.append('email', this.userInfos.email)
            formData.append('password', this.userInfos.password)
            formData.append('image', this.userInfos.photo)

            axios.post('http://localhost:3000/api/users/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    this.message = "";
                    this.signupMessage(res.data.message);
                })
                .catch((err) =>  console.log(err))
        }
    }
}
</script>

<style lang="scss" scoped>

    .signup {

        &-card {
            margin: 20px auto;
            max-width: 1200px;
        }

        &-message {
            max-width: 1200px;
            margin: auto;
            display: flex;
            align-items: center;

            i {
                font-size: 1.4em;
                margin-right: 20px;
            }
        }

        &-img{
            margin: auto;
        }

        &-title {
            text-align: center;
            margin-bottom: 30px!important;
        }
    }

    form {
        .form-group {
            margin: 10px 0;
        }
        button {
            width: 100%;
        }
    }

    @media screen and (max-width: 770px) {
        .signup {
            &-img {
                display: block;
                width: 50%;
                text-align: center;
            }
            &-message {
                .btn-success {
                    font-size: 0.9em;
                }
            }
        }
    }
    @media screen and (max-width: 550px) {
        .signup {
            &-card {
                width: 100%;
            }

            &-message {
                flex-direction: column;
                font-size: 0.7em;
                text-align: center;
            }
        }

        form {
        .form-group {
            label, input {
                font-size: 0.7em;
            }
            margin: 10px 0;
        }
        button {
            width: 100%;
        }
    }
    }

</style>