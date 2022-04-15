<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6" v-for="(post, index) in posts" :key="index">
                <div class="card mt-5">
                    <div class="card-body">
                        <h4 class="card-title">{{ post.title }}</h4>
                        <h6 class="card-text">{{ post.createAt }}</h6>
                        <!-- <h6>{{ post.postId }}</h6> -->
                        <router-link v-bind:to="'/post/' + post.postId">
                            <button class="btn btn-dark">อ่านต่อ</button>
                        </router-link>
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
    created() {
        axios.get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts-all')
            .then(response => {
                this.posts = response.data
            })
            .catch(error => {
                console.log(error)
            })

        axios.get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/user', {
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
        }).catch(error => {
            console.log(error);
        })
    },
    methods: {
    }
}
</script>

<style>
</style>