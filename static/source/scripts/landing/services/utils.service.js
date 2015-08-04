angular.module('pages.main').factory('UtilsService', ['$http', function($http) {
    return {
        getCountDown: function(callback) {
            $http.get('/api/v1/countdown/')
                .success(function (response) {
                    callback(response);
                })
                .error(function (response) {

                });
        }
    }
}]);