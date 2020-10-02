// https://leaflet-extras.github.io/leaflet-providers/preview/

let map;
let geojson;
let info;
let legend;

let getColor;
let style;

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

function generate (dataset) {
    if (dataset === "population") generatePopulation();
    if (dataset === "unemployment") generateUnemployment();
    if (dataset === "diff_ocupacion") generateDiffOcupacion();
    if (dataset === "life_expectancy") generateLifeExpectancy();
    if (dataset === "average_salary") generateAverageSalary();
    if (dataset === "rain") generateRain();
    if (dataset === "temperature") generateTemperature();
}

function findById (id) {
    for (let i = 0; i < provincesData.features.length; i++) {
        if (provincesData.features[i].properties.id === id) {
            return provincesData.features[i];
        }
    }
    return null;
}

function generateMap() {
    map = L.map('map-area', {
        zoomSnap: 0.1
    }).setView([39.97, -2.90], 6.5);

    geojson = L.geoJson(provincesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    info = L.control();

    info.onAdd = function(_) {
        this.div = L.DomUtil.create("div", "info");
        this.update();
        return this.div;
    }
}

function setStyleSource(dataset) {
    style = function (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "1",
            fillOpacity: 1,
            fillColor: getColor(dataset[feature.properties.id])
        }
    }
}

