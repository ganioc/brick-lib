
import { HecoContract } from "../HecoContract";
import BackRewardAbi from "../../config/abi/BackReward.json"
import * as util from "util"

export interface IRewardInfo{
    name:string;
    weight:number;
}
export class BackReward extends HecoContract {

    // private static contract = "0xa2B27EaC08d1E792F2CE2d99C0331D0E495c4D80"

    private backToken:string;
    private amountPerBlock:string;
    private amountPerWeight: string;
    private lastUpdateBlock: string;
    private totalWeight: string;
    private mintedAmount: string;

    public constructor(url:string, addrContract: string) {
        super(url,addrContract, BackRewardAbi.abi)
        this.backToken=""
        this.amountPerBlock = ""
        this.amountPerWeight = ""
        this.lastUpdateBlock = ""
        this.totalWeight = ""
        this.mintedAmount = ""
    }

    public async show():Promise<void>{
        const tabWidth = 20
        this.backToken = await this.callProperty("backToken")
        console.log(util.format("%s%s","backToken".padEnd(tabWidth), this.backToken))

        this.amountPerBlock = await this.callProperty("amountPerBlock")
        console.log(util.format("%s%s","amountPerBlock".padEnd(tabWidth), this.amountPerBlock))

        this.amountPerWeight =  await this.callProperty("amountPerWeight")
        console.log(util.format("%s%s","amountPerWeight".padEnd(tabWidth), this.amountPerWeight))

        this.lastUpdateBlock = await this.callProperty("lastUpdateBlock")
        console.log(util.format("%s%s","lastUpdateBlocK".padEnd(tabWidth), this.lastUpdateBlock))

        this.totalWeight = await this.callProperty("totalWeight")
        console.log(util.format("%s%s","totalWeight".padEnd(tabWidth), this.totalWeight))

        this.mintedAmount = await this.callProperty("mintedAmount")
        console.log(util.format("%s%s","mintedAmount".padEnd(tabWidth), this.mintedAmount))
    }
    public async queryPool(pair:string):Promise<string>{
        return this.callMethod("queryPool",[pair])
    }

    public async showPool(pool:string):Promise<void>{
        const tabWidth = 20
        const result = await this.callMethod("queryPool",[pool])
        console.log(util.format("%s%s","amountEarn".padEnd(tabWidth), result))
    }
    public async showPoolStruct(pool:string):Promise<void>{
        const tabWidth=20
        const result:any = await this.callProperty("deposits",[pool])
        // console.log("typeof result", typeof result)
        // console.log(result)
        for(const key in result){
            if( ["0", "1","2"].indexOf(key) === -1){
                console.log(util.format("%s%s",(key +"").padEnd(tabWidth), result[key].toString()))
            }
        }
    }
    public async getRewardInfo(pool:string, symbol:string):Promise<IRewardInfo>{
        const result:any = await this.callProperty("deposits",[pool])
        return {
            name: symbol,
            weight: parseInt(result["0"].toString())
        }
    }
}