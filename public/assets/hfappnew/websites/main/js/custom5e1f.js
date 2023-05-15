//Inline base.html
$( document ).ready(function() {
    var getmain = $("#nav").html();
    $('#'+getmain).removeClass('outside');
    $('#'+getmain).addClass('active');
    });

//Begin LivePerson Monitor- 85172468
window.lpTag=window.lpTag||{};if(typeof window.lpTag._tagCount==='undefined'){window.lpTag={site:'85172468'||'',section:lpTag.section||'',autoStart:lpTag.autoStart===false?false:true,ovr:lpTag.ovr||{},_v:'1.6.0',_tagCount:1,protocol:'https:',events:{bind:function(app,ev,fn){lpTag.defer(function(){lpTag.events.bind(app,ev,fn);},0);},trigger:function(app,ev,json){lpTag.defer(function(){lpTag.events.trigger(app,ev,json);},1);}},defer:function(fn,fnType){if(fnType==0){this._defB=this._defB||[];this._defB.push(fn);}else if(fnType==1){this._defT=this._defT||[];this._defT.push(fn);}else{this._defL=this._defL||[];this._defL.push(fn);}},load:function(src,chr,id){var t=this;setTimeout(function(){t._load(src,chr,id);},0);},_load:function(src,chr,id){var url=src;if(!src){url=this.protocol+'//'+((this.ovr&&this.ovr.domain)?this.ovr.domain:'lptag.liveperson.net')+'/tag/tag.js?site='+this.site;}var s=document.createElement('script');s.setAttribute('charset',chr?chr:'UTF-8');if(id){s.setAttribute('id',id);}s.setAttribute('src',url);document.getElementsByTagName('head').item(0).appendChild(s);},init:function(){this._timing=this._timing||{};this._timing.start=(new Date()).getTime();var that=this;if(window.attachEvent){window.attachEvent('onload',function(){that._domReady('domReady');});}else{window.addEventListener('DOMContentLoaded',function(){that._domReady('contReady');},false);window.addEventListener('load',function(){that._domReady('domReady');},false);}if(typeof(window._lptStop)=='undefined'){this.load();}},start:function(){this.autoStart=true;},_domReady:function(n){if(!this.isDom){this.isDom=true;this.events.trigger('LPT','DOM_READY',{t:n});}this._timing[n]=(new Date()).getTime();},vars:lpTag.vars||[],dbs:lpTag.dbs||[],ctn:lpTag.ctn||[],sdes:lpTag.sdes||[],ev:lpTag.ev||[]};lpTag.init();}else{window.lpTag._tagCount+=1;}


function hidePlatforms(){
    jQuery('.hiddenPlatforms').fadeOut(200);
    jQuery('.hiddenPlatforms').addClass('hidden');
    }
function hidePlatforms2(){
    jQuery('.search-btn').fadeIn(1);
    jQuery('.hiddenPlatforms2').fadeOut(200);
    jQuery('.hiddenPlatforms2').addClass('hidden');
    }


(function($) {
    //$(document).foundation();
    $(document).ready(function() {
        jQuery("#block_container").click(function(e){
            e.stopPropagation();
            window.open( jQuery(this).attr('rel') );
            return false;
            });
        var quotes = $(".awards");
        var quoteIndex = -1;
        function showNextQuote() {
            ++quoteIndex;
            quotes.eq(quoteIndex % quotes.length).fadeIn(1000).delay(3000).fadeOut(1000, showNextQuote);
            }
            showNextQuote();
        });
    })(jQuery);
function popup(mylink, windowname){
    if (! window.focus) return true;
        var href;
        if (typeof(mylink) == 'string')
            href=mylink;
        else
            href=mylink.href;
            window.open(href, windowname, 'width=400,height=200,scrollbars=yes');
            return false;
        }

//end base


window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
			
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
	if($('#myDropdown').css('display')=='block'){
		$('#myDropdown').hide();
	}else{
		$('#myDropdown').show();
	}
    //document.getElementById("myDropdown").classList.toggle("show");
}

