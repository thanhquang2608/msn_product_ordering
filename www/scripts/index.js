// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

(function () {
    "use strict";
    var currentVersion = '1.0.9';
    var curLanguage = 'vi';
    var languagePack = {
        'en': {
            'title': 'Please update latest version',
            'versionTitle': 'Current version: ',
            'back1': 'Press ',
            'back2': 'again to exit'
        },
        'vi': {
            'title': 'Vui lòng cập nhật phiên bản mới nhất để tiếp tục sử dụng ứng dụng',
            'versionTitle': 'Phiên bản hiện tại: ',
            'back1': 'Nhấn nút ',
            'back2': 'lần nữa để thoát'
        }
    };

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        console.log('device ready');  
        curLanguage = localStorage.getItem('AncoLanguageKey') || 'vi';
        sqliteHelper.init().then(function () {
            $.get('http://server-masanbak.rhcloud.com/app/version/latest', function (data) {
                if (currentVersion.localeCompare(data.AppVersionCode) === -1 && data.ForceUpdate === 1) {
                    var $content = $('<div class="login-background text-center" style="min-width: 100%; min-height: 100%;position: absolute;top: 0;left: 0;bottom: 0;vertical-align: middle;">' +
                        //'<img src="masan-nutri-transparent.png" style="max-width: 100%; max-height: 100%;position: absolute;top: 0;left: 0;" />' +
                        '<form class="form-signin" id="loginForm" style="padding-top: 100px;display: inline-block; width: 85%" ng-submit="login(user)">' +
                            '<div class="login-main">' +
                                '<h3 class="text-center">' + languagePack[curLanguage].title + '</h1>' +
                                '<div class="text-center">' + languagePack[curLanguage].versionTitle + currentVersion + '</div>' +
                            '</div>' +
                        '</form>' +
                    '</div>');
                    $('body').append($content);
                }
                else {
                    //alert('Boot angular');
                    angular.bootstrap(document, ['OrderApp']);
                }
            });
        });       

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener('backbutton', backKeyDown, true);
    };
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    var countExit = 0;
    function backKeyDown(e) {
        e.preventDefault();
        countExit++;
        if (countExit == 1) {
            $('#UIContent').append('<div id="alertDiv" class="alert alert-danger text-center" style="position: fixed; bottom: 0px; width: 90%; z-index: 9999; margin-left: 5%; margin-right: 5%"><h4><strong>' +
                languagePack[curLanguage].back1 + '<i class="glyphicon glyphicon-arrow-left"></i> ' + languagePack[curLanguage].back2 + '</strong></h4></div>');
            setTimeout(function () {
                countExit = 0;
                $('#alertDiv').remove();
            }, 2000);
        }
        else if (countExit == 2) {
            navigator.app.exitApp();
        }
        // do something here if you wish
        //alert('go back!');
    }
})();