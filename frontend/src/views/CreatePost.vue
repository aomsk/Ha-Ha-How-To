<template>
    <div>
        <h1>Create Post</h1>
        <div class="mt-3 mb-3">
            <label class="form-lable mb-1">Title</label>
            <input class="form-control" type="text" placeholder="Title How To" for="title" v-model="post.title" />
        </div>
        <div>
            <editor v-model="post.content" />
            <div class="content">
                <hr />
                <h1>Preview</h1>
                <pre><code>{{ post.content }}</code></pre>
                <!-- <p v-html="content"></p> -->
            </div>
            <button class="btn btn-primary" @click="createPost()">Create Post</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import swal from 'sweetalert2'
import Editor from '../components/Editor.vue'
export default {
    components: {
        Editor
    },
    data() {
        return {
            post : {
                title: '',
                author: '',
                categories: '',
                createAt: '',
                editAt: '',
                content: '<p>Hello World</p>'
            }
        }
    },
    methods: {
        async createPost() {
            let today = new Date();
            let ISO_DATE = today.toISOString()
            let ISO_split = ISO_DATE.split('T')
            let local_time = today.toLocaleTimeString()
            let date_time = ISO_split[0] + 'T' + local_time

            const idToken = localStorage.getItem('token')

            const data = {
                title: this.post.title,
                content: this.post.content,
                author: '1', // userId
                categories: [],
                createAt: date_time,
                editAt: ''
            }
            console.log('data : ', data)

            await axios({
                method: 'post',
                // url: 'http://howtocrud-env.eba-p33xseme.us-east-1.elasticbeanstalk.com/posts/create-post',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts-create-post',
                data: data,
                headers: {
                    'Authorization': idToken
                }
            })
                .then(response => {
                    console.log(response.data)
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
</style>