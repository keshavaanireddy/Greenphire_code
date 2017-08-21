var uiDemo =  angular.module('myDemo',["ngSanitize","ngRoute"]);


uiDemo.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/home.html",
        controller:""
    })
    .when("/datacall", {
        templateUrl : "templates/datacall.html",
        controller:"showJsonData"
    })
    .when("/dom", {
        templateUrl : "templates/dom.html",
        controller:"domManipulation"
    })
    .when("/css", {
        templateUrl : "templates/css.html",
        controller:"openModal"
    });
})



uiDemo.controller('showJsonData',['$scope','$http',function($scope,$http){
    $http.get("data/myData.json")
    .then(function(response) {
        $scope.dlData = response.data.dl;
        $scope.personDetails = response.data.personal;
        
    },function(error){
        $scope.dlData_error = response.data;
        
    })
}]);

uiDemo.controller('domManipulation',['$scope',function($scope){
  $scope.textboxOnchange = function(thiz){
    var thisCheckBox = angular.element($scope.onChangeTargetElem).parent().find('span').find('input')[0],
    self = this;
    $scope.totalSum = 0;
    
    if(self.tboxvalue){
      var isnum = /^\d+$/.test(self.tboxvalue);
      if(!isnum){
        alert('Please enter only numbers!');
        angular.element(thisCheckBox).prop('checked', false);
      }else{
        angular.element(thisCheckBox).prop('checked', true);
        $scope.totalSum = $scope.totalSum + parseInt(self.tboxvalue);
      }
    }else{
      angular.element(thisCheckBox).prop('checked', false);
    }
    
    jQuery("#dom_view input.tBox").not($scope.onChangeTargetElem).each(function(i){
      var thisVal = $(this).val();
      if(thisVal){
        var isnum = /^\d+$/.test(thisVal);
        if(isnum){
          $scope.totalSum = $scope.totalSum + parseInt(thisVal);
        }
      }
    });
  };
  $scope.onTextboxFocus = function(event){
    $scope.onChangeTargetElem = event.target
  };
  
}]);

uiDemo.controller('openModal',['$scope',function($scope){
  $scope.showmodal = false;
}]);