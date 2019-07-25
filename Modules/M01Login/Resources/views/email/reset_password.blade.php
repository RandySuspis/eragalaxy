<h1>Hello! {{$name}}</h1>
<div>Click the following link to reset your password</div>
<br>
<a href="{{url('/user/resetpassword/'.$email.'/'.$password_reset_token)}}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Reset Password</a>
<br>
<p>Or copy paste this following link to your browser : {{url('/user/resetpassword/'.$email.'/'.$password_reset_token)}}</p>
<p>Please note that this link will expire in 2 days.</p>