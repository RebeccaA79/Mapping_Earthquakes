// 13.2.4 Add console.log to check to see if our code is working.
console.log("working");

// 13.4.3 Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// 13.4.3 Coordinates for each point to be used in the line.
let line = [
    [37.6213, -122.3790],
    [30.1974, -97.6664],
    [43.6777, -79.6248],
    [40.6413, -73.78097]
  ];

// 13.4.3 Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "blue",
    weight: 4,
    opacity: 0.5,
    dashArray: "6",
  }).addTo(map);




// 13.2.4 We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);