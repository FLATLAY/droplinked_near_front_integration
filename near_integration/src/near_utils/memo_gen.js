import {sha256} from 'js-sha256'
let generate_memo = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    let hash = sha256(text);
    return {"memo" : text, "hash" : hash};
}
export {generate_memo}