var App = {
    "app_loaded": false,
    "testing_on_desktop": true,
    "marker":null,
    "markerArray":[],
    "map":null,
 	"init":function(){
		var map;
		var mapOptions;
		var marker;
		console.log("[init]");
	 
	    if (document.URL.indexOf("http://") === -1) {
	        App.testing_on_desktop = false;
	    }
	 
	    jQuery(document).ready(function () {
	        console.log("jQuery finished loading");
	 
	        if (App.testing_on_desktop) {
	            console.log("PhoneGap finished loading");
	            _onDeviceReady();
	        } else {
	            document.addEventListener("deviceReady", function () {
	                console.log("PhoneGap finished loading");
	                _onDeviceReady();
	            }, false);
	        }
	 
	        jQuery(document).one("pageinit", function () {
	            console.log("jQuery.Mobile finished loading");
	        });
	 
	        console.log("PhoneGap & jQuery.Mobile finished loading");
	        initPages();
	        console.log("App finished loading");
	        App.app_loaded = true;
	    });
	 
	    function _onDeviceReady () {
			console.log("[_onDeviceReady]");
			jQuery(document).delegate("#mapPage", "pageshow", function() {
				jQuery("#divMap").css("height",parseInt(jQuery(window).height())*0.95); //0.95 = 95% of the viewport to display the map		
				App.map = new google.maps.Map(document.getElementById("divMap"),{zoom: 16, center: new google.maps.LatLng(-16.6958759,-49.3042674), mapTypeId: google.maps.MapTypeId.ROADMAP})
				App.marker = new google.maps.Marker({
					position: new google.maps.LatLng(-16.6958759,-49.3042674),
					map: App.map,
					icon: "img/seta-local.png"
				});
				navigator.geolocation.getCurrentPosition(onSuccessPosition,onErrorPosition);
				navigator.geolocation.watchPosition(onSuccessPosition,onErrorPosition,{ maximumAge: 3000, enableHighAccuracy: true });
				jQuery.ajax({
					url: "ajax/farmacias.json",
					type: "get",
					success: function(data){
						jQuery.each(data.farmacias, function(i,val){
							var m = new google.maps.Marker({
								position: new google.maps.LatLng(val.latitude,val.longitude),
								title: val.title,
								map: App.map
							});
							google.maps.event.addListener(m, 'click', function() {
						        var infoWindow = new google.maps.InfoWindow({
						        	content: "<b>"+val.title+"</b>"
						        });
						        infoWindow.open(App.map,m)
						    });
							App.markerArray.push(m);
						});
					},
					error: function(error){
						alert("Erro: "+error.message);
					}
				});
			});
			window.addEventListener("orientationchange",function(){
				jQuery("#divMap").css("height",parseInt(jQuery(window).height())*0.95);		
			});
	    };
	    var infowindow = new google.maps.InfoWindow({
		    size: new google.maps.Size(150, 50)
		});
	    function initPages () {
	    };	    
		function onSuccessPosition(position){
			console.log("[onSuccessPosition]");
			map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
			marker.setPosition(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
		};
		function onErrorPosition(error){
			console.log("[onErrorPosition]");
			alert("Erro!\nCodigo: "+error.code+"\nMensagem: "+error.message);
		};
	}, 
    "utilities": {
    },
};