import React from 'react' 
import _ from 'lodash' 

import { AutoSizer, Table, Column } from 'react-virtualized'
import 'react-virtualized/styles.css'

import '../css/VirtualTable.css'

class VirtualTable extends React.Component {
    constructor(props) {
        super(props)
        
        this.rawDataItem = props.dataItem
        this.columnData = _.isEmpty( this.rawDataItem )? [] : this.rawDataItem.tableColumns
        this.rawData = _.isEmpty( this.rawDataItem )? [] : this.rawDataItem.data
        this.rawDecodeData = this.decodeData(this.columnData, this.rawData)
        
        this.state = {
            data: this.rawDecodeData,
            sortBy: '',
            sortDirection: 'ASC'
        }
        // this._rowClassName = this._rowClassName.bind(this)
    }

    rowGetter = (props) => {
        const data = this.state.data
        return data[props.index]
    }

    getRowHeight  = () =>{
        return 50
    }

    search =(e)=>{
        const searchStr = e.target.value
        
        let data = this.rawDecodeData

        if ( !searchStr ){
            this.setState({
                data: data
            })
        }

        data = data.filter((eachData, idx)=>{
            if( !eachData.searchStr ){
                return false
            }else{
                if ( eachData.searchStr.indexOf(searchStr) >=0 ){
                    return true
                }else{
                    return false
                }
            }
        })

        this.setState({
            data: data
        })
    }

    onSort = (e) =>{
        const nowSort = this.state.sortDirection
        const sortedData = _.orderBy( this.state.data, [ e.sortBy ], [ nowSort === 'ASC'? "desc":"asc" ] )
        this.setState({
            data: sortedData,
            sortBy: e.sortBy,
            sortDirection: nowSort === 'ASC'? "DESC":"ASC"
        })
    }

    noRowsRenderer = () =>{
        return (
            <div>
                no row 
            </div>
        )
    }

    decodeData = (columnData, data) =>{
        
        return data.map( (eachData)=>{

            let searchStr = ''

            columnData.map( (eachColumn)=>{
                
                let value = eachData[ eachColumn.dataKey ]

                if ( eachColumn.falseDecode && !value ){
                    value = eachColumn.falseDecode
                }
        
                if ( eachColumn.trueDecode && value ){
                    value = eachColumn.trueDecode
                }
        
                if ( eachColumn.decodes[value] ){
                    value = eachColumn.decodes[value]
                }

                eachData[ eachColumn.dataKey ] = value

                searchStr += String(value)
            } )

            eachData.searchStr = searchStr

            return eachData
        } )

    }

    rowRenderer = (props) => {
        const columnData = this.state.columnData
        const data = this.state.data[ props.index ]

        const propsColumnData = props.columns

        return (
            <div 
                style={ props.style }
                className = {props.className + ' ' + this.props.rowClassName}
                key={props.key}
                aria-label = 'row'
                role="row"
                tabIndex = {0}
            >
                {
                    columnData.map( ( eachColumn, idx )=>{

                        let columnProps = _.cloneDeep(propsColumnData[idx].props)
                        columnProps.className = columnProps.className + ' ' + this.props.rowColumnClassName

                        return(
                            <div {...columnProps} key={idx}>
                                { data[ eachColumn.dataKey ] }
                            </div>
                        )
                    } )
                }
            </div>
        )
    }


    render() {

        if (!this.rawDataItem){
            return(
                <div>
                    沒有資料物件
                </div>
            )
        }
        
        const data = this.state.data
        const columnData = this.columnData

        const rowCount = data.length
        
        const height              = this.props.height
        const headerHeight        = this.props.headerHeight
        const overscanRowCount    = this.props.overscanRowCount
        const useDynamicRowHeight = true
        const disableHeader = false
        const hideIndexRow  = false
      
        console.log(this.state.sortDirection)

        return (
            <div className={this.props.outterDivClassName}>
            <div className={this.props.searchDivClassName}>
                <input type="text" onChange={this.search} className={this.props.searchInputClassName} />
            </div>
            <AutoSizer disableHeight>
                {({width}) => (
                <Table
                    className = { this.props.tableClassName }
                    width={width}
                    height={height}
                    disableHeader={disableHeader}
                    headerClassName={ this.props.headerClassName }
                    headerHeight={headerHeight}
                    
                    noRowsRenderer={this.noRowsRenderer}
                    overscanRowCount={overscanRowCount}
                    rowClassName={this._rowClassName}
                    rowHeight={ this.getRowHeight }
                    rowRenderer={ this.rowRenderer }
                    rowGetter = { this.rowGetter }
                    rowCount={rowCount}
                    
                    sort={this.onSort}
                    sortBy={this.state.sortBy}
                    sortDirection={this.state.sortDirection}
                >
                    {
                        columnData.map( (eachColumn, idx)=>{
                            return (
                                <Column
                                    label = {eachColumn.label}
                                    dataKey = {eachColumn.dataKey}
                                    disableSort={false}
                                    width={eachColumn.width}
                                    key={idx}
                                    headerClassName = "T_VirtualGridDiv_HeaderColumn"
                                />
                            )
                        } )
                    }
                </Table>
                )}
            </AutoSizer>
            </div>
        )
    }
}

VirtualTable.defaultProps={

    height: 600,
    headerHeight: 25,
    overscanRowCount: 4,
    
    outterDivClassName: 'virtualGridTableDiv',
    tableClassName: "virtualGridTable",
    headerClassName: "virtualGridTableHeader",
    tableClassName: "virtualGridTable",
    rowClassName: "T_VirtualGridDiv_Row",
    rowColumnClassName: "T_VirtualGridDiv_RowColumn",
    searchDivClassName: "searchDivClassName",
    searchInputClassName: "searchInputClassName",
    
    dataItem: {
        tableName: '出勤通知',

        tableColumns: [
            {
                label: '員編',
                dataKey: 'empno',
                trueDecode: null,
                falseDecode: null,
                width: 70,
                decodes: {
                }
            },
            {
                label: '姓名',
                dataKey: 'name',
                trueDecode: null,
                falseDecode: null,
                width: 70,
                decodes: {

                }
            },
            {
                label: '職稱',
                dataKey: 'title',
                trueDecode: null,
                falseDecode: null,
                width: 70,
                decodes: {
                    '主任': '是主任唷'
                }
            },
            {
                label: '是否有上班',
                dataKey: 'isWorkTime',
                trueDecode: '有',
                falseDecode: '無',
                width: 80,
                decodes: {
                }
            }
        ],


        data:[
            {
                "name": "戴文彬",
                "empno": "001961",
                "dept": "資訊部",
                "title": "主任",
                "isWorkTime": true,
            },
            {
                "name": "林俊偉",
                "empno": "002057",
                "dept": "資訊部",
                "title": "主任",
                "isWorkTime": true,
            }
        ],

        
    }
}

export default VirtualTable