<?php

namespace Modules\M01Login\Emails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPasswordEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('login::email.reset_password')->with([
            'password_reset_token' => $this->user->password_reset_token,
            'name' => $this->user->FirstName." ".$this->user->LastName,
            'email' => $this->user->UserName
        ]);
    }
}
