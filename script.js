// Initialize the map
var map = L.map('map').setView([53.41874, -7.90476], 18);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Load map data from the server and create markers
fetch('server.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(location => {
            L.marker([location.lat, location.lng])
                .bindPopup(`<b>${location.title}</b><br>${location.description}`)
                .addTo(map);
        });
    });

// Open the custom marker form with title and description
function openCustomMarkerForm(latlng) {
    var markerForm = document.getElementById('marker-form');
    markerForm.style.display = 'block';

    var form = document.getElementById('custom-marker-form');
    form.onsubmit = function (event) {
        event.preventDefault();
        var title = document.getElementById('custom-marker-title').value;
        var description = document.getElementById('custom-marker-description').value;

        addCustomMarkerToDatabase(latlng, title, description);
        addCustomMarkerToMap(latlng, title, description);
        closeModal(markerForm);
    };

    var closeButton = document.getElementById('custom-marker-close');
    closeButton.onclick = function () {
        closeModal(markerForm);
    };
}

// Close the modal
function closeModal(modal) {
    modal.style.display = 'none';
}

// Add a custom marker to the map
function addCustomMarkerToMap(latlng, title, description) {
    L.marker(latlng)
        .bindPopup(`<b>${title}</b><br>${description}`)
        .addTo(map);
}

// Add a custom marker to the database
function addCustomMarkerToDatabase(latlng, title, description) {
    fetch('server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `lat=${latlng.lat}&lng=${latlng.lng}&title=${title}&description=${description}`,
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        });
}

// Add event listener for clicking on the map
map.on('click', function (e) {
    openCustomMarkerForm(e.latlng);
});
