<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">
          📋 Community Board
        </router-link>

        <ul class="nav-menu">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" exact>
              🏠 Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/posts" class="nav-link" active-class="active">
              📝 Posts
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin" class="nav-link" active-class="active">
              ⚙️ Admin
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/posts/create" class="nav-link create-btn">
              ➕ Create Post
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-container">
        <p>&copy; 2025 Community Board. Built with NestJS + Vue.js</p>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-brand {
  font-size: 1.5em;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 30px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #007bff;
  background-color: #f8f9fa;
}

.nav-link.active {
  color: #007bff;
  background-color: #e3f2fd;
}

.nav-link.create-btn {
  background: #007bff;
  color: white;
}

.nav-link.create-btn:hover {
  background: #0056b3;
  color: white;
}

.main-content {
  flex: 1;
  padding: 0;
  min-height: calc(100vh - 120px);
}

.footer {
  background: #fff;
  border-top: 1px solid #eee;
  padding: 20px 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  color: #666;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 15px 20px;
  }

  .nav-menu {
    gap: 15px;
    margin-top: 15px;
  }

  .nav-link {
    padding: 6px 12px;
    font-size: 0.9em;
  }

  .main-content {
    min-height: calc(100vh - 160px);
  }
}
</style>