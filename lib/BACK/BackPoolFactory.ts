import { HecoContract } from "../HecoContract";
import BackPoolFactoryAbi from "../../config/abi/BackPoolFactory.json"

export class BackPoolFactory extends HecoContract{
    private static contract = "0xCCE77dCbCDEcC43520144a030CA15B38f6711832"

    private countPools:number;
    private allPools: string[];

    public constructor(){
        super(BackPoolFactory.contract, BackPoolFactoryAbi.abi)
        this.countPools=0;
        this.allPools = []
    }
    private async getCountPools():Promise<void>{
        const result = await this.contract.countPools()
        if(result){
            this.countPools = parseInt(result.toString())
        }
    }

    public async init():Promise<string>{
        let result = await this.callMethod("countPools")
        this.countPools = parseInt(result)
        console.log("There are " + this.countPools + " pools.")
        
        result =  await this.callMethod("getPools")
        this.allPools = result;

        return ""
    }
}