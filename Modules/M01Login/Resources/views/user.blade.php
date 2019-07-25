<!DOCTYPE html>
<?php
// This is Default Setting can be overwritten in yield settings
$title = "Alvonse Template";
//dd($result);
?>
@yield('setting')

<html lang="en">

@include('base::layout.base.head')

<div class="container">
    <div class="col-md-12">
        <h1>Users Role list</h1>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>
            @foreach($result as $index=>$user)
                <tr>
                    <td>{{$user->email}}</td>
                    <td>{{$user->name}}</td>
                    <td><a href="user/delete/{{$user->user_id}}/{{$user->name}}" class="btn btn-danger">Delete</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
</html>
<script>
    var csrf_token = '{{ csrf_token()}}';
</script>


{!! Theme::js('js/validator.min.js') !!}

<link rel="stylesheet" href="http://localhost:8080/vendors.css"/>
<link rel="stylesheet" href="http://localhost:8080/backend.css"/>
<script src="http://localhost:8080/vendors.bundle.js"></script>
<script src="http://localhost:8080/backend.bundle.js"></script>
