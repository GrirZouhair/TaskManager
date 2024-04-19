<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;
    protected $fillable = ['idEmployee', 'name', 'description', 'status', 'deadLine'];
    public function employees()
    {
        return $this->hasOne(User::class, "id", "idEmployee");
    }
}
