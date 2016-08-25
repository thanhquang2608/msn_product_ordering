'use strict';
app.service('AuthService', function ($rootScope, $q, $http, $localstorage, $sqliteStorage, USER_ROLES, AUTH_EVENTS, NETWORK, STORAGE_KEYS, TIMER) {
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
    var username;
    var remember = true;

    function loadUserCredentials() {
        var deferred = $.Deferred();
        var promises = [];

        // Edit by Quang
        var localToken = $localstorage.get(LOCAL_TOKEN_KEY);
        // var localAppVersion = $localstorage.get(APP_VERSION_KEY);
        var localUser = $localstorage.get(LOCAL_USER_KEY);
        var localUsername = $localstorage.get(LOCAL_USERNAME_KEY);

        if (localToken && localUser && localUsername) {
            promises.push(localToken);
            promises.push(localUsername);
            promises.push(localUser);

            // Store user credentials to sqlite
            storeUserCredentials(localUser, localToken, localUsername, true).then(function () {
                $.when.apply(null, promises).then(function () {
                    //alert('token ' + arguments[0] + ' ' + arguments[2]);
                    if (arguments[0] && arguments[2]) {
                        useCredentials(arguments[0]);
                        user = JSON.parse(arguments[2]);
                    }
                    username = arguments[1];
                    remember = true;
                    deferred.resolve();
                });
            });
        } else {
            promises.push($sqliteStorage.get(sqliteHelper.FEILD_NAME_TOKEN));
            promises.push($sqliteStorage.get(sqliteHelper.FEILD_NAME_USERNAME));
            promises.push($sqliteStorage.get(sqliteHelper.FEILD_NAME_USER));

            $.when.apply(null, promises).then(function () {
                //alert('token ' + arguments[0] + ' ' + arguments[2]);
                if (arguments[0] && arguments[2]) {
                    useCredentials(arguments[0]);
                    user = JSON.parse(arguments[2]);
                }
                username = arguments[1];
                remember = true;
                deferred.resolve();
                
            });
        }
        // Edit by Quang 
        
        return deferred.promise();
    }

    function storeUserCredentials(u, token, userName, rememberme) {
        //$localstorage.set(LOCAL_TOKEN_KEY, token);
        //$localstorage.set(LOCAL_USER_KEY, JSON.stringify(u));
        //$localstorage.setObject(LOCAL_REMEMBER_ME_KEY, rememberme);

        //if (rememberme)
        //    $localstorage.set(LOCAL_USERNAME_KEY, username);
        //else
        //    $localstorage.deleteObject(LOCAL_USERNAME_KEY);
        var deferred = $.Deferred();
        //$localstorage.set(LOCAL_USERNAME_KEY, username);
        var keyList = [sqliteHelper.FEILD_NAME_TOKEN, sqliteHelper.FEILD_NAME_USER, sqliteHelper.FEILD_NAME_LANGUAGE, sqliteHelper.FEILD_NAME_USERNAME];
        var valueList = [token, JSON.stringify(u), '', userName];
        $sqliteStorage.set(keyList, valueList).then(function () {
            useCredentials(token);
            user = u;
            username = userName;
            remember = rememberme;
            $rootScope.$broadcast(AUTH_EVENTS.authenticated);
            deferred.resolve();
        });
        return deferred.promise();
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
        var deferred = $.Deferred();
        authToken = undefined;
        isAuthenticated = false;
        //$localstorage.deleteObject(LOCAL_TOKEN_KEY);
        //$localstorage.deleteObject(LOCAL_USER_KEY);
        var keyList = [sqliteHelper.FEILD_NAME_TOKEN, sqliteHelper.FEILD_NAME_USER, sqliteHelper.FEILD_NAME_LANGUAGE];
        var valueList = ['', '', ''];
        $sqliteStorage.set(keyList, valueList).then(function () {
            deferred.resolve();
        }, function () {
            deferred.resolve();
        });
        return deferred.promise();
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

                storeUserCredentials(user, token, id, rememberme).then(function () {
                    resolve('Login success.');
                });              
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
        return destroyUserCredentials();
    };

    var updateUser = function () {
        var deferred = $.Deferred();
        loadUserCredentials().then(function () {
            user.ChangedPassword = 1;
            $sqliteStorage.set([sqliteHelper.FEILD_NAME_USER], [JSON.stringify(user)]).then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise();
    }

    var isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    //loadUserCredentials();

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
            //username = $localstorage.get(LOCAL_USERNAME_KEY);
            return username;
        },
        rememberMe: function () {
            remember = $localstorage.getObject(LOCAL_REMEMBER_ME_KEY);
            return remember;
        },
        loadUserCredentials: loadUserCredentials
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
})

.factory('$sqliteStorage', function () {
    
    return {
        set: function (keyList, valueList) {
            var deferred = $.Deferred();
            sqliteHelper.getFirstRow().then(function (data) {
                // update current data with token
                if (data) {
                    sqliteHelper.updateItem(sqliteHelper.FEILD_NAME_TOKEN, data.token, keyList, valueList).then(function () {
                        deferred.resolve();
                    });
                }
                // insert new row
                else {
                    sqliteHelper.addItem(keyList, valueList).then(function () {
                        deferred.resolve();
                    });
                }
            });
            return deferred.promise();
        },

        get: function (key, defaultValue) {
            //alert('begin get');
            var deferred = $.Deferred();
            sqliteHelper.getFirstRow().then(function (data) {
                var retVal;
                if (data) {
                    retVal = data[key] || defaultValue;
                }         
                //alert('get success');
                deferred.resolve(retVal);
            }, function () {
                //alert('get fail');
                deferred.resolve();
            });
            return deferred.promise();
        },

        setObject: function (key, value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        },

        getObject: function (key) {
            var deferred = $.Deferred();
            return sqliteHelper.getFirstRow().then(function (data) {
                if (!data || data[key] === null || data[key] === undefined) {
                    deferred.resolve(undefined);
                } else {
                    deferred.resolve(JSON.parse(data[key] || '{}'));
                }
            });
            return deferred.promise();
        },

        deleteObject: function (key) {
            window.localStorage.removeItem(key);
        },

        deleteAll: function () {
            return sqliteHelper.removeAll();
        }
    }
});