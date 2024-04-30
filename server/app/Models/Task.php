<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['idEmployee', 'name', 'description', 'status', 'points', 'deadLine', 'date_assignment', 'prof_document', 'user_id'];
    public function employees()
    {
        return $this->hasOne(User::class, "id", "idEmployee");
    }
}
