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
        <div v-if="$store.state.authen">
            <hr>
            <h2><strong>คอมเมนต์</strong></h2>
            <div id="card" class='card p-3 mb-4 mt-4'>
                <div class='container'>
                    <label class="form-label">Comment</label>
                    <div class="input-group mb-2">
                        <textarea class="form-control" type="text" rows="4" ></textarea>
                    </div>
                    <div class="gap-2 mb-3 d-flex justify-content-end">
                        <button id="button" type="button" class="btn btn-outline-success" >ส่งความคิดเห็น</button>
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
            postDetail: null
        }
    },
    async created() {
        console.log('this.$store.state.authen : ', this.$store.state.authen);
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