// Fetch the JSON data and console log it
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function (data) {
    console.log(data);
    
    // Get subject ID's and populate the dropdown
    let dropdownList = d3.select("#selDataset");
    let subjectID = data.names;
    subjectID.forEach((id) => {
      dropdownList.append("option").text(id);
    });
   
    //Initialize demographic_info by subject ID = 940
    let demographicInfo = data.metadata;
    let subjectMetadata = demographicInfo.filter(subject => subject.id == '940');
    Object.entries(subjectMetadata[0]).forEach(([key,value]) => {
      d3.select('#sample-metadata').append("h6").text(`${key}: ${value}`);
    });
   
    // Initialize charts with data using Subject ID = 940
    let otuData = data.samples;
    let subjectOtuData = otuData.filter(subject => subject.id == '940');
    
    // get x, y and text values from dataset
    let sampleValues = subjectOtuData[0].sample_values;
    let otuIds = subjectOtuData[0].otu_ids;
    let otuLabels = subjectOtuData[0].otu_labels;
    let x = sampleValues.slice(0,10).reverse();
    let y = otuIds.slice(0,10).map(y => `OTU ${y}`).reverse();
    let hover = otuLabels.slice(0,10).reverse();
    
    // set parameters for bar chart
    let barTrace = {
      x: x,
      y: y,
      text: hover,
      type: 'bar',
      orientation: 'h'
    };

    // set parameters for bubble chart
    let bubbleTrace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
      }
    };
    let bubbleLayout = {
      xaxis: {title: 'OTU ID'}
    }

    //plot the bar and bubble charts
    Plotly.newPlot('bar', [barTrace]);
    Plotly.newPlot('bubble',[bubbleTrace],bubbleLayout);

    // Call updateView() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updateView);
    
    // Create function that updates the views when new selection is made from the dropdown
    function updateView() {
      let dropdownList = d3.select("#selDataset");
    
      // Get current subject ID
      let selectedSubject = dropdownList.property("value");
    
      //Grab demographic_info by subject ID
      let demographicInfo = data.metadata;
      let subjectMetadata = demographicInfo.filter(subject => subject.id == selectedSubject);
    
      //Ensure Demographic Info panel is reset
      d3.select('#sample-metadata').html("");
    
      //Add demographic info of selected subject to panel
      Object.entries(subjectMetadata[0]).forEach(([key,value]) => {
        d3.select('#sample-metadata').append("h6").text(`${key}: ${value}`);
      });
    
      //Get data for selected subject ID
      let otuData = data.samples;
      let subjectOtuData = otuData.filter(subject => subject.id == sample);
      let sampleValues = subjectOtuData[0].sample_values;
      let otuIds = subjectOtuData[0].otu_ids;
      let otuLabels = subjectOtuData[0].otu_labels;
      let x = sampleValues.slice(0,10).reverse();
      let y = otuIds.slice(0,10).map(y => `OTU ${y}`).reverse();
      let hover = otuLabels.slice(0,10).reverse();
    
      //set parameters for charts
      let barTrace = {
        x: x,
        y: y,
        text: hover,
        type: 'bar',
        orientation: 'h'
      };
      let bubbleTrace = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuIds,
        }
      };
      let bubbleLayout = {
        xaxis: {title: 'OTU ID'}
      }
    
      //plot the charts
      Plotly.newPlot('bar', [barTrace]);
      Plotly.newPlot('bubble',[bubbleTrace],bubbleLayout);
      }
  });
  
