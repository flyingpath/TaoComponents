'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T_Dialog = function (_React$Component) {
    _inherits(T_Dialog, _React$Component);

    function T_Dialog(props) {
        _classCallCheck(this, T_Dialog);

        var _this = _possibleConstructorReturn(this, (T_Dialog.__proto__ || Object.getPrototypeOf(T_Dialog)).call(this, props));

        _this.styles = {
            overAll: {
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                width: '100%',
                position: 'absolute', top: '34px', left: '0px', right: '0px',
                background: 'rgba(118, 95, 36, 0.86)',
                zIndex: '5',
                backgroundSize: '4px 4px',
                borderRadius: '10px',
                bottom: '0px'
            },
            body: {
                borderRadius: '5px',
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
        };

        _this.state = {
            open: props.open
        };
        return _this;
    }

    _createClass(T_Dialog, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                open: nextProps.open
            });
        }
    }, {
        key: 'closeDialog',
        value: function closeDialog(e) {
            if (e.target.id == 'tao-dialog-writeNote') {
                this.setState({
                    open: false
                });
                if (this.props.closeFunc) {
                    this.props.closeFunc();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var open = this.state.open;
            var styles = this.styles;
            var body = this.props.children;

            if (!open) {
                return _react2.default.createElement('div', { style: { display: 'none' } });
            } else {
                return _react2.default.createElement(
                    'div',
                    { id: 'tao-dialog-writeNote', style: styles.overAll, onClick: this.closeDialog.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { id: 'tao-dialog-writeNoteBody', style: styles.body },
                        body
                    )
                );
            }
        }
    }]);

    return T_Dialog;
}(_react2.default.Component);

T_Dialog.defaultProps = {
    open: false
};

var _default = T_Dialog;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(T_Dialog, 'T_Dialog', 'public/components/T_Dialog.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'public/components/T_Dialog.js');
}();

;