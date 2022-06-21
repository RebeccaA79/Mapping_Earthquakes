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
    //"Day Navigation": light,
    //"Night Navigation": dark,
    "Streets": streets,
    "Satellite": satelliteStreets
  };

// 13.5.4 Create the map object with center, zoom level and default layer for Toronto.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
}) 

// 13.5.6 Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/RebeccaA79/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// 13.5.5 Accessing the Toronto airline routes GeoJSON URL.
//let torontoData = "https://raw.githubusercontent.com/RebeccaA79/Mapping_Earthquakes/main/torontoRoutes.json";

// 13.5.4 Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// 13.5.3 Accessing the airport GeoJSON URL
//let airportData = "https://raw.githubusercontent.com/RebeccaA79/Mapping_Earthquakes/main/majorAirports.json";

// 13.5.5 Create a style for the lines.
let myStyle = {
  color: "#313d99",
  fillColor: "#ffffa1",
  weight: 1
}

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
    style: myStyle,
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup("<h3>" + "Neighborhood: " + feature.properties.AREA_NAME);
    }    
  }).addTo(map);
  });
