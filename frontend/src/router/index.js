import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/signin',
        name: 'Signin',
        meta: { guess: true },
        component: () => import('../views/Signin.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        meta: { guess: true },
        component: () => import('../views/Signup.vue')
    },
    {
        path: '/posts',
        name: 'Posts',
        // meta: { guess: true },
        component: () => import('../views/Posts.vue')
    },
    {
        path: '/post/:postId',
        name: 'PostDetail',
        // meta: { guess: true },
        component: () => import('../views/PostDetail.vue')
    },
    {
        path: '/create-post',
        name: 'CreatePost',
        meta: { login: true },
        component: () => import('../views/CreatePost.vue')
    },
    {
        path: '/my-account',
        name: 'Account',
        meta: { login: true },
        component: () => import('../views/Account.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token')
    // const isLoggedIn = localStorage.getItem('token')

    if (to.meta.login && !isLoggedIn) {
        Swal.fire({
            title: "โปรดลงชื่อเข้าสู่ระบบ",
            icon: "warning",
            showConfirmButton: true,
        });
        next({ path: "/signin" });
        return;
    }
    if (to.meta.guess && isLoggedIn) {
        next({ path: "/" });
        return;
    }
    next();
})

export default router
