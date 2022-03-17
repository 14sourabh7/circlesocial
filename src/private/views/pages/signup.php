<!-- php file to display signup form -->
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Authentication</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <?php
    include '../private/views/components/navbar.php';
    ?>

    <main class="form-signin w-75 mx-auto mt-2">
        <h1 class="text-center text-dark">Sign Up Page</h1>
        <form>
            <div class="row">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name" name="name">
            </div>
            <div class="row">
                <label for="userName" class="form-label">User Name:</label>
                <input type="text" class="form-control" id="userName" placeholder="Enter user name" name="userName">
                <p id="userError" class='text-danger'></p>
            </div>
            <div class="row">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                <p id="emailError" class='text-danger'></p>
            </div>
            <div class="row">
                <label for="pwd" class="form-label">Password:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
            </div>
            <div class="row">
                <label for="cnfpwd" class="form-label">Confirm Password:</label>
                <input type="password" class="form-control" id="cnfpwd" placeholder="Enter password" name="pswd">
            </div>
            <div class="row">
                <label for="mobile" class="form-label">mobile:</label>
                <input type="number" class="form-control" id="mobile" placeholder="Enter mobile number" name="mobile">
            </div>
            <div class="row">
                <label for="city" class="form-label">city:</label>
                <input type="text" class="form-control" id="city" placeholder="Enter your city" name="city">
            </div>
            <div class="row">
                <label for="pin" class="form-label">pin code:</label>
                <input type="number" class="form-control" id="pin" placeholder="Enter pin code" name="pin">
            </div>
            <div class="row">
                <label for="country" class="form-label">country:</label>
                <input type="text" class="form-control" id="country" placeholder="Enter your country" name="country">
            </div>
            <p id='errorMsg' class="text-danger"></p>
            <button class="btn btn-dark p-2 w-25 mt-3 signup">Submit</button>
        </form>


    </main>


    <?php
    include '../private/views/components/footer.php';
    ?>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="../public/javascript/authentication.js"></script>

</html>