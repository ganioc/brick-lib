import { HecoContract, IPair, PoolPlatform } from "../HecoContract";
import BackPairFActoryAbi from "../../config/abi/BackPairFactory.json"
import { BackPair } from "./BackPair";
import * as util from "util"
export class BackPairFactory extends HecoContract{
    private static contract = "0x3fcB7AF59a84d79F4Ce466E39e62183AC62C0059"

    private pairs:IPair[]
    private addresses:string[]

    public constructor(){
        super(BackPairFactory.contract,BackPairFActoryAbi.abi )
        this.pairs = []
        this.addresses = []
    }
    public getAddresses():string[]{ return this.addresses}
    public getPairs():IPair[]{ return this.pairs}
    public addPair(pair:IPair):number{ this.pairs.push(pair);
    return this.pairs.length}
    public async update():Promise<void>{
        const tabWidth = 15
        let result = await this.callMethod("countPairs")
        console.log("There are " + result + " pairs.")

        result = await this.callMethod("getPairs")
        // console.log(result)
        this.addresses = result;

        for (const addr of this.getAddresses()){
            // console.log("pair:", addr)
            const pairContract = new BackPair(addr);
    
            await pairContract.update()
    
            const pairPid =  await this.getPidOfPair(addr);

            const pair = {
                address: addr,
                token0: pairContract.getToken0(),
                token1 : pairContract.getToken1(),
                symbol0: pairContract.getSymbol0(),
                symbol1: pairContract.getSymbol1(),
                platform: parseInt(pairPid)
            }
            this.addPair(pair)

            // console.log(util.format("\n%s%s", "symbol".padEnd(tabWidth), pair.symbol0+ "-" + pair.symbol1))
            // console.log(util.format("%s%s", "address".padEnd(tabWidth), pair.address))
            // console.log(util.format("%s%s", "token0".padEnd(tabWidth), pair.token0))
            // console.log(util.format("%s%s", "token1".padEnd(tabWidth), pair.token1))
            // console.log(util.format("%s%s", "platform".padEnd(tabWidth), pair.platform))
        }

    }
    public async show():Promise<void>{
        const tabWidth = 15
        let result = await this.callMethod("countPairs")
        console.log("There are " + result + " pairs.")

        result = await this.callMethod("getPairs")
        // console.log(result)
        this.addresses = result;

        for (const addr of this.getAddresses()){
            // console.log("pair:", addr)
            const pairContract = new BackPair(addr);
    
            await pairContract.update()
    
            const pairPid =  await this.getPidOfPair(addr);

            const pair = {
                address: addr,
                token0: pairContract.getToken0(),
                token1 : pairContract.getToken1(),
                symbol0: pairContract.getSymbol0(),
                symbol1: pairContract.getSymbol1(),
                platform: parseInt(pairPid)
            }
            this.addPair(pair)

            console.log(util.format("\n%s%s", "symbol".padEnd(tabWidth), pair.symbol0+ "-" + pair.symbol1))
            console.log(util.format("%s%s", "address".padEnd(tabWidth), pair.address))
            console.log(util.format("%s%s", "token0".padEnd(tabWidth), pair.token0))
            console.log(util.format("%s%s", "token1".padEnd(tabWidth), pair.token1))
            console.log(util.format("%s%s", "platform".padEnd(tabWidth), pair.platform))
        }

    }
    public async getPidOfPair(addr:string):Promise<string>{
        return await this.callProperty("pidOfPair", [addr])
    }
}