import { createStore } from 'vuex'

export default createStore({
    state: {
        // email_user: '',
        // id_user: '',
        list_image: null,
        authen: '',
        list_categoryId: null,
        list_categoryName: null
    },
    getters: {
        // email:state=>state.email_user,
        // userId:state=>state.id_user,
        list_image:state=>state.list_image,
        authen:state=>state.authen,
        list_categoryId:state=>state.list_categoryId,
        list_categoryName:state=>state.list_categoryName
    },
    mutations: {
        // setEmail(state, email) {
        //     state.email_user = email
        // },
        // setUserID(state, userId) {
        //     state.id_user = userId
        // },
        setListImage(state, list_image) {
            state.list_image = list_image
        },
        setAuthen(state, authen) {
            state.authen = authen
        },
        setListCategoriesId(state, list_categoryId) {
            state.list_categoryId = list_categoryId
        },
        setListCategoriesName(state, list_categoryName) {
            state.list_categoryName = list_categoryName
        }
    },
    actions: {
    },
    modules: {
    }
})
