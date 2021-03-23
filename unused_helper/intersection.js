const fs = require('fs');

let fantom = JSON.parse(fs.readFileSync("fantom2.json", 'utf8'))
let fantomUniqueArray = [...new Set([...fantom.minters, ...fantom.swappers])]

let bsc = JSON.parse(fs.readFileSync("bsc2.json", 'utf8'))
let bscUniqueArray = [...new Set([...bsc.minters, ...bsc.swappers])]

const intersection = fantomUniqueArray.filter(element => bscUniqueArray.includes(element))

let addresses = {}
addresses.interactors = intersection
addresses.number = intersection.length

fs.writeFileSync("intersection2.json", JSON.stringify(addresses, null, 4))