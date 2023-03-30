# Droplinked-NEAR front Integration
This repo contains js functionalities inoreder to comunicate with the deployed contract on NEAR (or to comunicate with other contracts in order to implement token_gating and other building blocks that droplinked needs).

---

## Run
In the near_integration folder run
```shell
npm run dev
```

---

## Different parts

## 1. token_utils

token_utils gaves you the needed functions to interact with `view` methods of the contract. this methods are free to run, and can not change the state of the chain, and only are used to get a info from contract. you can get access to all contract's `view` methods like this : 
```js
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

```

## 2. Login system
you can use `near_auth.js` to manage your session with NEAR wallet. It provides `near_log_in` and `near_disconnect` which you can use like this : 
```js
import * as near_authentication from './near_utils/near_auth'

// Log in function, checks for previous login, and if the user is logged in, it will only return the account_id of the user, and does not attempt to log in again!
let account_id = near_authentication.near_log_in();
console.log("Logged in with user : " , account_id);

//Button click for disconnect
document.getElementById("disconnect").addEventListener("click" , ()=>{
    near_authentication.near_disconnect();
});

//Button click for connect (login)
document.getElementById("connect").addEventListener("click" , ()=>{
    let account_id = near_authentication.near_log_in();
    console.log("Logged in with user : ", account_id);
});
```

## 3. Record product
you can use `near_record.js` to record a product on the blockchain. It provides `near_record_product` which you can use like this : 
```js
import {near_record_product} from './near_utils/near_record'

let amount = 1230;
let price_in_usd = 103;
let product_name = "prod_test";
console.log("minted holder_id =>" , await near_record_product({ 
    "name" : "test product",
    "size" : "10",
    "color" : "red",
    "description" : "this is a test product",
    "image" : "https://ipfs.io ipfs hash"
    },
    product_name, price_in_usd, amount
));
```

## 4. Coming soon...
