// Initialize the map
var map = L.map('map').setView([53.41874, -7.90476], 18);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

// Load map data from the server
fetch('server.php')
  .then(response => response.json())
  .then(data => {
    data.forEach(location => {
      L.marker([location.lat, location.lng])
        .bindPopup(location.title)
        .addTo(map);
    });
  });

// Add event listener for clicking on the map
map.on('click', function (e) {
  openCustomMarkerForm(e.latlng);
});

// Open the custom marker form
function openCustomMarkerForm(latlng) {
  var customMarkerForm = document.getElementById('custom-marker-form');
  var closeButton = customMarkerForm.querySelector('.close');
  var submitButton = customMarkerForm.querySelector('#custom-marker-submit');
  var titleInput = customMarkerForm.querySelector('#custom-marker-title');
  var descriptionInput = customMarkerForm.querySelector('#custom-marker-description');
  var latInput = customMarkerForm.querySelector('#custom-marker-lat');
  var lngInput = customMarkerForm.querySelector('#custom-marker-lng');

  customMarkerForm.style.display = 'block';
  latInput.value = latlng.lat;
  lngInput.value = latlng.lng;

  closeButton.onclick = function () {
    closeCustomMarkerForm();
  };

  submitButton.onclick = function (event) {
    event.preventDefault();
    saveCustomMarker(latlng);
  };
}

// Close the custom marker form
function closeCustomMarkerForm() {
  var customMarkerForm = document.getElementById('custom-marker-form');
  customMarkerForm.style.display = 'none';
}

// Save custom marker to the database
function saveCustomMarker(latlng) {
  var title = titleInput.value;
  var description = descriptionInput.value;
  var lat = latInput.value;
  var lng = lngInput.value;

  fetch('server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'lat=' + lat + '&lng=' + lng + '&title=' + title + '&description=' + description,
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      // Refresh the map to display the newly added marker
      location.reload();
    });
}
