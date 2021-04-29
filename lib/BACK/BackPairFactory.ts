import { HecoContract } from "../HecoContract";
import BackPairFActoryAbi from "../../config/BackPairFactory.json"

export class BackPairFactory extends HecoContract{
    private static contract = "0x3fcB7AF59a84d79F4Ce466E39e62183AC62C0059"

    public constructor(){
        super(BackPairFactory.contract,BackPairFActoryAbi.abi )
    }
}