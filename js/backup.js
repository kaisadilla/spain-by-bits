// x

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
    if (dataset === "sun_hours") generateSunHours();
    if (dataset === "average_age") generateAverageAge();
    if (dataset === "immigrantion") generateImmigrantion();
    if (dataset === "vehicles") generateVehicles();
    if (dataset === "companies") generateCompanies();
    if (dataset === "alt_parties") generateAltParties();
    if (dataset === "cows") generateCows();
    if (dataset === "pigs") generatePigs();
    if (dataset === "popVar") generatePopVar();
    if (dataset === "birth_rate") generateBirthRate();
    if (dataset === "tourists") generateTourists();
    if (dataset === "dropout") generateDropout();
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
            ${(diffOcupacion2020T2[props.id] * 100).toFixed(1)} %
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

function generateSunHours() {
    getColor = function (val) {
        if      (val < 1500)  return "#ffecdb";
        else if (val < 1800)  return "#fcdec3";
        else if (val < 2100)  return "#f8cfac";
        else if (val < 2400)  return "#f4c196";
        else if (val < 2700)  return "#eeab75";
        else if (val < 3000)  return "#e79556";
        else if (val < 3300)  return "#df7e37";
        else                  return "#d66615";
    }

    setStyleSource(sunHours2015);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Horas de sol anual</h4>
            <strong>${props.name}</strong> <br />
            ${sunHours2015[props.id].toLocaleString("en")} h
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Horas de sol anual</h4>
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
            <i style = "background: ${getColor(0)   }"></i> < 1500 h <br />
            <i style = "background: ${getColor(1500)}"></i> < 1750 h <br />
            <i style = "background: ${getColor(1800)}"></i> < 2000 h <br />
            <i style = "background: ${getColor(2100)}"></i> < 2250 h <br />
            <i style = "background: ${getColor(2400)}"></i> < 2500 h <br />
            <i style = "background: ${getColor(2700)}"></i> < 2750 h <br />
            <i style = "background: ${getColor(3000)}"></i> < 3000 h <br />
            <i style = "background: ${getColor(3300)}"></i> 3000+ h <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateAverageAge() {
    getColor = function (val) {
        if      (val < 40.0)  return "#cfffff";
        else if (val < 41.5)  return "#bdf2f2";
        else if (val < 43.0)  return "#aae6e4";
        else if (val < 44.5)  return "#98d9d7";
        else if (val < 46.0)  return "#7cc6c3";
        else if (val < 47.5)  return "#5fb3b0";
        else if (val < 49.0)  return "#40a19c";
        else                  return "#138f89";
    }

    setStyleSource(averageAge2020);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Edad promedio</h4>
            <strong>${props.name}</strong> <br />
            ${averageAge2020[props.id].toLocaleString("en")} años
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Edad promedio</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Edad promedio</b><br />
            <i style = "background: ${getColor(0)   }"></i> < 40 años   <br />
            <i style = "background: ${getColor(40.0)}"></i> < 41.5 años <br />
            <i style = "background: ${getColor(41.5)}"></i> < 43 años   <br />
            <i style = "background: ${getColor(43.0)}"></i> < 44.5 años <br />
            <i style = "background: ${getColor(44.5)}"></i> < 46 años   <br />
            <i style = "background: ${getColor(46.0)}"></i> < 47.5 años <br />
            <i style = "background: ${getColor(47.5)}"></i> < 49 años   <br />
            <i style = "background: ${getColor(49.0)}"></i> 49+ años    <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateImmigrantion() {
    getColor = function (val) {
        if      (val < 0.03)  return "#fff3de";
        else if (val < 0.06)  return "#ffeac6";
        else if (val < 0.09)  return "#ffe0af";
        else if (val < 0.12)  return "#ffd698";
        else if (val < 0.14)  return "#ffcb7a";
        else if (val < 0.17)  return "#ffbf5c";
        else if (val < 0.20)  return "#ffb23a";
        else                  return "#ffa600";
    }

    setStyleSource(immigrationPerc2019);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>% de inmigrantes</h4>
            <strong>${props.name}</strong> <br />
            ${(immigrationPerc2019[props.id] * 100).toFixed(1)} %
            `
        }
        else {
            this.div.innerHTML = `
            <h4>% de inmigrantes</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>% de inmigrantes</b><br />
            <i style = "background: ${getColor(0)   }"></i> < 3 %  <br />
            <i style = "background: ${getColor(0.03)}"></i> < 6 %  <br />
            <i style = "background: ${getColor(0.06)}"></i> < 9 %  <br />
            <i style = "background: ${getColor(0.09)}"></i> < 12 % <br />
            <i style = "background: ${getColor(0.12)}"></i> < 14 % <br />
            <i style = "background: ${getColor(0.14)}"></i> < 17 % <br />
            <i style = "background: ${getColor(0.17)}"></i> < 20 % <br />
            <i style = "background: ${getColor(0.20)}"></i> 20+ %  <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateVehicles() {
    getColor = function (val) {
        if      (val < 0.6150)  return "#e3ffe9";
        else if (val < 0.6625)  return "#d2fddb";
        else if (val < 0.7100)  return "#c1facd";
        else if (val < 0.7575)  return "#b0f7bf";
        else if (val < 0.8050)  return "#95f3aa";
        else if (val < 0.8525)  return "#78ee94";
        else if (val < 0.90)    return "#55e97e";
        else                    return "#19e366";
    }

    setStyleSource(vehiclesPC2019);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Vehículos por habitante</h4>
            <strong>${props.name}</strong> <br />
            ${(vehiclesPC2019[props.id] * 100).toFixed(1)} %
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Vehículos por habitante</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Vehículos por habitante</b><br />
            <i style = "background: ${getColor(0)     }"></i> < 61.5 %  <br />
            <i style = "background: ${getColor(0.6150)}"></i> < 66.25 % <br />
            <i style = "background: ${getColor(0.6625)}"></i> < 71 %    <br />
            <i style = "background: ${getColor(0.7100)}"></i> < 75.75 % <br />
            <i style = "background: ${getColor(0.7575)}"></i> < 80.5 %  <br />
            <i style = "background: ${getColor(0.8050)}"></i> < 85.25 % <br />
            <i style = "background: ${getColor(0.8525)}"></i> < 90 %    <br />
            <i style = "background: ${getColor(0.9000)}"></i> 90+ %     <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateCompanies() {
    getColor = function (val) {
        if      (val < 0.050)  return "#dbf7ff";
        else if (val < 0.055)  return "#b4e2f2";
        else if (val < 0.060)  return "#88cae8";
        else if (val < 0.065)  return "#5db1e0";
        else if (val < 0.070)  return "#008bd2";
        else if (val < 0.075)  return "#0064c1";
        else if (val < 0.080)  return "#003ba8";
        else                   return "#0b0085";
    }

    setStyleSource(companiesPC2019);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Empresas / 100 hab. </h4>
            <strong>${props.name}</strong> <br />
            ${(companiesPC2019[props.id] * 100).toFixed(1)} empresas / 100 hab.
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Empresas / 100 hab. </h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Empresas / 100 hab. </b><br />
            <i style = "background: ${getColor(0)    }"></i> < 5 emp.   <br />
            <i style = "background: ${getColor(0.050)}"></i> < 5.5 emp. <br />
            <i style = "background: ${getColor(0.055)}"></i> < 6 emp.   <br />
            <i style = "background: ${getColor(0.060)}"></i> < 6.5 emp. <br />
            <i style = "background: ${getColor(0.065)}"></i> < 7 emp.   <br />
            <i style = "background: ${getColor(0.070)}"></i> < 7.5 emp. <br />
            <i style = "background: ${getColor(0.075)}"></i> < 8 emp.   <br />
            <i style = "background: ${getColor(0.080)}"></i> 8+ emp.    <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateAltParties() {
    getColor = function (val) {
        if      (val < 0.300)  return "#efd4ff";
        else if (val < 0.375)  return "#e2c0f5";
        else if (val < 0.450)  return "#d5abeb";
        else if (val < 0.525)  return "#c997e0";
        else if (val < 0.600)  return "#b679d0";
        else if (val < 0.675)  return "#a459bf";
        else if (val < 0.750)  return "#9138ae";
        else                   return "#70008a";
    }

    setStyleSource(altParties2019N);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Votos a partidos alternativos</h4>
            <strong>${props.name}</strong> <br />
            ${(altParties2019N[props.id] * 100).toFixed(2)} %.
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Votos a partidos alternativos</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>% Votos a partidos alternativos</b><br />
            <i style = "background: ${getColor(0)    }"></i> < 3 0%   <br />
            <i style = "background: ${getColor(0.300)}"></i> < 37.5 % <br />
            <i style = "background: ${getColor(0.375)}"></i> < 45 %   <br />
            <i style = "background: ${getColor(0.450)}"></i> < 52.5 % <br />
            <i style = "background: ${getColor(0.525)}"></i> < 60 %   <br />
            <i style = "background: ${getColor(0.600)}"></i> < 67.5 % <br />
            <i style = "background: ${getColor(0.675)}"></i> < 75 %   <br />
            <i style = "background: ${getColor(0.750)}"></i> 75+ %    <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateCows() {
    getColor = function (val) {
        if (val === undefined) return "transparent";
        if      (val < 10_000)  return "#f4ffb3";
        else if (val < 20_000)  return "#e8f092";
        else if (val < 50_000)  return "#d9e184";
        else if (val < 100_000) return "#cbd276";
        else if (val < 200_000) return "#b6bc62";
        else if (val < 300_000) return "#a1a64d";
        else if (val < 500_000) return "#8d9139";
        else                    return "#65691f";
    }

    setStyleSource(cows2019N);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Ganado bovino</h4>
            <strong>${props.name}</strong> <br />
            ${cows2019N[props.id].toLocaleString("en")} vacas.
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Ganado bovino</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Ganado bovino</b><br />
            <i style = "background: ${getColor(0)      }"></i> < 10 k  <br />
            <i style = "background: ${getColor(10_000) }"></i> < 20 k  <br />
            <i style = "background: ${getColor(20_000) }"></i> < 50 k  <br />
            <i style = "background: ${getColor(50_000) }"></i> < 100 k <br />
            <i style = "background: ${getColor(100_000)}"></i> < 200 k <br />
            <i style = "background: ${getColor(200_000)}"></i> < 300 k <br />
            <i style = "background: ${getColor(300_000)}"></i> < 500 k <br />
            <i style = "background: ${getColor(500_000)}"></i> 500+ k  <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generatePigs() {
    getColor = function (val) {
        if (val === undefined)    return "transparent";
        if      (val < 20_000)    return "#ffebf5";
        else if (val < 50_000)    return "#fbd7ea";
        else if (val < 100_000)   return "#f6c2df";
        else if (val < 200_000)   return "#f0aed4";
        else if (val < 500_000)   return "#e790c4";
        else if (val < 1_000_000) return "#dc70b5";
        else if (val < 4_000_000) return "#c74ba0";
        else                      return "#ab1a87";
    }

    setStyleSource(pigs2019N);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Ganado porcino</h4>
            <strong>${props.name}</strong> <br />
            ${pigs2019N[props.id].toLocaleString("en")} cerdos.
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Ganado porcino</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Ganado porcino</b><br />
            <i style = "background: ${getColor(0)        }"></i> < 20 k  <br />
            <i style = "background: ${getColor(20_000)   }"></i> < 50 k  <br />
            <i style = "background: ${getColor(50_000)   }"></i> < 100 k <br />
            <i style = "background: ${getColor(100_000)  }"></i> < 200 k <br />
            <i style = "background: ${getColor(200_000)  }"></i> < 500 k <br />
            <i style = "background: ${getColor(500_000)  }"></i> < 1 m   <br />
            <i style = "background: ${getColor(1_000_000)}"></i> < 4 m   <br />
            <i style = "background: ${getColor(4_000_000)}"></i> 4+ m    <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generatePopVar() {
    getColor = function (val) {
        if (val === undefined) return "transparent";
        if      (val < -0.10)  return "#de425b";
        else if (val < -0.07)  return "#e9747e";
        else if (val < -0.04)  return "#f09fa2";
        else if (val < -0.01)  return "#f3c8c9";
        else if (val <  0.01)  return "#f1f1f1";
        else if (val <  0.04)  return "#c2d5db";
        else if (val <  0.07)  return "#93bbc6";
        else if (val <  0.10)  return "#60a1b1";
        else                   return "#16879c";
    }

    setStyleSource(popVar2009_2019);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Variación en la población</h4>
            <strong>${props.name}</strong> <br />
            ${(popVar2009_2019[props.id] * 100).toFixed(2)} %.
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Variación en la población</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Variación en la población</b><br />
            <i style = "background: ${getColor(-0.20) }"></i> < -10 % <br />
            <i style = "background: ${getColor(-0.10) }"></i> < -7 %  <br />
            <i style = "background: ${getColor(-0.07) }"></i> < -4 %  <br />
            <i style = "background: ${getColor(-0.04) }"></i> < -1 %  <br />
            <i style = "background: ${getColor(-0.01) }"></i> < 1 %   <br />
            <i style = "background: ${getColor( 0.01) }"></i> < 4 %   <br />
            <i style = "background: ${getColor( 0.04) }"></i> < 7 %   <br />
            <i style = "background: ${getColor( 0.07) }"></i> < 10 %  <br />
            <i style = "background: ${getColor( 0.10) }"></i> 10+ %   <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateBirthRate() {
    getColor = function (val) {
        if (val === undefined) return "transparent";
        if      (val < 5)      return "#deffe6";
        else if (val < 6)      return "#c8efd2";
        else if (val < 7)      return "#b2debe";
        else if (val < 8)      return "#9dceaa";
        else if (val < 9)      return "#7eb68d";
        else if (val < 10)     return "#5e9e72";
        else if (val < 12)     return "#3d8757";
        else                   return "#14703d";
    }

    setStyleSource(birthRate2019);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Nacimientos por mil</h4>
            <strong>${props.name}</strong> <br />
            ${(birthRate2019[props.id]).toFixed(2)} ‰
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Nacimientos por mil</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Nacimientos por mil</b><br />
            <i style = "background: ${getColor(0)  }"></i> < 5 ‰  <br />
            <i style = "background: ${getColor(5)  }"></i> < 6 ‰  <br />
            <i style = "background: ${getColor(6)  }"></i> < 7 ‰  <br />
            <i style = "background: ${getColor(7)  }"></i> < 8 ‰  <br />
            <i style = "background: ${getColor(8)  }"></i> < 9 ‰  <br />
            <i style = "background: ${getColor(9)  }"></i> < 10 ‰ <br />
            <i style = "background: ${getColor(10) }"></i> < 12 ‰ <br />
            <i style = "background: ${getColor(12) }"></i> 12+ ‰  <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateTourists() {
    getColor = function (val) {
        if (val === undefined)    return "transparent";
        if      (val < 100_000)   return "#ffedc4";
        else if (val < 200_000)   return "#f5dfb1";
        else if (val < 400_000)   return "#ebd29e";
        else if (val < 800_000)   return "#ddbd83";
        else if (val < 1_600_000) return "#cda664";
        else if (val < 3_200_000) return "#bd8e46";
        else if (val < 6_200_000) return "#996b25";
        else                      return "#704500";
    }

    setStyleSource(tourists2017);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Turistas anuales</h4>
            <strong>${props.name}</strong> <br />
            ${(tourists2017[props.id]).toLocaleString("en")} turistas.
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Turistas anuales</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Turistas anuales</b><br />
            <i style = "background: ${getColor(0)         }"></i> < 100 k <br />
            <i style = "background: ${getColor(100_000)   }"></i> < 200 k <br />
            <i style = "background: ${getColor(200_000)   }"></i> < 400 k <br />
            <i style = "background: ${getColor(400_000)   }"></i> < 800 k <br />
            <i style = "background: ${getColor(800_000)   }"></i> < 1.6 m <br />
            <i style = "background: ${getColor(1_600_000) }"></i> < 3.2 m <br />
            <i style = "background: ${getColor(3_200_000) }"></i> < 6.4 m <br />
            <i style = "background: ${getColor(6_200_000) }"></i> 6.4+ m  <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateDropout() {
    getColor = function (val) {
        if (val === undefined) return "transparent";
        if      (val < 0.16)   return "#ffe9d9";
        else if (val < 0.20)   return "#f0dac7";
        else if (val < 0.24)   return "#e3c7b4";
        else if (val < 0.28)   return "#c8a590";
        else if (val < 0.32)   return "#ad826c";
        else if (val < 0.36)   return "#92614b";
        else if (val < 0.40)   return "#77412c";
        else                   return "#5c2111";
    }

    setStyleSource(dropoutRate2008);

    generateMap();

    info.update = function(props) {
        if (props) {
            this.div.innerHTML = `
            <h4>Abandono escolar (2008)</h4>
            <strong>${props.name}</strong> <br />
            ${(dropoutRate2008[props.id] * 100).toFixed(1)} %.
            `
        }
        else {
            this.div.innerHTML = `
            <h4>Abandono escolar (2008)</h4>
            Coloca el cursor sobre una provincia.
            `
        }
    }

    info.addTo(map);

    legend = L.control({position: "bottomright"});

    legend.onAdd = function (_) {
        let div = L.DomUtil.create("div", "info legend");

        div.innerHTML += `
            <b>Abandono escolar</b><br />
            <i style = "background: ${getColor(0.00)}"></i> < 16 % <br />
            <i style = "background: ${getColor(0.16)}"></i> < 20 % <br />
            <i style = "background: ${getColor(0.20)}"></i> < 24 % <br />
            <i style = "background: ${getColor(0.24)}"></i> < 28 % <br />
            <i style = "background: ${getColor(0.28)}"></i> < 32 % <br />
            <i style = "background: ${getColor(0.32)}"></i> < 36 % <br />
            <i style = "background: ${getColor(0.36)}"></i> < 40 % <br />
            <i style = "background: ${getColor(0.40)}"></i> 40+ %  <br />
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