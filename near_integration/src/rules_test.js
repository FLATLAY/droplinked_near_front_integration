import {getMaxDiscount , gatedPassesRules} from './near_utils/near_gating'
let ruleset = {
    "rules":[
    {
        "addresses": [ 
            "nft.greedygoblins.near" 	
        ],
        "discountPercentage": 10,
        "nftsCount": 1,
        "description": "description",
        "_id": "637a043fa0581bf9d5c568c5"
    },
    {
        "addresses": [
            "nft.greedygoblins.near"
        ],
        "discountPercentage": 100,
        "nftsCount": 2,
        "description": "description",
        "_id": "637a043fa0581bf9d5c568c5"
    },
],
"redeemedNFTs" : [],
"gated" : false
};

let account_hash = "timor.near";

let max_discount = await getMaxDiscount(account_hash,ruleset);
console.log("Max discount percentage : " , max_discount.discountPercentage);
console.log("NFTs passed : " , max_discount.NFTsPassed);

let ruleset2 =  {
    "_id": "636b61c5422f885bc43bacf0",
    "collectionID": "636ac267913374ba96de3d0b",
    "rules": [
        {
            "addresses": [
                "nft.greedygoblins.near",
            ],
            "discountPercentage": null,
            "nftsCount": 2,
            "description": "asdfasdf",
            "_id": "63c549c4a2bf46798e499531"
        }
    ],
    "redeemedNFTs": [],
    "gated": true,
    "ownerID": "636ac1e6a8a01cfc350ac117",
    "webUrl": "behdad.com",
    "createdAt": "2022-11-09T08:16:05.360Z",
    "updatedAt": "2023-01-16T12:57:40.669Z",
    "__v": 0
};

if (await gatedPassesRules(account_hash, ruleset2)){
    console.log("You can pass the gate")
}else{
    console.log("You can't pass the gate")
}
