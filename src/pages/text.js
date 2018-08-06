import React, {Component} from 'react';
import ipfsAPI from 'ipfs-api';
import { Button } from 'antd';


const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

class TextPage extends Component {

    constructor(props){
        super(props);
        this.state={
            PeerId:'',
            hash:'',
            inputHash:''

        }
    }


    componentDidMount() {
        ipfs.id((err, identity)=> {
            if(err){
                throw err
            }
            console.log(identity);
            this.setState({
                PeerId:identity.id,
                hash:'',
                inputHash:''
            })
        })
    }


    render() {
        const {hash, PeerId, inputHash} = this.state;
        return (
            <div>
                <h2>文本上传及获取</h2>
                <p>当前ipfs节点ID：{PeerId}</p>

                <div>
                    <h3>文本上传</h3>
                    <hr/>
                    <textarea cols="30" rows="10" ref={input=>this.inputNode= input} /><br/>
                    <button onClick={()=>{
                        let msg = this.inputNode.value;
                        let data = Buffer.from(msg,'utf-8');

                        ipfs.files.add(data,  (err, files) => {
                            if(err){
                                throw err;
                            }
                            console.log(files[0].hash);
                            this.setState({
                                hash: files[0].hash,
                                inputHash: files[0].hash,
                            });
                            // 'files' will be an array of objects containing paths and the multihashes of the files added
                        })

                    }}>添加</button>

                    {hash && <p>上传完毕, 当前Hash是{hash}</p>}
                </div>
                <div>
                    <h3>文本获取</h3>
                    <hr/>
                    <textarea disabled cols="30" rows="10" ref="outputArea"/><br/>
                    <input type="text" placeholder="请输入hash值" value={inputHash} onChange={(e) => {
                        this.setState({inputHash: e.target.value})
                    }}/>

                    <Button type="primary" onClick={() => {
                        const ipfsPath = inputHash;
                        console.log('input: ' + ipfsPath);

                        ipfs.files.cat(ipfsPath, (err, file) => {
                            if (err) {
                                throw err
                            }

                            let outputString = file.toString('utf8');
                            console.log(outputString)
                            this.refs.outputArea.value = outputString;
                        })
                    }}>获取</Button>
                </div>
            </div>
        );
    }
}

export default TextPage;
