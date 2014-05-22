FoosBall.controller('BaseController', ['$scope', 'session', 'appSettings', 'staticResources', '$location', function ($scope, session, appSettings, staticResources, $location) {
    $scope.session = {};
    $scope.appSettings = {};
    $scope.staticResources = {};

    session.autoLogin($scope);
    $scope.logout = function() {
        session.logout($scope);
    };

    var promiseOfAppSettings = appSettings.getAppSettings();
    promiseOfAppSettings.then(function(response) {
        $scope.appSettings = response;
        $scope.appSettings.ready = true;
        $scope.appSettings.AppNameWithEnvironment = getAppNameWithEnvironment($scope.appSettings.AppName, $scope.appSettings.Environment);
    });

    $scope.staticResources.backgroundImageUrl = staticResources.getBackgroundImageUrl($scope);
    $scope.staticResources.footballIconUrl = staticResources.getFootballIconUrl($scope);
    $scope.staticResources.cssUrl = staticResources.getCssUrl($scope);

    function getAppNameWithEnvironment(appName, environment) {
        var env = environment.toLowerCase() === 'production' ? "" : (environment + " ");
        return (env + appName);
    }

    // Make cache the users previous path/url to enabling going back to where the user came from
    $scope.$watch(function () { return $location.path(); }, function (newValue, oldValue) {
        $scope.appSettings.redirectUrl = oldValue;
    });
}]);
