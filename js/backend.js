'use strict';
(function () {

  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking/';

  var STATUS_OK = 200;
  var TIME_OK = 10000;

  var ERRORS = {
    timeoutError: function (timeout) {
      return 'Запрос не успел выполниться за ' + timeout + ' мс';
    },

    failedConnectionErrorType: function (error) {
      return 'Произошла ошибка ' + error;
    },

    failedConnectionError: function () {
      return 'Ошибка соединения';
    }
  };

  var xhrRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError(ERRORS.failedConnectionErrorType(xhr.status));
      }
    });

    xhr.timeout = TIME_OK;

    xhr.addEventListener('error', function () {
      onError(ERRORS.failedConnectionError());
    });

    xhr.addEventListener('timeout', function () {
      onError(ERRORS.timeoutError(xhr.timeout));
    });

    return xhr;
  };

  var getDownload = function (onSuccess, onError) {
    var xhr = xhrRequest(onSuccess, onError);
    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };

  var getUpload = function (data, onError, onSuccess) {
    var xhr = xhrRequest(onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    download: getDownload,
    upload: getUpload
  };

})();
