<?php

namespace App\Http\Controllers;

use App\Mail\MyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function send($eamil, $employee, $task, $deadLine)
    {
        Mail::to($eamil)->send(new MyEmail($employee, $task, $deadLine));
    }
}
