import { HecoContract, IPool } from "../HecoContract";
import BackPoolFactoryAbi from "../../config/abi/BackPoolFactory.json"
// import BackPools from "../../config/token/backpools.json"
import { BackERC20 } from "./BackERC20";

export class BackPoolFactory extends HecoContract {
    // private static contract = "0xCCE77dCbCDEcC43520144a030CA15B38f6711832"

    private countPools: number;
    private allPools: IPool[];

    public constructor(url:string, addrContract:string) {
        super(url, addrContract, BackPoolFactoryAbi.abi)
        this.countPools = 0;
        this.allPools = []
    }
    public getPools():IPool[]{ return this.allPools}
    private async getCountPools(): Promise<void> {
        const result = await this.contract.countPools()
        if (result) {
            this.countPools = parseInt(result.toString())
        }
    }
    private async parsePools(result: string[]): Promise<IPool[] >{
        const out: IPool[] = [];
        for (const addr of result) {
            // const filt = BackPools.list.find((ele) => {
            //     return ele.address === addr
            // })
            // if (!filt) {
            //     throw new Error("parsePools(), Not found:" + addr)
            // }
            // get symbols from the chain!
            const token = new BackERC20(this.hecoUrl, addr);
            const symbol = await token.getSymbol();


            out.push({
                address: addr,
                symbol: symbol
            })
        }
        return out;
    }

    public async show(): Promise<string> {
        let result = await this.callMethod("countPools")
        this.countPools = parseInt(result)
        // console.log(this.countPools)
        console.log("There are " + this.countPools + " pools.")

        result = await this.callMethod("getPools")
        console.log(result)


        this.allPools = await this.parsePools(result);


        return ""
    }
}