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

    } else {
      $("#yayOrNay").css("border-color", "rgba(219, 197, 76, 1)");
      $("#yayOrNay").css("background-color", "rgba(219, 197, 76, 1)");
      $("#yayOrNay").css("color", "white");
      $("#yayOrNay").append("UH OH! Looks Like you never saved a date when you edited your car Go back and save the lease expiration date!");
    }
};
pacingFunction();

// function welcomePageLoginSignup() {
//  var click = 0;
//  $("#newOrExist2").on("click", function(){
//    click += 1
//    console.log(click);
//    if (click%2 == 0){
//     //  $("#whichUser").html(<form action="/login" method="post">
//     //    <div class="form-group">
//     //      <label for="login">Email Address</label>
//     //      <input type="text" name="email" class="form-control">
//     //    </div>
//      //
//     //    <div class="form-group">
//     //      <label for="password">Password</label>
//     //      <input type="password" name="password" class="form-control">
//     //    </div>
//      //
//     //    <button class="btn btn-success"type="submit">Login</button>
//     //  </form>
// } else if (click%2 != 0) {
//   $("#whichUser").html('<form action ="/signup" method="post"> <div class="form-group"> <label for="email">Email</label><input type="text" name="email" class="form-control"> </div> <div> class="form-group"> <label for="password">Password</label><input type="password" name="password" class="form-control"> </div>  <button class="btn btn-success" type="submit">Signup</button></form>')
//     }
//   })
// };



function welcomePageSignup(){
  $("#newOrExist2").on("click", function(){
    $("#whichUser").html('<form action ="/signup" method="post"> <div class="form-group"> <label for="email">Email Address</label><input type="text" name="email" class="form-control" id="whichUserInput"></div> <div class="form-group"><label for="password">Password</label><input id="whichUserInput" type="text" name="password" class="form-control"></div><button class="btn btn-success" type="submit">Signup</button>');
$("#newOrExist2").css("border-bottom", "1px solid #f45942");
$("#newOrExist2").css("color", "rgb(244, 89, 66)");
$("#newOrExist").css("border-bottom", "none");
$("#newOrExist").css("color", "rgb(160, 152, 151)");
});
}

welcomePageSignup();

function welcomePageLogin(){
  $("#newOrExist").on("click", function(){
    $("#whichUser").html('<form action ="/login" method="post"> <div class="form-group"> <label for="email">Email Address</label><input id="whichUserInput" type="text" name="email" class="form-control"></div> <div class="form-group"><label for="password">Password</label><input id="whichUserInput" type="text" name="password" class="form-control"></div><button class="btn btn-success" type="submit">Login</button>')
    $("#newOrExist").css("border-bottom", "1px solid #f45942");
    $("#newOrExist").css("color", "rgb(244, 89, 66)");
    $("#newOrExist2").css("border-bottom", "none");
    $("#newOrExist2").css("color", "rgb(160, 152, 151)");
  });
}

welcomePageLogin();
// <%if (typeof(errorMessage) !="undefined") {%><div class="error-message"><%=errorMessage%></div> <%}%>
//
// <!-- <form action="/signup" method="post">
//   <div class="form-group">
//     <label for="email">Email</label>
//     <input type="text" name="email" class="form-control">
//   </div>
//   <div class="form-group">
//     <label for="password">Password</label>
//     <input type="password" name="password" class="form-control">
//   </div>
//   <% if (typeof(errorMessage) != "undefined") { %>
// <div class="error-message"><%= errorMessage %></div>
// <% } %>
//   <button class="btn btn-success" type="submit">Signup</button>
// </form> -->








})
