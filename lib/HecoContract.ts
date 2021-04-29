import { BigNumber } from "bignumber.js";
import { ethers } from "ethers";
import { type } from "node:os";

// T is th
export class HecoContract{
    public static hecoUrl = "https://http-mainnet.hecochain.com"
    public static priceDecimals = 10;

    protected provider: ethers.providers.JsonRpcProvider;
    public contract: ethers.Contract;

    public constructor(private contractAddr: string, private abi: any) {
        this.provider = new ethers.providers.JsonRpcProvider(HecoContract.hecoUrl)
        this.contract = new ethers.Contract(
            this.contractAddr,
            abi,
            this.provider
        )
    }
    protected async callProperty(name:string, args?:any[]):Promise<string>{
        const result = await this.contract[name](...args!);

        console.log("callProperty:")
        console.log(result)
        console.log("typeof:", typeof result)
        
        if(typeof result === 'object' && result._isBigNumber){
            return result.toString()
        }else if(typeof result === 'string'){
            return result;
        }else{
            throw new Error("callProperty fail")
        }
    }
    protected async callMethod(name:string, args?:any[]):Promise<any>{
        const result = await this.contract[name](...args!);

        console.log("callMethod:")
        console.log(result)
        console.log("typeof:", typeof result)

        if(typeof result === 'object' && result._isBigNumber){
            return result.toString()
        }else if(typeof result === 'string' || typeof result === 'object'){
            return result;
        }else{
            throw new Error("callMethod fail")
        }
    }
}