import React, { Component } from 'react'
import { observer } from 'mobx-react'
import mobx from 'mobx'
import _ from 'lodash'

import {T_RoundButtons} from 'tao-components'
import dataStore from '../stores/data'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.clickSend = this.clickSend.bind(this)
    }
    clickSend(){
    }

    componentDidMount(){
    }
    render() {
        return (
            <div>
                <T_RoundButtons />
            </div>
        )
    }
}

export default observer(Home)