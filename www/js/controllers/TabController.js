﻿app.controller('TabController', function ($rootScope, $scope, $stickyState, $state, $modal, $log, $translate, $localstorage,
    AuthService, CommonService, TranslateService,
    AUTH_EVENTS, NETWORK_EVENTS, USER_ROLES, USER_LEVELS) {
    $scope.setTabVisibility = function (flag1, flag2) {
        if (document.getElementById("tab"))
            document.getElementById("tab").style.visibility = flag1;
        if (document.getElementById("bar"))
            document.getElementById("bar").style.visibility = flag2;
    }
    // $localstorage.writeFile();
    $scope.backPage = function () {
        $state.go($scope.prevState);
        //try {
        //    window.history.back();
        //}
        //catch (ex) {
        //    window.alert(ex);
        //}
    }
    $scope.prevState = '';
    $scope.role = '';
    function getUser() {
        switch (AuthService.user().RoleId) {
            case USER_ROLES.DEALER: $scope.role = 'dealer';
                break;
            case USER_ROLES.SALE:
                switch (AuthService.user().Level) {
                    case USER_LEVELS.SALE_REP:
                        $scope.role = 'sale'; break;
                    case USER_LEVELS.SALE_SUP:
                        $scope.role = 'sale-sup'; break;
                    case USER_LEVELS.ASM:
                        $scope.role = 'asm'; break;
                    case USER_LEVELS.RSM:
                        $scope.role = 'rsm'; break;
                    case USER_LEVELS.NSM:
                        $scope.role = 'nsm'; break;
                }
        }

        CommonService.checkResetPassword().then(function (data) {
            if (data.ChangedPassword == 0) {
                $state.go('change-password', {}, { reload: true });
            }
        }, function () {
        });
    }

    getUser();

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, $translate) {
        if (fromState.name == 'tabs.' + $scope.role + '-list' && toState.name == 'tabs.' + $scope.role + '-list-order-detail') {
            $scope.title = "OrderDetail";
            $scope.setTabVisibility('hidden', 'visible');
        }
        else if (fromState.name == 'tabs.' + $scope.role + '-order' && toState.name == 'tabs.' + $scope.role + '-order-review') {
            $scope.title = "OrderReview";
            $scope.setTabVisibility('hidden', 'visible');
        }
        else // if (toState.name == 'tabs.dealer-list' && fromState.name == 'tabs.dealer-list-order-detail')
            $scope.setTabVisibility('visible', 'hidden');

        if (toState.name == 'tabs.' + $scope.role + '-list-order-detail')
            $scope.prevState = 'tabs.' + $scope.role + '-list';
        else if (toState.name == 'tabs.' + $scope.role + '-order-review')
            $scope.prevState = 'tabs.' + $scope.role + '-order';

        console.log($scope.prevState);

    });

    //$rootScope.$on('$stateChangeSuccess', function () {

    //    if ($state.current.name != ('tabs.' + $scope.role + '-list')) {
    //        console.log($state.current.name);
    //        $("html, body").animate({ scrollTop: 0 }, 200);
    //    }
    //})

    $rootScope.TIME_OUT = 60000;

    $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
        //var alertPopup = $ionicPopup.alert({
        //    title: 'Unauthorized!',
        //    template: 'You are not allowed to access this resource.'
        //});
        alert('You are not allowed to access this resource.');
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
        AuthService.logout();
        $state.go('login');
        //var alertPopup = $ionicPopup.alert({
        //    title: 'Session Lost!',
        //    template: 'Sorry, You have to login again.'
        //});
        alert('Sorry, You have to login again.');
    });

    $scope.$on(NETWORK_EVENTS.nointernet, function (event) {
        $ionicLoading.hide();
        //var alertPopup = $ionicPopup.alert({
        //    template: 'Không kết nối được với server'
        //});
        alert('Không kết nối được với server');
    });

    $scope.$on(NETWORK_EVENTS.timeout, function (event) {
        $ionicLoading.hide();
        //var alertPopup = $ionicPopup.alert({
        //    template: 'Kết nối timeout'
        //});
        alert('Kết nối timeout');
    })

    $rootScope.$on('uploadImagesFinishDealer', function (event) {
        console.log('uploadImagesFinishDealer');
        $scope.$apply(function () {
            $scope.uploadImageFinish = true;

        })
    });

    $scope.open = function (msg) {
        if (!$scope.modal) {
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
                $scope.modal = null;
            });
        }
    };
    //$rootScope.processRequestError = function (response) {
    //    if (response.status == 403) {
    //        $scope.open($translate.instant('MESSAGE_PERMISION'));
    //    }
    //    else if (response.status != 0 && response.status != 408) {
    //        //var alertPopup = $ionicPopup.alert({
    //        //    title: 'Thất bại!',
    //        //    template: err.data.message
    //        //});
    //        //alert(response.data.message);
    //        console.log(response);
    //        var msg = $translate.instant('MESSAGE_PROCESS_ERR');
    //        if (response.data == null || response.data.message == null) {
    //            msg = $translate.instant('MESSAGE_ACTION_FAIL');
    //        }
    //        else
    //            msg = response.data.message;
    //        $scope.open(msg);
    //    }
    //    else {
    //        $scope.open($translate.instant('MESSAGE_NETWORK_ERR'));
    //    }
    //}
});