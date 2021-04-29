import { BackConfig } from "../lib/BACK/BackConfig"
import { BackPairFactory } from "../lib/BACK/BackPairFactory"
import { BackPoolFactory } from "../lib/BACK/BackPoolFactory"


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

}

main()