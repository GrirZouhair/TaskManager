<?php

namespace App\Http\Controllers;

// use Carbon\Carbon;

use App\Models\Employee;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;

class TaskController extends Controller
{
    public function index($user)
    {
        $task = DB::table('employees')
            ->join('tasks', 'tasks.idEmployee', '=', 'employees.id')
            ->select('idEmployee', 'tasks.id', 'email', 'full_name', 'gender', 'name', 'description', 'status', 'deadLine', 'tasks.created_at')
            ->where('tasks.user_id', $user)
            ->get();
        return response()->json(['task' => $task, 'tasksNomber' => sizeof($task)]);
    }

    public function tasksStatictis($user)
    {
        $today = Carbon::now()->toDateString();
        $OverDeadLine = DB::table('tasks')
            ->join('employees', 'tasks.idEmployee', '=', 'employees.id')
            ->select('tasks.id', 'tasks.name', 'tasks.description', 'tasks.status', 'tasks.deadLine', 'employees.id as idEmployee', 'employees.email', 'employees.full_name', 'employees.gender')
            ->where('tasks.status', '!=', 'fait') // Filter tasks by status, change 'completed' to your actual completed status value
            ->where('tasks.deadLine', '<', $today)
            ->where('tasks.user_id', $user)
            ->get();
        $OverDeadLine['number'] = sizeof($OverDeadLine);

        $unFinishedTask = Task::where('status', '=', 'a faire')
            ->where('tasks.user_id', $user)
            ->orWhere('status', '=', 'faire')->get();
        $unFinishedTask['number'] = sizeof($unFinishedTask);

        $finishedTask = Task::where('status', '=', 'fait')
            ->where('tasks.user_id', $user)
            ->get();
        $finishedTask['number'] = sizeof($finishedTask);

        $tasks = Task::where('tasks.user_id', $user)->get();

        return response()->json(['OverDeadLine' => $OverDeadLine, 'unFinishedTask' => $unFinishedTask, 'finishedTask' => $finishedTask, 'numberOfTasks' => sizeof($tasks)]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idEmployee' => 'required|exists:employees,id',
            'name' => 'required',
            'description' => 'required',
            'status' => 'required',
            'deadLine' => 'required|date',
            'date_assignment' => 'required|date',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $task = Task::create($validator->validated());

        return response()->json(['message' => 'Task created successfully', 'task' => $task]);
    }

    public function showTask($idEmpolyee)
    {
        $task = DB::table('employees')
            ->join('tasks', 'tasks.idEmployee', '=', 'employees.id')
            ->select('idEmployee', 'tasks.id', 'email', 'full_name', 'gender', 'name', 'description', 'status', 'deadLine', 'tasks.created_at')
            ->where('idEmployee', '=', $idEmpolyee)
            ->get();

        return response()->json(['task' => $task]);
    }

    public function find($id)
    {
        $task = Task::findOrFail($id);
        if (!$task) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        }
        return response()->json(['task' => $task], 200);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'idEmployee' => 'exists:employees,id',
            'name' => 'required',
            'description' => 'required',
            'status' => 'required',
            'deadLine' => 'required|date',
            'date_assignment' => 'sometimes|required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $task->update($validator->validated());

        $employee = Employee::where('id', $task->idEmployee)->get();

        if ($task->status == 'fait') {
            $completionDate = Carbon::parse($task->date_assignment);
            $deadline = Carbon::parse($task->deadLine);

            // Check if the task was completed within the deadline
            if ($completionDate->lte($deadline)) {
                $employee[0]->points += 10; // Add 10 points
            } else {
                $employee[0]->points += 5; // Add 5 points
            }
            $employee[0]->save();
            return response()->json(['message' => $employee]);
        }

        return response()->json(['message' => 'Task updated successfully', 'task' => $task]);
    }
    public function SoftDelete($id)
    {
        $delete = Task::find($id)->delete();
        return response()->json(['message' => 'Task Soft Delete Successfully']);
    }
    public function Restore($id)
    {
        $delete = Task::withTrashed()->find($id)->restore();
        return response()->json(['message' => 'Task Restore Successfully']);
    }

    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            if (!$task) {
                return response()->json([
                    'message' => 'Task not found'
                ], 404);
            }
            $task->delete();
            return response()->json(['message' => 'Task deleted successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error deleting task ' . $e->getMessage(),
            ], 500);
        }
    }
}
