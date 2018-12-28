'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500;

  var mapFiltersForm = document.querySelector('.map__filters');

  var priceMap = {
    'low': {
      start: 0,
      end: 10000
    },

    'middle': {
      start: 10000,
      end: 50000
    },

    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filtersElements = Array.from(mapFiltersForm.children);

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },

    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },

    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },

    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return checkListElements.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var filterData = function (data) {
    return data.filter(function (item) {
      return filtersElements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var onMapFiltersChange = debounce(function () {
    window.pins.removePins();
    window.pins.deleteCurrentCard();
    var data = filterData(window.data.advertArray);
    var pins = window.pins.cutPins(data);
    window.pins.render(pins);
  });

  mapFiltersForm.addEventListener('change', onMapFiltersChange);

  window.filter = {
    onMapFiltersChange: onMapFiltersChange
  };
})();
