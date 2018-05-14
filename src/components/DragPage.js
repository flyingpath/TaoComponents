'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _rxjs = require('rxjs');

var _reactTransitionGroup = require('react-transition-group');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

require('../css/dragPage.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragPage = function (_React$Component) {
    _inherits(DragPage, _React$Component);

    function DragPage(props) {
        _classCallCheck(this, DragPage);

        var _this = _possibleConstructorReturn(this, (DragPage.__proto__ || Object.getPrototypeOf(DragPage)).call(this, props));

        _this.state = {
            transX: 0,
            open: _this.props.open
        };
        _this.leftRender = _this.leftRender.bind(_this);
        _this.x;
        return _this;
    }

    _createClass(DragPage, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps) {
                this.setState({
                    open: nextProps.open
                });
            }
        }
    }, {
        key: 'closeSlide',
        value: function closeSlide() {
            this.setState({ open: false });
            if (this.props.closeFunc) {
                this.props.closeFunc();
            }
        }
    }, {
        key: 'leftRender',
        value: function leftRender(div) {
            var _this2 = this;

            var leftColumn = div;
            var touchStartEvent = _rxjs.Observable.fromEvent(leftColumn, 'touchstart');
            var touchMoveEvent = _rxjs.Observable.fromEvent(leftColumn, 'touchmove');
            var touchEndEvent = _rxjs.Observable.fromEvent(leftColumn, 'touchend').map(function (e) {
                if (_this2.x > 50) {
                    _this2.closeSlide();
                } else {
                    _this2.setState({
                        transX: 0
                    });
                }
            });

            var observerSlide = touchStartEvent.switchMap(function (e) {
                console.log('1');
                console.log(_this2);
                _this2.x = e.touches[0].clientX;
                return touchMoveEvent.takeUntil(touchEndEvent);
            });

            observerSlide.subscribe(function (e) {
                var startX = _this2.x;
                var endX = e.touches[0].clientX;
                var pathLength = _this2.state.transX + (endX - startX);
                if (pathLength > 0 && endX > 0) {
                    _this2.setState({
                        transX: pathLength
                    });
                }
                _this2.x = endX;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var renderPage = null;

            if (this.state.open) {
                renderPage = _react2.default.createElement(
                    'div',
                    {
                        key: 'slideBody',
                        style: {
                            height: '100%',
                            width: '100%',
                            transform: 'translateX(' + this.state.transX + 'px)',
                            position: 'relative'
                        }
                    },
                    _react2.default.createElement('div', {
                        id: 'leftDragColumnTao',
                        style: {
                            height: '100%',
                            width: '50px',
                            border: '1px solid',
                            position: 'absolute',
                            left: '0px',
                            zIndex: '2'

                        },
                        ref: this.leftRender
                    }),
                    this.props.children
                );
            }

            return _react2.default.createElement(
                _reactTransitionGroup.CSSTransition,
                {
                    classNames: 'card_recordSlide',
                    timeout: {
                        exit: 10000,
                        enter: 10000
                    }
                },
                renderPage
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        value: function __reactstandin__regenerateByEval(key, code) {
            this[key] = eval(code);
        }
    }]);

    return DragPage;
}(_react2.default.Component);

DragPage.defaultProps = {
    open: true
};

var _default = DragPage;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(DragPage, 'DragPage', 'public/components/DragPage.js');
    reactHotLoader.register(_default, 'default', 'public/components/DragPage.js');
    leaveModule(module);
})();

;