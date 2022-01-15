<template>
    <div>
        <navbar-home></navbar-home>
        <div class="card login-card">
            <img class="card-img-top login-img" src="../../public/img/icons/icon.svg" alt="">
            <div class="card-body p-4">
                <h2 class="card-title login-title">Connexion</h2>
                <form>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input class="form-control" type="text" id="email" placeholder="Entrez votre email..." v-model="email">
                    </div>
                    <div class="form-group my-3">
                        <label for="password">Mot de passe</label>
                        <input class="form-control" type="password" id="password" placeholder="Entrez votre mot de passe..." v-model="password">
                    </div>
                    <div>Pas encore de compte ? <router-link class="nav-link sign-link" :to="{name: 'signup'}">S'inscrire</router-link></div>
                    <button class="btn btn-success my-3" @click.prevent="login">Se connecter</button>
                </form>
                <div class="alert alert-danger" v-if="loginFailure">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Email ou mot de passe incorrect
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
            email: '',
            password: '',
            loginFailure: false
        }
    },
    components: {
        'navbar-home': NavbarHome
    },
    methods: {

        // Connexion de l'utilisateur et stockage de l'ID et du token dans le session storage
        login(){            
            axios.post('http://localhost:3000/api/users/login', {
                email: this.email,
                password: this.password
            }) 
                .then((res) => {
                    sessionStorage.setItem('userId', parseInt(res.data.userId));
                    sessionStorage.setItem('token', res.data.token);
                    this.$router.push('/posts')
                })
                .catch((err) => {
                    console.log("erreur : " + err);
                    this.loginFailure = true;
                })
        }
    }
}
</script>

<style lang="scss">
    .login {
    
        &-card {
            margin: 50px auto;
            max-width: 400px;

        }
        
        &-img{
            max-height: 300px;
        }

        &-title {
            text-align: center;
            margin-bottom: 30px!important;
        }
    }    

    .sign-link {
        display: inline!important;
        padding-left: 0.5rem!important;
    }

    form button {
        width: 100%;
    }

    @media screen and (max-width: 550px) {
        .card {
            width: 90%;
        }
    }
</style>