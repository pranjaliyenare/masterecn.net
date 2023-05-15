var firstTimeLiveQuotes = true;
$(document).ready(function() {
	liveQuotes()
})

function liveQuotes(){

	$.liveQuotes = {
	    head: "",
	    quotes: "",
	    element: ""
  	};
	var host = 'wss://prices.gohfm.com/prices';
    var websocket = new WebSocket(host);
    websocket.onopen = function (evt) { };
    websocket.onmessage = function(evt) {

        var data = $.parseJSON(evt.data)
         
        var tempCat = {};
	    tempCat['forex'] = data['forex'];
	    /*tempCat['cryptos'] = data['cryptos'];*/
	    tempCat['commodities'] = data['commodities'];
	    tempCat['stocks'] = data['stocks'];
	    tempCat['indices'] = data['indices'];
	    $.each(tempCat, function(key, val) {
	    	 
	      if(!firstTimeLiveQuotes){
	        $.liveQuotes.quotes = "";
	      }
	      var element = key;

	      if (firstTimeLiveQuotes) {
	        let headClass = (key == "forex") ? "current" : "";
	        let headClass2 = (key == "indices") ? " last" : "";
	        let element_title = "";
	        if (element == 'commodities') {
	          element_title = 'metals';
	        } else {
	          element_title = element;
	        }

	         if (regulator == 'HFCY'){
	          if (element == "forex") {
	            element_title = "Forex";
	          } else if (element == "commodities") {
	            element_title = "Metals";
	          } else if (element == "stocks") {
	            element_title = "Stocks";
	          } else if (element == "indices") {
	            element_title = "Indices";
	          } else {
	            return;
	          }
	        }
	         if (regulator == 'HFUK'){
	          if (element == "forex") {
	            element_title = "Forex";
	          } else if (element == "commodities") {
	            element_title = "Metals";
	          } else if (element == "stocks") {
	            element_title = "Stocks";
	          } else if (element == "indices") {
	            element_title = "Indices";
	          } else {
	            return;
	          }
	        }


	         if (regulator == 'HFAE'){
	          if (element == "forex") {
	            element_title = "Forex";
	          } else if (element == "commodities") {
	            element_title = "Metals";
	          } else if (element == "stocks") {
	            element_title = "Stocks";
	          } else if (element == "indices") {
	            element_title = "Indices";
	          } else {
	            return;
	          }
	        }

	        if (china) {
	          if (element == "forex") {
	            element_title = "外汇";
	          } else if (element == "commodities") {
	            element_title = "期货";
	          } else if (element == "stocks") {
	            element_title = "股票";
	          } else if (element == "indices") {
	            element_title = "指数";
	          } else {
	            return;
	          }
	        }

	        $.liveQuotes.head += '<li  class="nav-' + element + headClass2 + '"><a href="#' + element + '" class="' + headClass + '">' + element_title + '</a></li>';
	        let c = (key == "forex") ? "" : 'style="display:none"';
	        $.liveQuotes.quotes += '<ul ' + c + ' id="' + element + '">';

	      }

	      $.liveQuotes.element = key;

	      val.forEach(function(val) {
	        let key = val[4];
	        let direction = val[0];
	        let bid = val[1];
	        let ask = val[2];
	        let spread = val[3];
	        let flag1, flag2, icon, flags;
	        switch ($.liveQuotes.element) {
	          case "forex":
	            flag2 = key.substr(3, 2).toLowerCase() + "";
	            flag1 = key.substr(0, 2).toLowerCase() + "";

	            flags = '<span class="' + flag1 + '"></span><span class="' + flag2 + '"></span>&nbsp;';
	            break;

	          /*case "cryptos":
	            icon = key + "";

	            flags = '<span class="' + icon + '"></span>';

	            break;*/

	          case "commodities":
	            icon = key.toLowerCase() + "";

	            flags = '<span class="' + icon + '"></span>';

	            break;
	          case "indices":
	            icon = key.replace(" ", "").toLowerCase() + "";
	            if (icon == "s&p500" || icon == "dj30") {
	              icon = "sp500";
	            }
	            flags = '<span class="' + icon + '"></span>';

	            break;
	          case "stocks":
	            icon = key.toLowerCase() + "";

	            flags = '<span class="' + icon + '"></span>';

	            break;
	          default:
	            flags = "";
	            break;
	        }

	        let separator = (bid == "CLOSED") ? "" : " / ";

	        $.liveQuotes.quotes += '<li class="instrumentRow">';

	        $.liveQuotes.quotes += '<span  class="' + $.liveQuotes.element + ' instrument">' + flags + key + '</span>';

	        $.liveQuotes.quotes += '<span class="pricelivequotes ' + direction + '">' + bid + separator + ask + '</span> ';

	        $.liveQuotes.quotes += '<span class="spread">' + spread + '</span>';

	        $.liveQuotes.quotes += '</li>' + "\n";
	      });

	      if (firstTimeLiveQuotes) {
	        $.liveQuotes.quotes += '</ul>';
	      } else {
	        $("ul#" + element).html($.liveQuotes.quotes);
	      }

	    })

	    if (firstTimeLiveQuotes) {
	      $("#nav").html($.liveQuotes.head);
	      $("#list-wrap").html($.liveQuotes.quotes);
	      $("#liveQuotes").organicTabs();
	      $(".home-spinner").hide();
	      $(".inner-box").show();
				firstTimeLiveQuotes = false;
	    }


    };
    websocket.onerror = function (evt) { };

}