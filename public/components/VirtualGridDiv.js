import React from 'react' 
import _ from 'lodash' 
import moment from 'moment'

import { AutoSizer, Table, Column } from 'react-virtualized'
import 'react-virtualized/styles.css'

import '../css/VirtualTable.css'

class VirtualTable extends React.Component {
    constructor(props) {
        super(props)
        
        this.columnData    = []
        this.rawData       = []

        this.rawDecodeData = []
        this.mode = 'big'
        
        this.state = {
            rawDataItem  : {},
            columnData   : [],
            rawData      : [],
            rawDecodeData: [],
            data         : [],
            sortBy       : '',
            sortDirection: 'ASC',
            height       : window.innerHeight<700? 500:props.height
        }
    }

    static decodeData(columnData, data){
        
        return data.map( (eachData)=>{

            let searchStr = ''

            columnData.map( (eachColumn)=>{

                let value = eachData[ eachColumn.dataKey ]
                
                if ( eachColumn.falseDecode && !value ){
                    value = eachColumn.falseDecode
                } else if ( eachColumn.trueDecode && value ){
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

    static getDerivedStateFromProps(nextProps, prevState){

        const rawDataItem = nextProps.dataItem || {}
        let columnData  = _.isEmpty( rawDataItem )? [] : rawDataItem.tableColumns
        const rawData     = _.isEmpty( rawDataItem )? [] : rawDataItem.data

        if (window.innerWidth < 700){
        
        //---- 響應示不出現的 column ----//
            const notMatterList = [
                '員編', '部門', '職稱', '上班卡'
            ]
            columnData = columnData.filter( (x)=>{
                return !(notMatterList.indexOf(x.label) > -1)
            } )
        }
        //----------------------------//

        const rawDecodeData = T_Table.decodeData(columnData, rawData)
        
        return {
            rawDataItem  : rawDataItem,
            columnData   : columnData,
            rawData      : rawData,
            rawDecodeData: rawDecodeData,
            data         : rawDecodeData,
            sortBy       : '',
            sortDirection: 'ASC'
        }
    }

    componentDidMount(){
        this.reSizeData()
        window.onresize = () => {
            if(window.innerWidth<700 && this.mode=='big'){
                this.reSizeData()
                this.mode = 'small'
            }else if (window.innerWidth>700 && this.mode=='small'){
                this.reSizeData()
                this.mode = 'big'
            }
        } 
    }

    reSizeData(){
        if (window.innerWidth<700){
        //---- 響應示不出現的 column ----//
            const notMatterList = [
                '員編', '部門', '職稱', '上班卡'
            ]
        //----------------------------//
            
            const newTableColumn = this.state.columnData.filter( (x)=>{
                return !(notMatterList.indexOf(x.label) > -1)
            } )
            
            this.setState({
                columnData: newTableColumn
            })
        }else{
            this.setState({
                columnData: _.isEmpty( this.state.rawDataItem )? [] : this.state.rawDataItem.tableColumns
            })
        }

        if(window.innerHeight<700){
            this.setState({
                height: 500
            })
        }else{
            this.setState({
                height: this.props.height
            })
        }
    }

    rowGetter = (props) => {
        const data = this.state.data
        return data[props.index]
    }

    getRowHeight  = () =>{
        return 80
    }

    search =(e)=>{
        const searchStr = e.target.value
        
        let data = this.state.rawDecodeData

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
            <div style={{width:'100%', textAlign:'center', color: 'gray'}}>
                {this.props.noRowsRenderer }
            </div>
        )
    }

    rowRenderer = (props) => {
        const columnData = this.state.columnData
        const data = this.state.data[ props.index ]

        const propsColumnData = props.columns

        let rowClassName = props.className + ' ' + this.props.rowClassName
        if ( !props.rowData.isOnline ){
            rowClassName += ' isOffLine'
        }

        return (
            <div 
                style={ props.style }
                className = {rowClassName}
                key={props.key}
                aria-label = 'row'
                role="row"
                tabIndex = {0}
            >
                {
                    columnData.map( ( eachColumn, idx )=>{

                        let columnProps = _.cloneDeep(propsColumnData[idx].props)
                        
                        columnProps.className = columnProps.className + ' ' + this.props.rowColumnClassName

                        if (eachColumn.dataKey ==='isRest' && data.isRest){
                            const start = moment(data.rest.start, 'YYYYMMDDHHmm')
                            const end   = moment(data.rest.end, 'YYYYMMDDHHmm')
                            columnProps.title = start.format('MM/DD HH:mm') + '\n' + end.format('MM/DD HH:mm')
                        }

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

        if (!this.state.rawDataItem){
            return(
                <div >
                    沒有資料物件
                </div>
            )
        }
        
        const data = this.state.data
        const columnData = this.state.columnData

        const rowCount = data.length
        
        const headerHeight        = this.props.headerHeight
        const overscanRowCount    = this.props.overscanRowCount
        const useDynamicRowHeight = true
        const hideIndexRow  = false
        return (
            <div className={this.props.outterDivClassName}>
            <div className={this.props.searchDivClassName}>
                <input type="text" onChange={this.search} className={this.props.searchInputClassName} />
            </div>
            <AutoSizer disableHeight>
                {({width} ) => (
                <Table
                    ref="Table"
                    className = { this.props.tableClassName }
                    width={width}
                    height={this.state.height}
                    headerClassName={ this.props.headerClassName }
                    headerHeight={headerHeight}
                    
                    rowRenderer={ this.rowRenderer }
                    noRowsRenderer={this.noRowsRenderer}
                    overscanRowCount={overscanRowCount}
                    rowHeight={ this.getRowHeight }
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

T_Table.defaultProps={

    height: 800,
    headerHeight: 80,
    overscanRowCount: 4,
    
    outterDivClassName  : 'virtualGridTableDiv',
    tableClassName      : "virtualGridTable",
    headerClassName     : "virtualGridTableHeader",
    tableClassName      : "virtualGridTable",
    rowClassName        : "T_VirtualGridDiv_Row",
    rowColumnClassName  : "T_VirtualGridDiv_RowColumn",
    searchDivClassName  : "searchDivClassName",
    searchInputClassName: "searchInputClassName",
    noRowsRenderer      : "沒有所屬員工",
    dataItem: {
    }
}

export default T_Table