<template>
    <div class="container">
        <h3 class="mt-5">เข้าสู่ระบบ</h3>
        <div class="col-lg-5 m-auto">
            <form @submit.prevent="submitSignin()">
                <div>
                    <label class="form-lable mb-1">Email</label>
                    <input
                        class="form-control"
                        type="email"
                        placeholder="example@gmail.com"
                        for="email"
                        v-model="signin.email"
                    />
                    <!-- :class="{ 'is-invalid': v$.signin.email.$error }" -->
                    <!-- <div v-if="v$.signin.password.$error" class="my-2 text-danger">กรุณากรอกอีเมล</div> -->
                </div>
                <div class="mt-4">
                    <label class="form-lable mb-1">Password</label>
                    <input
                        class="form-control"
                        type="password"
                        placeholder="password"
                        for="password"
                        v-model="signin.password"
                    />
                </div>
                <div class="d-grid">
                    <button class="btn btn-success my-4" type="submit">เข้าสู่ระบบ</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// import useVuelidate from '@vuelidate/core'
// import { required, email } from '@vuelidate/validators'
import Swal from 'sweetalert2'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import UserPool from '../config/UserPool'

export default {
    // setup() {
    //     return {
    //         v$: useVuelidate()
    //     }
    // },
    data() {
        return {
            signin: {
                email: '',
                password: ''
            },
            signInSuccess: false
        }
    },
    methods: {
        submitSignin() {
            if (this.signin.email == '' || this.signin.password == '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter email or password!!!'
                })
            }
            if (this.signin.email != '' || this.signin.password != '') {
                const user = new CognitoUser({
                    Username: this.signin.email,
                    Pool: UserPool
                })

                const authDeteils = new AuthenticationDetails({
                    Username: this.signin.email,
                    Password: this.signin.password
                })

                user.authenticateUser(authDeteils, {
                    onSuccess: data => {
                        // this.signInSuccess = true
                        console.log('onSuccess: ', data)
                    },
                    onFailure: err => {
                        console.log('onFailure : ', err)
                    },
                    newPasswordRequired: data => {
                        console.log('newPasswordRequired: ', data)
                    }
                })
            }
            // if (this.signInSuccess === true) {
            //     Swal.fire({
            //         title: 'เข้าสู่ระบบสำเร็จ',
            //         icon: 'success',
            //         // confirmButtonText: 'OK'
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            //     this.$router.push('/')
            // }
        }
    }
    // validations() {
    //     return {
    //         email: { required, email },
    //         password: { required, password }
    //     }
    // }
}
</script>

<style>
</style>