// Strict regulations: show the popup in the middle with blur background
var strict_regulations = ['HFCY', 'HFAE', 'HFUK', 'HFZA', 'HFKE', 'HFSV', 'HFSC'];
var is_strict_regulator = ($.inArray(regulator_from_html, strict_regulations) !== -1);

// Pre-selected categories: makes the categories' checkbox True by default
var regulators_pre_selected_categories = ['HFSV', 'HFZA', 'HFKE'];
var pre_select_categories = ($.inArray(regulator_from_html, regulators_pre_selected_categories) !== -1);

// Pre-accepted cookies: save the cookies in users' browser (even if the users haven't answered yet)
// This works only if categories' checkbox is set True by default
var regulators_pre_accepted_cookies = ['HFSV', 'HFZA', 'HFKE'];
var pre_accept_cookies = ($.inArray(regulator_from_html, regulators_pre_accepted_cookies) !== -1);

// Special Style: for non regulated regulations
var regulators_special_style = ['HFSV', 'HFZA', 'HFKE'];
var has_special_style = ($.inArray(regulator_from_html, regulators_special_style) !== -1);

var all_cookies = {
    "analytical": [
        // data-specific-name="twitter"
        // nothing

        // data-specific-name="google-tag-manager"
        "_gcl_au",
        /^_gcl_au.*?$/,

        // data-specific-name="google-conversion"
        "utma",
        "__utma",
        "__utmb",
        "__utmc",
        "__utmt",
        "__utmz",

        // data-specific-name="google-analytics"
        "_ga",
        "_gat",
        "_gid",
        "OTZ",
        /^_gat_.*?$/,
        /^_ga_.*?$/,
        /^__gac_gb_.*?$/,

        // data-specific-name="hotjar"
        "_hjAbsoluteSessionInProgress",
        "_hjAbsoluteSessionInProgress",
        "_hjCachedUserAttributes",
        "_hjClosedSurveyInvites",
        "_hjDonePolls",
        "_hjFirstSeen",
        "_hjid",
        "_hjIncludedInPageviewSample",
        "_hjIncludedInSessionSample",
        "_hjLocalStorageTest",
        "_hjMinimizedPolls",
        "_hjOptOut",
        "_hjRecordingEnabled",
        "_hjRecordingLastActivity",
        "_hjSessionRejected",
        "_hjSessionResumed",
        "_hjSessionTooLarge",
        "_hjShownFeedbackMessage",
        "_hjTLDTest",
        "_hjUserAttributesHash",
        "_hjViewportId",
        "hjSiteLang",
        "X-Access-Key",
        /^_hjSession_.*?$/,
        /^_hjSessionUser_.*?$/,

        // microsoft-bing
        "_clck",
        "_clsk",
        "_uetsid",
        "_uetvid",

        // general
        "1P_JAR", // conversion rates
        "APISID", // Google Ads Optimization
        "SAPISID", // Collect user information for videos hosted by YouTube
        "OGPC", // Google Maps
        "pvc_visits[0]",
        /^pvc_visits.*?$/,
        "RUL",
    ],
    "marketing": [
        // adroll (video tutorials - MTE Media)
        "__ar_v4",
        "__adroll_fpc",

        // data-specific-name="baidu-analytics"
        /^Hm_lvt_.*?$/,
        /^Hm_lpvt_.*?$/,
        "Hm_lpvt",
        "Hm_lvt_",

        // data-specific-name="facebook-pixel"
        "_fbp",

        // general
        "anid",
        "webinar",
    ],
}

/* See documentation: https://github.com/empreinte-digitale/orejime#configuration */
var orejimeConfig = {
    elementID: "orejime",
    cookieName: "orejime",
    cookieExpiresAfterDays: 365,
    cookieDomain: call_domain_from_html,
    stringifyCookie: (contents) => encodeURI(JSON.stringify(contents)),
    parseCookie: (cookie) => JSON.parse(decodeURI(cookie)),
    privacyPolicy: "javascript:openCookiePolicy('" + current_lang + "', '" + regulator_from_html + "', '" + call_domain_from_html + "');",
    default: true,
    mustConsent: false,
    mustNotice: false,
    logo: false,
    debug: false,
    lang: "en", // current_lang - if you enable other languages you should add each translations in below Json
    translations: {
        en: {
            consentModal: {
                title: translation_modal_title,
                description: translation_modal_description,
                privacyPolicy: {
                    name: translation_modal_policy_pdf_name,
                    text: translation_modal_policy_text
                }
            },
            consentNotice: {
                title: translation_popup_title,
                changeDescription: translation_modal_change_description,
                description: has_special_style ? translation_modal_small_popup_description_special : translation_modal_small_popup_description,
                learnMore: translation_learn_more,
                privacyPolicy: {
                    name: "",
                    text: ""
                }
            },
            "functional": {
                title: translation_category_functional,
                description: translation_purpose_functional,
            },
            "analytical": {
                title: translation_category_analytical,
                description: translation_purpose_analytical,
            },
            "marketing": {
                title: translation_category_marketing,
                description: translation_purpose_marketing,
            },
            accept: has_special_style ? translation_continue : translation_accept,
            acceptTitle: translation_accept_btn_title,
            acceptAll: translation_accept_all,
            save: translation_save,
            saveData: translation_save_description,
            decline: translation_decline,
            declineAll: translation_decline_all,
            close: translation_close,
            enabled: translation_enabled,
            disabled: translation_disabled,
            app: {
                optOut: {
                    title: "", /* translation_opt_out */
                    description: "", /* translation_opt_out_description */
                },
                required: {
                    title: translation_always_required,
                    description: translation_always_required_description
                },
            },
            poweredBy: "",  // Powered by Orejime - keep it empty, to disappear it from popup
            newWindow: "", // new window - keep it empty, to disappear it from popup
        },
    },
    apps: [
        // Functional
        {
            name: "functional",
            cookies: [],
            required: true,
            optOut: false,
        },

        // Analytical
        {
            name: "analytical",
            cookies: all_cookies['analytical'],
            required: false,
            default: pre_select_categories ? true : false,
            optOut: pre_accept_cookies  ? true : false,
        },

        // Marketing
        {
            name: "marketing",
            cookies: all_cookies['marketing'],
            required: false,
            default: pre_select_categories ? true : false,
            optOut: pre_accept_cookies  ? true : false,
        },
    ],

    // These categories are hided with CSS,
    // but we need to keep the below code in order for the functionality to work
    categories: [
        {name: "functional", title: "Functional", apps: ['functional']},
        {name: "analytical", title: "Analytical", apps: ['analytical']},
        {name: "marketing", title: "Marketing", apps: ['marketing']},
    ]
}

