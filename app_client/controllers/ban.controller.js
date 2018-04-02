(function() {

    angular
        .module('bpApp')
        .controller('banCtrl', banCtrl);

    banCtrl.$inject = ['$scope', '$location', 'bpCurrent'];
    function banCtrl($scope, $location, bpCurrent) {
        if (bpCurrent.getCurrent()) {
            var tmpCurrent = bpCurrent.getCurrent();
            var str = 'year=' + tmpCurrent.year + '&_id=' + tmpCurrent.member._id + '&name=' + tmpCurrent.member.name;
            $location.search(str);
        }
        $scope.current = $location.search();
        
        $scope.goHome = function(){
            $location.search("");
            $location.path("/");
        }
    }

})();