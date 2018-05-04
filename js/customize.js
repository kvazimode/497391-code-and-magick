'use strict';

window.customize = (function () {
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var DROP_ZONE_BORDER_STYLE = 'outline: 2px dashed red';
  var HOVERED_CELL_STYLE = 'background-color: yellow';
  var wizardEyesColor = window.util.setupDialog.querySelector('input[name=eyes-color]');
  var wizardFireballColor = window.util.setupDialog.querySelector('input[name=fireball-color]');
  var dragged = null;
  return {
    // Перемещение артефактов
    preventDragOver: function (evt) {
      evt.preventDefault();
      return false;
    },
    clearDropZoneStyle: function () {
      window.artifactBag.removeAttribute('style');
    },
    shopItemDragStartHandler: function (evt) {
      if (evt.target.tagName === 'IMG') {
        dragged = evt.target.cloneNode(false);
        window.artifactBag.style = DROP_ZONE_BORDER_STYLE;
      }
    },
    bagItemDragStartHandler: function (evt) {
      if (evt.target.tagName === 'IMG') {
        dragged = evt.target;
        window.artifactBag.style = DROP_ZONE_BORDER_STYLE;
      }
    },
    bagDropHandler: function (evt) {
      evt.target.removeAttribute('style');
      if (evt.target.tagName === 'DIV' && !evt.target.hasChildNodes()) {
        evt.target.appendChild(dragged);
      }
      evt.preventDefault();
    },
    bagDragEnterHandler: function (evt) {
      if (evt.target.tagName === 'DIV' && !evt.target.hasChildNodes()) {
        evt.target.style = HOVERED_CELL_STYLE;
      }
      evt.preventDefault();
    },
    bagDragLeaveHandler: function (evt) {
      evt.target.removeAttribute('style');
      evt.preventDefault();
    },
    // раскрашивание волшебника
    setEyesColor: function () {
      var color = window.util.getRandomParam(window.util.EYE_COLORS);
      wizardEyesColor.value = color;
      window.wizardEyes.style.fill = color;
    },
    setFireballColor: function () {
      var color = window.util.getRandomParam(FIREBALL_COLORS);
      wizardFireballColor.value = color;
      window.wizardFireball.style.backgroundColor = color;
    }
  };
})();
