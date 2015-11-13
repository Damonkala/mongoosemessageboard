'use strict';

$(document).ready(init);

function init() {
  $('#submit').click(add);
  $('i.fa.fa-trash.fa-lg').click(deletePost);
  $('i.fa.fa-pencil.fa-lg').click(editPost);
  $('i.fa.fa-floppy-o.fa-lg').click(savePost);
}

function add() {
  var post = {};
  post.name = $('#name').val();
	post.subject = $('#subject').val();
	post.message = $('#message').val();
	post.time = Date();
  $.post('/posts', post)

  console.log(post);

  var $tr = $('<tr>');

  var $name = $('<div>').addClass('name').text("Name: " + post.name);
  var $subject = $('<div>').addClass('subject').text("Subject: " + post.subject);
  var $message = $('<div>').addClass('message').text("Message: " + post.message);

  var $editDiv = $('<div>').addClass('edit text-center');
  var $editIcon = $('<i>').addClass('fa fa-pencil fa-lg')
  $editDiv.append($editIcon);

  var $deleteDiv = $('<div>').addClass('delete text-center');
  var $deleteIcon = $('<i>').addClass('fa fa-trash fa-lg')
  $deleteDiv.append($deleteIcon);

  var $saveDiv = $('<div>').addClass('save text-center');
  var $saveIcon = $('<i>').addClass('fa fa-floppy-o fa-lg');
  $saveDiv.append($saveIcon);

  $tr.append($name, $subject, $message, Date(), $editDiv, $deleteDiv, $saveDiv);

  $('#postList').append($tr);

  $('input').each(function(index, input) {
      $(input).val('');
      $('#message').val('');
    })
}

function deletePost(e){
  var $target = $(e.target);
  var $targetDiv = $target.closest('div');
  var div = $targetDiv[0];
  // debugger;
  var timeStamp = div.children.time.textContent;
  // console.log(div.children.time.textContent)

  $targetDiv.remove();
  $.ajax({
    url: '/posts',
    type: 'DELETE',
    data: {time : timeStamp},
    success: function(result) {
        console.log('delete')
    }
});
}

function editPost(e){
  var $target = $(e.target);
  var $targetDiv = $target.closest('div');
  $targetDiv.children('#message').attr('contentEditable', true);
  console.log('Editing!');
}
function savePost(e){
  var $target = $(e.target);
  var $targetDiv = $target.closest('div');
  var div = $targetDiv.children('#message').attr('contentEditable', false);
  var changedText = $targetDiv.children('#message').text();
  console.log(changedText);
  var tdiv = $targetDiv[0];
  var timeStamp = tdiv.children.time.textContent;
  $.ajax({
    url: '/posts',
    type: 'PUT',
    data: {time: timeStamp, change: changedText},
    success: function(result) {
        console.log('edited')
    }
})
}
