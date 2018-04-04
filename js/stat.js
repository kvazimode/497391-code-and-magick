'use strict';

// параметры облака
var FIELD_WIDTH = 420;
var FIELD_HEIGHT = 270;
var FIELD_X = 100;
var FIELD_Y = 10;
var FIELD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_SHIFT = 10;
// параметры сообщения
var CONGRATS = ['Ура вы победили!', 'Список результатов:'];
var TEXT_FONT = 'PT Mono';
var TEXT_SIZE = '16px ';
var TEXT_COLOR = '#000';
var TEXT_X = FIELD_X + 30;
var TEXT_Y = FIELD_Y + 30;
var LINE_GAP = 25;
// параметры гистограммы
var GISTO_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var OTHERS_BASE_COLOR = 'rgba(0, 0, 255,';

var getTopResult = function (scores) {
  var top = scores[0];
  for (var i = 0; i < scores.length; i++) {
    if (top < scores[i]) {
      top = scores[i];
    }
  }
  return top;
};

var setFontStyle = function (ctx) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_SIZE + TEXT_FONT;
};

var renderColumn = function (ctx, player, x, y, width, height) {
  if (player === 'Вы') {
    ctx.fillStyle = PLAYER_COLOR;
  } else {
    // минимум = 0.1 - во избежание полностью прозрачной колонки
    ctx.fillStyle = OTHERS_BASE_COLOR + (Math.random() * (1 - 0.1) + 0.1).toString() + ')';
  }
  ctx.fillRect(x, y + (GISTO_HEIGHT - height), width, height);
};

var renderShadow = function (ctx) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(FIELD_X + SHADOW_SHIFT, FIELD_Y + SHADOW_SHIFT, FIELD_WIDTH, FIELD_HEIGHT);
};

var renderField = function (ctx) {
  ctx.fillStyle = FIELD_COLOR;
  ctx.fillRect(FIELD_X, FIELD_Y, FIELD_WIDTH, FIELD_HEIGHT);
};

var renderMessage = function (ctx) {
  ctx.fillText(CONGRATS[0], TEXT_X, TEXT_Y);
  ctx.fillText(CONGRATS[1], TEXT_X, TEXT_Y + LINE_GAP);
};

var renderGisto = function (ctx, players, results, x, y, width, gap) {
  var topResult = getTopResult(results);
  for (var i = 0; i < results.length; i++) {
    var columnX = x + i * (gap + width);
    var columnHeight = Math.round(results[i] / topResult * GISTO_HEIGHT);
    renderColumn(ctx, players[i], columnX, y, width, columnHeight);
    setFontStyle(ctx);
    // имя игрока
    ctx.fillText(players[i], columnX, y + GISTO_HEIGHT + LINE_GAP);
    // результат игрока
    ctx.fillText(Math.round(results[i]), columnX, y + (GISTO_HEIGHT - columnHeight) - 5);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderShadow(ctx);
  renderField(ctx);
  setFontStyle(ctx);
  renderMessage(ctx);
  renderGisto(ctx, names, times, TEXT_X, TEXT_Y + LINE_GAP * 2, COLUMN_WIDTH, COLUMN_GAP);
};
