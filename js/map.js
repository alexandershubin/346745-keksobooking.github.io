'use strict';

  var map = document.querySelector('.map');
  var map__pins = document.querySelector('.map__pins');
  var map__filter = document.querySelector('.map__filter');
  var map__checkbox = document.querySelector('.map__checkbox');
  document.querySelector('.map__checkbox').remove('hidden');

  var notice = document.querySelector('.notice');
  var map = document.querySelector('.map');


  var AUTHOR_NAMES [ 'FirstAuthor', 'SecondtAuthor', 'ThirdAuthor', 'FourthAuthor', 'FifthAuthor', 'SixthtAuthor', 'SeventhtAuthor', 'EightAuthor'];

  var Authors = [
  {
  author: {
    names: 'FirstAuthor'
    avatar: 'img/avatars/user{{01}}.png'
  },
  offer: {
    title: 'Большая уютная квартира',
    adress: '{{location.600}}, {{location.600}}',
    price: '1000',
    type: 'palace',
    rooms: '1',
    guests: '5',
    checkin: '14:00',
    checkout: '12:00',
    features: 'wi-fi',
    description: '',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
  },
  location: {
    x: '130',
    y: '500'
  }

  author: {
    names:'SecondtAuthor'
    avatar: 'img/avatars/user{{01}}.png'
  },
  offer: {
    title: 'Большая уютная квартира',
    adress: '{{location.600}}, {{location.600}}',
    price: '1000',
    type: 'palace',
    rooms: '1',
    guests: '5',
    checkin: '14:00',
    checkout: '12:00',
    features: 'wi-fi',
    description: '',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
  },
  location: {
    x: '130',
    y: '500'
  }

  author: {
    names:'ThirdAuthor'
    avatar: 'img/avatars/user{{01}}.png'
  },
  offer: {
    title: 'Большая уютная квартира',
    adress: '{{location.600}}, {{location.600}}',
    price: '1000',
    type: 'palace',
    rooms: '1',
    guests: '5',
    checkin: '14:00',
    checkout: '12:00',
    features: 'wi-fi',
    description: '',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
  },
  location: {
    x: '130',
    y: '500'
  }

  author: {
    names:'FourthAuthor'
    avatar: 'img/avatars/user{{01}}.png'
  },
  offer: {
    title: 'Большая уютная квартира',
    adress: '{{location.600}}, {{location.600}}',
    price: '1000',
    type: 'palace',
    rooms: '1',
    guests: '5',
    checkin: '14:00',
    checkout: '12:00',
    features: 'wi-fi',
    description: '',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
  },
  location: {
    x: '130',
    y: '500'
  }

  author: {
    names:'FifthAuthor'
    avatar: 'img/avatars/user{{01}}.png'
  },
  offer: {
    title: 'Большая уютная квартира',
    adress: '{{location.600}}, {{location.600}}',
    price: '1000',
    type: 'palace',
    rooms: '1',
    guests: '5',
    checkin: '14:00',
    checkout: '12:00',
    features: 'wi-fi',
    description: '',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
  },
  location: {
    x: '130',
    y: '500'
  }

  author: {
    names:'SixthtAuthor'
    avatar: 'img/avatars/user{{01}}.png'
  },
  offer: {
    title: 'Большая уютная квартира',
    adress: '{{location.600}}, {{location.600}}',
    price: '1000',
    type: 'palace',
    rooms: '1',
    guests: '5',
    checkin: '14:00',
    checkout: '12:00',
    features: 'wi-fi',
    description: '',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
  },
  location: {
    x: '130',
    y: '500'
  }

  author: {
    names:'SeventhAuthor'
    avatar: 'img/avatars/user{{01}}.png'
  },
  offer: {
    title: 'Большая уютная квартира',
    adress: '{{location.600}}, {{location.600}}',
    price: '1000',
    type: 'palace',
    rooms: '1',
    guests: '5',
    checkin: '14:00',
    checkout: '12:00',
    features: 'wi-fi',
    description: '',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
  },
  location: {
    x: '130',
    y: '500'
  }

  author: {
    names:'EightAuthor'
    avatar: 'img/avatars/user{{01}}.png'
  },
  offer: {
    title: 'Большая уютная квартира',
    adress: '{{location.600}}, {{location.600}}',
    price: '1000',
    type: 'palace',
    rooms: '1',
    guests: '5',
    checkin: '14:00',
    checkout: '12:00',
    features: 'wi-fi',
    description: '',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
  },
  location: {
    x: '130',
    y: '500'
  }
};

]
