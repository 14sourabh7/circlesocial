$(document).ready(function () {
  if (sessionStorage.getItem("login") == 1) {
    $(".authButton").html("SignOut");
    displayForm();
    getPosts();
  } else {
    $(".authButton").html("SignIn");
  }
  $(".profile").html(
    `<a class="btn  profile text-dark fw-bold " href="pages/user?id=${sessionStorage.getItem(
      "user_id"
    )}">Profile</a>`
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
          html += `<div class='col-7 mx-auto px-4 py-2 '><a class='btn text-muted' href='/pages/user?id=${data[i].user_id}'>
          ${data[i].name},-----address---${data[i].city}, ${data[i].country}----------user_id-----------#${data[i].username}
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

  $(".postBtn").click(function () {
    console.log($(".inpFIle").files);
  });

  $(".viewOption").click(function () {
    console.log($(this).data("feed"));

    if ($(this).data("feed") == "my") {
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "getUserPost",
          user_id: sessionStorage.getItem("user_id"),
        },
        dataType: "JSON",
      }).done(function (data) {
        displayPosts(data);
      });
    } else {
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "getOtherPosts",
          user_id: sessionStorage.getItem("user_id"),
        },
        dataType: "JSON",
      }).done(function (response) {
        $.ajax({
          url: "/pages/operation",
          method: "post",
          data: {
            action: "getCircle",
            user_id: sessionStorage.getItem("user_id"),
          },
          dataType: "JSON",
        }).done(function (data) {
          var friends = JSON.parse(data[0].circle);
          var friendsPost = response.filter((x) =>
            friends.friends.includes(x.user_id)
          );
          displayPosts(friendsPost);
        });
      });
    }
  });
});

function displayForm() {
  $(".formPost").html(`
      <form action="pages/post?id=${sessionStorage.getItem(
        "user_id"
      )}&name=${sessionStorage.getItem(
    "name"
  )}" method="post" enctype="multipart/form-data" >
 
            <div class='d-flex'>
            <label for ='postText' class='border'>
                <textarea name="postText" id="postText" style:'border: none;
    outline: none;'></textarea>
            </label>
            
            <div style='display:flex; flex-direction: column; justify-content:center'>
                <label for="fileToUpload" class="btn fw-bold">upload img/video
                        <input type="file" accept="video/*|image/*" name="fileToUpload" id="fileToUpload"  style='display:none' required>
                    </label></div>
                
                    <input type="submit" value="POST" class="btn fw-bold text-danger" name="submit">
                </div>
            </div>
        </form>
  `);
}
function getPosts() {
  $.ajax({
    url: "/pages/operation",
    method: "post",
    data: { action: "getUserPost", user_id: sessionStorage.getItem("user_id") },
    dataType: "JSON",
  }).done(function (data) {
    console.log("posts display");
    displayPosts(data, 0);
  });
}

function displayPosts(data) {
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `
       <div class="col">
       <a href="/pages/viewpost?id=${data[i].post_id}">
        <div class="card p-4" style="width: 20rem;">
            <img  src="${data[i].file}" class="card-img-top" alt="...">
            <video  height="240" controls style='display:${
              !data[i].file.includes(".mp4") && "none"
            }; '>
  <source src="${data[i].file}" alt='.' >
  
  Your browser does not support the video tag.
</video>
            <div class="card-body">
                <h5 class="card-title text-dark">${data[i].name}</h5>
                <p class="card-text text-dark">${data[i].post_body}</p>
            </div>
            </div>
       </a>
    </div>

    
      `;
  }
  $(".feeds").html(html);
}
