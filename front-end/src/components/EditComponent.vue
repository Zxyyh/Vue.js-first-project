<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Update Student</h3>
      <form @submit.prevent="handleUpdateForm" class="form">
        <div class="form-group">
          <label>NIS</label>
          <input
            type="text"
            class="form-control"
            v-model="student.nis"
            required
          />
        </div>

        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            required
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="student.email"
            required
          />
        </div>

        <div class="form-group">
          <label>Age</label>
          <input
            type="text"
            class="form-control"
            v-model="student.age"
            required
          />
        </div>

        <div class="form-group">
          <label>Address</label>
          <textarea class="form-control" v-model="student.address" required>
          </textarea>
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input
            type="text"
            class="form-control"
            v-model="student.phone"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary mt-3">
            <font-awesome-icon icon="user-edit" class="icon"/>Update</button>
          <router-link :to="{ name: 'view' }" class="btn btn-danger mt-3"
            ><font-awesome-icon icon="arrow-alt-circle-left" class="icon"/>Back
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      student: {},
    };
  },
  created() {
    let apiURL = `http://localhost:8080/api/edit-student/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.student = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:8080/api/update-student/${this.$route.params.id}`;

      axios
        .put(apiURL, this.student)
        .then((res) => {
          console.log(res);
          this.$router.push("/view");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.btn-danger {
  margin-left: 10px;
}
.form-group {
  margin-bottom: 10px;
}

.form-group label {
  margin-bottom: 10px;
}
</style>
