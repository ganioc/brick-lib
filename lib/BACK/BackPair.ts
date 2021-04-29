import { HecoContract } from "../HecoContract";
import BackPairAbi from "../../config/BackPair.json"


export class BackPair extends HecoContract{

    public constructor( contractAddr:string){
        super(contractAddr, BackPairAbi.abi)
    }
}