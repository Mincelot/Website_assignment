function initMap(latitude, longtitude) {
        var myLatLng = {lat: parseInt(latitude), lng: parseInt(longtitude)};

        var map = new google.maps.Map(document.getElementById('mapPopUpBox'), {
          zoom: 4,
          center: myLatLng
        });
		
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map
        });
		
		
}