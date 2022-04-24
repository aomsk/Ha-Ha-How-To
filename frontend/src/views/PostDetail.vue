<template>
    <div>
        <div class="mt-3" v-for="item in postDetail" :key="item.postId">
            <h1 id="title">{{ item.title }}</h1>
            <h6>สร้างโพสเมื่อ : {{ item.createAt }}</h6>
            <hr>
            <div>
                <p v-html="item.content"></p>
            </div>
        </div>
        <div v-if="token_user_login">
            <hr>
            <h2><strong>คอมเมนต์</strong></h2>
            <div id="card" class='card p-3 mb-4 mt-4'>
                <div class='container'>
                    <label class="form-label">Comment</label>
                    <div class="input-group mb-2">
                        <textarea class="form-control" type="text" rows="4" v-model="comment"></textarea>
                    </div>
                    <div class="gap-2 mb-3 d-flex justify-content-end">
                        <button id="button" type="button" class="btn btn-outline-success" @click="creatComment()">ส่งความคิดเห็น</button>
                    </div>
                </div>
            </div>
            <!-- <div class="col-lg-12" v-for="(comment, index) in comments" :key="index">
                <div class="card mt-3 p-3" id="card">
                    <div class="card-body">
                        <h4 class="card-title"><strong>{{ comment.comment }}</strong></h4>
                        <h6 class="card-text">{{ comment.createAt }}</h6>
                    </div>
                </div>
            </div> -->
            <h5>ความคิดเห็น ({{ comments.length }})</h5>
            <div class="col-lg-12 mb-3" v-for="(comment, index) in comments" :key="index">
                <div class="card mt-3 p-3" id="card">
                    <div class="card-body">
                        <h4 class="card-title"><strong>{{ comment.comment }}</strong></h4>
                        <div class="text-end">
                            <h6 class="card-text"><strong>{{ comment.authorName }}</strong></h6>
                            <h6 class="card-text">{{ comment.createAt }}</h6>
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
            postId: this.$route.params.postId,
            postDetail: null,
            token_user_login: '',
            comment: '',
            comments: '',
            comment_in_post: null,
            userData: null
        }
    },
    async created() {
        this.token_user_login = localStorage.getItem('token')
        // console.log('this.$store.state.authen : ', this.$store.state.authen);
        await axios.get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts', {
            params: {
                postId: this.postId
            }
        }).then(response => {
            let list = []
            list.push(response.data)
            this.postDetail = list
            console.log(list);
        }).catch(error => {
            console.log(error);
        })

        await axios.get(' https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/comments/all')
        .then(response => {
            const comments = response.data.comments
            // console.log('comments : ', comments);
            const result = comments.filter((item) => {
                return item.postId == this.postId
            })
            this.comments = result
            console.log('this.comments: ', this.comments);
        }).catch(error => {
            console.log(error);
        })
    },
    methods: {
        async creatComment() {
            let date = new Date()
            const userId = localStorage.getItem('userId')
            const idToken = localStorage.getItem('token')

            const data = {
                comment: this.comment,
                author: userId,
                authorName: localStorage.getItem('username'),
                authorEmail: localStorage.getItem('email_user'),
                createAt: date.toLocaleString(),
                editAt: '',
                postId: this.postId
            }
            console.log('data : ', data);

            await axios({
                method: 'post',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/comments-create-comment',
                data: data,
                headers: {
                    Authorization: idToken
                }
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    },
}
</script>

<style>
#title {
    font-weight: bold;;
}

#card {
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
#button {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>