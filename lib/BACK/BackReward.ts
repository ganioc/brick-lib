import { ethers } from "ethers";
import { HecoContract } from "../HecoContract";
import BackRewardAbi from "../../config/abi/BackReward.json"

export class BackReward extends HecoContract {

    private static contract = "0xa2B27EaC08d1E792F2CE2d99C0331D0E495c4D80"

    private backToken:string;
    private amountPerBlock:string;
    private amountPerWeight: string;
    private lastUpdateBlock: string;
    private totalWeight: string;
    private mintedAmount: string;

    public constructor() {
        super(BackReward.contract, BackRewardAbi.abi)
        this.backToken=""
        this.amountPerBlock = ""
        this.amountPerWeight = ""
        this.lastUpdateBlock = ""
        this.totalWeight = ""
        this.mintedAmount = ""
    }

    public async show():Promise<void>{
        this.backToken = await this.callProperty("backToken")
        console.log("backToken:", this.backToken)

        this.amountPerBlock = await this.callProperty("amountPerBlock")
        console.log("amountPerBlock:", this.amountPerBlock)

        this.amountPerWeight =  await this.callProperty("amountPerWeight")
        console.log("amountPerWeight:", this.amountPerWeight)

        this.lastUpdateBlock = await this.callProperty("lastUpdateBlock")
        console.log("lastUpdateBlocK:", this.lastUpdateBlock)

        this.totalWeight = await this.callProperty("totalWeight")
        console.log("totalWeight:", this.totalWeight)

        this.mintedAmount = await this.callProperty("mintedAmount")
        console.log("mintedAmount:", this.mintedAmount)
    }
    public async queryPool(pair:string):Promise<string>{
        return this.callMethod("queryPool",[pair])
    }

}