<?php

namespace App\Controllers;

use App\Libraries\Controller;

class Pages extends Controller
{
    public function index()
    {

        $this->view('/pages/index');
    }
    public function authentication()
    {
        $this->view('/pages/authentication');
    }
    public function user()
    {
        $this->view('/pages/user');
    }

    public function signup()
    {
        $this->view('/pages/signup');
    }
    public function operation()
    {

        if (isset($_POST)) {
            $action = $_POST['action'];
            switch ($action) {

                case 'signin':
                    $data = $this->model('Users')::find_all_by_email_and_password_or_username_and_password($_POST['email'], $_POST['password'], $_POST['email'], $_POST['password']);
                    break;
                case 'validateEmail':
                    $data = $this->model('Users')::find('all', array('conditions' => array('email = ?', $_POST['email'])));
                    break;
                case 'validateusername':
                    $data = $this->model('Users')::find('all', array('conditions' => array('username = ?', $_POST['username'])));
                    break;
                case 'addUser':
                    $user = $this->model('Users');
                    $user->name = $_POST['name'];
                    $user->username = $_POST['userName'];
                    $user->email = $_POST['email'];
                    $user->password = $_POST['password'];
                    $user->mobile = $_POST['mobile'];
                    $user->city = $_POST['city'];
                    $user->pincode = $_POST['pin'];
                    $user->country = $_POST['country'];

                    $user->save();
                    $data = $this->model('Users')::find('all', array('conditions' => array('email = ?', $_POST['email'])));
                    break;
                case 'getUser':
                    $data = $this->model('Users')::find_all_by_name_or_username($_POST['value'], $_POST['value']);
                    break;
                case 'getUsers':
                    $data = $this->model('Users')::all();
                    break;
                case 'getUserId':
                    $data = $this->model('Users')::find('all', array('conditions' => array('user_id = ?', $_POST['user_id'])));
                    break;
            }
        }
        $this->view('/pages/operation', $data);
    }
}
