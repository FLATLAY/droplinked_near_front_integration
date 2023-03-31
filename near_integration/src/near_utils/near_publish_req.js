import * as near_utils from './utils'
/**
 * 
 * @param {string} producer_account 
 * @param {number} amount 
 * @param {number} holder_id 
 * @param {number} comission 
 * @returns {Promise<number>} The request_id of the registered publish_request
 */
export async function publish_request(producer_account, amount, holder_id, comission){
    return await near_utils.contract_call_method("publish_request" , {
        "producer_account" : producer_account,
        "amount" : amount,
        "holder_id" : holder_id,
        "comission" : comission
    });
}

//Usage : 
let producer_account = "prod_droplinked.testnet";
let amount = 3;
let holder_id = 1;
let comission = 24;
console.log("The request_id for request is =>" , await publish_request(producer_account,amount,holder_id,comission));