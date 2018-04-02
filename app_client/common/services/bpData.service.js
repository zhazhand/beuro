(function() {
    
    angular
        .module('bpApp')
        .factory('bpCurrent', bpCur);

    function bpCur() {
        var _current;
        return {
            setCurrent: function(dt) {
                _current = dt;
            },
            getCurrent: function() {
                return _current;
            }
        }
    }
})();