import axios from 'axios';
let name = [];
let apiURL = 'http://localhost:8080/api';
axios
  .get(apiURL)
  .then(res => {
    this.list = res.data;
  })
  .catch(error => {
    console.log(error);
  });

for (var key in this.list) {
  name.push(key.name);
}
export const planetChartData = {
  type: 'line',
  data: {
    labels: name,
    datasets: [
      {
        label: 'Number of Moons',
        data: [0, 0, 1, 2, 79, 82, 27, 14],
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
};

export default planetChartData;
