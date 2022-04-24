<template>
    <div class="container">
        <h3 class="mt-5">ลงทะเบียน</h3>
        <div class="col-lg-5 m-auto">
            <form @submit.prevent="submitSignup()">
                <div class="row">
                    <div class="col-lg-6">
                        <label class="form-lable mb-1">First Name</label>
                        <input
                            class="form-control input"
                            type="first_name"
                            placeholder="John"
                            for="first_name"
                            v-model="singup.first_name"
                        />
                    </div>
                    <div class="col-lg-6">
                        <label class="form-lable mb-1">Last Name</label>
                        <input
                            class="form-control input"
                            type="last_name"
                            placeholder="Doe"
                            for="last_name"
                            v-model="singup.last_name"
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
                        v-model="singup.username"
                    />
                </div>
                <div class="mt-3">
                    <label class="form-lable mb-1">Email</label>
                    <input
                        class="form-control input"
                        type="email"
                        placeholder="example@gmail.com"
                        for="email"
                        v-model="singup.email"
                    />
                </div>
                <div class="mt-3">
                    <label class="form-lable mb-1">Password</label>
                    <input
                        class="form-control input"
                        type="text"
                        placeholder="8-20 ตัวอักษร"
                        for="password"
                        v-model="singup.password"
                    />
                </div>
                <!-- <div class="mt-3">
                    <label class="form-lable mb-1">Confirm Password</label>
                    <input
                        class="form-control input"
                        type="password"
                        placeholder="Confirm Password"
                        for="confirm_passeord"
                        v-model="singup.confirm_passeord"
                    />
                </div>-->
                <div class="d-grid">
                    <button id="button" class="btn btn-outline-primary my-4" type="submit">ลงะทเบียน</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import UserPool from '../config/UserPool'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            singup: {
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                password: '',
                confirm_passeord: ''
            },
            data_user: null,
            // singup_success: false,
        }
    },
    methods: {
        async postUserToDB() {
            await axios({
                method: 'post',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/user/',
                data: {
                    email: this.singup.email,
                    first_name: this.singup.first_name,
                    last_name: this.singup.last_name,
                    username: this.singup.username,
                    password: this.singup.password
                }
            })
                .then(response => {
                    console.log(response.data)
                    // Swal.fire({
                    //     title: 'ลงทะเบียนสำเร็จ',
                    //     icon: 'success',
                    //     // confirmButtonText: 'OK'
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // })
                    // this.$router.push('/signin')
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        },

        submitSignup() {
            // this.$router.push('/confirm-code')
            if (this.singup.first_name == '' || this.singup.last_name == '' || this.singup.email == '' || this.singup.username == '' || this.singup.password == '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'กรุณากรอกข้อมูล!!!'
                })
            }
            if (this.singup.first_name != '' || this.singup.last_name != '' || this.singup.email != '' || this.singup.username != '' || this.singup.password != '') {
                localStorage.setItem('email_user_signup', this.singup.email)

                let attributeList = [
                    new CognitoUserAttribute({
                        Name: 'email',
                        Value: this.singup.email
                    })
                ]
                UserPool.signUp(this.singup.email, this.singup.password, attributeList, null, (err, data) => {
                    if (err) {
                        console.log('err : ', err)
                    } else {
                        console.log('data : ', data)
                        this.postUserToDB()
                        this.$router.push('/signup/confirm-code')
                    }
                })
            }
        },
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