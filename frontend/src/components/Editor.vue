<template>
    <div v-if="editor" class="controls">
        <button
            id="button_editor"
            @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold')}"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="bold" />
        </button>
        <button
            id="button_editor"
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic')}"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="italic" />
        </button>
        <button
            id="button_editor"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="1" />
        </button>

        <button
            id="button_editor"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 })}"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="2" />
        </button>
        <button
            id="button_editor"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 })}"
            v-on:click="clickedH3 = !clickedH3"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="3" />
        </button>
        <button
            id="button_editor"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="4" />
        </button>
        <button
            id="button_editor"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 })}"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="5" />
        </button>
        <button
            id="button_editor"
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 })}"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="6" />
        </button>
        <button
            id="button_editor"
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="list" />
        </button>
        <button
            id="button_editor"
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="list-numeric" />
        </button>
        <button
            id="button_editor"
            class="btn btn-outline-secondary m-1"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        >
            <font-awesome-icon icon="image" />
        </button>
        <!-- <button 
            id="button_editor"
            class="btn btn-outline-secondary m-1"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
        >
            add iframe
        </button> -->
        <button
            id="button_editor"
            @click="editor.chain().focus().setHorizontalRule().run()"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="ruler-horizontal" />
        </button>
        <!-- <button @click="editor.chain().focus().setHardBreak().run()">hard break</button> -->
        <button id="button_editor" @click="editor.chain().focus().undo().run()" class="btn btn-outline-secondary m-1">
            <font-awesome-icon icon="rotate-left" />
        </button>
        <button id="button_editor" @click="editor.chain().focus().redo().run()" class="btn btn-outline-secondary m-1">
            <font-awesome-icon icon="rotate-right" />
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upload Image</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <input
                                type="file"
                                class="form-control"
                                aria-label="file example"
                                accept="image/jpeg, image/png, image/jpg"
                                @change="onFileSelected"
                                required
                            />
                            <div class="invalid-feedback">Example invalid form file feedback</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            id="button"
                            class="btn btn-outline-secondary"
                            data-bs-dismiss="modal"
                        >Close</button>
                        <button
                            type="button"
                            id="button"
                            class="btn btn-outline-primary"
                            @click="onUpload()"
                        >Upload Image</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Video -->
        <!-- <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upload Video</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <input
                                type="file"
                                class="form-control"
                                aria-label="file example"
                                accept="video/*"
                                @change="onFileVideoSelected"
                                required
                            />
                            <div class="invalid-feedback">Example invalid form file feedback</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            id="button"
                            class="btn btn-outline-secondary"
                            data-bs-dismiss="modal"
                        >Close</button>
                        <button
                            type="button"
                            id="button"
                            class="btn btn-outline-primary"
                            @click="onUploadVideo()"
                        >Upload Video</button>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
    <editor-content :editor="editor" class="mt-2 mb-3" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// import iframe from './Iframe'
import axios from 'axios'
import Swal from 'sweetalert2'
import Image from '@tiptap/extension-image'

export default {
    components: {
        EditorContent
    },
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            editor: null,
            selectedFile: null,
            selectedVideoFile: null,
            image: '',
            imageName: '',
            listImages: [],
            video: '',
            videoName: ''
        }
    },
    watch: {
        modelValue(value) {
            // HTML
            const isSame = this.editor.getHTML() === value
            // JSON
            // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
            if (isSame) {
                return
            }
            this.editor.commands.setContent(value, false)
        }
    },
    mounted() {
        this.editor = new Editor({
            extensions: [StarterKit, Image],
            content: this.modelValue,
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.editor.getHTML())
                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            }
        })
    },
    beforeUnmount() {
        this.editor.destroy()
    },
    methods: {
        // async onUploadVideo() {
        //     if (this.selectedVideoFile == null) {
        //         Swal.fire({
        //             title: 'กรุณาเลือกวิดีโอ',
        //             icon: 'warning',
        //             // confirmButtonText: 'OK'
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //     } else {
        //         const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        //         let fd = new FormData()
        //         fd.append('file', this.selectedVideoFile)
        //         await axios
        //             .post('http://uploadimage-env.eba-xmegyc33.us-east-1.elasticbeanstalk.com/upload-image-post', fd, config)
        //             // .post('http://localhost:3002/upload-image-post', fd, config)
        //             .then(response => {
        //                 console.log(response.data)
        //                 this.video = response.data.location
        //                 this.videoName = response.data.originalname
        //                 this.selectedVideoFile = null
        //                 Swal.fire({
        //                     title: 'อัปโหลดวิดีโอสำเร็จ',
        //                     icon: 'success',
        //                     // confirmButtonText: 'OK'
        //                     showConfirmButton: false,
        //                     timer: 1500
        //                 })
        //             })
        //             .catch(error => {
        //                 console.log(error)
        //             })
        //         if (this.video) {
        //             this.listImages.push(this.imageName)
        //             // this.editor.chain().focus().setImage({ src: this.image }).run()
        //             this.editor.chain().focus().setIframe({ src: 'https://how-to-post-images.s3.amazonaws.com/2022-05-20%2009-03-49.mp4' }).run()
        //         }
        //         this.$store.commit('setListImage', this.listImages)
        //         console.log('this.listImages: ', this.listImages);
        //         console.log('this.$store.state.list_image : ', this.$store.state.list_image);
        //     }
        // },
        // onFileVideoSelected(event) {
        //     this.selectedVideoFile = event.target.files[0]
        //     console.log(this.selectedVideoFile)
        // },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
            console.log(this.selectedFile)
        },

        async onUpload() {
            if (this.selectedFile == null) {
                Swal.fire({
                    title: 'กรุณาเลือกรูปภาพ',
                    icon: 'warning',
                    // confirmButtonText: 'OK'
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                const config = { headers: { 'Content-Type': 'multipart/form-data' } }
                let fd = new FormData()
                fd.append('file', this.selectedFile)
                await axios
                    .post('http://uploadimage-env.eba-xmegyc33.us-east-1.elasticbeanstalk.com/upload-image-post', fd, config)
                    // .post('http://localhost:3002/upload-image-post', fd, config)
                    .then(response => {
                        console.log(response.data)
                        this.image = response.data.location
                        this.imageName = response.data.originalname
                        this.selectedFile = null
                        Swal.fire({
                            title: 'อัปโหลดรูปภาพสำเร็จ',
                            icon: 'success',
                            // confirmButtonText: 'OK'
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
                if (this.image) {
                    this.listImages.push(this.imageName)
                    this.editor.chain().focus().setImage({ src: this.image }).run()
                }
                this.$store.commit('setListImage', this.listImages)
                console.log('this.listImages: ', this.listImages);
                console.log('this.$store.state.list_image : ', this.$store.state.list_image);
            }
        },
    }
}
</script>
<style lang="scss">
/* Basic editor styles */
.ProseMirror {
    margin-top: 0.75em;
    padding: 20px;
    height: auto;
    border-radius: 10px;
    border: solid 1px #bdbdbd;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
#button {
    border-radius: 25px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

#button_editor {
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.is-active {
    background-color: #424242;
    color: #fff;
}
</style>