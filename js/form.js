'use strict';
(function () {

  // Находим необходимые элементы DOM
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = Array.from(capacity.options);
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');
  var resetButton = document.querySelector('.ad-form__reset');

  // установка соответствия количества гостей количеству комнат
  var compareRoomGuests = function (evt) {
    if (evt.target.value === '1') {
      capacityOptions[0].disabled = false;
      capacityOptions[1].disabled = true;
      capacityOptions[2].disabled = true;
      capacityOptions[3].disabled = true;
    } else if (evt.target.value === '2') {
      capacityOptions[0].disabled = false;
      capacityOptions[1].disabled = false;
      capacityOptions[2].disabled = true;
      capacityOptions[3].disabled = true;
    } else if (evt.target.value === '3') {
      capacityOptions[0].disabled = false;
      capacityOptions[1].disabled = false;
      capacityOptions[2].disabled = false;
      capacityOptions[3].disabled = true;
    } else if (evt.target.value === '100') {
      capacityOptions[0].disabled = true;
      capacityOptions[1].disabled = true;
      capacityOptions[2].disabled = true;
      capacityOptions[3].disabled = false;
    }
  };

  roomNumber.addEventListener('change', compareRoomGuests);

  // установка соответствия времени заезда
  timeIn.addEventListener('change', function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });

  timeOut.addEventListener('change', function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

  // установка соответствия названия жилища и цены
  var TypeFlat = {
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
    var minPrice = TypeFlat[type].minPrice;

    formPrice.placeholder = minPrice;
    formPrice.min = minPrice;
  };

  var setValidation = function () {
    formType.addEventListener('input', onTypeFlatChange);
  };
  setValidation();

  var deactivateMap = function () {
    window.data.adForm.reset();
    window.data.adForm.classList.add('ad-form--disabled');
    window.data.map.classList.add('map--faded');
    window.pins.removePins();
    window.pins.deleteCard();
    window.pins.fillAdress();
  };

  // Отправляет данные формы на сервер
  window.data.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(window.data.adForm), window.message.error, window.message.success);
    window.pins.startPin();
    window.drag.start();
    deactivateMap();
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivateMap();
  });

  window.form = {
    deactivate: deactivateMap
  };

})();
