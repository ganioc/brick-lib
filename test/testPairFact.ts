import { ethers } from "ethers"
import { BackPair } from "../lib/BACK/BackPair"
import { BackPairFactory } from "../lib/BACK/BackPairFactory"
import { ContractGenerator } from "../lib/ContractGenerator"

const urlChain = "https://http-mainnet.hecochain.com"
const addrBackConfig  = "0x51b4fa29dA61715d3384Be9f8a7033bD349Ef629"
const addrBackPairFactory  = "0x3fcB7AF59a84d79F4Ce466E39e62183AC62C0059"
const addrBackPoolFactory = "0xCCE77dCbCDEcC43520144a030CA15B38f6711832"
const addrBackReward = "0xa2B27EaC08d1E792F2CE2d99C0331D0E495c4D80"

async function main() {
    console.log("test pairfactory")
    const contractFact = new ContractGenerator(urlChain, "BACK");
    const ctr = contractFact.createBackPairFactory(addrBackPairFactory)

    let result = await ctr.contract.countPairs()
    console.log("pais num:", result.toString())
    result = await ctr.contract.getPairs()
    console.log("pairs :", result.toString())
    result = await ctr.contract.allPairs(ethers.utils.parseUnits("0"))
    console.log(result)
    result = await ctr.contract.getPair("0x6B0113B0BFeaF0552995580BF7CA3AE306170e7c",
        "0x161470d0c4D7ff5067Fc351e2CcBd84DdC15B57c",
        2
    )
    console.log(result)



    // result = await ctr.contract.pidOfPair("0xfa7fE51A4904586f9BFe5BA0eB93246928324F52");
    // console.log("pid:", result.toString())

    const pairs = [
        "0xAF483Ed1334c7892E8364E8d5fDF5E719089f7b7",
        "0x04F538583568606c5267f5Ab40a594e9801262D3",
        "0xa2b762071E74dA03DF65Df7963722BFCEcA944ed",
        "0x420331b722e3b5A4b738a7EdD6A629eAd48c5C98",
        "0x9e7938bF9beeAaeA1ebC39797209e65b96b5cD42",
        "0x0159CC0F301D98c808a9BA1f6673A2D8C73F5fc7",
        "0x01B49799D6301082fB612D4E9895b630dCcCb597",
        "0x4b8194c6340AF433CC2D57C80E1C1CCE3944E509",
        "0x5e436AaF61Be0815B6B607791602e0afBF46878e",
        "0x181Ef02b6134a5454f8F15886877d481D01FD630",
        "0x41783d2131107424e4E1a05d297EFCdCdA31d421",
        "0xe63165C3285230e43e3b6896b6E43553D194ff40",
        "0xF35eba0bbcC22259940dBeB2090d8Aab178117F9",
        "0xBa27A1e07c28dA71BF9F1c3c1b89f8C9315D6e10",
        "0xc71ca8AFD029A62925AB121f002D5FCC3f7dCa1b",
        "0x9a2328bac698B031d9ae46a8308A86256158aeB1"
    ]
    
    for(const ele of pairs){
        console.log("ele:", ele)
        result = await ctr.contract.pidOfPair(ele);
        console.log("pid:", result.toString())
    }

    for (const ele of pairs){
        console.log("pair:", ele);
        const pairContract = contractFact.createBackPair(ele)
        result = await pairContract.contract.token0()
        console.log("token0:", result)
        result = await pairContract.contract.token1()
        console.log("token1:",result)
    }
}

main()