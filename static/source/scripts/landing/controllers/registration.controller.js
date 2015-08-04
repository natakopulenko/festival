function is_numeric(str){
    return /^\d+$/.test(str);
}
function isLetter(str) {
  return str.match(/[а-яА-ЯёЁ]/i);
}
angular.module('pages.main').controller('RegistrationController', ['$scope', 'RegistrationService',
    function ($scope, registrationService) {
        $scope.registration = {
            name: '',
            number: '',
            paint: ''
        };

        $scope.register = function() {
            $scope.answer = null;
            $scope.type_error = null;
            $scope.input_error = null;
            if (!$scope.registration.name.length){
                $scope.input_error = "Прізвище, ім'я";
                return;
            }
            if (!isLetter($scope.registration.name)){
                $scope.type_error = "Прізвище, ім'я";
                return;
            }
            if (!$scope.registration.number.length){
                $scope.input_error = "Ваш номер";
                return;
            }
            if (!is_numeric($scope.registration.number)){
                $scope.type_error = "Ваш номер";
                return;
            }
            if (!$scope.registration.paint.length){
                $scope.input_error = "Кількість фарби";
                return;
            }
            if (!is_numeric($scope.registration.paint)){
                $scope.type_error = "Кількість фарби";
                return;
            }
            if ($scope.regForm.$valid) {
                registrationService.register($scope.registration, function(response) {
                    $scope.answer = response.data.name;
                });
            }
        };

    }
]);
