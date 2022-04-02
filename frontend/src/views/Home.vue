<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6" v-for="post in posts" :key="post.id">
                <div class="card mt-5">
                    <div class="card-body">
                        <h4 class="card-title">{{ post.title }}</h4>
                        <a class="btn btn-dark">อ่านต่อ</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [
                {
                    id: '1',
                    title: 'How To ทำแกงเขียวหวานอย่างไรให้อร่อยสุดๆ'
                },
                {
                    id: '2',
                    title: 'How To แต่งสวนสไตล์ญี่ปุ่น'
                },
                {
                    id: '3',
                    title: 'How To ตัดผมหน้าม้าด้วยตนเองงงง'
                },
                {
                    id: '4',
                    title: 'How To จัดห้องให้ไม่รก สไตล์มินิมอลล'
                }
            ]
        }
    }
}
</script>

<style>
</style>