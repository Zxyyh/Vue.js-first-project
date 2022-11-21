<template>
    <div>
      <canvas id="planet-chart"></canvas>
      <div class="text-center mb-3">
      <router-link
          :to="{ name: 'view' }"
          class="btn btn-danger mt-3 btn-lg"
          ><font-awesome-icon icon="arrow-alt-circle-left" class="icon"/>Back
        </router-link>
      </div>
    </div>
  </template>

  <script>
  import Chart from 'chart.js';
  import axios from "axios";
  export default {
    name: 'PlanetChart',
    data() {
      return {
        Students: [],
        planetChartData: {
            type: 'bar',
  data: {
    labels: ["ke-1","ke-2","ke-3","ke-4","ke-5","ke-6","ke-7","ke-8","ke-9","ke-10","ke-11","ke-12","ke-13"] ,
    datasets: [
      {
        label: 'Data User',
        data: [1,2,2,1,3,1,3,5,3,1,3,1,4],
        backgroundColor: 'rgba(54,73,93,.5)',
        borderColor: '#36495d',
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25
          }
        }
      ]
    }
  }
        }
      }
    },
    mounted() {
      const ctx = document.getElementById('planet-chart');
      new Chart(ctx, this.planetChartData);
      this.getStudent();
    },
    methods: {
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
    }
    },
    computed: {
        getName: function(){
            let nameArray = [];
        for( var i=0; i<this.Students.length; i++){
            nameArray.push(this.Students[i].name);
        }
        return nameArray;
        
        }
    }
  }
  </script>