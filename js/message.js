'use strict';
(function () {

  var mainElement = document.querySelector('main');
  var fieldsetElements = document.querySelectorAll('fieldset');

  var disableElements = function (elements, boolean) {
    Array.from(elements).forEach(function (element) {
      element.disabled = boolean;
    });
  };

  var onMapOpenMessageClick = function () {
    var successElement = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successElement.cloneNode(true);
    mainElement.appendChild(successMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_BUTTON) {
        onMapCloseMessageClick();
      }
    });
    successMessage.addEventListener('click', onMapCloseMessageClick);
  };

  var onMapCloseMessageClick = function () {
    var modalSuccesElement = document.querySelector('.success');
    if (modalSuccesElement) {
      mainElement.removeChild(modalSuccesElement);
      document.removeEventListener('keydown', onMapOpenMessageClick);
      document.removeEventListener('click', onMapOpenMessageClick);
      disableElements(fieldsetElements, true);
    }
  };

  var showErrorMessage = function (message) {
    var errorElement = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorElement.cloneNode(true);

    errorMessage.querySelector('.error__message').textContent = message;

    mainElement.appendChild(errorMessage);
    errorMessage.addEventListener('click', function () {
      onMapErrorMessageClick();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_BUTTON) {
        onMapErrorMessageClick();
      }
    });
  };

  var onMapErrorMessageClick = function () {
    var modalErrorElement = document.querySelector('.error');
    if (modalErrorElement) {
      mainElement.removeChild(modalErrorElement);
      document.removeEventListener('keydown', onMapErrorMessageClick);
      modalErrorElement.removeEventListener('click', onMapErrorMessageClick);
      disableElements(fieldsetElements, true);
    }
  };

  window.message = {
    showError: showErrorMessage,
    showSuccess: onMapOpenMessageClick
  };

})();

