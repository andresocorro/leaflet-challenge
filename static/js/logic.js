// Creating map object
var myMap = L.map("map", {
  center: [35.2452, -118.25],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v9",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson'

// color radius
d3.json(link).then(function(data){
  function styleInfo(features){
    return{
      opacity: 0.8,
      fillOpacity: 0.7,
      fillColor: getColor(features.properties.mag),
      stoke:true,
      weight: 0.4

    };
  }

  // change color based on magnitude
  function getColor(magnitude){
    switch(true){
      case magnitude > 5:
        return '#d62727';
      case magnitude > 4:
        return '#e37c27';
      case magnitude > 3:
        return '#f2a30c';
      case magnitude > 2:
        return '#ebca09';
      case magnitude >1:
        return '#d0e809';
      default:
        return '#96e805';
    }
  }

  // RADIUS

  // GeoJSON Data (circles)
  L.geoJson(data, {
    // create circles
    pointToLayer: function(features, latlng){
      return L.circleMarker(latlng,{
      radius: 7
      });
    },
    radius: 5,
    style: styleInfo,
    onEachFeature: function(features, layer){
      layer.bindPopup("Magnitude: " + features.properties.mag + "<br>Location: " + features.properties.place);
    }
  }).addTo(myMap);

  // add legend
  

})
