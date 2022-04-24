import { createStore } from 'vuex'

export default createStore({
    state: {
        email_user: '',
        id_user: '',
        list_image: null,
        authen: ''
    },
    getters: {
        email:state=>state.email_user,
        userId:state=>state.id_user,
        list_image:state=>state.list_image,
        authen:state=>state.authen
    },
    mutations: {
        setEmail(state, email) {
            state.email_user = email
        },
        setUserID(state, userId) {
            state.id_user = userId
        },
        setListImage(state, list_image) {
            state.list_image = list_image
        },
        setAuthen(state, authen) {
            state.authen = authen
        }
    },
    actions: {
    },
    modules: {
    }
})
