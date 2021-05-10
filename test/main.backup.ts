// import { BackConfig } from "../lib/BACK/BackConfig"
// import { BackPair } from "../lib/BACK/BackPair"
// import { BackPairFactory } from "../lib/BACK/BackPairFactory"
// import { BackPoolFactory } from "../lib/BACK/BackPoolFactory"
// import { BackReward } from "../lib/BACK/BackReward"
import { ContractGenerator } from "../lib/ContractGenerator"

const urlChain = "https://http-mainnet.hecochain.com"
const addrBackConfig  = "0x51b4fa29dA61715d3384Be9f8a7033bD349Ef629"
const addrBackPoolFactory = "0xCCE77dCbCDEcC43520144a030CA15B38f6711832"
const addrBackPairFactory  = "0x3fcB7AF59a84d79F4Ce466E39e62183AC62C0059"
const addrBackReward = "0xa2B27EaC08d1E792F2CE2d99C0331D0E495c4D80"

async function main(){
    console.log("Show Back Params:")
    const contractFact = new ContractGenerator(urlChain, "BACK");
    // contain all config parameters
    console.log("\nShow config:")
    const config = contractFact.createBackConfig(addrBackConfig)
    await config.show();


    console.log("\nShow pools:")
    const poolFact = contractFact.createBackPoolFactory(addrBackPoolFactory);
    await poolFact.show();

    for(const pool of poolFact.getPools()){
        console.log("pool:", pool.symbol)
        await config.getPoolValue(pool.address)

        console.log("interestParams:")
        await config.getPoolInterest(pool.address,"0")
        // await config.getPoolInterest(pool.address,"1")
        // await config.getPoolInterest(pool.address,"2")
    }

    console.log("\nShow pairs:")
    const pairFact = contractFact.createBackPairFactory(addrBackPairFactory);
    await pairFact.show();
    // for(const addr of pairFact.getAddresses()){
    //     console.log("pair:", addr)
    //     let result = await pairFact
    // }
    for (const addr of pairFact.getAddresses()){
        console.log("pair:", addr)
        const pairContract = contractFact.createBackPair(addr);

        await pairContract.update()

        const pairPid =  await pairFact.getPidOfPair(addr);
        pairFact.addPair({
            address: addr,
            token0: pairContract.getToken0(),
            token1 : pairContract.getToken1(),
            symbol0: pairContract.getSymbol0(),
            symbol1: pairContract.getSymbol1(),
            platform: parseInt(pairPid)
        })
    }

    console.log("\nShow rewards:")
    console.log(pairFact.getPairs())
    const reward = contractFact.createBackReward(addrBackReward);

    await reward.show()
    for(const pair of pairFact.getPairs()){
        console.log("pair:", pair.symbol0, pair.symbol1)
        const result = await reward.queryPool(pair.address)
        console.log("amountEarn: ", result)
    }

    for(const pair of poolFact.getPools()){
        console.log("pair:", pair.address, pair.symbol)
        const result = await reward.queryPool(pair.address)
        console.log("amountEarn: ", result)
    }
}

main()