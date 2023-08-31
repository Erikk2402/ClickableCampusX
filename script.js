// Initialize the map
var map = L.map('map').setView([53.41874, -7.90476], 18);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Add event listener for clicking on the map
map.on('click', function (e) {
    openCustomMarkerForm(e.latlng);
});

function openCustomMarkerForm(latlng) {
    var modal = document.getElementById('marker-form');
    modal.style.display = 'block';

    var closeButton = document.getElementsByClassName('close')[1];
    closeButton.onclick = function () {
        closeModal(modal);
    };

    var form = document.getElementById('custom-marker-form');
    form.onsubmit = function (event) {
        event.preventDefault();
        var title = document.getElementById('marker-title').value;
        var description = document.getElementById('marker-description').value;

        addCustomMarkerToDatabase(latlng, title, description); // Save data to the database
        closeModal(modal);
    };
}