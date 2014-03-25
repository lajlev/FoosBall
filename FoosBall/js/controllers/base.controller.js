FoosBall.controller('BaseController', ['$scope', 'session', function ($scope, session) {
    $scope.session = {};
    $scope.uiSettings = {};
    $scope.uiSettings.hideLogonMenu = true;
    $scope.uiSettings.hideSignupMenu = true;

    session.autoLogin($scope);
    $scope.logout = function() {
        session.logout($scope);
    };

    $scope.showLogonMenu = function() {
        $scope.uiSettings.hideLogonMenu = !$scope.uiSettings.hideLogonMenu;
        $scope.uiSettings.hideSignupMenu = true;
    };

    $scope.showSignupMenu = function() {
        $scope.uiSettings.hideSignupMenu = !$scope.uiSettings.hideSignupMenu;
        $scope.uiSettings.hideLogonMenu = true;
    };
}]);
