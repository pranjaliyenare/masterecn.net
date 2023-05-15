<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        $data['page']='index';
        echo view('default/header',$data);
        echo view('default/navbar');
        echo view('pages/index');
        echo view('default/footer');
        // return view('welcome_message');
    }

    public function platform()
    {
        $data['page']='platform';
        echo view('default/header',$data);
        echo view('default/navbar');
        echo view('pages/platform');
        echo view('default/footer');
    }


    public function aboutUs()
    {
        $data['page']='aboutUs';
        echo view('default/header',$data);
        echo view('default/navbar');
        echo view('pages/aboutUs');
        echo view('default/footer');
    }

    //contactUs
    public function contactUs()
    {
        $data['page']='contactUs';
        echo view('default/header',$data);
        echo view('default/navbar');
        echo view('pages/contactUs');
        echo view('default/footer');
    }

    public function accountType()
    {
        $data['page']='accountType';
        echo view('default/header',$data);
        echo view('default/navbar');
        echo view('pages/accountType');
        echo view('default/footer');
    }

    public function market()
    {
        $data['page']='market';
        echo view('default/header',$data);
        echo view('default/navbar');
        echo view('pages/market');
        echo view('default/footer');
    }

    public function partnership()
    {
        $data['page']='partnership';
        echo view('default/header',$data);
        echo view('default/navbar');
        echo view('pages/partnership');
        echo view('default/footer');
    }

    public function register()
    {
        $data['page']='register';
        echo view('default/header',$data);
        echo view('default/navbar');
        echo view('pages/register');
        echo view('default/footer');
    }

    public function enquiry_message()
    {
     $session = session();
     $email = \Config\Services::email();
     $from = $this->request->getVar('cust_email');
     $name = $this->request->getVar('name');
     $phone = $this->request->getVar('phone');
     $to = 'support@masterecn.net';
     $area = $this->request->getVar('area');
     $city = $this->request->getVar('city');
     $state = $this->request->getVar('state');
     $country = $this->request->getVar('country');
     $comment =$this->request->getVar('comment');

     //send message
         $email->setFrom($from, $name);
         $email->setTo($to);
         $email->setSubject($city);
         $email->setMessage('<table style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-style: initial; text-decoration-color: initial;"
         width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff">
            <tbody>
                <tr>
                    <td valign="top" align="center">
                        <table class="mobile-shell" width="650" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                                <tr>
                                    <td class="td container" style="width: 650px; min-width: 650px; font-size: 0pt; line-height: 0pt; margin: 0px; font-weight: normal; padding: 55px 0px;">
                                        <div style="text-align: center;"><img src="https://masterecn.net/public/assets/Images/Logos/footerLogo1.png" style="margin-bottom: 20px;"></div>
                                        <table style="width: 650px; margin: 0px auto;" cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="padding-bottom: 10px;">
                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0" >
                                                            <tbody>
                                                                <tr>
                                                                    <td class="tbrr p30-15" style="padding-left: 50px;    background-color: #394e93;" >
                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="text-align;margin-top: 50px;padding-bottom: 30px;">
                                                                            <tbody>
                                                                                <tr><td  style="color: rgb(255, 255, 255); font-family: Muli, Arial, sans-serif; font-size: 20px; line-height: 46px; padding-bottom: 25px; font-weight: bold;">Hi '.$name.'</td></tr>
                                                                                <tr style="color: rgb(255, 255, 255); font-family: Muli, Arial, sans-serif; font-size: 20px; line-height: 30px; padding-bottom: 25px;"><td style="width: 10PX;"><b> Email </b></td><td>:</td><td>'.$from.'</td></tr>
                                                                                <tr style="color: rgb(255, 255, 255); font-family: Muli, Arial, sans-serif; font-size: 20px; line-height: 30px; padding-bottom: 25px;"><td style="width: 10PX;"><b> Phone </b></td><td>:</td><td>'.$phone.'</td></tr>
                                                                                <tr style="color: rgb(255, 255, 255); font-family: Muli, Arial, sans-serif; font-size: 20px; line-height: 30px; padding-bottom: 25px;"><td style="width: 10PX;"><b> Area </b></td><td>:</td><td>'.$area.'</td></tr>
                                                                                <tr style="color: rgb(255, 255, 255); font-family: Muli, Arial, sans-serif; font-size: 20px; line-height: 30px; padding-bottom: 25px;"><td style="width: 10PX;"><b> City </b></td><td>:</td><td>'.$city.'</td></tr>
                                                                                <tr style="color: rgb(255, 255, 255); font-family: Muli, Arial, sans-serif; font-size: 20px; line-height: 30px; padding-bottom: 25px;"><td style="width: 10PX;"><b> State </b></td><td>:</td><td>'.$state.'</td></tr>
                                                                                <tr style="color: rgb(255, 255, 255); font-family: Muli, Arial, sans-serif; font-size: 20px; line-height: 30px; padding-bottom: 25px;"><td style="width: 10PX;"><b> Country </b></td><td>:</td><td>'.$country.'</td></tr>
                                                                                <tr style="color: rgb(255, 255, 255); font-family: Muli, Arial, sans-serif; font-size: 20px; line-height: 30px; padding-bottom: 25px;"><td style="width: 10PX;"><b> Comment <b/></td><td>:</td><td>'.$comment.'</td></tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <br/><br/>
                                                            </tbody>
                                                            
                                                        </table>
                                                        <tr><td style="color: #c82d3d; font-family: Muli, Arial, sans-serif; font-size: 18px; line-height: 30px; text-align: center; padding-bottom: 10px;">All Rights Reserved. © Master ECN Limited </td></tr>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>');
        //    print_r($email);

    
          if($email->send())
          {
                echo $action="success";
               session()->setFlashdata('message', 'Message Send Successfully!');
               session()->setFlashdata('alert-class', 'alert-success');
          }
          else
          {
             echo $action="failed";
              session()->setFlashdata('message', 'Message Not Send, Please Check Your Email Id...!!!');
              session()->setFlashdata('alert-class', 'alert-danger');
          }

           return $this->response->redirect(site_url("contactUs"));
    }

}
