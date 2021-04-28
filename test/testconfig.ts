import { BackConfig } from "../lib/BACK/BackConfig"
import BackConfigAbi from "../config/BackConfig.json"
import { ethers } from "ethers";

const configContract = "0x51b4fa29dA61715d3384Be9f8a7033bD349Ef629"

async function main() {
    console.log('testconfig:')
    const ctr = new BackConfig(configContract, BackConfigAbi.abi)

    const result = await ctr.contract.getPoolValue("0x6B0113B0BFeaF0552995580BF7CA3AE306170e7c",
        ethers.utils.formatBytes32String("POOL_BACK_DEPOSIT_PERCENT"))

    console.log(result.toString())
}

main()