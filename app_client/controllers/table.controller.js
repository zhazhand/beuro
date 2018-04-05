(function() {

    angular
        .module('bpApp')
        .controller('tableCtrl', tbCtrl);

    tbCtrl.$inject = ['$scope', '$location', '$http', '$log', 'bpCurrent'];
    function tbCtrl($scope, $location, $http, $log, bpCurrent) {


        if (bpCurrent.getCurrent()) {
            var tmpCurrent = bpCurrent.getCurrent();
            var str = 'year=' + tmpCurrent.year + '&_id=' + tmpCurrent._id + '&name=' + tmpCurrent.name + '&tourist_id=' + tmpCurrent.tourist_id;
            $location.search(str);
        }
        $scope.current = $location.search();
        //        if (bpCurrent.getCurrent()) {
        //        var currentTourist = bpCurrent.getCurrent();

        $http.get("/api/tourist/tourist_id/" + $scope.current.tourist_id)
            .then(function(response) {

                $scope.tourist = response.data;
            }, function(data, status, headers, config) {
                $log.log(data);
                $log.log(status);
                $log.log(headers);
                $log.log(config);
            });
        //        }
        $scope.goHome = function() {$log.log($scope.current.name);
            $scope.current.member = {};
            $scope.current.member.name = $scope.current.name;
            $scope.current.member._id = $scope.current._id;
            bpCurrent.setCurrent($scope.current);
            if ($scope.current.name == 'Администратор') {
                $location.path("/admin");
            } else {

                $location.path("/manager");
            }
        }

        $scope.exportData = function() {
            var elems = angular.element(document.querySelectorAll(".panel-body tbody>tr"));
            $scope.exportTable = {};
            for (var i = 0; i < elems.length; i++) {
                var td1 = elems.eq(i).find('td').eq(0).text();
                var td2 = elems.eq(i).find('td').eq(1).text();
                if (td1) {
                    $scope.exportTable[td1] = td2;
                }
            }
            alasql('SELECT * INTO XLSX("tourist.xlsx",{headers:true}) FROM ?', [$scope.exportTable]);
        };

    }

})();