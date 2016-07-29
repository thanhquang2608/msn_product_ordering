// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    var currentVersion = '1.0.8';
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
        $.get('http://server-masan.rhcloud.com/app/version/latest', function (data) {
        // $.get('http://server-masanbak.rhcloud.com/app/version/latest', function (data) {
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
                angular.bootstrap(document, ['OrderApp']);
            }
        });

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener('backbutton', backKeyDown, true);
        //if ("-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/)) {
        //var msViewportStyle = document.createElement("style");
        //msViewportStyle.appendChild(
        //    document.createTextNode("@-ms-viewport{width:auto!important}")
        //);
        //document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
        //}
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //alert('cordova ready ' + cordova.file);
        //cordova.file.write('test.json', { name: 'Nguyễn Văn A', token: 'hskajdh8979327984kjsđ8293' }, { create: true }, function () { console.log('write file success') }, function () { console.log('write file error') });
        var errorHandler = function (fileName, e) {
            var msg = '';

            switch (e.code) {
                case FileError.QUOTA_EXCEEDED_ERR:
                    msg = 'Storage quota exceeded';
                    break;
                case FileError.NOT_FOUND_ERR:
                    msg = 'File not found';
                    break;
                case FileError.SECURITY_ERR:
                    msg = 'Security error';
                    break;
                case FileError.INVALID_MODIFICATION_ERR:
                    msg = 'Invalid modification';
                    break;
                case FileError.INVALID_STATE_ERR:
                    msg = 'Invalid state';
                    break;
                default:
                    msg = 'Unknown error';
                    break;
            };

            alert('Error (' + fileName + '): ' + msg);
        }

        function writeToFile(fileName, data) {
            data = JSON.stringify(data, null, '\t');
            alert(cordova.file.dataDirectory);
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
                directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        fileWriter.onwriteend = function (e) {
                            // for real-world usage, you might consider passing a success callback
                            alert('Write of file "' + fileName + '"" completed.');
                        };

                        fileWriter.onerror = function (e) {
                            // you could hook this up with our global error handler, or pass in an error callback
                            console.log('Write failed: ' + e.toString());
                        };

                        var blob = new Blob([data], { type: 'text/plain' });
                        fileWriter.write(blob);
                    }, errorHandler.bind(null, fileName));
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }

        function readFromFile(fileName, cb) {
            var pathToFile = cordova.file.dataDirectory + fileName;
            alert(pathToFile);
            window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();

                    reader.onloadend = function (e) {
                        cb(JSON.parse(this.result));
                    };

                    reader.readAsText(file);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }

        var fileData;
        $('.createFile').on('click', function () {
            writeToFile('example.json', { foo: 'bar' });
        });
        $('.readFile').on('click', function () {
            readFromFile('example.json', function (data) {
                alert(JSON.stringify(data));
            });
        });
        $('.getFile').on('click', function () {
            var pathToFile = cordova.file.dataDirectory + 'example.json';
            alert(pathToFile);
            $.get(pathToFile, function (data) {
                alert(JSON.stringify(data));
            });
        });
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