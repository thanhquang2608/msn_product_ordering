'use strict';

app.controller('UserController', function ($scope, $rootScope, $state, $modal, $log,
    AuthService,
    USER_ROLES, USER_LEVELS) {
    $scope.submit = false;

    // on refresh - close tab - exit browser
    //window.addEventListener("beforeunload", function (e) {
    //    AuthService.logout();
    //    //var confirmationMessage = "\o/";

    //    //(e || window.event).returnValue = confirmationMessage; //Gecko + IE
    //    //return confirmationMessage;                            //Webkit, Safari, Chrome
    //});

    function getUser() {
        if (!AuthService.isAuthenticated() || AuthService.user().ChangedPassword != 0)
            $state.go('login');
    }
    getUser();

    $scope.changePassword = function (isValid) {
        $scope.submit = true;
        if (!isValid || $scope.password != $scope.rePassword)
            return;
        $scope.openLoading();
        AuthService.changePassword($scope.password).then(function () {
            AuthService.updateUser().then(function () {
                switch (AuthService.user().RoleId) {
                    case USER_ROLES.DEALER: $state.go("tabs.dealer-list", {}, { reload: true }).then(function () {
                        console.log("CLOSED");
                        if ($scope.modal) $scope.modal.dismiss('closing');
                    }, function (err) {
                        if ($scope.modal) $scope.modal.dismiss('closing');
                        $rootScope.processRequestError(err);
                    });
                        break;
                    case USER_ROLES.SALE:
                        switch (AuthService.user().Level) {
                            case USER_LEVELS.SALE_REP:
                                $state.go("tabs.sale-list", {}, { reload: true }).then(function () {
                                    console.log("CLOSED");
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                }, function (err) {
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                    $rootScope.processRequestError(err);
                                }); break;
                            case USER_LEVELS.SALE_SUP:
                                $state.go("tabs.sale-sup-list", {}, { reload: true }).then(function () {
                                    console.log("CLOSED");
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                }, function (err) {
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                    $rootScope.processRequestError(err);
                                }); break;
                            case USER_LEVELS.ASM:
                                $state.go("tabs.asm-list", {}, { reload: true }).then(function () {
                                    console.log("CLOSED");
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                }, function (err) {
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                    $rootScope.processRequestError(err);
                                }); break;
                            case USER_LEVELS.RSM:
                                $state.go("tabs.rsm-list", {}, { reload: true }).then(function () {
                                    console.log("CLOSED");
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                }, function (err) {
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                    $rootScope.processRequestError(err);
                                }); break;
                            case USER_LEVELS.NSM:
                                $state.go("tabs.nsm-list", {}, { reload: true }).then(function () {
                                    console.log("CLOSED");
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                }, function (err) {
                                    if ($scope.modal) $scope.modal.dismiss('closing');
                                    $rootScope.processRequestError(err);
                                }); break;
                        }
                        break;
                    default: $state.go('login');
                }
            });            
        }, function (err) {
            if ($scope.modal) $scope.modal.dismiss('closing');
            $rootScope.processRequestError(err);
        });
    }

    $scope.openLoading = function () {

        $scope.modal = $modal.open({
            animation: true,
            templateUrl: 'progress.html',
            size: 'sm',
            backdrop: 'static',
            keyboard: false
        });

        $scope.modal.result.then(function (from) {

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
            //alert('Modal dismissed at: ' + new Date());
        });
    };

    //$rootScope.processRequestError = function (response) {
    //    if (response.status == 403) {
    //        $scope.open("Bạn không có quyền thực hiện thao tác này!");
    //    }
    //    else if (response.status != 0 && response.status != 408) {
    //        //var alertPopup = $ionicPopup.alert({
    //        //    title: 'Thất bại!',
    //        //    template: err.data.message
    //        //});
    //        //alert(response.data.message);
    //        console.log(response);
    //        var msg = "";
    //        if (response.data == null || response.data.message == null) {
    //            msg = "Thao tác thất bại!";
    //        }
    //        else
    //            msg = response.data.message;
    //        $scope.open(msg);
    //    }
    //    else {
    //        $scope.open("Kết nối thất bại");
    //    }
    //}
});