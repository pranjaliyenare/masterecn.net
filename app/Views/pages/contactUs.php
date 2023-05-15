
<style>
    @media only screen and (max-width: 1000px) {
	.img1 {
		width: 150px;
  }
     
}

.read_btn{
          background-color: #cd0511;
          color: #fff;
          border-radius: 50px;
          padding: 3px 15px 5px 15px;
          border: 1px solid #fff;
          width: 100px;
          height: 40px;
        }

        .formbold-mb-5 {
    margin-bottom: 20px;
  }
  .formbold-pt-3 {
    padding-top: 12px;
  }
  .formbold-main-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
  }

  .formbold-form-wrapper {
    margin: 0 auto;
    max-width: 550px;
    width: 100%;
    background: white;
  }
  .formbold-form-label {
    display: block;
    font-weight: 500;
    font-size: 16px;
    color: #07074d;
    margin-bottom: 12px;
  }
  .formbold-form-label-2 {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .formbold-form-input {
    width: 100%;
    padding: 12px 24px;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    background: white;
    font-weight: 500;
    font-size: 16px;
    color: #6b7280;
    outline: none;
    resize: none;
  }
  .formbold-form-input:focus {
    border-color: #6a64f1;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }

  .formbold-btn {
    text-align: center;
    font-size: 16px;
    border-radius: 6px;
    padding: 14px 32px;
    border: none;
    font-weight: 600;
    background-color: #6a64f1;
    color: white;
    width: 100%;
    cursor: pointer;
  }
  .formbold-btn:hover {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }

  .formbold--mx-3 {
    margin-left: -12px;
    margin-right: -12px;
  }
  .formbold-px-3 {
    padding-left: 12px;
    padding-right: 12px;
  }
  .flex {
    display: flex;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .w-full {
    width: 100%;
  }
  @media (min-width: 540px) {
    .sm\:w-half {
      width: 50%;
    }
  }


    </style>
 
<div class="modal fade" id="modal_opennew" tabindex="-1" role="dialog" aria-labelledby="modal_label">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <!-- <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="modal_label">Open HFcopy Account</h4>
            </div> -->
            <div class="modal-body text-center">
                <a href="#" target="_blank" class="btn btn-success m-b-20 rounded">Existing Clients</a>
                <a href="#" target="_blank" class="btn btn-danger m-b-20 rounded">New Clients</a>
            </div>
        </div>
    </div>
</div>

        

        
        

        
        

    
        <div class="breadcrumbs">
            <div class="container">
                





<h1 class="pull-left">Platforms</h1>

<ul class="pull-right breadcrumb">
    
    <li class="breadcrumb-item">
        <a href="<?php echo base_url();?>" title="">
            <i style="font-size:16px;" class="fa fa-home"></i>
        </a>
    </li>
    <li class="breadcrumb-item active" aria-current="page">Contact Us</li>
    
</ul>

            </div>
        </div>
    

    

    
    
    
    

<div style="align:center;">
    
        
    
	<img height="340" width="1920" alt="About" src="<?php echo base_url();?>/public/assets/Images/banners/contactUs.jpg" class="img-responsive">

    <div class="container content text-align-center">

        <h2 class="color-red">Contact Us</h2><br/>
        
            <p>If you have any query... <a>Please Contact Us...</a></p>
        
        <br clear="all"/><br clear="all"/>

    </div>



    <div class="formbold-main-wrapper">
  <!-- Author: FormBold Team -->
  <!-- Learn More: https://formbold.com -->
  <div class="formbold-form-wrapper">
    <form action="<?php echo base_url("enquiry_message"); ?>"  method="POST" >

                 <?php 
                    // Display Response
                    if(session()->has('message'))
                    {
                      ?>
                          <div class="alert <?= session()->getFlashdata('alert-class') ?>">
                          <?= session()->getFlashdata('message') ?>
                          </div>
                      <?php
                    }
                  ?>
      <div class="formbold-mb-5">
        <label for="name" class="formbold-form-label"> Full Name </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          class="formbold-form-input" required
        />
      </div>
      <div class="formbold-mb-5">
        <label for="phone" class="formbold-form-label"> Phone Number </label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Enter your phone number"
          class="formbold-form-input" required
        />
      </div>
      <div class="formbold-mb-5">
        <label for="cust_email" class="formbold-form-label"> Email Address </label>
        <input
          type="email"
          name="cust_email"
          id="cust_email"
          placeholder="Enter your email"
          class="formbold-form-input" required
        />
      </div>
     

      <div class="formbold-mb-5 formbold-pt-3">
        <label class="formbold-form-label formbold-form-label-2">
          Address Details
        </label>
        <div class="flex flex-wrap formbold--mx-3">
          <div class="w-full sm:w-half formbold-px-3">
            <div class="formbold-mb-5">
              <input
                type="text"
                name="area"
                id="area"
                placeholder="Enter area"
                class="formbold-form-input" required
              />
            </div>
          </div>
          <div class="w-full sm:w-half formbold-px-3">
            <div class="formbold-mb-5">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Enter city"
                class="formbold-form-input" required
              />
            </div>
          </div>
          <div class="w-full sm:w-half formbold-px-3">
            <div class="formbold-mb-5">
              <input
                type="text"
                name="state"
                id="state"
                placeholder="Enter state"
                class="formbold-form-input" required
              />
            </div>
          </div>
          <div class="w-full sm:w-half formbold-px-3">
            <div class="formbold-mb-5">
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Enter Country"
                class="formbold-form-input" required
              />
            </div>
          </div>
        </div>
      </div>
      <div class="formbold-mb-5">
        <label for="cust_email" class="formbold-form-label"> Comment </label>
        <textarea
          type="text"
          name="comment"
          id="comment"
          placeholder="Say Something....."
          class="formbold-form-input" required
        ></textarea>
      </div>
      <div class="text-center" style="margin-top: 20px;"><button class="read_btn" type="submit">Submit</button></div>
      <!-- <div>
        <button class="read_btn"></button>
      </div> -->
    </form>
  </div>
</div>




</div><br/><br/>
    
   
	<br><br>
	

