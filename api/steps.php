<?php
require 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['recipe_id'])) {
        $recipe_id = $_GET['recipe_id'];
        $stmt = $conn->prepare("SELECT * FROM steps WHERE recipe_id = :recipe_id ORDER BY step_number");
        $stmt->bindParam(':recipe_id', $recipe_id);
        $stmt->execute();
        $steps = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($steps);
    } else {
        echo json_encode(["message" => "Recipe ID is required"]);
    }
}
?>