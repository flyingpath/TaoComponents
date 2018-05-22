import React from 'react' 
import {observer} from 'mobx-react' 
import mobx from 'mobx' 
import _ from 'lodash' 

class UploadFile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    onUpload = (e) => {
        const url = 'http://127.0.0.1:7555/service'

        console.log(e.target.files)

        let formData = new FormData()
        formData.append('file',e.target.files[0])
        formData.append('api','aaaa')

        let headers = new Headers();
        headers.append("Content-Type", "multipart/form-data")
        headers.append("Accept", "application/json")

        fetch(url, { 
            credentials:'include' ,
            method: 'POST',
            body: formData
            // body: JSON.stringify(bodyData)
        })
        .then( (x)=>x.json() )
        .then( ( backdata ) =>{} )
    }



    render() {
        return (
            <div>
                <input onChange={this.onUpload} type='file' />
            </div>
        );
    }
}

export default observer(UploadFile)