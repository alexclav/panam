<?php
	
  include('dbcon.php');
  $cdb = conexion();	


	$sql = "select * from delegaciones";
	$resultado = sqlsrv_query($cdb, $sql);	

	while($row = sqlsrv_fetch_array($resultado)){
 	  $return_arr[]= array( 	 		
		"Delegacion" => $row['Delegaciones'],
         "Anfitriones" => $row['Anfitriones']);
    };


  echo json_encode($return_arr);
  

?>