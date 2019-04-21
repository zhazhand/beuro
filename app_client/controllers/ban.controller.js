(function() {

    angular
        .module('bpApp')
        .controller('banCtrl', banCtrl);

    banCtrl.$inject = ['$scope', '$location', 'bpCurrent', '$window'];
    function banCtrl($scope, $location, bpCurrent, $window) {
        if (bpCurrent.getCurrent()) {
            var tmpCurrent = bpCurrent.getCurrent();
            var str = {};
            str.year = tmpCurrent.year;
            str._id = tmpCurrent.member._id;
            str.name = tmpCurrent.member.name;
            $window.sessionStorage.setItem("current",JSON.stringify(str));
        }
        $scope.current = JSON.parse($window.sessionStorage.getItem("current"));
        if (!$scope.current) {
            $location.path("/");
        }
        $scope.goHome = function(){
            
            $location.path("/");
        }
    }

})();
