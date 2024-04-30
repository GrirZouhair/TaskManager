<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['idEmployee', 'name', 'description', 'status', 'deadLine', 'date_assignment', 'user_id'];
    public function employees()
    {
        return $this->hasOne(User::class, "id", "idEmployee");
    }
}
