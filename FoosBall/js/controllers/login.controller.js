FoosBall.controller('LoginController', ['$scope', 'session', '$location', function ($scope, session, $location) {
    $scope.loginMessage = "";
    $scope.showLoginMessage = false;

    $scope.submitLogin = function() {
        var loginPromise = session.login({
            email: $scope.email,
            password: $scope.password,
            rememberMe: $scope.rememberMe || false
        });

        loginPromise.then(function(responseData) {
            if (!responseData) {
                return;
            }
            
            if (responseData.Success === true) {
                window.angular.forEach(responseData.Data, function (value, key) {
                    $scope.session[key] = value;
                });

                clearLogonForm($scope);
                redirect();
            } else {
                $scope.loginMessage = responseData.Message;
                $scope.showLoginMessage = true;
            }
        });
    };
    
    function clearLogonForm(scope) {
        scope.loginMessage = "";
        scope.showLoginMessage = false;
        scope.email = "";
        scope.name = "";
        scope.password = "";
    }

    function redirect() {
        if ($location.path() !== $scope.appSettings.redirectUrl) {
            $location.path($scope.appSettings.redirectUrl);
        }
    }
}]);