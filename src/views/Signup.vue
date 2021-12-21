<template>
    <div>
        <navbar-home></navbar-home>
        <div class="card">
            <img class="card-img-top" src="../../public/img/icons/icon.svg" alt="">
            <div class="card-body p-4">
                <h2 class="card-title">Inscription</h2>
                <form>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input class="form-control" type="text" id="email" placeholder="Entrez un email...">
                    </div>
                    <div class="form-group my-3">
                        <label for="password">Mot de passe</label>
                        <input class="form-control" type="text" id="password" placeholder="Entrez un mot de passe...">
                    </div>
                    <button class="btn btn-danger my-3">S'inscrire</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarHome from '../components/NavbarHome.vue'

export default {
    name: 'Login',
    components: {
        'navbar-home': NavbarHome
    }
}
</script>

<style lang="scss">
    .card {
        margin: 50px auto;
        max-width: 400px;
        &-img-top{
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