import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostList from '../views/PostList.vue'
import PostDetail from '../views/PostDetail.vue'
import PostCreate from '../views/PostCreate.vue'
import PostEdit from '../views/PostEdit.vue'
import UserProfile from '../views/UserProfile.vue'
import AdminPanel from '../views/AdminPanel.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreate
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail,
    props: true
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEdit,
    props: true
  },
  {
    path: '/users/:id',
    name: 'UserProfile',
    component: UserProfile,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
