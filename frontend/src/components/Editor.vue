<template>
    <div v-if="editor">
        <button
            @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="bold" />
        </button>
        <button
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="italic" />
        </button>
        <!-- <button
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
        >paragraph</button>-->
        <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="1" />
        </button>

        <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="2" />
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="3" />
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="4" />
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="5" />
        </button>
        <button
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
            class="btn btn-outline-secondary m-1"
        >
            <font-awesome-icon icon="heading" />
            <font-awesome-icon icon="6" />
        </button>
        <button
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }"
            class="btn btn-outline-secondary m-1"
        >
        <font-awesome-icon icon="list" />
        </button>
        <button
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
            class="btn btn-outline-secondary m-1"
        >
        <font-awesome-icon icon="list-numeric" />
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()" class="btn btn-outline-secondary m-1">
            <font-awesome-icon icon="ruler-horizontal" />
        </button>
        <!-- <button @click="editor.chain().focus().setHardBreak().run()">hard break</button> -->
        <button @click="editor.chain().focus().undo().run()" class="btn btn-outline-secondary m-1">
            <font-awesome-icon icon="rotate-left" />
        </button>
        <button @click="editor.chain().focus().redo().run()" class="btn btn-outline-secondary m-1">
             <font-awesome-icon icon="rotate-right" />
        </button>
    </div>
    <editor-content :editor="editor"/>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
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
            editor: null
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
            extensions: [StarterKit],
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
    }
}
</script>
<style lang="scss">
/* Basic editor styles */

</style>