import * as near_utils from './utils'
import * as nearAPI from 'near-api-js'
const { connect, keyStores, WalletConnection } = nearAPI;
export const mainNetconnectionConfig = {
    networkId: "mainnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(), 
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
};
export const testNetconnectionConfig = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  

export const nearConnection = await connect(testNetconnectionConfig);
export const nearConnectionMainnet = await connect(mainNetconnectionConfig);
export const walletConnection = new WalletConnection(nearConnection);
export const walletConnectionMainnet = new WalletConnection(nearConnectionMainnet);

export const near = new nearAPI.Near(testNetconnectionConfig);
export const near_main = new nearAPI.Near(mainNetconnectionConfig);

function is_connected(){
    return walletConnection.isSignedIn();
}

function near_connect(success_url = "", fail_url = ""){
    if (is_connected())
        return;
    walletConnection.requestSignIn({
        contractId: near_utils.contract_account_id,
        methodNames: [],
        successUrl: success_url,
        failureUrl: fail_url
    });
}

export function near_disconnect(){
    walletConnection.signOut();
}

export function near_log_in(success_url="", fail_url=""){
    if(!is_connected()){
        near_connect(success_url,fail_url);
    }
    return walletConnection.account().accountId;
}