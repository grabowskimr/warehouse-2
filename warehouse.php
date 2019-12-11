<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

function sendMessage($message, $status, $data) {
	$messageData = (object) [
		'message' => $message,
		'status' => $status,
		'data' => $data
	];
	return print_r(json_encode($messageData));
}

function callDB($sql) {
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbmane = "service";

    $conn = new mysqli($servername, $username, $password, $dbmane);
    $conn->set_charset("utf8");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $result = $conn->query($sql);
	$outLista = [];
	while($row = mysqli_fetch_assoc($result)) {
		array_push($outLista,$row);
	}

	return $outLista;
}

$_POST = json_decode(file_get_contents('php://input'), true);

if (isset($_POST["action"])) {
    $action = $_POST["action"];
    $data = (object) $_POST;

    if($action == 'checkAccess') {
       sendMessage('Security issue', false);
    }

    if($action == "login") {
        $sql = "SELECT * FROM w_users WHERE login = '$data->login' AND password = '$data->password'";
        $data = callDB($sql);
        sendMessage('Zalogowano', true, $data);
    }
}