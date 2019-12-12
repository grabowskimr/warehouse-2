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
        $sql = "SELECT * FROM w_sessions WHERE user_id = $data->id AND session_id = '$data->sessionId'";
        $sessionData = (object) callDB($sql)[0];
        if($sessionData->id) {
            sendMessage('Session ok', true, $sessionData);
        } else {
            sendMessage('Session not ok', false, $sessionData);
        }
    }

    if($action == "login") {
        $sql = "SELECT * FROM w_users WHERE login = '$data->login' AND password = '$data->password'";
        $userData = (object) callDB($sql)[0];

        if($userData->id) {
           $sql2 = "INSERT INTO w_sessions (session_id, user_id) VALUES ('$data->sessionId', $userData->id)";
           $sessionData = (object) callDB($sql2)[0];
           $loginToAppInfo = [(object) [
                'login' => $userData->login,
                'name' => $userData->name,
                'id' => $userData->id,
                'profile' => $userData->profile,
                'email' => $userData->email,
                'session_id' => $data->sessionId
            ]];
            sendMessage('Zalogowano', true, $loginToAppInfo);
        } else {
            sendMessage('Błąd', false, []);
        }
    }
}