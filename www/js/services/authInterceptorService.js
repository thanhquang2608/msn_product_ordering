'use strict';
app.factory('authInterceptorService', ['$q', '$injector', '$location', '$localstorage', 'STORAGE_KEYS', 'TranslateService' , 'APP', function ($q, $injector, $location, $localstorage, STORAGE_KEYS, TranslateService, APP) {

    var authInterceptorServiceFactory = {};

    var LOCAL_TOKEN_KEY = STORAGE_KEYS.token_key;
    var LOCAL_USER_KEY = STORAGE_KEYS.user_key;

    var _request = function (config) {

        config.headers = config.headers || {};
       
        //var authData = $localstorage.get('authorizationData');
        var token = $localstorage.get(LOCAL_TOKEN_KEY);

        var currentRole = 0;
        var currentLevel = 0;
        
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        config.headers['Accept-Language'] = TranslateService.getDefaultLanguageKey();
        config.headers['Version'] = APP.VERSION;

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            var authService = $injector.get('AuthService');
            var authData = $localstorage.get('authorizationData');

            if (authData) {
                if (authData.useRefreshTokens) {
                    $location.path('/refresh');
                    return $q.reject(rejection);
                }
            }

            authService.logout();
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);