import { BackConfig } from "../lib/BACK/BackConfig"
import { BackPair } from "../lib/BACK/BackPair"
import { BackPairFactory } from "../lib/BACK/BackPairFactory"
import { BackPoolFactory } from "../lib/BACK/BackPoolFactory"
import { BackReward } from "../lib/BACK/BackReward"


async function main(){
    console.log("Show Back Params:")
    // contain all config parameters
    console.log("\nShow config:")
    const config = new BackConfig()
    await config.show();


    console.log("\nShow pools:")
    const poolFact = new BackPoolFactory();
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
    const pairFact = new BackPairFactory();
    await pairFact.show();
    // for(const addr of pairFact.getAddresses()){
    //     console.log("pair:", addr)
    //     let result = await pairFact
    // }
    for (const addr of pairFact.getAddresses()){
        console.log("pair:", addr)
        const pairContract = new BackPair(addr);

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
    const reward = new BackReward();

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