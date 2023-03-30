import * as near_utils from './near_utils/utils'
import * as token_utils from './near_utils/token_utils'

let token_id = 1;
let holder_id = 1;
let approved_id = 1;
let request_id = 1;
let owner_account = "prod_droplinked.testnet";
let publisher_account = "pub_droplinked.testnet";

console.log("Token metadata for token_id = 1 is ==> ", await token_utils.get_token_metadata(token_id));

console.log("Token holder object for holder_id = 1 is ==> ", await token_utils.get_holder(holder_id));

console.log("Token approved object for approved_id = 1 is ==> ", await token_utils.get_approved(approved_id));

console.log("Request object for request_id = 1 is ==> ", await token_utils.get_request(request_id));

console.log("holder_ids object for owner_account = prod_droplinked.testnet is ==> ", await token_utils.get_owner_holder_ids(owner_account));

console.log("producer_requests for owner_account = prod_droplinked.testnet is ==> ", await token_utils.get_producer_requests(owner_account));

console.log("publisher_requests for owner_account = pub_droplinked.testnet is ==> ", await token_utils.get_publisher_requests(publisher_account));

console.log("publisher_approveds for owner_account = pub_droplinked.testnet is ==> ", await token_utils.get_publishers_approved(publisher_account));

console.log("producer_approveds for owner_account = prod_droplinked.testnet is ==> ", await token_utils.get_producers_approved(owner_account));

console.log("NFT objects for owner_account = prod_droplinked.testnet is ==> ", await token_utils.get_owner_nfts(owner_account));
