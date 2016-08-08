'use strict';

app.service('TranslateService', ['$localstorage', function ($localstorage, STORAGE_KEYS) {
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

    function _setDefaultLanguageKey(key) {
        $localstorage.set('AncoLanguageKey', key);
    }

    //Currently we only use this function
    function _getDefaultLanguageKey() {
        defaultLanguage = $localstorage.get('AncoLanguageKey');
        return defaultLanguage || 'vi';
    }

    return {
        getLanguagePack: _getLanguagePack,
        getLanguageList: _getLanguageList,
        getDefaultLanguageKey: _getDefaultLanguageKey,
        setDefaultLanguageKey: _setDefaultLanguageKey
    }
}]);