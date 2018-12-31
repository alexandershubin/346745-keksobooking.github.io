'use strict';
(function () {

  // Создаём метки
  var createPin = function (pin) {
    var element = window.data.templatePin.cloneNode(true);
    var pinImage = element.querySelector('img');

    element.style.left = pin.location.x - window.data.FLAT_WIDTH / 2 + 'px';
    element.style.top = pin.location.y - window.data.FLAT_HEIGHT + 'px';
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;

    var realIndex = window.data.advertArray.indexOf(pin);

    element.setAttribute('data-id', realIndex);

    return element;
  };

  // Отрисовываем сгенерированые DOM-элементы в блок .map__pins
  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    var cuttedArray = pins.slice(0, window.data.MAX_PINS);
    for (var i = 0; i < cuttedArray.length; i++) {
      var newPin = createPin(pins[i], i);
      fragment.appendChild(newPin);
    }
    window.data.pinsContainer.appendChild(fragment);

    addClickHandlersToPins();
  };


  // Обработчик клика по пину
  var startActivMainPin = function () {
    window.data.map.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < window.data.fieldset.length; i++) {
      window.data.fieldset[i].removeAttribute('disabled');
    }
  };

  // Добавить обработчики к пинам
  var addClickHandlersToPins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < allPins.length; j++) {
      allPins[j].addEventListener('click', function (evt) {
        var dataId = evt.currentTarget.getAttribute('data-id');
        window.data.map.insertBefore(window.card.createCardElement(window.data.advertArray[dataId]), window.data.map.querySelector('.map__filters-container'));
      });
    }
  };

  // Удаляет пины с карты
  var removePins = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      if (!mapPins[i].classList.contains('map__pin--main')) {
        window.data.pinsContainer.removeChild(mapPins[i]);
      }
    }
  };

  // Заполнить адрес
  var fillAdress = function () {
    var left = window.data.mapPin.offsetLeft - window.data.FLAT_WIDTH / 2;
    var top = window.data.mapPin.offsetTop - window.data.FLAT_WIDTH / 2;

    window.data.address.value = left + ', ' + top;
    window.data.address.readOnly = true;
  };


  // Удаляем прошлую карточку
  var deleteCurrentCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }
  };

  fillAdress();

  window.pins = {
    deleteCurrentCard: deleteCurrentCard,
    startActivMainPin: startActivMainPin,
    addClickHandlersToPins: addClickHandlersToPins,
    render: renderPins,
    removePins: removePins,
    fillAdress: fillAdress
  };

})();
