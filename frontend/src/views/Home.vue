<template>
    <div class="container">
        <!-- <form @submit.prevent="submitSearch()"> -->
            <div class="row mt-3">
                <div class="col-lg-8 col-12">
                    <label class="form-lable">ค้นหาโพสต์ How To</label>
                    <input
                        class="form-control input"
                        type="text"
                        placeholder="search by title"
                        for="search"
                        v-model="search"
                    />
                </div>
                <div class="col-lg-4 mt-4">
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
                                    @click="searchByCategory(category.categoryId, category.title)"
                                >{{ category.title }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        <!-- </form> -->
        <div v-if="result == ''">
            <div class="row mt-3">
                <h3>มีโพสต์ทั้งหมด {{ filteredPost.length }} โพสต์</h3>
                <div class="col-lg-4" v-for="(post, index) in filteredPost || []" :key="index">
                    <div class="card mt-3 p-2" id="card">
                        <div class="card-body">
                            <h6 class="card-title">
                                <strong>{{ post.title }}</strong>
                            </h6>
                            <p class="card-text">{{ new Date(post.createAt).toLocaleString() }}</p>
                            <div class="d-flex justify-content-end">
                                <router-link v-bind:to="'/post/' + post.postId">
                                    <button id="button" class="btn btn-outline-dark">
                                        อ่านต่อ <font-awesome-icon icon="angles-right" />
                                    </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="result != ''">
            <div class="row mt-3">
                <h3>หมวดหมู่ "{{ selectedCategory }}" มี {{ result.length }} โพสต์</h3>
                <div class="col-lg-4" v-for="(item, index) in result" :key="index">
                    <div class="card mt-3 p-2" id="card">
                        <div class="card-body">
                            <h6 class="card-title">
                                <strong>{{ item.title }}</strong>
                            </h6>
                            <p class="card-text">{{ new Date(item.createAt).toLocaleString() }}</p>
                            <div class="d-flex justify-content-end">
                                <router-link v-bind:to="'/post/' + item.postId">
                                    <button id="button" class="btn btn-outline-dark">
                                        อ่านต่อ <font-awesome-icon icon="angles-right" />
                                    </button>
                                </router-link>
                            </div>
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
            posts: [],
            // id: '',
            search: '',
            categories: '',
            result: '',
            selectedCategory: '',
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
                // this.posts = response.data
                const posts = response.data
                const sortByDateResult = posts => {
                    const sorter = (a, b) => {
                        return new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
                    }
                    posts.sort(sorter)
                }
                sortByDateResult(posts)
                this.posts = posts.reverse()
            })
            .catch(error => {
                console.log(error)
            })
    },
    computed: {
        filteredPost() {
            return this.posts.filter((post) => {
                return post.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: {
        searchByCategory(categoryId, categoryName) {
            const result = this.posts.filter(item => {
                return item.categories == categoryId
            })
            this.result = result
            this.selectedCategory = categoryName
            if (this.result == '') {
                Swal.fire({
                    title: 'ไม่มีโพสต์ในหมวดหมู่นี้',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
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
    /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
    /* border: 1.5px solid #5AC1C4;
    color: #5AC1C4; */
}
#dropdownMenuButton1 {
    background-color: #fff;
    color: black;
}
.input {
    border-radius: 10px;
}
#dropdownMenuButton1 {
    border-radius: 10px;
}
/* #button:hover {
    cursor: pointer;
    background-color: #5AC1C4;
    color: #fff;
    border: #5AC1C4;
    margin: auto;
} */
</style>