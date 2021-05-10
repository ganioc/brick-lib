import { ContractGenerator } from "../lib/ContractGenerator";



const urlChain = "https://http-mainnet.hecochain.com"

const tokenLst = [
    "0xe499ef4616993730ced0f31fa2703b92b50bb536",
    "0xae3a768f9aB104c69A7CD6041fE16fFa235d1810",
    "0x6474bc11F512DfE6A5162b2167e3f94b61471d05",
    "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
    "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
    "0x0298c2b32eae4da002a15f36fdf7615bea3da047",
    "0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c",
    "0x66a79d23e58475d2738179ca52cd0b41d73f0bea",
    "0x64ff637fb478863b7468bc97d30a5bf3a428a1fd",
    "0xcbd6cb9243d8e3381fea611ef023e17d1b7aedf0",
    "0xa71edc38d189767582c38a3145b5873052c3e47a",

]

async function main() {
    console.log("check BackERC20:")
    const contractFact = new ContractGenerator(urlChain, "BACK");

    for (const item of tokenLst){
        const token = contractFact.createBackERC20(item)
        const result = await token.getSymbol();
        console.log(result)
        const numresult = await token.getDecimals();
        console.log(numresult)
    }
}

main()
