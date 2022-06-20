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

// 13.5.2 Create dark view tile layer.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// 13.5.4 Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
}) 

// 13.5.4 Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// 13.5.3 Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/RebeccaA79/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup("<h3>" + "Airport Code: " + feature.properties.faa +
      "</h3><hr><p>" + feature.properties.name + "</p>");
    }    
  }).addTo(map);
  });
