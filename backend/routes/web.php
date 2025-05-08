<?php

use Kreait\Firebase\Factory;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/firebase-test', function () {
    $firebase = (new Factory)
        ->withServiceAccount(config('firebase.credentials_file'));

    $auth = $firebase->createAuth();

    return 'Firebase SDK terhubung!';
});
