var clientId = 'a7d6cc6f5ce74fcf56703608563d852c6f7b110a82b1e10cf58e0ead897cc223';
var index = 0;
var messages = null;
function tick(){
	$.ajax({ // Request a updated list of message
	type: 'GET',
	url: '/user/messages',
	success: function(data){
		messages = data.messages;
		$('#msgs').empty();
		if (messages.length > 0){
			$('#msgs').append('<li>' + messages[index] + '</li>')
			index = (index + 1) % messages.length;
		}
	}
	});
	
}
$(function(){
	$.ajax({ // Request a random photo from API for now
	type: 'GET',
	url: 'https://api.unsplash.com/photos/random'+'?client_id='+clientId,
	success: function(data){
		console.log(data);
		$('body').css("background-image", 'url('+ data.urls.full+ ')');
	}
	});
	
	$('#banner').append('<h3><font size=10px>Pic.</font><font color="#ff521e" size=10px>It</font></h3>');
	$('#banner').append('<div class="statusBar">' + '<span class="welcome">' + "Hi there " + username + '! </span>'+ 
	'<button class="bannerButton" id="collection">My Collection</button>'+ '<button class="bannerButton" id="logoff">Logoff</button>'+'</div>');
	
	$('#logoff').click(function (){ // Logoff button pressed
		$.ajax({
		  type: "GET",
		  url: '/logout',
		  success: function(data){
			  console.log(data);
			  $(location).attr('href', '/loginpage')
		  }
		});
	})
		
	tick();
	
});



$(function(){
	setInterval(tick, 3000);
})
