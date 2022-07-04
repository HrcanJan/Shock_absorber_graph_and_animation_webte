<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Plot</title>

    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

</head>
<body>
    <div>
        <header><h1>Zaverečné zadanie</h1></header>
    </div>
    <div class="container">
        <div id="dataChart" class="plot"></div>
    </div>
    <div class="wrapper">
        <div class="push"></div>
        <div class="footer">
            <footer> <p>© Copyright Ivan Cicka, Jan Hrćan, Jovan Kiš, Paľko Urbanek 2022</p> </footer>
        </div>
    </div>

    <script src="script/myscript.js"></script>
    <script>plotDataChart();</script>
</body>
</html>
