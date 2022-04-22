<template>
    <div>
        <h1>Create Post</h1>
        <!-- <h2>list image : {{ $store.state.list_image }}</h2> -->
        <div class="mt-3 mb-3">
            <label class="form-lable mb-1">Title</label>
            <input
                class="form-control"
                type="text"
                placeholder="Title How To"
                for="title"
                v-model="post.title"
                required
            />
        </div>
        <div>
            <editor v-model="post.content" />
            <div class="content">
                <hr />
                <h3>Preview</h3>
                <pre><code>{{ post.content }}</code></pre>
                <p v-html="post.content"></p>
            </div>
            <div class="d-flex justify-content-end">
                <button id="button" class="btn btn-outline-primary" @click="createPost()">Create Post</button>
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

            const data = {
                title: this.post.title,
                content: this.post.content,
                // author: this.$store.state.id_user, // userId
                author: userId, // userId
                categories: [],
                images: this.$store.state.list_image,
                createAt: date.toLocaleString(),
                editAt: '',
            }
            console.log('data : ', data)

            await axios({
                method: 'post',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts-create-post',
                data: data,
                headers: {
                    Authorization: idToken
                }
            })
                .then(response => {
                    console.log(response.data)
                    Swal.fire({
                        title: 'สร้างโพสสำเร็จ',
                        icon: 'success',
                        // confirmButtonText: 'OK'
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.post.title = ''
                    this.post.content = ''
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
.ProseMirror {
    > * + * {
        margin-top: 0.75em;
    }
    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }
}
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
#button {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>