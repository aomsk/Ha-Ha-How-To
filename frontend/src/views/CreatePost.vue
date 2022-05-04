<template>
    <div>
        <h1>Create Post</h1>
        <!-- <h2>list image : {{ $store.state.list_image }}</h2> -->
        <div class="d-flex justify-content-start">
            <p class="mt-3">หมวดหมู่ : </p>
            <div id="card_selected_category" class="m-1 card p-1" v-for="(item, index) in $store.state.list_categoryName" :key="index">
                <p class="m-1">{{ item }}</p>
            </div>
        </div>
        <!-- <h5>list_categorise ID : {{ $store.state.list_categoryId }}</h5> -->
        <div class="mt-3 mb-3" id="input">
            <label class="form-lable mb-1">Title</label>
            <input
                class="form-control input"
                type="text"
                placeholder="Title How To"
                for="title"
                v-model="post.title"
                required
            />
        </div>
        <div>
            <editor v-model="post.content" />
            <!-- <div class="content">
                <hr />
                <h3>Preview</h3>
                <pre><code>{{ post.content }}</code></pre>
                <p v-html="post.content"></p>
            </div> -->
            <div class="d-flex justify-content-between mb-3">
                <div>
                    <router-link to="/categories/">
                        <button id="button-back" class="btn btn-outline-dark">
                            <font-awesome-icon icon="angles-left" /> Back To Category
                        </button>
                    </router-link>
                </div>
                <div class="">
                    <button id="button" class="btn btn-outline-success" @click="createPost()">Create Post</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Editor from '../components/Editor.vue'
export default {
    components: {
        Editor
    },
    data() {
        return {
            post: {
                title: '',
                author: '',
                categories: '',
                createAt: '',
                editAt: '',
                content: '',
                images: ''
            }
        }
    },
    methods: {
        async createPost() {
            let date = new Date()

            const idToken = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const userEmail = localStorage.getItem('email_user')

            const data = {
                title: this.post.title,
                content: this.post.content,
                authorId: userId,
                authorEmail: userEmail,
                categories: this.$store.state.list_categoryId,
                createAt: date,
                updateAt: '',
                images: this.$store.state.list_image
            }
            console.log('data : ', data)

            await axios({
                method: 'post',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts/create-post',
                data: data,
                headers: {
                    Authorization: idToken
                }
            })
                .then(response => {
                    const postId = response.data.Item.postId
                    console.log(response.data)
                    Swal.fire({
                        title: 'สร้างโพสสำเร็จ',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.post.title = ''
                    this.post.content = ''
                    this.$store.commit('setListCategoriesId', null)
                    this.$store.commit('setListCategoriesName', null)
                    this.$router.push(`/post/${postId}`)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style lang="scss">
/* Basic editor styles */
// .ProseMirror {
//     > * + * {
//         margin-top: 0.75em;
//     }
//     code {
//         background-color: rgba(#616161, 0.1);
//         color: #616161;
//     }
// }
.content {
    padding: 1rem 0 0;
    h3 {
        margin: 1rem 0 0.5rem;
    }
    pre {
        border-radius: 5px;
        color: #333;
    }
    code {
        display: block;
        white-space: pre-wrap;
        font-size: 0.8rem;
        padding: 0.75rem 1rem;
        background-color: #e9ecef;
        color: #495057;
    }
}
#button-back {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    // border: 1.5px solid #27A8C1;
    // color: #27A8C1;
}
// #button-back:hover {
//     cursor: pointer;
//     background-color: #27A8C1;
//     box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
//     color: #fff;
//     border: none;
// }
#button {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.input {
    border-radius: 10px;
}
#card_selected_category {
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    // background-color: #424242;
    background-color: #73CDC5;
    color: #fff;
}
img {
    max-width: 100%;
    height: auto;
}
// .ProseMirror {
//     margin-top: 0.75em;
//     border: solid 1px #bdbdbd;
// }
</style>