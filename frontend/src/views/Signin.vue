<template>
    <div class="container">
        <h3 class="mt-5">เข้าสู่ระบบ</h3>
        <div class="col-lg-5 m-auto">
            <!-- <div class="card p-3" id="card"> -->
            <form @submit.prevent="submitSignin()">
                <div>
                    <label class="form-lable mb-1">Email</label>
                    <input
                        class="form-control input"
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
                        class="form-control input"
                        type="password"
                        placeholder="password"
                        for="password"
                        v-model="signin.password"
                    />
                </div>
                <div class="d-grid">
                    <button id="button" class="btn btn-outline-success my-4" type="submit">เข้าสู่ระบบ</button>
                </div>
            </form>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
// import useVuelidate from '@vuelidate/core'
// import { required, email } from '@vuelidate/validators'
import Swal from 'sweetalert2'
import axios from 'axios'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import UserPool from '../config/UserPool'

export default {
    // setup() {
    //     return {
    //         v$: useVuelidate()
    //     }
    // },
    emits: ['authen-user'],
    data() {
        return {
            signin: {
                email: '',
                password: ''
            },
            userData: '',
            signInSuccess: false,
            error: false
        }
    },
    methods: {
        async submitSignin() {
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
                        localStorage.setItem('token', data.getIdToken().getJwtToken())
                        // this.$store.commit('setEmail', this.signin.email)
                        localStorage.setItem('email_user', this.signin.email)
                        console.log('onSuccess: ', data)
                        // this.signInSuccess = true
                        this.$emit('authen-user')
                        Swal.fire({
                            title: 'เข้าสู่ระบบสำเร็จ',
                            icon: 'success',
                            // confirmButtonText: 'OK'
                            showConfirmButton: false,
                            timer: 1500
                        })
                        // if (this.signin.email != '') {
                        //     axios.get(process.env.VUE_APP_GET_USER_BY_EMAIL, {
                        //             params: {
                        //                 email: this.signin.email
                        //             }
                        //         })
                        //         .then(response => {
                        //             let list = []
                        //             list.push(response.data)
                        //             this.userData = list
                        //             localStorage.setItem('userId', list[0].userId)
                        //             localStorage.setItem('username', list[0].username)
                        //         })
                        //         .catch(error => {
                        //             console.log(error)
                        //         })
                        // }
                        this.$router.push('/')
                    },
                    onFailure: err => {
                        console.log('onFailure : ', err)
                        this.error = true
                        if (this.error == true) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Incorrect username or password'
                                // showConfirmButton: false,
                                // timer: 1500
                            })
                        }
                    },
                    newPasswordRequired: data => {
                        console.log('newPasswordRequired: ', data)
                    }
                })
            }
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
#card {
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin-top: 100px;
}
#button {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    /* border: 1.5px solid #5AC1C4;
    color: #5AC1C4; */
}
.input {
    border-radius: 10px;
}
</style>