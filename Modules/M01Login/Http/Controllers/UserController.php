<?php

namespace Modules\M01Login\Http\Controllers;

use Helper\ImageIntervention;
use Illuminate\Http\Request;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Modules\M00Base\Http\Controllers\Base as Base;
use Modules\M01Login\Entities\Member;
use Modules\M01Login\Entities\MemberID;

class UserController extends Base\CRUDReactController
{

    protected $moduleBaseUrl = 'user';
    protected $moduleName = 'M01Login';
    protected $tableName = 'users';
    // LIST & DETAIL DATA
    protected $hide = ["password","permissions","created_at","updated_at"];
    protected $show = ["email", "first_name", "last_name", "last_login", "action"];


    public function createAction(Request $request)
    {
        $data = $request->all();
        $user = Sentinel::findById($data['UserId']);
        $role = Sentinel::findRoleByName($data['RoleName']);
        $role->users()->attach($user);
        return redirect('user');
    }



    public function profile(){
        //get member code
        $membercode = MemberID::where('member_id', '=', Auth::user()->ID)->get()->first();

        $code = "";
        if ($membercode) $code = $membercode->member_code;

        $points = 0;
        if (Auth::user()->Point == null) $points = 0;
        else $points = Auth::user()->Point;

        return view('login::profile')->with([
            'JS' => [
                'name' => '\''.Auth::user()->FirstName." ".Auth::user()->LastName.'\'',
                'email' => '\''.Auth::user()->UserName.'\'',
                'photo' => '\''.Auth::user()->Photo.'\'',
                'code' => '\''.$code.'\'',
                'point' => '\''.$points.'\''
            ]
        ]);
    }



    public function changePassword(){
        return view('login::changePassword');
    }


    public function doChangePassword(Request $request){
        $validate = Validator::make($request->all(), [
            'old_password' => 'required|string',
            'new_password' => 'required|string|min:6',
            'confirm_password' => 'required|same:new_password'
        ]);

        if ($validate->fails()){
            $error = $validate->errors()->first();
            toast()->error($error);
            return redirect()->back()->withInput();
        }

        $user = Member::where('UserName', '=', Auth::user()->UserName)->where('ID', '=', Auth::user()->ID)->where('status', '=', 1)->get()->first();
        if ($user){
            if (Hash::check($request->get('old_password'), $user->getAuthPassword())){
                $newPassword = Hash::make($request->get('new_password'));
                $user->Password = $newPassword;

                if ($user->save()){
                    toast()->success("Password Changed!", "Success!");
                    return redirect()->to('/profile');
                } else{
                    toast()->error("Failed to change password", "Error!");
                    return redirect()->back();
                }
            } else{
                toast()->error("Wrong username and password combination", "Error!");
                return redirect()->back();
            }
        } else{
            toast()->error("User account not found!", "Error!");
            return redirect()->back();
        }
    }


    public function editProfile(){

        return view('login::editProfile')->with([
            "JS" => [
                "first_name" => '\''.Auth::user()->FirstName.'\'',
                "last_name" => '\''.Auth::user()->LastName.'\'',
                "gender" => '\''.Auth::user()->Gender.'\'',
                "date_of_birth" => '\''.Auth::user()->Birthday.'\'',
                "photo" => '\''.Auth::user()->Photo.'\'',
                "city" => '\''.Auth::user()->City.'\'',
                "phone" => '\''.Auth::user()->HP.'\''
            ]
        ]);
    }


    public function doEditProfile(Request $request){
        $validate = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'gender' => 'required|string',
            'date_of_birth' => 'required|string',
            'city' => 'required|string',
            'phone' => 'required|string',
            'image' => 'required'
        ]);

        if ($validate->fails()){
            $error = $validate->errors()->first();
            toast()->error($error);
            return redirect()->back()->withInput();
        }

        $member = Member::where('ID', '=', Auth::user()->ID)->where('UserName', '=', Auth::user()->UserName)->where('status', '=', 1)->get()->first();
        if ($member){
            $member->FirstName = $request->get('first_name');
            $member->LastName = $request->get('last_name');
            $member->Gender = $request->get('gender');
            $member->Birthday = date('Y-m-d', strtotime($request->get('date_of_birth')));
            $member->City = $request->get('city');
            $member->HP = $request->get('phone');

            if ($member->save()){

                //upload image
                if ($request->file('image')){
                    $upload_file = $member->ID.".".$request->file('image')->getClientOriginalExtension();
                    if (ImageIntervention::saveImage($request->file('image'), 1000, "user_uploads/", function() use ($upload_file){
                        return $upload_file;
                    })){
                        $member->Photo = $upload_file;
                        $member->save();
                    }
                }

                toast()->success("Member edited!", "Success!");
                return redirect()->to('/profile');
            } else{
                toast()->error("Failed to save member!", "Error!");
                return redirect()->back()->withInput();
            }
        } else{
            toast()->error("User not found!", "Error!");
            return redirect()->back()->withInput();
        }

    }

    public function benefits(){
        return view('login::benefits');
    }



}