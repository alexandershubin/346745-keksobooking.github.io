'use strict';
(function () {

  // Создаём метки

  var createPin = function (pin, index) {
    var element = window.data.cloneNode(true);
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
    window.data.appendChild(fragment);

    addClickHandlersToPins();
  };

  // Обработчик клика по пину
  var mapPinMouseupHandler = function () {
    window.data.classList.remove('map--faded');
    window.data.classList.remove('ad-form--disabled');
    renderPins(window.data);

    for (var i = 0; i < window.data.length; i++) {
      window.data[i].removeAttribute('disabled');
    }
  };

  // Добавить обработчики к пинам
  var addClickHandlersToPins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < allPins.length; j++) {
      allPins[j].addEventListener('click', function (evt) {
        var dataId = evt.currentTarget.getAttribute('data-id');
        window.data.insertBefore(window.advert.createCardElement(window.data[dataId]), window.data.querySelector('.map__filters-container'));
      });
    }
  };

  // Заполнить адрес
  var fillAdress = function () {
    var left = window.data.offsetLeft - window.data.FLAT_WIDTH / 2;
    var top = window.data.offsetTop - window.data.FLAT_WIDTH / 2;

    window.data.address.value = left + ', ' + top;
    window.data.address.readOnly = true;
  };

  // Заполнить адрес
  fillAdress = function () {
    var left = window.data.offsetLeft - window.data.FLAT_WIDTH / 2;
    var top = window.data.offsetTop - window.data.FLAT_WIDTH / 2;

    window.data.value = left + ', ' + top;
    window.data.readOnly = true;
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

    window.data.addEventListener('mouseup', mapPinMouseupHandler);

    for (var i = 0; i < window.data.ADS_COUNT; i++) {
      window.data.push(window.cards.generateAdvert(i + 1));
    }
  };

  init();

  window.pins = {
    deleteCurrentCard: deleteCurrentCard,
  };

})();
