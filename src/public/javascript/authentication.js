$(document).ready(function () {
  if (sessionStorage.getItem("login") == 1) {
    location.replace("/");
  }

  var re = /\S+@\S+\.\S+/;
  $(".signin").click(function () {
    var email = $(".email").val();
    var password = $(".password").val();
    if (email && password) {
      $.ajax({
        url: "/pages/operation",
        method: "post",
        data: { action: "signin", email: email, password: password },
        dataType: "json",
      }).done(function (data) {
        if (data.length > 0) {
          sessionStorage.setItem("user_id", data[0].user_id);
          sessionStorage.setItem("name", data[0].name);
          sessionStorage.setItem("email", data[0].email);
          sessionStorage.setItem("role", data[0].role);
          sessionStorage.setItem("login", 1);
          location.replace("/");
        } else {
          $("#error").html("*Invalid Credentials");
        }
      });
    } else {
      $("#error").html("*Please fill all fields");
    }
  });

  $(".signup").click(function (e) {
    e.preventDefault();
    // variables
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#pwd").val();
    var cnfPassword = $("#cnfpwd").val();
    var mobile = $("#mobile").val();
    var userName = $("#userName").val();
    var city = $("#city").val();
    var country = $("#country").val();
    var pin = $("#pin").val();
    var country = $("#country").val();

    // input checker
    if (
      name &&
      email &&
      password &&
      cnfPassword &&
      mobile &&
      cnfPassword &&
      userName &&
      city &&
      country &&
      pin
    ) {
      if (password == cnfPassword) {
        if (!re.test(email)) {
          console.log("invalid email");
          $("#errorMsg").html("");
          var emailErr = "Invalid email format";
          $("#emailError").html(emailErr);
        } else if (!pin.length == 6 || !mobile.length == 10) {
          $("#errorMsg").html(
            "mobile must be of 10 characters and pin must be of 6 characters"
          );
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
              console.log("checking username");
              $.ajax({
                url: "/pages/operation",
                method: "post",
                data: {
                  action: "validateusername",
                  username: userName,
                },
                dataType: "JSON",
              }).done((data) => {
                if (data.length > 0) {
                  $("#userError").html("*username already exists");
                } else {
                  // ajax call to add user
                  $.ajax({
                    url: "/pages/operation",
                    method: "post",
                    data: {
                      action: "addUser",
                      email: email,
                      password: password,
                      name: name,
                      userName: userName,
                      mobile: mobile,
                      city: city,
                      pin: pin,
                      country: country,
                    },
                    dataType: "JSON",
                  }).done((data) => {
                    console.log("replacing");
                    location.replace("/pages/authentication");
                  });
                }
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
});
