import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Post from './views/Post.vue'
import Article from './views/Article.vue'
import Beranda from './views/Beranda.vue'
import Auth from './views/Auth.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path:'/:id/article',
          name : 'article',
          component : Article
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component : Auth
    },{
      path:'/post',
      name : 'post',
      component : Post
    }
  ]
})
