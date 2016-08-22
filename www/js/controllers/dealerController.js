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
.controller('ModalInstanceNewItemCtrl', function ($scope, $rootScope, $modalInstance, AuthService, CommonService, products, roleId, level, selectedFactory, id, $modal, $log, categories) {
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
        numOrder: undefined,
        totalQuantity: 0,
        totalPrice: 0
    }
    $scope.submited = false;
    $scope.isLabelLoading = false;

    $scope.loadSpecify = function (order) {       
        $scope.isLabelLoading = true;
        if (order.selectedProduct) {          
            CommonService.getSpecify(order.selectedProduct.ProductName, id, roleId, level, selectedFactory.FactoryId, order.selectedProduct.BrandId).then(function (data) {
                console.log(data)
                //$scope.order.specifies = data;
                $scope.order.selectedSpecify = data;
                $scope.isLabelLoading = false;
                $('#numOrder').focus();
                $scope.calculator($scope.order);            
            }, function (error) {
                $scope.isLabelLoading = false;
                console.log(error)
                $rootScope.processRequestError(error);
            });
        }
        else {
            $scope.order.selectedSpecify = null;
            $scope.isLabelLoading = false;
            $scope.calculator($scope.order);
        }
    }

    function checkValid() {
        if ($scope.order.selectedProduct)
            return true;
        return false;
    }

    $scope.ok = function (isValid) {
        $scope.submited = true;
        if (!isValid || $scope.order.selectedSpecify == null || $scope.order.selectedSpecify == undefined || !checkValid())
            return;
        $modalInstance.close($scope.order);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.calculator = function (order) {
        if (order && order.selectedSpecify) {
            order.totalQuantity = ((order.selectedSpecify.Weight * order.numOrder) / 1000);
            order.totalPrice = order.selectedSpecify.UnitPrice * order.numOrder;
        }
    }

    //$scope.openPopup = function () {

    //    $scope.modalProgress = $modal.open({
    //        animation: true,
    //        templateUrl: 'order-item.html',
    //        size: 'sm',
    //        backdrop: 'static',
    //        keyboard: false
    //    });

    //    $scope.modalProgress.result.then(function (from) {

    //    }, function () {
    //        $log.info('Modal dismissed at: ' + new Date());
    //        //alert('Modal dismissed at: ' + new Date());
    //    });
    //};

    $scope.openProductFilter = function () {
            var modal = $modal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'filter-product.html',
                controller: 'ModalInstanceFilterProductCtrl',
                resolve: {
                    products: function () {
                        return products;
                    },
                    categories: function () {
                        return categories;
                    }
                }
            });

            modal.result.then(function (item) {
                if (item) {
                    $scope.order.selectedProduct = item;
                    $scope.loadSpecify($scope.order);
                }
            });
    }
})

.controller('ModalInstanceEditItemCtrl', function ($scope, $rootScope, $modalInstance, $modal, AuthService, CommonService, orderItem, products, roleId, level, index, selectedFactory, id, categories) {
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
        CommonService.getSpecify(order.selectedProduct.ProductName, id, roleId, level, selectedFactory.FactoryId, order.selectedProduct.BrandId).then(function (data) {
            console.log(data)
            //$scope.order.specifies = data;
            $scope.order.selectedSpecify = data;
            $scope.isLabelLoading = false;
            $('#numOrder').focus();
            $scope.calculator($scope.order);
        }, function (error) {
            $scope.isLabelLoading = false;
            console.log(error)
            $rootScope.processRequestError(error);
        });
    }

    function checkValid() {
        if ($scope.order.selectedProduct)
            return true;
        return false;
    }

    $scope.ok = function (mode, isValid) {
        $scope.submited = true;
        if (!isValid || !checkValid())
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
        if (order && order.selectedSpecify) {
            order.totalQuantity = ((order.selectedSpecify.Weight * order.numOrder) / 1000);
            order.totalPrice = order.selectedSpecify.UnitPrice * order.numOrder;
        }
    }

    $scope.openProductFilter = function () {
        var modal = $modal.open({
            animation: true,
            size: 'lg',
            templateUrl: 'filter-product.html',
            controller: 'ModalInstanceFilterProductCtrl',
            resolve: {
                products: function () {
                    return products;
                },
                categories: function () {
                    return categories;
                }
            }
        });

        modal.result.then(function (item) {
            if (item) {
                $scope.order.selectedProduct = item;
                $scope.loadSpecify($scope.order);
            }
        });
    }
})

