<template>
    <div class="setup-instructions">
        <div class="alert alert-warning">
            <h3>⚠️ Backend Setup Required</h3>
            <p>To use the categories dropdown when creating posts, you need to:</p>

            <ol>
                <li><strong>Start the Backend Server:</strong>
                    <pre><code>cd backend
npm run start:dev</code></pre>
                    <p>Make sure the server starts on <code>http://localhost:3000</code></p>
                </li>

                <li><strong>Initialize Sample Data:</strong>
                    <p>Go to the <router-link to="/admin">Admin Panel</router-link> and click "Create Initial
                        Categories" to create sample categories.</p>
                </li>

                <li><strong>Alternative - Use Sample Categories Button:</strong>
                    <p>When creating a post, if no categories are available, click the "Create Sample Categories" button
                        that appears.</p>
                </li>
            </ol>

            <div class="backend-status">
                <p><strong>Backend Status:</strong>
                    <span :class="backendStatus.class">{{ backendStatus.message }}</span>
                </p>
                <button @click="checkBackend" class="btn btn-sm">Check Connection</button>
            </div>
        </div>
    </div>
</template>

<script>
import { categoriesApi } from '../services/api'

export default {
    name: 'SetupInstructions',
    data() {
        return {
            backendStatus: {
                message: 'Not checked',
                class: 'status-unknown'
            }
        }
    },
    async mounted() {
        await this.checkBackend()
    },
    methods: {
        async checkBackend() {
            try {
                await categoriesApi.getAll()
                this.backendStatus = {
                    message: '✅ Connected',
                    class: 'status-connected'
                }
            } catch (error) {
                this.backendStatus = {
                    message: '❌ Not Connected',
                    class: 'status-disconnected'
                }
            }
        }
    }
}
</script>

<style scoped>
.setup-instructions {
    max-width: 800px;
    margin: 20px auto;
    padding: 0 20px;
}

.alert {
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.alert-warning {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    color: #856404;
}

.alert h3 {
    margin: 0 0 15px 0;
}

.alert ol {
    margin: 15px 0;
    padding-left: 20px;
}

.alert li {
    margin: 10px 0;
    line-height: 1.5;
}

pre {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    overflow-x: auto;
}

code {
    background: #f8f9fa;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
}

.backend-status {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #ddd;
}

.status-connected {
    color: #28a745;
    font-weight: bold;
}

.status-disconnected {
    color: #dc3545;
    font-weight: bold;
}

.status-unknown {
    color: #6c757d;
}

.btn {
    padding: 6px 12px;
    border: 1px solid #007bff;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    margin-left: 10px;
}

.btn:hover {
    background: #0056b3;
    border-color: #0056b3;
}
</style>
