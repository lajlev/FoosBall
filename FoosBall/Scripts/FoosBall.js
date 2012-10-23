﻿jQuery(window).load(function() {
    $.globals = {
        errorState: {}
    };
    
    /* ******************************************************************
     * jQuery Ajax default configuration
     */
    $.ajaxSetup({
        type: 'post',
        cache: false,
        error: function (jqHxr, statusText, errorThrown) {
            displayErrorMessage(statusText + ': ' + errorThrown);
        }
    });
});

/* ******************************************************************
 * Custom js functions
 */
function displayErrorMessage(errorMessage, selector) {
    $.globals.errorState[selector] = true;
    var $container = (!!selector === true) ? $(".validation-message." + selector) : $(".validation-message.All");
    if ($container.size() !== false) {
        $container.html(errorMessage).show();
    } else {
        alert(selector + " error: " + errorMessage);
    }
}

function clearErrorMessage(selector) {
    $.globals.errorState[selector] = false;
    var $container = (!!selector === true) ? $(".validation-message." + selector) : $(".validation-message");
    $container.html("").hide();
}

function log(str) {
    console.log(str);
}

function errorState() {
    var state = false;

    $.each($.globals.errorState, function (key, value) {
        if (value) {
            return state = true;
        }
    });
    
    return state;
}