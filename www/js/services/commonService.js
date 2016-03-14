'use strict';

app.service('CommonService', function ($http, NETWORK, TIMER, AuthService) {
    var serviceBase = NETWORK.BASE_URL;
    var user = AuthService.user();
    var commonServiceFactory = {};

    var _getFactories = function (ac_pc, roleId, level) {
        return $http.get(serviceBase + '/factory/list?ac_pc=' + ac_pc + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getLabels = function (ac_pc, roleId, level) {
        return $http.get(serviceBase + "/brand/list?ac_pc=" + ac_pc + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getProducts = function (dealerId, labelId, roleId, level, factoryId) {
        var params = "brandid=" + labelId + "&roleid=" + roleId + "&level=" + level + "&factoryid=" + factoryId;
        if (dealerId)
            params += '&dealerid=' + dealerId;
        return $http.get(serviceBase + "/product/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getSpecify = function (productName, dealerId, roleId, level) {
        var params = "productname=" + productName + "&roleid=" + roleId + "&level=" + level;
        if (dealerId)
            params += "&dealerid=" + dealerId;

        return $http.get(serviceBase + "/product/specification?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _addOrder = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/order/add",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })

        //return $http.post(serviceBase + "/order/add", params)
        //    .then(function (response) {
        //        return response.data;
        //    });
    }

    var _getListOrder = function (dealerId, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;
        if (dealerId) {
            params += "&dealerid=" + dealerId;
        }

        return $http.get(serviceBase + "/order/dealer/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getListOrderByParam = function (params) {
        return $http.get(serviceBase + "/order/dealer/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _removeOrder = function (orderId, roleId, level, reason) {
        var params = {
            orderid: orderId,
            roleid: roleId,
            level: level,
            reason: reason
        }

        return $http({
            method: 'POST',
            url: serviceBase + "/order/delete",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _getQuantityInMonthByProductLine = function (dealerId, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;;
        if (dealerId) {
            params += "&dealerid=" + dealerId;
        }

        return $http.get(serviceBase + "/order/dealer/quantityinmonth?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            response.data;
        });
    }

    var _getOrdersOfFactory = function (factoryId, roleId, level, year, month, status) {
        var params = "factoryid=" + factoryId + "&roleid=" + roleId + "&level=" + level;
        if (year)
            params += "&year=" + year;
        if (month)
            params += "&month=" + month;
        if (status)
            params += "&status=" + status;
        return $http.get(serviceBase + "/order/factory/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getOrdersOfFactoryByParam = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/order/factory/list",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _getOrderDetail = function (orderId, roleId, level) {
        return $http.get(serviceBase + "/order/detail?orderid=" + orderId + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _appoveOrder = function (orderId, roleId, level) {
        return $http.post(serviceBase + "/order/approve?orderid=" + orderId + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _disAppoveOrder = function (orderId, roleId, level, reason) {
        return $http.post(serviceBase + "/order/disapprove?orderid=" + orderId + "&roleid=" + roleId + "&level=" + level + "&reason=" + reason, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getDealerIndicators = function (dealerId, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;;
        if (dealerId) {
            params += "&dealerid=" + dealerId;
        }

        return $http.get(serviceBase + "/dealer/goal/quantityinmonth?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _deliveryConfirm = function (orderId, roleId, level) {
        return $http.post(serviceBase + "/order/deliver?orderid=" + orderId + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getDealerBySC = function (scId, roleId, level) {
        return $http.get(serviceBase + "/dealer/factory/list?factoryid=" + scId + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getRecommendDriver = function (dealerId, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;;
        if (dealerId) {
            params += "&dealerid=" + dealerId;
        }

        return $http.get(serviceBase + "/order/dealer/recommenddeliverinfo?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            //console.log(response);
            return response.data;
        });
    }

    var _getRecommendFactory = function (dealerId, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;;
        if (dealerId) {
            params += "&dealerid=" + dealerId;
        }
        return $http.get(serviceBase + "/factory/recommenddealer?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getDealerBySale = function (saleId, roleId, level, provinceId) {
        var params = "roleid=" + roleId + "&level=" + level + "&provinceid=" + provinceId;
        //return $http.get(serviceBase + "/dealer/sale/list?saleid=" + saleId + "&roleid=" + roleId + "&level=" + level).then(function (response) {
        return $http.get(serviceBase + "/dealer/sale/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getTotalOrderQuantity = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/report/total-quantity-order",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _getProductLines = function (ac_pc, roleId, level) {
        return $http.get(serviceBase + "/productline/list?ac_pc=" + ac_pc + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getProvincesBySale = function (saleId, roleId, level) {
        //return $http.get(serviceBase + "/province/sale?saleid=" + saleId + "&roleid=" + roleId + "&level=" + level).then(function (response) {
        return $http.get(serviceBase + "/province/sale?" + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getDealersByProvince = function (provinceId) {
        return $http.get(serviceBase + "/province/sale?saleid=" + provinceId, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getTotalOrder = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/report/list-order",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _downloadQuantityOrder = function (factoryId, fromDate, toDate) {
        var params = "?factoryId=" + factoryId + "&fromdate=" + fromDate + "&todate=" + toDate;
        return $http.get(serviceBase + "/report/download/total-quantity-order" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _downloadListOrder = function (factoryId, fromDate, toDate) {
        var params = "?factoryId=" + factoryId + "&fromdate=" + fromDate + "&todate=" + toDate;
        return $http.get(serviceBase + "/report/download/list-order" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getDealerByProvince = function (provinceId, ac_pc, roleId, level) {
        var params = "?provinceid=" + provinceId + "&ac_pc=" + ac_pc + "&roleid=" + roleId + "&level=" + level;
        return $http.get(serviceBase + "/dealer/province/list" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getFactoryBySCSup = function (scId, roleId, level) {
        //return $http.get(serviceBase + "/factory/sc?scid=" + scId + "&roleid=" + roleId + "&level=" + level).then(function (response) {
        return $http.get(serviceBase + "/factory/sc?" + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getTotalOrderQuantityBySup = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/report/sup/total-quantity-order",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _getTotalOrderBySup = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/report/sup/list-order",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _getFunctionList = function () {
        return $http.get(serviceBase + "/function/user", { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getRoleList = function () {
        return $http.get(serviceBase + "/role/user", { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getRecommendLabels = function (id, roleId, level, factoryId) {
        var params = "roleid=" + roleId + "&level=" + level + "&factoryid=" + factoryId;
        if (id) {
            params += "&dealerid=" + id;
        }
        return $http.get(serviceBase + "/brand/recommenddealer?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getProvinces = function (roleId, level) {
        return $http.get(serviceBase + "/province/list?roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getDistricts = function (provinceId, roleId, level) {
        return $http.get(serviceBase + "/district/province?provinceid=" + provinceId + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getWards = function (districtId, roleId, level) {
        return $http.get(serviceBase + "/ward/district?districtid=" + districtId + "&roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _createDealer = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/dealer/add",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _getPriceCategory = function (ac_pc, factoryId, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level + "&ac_pc=" + ac_pc + "&factoryid=" + factoryId;
        return $http.get(serviceBase + "/pricecategory/factory?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getDealersByAdmin = function (roleId, level, page, pageSize, totalPageFlag, keyword) {
        var params = "roleid=" + roleId + "&level=" + level + "&page=" + page + "&pagesize=" + pageSize + "&totalpage=" + totalPageFlag + "&search=" + keyword;
        return $http.get(serviceBase + "/dealer/admin/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getInfoDetail = function (id, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level + "&dealerid=" + id;
        return $http.get(serviceBase + "/dealer/admin/detail?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getAllRole = function (roleId, level) {
        return $http.get(serviceBase + "/role/list?" + "roleid=" + roleId + "&level=" + level, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getSalesByAdmin = function (roleId, level, page, pageSize, totalPageFlag, keyword) {
        var params = "roleid=" + roleId + "&level=" + level + "&page=" + page + "&pagesize=" + pageSize + "&totalpage=" + totalPageFlag + "&search=" + keyword;
        return $http.get(serviceBase + "/sale/admin/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getSaleDetail = function (id, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level + "&saleid=" + id;
        return $http.get(serviceBase + "/sale/admin/detail?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getSCByAdmin = function (roleId, level, page, pageSize, totalPageFlag, keyword) {
        var params = "roleid=" + roleId + "&level=" + level + "&page=" + page + "&pagesize=" + pageSize + "&totalpage=" + totalPageFlag + "&search=" + keyword;;
        return $http.get(serviceBase + "/sc/admin/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getSCDetail = function (id, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level + "&scid=" + id;
        return $http.get(serviceBase + "/sc/admin/detail?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getAdminDetail = function (id, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level + "&adminid=" + id;
        return $http.get(serviceBase + "/admin/detail?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }
    var _deleteDealerByAdmin = function (dealerId, roleId, level) {
        var params = {
            roleid: roleId,
            level: level,
            dealerid: dealerId
        }
        return $http({
            method: 'POST',
            url: serviceBase + "/dealer/delete",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _deleteSCByAdmin = function (scId, roleId, level) {
        var params = {
            roleid: roleId,
            level: level,
            scid: scId
        }
        return $http({
            method: 'POST',
            url: serviceBase + "/sc/delete",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _deleteSaleByAdmin = function (saleId, roleId, level) {
        var params = {
            roleid: roleId,
            level: level,
            saleid: saleId
        }
        return $http({
            method: 'POST',
            url: serviceBase + "/sale/delete",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _createSale = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/sale/add",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _updateSale = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/sale/add",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _createSC = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/sc/add",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _updateSC = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/sc/add",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _getUsersByAdmin = function (roleId, level, page, pageSize, totalPageFlag, keyword, sRoleId) {
        var params = "roleid=" + roleId + "&level=" + level + "&page=" + page + "&pagesize=" + pageSize + "&totalpage=" + totalPageFlag + "&search=" + keyword + "&sroleid=" + sRoleId;
        return $http.get(serviceBase + "/user/admin/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getUserDetail = function (id, roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level + "&userid=" + id;
        return $http.get(serviceBase + "/user/admin/detail?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getPricesByAdmin = function (roleId, level, page, pageSize, totalPageFlag, keyword) {
        var params = "roleid=" + roleId + "&level=" + level + "&page=" + page + "&pagesize=" + pageSize + "&totalpage=" + totalPageFlag + "&search=" + keyword;
        return $http.get(serviceBase + "/price/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getAdminByAdmin = function (roleId, level, page, pageSize, totalPageFlag, keyword) {
        var params = "roleid=" + roleId + "&level=" + level + "&page=" + page + "&pagesize=" + pageSize + "&totalpage=" + totalPageFlag + "&search=" + keyword;
        return $http.get(serviceBase + "/admin/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _resetPassword = function (userId, roleId, level) {
        var params = {
            roleid: roleId,
            level: level,
            userid: userId
        }
        return $http({
            method: 'POST',
            url: serviceBase + "/user/admin/resetpassword",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _loadObjectList = function (roleId, level, sRoleId, keyword, maxRow) {
        var params = "roleid=" + roleId + "&level=" + level + "&sroleid=" + sRoleId + "&search=" + keyword + "&maxrow=" + maxRow;
        return $http.get(serviceBase + "/object/list?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _updateUserRole = function (params) {
        return $http({
            method: 'POST',
            url: serviceBase + "/user/role/update",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _getLatestPriceUpdateTime = function (roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;
        return $http.get(serviceBase + "/update/price/latest?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getLatestDealerUpdateTime = function (roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;
        return $http.get(serviceBase + "/update/dealer/latest?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getLatestSaleUpdateTime = function (roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;
        return $http.get(serviceBase + "/update/sale/latest?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getLatestUserUpdateTime = function (roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;
        return $http.get(serviceBase + "/update/user/latest?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _getLatestSCUpdateTime = function (roleId, level) {
        var params = "roleid=" + roleId + "&level=" + level;
        return $http.get(serviceBase + "/update/sc/latest?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    var _updatePriceList = function (roleId, level) {
        var params = {
            roleid: roleId,
            level: level
        }
        return $http({
            method: 'POST',
            url: serviceBase + "/update/price",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _updateDealerList = function (roleId, level) {
        var params = {
            roleid: roleId,
            level: level
        }
        return $http({
            method: 'POST',
            url: serviceBase + "/update/dealer",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _updateSCList = function (roleId, level) {
        var params = {
            roleid: roleId,
            level: level
        }
        return $http({
            method: 'POST',
            url: serviceBase + "/update/sc",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }
    var _updateSaleList = function (roleId, level) {
        var params = {
            roleid: roleId,
            level: level
        }
        return $http({
            method: 'POST',
            url: serviceBase + "/update/sale",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _updateUserList = function (roleId, level) {
        var params = {
            roleid: roleId,
            level: level
        }
        return $http({
            method: 'POST',
            url: serviceBase + "/update/user",
            headers: { 'Content-Type': 'application/json' },
            data: params,
            timeout: TIMER.TIME_OUT
        }).then(function (response) {
            return response.data;
        })
    }

    var _getDealerInfoBySale = function (roleId, level, dealerid) {
        var params = "roleid=" + roleId + "&level=" + level +"&dealerid=" + dealerid;
        return $http.get(serviceBase + "/dealer/find?" + params, { timeout: TIMER.TIME_OUT }).then(function (response) {
            return response.data;
        });
    }

    commonServiceFactory.getFactories = _getFactories;
    commonServiceFactory.getLabels = _getLabels;
    commonServiceFactory.getProducts = _getProducts;
    commonServiceFactory.getSpecify = _getSpecify;
    commonServiceFactory.addOrder = _addOrder;
    commonServiceFactory.getListOrder = _getListOrder;
    commonServiceFactory.removeOrder = _removeOrder;
    commonServiceFactory.getQuantityInMonthByProductLine = _getQuantityInMonthByProductLine;
    commonServiceFactory.getOrdersOfFactory = _getOrdersOfFactory;
    commonServiceFactory.getOrderDetail = _getOrderDetail;
    commonServiceFactory.appoveOrder = _appoveOrder;
    commonServiceFactory.disAppoveOrder = _disAppoveOrder;
    commonServiceFactory.getDealerIndicators = _getDealerIndicators;
    commonServiceFactory.deliveryConfirm = _deliveryConfirm;
    commonServiceFactory.getListOrderByParam = _getListOrderByParam;
    commonServiceFactory.getOrdersOfFactoryByParam = _getOrdersOfFactoryByParam;
    commonServiceFactory.getDealerBySC = _getDealerBySC;
    commonServiceFactory.getRecommendDriver = _getRecommendDriver;
    commonServiceFactory.getRecommendFactory = _getRecommendFactory;
    commonServiceFactory.getDealerBySale = _getDealerBySale;
    commonServiceFactory.getTotalOrderQuantity = _getTotalOrderQuantity;
    commonServiceFactory.getProductLines = _getProductLines;
    commonServiceFactory.getProvincesBySale = _getProvincesBySale;
    commonServiceFactory.getTotalOrder = _getTotalOrder;
    commonServiceFactory.downloadQuantityOrder = _downloadQuantityOrder;
    commonServiceFactory.downloadListOrder = _downloadListOrder;
    commonServiceFactory.getDealerByProvince = _getDealerByProvince;
    commonServiceFactory.getFactoryBySCSup = _getFactoryBySCSup;
    commonServiceFactory.getTotalOrderQuantityBySup = _getTotalOrderQuantityBySup;
    commonServiceFactory.getTotalOrderBySup = _getTotalOrderBySup;
    commonServiceFactory.getFunctionList = _getFunctionList;
    commonServiceFactory.getRoleList = _getRoleList;
    commonServiceFactory.getRecommendLabels = _getRecommendLabels;
    commonServiceFactory.getProvinces = _getProvinces;
    commonServiceFactory.getDistricts = _getDistricts;
    commonServiceFactory.getWards = _getWards;
    commonServiceFactory.createDealer = _createDealer;
    commonServiceFactory.getPriceCategory = _getPriceCategory;
    commonServiceFactory.getDealersByAdmin = _getDealersByAdmin;
    commonServiceFactory.getInfoDetail = _getInfoDetail;
    commonServiceFactory.getAllRole = _getAllRole;
    commonServiceFactory.getSalesByAdmin = _getSalesByAdmin;
    commonServiceFactory.getSaleDetail = _getSaleDetail;
    commonServiceFactory.getSCByAdmin = _getSCByAdmin;
    commonServiceFactory.deleteDealerByAdmin = _deleteDealerByAdmin;
    commonServiceFactory.deleteSCByAdmin = _deleteSCByAdmin;
    commonServiceFactory.deleteSaleByAdmin = _deleteSaleByAdmin;
    commonServiceFactory.getSCDetail = _getSCDetail;
    commonServiceFactory.getAdminDetail = _getAdminDetail;
    commonServiceFactory.createSale = _createSale;
    commonServiceFactory.updateSale = _updateSale;
    commonServiceFactory.createSC = _createSC;
    commonServiceFactory.updateSC = _updateSC;
    commonServiceFactory.getUsersByAdmin = _getUsersByAdmin;
    commonServiceFactory.getUserDetail = _getUserDetail;
    commonServiceFactory.getPricesByAdmin = _getPricesByAdmin;
    commonServiceFactory.getAdminByAdmin = _getAdminByAdmin;
    commonServiceFactory.resetPassword = _resetPassword;
    commonServiceFactory.loadObjectList = _loadObjectList;
    commonServiceFactory.updateUserRole = _updateUserRole;
    commonServiceFactory.getLatestPriceUpdateTime = _getLatestPriceUpdateTime;
    commonServiceFactory.getLatestDealerUpdateTime = _getLatestDealerUpdateTime;
    commonServiceFactory.getLatestSCUpdateTime = _getLatestSCUpdateTime;
    commonServiceFactory.getLatestSaleUpdateTime = _getLatestSaleUpdateTime;
    commonServiceFactory.getLatestUserUpdateTime = _getLatestUserUpdateTime;
    commonServiceFactory.updatePriceList = _updatePriceList;
    commonServiceFactory.updateDealerList = _updateDealerList;
    commonServiceFactory.updateSaleList = _updateSaleList;
    commonServiceFactory.updateSCList = _updateSCList;
    commonServiceFactory.updateUserList = _updateUserList;
    commonServiceFactory.getDealerInfoBySale = _getDealerInfoBySale;

    return commonServiceFactory;
});