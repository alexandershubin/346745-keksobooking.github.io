'use strict';

// цикл Drag-and-drop для маркера

(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var MAIN_PIN_START_LEFT = '570px';
  var MAIN_PIN_START_TOP = '375px';

  var setToStart = function () {
    mapPin.style.left = MAIN_PIN_START_LEFT;
    mapPin.style.top = MAIN_PIN_START_TOP;
  };

  var getX = function () {
    var x = mapPin.offsetLeft;
    if (x < window.data.MIN_X) {
      x = window.data.MIN_X;
    }
    if (x > window.data.MAX_X - window.data.PIN_MAIN_RADIUS * 2) {
      x = window.data.MAX_X - window.data.PIN_MAIN_RADIUS * 2;
    }
    return x;
  };

  var getY = function () {
    var y = mapPin.offsetTop;
    if (y < window.data.MIN_Y) {
      y = window.data.MIN_Y;
    }
    if (y > window.data.MAX_Y) {
      y = window.data.MAX_Y;
    }
    return y;
  };

  var getPinMain = function (width, height) {
    var pinMainX = getX() + width;
    var pinMainY = getY() + height;
    address.value = pinMainX + ', ' + pinMainY;
  };

  var onSuccess = function (data) {
    window.data.advertArray = data;
    window.pins.render(data);
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

      mapPin.style.left = (getX() - shift.x) + 'px';
      mapPin.style.top = (getY() - shift.y) + 'px';

      getPinMain(window.data.PIN_MAIN_RADIUS, window.data.PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      if (window.form.deactivateMap) {
        window.backend.download(onSuccess, window.message.elementErrorMessage);
        window.pins.startActivMainPin();
      }

      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          mapPin.removeEventListener('click', onClickPreventDefault);
        };
        mapPin.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.drag = {
    onSuccess: onSuccess,
    getPinMain: getPinMain,
    setToStart: setToStart
  };

})();
