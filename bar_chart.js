looker.plugins.visualizations.add( {
    create: function(element, config){
        element.innerHTML = "";
        const vizCanvas = document.createElement('canvas')
        vizCanvas.setAttribute("id", "myChartOpaqueBars")

        const vizDiv = document.getElementById("vis")
        vizDiv.appendChild(vizCanvas)
    },

    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        
        console.log("data",data);

        const data_labels = []
        const actual_data = []

        const keys = Object.keys(data[0])
      
        data.forEach((d)=>{
            data_labels.push(d[keys[0]])
            actual_data.push(d[keys[1]])
        })
        console.log("data_labels",data_labels);
        console.log("actual_data",actual_data);

        // try {
        //     document.getElementById("0").destroy();
        //   } catch (error) {
        //     console.error("Error destroying:", error.message);
        //   }
        
        // const allElements = document.querySelectorAll('*');
        // allElements.forEach(element => {
        // console.log(element);
        // });


        const ctx = document.getElementById("myChartOpaqueBars")
        console.log(ctx);
        
        var chart = Chart.getChart("myChartOpaqueBars")

        if (typeof chart !== 'undefined') {
            console.log("chart defined");
            console.log(chart);
            chart.clear();
            chart.destroy();
            console.log("chart destroyed");
        } else {
            console.log("chart is undefined");
        }
        
        myChart = null;
        var myChart = new Chart(ctx, {
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
        
        console.log(myChart);

        doneRendering()
    }
});

