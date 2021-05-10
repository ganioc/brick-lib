import { ethers } from "ethers";
import { HecoContract } from "../HecoContract";
import BackConfigAbi from "../../config/abi/BackConfig.json"
import * as util from "util"

export interface IPoolInfo {
    name: string;
    weight: number;
    depositPercent: number;
    reservePercent: number;
    baseRate: number;
    rate80: number;
    rate90: number;
    rate100: number;
}
export class BackConfig extends HecoContract {

    // private static contract = "0x51b4fa29dA61715d3384Be9f8a7033bD349Ef629"

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

    public constructor(url:string, contractAddr:string) {
        super(url, contractAddr, BackConfigAbi.abi)
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

    public async show(): Promise<void> {
        const tabWidth = 20;

        this.owner = await this.callProperty("owner")
        console.log(util.format("%s%s", "owner".padEnd(tabWidth), this.owner))

        this.poolFactory = await this.callProperty("poolFactory")
        console.log(util.format("%s%s", "poolFactory".padEnd(tabWidth), this.poolFactory))

        this.pairFactory = await this.callProperty("pairFactory")
        console.log(util.format("%s%s", "pairFactory".padEnd(tabWidth), this.pairFactory))

        this.platform = await this.callProperty("platform")
        console.log(util.format("%s%s", "platform".padEnd(tabWidth), this.platform))

        this.developer = await this.callProperty("developer")
        console.log(util.format("%s%s", "developer".padEnd(tabWidth), this.developer))

        this.governor = await this.callProperty("governor")
        console.log(util.format("%s%s", "governor".padEnd(tabWidth), this.governor))

        this.swapper = await this.callProperty("swapper")
        console.log(util.format("%s%s", "swapper".padEnd(tabWidth), this.swapper))

        this.platformToken = await this.callProperty("platformToken")
        console.log(util.format("%s%s", "platformToken".padEnd(tabWidth), this.platformToken))

        this.WETH = await this.callProperty("WETH")
        console.log(util.format("%s%s", "WETH".padEnd(tabWidth), this.WETH))

        this.mainReward = await this.callProperty("mainReward")
        console.log(util.format("%s%s", "mainReward".padEnd(tabWidth), this.mainReward))

        this.lastPriceBlock = await this.callProperty("lastPriceBlock")
        console.log(util.format("%s%s", "lastPriceBlock".padEnd(tabWidth), this.lastPriceBlock))

        this.DAY = await this.callProperty("DAY")
        console.log(util.format("%s%s", "DAY".padEnd(tabWidth), this.DAY))

        this.HOUR = await this.callProperty("HOUR")
        console.log(util.format("%s%s", "HOUT".padEnd(tabWidth), this.HOUR))
    }
    public async getPoolValue(pool: string): Promise<void> {
        let result = await this.callMethod("getPoolValue",
            [pool, ethers.utils.formatBytes32String("POOL_BACK_DEPOSIT_PERCENT")])
        console.log("POOL_BACK_DEPOSIT_PERCENT:", result)

        result = await this.callMethod("getPoolValue",
            [pool, ethers.utils.formatBytes32String("POOL_RESERVE_PERCENT")])
        console.log("POOL_RESERVE_PERCENT:", result)


    }
    public async getPoolInterest(pool: string, index: string): Promise<void> {
        const result = await this.contract.interestParams(pool, ethers.utils.parseUnits(index))

        if (result) {
            console.log("base:", result.base.toString())
            console.log("positioN:", result.position.toString())
            console.log("ratio:", result.ratio.toString())
            console.log("positive:", result.positive.toString())
        }
    }
    public async showPoolValue(pool: string): Promise<void> {
        const tabWidth = 30;
        const tabNumber = 8;
        let result = await this.callMethod("getPoolValue",
            [pool, ethers.utils.formatBytes32String("POOL_BACK_DEPOSIT_PERCENT")])
        console.log(util.format("%s%s", "POOL_BACK_DEPOSIT_PERCENT".padEnd(tabWidth), result))
        result = await this.callMethod("getPoolValue",
            [pool, ethers.utils.formatBytes32String("POOL_RESERVE_PERCENT")])
        console.log(util.format("%s%s", "POOL_RESERVE_PERCENT".padEnd(tabWidth), result))



    }

    public async showPoolInterestBasic(pool: string, index: number): Promise<void> {
        const tabWidth = 30
        const result = await this.contract.interestParams(pool, index)

        if (result) {
            console.log(util.format("%s%s", "base:".padEnd(tabWidth), result.base.toString()))
            console.log(util.format("%s%s", "positioN:".padEnd(tabWidth), result.position.toString()))
            console.log(util.format("%s%s", "ratio:".padEnd(tabWidth), result.ratio.toString()))
            console.log(util.format("%s%s", "positive:".padEnd(tabWidth), result.positive.toString()))
        } else {
            console.log("empty")
        }
    }
    public async showPoolInterest(pool: string): Promise<void> {
        await this.showPoolInterestBasic(pool, 0);
        await this.showPoolInterestBasic(pool, 1);
        await this.showPoolInterestBasic(pool, 2);
    }

    public async getPoolValueInterest(pool: string, symbol:string): Promise<IPoolInfo> {
        const poolInfo = {
            name: symbol,
            weight:0,
            depositPercent: 0,
            reservePercent: 0,
            baseRate: 0,
            rate80: 0,
            rate90: 0,
            rate100: 0
        }
       let result = await this.callMethod("getPoolValue",
            [pool, ethers.utils.formatBytes32String("POOL_BACK_DEPOSIT_PERCENT")])
        poolInfo.depositPercent = parseInt(result);

        result = await this.callMethod("getPoolValue",
            [pool, ethers.utils.formatBytes32String("POOL_RESERVE_PERCENT")])
        poolInfo.reservePercent = parseInt(result);

        result = await this.contract.interestParams(pool, 0)
        const b0 = parseInt(result.base.toString())
        const m0 = parseInt(result.ratio.toString())
        poolInfo.baseRate = b0
        poolInfo.rate80 = b0 + m0 * 80 / 100

        result = await this.contract.interestParams(pool, 1)
        const b1 = parseInt(result.base.toString())
        const m1 = parseInt(result.ratio.toString())
        poolInfo.rate90 = poolInfo.rate80 + m1 * 10 / 100

        result = await this.contract.interestParams(pool, 2)
        const b2 = parseInt(result.base.toString())
        const m2 = parseInt(result.ratio.toString())
        poolInfo.rate100 = poolInfo.rate90 + m2 * 10 / 100 

        return poolInfo
    }

    public async showPairValue(pair: string): Promise<void> {
        const tabWidth = 30;
        const tabNumber = 8;

        console.log(util.format("%s%s%s%s%s", "".padEnd(tabWidth),
            "min".padEnd(tabNumber),
            'max'.padEnd(tabNumber),
            'span'.padEnd(tabNumber),
            'value'.padEnd(tabNumber)))
        let result: any = await this.callProperty("poolParams", [pair, ethers.utils.formatBytes32String("PAIR_LEVERAGE_RATE")])
        // console.log(result)
        console.log(util.format("%s%s%s%s%s", "PAIR_LEVERAGE_RATE".padEnd(tabWidth),
            result['min'].toString().padEnd(tabNumber),
            result['max'].toString().padEnd(tabNumber),
            result['span'].toString().padEnd(tabNumber),
            result['value'].toString().padStart(tabNumber)))

        result = await this.callProperty("poolParams", [pair, ethers.utils.formatBytes32String("PAIR_LIQUIDATION_RATE")])
        // console.log(result)
        console.log(util.format("%s%s%s%s%s", "PAIR_LIQUIDATION_RATE".padEnd(tabWidth),
            result['min'].toString().padEnd(tabNumber),
            result['max'].toString().padEnd(tabNumber),
            result['span'].toString().padEnd(tabNumber),
            result['value'].toString().padEnd(tabNumber)))

        result = await this.callProperty("poolParams", [pair, ethers.utils.formatBytes32String("PAIR_LIQUIDATION_DISCOUNT")])
        // console.log(result)
        console.log(util.format("%s%s%s%s%s", "PAIR_LIQUIDATION_DISCOUNT".padEnd(tabWidth),
            result['min'].toString().padEnd(tabNumber),
            result['max'].toString().padEnd(tabNumber),
            result['span'].toString().padEnd(tabNumber),
            result['value'].toString().padEnd(tabNumber)))

    }
}