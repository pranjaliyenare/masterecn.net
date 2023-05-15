/**
Mte HTML 5 player programming.
MTE-Media property 2013.
By Igal Libedinsky
*/

var jsPath='https://s3-eu-west-1.amazonaws.com/data.mte-media.com/mte_service/js/' ;
var jsPath2 = 'https://s3-eu-west-1.amazonaws.com/data.mte-media.com/mte_service/online5/' ;


const queryString = window.location.search;
//console.log(queryString);

const urlParams = new URLSearchParams(queryString);

var flexPlayer2 = urlParams.get('flexplayer')
//console.log(urlParams.getAll('flexplayer').length);

var mtejs=true, mobCss =false, cssAdded = false, once=false,Idx={},widget=false, page_type='idx', noLgl=true, repeatLgl=false, jPlayerPlaylist, data_server, top_offset=0, to, lid_game='forex_en' ;
var debug, hm={}, spinner; //hammer

var menuList = 1;
var menuMode=true, adminMode=false,lgl, popup, obj, user, btns, first=true, userRef, srv, cf=false, cn=false, s3=false,ar=false, mobile=false, full=false, fulls, orient='',viewMode;
var mte_idx, floating, lng, idx_anim;//orientation,
var stage, slide_container, currSlide,currLesson, nextSlide=null, video, RTL,loader, structXml ,plWid=800, plHei=600;
var forceDesktop=false, ios, ie, crm, ff, sf, iosSnd=false, adr, browser, local,lib={};
var slides = new Array(), slideIdx=-1,  slideName="", slideType="", numSlides=0, sld, demo, demoSld, sldStarted, trivSlds=0;
var direction = "next", notabs=false;
var audioPath = "", videoPath, vidPaused=false;
var sndId, sndInst, cues=[], cueIdx, sec, sndOfst, cuesTick, sndDur; // move to mfp player.js
var images=[],infText, lsnInf, lsn;
var images_root, images_loaded=false, prod_root ="tools", prod_type;
var mte_server =  "https://www.mte-media.com";
var adminUrl = mte_server +"/admin2/";
var slick = false;
var phpUrl = adminUrl+ "Classes/Courses.php";
var online =  mte_server + "/online5/" ;//CF = Cloud Front!!
var typeArr = [];//make sure scripts calles only once!
var widgetsList = Array("tecan","tecanh","nlist","ntick","sgnl","cal","calm","day","mon","wee");
var responsive = false, cstLnk, put_course_page=false, flexPlayer=Boolean(urlParams.getAll('flexplayer').length>0);
var tmp_style = false, trivia_points=0, aflt;
flexPlayer=true ; // force!!!
//VOD varz
var vid_player, start_vid=-1, last_vid=false, myPlaylist, tab, plIdx, vidIdx, vid, autoPlay=true ,playlist, origPlaylist, playOne, vidLogo=false;
var eva ;//= new Event('GOT_USER_DATA');//custom js event
//EBK varz
var chapter="1", linkUrl="", linkColor="", custom="", chapters=false;
var msie = detectIE();
var prdsData ={};// big fat data in here

//console.log("UA", ua);

var slidesCue = Array();
var js_arr= [], prdsInf={},courseQue=[], plrInst={},wait4lib=false;
var plrObj, plySet, target_id, player_div='mte_player', userSett, vrz, userObj;

var _gaq = _gaq || [];


function loadtracking() {
        window._gaq.push(['_setAccount', 'UA-39033175-1']);
        window._gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
       // _gaq.push(['_trackPageview', '/test_mte/landingPage']);
}

//jQuery.noConflict();

