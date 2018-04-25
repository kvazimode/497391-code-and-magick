'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_CODE = 27;
var ENTER_CODE = 13;
var DROP_ZONE_BORDER_STYLE = 'outline: 2px dashed red';
var HOVERED_CELL_STYLE = 'background-color: yellow';

var getRandomInt = function (min, max) {
  var random = min - 0.5 + Math.random() * (max - min + 1);
  random = Math.round(random);
  return random;
};

var getRandomParam = function (params) {
  var param = params[getRandomInt(0, params.length - 1)];
  return param;
};

// поведение окна настроек
var setupCloud = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setupCloud.querySelector('.setup-close');
var userNameField = setupCloud.querySelector('.setup-user-name');
var wizardSetup = setupCloud.querySelector('.setup-wizard');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardEyesColor = setupCloud.querySelector('input[name=eyes-color]');
var wizardFireball = setupCloud.querySelector('.setup-fireball');
var wizardFireballColor = setupCloud.querySelector('input[name=fireball-color]');
var artifactShop = setupCloud.querySelector('.setup-artifacts-shop');
var artifactBag = setupCloud.querySelector('.setup-artifacts');
var dragged = null;

// Перемещение артефактов
var clearDropZoneBorder = function () {
  artifactBag.removeAttribute('style', 'style');
};

artifactShop.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName === 'IMG') {
    dragged = evt.target.cloneNode(false);
    artifactBag.style = DROP_ZONE_BORDER_STYLE;
  }
});

artifactBag.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName === 'IMG') {
    dragged = evt.target;
    artifactBag.style = DROP_ZONE_BORDER_STYLE;
  }
});

artifactShop.addEventListener('dragend', clearDropZoneBorder);
artifactBag.addEventListener('dragend', clearDropZoneBorder);

artifactBag.addEventListener('drop', function (evt) {
  evt.target.removeAttribute('style', 'style');
  if (evt.target.tagName === 'DIV' && !evt.target.hasChildNodes()) {
    evt.target.appendChild(dragged);
  }
  evt.preventDefault();
});

artifactBag.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactBag.addEventListener('dragenter', function (evt) {
  if (evt.target.tagName === 'DIV' && !evt.target.hasChildNodes()) {
    evt.target.style = HOVERED_CELL_STYLE;
  }
  evt.preventDefault();
});

artifactBag.addEventListener('dragleave', function (evt) {
  evt.target.removeAttribute('style', 'style');
  evt.preventDefault();
});

// Открытие и закрытие окна
var setupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_CODE && !(document.activeElement === userNameField)) {
    closeSetupCloud();
  }
};

var openSetupCloud = function () {
  setupCloud.classList.remove('hidden');
  document.addEventListener('keydown', setupEscPressHandler);
  wizardEyes.addEventListener('click', setEyesColor);
  wizardFireball.addEventListener('click', setFireballColor);
};

var closeSetupCloud = function () {
  setupCloud.classList.add('hidden');
  document.removeEventListener('keydown', setupEscPressHandler);
  wizardEyes.removeEventListener('click', setEyesColor);
  wizardFireball.removeEventListener('click', setFireballColor);
  setupCloud.removeAttribute('style', 'style');
};

setupOpenButton.addEventListener('click', function () {
  openSetupCloud();
});

setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    openSetupCloud();
  }
});

setupCloseButton.addEventListener('click', function () {
  closeSetupCloud();
});

setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closeSetupCloud();
  }
});

var setEyesColor = function () {
  var color = getRandomParam(EYE_COLORS);
  wizardEyesColor.value = color;
  wizardEyes.style.fill = color;
};

var setFireballColor = function () {
  var color = getRandomParam(FIREBALL_COLORS);
  wizardFireballColor.value = color;
  wizardFireball.style.backgroundColor = color;
};

// отображение похожих волшебников в окне настроек
document.querySelector('.setup-similar').classList.remove('hidden');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarWizardElement = document.querySelector('.setup-similar-list');

var generateWizards = function (amount) {
  var wizards = [];
  for (var i = 0; i < amount; i++) {
    var wizard = {};
    wizard.name = getRandomParam(NAMES) + ' ' + getRandomParam(SURNAMES);
    wizard.coatColor = getRandomParam(COAT_COLORS);
    wizard.eyesColor = getRandomParam(EYE_COLORS);
    wizards.push(wizard);
  }
  return wizards;
};

var setWizardName = function (element, wizard) {
  element.querySelector('.setup-similar-label').textContent = wizard.name;
};
var setWizardCoat = function (element, wizard) {
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
};
var setWizardEyes = function (element, wizard) {
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
};

var makeWizardElement = function (wizard) {
  var element = similarWizardTemplate.cloneNode(true);
  setWizardName(element, wizard);
  setWizardCoat(element, wizard);
  setWizardEyes(element, wizard);
  return element;
};

var appendElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    similarWizardElement.appendChild(makeWizardElement(elements[i]));
  }
};

var wizards = generateWizards(4);
appendElements(wizards);
