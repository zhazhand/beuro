(function() {
    
    angular
        .module('bpApp')
        .directive('questioningClient', questCl);

    function questCl() {
        return {
            templateUrl: '../views/questioning.html',
            replace: true
        }
    }
})();