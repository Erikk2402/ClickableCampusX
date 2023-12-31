// Initialize the map
var map = L.map('map').setView([53.41874, -7.90476], 18);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Add event listener for clicking on the map
map.on('click', function (e) {
    openCustomMarkerForm(e.latlng.lat, e.latlng.lng);
});

// Define variables for the form and buttons
const customMarkerForm = document.getElementById('custom-marker-form');
const saveMarkerBtn = document.getElementById('save-marker-btn');
const cancelMarkerBtn = document.getElementById('cancel-marker-btn');
const markerTitleInput = document.getElementById('marker-title');
const markerDescriptionInput = document.getElementById('marker-description');

// Fetch and display markers from the database
function fetchMarkers() {
    fetch('fetch_markers.php')
        .then(response => response.json())
        .then(markers => {
            markers.forEach(marker => {
                const latlng = { lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) };
                const title = marker.title;
                const description = marker.description;
                const id = marker.id;

                const popupContent = `<div><strong>${title}</strong><br>${description}` +
                    `<br><button class="edit-marker-btn" data-id="${id}">Edit</button>` +
                    `<button class="delete-marker-btn" data-id="${id}">Delete</button></div>`;

                // Create a new marker with the title and description
                const newMarker = L.marker(latlng)
                    .addTo(map)
                    .bindPopup(popupContent) // Use the prepared popup content
                    .openPopup();

                // Add event listener for clicking on edit buttons within popups
                newMarker.getPopup().getElement().querySelector('.edit-marker-btn').addEventListener('click', function () {
                    openEditMarkerForm(newMarker);
                });

                // Add event listener for clicking on delete buttons within popups
                newMarker.getPopup().getElement().querySelector('.delete-marker-btn').addEventListener('click', function () {
                    const markerId = this.getAttribute('data-id');
                    deleteMarker(markerId);
                });
            });
        });
}

// Call the fetchMarkers function to load markers from the database
fetchMarkers();

function openCustomMarkerForm(lat, lng) {
    // Show the custom marker form
    customMarkerForm.style.display = 'block';

    // Clear the form inputs
    markerTitleInput.value = '';
    markerDescriptionInput.value = '';

    // Add click event for the Save button
    saveMarkerBtn.addEventListener('click', function saveMarkerHandler() {
        const title = markerTitleInput.value;
        const description = markerDescriptionInput.value;

        // Create a new marker with the title and description
        const marker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<strong>${title}</strong><br>${description}`)
            .openPopup();

        // Save the marker to the database
        saveCustomMarker([lat, lng], title, description);

        // Hide the custom marker form
        customMarkerForm.style.display = 'none';

        // Remove the event listener to prevent multiple listeners
        saveMarkerBtn.removeEventListener('click', saveMarkerHandler);
    });

    // Add click event for the Cancel button
    cancelMarkerBtn.addEventListener('click', function cancelMarkerHandler() {
        customMarkerForm.style.display = 'none';

        // Remove the event listener to prevent multiple listeners
        cancelMarkerBtn.removeEventListener('click', cancelMarkerHandler);
    });
}

// Close the custom marker form
function closeCustomMarkerForm() {
    var customMarkerForm = document.getElementById('custom-marker-form');
    customMarkerForm.style.display = 'none';
}

// Save the custom marker to the database
function saveCustomMarker(latlng, title, description) {
    fetch('server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'lat=' + latlng[0] + '&lng=' + latlng[1] + '&title=' + title + '&description=' + description,
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            closeCustomMarkerForm();
            // Refresh the map to display the newly added marker
            location.reload();
        });
}

function deleteMarker(id) {
    fetch('delete_marker.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'id=' + id,
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Refresh the map to remove the deleted marker
            location.reload();
        });
}

function openEditMarkerForm(marker) {
    const popup = marker.getPopup();

    const id = marker.options.id;
    const title = marker.options.title;
    const description = marker.options.description;

    const editForm = `
        <div>
            <input type="text" class="marker-title" value="${title}">
            <textarea class="marker-description">${description}</textarea>
            <button class="save-edit-marker-btn" data-id="${id}">Save</button>
            <button class="cancel-edit-marker-btn">Cancel</button>
        </div>
    `;

    popup.setContent(editForm);

    const titleElement = popup.getElement().querySelector('.marker-title');
    const descriptionElement = popup.getElement().querySelector('.marker-description');

    popup.getElement().querySelector('.save-edit-marker-btn').addEventListener('click', function () {
        const updatedTitle = titleElement.value;
        const updatedDescription = descriptionElement.value;
        updateMarkerInDatabase(id, updatedTitle, updatedDescription);
    });

    popup.getElement().querySelector('.cancel-edit-marker-btn').addEventListener('click', function () {
        popup.setContent(`<div><strong>${title}</strong><br>${description}<br><button class="delete-marker-btn" data-id="${id}">Delete</button><button class="edit-marker-btn" data-id="${id}">Edit</button></div>`);
    });
}

// Update the marker in the database
function updateMarkerInDatabase(marker) {
    const id = marker.id;
    const title = marker.title;
    const description = marker.description;

    fetch('update_marker.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'id=' + id + '&title=' + title + '&description=' + description,
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            fetchMarkers(); // Refresh the markers on the map
        });
}


