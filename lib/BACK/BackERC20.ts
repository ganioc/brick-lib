import { HecoContract } from "../HecoContract";
import ERC20Abi from "../../config/abi/BackToken.json"

export class BackERC20 extends HecoContract{
    private symbol:string;
    private decimals:number;

    public constructor(heooUrl:string, contractAddr:string){
        super(heooUrl, contractAddr, ERC20Abi.abi);

        this.symbol="DEFAULT";
        this.decimals=0;
    }
    public async getSymbol():Promise<string>{
        this.symbol = await this.callMethod("symbol")

        return this.symbol
    }
    public async getDecimals():Promise<number>{
        const result = await this.callMethod("decimals")
        // console.log(result)
        this.decimals = parseInt(result)
        return this.decimals
    }
}