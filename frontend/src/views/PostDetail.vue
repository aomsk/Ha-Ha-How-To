<template>
    <div>
        <div class="mt-3" v-for="item in postDetail" :key="item.postId">
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
    },
}
</script>

<style>
h1 {
    font-weight: bold;;
}
</style>