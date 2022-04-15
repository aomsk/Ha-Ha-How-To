<template>
    <div>
        <h1>Account</h1>
        <!-- <h2>User Email : {{ $store.state.email_user }}</h2> -->
        <h2>User Email form localStorage : {{ user_email_localStorage }}</h2>
        <div v-for="item in userData" :key="item.userId">
            <h4>username : {{ item.username }}</h4>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userData: null,
            user_email_localStorage: ''
        }
    },
    created() {
        this.user_email_localStorage = localStorage.getItem('email_user')
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
        }).catch(error => {
            console.log(error);
        })
    }
}
</script>

<style></style>
