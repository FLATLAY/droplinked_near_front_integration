import { mainNetconnectionConfig, testNetconnectionConfig } from './near_auth';
import { get_transaction_result } from './near_transaction_getter';
import {urlSearchParams} from './url_parser'
if (urlSearchParams.get("transactionHashes")!=null){
    let transactionHashes = urlSearchParams.get("transactionHashes");
    console.log("Transaction hashes : "+transactionHashes);
    let transaction_details = await get_transaction_result(transactionHashes);
    console.log("Transaction details : "+transaction_details);
}
else if (urlSearchParams.get("errorCode") != null){
    console.log("Error code : "+urlSearchParams.get("errorCode"));
    console.log("Error message : "+urlSearchParams.get("errorMessage"));
}