'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps, _T_Table$defaultProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactVirtualized = require('react-virtualized');

require('react-virtualized/styles.css');

require('../css/VirtualTable.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VirtualTable = (_temp = _class = function (_React$Component) {
    _inherits(VirtualTable, _React$Component);

    function VirtualTable(props) {
        _classCallCheck(this, VirtualTable);

        var _this = _possibleConstructorReturn(this, (VirtualTable.__proto__ || Object.getPrototypeOf(VirtualTable)).call(this, props));

        _initialiseProps.call(_this);

        _this.columnData = [];
        _this.rawData = [];

        _this.rawDecodeData = [];
        _this.mode = 'big';

        _this.state = {
            rawDataItem: {},
            columnData: [],
            rawData: [],
            rawDecodeData: [],
            data: [],
            sortBy: '',
            sortDirection: 'ASC',
            height: window.innerHeight < 700 ? 500 : props.height
        };
        return _this;
    }

    _createClass(VirtualTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.reSizeData();
            window.onresize = function () {
                if (window.innerWidth < 700 && _this2.mode == 'big') {
                    _this2.reSizeData();
                    _this2.mode = 'small';
                } else if (window.innerWidth > 700 && _this2.mode == 'small') {
                    _this2.reSizeData();
                    _this2.mode = 'big';
                }
            };
        }
    }, {
        key: 'reSizeData',
        value: function reSizeData() {
            if (window.innerWidth < 700) {
                //---- 響應示不出現的 column ----//
                var notMatterList = ['員編', '部門', '職稱', '上班卡'];
                //----------------------------//

                var newTableColumn = this.state.columnData.filter(function (x) {
                    return !(notMatterList.indexOf(x.label) > -1);
                });

                this.setState({
                    columnData: newTableColumn
                });
            } else {
                this.setState({
                    columnData: _lodash2.default.isEmpty(this.state.rawDataItem) ? [] : this.state.rawDataItem.tableColumns
                });
            }

            if (window.innerHeight < 700) {
                this.setState({
                    height: 500
                });
            } else {
                this.setState({
                    height: this.props.height
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            if (!this.state.rawDataItem) {
                return _react2.default.createElement(
                    'div',
                    null,
                    '\u6C92\u6709\u8CC7\u6599\u7269\u4EF6'
                );
            }

            var data = this.state.data;
            var columnData = this.state.columnData;

            var rowCount = data.length;

            var headerHeight = this.props.headerHeight;
            var overscanRowCount = this.props.overscanRowCount;
            var useDynamicRowHeight = true;
            var hideIndexRow = false;
            return _react2.default.createElement(
                'div',
                { className: this.props.outterDivClassName },
                _react2.default.createElement(
                    'div',
                    { className: this.props.searchDivClassName },
                    _react2.default.createElement('input', { type: 'text', onChange: this.search, className: this.props.searchInputClassName })
                ),
                _react2.default.createElement(
                    _reactVirtualized.AutoSizer,
                    { disableHeight: true },
                    function (_ref) {
                        var width = _ref.width;
                        return _react2.default.createElement(
                            _reactVirtualized.Table,
                            {
                                ref: 'Table',
                                className: _this3.props.tableClassName,
                                width: width,
                                height: _this3.state.height,
                                headerClassName: _this3.props.headerClassName,
                                headerHeight: headerHeight,

                                rowRenderer: _this3.rowRenderer,
                                noRowsRenderer: _this3.noRowsRenderer,
                                overscanRowCount: overscanRowCount,
                                rowHeight: _this3.getRowHeight,
                                rowGetter: _this3.rowGetter,
                                rowCount: rowCount,

                                sort: _this3.onSort,
                                sortBy: _this3.state.sortBy,
                                sortDirection: _this3.state.sortDirection
                            },
                            columnData.map(function (eachColumn, idx) {
                                return _react2.default.createElement(_reactVirtualized.Column, {
                                    label: eachColumn.label,
                                    dataKey: eachColumn.dataKey,
                                    disableSort: false,
                                    width: eachColumn.width,
                                    key: idx,
                                    headerClassName: 'T_VirtualGridDiv_HeaderColumn'
                                });
                            })
                        );
                    }
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        value: function __reactstandin__regenerateByEval(key, code) {
            this[key] = eval(code);
        }
    }], [{
        key: 'decodeData',
        value: function decodeData(columnData, data) {

            return data.map(function (eachData) {

                var searchStr = '';

                columnData.map(function (eachColumn) {

                    var value = eachData[eachColumn.dataKey];

                    if (eachColumn.falseDecode && !value) {
                        value = eachColumn.falseDecode;
                    } else if (eachColumn.trueDecode && value) {
                        value = eachColumn.trueDecode;
                    }

                    if (eachColumn.decodes[value]) {
                        value = eachColumn.decodes[value];
                    }

                    eachData[eachColumn.dataKey] = value;

                    searchStr += String(value);
                });

                eachData.searchStr = searchStr;

                return eachData;
            });
        }
    }, {
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {

            var rawDataItem = nextProps.dataItem || {};
            var columnData = _lodash2.default.isEmpty(rawDataItem) ? [] : rawDataItem.tableColumns;
            var rawData = _lodash2.default.isEmpty(rawDataItem) ? [] : rawDataItem.data;

            if (window.innerWidth < 700) {

                //---- 響應示不出現的 column ----//
                var notMatterList = ['員編', '部門', '職稱', '上班卡'];
                columnData = columnData.filter(function (x) {
                    return !(notMatterList.indexOf(x.label) > -1);
                });
            }
            //----------------------------//

            var rawDecodeData = T_Table.decodeData(columnData, rawData);

            return {
                rawDataItem: rawDataItem,
                columnData: columnData,
                rawData: rawData,
                rawDecodeData: rawDecodeData,
                data: rawDecodeData,
                sortBy: '',
                sortDirection: 'ASC'
            };
        }
    }]);

    return VirtualTable;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.rowGetter = function (props) {
        var data = _this4.state.data;
        return data[props.index];
    };

    this.getRowHeight = function () {
        return 80;
    };

    this.search = function (e) {
        var searchStr = e.target.value;

        var data = _this4.state.rawDecodeData;

        if (!searchStr) {
            _this4.setState({
                data: data
            });
        }

        data = data.filter(function (eachData, idx) {
            if (!eachData.searchStr) {
                return false;
            } else {
                if (eachData.searchStr.indexOf(searchStr) >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        _this4.setState({
            data: data
        });
    };

    this.onSort = function (e) {
        var nowSort = _this4.state.sortDirection;
        var sortedData = _lodash2.default.orderBy(_this4.state.data, [e.sortBy], [nowSort === 'ASC' ? "desc" : "asc"]);
        _this4.setState({
            data: sortedData,
            sortBy: e.sortBy,
            sortDirection: nowSort === 'ASC' ? "DESC" : "ASC"
        });
    };

    this.noRowsRenderer = function () {
        return _react2.default.createElement(
            'div',
            { style: { width: '100%', textAlign: 'center', color: 'gray' } },
            _this4.props.noRowsRenderer
        );
    };

    this.rowRenderer = function (props) {
        var columnData = _this4.state.columnData;
        var data = _this4.state.data[props.index];

        var propsColumnData = props.columns;

        var rowClassName = props.className + ' ' + _this4.props.rowClassName;
        if (!props.rowData.isOnline) {
            rowClassName += ' isOffLine';
        }

        return _react2.default.createElement(
            'div',
            {
                style: props.style,
                className: rowClassName,
                key: props.key,
                'aria-label': 'row',
                role: 'row',
                tabIndex: 0
            },
            columnData.map(function (eachColumn, idx) {

                var columnProps = _lodash2.default.cloneDeep(propsColumnData[idx].props);

                columnProps.className = columnProps.className + ' ' + _this4.props.rowColumnClassName;

                if (eachColumn.dataKey === 'isRest' && data.isRest) {
                    var start = (0, _moment2.default)(data.rest.start, 'YYYYMMDDHHmm');
                    var end = (0, _moment2.default)(data.rest.end, 'YYYYMMDDHHmm');
                    columnProps.title = start.format('MM/DD HH:mm') + '\n' + end.format('MM/DD HH:mm');
                }

                return _react2.default.createElement(
                    'div',
                    _extends({}, columnProps, { key: idx }),
                    data[eachColumn.dataKey]
                );
            })
        );
    };
}, _temp);


T_Table.defaultProps = (_T_Table$defaultProps = {

    height: 800,
    headerHeight: 80,
    overscanRowCount: 4,

    outterDivClassName: 'virtualGridTableDiv',
    tableClassName: "virtualGridTable",
    headerClassName: "virtualGridTableHeader"
}, _defineProperty(_T_Table$defaultProps, 'tableClassName', "virtualGridTable"), _defineProperty(_T_Table$defaultProps, 'rowClassName', "T_VirtualGridDiv_Row"), _defineProperty(_T_Table$defaultProps, 'rowColumnClassName', "T_VirtualGridDiv_RowColumn"), _defineProperty(_T_Table$defaultProps, 'searchDivClassName', "searchDivClassName"), _defineProperty(_T_Table$defaultProps, 'searchInputClassName', "searchInputClassName"), _defineProperty(_T_Table$defaultProps, 'noRowsRenderer', "沒有所屬員工"), _defineProperty(_T_Table$defaultProps, 'dataItem', {}), _T_Table$defaultProps);

var _default = T_Table;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(VirtualTable, 'VirtualTable', 'public/components/VirtualGridDiv.js');
    reactHotLoader.register(_default, 'default', 'public/components/VirtualGridDiv.js');
    leaveModule(module);
})();

;