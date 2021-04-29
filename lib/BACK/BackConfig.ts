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

    private lastPriceBlock: number;

    private DAY: number;
    private HOUR: number;

    public constructor() {
        super(BackConfig.contract, BackConfigAbi.abi)
        this.owner=""
        this.poolFactory=""
        this.pairFactory=""
        this.platform=""
        this.developer=""
        this.governor=""
        this.swapper=""
        this.platformToken=""
        this.WETH=""
        this.mainReward=""
        this.lastPriceBlock=0
        this.DAY=0
        this.HOUR=0

    }
    public async getPoolValue(pooladdr: string, param: string): Promise<string> {
        console.log("getPoolValue")

        return this.contract.getPoolValue(pooladdr, ethers.utils.formatBytes32String(param))
    }
    public async init(): Promise<string> {

        return "0"
    }
}