<template>
    <div class="home">
        <header class="hero">
            <h1>Community Board</h1>
            <p>Share your thoughts, tips, and questions with the community</p>
        </header>

        <div class="categories">
            <h2>Categories</h2>
            <div class="category-grid">
                <div v-for="category in categories" :key="category.categoryId" class="category-card"
                    @click="goToCategory(category.categoryId)">
                    <h3>{{ category.name }}</h3>
                    <p>{{ category.description }}</p>
                    <span class="status">{{ category.status }}</span>
                </div>
            </div>
        </div>

        <div class="recent-posts">
            <h2>Recent Posts</h2>
            <div class="posts-list">
                <div v-for="post in recentPosts" :key="post.postId" class="post-card" @click="goToPost(post.postId)">
                    <h4>{{ post.title }}</h4>
                    <p>{{ post.content.substring(0, 100) }}...</p>
                    <div class="post-meta">
                        <span>By: {{ post.user?.nickname }}</span>
                        <span>Views: {{ post.viewCount }}</span>
                        <span>{{ formatDate(post.createdAt) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { categoriesApi, postsApi } from '../services/api'

export default {
    name: 'Home',
    data() {
        return {
            categories: [],
            recentPosts: []
        }
    },
    async mounted() {
        await this.loadCategories()
        await this.loadRecentPosts()
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
        async loadRecentPosts() {
            try {
                const response = await postsApi.getAll()
                this.recentPosts = response.data.slice(0, 5) // Show latest 5 posts
            } catch (error) {
                console.error('Error loading recent posts:', error)
            }
        },
        goToCategory(categoryId) {
            this.$router.push({ name: 'PostList', query: { categoryId } })
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
.home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.hero {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px;
}

.hero h1 {
    margin: 0;
    font-size: 2.5em;
}

.hero p {
    margin: 10px 0 0 0;
    font-size: 1.2em;
    opacity: 0.9;
}

.categories,
.recent-posts {
    margin-bottom: 40px;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.category-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.category-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-card h3 {
    margin: 0 0 10px 0;
    color: #333;
}

.category-card p {
    margin: 0 0 15px 0;
    color: #666;
}

.status {
    background: #e3f2fd;
    color: #1976d2;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: bold;
}

.posts-list {
    display: grid;
    gap: 15px;
    margin-top: 20px;
}

.post-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.post-card:hover {
    background-color: #f5f5f5;
}

.post-card h4 {
    margin: 0 0 10px 0;
    color: #333;
}

.post-card p {
    margin: 0 0 15px 0;
    color: #666;
    line-height: 1.4;
}

.post-meta {
    display: flex;
    gap: 15px;
    font-size: 0.9em;
    color: #888;
}

.post-meta span {
    display: flex;
    align-items: center;
}
</style>
