'use strict';
(function () {
  var mainElement = document.querySelector('main');
  var fieldsetElements = document.querySelectorAll('fieldset');

  var disableElements = function (elements, boolean) {
    Array.from(elements).forEach(function (element) {
      element.disabled = boolean;
    });
  };

  var getErrorMessage = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');

    errorMessage.textContent = message;

    mainElement.appendChild(errorElement);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_BUTTON) {
        closeErrorMessage();
      }
    });
    errorElement.addEventListener('click', closeErrorMessage);
    errorButton.addEventListener('click', closeErrorMessage);
  };

  var closeErrorMessage = function () {
    var modalError = document.querySelector('.error');
    if (modalError) {
      mainElement.removeChild(modalError);
      document.removeEventListener('keydown', closeErrorMessage);
      modalError.removeEventListener('click', closeErrorMessage);
      disableElements(fieldsetElements, true);
    }
  };

  var getSuccessMessage = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    mainElement.appendChild(successElement);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_BUTTON) {
        closeSuccessMessage();
      }
    });
    successElement.addEventListener('click', closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    var modalSucces = document.querySelector('.success');
    if (modalSucces) {
      mainElement.removeChild(modalSucces);
      document.removeEventListener('keydown', getSuccessMessage);
      document.removeEventListener('click', getSuccessMessage);
      disableElements(fieldsetElements, true);
    }
  };

  window.message = {
    showError: getErrorMessage,
    showSuccess: getSuccessMessage
  };

})();
