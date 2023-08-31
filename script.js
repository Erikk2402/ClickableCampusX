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

// Define variables for the form and buttons
const customMarkerForm = document.getElementById('custom-marker-form');
const saveMarkerBtn = document.getElementById('save-marker-btn');
const cancelMarkerBtn = document.getElementById('cancel-marker-btn');
const markerTitleInput = document.getElementById('marker-title');
const markerDescriptionInput = document.getElementById('marker-description');

function openCustomMarkerForm(e) {
    const latlng = e.latlng;

    // Show the custom marker form
    customMarkerForm.style.display = 'block';

    // Clear the form inputs
    markerTitleInput.value = '';
    markerDescriptionInput.value = '';

    // Set up the click event for the Save button
    saveMarkerBtn.onclick = function () {
        const title = markerTitleInput.value;
        const description = markerDescriptionInput.value;

        // Create a new marker with the title and description
        const marker = L.marker(latlng)
            .addTo(map)
            .bindPopup(`<strong>${title}</strong><br>${description}`)
            .openPopup();

        // Save the marker to the database
        saveMarkerToDatabase(latlng, title, description);

        // Hide the custom marker form
        customMarkerForm.style.display = 'none';
    };

    // Set up the click event for the Cancel button
    cancelMarkerBtn.onclick = function () {
        customMarkerForm.style.display = 'none';
    };
}

// Close the custom marker form
function closeCustomMarkerForm() {
    var customMarkerForm = document.getElementById('custom-marker-form');
    customMarkerForm.style.display = 'none';
}

// Save the custom marker to the database
function saveCustomMarker(latlng) {
    var title = document.getElementById('marker-title').value;
    var description = document.getElementById('marker-description').value;

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
            closeCustomMarkerForm();
            // Refresh the map to display the newly added marker
            location.reload();
        });
}
