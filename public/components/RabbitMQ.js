import React from 'react' 
import Stomp from 'stompjs'
import _     from 'lodash' 

class RabbitMQ extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textList: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        const ws = new WebSocket('ws://172.16.254.142:15674/ws');
        const client = Stomp.over(ws);
        const on_connect = () => {
            console.log('connected');
            client.subscribe(
                "/queue/test", 
                (d) => {
                    this.setState( { textList: this.state.textList.concat( [d.body] ) } )
                },
                {
                    durable: false
                }
            );
        }
        const on_error =  function() {
            console.log('error');
        }
        client.connect('guest', 'guest', on_connect, on_error, '/')
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        return (
            <div>
                {this.state.textList.join('\n')}
            </div>
        )
    }
}

export default RabbitMQ