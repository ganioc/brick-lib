
import { GraphqlApi } from "../../lib/graphql/graphql"

const url = "http://127.0.0.1:8000/subgraphs/name/back"

async function main() {
    console.log("Test graphql:")

    const grap = new GraphqlApi(url);

    let result = await grap.getNewAddresses();
    console.log("All new addresses:", result)

    result = await grap.getNewAddressFrom("2021-05-07T00:00:00.000Z")
    console.log("New addresses since 05-07:", result)

    result = await grap.getNewAddressBetween("2021-05-06T00:00:00.000Z","2021-05-07T00:00:00.000Z")
    console.log("New addresses between 05-06, 05-07:", result)

    result =  await grap.getActivityFrom("2021-05-06T00:00:00.000Z")
    console.log("Activity addresses since 05-06: ", result)

    result =  await grap.getActivityBetween("2021-05-06T00:00:00.000Z", "2021-05-07T00:00:00.000Z")
    console.log("Activity addresses between 05-06 05-07: ", result)
}
main()