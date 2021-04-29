import { BackPoolFactory } from "../lib/BACK/BackPoolFactory"


async function main(){
    console.log("Show Back Params:")
    // contain all config parameters
    console.log("Show config:")


    console.log("Show pools:")
    const poolFact = new BackPoolFactory();
    await poolFact.init();

    console.log("Show pairs:")

}

main()