<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6" v-for="(post, index) in posts" :key="index">
                <div class="card mt-5">
                    <div class="card-body">
                        <h4 class="card-title">{{ post.title }}</h4>
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
        axios.get('http://howtocrud-env.eba-p33xseme.us-east-1.elasticbeanstalk.com/posts/all')
            .then(response => {
                this.posts = response.data
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
    }
}
</script>

<style>
</style>