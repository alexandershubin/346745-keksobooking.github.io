'use strict';
(function () {
// Обьявляем константы

  var FLAT_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var FLAT_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var FLAT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var FLAT_CHEK = ['12:00', '13:00', '14:00'];
  var OFFER_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var FLAT_PRICE = {
    min: 0,
    max: 1000000
  };

  var FLAT_ROOMS = {
    min: 1,
    max: 5
  };

  var FLAT_GUESTS = {
    min: 0,
    max: 10
  };

  var ADS_COUNT = 8;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;
  var FLAT_WIDTH = 70;
  var FLAT_HEIGHT = 70;
  var FLAT_DISCRIPTION = '';
  var PIN_MAIN_RADIUS = 31;
  var PIN_MAIN_HEIGHT = 84;
  var advertArray = [];

  var pinsContainer = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var mapPin = document.querySelector('.map__pin--main');
  var fieldset = document.querySelectorAll('[disabled]');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  window.data = {
    ADS_COUNTS: ADS_COUNT,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    FLAT_WIDTH: FLAT_WIDTH,
    FLAT_HEIGHT: FLAT_HEIGHT,
    FLAT_DISCRIPTION: FLAT_DISCRIPTION,
    PIN_MAIN_RADIUS: PIN_MAIN_RADIUS,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    OFFER_TYPES: OFFER_TYPES,
    FLAT_TITLES: FLAT_TITLES,
    FLAT_TYPE: FLAT_TYPE,
    FLAT_PRICE: FLAT_PRICE,
    FLAT_ROOMS: FLAT_ROOMS,
    FLAT_CHEK: FLAT_CHEK,
    FLAT_PHOTOS: FLAT_PHOTOS,
    FLAT_FEATURES: FLAT_FEATURES,
    FLAT_GUESTS: FLAT_GUESTS,
    pinsContainer: pinsContainer,
    map: map,
    adForm: adForm,
    address: address,
    mapPin: mapPin,
    fieldset: fieldset,
    templatePin: templatePin,
    templateCard: templateCard,
    advertArray: advertArray,
  };

})();
