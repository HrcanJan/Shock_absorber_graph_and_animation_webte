<?php
require_once "octave-daemon/include/Octave_lib.php";
require "Converter.php";

$servername = "localhost";
$username = "xcickai1";
$password = "iyXXrqtyLr8buAk";
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

    } catch (PDOException $e) {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare("INSERT INTO info (date, was_successful, error)
                        VALUES(\"" . $currentDate . "\", false, \"" . $e->getMessage() . "\")");
        $stmt->execute();
    } finally {
        $conn = null;
    }
    $k1 =$_POST["k1"];
    $k2 =$_POST["k2"];
    $m1 =$_POST["m1"];
    $m2 =$_POST["m2"];
    $b1 =$_POST["b1"];
    $b2 =$_POST["b2"];


//KED SA POVIAZE INDEX TOTO ZAKOMENTUVAT
//    $m1 = 2500;
//    $m2 = 320;
//    $k1 = 80000;
//    $k2 = 500000;
//    $b1 = 350;
//    $b2 = 15020;
//


    $octave = new Octave(false);

    $octave->run("pkg load control");
    $octave->run("pkg load io");
    $octave->run(
"m1 = ".$m1.";
m2 = ".$m2.";
k1 = ".$k1.";
k2 = ".$k2.";
b1 = ".$b1.";
b2 = ".$b2.";
A=[0 1 0 0;-(b1*b2)/(m1*m2) 0 ((b1/m1)*((b1/m1)+(b1/m2)+(b2/m2)))-(k1/m1) -(b1/m1);b2/m2 0 -((b1/m1)+(b1/m2)+(b2/m2)) 1;
k2/m2 0 -((k1/m1)+(k1/m2)+(k2/m2)) 0];
B=[0 0;1/m1 (b1*b2)/(m1*m2);0 -(b2/m2);(1/m1)+(1/m2) -(k2/m2)];
C=[0 0 1 0];
D=[0 0];
Aa = [[A,[0 0 0 0]'];[C, 0]];
Ba = [B;[0 0]];Ca = [C,0];
Da = D;
K = [0 2.3e6 5e8 0 8e6];
sys = ss(Aa-Ba(:,1)*K,Ba,Ca,Da);
t = 0:0.01:5;
r =0.1; 
initX1=0;
initX1d=0;
initX2=0;
initX2d=0;
[y,t,x]=lsim(sys*[0;1],r*ones(size(t)),t,[initX1;initX1d;initX2;initX2d;0]);
y1 = toJSON(y);
t1 = toJSON(t);
x1 = toJSON(x);
");

    $octave->run("save('OctaveGeneratedFiles/y.json','y1')");
    $octave->run("save('OctaveGeneratedFiles/t.json','t1')");
    $octave->run("save('OctaveGeneratedFiles/x.json','x1')");

header("Refresh:0");
}

?>