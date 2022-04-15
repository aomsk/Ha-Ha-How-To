import { createStore } from 'vuex'

export default createStore({
    state: {
        email_user: '',
        id_user: ''
    },
    getters: {
        email:state=>state.email_user,
        userId:state=>state.id_user
    },
    mutations: {
        setEmail(state, email) {
            state.email_user = email
        },
        setUserID(state, userId) {
            state.id_user = userId
        }
    },
    actions: {
    },
    modules: {
    }
})
