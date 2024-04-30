<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    protected $fillable = ['full_name', 'email', 'password', 'gender', 'boss_id'];
}
