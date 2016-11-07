angular.module('starter.controllers', ['clientConfigModule'])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('OrderCtrl', ['$scope', '$http', 'config', '$state', '$ionicLoading', function ($scope, $http, config, $state, $ionicLoading) {
        $scope.data = {
            houseNumber: null,
            email: null,
            wechat: null,
            taobaoOrderId: null
        };

        $scope.submit = function () {
            $http.put(config.serviceUrls.orders.create, $scope.data)
                .then(function (xhr) {
                    if ($scope.data.taobaoOrderId) {
                        $state.go('app.paid', {
                            paymentMethod: 'taobao',
                            orderId: $scope.data.taobaoOrderId
                        });
                    } else {
                        $state.go('app.pay', {
                            order_id: xhr.data._id
                        });
                    }
                })
                .catch(function (xhr) {
                    console.error(xhr);
                    $scope.errorMessages = xhr.data;
                })
                .finally(function () {
                    $ionicLoading.hide();
                });
        };
    }])

    .controller('PayCtrl', ['$scope', '$http', 'config', '$state', '$stateParams', '$ionicModal', function ($scope, $http, config, $state, $stateParams, $ionicModal) {
        $ionicModal.fromTemplateUrl('templates/paid-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.paid = function () {
            $scope.openModal();
        };

        $scope.openModal = function () {
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        })
    }])

    .controller('PaidCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    }])

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
