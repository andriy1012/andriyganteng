fetch('JSON Dashboard/summary.json')
  .then(response => response.json())
  .then(data => {
    const years = data.map(item => item.Year);
    const revenue = data.map(item => parseInt(item.total_Revenue));
    const profit = data.map(item => parseInt(item.total_Profit));
    const cost = data.map(item => parseInt(item.total_Cost));

    const ctx = document.getElementById('linechart').getContext('2d');
    const linechart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Revenue',
            borderColor: '#f66d00',
            data: revenue
          },
          {
            label: 'Profit',
            borderColor: '#0072f0',
            data: profit
          },
          {
            label: 'Cost',
            borderColor: '#f10096',
            data: cost
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
  })
  .catch(error => console.error(error));



 fetch('JSON Dashboard/revenue.json')
 .then(response => response.json())
 .then(data => {
    const countries = [...new Set(data.flatMap(item => item.Country))];

    const bikesRevenue = countries.map((country) => {
      const countryData = data.flatMap(item => item).filter(
        (item) => item.Country === country && item.Product_Category === "Bikes"
      );
      return countryData.length > 0? parseInt(countryData[0].total_revenue) : 0;
    });

    const accessoriesRevenue = countries.map((country) => {
      const countryData = data.flatMap(item => item).filter(
        (item) => item.Country === country && item.Product_Category === "Accessories"
      );
      return countryData.length > 0? parseInt(countryData[0].total_revenue) : 0;
    });

    const clothingRevenue = countries.map((country) => {
      const countryData = data.flatMap(item => item).filter(
        (item) => item.Country === country && item.Product_Category === "Clothing"
      );
      return countryData.length > 0? parseInt(countryData[0].total_revenue) : 0;
    });

    const ctx = document.getElementById("chart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: countries,
        datasets: [
         {
            label: "Bikes Revenue",
            data: bikesRevenue,
            backgroundColor: "#f66d00",
          },
          {
            label: "Accessories Revenue",
            data: accessoriesRevenue,
            backgroundColor: "#ffb300",
          },
          {
            label: "Clothing Revenue",
            data: clothingRevenue,
            backgroundColor: "#ffd54f",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => (value / 1e6).toFixed(1) + "M",
            },
          },
          x: {},
        },
      },
    });
  });
    fetch('JSON Dashboard/agepie.json')
        .then(response => response.json())
        .then(data => {
          const ctx = document.getElementById('pie').getContext('2d');
          const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: data.map(item => item.Age_Group),
              datasets: [{
                label: 'By Age ',
                data: data.map(item => item.order_percentage),
                backgroundColor: ['#0072f0', '#00b6cb', '#f10096','#f66f03'],
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1
              }]
            },
            options: {
              title: {
                display: true,
                text: 'Total Revenue by Age Group'
              },
              plugins: {
                doughnutlabel: {
                  labels: [
                    {
                      text: 'Percentage',
                      
                      font: {
                        size: '10'
                      },
                      color: '#fff',
                      align: 'center',
                      offsetY: -10
                    }
                  ],
                  formatter: (value, ctx) => {
                    const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = (value / total * 100).toFixed(2) + '%';
                    return percentage;
                  }
                }
              }
            }
          });
        })
        .catch(error => console.error(error));

        fetch('JSON Dashboard/mpq.json')
        .then(response => response.json())
        .then(data => {
          const limitedData = data.slice(0, 7);
          const tableBody = document.querySelector('#jtable tbody');
          limitedData.forEach(row => {
            const tableRow = document.createElement('tr');
            for (const key in row) {
              const tableCell = document.createElement('td');
              tableCell.textContent = row[key];
              tableRow.appendChild(tableCell);
            }
            tableBody.appendChild(tableRow);
          });
        })
        .catch(error => console.error('Error fetching data:', error));

 fetch('JSON Dashboard/ke52.json')
        .then(response => response.json())
        .then(data => {
          const labels = data.map(item => item.Product);
          const dataSet = data.sort((a, b) => b.total_revenue - a.total_revenue).slice(0, 10).map(item => item.total_revenue);
      
          const ctx = document.getElementById('miring').getContext('2d');
          const miring = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'TOP_SELLING_PRODUCTS',
                data: dataSet,
                backgroundColor: [
                  '#f66d00',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              indexAxis: 'y', // <-- here
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        })
