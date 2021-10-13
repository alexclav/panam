var map, featureList, barrioSearch = [], deportivoSearch = [], turismoSearch = [], hotelSearch = [];

//ejecuta función de scroll del layer control cuando se cambia el tamaño de la ventana
$(window).resize(function() {
  sizeLayerControl();
});

//muestra el modal del feauture y hace zoom al hacer clic en elemento del sidebar (a traves de la funcion sidebarclick)
$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

//ilumina el feature al hacer hover sobre el elementos en el sidebar
if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

//quita la iluminacion del feature al quitar el puntero
$(document).on("mouseout", ".feature-row", clearHighlight);

//Lanza el modal del About al hacer clic en el elemento del navbar
$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

//Muestra la extension completa de los elementos del mapa
$("#full-extent-btn").click(function() {
  map.fitBounds(barrios.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

//Lanza el modal de la leyenda con boton del navbar
$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

//lanza el modal del login con boton del navbar
$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

//ejecuta funcion para mostrar el sidebar al hacer clic en boton poi del sidebar
$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

//muestra elementos del navbar para tamaños de pantalla pequeños al hacer clic en el boton (3 barritas)
$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

//muestra el sidebar al hacer clic en el icono de lupa (en caso de pantallas pequeñas)
$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

//esconde el sidebar al hacer clic en el boton al lado del titulo del sidebar
$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

//funcion que desplega el sidebar
function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

//funcion que pone el scroll al layer control al disminuir el tamaño de la ventana
function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

//Funcion que quita la iluminacion de los elementos
function clearHighlight() {
  highlight.clearLayers();
}

//acerca al feauture al hacer clic en elemento del sidebar, emula clic en el elemento sobre el mapa
function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  // Esconde el sidebar y muestra  el mapa en pantallas pequeñas
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

//funcion que controla el comportamiento de los elementos en el sidebar
function syncSidebar() {
  /* Vacía los elementos del sidebar */
  $("#feature-list tbody").empty();
  /* Recorre la capa de escenarios deportivos y añade elementos que son visibles en el mapa */
  deportes.eachLayer(function (layer) {
    if (map.hasLayer(deportesLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/mascota.png"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Recorre la capa de  hoteles y añade elementos que son visibles en el mapa */
  hoteles.eachLayer(function (layer) {
    if (map.hasLayer(hotelesLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/hotel.png"></td><td class="feature-name">' + layer.feature.properties.Hotel + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Recorre la capa de turismo y añade elementos que son visibles en el mapa */
  turismo.eachLayer(function (layer) {
    if (map.hasLayer(turismoLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/sitio.png"></td><td class="feature-name">' + layer.feature.properties.NOMBRE + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Actualiza la lista de elementos del sidebar y los ordena ascendentemente */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Capas de mapas base */
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
var usgsImagery = L.layerGroup([L.tileLayer("http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 15,
}), L.tileLayer.wms("http://raster.nationalmap.gov/arcgis/services/Orthoimagery/USGS_EROS_Ortho_SCALE/ImageServer/WMSServer?", {
  minZoom: 16,
  maxZoom: 19,
  layers: "0",
  format: 'image/jpeg',
  transparent: true,
  attribution: "Aerial Imagery courtesy USGS"
})]);

/* Capa de iluminacion de elemento (circulo color cyan) */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

//capa de barrios desde geojson
var barrios = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      weight: 1,
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  //llena array para busqueda de barrios
  onEachFeature: function (feature, layer) {
    barrioSearch.push({
      name: layer.feature.properties.barrio,
      source: "Barrios",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});
$.getJSON("data/barrios.geojson", function (data) {
  barrios.addData(data);
});


/* Marcador de Cluster que contiene todos los cluster */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* capa vacia para añadir o quitar escenarios si están/no están en la capa de clusters */
var deportesLayer = L.geoJson(null);
//capa de escenarios deportivos
var deportes = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/mascota.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.name,
      riseOnHover: true
    });
  },
  //crea la tabla para el modal del elemento y define que se muestra si se le hace clic. Tambien añade los datos para el array de busqueda
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Escenario Deportivo</th><td>" + feature.properties.name + "</td></tr>" + "<tr><th>Dirección</th><td>" + feature.properties.direccion + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/mascota.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      deportivoSearch.push({
        name: layer.feature.properties.name,
        address: layer.feature.properties.direccion,
        source: "Escenarios",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/centros.geojson", function (data) {
  deportes.addData(data);  
});

/* capa vacia para añadir o quitar hoteles si están/no están en la capa de clusters */
var hotelesLayer = L.geoJson(null);
var hoteles = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/hotel.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.Hotel,
      riseOnHover: true
    });
  },
  //crea la tabla para el modal del elemento y define que se muestra si se le hace clic. Tambien añade los datos para el array de busqueda
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Hotel</th><td>" + feature.properties.Hotel + "</td></tr>" + "<tr><th>Dirección</th><td>" + feature.properties.Direccion + "</td></tr>" + "<tr><th>Zona</th><td>" + feature.properties.Zona + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Hotel);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/hotel.png"></td><td class="feature-name">' + layer.feature.properties.Hotel + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      hotelSearch.push({
        name: layer.feature.properties.Hotel,
        address: layer.feature.properties.Direccion,
        source: "Hoteles",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/hoteles.geojson", function (data) {
  hoteles.addData(data);
  //se añade predeterminadamente al mapa
  map.addLayer(hotelesLayer);
});

/* capa vacia para añadir o quitar hoteles si están/no están en la capa de clusters */
var turismoLayer = L.geoJson(null);
var turismo = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/sitio.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NOMBRE,
      riseOnHover: true
    });
  },
  //crea la tabla para el modal del elemento y define que se muestra si se le hace clic. Tambien añade los datos para el array de busqueda
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Sitio Turístico</th><td>" + feature.properties.NOMBRE + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NOMBRE);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/sitio.png"></td><td class="feature-name">' + layer.feature.properties.NOMBRE + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      turismoSearch.push({
        name: layer.feature.properties.NOMBRE,       
        source: "Turismo",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/turisticos.geojson", function (data) {
  turismo.addData(data);

});

//definicion del mapa
map = L.map("map", {
  zoom: 12,
  center: [3.4114696,-76.5233574],
  layers: [cartoLight, barrios, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

/* Controla la capa de clusters segun las capas que estén activas */
map.on("overlayadd", function(e) {
  if (e.layer === deportesLayer) {
    markerClusters.addLayer(deportes);
    syncSidebar();
  }
  if (e.layer === hotelesLayer) {
    markerClusters.addLayer(hoteles);
    syncSidebar();
  }
  if (e.layer === turismoLayer) {
    markerClusters.addLayer(turismo);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === deportesLayer) {
    markerClusters.removeLayer(deportes);
    syncSidebar();
  }
  if (e.layer === hotelesLayer) {
    markerClusters.removeLayer(hoteles);
    syncSidebar();
  }
  if (e.layer === turismoLayer) {
    markerClusters.removeLayer(turismo);
    syncSidebar();
  }
});

/* filtra los elementos del sidebar para solo mostrar los visibles en el mapa */
map.on("moveend", function (e) {
  syncSidebar();
});

/* quita la iluminacion de un elemento haciendo clic en el mapa */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Control de atribución a autores de mapas base  */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://bryanmcbride.com'>bryanmcbride.com</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

//botones de control del zoom
var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* Ubicación del usuario*/
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: true,
  strings: {
    title: "Mi Ubicación",
    popup: "Estás en un radio de {distance} metros de este punto",
    outsideMapBoundsMsg: "Parece que estás por fuera de los límites del mapa"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* En pantallas grandes, el sidebar y el layer control están visibles */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

//agrupacion de mapas base
var baseLayers = {
  "Street Map": cartoLight,
  "Aerial Imagery": usgsImagery
};

//Agrupación de capas tipo punto
var groupedOverlays = {
  "Puntos de Interés": {
    "<img src='assets/img/hotel.png' width='24' height='28'>&nbsp;Hoteles": hotelesLayer,
    "<img src='assets/img/mascota.png' width='24' height='28'>&nbsp;Escenarios": deportesLayer,
    "<img src='assets/img/sitio.png' width='24' height='28'>&nbsp;Turismo": turismoLayer
//capas de referencia (barrios)
  },
  "Reference": {
    "Barrios": barrios    
  }
};

//crea el control layer y lo agrega al mapa
var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Ilumina la caja de búsqueda al hacerle clic */
$("#searchbox").click(function () {
  $(this).select();
});

/* Inhabilita que la pagina se refresque al presionar ENTER en la caja de busqueda */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

//cuando el modeal del feature se oculta, al sacar el puntero del elemento, se debe quitar la iluminacion
$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/*Busqueda predictiva  (Typeahead) */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  //cuando el mapa carga se debe hacer zoom a toda la extension de los elementos
  map.fitBounds(barrios.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  //crea el "sabueso" (bloodhound) para la capa de barrios, toqueniza los nombres
  var barriosBH = new Bloodhound({
    name: "Barrios",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: barrioSearch,
    limit: 10
  });
  //crea el bloodhound para capa escenarios deportivos
  var deportesBH = new Bloodhound({
    name: "Escenarios",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: deportivoSearch,
    limit: 10
  });
  //crea el bloodhound para capa hoteles
  var hotelesBH = new Bloodhound({
    name: "Hoteles",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: hotelSearch,
    limit: 10
  });
  //crea el bloodhound para capa turismo
  var turismoBH = new Bloodhound({
    name: "Turismo",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: turismoSearch,
    limit: 10
  });
  //crea el bloodhound para un api geocoder 
  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  //se inician los bloodhounds
  barriosBH.initialize();
  deportesBH.initialize();
  hotelesBH.initialize();
  turismoBH.initialize();
  geonamesBH.initialize();

  /* Se instancia el predictor en la caja de búsqueda */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Barrios",
    displayKey: "name",
    source: barriosBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Barrios</h4>"
    }
  }, {
    name: "Turismo",
    displayKey: "name",
    source: turismoBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/sitio.png' width='24' height='28'>&nbsp;Sitio Turístico</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp"].join(""))
    }
  }, {
    name: "Escenarios",
    displayKey: "name",
    source: deportesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/mascota.png' width='24' height='28'>&nbsp;Escenario Deportivo</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "Hoteles",
    displayKey: "name",
    source: hotelesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/hotel.png' width='24' height='28'>&nbsp;Hoteles</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Barrios") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "Escenarios") {
      if (!map.hasLayer(deportesLayer)) {
        map.addLayer(deportesLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Hoteles") {
      if (!map.hasLayer(hotelesLayer)) {
        map.addLayer(hotelesLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Turismo") {
      if (!map.hasLayer(turismoLayer)) {
        map.addLayer(turismoLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

//Scroll en layer control para navagadores tactiles
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}

// graficos en la seccion de estadisticas
$.ajax({	
	url: "assets/php/consulta.php",
  type: "get",
  dataType: 'json',
  contentType: "application/json; charset=utf-8", 	    		
	success: function (data){		

    var id = [];
    var Huespedes = [];
    var Positivos = [];
    var Recuperados = [];
    var Muestras = [];
    
    for (var i in data) {
        id.push(data[i].id);
        Huespedes.push(data[i].Huespedes);
        Positivos.push(data[i].Positivos);
        Recuperados.push(data[i].Recuperados);
        Muestras.push(data[i].Muestras);
    }    

    var chartdata = {
      labels: id,
      datasets: [{
          label: "Huespedes",
          borderWidth: 2,
          data: Huespedes,
          borderColor: "black",
          fill: false
      },
      {
        label: "Muestras",
        borderWidth: 2,
        data: Muestras,
        borderColor: "blue",
        fill: false
     },
     {
      label: "Positivos",
      borderWidth: 2,
      data: Positivos,
      borderColor: "red",
      fill: false
     },
     {
      label: "Recuperados",
      borderWidth: 2,
      data: Recuperados,
      borderColor: "green",
      fill: false
     }                
    ]
   };

    var mostrar = $("#myChart");

    var grafico = new Chart(mostrar, {
        type: 'line',
        data: chartdata,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0, 
                        max:50
                    }
                }]
            }
        }
    });



    },
    error: function(data) {
    console.log(data);
    } 

  });