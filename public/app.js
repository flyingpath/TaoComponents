import React from 'react'
import ReactDOM from 'react-dom'

import RoundButtonGroup from './components/RoundButtonGroup'
import DragPage from './components/DragPage'
import Dialog from './components/Dialog'
import VirtualGridDiv from './components/VirtualGridDiv'

import testData from './stores/testData'

import _ from 'lodash'

class RenderForcer extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    handleClick = ()=>{
        this.fetch()
    }

    fetch(){
        fetch('https://google.tw')
            .then(x=>x.json)
            .then(x=>{
                this.setState({
                    dataItem: testData
                })
            })
            .catch(x=>{
                console.log('1')
                    this.setState({
                        dataItem: testData
                    }) 
                }
            )
    }
    
    render() {
        return (
            <div style={{height:'100%', width: '100%', overflow:'hidden' }}>
                <VirtualGridDiv dataItem={this.state.dataItem} />
                <button onClick={this.handleClick} >test</button>
            </div>
        )
    }
}

export default RenderForcer
