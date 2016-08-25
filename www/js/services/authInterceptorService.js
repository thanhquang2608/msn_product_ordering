'use strict';
app.factory('authInterceptorService', ['$q', '$injector', '$location', '$localstorage', 'STORAGE_KEYS', 'TranslateService', '$sqliteStorage',
    function ($q, $injector, $location, $localstorage, STORAGE_KEYS, TranslateService, $sqliteStorage) {

    var authInterceptorServiceFactory = {};

    var LOCAL_TOKEN_KEY = STORAGE_KEYS.token_key;
    var LOCAL_USER_KEY = STORAGE_KEYS.user_key;

    var _request = function (config) {
        config.headers = config.headers || {};
        var deferred = $q.defer();
        //var authData = $localstorage.get('authorizationData');
        $sqliteStorage.get(sqliteHelper.FEILD_NAME_TOKEN).then(function (data) {
            var token = data;
            var currentRole = 0;
            var currentLevel = 0;
        
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            config.headers['Accept-Language'] = TranslateService.getDefaultLanguageKey();
			config.headers['Version'] = '1.1.0';
            deferred.resolve(config);
        }, function () {
            deferred.resolve(config);
        });
        return deferred.promise;
    }

    var _responseError = function (rejection) {
        var deferred = $q.defer();
        if (rejection.status === 401) {
            var authService = $injector.get('AuthService');
            var authData = $localstorage.get('authorizationData');

            if (authData) {
                if (authData.useRefreshTokens) {
                    $location.path('/refresh');
                    return $q.reject(rejection);
                }
            }

            authService.logout().then(function () {
                $location.path('/login');
                deferred.reject(rejection);
            });
            
        }
        else {
            deferred.reject(rejection);
        }
        return deferred.promise;
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);