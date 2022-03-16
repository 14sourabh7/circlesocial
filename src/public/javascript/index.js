$(document).ready(function () {
  if (sessionStorage.getItem("login") == 1) {
    $(".authButton").html("SignOut");
    displayForm();
    getPosts();
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
      }).done(function (data) {
        displayPosts(data);
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
  )}" method="post" enctype="multipart/form-data" style="display:flex; flex-direction:column; justify-content:center; align-items:center">

            <div class="col-5 mx-auto">
                <textarea name="postText" id="postText" cols="30" rows="5"></textarea>
            </div>
            <div class="row ">
                <div class="col-7"> <label for="fileToUpload" class="btn btn-success ">
                        Upload
                        <input type="file" accept="video/*|image/*" name="fileToUpload" id="fileToUpload" style="display: none;" required>
                    </label></div>
                <div class="col-3">
                    <input type="submit" value="POST" class="btn btn-danger" name="submit">
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
                <h5 class="card-title">${data[i].name}</h5>
                <p class="card-text">${data[i].post_body}</p>
            </div>
       
            </div>
       </a>
    </div>

    
      `;
  }
  $(".feeds").html(html);
}
