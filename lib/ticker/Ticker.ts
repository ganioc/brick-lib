// import { IResult } from "../misc";

// an operation to get price 
export abstract class Ticker {
    public  baseUrl:string;
    public constructor(mBaseUrl:string){
        this.baseUrl = mBaseUrl
    }

    public abstract getPrice(tokenName:string):Promise<string>;
    public abstract parseResult(data:string, token:string):string;
}


