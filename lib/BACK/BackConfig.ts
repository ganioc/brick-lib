import { ethers } from "ethers";
import { HecoContract } from "../HecoContract";
import BackConfigAbi from "../../config/BackConfig.json"

export class BackConfig extends HecoContract{

    private static  contract = "0x51b4fa29dA61715d3384Be9f8a7033bD349Ef629"

    public constructor(){
        super(BackConfig.contract,BackConfigAbi.abi)
    }
    public async getPoolValue(pooladdr:string, param:string):Promise<string>{
        console.log("getPoolValue")

        return this.contract.getPoolValue(pooladdr, ethers.utils.formatBytes32String(param))
    }
}