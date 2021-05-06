/**
 * No matter it get price from the internet RPC, or from the Pool smart contract, it will have the same API.
 */

interface ITicker{
    getPrice:(name:string)=>Promise<string>
}

export class Ticker<T extends ITicker>{
    public constructor(private mBaseUrl:string){

    }
    public async getPrice(handler:T, tokenName:string):Promise<string>{
        await handler.getPrice(tokenName);
        return ""
    }
}