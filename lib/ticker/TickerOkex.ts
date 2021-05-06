import { FetchPrice } from "../FetchPrice"
import { Ticker } from "./Ticker"

export class TickerOkex extends Ticker{
    // public readonly baseUrl = "https://www.okex.com/api/spot/v3/instruments/"
    public constructor( baseurl: string, private pathUrl: string){
        super(baseurl)
    }
    // public getPathUrl():string{
    //     return this.pathUrl
    // }
    public parseResult(data: any): string {
        if(data.last){
            return data.last + ''
        }else{
            return "0"
        }
    }
    public async getPrice(tokenName: string):Promise<string>{
        console.log("From Okex")
        let fetch = new FetchPrice(this.baseUrl)
        let result = await fetch.Get(tokenName +"-USDT" + this.pathUrl, {})
        if(result.err === 0 && result.data){
            return this.parseResult(result.data)
        }else{
            return "0"
        }
    }
}