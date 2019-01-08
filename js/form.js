'use strict';
(function () {

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = Array.from(capacity.options);
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');
  var resetButton = document.querySelector('.ad-form__reset');

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

  timeIn.addEventListener('change', function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });

  timeOut.addEventListener('change', function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

  var TypeFlat = {
    bungalo: {
      PRICE: 0
    },
    flat: {
      PRICE: 1000
    },
    house: {
      PRICE: 5000
    },
    palace: {
      PRICE: 10000
    }
  };

  var onTypeFlatChange = function () {
    var type = formType.value;
    var PRICE = TypeFlat[type].PRICE;

    formPrice.placeholder = PRICE;
    formPrice.min = PRICE;
  };

  var setValidation = function () {
    formType.addEventListener('input', onTypeFlatChange);
  };
  setValidation();

  var deactivateMap = function () {
    window.data.adForm.reset();
    window.data.adForm.classList.add('ad-form--disabled');
    window.data.map.classList.add('map--faded');
    window.pins.remove();
    window.pins.deleteCard();
    window.pins.fillAdress();

  };

  window.data.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(window.data.adForm), window.message.showError, window.message.showSuccess);
    window.pins.startMain();
    window.drag.setStart();
    deactivateMap();
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.pins.startMain();
    window.drag.setStart();
    deactivateMap();
  });

  roomNumber.removeEventListener('change', roomNumber);
  timeIn.removeEventListener('change', timeIn);
  timeOut.removeEventListener('change', timeOut);
  window.data.adForm.removeEventListener('submit', window.data.adForm);
  resetButton.removeEventListener('click', resetButton);
  window.form = {
    deactivate: deactivateMap
  };

})();
