var clientId = 'a7d6cc6f5ce74fcf56703608563d852c6f7b110a82b1e10cf58e0ead897cc223';

$(function (){
	$('#banner').append('<span class="welcome">' + "Hi there! " + username + '</span>')
	for (i = messages.length - 1; i >= 0; i--){
		$('#msgs').append('<li>' + messages[i] + '</li>')
	}
	$.ajax({ // Request a random photo from API for now
	type: 'GET',
	url: 'https://api.unsplash.com/photos/random'+'?client_id='+clientId,
	success: function(data){
		console.log(data);
		$('body').css("background-image", 'url('+ data.urls.full+ ')');
	}
	});
});