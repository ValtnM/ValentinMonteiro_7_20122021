import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      photo: ''
    },
  },
  mutations: {
    async getUser(state){
      const userId = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('token');
      await axios.get(`http://localhost:3000/api/users/profile/${userId}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }).then(res => {
        console.log(res.data);
        state.currentUser.id = res.data.id;
        state.currentUser.firstname = res.data.firstname;
        state.currentUser.lastname = res.data.lastname;
        state.currentUser.email = res.data.email;
        state.currentUser.photo = res.data.photo;
        console.log(state.currentUser);
      }).catch(err => console.log(err))
    }, 
  },
  actions: {   
  },
  modules: {
  }
})
