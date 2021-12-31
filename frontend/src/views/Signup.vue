<template>
    <div>
        <navbar-home></navbar-home>
        <div class="p-3">
            <div class="alert alert-success signup-message" role="alert" v-if="message === 'success'">
                <div>
                    <i class="fas fa-check"></i>
                    Votre compte a été créé avec succès !
                </div>
                <router-link  class="nav-link" :to="{name: 'login'}"><button class="btn btn-success">Se connecter</button></router-link>
            </div>
            <div class="alert alert-danger failure signup-message" role="alert" v-if="message === 'failure'">
                <div>
                    <i class="fas fa-exclamation-triangle"></i>
                    Échec lors de la création du compte !
                </div>
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
                                    <input class="form-control" type="password" id="password" placeholder="Entrez un mot de passe..." v-model="userInfos.password">
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
                                <!-- <button class="btn btn-danger my-3" type="submit">S'inscrire</button> -->
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
        onFileSelected(event) {
            this.userInfos.photo = event.target.files[0]
            console.log(event);
        },
        signupMessage(message){
            this.message = message;
        },
        createUser(){
            let formData = new FormData();
            formData.append('firstname', this.userInfos.firstname)
            formData.append('lastname', this.userInfos.lastname)
            formData.append('email', this.userInfos.email)
            formData.append('password', this.userInfos.password)
            formData.append('image', this.userInfos.photo)
            // this.$store.dispatch('createUser', {
            //     ...this.userInfos
            // }).then(() => this.signupMessage('success'))
            // .catch(() => this.signupMessage('failure'))


            axios.post('http://localhost:3000/api/users/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => this.signupMessage('success'))
                .catch(() => this.signupMessage('failure'))
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
            justify-content: space-between;

            i {
                font-size: 1.4em;
                margin-right: 20px;
            }
        }

        &-img{
            width: 100%;
            margin: auto;
        }

        &-title {
            text-align: center;
            margin-bottom: 30px!important;
        }
    }

     signup-message

    form {
        .form-group {
            margin: 10px 0;
        }
        button {
            width: 100%;
        }
    }

    @media screen and (max-width: 550px) {
        .card {
            width: 90%;
        }
    }
</style>