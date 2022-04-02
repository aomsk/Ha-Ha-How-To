<template>
    <!-- <nav>
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>|
    </nav>-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
                        <router-link class="nav-link" to="/">
                            หน้าแรก
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/signin">
                            เข้าสู่ระบบ
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/signup">
                            ลงทะเบียน
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/create-post">
                            สร้างโพส How To
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/my-account">
                            บัญชีของฉัน
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <router-view />
    </div>
</template>

<style>
</style>
