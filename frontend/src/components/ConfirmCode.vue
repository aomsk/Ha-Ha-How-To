<template>
    <div class="container">
        <h3 class="mt-5">Confirm Account</h3>
        <div class="col-lg-5 m-auto">
            <form @submit.prevent="confirmCode()">
                <div class="mt-3">
                    <label class="form-lable mb-1">Code</label>
                    <input class="form-control" type="text" for="password" v-model="code" />
                </div>
                <div class="d-grid">
                    <button class="btn btn-success my-4">Confirm Account</button>
                </div>
            </form>
            <div class="d-grid">
                <button class="btn btn-outline-secondary" @click="resendCode()">Resend Code</button>
            </div>
        </div>
    </div>
</template>

<script>
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import UserPool from '../config/UserPool'
import Swal from 'sweetalert2'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
export default {
    data() {
        return {
            code: '',
            callback: false
        }
    },
    methods: {
        confirmCode() {
            var userData = {
                Username: localStorage.getItem('email_user_signup'),
                Pool: UserPool
            }
            console.log('confirmation code for ' + userData.Username + ': ' + this.code)
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

            cognitoUser.confirmRegistration(this.code, true, (err, result) => {
                if (!this.callback) {
                    this.callback = true
                    console.log('confirm callback')
                    if (err) {
                        console.log(err)
                        // console.log('confirmation error: ' + JSON.stringify(err))
                        // this.errcode = JSON.stringify(err.code)
                    } else {
                        console.log('confirmation success: ' + JSON.stringify(result))
                        Swal.fire({
                            title: 'Confirm Account สำเร็จ',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            showConfirmButton: true
                            // timer: 1500
                        }).then(result => {
                            if (result.isConfirmed) {
                                this.$router.push('/signin')
                            }
                        })
                    }
                }
            })
        },
        async resendCode() {
            var userData = {
                Username: localStorage.getItem('email_user_signup'),
                Pool: UserPool
            }
            console.log('confirmation code for ' + userData.Username + ': ' + this.code)
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

            console.log(cognitoUser)
            console.log('resendCode')

            new Promise((resolve, reject) => {
                cognitoUser.resendConfirmationCode((error, result) => {
                    if (error) {
                        console.log('error')
                        console.log(error)
                        reject(error)
                    } else {
                        console.log('result')
                        console.log(result)
                        resolve(result)
                    }
                })
            })
        }
    }
}
</script>

<style></style>
