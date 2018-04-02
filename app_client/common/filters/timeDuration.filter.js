(function() {

    angular
        .module('bpApp')
        .filter('timeFilter', timeF);

    function timeF() {
        return function(value) {
            if (angular.isNumber(value)) {
                var tmpResult = parseInt(value / 1000);
                var result = parseInt(tmpResult / 60) + ' минут ' + tmpResult % 60 + ' секунд';
                return result;
            } else {
                return value;
            }
        }
    }
})();