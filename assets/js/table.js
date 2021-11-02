$('#addDay').click(function(){
  var input = $('#date').val()+' 00:00';
  console.log(input);
  if (input=='2021-12-06 00:00') {
    $('#date').val('2021-11-21');
    $('#date').change()

  }else{
    var date = new Date(input);
    date.setDate(date.getDate() + 1);
    formatDate=date.toISOString().split('T')[0];
    $('#date').val(formatDate);
    $('#date').change()
  }  
});

$('#subDay').click(function(){
  var input = $('#date').val()+' 00:00';
  if (input=='2021-11-21 00:00') {
    $('#date').val('2021-12-06');
    $('#date').change()

  }else{
    var date = new Date(input);
    date.setDate(date.getDate() - 1);    
    formatDate=date.toISOString().split('T')[0];    
    $('#date').val(formatDate);
    $('#date').change()
  }  
});

$('#tabla').on('update', function(){
  var rows = $("#tabla tbody tr");
  for (var i = 0; i < rows.length; i++) {
    var total = parseFloat($("#tabla tbody tr").eq(i).children().eq(3).text());
    var aplicadas = parseFloat($("#tabla tbody tr").eq(i).children().eq(1).text());
    if (total==aplicadas) {
      rows.eq(i).attr('class', 'success');
    }else{
      rows.eq(i).attr('class', 'danger');
    }
  }
});

function doTheThing(){

  function random(data){
    var rdm = Math.round(Math.random());
    if (rdm==1) {
      return data;
    }else{
      return Math.floor(Math.random() * (data));
    }
  }


  function llenaTabla(data){
    $('#tabla > tbody > tr').empty();
    $("#tabla tbody #1").append('<td>Torre de Cali</td><td>'+ data.torre_de_cali +'</td><td>'+ Math.ceil(data.torre_de_cali/20) +'</td><td>'+random(data.torre_de_cali)+'</td>');
    $("#tabla tbody #2").append('<td>Spiwak</td><td>'+ data.spiwak +'</td><td>'+ Math.ceil(data.spiwak/20) +'</td><td>'+random(data.spiwak)+'</td>');
    $("#tabla tbody #3").append('<td>Dann Carlton</td><td>'+ data.dann_carlton +'</td><td>'+ Math.ceil(data.dann_carlton/20) +'</td><td>'+random(data.dann_carlton)+'</td>');
    $("#tabla tbody #4").append('<td>Azor</td><td>'+ data.azor +'</td><td>'+ Math.ceil(data.azor/20) +'</td><td>'+random(data.azor)+'</td>');
    $("#tabla tbody #5").append('<td>5ta Norte</td><td>'+ data.quinta_norte +'</td><td>'+ Math.ceil(data.quinta_norte/20) +'</td><td>'+random(data.quinta_norte)+'</td>');
    $("#tabla tbody #6").append('<td>Cosmos</td><td>'+ data.cosmos +'</td><td>'+ Math.ceil(data.cosmos/20) +'</td><td>'+random(data.cosmos)+'</td>');
    $("#tabla tbody #7").append('<td>City Express</td><td>'+ data.city_express +'</td><td>'+ Math.ceil(data.city_express/20) +'</td><td>'+random(data.city_express)+'</td>');
    $("#tabla tbody #8").append('<td>Calima</td><td>'+ data.calima +'</td><td>'+ Math.ceil(data.calima/20) +'</td><td>'+random(data.calima)+'</td>');
    $("#tabla tbody #9").append('<td>Diagonal</td><td>'+ data.diagonal +'</td><td>'+ Math.ceil(data.diagonal/20) +'</td><td>'+random(data.diagonal)+'</td>');
    $("#tabla tbody #10").append('<td>Sheraton</td><td>'+ data.sheraton +'</td><td>'+ Math.ceil(data.sheraton/20) +'</td><td>'+random(data.sheraton)+'</td>');
    $("#tabla tbody #11").append('<td>Mare</td><td>'+ data.mare +'</td><td>'+ Math.ceil(data.mare/20) +'</td><td>'+random(data.mare)+'</td>');
    $("#tabla tbody #12").append('<td>MS Chipichape</td><td>'+ data.ms_chipichape +'</td><td>'+ Math.ceil(data.ms_chipichape/20) +'</td><td>'+random(data.ms_chipichape)+'</td>');
    $("#tabla tbody #13").append('<td>Obelisco</td><td>'+ data.obelisco +'</td><td>'+ Math.ceil(data.obelisco/20) +'</td><td>'+random(data.obelisco)+'</td>');
    $("#tabla tbody #14").append('<td>Pacífico</td><td>'+ data.pacifico +'</td><td>'+ Math.ceil(data.pacifico/20) +'</td><td>'+random(data.pacifico)+'</td>');
    $("#tabla tbody #15").append('<td>San Antonio</td><td>'+ data.san_antonio +'</td><td>'+ Math.ceil(data.san_antonio/20) +'</td><td>'+random(data.san_antonio)+'</td>');
    $("#tabla tbody #16").append('<td>Versalles</td><td>'+ data.versalles +'</td><td>'+ Math.ceil(data.versalles/20) +'</td><td>'+random(data.versalles)+'</td>');
    $("#tabla").trigger('update');
    };


  var date = $('#date').val()

  $.ajax({
    url: "assets/php/pruebas.php",
    type: "post", 
    data:{date},    
    success: function (response){   
      const data = JSON.parse(response);
      // console.log(data);
      llenaTabla(data);
    },    
    error: function(jqXHR, textStatus, errorThrown){
      console.log(textStatus, errorThrown);
    }
  });  

};


doTheThing();

$('#date').change(function() {
  doTheThing();
});