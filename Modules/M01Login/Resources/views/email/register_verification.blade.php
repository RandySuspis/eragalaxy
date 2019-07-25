<h1>Hello! {{$name}}</h1>
<div>Click the following link to verify your account</div>
<br>
<a href="{{url('/user/emailverify/'.$email.'/'.$email_token)}}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Verify E-mail</a>
<br>
<p>Or copy paste this following link to your browser : {{url('/user/emailverify/'.$email.'/'.$email_token)}}</p>
<p>Please note that this link will expire in 2 days.</p>