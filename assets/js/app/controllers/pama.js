var pamaApp = angular.module('pamaApp', []);

pamaApp.controller('IndexController', function ($scope) {
    $scope.masterPassword = "test";
    $scope.$watch('masterPassword', function () {
        var password = $scope.masterPassword;
        $scope.prefix = secureSecret(password, "domain");
    }, true);
});