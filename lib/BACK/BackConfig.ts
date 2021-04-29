import { ethers } from "ethers";
import { HecoContract } from "../HecoContract";
import BackConfigAbi from "../../config/abi/BackConfig.json"

export class BackConfig extends HecoContract {

    private static contract = "0x51b4fa29dA61715d3384Be9f8a7033bD349Ef629"

    private owner: string;
    private poolFactory: string;
    private pairFactory: string;
    private platform: string;
    private developer: string;
    private governor: string;
    private swapper: string;
    private platformToken: string;
    private WETH: string;
    private mainReward: string;

    private lastPriceBlock: string;

    private DAY: string;
    private HOUR: string;

    public constructor() {
        super(BackConfig.contract, BackConfigAbi.abi)
        this.owner = ""
        this.poolFactory = ""
        this.pairFactory = ""
        this.platform = ""
        this.developer = ""
        this.governor = ""
        this.swapper = ""
        this.platformToken = ""
        this.WETH = ""
        this.mainReward = ""
        this.lastPriceBlock = ""
        this.DAY = ""
        this.HOUR = ""

    }
    // public async getPoolValue(pooladdr: string, param: string): Promise<string> {
    //     console.log("getPoolValue")

    //     return this.contract.getPoolValue(pooladdr, ethers.utils.formatBytes32String(param))
    // }
    public async show(): Promise<void> {
        this.owner = await this.callProperty("owner")

        this.poolFactory = await this.callProperty("poolFactory")

        this.pairFactory = await this.callProperty("pairFactory")

        this.platform = await this.callProperty("platform")

        this.developer = await this.callProperty("developer")
        this.platform = await this.callProperty("platform")
        this.governor = await this.callProperty("governor")
        this.swapper = await this.callProperty("swapper")
        this.platformToken = await this.callProperty("platformToken")
        this.WETH = await this.callProperty("WETH")
        this.mainReward = await this.callProperty("mainReward")
        this.lastPriceBlock = await this.callProperty("lastPriceBlock")
        this.DAY = await this.callProperty("DAY")

        this.HOUR = await this.callProperty("HOUR")

    }
    public async getPoolValue(pool: string): Promise<void> {
        let result = await this.callMethod("getPoolValue",
            [pool, ethers.utils.formatBytes32String("POOL_BACK_DEPOSIT_PERCENT")])
        console.log("POOL_BACK_DEPOSIT_PERCENT:", result)

        result = await this.callMethod("getPoolValue",
            [pool, ethers.utils.formatBytes32String("POOL_RESERVE_PERCENT")])
        console.log("POOL_RESERVE_PERCENT:", result)


    }
    public async getPoolInterest(pool: string, index:string): Promise<void> {
        const result = await this.contract.interestParams(pool, ethers.utils.parseUnits(index))

        if (result) {
            console.log("base:", result.base.toString())
            console.log("positioN:", result.position.toString())
            console.log("ratio:", result.ratio.toString())
            console.log("positive:", result.positive.toString())
        }
    }
}