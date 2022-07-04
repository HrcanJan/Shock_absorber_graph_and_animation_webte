<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "final";

if(isset($_POST['k1']) && isset($_POST['k2']) && isset($_POST['b1']) &&
    isset($_POST['b2']) && isset($_POST['m1']) && isset($_POST['m2'])){

    $currentDate = date('Y-m-d H:i:s', time());
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare("INSERT INTO info (date, k1, k2, m1, m2, b1, b2, was_successful)
                            VALUES(\"" . $currentDate . "\", \"". $_POST['k1'] ."\", \"" . $_POST['k2'] . "\",
                            \"". $_POST['m1'] ."\", \"". $_POST['m2'] ."\", \"". $_POST['b1'] ."\",
                            \"". $_POST['b2'] ."\", true)");
        $stmt->execute();

        // Writing logs to csv file if everything is okay
        $filename = "logs.csv";
        if(!file_exists($filename)) {
            $log_file = fopen($filename, "a");
            $columns = array("date", "sent_commands", "was_successful", "error_description");
            fputcsv($log_file, $columns);
        } else {
            $log_file = fopen($filename, "a");
        }
        $data = array($currentDate, "k1: ".$_POST['k1']." k2: ".$_POST['k2']." m1: ".$_POST['m1']." m2: ".$_POST['m2']." b1: ".$_POST['b1']." b2: ".$_POST['b2'], "true", "none");
        fputcsv($log_file, $data);

        fclose($log_file);

    } catch (Exception $e) {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare("INSERT INTO info (date, was_successful, error)
                        VALUES(\"" . $currentDate . "\", false, \"" . $e->getMessage() . "\")");
        $stmt->execute();

        // Writing logs to csv file if not everything is okay
        $filename = "logs.csv";
        if(!file_exists($filename)){
            $log_file = fopen($filename, "a");
            $columns = array("date", "sent_commands", "was_successful", "error_description");
            fputcsv($log_file, $columns);
        } else {
            $log_file = fopen($filename, "a");
        }
        $error_msg = $e->getMessage();
        $data = array($currentDate, "k1: ".$_POST['k1']." k2: ".$_POST['k2']." m1: ".$_POST['m1']." m2: ".$_POST['m2']." b1: ".$_POST['b1']." b2: ".$_POST['b2'], "false", $error_msg);
        fputcsv($log_file, $data);
        fclose($log_file);

    } finally {
        $conn = null;
    }
}

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if(isset($_POST['mail'])){

    $mail = new PHPMailer;

    $mail->isSMTP();                      // Set mailer to use SMTP
    $mail->Host = 'smtp.outlook.com';       // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;               // Enable SMTP authentication
    $mail->Username = '106075@stuba.sk';   // SMTP username
    $mail->Password = 'Yvy.qec.7.ahu';   // SMTP password
    $mail->SMTPSecure = 'tls';            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                    // TCP port to connect to

    // Sender info
    $mail->setFrom('106075@stuba.sk', 'Jovan Kis');

    // Add a recipient
    $mail->addAddress($_POST['mail']);

    // Set email format to HTML
    $mail->isHTML(true);

    // Mail subject
    $mail->Subject = 'Export of logs';



    // Check if export of logs is present.
    if(file_exists("logs.csv")){
        // Mail body content
        $bodyContent = '<h1>Hello.</h1>';
        $bodyContent .= '<p>This email contains export of logs(as attachment) from website you just visited.</p>';
        $mail->Body = $bodyContent;
        // Attachment
        $mail->addAttachment('./logs.csv');
    } else {
        $bodyContent = '<h1>Hello.</h1>';
        $bodyContent .= '<p>Unfortunately, we do not have export og logs yet.</p>';
        $mail->Body = $bodyContent;
    }
}

?>

<!-- Dizajn trochu inspirovany pracou pana Mateja Rabeka -->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="./fei.png">
    <link rel="stylesheet" href="./css/style.css">
    <script src="js/svg.min.js" defer></script>
    <script src="js/script.js" defer></script>
    <script src="js/anim.js" defer></script>
    <script src="js/printpdf.js" type="text/javascript"></script>
    <script src="https://mrrio.github.io/jsPDF/dist/jspdf.debug.js"></script>
    <title>FinalCountdown</title>
</head>

<body>

<div id="nav">
    <div class="flag">
        <abbr title="Slovenčina" id="sk" onclick="slovak()"></abbr>
        <abbr title="English" id="us" onclick="english()"></abbr>
    </div>
</div>

<br><br>

<div class="container">
    <h1 id="h1">.</h1>
    <form class="marginBottom" action="./index.php" method="post">

        <div class="grid">
            <div>
                <label class="label" for="m1">m1: </label>
                <input id="m1" name="m1" type="number">
            </div>
            <div>
                <label class="label" for="m2">m2: </label>
                <input id="m2" name="m2" type="number">
            </div>
        </div>
        <div class="grid">
            <div>
                <label class="label" for="k1">k1: </label>
                <input id="k1" name="k1" type="number">
            </div>
            <div>
                <label class="label" for="k2">k2: </label>
                <input id="k2" name="k2" type="number">
            </div>
        </div>
        <div class="grid">
            <div>
                <label class="label" for="b1">B1: </label>
                <input id="b1" name="b1" type="number">
            </div>
            <div>
                <label class="label" for="b2">B2: </label>
                <input id="b2" name="b2" type="number">
            </div>
        </div>

        <br>

        <div class="marginBottom">
            <input type="checkbox" id="graph" name="graph" value="Graf">
            <label for="graph" id="graphLabel"></label><br>
            <input type="checkbox" id="anim" name="anim" value="Animation">
            <label for="anim" id="animLabel"></label><br>
        </div>

        <button type="submit" class="marginBottom" id="button"></button>

        <div id="div">
            <div id="graphDiv"></div>
            <div id="animDiv"></div>
        </div>
    </form>

    <form action="index.php" method="post">
        <label for="mail" id="mailLabel"></label><br>
        <input type="text" id="mail" name="mail">
        <button type="submit" id="export-button">Export</button>
    </form>

    <button onclick="printPage()">Print .pdf</button>

    <p>&copy; Ivan Cicka, Jan Hrćan, Jovan Kiš, Paljko Urbanek</p>
</div>

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

</body>
</html>