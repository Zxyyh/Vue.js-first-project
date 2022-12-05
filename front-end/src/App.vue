<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark justify-content-between">
      
      <div class="navbar-nav mr-auto">
        
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item" v-show="currentRouteName == 'login'">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" class="icon"/>Sign Up
          </router-link>
        </li>
        <li class="nav-item" v-show="currentRouteName == 'register'">
          <router-link to="/login" class="nav-link" >
            <font-awesome-icon icon="sign-in-alt" class="icon" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        
      </div>
    </nav>
    <div>
      <sidebar 
        @search-input-emit="search"
      />
    </div>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./sideBar.vue"
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentRouteName() {
        return this.$route.name;
    }
  },
  components: {
    sidebar: Sidebar,
    // 'footer-component': Footer
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style>
.icon{
  margin-right: 5px;
}

.navbar{
  min-height: 60px;
}
</style>
