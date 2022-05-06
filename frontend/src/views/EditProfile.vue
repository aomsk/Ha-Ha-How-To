<template>
    <div class="container">
        <h1>Edit Profile</h1>
        <div class="col-lg-5 m-auto">
            <form @submit.prevent="submitEditProfile()">
                <div class="row">
                    <div class="col-lg-6">
                        <label class="form-lable mb-1">First Name</label>
                        <input
                            class="form-control input"
                            type="text"
                            placeholder="John"
                            for="first_name"
                            v-model="profile.first_name"
                        />
                    </div>
                    <div class="col-lg-6">
                        <label class="form-lable mb-1">Last Name</label>
                        <input
                            class="form-control input"
                            type="text"
                            placeholder="Doe"
                            for="last_name"
                            v-model="profile.last_name"
                        />
                    </div>
                </div>
                <div class="mt-3">
                    <label class="form-lable mb-1">Username</label>
                    <input
                        class="form-control input"
                        type="text"
                        placeholder="username"
                        for="username"
                        v-model="profile.username"
                    />
                </div>
                <div class="d-grid">
                    <button id="button" class="btn btn-outline-success my-4" type="submit">บันทีก</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            profile: {
                first_name: '',
                last_name: '',
                username: ''
            },
            userData: []
        }
    },
    created() {
        axios
            .get(process.env.VUE_APP_GET_USER_BY_EMAIL, {
                params: {
                    email: localStorage.getItem('email_user')
                }
            })
            .then(response => {
                this.userData = response.data
                this.profile.first_name = this.userData.first_name
                this.profile.last_name = this.userData.last_name
                this.profile.username = this.userData.username
            })
    },
    methods: {
        async submitEditProfile() {
            if (this.profile.first_name !== this.userData.first_name) {
                const data = {
                    email: this.userData.email,
                    updateKey: 'first_name',
                    updateValue: this.profile.first_name
                }
                console.log('data : ', data)

                axios({
                    method: 'patch',
                    url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/users/edit-user',
                    data: data,
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    console.log(response.data)
                    Swal.fire({
                        title: 'บันทึกข้อมูลสำเร็จ',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.log(error.response.data)
                })
            }
            if (this.profile.last_name !== this.userData.last_name) {
                const data = {
                    email: this.userData.email,
                    updateKey: 'last_name',
                    updateValue: this.profile.last_name
                }
                console.log('data : ', data)

                axios({
                    method: 'patch',
                    url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/users/edit-user',
                    data: data,
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    console.log(response.data)
                    Swal.fire({
                        title: 'บันทึกข้อมูลสำเร็จ',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.log(error.response.data)
                })
            }
            if (this.profile.username !== this.userData.username) {
                const data = {
                    email: this.userData.email,
                    updateKey: 'username',
                    updateValue: this.profile.username
                }
                console.log('data : ', data)

                axios({
                    method: 'patch',
                    url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/users/edit-user',
                    data: data,
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    console.log(response.data)
                    Swal.fire({
                        title: 'บันทึกข้อมูลสำเร็จ',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.log(error.response.data)
                })
            }
        }
    }
}
</script>

<style>
#button {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.input {
    border-radius: 10px;
}
</style>