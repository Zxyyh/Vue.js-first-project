<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark justify-content-between">
      
      <div class="navbar-nav mr-auto">
        <img src="./assets/logo.png" alt="img" width="100px" height="30px" class="my-1 mx-2"/>
        <li class="nav-item">
          <router-link to="/card" class="nav-link">
            <font-awesome-icon icon="home" class="icon"/>Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/view" class="nav-link">
            <font-awesome-icon icon="list" class="icon"/>List</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" class="icon"/>Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" class="icon" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" class="icon" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" class="icon"/>LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
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
</style>
