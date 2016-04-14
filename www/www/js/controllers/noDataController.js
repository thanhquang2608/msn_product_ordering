app.controller('NoDataController', function ($scope, AuthService, USER_ROLES) {
    $scope.init = function () {
        switch (AuthService.user().RoleId) {
            case USER_ROLES.DEALER: $scope.stateRef = "home.dealer"; break;
            case USER_ROLES.SALE: $scope.stateRef = "home.sale"; break;
            case USER_ROLES.SC: $scope.stateRef = "home.sc"; break;
        }
    }
});