(function($){

$(function(){

	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P4C2H3D');

	(function(){if(userRef && first){first=false; get_user_dat();}})();

	//loadtracking();// testing without analitics

	//get mte-data serevr.
	$.each( $("script"), function(id,obj){if(obj.src.indexOf("mte-media.com")>-1){data_server= true}})
	if(data_server){
		//alert("data server")
		mte_server="//www.mte-media.com";
		adminUrl = mte_server +"/admin2/";
		phpUrl = adminUrl+ "Classes/Courses.php";
		online =  mte_server + "/online5/" ;//CF = Cloud Front!!
	}


	if(ios){setCookie2("vidLgl","true");}
	$(document).on("GOT_USER_DATA", do_once);

	$(document).on("EXIT_FULLSCREEN", function(){mte_log("exiting");console.log("exitini"); if(ios){close_vid();}} );
	//$(document).on("FULLSCREEN", function(){alert("enetrring")});

	 $(window).resize(function() {

		orient = ($(this).width()>$(this).height()) ? 'land' : 'port';// reversed somehow...
		//if(ios && orient == "port"){alert("Best viewd in Landscape mode!")}
  		mte_log('window size ' + $(this).width() + ", " + $(this).height() + " orientation " + orient );
  		//mte_log(plrInst)

  		var wid, hei ;
		if(mte_idx &! ios){
			wid = $("#learning_center").width();hei = wid * 0.65
  		}else if(ios || mobile){
  			wid = $(window).width() ; hei = $(window).height();
  		}

		if(page_type=="acc"){
  			$("iframe[type=ebk]").width(wid);
			$("iframe[type=ebk]").height(hei);
  		}

  		if(prod_type=='ebk'){
			$("#ebk_player iframe").width(wid);
			$("#ebk_player iframe").height(hei);
			if(ios){  }
  		}
  		if(prod_type=='vid'){
  			if(flexPlayer){
				//plrInst.resize(true)
  				$("#jp_video_0").width('100%');
  				var widFlex = $("#jp_video_0").width()-2;
  				var heiFlex = (widFlex*0.5625)-2 ;
  				$("#jp_video_0").height(heiFlex);
  				$("#jp_container_1").width('100%').height(heiFlex);
  				//$('.jp-video-play').height(heiFlex).css({'margin-top':-heiFlex});
  				//$('.jjp-type-playlist').height(heiFlex);
  				$("#vid_player").width('100%').height(heiFlex);
  				//console.log("flex player ", widFlex, heiFlex);
  			}
  		}

  		if(prod_type=='mfp'&&vrz.player =="embed"){
  			if(flexPlayer){
				vrz.plWid = $('#mfp_player').width();
				vrz.plHei = $('#mfp_player').width()*0.65;
  				if(plrInst.resize){plrInst.resize();}
  				//console.log("pf loaded", vrz.plHei, vrz.plWid);
  			}
  		}
  		//alert(prod_type + " ios " + ios)
  		if(ios || responsive){
  			//if(plrInst.resize){plrInst.resize(true);}
  		}


	});

});


tellAnalytics = function (prd,lng){
	jQuery.ajax({
	  //dataType: 'jsonp',
	  crossDomain: true,
	    method: "GET",
	  data: {action: "anal",ref:userRef,lng:lng, prd:prd}, //set will retrive player settings
	  //jsonp: 'jsonp_callback',
	  url: adminUrl +"actions.php",
	  success: function(data){
	  	//console.log("analytics " + data)
	  }
	});
}


get_user_dat = function (){
	//console.log("get user data ", jQuery);

	first=false;
	userObj={};
	if(!lng){lng="english"}
	jQuery.ajax({
	  dataType: 'jsonp',
	  crossDomain: true,
	  data: {action: "user_dat",ref:userRef, set:true, lng:lng}, //set will retrive player settings
	  jsonp: 'jsonp_callback',
	  url: adminUrl +"actions.php",
	  success: function(data){
	  	//console.log("userObj ", data );
	  	//var arr = data.split(";");
	    usersPath = data['dir']; //"http:" + arr[0];
	    user = usersPath.split("/").pop();//var ban_type = ban_path.split('.').pop();
	    var bannersData = data['bnr'];// arr[1];
	    userSett = JSON.parse(data['set']);// JSON.parse(arr[2]);

	    var length = 0;
		for(var prop in userSett){
		    if(userSett.hasOwnProperty(prop))
		        length++;
		}
		 if(length<1){
	    	alert("No user settings. Please create one at : "+mte_server + "/admin.php?ref="+userRef)
	    }
	    /*if(Object.keys(userSett).length<1){ // not working on IE 9
	    	alert("No user settings. Please create one at : "+server + "/admin.php?ref="+userRef)
	    }*/
	    userObj['path']= usersPath;
	    userObj['bnrs']= bannersData;
	    userObj['name']= user;
	     userObj['type']= data['type'];
	    userObj['crypto']= data['crypto'];
	    userObj['settings']= userSett;
	    userObj['links']= JSON.parse(data['links']);
	    userObj['products']= data['prods'];
	    userObj['aflt']= aflt = data['aflt'];//affiliate
	    userObj['loc']= data['loc'];//affiliate

	    $.event.trigger({type: "GOT_USER_DATA"});


    	if(!msie){//check if is IE
	    	eva = new Event('GOT_USER_DATA');
	    	// Dispatch the event.
			mte_log( "Dispatch eva " , eva);
			document.dispatchEvent(eva);
	   	}else{
	   		 (function () {
		  if ( typeof window.CustomEvent === "function" ) return false; //If not IE

		  function CustomEvent ( event, params ) {
		    params = params || { bubbles: false, cancelable: false, detail: undefined };
		    var evt = document.createEvent( 'GOT_USER_DATA' );
		    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		    return evt;
		   }

		  CustomEvent.prototype = window.Event.prototype;
		  window.CustomEvent = CustomEvent;
		})();
	   	}


	    usrInfReady = true;
	    //console.log("trigering GOT_USER_DATA");

	    if(userRef=="9b4c1e1_"){debug=true; mte_log("debging here");}
	    mte_log("user " + user + " path " + usersPath);
	  }
	});
}

stop_course= function (prd){
	var player_type = prdsInf[prd].type;
	if(player_type=='mfp'){
		plrInst.kilLesson();
	}else if(player_type=='vid'){
		close_vid();
	}
}



put_course = function (obj){
	userRef = obj.ref;
	mte_log("put crs crsque", courseQue , "obj", obj, " plrInst ", plrInst); //mte_log(obj);
	if(!target_id){target_id = obj.target_id;}
	if(obj.language.length==2){
		obj.language = langCode(obj.language);
	}
	if(obj.product=="intr"){lid_game==obj.game;}
	obj.language = obj.language.toLowerCase();
	prd = obj.product;// have one for anycase
	if(obj.playOne || aflt ){playOne=true}

	//console.log("playone" , playOne, aflt)

	/*if(prdsInf[obj.product]){
		play_lsn(obj.startWith, obj.product);
		console.log("playing", obj.startWith)
		return;
	}*/
	var exist = prdsInf[obj.product];

	/*for (var idx in courseQue){
		var prd = courseQue[idx].product;
		if(prd ==obj.product){existInQue=true; }
		//console.log("prd", prd, "new " , obj.product)
	}*/


	if(obj.reset && !exist && !first){
		//courseQue=[]; //once=false; do_once({e:"pp"})
		courseQue.push(obj);
		exist=true;
		prd = obj.product;
		create_prods_obj();
		return
	 }

	if(obj.reset && exist){
		//courseQue=[]; //once=false; do_once({e:"pp"})
		//courseQue.push(obj); //create_prods_obj();
		prdsInf[obj.product]['jtl']= obj.startWith ;
		var player_type = prdsInf[obj.product].type;
		var prdInf = prdsInf[obj.product];

		//console.log("reset prdinf", prdInf, obj.product, player_type );
		if(player_type=='mfp'){
			prod_plr='mfp_plr';
			$("#players").html(plrObj);
			Nav.init();
			setBtnsClr();
			plrInst.Scr.init();
			plrInst.Scr.lsnInit();
			plrInst.Scr.lsnStart();
			plrInst.initLsn();
			plrInst.loadLesson(obj.product,obj.language,obj.startWith);
		}else if(player_type=='vid'){
			prod_plr='vid_plr';
			$("#vid_player_container").html(prdsData.global['vid_plr']).hide();//default
			lsnsProcesed=false;
			//prdsInf[obj.product]['pl']=origPlaylist; //prdsData[obj.product]['structure']
			vid_player_init(obj.product);// also plays
			//play_lsn(obj.statWith, obj.product);
		}
		//to = setTimeout(function(){create_prods_obj();}, 500)
		return;
	}
	courseQue.push(obj);
	if(first){
		first=false; get_user_dat();
	}else{
		//to = setTimeout(create_prods_obj, 500);
		//if(adminMode){to = setTimeout(function(){create_prods_obj();}, 500);}// delay for collecting prods
	}
}


function do_once(e){
	$(document).off("GOT_USER_DATA", do_once);
	//Modules

	if(mte_idx){$.getScript(jsPath+"mte_idx.js", function(){jQuery.event.trigger({type: "MTE_IDX_READY"}); /*console.log("trigered")*/ })}
	if(floating){$.getScript(jsPath+"mte-not.js", function(){jQuery.event.trigger({type: "FLOATING_READY"});})}

	if(once){mte_log("not doing once");return;}
	once= true;
	var uagent = navigator.userAgent.toLowerCase();
	ios = (uagent.search("iphone")>-1 || uagent.search("ipad")>-1) ? true : false;
	adr = (uagent.search("android")>-1 || uagent.search("android")>-1) ? true : false;
	sf = (uagent.search("safari")>-1) ? true : false;
	ie = (uagent.search("msie")>-1 || uagent.indexOf('Trident/') >-1) ? true : false;
	crm = (uagent.search("chrome")>-1 ) ? true : false;
	ff = (uagent.search("firefox")>-1 ) ? true : false;
	win_phone = (uagent.search("Windows Phone")>-1 ) ? true : false;
	if(adr || win_phone){ios=true;};// same behviour for android!
	mte_log("do once vrz"); mte_log(userObj);

	//|| navigator.userAgent.match(/BlackBerry/i)
	//|| navigator.userAgent.match(/Windows Phone/i)

	if(forceDesktop){ios=false;}
	add_css(adminUrl+"style/reg_msg.css");
	/*
	//Calling order is important!
	add_css(adminUrl+"style/mte-player.css");//just for test
	//add_css(adminUrl+"style/menu.css" );
	*/
	//ADD UI
	//js_arr.push("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js");
	js_arr.push("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js");
	add_css("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.css");
	//js_arr.push(server+"/js/jquery-ui.js");
	//add_css(server+"/js/jquery-ui.min.css");
	js_arr.push(jsPath+"fullscreen.js");//fullscreen controller
	//js_arr.push(adminUrl+"js/slick/slick.min.js");

	if(typeof jQuery.fancybox != 'function' && typeof jQuery.fancybox != 'object') {
	//if(typeof jQuery.fancybox != 'function' ) {
		//add_css(adminUrl+"js/fancy/jquery.fancybox.css?v=2.1.5");
		//js_arr.push(adminUrl+"js/fancy/jquery.fancybox.pack.js?v=2.1.5");


		add_css("https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.2/dist/jquery.fancybox.min.css");
		//js_arr.push(adminUrl+"js/fancy/jquery.fancybox.3.5.2.js");//temp test
		js_arr.push("https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.2/dist/jquery.fancybox.min.js?r=1223");

		//add_css(adminUrl+"https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css");
		//js_arr.push("https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js");
		//console.log("loading fancy 3.5.2", typeof jQuery.fancybox)

	}

	//if($("link[href='"+adminUrl+"style/vid_skin.css" +"']").length ==0 ){add_css(adminUrl+"style/vid_skin.css");}

	add_js();
	$(document).on("JS_ADDED", create_prods_obj);

}

	create_prods_obj = function (){
		mte_log("courseQue " ,courseQue ," prdinf len ", prdsInf); mte_log(courseQue);
		if(courseQue.length==0 ){/*to = setTimeout(create_prods_obj, 500)*/; return;}
		clearTimeout(to);
		$(document).off("JS_ADDED", create_prods_obj);//important!
		var lngs=[], prds=[];
		//mte_log("prods obj")
		$.each(courseQue,function(key, obj){
			if(obj.product=='dem'){return true;}
			vrz = userSett[obj.settings];//get_plr_settings(obj.settings);
			if(!vrz){vrz = userSett['Default'];}
			if(!vrz){alert("Settings dosen't exist "+ obj.settings);return}
			if(ios){vrz.mobile=true;}
			if(vrz.mobile){mobile =true;}
			//collect for getting the data
			if(lngs.indexOf(obj.language)==-1){lngs.push(obj.language);}
			if(prds.indexOf(obj.product)==-1){prds.push({prd:obj.product, demo:obj.demo,lsns:obj.lsns})}

			//prepare the prdsInf obj
			prd = obj.product;
			lng = obj.language;
			prdsInf[prd]={};
			//prdsInf[prd]['loaded']= Array();
			prdsInf[prd]['target_id']= obj.target_id;
			prdsInf[prd]['lng']= obj.language;
			prdsInf[prd]['jtl']= obj.startWith ? obj.startWith : 0;
			prdsInf[prd]['slides']={};// keep the slides
			prdsInf[prd]['structure']="";// keep the slides
			prdsInf[prd]['root']="";
			prdsInf[prd]['lsnsNum']="";
			prdsInf[prd]['lsns']= obj.lsns ? obj.lsns.split(",") : false;
			prdsInf[prd]['demo']= obj.demo ? obj.demo.split(",") : false;
			prdsInf[prd]['loc']={};
			prdsInf[prd]['settings']=vrz;
			if(prd=="intr" || prd=='quz'){
				prdsInf[prd]['game']=obj.game;
				//prdsInf[prd]['qmode']=obj.qmode;
			}
			/*if(prd=="cal" || prd=="calm"){
				prdsInf[prd]['calFrame'] = obj.calFrame ;
				prdsInf[prd]['calMobile'] = obj.calMobile;
				prdsInf[prd]['calLight'] = obj.calLight;
				prdsInf[prd]['calIcns'] = obj.icns;
			}*/
		});

		//slick = vrz.style.indexOf('slick') >-1 ;

		if(mobile &! adminMode){
			//if(! $.mobile && ios){
			if(ios){
				$.getScript(jsPath + "hammer.min.js", function(){
					$.getScript(jsPath + "jquery.hammer.min.js");
				});
			}else{
				$.getScript(jsPath + "tap.min.js");
			}
		}
		get_data(prds,lngs);//after got data we add menu
	}


	function get_data(prds, lngs){

		mte_log("prds demo " , prds, prds[0].demo);
		var data = {action: "data",ref:userRef, prods:prds, langs:lngs, lng:lng, demo:prds[0].demo, lsns:prds[0].lsns};
		if(prds[0].demo){data.demo= prds[0].demo;}
		if(vidLogo){data.vidLogo= true}

			//console.log("data demo", prds)

		//cn = false;
		if(cf){data.cf=true;online = "//datcf.mte-media.com/online/" ;}
		if(cn){data.cn=true;online = "https://video-hks.oss-cn-hongkong.aliyuncs.com/online5/" ; } // new abeles China server//video-hks.fincdn.com/online5/
		if(s3){data.s3=true;online = "//s3-eu-west-1.amazonaws.com/data.mte-media.com/online/" ;}

		jQuery.ajax({
		  dataType: 'jsonp',
		  crossDomain: true,
		  data: data, //set will retrive player settings
		  jsonp: 'jsonp_callback',
		  url: phpUrl,
		  success : function(data){
		   	//console.log("all data", data);
		  	prdsData = data;

		  	if(!msie){//check if is IE
	    	//eva = new Event('GOT_USER_DATA');
		    	var evt = new Event('PRODUCTS_DATA');
				// Dispatch the event.
				mte_log( "Dispatch eva prds data " , evt);
				document.dispatchEvent(evt);
	   		}else{
	   			//alert("IE!!!")
	   		}

			fill_data(data);
		  }
		});
	}

	function fill_data(data){
		var vrz, product, isWidget;
		$("#mfp_player").hide();
		//console.log("filldata ", data);

		$.each(courseQue, function(idx, obj){
			product = prd= obj.product;
			if(prd == "intr" && ios){ return true;}
			if(!data[product]){alert("User dont have "+ product +". \r\n Please Contact admin.");return true;}// true should work like Continue...
			vrz = prdsInf[product]['settings'];
			if(widgetsList.indexOf(prd)> -1){isWidget=true;}else{isWidget=false}
			if(vrz.mobile){vrz.player='embed';mobile=true;}

			//prodsinf
			if(!isWidget){
				prdsInf[product]['root']= prod_root = data[product]['prods_info']["root"];
				if(product=='tlsr' ){
					prdsInf[product]['root']= 'tools';
				}else if(product=='prer'){
					prdsInf[product]['root']= prod_root ='pre';
				}else if(product=='stg5r'){
					prdsInf[product]['root']= prod_root ='stg5';
				}else if(product=='vidr'){
					prdsInf[product]['root']= prod_root ='vid';
				}else if(product=='binr'){
					prdsInf[product]['root']= prod_root ='binary';
				}else if(product=='cfdr'){
					prdsInf[product]['root']= prod_root ='cfd';
				}
				prdsInf[product]['type'] = prod_type = data[product]['prods_info']['player_type'];
				prdsInf[prd]['lsnsNum']=parseInt(data[product]['prods_info']["num_of_lsns"]);
			}else{
				prdsInf[product]['type'] = prod_type = "widg";
			}
			prdsInf[product]['pl']= data[product]['structure'];
			//loc
			if(data[product]['loc'].length==0){alert("no localization for " +product + " " +  lng)}
			prdsInf[product]['loc']=data[product]['loc'];

		 	//target_id = obj.target_id.indexOf("#")==0 ? $(obj.target_id ) : $("#" + obj.target_id);
		 	target_id = $("#" + obj.target_id);
		  	target_id.hide();
		  	if(prod_type == "ebk"){//&& vrz.player=="embed" !ebk
		 		if(page_type=="slf"){vrz.fullwindow = true;}
		  		if(page_type=="acc"){embed_ebk("#acc_"+product);}else{embed_ebk("#ebk_player");}
		  	}else{
		  		if(vrz.menu=="external" || vrz.custom_css){
		  			//if(prod_type != "ebk"){
		  				target_id.html(unescape(data[product]['menu']));//add menu
		  				if(slick){// if vrz.style name contains slick
		  					$('ul.btns').hide();
		  					setTimeout(function(){ $('ul.btns').show();$('ul.btns').slick({
		  						slidesToShow: 3,slidesToScroll: 1,  arrows: true, dots: true,
		  						responsive: [
									    {
									      breakpoint: 1024,
									      settings: {
									        slidesToShow: 3,
									        slidesToScroll: 3,
									        infinite: true,
									        dots: true
									      }
									    },
									    {
									      breakpoint: 600,
									      settings: {
									        slidesToShow: 2,
									        slidesToScroll: 2
									      }
									    },
									    {
									      breakpoint: 480,
									      settings: {
									        slidesToShow: 1,
									        slidesToScroll: 1
									      }
									    }
									    // You can unslick at a given breakpoint now by adding:
									    // settings: "unslick"
									    // instead of a settings object
									  ]
		  						}
		  						);}, 500)
		  				}
		  			//}
		  			//if(vrz.use_tmp_clrs && vrz.menu!="custom"){colorize_menu(target_id, vrz);}
		  			if(vrz.menu!="custom"){colorize_menu(target_id, vrz);}
		  			//mte_log(product + " added. to "+ obj.target_id);
		  			if(notabs && $("#inner_tabs").length>0){
		  				jQuery("#inner_tabs .tabs").hide();
		  			}else if(page_type!="widg" && $("#inner_tabs").length>0){
		  				jQuery("#inner_tabs").tabs({activate: function( event, ui ) {if(slick){ $('ul.btns').slick('setPosition', 0);} }});
		  				jQuery("#inner_tabs .ui-widget-header").css({"background":"grey", "border":"1px solid #333"});
		  			}// dont put tabs in widget?
		  			if(page_type=="widg" && $("#inner_tabs").length>0){
		  				jQuery("#inner_tabs .tabs li").css({"display":"inline-block","padding":"5px","margin-left":"10px", "background":"grey",
		  				"cursor":"pointer","box-shadow": "4px 4px 5px #aaa"});
		  				jQuery("#inner_tabs .tabs li a").css({"text-decoration": "none", "color":"white"})
		  			}
		  		}
		  	}

			if(mte_idx){$('.topnav .crs').text(prdsInf[prd].loc.crs_name); }

		  	target_id.show('slow')

				$("#"+product+" .btns li").click(function(){
					var root = $(this).closest(".vid_container");
					var id = $(this).attr("lsn");
					if(!id){
						id = $(this).attr("id");
					}
					lsn = id.substr(3,id.length);
					prd = root.attr("id");
					lng = root.attr("lang");
					prod_type= root.attr("type");
					//var tabIdx = widget ? 0 : $("#"+prd+" #inner_tabs").tabs('option', 'active');
					if(prdsInf[prd]['type']=="vid"){
						tab=$(this).closest("ul").attr("id");
						if(repeatLgl && !ios){pop_msg();return}
						if(!checkLgl() && !noLgl){pop_msg();return;}else{play_vid_id(prd, lsn);}
					}else{
						if(repeatLgl && !ios){;put_legal();plrInst.kilLesson();}else{play_lsn(lsn)}
					}
					//console.log("adding click rull", root, lsn, prd, prod_type)
				}); // by object
			//}

			$(".ebk_container").click(function(){
				var root = $(this).closest(".ebk_container");
				prd = root.attr("id");
				lng = root.attr("lang");
				play_lsn();
			})

			if(prod_type=="mfp"){//load imgs
				//$.getScript(online +prod_root+"/images_"+product+".js");
				var imgPath = jsPath2 +prod_root+"/images_"+product+".js?r=uythj756730";
				$.getScript(imgPath, function(){images_loaded=true;});
			}

			if(prod_type=="widg"){
				put_cal(prdsInf[prd].settings.set_name);
			}

			if(typeArr.indexOf(prod_type)==-1){
				get_scripts(prod_type,product);//& player?
				mte_log("calling script for "+ prod_type)
			}

		});//end each
		// now add css
		if(vrz.custom_css){vrz.menu ="cst_css" }

		switch(vrz.menu){
				case "external":
					if(!cssAdded){
						add_css(mte_server +'/templates/styles/' + vrz.style + '.css', "template");
						//add_css(adminUrl +"js/slick/slick.css");
						//add_css(adminUrl +"js/slick/slick-theme.css");
						cssAdded=true;
					}// 2cd param is ID
				break;
				case "cst_css":
					if(!cssAdded){
						add_css(vrz.custom_css, "template");
						//cssAdded=true;
					}
				break;
			}
	}


	get_scripts=function(prod_type,product){

		//var createjsPath = "https://code.createjs.com/1.0.0/createjs.min.js";//'//code.createjs.com/createjs-2014.12.12.min.js'
		var createjsPath = jsPath +"createjs.min.js";//'//code.createjs.com/createjs-2014.12.12.min.js'
		var movieClipPath = jsPath +"easeljs.min.js";  //'//code.createjs.com/movieclip-0.8.0.min.js'
		//var movieClipPath = "https://code.createjs.com/1.0.0/easeljs.min.js";  //'//code.createjs.com/movieclip-0.8.0.min.js'
		var mfp_plr = jsPath + "mfp_player.js";
		//console.log("calling mfp")

		//only once!
		//if(typeArr.indexOf(prod_type)>-1){return;}
		switch(prod_type){
			case "mfp":
			//if(prdsInf[prd].type=='mfp'){return;}}
				$.getScript(createjsPath,function( data, textStatus, jqxhr ) {
				//$.getScript('https://code.createjs.com/createjs-2015.11.26.min.js',function( data, textStatus, jqxhr ) {
					mte_log("createjs loaded");

					$.getScript( mfp_plr, function(data, textStatus, jqxhr){
							//console.log("mfp player script loaded ", adminUrl + mfp_plr);
							put_mfp_player(prod_type, "mfp_player");//kind of default
							plrObj.cn = cn;
							plrInst = new Plr(plrObj);
							plrInst.first_init();

							if(vrz.player==='embed'&&flexPlayer){
								vrz.plWid= $('#mfp_player').width();//make it responsive - 2021
								console.log("loaded2", $('#mfp_player').width() , vrz.plWid)
							}
							//console.log("loaded 2", $('#mfp_player').width() , vrz.plWid)
						});
				});
			break;

			case "vid":
				//if(prdsInf[prd].type=='vid'){return;}}

				//console.log('jp', typeof jPlayer )
				$("#vid_player_container").html(prdsData.global[prod_type+'_plr']).hide();//default
				$.getScript(jsPath+"jquery.jplayer.js", function(){
					//console.log("jplayer loaded");
					$.getScript(jsPath+"jplayer.playlist.js", function(){
						//console.log("playlist loaded");
					$.event.trigger({type: "VID_PLAYER_READY", message: "",time: new Date()});// added for
						if(prdsInf[product].settings.player=="embed" /*&& !mte_idx*/){
							//console.log(" VID_PLAYER_READY");
							vid_player_init(product);//only first video product will init

							/*if(vrz.player==='embed'&&flexPlayer){
								//vrz.plWid= $('#vid_player_container').width();//make it responsive - 2021
								//$("#vid_player").width('100%'); //.height(heiFlex);
								console.log("loaded 2", $('#vid_player_container').width() , vrz.plWid)
							}*/
						}
						/*if(widget && prdsInf[product].settings.player=="embed" ){
							vid_player_init(product);
						}*/
					});
				});
			break;

			case "ebk":	break;//???

			case "cal":
			case "calm":
				//setTimeout(function(){put_cal(prdsInf[prd].settings.set_name)},1000); // put once
			break;

			case "inter":
			if(!ios){}
			break;
		}
		typeArr.push(prod_type);
		//fix for the jquery mobile back painting
		/*if(mobile){
			//$("iframe").contents().find(".ui-page").css({ "background":"#2b2e31" })
			$(".ui-page").css({ "background":"#2b2e31" });
		}*/
	}

	//only MFP player actualy
	put_mfp_player=function(prod_type, player_div){
		player = prdsData.global[prod_type+'_plr'];//the HTML
		if(noLgl){setCookie2("vidLgl","true")}
		plrObj = $("#"+player_div).hide();

		if(ios){
			hm = new Hammer(plrObj[0]);
		}
		if(plrObj[0]!=undefined){//if we hv a player div
			$("#"+player_div).html(player);
			plrObj = $("#"+player_div);//+ply_div
		}else{//push it before the menu
			target_id.before("<div id='mte_player'>"+player+"</div>");
			plrObj = $("#mte_player");//+ply_div
		}
		/*
		if(mobile || vrz.fullwindow && prod_type=="mfp"){
			//plrObj.css({"width":"100%", "height":"100%", "overflow":"hidden", "margin": "0 auto"}).hide();
			//plrObj.find("#lesson").on("tap",plrInst.toggleBars);
			//if(ios &! vrz.players=="embed" ){hm.on("tap",toggleBars);}
		}else if(prod_type=="mfp"){
			//plHei =  plWid * 0.625+ 35+60 ;
		}*/

		$.event.trigger({type: "PLAYER_READY", message: "",time: new Date()});
		parent.postMessage("PLAYER_READY","*");
		//vrz.plWid= 450;
	}




	//function for external links use plays by lsn idx - first = 1
	play_lsn = function(lsn, prod){
		if(prod){prd=prod;}
		if(!lsn){lsn=1;}
		//console.log("prd", prod)

		tellAnalytics(prd, lng);

		//_gaq.push(['_trackPageview', '/play_course/user:'+userObj.name+"/course:"+prd+"/language:"+lng]);
		vrz = prdsInf[prd]['settings'];
		if(mobile){prdsInf[prd]['settings']['player']="embed";}

		switch(prdsInf[prd].type){
			case "mfp":

			if(vrz.use_mfp_css){
				add_css(vrz.mfp_css);
			}/*else{
				//Calling order is important!
				if($("link[href='"+adminUrl+"style/mte-player.css" +"']").length == 0){
					add_css(adminUrl + "style/mte-player.css");//just for test // change back to admiurl +  "/style/mte-player.css"
				}
				if(mobile &! adminMode &! mobCss){add_css(adminUrl + "style/mobile.css");mobCss=true;}
				//add_css(adminUrl+"style/menu.css" );
			}*/

			else if(mobile && plrObj.length>0){ // && ios && full
				plrObj.removeClass("mfp-full");
				plrObj.addClass("mfp-full");// keep only one
				$(".mfp-full").css("background", vrz.bg_from);
			}
			if(plrInst.loadLesson){
				plrInst.loadLesson(prd,lng,lsn);
			}

			//console.log("here", plrInst)
			break;

			case "vid":
				play_vid_idx(lsn, prd);//indx starts with 0, user sends 1
			break;

			case "ebk":
				var wid = $(window).width()-110;
				var hei = $(window).height()-110;
				//hei = wid * 0.56;
				var dem = "", link="";
				if(prdsInf[prd].demo){
					var maxPage = String(prdsInf[prd].demo).substr(1);
					if(prdsInf[prd].demo<0){maxPage=5}
					dem = "&d="+maxPage;
					link = "&linkUrl="+ encodeURIComponent(userObj.links.open_account_url);
				}
				//var path = adminUrl+"frames/ebk_player.php?ref=" +userRef +"&prd="+prd+"&lng="+lng + "&set="+vrz.set_name +dem+link+"&wid="+wid+"&hei="+hei;
				var path = adminUrl+"frames/put_course.php?ref=" +userRef +"&prd="+prd+"&lng="+lng + "&set="+vrz.set_name +dem+link+"&wid="+wid+"&hei="+hei;
				var bookObj = $(path);				//if(prdsInf[prd]['settings']['player']=="pop"){
					$.fancybox.open(bookObj, { padding : 0, type:"iframe", width:wid, height:hei ,afterClose:function(){if(adminMode){$("#ebk_player").show()}}});
				//}
				/*else{
					$("#ebk_player").html("<iframe frameborder=0 width= "+plWid +" height="+plHei+ " src="+path+"/>");
				}*/
			break;

			case "inter":
				//if(!ios){;}// dosen't work on ios devices
			break;
		}
	}

	function put_cal(calSet){
		var tgt = prdsInf[prd].target_id.length >0 ? prdsInf[prd].target_id : "cal";
		if($("#"+tgt).height() <300){$("#"+tgt).height(550)}
		var wid = $("#"+tgt).height() >300 ? "100%" : "800px" ;//parseInt(prdsInf[prd]['settings']['plWid']);
		var hei = $("#"+tgt).height() >100 ? $("#"+tgt).height()+"px" : " 450px" ; //"auto";//wid * 0.625;
		//alert(hei)
		setTimeout(function(){hei = $("#"+tgt).height()+"px"},1000)
		//prd='cal';// always??
		//RTL = (language == "hebrew" || language =="arabic") ? true : false;
		//iframe mode
		var calFrame = adminMode ? "true" : prdsInf[prd]['calFrame']==undefined , light = prdsInf[prd]['calLight'], calMobile = prdsInf[prd]['calMobile']=="true", html="";
		var cstm_icns = prdsInf[prd]['calIcns'] ? "&icns=true" : "" ;
		mte_log("put cal " + prd);mte_log(prdsInf[prd])
		var dem = prdsInf[prd]['demo']=="true" ? "1" : prdsInf[prd]['demo'];

		calLogo = prdsInf[prd]['calLogo'] ? "" : "&nologo";
		if(prd=="cal" && prdsInf[prd]['calMobile']=="true"){prd="calm";}
		//cal = prdsInf[prd]['calMobile']=="true" ? "calm" : "cal";
		//var path = adminUrl+"frames/cal_frame.php?ref="+userRef +"&set="+calSet+ "&usr="+user+"&mob="+calMobile + calLogo+cstm_icns;
		var path = adminUrl+"frames/widgets_index.php?ref="+userRef +"&set="+calSet+ "&usr="+user+"&widg="+prd + calLogo+cstm_icns + "&demo="+dem;
		if(lng.length>2){lng = langCode(lng)}
		var lngc="";
		if(lng=="gb" || lng=="au"){ lngc="en"; }
		path += "&lng="+lngc;//alert(lng)
		path +="&tgt=" + userObj.links.start_trade;

		setTimeout(function(){
			hei = ($("#"+tgt).height() ==0) ? "550px" : $("#"+tgt).height()+"px" ;
			$("#"+tgt).html("<iframe allowtransparency allowfullscreen frameborder=0 width= "+wid +" height="+hei+ " src="+path+"/>").show();
		},1000)
	}

	embed_ebk=function(tgt){// embedded ebk
		_gaq.push(['_trackPageview', '/play_course/user:'+userObj.name+"/course:"+prd+"/language:"+lng]);
		vrz = prdsInf[prd]['settings'];
		//alert(vrz.fullwindow )
		if(!tgt){tgt="#ebk_player";}
		//alert(tgt)
		if(lng.length==2){lng = langCode(lng);}
		//var path = adminUrl+"frames/ebk_player.php?ref=" +userRef +"&prd="+prd+"&lng="+lng;
		var path = adminUrl+"frames/put_course.php?ref=" +userRef +"&prd="+prd+"&lng="+lng;
		path += "&set="+ prdsInf[prd].settings.set_name;
		path += "&hmUrl="+ encodeURIComponent(location.href);
		path += "&linkUrl="+ encodeURIComponent(userObj.links.open_account_url);
		if(chapters){path += "&c="+chapter;}
		//if(cn){path+="&cn=true";}
		if(prdsInf[prd]['demo']){
			var demoArr = prdsInf[prd]['demo'];
			//if it's negative value, put default max page
			var maxPage = (demoArr<0) ? 6 : demoArr[demoArr.length-1].substr(-1)
			//path+="&d="+maxPage;
			path+="&demo="+maxPage;
		}
		var wid = mobile || vrz.fullwindow ? $(window).width() :  parseInt(prdsInf[prd]['settings']['plWid']);//$(window).width()-20 ;
		if(mte_idx && !mobile){wid = $("#learning_center").width();}
		var hei = mobile || vrz.fullwindow ? $(window).height() : wid * 0.7;
		if(widget){hei = $("#learning_center").height();}
		path += "&wid="+ wid +"&hei="+hei;
		if(cn){path += "&cn"; }

		if(page_type=="slf"){wid= $(window).width()}
		//TODO remove fullscreen btn
		//if(prdsInf[prd]['settings']['player']=="embed" || adminMode){
			$(tgt).html("<iframe type='ebk' mozallowfullscreen webkitallowfullscreen allowfullscreen allowtransparency frameborder=0 width='"+wid+"' height='"+hei+"' src='"+path+"' />").show();
			if(mobile && prdsInf[prd].settings.btnHome){
				ebk_home_btn();
				$("#ebk_player").css({"z-index":"1000", "position":"fixed","top":0, "left":0})
			}
			$("#ebk_player iframe").width(wid);
 			$("#ebk_player iframe").height(hei);
		//}
	}

	ebk_home_btn= function(){

		if(ios){
			$("#ebk_player").append("<div id='closeEbk'><img width='35' src='"+mte_server+"/images/mte-player/contour/home.png' /></div>");
			$('#closeEbk').css({"z-index":"10002", "cursor":"pointer", "position":"fixed", "bottom":"7px","left":"55px"}).click(
				function(){$("#main_menu").show(); $("#ebk_player").css({'z-index':'0'}).empty();
			});
			return;
		}
		if(!mte_idx){return;}
		$("#ebk_player").append("<div id='closeEbk'><img width='35' src='"+mte_server+"/images/mte-player/contour/home.png' /></div>");
		$('#closeEbk').css({"z-index":"10002", "cursor":"pointer", "position":"fixed", "top":"10px","left":"30px"}).click(function(){
			mte_log("book go home");if(mte_idx && Idx ){Idx.home();}else{alert("no home function")}
		});
		//$('#closeEbk').tap(function(){if(mte_idx && Idx ){Idx.home();}else{alert("no home function")}});
	}
	add_js = function(path){
		//js_arr.push(path);
		if(path){
			$.getScript( path, function( data, textStatus, jqxhr ) {}); return;
		}
		$.each(js_arr, function(crsIdx, path){
			$.getScript( path, function( data, textStatus, jqxhr ) {
				js_arr.pop();
				mte_log( path + " Loaded. js to go: " +js_arr.length );
				if(js_arr.length == 0){	$.event.trigger({type: "JS_ADDED", message: "",time: new Date()});
				}
			});
		});
	}

	add_css = function(path, id){
		if($("link[href='"+path +"']").length !== 0){mte_log('not loading css : '+  path);return;}
		mte_log("adding css: " + path)
		var headID = document.getElementsByTagName("head")[0];
		var cssNode = document.createElement('link');
		cssNode.type = 'text/css';
		if(id){cssNode.id = id; $("#"+id).remove();}
		cssNode.rel = 'stylesheet';
		cssNode.href = path;
		cssNode.media = 'screen';
		headID.appendChild(cssNode);

		if(id=="template"){
			mte_log("template style added");
			tmp_style = true;
		}
	}

	checkLgl = function(){return true /*getCookie("vidLgl")=="true" || ios ;*/ }

	put_legal = function(){
		mte_log("noLgl " + noLgl);
		if(spinner){spinner.stop();}
		RTL = (lng=="hebrew" || lng=="arabic") ? true : false;

		//if(noLgl){plrInst.startLesson(); return;}
		if(noLgl || mobile){if(prod_type=="mfp"){setCookie2("vidLgl","true");startLesson()}; return;}
		var data = prdsData.global.legal;
		var fntsz = "10pt";
		//if(lng=="russian"){fntsz = "9pt";}
		plrObj.find('#msg').css({"font-size":fntsz}); //, height:"80%"
		$(".ldr").hide();
		var agree = data.legAgree;
		var decline = data.legNotAgree;
		plrObj.find('#msg').html(nl2br(data.legal));

		if(data.inf){plrObj.find('#msg').append(nl2br("<br><div style='font-size:8pt;'>"+data.inf+"</div>"));}//24opt add!!!
		if(userRef=="2967923"){plrObj.find('#msg').css({"background":"#333", "color":"white"})}
		plrObj.find('#msg').append("<br><button class='btn agree' >"+agree+"</button>");
		//plrObj.find('#msg').append("<button class='btn decline' >"+decline+"</button>");
		//plrObj.find('#msg').css({"width":"800px"})
		plrInst.Scr.msg();
		$(".agree").click(function(){
			setCookie2("vidLgl","true",null);
			if(repeatLgl){play_lsn(lsn);plrInst.Scr.closeLegal()}else{plrInst.Scr.closeLegal();}
		});
		if(RTL){plrObj.find('#msg').css({"text-align":"right", "direction":"RTL"})}
		//$(".decline").click(function(){$.fancybox.close();/*$("#lgl").remove()*/;})
		//$(".decline").click(function(){})
	}


	colorize_menu = function(menu, set){
		if(vrz.custom_css){return;}
		//TODO store the original colors for reverting ?
		//var o_tit = menu.find(".vid_container .lsn_tit").css("color"); // somthing like that
		//mte_log("colorizing crs menu " + set);mte_log(menu)
		//menu.find(".vid_container .lsn_tit").css("color",set['tmp_tit']);
		menu.find(".vid_container .lsn_tit").css({"border-bottom": " 1px solid "+set['tmp_tit'], "color":set['tmp_tit'] });
		menu.find(".vid_container .lsn_tit").css("background",set['tmp_tit_back']);
		menu.find(".vid_container .lsn_inf").css("color",set['tmp_info']);
		menu.find(".vid_container ul.btns li").css("background",set['tmp_back']);
		menu.find(".vid_container .ply_icn").css({"background-color": set['tmp_ply_icn'] });
		menu.find(".vid_container .ply_icn").css({"background-image": " url("+mte_server+"/images/player2.png) no-repeat center"});
		menu.find(".vid_container .play_gr").css({"background-color": set['tmp_ply_gr'] });
	}


showDemoMsg = function(){

	//kilLesson();
	//$('#reg_msg').html(contact_message);//+"<button>"+agree+"</button>"+"<button>"+notagre+"</button>"
	var msg , div;
	$.event.trigger({type: "LOCKED_PRESSED", message: "",time: new Date()});
	parent.postMessage("LOCKED_PRESSED","*");
			//console.log("msg",plrObj.find("#msg").height())

	//if(ios){close_vid();}
	//if($("#reg_message").length >0){
	if($("#reg_message").length>0){
		//use this content
		var html1 = $("#reg_message").html();
		msg = "<div id='reg_msg2'  >" + html1 +"</div>";
		if(msg.length==0){return;}
		//div= "#reg_message";
		div= jQuery("#reg_msg2");
	}else{
		//create default message
		msg = "<div id='reg_msg2'  >";
		msg += "<img src='" + usersPath + "/logo.png' />";
		msg += "<br><h2>" + prdsInf[prd].loc.title+"</h2>";
		msg += "<h4>"+prdsInf[prd].loc.body+"</h4>";
		msg += "<div class='reg_btn' style='line-height: 14pt' >"+prdsInf[prd].loc.btn1+"</div>";
		msg += "</div>";
		div= jQuery("#reg_msg2");
	}

	switch(prod_type){
		case "mfp":
			if(vrz.menu=="external"){Menu.go();}
			if(vrz.menu=="pop" || vrz.menu=="internal"){Menu.go();}
			plrObj.find("#msg").html(msg);
			var lWid = plrObj.find("#msg img").width();
			var lHei = plrObj.find("#msg img").height();
			//plrObj.find("#msg").css({"height":"90%"})
			if(vrz.player=="pop" || vrz.autohide || mobile){
				div=jQuery("#reg_msg2"); // fix first click
				jQuery.fancybox.open(div, {padding:0, type:"inline"});if(fulls){plrInst.resize(false);}
			}
			plrInst.Scr.msg();

		break;

		case "vid":

			if(ios){
			vid_player.jPlayer("clearMedia");$("#vid_player_container").hide(); $("#"+prdsInf[prd].target_id).show();
			if(fulls){vid_player.jPlayer({fullWindow:false});toggleFullscreen(document.querySelector('#vid_player'))}

			}
			//if(fulls){toggleFullscreen(document.querySelector('#vid_player'))}
			//$("#jp_poster_0").hide();

			if(vrz.player=="pop" || vrz.autohide || mobile){$(".jp-video-play").hide();$("#vid_player_container").hide(); }
			vid_player.jPlayer("clearMedia");
			if(mte_idx && mobile){Idx.home();}
			$.fancybox.open(msg, {padding:3, type:"inline"})
		break;
	}

	//TODO put scroll to player in embed mode
	_gaq.push(['_trackEvent', "demo_opened", '/user:'+userObj.name+"/course:"+prd+"/language/"+lng]);


	var url= userObj.links.open_account_url;
	if(cstLnk){url = cstLnk; }//custom link - aflt
	$("#reg_msg2 .reg_btn").click(function(){
		_gaq.push(['_trackEvent', 'demo_clicked', 'url: ' + url+ '/user:'+userObj.name+"/course:"+prd+"/language/"+lng]);
		window.open(url , '_parent');

		$.event.trigger({type: "REGISTER_CLICKED", message: "",time: new Date()});
		parent.postMessage("REGISTER_CLICKED","*");

	});

	//color it
	$("#reg_msg2").css({"padding":"2vw", "text-align":"center", "background":"white" });
	$("#reg_msg2 .reg_btn").css({"margin": "0 auto", "cursor":"pointer","width": "250px",  "background": vrz.tmp_tit_back, "color":vrz.tmp_tit, "padding":"15px", "border": "1px solid grey"});
	$("#reg_msg2 .reg_btn").hover(function(){$(this).css({"background": "grey", "color":"white"});}, function(){$(this).css({"background": vrz.tmp_tit_back, "color":vrz.tmp_tit});} );
	$("#reg_msg2 img").css({"width": "10vw", "filter": "drop-shadow(1px 1px 3px rgba(0,0,0,0.7))" });
	$("#reg_msg2").hover(function(){$(this).css({ "color": "grey"});});

}


////////////////////////////////////
//VOD scripts
///////////////////////////////////

function vid_player_init(prd,vid){
	if(!jPlayerPlaylist){setTimeout("function(){vid_player_init(prd,vid)}",1500); return;}
	mte_log("vid_init " + prd + " " + vid + " lgl " +noLgl );

	//load skin if not loaded yet - load custom if needed
	var cls, wid, hei, vrz,fullWindow=false, fullScreen=false;
	vrz = prdsInf[prd]['settings'];

	//console.log("vid init ", vrz)

	if(vrz.use_vid_css){
		if($("link[href='"+vrz.vid_css +"']").length == 0){console.log("load css"); add_css(vrz.vid_css);}
	}else{

		if(vrz.plr_skin){
			//alert(vrz.plr_skin)
			add_css(adminUrl+"style/vid_skin_"+vrz.plr_skin +".css");//just for test
		}else{
			//add_css(adminUrl+"style/vid_skin.css");
			if($("link[href='"+adminUrl+"style/vid_skin.css" +"']").length ==0 ){add_css(adminUrl+"style/vid_skin.css");}
		}

    	if(ios &! adminMode){add_css(adminUrl + "style/vid_skin_mob.css");}
	}
	//if(aflt ){playOne=true}
	wid = parseInt(vrz.plWid);
	if(flexPlayer&&vrz.player=='embed'){
		wid=$("#players").width(); // -2 ?
		//plrInst.resize(true)
		//console.log("flex player ", $("#players").width());
  	}
	hei = (wid*0.5625);//-5;//keep proportion
	$(".jp-close").hide(); $(".jp-restore-screen").hide();$(".jp-full-screen").hide();$(".jp-restore-screen").hide();
	if(mobile /*&& !ios*/){	fullScreen=true;fullWindow=true;/*$(".jp-close").show()*/}
	if(mobile && vrz.btnHome){	$(".jp-close").show();}else{$(".jp-close").hide();}
	if(vrz.fullwindow || responsive ){fullScreen=false; fullWindow=true;wid=$(window).width(); hei=$(window).height();/*$(".jp-close").show()*/;}
	if(vrz.player=="embed"&& !mobile){$(".jp-close").show()}
	if(!vrz.btnFull){$(".jp-full-screen").hide()}

	if(fullScreen || ios){cls = "jp-video-full", wid='100%'}else{cls="jp-video-360p"}
	
	//console.log("wid " , $('#vid_player_container').width(), hei);
	

	myPlaylist = new jPlayerPlaylist({
		  jPlayer: "#vid_player",
		  cssSelectorAncestor: "#jp_container_1"
		}, [{}], {
		  playlistOptions: {
		    enableRemoveControls: false,
		    autoPlay: false
		  },
		  size: {
			width: wid,
			height: hei,
			cssClass: cls
		},
		nativeVideoControls: {
			 // ipad: /ipad/,
			  //iphone: /iphone/,
			  //android: /android/,
			  //blackberry: /blackberry/,
			  //iemobile: /iemobile/
			},
		  swfPath: "/js",
		  supplied: "m4v",
		  smoothPlayBar: true,
		  keyEnabled: true,
		 fullWindow: fullWindow,
		  fullScreen: fullScreen
		  //enableRemoveControls: false
		});

	vid_player = jQuery("#vid_player");

	var jPlayer_method = vid_player.jPlayer;

	if(jPlayer_method==undefined){setTimeout("function(){vid_player_init(prd,vid)}",1500); return;}

	//tweek a few option in here
	jQuery("#vid_player").jPlayer({autohide:{hold:3000, restored: false}});
	var tp = vid_player.height()/2 -250/2;
	var lf = vid_player.width()/2 -250/2;
	jQuery("#jp_poster_0").attr("src", "//www.mte-media.com/users/"+ userObj.name +"/logo.png").css({"opacity":"1", "position":"absolute", "top":tp, "left" : lf, "z-index":1}).hide();
	jQuery(".jp-video-play-icon").css({"top":"50%"}).show();

	//if(ios){setTimeout(function(){ $(".jp-gui").show();$(".jp-video-play-icon").css({"margin-top": "-100px"}) },1000)}
	if(!vid_player){alert("no video player div"); return;}
	$("#reg_msg2").remove();
	colorize_vid();
	//new destroy button! for mobile....
	$(".jp-close").click(function(){close_vid('hide')}); 
	if(adr){setTimeout(function(){$(".jp-video-play").show(); $(".jp-video-play-icon").show(); $(".jp-gui").show()}, 2000);}

	if(!ios){
		$(".jp-video-play").css({"margin-top":-hei, "height":hei });
	}
	if(vrz.btnClose || ios || mobile ){/*$(".jp-close").show();*/}else{$(".jp-close").hide()}

	close_vid = function(hide){
		//if(ios){return;}
		vid_player.jPlayer("stop");
		vid_player.jPlayer("clearMedia");
		$.event.trigger({type: "VIDEO_PLAYLIST_COMPLETE", message: "",time: new Date()});// added for
		//if(!ios){}
		var embed = prdsInf[prd]['settings']['player']=="embed";
		if(!embed || ios){
			//$("#vid_player_container").hide();
		}

		//console.log("ios?", ios, hide);
		if(hide){$("#vid_player_container").hide();}

		$("#"+prdsInf[prd].target_id).show();
		if(fulls){vid_player.jPlayer({fullWindow:false});toggleFullscreen(document.querySelector('#vid_player'));}
	}

	//vid_player.bind($.jPlayer.event.click + ".jPlayer",function(){if(repeatLgl && !ios){pop_msg();return;}});//fired when playing new video
	vid_player.bind(jQuery.jPlayer.event.ended + ".jPlayer",vid_complete );//fired when playing new video
	vid_player.bind(jQuery.jPlayer.event.play + ".jPlayer",vid_playing );//fired when playing new video
	vid_player.bind(jQuery.jPlayer.event.resize + ".jPlayer",function(){if(mobile){vid_player.jPlayer({fullWindow:true}); resizeVid();};});
	//after movie loaded
	vid_player.bind(jQuery.jPlayer.event.loadeddata, function (event) {
		if(ios){ jQuery(".jp-gui").show(); }
		spinner.stop();
		if(!autoPlay){$(this).jPlayer("pause");}
	});

	if(ios &! adr){
		vid_player.find("video").bind('webkitendfullscreen', function(){close_vid()});// close iphone fullscreen & player on "done"
	}

	vid_player.bind(jQuery.jPlayer.event.progress, function(event){
		//mte_log("loading: "+event.jPlayer.status.seekPercent)
	   if (event.jPlayer.status.seekPercent === 100) {spinner.stop();}
	});

	jQuery("div.jp-video-360p").width(wid);// video body width

	//embed or pop
	var embed = prdsInf[prd].settings.player=="embed";
	if(embed){
		resizeVid();
		if(playOne){
			jQuery('.jp-next').hide()
			jQuery('.jp-previous').hide();
			jQuery.jPlayer.keys(false)
		}
		//prepare first video paused
		if(!vid){autoPlay=false;}
		if(!mobile || widget){/*play_vid_id(prd,vid)*/;$("#vid_player_container").show();}
		if(vrz.autohide){jQuery("#vid_player_container").hide()}
		//if(prdsInf[prd]['jtl']){autoPlay=true;tab=null; play_vid_id(prd,prdsInf[prd]['jtl']);$("#vid_player_container" ).show('slow');}//startwith jtl
		if(prdsInf[prd]['jtl']){

			if(repeatLgl && !ios){pop_msg();return;}
			//autoPlay=true;
			play_vid_idx(prdsInf[prd]['jtl'], prd);
			jQuery("#vid_player_container" ).show();
		}else{
			//autoPlay = true;play_lsn(1);$("#vid_player_container" ).show();
		}
	}else{
		jQuery("#vid_player_container").hide();
	}
}

function play_vid_idx(idx,prd){
	var vid;

	parent.postMessage("PLAYING_PRODUCT:"+prd , "*")
	// find the tab by idx
	$.each(prdsInf[prd]['pl'], function(t, obj){
		$.each(obj, function(i, obj1){if((idx)==obj1['idx']){tab = t; vid = obj1['id']; return true}});//is this correct?
		//$.each(obj, function(i, obj1){if((idx)==obj1['id']){tab = t; vid = obj1['idx']; return true}})
	});
	mte_log("sending lsn idx "  + idx + " vid " + vid)

	play_vid_id(prd,vid);
}

function find_tab(vid){// by id
	$.each(prdsInf[prd]['pl'], function(t, obj){
		$.each(obj, function(i, obj1){if((vid)==obj1['id']){tab = t;}})
	});
}

//play from playlist by id
var lsnsProcesed = false;

function play_vid_id(prd,vid){

    $('#vid_player').bind('contextmenu',function() { return false; });

    var tgt = document.getElementById('vid_player');
	var opt = {position:"relative", top:"50%", left:"50%"}
	spinner = new Spinner(opt).spin(tgt);
	//if(spinner){spinner.spin();}

	mte_log("unt here vid"  + vid_player + " " + vid)

	if(!vid_player){vid_player_init(prd,vid);}//if was detroyed instatiate it
	if(mobile){$("#"+prdsInf[prd].target_id).hide();$(".jp-restore-screen").hide()}
	if(typeof prdsInf[prd].pl != 'object' ){alert(prdsInf[prd].pl);return}
	//if(!tab){/*find_tab(vid); */ for(var a in prdsInf[prd]['pl']){tab=a;break};}// good for id obj sorting
	if(!tab){find_tab(vid);}
	//mte_log("vidpl");mte_log(prdsInf[prd].pl);

	//playlist = notabs ?prdsInf[prd]['pl']['all']: prdsInf[prd]['pl'][tab] ;

	playlist = prdsInf[prd]['pl']['all'] ;// igz change!!! working??!
	//console.log(" pl " ,playlist, prdsInf[prd].pl, " tab " , tab, "vid" , vid);
	var lsns = prdsInf[prd].lsns, id;
	if(lsns && !lsnsProcesed && playlist){
		for(var index = playlist.length-1; index >= 0; index--){
			//console.log("prc lsns " ,lsns )
			if(lsns.indexOf(String(index+1))==-1){playlist.splice(index ,1)}
		}
		lsnsProcesed = true;// avoid processing again!
	}
	if(!myPlaylist){vid_player_init(prd,vid); return }

	myPlaylist.setPlaylist(playlist);//bug?
	//myPlaylist.options.autoPlay = autoPlay ;
	//console.log("playlist" , playlist, " mypl " ,myPlaylist, vid);

	//myPlaylist.playlist = playlist;

	plIdx = get_vid_idx(vid);
	//mte_log("now vidIdx " + plIdx)
	var demoArr = prdsInf[prd].demo , firstTab = parseInt(Object.keys(prdsInf[prd].pl)[0]);
	//if(userRef=="e45d282"){alert(demoArr + " tab " + tabIdx)}
	if(mte_idx){
		if(demoArr < 0 && (plIdx >= Math.abs(demoArr) || tab >firstTab)){vid_player.jPlayer('clearMedia');pop_msg("locked");$("#"+prdsInf[prd].target_id).show();return }
		//if(demoArr < 0 && plIdx >  1){vid_player.jPlayer('clearMedia');pop_msg("locked");$("#"+prdsInf[prd].target_id).show();return }
	}else{
		//console.log("yes ", vidIdx , demoArr)
		//if(demoArr && demoArr.indexOf(String(vidIdx))>-1 || tab >firstTab){vid_player.jPlayer('clearMedia');pop_msg("locked");$("#"+prdsInf[prd].target_id).show();return }
		if(demoArr){
			if(demoArr.indexOf(String(vidIdx))>-1 || tab >firstTab){
				vid_player.jPlayer('clearMedia');pop_msg("locked");$("#"+prdsInf[prd].target_id).show();return
			}
		}
	}
   /*if(autoPlay || mobile){
		setTimeout(function(){myPlaylist.play(plIdx);mte_log("playing vid : " + plIdx)},1500);
	}*/
	var embed = prdsInf[prd]['settings']['player']=="embed";
	var autohide = prdsInf[prd]['settings']['autohide'];

	var checkNext = function(){
		if(aflt){
			$('.jp-next').hide()
			$('.jp-previous').hide();
			$.jPlayer.keys(false)
		}
	}

	if(embed && autohide || responsive){
		$("#vid_player_container").show('slow');
		setTimeout(function(){myPlaylist.play(plIdx);mte_log("playing embed vid  (embed && autohide): " + plIdx)},0);
	}else if(embed){
		$("#vid_player_container").show();
		setTimeout(function(){myPlaylist.play(plIdx);mte_log("playing embed vid (embed) : " + plIdx)},0);
	}else{
		var wid, hei;
		if(vrz.fullwindow){wid=$(window).width(); hei=$(window).height();}else{hei = plWid * 0.5625}
		//$(".fancybox-inner").css({"height":"300px"});
		myPlaylist.select(plIdx);
		setTimeout(function(){myPlaylist.play(plIdx);mte_log("playing vid : " + plIdx)},0);
		//console.log( $.fancybox)
		jQuery.fancybox.open($("#vid_player_container"),{afterLoad:function(){$('.fancybox-content').css({padding:'0',overflow:'hidden', display:'inline-block'})}, afterOpen:function(){}, afterClose:function(){close_vid('hide');}});
	}
	if(!vrz.btnFull){$(".jp-full-screen").hide()}

	if(mobile){vid_player.jPlayer({fullScreen:{fullScreen:true}});}
	_gaq.push(['_trackPageview', "/play_course: "+prd +"/user:"+userObj.name+"/language:"+lng]);
	//console.log("plIdx " + plIdx + " plylist current ", myPlaylist , " autoplay " +widget)
}

function get_vid_idx(vid){
	var idx=0, exist=false;
	if(!playlist){return; }
	if(!vid){return 1;}//first video
	for (var i = 0; i < playlist.length; i++) {
	    if (playlist[i].id == vid){idx=i; vidIdx=playlist[i].idx;  exist=true;}
  	}
  	if(exist){return idx;}else{return 1;}
}

function get_vid_id(idx){
	if(!playlist){return; }
  	return playlist[idx].id;
}

//playing a new video
function vid_playing(){
	spinner.stop();
	plIdx=myPlaylist.current;
	vid = myPlaylist.playlist[plIdx].id;
	vidIdx = myPlaylist.playlist[plIdx].idx;
	var demoArr = prdsInf[prd].demo;
	mte_log("playing new idx " + plIdx + " vid id " + vid );
	if(mte_idx){
		if(demoArr<0 && plIdx >= Math.abs(demoArr)){vid_player.jPlayer('clearMedia');pop_msg("locked");return }
	}
	 if(plIdx == Number(playlist.length-1)){last_vid = true;}

	if(demoArr && demoArr.indexOf(String(vidIdx))>-1){vid_player.jPlayer('clearMedia');pop_msg("locked");$("#"+prdsInf[prd].target_id).show();return
	//}else if(demoArr && demoArr.indexOf(String(vid))>-1){vid_player.jPlayer('clearMedia');pop_msg("locked"); return;
	}else{vid_player.find("#reg_msg2").remove();}
	resizeVid();
}

function vid_complete (){
	//what to do ?
	$.event.trigger({type: "VIDEO_ENDED"});
	parent.postMessage("VIDEO_COMPLETE" , "*")
	if(last_vid || playOne){close_vid();}
}

resizeVid = function(){
	//var hei = $("#jp_container_1").parent().width() * 0.5625 + "px";
	//logo
	$("#jp_poster_0").css({"width":'10%', "height":'auto'});
	var logHei = "10px" ;//$("#jp_poster_0").height()/2 + "px";
	$("#jp_poster_0").css({"opacity":"0.5", "absolute":"relative", "top":"10px", "left" : "10px"}).show();
}


 colorize_vid = function(){
	if(!prdsInf[prd]){return}
	//#vid_title, div.jp-controls-holder, div.jp-current-time, div.jp-duration{color:orange;}
	var txtColor = prdsInf[prd]['settings']['vid_title'];
	var btnColor = prdsInf[prd]['settings']['btn_clr'];
	var backFrom = prdsInf[prd]['settings']['bg_from'];
	var backTo = prdsInf[prd]['settings']['bg_to'];
	var btns = prdsInf[prd]['settings']['btn_clr'];
	var nav = prdsInf[prd]['settings']['nav'];

	$("#vid_title").css({"color":txtColor});
	$("div.jp-controls-holder").css({"color":txtColor});
	$("div.jp-current-time").css({"color":txtColor});
	$("div.jp-duration").css({"color":txtColor});
	$(".jp-volume-bar-value").css({"background":backFrom});
	$(".jp-volume-bar").css({"background":btns});
	$("div.jp-interface").css({"background":nav});
	$("div.jp-jplayer").css({"background":"radial-gradient("+backFrom +","+backTo+")"});
}


pop_msg=function(type){//actualy put_legal for vid prods
	//alert(prd,vid); return;
	//console.log("pop", $.fancybox)

	$(".jp-video-play").hide();
	$.fancybox.close(true);
	switch(type){
		case "locked":
			showDemoMsg();
		break;

		default: //legal

		 //mte_log("sas here  "+ prd + " lsn " + lsn );
		if(ios && type !='locked' || noLgl){ setCookie2("vidLgl","true"); play_vid_id(prd,vid); return;}

		var data = prdsData.global.legal;
		if(spinner){ spinner.stop(); }
			RTL = (lng=="hebrew" || lng=="arabic") ? true : false;
			var rt = RTL ? "text-align:right ; direction:rtl" : "";
			var fntsz = "12pt";
			//if(lng=="russian"){fntsz = "10pt";}
			var html = "<div id='lgl' style='padding: 10px; font-family: Roboto, sans-serif; font-size:"+fntsz+"; max-width:700px"+rt+"' >" +nl2br(data.legal);
			if(data.inf){html+= nl2br("<br><div style='font-size:8pt' >"+data.inf)+"</div>";}
			html += "<br><button class='btn agree' >"+data.legAgree+"</button>";
			html += "</div>";
			if(fulls){toggleFullscreen(document.querySelector('#vid_player'))}

			//console.log( $.fancybox)
			//$.fancybox.open({content: html, type:'inline', width:800, padding:5, modal:true, afterShow:function(){$(".fancybox-overlay").css({"overflow":"hidden"}); $(".fancybox-close").hide()}});
			$.fancybox.open(html, { width:800, padding:5, modal:true, afterShow:function(){$(".fancybox-overlay").css({"overflow":"hidden"});noLgl=false; $(".fancybox-close").hide()}});
			$("#lgl .agree").click(function(){agree()})
			$("#lgl .decline").click(function(){$.fancybox.close(); /*$("#lgl").remove()*/;})
			if(RTL){$('#lgl').css({"text-align":"right", "direction":"rtl"});}
			if(userRef=="2967923"){$('#lgl').css({"background":"#333", "color":"white"})}; // 24opt
		break;
	}

	agree=function(){
		$(".jp-video-play").show();
		setCookie2("vidLgl","true",null);
		$("#lgl").remove();
		$.fancybox.close();
		if(repeatLgl && prdsInf[prd].jtl){play_lsn(prdsInf[prd]['jtl']);return;}
		//play_vid_idx(lsn,prd);
		play_vid_id(prd, lsn);// modified on 22/10/18
	}
}

})(jQuery);



