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
                        <input class="form-control" type="text" id="email" placeholder="Entrez votre email...">
                    </div>
                    <div class="form-group my-3">
                        <label for="password">Mot de passe</label>
                        <input class="form-control" type="text" id="password" placeholder="Entrez votre mot de passe...">
                    </div>
                    <button class="btn btn-success my-3">Se connecter</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarHome from '../components/NavbarHome.vue'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    components: {
        'navbar-home': NavbarHome
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
            width: 100%;
        }

        &-title {
            text-align: center;
            margin-bottom: 30px!important;
        }
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