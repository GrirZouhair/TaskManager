<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Employee extends Model
{
    use HasApiTokens;
    use HasFactory;
    protected $fillable = ['Full_Name', 'email', 'password', 'gender'];
}
