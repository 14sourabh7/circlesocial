<!DOCTYPE html>
<html lang="en">

<head>
    <title>The Circles</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="../public/css/style.css">
    <style>
        body {
            padding-left: 10%;
            padding-right: 10%;

        }
    </style>
</head>

<body>
    <?php
    include '../private/views/components/navbarHome.php';
    echo '<div class="border">';
    include '../private/views/components/postModal.php';
    include '../private/views/components/tab.php';
    include '../private/views/components/posts.php';
    echo '</div>';
    include '../private/views/components/footer.php';
    ?>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="../public/javascript/index.js"></script>

</html>