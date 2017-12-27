'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n            display: flex;\n            width: ', 'px;\n            height: ', 'px;\n            border-radius: 50%;\n            border: 1px solid;\n            align-items: center;\n            justify-content: center;\n            position: relative;\n            color:#00208c;\n            border: none;\n            font-family: monospace;\n            background: radial-gradient(circle at 10px 5px,#b8dbff,#8fc6fd,#407dab);\n            cursor:pointer;\n        '], ['\n            display: flex;\n            width: ', 'px;\n            height: ', 'px;\n            border-radius: 50%;\n            border: 1px solid;\n            align-items: center;\n            justify-content: center;\n            position: relative;\n            color:#00208c;\n            border: none;\n            font-family: monospace;\n            background: radial-gradient(circle at 10px 5px,#b8dbff,#8fc6fd,#407dab);\n            cursor:pointer;\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n            from {\n                opacity: 0;\n            }\n            to {\n                opacity: 1;\n            }\n        '], ['\n            from {\n                opacity: 0;\n            }\n            to {\n                opacity: 1;\n            }\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n                display: flex;\n                width: ', 'px;\n                height: ', 'px;\n                border-radius: 50%;\n                border: 1px solid;\n                align-items: center;\n                justify-content: center;\n                position: absolute;\n                top: ', 'px;\n                left: ', 'px;\n                animation: ', ' .4s linear;\n                animation-delay: ', 's;\n                opacity: 0;\n                animation-fill-mode: forwards;\n                color: white;\n                border: none;\n                font-family: monospace;\n                background: radial-gradient(circle at 2px 0px,#87d2ff,#1348c6);\n                cursor: pointer;\n                font-weight: bold;\n            '], ['\n                display: flex;\n                width: ', 'px;\n                height: ', 'px;\n                border-radius: 50%;\n                border: 1px solid;\n                align-items: center;\n                justify-content: center;\n                position: absolute;\n                top: ', 'px;\n                left: ', 'px;\n                animation: ', ' .4s linear;\n                animation-delay: ', 's;\n                opacity: 0;\n                animation-fill-mode: forwards;\n                color: white;\n                border: none;\n                font-family: monospace;\n                background: radial-gradient(circle at 2px 0px,#87d2ff,#1348c6);\n                cursor: pointer;\n                font-weight: bold;\n            ']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T_RoundButtons = function (_React$Component) {
    _inherits(T_RoundButtons, _React$Component);

    function T_RoundButtons(props) {
        _classCallCheck(this, T_RoundButtons);

        var _this = _possibleConstructorReturn(this, (T_RoundButtons.__proto__ || Object.getPrototypeOf(T_RoundButtons)).call(this, props));

        _this.state = {
            openSub: false
        };
        _this.bodyClick = _this.bodyClick.bind(_this);
        return _this;
    }

    _createClass(T_RoundButtons, [{
        key: 'bodyClick',
        value: function bodyClick() {
            this.setState({
                openSub: !this.state.openSub
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var subNum = 3;
            var width = 30;
            var bodyContent = this.props.body;
            var content = this.props.subArray;
            var Body = _styledComponents2.default.div(_templateObject, width, width);

            return _react2.default.createElement(
                Body,
                { onClick: this.bodyClick },
                function () {
                    if (_this2.state.openSub) {
                        return _this2.makeSub(subNum, width, content);
                    }
                }(),
                _react2.default.createElement(
                    'div',
                    null,
                    bodyContent
                )
            );
        }
    }, {
        key: 'makeSub',
        value: function makeSub(num, bodyWidth, content) {
            var _this3 = this;

            var rtnArray = [];
            var width = bodyWidth * 0.8;
            var longSide = width + 5;
            var appear = (0, _styledComponents.keyframes)(_templateObject2);

            var _loop = function _loop(i) {
                var x = longSide * Math.cos(-Math.PI / 2 + Math.PI * (i - 1) / 3);
                var y = longSide * Math.sin(-Math.PI / 2 + Math.PI * (i - 1) / 3);

                var Element = _styledComponents2.default.div(_templateObject3, width, width, y, bodyWidth - width + x, appear, 0.1 * (i - 1));
                rtnArray.push(_react2.default.createElement(
                    Element,
                    { key: i, onClick: function onClick() {
                            _this3.props.onClick(i);
                        } },
                    _react2.default.createElement(
                        'div',
                        null,
                        content[i - 1]
                    )
                ));
            };

            for (var i = 1; i <= num; i++) {
                _loop(i);
            }

            return rtnArray;
        }
    }]);

    return T_RoundButtons;
}(_react2.default.Component);

T_RoundButtons.defaultProps = {
    onClick: function onClick(i) {},
    body: 'V1',
    subArray: ['V1', 'V2', 'V3']
};

var _default = T_RoundButtons;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(T_RoundButtons, 'T_RoundButtons', 'public/components/T_RoundButtons.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'public/components/T_RoundButtons.js');
}();

;