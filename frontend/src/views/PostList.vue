<template>
    <div class="post-list">
        <div class="header">
            <h1>Posts</h1>
            <div class="actions">
                <select v-model="selectedCategory" @change="filterByCategory">
                    <option value="">All Categories</option>
                    <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
                        {{ category.name }}
                    </option>
                </select>
                <router-link to="/posts/create" class="btn btn-primary">Create Post</router-link>
            </div>
        </div>

        <div class="posts-grid" v-if="posts.length > 0">
            <div v-for="post in posts" :key="post.postId" class="post-card" @click="goToPost(post.postId)">
                <div class="post-header">
                    <h3>{{ post.title }}</h3>
                    <span class="category-badge">{{ post.category?.name }}</span>
                </div>
                <p class="post-content">{{ post.content.substring(0, 150) }}...</p>
                <div class="post-footer">
                    <div class="author">
                        <span>By: {{ post.user?.nickname }}</span>
                    </div>
                    <div class="stats">
                        <span>👁 {{ post.viewCount }}</span>
                        <span>💬 {{ post.comments?.length || 0 }}</span>
                        <span>📅 {{ formatDate(post.createdAt) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="no-posts">
            <p>No posts found. <router-link to="/posts/create">Create the first post!</router-link></p>
        </div>

        <div v-if="loading" class="loading">Loading posts...</div>
    </div>
</template>

<script>
import { postsApi, categoriesApi } from '../services/api'

export default {
    name: 'PostList',
    data() {
        return {
            posts: [],
            categories: [],
            selectedCategory: '',
            loading: false
        }
    },
    async mounted() {
        this.selectedCategory = this.$route.query.categoryId || ''
        await this.loadCategories()
        await this.loadPosts()
    },
    watch: {
        '$route.query.categoryId'(newCategoryId) {
            this.selectedCategory = newCategoryId || ''
            this.loadPosts()
        }
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
        async loadPosts() {
            this.loading = true
            try {
                const categoryId = this.selectedCategory || null
                const response = await postsApi.getAll(categoryId)
                this.posts = response.data
            } catch (error) {
                console.error('Error loading posts:', error)
            } finally {
                this.loading = false
            }
        },
        filterByCategory() {
            if (this.selectedCategory) {
                this.$router.push({ name: 'PostList', query: { categoryId: this.selectedCategory } })
            } else {
                this.$router.push({ name: 'PostList' })
            }
        },
        goToPost(postId) {
            this.$router.push({ name: 'PostDetail', params: { id: postId } })
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString()
        }
    }
}
</script>

<style scoped>
.post-list {
    max-width: 1200px;
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

.actions {
    display: flex;
    gap: 15px;
    align-items: center;
}

.actions select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
}

.btn {
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.2s;
}

.btn-primary {
    background: #007bff;
    color: white;
}

.btn-primary:hover {
    background: #0056b3;
}

.posts-grid {
    display: grid;
    gap: 20px;
}

.post-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    background: white;
}

.post-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
}

.post-header h3 {
    margin: 0;
    color: #333;
    flex: 1;
}

.category-badge {
    background: #e3f2fd;
    color: #1976d2;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: bold;
    margin-left: 10px;
}

.post-content {
    margin: 0 0 20px 0;
    color: #666;
    line-height: 1.5;
}

.post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
    color: #888;
}

.author {
    font-weight: bold;
}

.stats {
    display: flex;
    gap: 15px;
}

.no-posts {
    text-align: center;
    padding: 40px;
    color: #666;
}

.no-posts a {
    color: #007bff;
    text-decoration: none;
}

.loading {
    text-align: center;
    padding: 40px;
    font-size: 1.1em;
    color: #666;
}
</style>
