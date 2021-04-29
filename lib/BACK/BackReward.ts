import { ethers } from "ethers";
import { HecoContract } from "../HecoContract";
import BackRewardAbi from "../../config/abi/BackReward.json"

export class BackReward extends HecoContract {

    private static contract = "0xa2B27EaC08d1E792F2CE2d99C0331D0E495c4D80"

    public constructor() {
        super(BackReward.contract, BackRewardAbi.abi)
    }

}