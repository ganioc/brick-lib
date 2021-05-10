import { BackConfig } from "./BACK/BackConfig";
import { BackERC20 } from "./BACK/BackERC20";
import { BackPair } from "./BACK/BackPair";
import { BackPairFactory } from "./BACK/BackPairFactory";
import { BackPoolFactory } from "./BACK/BackPoolFactory";
import { BackReward } from "./BACK/BackReward";


export class ContractGenerator{

    public constructor(private url:string,private name:string="DEFAULT"){

    }
    public createBackConfig(addrContract: string):BackConfig{
        return new BackConfig(this.url,addrContract)
    }
    public createBackPair(addrContract:string):BackPair{
        return new BackPair(this.url, addrContract)
    }
    public createBackPairFactory(addrContract:string):BackPairFactory{
        return new BackPairFactory(this.url, addrContract)
    }
    public createBackPoolFactory(addrContract:string):BackPoolFactory{
        return new BackPoolFactory(this.url, addrContract )
    }
    public createBackReward(addrContract:string):BackReward{
        return new BackReward(this.url, addrContract)
    }
    // public createBackContract<T>(addrContract:string):T{
    //     return new (this.url,addrContract);
    // }
    public createBackERC20(addrContract:string):BackERC20{
        return new BackERC20(this.url,addrContract)
    }
}