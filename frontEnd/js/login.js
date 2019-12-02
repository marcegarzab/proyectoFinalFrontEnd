
$('#showRegisterButton').on('click', function(event){
  let $registerSection = $('#registerContainer')
  $registerSection.toggle('hidden')
})

$('#loginButton').on('click', function(){
  console.log("entro al login")
  let email = $("#email").val()
  let password = $("#password").val()

  json_to_send = {
    "password" : password,
    "email": email
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'http://proyectofinalmj.herokuapp.com/login',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      alert("Login successfull!");
      localStorage.setItem('token', data.token)
      window.location = './home.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
});

$('#registerButton').on('click', function(){
  let name = $("#name").val()
  let email2 = $("#email2").val()
  let password2 = $("#password2").val()

  json_to_send = {
    "name" : name,
    "email": email2,
    "password": password2
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'http://proyectofinalmj.herokuapp.com/users',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      alert("Successfully registered!");
      window.location = './home.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
});
