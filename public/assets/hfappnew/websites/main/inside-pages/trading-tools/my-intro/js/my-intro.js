$(document).ready(function(){
  $('img.hoverChange1').bind("mouseover",function(){
    $(this).attr('src','{{ static_site }}/assets/hfappnew/websites/main/inside-pages/trading-tools/my-intro/images/myclient-deposit.jpg');
  });
  $('img.hoverChange1').bind("mouseout",function(){
    $(this).attr('src','{{ static_site }}/assets/hfappnew/websites/main/inside-pages/trading-tools/my-intro/images/myclient-deposit-bw.jpg');
  });
  $('img.hoverChange2').bind("mouseover",function(){
    $(this).attr('src','{{ static_site }}/assets/hfappnew/websites/main/inside-pages/trading-tools/my-intro/images/myclient-upload.jpg');
  });
  $('img.hoverChange2').bind("mouseout",function(){
    $(this).attr('src','{{ static_site }}/assets/hfappnew/websites/main/inside-pages/trading-tools/my-intro/images/myclient-upload-bw.jpg');
  });
  $('img.hoverChange3').bind("mouseover",function(){
    $(this).attr('src','{{ static_site }}/assets/hfappnew/websites/main/inside-pages/trading-tools/my-intro/images/myclient-accounts.jpg');
  });
  $('img.hoverChange3').bind("mouseout",function(){
    $(this).attr('src','{{ static_site }}/assets/hfappnew/websites/main/inside-pages/trading-tools/my-intro/images/myclient-accounts-bw.jpg');
  });
  $('img.hoverChange4').bind("mouseover",function(){
    $(this).attr('src','{{ static_site }}/assets/hfappnew/websites/main/inside-pages/trading-tools/my-intro/images/myclient-transfer.jpg');
  });
  $('img.hoverChange4').bind("mouseout",function(){
    $(this).attr('src','{{ static_site }}/assets/hfappnew/websites/main/inside-pages/trading-tools/my-intro/images/myclient-transfer-bw.jpg');
  });
});