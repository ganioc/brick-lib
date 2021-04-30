import { HecoContract } from "../HecoContract";
import BackPairAbi from "../../config/abi/BackPair.json"
import {  getHecoTokenInfoByAddr } from "../misc";
import * as util from "util"
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
        const tabWidth = 20;
        let result = await this.callProperty("token0")
        this.token0 = result;
        console.log(util.format("%s%s","token0".padEnd(tabWidth), this.token0))

        let token = getHecoTokenInfoByAddr(this.token0)

        this.symbol0 = token!.symbol

        result = await this.callProperty("token1")
        this.token1 = result;
        console.log(util.format("%s%s","token1".padEnd(tabWidth), this.token1))

        token = getHecoTokenInfoByAddr(this.token1)

        this.symbol1 = token!.symbol

        result = await this.callProperty("swapper")
        console.log(util.format("%s%s","swapper".padEnd(tabWidth), result))
        result = await this.callProperty("pledgeToken")
        console.log(util.format("%s%s","pledgeToken:".padEnd(tabWidth), result))
    }

    public async update():Promise<void>{
        this.token0 = await this.callProperty("token0")

        let token = getHecoTokenInfoByAddr(this.token0)

        this.symbol0 = token!.symbol

        this.token1 = await this.callProperty("token1")

        token = getHecoTokenInfoByAddr(this.token1)

        this.symbol1 = token!.symbol

         await this.callProperty("swapper")

         await this.callProperty("pledgeToken")

    }
}