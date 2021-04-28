import { BackConfig } from "../lib/BACK/BackConfig"
// import BackConfigAbi from "../config/BackConfig.json"



async function main() {
    console.log('testconfig:')
    const ctr = new BackConfig()

    let  result = await ctr.getPoolValue("0x6B0113B0BFeaF0552995580BF7CA3AE306170e7c","POOL_BACK_DEPOSIT_PERCENT")

    console.log(result.toString())

    result = await ctr.getPoolValue("0x6B0113B0BFeaF0552995580BF7CA3AE306170e7c","POOL_RESERVE_PERCENT")
    console.log(result.toString())
}

main()