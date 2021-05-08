import { BackConfig } from "../lib/BACK/BackConfig"
import { BackPair } from "../lib/BACK/BackPair"
import { BackPairFactory } from "../lib/BACK/BackPairFactory"
import { BackPoolFactory } from "../lib/BACK/BackPoolFactory"
import { BackReward } from "../lib/BACK/BackReward"


async function main(){
    console.log("Show Back Params:")
    // contain all config parameters
    console.log("\nShow config:")
    const bkconfig = new BackConfig()
    await bkconfig.show();

    console.log("\nShow pools:")
    const poolFact = new BackPoolFactory();
    await poolFact.show();

    for(const pool of poolFact.getPools()){
        console.log("\npool:", pool.symbol)
        // await bkconfig.showPoolValue(pool.address);
        // await bkconfig.showPoolInterest(pool.address);
    }

    console.log("\nShow rewards:")
    const reward = new BackReward();
    await reward.show()

    console.log("\nShow pool amountEarn:")
    // for(const pool of poolFact.getPools()){
    //     console.log("\npool:" , pool.symbol)
    //     await reward.showPool(pool.address)
    //     await reward.showPoolStruct(pool.address)
    // }

    console.log("\nShow pairs, Please wait:")
    const pairFact = new BackPairFactory();
    await pairFact.update();

    for(const pair of pairFact.getPairs()){
        BackPair.show(pair);
        await bkconfig.showPairValue(pair.address)
    }

    

    console.log("\n------------------  End ----------------\n")
}

main()