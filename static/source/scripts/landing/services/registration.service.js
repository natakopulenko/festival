angular.module('pages.main').factory('RegistrationService', ['$http', function($http) {
    return {
        register: function(mail, callback) {
            $http.post('api/v1/registration/', mail)
                .success(function(response) {
                    if (typeof callback == 'function') {
                        callback(response);
                    }
                })
        }
    }

}]);