.controller('ModalInstanceFilterProductCtrl', function ($scope, $modalInstance, products, categories) {
    $scope.products = products;
    $scope.key = '';
    $scope.categories = categories;
    $scope.cat = $scope.categories[0];
    $scope.select = function (product) {
        $modalInstance.close(product);
    }

    $scope.setCat = function (item) {
        $scope.cat = item;
    }

    $scope.filterCritial = function (keys, category) {
        return function (item) {
            var orgStr = item.ProductName + ' ' + item.ProductLineName;
            var removeStr = $scope.removeDiacritics(item.ProductName + ' ' + item.ProductLineName);
            
            if (category) {
                var keyList = [];
                //split key by space
                if (keys)
                    keyList = keys.split(' ');
                keyList.push(category);
                //console.log(keyList);
                for (var idx in keyList) {
                    //Build regexp by key
                    var reg = new RegExp(keyList[idx], "i");
                    //Key not match
                    if (reg.test(orgStr) || reg.test(removeStr)) {
                        //console.log(orgStr, keyList[idx]);
                    }
                    else
                        return false;
                }
                return true;
            }
            else
                return true;
        }
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.removeDiacritics = function (str) {

        var defaultDiacriticsRemovalMap = [
          { 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
          { 'base': 'AA', 'letters': /[\uA732]/g },
          { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g },
          { 'base': 'AO', 'letters': /[\uA734]/g },
          { 'base': 'AU', 'letters': /[\uA736]/g },
          { 'base': 'AV', 'letters': /[\uA738\uA73A]/g },
          { 'base': 'AY', 'letters': /[\uA73C]/g },
          { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
          { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
          { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
          { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g },
          { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g },
          { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
          { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
          { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
          { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
          { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
          { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
          { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
          { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g },
          { 'base': 'LJ', 'letters': /[\u01C7]/g },
          { 'base': 'Lj', 'letters': /[\u01C8]/g },
          { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
          { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
          { 'base': 'NJ', 'letters': /[\u01CA]/g },
          { 'base': 'Nj', 'letters': /[\u01CB]/g },
          { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
          { 'base': 'OI', 'letters': /[\u01A2]/g },
          { 'base': 'OO', 'letters': /[\uA74E]/g },
          { 'base': 'OU', 'letters': /[\u0222]/g },
          { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
          { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
          { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g },
          { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g },
          { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
          { 'base': 'TZ', 'letters': /[\uA728]/g },
          { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
          { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
          { 'base': 'VY', 'letters': /[\uA760]/g },
          { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
          { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
          { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
          { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
          { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g },
          { 'base': 'aa', 'letters': /[\uA733]/g },
          { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g },
          { 'base': 'ao', 'letters': /[\uA735]/g },
          { 'base': 'au', 'letters': /[\uA737]/g },
          { 'base': 'av', 'letters': /[\uA739\uA73B]/g },
          { 'base': 'ay', 'letters': /[\uA73D]/g },
          { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
          { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
          { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
          { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g },
          { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
          { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
          { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g },
          { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g },
          { 'base': 'hv', 'letters': /[\u0195]/g },
          { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
          { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
          { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
          { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g },
          { 'base': 'lj', 'letters': /[\u01C9]/g },
          { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
          { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g },
          { 'base': 'nj', 'letters': /[\u01CC]/g },
          { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g },
          { 'base': 'oi', 'letters': /[\u01A3]/g },
          { 'base': 'ou', 'letters': /[\u0223]/g },
          { 'base': 'oo', 'letters': /[\uA74F]/g },
          { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
          { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
          { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g },
          { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g },
          { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g },
          { 'base': 'tz', 'letters': /[\uA729]/g },
          { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
          { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
          { 'base': 'vy', 'letters': /[\uA761]/g },
          { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
          { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
          { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g },
          { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }
        ];

        for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
            str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
        }

        return str;
    }
})

.controller('DealerController', function ($scope, $state, $stateParams, $timeout, $interval, $rootScope, $modal, $log, $q, $stickyState, $translate,
   DataService, AuthService, CommonService,
    ORDER_STATUS, PRODUCT_LINE_ID, TIMER, ROLE_FUNCTIONS, USER_ROLES, USER_LEVELS, APP) {
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
        var modalConfirm = openConfirmReason($translate.instant('TITLE_REASON'));
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
    $scope.selected = {};
    $scope.info = {};
    var duplicateData = null;

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
                },
                selectedFactory: function () {
                    return $scope.selected.Factory;
                },
                id: function () {
                    return AuthService.user().Id;
                },
                categories: function () {
                    return $scope.catList;
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
                    // If duplicate order
                    if (duplicateData) {
                        //Detect labels in order list
                        for (var idx in duplicateData.OrderDetail) {
                            var orderItem = duplicateData.OrderDetail[idx];
                            for (var idxLabel in $scope.labels) {
                                if (!$scope.models[$scope.labels[idxLabel].BrandName]
                                    && orderItem.BrandId == $scope.labels[idxLabel].BrandId) {
                                    $scope.models[$scope.labels[idxLabel].BrandName] = true;
                                    break;
                                }
                            }
                        }
                        //Auto load product list
                        $scope.confirmLabels();
                    }
                        // If new order
                    else {
                        if ($scope.labels.length == 1) {
                            //$scope.confirmLabel = true;
                            //$scope.labelValid = true;
                            $scope.models[$scope.labels[0].BrandName] = true;
                            $scope.confirmLabels();
                        }
                        else {
                            $scope.confirmLabel = false;
                            // Test duplicate order
                            //$scope.models[$scope.labels[0].BrandName] = true;
                            //$scope.models[$scope.labels[1].BrandName] = true;
                            //$scope.confirmLabels();
                        }
                    }

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
        if (DataService.getDuplicateData()) {
            duplicateData = DataService.getDuplicateData();
            DataService.setDuplicateData(null);
        }
        //console.log("INIT");
        $scope.refreshFlag = false;

        // Checking delivery date        
        var toDay = new Date();
        // In weekend
        // if (toDay.getDay() == 0)
        //     $scope.selected.Day = 1;
        // else if (toDay.getDay() == 6)
        //     $scope.selected.Day = 2;
            
        // else 

        // Out of SC service
        if (toDay.getHours() >= 16) {
            if (toDay.getDay() == 6)
                $scope.selected.Day = 2;
            else
                $scope.selected.Day = 1;
        }
        else {
            if (toDay.getDay() == 0)
                $scope.selected.Day = 1;
            else
                $scope.selected.Day = 0;
        }
        $scope.selectDeliveryDate();

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

                    //If duplicate -> auto load data
                    if (duplicateData) {
                        for (var idx in $scope.factories) {
                            if ($scope.factories[idx].FactoryId == duplicateData.FactoryId)
                                $scope.selected.Factory = $scope.factories[idx];
                        }
                        if (!$scope.selected.Factory)
                            $scope.selected.Factory = $scope.factories[0];
                    }
                        //Else get first ele
                    else
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
                
                //If duplicate -> auto load data
                if (duplicateData) {
                    for (var idx in $scope.factories) {
                        if ($scope.factories[idx].FactoryId == duplicateData.FactoryId)
                            $scope.selected.Factory = $scope.factories[idx];
                    }
                    if (!$scope.selected.Factory)
                        $scope.selected.Factory = $scope.factories[0];
                }
                    //Else get first ele
                else
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
        if (duplicateData) {
            $scope.info.recipient = duplicateData.Recipient;
            $scope.info.licensePlate = duplicateData.LicensePlate;
        }
        else {
            CommonService.getRecommendDriver(null, $scope.currentRole, $scope.currentLevel).then(function (data) {
                console.log(data);
                $scope.recommend = data;
                $scope.info.recipient = data.Recipient;
                $scope.info.licensePlate = data.LicensePlate;
            }, function (err) {
                console.log(err);
                $rootScope.processRequestError(err);
            });
        }
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
        CommonService.getSpecify(order.selectedProduct.ProductName, AuthService.user().Id, $scope.currentRole, $scope.currentLevel, $scope.selected.Factory.FactoryId, order.selectedProduct.BrandId).then(function (data) {
            order.selectedSpecify = data;
            order.totalPrice = order.selectedSpecify.UnitPrice * order.numOrder;
            order.totalQuantity = (order.selectedSpecify.Weight * order.numOrder) / 1000;
            $scope.calculator();
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

    // Synchronous load label list
    var retVal = [];
    function loadBatchLabel(labelList) {
        retVal = [];
        var deferred = $q.defer();
        var urlCalls = [];
        angular.forEach(labelList, function (value, labelName) {
            urlCalls.push(CommonService.getProducts(null, value.BrandId, $scope.currentRole, $scope.currentLevel, $scope.selected.Factory.FactoryId).then(function (data) {
                if (modelsData[labelName] == null) {
                    modelsData[labelName] = data;
                }
                retVal = retVal.concat(modelsData[labelName]);
            }));
        });
        // they may, in fact, all be done, but this
        // executes the callbacks in then, once they are
        // completely finished.
        $q.all(urlCalls)
        .then(
          function (results) {
              deferred.resolve(retVal)
          },
        function (errors) {
            deferred.reject(errors);
        },
        function (updates) {
            deferred.update(updates);
        });
        return deferred.promise;
    }

    function getCategories(products) {
        var catList = [];
        angular.forEach(products, function (value, key) {
            if (catList.indexOf(value.ProductLineName) === -1) {
                catList.push(value.ProductLineName);
            }
        });
        return catList;
    }

    var curLoadList = {};
    $scope.confirmLabels = function () {
        $scope.labelValid = isLabelValid();
        if (!$scope.labelValid)
            return;
        $scope.refreshFlag = false;
        $scope.confirmLabel = !$scope.confirmLabel;
        //console.log("Confirm Label");

        //Experimental - auto add selected product list
        var loadList = {};

        if ($scope.confirmLabel) {
            console.log("START");
            console.log(modelsBack);
            // Autofill data when user click duplicate
            if (duplicateData) {
                // Each model detect brand need to load
                for (var item in $scope.models) {
                    // Brand value change & true
                    if ($scope.models[item] && !modelsBack[item]) {
                        for (var idx in $scope.labels) {
                            if ($scope.labels[idx].BrandName == item) {
                                //$scope.loadProducts($scope.labels[idx].BrandId, $scope.labels[idx].BrandName);
                                loadList[item] = $scope.labels[idx];
                            }
                        }
                    }
                }
                console.log("Load List", loadList);
                loadBatchLabel(loadList).then(function (data) {
                    //console.log("load batch labels", data);
                    $scope.products = data;
                    $scope.duplicateProductList();
                    $scope.catList = getCategories($scope.products);
                }, function (err) {
                    $scope.refreshFlag = true;
                    console.log(err);
                });
            }
            else {
                // Load Data
                for (var item in $scope.models) {
                    // Add data
                    if ($scope.models[item] && !modelsBack[item]) {
                        for (var idx in $scope.labels) {
                            if ($scope.labels[idx].BrandName == item) {
                                //$scope.loadProducts($scope.labels[idx].BrandId, $scope.labels[idx].BrandName);
                                loadList[item] = $scope.labels[idx];
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

                loadBatchLabel(loadList).then(function (data) {
                    $scope.products = data;
                    $scope.catList = getCategories($scope.products);
                }, function (err) {
                    $scope.refreshFlag = true;
                    console.log(err);
                });
            }
            modelsBack = clone($scope.models);
            console.log(modelsBack);
            console.log("END");
            //console.log($scope.products);
            //$('.select2').select2();           
        }

        curLoadList = loadList;
    }

    // Duplicate product list from order detail
    $scope.duplicateProductList = function () {
        // Each product in duplicate list
        for (var idx in duplicateData.OrderDetail) {
            var orgItem = duplicateData.OrderDetail[idx];

            var orderItem = {
                products: [],
                specifies: [],
                selectedProduct: undefined,
                selectedSpecify: undefined,
                numOrder: 1,
                totalQuantity: 0,
                totalPrice: 0
            }

            // Copy product info
            orderItem.numOrder = orgItem.Count;

            // Compare in current product list
            $scope.products.forEach(function (element, index, array) {
                if (element.ProductLineId == orgItem.ProductLineId && element.BrandId == orgItem.BrandId
                    && element.ProductName == orgItem.ProductName) {
                    //if (element.ProductName == orgItem.ProductName){
                    orderItem.selectedProduct = element;
                    return true;
                }
                return false;
            });

            // Get new specify
            if (orderItem.selectedProduct)
                $scope.loadSpecify(orderItem);

            // Add to order list
            $scope.orderList.push(orderItem);
        }
        $scope.calculator();
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
            Note: $scope.info.note,
            ExtendInfo: {
                recipient: $scope.info.recipient,
                licensePlate: $scope.info.licensePlate
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
                    return AuthService.user().Id;
                },
                categories: function () {
                    return $scope.catList;
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
                    $scope.orderList.splice(data.index, 1);
                }
                else {
                    $scope.orderList[data.index] = data.orderItem;
                }

                $scope.calculator();
            }
        });
    }

    function _reloadSpecify() {
        $scope.orderList.forEach(function (orderItem) {
            CommonService.getSpecify(orderItem.selectedProduct.ProductName, AuthService.user().Id, $scope.currentRole, $scope.currentLevel, 
                $scope.selected.Factory.FactoryId, orderItem.selectedProduct.BrandId).then(function (data) {
                    orderItem.selectedSpecify = data;
                }, function (error) {
                    console.log(error);
                });
        });

    }

    function _convertLanguage(orgList, newList) {
        for (var idx1 in orgList) {
            for (var idx2 in newList) {
                if (orgList[idx1].ProductName === newList[idx2].ProductName) {
                    orgList[idx1].ProductLineName = newList[idx2].ProductLineName;
                }
            }
        }
    }

    $scope.$on('language-changed', function () {
        _reloadSpecify();
        modelsData = {};
        modelsBack = {};
        //$scope.openProgress();
        loadBatchLabel(curLoadList).then(function (res) {
            _convertLanguage($scope.products, res);
            $scope.catList = getCategories($scope.products);
            //$scope.modalProgress.dismiss('close');
        }, function (err) {
            console.log(err);
            //$scope.modalProgress.dismiss('close');
        });
    });
    /////// END ORDER

    /////// BEGIN ORDER PREVIEW
    $scope.deliveryDate = undefined;
    $scope.deliveryDateView = undefined;

    $scope.productLines = [];
    $scope.receiptQuantities = {};
    $scope.receiptPrices = {};
    $scope.receiptView = {};
    $scope.receiptNumOrder = {};

    $scope.quantities = {};
    $scope.totalQuantityInMonth = 0;
    $scope.prices = {};
    $scope.totalPriceInMonth = 0;

    $scope.indicators = 0;

    $scope.success = false;
    $scope.processing = false;
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
                $scope.receiptNumOrder[$scope.productLines[idx].ProductLineId] = 0;
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

                $scope.receiptNumOrder[$scope.orderList[idx].selectedProduct.ProductLineId] += $scope.orderList[idx].numOrder;
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
        if ($scope.processing)
            return;
        $scope.processing = true;
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
            $scope.processing = false;
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
        var modalConfirm = openConfirmReason($translate.instant('TITLE_REASON'));
        modalConfirm.result.then(function (result) {
            //if (result) {
            $scope.openProgress();
            document.body.style.cursor = 'wait';

            CommonService.removeOrder(order.OrderId, $scope.currentRole, $scope.currentLevel, result).then(function (data) {
                $scope.modalProgress.dismiss('close');
                document.body.style.cursor = 'auto';
                $state.go('tabs.dealer-list', {}, { reload: true });
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

    $scope.duplicateOrder = function (order) {
        DataService.setDuplicateData(order);
        $stickyState.reset('tabs.dealer-order');
        $state.go('tabs.dealer-order', {}, { reload: true });
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

    $scope.appversion = APP.VERSION;
})