var pamaApp = angular.module('pamaApp', []);

pamaApp.controller('IndexController', function ($scope) {
    $scope.masterPassword = "test";
    $scope.domain = "http://www.google.de/";

    $scope.$watch('masterPassword', function () {
        $scope.prefix = secureSecret($scope.masterPassword, $scope.domain);
    }, true);

    $scope.$watch('domain', function () {
        var matches = $scope.domain.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        var domain = matches && matches[1];
        console.log(domain);
        $scope.prefix = secureSecret($scope.masterPassword, domain);
    }, true);
});
