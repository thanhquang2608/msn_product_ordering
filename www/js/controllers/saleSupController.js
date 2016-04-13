'use strict';

app.controller('SaleSupController', function ($scope, $rootScope, $timeout, $stateParams, $state, $modal, $log, $interval,
    AuthService, CommonService, DataService,
    ORDER_STATUS, PRODUCT_LINE_ID, TIMER, ROLE_FUNCTIONS, USER_ROLES, USER_LEVELS, ROLE_LEVEL_2_NAME) {

    /////////// COMMON
    $scope.days = [0, 1, 2, 3, 4, 5, 6, 7];
    $scope.selectedDay = 1;

    $scope.backPage = function () {
        window.history.back();
    }

    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + (parseFloat(Math.abs(n - i).toFixed(c)) ? (parseFloat(Math.abs(n - i).toFixed(c))).toString().slice(2) : "0") : "");
    };

    $scope.format = function (number, float) {
        if (typeof number === 'string')
            number = parseInt(number);
        if (number == 0)
            return 0;
        if (number)
            return number.formatMoney(float, '.', ',');
        else
            return '';
    }

    function openConfirm(msg) {

        var modalConfirm = $modal.open({
            animation: $scope.animationsEnabled,
            size: 'lg',
            templateUrl: 'confirm-done.html',
            controller: 'ModalInstanceCtrl',
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
            size: 'lg',
            templateUrl: 'confirm-message-norequire.html',
            controller: 'ModalInstanceCtrl',
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
    $scope.lock = false;
    $rootScope.loadOrderInMonth = function () {
        console.log('loadOrderInMonth');
        var date = new Date();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();

        if ($state.current.name != 'home.sale-sup') {
            console.log('click');
            if ($state.current.name == 'home.sale-sup-order-detail') {
                var data = {};
                data.ProvinceId = $scope.order.ProvinceId;
                $state.go('home.sale-sup', { DealerId: $scope.order.DealerId, Data: data, Year: $stateParams.Year, Month: $stateParams.Month }, { reload: true });
            }
            else {
                var dealerId = null;
                if ($scope.selected.Dealer != null)
                    dealerId = $scope.selected.Dealer.DealerId;
                var provinceId = null;
                if ($scope.selected.Province != null)
                    provinceId = $scope.selected.Province .ProvinceId;

                $state.go('home.sale-sup', {
                    DealerId: dealerId,
                    Data: { ProvinceId: provinceId }
                }, { reload: true });
            }
        }
        else {
            console.log('done');
            if ($scope.functions.indexOf($scope.roleFunction.SALE_SUP.LIST_ORDER) > -1) {
                $scope.lock = true;
                $scope.filter.Status = 0;
                $scope.filter.Year = y;
                $scope.filter.Month = mm;
                loadOrder($scope.selected.Dealer.DealerId, null, y, mm);
            }
        }
    }

    //$scope.$watch(function () {
    //    return $('.panel-collapse').hasClass('collapsing');
    //}, function (status) {
    //    if ($scope.collapsing && !status) {
    //        console.log('done collapsing');
    //        $scope.refreshScroll();
    //    }
    //    $scope.collapsing = status;
    //});

    $scope.refreshScroll = function () {
        console.log("begin refresh")
        $timeout(function () {
            if (myScroll)
                myScroll.refresh();
            console.log("refresh");
        }, 1000);
    }
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
    $rootScope.loadOrderByStatus = function (statusId) {
        console.log('loadOrderByStatus');
        if ($state.current.name != 'home.sale-sup') {
            console.log('click');
            var data = {
                StatusId: statusId
            };

            if ($state.current.name == 'home.sale-sup-order-detail') {
                data.ProvinceId = $scope.order.ProvinceId;
                $state.go('home.sale-sup', { DealerId: $scope.order.DealerId, Data: data, Year: $stateParams.Year, Month: $stateParams.Month }, { reload: true });
            }
            else {
                var dealerId = null;
                if ($scope.selected.Dealer != null)
                    dealerId = $scope.selected.Dealer.DealerId;
                if ($scope.selected.Province != null)
                    data.ProvinceId = $scope.selected.Province .ProvinceId;

                $state.go('home.sale-sup', {
                    DealerId: dealerId,
                    Data: data
                }, { reload: true });
            }           
        } else {
            console.log(statusId);
            $scope.filter.Status = statusId;
            //loadOrder($scope.selected.Dealer.DealerId, statusId, null, null);
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
        return CommonService.getFunctionList().then(function (data) {
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
    $scope.currentRole = USER_ROLES.SALE;
    $scope.currentLevel = USER_LEVELS.SALE_SUP;
    //$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //    if (toState.name.indexOf('home.sale-sup') > -1) {
    //        $scope.currentRole = USER_ROLES.SALE;
    //        $scope.currentLevel = USER_LEVELS.SALE_SUP;
    //    }
    //    else if (toState.name.indexOf('home.sale') > -1) {
    //        $scope.currentRole = USER_ROLES.SALE;
    //        $scope.currentLevel = USER_LEVELS.SALE_REP;
    //    }
    //    else if (toState.name.indexOf('home.sc-sup') > -1) {
    //        $scope.currentRole = USER_ROLES.SC;
    //        $scope.currentLevel = USER_LEVELS.SC_SUP;
    //    }
    //    else if (toState.name.indexOf('home.sc') > -1) {
    //        $scope.currentRole = USER_ROLES.SC;
    //        $scope.currentLevel = USER_LEVELS.SC;
    //    }
    //    else if (toState.name.indexOf('home.dealer') > -1) {
    //        $scope.currentRole = USER_ROLES.DEALER;
    //        $scope.currentLevel = USER_LEVELS.DEALER;
    //    }
    //    else if (toState.name.indexOf('home.admin') > -1) {
    //        $scope.currentRole = USER_ROLES.ADMIN;
    //        $scope.currentLevel = USER_LEVELS.ADMIN;
    //    }
    //});
    /////////// END COMMON

    /////////// SALE HOME
    $scope.dealers = [];
    $scope.orders = [];
    $scope.dealer = {};
    $scope.factory = {};
    $scope.selected = {};
    $scope.info = {};
    $scope.filter = {};
    $scope.filter.Status = 0;
    $scope.filter.Year = currentYear();
    $scope.filter.Month = currentMonth();
    $scope.keyword = '';
    var table = null;

    $scope.filter = function () {
        if ($scope.lock)
            return;
        var statusid = parseInt($scope.filter.Status);
        if ($scope.filter.Status == ORDER_STATUS.ALL)
            statusid = null;
        loadOrder($scope.selected.Dealer.DealerId, statusid, parseInt($scope.filter.Year), parseInt($scope.filter.Month));
    }
    
    function loadOrder(dealerId, status, year, month) {
        // show progress
        $scope.openProgress();
        document.body.style.cursor = 'wait';

        var params = "dealerid=" + dealerId;
        params += "&roleid=" + $scope.currentRole + "&level=" + $scope.currentLevel;
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
        if ($scope.selected.Province) {
            params += '&provinceid=' + $scope.selected.Province.ProvinceId;
        }

        console.log(params);
        CommonService.getListOrderBySale(params).then(function (data) {
            $scope.orders = data;
            //console.log(data);
            //console.log(table);
            //if (table != null) {
            //    table.clear();
            //    table.destroy();
            //}

            //$timeout(function () {
            //    $scope.orders = data;
            //    $scope.$apply();
            //    $timeout(function () {
            //        table = dataTablePaging($('.table-paging'));
            //    }, 0, false);
            //}, 0, false);
            $scope.refreshScroll();
            // dismiss progress
            $scope.modalProgress.dismiss('close');
            document.body.style.cursor = 'auto';
            $scope.lock = false;
        }, function (err) {
            $scope.refreshScroll();
            // dismiss progress
            $scope.modalProgress.dismiss('close');
            document.body.style.cursor = 'auto';
            console.log(err);
            $rootScope.processRequestError(err);
            $scope.lock = false;
        });
    }

    function autoUpdate() {
        //if ($state.indexOf('home.sale-sup') > -1) {
            var statusid = parseInt($scope.filter.Status);
            if ($scope.filter.Status == ORDER_STATUS.ALL)
                statusid = null;
            var dealerId = $scope.selected.Dealer.DealerId;
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
                //console.log(data);
                //console.log(table);
                //if (table != undefined) {
                //    table.clear();
                //    table.destroy();
                //}

                //$timeout(function () {
                //    $scope.orders = data;
                //    $scope.$apply();
                //    $timeout(function () {
                //        table = dataTablePaging($('.table-paging'));
                //    }, 0, false);
                //}, 0, false);

            }, function (err) {
                console.log(err);
            });
        //}
    }

    $scope.backFromOrderToSaleHome = function() {
        //$state.go('home.sale-sup', {
        //    DealerId: $scope.dealer == null? null : $scope.dealer.DealerId,
        //    Data: { ProvinceId: DataService.getProvinceForSaleSup() == null ? null : DataService.getProvinceForSaleSup().ProvinceId }
        //}, {});
        $state.go('home.sale-sup', {
            DealerId: $scope.dealerId,
            Data: { ProvinceId: $scope.provinceId }
        }, { reload: true });
    }

    $scope.backFromDetailToSaleHome = function () {
        var data = { ProvinceId: $scope.order.ProvinceId };
        $state.go('home.sale-sup', {
            DealerId: $scope.order.DealerId,
            Data: data, Year: $stateParams.Year, Month: $stateParams.Month
        }, {});

    }

    $scope.loadDealers = function () {
        CommonService.getDealerBySale(AuthService.user().Id, $scope.currentRole, $scope.currentLevel, $scope.selected.Province.ProvinceId).then(function (data) {
            console.log(data);
            $scope.dealers = data;
            $scope.selected.Dealer = $scope.dealers[0];
            $scope.reloadOrder($scope.selected.Dealer);
        }, function (err) {
            $rootScope.processRequestError(err);
        });
    }

    var myScroll = null;
    function initHomeData() {
        if (myScroll == null)
            myScroll = new iScroll('wrapper');
        CommonService.getProvincesBySale(AuthService.user().Id, $scope.currentRole, $scope.currentLevel).then(function (data) {
            $scope.provinces = data;
            console.log($scope.provinces);
            if ($scope.provinces) {
                if ($stateParams.Data != null && $stateParams.Data.ProvinceId != null) {
                    console.log(parseInt($stateParams.Data.ProvinceId));
                    for (var idx in $scope.provinces) {
                        if ($scope.provinces[idx].ProvinceId == parseInt($stateParams.Data.ProvinceId)) {
                            $scope.selected.Province = $scope.provinces[idx];
                            console.log($scope.selected.Province);
                        }
                    }
                }
                else
                    $scope.selected.Province = $scope.provinces[0];
                //$scope.loadDealers();
                CommonService.getDealerBySale(AuthService.user().Id, $scope.currentRole, $scope.currentLevel, $scope.selected.Province.ProvinceId).then(function (data) {
                    console.log(data);
                    $scope.dealers = data;
                    $scope.dealers.unshift({
                        DealerId: 0,
                        DealerName: 'Tất Cả'
                    });
                    console.log($stateParams);
                    console.log(parseInt($stateParams.DealerId));
                    if ($stateParams.DealerId != null) {
                        for (var idx in $scope.dealers) {
                            if ($scope.dealers[idx].DealerId == parseInt($stateParams.DealerId)) {
                                $scope.selected.Dealer = $scope.dealers[idx];
                                console.log($scope.selected.Dealer);
                            }
                        }
                    }
                    else
                        $scope.selected.Dealer = $scope.dealers[0];
                    if ($stateParams.Data != null && $stateParams.Data.StatusId != null) {
                        $scope.filter.Status = $stateParams.Data.StatusId;
                    }
                    if ($stateParams.Year != null && $stateParams.Month != null) {
                        $scope.filter.Year = $stateParams.Year;
                        $scope.filter.Month = $stateParams.Month;
                    }
                    console.log($scope.selected.Dealer);
                    $scope.reloadOrder($scope.selected.Dealer);
                    $scope.autoUpdate = $interval(autoUpdate, TIMER.AUTO_UPDATE);
                }, function (err) {
                    $scope.autoUpdate = $interval(autoUpdate, TIMER.AUTO_UPDATE);
                    $rootScope.processRequestError(err);
                });

            }
        }, function (err) {
            $rootScope.processRequestError(err);
        })
    }

    $scope.initHome = function () {
        $scope.filter.Status = 0;
        $scope.filter.Year = currentYear();
        $scope.filter.Month = currentMonth();
        initHomeData();
        // GET allow function list
        //$scope.functions = DataService.getListFunction();
        //if ($scope.functions == null) {
        //    initFunctionList().then(function () {
        //        console.log($scope.functions);
        //        if ($scope.functions.indexOf($scope.roleFunction.SALE_SUP.LIST_ORDER) > -1)
        //            initHomeData();
        //    });
        //}
        //else {
        //    console.log($scope.functions);
        //    if ($scope.functions.indexOf($scope.roleFunction.SALE_SUP.LIST_ORDER) > -1)
        //        initHomeData();
        //}

        //CommonService.getDealerBySale(AuthService.user().SaleRepId).then(function (data) {
        //    console.log(data);
        //    $scope.dealers = data;
        //    if ($scope.dealers && $scope.dealers.length > 0) {
        //        if ($stateParams.Dealer) {
        //            for (var idx in $scope.dealers) {
        //                if ($scope.dealers[idx].DealerId == $stateParams.Dealer.DealerId) {
        //                    $scope.dealer = $scope.dealers[idx];
        //                    break;
        //                }
        //            }
        //        }
        //        else if ($stateParams.DealerId) {
        //            for (var idx in $scope.dealers) {
        //                if ($scope.dealers[idx].DealerId == $stateParams.DealerId) {
        //                    $scope.dealer = $scope.dealers[idx];
        //                    break;
        //                }
        //            }
        //        }
        //        else
        //            $scope.dealer = $scope.dealers[0];
        //        console.log($scope.dealer);
        //        $scope.reloadOrder();

        //        $scope.autoUpdate = $interval(autoUpdate, TIMER.AUTO_UPDATE);
        //    }
        //}, function (err) {
        //    $rootScope.processRequestError(err);
        //    $scope.autoUpdate = $interval(autoUpdate, TIMER.AUTO_UPDATE);
        //});
       
    }

    $scope.$on('$destroy', function () {
        console.log("destroy");
        $interval.cancel($scope.autoUpdate);

    });

    $scope.reloadOrder = function (dealer) {
        $scope.selected.Dealer = dealer;
        //if ($stateParams.Data != null && $stateParams.Data.StatusId) {
        //    $scope.filter.Status = $stateParams.Data.StatusId;
        //}
        //else
            loadOrder($scope.selected.Dealer.DealerId, null, $scope.filter.Year, $scope.filter.Month);

        //CommonService.getRecommendFactory($scope.selected.Dealer.DealerId, $scope.currentRole, $scope.currentLevel).then(function (data) {
        //    console.log(data);
        //    if (Array.isArray(data)) {
        //        $scope.factory = data[0];
        //    }
        //    else {
        //        $scope.factory = data;
        //    }
        //    console.log($scope.factory);
        //    if (!$scope.factory) {
        //        return;
        //    }          
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

    $scope.deleteOrder = function (order) {
        var modalConfirm = openConfirmReason();
        modalConfirm.result.then(function (result) {
            //if (result) {
                $scope.openProgress();
                document.body.style.cursor = 'wait';
                CommonService.removeOrder(order.OrderId, $scope.currentRole, $scope.currentLevel, result).then(function (data) {
                    var index = $scope.orders.indexOf(order);
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

    $scope.orderPage = function () {
        DataService.setDealerForSale($scope.selected.Dealer);
        DataService.setProvinceForSaleSup($scope.selected.Province );
        $state.go('home.sale-sup-order', {DealerId: $scope.selected.Dealer.DealerId, ProvinceId: $scope.selected.Province .ProvinceId }, { reload: true });
    }

    $scope.orderDetail = function (orderId) {
        $state.go('tabs.sale-sup-list-order-detail', { OrderId: orderId });
    }
    /////////// END SALE HOME

    /////////// SALE ORDER
    $scope.recommend = undefined;
    $scope.deliveryDate = undefined;
    $scope.deliveryDateView = undefined;
    $scope.models = {};
    $scope.selectedFactory = {};
    $scope.recipient = undefined;
    $scope.licensePlate = undefined;
    $scope.factory = undefined;
    $scope.total = {}
    $scope.total.NumOrder = 0;
    $scope.total.Quantity = 0;
    $scope.total.Price = 0;
    $scope.refreshFlag = false;

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

    $scope.cancelOrder1 = function () {
        var modalConfirm = openConfirm("Bạn có muốn hủy đặt hàng?");
        modalConfirm.result.then(function (result) {
            if (result) {
                $state.go('home.sale-sup', {
                    DealerId: $scope.selected.Dealer == null ? null : $scope.selected.Dealer.DealerId,
                    Data: { ProvinceId: $scope.provinceId }
                }, { reload: true });
            }
        });
    }

    $scope.loadLabels = function () {
        $scope.openProgress();
        document.body.style.cursor = 'wait';
        $scope.clearData();
        if (DataService.getLabels()) {
            CommonService.getLabels($scope.selected.Dealer.AC_PC, $scope.currentRole, $scope.currentLevel).then(function (data) {

                console.log(data);
                $scope.labels = [];
                CommonService.getRecommendLabels($scope.selected.Dealer.DealerId, $scope.currentRole, $scope.currentLevel, $scope.selected.Factory.FactoryId).then(function (data2) {
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
    $scope.loadDealersInOrderPage = function () {
        CommonService.getDealerBySale(AuthService.user().Id, $scope.currentRole, $scope.currentLevel, $scope.selected.Province.ProvinceId).then(function (data) {
            console.log(data);
            $scope.dealers = data;
            if ($scope.dealers) {
                $scope.selected.Dealer = $scope.dealers[0];
                $scope.loadFactoriesInOrderPage();
                $scope.loadRecomendDriver();
            }
        }, function (err) {
            $scope.refreshFlag = true;
            $rootScope.processRequestError(err);
        });
    }
    $scope.loadRecomendDriver = function () {
        CommonService.getRecommendDriver($scope.selected.Dealer.DealerId, $scope.currentRole, $scope.currentLevel).then(function (data) {
            console.log(data);
            $scope.recommend = data;
            $scope.info.recipient = data.Recipient;
            $scope.info.licensePlate = data.LicensePlate;
        }, function (err) {
            console.log(err);
            $rootScope.processRequestError(err);
        });
    }
    $scope.loadFactoriesInOrderPage = function () {
        CommonService.getRecommendFactory($scope.selected.Dealer.DealerId, $scope.currentRole, $scope.currentLevel).then(function (recommendFactory) {
            CommonService.getFactories($scope.selected.Dealer.AC_PC, $scope.currentRole, $scope.currentLevel).then(function (listFactory) {
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
                $scope.loadLabels();
            }, function (error) {
                console.log(error);
                $scope.refreshFlag = true;
                $rootScope.processRequestError(error);
            });

        }, function (err) {
            console.log(err);
            $scope.refreshFlag = true;
            $rootScope.processRequestError(err);
        });
    }
    $scope.init = function () {
        $scope.refreshFlag = false;
        $scope.openProgress();
        document.body.style.cursor = 'auto';

        $scope.selected.Day = 0;
        $scope.selectDeliveryDate();
        CommonService.getProvincesBySale(AuthService.user().Id, $scope.currentRole, $scope.currentLevel).then(function (data) {
            $scope.provinces = data;
            if ($scope.provinces) {
                $scope.selected.Province = $scope.provinces[0];
                console.log($scope.selected.Province);
                $scope.loadDealersInOrderPage();
            }
            $scope.modalProgress.dismiss('close');
        }, function (err) {
            $scope.refreshFlag = true;
            $scope.modalProgress.dismiss('close');
            $rootScope.processRequestError(err);
        })

        //$scope.dealerId = $stateParams.DealerId;
        //$scope.dealer = DataService.getDealerForSale();
        //if (!$scope.dealer) {
        //    CommonService.getDealerInfoBySale($scope.currentRole, $scope.currentLevel, $scope.dealerId).then(function (data) {
        //        $scope.dealer = data;

        //        // GET RECOMMEND DEALER FACTORY
        //        CommonService.getRecommendFactory($scope.dealerId, $scope.currentRole, $scope.currentLevel).then(function (recommendFactory) {
        //            if (DataService.getFactories()) {
        //                CommonService.getFactories($scope.dealer.AC_PC, $scope.currentRole, $scope.currentLevel).then(function (listFactory) {
        //                    DataService.setFactories(listFactory);
        //                    $scope.factories = [];

        //                    for (var idx in listFactory) {
        //                        for (var idx2 in recommendFactory) {
        //                            if (listFactory[idx].FactoryId == recommendFactory[idx2].FactoryId) {
        //                                $scope.factories.push(listFactory[idx]);
        //                            }
        //                        }
        //                    }

        //                    $scope.selectedFactory = $scope.factories[0];
        //                    $scope.modalProgress.dismiss('close');
        //                    document.body.style.cursor = 'auto';
        //                    $scope.loadLabels();
        //                }, function (error) {
        //                    console.log(error);
        //                    $scope.modalProgress.dismiss('close');
        //                    document.body.style.cursor = 'auto';
        //                    $rootScope.processRequestError(error);
        //                });
        //            }
        //            else {
        //                var listFactory = DataService.getFactories();

        //                for (var idx in listFactory) {
        //                    for (var idx2 in recommendFactory) {
        //                        if (listFactory[idx].FactoryId == recommendFactory[idx2].FactoryId) {
        //                            $scope.factories.push(listFactory[idx]);
        //                        }
        //                    }
        //                }
        //                $scope.selectedFactory = $scope.factories[0];
        //                $scope.loadLabels();
        //            }
        //        }, function (err) {
        //            $scope.modalProgress.dismiss('close');
        //            document.body.style.cursor = 'auto';
        //            console.log(err);
        //            $rootScope.processRequestError(err);
        //        });
        //    }, function (err) {
        //        $scope.modalProgress.dismiss('close');
        //        document.body.style.cursor = 'auto';
        //        $rootScope.processRequestError(err);
        //    });
        //}
        //else {
        //    // GET RECOMMEND DEALER FACTORY
        //    CommonService.getRecommendFactory($scope.dealerId, $scope.currentRole, $scope.currentLevel).then(function (recommendFactory) {
        //        if (DataService.getFactories()) {
        //            CommonService.getFactories($scope.dealer.AC_PC, $scope.currentRole, $scope.currentLevel).then(function (listFactory) {
        //                DataService.setFactories(listFactory);
        //                $scope.factories = [];

        //                for (var idx in listFactory) {
        //                    for (var idx2 in recommendFactory) {
        //                        if (listFactory[idx].FactoryId == recommendFactory[idx2].FactoryId) {
        //                            $scope.factories.push(listFactory[idx]);
        //                        }
        //                    }
        //                }

        //                $scope.selectedFactory = $scope.factories[0];
        //                $scope.modalProgress.dismiss('close');
        //                document.body.style.cursor = 'auto';
        //                $scope.loadLabels();
        //            }, function (error) {
        //                console.log(error);
        //                $scope.modalProgress.dismiss('close');
        //                document.body.style.cursor = 'auto';
        //                $rootScope.processRequestError(error);
        //            });
        //        }
        //        else {
        //            var listFactory = DataService.getFactories();

        //            for (var idx in listFactory) {
        //                for (var idx2 in recommendFactory) {
        //                    if (listFactory[idx].FactoryId == recommendFactory[idx2].FactoryId) {
        //                        $scope.factories.push(listFactory[idx]);
        //                    }
        //                }
        //            }
        //            $scope.selectedFactory = $scope.factories[0];
        //            $scope.loadLabels();
        //        }
        //    }, function (err) {
        //        console.log(err);
        //        $scope.modalProgress.dismiss('close');
        //        document.body.style.cursor = 'auto';
        //        $rootScope.processRequestError(err);
        //    });
        //}
        //$scope.addOrder();

        //CommonService.getRecommendDriver($scope.dealerId, $scope.currentRole, $scope.currentLevel).then(function (data) {
        //    console.log(data);
        //    $scope.recommend = data;
        //    $scope.recipient = data.Recipient;
        //    $scope.licensePlate = data.LicensePlate;
        //}, function (err) {
        //    console.log(err);
        //    $rootScope.processRequestError(err);
        //});
    }

    $scope.loadProducts = function (labelId, labelName) {
        CommonService.getProducts($scope.selected.Dealer.DealerId, labelId, $scope.currentRole, $scope.currentLevel, $scope.selected.Factory.FactoryId).then(function (data) {
            if (modelsData[labelName] == null) {
                modelsData[labelName] = data;
            }
            $scope.products = $scope.products.concat(modelsData[labelName]);

        }, function (error) {
            console.log(error);
            $rootScope.processRequestError(error);
        });
    }

    $scope.loadSpecify = function (order) {
        CommonService.getSpecify(order.selectedProduct.ProductName, $scope.selected.Dealer.DealerId, $scope.currentRole, $scope.currentLevel, $scope.selectedFactory.FactoryId, order.selectedProduct.BrandId).then(function (data) {
            //console.log(data)
            order.specifies = data.slice();

        }, function (error) {
            console.log(error)
            $rootScope.processRequestError(error);
        });
    }

    $scope.calculator = function (order) {
        if (order) {
            order.totalQuantity = ((order.selectedSpecify.Weight * order.numOrder) / 1000);
            order.totalPrice = order.selectedSpecify.UnitPrice * order.numOrder;
        }

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
    function isLabelValid() {
        if ($scope.labels.length == 1)
            return true;

        for (var idx in $scope.models) {
            if ($scope.models[idx])
                return true;
        }
        return false;
    }
    $scope.clearData = function () {
        var modelsData = {};
        var modelsBack = {};
        $scope.products = new Array();
        $scope.labelValid = true;
        $scope.orderList = [];
        //$scope.addOrder();
        $scope.confirmLabel = false;
    }
    $scope.confirmLabels = function () {
        $scope.labelValid = isLabelValid();
        if (!$scope.labelValid)
            return;
        $scope.confirmLabel = !$scope.confirmLabel;
        //console.log("Confirm Label");

        if ($scope.confirmLabel) {
            console.log("START");
            console.log(modelsBack);

            // Load Data
            for (var item in $scope.models) {

                if ($scope.models[item] && !modelsBack[item]) { // Add data
                    for (var idx in $scope.labels) {
                        if ($scope.labels[idx].BrandName == item) {
                            $scope.loadProducts($scope.labels[idx].BrandId, $scope.labels[idx].BrandName);
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
            //console.log($scope.products);
            //$('.select2').select2();
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
        var data = {
            Dealer: $scope.selected.Dealer,
            OrderList: $scope.orderList.slice(),
            Total: $scope.total,
            Factory: $scope.selected.Factory,
            Days: $scope.selected.Day,
            Note: $scope.info.note,
            ProvinceId: $stateParams.ProvinceId,
            ExtendInfo: {
                recipient: $scope.info.recipient,
                licensePlate: $scope.info.licensePlate
            }
        };
        $state.go('tabs.sale-sup-order-review', { Data: data }).then(function () {
            $scope.submited = false;
            $scope.sumFlag = false;
        })
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
                },
                selectedFactory: function () {
                    return $scope.selected.Factory;
                },
                id: function () {
                    return $scope.selected.Dealer.DealerId;
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
                    return clone(orderItem);
                },
                index: function () {
                    return idx;
                },
                roleId: function () {
                    return $scope.currentRole;
                },
                level: function () {
                    return $scope.currentLevel;
                },
                selectedFactory: function () {
                    return $scope.selected.Factory;
                },
                id: function () {
                    return $scope.selected.Dealer.DealerId;
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
    /////////// END SALE ORDER

    /////// BEGIN ORDER PREVIEW
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
    $scope.backPage = function () {
        window.history.back();
    }

    $scope.collapse = {
        table1: true,
        table2: true,
        table3: true,
        table4: true
    }

    $scope.homePage = function () {
        $state.go('tabs.sale-sup-list', {
            DealerId: $scope.dealer == null ? null : $scope.dealer.DealerId,
            Data: { ProvinceId: $scope.provinceId }
        }, { reload: true });
    }

    $scope.initPreview = function () {
        console.log($stateParams);
        if ($stateParams.Data == null) {
            $state.go('home.sale-sup-nodata');
            return;
        }
        $scope.dealer = $stateParams.Data.Dealer;
        $scope.orderList = $stateParams.Data.OrderList;
        console.log($scope.orderList);
        $scope.total = $stateParams.Data.Total;
        $scope.selectedFactory = $stateParams.Data.Factory;
        $scope.recipient = $stateParams.Data.ExtendInfo.recipient;
        $scope.licensePlate = $stateParams.Data.ExtendInfo.licensePlate
        $scope.selectedDay = $stateParams.Data.Days;
        $scope.provinceId = $stateParams.Data.ProvinceId;
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
        CommonService.getProductLines($scope.dealer.AC_PC, $scope.currentRole, $scope.currentLevel).then(function (data) {
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
                $scope.QuantityLastMonth += parseFloat($scope.orderList[idx].selectedSpecify.QuantityLastMonth);
                $scope.QuantityCurrentMonth += parseFloat($scope.orderList[idx].selectedSpecify.QuantityCurrentMonth);

                $scope.receiptQuantities[$scope.orderList[idx].selectedProduct.ProductLineId] += $scope.orderList[idx].totalQuantity;
                $scope.totalQuantityInMonth += $scope.orderList[idx].totalQuantity;
                $scope.receiptPrices[$scope.orderList[idx].selectedProduct.ProductLineId] += $scope.orderList[idx].totalPrice;
                $scope.totalPriceInMonth += $scope.orderList[idx].totalPrice;
            }

            for (var idx in $scope.productLines) {
                $scope.quantities[$scope.productLines[idx].ProductLineId] += $scope.receiptQuantities[$scope.productLines[idx].ProductLineId];
                $scope.prices[$scope.productLines[idx].ProductLineId] += $scope.receiptPrices[$scope.productLines[idx].ProductLineId];
            }

            CommonService.getQuantityInMonthByProductLine($scope.dealer.DealerId, $scope.currentRole, $scope.currentLevel).then(function (data) {

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

        CommonService.getDealerIndicators($scope.dealer.DealerId, $scope.currentRole, $scope.currentLevel).then(function (data) {
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
                dealerid: $scope.dealer.DealerId,
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
    $scope.legacyConfirm = false;
    $scope.changeLegacy = function () {
        $scope.legacyConfirm = !$scope.legacyConfirm;
    }
    /////// END ORDER PREVIEW

    /////// BEGIN ORDER DETAIL
    $scope.order = {};
    $scope.status = ORDER_STATUS;
    $scope.factory = undefined;
    $scope.orderList = [];

    $scope.totalQuantityLastMonth = 0;
    $scope.totalQuantityCurrentMonth = 0;
    $scope.totalCount = 0;
    $scope.totalQuantity = 0;
    $scope.totalMoney = 0;

    $scope.initOrderReview = function () {
        // dismiss progress
        $scope.openProgress();
        document.body.style.cursor = 'wait';
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();
        $scope.currentDate = dd + '/' + mm + '/' + y;

        $scope.functions = DataService.getListFunction();
        if ($scope.functions == null) {
            initFunctionList();
        }

        CommonService.getOrderDetail($stateParams.OrderId, $scope.currentRole, $scope.currentLevel).then(function (data) {
            $scope.order = data;
            for (var idx in $scope.order.OrderDetail) {
                console.log($scope.order.OrderDetail[idx]);
                $scope.totalQuantityLastMonth += $scope.order.OrderDetail[idx].QuantityLastMonth;
                $scope.totalQuantityCurrentMonth += $scope.order.OrderDetail[idx].QuantityCurrentMonth;
                $scope.totalCount += $scope.order.OrderDetail[idx].Count;
                $scope.totalQuantity += $scope.order.OrderDetail[idx].Quantity;
                $scope.totalMoney += ($scope.order.OrderDetail[idx].Count * $scope.order.OrderDetail[idx].UnitPrice);
            }
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
                    $scope.modalProgress.dismiss('close');
                    document.body.style.cursor = 'auto';
                    $state.go('tabs.sale-sup-list', { DealerId: $scope.order.DealerId }, { reload: true }).then(function () {
                       
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
    /////// END ORDER DETAIL
    ////////// BEGIN SALE INFO
    $scope.roleLevel2Name = ROLE_LEVEL_2_NAME;
    $scope.user = AuthService.user();
    $scope.logout = function () {
        AuthService.logout();
        $state.go('login', {}, { reload: true }).then(function () {
        });
    }
    /////// END SALE INFO
});