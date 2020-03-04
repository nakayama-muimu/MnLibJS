<?php

e("Method", $_SERVER["REQUEST_METHOD"]);

$my_dir = dirname(__FILE__);

if(isset($_FILES["fn03"])){
    foreach($_FILES["fn03"] as $k => $v){
        e($k, $v);
    }
    $tmp_name = $_FILES["fn03"]["tmp_name"];
    if(is_uploaded_file($tmp_name)){
        $fn = basename($_FILES["fn03"]["name"]);
        move_uploaded_file($tmp_name, $my_dir."/".$fn);
    }
}



foreach($_REQUEST as $k => $v){
    e($k, $v);
}

function e($k, $v){
    echo "{$k}:{$v}\n";
}
