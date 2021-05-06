import { DelayMs } from "../../lib/misc";
import { TickerBxh } from "../../lib/ticker/TickerBxh"

const MAX_NUM = 6*60*4;
const lst:number[]= Array(MAX_NUM);
let index =0;
const INTERVAL = 10*1000

async function main() {
    console.log("testBACK.ts")

    const ticker = new TickerBxh("https://www.bxh.com/bxh/api/",
    "/bxhinfo/token/price/")

    while(1){
        const result = await ticker.getPrice("BACK")
        console.log("BACK price:",result)

        await DelayMs(INTERVAL)
    }

}

main()
