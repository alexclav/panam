<?php

//Funcion con parametros de db para establecer conexion
function conexion(){
$host = 'compuerta.cwf8dhh9r31l.us-east-1.rds.amazonaws.com';
$port = '5432';
$base_datos = 'pruebas_covid';
$usuario = 'postgres';
$pass = 'OTAQ7uP2wRxSSg1KnarS';
$conexion = pg_connect("host=$host port=$port dbname=$base_datos user=$usuario password=$pass");
return($conexion);
}
?>