/////////////////////////////////
//helper functions
////////////////////////////////
//debug = true; // test
//function log(txt='',obj=''){if(debug){window.console && console.log(txt,"obj ", obj)};}
function log(txt){
	if(debug && window.console){
		console.log(txt);
	}
}

function mte_log(txt){
	if(debug && window.console){
		console.log(txt);
	}
}

function doAction(action, value, url){Plr.doAction(action, value, url)}

nl2br = function (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}


function setCookie(c_name,value,min){
	//if(userRef=="da83add"){alert("cook " +value )}
	var exdate=new Date();
	var minutes = min * 60* 1000;
	exdate.setTime(exdate.getTime() + minutes);
	var c_value=escape(value) + ((min==null) ? "" : "; expires="+exdate.toGMTString());
	mte_log("cook " +c_value )

	document.cookie=c_name + "=" + c_value + " ;path=/" ;
}

function setCookie2(c_name,value,min){


	var exdate=new Date();
	var minutes = min * 60* 1000;
	exdate.setTime(exdate.getTime() + minutes);
	var c_value=escape(value) + ((min==null) ? "" : "; expires="+exdate.d.toUTCString());
	document.cookie=c_name + "=" + c_value + " ;path=/" ;
	if(c_name=="vidLgl" && value=="true"){noLgl = true;}

	mte_log("setCookie2 " +value + " " + c_name )
}


