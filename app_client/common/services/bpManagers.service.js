(function() {
    
    angular
        .module('bpApp')
        .factory('bpManagers', bpList);

    function bpList() {
        var _list;
        return {
            setList: function(dt) {
                _list = dt;
            },
            getList: function() {
                return _list;
            }
        }
    }
})();