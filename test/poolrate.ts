import { BackReward } from "..";
import { BackConfig, IPoolInfo } from "../lib/BACK/BackConfig";
import { BackPoolFactory } from "../lib/BACK/BackPoolFactory";
import { IRewardInfo } from "../lib/BACK/BackReward";
import * as util from 'util'

const headWidth = 8;
const tabWdith = 10;

function sumWeight(lst: IPoolInfo[]):number{
    let sum = 0;
    for(const item of lst){
        sum += item.weight
    }

    return sum
}
function printFormatInterest(name:string,
    weight:number|string,
    deposit: number|string,
    borrow: number|string,
    baseRate: number|string,
    rate80:number|string,
    rate90: number|string, 
    rate100: number|string
    ):void{

    console.log(util.format("%s%s%s%s%s%s%s%s",
        name.padEnd(headWidth),
        weight.toString().padStart(tabWdith),
        deposit.toString().padStart(tabWdith),
        borrow.toString().padStart(tabWdith),
        baseRate.toString().padStart(tabWdith),
        rate80.toString().padStart(tabWdith),
        rate90.toString().padStart(tabWdith),
        rate100.toString().padStart(tabWdith)
    ))
}

function printPoolInterest(lst:IPoolInfo[]):void{
    console.log('\nPrint out Interest:\n')
    printFormatInterest("Token","Weight","Deposit",
    "Borrow",
    "0%",
    "80%",
    "90%",
    "100%")
    printFormatInterest("".padStart(headWidth,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"))
    for(const pool of lst){
        printFormatInterest(
            pool.name,
            pool.weight,
            pool.depositPercent/100 + "%",
            0,
            pool.baseRate/100 + "%",
            pool.rate80/100 + "%",
            pool.rate90/100 + "%",
            pool.rate100/100 + "%"
        )
    }
    printFormatInterest("".padStart(headWidth,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"),
    "".padStart(tabWdith,"-"))
    printFormatInterest("SUM",sumWeight(lst),
    "",
    "",
    "",
    "",
    "",
    "")

}

async function main(){
    console.log("Show Back Params:")

    const bkconfig = new BackConfig()
    // await bkconfig.show();

    console.log("\nShow pools:")
    const poolFact = new BackPoolFactory();
    await poolFact.show();

    console.log("\nShow rewards:")
    const reward = new BackReward();
    await reward.show()
    
    const poolLst :IPoolInfo[]= [];

    console.log("\nLoop in pools:")

    for(const pool of poolFact.getPools()){
        console.log("\npool:", pool.symbol)

        const result = await bkconfig.getPoolValueInterest(pool.address, pool.symbol);
 

        const resultReward = await reward.getRewardInfo(pool.address, pool.symbol)
        result.weight = resultReward.weight
        poolLst.push(result);

        // console.log(result)
    }

    printPoolInterest(poolLst);

    console.log("\n------------- End ------------")
}

main()
// printFormatInterest("Token","Weight","Deposit",
// "Borrow",
// "0%",
// "80%",
// "90%",
// "100%")
// printFormatInterest("BXH",100,100,
// 100,
// 100,
// 100,
// 100,
// "100%")