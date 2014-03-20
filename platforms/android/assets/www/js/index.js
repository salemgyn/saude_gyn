var App = {
    "app_loaded": false,
    "testing_on_desktop": true,
    "marker":null,
    "markerArray":[],
    "map":null,
    "infowindow":null,
    "markerSeta":null,
 	"init":function(){
		console.log("[init]");
	 
	    if (document.URL.indexOf("http://") === -1) {
	        App.testing_on_desktop = false;
	    }

	    jQuery(document).ready(function () {
	        console.log("jQuery finished loading");
	 
	 		var deviceReadyDeferred = jQuery.Deferred();
	 		var jqmReadyDeferred = jQuery.Deferred();
	        if (App.testing_on_desktop) {
	            console.log("PhoneGap finished loading");
	            _onDeviceReady();
	            deviceReadyDeferred.resolve();
	        } else {
	            document.addEventListener("deviceReady", function () {
	                console.log("PhoneGap finished loading");
	                _onDeviceReady();
	                deviceReadyDeferred.resolve();
	            }, false);
	        }
	 
	        jQuery(document).one("pageinit", function () {
	            console.log("jQuery.Mobile finished loading");
	            jqmReadyDeferred.resolve();
	        });
	 
	 		jQuery.when(deviceReadyDeferred, jqmReadyDeferred).then(function(){
		        console.log("PhoneGap & jQuery.Mobile finished loading");
		        initPages();
		        console.log("App finished loading");
		        App.app_loaded = true;
		    });
	    });
	 
	    function _onDeviceReady () {
			console.log("[_onDeviceReady]");
			PGproxy.navigator.splashscreen.hide();

			App.markerSeta = {
				path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
				fillColor: "red",
				fillOpacity: 0.5,
				scale: 5,
				strokeColor: "black",
				strokeWeight: 2
			};

			jQuery(document).delegate("#mapPage", "pageshow", function() {
				jQuery("#divMap").css("height",parseInt(jQuery(window).height())*0.95); //0.95 = 95% of the viewport to display the map		
				App.map = new google.maps.Map(document.getElementById("divMap"),{zoom: 16, center: new google.maps.LatLng(-16.6958759,-49.3042674), mapTypeId: google.maps.MapTypeId.ROADMAP});
				loadMakers();
				App.marker = new google.maps.Marker({
					position: new google.maps.LatLng(-16.6958759,-49.3042674),
					map: App.map,
					icon: App.markerSeta
				});

				navigator.geolocation.getCurrentPosition(onSuccessPosition,onErrorPosition);
				navigator.geolocation.watchPosition(onSuccessPosition,onErrorPosition,{ maximumAge: 3000, enableHighAccuracy: true });
				
				var options = {
				    frequency: 3000
				}; // Update every 3 seconds

				var watchID = navigator.compass.watchHeading(onSuccess, onError, options);

			});
			window.addEventListener("orientationchange",function(){
				jQuery("#divMap").css("height",parseInt(jQuery(window).height())*0.95);		
			});
		    App.infowindow = new google.maps.InfoWindow({
			    size: new google.maps.Size(150, 50)
			});
	    };
	    function onSuccess(heading) {	    	
			console.log("[heading] compass at: "+heading.magneticHeading);	
			App.markerSeta = {
				path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
				fillColor: "red",
				fillOpacity: 0.5,
				scale: 5,
				strokeColor: "black",
				strokeWeight: 2,
				rotation: heading.magneticHeading + 180
			};		
			App.marker.setIcon(App.markerSeta);
		};

		function onError(compassError) {
		    alert('Compass error: ' + compassError.code);
		};

	    function initPages () {
	    	console.log("[initPages]");
	    	jQuery(document).bind("pageinit",_initPages);

	    	function _initPages(){

	    	};
	    };	    
		function onSuccessPosition(position){
			console.log("[onSuccessPosition] geolocation at: "+position.coords.latitude+","+position.coords.longitude);
			App.map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
			App.marker.setPosition(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
		};
		function onErrorPosition(error){
			console.log("[onErrorPosition]");
			alert("Erro!\nCodigo: "+error.code+"\nMensagem: "+error.message);
		};
		function loadMakers(){		
			console.log("[loadMakers]");	
			jQuery.ajax({
				url: "./ajax/farmacias.json",
				type: "get",
				contentType: "application/json; charset=UTF-8",
				success: function(data){
					data = JSON.parse(data);
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
		};
	}, 
    "utilities": {
    },
};
var PGproxy = {
    "navigator": {
        "connection": function () {
            if (navigator.connection) {
                return navigator.connection;
            } else {
                console.log('navigator.connection');
                return {
                    "type":"WIFI" // Avoids errors on Chrome
                };
            }
        },
        "notification": {
            "vibrate": function (a) {
                if (navigator.notification && navigator.notification.vibrate) {
                    navigator.notification.vibrate(a);
                } else {
                    console.log("navigator.notification.vibrate");
                }
            },
            "alert": function (a, b, c, d) {
                if (navigator.notification && navigator.notification.alert) {
                    navigator.notification.alert(a, b, c, d);
                } else {
                    console.log("navigator.notification.alert");
                    alert(a);
                }
            }
        },
        "splashscreen": {
            "hide": function () {
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                } else {
                    console.log('navigator.splashscreen.hide');
                }
            }
        },
        "compass":{
        	"watchHeading": function(a, b, c){
        		if(navigator.compass){
        			navigator.compass.watchHeading(a, b, c);
        		} else {
        			console.log('navigator.compass.whatchHeading');
        		}
        	}
        }
    }
};