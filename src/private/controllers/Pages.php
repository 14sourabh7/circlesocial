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
    public function viewpost()
    {
        $this->view('/pages/post');
    }
    public function post()
    {

        // starting session
        // session_start();

        // setting location for file to be stored
        $target_file = "../public/img/" . basename($_FILES["fileToUpload"]["name"]);

        // moving file to upload folder
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            //     // varaiable to hold file name
            $name = basename($_FILES["fileToUpload"]["name"]);
            $post = $this->model('Posts');
            $post->user_id = $_GET['id'];
            $post->name = $_GET['name'];
            $post->post_body = $_POST['postText'];
            $post->file = '../public/img/' . $name;
            $post->save();
            $last_id = $this->model('Posts')::last();
            $stats = $this->model('Stats');
            $stats->post_id = $last_id->post_id;

            $stats->stats = '{"likes": [], "comments": []}';
            $stats->save();
            header('Location:/');
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
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
                case 'getPosts':
                    $data = $this->model('Posts')::all();
                    break;
                case 'getUserPost':
                    $data = $this->model('Posts')::find('all', array('conditions' => array('user_id = ?', $_POST['user_id'])));
                    break;
                case 'getOtherPosts':
                    $data = $this->model('Posts')::find('all', array('conditions' => array('user_id != ?', $_POST['user_id'])));
                    break;
                case 'getPost':
                    $data = $this->model('Posts')::find('all', array('conditions' => array('post_id = ?', $_POST['id'])));
                    break;
                case 'getStats':
                    $data = $this->model('Stats')::find('all', array('conditions' => array('post_id = ?', $_POST['id'])));
                    break;
                case 'updateStats':
                    $post =
                        $this->model('Stats')::find_by_post_id($_POST['id']);
                    $post->stats = $_POST['stats'];
                    $post->save();
                    $data = $this->model('Stats')::find('all', array('conditions' => array('post_id = ?', $_POST['id'])));
                    break;
                case 'getCircle':
                    $data = $this->model('Circles')::find('all', array('conditions' => array('user_id = ?', $_POST['user_id'])));
                    break;
                case 'updateCircle':
                    $circle =
                        $this->model('Circles')::find_by_user_id($_POST['id']);
                    $circle->circle = $_POST['circles'];
                    $circle->save();
                    $data = $this->model('Circles')::find('all', array('conditions' => array('user_id = ?', $_POST['id'])));
                    break;
                case 'getFriend':
                    $data =
                        $this->model('Users')::find('all', array('conditions' => array('user_id = ?', $_POST['id'])));
                    break;
                case 'addCircle':
                    $circles = $this->model('Circles');
                    $circles->user_id = $_POST['user_id'];
                    $circles->circle = '{"block": [], "friends": []}';
                    $circles->save();
                    break;
                case 'sharePost':
                    $post = $this->model('Posts');
                    $post->user_id = $_POST['id'];
                    $post->name = $_POST['name'];
                    $post->post_body = $_POST['postText'];
                    $post->file = $_POST['file'];
                    $post->save();
                    $last_id = $this->model('Posts')::last();
                    $stats = $this->model('Stats');
                    $stats->post_id = $last_id->post_id;

                    $stats->stats = '{"likes": [], "comments": []}';
                    $stats->save();
            }
        }
        $this->view('/pages/operation', $data);
    }
}
