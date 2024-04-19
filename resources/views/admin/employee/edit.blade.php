<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{-- {{ __('Dashboard') }} --}}
            Edit Employee <b></b>
            <b style="float: right;">
            </b>

        </h2>
    </x-slot>

    <div class="py-12">
        <div class="container">
            <div class="row">

                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Edit Employee</div>
                        <div class="card-body">
                            <form action="{{ route('employee.update', $employer->id) }}" method="POST">
                            @csrf
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Update Employee Name</label>
                            <input type="text" name="full_name" class="form-control"
                            id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$employer->full_name}}">
                                @error('full_name')
                                    <span class="text-danger">{{$message}}</span>
                                @enderror
                            </div>


                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Update Employee Email</label>
                            <input type="text" name="email" class="form-control"
                            id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$employer->email}}">
                                @error('email')
                                    <span class="text-danger">{{$message}}</span>
                                @enderror
                            </div>


                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Update Employee Password</label>
                            <input type="text" name="password" class="form-control"
                            id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$employer->password}}">
                                @error('password')
                                    <span class="text-danger">{{$message}}</span>
                                @enderror
                            </div>


                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Update Gender</label>
                            <input type="text" name="gender" class="form-control"
                            id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$employer->gender}}">
                                @error('gender')
                                    <span class="text-danger">{{$message}}</span>
                                @enderror
                            </div>

                            <button type="submit" class="btn btn-primary">Update Employee</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
