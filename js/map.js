'use strict';

var FLAT_TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"]

var FLAT_PRICE = {
  min: 1000,
  max: 1000000
};

var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];

var FLAT_ROOMS = {
  min: 1,
  max: 5
};

var FLAT_GUESTS = {
  min: 0,
  max: 10
};

var FLAT_CHEK = ['12:00', '13:00', '14:00'];

var FLAT_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var FLAT_DISCRIPTION = '';

var FLAT_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var ADS_COUNT = 8;

var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = 0;
var MAX_X = 1200;
var FLAT_WIDTH = 70;
var FLAT_HEIGHT = 70;
var CARD_PHOTO_WIDTH = 45;
var CARD_PHOTO_HEIGTH = 40;

var FLAT_TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"]

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var mapFilter = document.querySelector('.map__filter');
var templatePin = document.querySelector('#pin').content.querySelector('map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');


/*var getRandomItem = function(arr) {
  for(var i = 0; i <= FLAT_TITLES.length - 1; i++) {
return FLAT_TITLES;
  }
};
getRandomItem();
*/
var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


var getRandomValue = function(min,max) {
return Math.floor(Math.random() * (max - min) ) + min;
}

var getRandomNumber = function(min,max) {
return Math.floor(Math.random() * (max - min) ) + min;
}

var getRandomArrayLength = function (arr) {
  return arr.slice(Math.floor(Math.random() * arr.length));
};

var generateAdvert = function(i) {
 return {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },

  offer: {
      title: getRandomItem(FLAT_TITLES),
      address: location.x + ', ' + location.y,
      price: getRandomNumber(FLAT_PRICE.min, FLAT_PRICE.max),
      type: getRandomItem(FLAT_TYPE),
      rooms: getRandomNumber(FLAT_ROOMS.min, FLAT_ROOMS.max),
      guests: getRandomNumber(FLAT_GUESTS.min, FLAT_GUESTS.max),
      checkin: getRandomItem(FLAT_CHEK),
      checkout: getRandomItem(FLAT_CHEK),
      features: getRandomArrayLength(FLAT_FEATURES),
      description: '',
      photos: getRandomArrayLength(FLAT_PHOTOS)
    },

   location: {
      x: getRandomNumber(MIN_X, MAX_X),
      y: getRandomValue(MIN_Y, MAX_Y)
    }
  }
}


var advertArray = [];
for(var i = 0; i < ADS_COUNT; i++) {
  advertArray.push(generateAdvert(i+1));
  console.log(advertArray);
  };



function createPin(pin) {
  var element = templatePin.cloneNode(true);
  style.left = pin.location.x - FLAT_WIDTH / 2 + 'px';
  style.top = pin.location.y - FLAT_HEIGHT + 'px';
  var pinImage = pin.querySelector('img');
  pinImage.src = example.author.avatar;
  pinImage.alt = example.offer.title;

  return pin;
}












