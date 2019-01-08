'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomArrayLength = function (arr) {
    return arr.slice(Math.floor(Math.random() * arr.length));
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandom: getRandomNumber,
    getItem: getRandomItem,
    getArrayLength: getRandomArrayLength,
    debounce: debounce
  };

})();
