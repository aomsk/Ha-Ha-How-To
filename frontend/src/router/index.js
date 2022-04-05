import { createRouter, createWebHistory } from 'vue-router'

// function isAuthenticated() {
//     let cognitoUser = this.getCurrentUser()
//     if (cognitoUser != null) {
//         cognitoUser.getSession((err, session) => {
//         if (err) {
//             return (err, false)
//         }
//         return (session, true)
//         })
//     } else {
//         (null, false)
//     }
// }

// function requireAuth(to, from, next) {
//     isAuthenticated((err, loggedIn) => {
//         if (err) return next()
//         if (!loggedIn) {
//             next({
//                 path: '/signin',
//                 query: { redirect: to.fullPath }
//             })
//         } else {
//             next()
//         }
//     })
// }

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
        component: () => import('../views/Account.vue'),
        // beforeEnter: requireAuth
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
