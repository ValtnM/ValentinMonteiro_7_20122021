<template>
  <div class="container-confirmation">
      <div class="message">
        <i class="fas fa-exclamation-triangle message__icon"></i>
        <p class="message__text">La suppression de votre compte supprimera également toutes vos publications.<br> Êtes-vous sûr de vouloir continuer ?</p>
        <div class="message__button">
            <button class="btn btn-danger" @click="deleteUser">Supprimer</button>
            <button class="btn btn-primary" @click="hideConfirmation">Annuler</button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Confirmation",
    methods: {

        // Suppression de l'utilisateur
        deleteUser(){
        const userId = this.$route.params.id;
        const token = sessionStorage.getItem('token');

        axios.delete(`http://localhost:3000/api/users/profile/${userId}`, {
            headers: {
            'authorization': `Bearer ${token}`
            }
        })
            .then(() => this.disconnect())
            .catch(err => console.log(err))
        },

        // Deconnexion
        disconnect(){
            sessionStorage.removeItem('userId')
            sessionStorage.removeItem('token')
            this.$router.push({ name: 'login' })
        },

        // Emission de l'évènement "hideConfirmation"
        hideConfirmation(){
            this.$emit("hideConfirmation", false);
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-confirmation{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.5);

        .message {
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            max-width: 500px;
            padding: 40px;
            background: #fff;
            border-radius: 30px;

            &__icon{
                display: block;
                font-size: 4em;
                text-align: center;
                margin-bottom: 20px;
                color: red;
            }

            &__text {
                font-size: 1.1em;
                font-weight: 500;
            }

            &__button {
                width: 100%;
                display: flex;
                justify-content: space-around;
                margin-top: 20px;

                .btn-danger, .btn-primary {
                    width: 45%;
                    font-weight: 500;
                }
            }
        }
    }
</style>