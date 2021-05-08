function rate_to_param(symbol:string, baseRate:number, rate80:number, rate90:number, rate100:number) {
    console.log( "baseRate:", baseRate)
    console.log("rate80:", rate80)
    console.log("rate90:", rate90)
    console.log("rate100:", rate100)

    const m0 = (rate80 - baseRate) * 100 / 80;
    const b0 = baseRate;

    const m1 = (rate90 - rate80) * 100 / 10;
    const b1 = rate80 - 0.8 * m1;

    const m2 = (rate100 - rate90) * 100 / 10
    const b2 = rate90 - 0.9 * m2;

    console.log(symbol);
    console.log('m0: ', m0, 'b0: ', b0);
    console.log('m1: ', m1, 'b1: ', b1);
    console.log('m2: ', m2, 'b2: ', b2);
}


//rate_to_param('USDT', 0.10 * 10000, 0.20 * 10000, 0.30 * 10000, 0.80 * 10000);
//rate_to_param('USDT', 0.10 * 10000, 0.20 * 10000, 0.25 * 10000, 0.50 * 10000);
//rate_to_param(0.05 * 10000, 0.1 * 10000, 0.15 * 10000, 0.5* 10000);
//rate_to_param(0.2 * 10000, 0.5 * 10000, 0.8 * 10000, 1.5 * 10000);
//rate_to_param('HT', 0.08 * 10000, 0.15 * 10000, 0.20 * 10000, 0.4 * 10000);
//rate_to_param('BXH', 0.30 * 10000, 0.60 * 10000, 0.80 * 10000, 1.50 * 10000);
rate_to_param('BXH', 0.50 * 10000, 1.0 * 10000, 1.25 * 10000, 1.75 * 10000);

function param_to_rate(name:string, m0:number, b0:number, m1: number, b1:number,m2:number, b2:number){
    console.log("Token:", name)
    const base = b0;
    const rate80 = base + m0*80/100;
    const rate90 = rate80 + m1 *10/100;
    const rate100 = rate90 + m2*10/100;
    console.log("baseRate:", base)
    console.log("rate80:", rate80)
    console.log("rate90:", rate90)
    console.log("rate100:", rate100)
}

param_to_rate('BXH', 6250, 5000, 25000, -10000, 50000, -32500)