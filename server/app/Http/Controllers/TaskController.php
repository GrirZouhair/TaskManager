<?php

namespace App\Http\Controllers;

// use Carbon\Carbon;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;

class TaskController extends Controller
{
    public function index()
    {
        $task = DB::table('employees')
            ->join('tasks', 'tasks.idEmployee', '=', 'employees.id')
            ->select('idEmployee', 'tasks.id', 'email', 'full_name', 'gender', 'name', 'description', 'status', 'deadLine', 'tasks.created_at')
            ->get();
        return response()->json(['task' => $task, 'tasksNomber' => sizeof($task)]);
    }

    public function finishedTask()
    {
        $tasks = Task::where('status', '=', 'fait');
        return response()->json(['taskNomber' => sizeof($tasks), 'data' => $tasks]);
    }

    public function unFinishedTask()
    {
        $tasks = Task::where('status', '=', 'a faire')
            ->orWhere('status', '=', 'faire');
        return response()->json(['taskNomber' => sizeof($tasks), 'data' => $tasks]);
    }
    public function OverDeadLine()
    {
        $today = Carbon::now()->toDateString();

        $tasks = DB::table('tasks')
            ->join('employees', 'tasks.idEmployee', '=', 'employees.id')
            ->select('tasks.id', 'tasks.name', 'tasks.description', 'tasks.status', 'tasks.deadLine', 'employees.id as idEmployee', 'employees.email', 'employees.full_name', 'employees.gender')
            ->where('tasks.status', '!=', 'fait') // Filter tasks by status, change 'completed' to your actual completed status value
            ->where('tasks.deadLine', '<', $today) // Filter tasks where deadline is before today
            ->get();

        return response()->json(['tasks' => $tasks, 'tasksNumber' => $tasks]);
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

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'idEmployee' => 'exists:employees,id',
            'name' => 'required',
            'description' => 'required',
            'status' => 'required',
            'deadLine' => 'required|date',
            'date_assignment' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $task->update($validator->validated());
        Task::find($id)->update([
            'created_at' => Carbon::now()
        ]);

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
        $delete = Task::onlyTrashed()->find($id)->forceDelete();
        return response()->json(['message' => 'Task Deleted Successfully']);
    }

    // public function destroy($id)
    // {
    //     $task = Task::findOrFail($id);

    //     $task->delete();

    //     return response()->json(['message' => 'Task deleted successfully']);
    // }
}
