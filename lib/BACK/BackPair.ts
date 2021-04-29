import { HecoContract } from "../HecoContract";
import BackPairAbi from "../../config/abi/BackPair.json"
import {  getHecoTokenInfoByAddr } from "../misc";

export class BackPair extends HecoContract{

    private token0: string ;
    private token1: string;
    private symbol0: string;
    private symbol1:string;

    public constructor( contractAddr:string){
        super(contractAddr, BackPairAbi.abi)
        this.token0=""
        this.token1=""
        this.symbol0=""
        this.symbol1=""
    }
    public getToken0():string{ return this.token0}
    public getToken1():string { return this.token1}
    public getSymbol0():string{ return this.symbol0}
    public getSymbol1():string { return this.symbol1}

    public async show():Promise<void>{
        let result = await this.callProperty("token0")
        this.token0 = result;
        console.log("token0:", this.token0)

        let token = getHecoTokenInfoByAddr(this.token0)

        this.symbol0 = token!.symbol

        result = await this.callProperty("token1")
        this.token1 = result;
        console.log("token1:", this.token1)

        token = getHecoTokenInfoByAddr(this.token1)

        this.symbol1 = token!.symbol

        result = await this.callProperty("swapper")
        console.log("swapper:", result)
        result = await this.callProperty("pledgeToken")
        console.log("pledgeToken:", result)

    }
}