<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6" v-for="post in posts" :key="post.id">
                <div class="card mt-5">
                    <div class="card-body">
                        <h4 class="card-title">{{ post.title }}</h4>
                        <a class="btn btn-dark">อ่านต่อ</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-primary">{{ products }}</div>
        <div class="text-danger">{{ one_products }}</div>
    </div>
</template>

<script>
import axios from 'axios'

const posts = [
    {
        id: '1',
        title: 'How To ทำแกงเขียวหวานอย่างไรให้อร่อยสุดๆ'
    },
    {
        id: '2',
        title: 'How To แต่งสวนสไตล์ญี่ปุ่น'
    },
    {
        id: '3',
        title: 'How To ตัดผมหน้าม้าด้วยตนเองงงง'
    },
    {
        id: '4',
        title: 'How To จัดห้องให้ไม่รก สไตล์มินิมอลล'
    }
]
export default {
    data() {
        return {
            posts,
            products: null,
            one_products: null
        }
    },
    created() {
        axios
            .get('http://tutorialnodejs-env.eba-mrvzp3m5.us-east-1.elasticbeanstalk.com/product/all', {
                // params: {
                //     productId: '1'
                // }
            })
            .then(response => {
                this.products = response.data.products
            })
            .catch(error => {
                console.log(error)
            })
        axios
            .get('http://tutorialnodejs-env.eba-mrvzp3m5.us-east-1.elasticbeanstalk.com/product', {
                params: {
                    productId: '1'
                }
            })
            .then(response => {
                this.one_products = response.data
            })
            .catch(error => {
                console.log(error)
            })
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
        }
    }
}
</script>

<style>
</style>