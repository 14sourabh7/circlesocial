$(document).ready(function () {
  if (sessionStorage.getItem("login") == 1) {
    $(".authButton").html("SignOut");
  } else {
    $(".authButton").html("SignIn");
  }

  $(".authButton").click(function () {
    if (sessionStorage.getItem("login") == 1) {
      sessionStorage.removeItem("login");
    }
    location.replace("/pages/authentication");
  });

  $.ajax({
    url: "/pages/operation",
    method: "post",
    data: {
      action: "getUserId",
      user_id: new URLSearchParams(window.location.search).get("id"),
    },
    dataType: "JSON",
  }).done(function (data) {
    console.log(data[0].name);
    $(".profileName").html(data[0].name);
    $(".profileEmail").html(data[0].email);
    $("#name").val(data[0].name);
    $("#username").val(data[0].username);
    $(".mobile").val(data[0].mobile);
    $(".city").val(data[0].city);
    $(".country").val(data[0].country);
    $(".pincode").val(data[0].pincode);
  });
});
