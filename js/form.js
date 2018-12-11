'use strict';
(function () {

  // Находим необходимые элементы DOM
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');

  // установка соответствия количества гостей количеству комнат

  var roomNumberСhangeHandler = function (connect) {
    connect.setCustomValidity('Выберите');
    connect.addEventListener('change', function () {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');

      var capacityInt = parseInt(capacity.value, 10);
      var roomInt = parseInt(roomNumber.value, 10);

      if (capacityInt === roomInt && capacityInt > 0) {
        connect.setCustomValidity('Выберите соответсвующие значение (количество гостей не может превышать количество комнат)');
      } else if (roomInt === 100 && capacityInt < 0) {
        connect.setCustomValidity('100 комнат не для гостей');
      } else if (roomInt !== 100 && capacityInt === 0) {
        connect.setCustomValidity('Выберите количество гостей');
      }
    });
  };

  roomNumberСhangeHandler(roomNumber);
  roomNumberСhangeHandler(capacity);

  roomNumber.addEventListener('change', function () {
    capacity.selectedIndex = roomNumber.selectedIndex;
  });

  capacity.addEventListener('change', function () {
    roomNumber.selectedIndex = capacity.selectedIndex;
  });

  // установка соответствия времени заезда
  timeIn.addEventListener('change', function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });

  timeOut.addEventListener('change', function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

  // установка соответствия названия жилища и цены
  var compareFlatPrice = function () {
    if (formType.value === 'bungalo') {
      formPrice.min = 0;
      formPrice.placeholder = 0;
    } else if (formType.value === 'flat') {
      formPrice.min = 1000;
      formPrice.placeholder = 1000;
    } else if (formType.value === 'house') {
      formPrice.min = 5000;
      formPrice.placeholder = 5000;
    } else if (formType.value === 'palace') {
      formPrice.min = 10000;
      formPrice.placeholder = 10000;
    }
  };

  var setValidation = function () {
    formType.addEventListener('input', compareFlatPrice);
  };
  setValidation();

})();
