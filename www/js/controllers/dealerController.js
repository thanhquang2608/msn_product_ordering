'use strict';

app
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, message, mode) {

    //    $scope.camera = function () {
    //        $modalInstance.close(0);
    //    };
    //    $scope.album = function () {
    //        $modalInstance.close(1);
    //    };
    $scope.reason = "";
    $scope.ok = function () {

        if (mode) {
            $modalInstance.close($scope.reason);
        }
        else {
            $modalInstance.close(1);
        }
    };

    $scope.message = message;
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})
.controller('ModalInstanceViewItemCtrl', function ($scope, $modalInstance, index, item) {

    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        //console.log((j ? i.substr(0, j) + t : ""));
        ////console.log(i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t));
        //console.log(Math.abs(n - i).toString().slice(2));
        //console.log((parseFloat(Math.abs(n - i).toFixed(c))).toString());
        //console.log((c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : ""));
        //return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : "");
    };

    $scope.format = function (number, float) {
        //number = parseInt(number);
        if (typeof number === 'string')
            number = parseInt(number);
        if (number == 0)
            return 0;
        if (number)
            return number.formatMoney(float, '.', ',');
        else
            return '';
    }

    $scope.item = item;
    $scope.index = index;
    $scope.ok = function () {
        $modalInstance.close(1);

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})
.controller('ModalInstanceViewItemPreviewCtrl', function ($scope, $modalInstance, index, order) {

    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        //console.log((j ? i.substr(0, j) + t : ""));
        ////console.log(i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t));
        //console.log(Math.abs(n - i).toString().slice(2));
        //console.log((parseFloat(Math.abs(n - i).toFixed(c))).toString());
        //console.log((c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : ""));
        //return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : "");
    };

    $scope.format = function (number, float) {
        //number = parseInt(number);
        if (typeof number === 'string')
            number = parseInt(number);
        if (number == 0)
            return 0;
        if (number)
            return number.formatMoney(float, '.', ',');
        else
            return '';
    }

    $scope.order = order;
    $scope.index = index;
    $scope.ok = function () {
        $modalInstance.close(1);

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})
.controller('ModalInstanceNewItemCtrl', function ($scope, $modalInstance, AuthService, CommonService, products, roleId, level) {
    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        //console.log((j ? i.substr(0, j) + t : ""));
        ////console.log(i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t));
        //console.log(Math.abs(n - i).toString().slice(2));
        //console.log((parseFloat(Math.abs(n - i).toFixed(c))).toString());
        //console.log((c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : ""));
        //return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : "");
    };

    $scope.format = function (number, float) {
        //number = parseInt(number);
        if (typeof number === 'string')
            number = parseInt(number);
        if (number == 0)
            return 0;
        if (number)
            return number.formatMoney(float, '.', ',');
        else
            return '';
    }
    $scope.products = products;
    $scope.specifies = [];
    $scope.order = {
        products: [],
        specifies: [],
        selectedProduct: undefined,
        selectedSpecify: undefined,
        numOrder: 1,
        totalQuantity: 0,
        totalPrice: 0
    }
    $scope.submited = false;
    $scope.isLabelLoading = false;

    $scope.loadSpecify = function (order) {
        $scope.isLabelLoading = true;
        CommonService.getSpecify(order.selectedProduct.ProductName, AuthService.user().Id, roleId, level).then(function (data) {
            console.log(data)
            $scope.order.specifies = data;
            $scope.isLabelLoading = false;
        }, function (error) {
            $scope.isLabelLoading = false;
            console.log(error)
            $rootScope.processRequestError(error);
        });
    }
    $scope.ok = function (isValid) {
        $scope.submited = true;
        if (!isValid)
            return;
        $modalInstance.close($scope.order);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.calculator = function (order) {
        console.log(order);
        console.log($scope.orderList);
        if (order) {
            order.totalQuantity = ((order.selectedSpecify.Weight * order.numOrder) / 1000);
            order.totalPrice = order.selectedSpecify.UnitPrice * order.numOrder;
        }
    }
})

