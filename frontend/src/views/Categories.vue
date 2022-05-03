<template>
    <div>
        <h1>Categories</h1>
        <h4>เลือกหมวดหมู่ของ How To</h4>
        <!-- <h5>list_categorise NAME : {{ $store.state.list_categoryName }}</h5>
        <h5>list_categorise ID : {{ $store.state.list_categoryId }}</h5> -->
        <div class="d-flex justify-content-start">
            <div id="card_selected_category" class="m-1 card p-1" v-for="(item, index) in $store.state.list_categoryName" :key="index">
                <p class="m-1">{{ item }}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3 col-sm-6" v-for="(category, index) in categories" :key="index">
                <a @click="setCategory(category.categoryId, category.title)">
                    <div class="card mt-3 p-3 card_category" id="card" :class="seleted == category.title ? 'selected_category' : 'unselect_category'">
                        <div class="card-body" >
                            <!-- <div v-if="seleted == category.title">

                            </div> -->
                            <h6 class="card-title text-center"><strong>{{ category.title }}</strong></h6>
                        </div>
                        <!-- <a @click="setCategory()" class="btn btn-outline-primary">เลือก</a> -->
                    </div>
                </a>
            </div>
        </div>
        <div class="text-end mt-3">
            <router-link to="/create-post/">
                <button id="button" class="btn btn-outline-primary m-2">Next To Create Post</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            idToken: localStorage.getItem('token'),
            categories: '',
            list_category: [],
            list_categoryId: [],
            seleted: ''
        }
    },
    created() {
        axios
            // .get('http://howtocrud-env.eba-p33xseme.us-east-1.elasticbeanstalk.com/categories/all')
            .get('https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/categories/all')
            .then(response => {
                this.categories = response.data.categories
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
        setCategory(categoryId, categoryName) {
            if (this.list_category.length == 0) {
                this.list_category.push(categoryName)
                this.list_categoryId.push(categoryId)
                this.seleted = categoryName
            }
            else if (this.list_category.indexOf(categoryName) != -1) {
                const index = this.list_category.indexOf(categoryName)
                this.list_category.splice(index, 1)
                this.list_categoryId.splice(index, 1)
                this.seleted = ''
            }

            this.$store.commit('setListCategoriesId', this.list_categoryId)
            this.$store.commit('setListCategoriesName', this.list_category)
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
.card_category:hover {
    cursor: pointer;
    background-color: #5AC1C4;
    color: #fff;
    border: none;
}
#card_selected_category {
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #5AC1C4;
    color: #fff;
}
.selected_category {
    /* background-color: #424242; */
    background-color: #5AC1C4;
    color: #fff;
}
.unselect_category {
    background-color: #fff;
    /* color: #fff; */
}
</style>
