const tft_bot = require('bindings')('tft_bot.node')

function videoCapture(x, y, w, h) {
  return tft_bot.capture(x, y, w, h)
}

module.exports = {
  videoCapture,
}