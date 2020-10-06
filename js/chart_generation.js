function createChart () {
    let dataset1 = dropoutRate2008;
    let dataset2 = temp2015;

    let redLabel = [];
    let redData = [];

    for (let [key, value] of Object.entries(dataset1)) {
        redLabel.push(key);
        redData.push({x: dataset1[key], y: dataset2[key]});
    }

    console.log(redData);

    let ctx = document.getElementById("chart-area").getContext("2d");
    let myChart = new Chart(ctx, {
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