'use strict';
(function () {

  var clickPin;

  var createPin = function (pin) {
    var element = window.data.templatePin.cloneNode(true);
    var pinImageElement = element.querySelector('img');

    element.style.left = pin.location.x - window.data.FLAT_WIDTH / 2 + 'px';
    element.style.top = pin.location.y - window.data.FLAT_HEIGHT + 'px';
    pinImageElement.src = pin.author.avatar;
    pinImageElement.alt = pin.offer.title;

    var realIndex = window.data.advertArray.indexOf(pin);

    element.setAttribute('data-id', realIndex);

    element.addEventListener('click', function () {
      if (element) {
        clickPin = element;
        clickPin.classList.add('map__pin--active');
      }
    });

    return element;
  };

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

  var startActivMainPin = function () {
    window.data.map.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');
    window.filter.activateListener();
    window.form.activateRoomNumber();
    window.form.activateTimeOut();
    window.form.activatTimeIn();
    window.form.activateFormAd();
    window.form.activateResetButton();
    window.form.setValidation();

    for (var i = 0; i < window.data.disabledElements.length; i++) {
      window.data.disabledElements[i].removeAttribute('disabled');
    }
  };

  var addClickHandlersToPins = function () {
    var allPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < allPinsElements.length; j++) {
      allPinsElements[j].addEventListener('click', function (evt) {
        var dataId = evt.currentTarget.getAttribute('data-id');
        window.data.map.insertBefore(window.card.createElement(window.data.advertArray[dataId]), window.data.map.querySelector('.map__filters-container'));
        clickPin.classList.add('map__pin--active');
      });
    }
  };

  var removeAllPins = function () {
    var mapPinsElements = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPinsElements.length; i++) {
      if (!mapPinsElements[i].classList.contains('map__pin--main')) {
        window.data.pinsContainer.removeChild(mapPinsElements[i]);
      }
    }
  };

  var fillFullAdress = function () {
    var left = window.data.mapPin.offsetLeft - window.data.FLAT_WIDTH / 2;
    var top = window.data.mapPin.offsetTop - window.data.FLAT_WIDTH / 2;

    window.data.address.value = left + ', ' + top;
    window.data.address.readOnly = true;
  };

  var deleteCurrentCard = function () {
    var cardElement = document.querySelector('.map__card');
    if (cardElement) {
      cardElement.remove();
      resetClickedPin();
    }
    document.removeEventListener('keydown', deleteCurrentCard);
  };

  var resetClickedPin = function () {
    var activePin = document.querySelectorAll('.map__pin--active');
    activePin.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  fillFullAdress();

  window.pins = {
    deleteCard: deleteCurrentCard,
    startMain: startActivMainPin,
    render: renderPins,
    remove: removeAllPins,
    fillAdress: fillFullAdress,
    resetClickedPin: resetClickedPin
  };

})();
