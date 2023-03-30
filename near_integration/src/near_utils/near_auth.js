import * as near_utils from './utils'
const { connect, keyStores, WalletConnection } = near_utils.nearAPI;
export const connectionConfig = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};
export const nearConnection = await connect(connectionConfig);
export const walletConnection = new WalletConnection(nearConnection);

export function is_connected(){
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