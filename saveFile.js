const projectId = process.env.INFURA_IPFS_PROJECT_ID
const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET
const projectIdAndSecret = `${projectId}:${projectSecret}`

async function ipfsClient() {
    const { create } = await import('ipfs-http-client')
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
            headers: {
                "Authorization": `Basic ${Buffer.from(projectIdAndSecret).toString("base64")}`
        }
    });
    return ipfs;
}

async function saveFile() {

    let ipfs = await ipfsClient();


    let data = {
        name:"test",
        description:"test",
        image:"test"
    }


    let options = {
        warpWithDirectory: true,
        progress: (prog) => console.log(`Saved :${prog}`)
    }
    let result = await ipfs.add({path:"hash.json",content:JSON.stringify(data)},options);
    let hash = result.cid.toString();
    console.log(`https://ipfs.io/ipfs/${hash}`);
    return hash;
}
saveFile()
