(function() {

    angular
        .module('bpApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$http', '$log', '$location', 'bpCurrent', 'addManager'];
    function homeCtrl($scope, $http, $log, $location, bpCurrent, addManager) {
        $scope.pass = {};
        $scope.current = {
            year: new Date().getFullYear(),
            member: '' //текущий менеджер
        };

        $scope.test = function() {
            if ($scope.login.name) {
                for (var i = 0; i < $scope.items.length; i++) {
                    var name = $scope.login.name;
                    name = new RegExp('^' + name + '$', 'i');
                    if ($scope.items[i].login.search(name) != -1) { //проверка введенного логина (без учета регистра) на наличие в базе
                        $scope.login.state = true;
                        //                        $scope.current.member = $scope.items[i];
                        break;
                    } else {
                        $scope.login.state = false;
                    }
                }
            }
        };

        $scope.testPass = function(par1, par2) {
            if (par2) {
                var test = {};
                test.login = par1;
                test.password = par2;
                $http.post("/api/logins", test)
                    .then(function(response) {
                        if (response.data) {
                            $scope.pass.state = true;
                            $scope.current.member = response.data;
                        } else {
                            $scope.pass.state = false;
                        }
                    });
            } else {
                $scope.pass.state = false;
                $scope.current.member = null;
            }
        }

        $http.get("/api/logins").then(function(response) {
                //$log.log('success', response.data); // success
                if (response.data.length) {
                    $scope.items = response.data;
                } else {
                    addManager.dataManager('Администратор', 'admin', '123456', true)
                        .then(function() {
                            $http.get("/api/logins")
                                .then(function(response) {
                                    $scope.items = response.data;
                                });
                        })
                }
            },
            function(data, status, headers, config) {
                $log.log(data);
                $log.log(status);
                $log.log(headers);
                $log.log(config);
            });

        $scope.toOpenData = function() {
            bpCurrent.setCurrent($scope.current);
            var tmp = $scope.current.member;
            if (tmp.login == 'admin') {
//                $scope.current._id='5he884426l9l3o11a4m8i7go';
//                bpCurrent.setCurrent($scope.current);
                $location.path("/admin");
            } else {
//                bpCurrent.setCurrent($scope.current);
                if (tmp.admission) {
                    $location.path("/manager");
                } else {
                    $location.path("/ban");
                }
                
                $scope.login.name = '';
                $scope.login.pass = '';
            }
        };


    }

})();