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
  $(".balance").css("color", "green");

} else if ($("#hiddenPaceDiv").val() < 0){
      console.log('should be negative');
      $("#yayOrNay").css("border-color", "rgba(224, 80, 80, 1)");
      $("#yayOrNay").css("background-color", "rgba(224, 80, 80, .4)");
      $("#yayOrNay").css("color", "white");
      $("#yayOrNay").append("Yikes! Your balance is negative ("+hiddenPaceDiv+") miles.");
      $(".balance").css("color", "red");

    } else {
      $("#yayOrNay").css("border-color", "rgba(219, 197, 76, 1)");
      $("#yayOrNay").css("background-color", "rgba(219, 197, 76, 1)");
      $("#yayOrNay").css("color", "white");
      $("#yayOrNay").append("UH OH! Looks Like you never saved a date when you edited your car Go back and save the lease expiration date!");
    }
};
pacingFunction();

function welcomePageSignup(){
  $("#newOrExist2").on("click", function(){
    $("#whichUser").html('<form action ="/signup" method="post"> <div class="form-group"> <label for="email">Email Address</label><input type="text" name="email" class="form-control" id="whichUserInput"></div> <div class="form-group"><label for="password">Password</label><input id="whichUserInput" type="text" name="password" class="form-control"></div><div class="row"><div class="col-xs-4"></div><button id="profileBtn4" class="col-xs-4 center-block" type="submit">Signup</button><div class="col-xs-4"></div></div>');
$("#newOrExist2").css("border-bottom", "1px solid #f45942");
$("#newOrExist2").css("color", "rgb(244, 89, 66)");
$("#newOrExist").css("border-bottom", "none");
$("#newOrExist").css("color", "rgb(160, 152, 151)");
});
}

welcomePageSignup();

function welcomePageLogin(){
  $("#newOrExist").on("click", function(){
    $("#whichUser").html('<form action ="/login" method="post"> <div class="form-group"> <label for="email">Email Address</label><input id="whichUserInput" type="text" name="email" class="form-control"></div> <div class="form-group"><label for="password">Password</label><input id="whichUserInput" type="text" name="password" class="form-control"></div><div class="row"><div class="col-xs-4"></div><button id="profileBtn3" class="col-xs-4 center-block" type="submit">Login</button><div class="col-xs-4"></div></div> ')
    $("#newOrExist").css("border-bottom", "1px solid #f45942");
    $("#newOrExist").css("color", "rgb(244, 89, 66)");
    $("#newOrExist2").css("border-bottom", "none");
    $("#newOrExist2").css("color", "rgb(160, 152, 151)");
  });
}
welcomePageLogin();

function odomBounce(){
  $(".updateOdom").addClass("animated wobble").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(".updateOdom").removeClass("animated wobble");
  })
}
odomBounce();
odomBounce()
// 
// function viewDetails(){
//   $("#viewDetails").on("click", function(){
//   $(".extraDets").html('<div class="row"><div class="col-sm-4" id="spec"><div>Daily Mileage Allowed</div><div id="specDet">' + $("#hiddenPaceDiv1").val() + '</div> </div><div class="col-sm-4" id="spec"><div>Monthly Mileage Allowed</div><div id="specDet>' + $("#hiddenPaceDiv2").val() + '</div></div><div class="col-sm-4" id="spec"><div>Yearly Mileage Allowed</div><div id="specDet>' + $("#hiddenPaceDiv3").val() + '</div></div>"')
//   })
// }
// viewDetails();

})
