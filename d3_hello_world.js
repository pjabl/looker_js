looker.plugins.visualizations.add({

  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        div.bar {
          display: inline-block;
          width: 20px;
          height: 75px;	/* Gets overridden by D3-assigned height below */
          margin-right: 2px;
          background-color: teal;
        }
      </style>
    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    

  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
      11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
      .style("height", function(d) {
        var barHeight = d * 5;
        return barHeight + "px";
      });
      
    // We are done rendering! Let Looker know.
    done()
  }
});
