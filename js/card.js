'use strict';
(function () {

  var createCardElement = function (advert) {
    window.pins.deleteCard();

    var card = window.data.templateCard.cloneNode(true);

    var offerTitleElement = card.querySelector('.popup__title');
    var offerAdressElement = card.querySelector('.popup__text--address');
    var offerPriceElement = card.querySelector('.popup__text--price');
    var offerTypeElement = card.querySelector('.popup__type');
    var offerRoomsElement = card.querySelector('.popup__text--capacity');
    var offerCheckElement = card.querySelector('.popup__text--time');
    var offerFeaturesElement = card.querySelector('.popup__features');
    var offerDescriptionElement = card.querySelector('.popup__description');
    var offerPhotosElement = card.querySelector('.popup__photos');
    var offerAvatarElement = card.querySelector('.popup__avatar');
    var closeButtonElement = card.querySelector('.popup__close');

    offerTitleElement.textContent = advert.offer.title;
    offerAdressElement.textContent = advert.offer.address;
    offerPriceElement.textContent = advert.offer.price + ' ₽/ночь';
    offerTypeElement.textContent = window.data.OfferTypes[advert.offer.type];
    offerRoomsElement.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    offerCheckElement.textContent = 'Заезд после ' + advert.offer.checkin + ' Выезд до ' + advert.offer.checkout;
    offerDescriptionElement.textContent = advert.offer.description;
    offerAvatarElement.src = advert.author.avatar;

    offerFeaturesElement.innerHTML = '';
    var li = document.createElement('li');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advert.offer.features.length; i++) {
      li.className = 'popup__feature popup__feature--' + advert.offer.features[i];
      fragment.appendChild(li);
    }

    offerPhotosElement.innerHTML = '';

    for (var j = 0; j < advert.offer.photos.length; j++) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.src = advert.offer.photos[j];
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      offerPhotosElement.appendChild(img);
    }

    var onPinCloseButtonClick = function () {
      window.pins.deleteCard();
      window.pins.resetClickedPin();
    };

    var onPinCloseButtonKeydown = function (evt) {
      if (evt.keyCode === window.data.ESC_BUTTON) {
        window.pins.deleteCard();
        window.pins.resetClickedPin();
      }
    };

    closeButtonElement.addEventListener('click', onPinCloseButtonClick);
    document.addEventListener('keydown', onPinCloseButtonKeydown);


    return card;
  };

  window.card = {
    createElement: createCardElement,
  };

})();
