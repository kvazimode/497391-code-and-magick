'use strict';

window.util = (function () {
  var ESC_CODE = 27;
  var ENTER_CODE = 13;
  var setup = document.querySelector('.setup');
  var userNameField = setup.querySelector('.setup-user-name');

  return {
    EYE_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    setupDialog: setup,
    isEscPressEvent: function (evt, callback) {
      if (evt.keyCode === ESC_CODE && !(document.activeElement === userNameField)) {
        callback();
      }
    },
    isEnterPressEvent: function (evt, callback) {
      if (evt.keyCode === ENTER_CODE) {
        callback();
      }
    },
    getRandomInt: function (min, max) {
      var random = min - 0.5 + Math.random() * (max - min + 1);
      random = Math.round(random);
      return random;
    },
    getRandomParam: function (params) {
      var param = params[this.getRandomInt(0, params.length - 1)];
      return param;
    }
  };
})();