/* Customize plugin */
var popup_identifier = '#orejime .orejime-AppContainer .orejime-Notice';
var popup_appear_class = 'orejimeHtml-popup-appear';
var popup_answered_class = 'orejimeHtml-popup-answered';
var strict_class = 'orejimeHtml-strict';
var special_style_class = 'orejimeSpecialReg';
var buttons_identifier = '.orejime-Button--save, .orejime-Button--decline, .orejime-Modal-saveButton';

$(document).ready(function() {

    addClassForSpecialStyle(special_style_class);

    $('.orejime-Notice-actionItem--info button, .orejime-cookie-settings').click(function() {
        add_extra_description();
    });

    $('html').click(function() {
        add_title_icon();
    });

    setTimeout(function(){
        // If small popup appears, then add 'appear' class in HTML
        addClassIfPopupAppears(popup_identifier, popup_appear_class);

        // If small popup does not appears, then add 'answered' class in HTML
        addClassIfPopupAnswered(popup_identifier, popup_answered_class);

        // Add class for strict regulators
        addClassStrictRegulators(strict_class);

        // If accept/decline buttons clicked, then remove popup-appear class & add popup-answered class
        changeAppearToAnswered(buttons_identifier, popup_appear_class, popup_answered_class);

        // If learn more btn is clicked, then do again the above
        $('.orejime-Notice-learnMoreButton').click(function() {
            changeAppearToAnswered(buttons_identifier, popup_appear_class, popup_answered_class);
        });

        add_title_icon();
    }, 1000);
});

/* Call plugin */
var orejime_item = Orejime.init(orejimeConfig);

/* Functions */
function openCookiePolicy(lang_from_html, reg_from_html, domain_from_html) {
    pdf_link = "https://" + call_domain_from_html + "/getTerms?type=cookie_policy&lang=" + lang_from_html + "&branch=" + reg_from_html;
    /*if (call_domain_from_html.indexOf("hfm.com") >= 0) {
        pdf_link += "&branch=" + reg_from_html
    }*/
    window.open(pdf_link);
    var learn_more_btn = $('.orejime-Notice-actionItem--info button');
    learn_more_btn.first().trigger('click');

    var cookie_settings = $('.orejime-cookie-settings');
    cookie_settings.first().trigger('click');

    setTimeout(function(){
        add_title_icon();
        add_extra_description();
        changeAppearToAnswered(buttons_identifier, popup_appear_class, popup_answered_class);
    }, 500);
}
function addClassForSpecialStyle(class_name) {
    if (has_special_style === true) {
        $('html').addClass(class_name);
    }
}
function add_extra_description() {
    $('.orejime-Modal-other-description').remove();
    $('.orejime-Modal-description').append('<p class="orejime-Modal-other-description">'+translation_modal_other_description+'</p>');
}
function add_title_icon() {
    $('.orejime-notice-title-icon').remove();
    $('#orejime-notice-title').prepend('<span class="orejime-notice-title-icon"><i class="fas fa-cookie-bite"></i></span>');
}
function addClassIfPopupAppears(popup, class_name) {
    if ($(popup).length > 0 && $('html').hasClass(class_name) === false) {
        $('html').addClass(class_name);
    }
}
function addClassIfPopupAnswered(popup, class_name) {
    if ($(popup).length < 1 && $('html').hasClass(class_name) === false) {
        $('html').addClass(class_name);
    }
}
function changeAppearToAnswered(buttons, appear_class, answered_class) {
    $(buttons).click(function () {
        $('html').removeClass(appear_class);
        $('html').addClass(answered_class);
    });
}
function addClassStrictRegulators(class_name) {
    if (is_strict_regulator === true) {
        $('html').addClass(class_name);
    }
}

/*
setTimeout(function() {
    $(".orejime-AppToggles-enableAll").click(function(){
        console.log('clicked');
        $(".orejime-Button--save").click();
    });
    $(".orejime-AppToggles-disableAll").click(function(){
        console.log('clicked');
        $(".orejime-Button--save").click();
    });
}, 3000);
*/