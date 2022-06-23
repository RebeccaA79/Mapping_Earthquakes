// 13.2.4 Add console.log to check to see if our code is working.
console.log("working");

// 13.5.3 Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);

// 13.5.2 Add GeoJSON data.
//let sanFranAirport =
//{"type":"FeatureCollection","features":[{
    //"type":"Feature",
    //"properties":{
       // "id":"3469",
        //"name":"San Francisco International Airport",
        //"city":"San Francisco",
        //"country":"United States",
       // "faa":"SFO",
        //"icao":"KSFO",
        //"alt":"13",
        //"tz-offset":"-8",
        //"dst":"A",
        //"tz":"America/Los_Angeles"},
        //"geometry":{
          //  "type":"Point",
            //"coordinates":[-122.375,37.61899948120117]}}
//]};

// 13.5.2 Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport, {
  // We turn each feature into a marker on the map.
  //onEachFeature: function(feature, layer) {
    //console.log(layer);
    //layer.bindPopup("<h3>" + "Airport Code: " + feature.properties.faa +
    //"</h3><hr><p>" + feature.properties.name + "</p>");
  // }

//}).addTo(map);

// 13.2.4 We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// 13.5.6 - create satellite streets layer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// 13.5.5 create light tile layer
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, 
    accessToken: API_KEY
});

// 13.5.2 Create dark view tile layer.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Day Navigation": light,
    "Night Navigation": dark,
    "Streets": streets,
    "Satellite": satelliteStreets
  };

// 13.6.4 Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// 13.6.4We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
  };


// 13.5.4 Create the map object with center, zoom level and default layer for Toronto.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
}) 

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// 13.5.6 Accessing the Toronto neighborhoods GeoJSON URL.
//let torontoHoods = "https://raw.githubusercontent.com/RebeccaA79/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// 13.5.5 Accessing the Toronto airline routes GeoJSON URL.
//let torontoData = "https://raw.githubusercontent.com/RebeccaA79/Mapping_Earthquakes/main/torontoRoutes.json";

// 13.5.4 Pass our map layers into our layers control and add the layers control to the map.
//L.control.layers(baseMaps).addTo(map);

// 13.5.3 Accessing the airport GeoJSON URL
//let airportData = "https://raw.githubusercontent.com/RebeccaA79/Mapping_Earthquakes/main/majorAirports.json";

// 13.5.5 Create a style for the lines.
//let myStyle = {
  //color: "#313d99",
  //fillColor: "#ffffa1",
  //weight: 1
//}

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    
// 13.6.2 This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(),
    stroke: true,
    weight: 0.5
  };

  // 13.6.3 This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
  }
}
  // Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
   // We turn each feature into a circleMarker on the map.

pointToLayer: function(feature, latlng) {
  console.log(data);
  return L.circleMarker(latlng);
},
  // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
  // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
}).addTo(earthquakes);

// 13.6.4 then we add the earthquake layer to the map 
earthquakes.addTo(map);

});
