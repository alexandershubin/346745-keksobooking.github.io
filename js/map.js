'use strict';

//first exercise

var FLAT_TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

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
var MIN_X = 100;
var MAX_X = 1200;
var FLAT_WIDTH = 70;
var FLAT_HEIGHT = 70;

var offerTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
}

var mapPins = document.querySelector('.map__pins');
var pinsContainer = document.querySelector('.map__pins');
var mapFilter = document.querySelector('.map__filter');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function(min,max) {
  return Math.floor(Math.random() * (max - min) ) + min;
};

var getRandomArrayLength = function (arr) {
  return arr.slice(Math.floor(Math.random() * arr.length));
};

var generateAdvert = function(i) {
  var location = {
    x: getRandomNumber(MIN_X, MAX_X),
    y: getRandomNumber(MIN_Y, MAX_Y)
  };

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
      x: location.x,
      y: location.y
    }
  }
}

var advertArray = [];
for(var i = 0; i < ADS_COUNT; i++) {
  advertArray.push(generateAdvert(i+1));
};
console.log(advertArray);

var createPin = function (pin) {
  var element = templatePin.cloneNode(true);

  element.style.left = pin.location.x - FLAT_WIDTH / 2 + 'px';
  element.style.top = pin.location.y - FLAT_HEIGHT + 'px';
  var pinImage = element.querySelector('img');
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;

  return element;
}
console.log(pin);

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var newPin = createPin(pins[i]);
    fragment.appendChild(newPin);
  }
  pinsContainer.appendChild(fragment);

  console.log(pins);
}
renderPins(advertArray);

var map = document.querySelector('.map');
var templateCard = document.querySelector('#card')
    .content
   .querySelector('.map__card');

var createElement = function(advert) {

  var card = templateCard.cloneNode(true);

  var offerTitle = card.querySelector('.popup__title');
  var offerAdress = card.querySelector('.popup__text--address');
  var offerPrice = card.querySelector('.popup__text--price');
  var offerType = card.querySelector('.popup__type');
  var offerRooms = card.querySelector('.popup__text--capacity');
  var offerCheck = card.querySelector('.popup__text--time');
  var offerFeatures = card.querySelector('.popup__features');
  var offerDescription = card.querySelector('.popup__description');
  var offerPhotos = card.querySelector('.popup__photos');
  var offerAvatar = card.querySelector('.popup__avatar');

  offerTitle.textContent = advert.offer.title;
  offerAdress.textContent = advert.offer.address;
  offerPrice.textContent = advert.offer.price + ' ₽/ночь';
  offerType.extContent = offerTypes[advert.offer.type];
  offerRooms.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  offerCheck.textContent = 'Заезд после ' + advert.offer.checkin + ' Выезд до ' + advert.offer.checkout;

  offerFeatures.innerHTML = '';
  for (var i = 0; i < advert.offer.features.length; i++) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + advert.offer.features[i];
    card.querySelector('.popup__features').appendChild(li);
  }
  offerDescription.textContent = advert.offer.description;

 offerPhotos.innerHTML = '';
  for (var i = 0; i < advert.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.className = 'popup__photos' + advert.offer.photos[i];
    card.querySelector('.popup__photos').appendChild(img);
  }
   offerPhotos.innerHTML = '';
  for (var i = 0; i < advert.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.className = 'popup__photo';
    img.src = advert.offer.photos[i];
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
     card.querySelector('.popup__photos').appendChild(img);
    card.querySelector('.popup__photos').querySelector('img').src = advert.offer.photos[i];
  }

  return card;
}

map.insertBefore(createElement(advertArray[0]), map.querySelector('.map__filters-container'));

map.classList.add('map--faded');

/*var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('mouseup', function() {
  map.classList.remove('map--faded');
});
*/

var mapPin = document.querySelector('.map__pin--main');
var mapPinMouseupHandler = function() {
  map.classList.remove('map--faded');

};

mapPin.addEventListener('mouseup', mapPinMouseupHandler);

