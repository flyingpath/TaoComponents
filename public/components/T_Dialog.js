import React from 'react'

class T_Dialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: props.open
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        })
    }

    closeDialog(e) {
        if (e.target.id == 'tao-dialog-writeNote') {
            this.setState({
                open: false
            })
            if (this.props.closeFunc) {
                this.props.closeFunc()
            }
        }
    }

    render() {
        const open = this.state.open
        const styles = this.styles
        const body = this.props.children

        if (!open) {
            return <div style={{display: 'none'}}></div>
        } else {
            return (
                <div id='tao-dialog-writeNote' style={styles.overAll} onClick={this.closeDialog.bind(this)}>
                    <div id='tao-dialog-writeNoteBody' style={styles.body}>
                        {body}
                    </div>
                </div>
            )
        }
    }

    styles = {
        overAll: {
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            width: '100%',
            position: 'absolute', top: '34px', left: '0px', right: '0px',
            background: 'rgba(118, 95, 36, 0.86)',
            zIndex: '5',
            backgroundSize:'4px 4px',
            borderRadius:'10px',
            bottom: '0px',
        },
        body: {
            borderRadius:'5px',
            margin: '0 auto',
            width: '80%',
            padding: '15px 25px 15px 25px',
            height: '80%',
            fontFamily: 'arial, 微軟正黑體',
            overflowY: 'auto',
            background: '#fdf9f0',
            boxShadow: '0px 2px 10px 5px grey',
            position: 'relative'
        }
    }
}

T_Dialog.defaultProps = {
    open: false
}

export default T_Dialog
