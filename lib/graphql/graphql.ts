import { request, gql } from "graphql-request"

export class GraphqlApi {
    public static STEP = 100;

    public constructor(private url: string) {
        console.log("graphql url:", this.url)
    }
    public async basicGet(field:string,startT:number, endT:number):Promise<number>{
        const step = GraphqlApi.STEP;
        let start = 0;
        let sum = 0;

        const func = async () =>{

            const params = `orderBy:${field}, orderDirection:asc,first:${step},skip:${start},where:{${field}_gt:${startT},${field}_lte:${endT}}`

            const query = gql`
            {
                userStatuses(${params}){
                    id
                    birthTimestamp
                    lastUpdateTimestamp
                }
            }
            `
            const result = await request(this.url, query)
            const len = result.userStatuses.length;
            // console.log("len:", len)
            sum+=len;
            if(len !== 0){
                start += step;
                await func();
            }
        }
        await func()
        // console.log("Sum of userStatuses: ", sum)

        return sum;
    }
    public async getNewAddressBetween(start:string, end :string):Promise<number>{
        try{
            const s = new Date(start);
            const e = new Date(end);
            const sNum = Math.floor(s.getTime()/1000)
            const eNum = Math.floor(e.getTime()/1000)
            return this.basicGet("birthTimestamp",sNum, eNum)
        }catch(e){
            console.log(e)
            return 0;
        }
    }
    public async getNewAddresses():Promise<number>{
        return this.getNewAddressFrom("2021-02-01T00:00:00.000Z");
    }
    public async getNewAddressFrom(start:string):Promise<number>{
        try{
            const s = new Date(start);
            const e = new Date();
            const sNum = Math.floor(s.getTime()/1000)
            const eNum = Math.floor(e.getTime()/1000)
            return this.basicGet("birthTimestamp",sNum, eNum)
        }catch(e){
            console.log(e)
            return 0;
        }
    }
    public async getActivityBetween(start:string, end :string):Promise<number>{
        try{
            const s = new Date(start);
            const e = new Date(end);
            const sNum = Math.floor(s.getTime()/1000)
            const eNum = Math.floor(e.getTime()/1000)
            return this.basicGet("lastUpdateTimestamp",sNum, eNum)
        }catch(e){
            console.log(e)
            return 0;
        }
    }
    public async getActivityFrom(start:string):Promise<number>{
        try{
            const s = new Date(start);
            const e = new Date();
            const sNum = Math.floor(s.getTime()/1000)
            const eNum = Math.floor(e.getTime()/1000)
            return this.basicGet("lastUpdateTimestamp",sNum, eNum)
        }catch(e){
            console.log(e)
            return 0;
        }
    }
}