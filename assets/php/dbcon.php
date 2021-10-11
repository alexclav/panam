<?php

// function conexion(){
// $myServer = "DESKTOP-O9KTC74";
// $myUser = "";
// $myPass = "";
// $myDB = "pruebas";
// $con = odbc_connect ( "Driver={SQL Server};Server=$myServer;Database=$myDB" , $myUser ,  $myPass);
// // print_r('hola'.$con);
// return($con);
// };

function conexion(){
	$serverName = "DESKTOP-O9KTC74";
	$connectionInfo = array(
	    "UID" => "",
	    "PWD" => "",
	    "Database" => "pruebas"
	);
	$conn = sqlsrv_connect($serverName, $connectionInfo);
	if ($conn === false) {		
	    echo "Unable to connect.</br>";
	    exit;
	} else {
		return($conn);
	    echo "Connected.</br>";
	}
};

?>