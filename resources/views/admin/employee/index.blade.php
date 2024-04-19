<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{-- {{ __('Dashboard') }} --}}
            welcome back

        </h2>
    </x-slot>

    <div class="py-12">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        @if (session('success'))
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{{session('success')}}</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        @endif
                        <div class="card-header">All Employees</div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">SL No</th>
                                    <th scope="col">full Name</th>
                                    <th scope="col">email</th>
                                    <th scope="col">gender</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {{-- @php
                                    $i = 1;
                                @endphp --}}
                                @foreach ($employees as $employee)
                                <tr>
                                    <th scope="row">{{$loop->iteration}}</th>
                                    <td>{{$employee->full_name}}</td>
                                    <td>{{$employee->email}}</td>
                                    <td>{{$employee->gender}}</td>


                                    <td>
                                        @if ($employee->created_at == NULL)
                                            <span class="text-danger">No Data Set</span>
                                        @else
                                        {{$employee->created_at->diffForHumans()}}
                                        @endif
                                        </td>
                                        <td>
                                            <a href="{{url('employee/edit/'.$employee->id)}}" class="btn btn-info">Edit</a>
                                            <a href="{{url('employee/delete/'.$employee->id)}}" class="btn btn-danger"
                                                onclick="return confirm('Are You Sure To Delete')"
                                            >Delete</a>
                                        </td>
                                </tr>
                                @endforeach

                            </tbody>
                        </table>
                        {{ $employees->links() }}
                    </div>
                </div>
            </div>
            <br><br>
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Add Employees</div>
                        <div class="card-body">
                        <form method="POST" action="{{route('store.employee')}}">
                            @csrf
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Employee Name</label>
                            <input type="text" name="full_name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                @error('empl_name')
                                    <span class="text-danger">{{$message}}</span>
                                @enderror
                            </div>


                            <div class="mb-3">
                            <abel for="exampleInputEmail1" class="form-label">Employee Email</label>
                            <input type="text" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                @error('empl_email')
                                    <span class="text-danger">{{$message}}</span>
                                @enderror
                            </div>


                            <div class="mb-3">
                            <abel for="exampleInputEmail1" class="form-label">Employee Password</label>
                            <input type="password" name="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                @error('password')
                                    <span class="text-danger">{{$message}}</span>
                                @enderror
                            </div>



                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Employee Gender</label>
                            <input type="text" name="gender" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                @error('empl_gender')
                                    <span class="text-danger">{{$message}}</span>
                                @enderror
                            </div>


                            <button type="submit" class="btn btn-primary">Add Employee</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>




</x-app-layout>
