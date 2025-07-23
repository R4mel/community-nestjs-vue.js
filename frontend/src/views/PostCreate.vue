<template>
    <div class="post-create">
        <div class="header">
            <h1>Create New Post</h1>
            <router-link to="/posts" class="btn btn-secondary">← Back to Posts</router-link>
        </div>

        <!-- Show setup instructions if no categories and backend not connected -->
        <SetupInstructions v-if="categories.length === 0 && !loadingCategories" />

        <form @submit.prevent="createPost" class="post-form">
            <div class="form-group">
                <label for="userId">User ID (temporary):</label>
                <input v-model="form.userId" type="number" id="userId" required placeholder="Enter your user ID">
                <small class="form-text">For demo purposes. In production, this would be automatically detected from
                    login.</small>
            </div>

            <div class="form-group">
                <label for="categoryId">Category:</label>
                <select v-model="form.categoryId" id="categoryId" required>
                    <option value="">Select a category</option>
                    <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
                        {{ category.name }} ({{ category.status }})
                    </option>
                </select>
                <div v-if="categories.length === 0 && !loadingCategories" class="no-categories">
                    <p>⚠️ No categories available. Please contact an administrator to create categories.</p>
                    <button type="button" @click="createSampleCategories" class="btn btn-secondary">
                        Create Sample Categories
                    </button>
                </div>
                <div v-if="loadingCategories" class="loading-categories">
                    Loading categories...
                </div>
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
                    {{ submitting ? 'Creating...' : 'Create Post' }}
                </button>
                <router-link to="/posts" class="btn btn-secondary">Cancel</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { postsApi, categoriesApi } from '../services/api'
import SetupInstructions from '../components/SetupInstructions.vue'

export default {
    name: 'PostCreate',
    components: {
        SetupInstructions
    },
    data() {
        return {
            form: {
                title: '',
                content: '',
                userId: 1, // Default user ID for demo
                categoryId: ''
            },
            categories: [],
            submitting: false,
            loadingCategories: false
        }
    },
    async mounted() {
        await this.loadCategories()
    },
    methods: {
        async loadCategories() {
            this.loadingCategories = true
            try {
                const response = await categoriesApi.getAll()
                this.categories = response.data
            } catch (error) {
                console.error('Error loading categories:', error)
                // Handle case where backend is not available
                if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                    alert('Cannot connect to server. Please make sure the backend server is running on http://localhost:3000')
                }
            } finally {
                this.loadingCategories = false
            }
        },
        async createSampleCategories() {
            try {
                // Create sample categories
                const sampleCategories = [
                    {
                        name: 'Free Board',
                        description: 'General discussion and free conversation',
                        status: 'FREE'
                    },
                    {
                        name: 'Tips & Tricks',
                        description: 'Share useful tips and programming tricks',
                        status: 'TIPS'
                    },
                    {
                        name: 'Q&A',
                        description: 'Ask questions and get help from the community',
                        status: 'QUESTIONS'
                    }
                ]

                for (const categoryData of sampleCategories) {
                    await categoriesApi.create(categoryData)
                }

                // Reload categories
                await this.loadCategories()
                alert('✅ Sample categories created successfully!')
            } catch (error) {
                console.error('Error creating sample categories:', error)
                alert('❌ Error creating categories. Please make sure the backend server is running.')
            }
        },
        async createPost() {
            if (!this.validateForm()) return

            this.submitting = true
            try {
                const response = await postsApi.create({
                    title: this.form.title,
                    content: this.form.content,
                    userId: parseInt(this.form.userId),
                    categoryId: parseInt(this.form.categoryId)
                })

                // Redirect to the newly created post
                this.$router.push({ name: 'PostDetail', params: { id: response.data.postId } })
            } catch (error) {
                console.error('Error creating post:', error)
                alert('Error creating post. Please try again.')
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
            if (!this.form.userId) {
                alert('Please enter a user ID')
                return false
            }
            return true
        }
    }
}
</script>

<style scoped>
.post-create {
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

.form-text {
    display: block;
    margin-top: 5px;
    color: #666;
    font-size: 0.9em;
    font-style: italic;
}

.no-categories {
    margin-top: 10px;
    padding: 15px;
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 4px;
    color: #856404;
}

.no-categories p {
    margin: 0 0 10px 0;
    font-size: 0.9em;
}

.loading-categories {
    margin-top: 10px;
    padding: 10px;
    text-align: center;
    color: #666;
    font-style: italic;
}
</style>
