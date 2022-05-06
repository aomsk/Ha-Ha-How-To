<template>
    <div>
        <h1>My Account</h1>
        <div class="row">
            <div class="col-lg-6">
                <div v-for="item in userData" :key="item.userId">
                    <h5>username : {{ item.username }}</h5>
                    <h5>email : {{ item.email }}</h5>
                </div>
            </div>
            <!-- <div class="col-lg-6">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-warning">แก้ไขโปรไฟล์</button>
        </div>
            </div>-->
        </div>
        <h5>คุณมีโพสต๋ How To ทั้งหมด {{ posts.length }} โพสต์</h5>
        <div v-if="posts.length > 0">
            <div class="row">
                <div class="col-lg-6" v-for="(post, index) in posts" :key="index">
                    <div class="card p-2 mb-3 card-shadow">
                        <div class="card-body">
                            <h6 class="card-title">
                                <strong>{{ post.title }}</strong>
                            </h6>
                            <h6 class="card-text">{{ new Date(post.createAt).toLocaleString() }}</h6>
                            <div class="text-end">
                                <router-link v-bind:to="'/edit-post/' + post.postId">
                                    <button id="button" class="btn btn-outline-warning m-2">
                                        <!-- แก้ไขโพสต์ -->
                                        <font-awesome-icon icon="pen-to-square" />
                                    </button>
                                </router-link>
                                <button id="button" class="btn btn-outline-danger" @click="deletePost(post.postId)">
                                    <!-- ลบโพสต์ -->
                                    <font-awesome-icon icon="trash" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="no_post">
            <h4>ยังไม่มีโพสต์ How To</h4>
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
            .get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/users', {
                params: {
                    email: localStorage.getItem('email_user')
                }
            })
            .then(response => {
                let list = []
                list.push(response.data)
                this.userData = list
            })
            .catch(error => {
                console.log(error)
            })

        await axios
            .get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts/all')
            .then(response => {
                this.posts = response.data
                const posts = response.data
                const idUser = localStorage.getItem('userId')
                const user_post = posts.filter(post => {
                    return post.authorId == idUser
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
                title: 'คุณต้องการลบโพสต์ใช่มั้ย ?',
                text: 'หากลบโพสต์แล้ว จะไม่สามารถกู้คืนโพสต์ได้อีก',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่ ลบเลย !',
                cancelButtonText: 'ยกเลิก'
            }).then(result => {
                if (result.isConfirmed) {
                    console.log('post_id: ', post_id)
                    const idToken = localStorage.getItem('token')
                    const data = {
                        postId: post_id
                    }

                    axios
                        .get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts', {
                            params: {
                                postId: post_id
                            }
                        })
                        .then(response => {
                            this.images = response.data.images
                            if (this.images == null) {
                                axios({
                                    method: 'delete',
                                    url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts/delete-post',
                                    data: data,
                                    headers: {
                                        Authorization: idToken
                                    }
                                })
                                    .then(response => {
                                        console.log(response.data)
                                        Swal.fire(
                                            'ลบโพสต์สำเร็จ !',
                                            'โพสต์ How To ของคุณถูกลบเรียบร้อยแล้ว !',
                                            'success'
                                        )
                                        // setInterval(() => {
                                        //     window.location.reload()
                                        // }, 1500)
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            } else if (this.images.length != 0) {
                                this.images.forEach(image => {
                                    axios
                                        .delete(
                                            'http://uploadimage-env.eba-xmegyc33.us-east-1.elasticbeanstalk.com/delete-image-post/' +
                                                image
                                        )
                                        // .delete('http://localhost:3002/delete-image-post/' + image)
                                        .then(response => {
                                            console.log(response.data)
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                })
                                axios({
                                    method: 'delete',
                                    url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts/delete-post',
                                    data: data,
                                    headers: {
                                        Authorization: idToken
                                    }
                                })
                                    .then(response => {
                                        console.log(response.data)
                                        Swal.fire(
                                            'ลบโพสต์สำเร็จ !',
                                            'โพสต์ How To ของคุณถูกลบเรียบร้อยแล้ว !',
                                            'success'
                                        )
                                        // setInterval(() => {
                                        //     window.location.reload()
                                        // }, 1500)
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
.no_post {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 100px;
}
</style>
