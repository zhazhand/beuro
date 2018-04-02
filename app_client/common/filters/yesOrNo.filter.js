(function() {

    angular
        .module('bpApp')
        .filter('yesOrNo', yon);

    function yon() {

        return function(value, variant) {
            var txtTrnsf;
            if (typeof(value) === "boolean") {
                variant ? (txtTrnsf = value ? 'Да (есть)' : 'Нет'):(txtTrnsf = value ? 'Список (см ниже)' : 'Ни в каких (первый раз)');
                return txtTrnsf;
            } else {
                return value;
            }
        }
    }
})();