import { near } from "./near_auth";
const get_txStatus = async (txHash) => { 
    const result = await near.connection.provider.txStatus(txHash, "k3rn3lpanicc.testnet");
    console.log(result, "result")
    return result;
}
async function get_transaction_result(transaction_hash){
    let result = await get_txStatus(transaction_hash)
    return result;
}

export {get_transaction_result}