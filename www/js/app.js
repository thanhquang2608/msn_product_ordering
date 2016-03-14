var app = angular.module('OrderApp', ['LocalStorageModule', 'ct.ui.router.extras', 'ui.bootstrap']);

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
                        templateUrl: 'views/tabs-dealer-order-list.html',
                        controller: 'DealerController'
                //    }
                //}
            })

            .state('tabs.dealer-list-order-detail', {
                url: '/dealer-list-order-detail',
                templateUrl: 'views/tabs-dealer-order-detail.html',
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
                        templateUrl: 'views/tabs-dealer-order.html',
                        controller: 'DealerController'
                    }
                }
            })

            .state('tabs.dealer-order-review', {
                url: '/dealer-order-review',
                templateUrl: 'views/tabs-dealer-order-review.html',
                controller: 'DealerController',
                params: {
                    'Data': null
                }
            })

            .state('tabs.dealer-info', {
                url: '/dealer-info',
                templateUrl: 'views/tabs-dealer-info.html',
                controller: 'DealerController'
            })

            ///////// TAB SALE
            .state('tabs.sale-list', {
                url: '/sale-list',
                //sticky: true,
                views: {
                    'sale-list': {
                        templateUrl: 'views/tabs-sale-order-list.html',
                        controller: 'SaleController'
                    }
                }
            })

            .state('tabs.sale-list-order-detail', {
                url: '/sale-list-order-detail',
                templateUrl: 'views/tabs-sale-order-detail.html',
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
                        templateUrl: 'views/tabs-sale-order.html',
                        controller: 'SaleController'
                    }
                }
            })

            .state('tabs.sale-order-review', {
                url: '/sale-order-review',
                templateUrl: 'views/tabs-sale-order-review.html',
                controller: 'SaleController',
                params: {
                    'Data': null
                }
            })

            .state('tabs.sale-info', {
                url: '/sale-info',
                templateUrl: 'views/tabs-sale-info.html',
                controller: 'SaleController'
            })
            ///////// TAB SALE
            .state('tabs.sale-sup-list', {
                url: '/sale-sup-list',
                //sticky: true,
                views: {
                    'sale-sup-list': {
                        templateUrl: 'views/tabs-sale-sup-order-list.html',
                        controller: 'SaleSupController'
                    }
                }
            })

            .state('tabs.sale-sup-list-order-detail', {
                url: '/sale-sup-list-order-detail',
                templateUrl: 'views/tabs-sale-sup-order-detail.html',
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
                        templateUrl: 'views/tabs-sale-sup-order.html',
                        controller: 'SaleSupController'
                    }
                }
            })

            .state('tabs.sale-sup-order-review', {
                url: '/sale-sup-order-review',
                templateUrl: 'views/tabs-sale-sup-order-review.html',
                controller: 'SaleSupController',
                params: {
                    'Data': null
                }
            })
            .state('tabs.sale-sup-info', {
                url: '/sale-sup-info',
                templateUrl: 'views/tabs-sale-sup-info.html',
                controller: 'SaleSupController'
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
                }
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
});
//app.run(['authService', function (authService) {
//    authService.fillAuthData();
//}]);
