'use strict';
(function () {

  // Создаем DOM элемент обьявления

  var createCardElement = function (advert) {
    window.pins.deleteCard();

    var card = window.data.templateCard.cloneNode(true);

    var offerTitle = card.querySelector('.popup__title');
    var offerAdress = card.querySelector('.popup__text--address');
    var offerPrice = card.querySelector('.popup__text--price');
    var offerType = card.querySelector('.popup__type');
    var offerRooms = card.querySelector('.popup__text--capacity');
    var offerCheck = card.querySelector('.popup__text--time');
    var offerFeatures = card.querySelector('.popup__features');
    var offerDescription = card.querySelector('.popup__description');
    var offerPhotos = card.querySelector('.popup__photos');
    var offerAvatar = card.querySelector('.popup__avatar');
    var closeButton = card.querySelector('.popup__close');

    offerTitle.textContent = advert.offer.title;
    offerAdress.textContent = advert.offer.address;
    offerPrice.textContent = advert.offer.price + ' ₽/ночь';
    offerType.textContent = window.data.OFFER_TYPES[advert.offer.type];
    offerRooms.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    offerCheck.textContent = 'Заезд после ' + advert.offer.checkin + ' Выезд до ' + advert.offer.checkout;
    offerDescription.textContent = advert.offer.description;
    offerAvatar.src = advert.author.avatar;

    offerFeatures.innerHTML = '';
    for (var i = 0; i < advert.offer.features.length; i++) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + advert.offer.features[i];
      offerFeatures.appendChild(li);
    }

    offerPhotos.innerHTML = '';

    for (var j = 0; j < advert.offer.photos.length; j++) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.src = advert.offer.photos[j];
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      offerPhotos.appendChild(img);
    }

    closeButton.addEventListener('click', window.pins.deleteCard);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_BUTTON) {
        window.pins.deleteCard();
      }
    });

    return card;
  };

  window.card = {
    createElement: createCardElement,
  };

})();
