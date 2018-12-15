'use strict';
(function () {

  // Создаём метки

  var createPin = function (pin, index) {
    var element = window.data.templatePin.cloneNode(true);
    var pinImage = element.querySelector('img');

    element.style.left = pin.location.x - window.data.FLAT_WIDTH / 2 + 'px';
    element.style.top = pin.location.y - window.data.FLAT_HEIGHT + 'px';
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
    window.data.pinsContainer.appendChild(fragment);

    addClickHandlersToPins();
  };

  // Обработчик клика по пину
  var startActivMainPin = function () {
    window.data.map.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');
    renderPins(window.data.advertArray);

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

  for (var i = 0; i < window.data.ADS_COUNTS; i++) {
    window.data.advertArray.push(window.advert.generate(i + 1));
  }

  fillAdress();

  window.pins = {
    deleteCurrentCard: deleteCurrentCard,
    startActivMainPin: startActivMainPin
  };

})();
