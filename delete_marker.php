<?php
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "admin";
$dbname = "map_notes_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the marker ID from POST data
if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // Delete the marker from the database
    $sql = "DELETE FROM locations WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo "Marker deleted successfully";
    } else {
        echo "Error deleting marker: " . $conn->error;
    }
}

$conn->close();
?>
