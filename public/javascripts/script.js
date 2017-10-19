$(document).ready(function(){


function pacingFunction(){
  const hiddenPaceDiv = $("#hiddenPaceDiv").val()
  console.log(hiddenPaceDiv);
if($("#hiddenPaceDiv").val() >= 0 ){
  console.log('should be positive');
  $("#yayOrNay").css("border-color", "green");
  $("#yayOrNay").css("border-color", "green");

} else if ($("#hiddenPaceDiv").val() < 0){
      console.log('should be negative');
      $("#yayOrNay").css("background-color", "red");
    };
};
pacingFunction();









})
