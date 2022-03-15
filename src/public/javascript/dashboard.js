var re = /\S+@\S+\.\S+/;
var role = sessionStorage.getItem("role");
var users = [];
var blogs = [];
$(document).ready(function () {
  checkLogin();

  // user management /////////////////////////////////////////////

  getUsers();

  // event listener for add New button
  $(".addNew").click(function (e) {
    e.preventDefault();
    // variables
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#pwd").val();
    var cnfPassword = $("#cnfpwd").val();

    // input checker
    if (name && email && password && cnfPassword) {
      if (password == cnfPassword) {
        if (!re.test(email)) {
          console.log("invalid email");
          $("#errorMsg").html("");
          var emailErr = "Invalid email format";
          $("#emailError").html(emailErr);
        } else {
          // code to check email already exists
          $.ajax({
            url: "/pages/operation",
            method: "post",
            data: {
              action: "validateEmail",
              email: email,
              password: password,
            },
            dataType: "JSON",
          }).done((data) => {
            if (data.length > 0) {
              $("#emailError").html("*Email already exists");
            } else {
              $("#emailError").html("");
              console.log("adding");

              // ajax call to add user
              $.ajax({
                url: "/pages/operation",
                method: "post",
                data: {
                  action: "addUser",
                  email: email,
                  password: password,
                  name: name,
                },
                dataType: "JSON",
              }).done((data) => {
                console.log("replacing");
                location.replace("/pages/dashboard");
              });
            }
          });
        }
      } else {
        $("#errorMsg").html("Password mismatch");
      }
    } else {
      $("#errorMsg").html("Please fill all details");
    }
  });

  // function to getUsers from db
  function getUsers() {
    $.ajax({
      url: "/pages/operation",
      method: "post",
      data: { action: "getUsers" },
      dataType: "JSON",
    }).done((data) => {
      console.log(data);
      users = data;
      makePages(Math.ceil(data.length / 5), "paginationUser", "User");
      paginationUser(data, 1);
    });
  }

  // event listener to delete user
  $("body").on("click", "#delUser", function () {
    var user_id = $(this).data("id");
    console.log(user_id);
    if (user_id) {
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "deleteUser",
          user_id: user_id,
        },
        dataType: "JSON",
      }).done((data) => {
        getUsers();
      });
    }
  });

  // event handler to update user status
  $("body").on("change", "#status", function () {
    var status = $(this).val();
    var user_id = $(this).data("id");
    var column = $(this).data("col");

    if (status && user_id) {
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "updateStatus",
          status: status,
          user_id: user_id,
          column: column,
        },
        dataType: "JSON",
      }).done((data) => {
        getUsers();
      });
    }
  });

  // function to display users
  function displayUsers(data, limit = data.length) {
    var html = "";
    console.log(data);

    if (data) {
      for (let i = 0; i < limit; i++) {
        var color =
          data[i].status == "approved" ? "text-success" : "text-danger";
        var userColor =
          data[i].role == "admin" ? "text-danger" : "text-success";

        var changeBtn =
          data[i].role == "admin" && data[i].user_id == "1" ? "disabled" : "";

        html += `
          <tr>
          <td id='user_id'>${data[i].user_id}</td>
          <td>${data[i].password}</td>
          <td>${data[i].name}</td>
          <td>${data[i].email}</td>
          <td><select name='role' class='btn ${userColor}' data-id='${data[i].user_id}' data-col='role' value='${data[i].role}' id='status' ${changeBtn}>
          <option  class='btn ${userColor}'  value='${data[i].role}'  name='role'>
         ${data[i].role}
          </option>
          <option name='role' class='text-warning' value='user'>user</option>
            <option name='role' class='text-danger' value = 'admin'>admin</option>
               <option name='role' class='text-danger' value = 'editor'>editor</option>
          </select></td>
          <td> <select name='status' class='btn ${color}' data-id='${data[i].user_id}' data-col='status' value='${data[i].status}' id='status' ${changeBtn}>
          <option  class='btn ${color}'  value='${data[i].status}'  name='status'>
         ${data[i].status}
          </option>
          <option name='status' class='text-success' value='approved'>approved</option>
            <option name='status' class='text-danger' value = 'restricted'>restricted</option>
          </select></td>
          <td><button class='btn' href='#' data-id='${data[i].user_id}' id='delUser' ${changeBtn}>Delete </button> </td>
          </tr>
          `;
      }
    }
    $(".userData").html(html);
  }

  ///// Blog Management  ////////////////////////////////////////////////////////////////
  getBlogs();
  // function to getBlogs from db
  function getBlogs() {
    if (role == "user") {
      var user_id = sessionStorage.getItem("user_id");
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: { action: "getUserBlog", user_id: user_id },
        dataType: "JSON",
      }).done((data) => {
        blogs = data;
        makePages(Math.ceil(data.length / 5), "paginationBlog", "Blog");
        paginationBlog(data, 1);
      });
    } else {
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: { action: "getBlogs" },
        dataType: "JSON",
      }).done((data) => {
        blogs = data;
        makePages(Math.ceil(data.length / 5), "paginationBlog", "Blog");
        paginationBlog(data, 1);
      });
    }
  }

  // function to display users
  function displayBlogs(data, limit = data.length) {
    var html = "";
    if (data) {
      for (let i = 0; i < limit; i++) {
        var color =
          data[i].status == "approved" ? "text-success" : "text-danger";
        var changeBtn = role == "user" && "disabled";

        html += `
          <tr>
          <td id='blog_id'>${data[i].blog_id}</td>
          <td>${data[i].user_id}</td>
          <td>${data[i].title}</td>
          <td>${data[i].author}</td>
          <td>${data[i].date}</td>
          <td> <select name='status' class='btn ${color}' data-id='${data[i].blog_id}' data-col='status' value='${data[i].status}' id='blogStatus' ${changeBtn}>
          <option  class='btn ${color}'  value='${data[i].status}'  name='status'>
         ${data[i].status}
          </option>
          <option name='status' class='text-success' value='approved'>approved</option>
            <option name='status' class='text-danger' value = 'restricted'>restricted</option>
          </select></td>
            </td>
          <td>
           <button class='btn' href='#' data-id='${data[i].blog_id}' id='viewBlog' 
           data-bs-toggle="modal" data-bs-target="#exampleModal"
           >View </button>
          <button class='btn' href='#' data-id='${data[i].blog_id}' id='delBlog' >Delete </button>
        
          </tr>
          `;
      }
    }
    $(".blogData").html(html);
  }

  // writeblog button listener
  $(".writeBlog").click(function () {
    console.log("clicked");
    $(".blogTitle").val("");
    $(".blogText").val("");
  });

  // button listener to add blog
  $(".blogPost").click(function () {
    var title = $(".blogTitle").val();
    var text = $(".blogText").val();
    var user_id = sessionStorage.getItem("user_id");
    var author = sessionStorage.getItem("name");
    if (title && text) {
      $(".blogTitleError").html("");
      $(".blogTextError").html("");
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "addBlog",
          user_id: user_id,
          author: author,
          title: title,
          text: text,
          status: "restricted",
        },
        dataType: "JSON",
      }).done((data) => {
        getBlogs();
      });
    } else {
      if (!title) {
        $(".blogTextError").html("");
        $(".blogTitleError").html("*Please Provide title");
      }
      if (!text) {
        $(".blogTitleError").html("");
        $(".blogTextError").html("*Blog can't be empty");
      }
      if (!text && !title) {
        $(".blogTitleError").html("*Please Provide title");
        $(".blogTextError").html("*Blog can't be empty");
      }
    }
  });

  // event handler to update Blog status
  $("body").on("change", "#blogStatus", function () {
    var status = $(this).val();
    var blog_id = $(this).data("id");
    console.log(blog_id);
    if (status && user_id) {
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "updateBlogStatus",
          status: status,
          blog_id: blog_id,
          column: "status",
        },
        dataType: "JSON",
      }).done((data) => {
        getBlogs();
      });
    }
  });

  // event listener to delete Blog
  $("body").on("click", "#delBlog", function () {
    var blog_id = $(this).data("id");
    console.log(blog_id);
    if (user_id) {
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "deleteBlog",
          blog_id: blog_id,
        },
        dataType: "JSON",
      }).done((data) => {
        getBlogs();
      });
    }
  });

  // event listener for view button in blog table
  $("body").on("click", "#viewBlog", function () {
    var blog_id = $(this).data("id");
    console.log(blog_id);
    $(".bID").attr("data-id", blog_id);
    $.ajax({
      url: "/pages/operation",
      method: "post",
      data: {
        action: "getBlog",
        blog_id: blog_id,
      },
      dataType: "JSON",
    }).done((data) => {
      console.log(data);
      $(".blogTitle").val(data[0].title);
      $(".blogText").val(data[0].text);
      $(".blogUpdate").show();
      $(".blogPost").hide();
    });
  });

  // event listener for update blog button
  $(".blogUpdate").click(function () {
    var title = $(".blogTitle").val();
    var text = $(".blogText").val();
    var blog_id = $(".bID").data("id");
    if (title && text) {
      $(".blogTitleError").html("");
      $(".blogTextError").html("");
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: {
          action: "updateBlog",
          blog_id: blog_id,
          title: title,
          text: text,
        },
        dataType: "JSON",
      }).done((data) => {
        getBlogs();
      });
    } else {
      if (!title) {
        $(".blogTextError").html("");
        $(".blogTitleError").html("*Please Provide title");
      }
      if (!text) {
        $(".blogTitleError").html("");
        $(".blogTextError").html("*Blog can't be empty");
      }
      if (!text && !title) {
        $(".blogTitleError").html("*Please Provide title");
        $(".blogTextError").html("*Blog can't be empty");
      }
    }
  });

  // function to handle pagination on users table
  function paginationUser(array, pageNumber = 1, pageSize = 5) {
    var arrayT = array.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
    displayUsers(arrayT);
  }

  // function to list no of pages in both tables
  function makePages(pages, list, filter) {
    let i = 1;
    html = `<li class="page-item"><button class="btn nav-link prev${filter} page${filter}" href="#" data-page="1">Start</button></li>`;

    for (i; i <= pages; i++) {
      html += `
        <li class="page-item"><button class="btn nav-link page${filter}" data-page="${i}" href="#">${i}</button></li>
        `;
    }

    html += `<li class="page-item"><button class="btn nav-link next${filter} page${filter}" data-page="${
      i - 1
    }" data-endpage="${i}" href="#">End</button></li>`;
    $(`.${list}`).html(html);
  }

  // event listener to handle page change in user table
  $("body").on("click", ".pageUser", function () {
    var currentPage = $(this).data("page");
    if (currentPage == "1") {
      $(".prevUser").attr("disabled", true);
    } else {
      console.log("here");
      $(".prevUser").attr("disabled", false);
    }
    if (currentPage == $(".nextUser").data("endpage") - 1) {
      $(".nextUser").attr("disabled", true);
    } else {
      $(".nextUser").attr("disabled", false);
    }

    paginationUser(users, currentPage);
  });

  // function to handle  pagination in blog table
  function paginationBlog(array, pageNumber = 1, pageSize = 5) {
    var arrayT = array.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
    displayBlogs(arrayT);
  }

  // event listener for page change in blog table
  $("body").on("click", ".pageBlog", function () {
    var currentPage = $(this).data("page");
    if (currentPage == "1") {
      $(".prevBlog").attr("disabled", true);
    } else {
      $(".prevBlog").attr("disabled", false);
    }
    console.log($(".nextBlog").data("endPage"));
    if (currentPage == $(".nextBlog").data("endpage") - 1) {
      $(".nextBlog").attr("disabled", true);
    } else {
      $(".nextBlog").attr("disabled", false);
    }
    paginationBlog(blogs, currentPage);
  });
});

// function to handle user permissions
function giveAccess() {
  if (role == "admin") {
    $("#users").show();
    $(".users").show();
    $("#blogs").show();
    $(".blogs").show();
  } else {
    $("#blogs").show();
    $(".blogs").show();
  }
}

// function to check user login
function checkLogin() {
  if (sessionStorage.getItem("login") || sessionStorage.getItem("login") == 1) {
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
    giveAccess();
  } else {
    location.replace("/pages/authentication");
  }
}
