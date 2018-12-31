'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500;

  // Получить случайный номер
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Получить случайный элемент массива
  var getRandomItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // Получить случайную часть массива
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
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    getRandomArrayLength: getRandomArrayLength,
    debounce: debounce
  };

})();
