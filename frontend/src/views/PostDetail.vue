<template>
    <div>
        <div class="mt-3" v-for="item in postDetail" :key="item.postId">
            <h1 id="title">{{ item.title }}</h1>
            <!-- <div class="d-flex justify-content-start">
                <h5>หมวดหมู่ : </h5>
                <div v-for="category in categories" :key="category.categoryId">
                    <h5>&nbsp;{{ category.title }}&nbsp;</h5>
                </div>
            </div> -->
            <div class="d-flex justify-content-start">
                <p class="mt-3">หมวดหมู่ : </p>
                <div id="category" class="m-1 card p-1" v-for="category in categories" :key="category.categoryId">
                    <p class="m-1">{{ category.title }}</p>
                </div>
            </div>
            <h6>สร้างโพสเมื่อ : {{ new Date(item.createAt).toLocaleString() }}</h6>
            <div v-if="item.updateAt != ''">
                <h6>แก้ไขโพสเมื่อ : {{ new Date(item.updateAt).toLocaleString() }}</h6>
            </div>
            <hr />
            <div>
                <p v-html="item.content"></p>
            </div>
        </div>
        <div v-if="token_user_login">
            <hr />
            <h2>
                <strong>คอมเมนต์</strong>
            </h2>
            <div id="card" class="card p-3 mb-4 mt-4">
                <div class="container">
                    <label class="form-label">Comment</label>
                    <div class="input-group mb-2">
                        <textarea class="form-control textarea" type="text" rows="4" v-model="comment"></textarea>
                    </div>
                    <div class="gap-2 mb-3 d-flex justify-content-end">
                        <button
                            id="button"
                            type="button"
                            class="btn btn-outline-success"
                            @click="creatComment()"
                        >ส่งความคิดเห็น</button>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <h5>ความคิดเห็น ({{ comments.length }})</h5>
        <div class="col-lg-12 mb-3" v-for="(comment, index) in comments" :key="index">
            <div class="card mt-3 p-3" id="card">
                <div class="card-body">
                    <h6 class="card-title">
                        <strong>{{ comment.content }}</strong>
                    </h6>
                    <div class="text-end">
                        <div v-if="comment.authorEmail == emailUser">
                            <button
                                id="button"
                                class="btn btn btn-outline-warning m-2"
                                type="button"
                                @click="editComment(comment.commentId, comment.content)"
                            >
                                <font-awesome-icon icon="pen-to-square" />
                            </button>
                            <button
                                id="button"
                                class="btn btn btn-outline-danger"
                                type="button"
                                @click="deleteComment(comment.commentId)"
                            >
                                <font-awesome-icon icon="trash" />
                            </button>
                        </div>
                        <h6 class="card-text">
                            <strong>{{ comment.authorName }}</strong>
                        </h6>
                        <h6 class="card-text">{{ new Date(comment.createAt).toLocaleString()}}</h6>
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
            postId: this.$route.params.postId,
            postDetail: [],
            token_user_login: '',
            comment: '',
            comments: '',
            // commentEdit: '',
            // commentEditId: '',
            comment_in_post: null,
            // userData: null,
            edit: false,
            emailUser: localStorage.getItem('email_user'),
            categories: []
        }
    },
    async created() {
        this.token_user_login = localStorage.getItem('token')
        // console.log('this.$store.state.authen : ', this.$store.state.authen);
        await axios
            .get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts', {
                params: {
                    postId: this.postId
                }
            })
            .then(response => {
                let list = []
                list.push(response.data)
                this.postDetail = list
                console.log(list)
            })
            .catch(error => {
                console.log(error)
            })

        this.postDetail[0].categories.forEach(item => {
            axios
                .get('http://howtocrud-env.eba-p33xseme.us-east-1.elasticbeanstalk.com/categories', {
                    params: {
                        categoryId: item
                    }
                })
                .then(response => {
                    this.categories.push(response.data)
                    console.log(this.categories)
                })
                .catch(error => {
                    console.log(error)
                })
        })

        await axios
            .get(' https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/comments/all')
            .then(response => {
                const comments = response.data.comments
                // console.log('comments : ', comments)
                const result = comments.filter(item => {
                    return item.postId == this.postId
                })

                const sortByDateResult = result => {
                    const sorter = (a, b) => {
                        return new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
                    }
                    result.sort(sorter)
                }
                sortByDateResult(result)
                // console.log('sortByDate_result : ', result)
                // console.log('sortByDate_result.reverse() : ', result.reverse())

                this.comments = result.reverse()
                // console.log('this.comments: ', this.comments)
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
        async updateTimeToEdit(commentId) {
            const idToken = localStorage.getItem('token')
            let date = new Date()
            const data = {
                commentId: commentId,
                updateKey: 'updateAt',
                updateValue: date
            }
            console.log('data : ', data)

            await axios({
                method: 'patch',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/comments/edit-comment',
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
        async creatComment() {
            let date = new Date()
            const idToken = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const username = localStorage.getItem('username')
            const userEmail = localStorage.getItem('email_user')

            const data = {
                content: this.comment,
                authorId: userId,
                authorName: username,
                authorEmail: userEmail,
                createAt: date,
                updateAt: '',
                postId: this.postId
            }
            console.log('data : ', data)

            await axios({
                method: 'post',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/comments/create-comment',
                data: data,
                headers: {
                    Authorization: idToken
                }
            })
                .then(response => {
                    console.log(response.data)
                    Swal.fire({
                        title: 'แสดงความคิดเห็นสำเร็จ',
                        icon: 'success',
                        // confirmButtonText: 'OK'
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // setInterval(() => {
                    //     window.location.reload()
                    // }, 1000)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async editComment(commentId, commentText) {
            const inputValue = commentText

            const { value: commentEdit } = await Swal.fire({
                title: 'Edit your comment',
                input: 'text',
                // inputLabel: 'Your IP address',
                inputValue: inputValue,
                showCancelButton: true,
                inputValidator: value => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            })

            if (commentEdit) {
                const idToken = localStorage.getItem('token')

                const data = {
                    commentId: commentId,
                    updateKey: 'content',
                    updateValue: commentEdit
                }
                console.log('data : ', data)

                await axios({
                    method: 'patch',
                    url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/comments/edit-comment',
                    data: data,
                    headers: {
                        Authorization: idToken
                    }
                })
                    .then(response => {
                        console.log(response.data)
                        this.updateTimeToEdit(commentId)
                        Swal.fire({
                            title: 'แก้ไข Comment สำเร็จ',
                            icon: 'success',
                            // confirmButtonText: 'OK'
                            showConfirmButton: false,
                            timer: 1500
                        })
                        // setInterval(() => {
                        //     window.location.reload()
                        // }, 1000)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        async deleteComment(commentId) {
            Swal.fire({
                title: 'คุณต้องการลบคอมเมนต์ใช่มั้ย ?',
                // text: 'หากลบคอมเมนต์แล้ว จะไม่สามารถกู้คืนคอมเมนต์ได้อีก',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่ ลบเลย !',
                cancelButtonText: 'ยกเลิก'
            }).then(result => {
                if (result.isConfirmed) {
                    const idToken = localStorage.getItem('token')
                    const data = {
                        commentId: commentId
                    }
                    axios({
                        method: 'delete',
                        url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/comments/delete-comment',
                        data: data,
                        headers: {
                            Authorization: idToken
                        }
                    })
                        .then(response => {
                            console.log(response.data)
                            // Swal.fire('ลบ comment สำเร็จ !', 'comment ของคุณถูกลบเรียบร้อยแล้ว !', 'success')
                            Swal.fire({
                                title: 'ลบ comment สำเร็จ !',
                                icon: 'success',
                                // confirmButtonText: 'OK'
                                showConfirmButton: false,
                                timer: 1500
                            })
                            // setInterval(() => {
                            //     window.location.reload()
                            // }, 1500)
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
#title {
    font-weight: bold;
}

#card {
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
#button {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
#edit {
    color: #dc3545;
}
#category {
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #424242;
    color: #fff;
}
.textarea {
    border-radius: 10px;
}
img {
    max-width: 50%;
    height: auto;
}
</style>