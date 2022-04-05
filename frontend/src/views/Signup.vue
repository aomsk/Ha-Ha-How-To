<template>
    <div class="container">
        <h3 class="mt-5">ลงทะเบียน</h3>
        <div class="col-lg-5 m-auto">
            <form @submit.prevent="submitSignup()">
                <!-- <div class="row">
                    <div class="col-lg-6">
                        <label class="form-lable mb-1">First Name</label>
                        <input class="form-control" type="first_name" placeholder="John" for="first_name" v-model="singup.first_name">
                    </div>
                    <div class="col-lg-6">
                        <label class="form-lable mb-1">Last Name</label>
                        <input class="form-control" type="last_name" placeholder="Doe" for="last_name" v-model="singup.last_name">
                    </div>
                </div>-->
                <!-- <div class="mt-3">
                    <label class="form-lable mb-1">Username</label>
                    <input class="form-control" type="text" placeholder="username" for="username" v-model="singup.username">
                </div>-->
                <div class="mt-3">
                    <label class="form-lable mb-1">Email</label>
                    <input
                        class="form-control"
                        type="email"
                        placeholder="example@gmail.com"
                        for="email"
                        v-model="singup.email"
                    />
                </div>
                <div class="mt-3">
                    <label class="form-lable mb-1">Password</label>
                    <input
                        class="form-control"
                        type="text"
                        placeholder="8-20 ตัวอักษร"
                        for="password"
                        v-model="singup.password"
                    />
                </div>
                <!-- <div class="mt-3">
                    <label class="form-lable mb-1">Confirm Password</label>
                    <input class="form-control" type="password" placeholder="Confirm Password" for="confirm_passeord" v-model="singup.confirm_passeord">
                </div>-->
                <div class="d-grid">
                    <button class="btn btn-primary my-4" type="submit">ลงะทเบียน</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
// import config from '../config';
// import CognitoAuth from '../cognito';
import UserPool from '../config/UserPool'
export default {
    data() {
        return {
            singup: {
                // first_name: '',
                // last_name: '',
                // username: '',
                email: '',
                password: ''
                // confirm_passeord: ''
            }
        }
    },
    methods: {
        submitSignup() {
            console.log(this.singup.password);
            let attributeList = [
                new CognitoUserAttribute({
                    Name: 'email',
                    Value: this.singup.email
                })
            ]
            UserPool.signUp(this.singup.email, this.singup.password, attributeList, null, (err, data) => {
                if (err) {
                    console.log(err)
                }
                console.log(data)
            })
        }
    }
}
</script>

<style>
</style>