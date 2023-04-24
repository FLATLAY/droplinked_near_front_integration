import axios from "axios";
async function get_near_price_ratio(usd_amount){
    let now = new Date();
    let now_unix = Math.floor(now.getTime()/1000);
    let yesterday_unix = now_unix - 86400;
    let url = `https://pro-api.coingecko.com/api/v3/coins/near/market_chart/range?vs_currency=usd&from=${yesterday_unix}&to=${now_unix}&x_cg_pro_api_key=CG-RNzPJmPbJXtnJGtx8Y38Zd4g`;
    let response = await axios.get(url);
    let data = response.data;
    let prices = data.prices;
    let latest_price = prices[prices.length-1][1];
    let ratio = usd_amount/latest_price;
    return BigInt(Math.floor(ratio*100000000000000).toString()+"0000000000");
}
export {get_near_price_ratio};
