//Initialization requiered for Materialize
$(document).ready(function(){
  $('.parallax').parallax();
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.chips').chips();
  $('.modal').modal();
  $('input#input_text, textarea#resume').characterCounter();
});
