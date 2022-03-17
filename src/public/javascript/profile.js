var circles = [];
var friends = [];
$(document).ready(function () {
  var urlId = new URLSearchParams(window.location.search).get("id");
  getCircle();
  displayProfile();
  if (sessionStorage.getItem("login") == 1) {
    $(".authButton").html("SignOut");
    if (sessionStorage.getItem("user_id") == urlId) {
      $(".listFriend").show();
    }
  } else {
    $(".authButton").html("SignIn");
  }
  new URLSearchParams(window.location.search).get("id") ==
    sessionStorage.getItem("user_id") && $(".follow").hide();
  $(".authButton").click(function () {
    if (sessionStorage.getItem("login") == 1) {
      sessionStorage.removeItem("login");
    }
    location.replace("/pages/authentication");
  });

  $(".follow").click(function () {
    console.log("click");
    var find = circles.friends.filter(
      (x) => x == new URLSearchParams(window.location.search).get("id")
    );
    if (find.length > 0) {
      $(".follow").html("follow");
      var temp = circles.friends.filter(
        (x) => x != new URLSearchParams(window.location.search).get("id")
      );
      circles.friends = temp;
    } else {
      $(".follow").html("following");
      circles.friends.push(urlId);
    }
    console.log(circles);
    updateCircle();
    displayProfile();
  });

  $("body").on("click", ".removeFrnd", function () {
    var id = $(this).data("id");
    var temp = circles.friends.filter((x) => x != id);
    circles.friends = temp;
    updateCircle();
  });
  $("body").on("click", ".muteFrnd", function () {
    var id = $(this).data("id");
    var block = circles.block;
    block.push(id);
    circles.block = block;
    var temp = circles.friends.filter((x) => x != id);
    circles.friends = temp;
    updateCircle();
  });
  $("body").on("click", ".unmute", function () {
    var id = $(this).data("id");
    var friends = circles.friends;
    friends.push(id);
    circles.friends = friends;
    var temp = circles.block.filter((x) => x != id);
    circles.block = temp;
    updateCircle();
  });
  $("body").on("click", ".addUser", function () {
    var id = $(this).data("id");
    var temp = circles.friends.filter((x) => x == id);
    if (!temp.length > 0) {
      circles.friends.push(id);
    }

    updateCircle();
  });
});

function getCircle() {
  $.ajax({
    url: "/pages/operation",
    method: "post",
    data: {
      action: "getCircle",
      user_id: sessionStorage.getItem("user_id"),
    },
    dataType: "JSON",
  }).done(function (data) {
    var temp = JSON.parse(data[0].circle);
    circles = temp;
    var find = circles.friends.filter(
      (x) => x == new URLSearchParams(window.location.search).get("id")
    );
    if (find.length > 0) {
      $(".follow").html("following");
    }
    $(".friends").html("");
    for (let i = 0; i < circles.friends.length; i++) {
      var id = circles.friends[i];
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "getFriend",
          id: id,
        },
        dataType: "JSON",
      }).done(function (data) {
        $(".friends").append(`
        <span style='display:flex; justify-content:space-between; align-items:center'>
                        <span class='friendName me-4'>${data[0].name}</span><a class='btn text-danger removeFrnd' data-id='${data[0].user_id}'>remove</a>
                  <a class='btn text-danger muteFrnd' data-id='${data[0].user_id}'>mute</a>
                        </span>
        `);
      });
    }
    $(".mute").html("");
    for (let i = 0; i < circles.block.length; i++) {
      var id = circles.block[i];
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "getFriend",
          id: id,
        },
        dataType: "JSON",
      }).done(function (data) {
        $(".mute").append(`
        <span style='display:flex; justify-content:space-between; align-items:center'>
                        <span class='friendName me-4'>${data[0].name}</span>
                  <a class='btn text-success unmute' data-id='${data[0].user_id}'>unmute</a>
                        </span>
        `);
      });
    }
  });

  $.ajax({
    url: "/pages/operation",
    method: "post",
    data: {
      action: "getUsers",
    },
    dataType: "JSON",
  }).done(function (data) {
    // console.log(data);
    $(".users").html("");
    for (let i = 0; i < data.length; i++) {
      var temp = circles.friends.filter((x) => x == data[i].user_id);
      if (
        temp.length > 0 ||
        sessionStorage.getItem("user_id") == data[i].user_id
      ) {
        continue;
      }

      $(".users").append(`
        <span style='display:flex; justify-content:space-between; align-items:center'>
                        <span class='userName me-4'>${data[i].name}</span><a class='btn text-danger addUser' data-id='${data[i].user_id}'>Follow</a>
                    </span>
        `);
    }
  });
}

function displayProfile() {
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
}

function updateCircle() {
  $.ajax({
    url: "/pages/operation",
    method: "post",
    data: {
      action: "updateCircle",
      circles: JSON.stringify(circles),
      id: sessionStorage.getItem("user_id"),
    },
    dataType: "JSON",
  }).done(function (data) {
    console.log(data);
    getCircle();
  });
}
