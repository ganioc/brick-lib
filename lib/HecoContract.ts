import { BigNumber } from "bignumber.js";
import { ethers } from "ethers";

// T is th
export class HecoContract{
    public static hecoUrl = "https://http-mainnet.hecochain.com"
    public static priceDecimals = 10;

    protected provider: ethers.providers.JsonRpcProvider;
    public contract: ethers.Contract;

    public constructor(private contractAddr: string, private abi: any) {
        this.provider = new ethers.providers.JsonRpcProvider(HecoContract.hecoUrl)
        this.contract = new ethers.Contract(
            this.contractAddr,
            abi,
            this.provider
        )
    }
}