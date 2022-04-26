<template>
    <div>
        <div class="row mt-5">
            <div class="col-lg-6" v-for="(post, index) in posts" :key="index">
                <div class="card mt-3 p-3" id="card">
                    <div class="card-body">
                        <h4 class="card-title"><strong>{{ post.title }}</strong></h4>
                        <h6 class="card-text">{{ new Date(post.createAt).toLocaleString() }}</h6>
                        <!-- <h6>{{ post.postId }}</h6> -->
                        <div class="d-flex justify-content-end">
                            <router-link v-bind:to="'/post/' + post.postId">
                                <button id="button" class="btn btn-outline-dark">อ่านต่อ</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            posts: null,
            id: ''
        }
    },
    async created() {
        await axios.get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts-all')
            .then(response => {
                this.posts = response.data
            })
            .catch(error => {
                console.log(error)
            })

        if (localStorage.getItem('email_user') != null) {
            await axios.get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/user', {
                params: {
                    // email: this.$store.state.email_user
                    email: localStorage.getItem('email_user')
                }
            }).then(response => {
                let list = []
                list.push(response.data)
                this.userData = list
                console.log(list);
                // this.$store.commit('setUserID', list[0].userId)
                localStorage.setItem('userId', list[0].userId)
                localStorage.setItem('username', list[0].username)
            }).catch(error => {
                console.log(error);
            })
        }
    },

}
</script>

<style>
#card {
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
#button {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>