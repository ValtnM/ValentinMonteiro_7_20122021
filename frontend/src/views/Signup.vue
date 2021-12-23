<template>
    <div>
        <navbar-home></navbar-home>
        <div class="p-3">
            <div class="card signup-card">
                <div class="row">
                    <div class="col-md-6">
                        <img class="card-img-left signup-img" src="../../public/img/icons/icon.svg" alt="">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h2 class="card-title signup-title">Inscription</h2>
                            <form>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control" type="text" id="email" placeholder="Entrez un email..." v-model="formResult.email">
                                </div>
                                <div class="form-group">
                                    <label for="password">Mot de passe</label>
                                    <input class="form-control" type="password" id="password" placeholder="Entrez un mot de passe..." v-model="formResult.password">
                                </div>
                                <div class="form-group">
                                    <label for="prenom">Prénom</label>
                                    <input class="form-control" type="text" id="prenom" placeholder="Entrez votre prénom..." v-model="formResult.firstname">
                                </div>                                
                                <div class="form-group">
                                    <label for="nom">Nom</label>
                                    <input class="form-control" type="text" id="nom" placeholder="Entrez votre nom..." v-model="formResult.lastname">
                                </div>
                                <div class="form-group">
                                    <label for="photo">Sélectionnez une photo de profil :</label><br>
                                    <input type="file" id="photo" @change="onFileSelected">
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
            formResult: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                photo: ''
            }
        }
    },
    components: {
        'navbar-home': NavbarHome
    },
    methods: {
        onFileSelected(event) {
            this.formResult.photo = event.target.files[0].name
        },
        createUser(){
            axios.post('http://localhost:3000/api/user/',this.formResult)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }
}
</script>

<style lang="scss" scoped>

    .signup {

        &-card {
            margin: 50px auto;
            max-width: 1200px;
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