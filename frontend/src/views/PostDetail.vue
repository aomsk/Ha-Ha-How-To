<template>
    <div>
        <div v-for="item in postDetail" :key="item.postId">
            <h1>{{ item.title }}</h1>
            <h6>สร้างโพสเมื่อ : {{ item.createAt }}</h6>
            <hr>
            <div>
                <p v-html="item.content"></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            postId: this.$route.params.postId,
            postDetail: null
        }
    },
    async created() {
        await axios.get('http://howtocrud-env.eba-p33xseme.us-east-1.elasticbeanstalk.com/posts', {
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
    },
}
</script>

<style>
h1 {
    font-weight: bold;;
}
</style>