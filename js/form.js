'use strict';
(function () {

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var mapPinStartCoords = {
    X: 570,
    Y: 375
  };

  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var formTypeElement = document.querySelector('#type');
  var formPriceElement = document.querySelector('#price');
  var resetButtonElement = document.querySelector('.ad-form__reset');

  var onRoomNumberChahge = function () {
    if (capacityElement.options.length > 0) {
      [].forEach.call(capacityElement.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumberElement.value][0] === item.value);
        item.hidden = !(ROOMS_CAPACITY[roomNumberElement.value].indexOf(item.value) >= 0);
      });
    }
  };

  onRoomNumberChahge();

  var addRoomNumberListener = function () {
    roomNumberElement.addEventListener('change', onRoomNumberChahge);
  };

  var removeRoomNumberListener = function () {
    roomNumberElement.removeEventListener('change', onRoomNumberChahge);
  };

  var onTimeInChange = function () {
    timeOutElement.selectedIndex = timeInElement.selectedIndex;
  };

  var addTimeInListener = function () {
    timeInElement.addEventListener('change', onTimeInChange);
  };

  var removeTimeInListener = function () {
    timeInElement.removeEventListener('change', onTimeInChange);
  };

  var onTimeOutChange = function () {
    timeInElement.selectedIndex = timeOutElement.selectedIndex;
  };

  var addTimeOutListener = function () {
    timeOutElement.addEventListener('change', onTimeOutChange);
  };

  var removeTimeOutListener = function () {
    timeOutElement.removeEventListener('change', onTimeOutChange);
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
    var type = formTypeElement.value;
    var PRICE = TypeFlat[type].PRICE;

    formPriceElement.placeholder = PRICE;
    formPriceElement.min = PRICE;
  };

  var setValidation = function () {
    formTypeElement.addEventListener('input', onTypeFlatChange);
  };

  var deleteValidation = function () {
    formTypeElement.removeEventListener('input', onTypeFlatChange);
  };

  var deactivateMap = function () {
    window.data.adForm.reset();
    window.data.adForm.classList.add('ad-form--disabled');
    window.data.map.classList.add('map--faded');
    window.pins.remove();
    window.pins.deleteCard();
    window.filter.deactivateListener();
    removeRoomNumberListener();
    removeTimeOutListener();
    removeTimeInListener();
    removeFormAdListener();
    removeResetButtonListener();
    deleteValidation();
    window.pins.fillAdress();
  };

  var setToStart = function () {
    window.data.mapPin.style.left = mapPinStartCoords.X + 'px';
    window.data.mapPin.style.top = mapPinStartCoords.Y + 'px';
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(window.data.adForm), window.message.showError, window.message.showSuccess);
    window.pins.startMain();
    setToStart();
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
    setToStart();
    deactivateMap();
  };

  var addResetButtonListener = function () {
    resetButtonElement.addEventListener('click', onResetButtonClick);
  };

  var removeResetButtonListener = function () {
    resetButtonElement.removeEventListener('click', onResetButtonClick);
  };

  window.form = {
    activateRoomNumber: addRoomNumberListener,
    deactivate: deactivateMap,
    activateTimeOut: addTimeOutListener,
    activatTimeIn: addTimeInListener,
    activateFormAd: addFormAdListener,
    activateResetButton: addResetButtonListener,
    setValidation: setValidation,
    mapPinStartCoords: mapPinStartCoords
  };

})();
