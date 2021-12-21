import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@gmail.com',
        photo: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg'
      }
    ],
    posts: [
      {
        id:1,
        user: "Jean",
        title: "Mon premier post",
        image: "https://cdn.pixabay.com/photo/2021/11/13/21/28/bird-6792420_960_720.jpg"
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
