import { HecoContract, IPair } from "../HecoContract";
import BackPairAbi from "../../config/abi/BackPair.json"
import * as util from "util"
import { BackERC20 } from "./BackERC20";
export class BackPair extends HecoContract{

    private token0: string ;
    private token1: string;
    private symbol0: string;
    private symbol1:string;
    private swapper: string;
    private pledgeToken: string;

    public constructor( hecoUrl:string, contractAddr:string){
        super(hecoUrl, contractAddr, BackPairAbi.abi)
        this.token0=""
        this.token1=""
        this.symbol0=""
        this.symbol1=""
        this.swapper=""
        this.pledgeToken=""
    }
    public getToken0():string{ return this.token0}
    public getToken1():string { return this.token1}
    public getSymbol0():string{ return this.symbol0}
    public getSymbol1():string { return this.symbol1}

    public static show(pair:IPair):void{
        const tabWidth = 20;
        console.log("")
        console.log(util.format("%s%s","pair:".padEnd(tabWidth), pair.symbol0+"-"+ pair.symbol1))

        console.log(util.format("%s%s","address".padEnd(tabWidth), pair.address))
        // console.log(util.format("%s%s","token0".padEnd(tabWidth), pair.token0))

        // console.log(util.format("%s%s","token1".padEnd(tabWidth), pair.token1))

    }

    public async update():Promise<void>{
        this.token0 = await this.callProperty("token0")

        // let token = getHecoTokenInfoByAddr(this.token0)
        const token = new BackERC20(this.hecoUrl, this.token0);
        const symbol = await token.getSymbol();

        this.symbol0 = symbol

        this.token1 = await this.callProperty("token1")

        // token = getHecoTokenInfoByAddr(this.token1)
        const token1 = new BackERC20(this.hecoUrl, this.token1);
        const symbol1 = await token1.getSymbol();

        this.symbol1 = symbol1

        this.swapper = await this.callProperty("swapper")

        this.pledgeToken = await this.callProperty("pledgeToken")

    }
}