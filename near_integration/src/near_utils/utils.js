import * as nearAPI from 'near-api-js'
import {walletConnection} from './near_auth'
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


/**
 * These calls may need a amount of deposit to be attached to! TODO: write it somehow, that the deposited tokens would be provided from the caller account
 * @param {string} method_name : name of the method on contract to call 
 * @param {*} method_args : arguments to pass to that method (you should pass in a dict)
 * @returns {*} result of the method call
 */
export async function contract_call_method(method_name, method_args){

}

export {
    nearAPI
};
