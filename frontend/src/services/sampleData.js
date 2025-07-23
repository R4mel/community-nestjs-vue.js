// Sample data for development testing
export const sampleCategories = [
  {
    categoryId: 1,
    name: "Free Board",
    description: "General discussion and free conversation",
    status: "FREE",
    createdAt: new Date().toISOString()
  },
  {
    categoryId: 2,
    name: "Tips & Tricks",
    description: "Share useful tips and programming tricks",
    status: "TIPS",
    createdAt: new Date().toISOString()
  },
  {
    categoryId: 3,
    name: "Q&A",
    description: "Ask questions and get help from the community",
    status: "QUESTIONS",
    createdAt: new Date().toISOString()
  }
]

export const sampleUsers = [
  {
    userId: 1,
    socialId: "user001",
    nickname: "Developer1",
    profileImage: "https://via.placeholder.com/100x100?text=D1",
    isAdmin: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    userId: 2,
    socialId: "admin001",
    nickname: "Admin",
    profileImage: "https://via.placeholder.com/100x100?text=AD",
    isAdmin: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const samplePosts = [
  {
    postId: 1,
    title: "Welcome to the Community Board!",
    content: "Hello everyone! This is our new community board where you can share ideas, ask questions, and help each other. Feel free to create posts and engage with the community!",
    viewCount: 42,
    categoryId: 1,
    userId: 2,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    category: sampleCategories[0],
    user: sampleUsers[1],
    comments: []
  },
  {
    postId: 2,
    title: "JavaScript ES6 Arrow Functions",
    content: "Arrow functions provide a concise way to write function expressions in JavaScript. Here are some examples and best practices for using them effectively...",
    viewCount: 28,
    categoryId: 2,
    userId: 1,
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
    category: sampleCategories[1],
    user: sampleUsers[0],
    comments: []
  }
]
