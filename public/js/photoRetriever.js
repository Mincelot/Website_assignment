var clientId = 'a7d6cc6f5ce74fcf56703608563d852c6f7b110a82b1e10cf58e0ead897cc223';

var latitude, longitude;
var photoid = null;
function retrievePhoto(id){
	photoid = id;
	$.ajax({ // Request a random photo from API for now
		type: 'GET',
		url: 'https://api.unsplash.com/photos/'+id+'?client_id='+clientId,
		success: function(data){
			console.log(data);
			$('.popupBoxContent').css('padding-top', (data.height/data.width)*100+'%');
			$('.popupBoximg').remove(); // Clear the old image
			$('<img />', { // Add new image
				class: "popupBoximg",
				src: data.urls.full,
				style:'display:none;'
			}).on('load',function(e){
				$('.popupBoxContent').css('padding-top', '3px');
				this.style.display = 'block';
			}).insertBefore('.infoPanelContent');
			$('.infoPanelContent').empty();
			$('.infoPanelContent').css('border-color', data.color);
			if (data.description){
				$('.infoPanelContent').append('<p> <i>'+ data.description + ' </i></p>');
			}
			if (data.location && data.location.city && data.location.country){
				$('.infoPanelContent').append('<p>' + data.location.city + ", " + data.location.country +  '<font color="#d82475"; id="location"> &#x1f310; </font></p>');
				$('.infoPanelContent').attr('latitude', data.location.position.latitude);
				$('.infoPanelContent').attr('longitude', data.location.position.longitude);
			} else {
				$('.infoPanelContent').append('<p></p>');
			}
			$('.infoPanelContent').append('<p> Add to my collection    <button id = "addPhotoButton" class = "editButton"> + </button></p>')
			$('.infoPanelContent').append('<p>' + data.likes + ' <font color="#d82475"> &#x2764; </font></p>');
			$('#photoViewer').fadeIn(300); // Display popup box
		}
	});

}
$(function (){

	$('.infoPanelContent').on("click", '#location', function (){
		$('#mapPopUpBox').toggle('slow', function(){
			initMap($('.infoPanelContent').attr('latitude'), $('.infoPanelContent').attr('longitude'));
		});
	});
	
	$('.infoPanelContent').on("click", '#addPhotoButton', function (){
		alert("Added " + photoid + " to " + username +"'s collection!");
		//---------------------------------- Call the add to user function here, use photoid and username as above -------------------------------------
	});

	$('.closeButton').click(function (){ // When the close button is pressed, close it.
		$('#photoViewer').fadeOut(300);
		//$('.infoPanelContent').hide();
		$('#mapPopUpBox').hide();
	});

	$(window).click(function(event){ // The photoViewer will not be displayed if the current window is clicked
		if (event.target == $('#photoViewer')[0]){
			$('#photoViewer').fadeOut(300);
			$('#mapPopUpBox').hide();
		}
	});
});
