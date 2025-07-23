<template>
    <div class="post-detail" v-if="post">
        <div class="post-header">
            <div class="breadcrumb">
                <router-link to="/">Home</router-link> >
                <router-link to="/posts">Posts</router-link> >
                {{ post.title }}
            </div>
            <div class="post-actions" v-if="canEdit">
                <router-link :to="`/posts/${post.postId}/edit`" class="btn btn-secondary">Edit</router-link>
                <button @click="deletePost" class="btn btn-danger">Delete</button>
            </div>
        </div>

        <article class="post-content">
            <header class="post-meta">
                <h1>{{ post.title }}</h1>
                <div class="meta-info">
                    <span class="category">{{ post.category?.name }}</span>
                    <span class="author">By: {{ post.user?.nickname }}</span>
                    <span class="date">{{ formatDate(post.createdAt) }}</span>
                    <span class="views">👁 {{ post.viewCount }} views</span>
                </div>
            </header>

            <div class="post-body">
                <p>{{ post.content }}</p>
            </div>
        </article>

        <section class="comments-section">
            <h3>Comments ({{ comments.length }})</h3>

            <form @submit.prevent="addComment" class="comment-form">
                <div class="form-group">
                    <label for="userId">User ID (temporary):</label>
                    <input v-model="newComment.userId" type="number" id="userId" required
                        placeholder="Enter your user ID">
                </div>
                <div class="form-group">
                    <label for="comment">Your Comment:</label>
                    <textarea v-model="newComment.content" id="comment" rows="4" required
                        placeholder="Write your comment here..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="submitting">
                    {{ submitting ? 'Adding...' : 'Add Comment' }}
                </button>
            </form>

            <div class="comments-list">
                <div v-for="comment in comments" :key="comment.commentId" class="comment">
                    <div class="comment-header">
                        <strong>{{ comment.user?.nickname || 'Anonymous' }}</strong>
                        <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
                    </div>
                    <p class="comment-content">{{ comment.content }}</p>
                </div>
            </div>

            <div v-if="comments.length === 0" class="no-comments">
                <p>No comments yet. Be the first to comment!</p>
            </div>
        </section>
    </div>

    <div v-else-if="loading" class="loading">
        Loading post...
    </div>

    <div v-else class="error">
        Post not found.
    </div>
</template>

<script>
import { postsApi, commentsApi } from '../services/api'

export default {
    name: 'PostDetail',
    props: ['id'],
    data() {
        return {
            post: null,
            comments: [],
            newComment: {
                content: '',
                userId: 1, // Default user ID for demo
                postId: null
            },
            loading: false,
            submitting: false
        }
    },
    computed: {
        canEdit() {
            // For demo purposes, allow editing any post
            // In real app, check if current user is the author
            return true
        }
    },
    async mounted() {
        await this.loadPost()
        await this.loadComments()
    },
    methods: {
        async loadPost() {
            this.loading = true
            try {
                const response = await postsApi.getById(this.id)
                this.post = response.data
                this.newComment.postId = this.post.postId
            } catch (error) {
                console.error('Error loading post:', error)
            } finally {
                this.loading = false
            }
        },
        async loadComments() {
            try {
                const response = await commentsApi.getByPost(this.id)
                this.comments = response.data
            } catch (error) {
                console.error('Error loading comments:', error)
            }
        },
        async addComment() {
            if (!this.newComment.content.trim()) return

            this.submitting = true
            try {
                await commentsApi.create({
                    content: this.newComment.content,
                    userId: parseInt(this.newComment.userId),
                    postId: this.post.postId
                })

                this.newComment.content = ''
                await this.loadComments() // Reload comments
            } catch (error) {
                console.error('Error adding comment:', error)
                alert('Error adding comment. Please try again.')
            } finally {
                this.submitting = false
            }
        },
        async deletePost() {
            if (!confirm('Are you sure you want to delete this post?')) return

            try {
                await postsApi.delete(this.post.postId)
                this.$router.push('/posts')
            } catch (error) {
                console.error('Error deleting post:', error)
                alert('Error deleting post. Please try again.')
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleString()
        }
    }
}
</script>

<style scoped>
.post-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.breadcrumb {
    color: #666;
}

.breadcrumb a {
    color: #007bff;
    text-decoration: none;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.post-actions {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 8px 16px;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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

.btn-danger {
    background: #dc3545;
    color: white;
}

.btn-danger:hover {
    background: #c82333;
}

.post-content {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 30px;
    margin-bottom: 40px;
}

.post-meta h1 {
    margin: 0 0 20px 0;
    color: #333;
    line-height: 1.2;
}

.meta-info {
    display: flex;
    gap: 20px;
    color: #666;
    font-size: 0.9em;
    margin-bottom: 30px;
}

.category {
    background: #e3f2fd;
    color: #1976d2;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
}

.post-body {
    font-size: 1.1em;
    line-height: 1.6;
    color: #333;
}

.comments-section {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 30px;
}

.comments-section h3 {
    margin: 0 0 30px 0;
    color: #333;
}

.comment-form {
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
}

.form-group textarea {
    resize: vertical;
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

.comments-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.comment {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #f9f9f9;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.comment-header strong {
    color: #007bff;
}

.comment-date {
    color: #666;
    font-size: 0.9em;
}

.comment-content {
    margin: 0;
    line-height: 1.5;
    color: #333;
}

.no-comments {
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
</style>
