// https://leaflet-extras.github.io/leaflet-providers/preview/

let map;
let geojson;
let info;
let legend;

let getColor;
let style;

function generate (dataset) {
    if (dataset === "population") generatePopulation();
    if (dataset === "unemployment") generateUnemployment();
    if (dataset === "diff_ocupacion") generateDiffOcupacion();
    if (dataset === "life_expectancy") generateLifeExpectancy();
}

function alterStyle() {
    function styleb (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "1",
            fillOpacity: 1,
            fillColor: "red"
        }
    }

    geojson = L.geoJson(provincesData, {
        style: styleb,
        onEachFeature: onEachFeature
    }).addTo(map);
}

function generateMap() {
    map = L.map('map-area', {
        zoomSnap: 0.1
    }).setView([39.97, -2.90], 6.5);

    geojson = L.geoJson(provincesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
}

function generatePopulation() {
    getColor = function (val) {
        if      (val < 50_000)    return "#ffeda0";
        else if (val < 100_000)   return "#fed974";
        else if (val < 200_000)   return "#feb24c";
        else if (val < 500_000)   return "#fd8d3c";
        else if (val < 1_000_000) return "#fc4e2a";
        else if (val < 2_000_000) return "#e31a1c";
        else if (val < 5_000_000) return "#bd0026";
        else                      return "#800026";
    }

    style = function (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "1",
            fillOpacity: 1,
            fillColor: getColor(population[feature.properties.id])
        }
    }

    generateMap();

    info = L.control();

    info.onAdd = function(_) {
        this.div = L.DomUtil.create("div", "info");
        this.update();
        return this.div;
    }

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
            <i style = "background: ${getColor(0)}"></i> &lt; 50 k <br />
            <i style = "background: ${getColor(50_000)}"></i> &lt; 100 k <br />
            <i style = "background: ${getColor(100_000)}"></i> &lt; 200 k <br />
            <i style = "background: ${getColor(200_000)}"></i> &lt; 500 k <br />
            <i style = "background: ${getColor(500_000)}"></i> &lt; 1 m <br />
            <i style = "background: ${getColor(1_000_000)}"></i> &lt; 2 m <br />
            <i style = "background: ${getColor(2_000_000)}"></i> &lt; 5 m <br />
            <i style = "background: ${getColor(5_000_000)}"></i> 5+ m <br />
        `;

        return div;
    }

    legend.addTo(map);
}

function generateUnemployment() {
    getColor = function (val) {
        if      (val < 7)    return "#ffeda0";
        else if (val < 9)    return "#fed974";
        else if (val < 12)   return "#feb24c";
        else if (val < 15)   return "#fd8d3c";
        else if (val < 18)   return "#fc4e2a";
        else if (val < 21)   return "#e31a1c";
        else if (val < 24)   return "#bd0026";
        else                 return "#800026";
    }

    style = function (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "1",
            fillOpacity: 1,
            fillColor: getColor(paro2020T2[feature.properties.id])
        }
    }

    generateMap();

    info = L.control();

    info.onAdd = function(_) {
        this.div = L.DomUtil.create("div", "info");
        this.update();
        return this.div;
    }

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
            <i style = "background: ${getColor(0)}"></i> < 7% <br />
            <i style = "background: ${getColor(7)}"></i> 7% - 9% <br />
            <i style = "background: ${getColor(9)}"></i> 9% - 12% <br />
            <i style = "background: ${getColor(12)}"></i>  12% - 15% <br />
            <i style = "background: ${getColor(15)}"></i>  15% - 18% <br />
            <i style = "background: ${getColor(18)}"></i>  18% - 21% <br />
            <i style = "background: ${getColor(21)}"></i>  21% - 24% <br />
            <i style = "background: ${getColor(24)}"></i> > 24% <br />
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

    style = function (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "1",
            fillOpacity: 1,
            fillColor: getColor(diffOcupacion2020T2[feature.properties.id])
        }
    }

    generateMap();

    info = L.control();

    info.onAdd = function(_) {
        this.div = L.DomUtil.create("div", "info");
        this.update();
        return this.div;
    }

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
        if      (val >= 84.5)  return "#ffeda0";
        else if (val >= 84)    return "#fed974";
        else if (val >= 83.5)  return "#feb24c";
        else if (val >= 83)    return "#fd8d3c";
        else if (val >= 82.5)  return "#fc4e2a";
        else if (val >= 82)    return "#e31a1c";
        else if (val >= 81)    return "#bd0026";
        else                   return "#800026";
    }

    style = function (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "1",
            fillOpacity: 1,
            fillColor: getColor(lifeExpectancy2019[feature.properties.id])
        }
    }

    generateMap();

    info = L.control();

    info.onAdd = function(_) {
        this.div = L.DomUtil.create("div", "info");
        this.update();
        return this.div;
    }

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
            <i style = "background: ${getColor(84.5)}"></i> > 84.5 <br />
            <i style = "background: ${getColor(84)}"></i> 84 - 84.5 <br />
            <i style = "background: ${getColor(83.5)}"></i> 83.5 - 84 <br />
            <i style = "background: ${getColor(83)}"></i> 83 - 83.5 <br />
            <i style = "background: ${getColor(82.5)}"></i> 82.5 - 83 <br />
            <i style = "background: ${getColor(82)}"></i> 82 - 82.5 <br />
            <i style = "background: ${getColor(81)}"></i> 81 - 82 <br />
            <i style = "background: ${getColor(80)}"></i> < 81 <br />
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