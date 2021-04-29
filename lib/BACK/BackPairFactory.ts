import { HecoContract, IPair } from "../HecoContract";
import BackPairFActoryAbi from "../../config/abi/BackPairFactory.json"

export class BackPairFactory extends HecoContract{
    private static contract = "0x3fcB7AF59a84d79F4Ce466E39e62183AC62C0059"

    private pairs:IPair[]
    private addresses:string[]

    public constructor(){
        super(BackPairFactory.contract,BackPairFActoryAbi.abi )
        this.pairs = []
        this.addresses = []
    }
    public async show():Promise<void>{
        let result = await this.callMethod("countPairs")
        console.log("There are " + result + " pairs.")

        result = await this.callMethod("getPairs")
        console.log(result)
        this.addresses = []

    }
}