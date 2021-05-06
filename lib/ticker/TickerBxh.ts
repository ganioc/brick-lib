import { FetchPrice } from "../FetchPrice";
import { Ticker } from "./Ticker";

export class TickerBxh extends Ticker {
    public constructor(baseurl: string, private pathUrl: string) {
        super(baseurl)
    }

    public parseResult(data: any, token0: string): string {
        if (data.code === 0) {
            return data.data + ''
        }
        return "0"
    }

    public async getPrice(tokenName: string): Promise<string> {
        console.log("From Bxh")
        let fetch = new FetchPrice(this.baseUrl)

        let result = await fetch.Post(this.pathUrl, {})

        if (result.err === 0 && result.data) {
            return this.parseResult(result.data, tokenName)
        } else {
            return "0"
        }
    }
}