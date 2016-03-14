'user strict';

app.service('DataService', function () {
    var factories = {};
    var labels = {};
    var listFunction = null;
    var listRole = null;

    var dataServiceFactory = {};

    var _getFactories = function () {
        return factories;
    }

    var _setFactories = function (data) {
        factories = data;
    }

    var _getLabels = function () {
        return labels;
    }

    var _setLabels = function (data) {
        labels = data;
    }

    // this temp data for bug angular ui router extras with state has params
    var currentDealerForSale = null;

    var _getDealerForSale = function () {
        return currentDealerForSale;
    }

    var _setDealerForSale = function (data) {
        currentDealerForSale = data;

    }

    var currentProvinceForSaleSup = null;

    var _getProvinceForSaleSup = function () {
        return currentProvinceForSaleSup;
    }

    var _setProvinceForSaleSup = function (data) {
        currentProvinceForSaleSup = data;

    }

    var _getListFunction = function () {
        return listFunction;
    }

    var _setListFunction = function (data) {
        listFunction = data;
    }

    var _getListRole = function () {
        return listRole;
    }

    var _setListRole = function (data) {
        listRole = data;
    }

    dataServiceFactory.getFactories = _getFactories;
    dataServiceFactory.setFactories = _setFactories;
    dataServiceFactory.getLabels = _getLabels;
    dataServiceFactory.setLabels = _setLabels;
    dataServiceFactory.getDealerForSale = _getDealerForSale;
    dataServiceFactory.setDealerForSale = _setDealerForSale;
    dataServiceFactory.getProvinceForSaleSup = _getProvinceForSaleSup;
    dataServiceFactory.setProvinceForSaleSup = _setProvinceForSaleSup;
    dataServiceFactory.getListFunction = _getListFunction;
    dataServiceFactory.setListFunction = _setListFunction;
    dataServiceFactory.getListRole = _getListRole;
    dataServiceFactory.setListRole = _setListRole;

    return dataServiceFactory;
});