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
      action: "getBlog",
      blog_id: new URLSearchParams(window.location.search).get("id"),
    },
    dataType: "JSON",
  }).done((data) => {
    if (data[0].status == "approved") {
      $(".title").html(data[0].title);
      $(".author").html(data[0].author);
      $(".date").html(data[0].date);
      $(".text").html(data[0].text);
    } else {
      location.replace("/");
    }
  });
});
