import React from 'react'
import ReactDOM from 'react-dom'

import RoundButtonGroup from './components/RoundButtonGroup'
import DragPage from './components/DragPage'
import Dialog from './components/dialog/Dialog'
import VirtualGridDiv from './components/VirtualGridDiv'
import CheckBoxes from './components/check-boxes/CheckBoxes'
import UploadFile from './components/UploadFile'
import FreeTextWithSnippet from './components/FreeTextWithSnippet'
import RabbitMQ from './components/RabbitMQ'
import MantainTable from './components/MantainTable'

import testData from './stores/testData'

import _ from 'lodash'

class RenderForcer extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    handleClick = ()=>{
    }

    render() {
        return (
            <div style={{height:'100%', width: '100%', overflow:'hidden' }}>
                <MantainTable />
                <Dialog onBackClick={ (e)=>{console.log(e)} } />
            </div>
        )
    }

    // render() {
    //     return (
    //         <div style={{height:'100%', width: '100%', overflow:'hidden' }}>
    //             <FreeTextWithSnippet />
    //         </div>
    //     )
    // }
        
    // <RabbitMQ />
    // render() {
    //     return (
    //         <div style={{height:'100%', width: '100%', overflow:'hidden' }}>
    //             <CheckBoxes uni withOther onChange={ (data)=>{console.log(data)} } />
    //             <UploadFile />
    //         </div>
    //     )
    // }

    // render() {
    //     return (
    //         <div style={{height:'100%', width: '100%', overflow:'hidden' }}>
    //             <VirtualGridDiv dataItem={testData} />
    //         </div>
    //     )
    // }

}

export default RenderForcer
