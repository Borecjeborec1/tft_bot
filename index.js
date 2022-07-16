let tft_bot = require('./lib/tft_bot.js')
let fs = require("fs")


const TRESHOLD = 20
const STARTING_POS = { x: 1050, y: 250 }

// fs.writeFileSync("capture.txt", JSON.stringify(tft_bot.videoCapture(STARTING_POS.x,STARTING_POS.y, 400, 400)))
let item = JSON.parse(fs.readFileSync("./data/items/belt.txt", "utf8"))
let data = JSON.parse(fs.readFileSync("capture.txt", "utf8"))

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
      console.log(item[i], data[posAr[j] + i], posAr[j], posAr[j] + i)
      searchedIndex = posAr[j]
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
