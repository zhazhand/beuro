(function() {

    angular
        .module('bpApp')
        .controller('fullListCtrl', allListCtrl);

    allListCtrl.$inject = ['$scope', '$location', '$http', '$log', '$window', '$document', 'bpCurrent'];
    function allListCtrl($scope, $location, $http, $log, $window, $document, bpCurrent) {

        $scope.current = $location.search();
        $scope.gettingFilter = [];
        getCountries();
        getManagers();

        $scope.page = {};
        $scope.page.items = [];
        getTouristes();

        $scope.page.filters = [{
            name: "По менеджеру",
            value: 'manager'
        }, {
            name: "По стране",
            value: 'country'
        }, {
            name: "По месяцу",
            value: 'month'
        }];

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

        $scope.page.showRange = [{
            name: "отображать, потом упорядочивать",
            value: true
        }, {
            name: "фильтровать, потом отображать",
            value: false
        }];
        $scope.page.filterChanged = $scope.gettingFilter[0];
        $scope.page.limitValue = $scope.page.limitRange[0];
        $scope.page.filterValue = $scope.page.filterRange[0];
        $scope.page.firstShow = $scope.page.showRange[0];
        $scope.page.additionFilters = $scope.page.filters[0];

        $scope.monthes = (function() {
            var result = [];
            var monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            for (var i = 0; i < monthes.length; i++) {
                result[i] = {};
                result[i].name = monthes[i];
                result[i].value = i;
            }
            return result
        })();

        $scope.changeFilter = function(par) {
            var result;
            switch (par) {
                case 'manager':
                    result = $scope.managers;
                    break;
                case 'country':
                    result = $scope.countries;
                    break;
                case 'month':
                    result = $scope.monthes;
                    break;
            }
            $scope.gettingFilter = result;
        }
        
        $scope.getOldManager = function(par) {
            $scope.updatingTourist = par;   //турист, у которого меняется менеджер
        }

        $scope.saveNewManager = function(par) {
            if (!par||$scope.updatingTourist.manager == par.name) {
                $window.alert('Нужно выбрать НОВОГО менеджера!');
            } else {
                var newManager = {};
                newManager._id = $scope.updatingTourist._id;
                newManager.index_id = par._id;
                newManager.manager = par.name;
                $http.put("/api/tourist", newManager)
                .then(function(response) {
                    $log.log('success', response.data);
                    getTouristes();
                    angular.element("#myModal").modal('hide');
                }, function() {
                    $log.log('error');
                });
            }
        }

        $scope.page.showMore = function(par) {
            $scope.current.tourist_id = par;
            bpCurrent.setCurrent($scope.current);
            $location.path("/table");
        }

        $scope.goHome = function() {
            bpCurrent.setCurrent("");
            $location.path("/admin");
        }

        $scope.selectItems = function(item) {
            if ($scope.page.filterChanged) {
                switch ($scope.page.additionFilters.value) {
                    case 'manager':
                        return item.manager == $scope.page.filterChanged.name;
                        break;
                    case 'country':
                        return item.country == $scope.page.filterChanged.name;
                        break;
                    case 'month':
                        return new Date(item.endTalk).getMonth() == $scope.page.filterChanged.value;
                        break;
                }
            } else {
                return true;
            }

        };

        function getTouristes() {
            $http.get("/api/tourist")
            .then(function(response) {
                $scope.page.items = response.data;
                $scope.len = $scope.page.items.length;
            }, function(data, status, headers, config) {
                $log.log(data);
                $log.log(status);
                $log.log(headers);
                $log.log(config);
            });
        }
        
        function getCountries() {
            $http.get("/api/country").then(function(response) {
                var countries = response.data;
                $scope.countries = convertData(countries, 'name', 'ДРУГАЯ');
            }, function(data, status, headers, config) {
                $log.log(data);
                $log.log(status);
                $log.log(headers);
                $log.log(config);
            });
        }

        function getManagers() {
            $http.get("/api/manager").then(function(response) {
                $scope.managers = response.data;
                
                $scope.gettingFilter = $scope.managers;
            }, function(data, status, headers, config) {
                $log.log(data);
                $log.log(status);
                $log.log(headers);
                $log.log(config);
            });
        }

        function convertData(par1, par2, par3) {
            var result = [];
            for (var i = 0; i < par1.length; i++) {
                if (par1[i][par2] && par1[i][par2] != par3) {
                    result.push(par1[i]);
                }
            }
            return result;
        }
    }

})();