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
        await bkconfig.showPoolValue(pool.address);
        await bkconfig.showPoolInterest(pool.address);
    }
}

main()