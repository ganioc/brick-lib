import { BigNumber } from "bignumber.js";
// import hecotokens from "../config/token/hecotokens.json"
export interface IResult {
  err: number;
  data: any;
}

/**
 *
 * @param ms
 * @returns Promise
 */
export function DelayMs(ms: number) :Promise<null>{
  return new Promise<null>((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

export function convertBigNumberToNormal(
  bigNumber: BigNumber,
  decimals: 18
): string {
  const result = new BigNumber(bigNumber).dividedBy(new BigNumber(Math.pow(10, decimals)));

  return result.toFixed();
}

export function convertNormalToBigNumber(num: number, decimals: 18, fix:  0): string {
  const result = new BigNumber(num).multipliedBy(new BigNumber(Math.pow(10, decimals))).minus(fix).toFixed(0);
  return result
}

export function getTokenNameFromLP(lp: string): string {
  let strLst = lp.split("-")

  strLst = strLst.map((str) => {
    return str.toUpperCase();
  })

  if (strLst[0] === "USDT") {
    return strLst[1]
  } else {
    return strLst[0]
  }
}

export interface ITokenInfo {
  symbol: string,
  address: string,
  decimals: number
}
// export function getHecoTokenInfoByAddr(addr: string): ITokenInfo | null {
//   const lst = hecotokens.list.filter((item: ITokenInfo) => {
//     return (addr.toLowerCase() === item.address.toLowerCase())
//   })
//   if (lst.length > 0) {
//     return lst[0]
//   } else {
//     throw new Error("Can't find "+ addr)
//   }
// }

// export function getTokenFetcher(token:string):any{
//   if(token === "BTC" || token === "HBTC"){
//     return new TokenBTC();
//   }else if(token === "BXH"){
//     return new TokenBXH()
//   }else if(token === "ETH"){
//     return new TokenETH()
//   }else if(token === "HT" || token === "WHT"){
//     return new TokenHT()
//   }else if(token === "HUSD"){
//     return new TokenHUSD()
//   }else if(token === "MDX"){
//     return new TokenMDX()
//   }else if(token === "BACK"){
//     return new TokenBACK()
//   }else{
//     return null
//   }
// }

export function getValueByDecimals(val:string, decimals?:number):string{
    const bn1 = new BigNumber(val);
    return bn1.div( new BigNumber(Math.pow(10, 18))).toString()
}
