import { FetchPrice } from "../FetchPrice"
import { Ticker } from "./Ticker"

export class TickerGateio extends Ticker{

    public constructor( baseurl: string, private pathUrl: string){
        super(baseurl)
    }
    // public getPathUrl():string{
    //     return this.pathUrl
    // }
    public parseResult(data: any, token0:string): string {

        let token = token0.toLowerCase()+ "_usdt";

        if(data[token] && data[token].last){
            return data[token].last
        }else{
            return "0"
        }
    }
    public async getPrice(tokenName: string):Promise<string>{
        console.log("From Gateio")
        let fetch = new FetchPrice(this.baseUrl);
        //console.log(this.baseUrl)
        let result = await fetch.Get(this.pathUrl,{})
        //console.log(this.getPathUrl())
        // console.log(result)

        if(result.err === 0 && result.data){
            return this.parseResult(result.data, tokenName)
        }else{
            return "0"
        }

    }
}