'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 计算 图片的 数量
var img_count = 0;

var ImageBoxView = function (_Component) {
    _inherits(ImageBoxView, _Component);

    function ImageBoxView(props) {
        _classCallCheck(this, ImageBoxView);

        var _this = _possibleConstructorReturn(this, (ImageBoxView.__proto__ || Object.getPrototypeOf(ImageBoxView)).call(this, props));

        _this.init = _this.init.bind(_this);
        _this.onFetchImg = _this.onFetchImg.bind(_this);
        _this.show = _this.show.bind(_this);

        _this._name = img_count++;

        var state = _this.init(props);
        _this.state = state;
        return _this;
    }

    _createClass(ImageBoxView, [{
        key: 'init',
        value: function init(props) {
            var img = props.img,
                _props$animate = props.animate,
                animate = _props$animate === undefined ? '' : _props$animate,
                _props$mode = props.mode,
                mode = _props$mode === undefined ? '' : _props$mode,
                _props$delay = props.delay,
                delay = _props$delay === undefined ? 0 : _props$delay,
                _props$wait = props.wait,
                wait = _props$wait === undefined ? 0 : _props$wait,
                _props$width = props.width,
                width = _props$width === undefined ? 0 : _props$width,
                _props$height = props.height,
                height = _props$height === undefined ? 0 : _props$height;

            var img_list = [];

            if (typeof img == 'string' && img.length > 0) {

                var img_item = {
                    url: img,
                    status: 0, // 0 no  1: ready
                    fade: 0 };

                img_list.push(img_item);
            } else if ((typeof img === 'undefined' ? 'undefined' : _typeof(img)) == 'object' && img.length > 0) {

                img.map(function (item) {
                    var img_item = {
                        url: item,
                        status: 0,
                        fade: 0
                    };
                    img_list.push(img_item);
                });
            }

            var state = {
                show: false,
                img_list: img_list,
                animate: animate == 'fade',
                style_mode: mode == 'style',
                delay: parseInt(delay),
                wait: parseInt(wait),

                size: {
                    width: parseInt(width),
                    height: parseInt(height)
                }
            };

            return state;
        }
    }, {
        key: 'show',
        value: function show(flag) {
            this.setState({
                show: flag ? true : false
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var delay = this.state.delay;


            if (delay) {
                this._timer = setTimeout(function () {
                    _this2.show(1);
                }, delay);
            } else {
                this.show(1);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._timer && clearTimeout(this._timer);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var img = nextProps.img;

            if (img != this.state.img_data) {
                var state = this.init(nextProps);
                state.show = true;
                this.setState(state);
            }
        }
    }, {
        key: 'onFetchImg',
        value: function onFetchImg(index) {
            var _this3 = this;

            var _state = this.state,
                _state$img_list = _state.img_list,
                img_list = _state$img_list === undefined ? [] : _state$img_list,
                _state$animate = _state.animate,
                animate = _state$animate === undefined ? false : _state$animate,
                _state$style_mode = _state.style_mode,
                style_mode = _state$style_mode === undefined ? false : _state$style_mode;


            var img_item = img_list[index];
            if (img_item == undefined) {
                return;
            }

            img_item.status = 1;

            if (style_mode) {
                img_item.style = {
                    backgroundImage: 'url(' + img_item.url + ')'
                };
            }

            if (animate && index > 0) {

                var img_ref = 'img_' + index;
                var img_dom = this.refs[img_ref];

                var img_name = 'img_' + this._name + '_' + index;

                if (img_dom) {
                    img_dom.addEventListener("webkitTransitionEnd", function () {
                        img_item.fade = 1;
                        _this3.setState({ img_list: img_list });
                    });
                }
            } else {
                img_item.fade = 1;
            }
            this.setState({ img_list: img_list });
        }
    }, {
        key: 'onLoadImg',
        value: function onLoadImg(index) {
            var _this4 = this;

            var wait = this.state.wait;


            if (wait && index > 0) {
                // let delay = parseInt(Math.random() * 2000)
                this._timer = setTimeout(function () {
                    _this4.onFetchImg(index);
                }, wait);
            } else {
                this.onFetchImg(index);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _state2 = this.state,
                _state2$img_list = _state2.img_list,
                img_list = _state2$img_list === undefined ? [] : _state2$img_list,
                _state2$animate = _state2.animate,
                animate = _state2$animate === undefined ? false : _state2$animate,
                show = _state2.show,
                _state2$size = _state2.size,
                size = _state2$size === undefined ? {} : _state2$size;


            var is_show_cover = img_list.length == 0;

            var first = img_list[0];
            if (first) {
                is_show_cover = first.fade == 0;
            }

            var img_name = 'img_' + this._name;

            var className = this.props.className;


            var container_cls = (0, _classnames4.default)(_defineProperty({
                'c-img-box': true
            }, className, className));

            var container_style = {};

            if (size.width) {
                container_style.width = size.width + 'px';
            }
            if (size.height) {
                container_style.height = size.height + 'px';
            }

            return React.createElement(
                'div',
                { className: container_cls, style: container_style, ref: 'container' },
                is_show_cover && React.createElement('div', { className: 'img-cover' }),
                show && img_list.map(function (item, index) {
                    var _item$url = item.url,
                        url = _item$url === undefined ? '' : _item$url,
                        _item$style = item.style,
                        style = _item$style === undefined ? null : _item$style;

                    if (index > 0) {
                        var last = img_list[index - 1];
                        // 如果 前面的图 还没加载好 则 不显示
                        if (last && last.status == 0) {
                            return null;
                        }
                    }

                    if (index < img_list.length) {
                        var next = img_list[index + 1];
                        if (next && next.fade == 1) {
                            return null;
                        }
                    }

                    var ref = 'img_' + index;

                    var img_cls = (0, _classnames4.default)(_defineProperty({
                        'img-hold': item.status,
                        'img-hide': !item.status,
                        'img-animate': item.status && animate
                    }, ref, true));

                    var is_show_img_dom = !style;
                    return React.createElement(
                        'div',
                        { ref: ref, className: img_cls, style: style, onLoad: _this5.onLoadImg.bind(_this5, index) },
                        is_show_img_dom && React.createElement('img', { src: url })
                    );
                })
            );
        }
    }]);

    return ImageBoxView;
}(_react.Component);

exports.default = ImageBoxView;