$.ajax({	
	url: "php/consulta.php",
	type: "get", 	    		
	success: function (response){		
		console.log(JSON.parse(response));

	},	
	error: function(jqXHR, textStatus, errorThrown){
		console.log(textStatus, errorThrown);
	}
});