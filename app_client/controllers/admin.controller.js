(function() {
    angular
        .module('bpApp')
        .controller('adminCtrl', adminCtrl);

    adminCtrl.$inject = ['$scope', '$location', '$http', '$log', '$window', 'bpCurrent', 'addManager'];
    function adminCtrl($scope, $location, $http, $log, $window, bpCurrent, addManager) {

        if (bpCurrent.getCurrent()) {
            var tmpCurrent = bpCurrent.getCurrent();
            var str = {};
            str.year = tmpCurrent.year;
            str._id = tmpCurrent.member._id;
            str.name = tmpCurrent.member.name;
            $window.sessionStorage.setItem("current",JSON.stringify(str));
        }
        $scope.current = JSON.parse($window.sessionStorage.getItem("current"));
        $scope.admin = $scope.current.name === 'Администратор' ? true : false;

        if($scope.admin){getManagerList();}

        $scope.backToStartPage = function() {
            $location.search("");
            $location.path("/");
	    $window.sessionStorage.clear();//console.log("SESSION STORAGE CLEAR!!!!!");
		var tmp = {};
	    tmp.name = "NEW"
	    $window.sessionStorage.setItem("current",JSON.stringify(tmp));
        };

        $scope.editTr = function(parametr1, parametr2) {
            for (var i = 0; i < parametr1.length; i++) {
                parametr1[i].edit = false;
            }
            parametr2.edit = true;
        };

        $scope.addNewManager = function() {
            var flag = 0;

            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].login == 'new') {
                    flag++;
                }
            }
            if (!flag) {

                addManager.dataManager('Новый', 'new', 'new', false)
                    .then(function(response) {
                        $scope.items.push(response.data);
                    }, function(data, status, headers, config) {
                        $log.log(data);
                        $log.log(status);
                        $log.log(headers);
                        $log.log(config);
                    });

            } else {
                $window.alert('Такой менеджер уже существует!');
            }
        };

        $scope.showModal = function(par) {
            $scope.deletingManager = par;
            $scope.managers = [];
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i]._id != $scope.deletingManager._id) {
                    $scope.managers.push($scope.items[i]);
                }
                if ($scope.managers.length) $scope.newManager = $scope.managers[0];
            }
        }

        $scope.touristes = [];
        $scope.changeManagerAndDelete = function(par) {
            if (par) {
                $http.get("/api/tourist/touristes_list/" + $scope.deletingManager._id)
                    .then(function(response) {
                        $scope.touristes = response.data;
                        var len = $scope.touristes.length;
                        return len;
                    })
                    .then(function(res) {
                        if (res) {
                            var newManager = {};
                            newManager.index_id = par._id;
                            newManager.manager = par.name;
                            newManager._id = $scope.deletingManager._id;
                            $http.put("/api/touristes_change", newManager)
                        }
                    })
                    .then(function() {
                        deleteManager($scope.deletingManager);
                        angular.element("#adminModal").modal('hide');
                    });
            } else {
                $window.alert('Выберите нового менеджера!!!');
            }
        }

        $scope.changeAdminData = function(par1, par2) {
                        var admin = {};
                        admin._id= $scope.current._id;
                        admin.oldPassword = par1;
                        admin.newPassword = par2;
                        $http.put("/api/admin", admin)
                            .then(function(response) {
                                $log.log(response.status);
                                $scope.oldPass = "";
                                $scope.newPass = "";
                                $scope.repeatPass = "";
                                angular.element("#adminDataModal").modal('hide');
                            })
                            .catch(function(response) {
                                $log.log(response.status);
                                $window.alert("НЕВЕРНЫЙ ИСХОДНЫЙ ПАРОЛЬ!");
                            });
        }

        $scope.showAll = function() {
            $location.path("/touristes");
        }

        $scope.save = function(par) {
            $http.put("/api/manager", par)
                .then(function(response) {
                    $log.log('success', response.data)
                }, function() {
                    $log.log('error');
                });
        }

        function getManagerList() {
            $http.get("/api/manager").then(function(response) {
                $scope.items = response.data;
            }, function(status, headers, config) {
                $log.log(status);
                $log.log(headers);
                $log.log(config);
            });
        }

        function deleteManager(par) {
            $http.delete("/api/manager?id=" + par._id)
                .then(function(response) {
                    $log.log('success', response.data); // success
                    $scope.items.splice($scope.items.indexOf(response.data), 1);
                }, function(data, status, headers, config) {
                    $log.log(data);
                    $log.log(status);
                    $log.log(headers);
                    $log.log(config);
                });
        }

    }
})();
