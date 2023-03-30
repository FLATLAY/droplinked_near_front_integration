import * as nearAPI from 'near-api-js'
import {walletConnection} from './near_auth'
import {uploadToIPFS} from './ipfs_handler'
const { keyStores } = nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

export const contract_account_id = "4bb5d093c0c0e1b4874c41216cdabc5ef1c81c5535b25788202f2a8ce145a7d7";

/**
 * 
 * @param {string} method_name : name of the method on contract to get result from
 * @param {*} method_args : arguments to give that method (you should pass in a dict)
 * @returns {Promise<any>} result of the method call
 */
export async function contract_view_method(method_name, method_args){
    return await walletConnection.account().viewFunction(contract_account_id,method_name,method_args);
}

export function from_base64(input_string){
    let result = "";
    let charCode = 0;
    for (let i = 0; i < input_string.length; i++) {
        charCode = input_string.charCodeAt(i);
        // we do not want to use Buffer package! so we will just ignore the characters that are not needed for decoding base64 string (which are : =, +, /)
        if (charCode !== 61 && charCode !== 43 && charCode !== 47) {
            result += String.fromCharCode(charCode);
        }
    }
    return atob(result);
}

/**
 * These calls may need a amount of deposit to be attached to! TODO: write it somehow, that the deposited tokens would be provided from the caller account
 * @param {string} method_name : name of the method on contract to call 
 * @param {*} method_args : arguments to pass to that method (you should pass in a dict)
 * @returns {*} result of the method call
 */
export async function contract_call_method(method_name, method_args){
    let result_status = (await walletConnection.account().functionCall({contractId : contract_account_id, methodName : method_name, args : method_args})).status;
    if (result_status.SuccessValue !== undefined){
        // decode it from base64 (note : we do not want to use Buffer package!)
        // Decode : 
        return from_base64(result_status.SuccessValue);
    }
    else{
        throw new Error("Error occured while calling contract method");
    }
}

export async function ipfs_add(metadata){
    let ipfs_hash = await uploadToIPFS(metadata);
    return ipfs_hash;
}

export async function checksum(sku_properties){
    if (typeof(sku_properties) == typeof({})){
        sku_properties = JSON.stringify(sku_properties);
    }
    const hashBuffer = await window.crypto.subtle.digest('SHA-256' , new TextEncoder().encode(sku_properties));
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return digest;
}

export {
    nearAPI
};
