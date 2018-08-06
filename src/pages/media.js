import React, {Component} from 'react';
import {addFile} from '../util/ipfsUtil'

class Media extends Component {

    constructor(props){
        super(props);
        this.state = {
            hash: "",
            inputHash: ""
        }
    }

    render() {
        const {hash ,inputHash} = this.state;
        return (
            <div>
                <h2>多媒体上传&获取</h2>
                <div>
                    <h2>多媒体上传</h2><hr/>
                    <fieldset>
                        <legend>请选择文件: </legend>
                        <input type="file" multiple ref={input => this.fileInput = input}/>
                    </fieldset>

                    <button onClick={() => {
                        let files = this.fileInput.files;
                        // console.log(files);
                        const file = files[0];

                        addFile(file)
                            .then(hash => {
                                this.setState({hash, inputHash: hash})
                            })
                            .catch(e => console.error(e))


                    }}>上传多媒体</button>

                    {hash && <p>多媒体Hash: {hash}</p>}

                </div>
                <div>
                    <h2>多媒体播放</h2><hr/>
                    <input type="text" placeholder='请输入媒体hash' value={inputHash}
                           onChange={(e) => this.setState({inputHash: e.target.value})}/>

                    <button onClick={() => this.setState({hash: inputHash})}>查看媒体</button>

                    {
                        hash && (
                            <div>
                                <video controls src={`http://127.0.0.1:8080/ipfs/${hash}`}/>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Media;