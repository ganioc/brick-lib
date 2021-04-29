import { BackReward } from "../lib/BACK/BackReward"

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

async function main() {
    console.log("check reward:")
    const cont = new BackReward();

    let result = await cont.contract.backToken();
    console.log("backToken:", result)
    result = await cont.contract.amountPerBlock();
    console.log("amountPerBlock:", result.toString())
    result = await cont.contract.amountPerWeight();
    console.log("amountPerWeight:", result.toString())
    result = await cont.contract.lastUpdateBlock();
    console.log("lastUpdateBlock:", result.toString())
    result = await cont.contract.totalWeight();
    console.log("totalWeight:", result.toString())
    result = await cont.contract.mintedAmount();
    console.log("mintedAmount:", result.toString())

    for(const pair of pairs){
        console.log("\npair:", pair)
        result = await cont.contract.queryPool(pair)
        console.log("amountEarn:", result.toString())
    }
}
main()