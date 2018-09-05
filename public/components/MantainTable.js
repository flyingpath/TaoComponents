import React from 'react' 
import _ from 'lodash' 
import qs from "qs"

class MaintainTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listColumnName: [],
            listData: [],
            newData: {},
            columnWidth: props.columnWidth
        }
    }

    componentDidMount(){
    }

    static getDerivedStateFromProps( nextProps, preState ){
        if (
            preState.listColumnName != nextProps.listColumnName 
            && preState.listData != nextProps.listData 
        ){
            return {
                listColumnName:nextProps.listColumnName,
                listData:nextProps.listData,
                newData: {}
            }
        } else {
            return null
        }
    }

    onChangeInput = (rowIdx, key) => {
        return (e) => {
            const value = e.target.value 
            
            let newListData = _.cloneDeep(this.state.listData) 
            newListData[rowIdx][key] = value

            this.setState({
                listData: newListData
            })
        }
    }

    columnRender = (columns, rowData, rowIdx) => {
        return columns.map( ( each, idx )=>(
            <div key={`MTTD${rowIdx}${idx}`} style={{ width: this.state.columnWidth }} >
                <input 
                    value={ rowData[ each.value ] } 
                    onChange={this.onChangeInput(rowIdx, each.value) } 
                    className = "input"
                />
            </div>
        ) )
    }

    rowRender = (columnData, data) => {
        return data.map( (each, idx)=>(
            <div className = "flex-row" key={`MTTR${idx}`}>
                { this.columnRender(columnData, each, idx) }
                <div onClick={ this.deleteRow(idx) } >delete</div>
            </div>
        ) )
    }

    addRowRender = (columns) =>{
        const data = this.state.newData

        return columns.map( ( each, idx )=>(
            <div key={`MTADDTD$${idx}`} className = "table-column" >
                <input 
                    value = { each.value in data? data[ each.value ]:'' } 
                    onChange = { (e)=>{
                        let newData = _.cloneDeep(data)
                        newData[each.value] = e.target.value
                        this.setState({
                            newData: newData
                        })
                    }}
                    className = "input"
                />
            </div>
        ) )
    }

    deleteRow = (index) => {
        return (e)=>{
            let newData = _.cloneDeep(this.state.listData)
            newData.splice( index, 1 )
            this.setState({
                listData: newData
            })
        }
    }

    addRow = () => {

        const data = _.cloneDeep(this.state.newData)
        const columnData = this.state.listColumnName

        _.forEach(columnData, (each, idx)=>{
            if ( !(each.value in data) ){
                data[each.value] = null
            }
        })

        let newData = _.cloneDeep(this.state.listData)
        newData.push( this.state.newData )

        this.setState({
            listData: newData,
            newData : {}
        })
    }

    save = () => {
        const data = this.state.listData
        console.log(data)
        this.props.onSave(data)
    }

    render() {
        return (
            <div className='AppBody'>
            <div className='table' >
                <div>
                    <div className = "flex-row">
                        { this.state.listColumnName.map( (each, idx)=>(
                            <div className = "table-column" key = { idx } >
                                {each.label}
                            </div>
                        ) ) }
                    </div>
                        {
                            this.rowRender( this.state.listColumnName, this.state.listData )
                        }
                    <div className = "flex-row">
                        {
                            this.addRowRender( this.state.listColumnName )
                        }
                    </div>
                </div>
                <div 
                    style   = {{ position:'absolute', bottom:'0px', right: '-30px' }}
                    onClick = { this.addRow }
                >
                    add
                </div>
            </div>
            <button onClick = {this.save}>存檔</button>
            <style jsx>{`
                .table {
                    position: relative; 
                    width: fit-content;
                }
                .AppBody :global(.flex-row) {
                    display: flex;
                    flex-direction: row;
                }
                .AppBody :global(.table-column) {
                    width: ${this.state.columnWidth}px
                }
                .AppBody :global(.input) {
                    width: ${this.state.columnWidth}px
                }
            `}</style>
            </div>
        )
    }
}

MaintainTable.defaultProps = {
    listColumnName: [
        {
            "label": "名稱",
            "value": "label"
        },
        {
            "label": "代碼",
            "value": "value"
        }
    ],
    listData: [
        {
            "label": "R1",
            "value": "R1",
            "order": 1
        },
        {
            "label": "R9",
            "value": "R8",
            "order": 9
        }
    ],
    onSave: () =>{

    },
    columnWidth: 100
}
export default MaintainTable