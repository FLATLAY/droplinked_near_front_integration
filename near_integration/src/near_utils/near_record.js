import * as near_utils from './utils'
/**
 * Call the mint function on the contract with given information, and record the product on chain
 * @param {*} metadata can be anything 
 * @param {string} product_name 
 * @param {number | string} price_in_usd 
 * @returns {Promise<number>} holder_id for the minted product
 */
export async function near_record_product(metadata, product_name, price_in_usd, amount){
    let ipfs_hash = await near_utils.ipfs_add(metadata);
    let checksum = await near_utils.checksum(metadata);
    return await near_utils.contract_call_method("mint" , {
        "name" : product_name,
        "token_uri" : ipfs_hash,
        "checksum" : checksum,
        "price" : price_in_usd,
        "amount" : amount
    });
}

/*
usecase : 
console.log("minted holder_id =>" , await near_record_product({ 
    "name" : "test product",
    "size" : "10",
    "color" : "red",
    "description" : "this is a test product",
    "image" : "https://ipfs.io ipfs hash"
}, "prod_name_test", 103, 1230));
*/