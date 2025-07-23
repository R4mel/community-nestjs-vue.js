<template>
    <div class="post-edit" v-if="post">
        <div class="header">
            <h1>Edit Post</h1>
            <router-link :to="`/posts/${id}`" class="btn btn-secondary">← Back to Post</router-link>
        </div>

        <form @submit.prevent="updatePost" class="post-form">
            <div class="form-group">
                <label for="categoryId">Category:</label>
                <select v-model="form.categoryId" id="categoryId" required>
                    <option value="">Select a category</option>
                    <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
                        {{ category.name }} ({{ category.status }})
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="title">Title:</label>
                <input v-model="form.title" type="text" id="title" required placeholder="Enter post title"
                    maxlength="100">
            </div>

            <div class="form-group">
                <label for="content">Content:</label>
                <textarea v-model="form.content" id="content" rows="12" required
                    placeholder="Write your post content here..."></textarea>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary" :disabled="submitting">
                    {{ submitting ? 'Updating...' : 'Update Post' }}
                </button>
                <router-link :to="`/posts/${id}`" class="btn btn-secondary">Cancel</router-link>
            </div>
        </form>
    </div>

    <div v-else-if="loading" class="loading">
        Loading post...
    </div>

    <div v-else class="error">
        Post not found.
    </div>
</template>

<script>
import { postsApi, categoriesApi } from '../services/api'

export default {
    name: 'PostEdit',
    props: ['id'],
    data() {
        return {
            post: null,
            form: {
                title: '',
                content: '',
                categoryId: ''
            },
            categories: [],
            loading: false,
            submitting: false
        }
    },
    async mounted() {
        await this.loadCategories()
        await this.loadPost()
    },
    methods: {
        async loadCategories() {
            try {
                const response = await categoriesApi.getAll()
                this.categories = response.data
            } catch (error) {
                console.error('Error loading categories:', error)
            }
        },
        async loadPost() {
            this.loading = true
            try {
                const response = await postsApi.getById(this.id)
                this.post = response.data

                // Populate form with existing data
                this.form.title = this.post.title
                this.form.content = this.post.content
                this.form.categoryId = this.post.categoryId
            } catch (error) {
                console.error('Error loading post:', error)
            } finally {
                this.loading = false
            }
        },
        async updatePost() {
            if (!this.validateForm()) return

            this.submitting = true
            try {
                await postsApi.update(this.id, {
                    title: this.form.title,
                    content: this.form.content,
                    categoryId: parseInt(this.form.categoryId)
                })

                // Redirect back to the post
                this.$router.push({ name: 'PostDetail', params: { id: this.id } })
            } catch (error) {
                console.error('Error updating post:', error)
                alert('Error updating post. Please try again.')
            } finally {
                this.submitting = false
            }
        },
        validateForm() {
            if (!this.form.title.trim()) {
                alert('Please enter a title')
                return false
            }
            if (!this.form.content.trim()) {
                alert('Please enter content')
                return false
            }
            if (!this.form.categoryId) {
                alert('Please select a category')
                return false
            }
            return true
        }
    }
}
</script>

<style scoped>
.post-edit {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.header h1 {
    margin: 0;
    color: #333;
}

.btn {
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
    display: inline-block;
}

.btn-primary {
    background: #007bff;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background: #0056b3;
}

.btn-primary:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background: #545b62;
}

.post-form {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 30px;
}

.form-group {
    margin-bottom: 25px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
    font-family: inherit;
}

.form-group textarea {
    resize: vertical;
    min-height: 200px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-actions {
    display: flex;
    gap: 15px;
    margin-top: 30px;
}

.form-actions .btn {
    margin: 0;
}

.loading,
.error {
    text-align: center;
    padding: 40px;
    font-size: 1.1em;
}

.loading {
    color: #666;
}

.error {
    color: #dc3545;
}
</style>
