<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6" v-for="(post, index) in posts" :key="index">
                <div class="card mt-5">
                    <div class="card-body">
                        <h4 class="card-title">{{ post.title }}</h4>
                        <button class="btn btn-dark" @click="testClick">อ่านต่อ</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-primary">{{ posts }}</div>
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
                console.log('response.data: ', response.data);
            })
            .catch(error => {
                console.log(error)
            })
        // axios
        //     .get('http://howtocrud-env.eba-p33xseme.us-east-1.elasticbeanstalk.com/posts/all', {
        //         params: {
        //             productId: '1'
        //         }
        //     })
        //     .then(response => {
        //         this.one_products = response.data
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    },
    methods: {
        getData() {
            // axios.get('http://tutorialnodejs-env.eba-mrvzp3m5.us-east-1.elasticbeanstalk.com/product/all')
            // .then(response => {
            //     this.products = response.data.products
            // })
            // . catch(error => {
            //     console.log(error)
            // })
        },
        testClick() {
            console.log('testClick')
            // const id = this.posts.map((post) => {
            //     return post.postId
            // })

            for (let i = 0; this.posts.length > i; i++) {
                this.id = this.posts[i].postId
                console.log(this.posts[i].postId)
            }
            // this.$router.push('/post/2')
            const id = this.id
            this.$router.push({ name: 'PostDetail', params: { id } }) // -> /user/eduardo
        }
    }
}
</script>

<style>
</style>