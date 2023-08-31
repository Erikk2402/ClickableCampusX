// Initialize the map
var map = L.map('map').setView([53.41874, -7.90476], 18);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Add event listener for clicking on the map
map.on('click', function (e) {
    addMarker(e.latlng);
});

// Add marker function
function addMarker(latlng) {
    L.marker(latlng)
        .addTo(map)
        .bindPopup('A new marker!') // You can customize the popup content
        .openPopup();
}
