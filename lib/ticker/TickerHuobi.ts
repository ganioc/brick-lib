import { FetchPrice } from "../FetchPrice"
import { Ticker } from "./Ticker"

export class TickerHuobi extends Ticker{
    // public readonly baseUrl = "https://api.huobi.pro/market/"
    public constructor( baseurl: string, private pathUrl: string){
        super(baseurl)
    }
    // public getPathUrl():string{
    //     return this.pathUrl
    // }
    public parseResult(data: any, token:string): string {
        let item = data.filter((m:any)=>{
            return (m.symbol === (token.toLowerCase()+"usdt"))
        })
        if(item){
            return item[0].close + ""
        }else{
            return "0"
        }
    }
    public async getPrice(tokenName: string):Promise<string>{
        console.log("From Huobi")
        let fetch = new FetchPrice(this.baseUrl)
        let result = await fetch.Get(this.pathUrl,{})
        if(result.err ===0 && result.data.status === 'ok'){
            return this.parseResult(result.data.data, tokenName)
        }else{
            return "0"
        }

    }
}