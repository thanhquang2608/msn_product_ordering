﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    
    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        document.addEventListener('backbutton', backKeyDown, true);
            //if ("-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/)) {
            //var msViewportStyle = document.createElement("style");
            //msViewportStyle.appendChild(
            //    document.createTextNode("@-ms-viewport{width:auto!important}")
            //);
            //document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
            //}
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function backKeyDown(e) {
        e.preventDefault();
        // do something here if you wish
        //alert('go back!');
    }
} )();