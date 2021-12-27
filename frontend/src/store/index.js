import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: [
    //   {
    //     firstname: 'John',
    //     lastname: 'Doe',
    //     email: 'john.doe@gmail.com',
    //     photo: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg'
    //   }
    // ],
    // posts: [
    //   {
    //     id:1,
    //     user: "Marie",
    //     title: "Mon premier post",
    //     image: "https://cdn.pixabay.com/photo/2021/11/13/21/28/bird-6792420_960_720.jpg",
    //     date: '13-12-2021'
    //   },
    //   {
    //     id:2,
    //     user: "John",
    //     title: "Mon deuxième post",
    //     image: "https://cdn.pixabay.com/photo/2021/11/13/21/28/bird-6792420_960_720.jpg"
    //   },
    //   {
    //     id:3,
    //     user: "Jacques",
    //     title: "Mon troisième post",
    //     image: "https://cdn.pixabay.com/photo/2021/11/13/21/28/bird-6792420_960_720.jpg"
    //   },
    //   {
    //     id:4,
    //     user: "Pierre",
    //     title: "Mon quatrième post",
    //     image: "https://cdn.pixabay.com/photo/2021/11/13/21/28/bird-6792420_960_720.jpg"
    //   },
    // ]
    userId: null,
    token: null
  },
  mutations: {
  },
  actions: {
    createUser({commit}, userInfos) {
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/users/signup', userInfos)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login({commit}, userInfos) {
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/users/login', userInfos)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    createPost(){

    }
  },
  modules: {
  }
})
