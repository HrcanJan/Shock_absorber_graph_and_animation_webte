<?php

if(file_exists("OctaveGeneratedFiles/y.json")){
    $x1 = null;
    $y1 = null;
    $t1 = null;

    $fp = fopen("OctaveGeneratedFiles/y.json", "r");
    $name ="y1";
    $y1 =ToJSONConverter($fp,$name);

    $fp = fopen("OctaveGeneratedFiles/t.json", "r");
    $name ="t1";
    $t1=ToJSONConverter($fp,$name);

    $fp = fopen("OctaveGeneratedFiles/x.json", "r");
    $name ="x1";
    $x1 = ToJSONConverter($fp,$name);

    $array = Array($x1,$y1,$t1);
    $xyt = json_encode(array('data' => ($array)));

    $fp = fopen('OctaveGeneratedFiles/xyt.json', 'w');
    fwrite($fp, $xyt);
    fclose($fp);
    header('Location: index.php');
}


function ToJSONConverter($fp,$name) {
    $file ="";

    if ($fp) {
        while (($buffer = fgets($fp, 4096)) !== false) {
            if(strcmp($buffer[0],"#")) {
                $file = $file.$buffer;
                $json = json_decode($file);
            }
        }

        if (!feof($fp)) {
            echo "Error: unexpected fgets() fail\n";
        }
        fclose($fp);
    }
    return $json;

}