'use strict';

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

// Находим необходимые элементы DOM
var pinsContainer = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var mapPin = document.querySelector('.map__pin--main');
var fieldset = document.querySelectorAll('[disabled]');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var formType = document.querySelector('#type');
var formPrice = document.querySelector('#price');

// Массив со всеми объявлениями
var advertArray = [];

// Получить случайный элемент массива
var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Получить случайный номер
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Получить случайную часть массива
var getRandomArrayLength = function (arr) {
  return arr.slice(Math.floor(Math.random() * arr.length));
};

// Создать объявления
var generateAdvert = function (i) {
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
      description: FLAT_DISCRIPTION,
      photos: getRandomArrayLength(FLAT_PHOTOS)
    },

    location: {
      x: location.x,
      y: location.y
    }
  };
};

// Создаём метки
var createPin = function (pin, index) {
  var element = templatePin.cloneNode(true);
  var pinImage = element.querySelector('img');

  element.style.left = pin.location.x - FLAT_WIDTH / 2 + 'px';
  element.style.top = pin.location.y - FLAT_HEIGHT + 'px';
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;

  element.setAttribute('data-id', index);

  return element;
};

// Отрисовываем сгенерированые DOM-элементы в блок .map__pins
var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var newPin = createPin(pins[i], i);
    fragment.appendChild(newPin);
  }
  pinsContainer.appendChild(fragment);

  addClickHandlersToPins();
};

// Создаем DOM элемент обьявления
var createCardElement = function (advert) {
  deleteCurrentCard();

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
  var closeButton = card.querySelector('.popup__close');

  offerTitle.textContent = advert.offer.title;
  offerAdress.textContent = advert.offer.address;
  offerPrice.textContent = advert.offer.price + ' ₽/ночь';
  offerType.textContent = OFFER_TYPES[advert.offer.type];
  offerRooms.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  offerCheck.textContent = 'Заезд после ' + advert.offer.checkin + ' Выезд до ' + advert.offer.checkout;
  offerDescription.textContent = advert.offer.description;
  offerAvatar.src = advert.author.avatar;

  offerFeatures.innerHTML = '';
  for (var i = 0; i < advert.offer.features.length; i++) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + advert.offer.features[i];
    offerFeatures.appendChild(li);
  }

  offerPhotos.innerHTML = '';

  for (var j = 0; j < advert.offer.photos.length; j++) {
    var img = document.createElement('img');
    img.className = 'popup__photo';
    img.src = advert.offer.photos[j];
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    offerPhotos.appendChild(img);
  }

  closeButton.addEventListener('click', deleteCurrentCard);

  return card;
};

// Обработчик клика по пину
var mapPinMouseupHandler = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderPins(advertArray);

  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute('disabled');
  }
};

// Добавить обработчики к пинам
var addClickHandlersToPins = function () {
  var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var j = 0; j < allPins.length; j++) {
    allPins[j].addEventListener('click', function (evt) {
      var dataId = evt.currentTarget.getAttribute('data-id');
      map.insertBefore(createCardElement(advertArray[dataId]), map.querySelector('.map__filters-container'));
    });
  }
};

// Заполнить адрес
var fillAdress = function () {
  var left = mapPin.offsetLeft - FLAT_WIDTH / 2;
  var top = mapPin.offsetTop - FLAT_WIDTH / 2;

  address.value = left + ', ' + top;
  address.readOnly = true;
};

// Удаляем прошлую карточку
var deleteCurrentCard = function () {
  var card = document.querySelector('.map__card');

  if (card) {
    card.remove();
  }
};

// Инициализируем приложение
var init = function () {
  fillAdress();

  mapPin.addEventListener('mouseup', mapPinMouseupHandler);

  for (var i = 0; i < ADS_COUNT; i++) {
    advertArray.push(generateAdvert(i + 1));
  }
};

init();

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

// цикл Drag-and-drop для маркера
(function () {
  var getX = function () {
    var x = mapPin.offsetLeft;
    if (x < MIN_X) {
      x = MIN_X;
    }
    if (x > MAX_X - PIN_MAIN_RADIUS * 2) {
      x = MAX_X - PIN_MAIN_RADIUS * 2;
    }
    return x;
  };

  var getY = function () {
    var y = mapPin.offsetTop;
    if (y < MIN_Y) {
      y = MIN_Y;
    }
    if (y > MAX_Y) {
      y = MAX_Y;
    }
    return y;
  };

  var getPinMain = function (width, height) {
    var pinMainLocationX = getX() + width;
    var pinMainLocationY = getY() + height;
    address.value = pinMainLocationX + ', ' + pinMainLocationY;
  };


  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
      mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';

      getPinMain(PIN_MAIN_RADIUS, PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          mapPin.removeEventListener('click', onClickPreventDefault);
        };
        mapPin.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

