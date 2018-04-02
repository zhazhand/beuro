(function() {

    angular.module('bpApp', ['ngRoute']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'home/home.view.html',    
            /*controller: 'homeCtrl',
            controllerAs: 'vm'*/
            })
            .when('/admin', {
                templateUrl: 'views/admin.view.html'/*,
                controller: 'adminCtrl'*/
            })
            .when('/manager', {
                templateUrl: 'views/manager.view.html'/*,
                controller: 'managerCtrl'*/
            })
            .when('/table', {
                templateUrl: 'views/table.view.html'/*,
                controller: 'tableCtrl'*/
            })
            .when('/ban', {
                templateUrl: 'views/ban.view.html'/*,
                controller: 'banCtrl'*/
            })
            .when('/list', {
                templateUrl: 'views/list.view.html'/*,
                controller: 'listCtrl'*/
            })
            .when('/touristes', {
                templateUrl: 'views/fullList.view.html'/*,
                controller: 'fullListCtrl'*/
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }

    angular
        .module('bpApp')
        .config(['$routeProvider', '$locationProvider', config]);
})();