// https://leaflet-extras.github.io/leaflet-providers/preview/

let map;
let geojson;
let info;
let legend;

let getColor;
let style;

function generate (id) {
    let dataset =
                (id === "population")      ? population          :
                (id === "unemployment")    ? paro2020T2          :
                (id === "life_expectancy") ? lifeExpectancy2019  :
                (id === "average_salary")  ? avgSalary2017       :
                (id === "rain")            ? rain2015            :
                (id === "temperature")     ? temp2015            :
                (id === "sun_hours")       ? sunHours2015        :
                (id === "average_age")     ? averageAge2020      :
                (id === "immigrantion")    ? immigrationPerc2019 :
                (id === "vehicles")        ? vehiclesPC2019      :
                (id === "companies")       ? companiesPC2019     :
                (id === "alt_parties")     ? altParties2019N     :
                (id === "cows")            ? cows2019N           :
                (id === "pigs")            ? pigs2019N           :
                (id === "popVar")          ? popVar2009_2019     :
                (id === "birth_rate")      ? birthRate2019       :
                (id === "tourists")        ? tourists2017        :
                (id === "dropout")         ? dropoutRate2008     :
                undefined;
    setStyleSource(dataset);
    setColorScheme(id);

    drawMap();

    buildInfo(id);
    buildLegend(id);
}

/**
 * Creates the getColor() function, used to assign a color to each province depending
 * on the value in the dataset for that province.
 * @param {string} id The id of the dataset.
 */
function setColorScheme(id) {
    if (id === "population") {
        getColor = function (val) {
            if      (val < 100_000)   return "#ede8ff";
            else if (val < 200_000)   return "#e1d9fb";
            else if (val < 400_000)   return "#d5cbf7";
            else if (val < 800_000)   return "#b9a8ec";
            else if (val < 1_600_000) return "#9f86df";
            else if (val < 3_200_000) return "#8563d2";
            else if (val < 5_000_000) return "#6b3fc3";
            else                      return "#4f12b3";
        }
    }
    else if (id === "unemployment") {
        getColor = function (val) {
            if      (val < 8)    return "#ffe8f1";
            else if (val < 10)   return "#ebcfd9";
            else if (val < 12)   return "#d8b5c2";
            else if (val < 15)   return "#c59dab";
            else if (val < 17)   return "#a87989";
            else if (val < 19)   return "#8c5668";
            else if (val < 22)   return "#703449";
            else                 return "#54112b";
        }
    }
}

/**
 * Creates the info panel for the dataset selected.
 * @param {string} id The id of the dataset.
 */
function buildInfo(id) {
    if (id === "population") {
        setInfoUpdate(population, "Número de habitantes", v => `${v.toLocaleString("en")} hab.`);
    }
    else if (id === "unemployment") {
        setInfoUpdate(paro2020T2, "% desempleados", v => `${v.toFixed(2)} %`);
    }


    info.addTo(map);
}

function buildLegend(id) {
    if (id === "population") {
        setLegend(
            "Habitantes",
            [        0, "< 100 k"],
            [  100_000, "< 200 k"],
            [  200_000, "< 400 k"],
            [  400_000, "< 800 k"],
            [  800_000, "< 1.6 m"],
            [1_600_000, "< 3.2 m"],
            [3_200_000, "< 5 m"  ],
            [5_000_000, "5+ m"   ],
        )
    }
    else if (id === "unemployment") {
        setLegend(
            "% desempleados",
            [ 0, "< 8 %" ],
            [ 8, "< 10 %"],
            [10, "< 12 %"],
            [12, "< 15 %"],
            [15, "< 17 %"],
            [17, "< 19 %"],
            [19, "< 22 %"],
            [22, "22+ %" ],
        )
    }

    legend.addTo(map);
}

function drawMap() {
    map = L.map("map-area", {
        zoomSnap: 0.1
    }).setView([39.97, -2.90], 6.5);

    geojson = L.geoJson(provincesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    info = L.control();

    info.onAdd = function (_) {
        this.div = L.DomUtil.create("div", "info");
        this.update();
        return this.div;
    }
    
    legend = L.control({position: "bottomright"});
}

/**
 * Builds the style function to pull data from the chosen dataset.
 * The color of a province will always be transparent if the value for
 * that province in the dataset is "undefined".
 * @param {DataSet} dataset 
 */
function setStyleSource(dataset) {
    style = function (feature) {
        let val = dataset[feature.properties.id];
        return {
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "1",
            fillOpacity: 1,
            fillColor: (val === undefined) ? "transparent" : getColor(val)
        }
    }
}

/**
 * Creates the info that will be displayed when the user hovers over a province.
 * @param {string} dataset The data set used for this map.
 * @param {string} dataName The name for this label.
 * @param {function} format A function that defined how the value must be rendered.
 */
function setInfoUpdate(dataset, dataName, format) {
    info.update = function (props) {
        if (props) {
            this.div.innerHTML = `
            <h4>${dataName}</h4>
            <strong>${props.name}</strong> <br />
            ${format(dataset[props.id])}
            `
        }
        else {
            this.div.innerHTML = `
            <h4>${dataName}</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }
}

/**
 * Sets the legend HTML, with a name and any amount of labels.
 * Labels are generated by calculating the color obtained from a certain value,
 * and then writing the label paired with that value.
 * @param {string} dataName The name of the legend.
 * @param  {...[number, string]} pairs The value used to calculate the color of this sample, and the label of such sample.
 */
function setLegend(dataName, ...pairs) {
    console.log("a");
    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML = `<b>${dataName}</b> <br />`
        for (let i = 0; i < pairs.length; i++) {
            div.innerHTML += `<i style="background: ${getColor(pairs[i][0])}"></i> ${pairs[i][1]} <br />`
        }

        return div;
    }
}

function moveIslands() {
    console.log("owo");
    move(findById("gran_canaria"));
    move(findById("tenerife"));
    
    function move (island) {
        for (let i = 0; i < island.geometry.coordinates.length; i++) {
            for (let j = 0; j < island.geometry.coordinates[i].length; j++) {
                for (let k = 0; k < island.geometry.coordinates[i][j].length; k++) {
                    island.geometry.coordinates[i][j][k][0] += 5;
                    island.geometry.coordinates[i][j][k][1] += 9;
                }
            }
        }
    }
}


/* 
 * *****************************************
 * *****************************************
 * *****************************************
 * *****************************************
 */

function highlightFeature(evt) {
    let layer = evt.target;
    layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: ""
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(evt) {
    geojson.resetStyle(evt.target);
    info.update();
}

function onEachFeature(_, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}