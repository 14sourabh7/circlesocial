<?php

namespace App\Libraries;

class Controller
{

    public function model($model)
    {
        require_once APPPATH . '/../vendor/php-activerecord/php-activerecord/ActiveRecord.php';

        \ActiveRecord\Config::initialize(function ($cfg) {
            $cfg->set_model_directory(APPPATH . '/../private/models');
            $cfg->set_connections(array(
                'development' => 'mysql://root:secret@mysql-server/circle'
            ));
        });

        /* require_once 'Log.php';

        $log = \Log::singleton('file', APPPATH . '/../private/logs/sql.log'); //using PEAR Log
        \ActiveRecord\Config::instance()->set_logging(true);
        \ActiveRecord\Config::instance()->set_logger($log); */

        require_once(APPPATH . '/../private/models/' . $model . '.php');

        $model = '\\App\\Models\\' . $model;
        return new $model;
    }

    public function view($view, $data = [])
    {
        if (file_exists(APPPATH . '/../private/views/' . $view . '.php')) {
            require_once(APPPATH . '/../private/views/' . $view . '.php');
        } else {
            die("view does not exists");
        }
    }
}
