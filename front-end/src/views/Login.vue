<template>
  <!-- Section: Design Block -->
<section class=" text-center text-lg-start">
  <div class="card">
    <div class="row  d-flex align-items-center">
      <div class="col-lg-5 d-none d-lg-flex">
        <img src="../assets/background.jpg" width="400px" alt="Img"
          class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
      </div>
      <div class="col-lg-7">
        <div class="card-body py-5 px-md-3">
          <h2>Login</h2>
          <form name="form" @submit.prevent="handleLogin">
            <!-- Email input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="username">Username</label>
              <input
          v-model="user.username"
          v-validate="'required'"
          type="text"
          class="form-control"
          name="username"
        />
            </div>
            <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Username is required!</div>
            <!-- Password input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="password">Password</label>
              <input
          v-model="user.password"
          v-validate="'required'"
          type="password"
          class="form-control"
          name="password"
        />
            </div>
            <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
            <!-- Submit button -->
            <button class="btn btn-primary btn-block mb-4" :disabled="loading"><span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Login</span></button>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
              </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</section>
<!-- Section: Design Block -->
</template>

<script>
import User from '../models/user';

export default {
name: 'Login',
data() {
  return {
    user: new User('', ''),
    loading: false,
    message: ''
  };
},
computed: {
  loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  }
},
created() {
  if (this.loggedIn) {
    this.$router.push('/card');
  }
},
methods: {
  handleLogin() {
    this.loading = true;
    this.$validator.validateAll().then(isValid => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/card');
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    });
  }
}
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
* {
  font-family: 'Roboto';
}

.rounded-t-5 {
border-top-left-radius: 0.5rem;
border-top-right-radius: 0.5rem;
}

@media (min-width: 992px) {
.rounded-tr-lg-0 {
  border-top-right-radius: 0;
}

.rounded-bl-lg-5 {
  border-bottom-left-radius: 0.5rem;
}
}

.card{
  width: 75%;
  height: 100%;
  margin-top: 50px;
  margin-left: 150px;
}
</style>