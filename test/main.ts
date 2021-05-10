
// import { BackConfig } from "../lib/BACK/BackConfig"
import { BackPair } from "../lib/BACK/BackPair"
// import { BackPairFactory } from "../lib/BACK/BackPairFactory"
// import { BackPoolFactory } from "../lib/BACK/BackPoolFactory"
// import { BackReward } from "../lib/BACK/BackReward"
import { ContractGenerator } from "../lib/ContractGenerator"

const urlChain = "https://http-mainnet.hecochain.com"
const addrBackConfig  = "0x51b4fa29dA61715d3384Be9f8a7033bD349Ef629"
const addrBackPairFactory  = "0x3fcB7AF59a84d79F4Ce466E39e62183AC62C0059"
const addrBackPoolFactory = "0xCCE77dCbCDEcC43520144a030CA15B38f6711832"
const addrBackReward = "0xa2B27EaC08d1E792F2CE2d99C0331D0E495c4D80"

async function main(){
    console.log("Show Back Params:")
    const contractFact = new ContractGenerator(urlChain, "BACK");
    // contain all config parameters
    console.log("\nShow config:")
    const bkconfig = contractFact.createBackConfig(addrBackConfig)
    await bkconfig.show();

    console.log("\nShow pools:")
    const poolFact =  contractFact.createBackPoolFactory(addrBackPoolFactory);
    await poolFact.show();

    for(const pool of poolFact.getPools()){
        console.log("\npool:", pool.symbol)
        // await bkconfig.showPoolValue(pool.address);
        // await bkconfig.showPoolInterest(pool.address);
    }

    console.log("\nShow rewards:")
    const reward = contractFact.createBackReward(addrBackReward);
    await reward.show()

    console.log("\nShow pool amountEarn:")
    // for(const pool of poolFact.getPools()){
    //     console.log("\npool:" , pool.symbol)
    //     await reward.showPool(pool.address)
    //     await reward.showPoolStruct(pool.address)
    // }

    console.log("\nShow pairs, Please wait:")
    const pairFact = contractFact.createBackPairFactory(addrBackPairFactory);
    await pairFact.update();

    for(const pair of pairFact.getPairs()){
        BackPair.show(pair);
        await bkconfig.showPairValue(pair.address)
    }

    

    console.log("\n------------------  End ----------------\n")
}

main()