function generatePopulation() {
    setStyleSource(population);

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

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Población por provincia</h4>
            <strong>${props.name}</strong> <br />
            ${population[props.id].toLocaleString("en")} hab.
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Población por provincia</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Habitantes</b><br />
            <i style = "background: ${getColor(0)        }"></i> < 100 k <br />
            <i style = "background: ${getColor(100_000)  }"></i> < 200 k <br />
            <i style = "background: ${getColor(200_000)  }"></i> < 400 k <br />
            <i style = "background: ${getColor(400_000)  }"></i> < 800 k <br />
            <i style = "background: ${getColor(800_000)  }"></i> < 1.6 m <br />
            <i style = "background: ${getColor(1_600_000)}"></i> < 3.2 m <br />
            <i style = "background: ${getColor(3_200_000)}"></i> < 5 m <br />
            <i style = "background: ${getColor(5_000_000)}"></i> 5+ m <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateUnemployment() {
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

    setStyleSource(paro2020T2);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Desempleo por provincia</h4>
            <strong>${props.name}</strong> <br />
            ${paro2020T2[props.id]}%
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Desempleo por provincia</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>% de desempleo</b><br />
            <i style = "background: ${getColor(0) }"></i> < 8 % <br />
            <i style = "background: ${getColor(8) }"></i> < 10 % <br />
            <i style = "background: ${getColor(10)}"></i> < 12 % <br />
            <i style = "background: ${getColor(12)}"></i> < 15 % <br />
            <i style = "background: ${getColor(15)}"></i> < 17 % <br />
            <i style = "background: ${getColor(17)}"></i> < 19 % <br />
            <i style = "background: ${getColor(19)}"></i> < 22 % <br />
            <i style = "background: ${getColor(22)}"></i> 22+ % <br />
        `;

        return div;
    }

    legend.addTo(map);
}


function generateDiffOcupacion() {
    getColor = function (val) {
        if      (val >= 1)      return "#ffeda0";
        else if (val >= 0.90)   return "#fed974";
        else if (val >= 0.85)   return "#feb24c";
        else if (val >= 0.80)   return "#fd8d3c";
        else if (val >= 0.75)   return "#fc4e2a";
        else if (val >= 0.70)   return "#e31a1c";
        else if (val >= 0.65)   return "#bd0026";
        else                   return "#800026";
    }

    setStyleSource(diffOcupacion2020T2);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Desigualdad de empleo</h4>
            <strong>${props.name}</strong> <br />
            ${(diffOcupacion2020T2[props.id] * 100).toFixed(1)}%
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Desigualdad de empleo</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>% de mujeres empleadas respecto de hombres</b><br />
            <i style = "background: ${getColor(1)}"></i> > 100% <br />
            <i style = "background: ${getColor(0.90)}"></i> 100% - 90% <br />
            <i style = "background: ${getColor(0.85)}"></i> 90% - 85% <br />
            <i style = "background: ${getColor(0.80)}"></i> 85% - 80% <br />
            <i style = "background: ${getColor(0.75)}"></i> 80% - 75% <br />
            <i style = "background: ${getColor(0.70)}"></i> 75% - 70% <br />
            <i style = "background: ${getColor(0.65)}"></i> 70% - 65% <br />
            <i style = "background: ${getColor(0.60)}"></i> < 65% <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateLifeExpectancy() {
    getColor = function (val) {
        if      (val < 81.0) return "#e9ffd4";
        else if (val < 82.0) return "#d3ebbc";
        else if (val < 82.5) return "#bdd7a5";
        else if (val < 83.0) return "#a7c38e";
        else if (val < 83.5) return "#87a66d";
        else if (val < 84.0) return "#678a4d";
        else if (val < 84.5) return "#496e2e";
        else                 return "#2a540d";
    }

    setStyleSource(lifeExpectancy2019);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Esperanza de vida</h4>
            <strong>${props.name}</strong> <br />
            ${lifeExpectancy2019[props.id]} años
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Esperanza de vida</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Habitantes</b><br />
            <i style = "background: ${getColor(0)   }"></i> < 81 <br />
            <i style = "background: ${getColor(81.0)}"></i> < 82 <br />
            <i style = "background: ${getColor(82.0)}"></i> < 82.5 <br />
            <i style = "background: ${getColor(82.5)}"></i> < 83 <br />
            <i style = "background: ${getColor(83.0)}"></i> < 83.5 <br />
            <i style = "background: ${getColor(83.5)}"></i> < 84 <br />
            <i style = "background: ${getColor(84.0)}"></i> < 84.5 <br />
            <i style = "background: ${getColor(84.5)}"></i> 84.5+ <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateAverageSalary() {
    getColor = function (val) {
        if      (isNaN(val))    return "transparent";
        if      (val < 13_000)  return "#e6ffe8";
        else if (val < 15_000)  return "#ceeecf";
        else if (val < 17_000)  return "#b6deb7";
        else if (val < 18_000)  return "#9fcd9e";
        else if (val < 19_000)  return "#7db47a";
        else if (val < 21_000)  return "#5b9b56";
        else if (val < 23_000)  return "#398332";
        else                    return "#086b06";
    }

    setStyleSource(avgSalary2017);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Salario medio</h4>
            <strong>${props.name}</strong> <br />
            €${avgSalary2017[props.id].toLocaleString("en")}
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Salario medio</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Salario medio</b><br />
            <i style = "background: ${getColor(0)}"></i> < €13 k <br />
            <i style = "background: ${getColor(13_000)}"></i> €13 k - €15 k <br />
            <i style = "background: ${getColor(15_000)}"></i> €15 k - €17 k <br />
            <i style = "background: ${getColor(17_000)}"></i> €17 k - €18 k <br />
            <i style = "background: ${getColor(18_000)}"></i> €18 k - €19 k <br />
            <i style = "background: ${getColor(19_000)}"></i> €19 k - €21 k <br />
            <i style = "background: ${getColor(21_000)}"></i> €21 k - €23 k <br />
            <i style = "background: ${getColor(23_000)}"></i> < €23 k <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateRain() {
    getColor = function (val) {
        if      (val < 250)  return "#e8efef";
        else if (val < 300)  return "#cedee0";
        else if (val < 400)  return "#a9bec2";
        else if (val < 500)  return "#869fa5";
        else if (val < 700)  return "#64808a";
        else if (val < 900)  return "#446370";
        else if (val < 1100) return "#244758";
        else                 return "#002c40";
    }

    setStyleSource(rain2015);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Precipitación anual</h4>
            <strong>${props.name}</strong> <br />
            ${rain2015[props.id].toLocaleString("en")} mm
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Precipitación anual</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Salario medio</b><br />
            <i style = "background: ${getColor(0)}"></i> < 200 mm <br />
            <i style = "background: ${getColor(250)}"></i> 250 - 300 mm <br />
            <i style = "background: ${getColor(300)}"></i> 300 - 400 mm <br />
            <i style = "background: ${getColor(400)}"></i> 400 - 500 mm <br />
            <i style = "background: ${getColor(500)}"></i> 500 - 700 mm <br />
            <i style = "background: ${getColor(700)}"></i> 700 - 900 mm <br />
            <i style = "background: ${getColor(900)}"></i> 900 - 1100 mm <br />
            <i style = "background: ${getColor(1100)}"></i> > 1100 mm <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateTemperature() {
    getColor = function (val) {
        if      (val < 12.0)  return "#fff8ad";
        else if (val < 13.5)  return "#fae791";
        else if (val < 15.0)  return "#f7d476";
        else if (val < 16.5)  return "#f4b24b";
        else if (val < 18.0)  return "#f29830";
        else if (val < 19.5)  return "#f07b18";
        else if (val < 21.0)  return "#ee5a07";
        else                  return "#eb2907";
    }

    setStyleSource(temp2015);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Temperatura promedio anual</h4>
            <strong>${props.name}</strong> <br />
            ${temp2015[props.id].toLocaleString("en")} °C
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Temperatura promedio anual</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Temperatura</b><br />
            <i style = "background: ${getColor(0)}"></i> < 12 °C <br />
            <i style = "background: ${getColor(12.0)}"></i> < 13.5 °C <br />
            <i style = "background: ${getColor(13.5)}"></i> < 15 °C <br />
            <i style = "background: ${getColor(15.0)}"></i> < 16.5 °C <br />
            <i style = "background: ${getColor(16.5)}"></i> < 18 °C <br />
            <i style = "background: ${getColor(18.0)}"></i> < 19.5 °C <br />
            <i style = "background: ${getColor(19.5)}"></i> < 21 °C <br />
            <i style = "background: ${getColor(21.0)}"></i> 21+ °C <br />
        `;

        return div;
    }

    legend.addTo(map);
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