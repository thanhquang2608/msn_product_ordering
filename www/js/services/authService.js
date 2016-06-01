'use strict';
app.service('AuthService', function ($rootScope, $q, $http, $localstorage, USER_ROLES, AUTH_EVENTS, NETWORK, STORAGE_KEYS, TIMER) {
    var serviceBase = NETWORK.BASE_URL;
    var LOCAL_TOKEN_KEY = STORAGE_KEYS.token_key;
    var LOCAL_USER_KEY = STORAGE_KEYS.user_key;
    var APP_VERSION_KEY = STORAGE_KEYS.appversion_dealers;
    var LOCAL_USERNAME_KEY = STORAGE_KEYS.username_key;
    var LOCAL_REMEMBER_ME_KEY = STORAGE_KEYS.remember_me_key;

    var isAuthenticated = false;
    var role = '';
    var authToken;
    var user;
    var appVersion = '';
    var username = undefined;
    var remember = true;

    function loadUserCredentials() {
        var token = $localstorage.get(LOCAL_TOKEN_KEY);
        var appVersion = $localstorage.get(APP_VERSION_KEY);
        var retrievedUser = $localstorage.get(LOCAL_USER_KEY);
        username = $localstorage.get(LOCAL_USERNAME_KEY);
        remember = $localstorage.getObject(LOCAL_REMEMBER_ME_KEY);

        //console.log(retrievedUser);
        if (token && retrievedUser) {
            useCredentials(token);
            user = JSON.parse(retrievedUser);
        }

    }

    function storeUserCredentials(u, token, username, rememberme) {
        $localstorage.set(LOCAL_TOKEN_KEY, token);
        $localstorage.set(LOCAL_USER_KEY, JSON.stringify(u));
        $localstorage.setObject(LOCAL_REMEMBER_ME_KEY, rememberme);

        if (rememberme)
            $localstorage.set(LOCAL_USERNAME_KEY, username);
        else
            $localstorage.deleteObject(LOCAL_USERNAME_KEY);
        
        useCredentials(token);
        user = u;
        remember = rememberme;
        $rootScope.$broadcast(AUTH_EVENTS.authenticated);
    }

    function useCredentials(token) {
        isAuthenticated = true;
        authToken = token;
        //console.log(token);

        // Set the token as header for your requests!
        // $http.defaults.headers.common['X-Auth-Token'] = 'Bearer ' + token;
        // $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    }

    function checkVersion(currentVersion) {
        if (appVersion != currentVersion) {
            destroyUserCredentials();
            $localstorage.set(APP_VERSION_KEY, currentVersion);
            appVersion = currentVersion;
        }
    }

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated = false;
        $localstorage.deleteObject(LOCAL_TOKEN_KEY);
        $localstorage.deleteObject(LOCAL_USER_KEY);
    }

    var login = function (userdata, rememberme) {
        //console.log("login");
        return $q(function (resolve, reject) {
            var id = userdata.id;
            var pass = userdata.password;
            console.log(rememberme);
            var param = {
                username: id,
                password: pass
            }

            $http({
                method: 'POST',
                url: serviceBase + "/login",
                headers: { 'Content-Type': 'application/json' },
                data: param,
                timeout: TIMER.TIME_OUT
            }).then(function successCallback(response) {
                var user = response.data.user;
                var token = response.data.token;

                storeUserCredentials(user, token, id, rememberme);
                resolve('Login success.');
            }, function errorCallback(response) {              
                //if (response.status != 0 && response.status != 408) {
                    console.log("login failed, statusCode: " + response.status);
                    reject(response);
                //}
            });
            //var data = "username=" + id + "&password=" + pass;
            //$http.post(serviceBase + '/login', data, { timeout: $rootScope.TIME_OUT })
            //    .then(function successCallback(response) {
            //        var user = response.data.user;
            //        var token = response.data.token;

            //        storeUserCredentials(user, token);
            //        resolve('Login success.');
            //    }, function errorCallback(response) {
            //        if (response.status != 0 && response.status != 408) {
            //            console.log("login failed, statusCode: " + response.status);
            //            reject(response);
            //        }
            //    });
        });
    };

    var logout = function () {
        destroyUserCredentials();
    };

    var updateUser = function () {
        loadUserCredentials();
        user.ChangedPassword = 1;
        $localstorage.set(LOCAL_USER_KEY, JSON.stringify(user));
    }

    var isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();

    var changePassword = function (newPassword) {
        return $q(function (resolve, reject) {
            var param = {
                newpassword: newPassword
            }
            $http({
                method: 'POST',
                url: serviceBase + "/user/changepassword",
                headers: { 'Content-Type': 'application/json' },
                data: param,
                timeout: TIMER.TIME_OUT
            }).then(function successCallback(response) {
                resolve('Change password success.');
            }, function errorCallback(response) {
                reject(response);
            });
        });
    };

    return {
        login: login,
        logout: logout,
        isAuthorized: isAuthorized,
        checkVersion: checkVersion,
        appVersion: function () { return appVersion; },
        token: function () { return authToken; },
        isAuthenticated: function () { return isAuthenticated; },
        user: function () { return user; },
        changePassword: changePassword,
        updateUser: updateUser,
        userName: function () {
            username = $localstorage.get(LOCAL_USERNAME_KEY);
            return username;
        },
        rememberMe: function () {
            remember = $localstorage.getObject(LOCAL_REMEMBER_ME_KEY);
            return remember;
        }
    };
})

.factory('$localstorage', function () {
    return {
        set: function (key, value) {
            window.localStorage.setItem(key, value);
        },

        get: function (key, defaultValue) {
            return window.localStorage.getItem(key) || defaultValue;
        },

        setObject: function (key, value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        },

        getObject: function (key) {
            if (window.localStorage.getItem(key) === null || window.localStorage.getItem(key) === undefined) {
                return undefined;
            } else {
                return JSON.parse(window.localStorage.getItem(key) || '{}');
            }
        },

        deleteObject: function (key) {
            window.localStorage.removeItem(key);
        }
    }
});