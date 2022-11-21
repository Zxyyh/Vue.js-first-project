<template>
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center mb-4">Student List</h1>
        <input
          class="form-control mb-3 search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="search"
        />
            <div> 
                <div class="row d-flex justify-content-center">
                <div class="col-sm-3 gy-3" v-for="student in pageOfItems" :key="student._id">
                    <div class="card">
                      <div class="card-body">
                        <h3 class="card-title">{{ student.name }}</h3>
                        <h5 class="card-text">{{ student.nis }}</h5>
                        <p class="card-text">Last Update : {{ student.date }}</p>
                        <router-link
                        :to="{ name: 'detail', params: { id: student._id } }"
                        class="btn btn-primary px-5"
                        >Detail
                      </router-link>
                      </div>
                    </div>
                  </div>
                </div>
            </div> 
            <div class="col text-center">
              <jw-pagination :items="filteredList" @changePage="onChangePage" ></jw-pagination>
            </div>
        <div class="col text-center btn-bottom">
          <router-link
          :to="{ name: 'view' }"
          class="btn btn-success mt-3 btn-lg"
          ><font-awesome-icon icon="list" class="icon"/>List
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
          return student.name.toLowerCase().includes(this.search.toLowerCase())||student.nis.includes(this.search)||student.date.includes(this.search);
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
    }
    },
  };
  </script>
  
  <style>
  .btn-success {
    margin-left: 7px;
  }

  .btn-danger{
    margin-left: 7px;
  }
  
  .btn-primary {
    margin-left: 7px;
  }
  
  .search {
    width: 20%;
  }

  .btn-bottom{
    margin-bottom: 30px;
  }

  .card{
    margin-bottom: 30px;
  }
  </style>
  