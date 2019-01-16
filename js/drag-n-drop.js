'use strict';
(function () {

  var mapWidth = document.querySelector('.map').offsetWidth;

  var CoordsY = {
    MIN: 130,
    MAX: 630
  };

  var getOnSuccess = function (data) {
    window.data.advertArray = data;
    window.pins.render(data);
  };

  window.data.mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = window.data.mapPin.offsetTop - shift.y;
      var left = window.data.mapPin.offsetLeft - shift.x;

      if (left < 0) {
        left = 0;
      } else if (left > mapWidth - window.data.mapPin.offsetWidth) {
        left = mapWidth - window.data.mapPin.offsetWidth;
      }

      top = Math.min(top, CoordsY.MAX - window.data.mapPin.offsetHeight);
      top = Math.max(top, CoordsY.MIN - window.data.mapPin.offsetHeight);

      window.data.mapPin.style.left = left + 'px';
      window.data.mapPin.style.top = top + 'px';

      window.data.address.value = Math.floor(window.data.mapPin.offsetLeft + window.data.mapPin.offsetWidth / 2) + ', ' + Math.floor(window.data.mapPin.offsetTop + window.data.mapPin.offsetHeight);

    };

    var onPinMainMouseUp = function (upEvt) {
      if (window.form.deactivate) {
        window.backend.download(getOnSuccess, window.message.showError);
        window.pins.startMain();
        window.pins.fillAdress();
      }

      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMainMouseMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
    };
    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  });

})();
