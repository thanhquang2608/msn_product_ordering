'use strict';

app.service('TranslateService', [function () {
    var languageList = {
        'en': [{ Name: 'English', Key: 'en' }, { Name: 'VietNamese', Key: 'vi'}],
        'vi': [{ Name: 'Tiếng Anh', Key: 'en' }, { Name: 'Tiếng Việt', Key: 'vi' }]
    }
    var defaultLanguage = 'vi';

    var enPack = { LOGIN: 'Login'};
    var viPack = { LOGIN: 'Đăng nhập' };

    function _getLanguagePack(key) {
        // Experimental
        switch (key) {
            case 'en': return enPack;
            case 'vi': return viPack;
        }
        // Auto load with file name + key later
    }

    function _getLanguageList(key) {
        return languageList[key];
    }

    function _getDefaultLanguageKey() {
        return defaultLanguage;
    }

    return {
        getLanguagePack: _getLanguagePack,
        getLanguageList: _getLanguageList,
        getDefaultLanguageKey: _getDefaultLanguageKey
    }
}]);