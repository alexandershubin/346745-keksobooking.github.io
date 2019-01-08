'use strict';
(function () {

  var mapFiltersForm = document.querySelector('.map__filters');

  var PriceMap = {
    'low': {
      START: 0,
      END: 10000
    },

    'middle': {
      START: 10000,
      END: 50000
    },

    'high': {
      START: 50000,
      END: Infinity
    }
  };

  var filtersElements = Array.from(mapFiltersForm.children);

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= PriceMap[filter.value].START && data.offer.price < PriceMap[filter.value].END;
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

  var filterData = function (dates) {
    return dates.filter(function (item) {
      return filtersElements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var onMapFiltersChange = window.utils.debounce(function () {
    window.pins.remove();
    window.pins.deleteCard();
    var data = filterData(window.data.advertArray);
    window.pins.render(data);
  });

  mapFiltersForm.addEventListener('change', onMapFiltersChange);
  mapFiltersForm.removeEventListener('change', mapFiltersForm);

})();
