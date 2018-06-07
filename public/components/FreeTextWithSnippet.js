import React from 'react'
import {Editor, EditorState, SelectionState, RichUtils, Modifier, ContentState} from 'draft-js'
import _ from 'lodash'
import * as mobx from 'mobx' 
import similarS from 'similarity'

import 'draft-js-mention-plugin/lib/plugin.css'
import '../css/FreeTextWithSnippet.css'

class SnippetDiv extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    processing = ( snippetList, searchStr ) => {
        
        // const searchReValue = value.toUpperCase().replace(/\./g, '\\.')

        if (searchStr.trim() === ''){
            return []
        }

        const re = new RegExp(`^${searchStr}.*`)
        
        let fData = _.filter(snippetList, (eachdata) => {
            const key = eachdata.shortCut
            return key.toUpperCase().indexOf(searchStr.toUpperCase()) > -1
        })
        
        fData = fData.sort((a, b)=>{
            return -similarS(searchStr, a.shortCut) + similarS(searchStr, b.shortCut)
        })

        fData = fData.sort((a, b)=>{
            if (!b.shortCut.toUpperCase().match(re)){
                return -1
            }else {
                if(a.shortCut.toUpperCase().match(re)){
                    return -1
                }else {
                    return 1
                }
            }
        })

        return fData
    }

    render() {

        const snippetList = this.props.snippet
        const searchStr   = this.props.searchStr

        const snippet = this.processing( snippetList, searchStr )

        if ( snippet.length === 0 ){
            return null
        }

        return (
            <div className = 'snippetDiv'>
                {
                    _.map( snippet, (eachdata, idx)=>{
                        return <div key={ idx } className="snippetItemDiv" >{ eachdata.shortCut }</div>
                    } )
                }
            </div>
        )
    }

}

