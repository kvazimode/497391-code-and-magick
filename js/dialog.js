'use strict';

var setupDialog = document.querySelector('.setup');
var userPic = setupDialog.querySelector('.setup-user-pic').nextElementSibling;
var dragged = false;

var preventAvatarPickDialog = function (evt) {
  evt.preventDefault();
};

userPic.addEventListener('mousedown', function (evt) {
  var startPoint = {
    x: evt.clientX,
    y: evt.clientY
  };

  var mouseMoveHandler = function (moveEvt) {
    var distance = {
      x: startPoint.x - moveEvt.clientX,
      y: startPoint.y - moveEvt.clientY
    };
    startPoint = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupDialog.style.top = (setupDialog.offsetTop - distance.y) + 'px';
    setupDialog.style.left = (setupDialog.offsetLeft - distance.x) + 'px';
    dragged = true;
  };

  var mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    if (dragged) {
      userPic.addEventListener('click', preventAvatarPickDialog);
    }
    dragged = false;
  };

  userPic.removeEventListener('click', preventAvatarPickDialog);
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});
