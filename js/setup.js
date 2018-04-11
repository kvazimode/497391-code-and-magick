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
var COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];

// показываем поле настроек
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarWizardElement = document.querySelector('.setup-similar-list');

var getRandomInt = function (min, max) {
  var random = min - 0.5 + Math.random() * (max - min + 1);
  random = Math.round(random);
  return random;
};

var getRandomParam = function (params) {
  var param = params[getRandomInt(0, params.length - 1)];
  return param;
};

var generateWizards = function (amount) {
  var wizards = [];
  for (var i = 0; i < amount; i++) {
    var wizard = {};
    wizard.name = getRandomParam(NAMES) + ' ' + getRandomParam(SURNAMES);
    wizard.coatColor = getRandomParam(COLORS);
    wizard.eyesColor = getRandomParam(EYES);
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
