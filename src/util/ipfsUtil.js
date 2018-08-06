import ipfsAPI from 'ipfs-api';
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

const addFile = (file) => {
    return new Promise((resolve, reject) => {
        // 读取文件
        let fr = new FileReader(); // 创建文件读取器

        // 设置监听
        fr.onloadend = (ev) => {
            console.log("读取完毕");
            // console.log(ev);
            const data = Buffer.from(fr.result); // Buffer
            console.log(data);
            // 上传文件 => Promise承诺
            ipfs.files.add(data)
                .then(files => {
                    const hash = files[0].hash
                    resolve(hash)
                })
                .catch(e => {
                    reject(e)
                })
        };

        // 把file读取到内存ArrayBuffer
        fr.readAsArrayBuffer(file)
    })
}
export { addFile };