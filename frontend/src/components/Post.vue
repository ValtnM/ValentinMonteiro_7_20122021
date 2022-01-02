<template>
  <div class="card">
      <div class="card-header post-header">
          <bubble class="member-photo" :photo="post.User.photo" :userId="post.User.id"></bubble>
          <div class="post-details">
            <h4 class="post-author">{{post.User.firstname}} {{post.User.lastname}}</h4>          
            <p class="post-date">Publiée le {{ getDate(post.createdAt) }} </p>
          </div>
      </div>
      <div class="card-body post-body">
        <h3 class="fs-3" v-if="post.textContent">{{ post.textContent }}</h3>
        <img :src="post.imageContent" v-if="post.imageContent">
      </div>
      <div class="post-footer">
          <div><i class="fas fa-thumbs-up like"></i></div>
          <div><i class="fas fa-thumbs-down dislike"></i></div>
          <div><i class="fas fa-comment-dots comment"></i></div>
      </div>
  </div>
</template>

<script>
import Bubble from './Bubble.vue'

export default {
    name: 'Post',
    data(){
        return {
           
        }
    },
    props: ['post'],
    components: {
        'bubble': Bubble
    },
    methods: {

        // Formatage de la date de création de post
        getDate(date){
            const newDate = date.slice(0,-8);
            const time = newDate.split('T')[1];
            const day = newDate.split('T')[0].split('-').reverse().join('-');
            return `${day} à ${time}`
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        background: #fff;
        margin: 50px auto;        

        &-header {
            display: flex;
            align-items: center;
        }
        .member-photo {
            width: 100px;
            height: 100px;
            margin-right: 25px;
            a {
                width: 100%;
                height: 100%;
            }
        }

        .post {

            &-header {
                background: #FFE9E9;
            }
            
            &-details {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
            }

            &-author {
                margin: auto 0;
            }

            &-date {
                margin: auto 0;
            }

            &-body {
                padding: 0;

                h3 {
                    padding: 20px;
                }

                img {
                    width: 100%;
                }
            }

            &-footer {
                padding: 10px;
                display: flex;
                background: #FFE9E9;

                i {
                    margin: 0 10px;                
                }
                .like {
                    color: #5065FF;
                }
                .dislike {
                    color: #FF5050;
                }
            }
        }

    }


</style>