// run `npm i nft.storage` for this to work
import {NFTStorage} from "nft.storage";
const client = new NFTStorage({ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ1MjMzMDAzNDY0YzcyNkNhY2QyOEIyMTkyYWFBNDdhMDg2MmJmQzUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTE3NzYwNzI1NywibmFtZSI6ImRyb3BsaW5rZWRfTkZUIn0.B44NWDZ7GAORBwXB36hLEw3VuWG8tOYRl8g6QNOUv-Q" });
export async function uploadToIPFS(metadata) {
    if (typeof(metadata) == typeof({}) || typeof(metadata) == typeof([])){
        metadata = JSON.stringify(metadata);
    }
    const ipfs_hash = await client.storeBlob(new Blob([metadata]));
    return ipfs_hash.toString();
}