looker.plugins.visualizations.add( {
    create: function(element, config){
        element.innerHTML = "";
        const vizCanvas = document.createElement('canvas')
        vizCanvas.setAttribute("id", "myChartOpaqueBars")

        const vizDiv = document.getElementById("vis")
        vizDiv.appendChild(vizCanvas)
        
        var ctx = document.getElementById("myChartOpaqueBars")

        //Width and height
			var w = 600;
			var h = 250;
			
			var dataset = [ 1 ];
			
			var xScale = d3.scaleBand()
							.domain(d3.range(dataset.length))
							.rangeRound([0, w])
							.paddingInner(0.05);

			var yScale = d3.scaleLinear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);
			
			//Create SVG element
			var svg = d3.select("ctx")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.bandwidth())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + Math.round(d * 10) + ")";
			   });

			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.bandwidth() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");

    },

    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        const data_labels = []
        const actual_data = []

        const keys = Object.keys(data[0])
      
        data.forEach((d)=>{
            data_labels.push(d[keys[0]])
            actual_data.push(d[keys[1]])
        })

        //New values for dataset
        dataset = [ 25, 16, 10, 18, 19, 14, 11, 15, 18, 19,
                    5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

        //Update all rects
        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d, i) {
                return i / dataset.length * 1000;
            })
            .duration(500)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("fill", function(d) {
                return "rgb(0, 0, " + Math.round(d * 10) + ")";
            });

        //Update all labels
        svg.selectAll("text")
            .data(dataset)
            .transition()
            .delay(function(d, i) {
                return i / dataset.length * 1000;
            })
            .duration(500)
            .text(function(d) {
                return d;
            })
            .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2;
            })
            .attr("y", function(d) {
                return h - yScale(d) + 14;
            });
					   				

        doneRendering()
    }
});

