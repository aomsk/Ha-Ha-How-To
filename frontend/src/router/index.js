import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/signin',
        name: 'Signin',
        component: () => import('../views/Signin.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/Signup.vue')
    },
    {
        path: '/posts',
        name: 'Posts',
        component: () => import('../views/Posts.vue')
    },
    {
        path: '/post/:id',
        name: 'PostDetail',
        component: () => import('../views/PostDetail.vue')
    },
    {
        path: '/create-post',
        name: 'CreatePost',
        component: () => import('../views/CreatePost.vue')
    },
    {
        path: '/my-account',
        name: 'Account',
        component: () => import('../views/Account.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
