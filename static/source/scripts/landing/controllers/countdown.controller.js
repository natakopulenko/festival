angular.module('pages.main').controller('CountdownController', ['$scope','$timeout', 'UtilsService',
    function ($scope, $timeout, utilsService) {
        var countDowner, countDown=0;
        $scope.OnTimer = true;

        utilsService.getCountDown(function(response) {
            $scope.countdown = response.data;
            countDown = $scope.countdown.seconds;
        });
        countDowner = function() {
                if (!$scope.OnTimer) {
                    return; // quit
                } else {
                    if (countDown < 0) {
                        countDown = 59;
                        $scope.countdown.minutes--;
                        if ($scope.countdown.minutes < 0) {
                            $scope.countdown.minutes = 59;
                            $scope.countdown.hours--;
                            if ($scope.countdown.hours < 0) {
                            $scope.countdown.hours = 23;
                            $scope.countdown.days--;
                                if ($scope.countdown.days < 0) {
                                    $scope.countdown.days = 0;
                                    $scope.countdown.hours = 0;
                                    $scope.countdown.minutes = 0;
                                    $scope.countdown.seconds = 0;
                                    $scope.OnTimer = false;
                                    return;
                                }
                            }
                        }
                    }
                    $scope.secondsLeft = countDown; // update scope
                    countDown--; // -1
                    $timeout(countDowner, 970); // loop it again
                }
        };
        countDowner();
    }
]);





