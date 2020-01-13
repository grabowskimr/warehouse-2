<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

$servername = "localhost";
$username = "root";
$password = "root";
$dbmane = "service";

$conn = new mysqli($servername, $username, $password, $dbmane);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function sendMessage($message, $status, $data) {
	$messageData = (object) [
		'message' => $message,
		'status' => $status,
		'data' => $data
	];
	return print_r(json_encode($messageData));
}

function callDB($sql, $type) {
    global $conn;

    if($type ==='INSERT') {
        $result = $conn->query($sql);
        return $result;
    } else if($type === 'ID') {
        $result = $conn->query($sql);
        return $conn->insert_id;
    } else {
        $result = $conn->query($sql);
    	$outLista = [];
    	while($row = mysqli_fetch_assoc($result)) {
    		array_push($outLista,$row);
    	}
    	return $outLista;
    }

}

$_POST = json_decode(file_get_contents('php://input'), true);

if (isset($_POST["action"])) {
    $action = $_POST["action"];
    $data = (object) $_POST;

    if($action == 'checkAccess') {
        $sql = '';
        if($data->isAdmin) {
            $sql = "SELECT * FROM w_sessions WHERE user_id = $data->id AND session_id = '$data->sessionId' AND profile='admin'";
        } else {
            $sql = "SELECT * FROM w_sessions WHERE user_id = $data->id AND session_id = '$data->sessionId'";
        }
        $sessionData = (object) callDB($sql, '')[0];
        if($sessionData->id) {
            sendMessage('Session ok', true, $sessionData);
        } else {
            sendMessage('Session not ok', false, $sessionData);
        }
    }

    if($action == "login") {
        $sql = "SELECT * FROM w_users WHERE login = '$data->login' AND password = '$data->password'";
        $userData = (object) callDB($sql, '')[0];

        if($userData->id) {
           $sql2 = "INSERT INTO w_sessions (session_id, user_id, profile) VALUES ('$data->sessionId', $userData->id, '$userData->profile')";
           $sessionData = (object) callDB($sql2, '')[0];
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

    if($action == 'addProduct') {
        $sql = "INSERT INTO w_products(name, product_index, price, supplier, quantity, quantityType, quantityAlert, picture) VALUES ('$data->name', '$data->product_index', $data->price, '$data->supplier', $data->quantity, '$data->quantityType', '$data->quantityAlert', '$data->picture')";
        $status = callDB($sql, 'INSERT');
        if($status) {
            $product = [(object) [
                'name' => $data->name,
                'status' => true
            ]];
            sendMessage('Dodano', true, $product);
        } else {
            $product = [(object) [
                'name' => $data->name,
                'status' => false
            ]];
            sendMessage('Błąd', false, $product);
        }
    }

    if($action == 'updateProduct') {
        $sql = "UPDATE w_products SET name = '$data->name', product_index = '$data->product_index', price = $data->price, supplier = '$data->supplier', quantity = $data->quantity, quantityType = '$data->quantityType', quantityAlert = '$data->quantityAlert', picture = '$data->picture' WHERE id = $data->id";
        $status = callDB($sql, 'INSERT');
        if($status) {
            $product = [(object) [
                'name' => $data->name,
                'status' => true
            ]];

            $sql2 = "INSERT INTO w_actions(product_id, user_id, type, count, date, order_id) VALUES ('$data->product_id', '$data->user_id', '$data->type', $data->count, '$data->date', 0)";
            $action = callDB($sql2, 'INSERT');
            if($action) {
                sendMessage('Zmodyfikowano', true, $product);
            } else {
                sendMessage('Błąd', false, $product);
            }
        } else {
            $product = [(object) [
                'name' => $data->name,
                'status' => false
            ]];
            sendMessage('Błąd', false, $product);
        }
        return;
    }

    if($action == 'createOrder') {
        $createOrdersql3 = "INSERT INTO w_orders(name, order_products, type, user_id, date, user_name) VALUES ('$data->name', '$data->orderProducts', '$data->type', $data->userId, '$data->date', '$data->userName')";
        $createOrderorderId = callDB($createOrdersql3, 'ID');
        if($createOrderorderId) {
            foreach($data->products as $product) {
                $createOrderupdate = "UPDATE w_products SET quantity = ".$product['newQuantity']." WHERE id = ". $product['id'] .";";
                $conn->query($createOrderupdate);

                $createOrderinsert = "INSERT INTO w_actions(product_id, user_id, type, count, date, order_id) VALUES (". $product['id'] .", $data->userId, '$data->type', ".$product['count'].", '$data->date', $createOrderorderId);";
                $conn->query($createOrderinsert);
            }
            sendMessage('Dodano raport', true, $createOrderorderId);
        } else {
            sendMessage('Błąd', false, $orderId);
        }
    }

    if($action == 'createAddition') {
        $sql3 = "INSERT INTO w_orders(name, order_products, type, user_id, date, user_name) VALUES ('$data->name', '$data->orderProducts', '$data->type', $data->userId, '$data->date', '$data->userName')";
        $orderId = callDB($sql3, 'ID');
        if($orderId) {
            foreach($data->products as $product) {
                $update = "UPDATE w_products SET quantity = ".$product['newQuantity']." WHERE id = ". $product['id'] .";";
                $conn->query($update);

                $insert = "INSERT INTO w_actions(product_id, user_id, type, count, date, order_id) VALUES (". $product['id'] .", $data->userId, '$data->type', ".$product['count'].", '$data->date', $orderId);";
                $conn->query($insert);
            }
            sendMessage('Dodano', true, $orderId);
        } else {
            sendMessage('Błąd', false, $orderId);
        }
    }

    if($action == 'addUser') {
        $sql = "INSERT INTO w_users(login, password, profile) VALUES ('$data->login', '$data->password', '$data->profile')";
        $user = callDB($sql, 'INSERT');
        if($user) {
            sendMessage('Dodano', true, $user);
        } else {
            sendMessage('Błąd', false, $user);
        }
    }

    if($action == 'editUser') {
        $sql = "UPDATE w_users SET password = '$data->password' WHERE id = $data->id";
        $user = callDB($sql, 'INSERT');
        if($user) {
            sendMessage('Zmodyfikowano', true, $user);
        } else {
            sendMessage('Błąd', false, $user);
        }
    }

    if($action == 'removeUser') {
        $sql = "DELETE FROM w_users WHERE id = $data->id";
        $user = callDB($sql, 'INSERT');
        if($user) {
            sendMessage('Usunięto', true, $user);
        } else {
            sendMessage('Błąd', false, $user);
        }
    }


}

if (isset($_GET["action"])) {
    $action = $_GET["action"];
    $data = (object) $_GET;

    if($action == 'getProducts') {
        $sql = "SELECT * FROM w_products";
        $products = callDB($sql, '');
        sendMessage('Produkty', true, $products);
    }

    if($action == 'getProduct') {
        $sql = "SELECT * FROM w_products WHERE id = $data->id";
        $product = callDB($sql, '');
        sendMessage('Product', true, $product);
    }

    if($action == 'getProductHistory') {
        $sql = "SELECT * FROM w_actions WHERE product_id = $data->productId";
        $products = callDB($sql, '');
        sendMessage('Product', true, $products);
    }

    if($action == 'getUsers') {
        $sql = "SELECT * FROM w_users";
        $products = callDB($sql, '');
        sendMessage('Urzytkownicy', true, $products);
    }

    if($action == 'getOrderDayHistory') {
        $sql = "SELECT * FROM w_orders WHERE type = 'order' AND date >= CURDATE() ORDER BY id DESC";
        $products = callDB($sql, '');
        sendMessage('Historia Week', true, $products);
    }

    if($action == 'getOrderWeekHistory') {
        $sql = "SELECT * FROM w_orders WHERE type = 'order' AND YEARWEEK(date, 1) = YEARWEEK(CURRENT_DATE(), 1) AND YEAR(date) = YEAR(CURRENT_DATE()) ORDER BY id DESC";
        $products = callDB($sql, '');
        sendMessage('Historia Week', true, $products);
    }

    if($action == 'getOrderMonthHistory') {
        $sql = "SELECT * FROM w_orders WHERE type = 'order' AND MONTH(date) = MONTH(CURRENT_DATE()) AND YEAR(date) = YEAR(CURRENT_DATE()) ORDER BY id DESC";
        $products = callDB($sql, '');
        sendMessage('Historia miesiąc', true, $products);
    }

}
