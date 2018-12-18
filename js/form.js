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
  var typeFlat = {
    bungalo: {
      minPrice: 0
    },
    flat: {
      minPrice: 1000
    },
    house: {
      minPrice: 5000
    },
    palace: {
      minPrice: 10000
    }
  };

  var onTypeFlatChange = function () {
    var type = formType.value;
    var minPrice = typeFlat[type].minPrice;

    formPrice.placeholder = minPrice;
    formPrice.min = minPrice;
  };

  var setValidation = function () {
    formType.addEventListener('input', onTypeFlatChange);
  };
  setValidation();

})();
