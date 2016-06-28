var app = angular.module('shopApp', []);

app.controller('shopController', function($scope, $http) {

    getItem();
    function getItem(){
        $http.post("ajax/getItem.php").success(function(data){
            $scope.items = data;
        });
    };

    $scope.addItem = function (item) {
        $http.post("ajax/addItem.php?item="+item).success(function(data){
            getItem();
            $scope.itemInput = "";
        });
    };

    $scope.deleteItem = function (item) {
        if (confirm("Tem certeza que deseja apagar este item?")) {
            $http.post("ajax/deleteItem.php?itemID="+item).success(function(data){
                getItem();
            });
        }
    };

    $scope.clearItem = function () {
        if (confirm("Apagar todos os itens marcados?")) {
            $http.post("ajax/clearItem.php").success(function(data){
                getItem();
            });
        }
    };

    $scope.changeStatus = function(item, status, task) {
        if (status=='2') {
            status='0';
        } else{
            status='2';
        }

        $http.post("ajax/updateItem.php?itemID="+item+"&status="+status).success(function(data){
            getItem();
        });
    };
});
