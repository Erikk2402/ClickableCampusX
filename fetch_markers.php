<?php
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "admin";
$dbname = "map_notes_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch markers from the database
$sql = "SELECT * FROM locations";
$result = $conn->query($sql);

$markers = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $markers[] = $row;
    }
}

$conn->close();

// Return markers as JSON
header('Content-Type: application/json');
echo json_encode($markers);
?>
