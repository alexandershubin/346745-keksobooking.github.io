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
    var renderFeaturesList = function (featuresList) {
      var fragment = document.createDocumentFragment();
      featuresList.forEach(function (item) {
        var li = document.createElement('li');
        li.classList.add('popup__feature');
        li.classList.add('popup__feature--' + item);
        fragment.appendChild(li);
      });
      return fragment;
    };
    offerFeaturesElement.appendChild(renderFeaturesList(advert.offer.features));


    offerPhotosElement.innerHTML = '';

    for (var j = 0; j < advert.offer.photos.length; j++) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = advert.offer.photos[j];
      img.width = window.data.IMG_WIDTH;
      img.height = window.data.IMG_HEIGHT;
      img.alt = 'Фотография жилья';
      offerPhotosElement.appendChild(img);
    }

    var onPinCloseButtonClick = function () {
      window.pins.deleteCard();
    };

    var onPinCloseButtonKeydown = function (evt) {
      if (evt.keyCode === window.data.ESC_BUTTON) {
        window.pins.deleteCard();
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
