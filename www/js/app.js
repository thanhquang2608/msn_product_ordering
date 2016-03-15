var app = angular.module('OrderApp', ['LocalStorageModule', 'ct.ui.router.extras', 'ui.bootstrap', 'ngTouch']);

// Declare app level module which depends on filters, and services
//angular.module('OrderApp', [
//  'OrderApp.filters',
//  'OrderApp.services',
//  'OrderApp.directives',
//  'OrderApp.controllers'
//]).
app.config(['$stateProvider', '$stickyStateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $stickyStateProvider, $urlRouterProvider, $httpProvider) {
        //$stickyStateProvider.enableDebug(true);
        //$urlRouterProvider.otherwise("tabs.dealer-list");
        $stateProvider
            .state('auth', {
                url: '/auth',
                cache: false,
                templateUrl: 'views/blank.html',
                controller: "AuthController"
            })

            .state('login', {
                url: '/login',
                cache: false,
                templateUrl: 'views/login.html',
                controller: "LoginController"
            })
            .state('change-password', {
                url: '/change-password',
                templateUrl: 'views/change-password.html',
                controller: 'UserController'
            })
            .state('tabs', {
                url: '/tabs',
                //abstract: true,
                templateUrl: 'views/tabs.html',
                controller: "TabController"
            })

            /////// TAB DEALER
            .state('tabs.dealer-list', {
                url: '/dealer-list',
                //sticky: true,
                //views: {
                //    'dealer-list': {
                        templateUrl: 'views/dealer/tabs-dealer-order-list.html',
                        controller: 'DealerController'
                //    }
                //}
            })

            .state('tabs.dealer-list-order-detail', {
                url: '/dealer-list-order-detail',
                templateUrl: 'views/dealer/tabs-dealer-order-detail.html',
                controller: 'DealerController',
                params: {
                    'OrderId': null
                }
            })

            .state('tabs.dealer-order', {
                url: '/dealer-order',
                sticky: true,
                views: {
                    'dealer-order': {
                        templateUrl: 'views/dealer/tabs-dealer-order.html',
                        controller: 'DealerController'
                    }
                }
            })

            .state('tabs.dealer-order-review', {
                url: '/dealer-order-review',
                templateUrl: 'views/dealer/tabs-dealer-order-review.html',
                controller: 'DealerController',
                params: {
                    'Data': null
                }
            })

            .state('tabs.dealer-info', {
                url: '/dealer-info',
                templateUrl: 'views/dealer/tabs-dealer-info.html',
                controller: 'DealerController'
            })

            ///////// TAB SALE
            .state('tabs.sale-list', {
                url: '/sale-list',
                //sticky: true,
                views: {
                    'sale-list': {
                        templateUrl: 'views/sale/tabs-sale-order-list.html',
                        controller: 'SaleController'
                    }
                }
            })

            .state('tabs.sale-list-order-detail', {
                url: '/sale-list-order-detail',
                templateUrl: 'views/sale/tabs-sale-order-detail.html',
                controller: 'SaleController',
                params: {
                    'OrderId': null
                }
            })

            .state('tabs.sale-order', {
                url: '/sale-order',
                sticky: true,
                views: {
                    'sale-order': {
                        templateUrl: 'views/sale/tabs-sale-order.html',
                        controller: 'SaleController'
                    }
                }
            })

            .state('tabs.sale-order-review', {
                url: '/sale-order-review',
                templateUrl: 'views/sale/tabs-sale-order-review.html',
                controller: 'SaleController',
                params: {
                    'Data': null
                }
            })

            .state('tabs.sale-info', {
                url: '/sale-info',
                templateUrl: 'views/sale/tabs-sale-info.html',
                controller: 'SaleController'
            })
            ///////// TAB SALE SUP
            .state('tabs.sale-sup-list', {
                url: '/sale-sup-list',
                //sticky: true,
                views: {
                    'sale-sup-list': {
                        templateUrl: 'views/sale_sup/tabs-sale-sup-order-list.html',
                        controller: 'SaleSupController'
                    }
                }
            })

            .state('tabs.sale-sup-list-order-detail', {
                url: '/sale-sup-list-order-detail',
                templateUrl: 'views/sale_sup/tabs-sale-sup-order-detail.html',
                controller: 'SaleSupController',
                params: {
                    'OrderId': null
                }
            })

            .state('tabs.sale-sup-order', {
                url: '/sale-sup-order',
                sticky: true,
                views: {
                    'sale-sup-order': {
                        templateUrl: 'views/sale_sup/tabs-sale-sup-order.html',
                        controller: 'SaleSupController'
                    }
                }
            })

            .state('tabs.sale-sup-order-review', {
                url: '/sale-sup-order-review',
                templateUrl: 'views/sale_sup/tabs-sale-sup-order-review.html',
                controller: 'SaleSupController',
                params: {
                    'Data': null
                }
            })
            .state('tabs.sale-sup-info', {
                url: '/sale-sup-info',
                templateUrl: 'views/sale_sup/tabs-sale-sup-info.html',
                controller: 'SaleSupController'
            })
            ///////// TAB ASM
            .state('tabs.asm-list', {
                url: '/asm-list',
                //sticky: true,
                views: {
                    'asm-list': {
                        templateUrl: 'views/asm/tabs-asm-order-list.html',
                        controller: 'ASMController'
                    }
                }
            })

            .state('tabs.asm-list-order-detail', {
                url: '/asm-list-order-detail',
                templateUrl: 'views/asm/tabs-asm-order-detail.html',
                controller: 'ASMController',
                params: {
                    'OrderId': null
                }
            })

            .state('tabs.asm-order', {
                url: '/asm-order',
                sticky: true,
                views: {
                    'asm-order': {
                        templateUrl: 'views/asm/tabs-asm-order.html',
                        controller: 'ASMController'
                    }
                }
            })

            .state('tabs.asm-order-review', {
                url: '/asm-order-review',
                templateUrl: 'views/asm/tabs-asm-order-review.html',
                controller: 'ASMController',
                params: {
                    'Data': null
                }
            })
            .state('tabs.asm-info', {
                url: '/asm-info',
                templateUrl: 'views/asm/tabs-asm-info.html',
                controller: 'ASMController'
            })
        ///////// TAB rsm
            .state('tabs.rsm-list', {
                url: '/rsm-list',
                //sticky: true,
                views: {
                    'rsm-list': {
                        templateUrl: 'views/rsm/tabs-rsm-order-list.html',
                        controller: 'RSMController'
                    }
                }
            })

            .state('tabs.rsm-list-order-detail', {
                url: '/rsm-list-order-detail',
                templateUrl: 'views/rsm/tabs-rsm-order-detail.html',
                controller: 'RSMController',
                params: {
                    'OrderId': null
                }
            })

            .state('tabs.rsm-order', {
                url: '/rsm-order',
                sticky: true,
                views: {
                    'rsm-order': {
                        templateUrl: 'views/rsm/tabs-rsm-order.html',
                        controller: 'RSMController'
                    }
                }
            })

            .state('tabs.rsm-order-review', {
                url: '/rsm-order-review',
                templateUrl: 'views/rsm/tabs-rsm-order-review.html',
                controller: 'RSMController',
                params: {
                    'Data': null
                }
            })
            .state('tabs.rsm-info', {
                url: '/rsm-info',
                templateUrl: 'views/rsm/tabs-rsm-info.html',
                controller: 'RSMController'
            })
        ///////// TAB nsm
            .state('tabs.nsm-list', {
                url: '/nsm-list',
                //sticky: true,
                views: {
                    'nsm-list': {
                        templateUrl: 'views/nsm/tabs-nsm-order-list.html',
                        controller: 'NSMController'
                    }
                }
            })

            .state('tabs.nsm-list-order-detail', {
                url: '/nsm-list-order-detail',
                templateUrl: 'views/nsm/tabs-nsm-order-detail.html',
                controller: 'NSMController',
                params: {
                    'OrderId': null
                }
            })

            .state('tabs.nsm-order', {
                url: '/nsm-order',
                sticky: true,
                views: {
                    'nsm-order': {
                        templateUrl: 'views/nsm/tabs-nsm-order.html',
                        controller: 'NSMController'
                    }
                }
            })

            .state('tabs.nsm-order-review', {
                url: '/nsm-order-review',
                templateUrl: 'views/nsm/tabs-nsm-order-review.html',
                controller: 'NSMController',
                params: {
                    'Data': null
                }
            })
            .state('tabs.nsm-info', {
                url: '/nsm-info',
                templateUrl: 'views/nsm/tabs-nsm-info.html',
                controller: 'NSMController'
            });
    }
]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(function ($rootScope, $state, AuthService, USER_ROLES, USER_LEVELS) {

    $rootScope.$state = $state;

    if (!AuthService.isAuthenticated())
        $state.go('login');
    else {
        switch (AuthService.user().RoleId) {
            case USER_ROLES.DEALER: $state.go("tabs.dealer-list", {}, { reload: true })
                break;
            case USER_ROLES.SALE:
                switch (AuthService.user().Level) {
                    case USER_LEVELS.SALE_REP:
                        $state.go("tabs.sale-list", {}, { reload: true }); break;
                    case USER_LEVELS.SALE_SUP:
                        $state.go("tabs.sale-sup-list", {}, { reload: true }); break;
                    case USER_LEVELS.ASM:
                        $state.go("tabs.asm-list", {}, { reload: true }); break;
                    case USER_LEVELS.RSM:
                        $state.go("tabs.rsm-list", {}, { reload: true }); break;
                    case USER_LEVELS.NSM:
                        $state.go("tabs.nsm-list", {}, { reload: true }); break;
                }
                break;
            default: $state.go('login');
        }
    }
    //else {
    //    switch (AuthService.user().RoleId) {
    //        case USER_ROLES.DEALER: $state.go("home.dealer", {}, { reload: true });
    //            break;
    //        case USER_ROLES.SALE: $state.go("home.sale", {}, { reload: true });
    //            break;
    //        case USER_ROLES.SC: $state.go("home.sc", {}, { reload: true });
    //            break;
    //    }
    //}

    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

        // AuthService.checkVersion(appVersion);
        if (!AuthService.isAuthenticated()) {
            if (next.name !== 'login') {
                event.preventDefault();
                $state.go('login');
            }
        }
    });
})

.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    };
});
//app.run(['authService', function (authService) {
//    authService.fillAuthData();
//}]);
