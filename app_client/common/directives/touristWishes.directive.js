(function() {
    
    angular
        .module('bpApp')
        .directive('touristWishes', trWsh);

    function trWsh() {
        return {
            templateUrl: '../views/touristWishes.html',
            replace: true
        }
    }
})();