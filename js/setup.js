'use strict';

(function () {
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var DROP_ZONE_BORDER_STYLE = 'outline: 2px dashed red';
  var HOVERED_CELL_STYLE = 'background-color: yellow';

  // поведение окна настроек
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = window.util.setupDialog.querySelector('.setup-close');
  var wizardSetup = window.util.setupDialog.querySelector('.setup-wizard');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardEyesColor = window.util.setupDialog.querySelector('input[name=eyes-color]');
  var wizardFireball = window.util.setupDialog.querySelector('.setup-fireball');
  var wizardFireballColor = window.util.setupDialog.querySelector('input[name=fireball-color]');
  var artifactShop = window.util.setupDialog.querySelector('.setup-artifacts-shop');
  var artifactBag = window.util.setupDialog.querySelector('.setup-artifacts');
  var dragged = null;

  // Перемещение артефактов
  var preventDragOver = function (evt) {
    evt.preventDefault();
    return false;
  };

  var clearDropZoneStyle = function () {
    artifactBag.removeAttribute('style');
  };

  var shopItemDragStartHandler = function (evt) {
    if (evt.target.tagName === 'IMG') {
      dragged = evt.target.cloneNode(false);
      artifactBag.style = DROP_ZONE_BORDER_STYLE;
    }
  };

  var bagItemDragStartHandler = function (evt) {
    if (evt.target.tagName === 'IMG') {
      dragged = evt.target;
      artifactBag.style = DROP_ZONE_BORDER_STYLE;
    }
  };

  var bagDropHandler = function (evt) {
    evt.target.removeAttribute('style');
    if (evt.target.tagName === 'DIV' && !evt.target.hasChildNodes()) {
      evt.target.appendChild(dragged);
    }
    evt.preventDefault();
  };

  var bagDragEnterHandler = function (evt) {
    if (evt.target.tagName === 'DIV' && !evt.target.hasChildNodes()) {
      evt.target.style = HOVERED_CELL_STYLE;
    }
    evt.preventDefault();
  };

  var bagDragLeaveHandler = function (evt) {
    evt.target.removeAttribute('style');
    evt.preventDefault();
  };

  // Открытие и закрытие окна
  var setupEscPressHandler = function (evt) {
    window.util.isEscPressEvent(evt, closeSetupCloud);
  };

  var openSetupCloud = function () {
    window.util.setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', setupEscPressHandler);
    wizardEyes.addEventListener('click', setEyesColor);
    wizardFireball.addEventListener('click', setFireballColor);
    artifactShop.addEventListener('dragstart', shopItemDragStartHandler);
    artifactBag.addEventListener('dragstart', bagItemDragStartHandler);
    document.addEventListener('dragend', clearDropZoneStyle);
    artifactBag.addEventListener('drop', bagDropHandler);
    artifactBag.addEventListener('dragover', preventDragOver);
    artifactBag.addEventListener('dragenter', bagDragEnterHandler);
    artifactBag.addEventListener('dragleave', bagDragLeaveHandler);
  };

  var closeSetupCloud = function () {
    window.util.setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', setupEscPressHandler);
    wizardEyes.removeEventListener('click', setEyesColor);
    wizardFireball.removeEventListener('click', setFireballColor);
    window.util.setupDialog.removeAttribute('style'); // возвращаем окно на место
    artifactShop.removeEventListener('dragstart', shopItemDragStartHandler);
    artifactBag.removeEventListener('dragstart', bagItemDragStartHandler);
    document.removeEventListener('dragend', clearDropZoneStyle);
    artifactBag.removeEventListener('drop', bagDropHandler);
    artifactBag.removeEventListener('dragover', preventDragOver);
    artifactBag.removeEventListener('dragenter', bagDragEnterHandler);
    artifactBag.removeEventListener('dragleave', bagDragLeaveHandler);
  };

  setupOpenButton.addEventListener('click', function () {
    openSetupCloud();
  });

  setupOpenButton.addEventListener('keydown', function (evt) {
    window.util.isEnterPressEvent(evt, openSetupCloud);
  });

  setupCloseButton.addEventListener('click', function () {
    closeSetupCloud();
  });

  setupCloseButton.addEventListener('keydown', function (evt) {
    window.util.isEnterPressEvent(evt, closeSetupCloud);
  });

  var setEyesColor = function () {
    var color = window.util.getRandomParam(window.util.EYE_COLORS);
    wizardEyesColor.value = color;
    wizardEyes.style.fill = color;
  };

  var setFireballColor = function () {
    var color = window.util.getRandomParam(FIREBALL_COLORS);
    wizardFireballColor.value = color;
    wizardFireball.style.backgroundColor = color;
  };
})();
