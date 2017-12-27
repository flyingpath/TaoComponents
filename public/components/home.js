import React, { Component } from 'react'
import { observer } from 'mobx-react'
import mobx from 'mobx'
import _ from 'lodash'

import {T_RoundButton} from 'tao-components'
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
        let body = document.querySelector('#body')
        let text = body.innerHTML
        const replaceText = 'sword'
        text = text.replace(replaceText, `<span style="color:red">${replaceText}<span>`)
        body.innerHTML = text
    }
    render() {
        return (
            <div>
                <T_RoundButton />
            </div>
        )
    }
}

export default observer(Home)