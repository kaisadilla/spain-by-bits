let map;
let geojson;
let info;
let legend;
let style;

function generate (dataset) {
    if (dataset === "population") generatePopulation();
}

function generatePopulation() {
    console.log("Gen");
    map = L.map('map-area', {
        zoomSnap: 0.1
    }).setView([39.97, -2.90], 6.5);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    function getColor(val) {
        if      (val < 50_000)    return "#ffeda0";
        else if (val < 100_000)   return "#fed974";
        else if (val < 200_000)   return "#feb24c";
        else if (val < 500_000)   return "#fd8d3c";
        else if (val < 1_000_000) return "#fc4e2a";
        else if (val < 2_000_000) return "#e31a1c";
        else if (val < 5_000_000) return "#bd0026";
        else                      return "#800026";
    }

    function style (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "1",
            fillOpacity: 1,
            fillColor: getColor(population[feature.properties.id])
        }
    }

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