$(document).mouseup(function (e)
{
    var container = $(".dropbtn");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $('#myDropdown').hide();
    }
});


function openRegulator() {
    if($('#myDropdownSec').css('display')=='block'){
        $('#myDropdownSec').hide();
    }else{
        $('#myDropdownSec').show();
    }
    //document.getElementById("myDropdown").classList.toggle("show");
}

$(document).mouseup(function (e)
{
    var container = $(".dropbtn");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $('#myDropdownSec').hide();
    }
});



function getWords(str) {
  return str.split(/\s+/).slice(1,12).join(" ");
}


function xmlParser(xml,analysis_url) {

    var i=1;

    $(xml).find("item").each(function () {
        $('#AnalysisText').remove();
        if(i<3){

        var thisdate = new Date($(this).find("pubDate").text());
        var day=thisdate.getDate();
        var month=parseInt(thisdate.getMonth())+1;
        var year=thisdate.getFullYear();
        if(day<10){
          day=0+''+day;
        }
         if(month<10){
          month=0+''+month;
        }
        var today = new Date();
        var dd = today.getDate();

        if(dd==day){
          showdate='today';
        }else{
          var showdate = day+'/'+month+'/'+year;
        } 
        var str = $(this).find("description").text();
        //var stringIs = str.slice(0, str.length - 10); 
        var stringIs = getWords(str);
        var stringIsLast = stringIs+' ...'+' <a href="'+analysis_url+$(this).find("link").text()+'" target="_blank">read more</a>';

      
            
        var textContent= $(this).find("content\\:encoded, encoded").text();

        var textCont = '<span><a href="'+analysis_url+$(this).find("link").text()+'" target="_blank"><b class="color-red">'+$(this).find("title").text()+'</b></a></span><br/>\
                        <span style="font-size:12px;color:#888888">'+$(this).find("dc\\:creator, creator").text()+' - '+showdate+'</span>\
                          <p>'+stringIsLast+'</p>';  

        $('.LatestAnalysisAddition').append(textCont);

        }  

      i++;

  });

}    

function loadLatestAnalysis(regulator,domain){

    var url_feed = '';
    var analysis_url = '';

    if (regulator == 'HFUK' || regulator == 'HFCY' || regulator == 'HFAE' ){
        url_feed = "https://analysis." + domain + "/en-eu/feed/";
    }
    else{
        url_feed = "https://analysis." + domain + "/feed/";
    }
    analysis_url = "https://analysis." + domain;


    $.ajax({
          type:"GET", 
          url: url_feed,
          async:true,
          crossDomain:true,
          dataType: 'xml',
          accepts: {
              xml: 'text/xml',
              text: 'text/plain'
          },
          error:function(data) {
             console.log('error reading xml');
            
          },
          success: function(data) {
            xmlParser(data,analysis_url)
         }
    });

}   


$(document).ready(function(){
     
      $(document).ready(function () {
          $(".sidebar.right").sidebar({side: "right"});
          $(".sidebar.right").css('display','block');

          // Click handlers
          $("#openrightMenu").on("click", function () {
              var $this = $(this);
              var action = $this.attr("data-action");
              var side = $this.attr("data-side");
              $(".sidebar." + side).trigger("sidebar:" + action);
              return false;
          });
      });

      $(".right").on("sidebar:opened", function () {
          $('body').css('overflow','hidden');
          $('html').css('overflow','hidden');
      });

      $(".right").on("sidebar:closed", function () {
          $('body').css('overflow','auto');
          $('html').css('overflow','auto');
      });

      $("#js-riskMinimizeButton").click(function() {
          $("#js-riskMinimizeButton").toggleClass('up-rw');
          if($(".rwsmall").hasClass("show-rw")){
              $(".rwsmall").removeClass("show-rw");
              $(".rwnormal").removeClass("hide-rw");
          }
          else{
              $(".rwsmall").addClass("show-rw");
              $(".rwnormal").addClass("hide-rw");
          }
      });
});