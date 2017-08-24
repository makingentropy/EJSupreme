const app = angular.module("MyApp",[]);
//--------------------------->
//this is the event controller
//--------------------------->
app.controller('mainController', ['$http', function($http){
  const controller = this;
  this.indexEditForm = 1;
  this.hideDiv = true;
  this.showDiv = false;
  this.Questions={};

  this.handleClick = function(){
    this.hideDiv = !this.hideDiv;
  },

  this.getEvents = function(){
    $http({
      method: 'GET',
      url: '/events'
    }).then(function(response){
      console.log(response, ' -- > this is the response');
      //if users.interesttags === events.interestTags
      //show the shit
      //else
      //don't show the shit
      controller.events = response.data;

      // controller.getEvents();
      // console.log('this is controller.events', controller.events);
    }, function(error){
      console.log('error');
      console.log('why');
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
      // console.log(response);
      controller.getEvents();
      //empties form upon successful new event post
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
      //previously: url: '/events/' + event._id,
      data: {
        title: this.updatedTitle,
        date: this.updatedDate,
        time: this.updatedTime,
        imagelink: this.updatedImagelink,
        description: this.updatedDecription,
        requiredCost: this.updatedRequiredcost,
        country: this.updatedCountry,
        state: this.updatedState,
        city: this.updatedCity,
        zip: this.updatedZip,
        address: this.updatedAddress,
        interestTags: this.updatedInterestTags
      }
    }).then(function(response){
      // console.log(response);
      controller.getEvents();
      //empties form upon successful event edit
      controller.updatedTitle = "";
      controller.updatedDate = "";
      controller.updatedTime = "";
      controller.updatedImagelink = "";
      controller.updatedDescription = "";
      controller.updatedRequiredcost = "";
      controller.updatedCountry = "";
      controller.updatedState = "";
      controller.updatedCity = "";
      controller.updatedZip = "";
      controller.updatedAddress = "";
      controller.updatedInterestTags = "";
    }, function(error){
      console.log('error');
    });
  },
  this.deleteEvent = function(event){
    $http({
      method: 'DELETE',
      url: '/events/' + event._id,
    }).then(function(response){
      // console.log(response);
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
  app.controller('userController', ['$http', function($http){
    const controller = this;
    this.loggedIn = false;
    this.initialProfileUpdate = false;
    this.user = "";


    this.getUsers = function(){
      $http({
        method: 'GET',
        url: '/users'
      }).then(function(response){
        // controller.user = response.data
        controller.users = response.data;
      }, function(error){
        console.log('error');
      });
    },

    this.postUser = function(){
      $http({
        method: 'POST',
        url: '/users/register',
        data: {
          email: this.regEmail,
          password: this.regPassword
        }
      }).then(function(response){
        //empties form upon successful registry
        controller.regEmail = "";
        controller.regPassword = "";
        controller.loggedIn = true;
        controller.initialProfileUpdate = true;
        controller.user = response.data;
        // console.log('this is the res.data.cookie...', response.data.email);
        //redirect to edit your profile
      }, function(error){
        console.log('error');
      });
    },

    this.editUser = function(user){
      // console.log(user);
      $http({
        method: 'PUT',
        url: '/users/' + user._id,
        data: {
          // email: this.updatedEmail,
          // password: this.updatedPassword,
          name: this.updatedName,
          age: this.updatedAge,
          phone: this.updatedPhone,
          country: this.updatedCountry,
          city: this.updatedCity,
          zip: this.updatedZip,
          imagelink: this.updatedImageLink,
          interests: this.updatedInterests,
        }
      }).then(function(response){
        //empties form upon successful edit
        // controller.updatedEmail = "";
        // controller.updatedPassword = "";
        controller.updatedName = "";
        controller.updatedAge = "";
        controller.updatedPhone = "";
        controller.updatedCountry = "";
        controller.updatedCity = "";
        controller.updatedZip = "";
        controller.updatedImageLink = "";
        controller.updatedInterests = "";
        controller.initialProfileUpdate = false;
      }, function(error){
        console.log('error');
      });
    },

    this.deleteUser = function(user){
      $http({
        method: 'DELETE',
        url: '/users/' + user._id,
      }).then(function(response){
        console.log('delete user success');
      }, function(error){
        console.log('delete user error');
      });
    },

    this.loginUser = function(email, password){
      $http({
        method: 'POST',
        url: '/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      }).then(function(response){
        console.log(response);

          if(response.data === true){
            //empties form upon successful login
            controller.email = "";
            controller.password = "";
            controller.loggedIn = response.data;
            // console.log('this is response.data', response.data);
          } else {
            console.log("couldn't log in");
          }
      }, function(error){
        console.log('error');
      });
    },

    this.logoutUser = function(){
      $http({
        method: 'GET',
        url: '/users/logout'
      }).then(function(response){
        // console.log('logged out/app.js');
        controller.loggedIn = false;
      }, function(error){
        console.log('error');
      });
    }
}]);

//--------------------------->
//this is the users/
//--------------------------->
