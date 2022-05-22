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
        path: '/edit-post/:postId',
        name: 'EditPost',
        meta: { login: true },
        component: () => import('../views/EditPost.vue')
    },
    {
        path: '/my-account',
        name: 'Account',
        meta: { login: true },
        component: () => import('../views/Account.vue'),
    },
    {
        path: '/signup/confirm-code',
        name: 'ConfirmCode',
        meta: { guess: true },
        component: () => import('../components/ConfirmCode.vue'),
    },
    {
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: () => import('../views/NotFound.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        meta: { login: true },
        component: () => import('../views/Categories.vue'),
    },
    {
        path: '/edit-profile',
        name: 'EditProfile',
        meta: { login: true },
        component: () => import('../views/EditProfile.vue'),
    },
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
