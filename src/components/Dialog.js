'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n            from {\n                opacity: 0;\n                transform: translate3d(0, -10%, 0);\n            }\n            to {\n                opacity: 1;\n                transform: translate3d(0, 0, 0);\n            }\n        '], ['\n            from {\n                opacity: 0;\n                transform: translate3d(0, -10%, 0);\n            }\n            to {\n                opacity: 1;\n                transform: translate3d(0, 0, 0);\n            }\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n            display: flex; flex-direction: row; align-items: center;\n            position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px;\n            width: 100%;\n            background: rgba(0, 0, 0, 0.2);\n            background-size: 4px 4px;\n            z-index: 5;\n        '], ['\n            display: flex; flex-direction: row; align-items: center;\n            position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px;\n            width: 100%;\n            background: rgba(0, 0, 0, 0.2);\n            background-size: 4px 4px;\n            z-index: 5;\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n            position: relative;\n            display: flex; flex-direction: row; align-items: center;\n            width: 70%; height: 70%;\n            padding: 15px 25px 15px 25px;\n            border-radius: 5px;\n            font-family: arial, \u5FAE\u8EDF\u6B63\u9ED1\u9AD4;\n            background: white;\n            overflow-y: auto;\n            margin: 0 auto;\n            box-shadow: 0px 2px 10px 5px #80808036;\n            animation: ', ' .2s linear;\n        '], ['\n            position: relative;\n            display: flex; flex-direction: row; align-items: center;\n            width: 70%; height: 70%;\n            padding: 15px 25px 15px 25px;\n            border-radius: 5px;\n            font-family: arial, \u5FAE\u8EDF\u6B63\u9ED1\u9AD4;\n            background: white;\n            overflow-y: auto;\n            margin: 0 auto;\n            box-shadow: 0px 2px 10px 5px #80808036;\n            animation: ', ' .2s linear;\n        ']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T_Dialog = function (_React$Component) {
    _inherits(T_Dialog, _React$Component);

    function T_Dialog(props) {
        _classCallCheck(this, T_Dialog);

        var _this = _possibleConstructorReturn(this, (T_Dialog.__proto__ || Object.getPrototypeOf(T_Dialog)).call(this, props));

        _this.state = {
            open: props.open
        };

        _this.fadeIn = (0, _styledComponents.keyframes)(_templateObject);

        _this.backComp = _styledComponents2.default.div(_templateObject2);

        _this.bodyComp = _styledComponents2.default.div(_templateObject3, _this.fadeIn);
        return _this;
    }

    _createClass(T_Dialog, [{
        key: 'closeDialog',
        value: function closeDialog(e) {
            if (e.target.id == this.props.dialogID) {
                this.setState({
                    open: false
                });
                if (this.props.onDialogClose) {
                    this.props.onDialogClose();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var open = this.state.open;
            var body = this.props.children;

            var BackComp = this.backComp;
            var BodyComp = this.bodyComp;

            if (!open) {
                return _react2.default.createElement('div', { style: { display: 'none' } });
            } else {
                return _react2.default.createElement(
                    BackComp,
                    {
                        id: this.props.dialogID,
                        style: this.props.backCompStyle,
                        onClick: this.closeDialog.bind(this)
                    },
                    _react2.default.createElement(
                        BodyComp,
                        {
                            id: this.props.dialogBodyID,
                            style: this.props.bodyCompStyle
                        },
                        body
                    )
                );
            }
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        value: function __reactstandin__regenerateByEval(key, code) {
            this[key] = eval(code);
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            return {
                open: nextProps.open
            };
        }
    }]);

    return T_Dialog;
}(_react2.default.Component);

T_Dialog.defaultProps = {
    open: true,
    onDialogClose: function onDialogClose() {},
    bodyCompStyle: {},
    backCompStyle: {},
    dialogID: "tao-dialog-writeNote",
    dialogBodyID: "tao-dialog-writeNoteBody"

};

var _default = T_Dialog;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(T_Dialog, 'T_Dialog', 'public/components/Dialog.js');
    reactHotLoader.register(_default, 'default', 'public/components/Dialog.js');
    leaveModule(module);
})();

;