'use strict';
(function () {

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

    for (var i = 0; i < window.data.disabledElements.length; i++) {
      window.data.disabledElements[i].removeAttribute('disabled');
    }
  };

  var addClickHandlersToPins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < allPins.length; j++) {
      allPins[j].addEventListener('click', function (evt) {
        var dataId = evt.currentTarget.getAttribute('data-id');
        window.data.map.insertBefore(window.card.createElement(window.data.advertArray[dataId]), window.data.map.querySelector('.map__filters-container'));
      });
    }
  };

  var removeAllPins = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      if (!mapPins[i].classList.contains('map__pin--main')) {
        window.data.pinsContainer.removeChild(mapPins[i]);
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
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    document.removeEventListener('keydown', deleteCurrentCard);
  };

  fillFullAdress();

  window.pins = {
    deleteCard: deleteCurrentCard,
    startMain: startActivMainPin,
    render: renderPins,
    remove: removeAllPins,
    fillAdress: fillFullAdress
  };

})();
