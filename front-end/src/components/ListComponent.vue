<template>
  <div class="row">
    <div class="col-md-12">
      <h1 class="text-center mb-4">Student List</h1>
      <input
        class="form-control mb-3 search"
        type="search"
        placeholder="Search by Name"
        aria-label="Search"
        v-model="search"
      />
      <table class="table table-striped">
        <thead class="thead-dark text-center">
          <tr>
            <th>NIS</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="student in pageOfItems" :key="student._id">
            <td>{{ student.nis }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.age }}</td>
            <td>{{ student.address }}</td>
            <td>{{ student.phone }}</td>
            <td>{{ student.date }}</td>
            <td>
              <router-link
                :to="{ name: 'edit', params: { id: student._id } }"
                class="btn btn-success"
                v-if="isModerator || isAdmin"><font-awesome-icon icon="user-edit" />
              </router-link>
              <button
                @click.prevent="deleteStudent(student._id)"
                class="btn btn-danger"
              v-if="isAdmin">
              <font-awesome-icon icon="trash" />
              </button>
              <router-link
                :to="{ name: 'detail', params: { id: student._id } }"
                class="btn btn-primary"
              > <font-awesome-icon icon="eye" />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col text-center">
        <jw-pagination :items="filteredList" @changePage="onChangePage" ></jw-pagination>
      </div>
      <div class="col text-center btn-bottom">
        <router-link
          :to="{ name: 'create' }"
          class="btn btn-primary mt-3 btn-lg"
           v-if="isAdmin"><font-awesome-icon icon="user-plus" class="icon"/>Add
        </router-link>
        <router-link
          :to="{ name: 'card' }"
          class="btn btn-danger mt-3 btn-lg"
          ><font-awesome-icon icon="arrow-alt-circle-left" class="icon"/>Back
        </router-link>
        <router-link
        :to="{ name: 'chart' }"
        class="btn btn-success mt-3 btn-lg"
        ><font-awesome-icon icon="chart-bar" class="icon"/>Chart
      </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      Students: [],
      apiURL: null,
      pageOfItems: [],
    };
  },
  mounted() {
    this.getStudent();
    console.log(this.Students);
  },
  methods: {
    deleteStudent(id) {
      let apiURL = `http://localhost:8080/api/delete-student/${id}`;
      let indexOfArrayItem = this.Students.findIndex((i) => i._id === id);
      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Students.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getStudent() {
      let apiURL = "http://localhost:8080/api";
      axios
        .get(apiURL)
        .then((res) => {
          this.Students = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        }
  },
  computed: {
    filteredList() {
      return this.Students.filter((student) => {
        return student.name.toLowerCase().includes(this.search.toLowerCase())||student.address.toLowerCase().includes(this.search.toLowerCase())||student.nis.includes(this.search)||student.email.includes(this.search)||student.age.includes(this.search)||student.phone.includes(this.search)||student.date.includes(this.search);
      });
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    isModerator() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
  },
};
</script>

<style scoped>
.btn-danger {
  margin-left: 7px;
}

.btn-success{
  margin-left: 7px;
}

.btn-primary {
  margin-left: 7px;
}

thead {
  background-color: #404447;
  color: white;
}

.search {
  width: 20%;
}
.btn-bottom{
  margin-bottom: 30px;
}
</style>
