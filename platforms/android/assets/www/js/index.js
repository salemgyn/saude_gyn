//Espere o Phonegap Carregar
var map;
var mapOptions;
var marker;
function onSuccessPosition(position){
	map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
	marker.setPosition(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
}
function onErrorPosition(error){
	alert("Erro!\nCodigo: "+error.code+"\nMensagem: "+error.message);
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	$("#btnTema").click(function(){
		$(".app").removeClass("ui-page-theme-a").addClass("ui-page-theme-b");
	});
	$(document).delegate("#mapPage", "pageshow", function() {
		$("#divMap").css("height",parseInt($(window).height())*0.95); //0.95 = 95% of the viewport to display the map		
		map = new google.maps.Map(document.getElementById("divMap"),{zoom: 16, center: new google.maps.LatLng(-16.6958759,-49.3042674), mapTypeId: google.maps.MapTypeId.ROADMAP})
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(-16.6958759,-49.3042674),
			map: map
		});
		navigator.geolocation.getCurrentPosition(onSuccessPosition,onErrorPosition);
		navigator.geolocation.watchPosition(onSuccessPosition,onErrorPosition,{ maximumAge: 3000, enableHighAccuracy: true });
	});
	window.addEventListener("orientationchange",function(){
		$("#divMap").css("height",parseInt($(window).height())*0.95);		
	});
}