import * as near_utils from './utils'

/**
 * 
 * @param {number} token_id 
 * @returns {Promise<{"name" : string, "token_uri" : string, "checksum" : string, "price" : string}>}
 */
export async function get_token_metadata(token_id){
    return JSON.parse(await near_utils.contract_view_method("get_token_metadata" , {"token_id":token_id}));
}

/**
 * 
 * @param {number} holder_id 
 * @returns {Promise<{"token_id" : number, "amount" : number, "rem_amount" : number}>}
 */
export async function get_holder(holder_id){
    return JSON.parse(await near_utils.contract_view_method("get_holder" , {"holder_id" : holder_id}));
}

/**
 * 
 * @param {number} approved_id 
 * @returns {Promise<{"approved_id" : number, "holder_id" : number, "amount" : number, "owner_account" : string, "publisher_account" : string, "token_id" : number}>}
 */
export async function get_approved(approved_id){
    return JSON.parse(await near_utils.contract_view_method("get_approved" , {"approved_id" : approved_id}));
}

/**
 * 
 * @param {string} producer_account 
 * @returns {Promise<Array<number>>}
 */
export async function get_producers_approved(producer_account) {
    return (await near_utils.contract_view_method("producers_approved" , {"producer_account" : producer_account}));
}

/**
 * 
 * @param {string} publisher_account 
 * @returns {Promise<Array<number>>}
 */
export async function get_publishers_approved(publisher_account) {
    return (await near_utils.contract_view_method("publishers_approved" , {"publisher_account" : publisher_account}));
}

/**
 * 
 * @param {string} producer_account 
 * @returns {Promise<Array<number>>}
 */
export async function get_producer_requests(producer_account){
    return (await near_utils.contract_view_method("get_producer_requests" , {"producer_account" : producer_account}));
}

/**
 * 
 * @param {string} publisher_account 
 * @returns {Promise<Array<number>>}
 */
export async function get_publisher_requests(publisher_account){
    return (await near_utils.contract_view_method("get_publisher_requests" , {"publisher_account" : publisher_account}));
}

/**
 * 
 * @param {number} request_id 
 * @returns {Promise<{"amount" : number, "holder_id" : number, "comission" : number , "producer" : string, "publisher" : string} | null>}
 */
export async function get_request(request_id){
    try{
        return JSON.parse(await near_utils.contract_view_method("get_request", {"request_id" : request_id}));
    }
    catch(reason){
        // you can log here for details
        return null
    }
}

/**
 * 
 * @param {string} account_id 
 * @returns {Promise<Array<number> | null>}
 */
export async function get_owner_holder_ids(account_id){
    try{
        return (await near_utils.contract_view_method("get_owner_tokens", {"account_id" : account_id}));
    }
    catch(reason){
        // you can log the reason in debug state
        return null;
    }
}

/**
 * 
 * @param {string} account_id 
 * @returns {Promise<{"holder_id" : number, "holder" : {"token_id" : number, "amount" : number, "rem_amount" : number} , "metadata" : {"name" : string, "token_uri" : string, "checksum" : string, "price" : string}}[]>}
 */
export async function get_owner_nfts(account_id){
    let result = [];
    let owner_holder_ids = await get_owner_holder_ids(account_id);
    for(let i = 0 ; i < owner_holder_ids.length ; i++){
        let holder_id = owner_holder_ids[i];
        let holder = await get_holder(holder_id);
        let token_id = holder.token_id;
        let token_metadata = await get_token_metadata(token_id);
        result.push({
            "holder_id" : holder_id,
            "holder" : holder,
            "metadata" : token_metadata
        });
    }
    return result;
}