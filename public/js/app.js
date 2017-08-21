const app=angular.module("MyApp",[]);

app.controller('mainController', ['$http', function($http){
  const controller = this;
  this.formdata = {};

  this.getEvents = function(){
    $http({
      method: 'GET',
      url: '/'
    }).then(function(response){
      controller.info = response.data;
    }, function(error){
      console.log('error');
    });
  },
  this.
}]);
