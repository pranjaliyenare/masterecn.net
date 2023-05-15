
<style>
    .topmenuBackground
        {
            background: #ffffff;
        }

        .loginbtn{
            color:#CD0511;
            border:1px solid #FFFFFF;
            background-color: #FFFFFF;
        }
        .loginbtn:hover {
            background-color: #111 ;
        }
    </style>
    <body id="hf-app" class="header-fixed  header-fixed-space hfsv body-lang-en  country-in body-hfm is_hfm_brand" dir="ltr">
        
        <!-- Mobile View -->
            <div class="sidebars visibleDown990">
                <div class="sidebar right nav-bar-side">
                    <div class="fullWidth">
                        <p style="color:#FFFFFF;font-size:20px !important;padding:10px 0px 0px 10px;margin-bottom:0px">MENU
                            <button type="button" class="navbar-toggle color-white" style="padding:0px;margin-bottom:0px;display:block;;margin-top:-3px" onclick="$('.sidebar.right').trigger('sidebar:toggle');">
                                <i class="fa  color-white fa-times" style="font-size:18px"></i>
                            </button>
                        </p>
                    </div>
                    <div class="navbar-collapse navbar-responsive-collapse headerNavBar collapse in" aria-expanded="true">
            
                        <div id="menu_place_top-new" class="menu-container menu_website_hf-main menu_place_top-new menu_regulator_hfsv">
                            <ul class="nav navbar-nav ar-reverse">
                                
                                    <li class="dropdown top_menu_li menu_menu_item_home"  >
                                        <a href="<?php echo base_url();?>"
                                        class=" topelementsmenu menu_first_level nameVisibleDown990 <?php if($page == 'index'){echo 'active';}?>"
                                        data-status="live" data-order="100"
                                        target="_top">
                                            <span class="visibleDown990 iconmenu"><i class="icon-line icon-home icon-red"></i></span>
                                            <span class="display_name">Home</span>
                                            <span class="color_text"></span>
                                            <span class="extra_text"><i class="fa fa-home hidden990"></i></span>
                                        </a>
                                    </li>
    
                                    <li class="dropdown top_menu_li menu_menu_item_login">
    
                                        <a href="https://crm.masterecn.net/login" target="_blank" class=" topelementsmenu menu_first_level link_target_blank visibleDown990" data-status="live" data-order="200" target="_blank">
                                            <span class="visibleDown990 iconmenu"><i class="icon-line icon-lock icon-red"></i></span>
                                            <span class="display_name">Login</span>
                                            <span class="color_text"></span>
                                            <span class="extra_text"></span>
                                        </a>
                                    </li>
    
                                    <li class="dropdown top_menu_li menu_menu_item_about"  >
                                        <a href="<?php echo base_url("aboutUs");?>"
                                        class=" topelementsmenu menu_first_level mega-menu not_english_next_ul_right_110 not_english_next_ul_left_100 <?php if($page == 'aboutUs') {echo 'active';}?>"
                                        data-status="live" data-order="300"
                                        target="_top">
                                            <span class="visibleDown990 iconmenu"><i class="icon-line icon-book-open icon-red"></i></span>
                                            <span class="display_name">About</span>
                                            <span class="color_text"></span>
                                            <span class="extra_text"></span>
                                        </a>
                                    </li>
                                
                                    <li class="dropdown top_menu_li menu_menu_item_products">
                                        <a href="#" class="dropdown-toggle topelementsmenu menu_first_level mega-menu not_english_next_ul_right_110 <?php if($page == 'form_index'||$page=='form_demo_acc'||$page=='accountType'||$page=='Business') {echo 'active';}?>" data-status="live" data-order="400" target="_top" data-toggle="dropdown" aria-expanded="false">
                                            <span class="visibleDown990 iconmenu"><i class="icon-line icon-docs icon-red"></i></span>
                                            <span class="display_name">START TRADING</span>
                                            <span class="color_text"></span>
                                            <span class="extra_text"></span>
                                            
                                        </a>
    
                                        <ul class="dropdown-menu rounded-bottom" style="min-width:230px; width:600px;">
                                            <li class="mega-menu-column" href="#">
                                                <div class="mega-menu-content disable-icons">
                                                    <div class="container">
                                                        <div class="row equal-height">
                                                            <div class="col-md-3 equal-height-in">
                                                                <ul class="list-unstyled equal-height-list menu_second_level" data-status="live" data-order="100">
                                                                    <li class=" menu_menu_item_trading_instruments">
                                                                        <a href="https://crm.masterecn.net/login" target="_blank">
                                                                            <span class="titleMenuIs">
                                                                                <span class="display_name">Open Live Account</span>
                                                                                <span class="color_text"></span>
                                                                                <span class="extra_text"></span>
                                                                            </span>
                                                                        </a>
                                                                    </li>
    
                                                                    <li class="menu_third_level   menu_menu_item_forex" data-status="live" data-order="100">
                                                                        <a href="#" target="_top">
                                                                            <span class="display_name">Open Demo Account</span>
                                                                            <span class="color_text"></span>
                                                                            <span class="extra_text"></span>
                                                                            </a>
                                                                        </li>
    
                                                                        
                                                                </ul>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                    </li>
    
                                    <li class="dropdown top_menu_li menu_menu_item_login">
    
                                        <a href="<?php echo base_url("platform");?>" class=" topelementsmenu menu_first_level link_target_blank visibleDown990 <?php if($page == 'platform') {echo 'active';}?>" data-status="live" data-order="200">
                                            <span class="visibleDown990 iconmenu"><i class="icon-line icon-layers icon-red"></i></span>
                                            <span class="display_name ">Platforms</span>
                                            <span class="color_text"></span>
                                            <span class="extra_text"></span>
                                        </a>
                                    </li>
    
                                    <li class="dropdown top_menu_li menu_menu_item_login">
    
                                        <a href="<?php echo base_url("accountType");?>" class=" topelementsmenu menu_first_level link_target_blank visibleDown990 <?php if($page == 'accountType') {echo 'active';}?>" data-status="live" data-order="200">
                                            <span class="visibleDown990 iconmenu"><i class="icon-line icon-briefcase icon-red"></i></span>
                                            <span class="display_name">Account Types</span>
                                            <span class="color_text"></span>
                                            <span class="extra_text"></span>
                                        </a>
                                    </li>
    
                                    <li class="dropdown top_menu_li menu_menu_item_login">
    
                                        <a href="<?php echo base_url("market");?>" class=" topelementsmenu menu_first_level link_target_blank visibleDown990 <?php if($page == 'market') {echo 'active';}?>" data-status="live" data-order="200">
                                            <span class="visibleDown990 iconmenu"><i class="icon-line icon-globe icon-red"></i></span>
                                            <span class="display_name">Market</span>
                                            <span class="color_text"></span>
                                            <span class="extra_text"></span>
                                        </a>
                                    </li>
    
                                    <li class="dropdown top_menu_li menu_menu_item_login">
    
                                        <a href="<?php echo base_url("partnership");?>" class=" topelementsmenu menu_first_level link_target_blank visibleDown990 <?php if($page == 'partnership') {echo 'active';}?>" data-status="live" data-order="200">
                                            <span class="visibleDown990 iconmenu"><i class="icon-line icon-user-follow icon-red"></i></span>
                                            <span class="display_name">Partnership</span>
                                            <span class="color_text"></span>
                                            <span class="extra_text"></span>
                                        </a>
                                    </li>

                                    <li class="dropdown top_menu_li menu_menu_item_login">
    
                                        <a href="<?php echo base_url("contactUs");?>" class=" topelementsmenu menu_first_level link_target_blank visibleDown990 <?php if($page == 'contactUs') {echo 'active';}?>" data-status="live" data-order="200">
                                            <span class="visibleDown990 iconmenu"><i class="icon-line icon-user-follow icon-red"></i></span>
                                            <span class="display_name">Contact Us</span>
                                            <span class="color_text"></span>
                                            <span class="extra_text"></span>
                                        </a>
                                    </li>
    
                            </ul>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
    
    
            
    
    <div class="wrapper">
        <div class="header-v6 header-classic-white header-sticky">
            <div class="navbar mega-menu ar-reverse" role="navigation">
                <div class="topMenuBar">
                    <div class="container">
                        <div class="topbar">
                            <div class="col-md-3 col-sm-4 col-xs-0 hidden750 hideThisTop">
                            </div>
                            <div class="col-md-9 col-sm-8 col-xs-12">
                                <div class="hiddenPlatforms hidden">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="pull-right">
                                                <ul class="list-inline loginbarTop pull-right margin-bottom-0 ar-reverse">
                                                    <li><a href="#"  target="_blank" class="btn-u btn-u-default white-bold">WebTerminal</a></li>
                                                    <li></li>
                                                    <li><a href="javascript:void(0)" class="color-white white-bold" onclick="hidePlatforms()"><i class="fa fa-times font-size-16"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul class="list-inline loginbarTop pull-right">
                                    <li class="hidden750"></li>
                                        <li class="m-l-5 ar-reverse">
                                            <a href="https://crm.masterecn.net/login" target="_blank" class="btn-u btn-color-red-ghost left-float" style="color:#111;" >Login</a>
                                        </li>
                                        <li class="hidden750 hidden990 ar-reverse" style="padding:0px"></li>
                                        <li class="hidden750 ar-reverse">
                                        <li></li>
                                            <li class="hidden750 ar-reverse">
                                                <a class="btn-u btn-u-green white-bold" href="https://crm.masterecn.net/login" target="_blank"  data-gtm-button="Open Live Account Top">
                                                    Open Live Account
                                                </a>
                                            </li>
                                            <li class="hidden750 hidden990"></li>
                                        </li>
                                    <li class="hidden750 hidden990 ar-reverse"  style="padding:0px"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fullWidth topmenuBackground">
                    <div class="container container-space" id="check-width">
                        <div class="menu-container">
                            <button type="button" class="navbar-toggle color-white" id="openrightMenu" data-action="toggle" style="margin-right: 35px;margin-top: 20px;" data-side="right">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar bg-white"></span>
                                <span class="icon-bar bg-white"></span>
                                <span class="icon-bar bg-white"></span>
                            </button>
                            <div class="navbar-brand logoTop ar-reverse ar-p-r-0 logoTop-hotforex">
                                <a href="<?php echo base_url();?>">
                                    <img class="shrink-logo insideLogo img-responsive" src="<?php echo base_url();?>/public/assets/Images/Logos/logo.png" alt="Master ECN">
                                </a>
                            </div>
                             <div class="header-inner-right">
                                <ul class="menu-icons-list">
                                    <li class="menu-icons">
                                        <div class="search-open topSearchOpen">
                                            <div class="container">
                                                <div class="hiddenPlatforms2 hidden">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div style="float:right;">
                                                                <ul class="list-inline loginbar pull-right loginBarHidden">
                                                                    
                                                                    <li><a href="javascript:void(0)" class="color-white" onclick="hidePlatforms2()"><i class="fa fa-times color-white font-size-16"></i></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul class="list-inline  loginbar-hfm  pull-left  ar-reverse">
                                                    <li>
                                                        <a class="logo-link" href="<?php echo base_url();?>">
                                                            <img class="shrink-logo" src="<?php echo base_url();?>/public/assets/Images/Logos/logo.png" alt="Master ECN" width="122px">
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul class="list-inline loginbar pull-right insidelogin">
                                                     <li class="ar-reverse">
                                                        <a href="#" class="btn-u btn-color-red-ghost left-float" style="color:#111;">
                                                           Login
                                                        </a>
                                                        <!-- <a href="#" target="_blank" class="btn-u btn-color-red-ghost left-float" data-gtm-banner="Market analysis"> -->
                                                    </li>
                                                    <li  style="padding:0px"></li>
                                                    <li class="ar-reverse "> 
                                                        <li></li>
                                                            <a class="btn-u btn-u-green white-bold" href="https://crm.masterecn.net/login" target="_blank" data-gtm-button="Open Live Account Top">Open Live Account</a>
                                                        <li></li>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <i class="menu-icons-style search search-close search-btn menu-button fa color-white" style="margin-left:20px;">
                                            <span class="menu-text" style='font-family: "Open Sans",Arial,sans-serif;font-size:13px;font-weight:bold;margin-right:-20px;'>MENU</span>
                                        </i>
                                    </li>
                                </ul>
                            </div>
                            <div class="collapse navbar-collapse navbar-responsive-collapse headerNavBar">
                                <div id="menu_place_top-new" class="menu-container menu_website_hf-main menu_place_top-new menu_regulator_hfsv">
                                    <ul class="nav navbar-nav ar-reverse">
                                        <li class="dropdown top_menu_li menu_menu_item_home"  >
                                            <a href="<?php echo base_url();?>"
                                            class=" topelementsmenu menu_first_level nameVisibleDown990 <?php if($page == 'index') {echo 'active';}?>"
                                            data-status="live" data-order="100"
                                            target="_top">
                                                <span class="visibleDown990 iconmenu"><i class="icon-line icon-home icon-red"></i></span>
                                                <span class="display_name">Home</span>
                                                <span class="color_text"></span>
                                                <span class="extra_text"><i class="fa fa-home hidden990"></i></span>
                                            </a>
                                        </li>
                                        <li class="dropdown top_menu_li menu_menu_item_login"  >
                                            <a href="https://crm.masterecn.net/login"
                                               class=" topelementsmenu menu_first_level link_target_blank visibleDown990"
                                               data-status="live" data-order="200"
                                               target="_blank">
                                                <span class="visibleDown990 iconmenu"><i class="icon-line icon-lock icon-red"></i></span>
                                                <span class="display_name">Login</span>
                                                <span class="color_text"></span>
                                                <span class="extra_text"></span>
                                            </a>
                                        </li>
    
                                        <li class="dropdown top_menu_li menu_menu_item_about"  >
                                            <a href="#"  class=" topelementsmenu menu_first_level mega-menu not_english_next_ul_right_110 not_english_next_ul_left_100<?php if($page=='partnership'||$page=='form_index'||$page=='form_demo_acc'||$page=='accountType') {echo 'active';}?>"
                                               data-status="live" data-order="100"
                                               target="_top">
                                                <span class="visibleDown990 iconmenu"><i class="icon-line icon-docs icon-red"></i></span>
                                                <span class="display_name">START TRADING</span>
                                                <span class="color_text"></span>
                                                <span class="extra_text"></span>
                                            </a>
                                            <ul class="dropdown-menu rounded-bottom" style="min-width:230px; width:600px;">
                                                <li class="mega-menu-column" href="#">
                                                    <div class="mega-menu-content disable-icons">
                                                        <div class="container">
                                                            <div class="row equal-height">
                                                                <div class="col-md-3 equal-height-in">
                                                                    <ul class="list-unstyled equal-height-list menu_second_level" data-status="live" data-order="100">
                                                                        <li class=" menu_menu_item_about_company">
                                                                            <a href="#" target="_top">
                                                                                <span class="titleMenuIs">
                                                                                    <span class="display_name">START TRADING</span>
                                                                                    <span class="color_text"></span>
                                                                                    <span class="extra_text"></span>
                                                                                </span>
                                                                            </a>
                                                                        </li>
    
                                                                        <li class="menu_third_level   menu_menu_item_about_company"data-status="live" data-order="100">
                                                                            <a href="https://crm.masterecn.net/login" target="_blank">
                                                                                <span class="display_name">Open Live Account</span>
                                                                                <span class="color_text"></span>
                                                                                <span class="extra_text"></span>
                                                                            </a>
                                                                        </li>
    
                                                                        <li class="menu_third_level   menu_menu_item_about_company"  data-status="live" data-order="100">
                                                                            <a href="#" target="_top">
                                                                                <span class="display_name">Open Demo Account</span>
                                                                                <span class="color_text"></span>
                                                                                <span class="extra_text"></span>
                                                                            </a>
                                                                        </li>
    
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
    
                            <li class="dropdown top_menu_li menu_menu_item_products"  >
                                <a href="<?php echo base_url("platform");?>"
                                   class=" topelementsmenu menu_first_level mega-menu not_english_next_ul_right_110 <?php if($page == 'platform') {echo 'active';}?>"
                                   data-status="live" data-order="400"
                                   target="_top">
                                    <span class="visibleDown990 iconmenu"><i class="icon-line icon-layers icon-red"></i></span>
                                    <span class="display_name">PLATFORM</span>
                                    <span class="color_text"></span>
                                    <span class="extra_text"></span>
                                </a> 
                            </li>
    
                            <li class="dropdown top_menu_li menu_menu_item_accounts"  >
                                <a href="<?php echo base_url("accountType");?>"
                                   class=" topelementsmenu menu_first_level mega-menu has_whole_row not_english_next_ul_right_110 <?php if($page == 'accountType') {echo 'active';}?>"
                                   data-status="live" data-order="500"
                                   target="_top">
                                   <span class="visibleDown990 iconmenu"><i class="icon-line icon-briefcase icon-red"></i></span>
                                   <span class="display_name">ACCOUNT TYPES</span>
                                   <span class="color_text"></span>
                                   <span class="extra_text"></span>
                                </a>
                            </li>
    
                            <li class="dropdown top_menu_li menu_menu_item_platforms"  >
    
                                 <a href="<?php echo base_url("market");?>"
                                   class=" topelementsmenu menu_first_level mega-menu has_whole_row next_ul_right_10 <?php if($page == 'market') {echo 'active';}?>"
                                   data-status="live" data-order="600"
                                   target="_top">
                                    <span class="visibleDown990 iconmenu"><i class="icon-line icon-globe icon-red"></i></span>
                                    <span class="display_name">MARKET</span>
                                    <span class="color_text"></span>
                                    <span class="extra_text"></span>
                                </a>
                            </li>
    
                            <li class="dropdown top_menu_li menu_menu_item_tools"  >
                                <a href="<?php echo base_url("partnership");?>"
                                   class="topelementsmenu menu_first_level mega-menu next_ul_right_70 <?php if($page == 'partnership') {echo 'active';} ?>"
                                   data-status="live" data-order="700"
                                   target="_top">
                                    <span class="visibleDown990 iconmenu"><i class="icon-line icon-user-follow icon-red"></i></span>
                                    <span class="display_name">PARTNERSHIP</span>
                                    <span class="color_text"></span>
                                    <span class="extra_text"></span>
                                </a>
                            </li>

                            <li class="dropdown top_menu_li menu_menu_item_tools"  >
                                <a href="<?php echo base_url("contactUs");?>"
                                   class="topelementsmenu menu_first_level mega-menu next_ul_right_70 <?php if($page == 'contactUs') {echo 'active';} ?>"
                                   data-status="live" data-order="700"
                                   target="_top">
                                    <span class="visibleDown990 iconmenu"><i class="icon-line icon-user-follow icon-red"></i></span>
                                    <span class="display_name">Contact Us</span>
                                    <span class="color_text"></span>
                                    <span class="extra_text"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    
                
                    
                
            </div>
        </div>
    </div> 
    
     