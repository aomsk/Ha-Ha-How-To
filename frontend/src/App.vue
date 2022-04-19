<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <!-- <a class="navbar-brand" href="#">How To</a> -->
            <a class="navbar-brand" href="/">
                <img
                    src="../public/H-Logo-removebg.png"
                    alt
                    width="37"
                    height="31"
                    class="d-inline-block align-text-top"
                />
                How To
            </a>
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

            <!-- <div class="collapse navbar-collapse" id="navbarNav">
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
                        <li class="nav-item my_accouunt">
                            <router-link class="nav-link" to="/my-account">บัญชีของฉัน</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-danger" href="#" @click="signOut()">ออกจากระบบ</a>
                        </li>
                    </template>
                </ul>
            </div>-->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">หน้าแรก</router-link>
                    </li>
                    <!-- <template v-if="!isAuthen">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/signin">เข้าสู่ระบบ</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/signup">ลงทะเบียน</router-link>
                        </li>
                    </template>-->
                    <template v-if="isAuthen">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/create-post">สร้างโพส How To</router-link>
                        </li>
                        <!-- <li class="nav-item my_accouunt">
                            <router-link class="nav-link" to="/my-account">บัญชีของฉัน</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-danger" href="#" @click="signOut()">ออกจากระบบ</a>
                        </li>-->
                    </template>
                </ul>
                <ul class="navbar-nav">
                    <template v-if="!isAuthen">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/signin">เข้าสู่ระบบ</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/signup">ลงทะเบียน</router-link>
                        </li>
                    </template>
                    <template v-if="isAuthen">
                        <li class="nav-item my_accouunt">
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
import Swal from 'sweetalert2'

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
.my_accouunt {
    justify-content: flex-end;
}
</style>
