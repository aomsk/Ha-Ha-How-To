<template>
    <!-- <nav>
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>|
    </nav>-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">How To</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">หน้าแรก</router-link>
                    </li>
                    <template v-if="!isAuthen">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/signin">เข้าสู่ระบบ</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/signup">ลงทะเบียน</router-link>
                        </li>
                    </template>
                    <template v-if="isAuthen">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/create-post">สร้างโพส How To</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/my-account">บัญชีของฉัน</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-danger" href="#" @click="signOut()">ออกจากระบบ</a>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <router-view :key="$route.fullPath" @authen-user="onAuthChange()"></router-view>
    </div>
</template>

<script>
import UserPool from '../src/config/UserPool'
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            isAuthen: false
        }
    },
    methods: {
        onAuthChange() {
            const token = localStorage.getItem('token')
            if (token) {
                this.isAuthen = true
            }
            console.log('this.isAuthen: ', this.isAuthen)
        },
        signOut() {
            const user = UserPool.getCurrentUser()
            if (user) {
                user.signOut()
                console.log('user: ', user)
                localStorage.clear()
                // Swal.fire({
                //     title: 'ออกจากระบบสำเร็จ',
                //     icon: 'success',
                //     // confirmButtonText: 'OK'
                //     showConfirmButton: false,
                //     timer: 2000,
                // })
                window.location.reload()
            }
        }
    },
    created() {
        const token = localStorage.getItem('token')
        if (token) {
            this.isAuthen = true
        }
        console.log('this.isAuthen: ', this.isAuthen)
    }
}
</script>
<style>
</style>
