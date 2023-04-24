import { payment1 } from "./near_utils/near_payment";
import {walletConnection, walletConnectionMainnet } from './near_utils/near_auth' 
import {} from './near_utils/url_handler'

// Create pay button & add event listener to it, then append it to body
const payButton = document.createElement('button');
payButton.textContent = 'Pay';
payButton.addEventListener('click' , async ()=>{
    console.log(await payment1(walletConnection.account(), "k3rn3lpanicc.testnet", 1.0))
})
document.body.appendChild(payButton);
// --------------------------------------------------

