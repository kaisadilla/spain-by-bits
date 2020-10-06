let chart;

function parseAndCreate() {
    console.log("Changed selection.");
    let menu1 = document.getElementById("chart1");
    let selected1 = menu1.value;
    let menu2 = document.getElementById("chart2");
    let selected2 = menu2.value;
    chart.destroy();
    createChart(selected1, selected2);
}

function createChart (id1, id2) {
    let dataset1 = datasets[id1].dataset;
    let dataset2 = datasets[id2].dataset;
    let redLabel = [];
    let redData = [];

    for (let [key, value] of Object.entries(dataset1)) {
        redLabel.push(key);
        redData.push({x: dataset1[key], y: dataset2[key]});
    }

    let ctx = document.getElementById("chart-area").getContext("2d");
    chart = new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [{
                label: "Scatter Dataset",
                data: redData,
                backgroundColor: "#33AEEF"
            }]
        },
        option: {
            scales: {
                xAxes: [{
                    type: "linear",
                    position: "bottom",
                }]
            }
        }
    });
}