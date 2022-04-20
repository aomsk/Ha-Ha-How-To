<template>
    <div>
        <h1>Edit Post</h1>
        <form @submit.prevent="saveTitle()">
            <div class="mt-3 mb-3">
                <label class="form-lable mb-1">Title</label>
                <input
                    class="form-control"
                    type="text"
                    placeholder="Title How To"
                    for="title"
                    v-model="title"
                    required
                />
            </div>
            <button class="btn btn-outline-success mb-3">Save Title</button>
        </form>
        <div>
            <editor v-model="content" />
            <div class="content">
                <hr />
                <h1>Preview</h1>
                <pre><code>{{ content }}</code></pre>
                <!-- <p v-html="content"></p> -->
            </div>
            <button class="btn btn-outline-success" @click="saveContent()">Save Content</button>
        </div>
    </div>
</template>

<script>
// import EditEditor from '../components/EditEditor.vue'
import Editor from '../components/Editor.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    components: {
        // EditEditor,
        Editor
    },
    data() {
        return {
            content: '',
            title: '',
            postData: ''
        }
    },
    async created() {
        console.log(this.$route.params.postId);
        await axios.get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts', {
            params: {
                postId: this.$route.params.postId
            }
        }).then(response => {
            let list = []
            list.push(response.data)
            // this.postData = list
            console.log(list);
            
            this.title = list[0].title
            this.content = list[0].content

        }).catch(error => {
            console.log(error);
        })
    },
    methods: {
       async updateTimeToEdit() {
            const idToken = localStorage.getItem('token')
            let date = new Date()
            const data = {
                postId: this.$route.params.postId,
                updateKey: 'editAt',
                updateValue: date.toLocaleString(),
            }
            console.log('data : ', data)

            await axios({
                method: 'patch',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts',
                data: data,
                headers: {
                    Authorization: idToken
                }
            })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async saveTitle() {
            const idToken = localStorage.getItem('token')

            const data = {
                postId: this.$route.params.postId,
                updateKey: 'title',
                updateValue: this.title,
            }
            console.log('data : ', data)

            await axios({
                method: 'patch',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts',
                data: data,
                headers: {
                    Authorization: idToken
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.updateTimeToEdit()
                    Swal.fire({
                        title: 'แก้ไข Title สำเร็จ',
                        icon: 'success',
                        // confirmButtonText: 'OK'
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async saveContent() {
            const idToken = localStorage.getItem('token')

            const data = {
                postId: this.$route.params.postId,
                updateKey: 'content',
                updateValue: this.content,
            }
            console.log('data : ', data)

            await axios({
                method: 'patch',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts',
                data: data,
                headers: {
                    Authorization: idToken
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.updateTimeToEdit()
                    Swal.fire({
                        title: 'แก้ไข Content สำเร็จ',
                        icon: 'success',
                        // confirmButtonText: 'OK'
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
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