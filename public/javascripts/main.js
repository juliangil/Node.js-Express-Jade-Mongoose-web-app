$(document).ready(() => {
    // set a listener on the textbox
    $('#btnBrowse').on("click", (evt) => {
        let nameReq = $('#input').val();
        // the {text: text} sends a parameter named text with the
        $.get('/names', {nameReq: nameReq})
            .done((data) => {
                $('#input').val(''); // reset the textbox
                var names = data.names
                var colors = data.colors
                render(names, colors)
            })
            .fail((xhr) => {
                alert('Problem contacting server');
                console.log(xhr);
            });
    });

    $('#btnClear').on("click", (evt) => {
        $.delete('/names')
            .done((data) => {
                $('#input').val(''); // reset the textbox
                var names = data.names
                var colors = data.colors
                render(names, colors)
            })
            .fail((xhr) => {
                alert('Problem contacting server');
                console.log(xhr);
            });
        
    });
});

function render(names, colors){
    console.log("names render")
    console.log(names)
    var labels = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000]

    var datasets = []

    for (var i = 0; i < names.length; i++) {
        for (var j = 0; j < labels.length; j++) {
            if(names[i][labels[j]] == 0)
            names[i][labels[j]] = 1001
        };        
    };

    for (var i = 0; i < names.length; i++) {
        var row = [];
        row['label'] = names[i]['name']
        row['fill'] = false
        row['backgroundColor'] = colors[i]
        row['borderColor'] = colors[i]
        row['borderWidth'] = 4
        row['data'] = [names[i]['1900'],names[i]['1910'],names[i]['1920'],names[i]['1930'],names[i]['1940'],names[i]['1950'],names[i]['1960'],names[i]['1970'],names[i]['1980'],names[i]['1990'],names[i]['2000'],]
        //row['data'] = [10,50,46,9,52,6,10]

        datasets.push(row)
        console.log(datasets)
    };

    var chartData = {
        labels: labels,
        datasets: datasets
    }
    var chartSettings = {
         data: chartData,
         options: {
             responsive: true,
             hoverMode: 'label',
             stacked: false,
             scales: {
                 xAxes: [
                     {
                         display: true,
                         gridLines: {
                             offsetGridLines: false
                         },
                         scaleLabel: {
                            display: true,
                            labelString: 'Year'
                          }
                     }
                 ],
                 yAxes: [
                     {
                         type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                         display: true,
                         position: "left",
                         id: "y-axis-2",
                         ticks : {
                             reverse : true
                         },
                         // grid line settings
                         gridLines: {
                             drawOnChartArea: false, // only want the grid lines for one axis to show up
                         },
                         scaleLabel: {
                            display: true,
                            labelString: 'Popularity'
                          }
                     }
                 ],
             },
         }
     }
     var ctx = document.getElementById("lineChart").getContext("2d"); 
    return line = new Chart.Line(ctx,chartSettings);
}

/*function displayLineChart() {

    var anios = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000]
    var datasets = []

    for (var i = 0; i < names.length; i++) {
        var row = [];
        row['label'] = names[(names.length-1)].name
        row['fillColor'] = "transparent"
        row['strokeColor'] = "rgba(220,220,220,1)"
        row['pointColor'] = "rgba(220,220,220,1)"
        row['pointStrokeColor'] = "#fff"
        row['pointHighlightFill'] = "#fff"
        row['pointHighlightStroke'] = "rgba(220,220,220,1)"
        //row['data'] = [names[i]['1900'],names[i]['1910'],names[i]['1920'],names[i]['1930'],names[i]['1940'],names[i]['1950'],names[i]['1960'],names[i]['1970'],names[i]['1980'],names[i]['1990'],names[i]['2000'],]
        row['data'] = [-10,-50,-46,-9,-52,-6,-10]

        datasets.push(row)
        console.log(datasets)
    };

    var data = {
        labels: anios,
        datasets: datasets
    };

    var type = {type:'line'}
    //var ctx = document.getElementById("lineChart").getContext("2d");
    //var options = {};

    //var lineChart = new Chart(ctx).Line(data, options);

    var ctx = document.getElementById("lineChart");

    var options = {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:false
                                }
                            }]
                        }
                    };

    var chart1 = new Chart(ctx, {

        data: data,
        options: options
    });
}

displayLineChart()
*/