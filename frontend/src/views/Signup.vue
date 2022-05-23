<template>
    <div class="container">
        <h3 class="mt-5 fw-bold">ลงทะเบียน</h3>
        <div class="row">
            <div class="col-lg-6 styles">
                <!-- <h1 class="title">How To</h1> -->
                <img class="img-fluid" src="../assets/how_to.png" />
                <p class="fw-normal text">แหล่งรวบรวมการทำ How To สิ่งต่าง ๆ ในโลกใบนี้</p>
            </div>
            <div class="col-lg-6">
                <div class="m-auto">
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
                                type="password"
                                placeholder="8-20 ตัวอักษร ต้องมีตัวเลข และอักขระพิเศษด้วย"
                                for="password"
                                v-model="singup.password"
                            />
                        </div>
                        <div class="mt-3">
                            <label class="form-lable mb-1">Confirm Password</label>
                            <input
                                class="form-control input"
                                type="password"
                                placeholder="Confirm Password"
                                for="confirm_passeord"
                                v-model="singup.confirm_passeord"
                            />
                        </div>
                        <div class="d-grid">
                            <button id="button" class="btn btn-outline-primary my-4" type="submit">ลงทะเบียน</button>
                            <a class="text-center">
                                <router-link class="nav-link" to="/signin">มี Account แล้ว ต้องการเข้าสู่ระบบ</router-link>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
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
            data_user: null
            // singup_success: false,
        }
    },
    methods: {
        async createUserToDB() {
            let date = new Date()
            await axios({
                method: 'post',
                url: 'https://jdnyq8ax81.execute-api.us-east-1.amazonaws.com/api/users/create-user',
                data: {
                    email: this.singup.email,
                    first_name: this.singup.first_name,
                    last_name: this.singup.last_name,
                    username: this.singup.username,
                    password: this.singup.password,
                    createAt: date,
                    updateAt: ''
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
            if (
                this.singup.first_name == '' ||
                this.singup.last_name == '' ||
                this.singup.email == '' ||
                this.singup.username == '' ||
                this.singup.password == '' ||
                this.singup.confirm_passeord == ''
            ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'กรุณากรอกข้อมูล!!!'
                })
            }
            if (this.singup.confirm_passeord != this.singup.password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่'
                })
                this.singup.confirm_passeord = ''
            }
            if (
                this.singup.first_name != '' &&
                this.singup.last_name != '' &&
                this.singup.email != '' &&
                this.singup.username != '' &&
                this.singup.password != '' &&
                this.singup.confirm_passeord == this.singup.password
            ) {
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
                        this.createUserToDB()
                        this.$router.push('/signup/confirm-code')
                    }
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
.title {
    font-size: 120px;
    font-weight: bold;
}
.styles {
    margin-top: 100px;
}
.text {
    padding-left: 30px;
}
@media only screen and (max-width: 600px) {
    .title {
        font-size: 40px;
    }
    .styles {
        margin-top: 0px;
    }
}
@media only screen and (max-width: 900px) {
    .title {
        font-size: 60px;
    }
    .styles {
        margin-top: 0px;
    }
    .text {
        padding-left: 0px;
    }
}
</style>