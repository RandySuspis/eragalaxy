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
        <h1>Create Role</h1>
        <form action="/user/create/" method="post">
            <input type="hidden" name="_token" value={{csrf_token()}} />
            <div class="form-group">
                <label>UserId</label>
                <input class='form-control select2 select2-hidden-accessible col-sm-7'
                        style='width: 100%;'
                        name="UserId"
                        id="UserId"
                />
            </div>
            <div class="form-group">
                <label>Role</label>
                <input class='form-control select2 select2-hidden-accessible col-sm-7'
                        style='width: 100%;'
                        name="RoleName"
                        id="RoleName"
                />
            </div>
            <div className="form-group">
                <input type="submit" value="Create"
                       className="btn btn-primary form-control"/>
            </div>
        </form>
    </div>
</div>
</html>
<script>
    {{--var csrf_token = '{{ csrf_token()}}';--}}
</script>

<link rel="stylesheet" href="http://localhost:8080/vendors.css"/>
<link rel="stylesheet" href="http://localhost:8080/backend.css"/>
<script src="http://localhost:8080/vendors.bundle.js"></script>
<script src="http://localhost:8080/backend.bundle.js"></script>
