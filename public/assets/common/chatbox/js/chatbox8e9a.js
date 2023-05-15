var has_csrf =  ($('[name="csrfmiddlewaretoken"]').length > 0) ? true : false;

var MyHfLiveChat = {
  loggedIn: null,
  userData: {},
  slugs: {},
  time_counter: 0,
  intervalID: null,
  isChatAppeared: false,
  activeEngagementId: 0,
  isOffWorkingHours: false,

  init: function (loggedIn, userData, slugs, isOffWorkingHours) {
    this.isOffWorkingHours = isOffWorkingHours;
    this.loggedIn = loggedIn;
    this.userData = userData;
    this.slugs = slugs;
    this.loadChatQuestions();
    this.initAccordion();
  },

  /// BIND TO RENDERER STUB
  bindStub: function () {
    lpTag.events.bind("RENDERER_STUB", "*", (data, info) => {
      if (info["eventName"] == "AFTER_CREATE_ENGAGEMENT_INSTANCE") {
        LiveChat.activeEngagementId = data.msg.engagementId;
        LiveChat.startChatButtonAppeared();
      }
      if (info["eventName"] == "ENGAGEMENT_CONFIGURATION_CREATED") {
        LiveChat.chatAppeared();
      }
    });
  },

  /// BIND TO LP TAG
  bindLPTag: function () {
    lpTag.events.bind("LPTAG", "*", (data, info) => {
      if (info["eventName"] == "TAGLET_STOPPED") {
        if(LiveChat.isVisitor && !LiveChat.loggedIn){
            document.cookie = "chat_user_data="+btoa(JSON.stringify({}));
            LiveChat.unbindLPTag();
            LiveChat.userData = {};
            LiveChat.resetChat();
            LiveChat.isChatAppeared = false;

        }
      }
    });
  },

  /// REMOVE BINDING WHEN NOT NEEDED
  unbindStub: function () {
    lpTag.events.unbind({ appName: "RENDERER_STUB", eventName: "*" });
  },

  unbindLPTag: function () {
    lpTag.events.unbind({ appName: "LPTAG", eventName: "*" });
  },

  isVisitor: function () {
    return ['VISITOR', 'POPUP_LOGGED_IN'].includes(LiveChat.userData.status);
  },

  /// FETCH CHAT QUESTIONS
  loadChatQuestions: function () {
    $.ajax({
      type: "GET",
      url: "/chat_questions?lang="+lp_chat_consts.lang+"&branch="+lp_chat_consts.branch,
      async: true,
      success: function (data) {
        try {
          let response = JSON.parse(data);
          if (response.status) {
            LiveChat.processQuestions(response.data);
            LiveChat.initializeQuestionsList();
          }
        } catch (err) {
          //console.log(err);
        }
      },
      error: function (error) {
        //console.log(error);
      },
    });
  },

  /// PROCESS QUESTIONS
  processQuestions: function (questions) {
    questions.forEach((chat_question) => {
      /*
       * The below code is not applied for the Django FrontEnd.
       * The replacements for Django Frontend are performed
       *     in python file: `app_hf/hfapps/trn_backend_api.py`
       *     in the function: `live_chat_questions_get_api()`.
       * If any other string should be replaced, please add it in the python file mentioned above.
       */
      if (chat_question.answer.match("{{call_domain}}")) {
        chat_question.answer = chat_question.answer.replace(/{{call_domain}}/g, lp_chat_consts.call_domain);
      }
      if (chat_question.answer.match("{{EMAIL_SUPPORT}}")) {
        chat_question.answer = chat_question.answer.replace(/{{EMAIL_SUPPORT}}/g, lp_chat_consts.email_support);
      }
      if (chat_question.answer.match("{{email_support}}")) {
        chat_question.answer = chat_question.answer.replace(/{{email_support}}/g, lp_chat_consts.email_support);
      }
      if (chat_question.answer.match("{{EMAIL_BACKOFFICE}}")) {
        chat_question.answer = chat_question.answer.replace(/{{EMAIL_BACKOFFICE}}/g, lp_chat_consts.email_backoffice);
      }
      if (chat_question.answer.match("{{deposit_email}}")) {
        chat_question.answer = chat_question.answer.replace(/{{deposit_email}}/g, lp_chat_consts.deposit_email);
      }
      if (chat_question.answer.match("{{regulatorurl}}")) {
        chat_question.answer = chat_question.answer.replace(/{{regulatorurl}}/g, lp_chat_consts.regulator_url);
      }
      if (chat_question.answer.match("{{trading_email}}")) {
        chat_question.answer = chat_question.answer.replace(/{{trading_email}}/g, lp_chat_consts.trading_email);
      }
    });
    chat_questions = questions;
  },

  /// INITIALIZE QUESTIONS LIST
  initializeQuestionsList: function () {
    $("#chat_question").select2();
    $("#chat_question").on("select2:select", function (e) {
      var data = e.params.data;
      LiveChat.chatOption(data["id"]);
    });
  },

  /// CHAT OPTION
  chatOption: function (val) {
    var answer = "";
    clearInterval(LiveChat.intervalID);
    $("#chat-popup__answer").fadeOut(100, function () {
      let chat_question = chat_questions.filter((question) => question.id === parseInt(val))[0];
      if (chat_question) {
        if (chat_question.action_tag === "NONE") {
          answer = chat_question.answer;
        } else if (chat_question.action_tag === "AFFILIATE" || chat_question.action_tag === "CLIENT") {
          answer =
            '<div class="chat-popup__answer__empty"><i class="fas fa-spinner fa-pulse" style="font-size: 85px;color: #888;"></i></div><p>' +
            chat_question.answer +
            "</p>";
          LiveChat.initMessaging(chat_question.action_tag);
        }
      }
      if (answer === "") {
        answer =
          '<div class="chat-popup__answer__empty"><i class="far fa-comments" style="font-size: 110px;color: #888;"></i></div>';
      }
      $("#chat-popup__answer").html(answer);
      $("#chat-popup__answer").fadeIn(100);
    });
  },

  /// INIT ACCORDION
  initAccordion: function () {
    chatbox(() => {
      chatbox(".chatbox-close").click(function () {
        LiveChat.closeHFChatBox();
      });
      chatbox("#chatbox-open").click(function () {
        LiveChat.openHFChatBox();
      });
    });

    if (LiveChat.loggedIn) {
      this.prepareQuestions(0);
      this.continueChat();
    } else {
      var acc = document.getElementsByClassName("chat_accordion");
      var i;
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          if (this.classList.contains("chat_acc_active")) {
            var arrow_replace = this.querySelector(".fa-chevron-up");
            arrow_replace.classList.remove("fa-chevron-up");
            arrow_replace.classList.add("fa-chevron-down");
            this.classList.remove("chat_acc_active");
            this.nextElementSibling.classList.remove("chat_acc_active_box");
          } else {
            var acc_close = document.getElementsByClassName("chat_acc_active_box");
            for (j = 0; j < acc_close.length; j++) {
              acc_close = acc_close[j];
              acc_close.classList.remove("chat_acc_active_box");
            }
            var acc_close_btn = document.getElementsByClassName("chat_acc_active");
            for (k = 0; k < acc_close_btn.length; k++) {
              acc_close_btn = acc_close_btn[k];
              var arrow_replace = acc_close_btn.querySelector(".fa-chevron-up");
              arrow_replace.classList.remove("fa-chevron-up");
              arrow_replace.classList.add("fa-chevron-down");
              acc_close_btn.classList.remove("chat_acc_active");
            }
            var arrow_replace = this.querySelector(".fa-chevron-down");
            arrow_replace.classList.remove("fa-chevron-down");
            arrow_replace.classList.add("fa-chevron-up");
            this.classList.toggle("chat_acc_active");
            this.nextElementSibling.classList.toggle("chat_acc_active_box");
          }
        });
      }
      acc[0].click();
    }
  },

  /// PREPARE QUESTIONS
  prepareQuestions: function (guest_entry) {
    $("#chat_question").empty();
    $("#chat_question").append("<option value='DEFAULT'>" + this.slugs["chat_pls_select"] + "</option>");
    chat_questions.forEach((chat_question) => {
      if (chat_question.guest_entry === guest_entry) {
        $("#chat_question").append(new Option(chat_question.question, chat_question.id));
      }
    });
  },

  /// INIT MESSAGING
  initMessaging: function (actionTag) {
    // console.log(LiveChat.isOffWorkingHours);
    if(LiveChat.isOffWorkingHours){
        LiveChat.offWorkingHours();
    }else{
        this.isChatAppeared = true;
        LiveChat.bindStub();
        LiveChat.userData.actionTag = actionTag;
        $("#chatbox-popup__second").append('<div id="messaging_btn" style="display:none"></div>');
        this.setSection(window.location.href);
        if(LiveChat.getCookie("chat_user_data") === ""){
            document.cookie = "chat_user_data="+btoa(JSON.stringify(LiveChat.userData));
        }
        LiveChat.startMessaging();
    }
  },

  /// SET SECTION
  setSection: function (url) {
    var lang = LiveChat.userData.lang
    if(LiveChat.userData.actionTag === "AFFILIATE"){
        lang='en'
    }
    section = lang+"_"+LiveChat.userData.branch+"_"+LiveChat.userData.actionTag
    let country = LiveChat.userData.country ? LiveChat.userData.country : lp_chat_consts.country
    if(country === "Indonesia"){
        section = "id_HFSV_client"
    }else if(country === "Egypt"){
        let support = "client";
        if(LiveChat.userData.actionTag === "AFFILIATE"){
            support = "affiliate"
        }
        if(lang === "ar"){
            section = "ar_hfsv_"+support+"_egypt"
        }else{
            section = "en_hfsv_"+support+"_egypt"
        }

    }
    lpTag.newPage(url, {
      section : [ section.toLowerCase() ],
    });
  },

  /// START MESSAGING
  startMessaging: function () {
    LiveChat.intervalID = setInterval(function () {
      if (LiveChat.time_counter == 100) {
        LiveChat.nothingAppeared();
        return;
      }
      LiveChat.time_counter++;
    }, 100);
  },

  /// CHAT APPEARED
  chatAppeared: function () {
    this.closeHFChatBox();
    clearInterval(LiveChat.intervalID);
    this.bindLPTag();
    this.unbindStub();
  },

  /// START CHAT
  startChatButtonAppeared: function (engagementId) {
    k = lpTag.taglets.rendererStub.click(LiveChat.activeEngagementId);
    if(!k){
        setTimeout(LiveChat.startChatButtonAppeared, 100);
    }
  },

  /// NOTHING APPEARED
  nothingAppeared: function () {
    clearInterval(LiveChat.intervalID);
    $("#chat_popup_spinner").empty();
    $("#chat_popup_talk_href").show();
    LiveChat.unbindStub();
    $("#chatbox-popup__second").hide();
    $("#chatbox-popup__lp_unavailable").show();
  },

  /// NOTHING APPEARED
  offWorkingHours: function () {
    clearInterval(LiveChat.intervalID);
    $("#chat_popup_spinner").empty();
    $("#chat_popup_talk_href").show();
    LiveChat.unbindStub();
    $("#chatbox-popup__second").hide();
    $("#chatbox-popup__off_hours").show();
  },

  /// CONTINUE CHAT
  continueChat: function () {
    $("#chatbox-popup__second_fname").text(LiveChat.userData.fname + "!");
    $("#chatbox-popup__en_only_fname").text(LiveChat.userData.fname + "!");
    $("#chatbox-popup__first").fadeOut(100, function () {
      $("#chatbox-popup__second").fadeIn(200);
    });
  },

  /// CLOSE CHATBOX
  closeHFChatBox: function () {
    $(".chatbox-popup").fadeOut(200);
    this.resetChat();
  },

  /// OPEN CHATBOX
  openHFChatBox: function () {
    if ($(messaging_maximize_button_class).length > 0) {
      this.toggleMessagingWindow();
    } else {
      $("#chatbox-popup__first").show();
      $(".chatbox-popup").fadeIn(200);
    }
  },

  /// TOGGLE WINDOW
  toggleMessagingWindow: function () {
    if ($(messaging_maximize_button_class).css("display") == "none") {
      $(messaging_minimize_button_class).click();
    } else if ($(messaging_maximize_button_class).css("display") == "block") {
      $(messaging_maximize_button_class).click();
    }
  },

  /// RESET CHAT
  resetChat: function () {
    $("#chatbox-popup__en_only").hide();
    clearInterval(LiveChat.intervalID);
    LiveChat.activeEngagementId = 0;
    this.unbindStub();
    $(messaging_button_div_id).remove();
    $('#chat_question').val('DEFAULT');
    $("#chat_question").trigger("change");
    this.chatOption("DEFAULT");
    LiveChat.time_counter = 0;
    $(".chat_error").each(function (index) {
      $(this).remove();
    });
    if (!this.loggedIn) {
      if(!LiveChat.isVisitor || !LiveChat.isChatAppeared){
        LiveChat.userData = {};
      }
      $("#chatbox-popup__second").hide();
      $("#chatbox-popup__first").show();
    }else{
      $("#chatbox-popup__second").show();
    }
    $("#chat_off_hours_leave_message").show();
    $("#chat_off_hours_success").hide();
    $("#chatbox-popup__off_hours").hide();
    $("#chat_leave_message").val("");
  },

  /// MORE HELP
  moreHelp: function () {
    $("#chat_popup_talk_href").hide();
    $("#chat_popup_spinner").append(
      '<i class="fas fa-spinner fa-pulse" style="font-size: 20px;color: #888;"></i>'
    );
    LiveChat.initMessaging("CLIENT");
  },

  /// TOGGLE CHAT BOX
  toggleHFChatBox: function () {
    if ($(".chatbox-popup").css("display") == "none") {
      this.openHFChatBox();
    } else {
      this.toggleMessagingWindow();
      this.closeHFChatBox();
    }
  },

  /// END CONVERSATION
  endConversation: function () {
    $("#messaging_btn_in").remove();
    $(messaging_parent_class).remove();
  },

  /// VALIDATORS
  validWalletId: function (data) {
    return data.length >= 2 && data.length <= 15;
  },
  validEmail: function (data) {
    var reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return data !== "" && reg.test(data);
  },
  validName: function (data) {
    return data.length >= 2 && data.length <= 45;
  },
  validPhone: function (data) {
    // This is Not required
    var reg = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    return data === "" || reg.test(data);
  },
  validPrivacy: function (data) {
    return data === 1;
  },


  /// SHOW ERROR
  showValidationError: function (fieldName) {
    const parentField = $("#" + fieldName).parent();

    if (fieldName === "chat_myhf_id") {
      parentField.append(
        '<label class="chat_error" for="' + fieldName + '">' + this.slugs["chat_field_account_invalid"] + "</label>"
      );
    } else if (fieldName === "chat_myhf_email") {
      parentField.append(
        '<label class="chat_error" for="' + fieldName + '">' + this.slugs["chat_field_email_invalid"] + "</label>"
      );
    } else if (fieldName === "chat_fname") {
      parentField.append(
        '<label class="chat_error" for="' + fieldName + '">' + this.slugs["chat_field_required"] + "</label>"
      );
    } else if (fieldName === "chat_lname") {
      parentField.append(
        '<label class="chat_error" for="' + fieldName + '">' + this.slugs["chat_field_required"] + "</label>"
      );
    } else if (fieldName === "chat_email") {
      parentField.append(
        '<label class="chat_error" for="' + fieldName + '">' + this.slugs["chat_field_email_invalid"] + "</label>"
      );
    } else if (fieldName === "chat_phone") {
      parentField.append(
        '<label class="chat_error" for="' + fieldName + '">' + this.slugs["chat_field_phone_invalid"] + "</label>"
      );
    } else if (fieldName === "chat_privacy") {
      const superParent = parentField.parent().parent().parent().parent();
      superParent.append(
        '<label class="chat_error" for="' + fieldName + '">' + this.slugs["chat_field_required"] + "</label>"
      );
    }else if (fieldName === "chat_leave_message") {
       parentField.append(
        '<label class="chat_error" for="' + fieldName + '">' + this.slugs["chat_field_required"] + "</label>"
      );
    }

    $(".chat_error").each(function (index) {
      $(this).fadeIn(100);
    });
  },

  /// LOOKUP CLIENT
  lookupClient: function () {
    const wallet_id = $("#chat_myhf_id").val() || "";
    const email = $("#chat_myhf_email").val() || "";

    const isValidWalletId = this.validWalletId(wallet_id);
    const isValidEmail = this.validEmail(email);

    $(".chat_error").each(function (index) {
      $(this).remove();
    });

    if (!isValidWalletId) {
      this.showValidationError("chat_myhf_id");
    }
    if (!isValidEmail) {
      this.showValidationError("chat_myhf_email");
    }

    if (isValidWalletId && isValidEmail) {
      $("#account_not_found").hide();

      if (has_csrf === true) {
          var security_cookie = $("input[name='csrfmiddlewaretoken']").val();
      } else {
          try{
            var security_cookie = _xsrf ? _xsrf : LiveChat.getCookie("_xsrf");
          }catch(e){
            var security_cookie = $("input[name='_xsrf']").val();
          }
      }
      let params = {
        _xsrf: security_cookie,
        csrfmiddlewaretoken: security_cookie,
        wallet_id: wallet_id,
        email: email,
      };
      $.ajax({
        type: "POST",
        url: "/chat_lookup",
        data: params,
        async: true,
        success: function (data) {
          try {
            let response = JSON.parse(data);
            if (response.status) {
              $("#chat_myhf_id").val("");
              $("#chat_myhf_email").val("");

              LiveChat.userData = response.data;
              LiveChat.userData.lang = lp_chat_consts.lang;
              LiveChat.prepareQuestions(0);
              LiveChat.continueChat();
              LiveChat.userData.status = "POPUP_LOGGED_IN"
            } else {
              $("#account_not_found").fadeIn(100);
            }
          } catch (err) {
            // console.log(err);
          }
        },
        error: function (error) {
          // console.log(error);
        },
      });
    }
  },

  /// LOOKUP GUEST
  lookupGuest: function () {
    const fname = $("#chat_fname").val() || "";
    const lname = $("#chat_lname").val() || "";
    const email = $("#chat_email").val() || "";
    const phone = $("#chat_phone").val() || "";
    const privacy = $("#chat_privacy").attr("checked") ? 1 : 0;

    const isValidFName = LiveChat.validName(fname);
    const isValidLName = LiveChat.validName(lname);
    const isValidEmail = LiveChat.validEmail(email);
    const isValidPhone = LiveChat.validPhone(phone);
    const isValidPrivacy = LiveChat.validPrivacy(privacy);

    $(".chat_error").each(function (index) {
      $(this).remove();
    });

    if (!isValidFName) {
      LiveChat.showValidationError("chat_fname");
    }
    if (!isValidLName) {
        LiveChat.showValidationError("chat_lname");
    }
    if (!isValidEmail) {
        LiveChat.showValidationError("chat_email");
    }
    if (!isValidPhone) {
        LiveChat.showValidationError("chat_phone");
    }
    if (!isValidPrivacy) {
        LiveChat.showValidationError("chat_privacy");
    }

    if (isValidFName && isValidLName && isValidEmail && isValidPhone && isValidPrivacy) {
      $("#chat_fname").val("");
      $("#chat_lname").val("");
      $("#chat_email").val("");
      $("#chat_phone").val("");
      $("#chat_privacy").prop("checked", false);

      LiveChat.userData = {
        id: parseInt(Math.random() * 10000000000),
        fname: fname,
        lname: lname,
        branch: lp_chat_consts.branch,
        country: lp_chat_consts.country,
        lang: lp_chat_consts.lang,
        phone: phone,
        email: email,
        status: "VISITOR",
      };
      LiveChat.prepareQuestions(1);
      LiveChat.continueChat();
    }
  },

  ///IDENTITY FN
  identityFn: function (callback) {
    callback({
      iss: "https://www.hotforex.com",
      acr: "loa1",
      sub: LiveChat.userData.id,
    });
  },

  ///SEND EMAIL
  sendEmail: function () {
    $(".chat_error").each(function (index) {
      $(this).remove();
    });
    var text = $("#chat_leave_message").val() || "";
    if (text === "") {
      this.showValidationError("chat_leave_message");
    }else{
        if (has_csrf === true) {
            var security_cookie = $("input[name='csrfmiddlewaretoken']").val();
        } else {
            try{
                var security_cookie = _xsrf ? _xsrf : LiveChat.getCookie("_xsrf");
            }catch(e){
                var security_cookie = $("input[name='_xsrf']").val();
            }
        }

        let params = {
            _xsrf: security_cookie,
            csrfmiddlewaretoken: security_cookie,
            user_data: JSON.stringify(LiveChat.userData),
            url: window.location.href,
            body: text,
        };
        $.ajax({
            type: "POST",
            url: "/chat_send_email",
            data: params,
            async: true,
            success: function (data) {
                if(data === "OK"){
                    $("#chat_off_hours_leave_message").hide();
                    $("#chat_off_hours_success").show();
                }else{
                    $("#chat_leave_message").parent().append(
                        '<label class="chat_error" for="' + fieldName + '">' + this.slugs["chat_off_working_hours_email_error"] + "</label>"
                    );
                }
            },
            error: function (error) {
              // console.log(error);
            },
        });
    }
  },

  successEmailBack: function () {
    LiveChat.resetChat();
  },

  lpGetAuthenticationToken: function (callback) {
    var token_endpoint ="/liveChat"

    if (has_csrf === true) {
        var security_cookie = $("input[name='csrfmiddlewaretoken']").val();
    } else {
        try{
            var security_cookie = _xsrf ? _xsrf : LiveChat.getCookie("_xsrf");
        }catch(e){
            var security_cookie = $("input[name='_xsrf']").val();
        }
    }
    var data = {
        _xsrf: security_cookie,
        csrfmiddlewaretoken: security_cookie,
    };

    if(Object.keys(LiveChat.userData).length === 0){
        data['userData'] = atob(LiveChat.getCookie('chat_user_data'));
        token_endpoint ="/liveChatPublic";
    }
    else if(LiveChat.isVisitor && !LiveChat.loggedIn){
        data['userData'] = JSON.stringify(LiveChat.userData);
        token_endpoint ="/liveChatPublic";
    }
    $.post(
      token_endpoint,
      data,
      function (data, status) {
        var data = JSON.parse(data);
        callback(data.token);
      }
    );
  },

  getCookie: function (cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
  },
};
