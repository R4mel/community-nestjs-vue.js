<template>
    <div class="admin-panel">
        <h2>Admin Panel - Initialize System</h2>

        <div class="section">
            <h3>Categories</h3>
            <div class="current-categories" v-if="categories.length > 0">
                <p><strong>Current Categories:</strong></p>
                <ul>
                    <li v-for="category in categories" :key="category.categoryId">
                        {{ category.name }} ({{ category.status }}) - {{ category.description }}
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>No categories found.</p>
            </div>

            <button @click="createInitialCategories" class="btn btn-primary" :disabled="creatingCategories">
                {{ creatingCategories ? 'Creating...' : 'Create Initial Categories' }}
            </button>
        </div>

        <div class="section">
            <h3>Users</h3>
            <div class="current-users" v-if="users.length > 0">
                <p><strong>Current Users:</strong></p>
                <ul>
                    <li v-for="user in users" :key="user.userId">
                        {{ user.nickname }} ({{ user.socialId }}) - {{ user.isAdmin ? 'Admin' : 'User' }}
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>No users found.</p>
            </div>

            <button @click="createInitialUsers" class="btn btn-primary" :disabled="creatingUsers">
                {{ creatingUsers ? 'Creating...' : 'Create Initial Users' }}
            </button>
        </div>

        <div class="section">
            <button @click="refreshData" class="btn btn-secondary">
                🔄 Refresh Data
            </button>
        </div>
    </div>
</template>

<script>
import { categoriesApi, usersApi } from '../services/api'

export default {
    name: 'AdminPanel',
    data() {
        return {
            categories: [],
            users: [],
            creatingCategories: false,
            creatingUsers: false
        }
    },
    async mounted() {
        await this.refreshData()
    },
    methods: {
        async refreshData() {
            await this.loadCategories()
            await this.loadUsers()
        },
        async loadCategories() {
            try {
                const response = await categoriesApi.getAll()
                this.categories = response.data
            } catch (error) {
                console.error('Error loading categories:', error)
                this.categories = []
            }
        },
        async loadUsers() {
            try {
                const response = await usersApi.getAll()
                this.users = response.data
            } catch (error) {
                console.error('Error loading users:', error)
                this.users = []
            }
        },
        async createInitialCategories() {
            this.creatingCategories = true
            try {
                const initialCategories = [
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

                for (const categoryData of initialCategories) {
                    await categoriesApi.create(categoryData)
                }

                await this.loadCategories()
                alert('✅ Initial categories created successfully!')
            } catch (error) {
                console.error('Error creating categories:', error)
                alert('❌ Error creating categories: ' + error.message)
            } finally {
                this.creatingCategories = false
            }
        },
        async createInitialUsers() {
            this.creatingUsers = true
            try {
                const initialUsers = [
                    {
                        socialId: 'demo_user_1',
                        nickname: 'DemoUser1',
                        profileImage: 'https://via.placeholder.com/100x100?text=U1'
                    },
                    {
                        socialId: 'admin_user',
                        nickname: 'Admin',
                        profileImage: 'https://via.placeholder.com/100x100?text=AD'
                    }
                ]

                for (const userData of initialUsers) {
                    await usersApi.create(userData)
                }

                await this.loadUsers()
                alert('✅ Initial users created successfully!')
            } catch (error) {
                console.error('Error creating users:', error)
                alert('❌ Error creating users: ' + error.message)
            } finally {
                this.creatingUsers = false
            }
        }
    }
}
</script>

<style scoped>
.admin-panel {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.admin-panel h2 {
    margin-bottom: 30px;
    color: #333;
    text-align: center;
}

.section {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.section h3 {
    margin: 0 0 15px 0;
    color: #007bff;
}

.current-categories ul,
.current-users ul {
    margin: 10px 0;
    padding-left: 20px;
}

.current-categories li,
.current-users li {
    margin: 5px 0;
    color: #666;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
    margin: 10px 10px 0 0;
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
</style>
