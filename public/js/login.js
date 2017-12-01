// Function to login with an existing userName
$(document).ready(function(){
  $('#loginButton').on('click', function(){
    // declare all variables needed for the body
    var $userName = $('#userName');
    var $password = $('#password');

    var user = {
      username  : $userName.val(),
      password  : $password.val()
    };
    $.ajax({
      type: 'POST',
      url: '/login',
      data: user,
      statusCode : {
        400 : function(response){
          $('#invalidCredError').hide();
          $('#loginMissingFields').show();
        },
        401: function(response){
          $('#loginMissingFields').hide();
          $('#invalidCredError').show();
        },
        200 : function(response){
          console.log("Successfully logged in.");
        }
      }
    })
  })
})
