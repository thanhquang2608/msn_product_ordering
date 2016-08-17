'use strict';

app.controller('AppController', function ($scope, $translate,$log, $state, $modal, $rootScope,
    TranslateService, AuthService, USER_ROLES, USER_LEVELS) {
    $('#background').remove();
    // Language
    $scope.curLanguage = TranslateService.getDefaultLanguageKey();
    $scope.changeLanguage = function (key) {
        TranslateService.setDefaultLanguageKey(key);
        $translate.use(key);
        $scope.curLanguage = key;
        $rootScope.$broadcast('language-changed');
    }
    // Set default language
    $scope.changeLanguage($scope.curLanguage);

    $rootScope.$state = $state;
    AuthService.loadUserCredentials().then(function () {
        if (!AuthService.isAuthenticated()) {
            $state.go('login');
        }
        else {
            if (AuthService.user().ChangedPassword == 0) {
                $state.go("change-password", {}, { reload: true }).then(function () {
                }, function (err) {
                    $rootScope.processRequestError(err);
                });
                return;
            }
            switch (AuthService.user().RoleId) {
                case USER_ROLES.DEALER: $state.go("tabs.dealer-list", {}, { reload: true })
                    break;
                case USER_ROLES.SALE:
                    switch (AuthService.user().Level) {
                        case USER_LEVELS.SALE_REP:
                            $state.go("tabs.sale-list", {}, { reload: true }); break;
                        case USER_LEVELS.SALE_SUP:
                            $state.go("tabs.sale-sup-list", {}, { reload: true }); break;
                        case USER_LEVELS.ASM:
                            $state.go("tabs.asm-list", {}, { reload: true }); break;
                        case USER_LEVELS.RSM:
                            $state.go("tabs.rsm-list", {}, { reload: true }); break;
                        case USER_LEVELS.NSM:
                            $state.go("tabs.nsm-list", {}, { reload: true }); break;
                    }
                    break;
                default: $state.go('login');
            }
        }
        //else {
        //    switch (AuthService.user().RoleId) {
        //        case USER_ROLES.DEALER: $state.go("home.dealer", {}, { reload: true });
        //            break;
        //        case USER_ROLES.SALE: $state.go("home.sale", {}, { reload: true });
        //            break;
        //        case USER_ROLES.SC: $state.go("home.sc", {}, { reload: true });
        //            break;
        //    }
        //}
    });
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

        // AuthService.checkVersion(appVersion);
        if (!AuthService.isAuthenticated()) {
            if (next.name !== 'login') {
                event.preventDefault();
                $state.go('login');
            }
        }
    });

    $scope.open = function (msg) {

        $scope.modal = $modal.open({
            animation: true,
            templateUrl: 'errorModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'sm',
            resolve: {
                message: function () {
                    return msg;
                },
                mode: function () {
                    return 0;
                }
            }
        });

        $scope.modal.result.then(function (from) {

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
            //alert('Modal dismissed at: ' + new Date());
        });
    };

    $rootScope.processRequestError = function (response) {
        if (response.status == 403) {
            $scope.open($translate.instant('MESSAGE_PERMISION'));
        }
        else if (response.status != 0 && response.status != 408) {
            //var alertPopup = $ionicPopup.alert({
            //    title: 'Thất bại!',
            //    template: err.data.message
            //});
            //alert(response.data.message);
            console.log(response);
            var msg = $translate.instant('MESSAGE_PROCESS_ERR');
            if (response.data == null || response.data.message == null) {
                msg = $translate.instant('MESSAGE_ACTION_FAIL');
            }
            else
                msg = response.data.message;
            $scope.open(msg);
        }
        else {
            $scope.open($translate.instant('MESSAGE_NETWORK_ERR'));
        }
    }
})