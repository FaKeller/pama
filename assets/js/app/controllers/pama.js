var pamaApp = angular.module('pamaApp', []);

pamaApp.controller('IndexController', function ($scope) {
    $scope.masterPassword = "test";
    $scope.domain = "http://www.google.de/";

    $scope.$watch('masterPassword', function () {
        updateSecret();
    }, true);

    $scope.$watch('domain', function () {
        updateSecret();
    }, true);

    function updateSecret() {
        var domain = getDomainName($scope.domain);
        console.log(domain);
        $scope.prefix = secureSecret($scope.masterPassword, domain);
    }

    function getDomainName(hostName) {
        //var matches = hostName.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        var matches = hostName.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
        //var domain = matches && matches[1];
        var domain = matches[2];

        console.log(matches);

        //domain = domain.substring(domain.lastIndexOf(".", domain.lastIndexOf(".") - 1) + 1);

        /*
        var domainArray = domain.split(".");
        if(1 <= domainArray.length <= 2){
            domain = domainArray[0];
        }
        */

        return domain;
    }

});
