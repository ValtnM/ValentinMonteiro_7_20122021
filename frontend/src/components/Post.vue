<template>
  <div class="card">
      <div class="card-header">
          <bubble class="member-photo"></bubble>
          <div class="post-details">
            <h2 class="post-author">{{post.user}}</h2>          
            <p class="post-date">Publiée le {{ post.date }} </p>
          </div>
      </div>
      <div class="card-body">
          <h3 class="post-title fs-3">{{ post.title }}</h3>
      </div>
      <img :src="post.image">
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
    }
}
</script>

<style lang="scss" scoped>
    .card {
        max-width: 800px!important;
        background: #fff;
        

        &-header {
            display: flex;
            align-items: center;
        }
        .member-photo {
            width: 15%;
            height: 100%;
            a {
                width: 100%;
                height: 100%;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }

        .post {
            
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

            &-title {
                font-size: 2em;
                margin-left: 30px;
            }

            &-footer {
                padding: 10px;
                display: flex;

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