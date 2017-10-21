$(document).ready(function(){


function pacingFunction(){
  const hiddenPaceDiv = $("#hiddenPaceDiv").val()
  console.log(hiddenPaceDiv);
if($("#hiddenPaceDiv").val() >= 0 ){
  console.log('should be positive');
  $("#yayOrNay").css("border-color", "rgba(115, 181, 101, 1)");
  $("#yayOrNay").css("background-color", "rgba(115, 181, 101, .4)");
  $("#yayOrNay").css("color", "white");
  $("#yayOrNay").append("Sweet! You have an extra "+hiddenPaceDiv+" unused miles.");

} else if ($("#hiddenPaceDiv").val() < 0){
      console.log('should be negative');
      $("#yayOrNay").css("border-color", "rgba(224, 80, 80, 1)");
      $("#yayOrNay").css("background-color", "rgba(224, 80, 80, .4)");
      $("#yayOrNay").css("color", "white");
      $("#yayOrNay").append("Yikes! Your balance is negative ("+hiddenPaceDiv+") miles.");

    };
};
pacingFunction();

// $("#yayOrNay").append("Great Job You have an extra ",$("#hiddenPaceDiv").val() " of unused miles.");

// $(document).ready(function(){
//
//
// function pacingFunction(){
//   const hiddenPaceDiv = $("#hiddenPaceDiv").val()
//   console.log(hiddenPaceDiv);
// if($("#hiddenPaceDiv").val() >= 0 ){
//   console.log('should be positive');
//   $("#fuck").css("border-color", "rgb(115, 181, 101)");
//   $("#fuck").css("background-color-color", "rgb(115, 181, 101), .4");
//
// } else if ($("#hiddenPaceDiv").val() < 0){
//       console.log('should be negative');
//       $("#yayOrNay").css("background-color", "red");
//     };
// };
// pacingFunction();
//
//
//

//
//
//
//
//
// })
//






})
