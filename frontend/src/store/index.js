import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    userId: null,
    email: null,
    firstname: null,
    lastname: null,
    photo: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg"
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
    
  },
  modules: {
  }
})
