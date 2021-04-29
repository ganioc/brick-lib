import { HecoContract, IPair, PoolPlatform } from "../HecoContract";
import BackPairFActoryAbi from "../../config/abi/BackPairFactory.json"
import { BackPair } from "./BackPair";

export class BackPairFactory extends HecoContract{
    private static contract = "0x3fcB7AF59a84d79F4Ce466E39e62183AC62C0059"

    private pairs:IPair[]
    private addresses:string[]

    public constructor(){
        super(BackPairFactory.contract,BackPairFActoryAbi.abi )
        this.pairs = []
        this.addresses = []
    }
    public getAddresses():string[]{ return this.addresses}
    public getPairs():IPair[]{ return this.pairs}
    public addPair(pair:IPair):number{ this.pairs.push(pair);
    return this.pairs.length}

    public async show():Promise<void>{
        let result = await this.callMethod("countPairs")
        console.log("There are " + result + " pairs.")

        result = await this.callMethod("getPairs")
        console.log(result)
        this.addresses = result;

        for(const ele of result){
            console.log("ele:", ele)     
        }

    }
    public async getPidOfPair(addr:string):Promise<string>{
        return await this.callProperty("pidOfPair", [addr])
    }
}