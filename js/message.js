'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var ESC = 27;

  var elementErrorMessage = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');

    errorMessage.textContent = message;

    mainElement.appendChild(errorElement);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        closeErrorMessage();
      }
    });
    errorElement.addEventListener('click', closeErrorMessage);
    errorButton.addEventListener('click', closeErrorMessage);
  };

  var closeErrorMessage = function () {
    var modalError = document.querySelector('.error');
    mainElement.removeChild(modalError);
    document.removeEventListener('keydown', closeErrorMessage);
    modalError.removeEventListener('click', closeErrorMessage);
  };

  var elementSuccessMessage = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    mainElement.appendChild(successElement);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        closeSuccessMessage();
      }
    });
    successElement.addEventListener('click', closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    var modalSucces = document.querySelector('.success');
    mainElement.removeChild(modalSucces);
    document.removeEventListener('keydown', closeSuccessMessage);
    modalSucces.removeEventListener('click', closeSuccessMessage);
  };

  window.message = {
    elementErrorMessage: elementErrorMessage,
    elementSuccessMessage: elementSuccessMessage
  };

})();
