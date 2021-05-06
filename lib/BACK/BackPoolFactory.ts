import { HecoContract, IPool } from "../HecoContract";
import BackPoolFactoryAbi from "../../config/abi/BackPoolFactory.json"
import BackPools from "../../config/token/backpools.json"

export class BackPoolFactory extends HecoContract {
    private static contract = "0xCCE77dCbCDEcC43520144a030CA15B38f6711832"

    private countPools: number;
    private allPools: IPool[];

    public constructor() {
        super(BackPoolFactory.contract, BackPoolFactoryAbi.abi)
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
    private parsePools(result: string[]): IPool[] {
        const out: IPool[] = [];
        for (const addr of result) {
            const filt = BackPools.list.find((ele) => {
                return ele.address === addr
            })
            if (!filt) {
                throw new Error("parsePools(), Not found:" + addr)
            }
            out.push({
                address: addr,
                symbol: filt.symbol
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


        this.allPools = this.parsePools(result);


        return ""
    }
}