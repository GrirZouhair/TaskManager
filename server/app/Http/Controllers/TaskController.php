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
        $tasks = Task::all();
        if (sizeof($tasks) == 0) return  response()->json(['Message' => 'Pas des tache']);
        return response()->json(['tasks' => $tasks], 200);
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

        Task::insert([
            'created_at' => Carbon::now()
        ]);
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
