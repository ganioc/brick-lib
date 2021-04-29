import { ethers } from "ethers";
import { BackConfig } from "../lib/BACK/BackConfig"
import {BigNumber} from "bignumber.js"

async function callMethod(contract:ethers.Contract, name:string) :Promise<void>{
    const result = await contract[name]();
    // const resultStr = (typeof result === )
    if(typeof result === 'object' && result._isBigNumber){
        console.log(name,":", result.toString())
    }else{
        console.log(name, ":", result)
    }
}

async function getPoolValue(contract:ethers.Contract, address: string, key:string):Promise<void>{
    const result = await contract.getPoolValue(address,ethers.utils.formatBytes32String(key))


    if(typeof result === 'object' && result._isBigNumber){
        console.log(key,":", result.toString())
    }else{
        console.log(key, ":", result)
    }
}
async function  getPoolValueAll(contract:ethers.Contract, address: string):Promise<void> {
    console.log(address)
    await getPoolValue(contract, address, "POOL_BACK_DEPOSIT_PERCENT")
    await getPoolValue(contract, address, "POOL_RESERVE_PERCENT")
}

async function main() {
    console.log('testconfig:')
    const ctr = new BackConfig()

    // const  result = await ctr.getPoolValue("0x6B0113B0BFeaF0552995580BF7CA3AE306170e7c","POOL_BACK_DEPOSIT_PERCENT")

    // console.log(result.toString())

    // result = await ctr.getPoolValue("0x6B0113B0BFeaF0552995580BF7CA3AE306170e7c","POOL_RESERVE_PERCENT")
    // console.log(result)
    // console.log(typeof result)
    // console.log(result.toString())

    // result = await ctr.contract.lastPriceBlock()
    // console.log(result)
    // console.log(typeof result)
    // console.log(result.toString())

    // result = await ctr.contract["owner"]()
    // console.log(result)
    // console.log(result.toString())
    console.log("------------------------------------")
    await callMethod(ctr.contract, "owner")
    await callMethod(ctr.contract, "poolFactory")
    await callMethod(ctr.contract, "pairFactory")
    await callMethod(ctr.contract, "platform")
    await callMethod(ctr.contract, "developer")
    await callMethod(ctr.contract, "governor")
    await callMethod(ctr.contract, "swapper")
    await callMethod(ctr.contract, "platformToken")
    await callMethod(ctr.contract, "WETH")
    await callMethod(ctr.contract, "mainReward")

    await callMethod(ctr.contract, "lastPriceBlock")
    await callMethod(ctr.contract, "DAY")
    await callMethod(ctr.contract, "HOUR")
    
    // let result = await ctr.contract.getPoolValue("0x6B0113B0BFeaF0552995580BF7CA3AE306170e7c",ethers.utils.formatBytes32String("POOL_BACK_DEPOSIT_PERCENT"))
    // console.log(result)

    await getPoolValueAll(ctr.contract, "0x6B0113B0BFeaF0552995580BF7CA3AE306170e7c")

    await getPoolValueAll(ctr.contract, "0x4641fb5F67e70F47E382BDEB3fFc2F25D12f1B4e")

    await getPoolValueAll(ctr.contract, "0x161470d0c4D7ff5067Fc351e2CcBd84DdC15B57c")

    await getPoolValueAll(ctr.contract, "0x45932c4Ee3898810d5c1AB993F02Bf9784A51C9d")

    await getPoolValueAll(ctr.contract, "0x62F90dA3B6305f7a0c7E1DD6012E37886d2e539E")

    await getPoolValueAll(ctr.contract, "0xc2a284f250b320861f4639E11ce46d7731143478")

}

main()