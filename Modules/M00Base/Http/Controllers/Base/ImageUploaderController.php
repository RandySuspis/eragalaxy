<?php

namespace Modules\M00Base\Http\Controllers\Base;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ImageUploaderController extends BaseController
{
    
    public function showDashboard(){
        return view('base::dashboard');
    }

}
