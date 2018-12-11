'use strict';
(function () {

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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    getRandomArrayLength: getRandomArrayLength,
  };

})();
