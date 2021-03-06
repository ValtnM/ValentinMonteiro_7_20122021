import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import PostList from '../views/PostList.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name: 'home',
    component: Home
  },
  {
    path:'/login',
    name: 'login',
    component: Login
  },
  {
  path:'/signup',
    name: 'signup',
    component: Signup
  },
  {
  path:'/posts',
    name: 'posts',
    component: PostList
  },
  {
  path:'/profile/:id',
    name: 'profile',
    component: Profile,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
