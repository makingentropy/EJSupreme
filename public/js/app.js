const app = angular.module("MyApp",[]);


//--------------------------->
//this is the event controller
//--------------------------->
app.controller('mainController', ['$http', function($http){
  const controller = this;
  this.indexEditForm = 1;

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

        title: this.title,
        ownerEmail: this.ownerEmail,
        date: this.date,
        time: this.time,
        imagelink: this.imagelink,
        description: this.description,
        requiredCost: this.requiredCost,
        country: this.country,
        state: this.state,
        city: this.city,
        zip: this.zip,
        address: this.address,
        interestTags: this.interestTags,
      }
    }).then(function(response){
      console.log(response);
      controller.getEvents();
      controller.title = "";
      controller.ownerEmail = "";
      controller.date = "";
      controller.time = "";
      controller.imagelink = "";
      controller.description = "";
      controller.requiredCost = "";
      controller.country = "";
      controller.state = "";
      controller.city = "";
      controller.zip = "";
      controller.address = "";
      controller.interestTags = "";
    }, function(error){
      console.log('error');
    });
  },
  this.editEvent = function(event){
    $http({
      method: 'PUT',
      url: '/events/' + event._id,
      data: {
        title: this.updatedTitle
      }
    }).then(function(response){
      console.log(response);
      controller.getEvents();
      controller.title = "";
      controller.ownerEmail = "";
      controller.date = "";
      controller.time = "";
      controller.imagelink = "";
      controller.description = "";
      controller.requiredCost = "";
      controller.country = "";
      controller.state = "";
      controller.city = "";
      controller.zip = "";
      controller.address = "";
      controller.interestTags = "";
    }, function(error){
      console.log('error');
    });
  },
  this.deleteEvent = function(event){
    $http({
      method: 'DELETE',
      url: '/events/' + event._id,
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
  this.getEvents();

}]);

//--------------------------->
//this is the user controller
//--------------------------->
