<?php
	
  include('dbcon.php');
  $cdb = conexion();	

  $date= $_POST['date'];

	$sql = "select * from pruebas where fecha='$date'";
	$resultado = sqlsrv_query($cdb, $sql);	
  
	while($row = sqlsrv_fetch_array($resultado)){
 	  $return_arr[]= array( 	 		
		"torre_de_cali" => $row['torre_de_cali'],
    "spiwak" => $row['spiwak'],
    "dann_carlton" => $row['dann_carlton'],
    "azor" => $row['azor'],
    "quinta_norte" => $row['quinta_norte'],
    "cosmos" => $row['cosmos'],
    "city_express" => $row['city_express'],
    "calima" => $row['calima'],
    "diagonal" => $row['diagonal'],
    "sheraton" => $row['sheraton'],
    "mare" => $row['mare'],
    "ms_chipichape" => $row['ms_chipichape'],
    "obelisco" => $row['obelisco'],
    "pacifico" => $row['pacifico'],
    "san_antonio" => $row['san_antonio'],
    "versalles" => $row['versalles']);
  };

  //Retorno del array como un JSON
  echo json_encode($return_arr[0]);
  

?>