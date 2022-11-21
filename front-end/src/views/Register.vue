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
          <h2>Register</h2>
          <form name="form" @submit.prevent="handleRegister">
            <div v-if="!successful">
            <div class="form-outline mb-4">
              <label class="form-label" for="username">Username</label>
              <input
          v-model="user.username"
          v-validate="'required|min:3|max:20'"
          type="text"
          class="form-control"
          name="username"
        />
            </div>
            <div
            v-if="submitted && errors.has('username')"
            class="alert alert-danger"
          >{{errors.first('username')}}</div>

          <div class="form-outline mb-4">
            <label class="form-label" for="email">Email</label>
            <input
        v-model="user.email"
        v-validate="'required|email|max:50'"
        type="email"
        class="form-control"
        name="email"
      />
          </div>
          <div
          v-if="submitted && errors.has('email')"
          class="alert alert-danger"
        >{{errors.first('email')}}</div>

            <div class="form-outline mb-4">
              <label class="form-label" for="password">Password</label>
              <input
          v-model="user.password"
          v-validate="'required|min:6|max:40'"
          type="password"
          class="form-control"
          name="password"
        />
            </div>
            <div
            v-if="submitted && errors.has('password')"
            class="alert alert-danger"
          >{{errors.first('password')}}</div>
            <!-- Submit button -->
            <button class="btn btn-primary btn-block mb-4" :disabled="loading"><span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Register</span></button>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" :class="successful ? 'alert-success' : 'alert-danger'"
                >{{message}}</div>
              </div>
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
name: 'Register',
data() {
  return {
    user: new User('', ''),
    submitted: false,
      successful: false,
    message: ''
  };
},
computed: {
  loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  }
},
mounted() {
  if (this.loggedIn) {
    this.$router.push('/profile');
  }
},
methods: {
  handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.$router.push('/profile');
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
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