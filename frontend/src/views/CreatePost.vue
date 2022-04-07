<template>
    <div>
        <h1>Create Post</h1>
        <form @submit.prevent="createPost()">
            <div>
                <label class="form-lable mb-1">Title</label>
                <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="ตั้งขื่อ How To กันเถอะ"
                    for="title"
                    v-model="post.title"
                />
            </div>
            <div class="mb-3">
                <label for="formFileMultiple" class="form-label">Upload imags</label>
                <input class="form-control" type="file" multiple />
            </div>
            <div class="btn-toolbar ml-2" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group me-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary">B</button>
                    <button type="button" class="btn btn-primary"></button>
                    <button type="button" class="btn btn-primary">3</button>
                    <button type="button" class="btn btn-primary">4</button>
                </div>
                <!-- <div class="btn-group me-2" role="group" aria-label="Second group">
                    <button type="button" class="btn btn-secondary">5</button>
                    <button type="button" class="btn btn-secondary">6</button>
                    <button type="button" class="btn btn-secondary">7</button>
                </div>
                <div class="btn-group" role="group" aria-label="Third group">
                    <button type="button" class="btn btn-info">8</button>
                </div> -->
            </div>
            <div class="mb-3">
                <label for class="form-label">Content</label>
                <textarea class="form-control" rows="3"></textarea>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    data() {
        return {
            post: {
                title: '',
                content: ''
            }
        }
    }
    // methods: {
    //     createPost() {

    //     },
    // }
}
</script>

<style>
</style>