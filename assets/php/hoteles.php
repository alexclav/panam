<?php 

include 'dbcon.php';
$dbcon = conexion(); 
// print_r($dbcon);
// exit();
$query = "select id, hotel, direccion, zona, x, y,huespedes,muestras,positivos,recuperados from Hoteles";
// $result = odbc_exec($dbcon,$query);
$result = sqlsrv_query($dbcon,$query);


$geojson = array('type' => 'FeatureCollection', 'name'=>'hoteles','features' => array());

while($row = sqlsrv_fetch_array($result)) {
    $marker = array(
        'type' => 'Feature',                   
        'properties' => array(
			"id" => $row['id'],
			"Hotel" => $row['hotel'],
			"Direccion" => $row['direccion'],
			"Zona" => $row['zona'],		
			"Huespedes" => $row['huespedes'],
			"Muestras" => $row['muestras'],
			"Positivos" => $row['positivos'],
			"Recuperados" => $row['recuperados']
        ),
        'geometry' => array(
            'type' => 'Point',
            'coordinates' => array(
                 floatval($row['x']),
                 floatval($row['y'])
            )
        )
        
    );
    array_push($geojson['features'], $marker);
}

echo json_encode($geojson); 

?>