const visObject = {
    create: function(element, config){
        element.innerHTML = "";
    },

    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        const data_labels = []
        const actual_data = []

        const keys = Object.keys(data[0])
      
        data.forEach((d)=>{
            data_labels.push(d[keys[0]])
            actual_data.push(d[keys[1]])
        })

        const vizCanvas = document.createElement('canvas')
        vizCanvas.setAttribute("id", "myChart")

        const vizDiv = document.getElementById("vis")
        vizDiv.appendChild(vizCanvas)

        const ctx = document.getElementById("myChart")
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data_labels,
                datasets: [{
                    label: 'Top 5 Product Category',
                    data: actual_data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
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
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },

            }
        });

        doneRendering()
    }
};

looker.plugins.visualizations.add(visObject);