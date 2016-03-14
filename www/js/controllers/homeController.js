'use strict';

app.controller('HomeController', function ($scope, $rootScope, $state, $interval, $modal, $log,
    AuthService, CommonService, DataService,
    USER_ROLES, ORDER_STATUS, USER_LEVELS, ROLE_FUNCTIONS, ROLE_LEVEL_2_NAME) {

    $scope.logout = function () {
        AuthService.logout();
        //DataService.setListFunction(null);
        $state.go('login', {}, { reload: true }).then(function () {
            DataService.setListFunction(null);
        });
    }


    $scope.username = 'GUEST';
    $scope.userRole = 0;
    $scope.roles = USER_ROLES;
    $scope.status = ORDER_STATUS;
    $scope.stateRef = "";

    $scope.functions = [];
    $scope.roleFunction = ROLE_FUNCTIONS;
    $scope.role2name = ROLE_LEVEL_2_NAME;

    function initFunctionList() {
        return CommonService.getFunctionList().then(function (data) {
            var idArr = [];
            for (var idx in data) {
                idArr.push(data[idx].FunctionId);
            }
            DataService.setListFunction(idArr);
            $scope.functions = DataService.getListFunction();
        }, function (err) {
        });
    }

    function initRoleList() {
        return CommonService.getRoleList().then(function (data) {
            var roleArr = [];
            for (var idx in data) {
                var item = {
                    RoleId: data[idx].RoleId,
                    LevelId: data[idx].Level
                }
                roleArr.push(item);
            }
            DataService.setListRole(roleArr);
            $scope.userRoles = DataService.getListRole();
        }, function (err) {
        });
    }

    getUser();

    function getUser() {
        if (AuthService.user().ChangedPassword == 0) {
            $state.go("change-password", {}, { reload: true }).then(function () {
            }, function (err) {
                $rootScope.processRequestError(err);
            });
            return;
        }

        var user = AuthService.user();
        $scope.userRole = user.RoleId;
        console.log("getUser");
        $scope.user = user;
        $scope.username = user.Name;

        var curStateName = $state.current.name;

        if (curStateName.indexOf('home.sale-sup') > -1) {
            $scope.stateRef = "home.sale-sup";
            $scope.currentRole = USER_ROLES.SALE;
            $scope.currentLevel = USER_LEVELS.SALE_SUP;
        }
        else if (curStateName.indexOf('home.sale') > -1) {
            $scope.stateRef = "home.sale";
            $scope.currentRole = USER_ROLES.SALE;
            $scope.currentLevel = USER_LEVELS.SALE_REP;
        }
        else if (curStateName.indexOf('home.sc-sup') > -1) {
            $scope.stateRef = "home.sc-sup";
            $scope.currentRole = USER_ROLES.SC;
            $scope.currentLevel = USER_LEVELS.SC_SUP;
        }
        else if (curStateName.indexOf('home.sc') > -1) {
            $scope.stateRef = "home.sc";
            $scope.currentRole = USER_ROLES.SC;
            $scope.currentLevel = USER_LEVELS.SC;
        }
        else if (curStateName.indexOf('home.dealer') > -1) {
            $scope.stateRef = "home.dealer";
            $scope.currentRole = USER_ROLES.DEALER;
            $scope.currentLevel = USER_LEVELS.DEALER;
        }
        else if (curStateName.indexOf('home.admin') > -1) {
            $scope.stateRef = "home.admin";
            $scope.currentRole = USER_ROLES.ADMIN;
            $scope.currentLevel = USER_LEVELS.ADMIN;
        }
        //switch (AuthService.user().RoleId) {
        //    case USER_ROLES.DEALER:        
        //        $scope.stateRef = "home.dealer";
        //        break;
        //    case USER_ROLES.SALE:
        //        switch (AuthService.user().Level) {
        //            case USER_LEVELS.SALE_REP:
        //                $scope.stateRef = "home.sale";
        //                break;
        //            case USER_LEVELS.SALE_SUP:
        //                $scope.stateRef = "home.sale-sup";
        //                break;
        //            case USER_LEVELS.ASM: 
        //                $scope.stateRef = "home.sale-sup";
        //                break;
        //            case USER_LEVELS.RSM: 
        //                $scope.stateRef = "home.sale-sup";
        //                break;
        //            case USER_LEVELS.NSM: 
        //                $scope.stateRef = "home.sale-sup";
        //                break;
        //        }
        //        break;
        //    case USER_ROLES.SC:
        //        switch (AuthService.user().Level) {
        //            case USER_LEVELS.SC: 
        //                $scope.stateRef = "home.sc"; 
        //                break;
        //            case USER_LEVELS.SC_SUP: 
        //                $scope.stateRef = "home.sc-sup";
        //                break;
        //        }
        //        break;
        //    case USER_ROLES.ADMIN:
        //        $scope.stateRef = "home.admin";
        //        break;
        //}
    }

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        var prevStateName = fromState.name;
        if (prevStateName.indexOf('home.sale-sup') > -1) {
            $scope.stateRef = "home.sale-sup";
        }
        else if (prevStateName.indexOf('home.sale') > -1) {
            $scope.stateRef = "home.sale";
        }
        else if (prevStateName.indexOf('home.sc-sup') > -1) {
            $scope.stateRef = "home.sc-sup";
        }
        else if (prevStateName.indexOf('home.sc') > -1) {
            $scope.stateRef = "home.sc";
        }
        else if (prevStateName.indexOf('home.dealer') > -1) {
            $scope.stateRef = "home.dealer";
        }
        else if (prevStateName.indexOf('home.admin') > -1) {
            $scope.stateRef = "home.admin";
        }

        if (toState.name.indexOf('home.sale-sup') > -1) {
            $scope.stateRef = "home.sale-sup";
            $scope.currentRole = USER_ROLES.SALE;
            $scope.currentLevel = USER_LEVELS.SALE_SUP;
        }
        else if (toState.name.indexOf('home.sale') > -1) {
            $scope.stateRef = "home.sale";
            $scope.currentRole = USER_ROLES.SALE;
            $scope.currentLevel = USER_LEVELS.SALE_REP;
        }
        else if (toState.name.indexOf('home.sc-sup') > -1) {
            $scope.stateRef = "home.sc-sup";
            $scope.currentRole = USER_ROLES.SC;
            $scope.currentLevel = USER_LEVELS.SC_SUP;
        }
        else if (toState.name.indexOf('home.sc') > -1) {
            $scope.stateRef = "home.sc";
            $scope.currentRole = USER_ROLES.SC;
            $scope.currentLevel = USER_LEVELS.SC;
        }
        else if (toState.name.indexOf('home.dealer') > -1) {
            $scope.stateRef = "home.dealer";
            $scope.currentRole = USER_ROLES.DEALER;
            $scope.currentLevel = USER_LEVELS.DEALER;
        }
        else if (toState.name.indexOf('home.admin') > -1) {
            $scope.stateRef = "home.admin";
            $scope.currentRole = USER_ROLES.ADMIN;
            $scope.currentLevel = USER_LEVELS.ADMIN;
        }

        if (toState.name == "home") {
            console.log("HOME");

            if (prevStateName.indexOf('home.sale-sup') > -1) {
                $state.go("home.sale-sup", {}, { reload: true });
            }
            else if (prevStateName.indexOf('home.sale') > -1) {
                $state.go("home.sale", {}, { reload: true });
            }
            else if (prevStateName.indexOf('home.sc-sup') > -1) {
                $state.go("home.sc-sup", {}, { reload: true });
            }
            else if (prevStateName.indexOf('home.sc') > -1) {
                $state.go("home.sc", {}, { reload: true });
            }
            else if (prevStateName.indexOf('home.dealer') > -1) {
                $state.go("home.dealer", {}, { reload: true });
            }
            else if (prevStateName.indexOf('home.admin') > -1) {
                $state.go("home.admin", {}, { reload: true });
            }

            //    switch (AuthService.user().RoleId) {
            //        case USER_ROLES.DEALER: $state.go("home.dealer", {}, { reload: true });
            //            break;
            //        case USER_ROLES.SALE:
            //            switch (AuthService.user().Level) {
            //                case USER_LEVELS.SALE_REP: $state.go("home.sale", {}, { reload: true }); break;
            //                case USER_LEVELS.SALE_SUP: $state.go("home.sale-sup", {}, { reload: true }); break;
            //                case USER_LEVELS.ASM: $state.go("home.sale", {}, { reload: true }); break;
            //                case USER_LEVELS.RSM: $state.go("home.sale", {}, { reload: true }); break;
            //                case USER_LEVELS.NSM: $state.go("home.sale", {}, { reload: true }); break;
            //            }
            //            break;
            //        case USER_ROLES.SC:
            //            switch (AuthService.user().Level) {
            //                case USER_LEVELS.SC: $state.go("home.sc", {}, { reload: true }); break;
            //                case USER_LEVELS.SC_SUP: $state.go("home.sc-sup", {}, { reload: true }); break;
            //            }
            //            break;
            //        case USER_ROLES.ADMIN:
            //            $state.go('home.admin', {}, { reload: true }); break;
            //    }
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
            $scope.open("Kết nối thất bại");
        }
    }

    //CommonService.getFactories().then(function (data) {
    //    //console.log(data)
    //    DataService.setFactories(data);
    //}, function (error) {
    //    console.log(error)
    //});

    //CommonService.getLabels().then(function (data) {
    //    //console.log(data)
    //    DataService.setLabels(data);
    //}, function (error) {
    //    console.log(error)
    //});

    $scope.loadOrderInMonth = function () {
        $rootScope.loadOrderInMonth();
    }

    $scope.loadOrderByStatus = function (statusId) {
        console.log(statusId);
        $rootScope.loadOrderByStatus(statusId);
    }

    $scope.gotoState = function (roleId, level) {
        switch (roleId) {
            case USER_ROLES.DEALER: $state.go("home.dealer", {}, { reload: true });
                break;
            case USER_ROLES.SALE:
                switch (level) {
                    case USER_LEVELS.SALE_REP: $state.go("home.sale", {}, { reload: true }); break;
                    case USER_LEVELS.SALE_SUP: $state.go("home.sale-sup", {}, { reload: true }); break;
                    case USER_LEVELS.ASM: $state.go("home.sale", {}, { reload: true }); break;
                    case USER_LEVELS.RSM: $state.go("home.sale", {}, { reload: true }); break;
                    case USER_LEVELS.NSM: $state.go("home.sale", {}, { reload: true }); break;
                }
                break;
            case USER_ROLES.SC:
                switch (level) {
                    case USER_LEVELS.SC: $state.go("home.sc", {}, { reload: true }); break;
                    case USER_LEVELS.SC_SUP: $state.go("home.sc-sup", {}, { reload: true }); break;
                }
                break;
            case USER_ROLES.ADMIN:
                $state.go('home.admin', {}, { reload: true }); break;
        }
    }

    $scope.init = function () {
        initRoleList();
    }
});