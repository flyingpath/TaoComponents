import React from 'react'
import ReactDOM from 'react-dom'

import Home from './components/home'

class RenderForcer extends React.Component {
    render() {
        return (
            <div style={{margin:'100px'}}>
                <Home />
            </div>
        )
    }
}

export default RenderForcer