.controller('ModalInstanceEditItemCtrl', function ($scope, $modalInstance, AuthService, CommonService, orderItem, products, roleId, level, index) {
    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        //console.log((j ? i.substr(0, j) + t : ""));
        ////console.log(i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t));
        //console.log(Math.abs(n - i).toString().slice(2));
        //console.log((parseFloat(Math.abs(n - i).toFixed(c))).toString());
        //console.log((c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : ""));
        //return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : "");
    };

    $scope.format = function (number, float) {
        //number = parseInt(number);
        if (typeof number === 'string')
            number = parseInt(number);
        if (number == 0)
            return 0;
        if (number)
            return number.formatMoney(float, '.', ',');
        else
            return '';
    }
    $scope.products = products;
    $scope.specifies = [];
    $scope.order = orderItem;
    $scope.index = index;
    $scope.submited = false;
    $scope.isLabelLoading = false;

    $scope.loadSpecify = function (order) {
        $scope.isLabelLoading = true;
        CommonService.getSpecify(order.selectedProduct.ProductName, AuthService.user().Id, roleId, level).then(function (data) {
            console.log(data)
            $scope.order.specifies = data;
            $scope.isLabelLoading = false;
        }, function (error) {
            $scope.isLabelLoading = false;
            console.log(error)
            $rootScope.processRequestError(error);
        });
    }
    $scope.ok = function (mode, isValid) {
        $scope.submited = true;
        if (!isValid)
            return;
        var data = { isRemove: 0, index: $scope.index, orderItem: $scope.order };
        if (mode == 2) {
            data.isRemove = 1;         
        }
         $modalInstance.close(data);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.calculator = function (order) {
        console.log(order);
        console.log($scope.orderList);
        if (order) {
            order.totalQuantity = ((order.selectedSpecify.Weight * order.numOrder) / 1000);
            order.totalPrice = order.selectedSpecify.UnitPrice * order.numOrder;
        }
    }
})
.controller('DealerController', function ($scope, $state, $stateParams, $timeout, $interval, $rootScope, $modal, $log, $q,
   DataService, AuthService, CommonService,
    ORDER_STATUS, PRODUCT_LINE_ID, TIMER, ROLE_FUNCTIONS, USER_ROLES, USER_LEVELS) {
    // Common data
    $scope.dealerName = "";
    $scope.user = AuthService.user();
    $scope.dealefactories = {};
    $scope.labels = {};
    $scope.models = {};
    $scope.selectedFactory = {};
    $scope.recipient = undefined;
    $scope.licensePlate = undefined;
    $scope.factory = undefined;
    $scope.total = {}
    $scope.total.NumOrder = 0;
    $scope.total.Quantity = 0;
    $scope.total.Price = 0;
    $scope.status = ORDER_STATUS;
    $scope.keyword = '';

    $scope.days = [0, 1, 2, 3, 4, 5, 6, 7];
    $scope.selectedDay = 1;
    // List order in cart
    $scope.orderList = [];

    // Confirm data
    $scope.confirmLabel = false;

    //////// COMMON
    
    $scope.collapsing = false;
    
    //$scope.changeCollapse = function () {
    //    $timeout(function () {
    //        $scope.statusCollapse.open = !$scope.statusCollapse.open;
    //    }, 500);
    //}
    //$scope.refreshScroll = function () {
    //    console.log("begin refresh")
    //    $timeout(function () {
    //        if (myScroll)
    //            //myScroll.refresh();
    //        console.log("refresh");
    //    }, 500);
    //}
    $scope.statusCollapse = {
        open: false,
        flag: true
    };
    $scope.flagCount = 0;
    //$scope.log = '';
    //$scope.$watch('statusCollapse.open', function (newValue, oldValue) {
    //    if (oldValue != newValue) {
    //        $scope.flagCount += 1;
    //        if ($scope.flagCount == 2) {
    //            $scope.flagCount = 0;
    //            $scope.statusCollapse.flag = !$scope.statusCollapse.flag;
    //        }
    //    }
    //    //$scope.log += '' + oldValue + newValue + '  ';
    //});
    function loadOrder(status, year, month) {
        if (year == null && month != null)
            return;
        // show progress
        $scope.openProgress();
        document.body.style.cursor = 'wait';

        var params = "roleid=" + $scope.currentRole + "&level=" + $scope.currentLevel;

        if (status) {
            params += ("&status=" + status);
        }
        if (month) {
            params += ("&year=" + year + "&month=" + month);
        }
        else if (year) {
            params += ("&year=" + year);
        }
        if ($scope.keyword) {
            params += "&search=" + $scope.keyword;
        }

        console.log(params);
        CommonService.getListOrderByParam(params).then(function (data) {
            $scope.orders = data;
            console.log(data);
            $timeout(function () {
                myScroll.refresh();
            }, 0)
            
            // dismiss progress
            $scope.modalProgress.dismiss('close');
            document.body.style.cursor = 'auto';
            $scope.lock = false;
        }, function (err) {
            $timeout(function () {
                myScroll.refresh();
            }, 0)
            // dismiss progress
            $scope.modalProgress.dismiss('close');
            document.body.style.cursor = 'auto';
            $scope.lock = false;
            console.log(err);
            $rootScope.processRequestError(err);
        });
    }
    $scope.lock = false;
    $rootScope.loadOrderInMonth = function () {
        console.log('loadOrderInMonth');
        var date = new Date();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();

        if ($state.current.name != 'home.dealer') {
            console.log('click');
            $state.go('home.dealer', { Year: y, Month: mm }, { reload: true });
        }
        else {
            if ($scope.functions.indexOf($scope.roleFunction.DEALER.LIST_ORDER) > -1) {
                console.log('done');
                $scope.lock = true;
                $scope.filter.Status = 0;
                $scope.filter.Year = currentYear();
                $scope.filter.Month = currentMonth();

                loadOrder(null, y, mm);
            }
        }
    }

    $rootScope.loadOrderByStatus = function (statusId) {
        console.log('loadOrderByStatus');
        if ($state.current.name != 'home.dealer') {
            console.log('click');
            $state.go('home.dealer', { Year: $stateParams.Year, Month: $stateParams.Month, StatusId: statusId }, { reload: true });
        } else {
            console.log(statusId);
            $scope.filter.Status = statusId;
            //loadOrder(AuthService.user().DealerId, statusId, null, null);
        }
    }

    function currentMonth() {
        var date = new Date();
        return date.getMonth() + 1;
        var y = date.getFullYear();
    }

    function currentYear() {
        var date = new Date();
        return date.getFullYear();
    }

    $scope.years = [currentYear(), currentYear() - 1, currentYear() - 2, currentYear() - 3, currentYear() - 4];
    $scope.functions = [];
    $scope.roleFunction = ROLE_FUNCTIONS;
    function initFunctionList() {
        console.log("ABC");
        return CommonService.getFunctionList().then(function (data) {
            console.log(data);
            var idArr = [];
            for (var idx in data) {
                idArr.push(data[idx].FunctionId);
            }
            DataService.setListFunction(idArr);
            $scope.functions = DataService.getListFunction();
        }, function (err) {
            $rootScope.processRequestError(err);
        });
    }
    $scope.currentRole = USER_ROLES.DEALER;
    $scope.currentLevel = USER_LEVELS.DEALER;
    //////// BEGIN ORDER LIST
    $scope.filter = {}
    $scope.filter.Status = 0;  
    $scope.filter.Year = currentYear();
    $scope.filter.Month = currentMonth();

    $scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    $scope.filter = function () {
        console.log($scope.filter.Year);
        if ($scope.lock == false) {
            var statusid = parseInt($scope.filter.Status);
            if ($scope.filter.Status == ORDER_STATUS.ALL)
                statusid = null;
            loadOrder(statusid, parseInt($scope.filter.Year), parseInt($scope.filter.Month));
        }
    }

    function openConfirm(msg) {

        var modalConfirm = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'confirm-done.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                message: function () {
                    return msg;
                },
                mode: function () {
                    return 0;
                }
            }
        });
        return modalConfirm;
    };

    function openConfirmReason(msg) {

        var modalConfirm = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'confirm-message-norequire.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                message: function () {
                    return msg;
                },
                mode: function () {
                    return 1;
                }
            }
        });
        return modalConfirm;
    };

    $scope.openLoading = function () {

        $scope.modal = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'loading.html',
            size: 'sm'
        });

        $scope.modal.result.then(function (from) {

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
            //alert('Modal dismissed at: ' + new Date());
        });
    };
    $scope.openProgress = function () {

        $scope.modalProgress = $modal.open({
            animation: true,
            templateUrl: 'progress.html',
            size: 'sm',
            backdrop: 'static',
            keyboard: false
        });

        $scope.modalProgress.result.then(function (from) {

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
            //alert('Modal dismissed at: ' + new Date());
        });
    };

    $scope.orderPage = function () {
        $state.go('home.dealer-order', {}, { reload: true });
    }
    //$rootScope.$on('$stateChangeSuccess', function () {

    //    if ($state.current.name != ('tabs.' + $scope.role + '-list')) {
    //        console.log($state.current.name);
    //        $("html, body").animate({ scrollTop: 0 }, 200);
    //    }
    //})

    //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //    if (toState.name == "login") {
    //        console.log("cancel");
    //        $interval.cancel(1000);
    //    }
    //});
    function autoUpdate() {
        //if ($state.indexOf('home.dealer') > -1) {
        console.log("auto load");
        //loadOrder(AuthService.user().DealerId, statusid, parseInt($scope.filter.Year), parseInt($scope.filter.Month));

        var dealerId = AuthService.user().Id;
        console.log($scope.filter.Status);
        var statusid = parseInt($scope.filter.Status);
        console.log(statusid);
        if (parseInt($scope.filter.Status) == ORDER_STATUS.ALL)
            statusid = null;
        var year = parseInt($scope.filter.Year);
        var month = parseInt($scope.filter.Month);

        var params = "dealerid=" + dealerId;
        params += "&roleid=" + $scope.currentRole + "&level=" + $scope.currentLevel;

        if (statusid) {
            params += ("&status=" + statusid);
        }
        if (month) {
            params += ("&year=" + year + "&month=" + month);
        }
        else if (year) {
            params += ("&year=" + year);
        }
        if ($scope.keyword) {
            params += "&search=" + $scope.keyword;
        }
        console.log(params);
        CommonService.getListOrderByParam(params).then(function (data) {
            $scope.orders = data;
            console.log(data);

        }, function (err) {
            // dismiss progress
            console.log(err);
            //$timeout(autoUpdate, 5000);
        });
        //}
    }

    $scope.$on('$destroy', function () {
        console.log("destroy");
        $interval.cancel($scope.autoUpdate);
        if (myScroll) {
            myScroll.destroy();
            myScroll = null;
        }
    });

    $scope.orders = [];
    var table;
    var myScroll = null;
    function initDealerHomeData() {
        myScroll = new iScroll('wrapper');
        //if ($stateParams.StatusId != null) {
        //    $scope.filter.Status = $stateParams.StatusId;
        //}
        //else if ($stateParams.Year != null && $stateParams.Month != null) {
        //    $scope.filter.Year = $stateParams.Year;
        //    $scope.filter.Month = $stateParams.Month;

        //}
        //else {
        $scope.filter.Status = 0;
        $scope.filter.Year = currentYear();
        $scope.filter.Month = currentMonth();
        $scope.filter();
        $scope.autoUpdate = $interval(autoUpdate, TIMER.AUTO_UPDATE);

        //CommonService.getRecommendFactory(null, $scope.currentRole, $scope.currentLevel).then(function (data) {
        //    console.log(data);
        //    if (Array.isArray(data)) {
        //        $scope.factory = data[0];
        //    }
        //    else {
        //        $scope.factory = data;
        //    }

        //    console.log($scope.factory);
        //    if (DataService.getFactories()) {
        //        CommonService.getFactories(AuthService.user().AC_PC, $scope.currentRole, $scope.currentLevel).then(function (data) {
        //            DataService.setFactories(data);
        //            $scope.factories = data;

        //            for (var idx in $scope.factories) {
        //                if ($scope.factories[idx].FactoryId == $scope.factory.FactoryId) {
        //                    $scope.factory = $scope.factories[idx];
        //                    return;
        //                }
        //            }

        //        }, function (error) {
        //            console.log(error);
        //            $rootScope.processRequestError(error);
        //        });
        //    }
        //    else {
        //        $scope.factories = DataService.getFactories();

        //        for (var idx in $scope.factories) {
        //            if ($scope.factories[idx].FactoryId == $scope.factory.FactoryId) {
        //                $scope.factory = $scope.factories[idx];
        //                return;
        //            }
        //        }
        //    }
        //}, function (err) {
        //    console.log(err);
        //    $rootScope.processRequestError(err);
        //});
    }

    $scope.initDealerHome = function () {
        initDealerHomeData();
    }

    $scope.deleteOrder = function (order) {
        var modalConfirm = openConfirmReason("Lý do hủy đơn hàng");
        modalConfirm.result.then(function (result) {
            //if (result) {
            $scope.openProgress();
            document.body.style.cursor = 'wait';
            CommonService.removeOrder(order.OrderId, $scope.currentRole, $scope.currentLevel, result).then(function (data) {
                var index = $scope.orders.indexOf(order);
                console.log(index)
                if (index > -1) {
                    $scope.orders.splice(index, 1);
                    $scope.modalProgress.dismiss('close');
                    document.body.style.cursor = 'auto';
                    $scope.filter();
                }
                else {
                    $scope.modalProgress.dismiss('close');
                    document.body.style.cursor = 'auto';
                }
            }, function (err) {
                $scope.modalProgress.dismiss('close');
                document.body.style.cursor = 'auto';
                console.log(err);
                $rootScope.processRequestError(err);
            });
            //}
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    }

    $scope.goToState = function (stateName, orderId) {
        $state.go(stateName, { OrderId: orderId, Year: $scope.filter.Year, Month: $scope.filter.Month }, { reload: true });
    }

    $scope.orderDetail = function (orderId) {
        $state.go('tabs.dealer-list-order-detail', { OrderId: orderId });
    }
    //////// END ORDER LIST

    /////// BEGIN ORDER
    $scope.recommend = undefined;
    $scope.submited = false;
    $scope.selected = {}
    $scope.selectDeliveryDate = function () {
        var date = new Date();
        date.setDate(date.getDate() + $scope.selected.Day);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();
        $scope.deliveryDate = y + '-' + mm + '-' + dd;
        $scope.deliveryDateView = [dd.padLeft(), mm.padLeft(), y].join('/');
    }

    Number.prototype.padLeft = function (base, chr) {
        var len = (String(base || 10).length - String(this).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    }

    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        //console.log((j ? i.substr(0, j) + t : ""));
        ////console.log(i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t));
        //console.log(Math.abs(n - i).toString().slice(2));
        //console.log((parseFloat(Math.abs(n - i).toFixed(c))).toString());
        //console.log((c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : ""));
        //return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : "");
    };

    $scope.format = function (number, float) {
        //number = parseInt(number);
        if (typeof number === 'string')
            number = parseInt(number);
        if (number == 0)
            return 0;
        if (number)
            return number.formatMoney(float, '.', ',');
        else
            return '';
    }

    function openNewItem() {
        var modal = $modal.open({
            animation: true,
            size: 'lg',
            templateUrl: 'order-item.html',
            controller: 'ModalInstanceNewItemCtrl',
            resolve: {
                products: function () {
                    return $scope.products;
                },
                roleId: function () {
                    return $scope.currentRole;
                },
                level: function () {
                    return $scope.currentLevel;
                }
            }

        });
        return modal;
    }

    $scope.orderNewItem = function () {
        var modal = openNewItem();
        modal.result.then(function (orderItem) {
            if (orderItem) {
                console.log(orderItem);
                $scope.orderList.push(orderItem);
                $scope.calculator();
            }
        });
    }

    $scope.cancelOrder1 = function () {
        var modalConfirm = openConfirm("Bạn có muốn hủy đặt hàng?");
        modalConfirm.result.then(function (result) {
            if (result) {
                $state.go('home.dealer', { Dealer: $scope.order.DealerId }, { reload: true })
            }
        });
    }
    $scope.loadLabels = function () {
        $scope.openProgress();
        document.body.style.cursor = 'wait';
        $scope.clearData();
        if (DataService.getLabels()) {
            CommonService.getLabels(AuthService.user().AC_PC, $scope.currentRole, $scope.currentLevel).then(function (data) {
                console.log(data);
                $scope.labels = [];
                CommonService.getRecommendLabels(null, $scope.currentRole, $scope.currentLevel, $scope.selected.Factory.FactoryId).then(function (data2) {
                    console.log(data2);
                    for (var idx1 in data) {
                        for (var idx2 in data2) {
                            if (data[idx1].BrandId == data2[idx2].BrandId) {
                                $scope.labels.push(data[idx1]);
                            }
                        }
                    }

                    for (var idx in $scope.labels) {
                        $scope.models[$scope.labels[idx].BrandName] = false;
                        //console.log(data[idx]);

                        for (var item in $scope.labels) {
                            modelsBack[$scope.labels[item].BrandName] = false;
                            modelsData[$scope.labels[item].BrandName] = null;
                        }
                    }

                    DataService.setLabels($scope.labels);

                    if ($scope.labels.length == 1) {
                        //$scope.confirmLabel = true;
                        //$scope.labelValid = true;
                        $scope.models[$scope.labels[0].BrandName] = true;
                        $scope.confirmLabels();
                    }
                    else
                        $scope.confirmLabel = false;
                    $scope.modalProgress.dismiss('close');
                    document.body.style.cursor = 'auto';

                }, function (error) {
                    $scope.modalProgress.dismiss('close');
                    document.body.style.cursor = 'auto';
                    $rootScope.processRequestError(error);
                });
            }, function (error) {
                $scope.modalProgress.dismiss('close');
                document.body.style.cursor = 'auto';
                console.log(error)
                $rootScope.processRequestError(error);
            });
        }
        else {
            $scope.labels = DataService.getLabels();

            for (var item in $scope.labels) {
                modelsBack[$scope.labels[item].BrandName] = false;
                modelsData[$scope.labels[item].BrandName] = null;
            }
        }
    }
    $scope.refreshFlag = false;
    $scope.init = function () {
        //console.log("INIT");
        $scope.refreshFlag = false;
        $scope.selected.Day = 0;
        $scope.selectDeliveryDate();
        // Init select2 day
        //$timeout(function() {
        //    $('.select-day').select2();
        //}, 0, false);

        $scope.dealerName = AuthService.user().DealerName;
        $scope.openProgress();
        document.body.style.cursor = 'wait';
        // GET RECOMMEND DEALER FACTORY
        CommonService.getRecommendFactory(null, $scope.currentRole, $scope.currentLevel).then(function (recommendFactory) {

            if (DataService.getFactories()) {
                CommonService.getFactories(AuthService.user().AC_PC, $scope.currentRole, $scope.currentLevel).then(function (listFactory) {
                    DataService.setFactories(listFactory);
                    $scope.factories = [];

                    for (var idx in listFactory) {
                        for (var idx2 in recommendFactory) {
                            if (listFactory[idx].FactoryId == recommendFactory[idx2].FactoryId) {
                                $scope.factories.push(listFactory[idx]);
                            }
                        }
                    }

                    $scope.selected.Factory = $scope.factories[0];
                    $scope.modalProgress.dismiss('close');
                    document.body.style.cursor = 'auto';
                    $scope.loadLabels();
                }, function (error) {
                    $scope.refreshFlag = true;
                    console.log(error);
                    $scope.modalProgress.dismiss('close');
                    document.body.style.cursor = 'auto';
                    $rootScope.processRequestError(error);
                });
            }
            else {
                var listFactory = DataService.getFactories();

                for (var idx in listFactory) {
                    for (var idx2 in recommendFactory) {
                        if (listFactory[idx].FactoryId == recommendFactory[idx2].FactoryId) {
                            $scope.factories.push(listFactory[idx]);
                        }
                    }
                }

                $scope.selected.Factory = $scope.factories[0];
                $scope.loadLabels();
            }
        }, function (err) {
            $scope.refreshFlag = true;
            console.log(err);
            $scope.modalProgress.dismiss('close');
            document.body.style.cursor = 'auto';
            $rootScope.processRequestError(err);
        });



        //$scope.addOrder();

        CommonService.getRecommendDriver(null, $scope.currentRole, $scope.currentLevel).then(function (data) {
            console.log(data);
            $scope.recommend = data;
            $scope.recipient = data.Recipient;
            $scope.licensePlate = data.LicensePlate;
        }, function (err) {
            console.log(err);
            $rootScope.processRequestError(err);
        });
    }

    $scope.loadProducts = function (labelId, labelName) {
        return $q(function (resolve, reject) {
            CommonService.getProducts(null, labelId, $scope.currentRole, $scope.currentLevel, $scope.selected.Factory.FactoryId).then(function (data) {
                if (modelsData[labelName] == null) {
                    modelsData[labelName] = data;
                }
                $scope.products = $scope.products.concat(modelsData[labelName]);
                resolve();
            }, function (error) {
                $scope.refreshFlag = true;
                console.log(error);
                $rootScope.processRequestError(error);
                reject();
            });
        });
    }

    $scope.loadSpecify = function (order) {
        console.log(order);
        console.log($scope.orderList);
        CommonService.getSpecify(order.selectedProduct.ProductName, AuthService.user().Id, $scope.currentRole, $scope.currentLevel).then(function (data) {
            //console.log(data)
            order.specifies = data.slice();

        }, function (error) {
            console.log(error)
            $rootScope.processRequestError(error);
        });
    }

    $scope.calculator = function () {
        //console.log(order);
        //console.log($scope.orderList);
        //if (order) {
        //    order.totalQuantity = ((order.selectedSpecify.Weight * order.numOrder) / 1000);
        //    order.totalPrice = order.selectedSpecify.UnitPrice * order.numOrder;
        //}

        $scope.total.NumOrder = 0;
        $scope.total.Quantity = 0;
        $scope.total.Price = 0;

        for (var i = 0, len = $scope.orderList.length; i < len; i++) {
            $scope.total.NumOrder += parseInt($scope.orderList[i].numOrder);
            $scope.total.Quantity += $scope.orderList[i].totalQuantity;
            $scope.total.Price += $scope.orderList[i].totalPrice;
        }
    }

    $scope.addOrder = function () {
        var orderItem = {
            products: [],
            specifies: [],
            selectedProduct: undefined,
            selectedSpecify: undefined,
            numOrder: 1,
            totalQuantity: 0,
            totalPrice: 0
        }

        if ($scope.products)
            orderItem.products = $scope.products;
        $scope.orderList.push(orderItem);
    }

    $scope.removeOrder = function (order) {
        var modalConfirm = openConfirm("Bạn có muốn xóa sản phẩm trong danh sách đặt hàng?");
        modalConfirm.result.then(function (result) {
            if (result) {
                var index = $scope.orderList.indexOf(order);
                if (index > -1) {
                    $scope.orderList.splice(index, 1);
                }
            }
        });
    }

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    var modelsData = {};
    var modelsBack = {};
    $scope.products = new Array();
    $scope.labelValid = true;

    $scope.clearData = function () {
        var modelsData = {};
        var modelsBack = {};
        $scope.products = new Array();
        $scope.labelValid = true;
        $scope.orderList = [];
        //$scope.addOrder();
        $scope.confirmLabel = false;
    }

    function isLabelValid() {
        if ($scope.labels.length == 1)
            return true;
        for (var idx in $scope.models) {
            if ($scope.models[idx])
                return true;
        }
        return false;
    }
    $scope.confirmLabels = function () {
        $scope.labelValid = isLabelValid();
        if (!$scope.labelValid)
            return;

        $scope.refreshFlag = false;
        $scope.confirmLabel = !$scope.confirmLabel;
        //console.log("Confirm Label");

        if ($scope.confirmLabel) {
            //$scope.openProgress();
            console.log("START");
            console.log(modelsBack);

            // Load Data
            for (var item in $scope.models) {

                if ($scope.models[item] && !modelsBack[item]) { // Add data
                    for (var idx in $scope.labels) {
                        if ($scope.labels[idx].BrandName == item) {
                            $scope.loadProducts($scope.labels[idx].BrandId, $scope.labels[idx].BrandName).then(function () {
                                console.log($scope.labels[idx].BrandName);
                                //if (idx == $scope.labels.length - 1) $scope.modalProgress.dismiss('close');                                
                            });
                            
                        }
                    }
                }

                // Remove data
                if (!$scope.models[item] && modelsBack[item]) {
                    console.log('remove');
                    console.log(modelsData);
                    for (var idx2 in modelsData[item]) {
                        var itemIdx = $scope.products.indexOf(modelsData[item][idx2]);
                        if (itemIdx > -1)
                            $scope.products.splice(itemIdx, 1);
                        //console.log();
                    }

                    for (var idx3 in $scope.orderList) {
                        var itemIdx = modelsData[item].indexOf($scope.orderList[idx3].selectedProduct);
                        if (itemIdx > -1) {
                            $scope.orderList[idx3].specifies = [];
                            $scope.orderList[idx3].selectedProduct = undefined;
                            $scope.orderList[idx3].selectedSpecify = undefined;
                            $scope.orderList[idx3].numOrder = 1;
                            $scope.orderList[idx3].totalQuantity = 0;
                            $scope.orderList[idx3].totalPrice = 0;

                            $scope.calculator();
                        }
                    }
                }
            }
                

            modelsBack = clone($scope.models);
            console.log(modelsBack);
            console.log("END");
            
        }
    }

    $scope.selectLabel = function (brandName) {
        var flag = $scope.models[brandName];
        $scope.models[brandName] = flag;
        //modelsData[brandName] = null;// !$scope.models[brandName];
        //console.log($scope.models[brandName]);
    }

    function isMaximumProduct() {
        var hist = {};
        $scope.orderList.map(function (a) {
            if (a.selectedSpecify.ProductId in hist)
                hist[a.selectedSpecify.ProductId]++;
            else
                hist[a.selectedSpecify.ProductId] = 1;
        }
        );
        console.log(hist);
        console.log(Object.keys(hist).length);
        if (Object.keys(hist).length > 12)
            return true;
        //for (var idx in $scope.OrderList) {
        //    if () {
        //        return false;
        //    }
        //}
        return false;
    }

    $scope.previewOrder = function (isValid) {
        $scope.submited = true;
        //if (!isValid)
        //    return;
        if (isMaximumProduct()) {
            $scope.submited = false;
            $scope.sumFlag = true;
            return;
        }
        console.log($scope.orderList);
        var data = {
            OrderList: $scope.orderList,
            Total: $scope.total,
            Factory: $scope.selected.Factory,
            Days: $scope.selected.Day,
            Note: $scope.note,
            ExtendInfo: {
                recipient: $scope.recipient,
                licensePlate: $scope.licensePlate
            }
        };
        $state.go('tabs.dealer-order-review', { Data: data }).then(function () {
            $scope.submited = false;
            $scope.sumFlag = false;
        })
    }

    function openEditItem(idx, orderItem) {
        var modal = $modal.open({
            animation: true,
            size: 'lg',
            templateUrl: 'order-edit-item.html',
            controller: 'ModalInstanceEditItemCtrl',
            resolve: {
                products: function () {
                    return $scope.products;
                },
                orderItem: function () {
                    return orderItem;
                },
                index: function () {
                    return idx;
                },
                roleId: function () {
                    return $scope.currentRole;
                },
                level: function () {
                    return $scope.currentLevel;
                }
            }

        });
        return modal;
    }

    $scope.orderEditItem = function (idx, orderItem) {
        var modal = openEditItem(idx, orderItem);

        modal.result.then(function (data) {
            if (data) {
                if (data.isRemove == 1) {
                    $scope.orderList.splice(data.index);
                }
                else {
                    $scope.orderList[data.index] = data.orderItem;
                }

                $scope.calculator();
            }
        });
    }
    /////// END ORDER

    /////// BEGIN ORDER PREVIEW
    $scope.deliveryDate = undefined;
    $scope.deliveryDateView = undefined;

    $scope.productLines = [];
    $scope.receiptQuantities = {};
    $scope.receiptPrices = {};
    $scope.receiptView = {};

    $scope.quantities = {};
    $scope.totalQuantityInMonth = 0;
    $scope.prices = {};
    $scope.totalPriceInMonth = 0;

    $scope.indicators = 0;

    $scope.success = false;
    $scope.legacyConfirm = false;

    $scope.backPage = function () {
        try {
            window.history.back();
        } catch (ex) {
            window.alert(ex);
        }
    }
    $scope.homePage = function () {
        $state.go('tabs.dealer-list', {}, { reload: true });
    }

    $scope.collapse = {
        table1: true,
        table2: true,
        table3: true,
        table4: true
    }
    $scope.initPreview = function () {
        $scope.title = "Xác nhận đơn hàng"
        if ($stateParams.Data == null) {
            $state.go('home.dealer-nodata');
            return;
        }
        $scope.dealerName = AuthService.user().DealerName;
        $scope.orderList = $stateParams.Data.OrderList;
        console.log($scope.orderList);
        $scope.total = $stateParams.Data.Total;
        $scope.selectedFactory = $stateParams.Data.Factory;
        $scope.recipient = $stateParams.Data.ExtendInfo.recipient;
        $scope.licensePlate = $stateParams.Data.ExtendInfo.licensePlate
        $scope.selectedDay = $stateParams.Data.Days;
        $scope.note = $stateParams.Data.Note;

        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();
        $scope.month = mm;
        $scope.year = y;
        $scope.currentDate = y + '-' + mm + '-' + dd;
        $scope.todayView = [dd.padLeft(), mm.padLeft(), y].join('/');
        date.setDate(date.getDate() + $scope.selectedDay);
        dd = date.getDate();
        mm = date.getMonth() + 1;
        y = date.getFullYear();
        $scope.deliveryDate = y + '-' + mm + '-' + dd;
        $scope.deliveryDateView = [dd.padLeft(), mm.padLeft(), y].join('/');


        $scope.totalQuantityInMonth = 0;
        $scope.totalPriceInMonth = 0;
        CommonService.getProductLines(AuthService.user().AC_PC, $scope.currentRole, $scope.currentLevel).then(function (data) {
            $scope.productLines = data;
            for (var idx in $scope.productLines) {
                $scope.receiptQuantities[$scope.productLines[idx].ProductLineId] = 0;
                $scope.receiptPrices[$scope.productLines[idx].ProductLineId] = 0;
                $scope.quantities[$scope.productLines[idx].ProductLineId] = 0;
                $scope.prices[$scope.productLines[idx].ProductLineId] = 0;
            }

            $scope.QuantityLastMonth = 0;
            $scope.QuantityCurrentMonth = 0;
            for (var idx in $scope.orderList) {
                console.log($scope.orderList[idx]);
                $scope.QuantityLastMonth += parseFloat($scope.orderList[idx].selectedSpecify.QuantityLastMonth);
                $scope.QuantityCurrentMonth += parseFloat($scope.orderList[idx].selectedSpecify.QuantityCurrentMonth);

                $scope.receiptQuantities[$scope.orderList[idx].selectedProduct.ProductLineId] += $scope.orderList[idx].totalQuantity;
                $scope.totalQuantityInMonth += $scope.orderList[idx].totalQuantity;
                $scope.receiptPrices[$scope.orderList[idx].selectedProduct.ProductLineId] += $scope.orderList[idx].totalPrice;
                $scope.totalPriceInMonth += $scope.orderList[idx].totalPrice;

                console.log($scope.receiptQuantities);
                console.log($scope.receiptPrices);
            }

            for (var idx in $scope.productLines) {
                $scope.quantities[$scope.productLines[idx].ProductLineId] += $scope.receiptQuantities[$scope.productLines[idx].ProductLineId];
                $scope.prices[$scope.productLines[idx].ProductLineId] += $scope.receiptPrices[$scope.productLines[idx].ProductLineId];
            }

            CommonService.getQuantityInMonthByProductLine(null, $scope.currentRole, $scope.currentLevel).then(function (data) {

                for (var idx in data) {
                    $scope.quantities[data.ProductLineId] += data.Quantity;
                    $scope.totalQuantityInMonth += data.Quantity;
                    $scope.prices[data.ProductLineId] += data.Money;
                    $scope.totalPriceInMonth += data.Money;
                }
            });

        }, function (err) {
            $rootScope.processRequestError(err);
        });

        CommonService.getDealerIndicators(null, $scope.currentRole, $scope.currentLevel).then(function (data) {
            $scope.indicators = data.GoalValue;
        });

        // group order by product id
        $scope.orderListGroupBy = {};
        $scope.orderList.map(function (a) {
            if (a.selectedSpecify.ProductId in $scope.orderListGroupBy) {
                $scope.orderListGroupBy[a.selectedSpecify.ProductId].numOrder += a.numOrder;
                $scope.orderListGroupBy[a.selectedSpecify.ProductId].totalQuantity += a.totalQuantity;
                $scope.orderListGroupBy[a.selectedSpecify.ProductId].totalPrice += a.totalPrice;
            }
            else
                $scope.orderListGroupBy[a.selectedSpecify.ProductId] = clone(a);
        });
        console.log($scope.orderListGroupBy);
    }

    $scope.createOrder = function () {
        $scope.openLoading();
        var orderdetails = [];
        for (var idx in $scope.orderListGroupBy) {
            var item = {
                productid: $scope.orderListGroupBy[idx].selectedSpecify.ProductId,
                count: parseInt($scope.orderListGroupBy[idx].numOrder),
                quantity: $scope.orderListGroupBy[idx].totalQuantity,
                unitprice: $scope.orderListGroupBy[idx].selectedSpecify.UnitPrice
            };
            orderdetails.push(item);
        }
        console.log(orderdetails);
        var params = {
            roleid: $scope.currentRole,
            level: $scope.currentLevel,
            order: {
                //userid: parseInt(AuthService.user().UserId),
                //dealerid: AuthService.user().Id,
                factoryid: $scope.selectedFactory.FactoryId,
                recipient: $scope.recipient,
                licenseplate: $scope.licensePlate,
                orderdate: $scope.currentDate,
                deliverdate: $scope.deliveryDate,
                orderdetail: orderdetails,
                note: $scope.note
            }
        };
        console.log(params);
        CommonService.addOrder(params).then(function (data) {
            $scope.modal.dismiss('closing');
            console.log(data);
            $scope.$parent.prevState = '';
            $scope.success = true;
            //$state.go('home.dealer', {}, { reload: true });
        }, function (err) {
            $scope.modal.dismiss('closing');
            console.log(err);
            $rootScope.processRequestError(err);
        });
    }
    //$scope.$watch('statusCollapse.open', function (newValue, oldValue) {
    //    //window.alert('' + newValue + oldValue);
    //    $timeout(function () {
    //        $scope.statusCollapse.open = newValue;
    //    }, 500);
    //})
    $scope.changeLegacy = function () {
        $scope.legacyConfirm = !$scope.legacyConfirm;
    }

    function openViewPreviewItem(idx, order) {
        var modal = $modal.open({
            animation: true,
            size: 'lg',
            templateUrl: 'order-view-item-preview.html',
            controller: 'ModalInstanceViewItemPreviewCtrl',
            resolve: {
                index: function () {
                    return idx;
                },
                order: function () {
                    return order;
                }
            }

        });
        return modal;
    }

    $scope.orderViewPreviewItem = function (idx, order) {
        openViewPreviewItem(idx, order);
    }
    /////// END ORDER PREVIEW

    /////// BEGIN SC ORDER REVIEW
    $scope.order = {};
    $scope.orderList = [];
    $scope.status = ORDER_STATUS;
    $scope.scName = AuthService.user().SCName;
    $scope.factory = undefined;

    $scope.totalQuantityLastMonth = 0;
    $scope.totalQuantityCurrentMonth = 0;
    $scope.totalCount = 0;
    $scope.totalQuantity = 0;
    $scope.totalMoney = 0;

    function openViewItem(idx, item) {
        var modal = $modal.open({
            animation: true,
            size: 'lg',
            templateUrl: 'order-view-item.html',
            controller: 'ModalInstanceViewItemCtrl',
            resolve: {
                index: function () {
                    return idx;
                },
                item: function () {
                    return item;
                }
            }

        });
        return modal;
    }

    $scope.orderViewItem = function (idx, item) {
        openViewItem(idx, item);
    }

    function generateBarcode() {
        var value = $scope.order.OrderCode;
        var btype = "code128"
        var renderer = "css"

        var quietZone = false;
        //if ($("#quietzone").is(':checked') || $("#quietzone").attr('checked')){
        //  quietZone = true;
        //}

        var settings = {
            output: renderer,
            bgColor: "#FFFFFF",
            color: "#000000",
            barWidth: 1,
            barHeight: 50,
            moduleSize: 5,
            //posX: $("#posX").val(),
            //posY: $("#posY").val(),
            addQuietZone: 1
        };
        if ($("#rectangular").is(':checked') || $("#rectangular").attr('checked')) {
            value = { code: value, rect: true };
        }

        $("#barcodeTarget").html("").show().barcode(value, btype, settings);
    }

    $scope.initOrderReview = function () {
        $scope.title = "Chi tiết đơn hàng";
        // show progress
        $scope.openProgress();
        document.body.style.cursor = 'wait';

        // GET allow function list
        $scope.functions = DataService.getListFunction();
        if ($scope.functions == null) {
            initFunctionList();
        }

        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();
        $scope.currentDate = dd + '/' + mm + '/' + y;

        CommonService.getOrderDetail($stateParams.OrderId, $scope.currentRole, $scope.currentLevel).then(function (data) {
            $scope.order = data;
            for (var idx in $scope.order.OrderDetail) {
                $scope.totalQuantityLastMonth += $scope.order.OrderDetail[idx].QuantityLastMonth;
                $scope.totalQuantityCurrentMonth += $scope.order.OrderDetail[idx].QuantityCurrentMonth;
                $scope.totalCount += $scope.order.OrderDetail[idx].Count;
                $scope.totalQuantity += $scope.order.OrderDetail[idx].Quantity;
                $scope.totalMoney += ($scope.order.OrderDetail[idx].Count * $scope.order.OrderDetail[idx].UnitPrice);
            }
            // Use later
            //generateBarcode();
            // dismiss progress
            $scope.modalProgress.dismiss("close");
            document.body.style.cursor = 'auto';
        }, function (err) {
            // dismiss progress
            $scope.modalProgress.dismiss("close");
            document.body.style.cursor = 'auto';
            console.log(err);
            $rootScope.processRequestError(err);
        });


    }

    $scope.cancelOrder = function (order) {
        var modalConfirm = openConfirmReason("Lý do hủy đơn hàng");
        modalConfirm.result.then(function (result) {
            //if (result) {
            $scope.openProgress();
            document.body.style.cursor = 'wait';

            CommonService.removeOrder(order.OrderId, $scope.currentRole, $scope.currentLevel, result).then(function (data) {
                $state.go('tabs.dealer-list', {}, {reload: true}).then(function () {
                    $scope.modalProgress.dismiss('close');
                    document.body.style.cursor = 'auto';
                });
            }, function (err) {
                $scope.modalProgress.dismiss('close');
                document.body.style.cursor = 'auto';
                console.log(err);
                $rootScope.processRequestError(err);
            });
            //}
        });
    }

    $scope.backFromDetail = function () {
        $state.go('home.dealer', { Year: $stateParams.Year, Month: $stateParams.Month }, {});
    }
    /////// END SC ORDER REVIEW

    ////////// BEGIN DEALER INFO
    $scope.logout = function () {
        AuthService.logout();
        //DataService.setListFunction(null);
        $state.go('login', {}, { reload: true }).then(function () {
        });
    }
    
    $scope.initDealerInfo = function () {
        $scope.openProgress();
        CommonService.getRecommendFactory(null, $scope.currentRole, $scope.currentLevel).then(function (data) {
            console.log(data);
            if (Array.isArray(data)) {
                $scope.factory = data[0];
            }
            else {
                $scope.factory = data;
            }

            console.log($scope.factory);
            if (DataService.getFactories()) {
                CommonService.getFactories(AuthService.user().AC_PC, $scope.currentRole, $scope.currentLevel).then(function (data) {
                    DataService.setFactories(data);
                    $scope.factories = data;

                    for (var idx in $scope.factories) {
                        if ($scope.factories[idx].FactoryId == $scope.factory.FactoryId) {
                            $scope.factory = $scope.factories[idx];
                            return;
                        }
                    }

                }, function (error) {
                    console.log(error);
                    $rootScope.processRequestError(error);
                });
            }
            else {
                $scope.factories = DataService.getFactories();

                for (var idx in $scope.factories) {
                    if ($scope.factories[idx].FactoryId == $scope.factory.FactoryId) {
                        $scope.factory = $scope.factories[idx];
                        return;
                    }
                }
            }
            $scope.modalProgress.dismiss('close');
        }, function (err) {
            console.log(err);
            $scope.modalProgress.dismiss('close');
            $rootScope.processRequestError(err);
        });
    }
    ////////// END DEALER INFO
    $scope.log = '';
    $scope.addLog = function () {
        $scope.log += "click ";
    }

    function initModalScroll() {
        // iOS check...ugly but necessary
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            console.log('initModal');
            $('.modal').on('show.bs.modal', function () {
                // Position modal absolute and bump it down to the scrollPosition
                $(this)
                    .css({
                        position: 'absolute',
                        marginTop: $(window).scrollTop() + 'px',
                        bottom: 'auto'
                    });
                // Position backdrop absolute and make it span the entire page
                //
                // Also dirty, but we need to tap into the backdrop after Boostrap 
                // positions it but before transitions finish.
                //
                setTimeout(function () {
                    $('.modal-backdrop').css({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: Math.max(
                            document.body.scrollHeight, document.documentElement.scrollHeight,
                            document.body.offsetHeight, document.documentElement.offsetHeight,
                            document.body.clientHeight, document.documentElement.clientHeight
                        ) + 'px'
                    });
                }, 0);
            });
        }
    }

    initModalScroll();
})