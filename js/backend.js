'use strict';
(function () {

  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking/';

  var STATUS_OK = 200;
  var TIME_OK = 10000;

  var xhrRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.timeout = TIME_OK;

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
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
