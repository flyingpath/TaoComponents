import React from 'react'
import ReactDOM from 'react-dom'

import RoundButtonGroup from './components/RoundButtonGroup'

class RenderForcer extends React.Component {
    render() {
        return (
            <div style={{margin:'100px'}}>
                <RoundButtonGroup />
            </div>
        )
    }
}

export default RenderForcer
