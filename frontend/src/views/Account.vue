<template>
    <div>
        <h1>My Account</h1>
        <!-- <h2>User Email : {{ $store.state.email_user }}</h2> -->
        <!-- <h2>User Email form localStorage : {{ user_email_localStorage }}</h2> -->
        <div v-for="item in userData" :key="item.userId">
            <h4>username : {{ item.username }}</h4>
            <h4>email : {{ item.email }}</h4>
        </div>
        <h2>Post Count ({{ posts.length }})</h2>
        <div class="row">
            <div class="col-lg-12" v-for="(post, index) in posts" :key="index">
                <div class="card p-2 mb-3 card-shadow">
                    <div class="card-body">
                        <h3 class="card-title"><strong>{{ post.title }}</strong></h3>
                        <h6 class="card-text">{{ post.createAt }}</h6>
                        <div class="text-end">
                            <router-link v-bind:to="'/edit-post/' + post.postId">
                                <button id="button" class="btn btn-outline-warning m-2">แก้ไขโพส</button>
                            </router-link>
                            <button id="button" class="btn btn-outline-danger" @click="deletePost(post.postId)">ลบโพส</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            userData: null,
            user_email_localStorage: '',
            posts: '',
            images: ''
        }
    },
    async created() {
        this.user_email_localStorage = localStorage.getItem('email_user')
        await axios
            .get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/user', {
                params: {
                    // email: this.$store.state.email_user
                    email: localStorage.getItem('email_user')
                }
            })
            .then(response => {
                let list = []
                list.push(response.data)
                this.userData = list
                console.log(list)
            })
            .catch(error => {
                console.log(error)
            })

        await axios
            .get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts-all')
            .then(response => {
                this.posts = response.data
                const posts = response.data
                const idUser = localStorage.getItem('userId')
                const user_post = posts.filter(post => {
                    return post.author == idUser
                })
                this.posts = user_post
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
        async deletePost(post_id) {
            Swal.fire({
                title: 'คุณต้องการลบโพสใช่มั้ย ?',
                text: 'หากลบโพสแล้ว จะไม่สามารถกู้คืนโพสได้อีก',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่ ลบเลย !',
                cancelButtonText: 'ยกเลิก',
            }).then(result => {
                if (result.isConfirmed) {
                    console.log('post_id: ', post_id)
                    const idToken = localStorage.getItem('token')
                    const data = {
                        postId: post_id
                    }

                    axios.get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts', {
                            params: {
                                postId: post_id
                            }
                        })
                        .then(response => {
                            this.images = response.data.images
                            if (this.images == null) {
                                axios({
                                    method: 'delete',
                                    url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts',
                                    data: data,
                                    headers: {
                                        Authorization: idToken
                                    }
                                })
                                    .then(response => {
                                        console.log(response.data)
                                        Swal.fire('ลบโพสสำเร็จ !', 'โพส How To ของคุณถูกลบเรียบร้อยแล้ว !', 'success')
                                        setInterval(() => {
                                            window.location.reload()
                                        }, 1500)
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            }
                            else if (this.images.length != 0) {
                                this.images.forEach(image => {
                                    axios
                                        // .delete('http://localhost:3000/delete/' + image)
                                        .delete('http://howtouploadimagess3-env.eba-jrujmmxb.us-east-1.elasticbeanstalk.com/delete/' + image)
                                        .then(response => {
                                            console.log(response.data)
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                })
                                axios({
                                    method: 'delete',
                                    url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts',
                                    data: data,
                                    headers: {
                                        Authorization: idToken
                                    }
                                })
                                    .then(response => {
                                        console.log(response.data)
                                        Swal.fire('ลบโพสสำเร็จ !', 'โพส How To ของคุณถูกลบเรียบร้อยแล้ว !', 'success')
                                        setInterval(() => {
                                            window.location.reload()
                                        }, 1500)
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
        }
    }
}
</script>

<style>
.card-shadow {
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
#button {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
