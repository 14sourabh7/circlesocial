var post = [];
var stats = [];
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

  console.log(new URLSearchParams(window.location.search).get("id"));
  getPost();

  $(".btnLike").click(() => {
    console.log("clicked");
    var liked = stats.likes.filter(
      (x) => x.user == sessionStorage.getItem("user_id")
    );
    console.log(liked);
    if (liked.length < 1) {
      $(".colorLike").css("color", "blue");
      stats.likes.push({ user: sessionStorage.getItem("user_id") });
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "updateStats",
          stats: JSON.stringify(stats),
          id: new URLSearchParams(window.location.search).get("id"),
        },
        dataType: "JSON",
      }).done(function (data) {
        getPost();
      });
    }
    if (liked.length == 1) {
      var tempArr = stats.likes.filter(
        (x) => x.user == sessionStorage.getItem("user_id")
      );
      stats.likes = tempArr;
      console.log(stats);
      $(".colorLike").css("color", "gray");
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "updateStats",
          stats: JSON.stringify(stats),
          id: new URLSearchParams(window.location.search).get("id"),
        },
        dataType: "JSON",
      }).done(function (data) {
        getPost();
      });
    }
    console.log(stats);
  });

  $(".btnCmnt").click(function () {
    var comment = $(".textCmnt").val();
    if (comment) {
      stats.comments.push({
        name: sessionStorage.getItem("name"),
        id: sessionStorage.getItem("user_id"),
        comment: comment,
      });
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "updateStats",
          stats: JSON.stringify(stats),
          id: new URLSearchParams(window.location.search).get("id"),
        },
        dataType: "JSON",
      }).done(function (data) {
        getPost();
      });
    }
  });

  $("body").on("click", ".delCmnt", function () {
    console.log("data");
    var idx = $(this).data("id");
    stats.comments.splice(idx, 1);
    $.ajax({
      url: "/pages/operation",
      method: "post",
      data: {
        action: "updateStats",
        stats: JSON.stringify(stats),
        id: new URLSearchParams(window.location.search).get("id"),
      },
      dataType: "JSON",
    }).done(function (data) {
      getPost();
    });
  });

  $("body").on("click", ".updateCmnt", function () {
    var idx = $(this).data("id");
    var comment = $(this).parent().children(".cmntText").val();
    console.log(comment);
    var prevComment = stats.comments[idx];
    prevComment.comment = comment;
    if (comment) {
      stats.comments.splice(idx, 1, prevComment);
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "updateStats",
          stats: JSON.stringify(stats),
          id: new URLSearchParams(window.location.search).get("id"),
        },
        dataType: "JSON",
      }).done(function (data) {
        getPost();
      });
    }
  });
});
function getPost() {
  $.ajax({
    url: "/pages/operation",
    method: "post",
    data: {
      action: "getPost",
      id: new URLSearchParams(window.location.search).get("id"),
    },
    dataType: "JSON",
  }).done(function (data) {
    post = data[0];
    console.log(post);
  });
  $.ajax({
    url: "/pages/operation",
    method: "post",
    data: {
      action: "getStats",
      id: new URLSearchParams(window.location.search).get("id"),
    },
    dataType: "JSON",
  }).done(function (data) {
    stats = JSON.parse(data[0].stats);
    console.log(stats);
    displayPost(post, stats);
  });
}

function displayPost(post, stats) {
  $(".postImage").html(`
    <img  src="${post.file}" class="card-img-top" alt="...">
            <video  height="240" controls style='display:${
              !post.file.includes(".mp4") && "none"
            }; '>
  <source src="${post.file}" alt='.' >
  
  Your browser does not support the video tag.
</video>
    `);

  $(".postUser").html(post.name);
  $(".likeCnt").html(`${stats.likes.length} Likes`);
  $(".countCmnt").html(`${stats.comments.length}`);
  var liked = stats.likes.filter(
    (x) => x.user == sessionStorage.getItem("user_id")
  );
  if (liked.length > 0) {
    $(".colorLike").css("color", "blue");
  }
  displayComments();
}

function displayComments() {
  var html = "";
  for (let i = 0; i < stats.comments.length; i++) {
    var commentbody =
      stats.comments[i].id == sessionStorage.getItem("user_id")
        ? `
     <input type='text' class='cmntText' value='${stats.comments[i].comment}'>
     <a class='updateCmnt' data-id='${i}'>update</a>  
     `
        : `<div>
${stats.comments[i].comment}
</div>`;

    html += `<div class='d-flex justify-content-between'>
    <div class='text-muted'>${stats.comments[i].name} &nbsp;</div>
 ${commentbody}
<div><a  class='delCmnt' data-id='${i}'>
<i class="fa fa-trash"></i>
</a></div>
</div>`;
  }
  $(".comment").html(html);
}