function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name){
		return unescape(y);
		}
	}
}

langCode = function (lngCode){

	//if(lngCode=='vi'){return "vi"}
	var langsArr= [];
	langsArr["gb"]="English_uk";
	langsArr["it"]="Italian";
	langsArr["ar"]="Arabic";
	langsArr["ae"]="Arabic";
	langsArr["de"]="German";
	langsArr["fr"]="French";
	langsArr["es"]="Spanish";
	langsArr["pt"]="Portuguese";
	langsArr["tr"]="Turkish";
	langsArr["ru"]="Russian";
	langsArr["ro"]="Romanian";
	langsArr["pl"]="Polish";
	langsArr["hu"]="Hungarian";
	langsArr["he"]="Hebrew";
	langsArr["nl"]="Dutch";
	langsArr["fi"]="Finnish";
	langsArr["rs"]="Serbian";
	langsArr["cz"]="Czech";
	langsArr["gr"]="Greek";
	langsArr["au"]="English_au";
	langsArr["my"]="Malay";
	langsArr["id"]="Indonesian";
	langsArr["kr"]="Korean";
	langsArr["sv"]="Swedish";
	langsArr["en"]="English";
	langsArr["us"]="English";
	langsArr["cn"]="Chinese";
	langsArr["zh"]="Chinese";
	langsArr["zh-hans"]="Chinese";
	langsArr["jp"]="Japanese";
	langsArr["ja"]="Japanese";
	langsArr["vi"]="Vietnamese";

	//console.log("oooof" , langsArr, lngCode)

	if(lngCode.length>2){
		for(var key in langsArr){if(langsArr[key].toLowerCase()==lngCode.toLowerCase()){return key} ;}
		return "en";//if it got here it's because language dont exist
	}

	if(!langsArr[lngCode]){lngCode='en';}
	return langsArr[lngCode].toLowerCase();
}

detectmob=function (){
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){return true;}else{return false;}
}


function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
// SPINER

// http://spin.js.org/#v2.3.1
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return m[e]||(k.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",k.cssRules.length),m[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<l.length;d++)if(c=l[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}k.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.scale*d.width,left:d.scale*d.radius,top:-d.scale*d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.scale*(d.length+d.width),k=2*d.scale*j,l=-(d.width+d.length)*d.scale*2+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k,l=["webkit","Moz","ms","O"],m={},n={lines:12,length:7,width:5,radius:10,scale:1,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};if(h.defaults={},f(h.prototype,{spin:function(b){this.stop();var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});if(e(f,{left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.scale*(f.length+f.width)+"px",height:f.scale*f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.scale*f.radius+"px,0)",borderRadius:(f.corners*f.scale*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.scale*f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),"undefined"!=typeof document){k=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}();var o=e(a("group"),{behavior:"url(#default#VML)"});!d(o,"transform")&&o.adj?i():j=d(o,"animation")}return h});

