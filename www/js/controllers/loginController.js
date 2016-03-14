'use strict';

app.controller('AuthController', function ($scope, $state, AuthService, USER_ROLES, USER_LEVELS) {
    function getUser() {
        if (AuthService.user()) {

            if (AuthService.user().ChangedPassword == 0) {
                $state.go("change-password", {}, { reload: true }).then(function () {
                }, function (err) {

                });
                return;
            }

            switch (AuthService.user().RoleId) {
                case USER_ROLES.DEALER: $state.go("tabs.dealer-list", {}, { reload: true });
                    break;
                case USER_ROLES.SALE:
                    switch (AuthService.user().Level) {
                        case USER_LEVELS.SALE_REP: $state.go("home.sale", {}, { reload: true }); break;
                        case USER_LEVELS.SALE_SUP: $state.go("home.sale-sup", {}, { reload: true }); break;
                        case USER_LEVELS.ASM: $state.go("home.sale", {}, { reload: true }); break;
                        case USER_LEVELS.RSM: $state.go("home.sale", {}, { reload: true }); break;
                        case USER_LEVELS.NSM: $state.go("home.sale", {}, { reload: true }); break;
                    }
                    break;
                case USER_ROLES.SC:
                    switch (AuthService.user().Level) {
                        case USER_LEVELS.SC: $state.go("home.sc", {}, { reload: true }); break;
                        case USER_LEVELS.SC_SUP: $state.go("home.sc-sup", {}, { reload: true }); break;
                    }
                    break;
                case USER_ROLES.ADMIN:
                    $state.go('home.admin', {}, { reload: true }); break;
            }
        }
        else {
            $state.go('login', {}, { reload: true });
        }
    }
    getUser();
})
    .controller('LoginController', function ($scope, $rootScope, $state, $modal, $log,
    AuthService, USER_ROLES, USER_LEVELS) {
        $scope.user = {};
        function getUser() {
            if (AuthService.user()) {

                if (AuthService.user().ChangedPassword == 0) {
                    $state.go("change-password", {}, { reload: true }).then(function () {
                    }, function (err) {
                        $rootScope.processRequestError(err);
                    });
                    return;
                }

                switch (AuthService.user().RoleId) {
                    case USER_ROLES.DEALER: $state.go("tabs.dealer-list", {}, { reload: true });
                        break;
                    case USER_ROLES.SALE:
                        switch (AuthService.user().Level) {
                            case USER_LEVELS.SALE_REP: $state.go("tabs.sale-list", {}, { reload: true }); break;
                            case USER_LEVELS.SALE_SUP: $state.go("tabs.sale-sup-list", {}, { reload: true }); break;
                            case USER_LEVELS.ASM: $state.go("tabs.asm-list", {}, { reload: true }); break;
                            case USER_LEVELS.RSM: $state.go("tabs.rsm-list", {}, { reload: true }); break;
                            case USER_LEVELS.NSM: $state.go("tabs.nsm-list", {}, { reload: true }); break;
                        }
                        break;
                    default: $state.go('login');
                }
            }
        }
        getUser();

        $scope.openLoading = function () {

            $scope.modal = $modal.open({
                animation: true,
                templateUrl: 'loading.html',
                size: 'sm',
                backdrop: 'static'
            });

            $scope.modal.result.then(function (from) {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                //alert('Modal dismissed at: ' + new Date());
            });
        };

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
                $scope.open("Bạn không có quyền thực hiện thao tác này!");
            }
            else if (response.status != 0 && response.status != 408) {
                //var alertPopup = $ionicPopup.alert({
                //    title: 'Thất bại!',
                //    template: err.data.message
                //});
                //alert(response.data.message);
                console.log(response);
                var msg = "Lỗi trong quá trình xử lý";
                if (response.data == null || response.data.message == null) {
                    msg = "Thao tác thất bại!";
                }
                else
                    msg = response.data.message;
                $scope.open(msg);
            }
            else {
                $scope.open("Kết nối thất bại. Kiểm tra lại đường truyền.");
            }
        }

        $scope.login = function () {
            $scope.openLoading();
            AuthService.login($scope.user).then(
               function (response) {
                   $scope.user.password = null;
                   console.log("SUCCESS")

                   console.log(AuthService.user());
                   if (AuthService.user().ChangedPassword == 0) {
                       $state.go("change-password", {}, { reload: true }).then(function () {
                           $scope.modal.dismiss('closing');
                       }, function (err) {
                           $scope.modal.dismiss('closing');
                           $rootScope.processRequestError(err);
                       });
                       return;
                   }

                   switch (AuthService.user().RoleId) {
                       case USER_ROLES.DEALER: $state.go("tabs.dealer-list", {}, { reload: true }).then(function () {
                           console.log("CLOSED");
                           $scope.modal.dismiss('closing');
                       }, function (err) {
                           $scope.modal.dismiss('closing');
                           $rootScope.processRequestError(err);
                       });
                           break;
                       case USER_ROLES.SALE:
                           switch (AuthService.user().Level) {
                               case USER_LEVELS.SALE_REP:
                                   $state.go("tabs.sale-list", {}, { reload: true }).then(function () {
                                       console.log("CLOSED");
                                       $scope.modal.dismiss('closing');
                                   }, function (err) {
                                       $scope.modal.dismiss('closing');
                                       $rootScope.processRequestError(err);
                                   }); break;
                               case USER_LEVELS.SALE_SUP:
                                   $state.go("tabs.sale-sup-list", {}, { reload: true }).then(function () {
                                       console.log("CLOSED");
                                       $scope.modal.dismiss('closing');
                                   }, function (err) {
                                       $scope.modal.dismiss('closing');
                                       $rootScope.processRequestError(err);
                                   }); break;
                               case USER_LEVELS.ASM:
                                   $state.go("tabs.asm-list", {}, { reload: true }).then(function () {
                                       console.log("CLOSED");
                                       $scope.modal.dismiss('closing');
                                   }, function (err) {
                                       $scope.modal.dismiss('closing');
                                       $rootScope.processRequestError(err);
                                   }); break;
                               case USER_LEVELS.RSM:
                                   $state.go("tabs.rsm-list", {}, { reload: true }).then(function () {
                                       console.log("CLOSED");
                                       $scope.modal.dismiss('closing');
                                   }, function (err) {
                                       $scope.modal.dismiss('closing');
                                       $rootScope.processRequestError(err);
                                   }); break;
                               case USER_LEVELS.NSM:
                                   $state.go("tabs.nsm-list", {}, { reload: true }).then(function () {
                                       console.log("CLOSED");
                                       $scope.modal.dismiss('closing');
                                   }, function (err) {
                                       $scope.modal.dismiss('closing');
                                       $rootScope.processRequestError(err);
                                   }); break;
                           }
                           break;
                       default:
                           $state.go("login", {}, { reload: true }).then(function () {
                               console.log("CLOSED");
                               $scope.modal.dismiss('closing');
                           }, function (err) {
                               $scope.modal.dismiss('closing');
                               $rootScope.processRequestError(err);
                           }); break;
                   }
               },

               function (err) {
                   $scope.modal.dismiss('closing');
                   $rootScope.processRequestError(err);
                   console.log("error")
               });
        }

    });