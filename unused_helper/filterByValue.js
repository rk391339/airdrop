const fs = require('fs');
const { ethers } = require("ethers");

const fantomProvider = new ethers.providers.JsonRpcProvider("https://rpc.fantom.network/")

let fantom = JSON.parse(fs.readFileSync("temp-fantom2.json", 'utf8'))
let fantomUniqueArray = fantom.completeSwapArray

const compileValues = async () => {
    
    
    let swapDestinationArray = []
    for(let k = 0; k < fantomUniqueArray.length; k++) {
        let value = (await fantomProvider.getTransaction(fantomUniqueArray[k].transactionHash)).value
        console.log(k, fantomUniqueArray[k].transactionHash, ethers.utils.formatEther(value), value.gt(ethers.utils.parseUnits("50", 18)))
        if (value.gt(ethers.utils.parseUnits("50", 18))) {
            swapDestinationArray.push(fantomUniqueArray[k].args[5])
        }
    }
    let uniqueSwapDestination = [...new Set(swapDestinationArray)];

    let addresses = {}
    addresses.swappers = uniqueSwapDestination
    addresses.swapperNumber = uniqueSwapDestination.length

    fs.writeFileSync("valueSwap.json", JSON.stringify(addresses, null, 4))
}

compileValues()