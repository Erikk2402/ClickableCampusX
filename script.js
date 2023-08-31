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
    var customMarkerForm = document.getElementById('custom-marker-form');
    customMarkerForm.style.display = 'block';

    var closeMarkerFormButton = document.getElementsByClassName('close-marker-form')[0];
    closeMarkerFormButton.onclick = function () {
        closeCustomMarkerForm();
    };

    var markerForm = document.getElementById('marker-form');
    markerForm.onsubmit = function (event) {
        event.preventDefault();
        addCustomMarker(latlng);
        closeCustomMarkerForm();
    };
}

function closeCustomMarkerForm() {
    var customMarkerForm = document.getElementById('custom-marker-form');
    customMarkerForm.style.display = 'none';
}

function addCustomMarker(latlng) {
    var titleInput = document.getElementById('marker-title');
    var descriptionInput = document.getElementById('marker-description');

    var title = titleInput.value;
    var description = descriptionInput.value;

    var customMarker = L.marker(latlng).addTo(map);
    customMarker.bindPopup(`<b>${title}</b><br>${description}`).openPopup();

    // Save the marker information to the database
    saveCustomMarkerToDatabase(latlng, title, description);
}

function saveCustomMarkerToDatabase(latlng, title, description) {
    fetch('server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'lat=' + latlng.lat + '&lng=' + latlng.lng + '&title=' + title + '&description=' + description,
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    });
}
