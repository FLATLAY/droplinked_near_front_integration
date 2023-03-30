import * as near_authentication from './near_utils/near_auth'
import * as near_utils from './near_utils/utils'
import * as token_utils from './near_utils/token_utils'
import {near_record_product} from './near_utils/near_record'

let account_id = near_authentication.near_log_in();
console.log("Logged in with user : " , account_id);

document.getElementById("disconnect").addEventListener("click" , ()=>{
    near_authentication.near_disconnect();
});

document.getElementById("connect").addEventListener("click" , ()=>{
    near_authentication.near_log_in();
});
