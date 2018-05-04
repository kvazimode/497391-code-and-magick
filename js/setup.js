'use strict';

// Открытие и закрытие окна
(function () {
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = window.util.setupDialog.querySelector('.setup-close');
  var wizardSetup = window.util.setupDialog.querySelector('.setup-wizard');
  window.wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  window.wizardFireball = window.util.setupDialog.querySelector('.setup-fireball');
  var artifactShop = window.util.setupDialog.querySelector('.setup-artifacts-shop');
  window.artifactBag = window.util.setupDialog.querySelector('.setup-artifacts');

  var setupEscPressHandler = function (evt) {
    window.util.isEscPressEvent(evt, closeSetupCloud);
  };

  var openSetupCloud = function () {
    window.util.setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', setupEscPressHandler);
    window.wizardEyes.addEventListener('click', window.customize.setEyesColor);
    window.wizardFireball.addEventListener('click', window.customize.setFireballColor);
    artifactShop.addEventListener('dragstart', window.customize.shopItemDragStartHandler);
    window.artifactBag.addEventListener('dragstart', window.customize.bagItemDragStartHandler);
    document.addEventListener('dragend', window.customize.clearDropZoneStyle);
    window.artifactBag.addEventListener('drop', window.customize.bagDropHandler);
    window.artifactBag.addEventListener('dragover', window.customize.preventDragOver);
    window.artifactBag.addEventListener('dragenter', window.customize.bagDragEnterHandler);
    window.artifactBag.addEventListener('dragleave', window.customize.bagDragLeaveHandler);
  };

  var closeSetupCloud = function () {
    window.util.setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', setupEscPressHandler);
    window.wizardEyes.removeEventListener('click', window.customize.setEyesColor);
    window.wizardFireball.removeEventListener('click', window.customize.setFireballColor);
    window.util.setupDialog.removeAttribute('style'); // возвращаем окно на место
    artifactShop.removeEventListener('dragstart', window.customize.shopItemDragStartHandler);
    window.artifactBag.removeEventListener('dragstart', window.customize.bagItemDragStartHandler);
    document.removeEventListener('dragend', window.customize.clearDropZoneStyle);
    window.artifactBag.removeEventListener('drop', window.customize.bagDropHandler);
    window.artifactBag.removeEventListener('dragover', window.customize.preventDragOver);
    window.artifactBag.removeEventListener('dragenter', window.customize.bagDragEnterHandler);
    window.artifactBag.removeEventListener('dragleave', window.customize.bagDragLeaveHandler);
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
})();
