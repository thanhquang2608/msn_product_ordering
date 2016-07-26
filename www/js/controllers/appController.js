'use strict';

app.controller('AppController', function ($scope, $translate, TranslateService, $rootScope) {
    // Language
    $scope.curLanguage = TranslateService.getDefaultLanguageKey();
    $scope.changeLanguage = function (key) {
        TranslateService.setDefaultLanguageKey(key);
        $translate.use(key);
        $scope.curLanguage = key;
        $rootScope.$broadcast('language-changed');
    }
    // Set default language
    $scope.changeLanguage($scope.curLanguage);
})