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
    // Process the data and create markers
    data.forEach(location => {
      L.marker([location.lat, location.lng])
        .bindPopup(location.title)
        .addTo(map);
    });
  });

// Add event listener for clicking on the map
map.on('click', function (e) {
  openModal(e.latlng);
});

// Open the modal with the form
function openModal(latlng) {
  document.getElementById('note-title').value = '';
  document.getElementById('note-description').value = '';

  var modal = document.getElementById('modal');
  var closeButton = document.getElementsByClassName('close')[0];

  modal.style.display = 'block';

  closeButton.onclick = function () {
    closeModal();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  var form = document.getElementById('note-form');
  form.onsubmit = function (event) {
    event.preventDefault();
    saveNoteToDatabase(latlng);
    closeModal();
  };
}

// Close the modal
function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Save the note to the database
function saveNoteToDatabase(latlng) {
  var title = document.getElementById('note-title').value;
  var description = document.getElementById('note-description').value;

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
      // Refresh the map to display the newly added marker
      location.reload();
    });
}
