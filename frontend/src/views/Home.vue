<template>
    <div class="container">
        <form @submit.prevent="submitSearch()">
            <div class="row mt-3">
                <div class="col-lg-8 col-9">
                    <label class="form-lable">ค้นหาโพสต์ How To</label>
                    <input
                        class="form-control input"
                        type="text"
                        placeholder="search by title"
                        for="search"
                        v-model="search"
                    />
                </div>
                <div class="col-lg-2 col-3 mt-4">
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-primary" type="button">ค้นหา</button>
                    </div>
                </div>
                <div class="col-lg-2 mt-4">
                    <div class="dropdown d-grid gap-2">
                        <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >หมวดหมู่</button>
                        <ul class="dropdown-menu col-12" aria-labelledby="dropdownMenuButton1">
                            <li v-for="(category, index) in categories" :key="index">
                                <a
                                    class="dropdown-item"
                                    @click="searchByCategory(category.categoryId)"
                                >{{ category.title }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
        <div v-if="result == ''">
            <div class="row mt-3">
                <div class="col-lg-4" v-for="(post, index) in posts" :key="index">
                    <div class="card mt-3 p-2" id="card">
                        <div class="card-body">
                            <h6 class="card-title">
                                <strong>{{ post.title }}</strong>
                            </h6>
                            <p class="card-text">{{ new Date(post.createAt).toLocaleString() }}</p>
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
        <div v-else>
            <div class="col-lg-4" v-for="(item, index) in result" :key="index">
                <div class="card mt-3 p-2" id="card">
                    <div class="card-body">
                        <h6 class="card-title">
                            <strong>{{ item.title }}</strong>
                        </h6>
                        <p class="card-text">{{ new Date(item.createAt).toLocaleString() }}</p>
                        <div class="d-flex justify-content-end">
                            <router-link v-bind:to="'/post/' + item.postId">
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
            id: '',
            search: '',
            categories: '',
            result: ''
        }
    },
    async created() {
        await axios
            .get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/categories/all')
            .then(response => {
                this.categories = response.data.categories
            })
            .catch(error => {
                console.log(error)
            })

        await axios
            .get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/posts/all')
            .then(response => {
                this.posts = response.data
            })
            .catch(error => {
                console.log(error)
            })

        if (localStorage.getItem('email_user') != null) {
            // await axios.get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/users', {
            await axios
                .get(process.env.VUE_APP_GET_USER_BY_EMAIL, {
                    params: {
                        // email: this.$store.state.email_user
                        email: localStorage.getItem('email_user')
                    }
                })
                .then(response => {
                    let list = []
                    list.push(response.data)
                    this.userData = list
                    // console.log(list);
                    // this.$store.commit('setUserID', list[0].userId)
                    localStorage.setItem('userId', list[0].userId)
                    localStorage.setItem('username', list[0].username)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    methods: {
        submitSearch() {},
        searchByCategory(categoryId) {
            console.log('categoryId : ', categoryId)
            const result = this.posts.filter(item => {
                return item.categories == categoryId
            })
            this.result = result
            console.log('result : ', result)
        }
    }
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
#dropdownMenuButton1 {
    background-color: #fff;
    color: black;
}
</style>