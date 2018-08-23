import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Post from './views/Post.vue'
import Editor from './views/Editor.vue'
import Beranda from './views/Beranda.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Post
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },{
      path: '/beranda',
      name: 'beranda',
      component: Beranda,
      childern: [
        {
          path:'post',
          name : 'post',
          component : Post
        },
        {
          path:'editor',
          name : 'editor',
          component : Editor
        }
      ]
    }

  ]
})
