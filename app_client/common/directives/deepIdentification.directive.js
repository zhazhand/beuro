(function() {
    
    angular
        .module('bpApp')
        .directive('deepIdentification', dpId);

    function dpId() {
        return {
            templateUrl: '../views/deepIdentification.html'
        }
    }
})();