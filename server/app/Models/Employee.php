<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    protected $fillable = ['full_name', 'email', 'password', 'gender', 'boss_id', 'points', 'securecode'];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "boss_id", "id");
    }
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, "idEmployee", "id");
    }
}
