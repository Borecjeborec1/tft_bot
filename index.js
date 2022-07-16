let tft_bot = require('./lib/tft_bot.js')
let fs = require("fs")


const TRESHOLD = 20
const BASE_POS = { x: 300, y: 0 }
const BASE_SIZE = { x: 1000, y: 800 }

// fs.writeFileSync("captured.txt", JSON.stringify(tft_bot.videoCapture(BASE_POS.x, BASE_POS.y, BASE_SIZE.x, BASE_SIZE.y)))
let item = JSON.parse(fs.readFileSync("./data/items/belt.txt", "utf8"))
let data = JSON.parse(fs.readFileSync("captured.txt", "utf8"))

let posAr = [] // storing the indexed positions
let searchedIndex = 0

for (let i = -TRESHOLD / 2; i < TRESHOLD / 2; ++i) {
  posAr.push(getAllIndexes(data, item[0] + i))
}

posAr = posAr.flat()

for (let j = 0; j < posAr.length; ++j) {
  for (let i = 0; i < item.length; ++i) {
    if (!(item[i] - TRESHOLD / 2 < data[posAr[j] + i] && data[posAr[j] + i] < item[i] + TRESHOLD / 2))
      i = item.length // break i loop
    if (i == item.length - 1) {
      searchedIndex = posAr[j] + item.length / 2 // + item.length / 2  to get center of image
      let pos = getAbsolutePosition(searchedIndex)
      console.log(pos)
      j = posAr.length // break j loop
    }
  }
}

function getAllIndexes(arr, val) {
  var indexes = [], i;
  for (i = 0; i < arr.length; i++)
    if (arr[i] === val)
      indexes.push(i);
  return indexes;
}

function getRelativePosition(num) {
  let column = (num / 4) % BASE_SIZE.x
  let row = Math.floor((num / 4) / BASE_SIZE.x)
  return { x: column, y: row }
}

function getAbsolutePosition(num) {
  let pos = getRelativePosition(num)
  return { x: BASE_POS.x + pos.x, y: BASE_POS.y + pos.y }
}