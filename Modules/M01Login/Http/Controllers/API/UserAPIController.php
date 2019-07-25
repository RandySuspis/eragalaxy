<?php

namespace Modules\M01Login\Http\Controllers\API;

use App\Mail\Mailtrap;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel as Sentinel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Modules\M00Base\Http\Controllers\Base\CRUDAPIController;
use Modules\M01Login\Entities\Member;
use Modules\M01Login\Entities\MemberID;
use Modules\M01Login\Entities\TypeMember;
use Modules\M01Login\Entities\TypeMemberBenefit;

class UserAPIController extends CRUDAPIController
{

    public function getProfile(Request $request){
        $user = $request->get('user');
        $id = MemberID::where('member_id', '=', $user->ID)->get()->first();
        $json['user'] = $user;
        $json['id'] = $id;
        return $this->composeSuccessJSON($json);
    }


    public function editProfile(Request $request){
        $user = $request->get('user');

        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'gender' => 'required',
            'birthday' => 'required',
            'phone' => 'required',

        ]);

        if ($validator->fails()) {
            $errorString = implode(",",$validator->messages()->all());
            return $this->composeErrorJSON($errorString);
        } else{
            $member = Member::where('id', '=', $user->ID)->get()->first();

            $member->FirstName = $request->get('first_name');
            $member->LastName = $request->get('last_name');
            $member->HP = $request->get('phone');
            $member->Birthday = date('Y-m-d', strtotime($request->get('birthday')));
            $member->Gender = $request->get('gender');

            if ($member->save()){
                $json = [];
                $json['first_name'] = $member->FirstName;
                $json['last_name'] = $member->LastName;
                return $this->composeSuccessJSON($json);
            } else{
                return $this->composeErrorJSON("Failed to save data");
            }
        }
    }



    public function changePassword(Request $request){
        $user = $request->get('user');

        $validator = Validator::make($request->all(), [
            'old_password' => 'required|min:6',
            'new_password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            $errorString = implode(",",$validator->messages()->all());
            return $this->composeErrorJSON($errorString);
        } else{
            if (Hash::check($request->get('old_password'), $user->getAuthPassword())){
                $user->password = Hash::make($request->get('new_password'));
                $user->save();
                return $this->composeSuccessJSON("done");
            } else return $this->composeErrorJSON("Invalid password!");
        }
    }


    public function getBenefits(){
        $types = TypeMember::all();

        $json = [];
        $json['data'] = [];
        $i=0;
        foreach ($types as $type){
            $json['data'][$i] = $type;
            $benefits = TypeMemberBenefit::where('Code', '=', $type->Code)->get();
            $json['data'][$i]['benefits'] = $benefits;
            $i++;
        }

        return $this->composeSuccessJSON($json);
    }

}
