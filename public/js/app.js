const app=angular.module("MyApp",[]);

app.controller('mainController', ['$http', function($http){
  const controller = this;
  this.formdata = {};

  this.getEvents = function(){
    $http({
      method: 'GET',
      url: '/events'
    }).then(function(response){
      console.log(response, ' -- > this is the response');
      controller.events = response.data;
    }, function(error){
      console.log('error');
    });
  },
  this.postEvent = function(){
    $http({
      method: 'POST',
      url: '/events',
      data: {
        title: this.title
      }
    }).then(function(response){
      console.log(response);
        controller.getEvents();
    }, function(error){
      console.log('error');
    });
  }
  // },
  // this.editEvent = function(event){
  //   $http({
  //     method: 'PUT',
  //     url: '/events/' + event._id,
  //     data: {
  //
  //     }
  //   })
  // }
  this.showingRegister=false;
  this.showingLogin=false;
}]);
