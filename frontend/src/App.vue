<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
        <!-- <div class="container-fluid"> -->
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
                            <router-link class="nav-link" to="/categories">สร้างโพสต์ How To</router-link>
                        </li>
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
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >{{ username }}</a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <a class="dropdown-item" href="/my-account">บัญชีของฉัน</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/edit-profile">แก้ไขโปรไฟล์</a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li>
                                    <a class="dropdown-item" @click="signOut()">ออกจากระบบ</a>
                                </li>
                            </ul>
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
import axios from 'axios'

export default {
    data() {
        return {
            isAuthen: false,
            userData: null,
            username: ''
        }
    },
    mounted() {
        this.onAuthChange()
    },
    created() {
        const token = localStorage.getItem('token')
        if (token) {
            this.isAuthen = true
        }
        this.$store.commit('setAuthen', this.isAuthen)
    },
    methods: {
        onAuthChange() {
            const token = localStorage.getItem('token')
            if (token) {
                this.isAuthen = true
                this.getUser()
            }
            console.log('this.isAuthen: ', this.isAuthen)
        },
        getUser() {
            axios
                .get(process.env.VUE_APP_GET_USER_BY_EMAIL, {
                    params: {
                        email: localStorage.getItem('email_user')
                    }
                })
                .then(response => {
                    this.userData = response.data
                    this.username = this.userData.username
                    localStorage.setItem('userId', this.userData.userId)
                    localStorage.setItem('username', this.userData.username)
                    // console.log('this.userData: ', this.userData);
                })
        },
        signOut() {
            Swal.fire({
                title: 'คุณต้องการออกจากระบบใช่มั้ย ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ออกจากระบบ',
                cancelButtonText: 'ยกเลิก'
            }).then(result => {
                if (result.isConfirmed) {
                    const user = UserPool.getCurrentUser()
                    if (user) {
                        user.signOut()
                        console.log('user: ', user)
                        localStorage.clear()
                        setInterval(() => {
                            window.location.reload()
                        }, 1000)
                    }
                }
            })
        }
    }
}
</script>
<style>
.my_accouunt {
    justify-content: flex-end;
}
</style>
