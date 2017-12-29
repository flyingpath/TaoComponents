import React from 'react'
import ReactDOM from 'react-dom'

import RoundButtonGroup from './components/RoundButtonGroup'
import DragPage from './components/DragPage'
import Dialog from './components/Dialog'

class RenderForcer extends React.Component {
    render() {
        return (
            <div style={{height:'100%', width: '100%', overflow:'hidden' }}>
                <Dialog>
                    <div>
                        content
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default RenderForcer
