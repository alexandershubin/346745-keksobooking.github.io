'use strict';
(function () {

  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;
  var FLAT_WIDTH = 70;
  var FLAT_HEIGHT = 70;
  var PIN_MAIN_RADIUS = 31;
  var PIN_MAIN_HEIGHT = 84;
  var MAX_PINS = 5;
  var ESC_BUTTON = 27;

  var OfferTypes = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var pinsContainerElement = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var addressElement = document.querySelector('#address');
  var mapPinElement = document.querySelector('.map__pin--main');
  var disabledElements = document.querySelectorAll('[disabled]');
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var templateCardElement = document.querySelector('#card').content.querySelector('.map__card');

  window.data = {
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    FLAT_WIDTH: FLAT_WIDTH,
    FLAT_HEIGHT: FLAT_HEIGHT,
    PIN_MAIN_RADIUS: PIN_MAIN_RADIUS,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    MAX_PINS: MAX_PINS,
    ESC_BUTTON: ESC_BUTTON,
    OfferTypes: OfferTypes,
    pinsContainer: pinsContainerElement,
    map: mapElement,
    adForm: adFormElement,
    address: addressElement,
    mapPin: mapPinElement,
    disabledElements: disabledElements,
    templatePin: templatePinElement,
    templateCard: templateCardElement,
    advertArray: []
  };

})();
