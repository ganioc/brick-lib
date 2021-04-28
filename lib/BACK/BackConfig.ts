import { HecoContract } from "../HecoContract";

export class BackConfig extends HecoContract{

    public constructor(contractAddr: string, abi: any){
        super(contractAddr,abi)
    }
    public async getPoolValue(){
        console.log("getPoolValue")

        return this.contract.getPoolValue("0x6B0113B0BFeaF0552995580BF7CA3AE306170e7c","POOL_BACK_DEPOSIT_PERCENT")
    }
}