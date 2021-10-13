<?php 

include 'dbcon.php';
$dbcon = conexion(); 
// print_r($dbcon);
// exit();
$query = "select id, hotel, direccion, zona, x, y,huespedes,Muestras,Positivos,Recuperados  from Hoteles";
// $result = odbc_exec($dbcon,$query);
$result = sqlsrv_query($dbcon,$query);

while($row = sqlsrv_fetch_array($result)){

	$properties[]= array(
		"id" => $row['id'],
		"hotel" => $row['hotel'],
		"direccion" => $row['direccion'],
		"zona" => $row['zona'],
		"x" => $row['x'],
		"y" => $row['y'],
		"Huespedes" => $row['huespedes'],
		"Muestras" => $row['Muestras'],
		"Positivos" => $row['Positivos'],
		"Recuperados" => $row['Recuperados']
	);

// $geometry[]= array(	
// 	"geometry" => $row['geometry']);
};

// $response=array($properties,$geometry);

echo json_encode($properties);


?>