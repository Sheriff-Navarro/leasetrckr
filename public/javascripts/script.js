

$(document).ready(function(){


function pacingFunction(){
  const hiddenPaceDiv = $("#hiddenPaceDiv").val()
  console.log(hiddenPaceDiv);
if($("#hiddenPaceDiv").val() >= 0 ){
  console.log('should be positive');
  $("#yayOrNay").css("background-color", "green");
} else if ($("#hiddenPaceDiv").val() < 0){
      console.log('should be negative');
      $("#yayOrNay").css("background-color", "red");
    };
};










// setTimeout(function(){
  pacingFunction();
// }, 1000)




})
