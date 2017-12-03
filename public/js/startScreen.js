// Function to create a new user using the pre made PUT call
$(document).ready(function() {
  $('#signUpButton').on('click', function() {
      // declare all variables needed for the body when creating a user
      var $firstName = $('#firstName');
      var $lastName = $('#lastName');
      var $userName = $('#userName');
      var $password = $('#password');

      var user = {
        firstName : $firstName.val(),
        lastName  : $lastName.val(),
        username  : $userName.val(),
        password  : $password.val()
      };
      $.ajax({
        type: 'PUT',
        url : '/user',
        data: user,
        statusCode : {
          400 : function(response){
            $('#userNameError').hide();
            $('#missingFields').show();
          },
          409: function(response){
            $('#missingFields').hide();
            $('#userNameError').show();
          },
          200: function(response){
            console.log("Successfully added a user.");
			// redirect to login page
			$(location).attr('href', '/loginpage')
          }
        }
      });
 });
});
