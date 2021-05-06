import { FetchPrice } from "../FetchPrice";
import { IResult } from "../misc";
import { Ticker } from "./Ticker";


export class TickerBinance extends Ticker {
    // public pathUrl: string;
    // public readonly baseUrl =  ";
    public constructor(baseurl: string, private pathUrl: string) {
        super(baseurl);
        // this.pathUrl = mPathUrl
    }
    // public getPathUrl(): string {
    //     return this.pathUrl
    // }
    public parseResult(data: any): string {
        return data.price
    }
    public async getPrice(tokenName: string): Promise<string> {
        console.log("From Binance")
        let fetch = new FetchPrice(this.baseUrl)
        let result = await fetch.Get(this.pathUrl,
            {
                symbol: tokenName + "USDT"
            })
        if (result.err === 0) {
            return (this.parseResult(result.data))
        } else {
            return ("0")
        }


    }
}