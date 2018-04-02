(function() {

    angular
        .module('bpApp')
        .controller('listCtrl', clientListCtrl);

    clientListCtrl.$inject = ['$scope', '$location', '$http', '$log', 'bpCurrent'];
    function clientListCtrl($scope, $location, $http, $log, bpCurrent) {

        $scope.current = $location.search();
        $scope.page = {};
        $scope.page.items=[];
        $http.get("/api/tourist/touristes_list/" + $scope.current._id)
                .then(function(response) {
                  $scope.page.items = response.data;  
                   $scope.len = $scope.page.items.length; 
                }, function(data, status, headers, config) {
                    $log.log(data);
                    $log.log(status);
                    $log.log(headers);
                    $log.log(config);
                });
//        if (bpCurrent.getCurrent()) {
           $log.log($scope.page.items.length); 
            

            $scope.page.limitRange = [{
                name: "Последние 5",
                value: -5
            }, {
                name: "Последние 10",
                value: -10
            }, {
                name: "Последние 20",
                value: -20
            }, {
                name: "Все",
                value: $scope.len
            }];

            $scope.page.filterRange = [{
                name: "Последние вверху",
                value: '-startTalk'
            }, {
                name: "Последние внизу",
                value: '+startTalk'
            }, {
                name: "По фамилии",
                value: 'lastName'
            }, {
                name: "По стране",
                value: 'country'
            }];

            $scope.page.limitValue = $scope.page.limitRange[0];
            $scope.page.filterValue = $scope.page.filterRange[0];

            $scope.page.showMore = function(par) {
                $scope.current.tourist_id = par;
                bpCurrent.setCurrent($scope.current);
                $location.path("/table");
            }
//        }

        $scope.goHome = function() {
            bpCurrent.setCurrent("");
            $location.path("/manager");
        }
    }

})();