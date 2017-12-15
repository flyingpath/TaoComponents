import React from 'react' 
import {observer} from 'mobx-react' 
import mobx from 'mobx' 
import _ from 'lodash' 
import { Observable } from 'rxjs' 
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import styled, {keyframes, injectGlobal} from 'styled-components'

import '../css/dragPage.css'

class DragPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transX: 0,
            open:true
        }
        this.handleClick = this.handleClick.bind(this)
        this.x
    }

    handleClick() {
        
    }

    componentDidMount(){
        const leftColumn = document.querySelector('#leftDragColumnTao')
        const touchStartEvent = Observable.fromEvent(leftColumn, 'touchstart')
        const touchMoveEvent = Observable.fromEvent(leftColumn, 'touchmove')
        const touchEndEvent = Observable.fromEvent(leftColumn, 'touchend')
                                .map( e=> {
                                    if ( this.x>50 ){
                                        this.setState({ open: false })
                                    }else{
                                        this.setState({
                                            transX: 0
                                        })
                                    }
                                })

        const observerSlide = touchStartEvent
            .switchMap(
                (e) => {
                    this.x = e.touches[0].clientX
                    return touchMoveEvent.takeUntil(touchEndEvent)
                })

        observerSlide.subscribe((e) => {
            const startX = this.x
            const endX = e.touches[0].clientX
            const pathLength = this.state.transX + (endX-startX)
            if (pathLength > 0 && endX > 0){
                this.setState({
                    transX: pathLength
                })
            }
            this.x = endX
        })
    }

    render() {
        let renderPage = null

        if(this.state.open){
            renderPage=(
                <div
                    key='slideBody'
                    style={
                        {            
                            height:'100%',
                            width:'100%',
                            backgroundColor:'#8787ff',
                            transform:`translateX(${this.state.transX}px)`
                        }
                    }
                >
                    <div 
                        id="leftDragColumnTao" 
                        style={
                            {            
                                height:'100%',
                                width:'50px',
                                border:'1px solid'
                            }
                        }/>
                    {this.props.children}
                </div>
            )
        }

        return (
            <ReactCSSTransitionGroup
                transitionName='card_recordSlide'
                transitionEnterTimeout={10000}
                transitionLeaveTimeout={10000}
            >
                {renderPage}
            </ReactCSSTransitionGroup>
            
        )
    }
}

DragPage.defaultProps={

}

export default observer(DragPage)