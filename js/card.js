'use strict';
(function () {

  var generateAdvert = function (i) {
    var location = {
      x: window.utils.getRandomNumber(window.data.MIN_X, window.data.MAX_X),
      y: window.utils.getRandomNumber(window.data.MIN_Y, window.data.MAX_Y)
    };

    return {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: window.utils.getRandomItem(window.data.FLAT_TITLES),
        address: location.x + ', ' + location.y,
        price: window.utils.getRandomNumber(window.data.FLAT_PRICE.min, window.data.FLAT_PRICE.max),
        type: window.utils.getRandomItem(window.data.FLAT_TYPE),
        rooms: window.utils.getRandomNumber(window.data.FLAT_ROOMS.min, window.data.FLAT_ROOMS.max),
        guests: window.utils.getRandomNumber(window.data.FLAT_GUESTS.min, window.data.FLAT_GUESTS.max),
        checkin: window.utils.getRandomItem(window.data.FLAT_CHEK),
        checkout: window.utils.getRandomItem(window.data.FLAT_CHEK),
        features: window.utils.getRandomArrayLength(window.data.FLAT_FEATURES),
        description: window.data.FLAT_DISCRIPTION,
        photos: window.utils.getRandomArrayLength(window.data.FLAT_PHOTOS)
      },

      location: {
        x: location.x,
        y: location.y
      }
    };
  };

})();
