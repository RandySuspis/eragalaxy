<?php

namespace Modules\M00Base\Http\Controllers\Base;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\View\View;

class BaseController extends Controller
{

    public function showDashboard(){
        return view('base::dashboard');
    }

    /**
     *
     *
     * @return Response
     */
    protected function composeView($stringTarget)
    {
        return view($stringTarget)->with([
            'titl' => "gila",
            'met' => "gilani"
        ]);
    }

    /**
     *
     * @var
     * @return View
     */
    protected function composeSuccessJSON($stringTarget)
    {
        return view($stringTarget)->with([
            'titl' => "gila",
            'met' => "gilani"
        ]);
    }

    /**
     *
     *
     * @return
     */
    protected function composeErrorJSON($stringTarget)
    {
        return view($stringTarget)->with([
            'titl' => "gila",
            'met' => "gilani"
        ]);
    }

}
