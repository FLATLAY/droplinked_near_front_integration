import { walletConnection, walletConnectionMainnet } from "./near_auth";
import { get_near_price_ratio } from "./near_price";
import { generate_memo } from "./memo_gen";
let add_zeros = (number, zeros, prefix_zeros) => {
    if (zeros <= prefix_zeros){
        return (number* Math.pow(10, zeros)).toString();
    }
    number = number * Math.pow(10, prefix_zeros);
    let number_string = Math.floor(number).toString();
    for (let i=0; i<zeros - prefix_zeros; i++){
        number_string += "0";
    }
    return number_string;
}

let near_assets = {
    "testnet" : {
        "usdc.fakes.testnet": {    
            "price": "0.999789",
            "decimal": 6,
            "symbol": "USDC"
        }
    },
    "mainnet" : {
        "usn" : {
            "price": "1.001",
            "decimal": 18,
            "symbol": "USN"
        },
        "usdt.tether-token.near":{
            "price": "1.001",
            "decimal": 6,
            "symbol": "USDt"
        }
    }
}

async function payment1(from_account, to_account, amount, token_contract_id=null,network = "testnet"){
    if(token_contract_id!=null){
        let wC = walletConnection;
        if (network == "mainnet"){
            wC = walletConnectionMainnet;
        }
        let memo = generate_memo();

        // TODO: keep track of memo in back end to verify payment
        // -- send memo to backend and store it in database
        // -- when user completes payment, send memo to backend and check if it matches
        // -- if it matches, then payment is valid

        await wC.account().functionCall({contractId : token_contract_id, methodName : "ft_transfer", args : {
            receiver_id: to_account,
            amount: add_zeros(amount, near_assets[network][token_contract_id].decimal, 6),
            memo : memo.hash
        }, attachedDeposit : 1}).status;
    }
    let ratio = await get_near_price_ratio(amount);
    let near_amount = ratio;
    let result = await from_account.sendMoney(to_account, near_amount);
    return result;
}

export {payment1};