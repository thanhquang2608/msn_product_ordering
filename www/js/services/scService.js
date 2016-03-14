'user strict';

app.service('SCService', function () {
    var scServiceFactory = {};
    var currentDealer = null;
    var listDealer = null;

    var _setCurrentDealer = function (data) {
        currentDealer = data;
    }

    var _getCurrentDealer = function () {
        return currentDealer;
    }

    var _setListDealer = function (data) {
        listDealer = data;
    }

    var _getListDealer = function () {
        return listDealer;
    }

    scServiceFactory.setCurrentDealer = _setCurrentDealer;
    scServiceFactory.getCurrentDealer = _getCurrentDealer;
    scServiceFactory.setListDealer = _setListDealer;
    scServiceFactory.getListDealer = _getListDealer;

    return scServiceFactory;
});