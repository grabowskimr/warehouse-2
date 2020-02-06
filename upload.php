<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    $success = 0;
    $uploadedFile = '';
    $uploadPath = 'w-uploads/';
    $targetPath = $uploadPath . time() .'-'. basename( $_FILES['image']['name']);

    if(@move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)){
        $success = 1;
        $uploadedFile = $targetPath;
		$messageData = (object) [
			'path' => $uploadedFile,
			'status' => true
		];
		return print_r(json_encode($messageData));
    }
?>