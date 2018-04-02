(function() {

    angular
        .module('bpApp')
        .service('addManager', addNew);

    addNew.$inject = ['$http'];

    function addNew($http) {
        var dataManager = function(namE, logiN, passworD, admissioN) {
            var newManager = {
                name: namE,
                login: logiN,
                password: passworD,
                admission: admissioN
            };
            return $http.post("/api/manager", newManager);
        };
        return {
            dataManager: dataManager
        };
    }

})();