class FreeTextWithSnippet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState:  props.defaultText?EditorState.createWithContent(ContentState.createFromText(props.defaultText))
                         :EditorState.createWithContent(ContentState.createFromText('')),
            pureText        : '',
            snippetList     : [],
            snippetPosition : {
                left  : null,
                right : null,
                top   : null,
                bottom: null
            },
            openSnippetHint: true,
            searchStr: ''
        }

        this.editor = null
        this.draftBody = null

        this.personalSnippet = []
        this.openSnippetHint = true
        this.searchStr = ''
        this.hash = []
        
        this.tabListener = null
        this.shiftListener = null
        this.pasteListener = null
        
        this.copyCursor= null
        this.StyleMap={
            'gray': {
                color: 'gray',
            },
            'noStyled':{
            }
        }

        this.fontHeight = 16
    }
    
    componentDidMount() {
        const draftBody    = this.draftBody
        this.tabListener   = draftBody.addEventListener('keydown', this.keyDownFn)
        this.shiftListener = draftBody.addEventListener('keyup', this.keyUpFn)
        this.pasteListener = draftBody.addEventListener('paste', this.handlePaste)


        fetch(`https://emr.kfsyscc.org/python/note-get_snipp/001965`, {credentials: 'include'})
        .then(response => response.json())
        .then(backdata => {
            let tempArray = []

            const rawData = _.map(backdata, (eachdata, idx) => {
                let data = {}
                data.shortCut = eachdata.PHR_CODE
                data.name = eachdata.CONTENTS
                if (tempArray.indexOf(data.name) > -1) {
                    data.name += ' '
                }
                tempArray.push(data.name)
                return data
            })
            
            this.personalSnippet = rawData
            
            this.setState( { 
                snippetList: this.personalSnippet 
            } )
            
            console.log(rawData)
        })
    }
    
    componentWillReceiveProps(nextProps){
        if (this.props.defaultText != nextProps.defaultText ){
            if (nextProps.defaultText){
                const selection = this.state.editorState.getSelection()
                const nowContentState = this.state.editorState.getCurrentContent()
                const nextContentState = Modifier.insertText(nowContentState, selection, nextProps.defaultText)
                const nextEditorState = EditorState.push(
                    this.state.editorState,
                    nextContentState,
                    'insert-characters'
                )
                this.setState({
                    editorState: nextEditorState
                })
            }
        }
        if ( nextProps.paste ) {
            if( this.props.paste != nextProps.paste ){
                this.focus()
                this.handlePaste(nextProps.paste)
            }
        }
    }

    handlePaste = (text) => {
        if (!text){
            return 'handled'
        }
        if (typeof(text) == 'object'){
            return 'handled'
        }
        let editorState = this.state.editorState

        const nowContentState = editorState.getCurrentContent()
        let selection = this.state.editorState.getSelection()

        const styleName = OrderedSet.of('gray')
        let nextContentState, nextEditorState
        
        if (!selection.isCollapsed()){
            nextContentState = Modifier.replaceText(nowContentState, selection, text, styleName)
            nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'replace-characters'
            )
        }else{
            nextContentState = Modifier.insertText(nowContentState, selection, text, styleName)
            nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'insert-characters'
            )
        }

        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, 'gray')
        nextEditorState = EditorState.setInlineStyleOverride(nextEditorState, OrderedSet.of('noStyled'))
        this.setState({ 
            editorState: nextEditorState
        })
        this.props.onChange(editorState.getCurrentContent().getPlainText()+text)
        return 'handled'
    }

    keyDownFn = (e) => {
        if (e.which == 9) {
            e.preventDefault()
        }
        if (e.which == 16) {
            this.isShift = true
        }
        if (e.which == 40) {
            let MentionDiv = document.querySelector('.draftjsWithMention>div:nth-child(2)')
            if(MentionDiv){
                const oriScrollTop = MentionDiv.scrollTop
                if (oriScrollTop == 0){
                    MentionDiv.scrollTop += 1
                }else{
                    MentionDiv.scrollTop += 35
                }
            }
        }
        if (e.which == 38) {
            let MentionDiv = document.querySelector('.draftjsWithMention>div:nth-child(2)')
            if(MentionDiv){
                const oriScrollTop = MentionDiv.scrollTop
                if (oriScrollTop-35< 0){
                    MentionDiv.scrollTop = 0
                }else{
                    MentionDiv.scrollTop -= 35
                }
            }
        }
    }
    
    keyUpFn = (e) => {
        if (e.which == 16) {
            this.isShift = false
        }
        this.getCursorPosition()
    }

    // 決定要不要展開搜尋格
    toggleSnippetOptions = (editorState) => {
        const textSelection  = editorState.getSelection()
        const currentContent = editorState.getCurrentContent()
        const currentContentText = currentContent.getPlainText()
        const preContentText = this.state.editorState.getCurrentContent().getPlainText()
        const currentContentBlock = currentContent.getBlockForKey( textSelection.getStartKey() )
        const currentContentBlockText = currentContentBlock.getText()

        // 沒改變就不要有
        if ( currentContentText === preContentText ){
            this.openSnippetHint = false

        } else {

            if ( currentContentBlockText.length > 1 ){

                
                const startKey = textSelection.getStartOffset()
                const preText  = currentContentBlockText.substring( startKey - 1 , startKey )
                console.log(startKey)
                console.log(currentContentBlockText)
                
                if ( preText !== ' ' ){
                    const isEnd = (startKey === currentContentBlockText.length)? true : false
                    const isBeforeSpace = (currentContentBlockText.substring( startKey, startKey +1 ) === ' ')? true : false
    
                    if ( isEnd || isBeforeSpace ){
                        this.openSnippetHint = true
                    } else {
                        this.openSnippetHint = false
                    }
                
                } else {
                    this.openSnippetHint = false
                
                }
            }
            // 沒字不要有
            else if ( currentContentBlockText.length === 0 ){
                this.openSnippetHint = false

            // 第一個字 always 要有
            } else {
                this.openSnippetHint = true
            }
        }
    }
    
    setSearchStr = (editorState) =>{
        const textSelection  = editorState.getSelection()
        const currentContent = editorState.getCurrentContent()
        const currentContentText = currentContent.getPlainText()
        const currentContentBlock = currentContent.getBlockForKey( textSelection.getStartKey() )
        const currentContentBlockText = currentContentBlock.getText()
        
        const preContentText = this.state.editorState.getCurrentContent().getPlainText()
        

        if ( currentContentText === preContentText ){
            this.searchStr = ''

        } else {

            if ( currentContentBlockText.length > 0 ){
                const startKey = textSelection.getStartOffset()
                const preText  = currentContentBlockText.substring( startKey - 1 , startKey )
                
                console.log(preText)
                if ( preText === ' ' ){
                    this.searchStr = ''
                
                } else {
                    const lastSpace = currentContentBlockText.lastIndexOf(' ')
                    this.searchStr = currentContentBlockText.substring( lastSpace, startKey ).trim()
                    console.log(this.searchStr)
                
                }
            } else {
                this.searchStr = ''
            }
        }
    } 

    onChange = (editorState) => {

        // console.log('anchorOffset', window.getSelection().anchorOffset  )
        // console.log('focusNode',    window.getSelection().focusNode  )
        // console.log('focusOffset',  window.getSelection().focusOffset  )
        // console.log('isCollapsed',  window.getSelection().isCollapsed )
        // console.log('rangeCount',   window.getSelection().rangeCount  )
        // console.log('range',   window.getSelection().getRangeAt(0)  )
        // console.log('getStartKey',editorState.getSelection().getStartKey())
        // console.log('getStartOffset',editorState.getSelection().getStartOffset())
        
        const nowContentState   = editorState.getCurrentContent()
        const textContent       = nowContentState.getPlainText() || ''        
        const textContentArray  = textContent.split('\n')
        const textBlockMapArray = nowContentState.getBlockMap().toArray()
        const textSelection     = editorState.getSelection()
        const textAnchor        = textSelection.getFocusKey()


        // -- 判斷要不要跳出選擇片語窗 ---------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------
        this.toggleSnippetOptions(editorState)

        // -- 設置搜尋字串 ---------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------
        this.setSearchStr(editorState)
        
        // -- 把 style 轉回一般 style ---------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------
        if (
            ( editorState.getCurrentInlineStyle().toJSON().indexOf('gray') > -1 )
        ){
            editorState = EditorState.setInlineStyleOverride( editorState, OrderedSet.of('noStyled') )
        }
        
        // -- 把 有 ___ 的內容位置存起來 ---------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------

        let hashArray = []

        let count = 0
        while( count < textBlockMapArray.length ){
            const searchKey = /___/g
            let match = null

            const content = textBlockMapArray[count].getText()
            const blockName = textBlockMapArray[count].key

            while ( ( match = searchKey.exec(content) ) != null ) {
                let hashElement = {}
                hashElement.index = count
                hashElement.blockName = blockName
                hashElement.position = match.index
                hashArray.push(hashElement)
            }
            count += 1
        }

        this.hash = hashArray

        // --------------------------------------------------------------------------------

        this.setState({
            editorState: editorState,
            searchStr: this.searchStr
        })
        this.props.onChange(editorState.getCurrentContent().getPlainText())
    }

    handleMouseUp = () =>{
        console.log('up')
        this.getCursorPosition()
    }

    getCursorPosition = ()=>{
        let snippetPosition = {
            left  : null,
            right : null,
            top   : null,
            bottom: null
        }
        
        if ( window.getSelection().anchorNode ){
            snippetPosition = window.getSelection().getRangeAt(0).getBoundingClientRect()
        }

        this.setState({
            snippetPosition: snippetPosition,
            openSnippetHint: this.openSnippetHint
        })
    }

    focus = () => {
        this.editor.focus()
    }

    forceSelect = (backward) => {
        const nowEditor = this.state.editorState
        const hash = this.hash
        
        // --- 找到 key map --- //
        const textBlockMap = nowEditor.getCurrentContent().getBlockMap()
        let textBlockKeys = []
        for (let item of textBlockMap.keys() ) {
            textBlockKeys.push(item)
        }

        // --- 找到目前游標 --- //
        const nowCursor = this.copyCursor?this.copyCursor:{
            key: nowEditor.getSelection().getFocusKey(),
            focusOffset: nowEditor.getSelection().getFocusOffset(),
            anchorOffset: nowEditor.getSelection().getAnchorOffset(),
        }
        // --- 找到目前游標後的第一個 search key --- //
        const nowCursorIndex = textBlockKeys.indexOf(nowCursor.key)
        let targetHash = false

            // --- 濾掉之前(後)的行
        const prePostHashArray = _.filter( hash, (eachHash, idx)=>{
            if (backward){
                return (eachHash.index > nowCursorIndex)?false:true
            }else{
                return (eachHash.index < nowCursorIndex)?false:true
            }
        })
            // --- 濾掉同行之前(後)的 searchkey
        const postHashArray = _.filter( prePostHashArray, (eachHash)=>{
            if (backward){
                return ( eachHash.blockName == nowCursor.key && eachHash.position >= nowCursor.focusOffset )? false:true
            }else{
                return ( eachHash.blockName == nowCursor.key && eachHash.position < nowCursor.anchorOffset )? false:true
            }
        })
        // --------------------------------------------
        
        if(postHashArray.length > 0){
            const thisHash = backward?postHashArray.slice(-1)[0]:postHashArray[0]
            const selectionState = SelectionState.createEmpty(thisHash.blockName);
            const updatedSelection = selectionState.merge({
                focusKey: thisHash.blockName,
                focusOffset: thisHash.position,
                anchorKey: thisHash.blockName,
                anchorOffset: thisHash.position+3,
                isBackward: true
            })

            const newState = EditorState.forceSelection(
                this.state.editorState,
                updatedSelection
            )

            this.setState({
                editorState: newState,
            })

            this.copyCursor = null
        } 
    }

    onTab = (e) => {
        if(this.hash.length!=0){
            this.forceSelect(this.isShift?true:false)
        }
    }

    render() {
        const suggestions = this.state.snippetList
        const id = this.props.id || 'draftJSBody'

        let snippetHintDiv = null

        if ( this.state.openSnippetHint && this.state.snippetPosition.left != null ){
            snippetHintDiv = (
                <span style = {{ position: 'absolute', left: this.state.snippetPosition.x, top: this.state.snippetPosition.y + this.fontHeight }}>
                    <SnippetDiv snippet = {this.state.snippetList} searchStr={this.state.searchStr} />
                </span>
            )
        }

        return (
            <div style={{width:'100%'}}>
                <div
                    style={{ 
                        width: '100%',
                        overflow: 'auto'
                    }}>
                    <div
                        id={id}
                        className = 'draftjsWithMention' 
                        style={{ 
                            display: 'inline-block',
                            border: '1px solid gray', 
                            margin: '10px 10px 10px 10px', 
                            padding: '5px', 
                            height: 'auto', 
                            width: '100%',
                            overflow: 'auto',
                            fontFamily: 'monospace'
                        }}
                        onClick={this.focus}
                        ref={div=>this.draftBody=div}
                    >
                        <Editor
                            editorState = {this.state.editorState}
                            onChange    = {this.onChange}
                            ref         = {(element) => { this.editor = element }}
                            onTab       = {this.onTab}
                            spellCheck  = {true}
                            handlePastedText = {this.handlePaste} 
                            customStyleMap = {this.StyleMap}
                        />
                    </div>
                </div>
                { snippetHintDiv }
            </div>
        )
    }
}

FreeTextWithSnippet.defaultProps = {
    defaultText: '',
    onChange: ()=>{}
}

export default FreeTextWithSnippet


