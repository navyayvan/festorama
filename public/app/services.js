angular.module('FestivalServices', ['ngResource'])
.factory('Festival', ['$resource', function($resource) {
  return $resource('/api/festivals/:id');
}])

.factory('Auth', ['$window', function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['secretfestivals-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['secretfestivals-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secretfestivals-token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      return token ? true : false;
    }
  };
}])

.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}])

.factory('Alerts', [function() {
  var alerts = [];

  return {
    clear: function() {
      alerts = [];
    },
    add: function(type, msg) {
      alerts.push({type: type, msg: msg});
    },
    get: function() {
      return alerts;
    },
    remove: function(idx) {
      alerts.splice(idx, 1);
    }
  }
}])