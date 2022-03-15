$(document).ready(function () {
  if (sessionStorage.getItem("login") == 1) {
    $(".authButton").html("SignOut");
  } else {
    $(".authButton").html("SignIn");
  }
  $(".profile").html(
    `<a href="pages/user?id=${sessionStorage.getItem("user_id")}">Profile</a>`
  );
  $(".authButton").click(function () {
    if (sessionStorage.getItem("login") == 1) {
      sessionStorage.removeItem("login");
    }
    location.replace("/pages/authentication");
  });

  $(".btnSearch").click(function () {
    $.ajax({
      url: "/pages/operation",
      method: "post",
      data: { action: "getUser", value: $("#searchInput").val() },
      dataType: "JSON",
    }).done((data) => {
      var html = "";
      if (data.length > 0) {
        $(".result").show();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          html += `<div class='col-7 mx-auto '><a class='text-dark py-4 my-4' href='/pages/user?id=${data[i].user_id}'>
          ${data[i].name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ${data[i].city}, ${data[i].country}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#${data[i].username}
         </a>
          </div>`;
        }
        $(".result").html(html);
      } else {
        $(".result").show();
        $(".result").html(
          '<div class="col-12 text-center">No user found!!!</div>'
        );
      }
    });
  });
});
