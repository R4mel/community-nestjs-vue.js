<template>
    <div class="user-profile" v-if="user">
        <div class="header">
            <h1>User Profile</h1>
            <router-link to="/" class="btn btn-secondary">← Back to Home</router-link>
        </div>

        <div class="profile-info">
            <div class="user-card">
                <div class="profile-image">
                    <img :src="user.profileImage || defaultAvatar" :alt="user.nickname">
                </div>
                <div class="user-details">
                    <h2>{{ user.nickname }}</h2>
                    <p><strong>Social ID:</strong> {{ user.socialId }}</p>
                    <p><strong>Member since:</strong> {{ formatDate(user.createdAt) }}</p>
                    <p><strong>Role:</strong> {{ user.isAdmin ? 'Administrator' : 'Member' }}</p>
                </div>
            </div>
        </div>

        <div class="user-stats">
            <div class="stat-card">
                <h3>{{ userPosts.length }}</h3>
                <p>Posts Written</p>
            </div>
            <div class="stat-card">
                <h3>{{ user.comments?.length || 0 }}</h3>
                <p>Comments Made</p>
            </div>
            <div class="stat-card">
                <h3>{{ totalViews }}</h3>
                <p>Total Views</p>
            </div>
        </div>

        <div class="user-posts">
            <h3>Recent Posts</h3>
            <div class="posts-list" v-if="userPosts.length > 0">
                <div v-for="post in userPosts.slice(0, 10)" :key="post.postId" class="post-item"
                    @click="goToPost(post.postId)">
                    <h4>{{ post.title }}</h4>
                    <p>{{ post.content.substring(0, 100) }}...</p>
                    <div class="post-meta">
                        <span class="category">{{ post.category?.name }}</span>
                        <span class="views">👁 {{ post.viewCount }}</span>
                        <span class="date">{{ formatDate(post.createdAt) }}</span>
                    </div>
                </div>
            </div>
            <div v-else class="no-posts">
                <p>This user hasn't written any posts yet.</p>
            </div>
        </div>
    </div>

    <div v-else-if="loading" class="loading">
        Loading user profile...
    </div>

    <div v-else class="error">
        User not found.
    </div>
</template>

<script>
import { usersApi, postsApi } from '../services/api'

export default {
    name: 'UserProfile',
    props: ['id'],
    data() {
        return {
            user: null,
            userPosts: [],
            loading: false,
            defaultAvatar: 'https://via.placeholder.com/100x100?text=User'
        }
    },
    computed: {
        totalViews() {
            return this.userPosts.reduce((total, post) => total + post.viewCount, 0)
        }
    },
    async mounted() {
        await this.loadUser()
        await this.loadUserPosts()
    },
    methods: {
        async loadUser() {
            this.loading = true
            try {
                const response = await usersApi.getById(this.id)
                this.user = response.data
            } catch (error) {
                console.error('Error loading user:', error)
            } finally {
                this.loading = false
            }
        },
        async loadUserPosts() {
            try {
                const response = await postsApi.getByUser(this.id)
                this.userPosts = response.data
            } catch (error) {
                console.error('Error loading user posts:', error)
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
.user-profile {
    max-width: 1000px;
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
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.2s;
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background: #545b62;
}

.profile-info {
    margin-bottom: 40px;
}

.user-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 30px;
    display: flex;
    gap: 30px;
    align-items: center;
}

.profile-image img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #007bff;
}

.user-details h2 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 1.8em;
}

.user-details p {
    margin: 8px 0;
    color: #666;
}

.user-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.stat-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 25px;
    text-align: center;
    transition: transform 0.2s;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
    margin: 0;
    font-size: 2.5em;
    color: #007bff;
}

.stat-card p {
    margin: 10px 0 0 0;
    color: #666;
    font-weight: bold;
}

.user-posts {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 30px;
}

.user-posts h3 {
    margin: 0 0 30px 0;
    color: #333;
}

.posts-list {
    display: grid;
    gap: 20px;
}

.post-item {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.post-item:hover {
    background-color: #f8f9fa;
}

.post-item h4 {
    margin: 0 0 10px 0;
    color: #007bff;
}

.post-item p {
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

.category {
    background: #e3f2fd;
    color: #1976d2;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: bold;
}

.no-posts {
    text-align: center;
    padding: 40px;
    color: #666;
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

@media (max-width: 768px) {
    .user-card {
        flex-direction: column;
        text-align: center;
    }

    .user-stats {
        grid-template-columns: 1fr;
    }
}
</style>
