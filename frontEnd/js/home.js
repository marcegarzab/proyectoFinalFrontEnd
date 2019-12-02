
//Home tab:
var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1');
}

$('#showPostButton').on('click', function(event){
  let $addPost = $('#areaForPost')
  $addPost.toggle('hidden')
})

$('.showModifyButton').on('click', function(event){
  let $thisDiv = $('#modDiv')
  $thisDiv.toggle('hidden')

})

$('#menu > li').on('click', function(event){
  let $selected = $('.selected').attr('id')
  $('.selected').removeClass('selected');
  let $currentElement = $(this);
  let sectionName = $currentElement.attr('id');
  $currentElement.addClass('selected');
  $('#' + $selected + 'Section').addClass('hidden')
  $('#' + sectionName + 'Section').removeClass('hidden');
  // $(`#${sectionName}Section`)
});

$('#searchUser').on('click', function(){
	let user = $("#searchUser").val()
  //HAY QUE CONSEGUIR EL ID DEL USUARIO
	json_to_send = {
  	  "user" : user
  	};

  	json_to_send2 = JSON.stringify(json_to_send);

  	$.ajax({
  	  url: 'http://proyectofinalmj.herokuapp.com' + id,
  	  headers: {
  	      'Content-Type':'application/json'
  	  },
  	  method: 'GET',
  	  dataType: 'json',
  	  data: json_to_send,
  	  success: function(data){
  	  	//show all posts from that user
  	  },
  	  error: function(error_msg) {
  	    alert((error_msg['responseText']));
  	  }
  	});
});

function loadPosts() {
  console.log("entro al load")
  $.ajax({
    url: 'http://proyectofinalmj.herokuapp.com/posts',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      for( let i = 0; i < data.length; i++) {
        addPost(data[i]._id, data[i].question, data[i].answer)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadPosts()






//Dashboard tab:

//load posts personales
function loadPostsPersonales() {
  id = 0
  $.ajax({
    // url: 'http://localhost:3000/todos',
    url: 'http://proyectofinalmj.herokuapp.com/posts/' +id,
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {

        console.log(data[i].question)
        // algo asi:
        addPost(data[i]._id, data[i].question, data[i].answer)
        // no tienen que usar la funcion de addTodo, es un ejemplo
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}



//add post

$('#addPostButtonToggle').on('click', function(event){
  let $add = $('.add')
  $add.toggle('hidden')
})

$('#addPostButton').on('click', function(event){
  let $newQuestion = $('#newQuestion')
  let $newAnswer = $('#newAnswer')

  json_to_send = {
      "question" : $newQuestion.val(),
      "answer" : $newAnswer.val()
    };
    console.log($newQuestion.val())

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: 'https://proyectofinalmj.herokuapp.com/posts',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        addPost(data._id, data.question, data.answer) 
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    $newQuestion.val('');
    $newAnswer.val('');
    //toggle
})


function addPost(id, question, answer) {
$('.posts').append('<div class="post"><input type="radio" name="radios" value='+id+'><p class="question">'+question+'</p><p class="answer">'+answer+'</p></div>')
}


//update post
$('#modifyPostButtonToggle').on('click', function(event){
  let $modify = $('.modify')
  $modify.toggle('hidden')
})

$('#modifyButton').on('click', function(event){
 _id = $("input[name='radios']:checked").val()
 console.log("id:" + _id)

  let $newQuestion = $('#modQuestion')
  let $newAnswer = $('#modAnswer')

  json_to_send = {
      "question" : $newQuestion.val(),
      "answer" : $newAnswer.val()
    };
  
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://proyectofinalmj.herokuapp.com/posts/' + _id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        addPost(data._id, data.question, data.answer)
      },
      error: function(error_msg) {
        alert("Please select a post");
        //alert((error_msg['responseText']));
      }
    });
    $newQuestion.val('');
    $newAnswer.val('');
})

//delete post

$('#deleteButton').on('click', function(event){
  _id = $("input[name='radios']:checked").val()
  console.log(_id)
    $.ajax({
      url: 'https://proyectofinalmj.herokuapp.com/posts/' + _id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      dataType: 'json',
      success: function(data){
        alert("Post successfully deleted!");
      },
      error: function(error_msg) {
        alert("Please select a post");
        //alert((error_msg['responseText']));
      }
    });
})

//Logout tab:

$('#logout').on('click', function(){
  console.log("entro al logout")
  $.ajax({
    url: 'https://proyectofinalmj.herokuapp.com/logout',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    data: token,
    success: function(data){
      alert("Logout successful!");
      window.location = './login.html'
    },
    error: function(error_msg) {
      window.location = './login.html'
      //alert((error_msg['responseText']));
    }
  });
});
