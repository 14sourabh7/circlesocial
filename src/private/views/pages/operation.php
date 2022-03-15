<?php
// session_start();
$arr_items = array();
foreach ($data as $group) {
    $arr_items[] = $group->to_array();
}
echo (json_encode($arr_items));
