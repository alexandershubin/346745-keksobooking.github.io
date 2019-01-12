'use strict';
(function () {

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');
  var resetButton = document.querySelector('.ad-form__reset');

  var onRoomNumberChahge = function () {
    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value);
        item.hidden = !(ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0);
      });
    }
  };

  onRoomNumberChahge();

  var addRoomNumberListener = function () {
    roomNumber.addEventListener('change', onRoomNumberChahge);
  };

  var removeRoomNumberListener = function () {
    roomNumber.removeEventListener('change', onRoomNumberChahge);
  };

  var onTimeInChange = function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  };

  var addTimeInListener = function () {
    timeIn.addEventListener('change', onTimeInChange);
  };

  var removeTimeInListener = function () {
    timeIn.removeEventListener('change', onTimeInChange);
  };

  var onTimeOutChange = function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  };

  var addTimeOutListener = function () {
    timeOut.addEventListener('change', onTimeOutChange);
  };

  var removeTimeOutListener = function () {
    timeOut.removeEventListener('change', onTimeOutChange);
  };

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

  var deleteValidation = function () {
    formType.removeEventListener('input', onTypeFlatChange);
  };


  var deactivateMap = function () {
    window.data.adForm.reset();
    window.data.adForm.classList.add('ad-form--disabled');
    window.data.map.classList.add('map--faded');
    window.pins.remove();
    window.pins.deleteCard();
    window.pins.fillAdress();
    window.filter.deactivateListener();
    removeRoomNumberListener();
    removeTimeOutListener();
    removeTimeInListener();
    removeFormAdListener();
    removeResetButtonListener();
    deleteValidation();

  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(window.data.adForm), window.message.showError, window.message.showSuccess);
    window.pins.startMain();
    window.drag.setStart();
    deactivateMap();
  };

  var addFormAdListener = function () {
    window.data.adForm.addEventListener('submit', onFormSubmit);
  };

  var removeFormAdListener = function () {
    window.data.adForm.removeEventListener('submit', onFormSubmit);
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    window.pins.startMain();
    window.drag.setStart();
    deactivateMap();
  };

  var addResetButtonListener = function () {
    resetButton.addEventListener('click', onResetButtonClick);
  };

  var removeResetButtonListener = function () {
    resetButton.removeEventListener('click', onResetButtonClick);
  };


  window.form = {
    activateRoomNumber: addRoomNumberListener,
    deactivate: deactivateMap,
    activateTimeOut: addTimeOutListener,
    activatTimeIn: addTimeInListener,
    activateFormAd: addFormAdListener,
    activateResetButton: addResetButtonListener,
    setValidation: setValidation
  };

})();
