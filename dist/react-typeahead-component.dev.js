(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Typeahead"] = factory(require("react"), require("react-dom"));
	else
		root["Typeahead"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1),
	    ReactDOM = __webpack_require__(2);

	module.exports = React.createClass({
	    displayName: 'Aria Status',

	    propTypes:  false ? {} : {
	        message: React.PropTypes.string
	    },

	    componentDidMount: function () {
	        var _this = this;

	        // This is needed as `componentDidUpdate`
	        // does not fire on the initial render.
	        _this.setTextContent(_this.props.message);
	    },

	    componentDidUpdate: function () {
	        var _this = this;

	        _this.setTextContent(_this.props.message);
	    },

	    render: function () {
	        return React.createElement('span', {
	            role: 'status',
	            'aria-live': 'polite',
	            style: {
	                left: '-9999px',
	                position: 'absolute'
	            }
	        });
	    },

	    // We cannot set `textContent` directly in `render`,
	    // because React adds/deletes text nodes when rendering,
	    // which confuses screen readers and doesn't cause them to read changes.
	    setTextContent: function (textContent) {
	        // We could set `innerHTML`, but it's better to avoid it.
	        ReactDOM.findDOMNode(this).textContent = textContent || '';
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1),
	    ReactDOM = __webpack_require__(2);

	module.exports = React.createClass({
	    displayName: 'Input',

	    propTypes:  false ? {} : {
	        value: React.PropTypes.string,
	        onChange: React.PropTypes.func
	    },

	    getDefaultProps: function () {
	        return {
	            value: '',
	            onChange: function () {}
	        };
	    },

	    componentDidUpdate: function () {
	        var _this = this,
	            dir = _this.props.dir;

	        if (dir === null || dir === undefined) {
	            // When setting an attribute to null/undefined,
	            // React instead sets the attribute to an empty string.

	            // This is not desired because of a possible bug in Chrome.
	            // If the page is RTL, and the input's `dir` attribute is set
	            // to an empty string, Chrome assumes LTR, which isn't what we want.
	            ReactDOM.findDOMNode(_this).removeAttribute('dir');
	        }
	    },

	    render: function () {
	        var _this = this;

	        return React.createElement('input', _extends({}, _this.props, {
	            onChange: _this.handleChange
	        }));
	    },

	    handleChange: function (event) {
	        var props = this.props;

	        // There are several React bugs in IE,
	        // where the `input`'s `onChange` event is
	        // fired even when the value didn't change.
	        // https://github.com/facebook/react/issues/2185
	        // https://github.com/facebook/react/issues/3377
	        if (event.target.value !== props.value) {
	            props.onChange(event);
	        }
	    },

	    blur: function () {
	        ReactDOM.findDOMNode(this).blur();
	    },

	    isCursorAtEnd: function () {
	        var _this = this,
	            inputDOMNode = ReactDOM.findDOMNode(_this),
	            valueLength = _this.props.value.length;

	        return inputDOMNode.selectionStart === valueLength && inputDOMNode.selectionEnd === valueLength;
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1),
	    ReactDOM = __webpack_require__(2),
	    Input = __webpack_require__(4),
	    AriaStatus = __webpack_require__(3),
	    getTextDirection = __webpack_require__(6),
	    noop = function () {};

	module.exports = React.createClass({
	    displayName: 'Typeahead',

	    statics: {
	        getInstanceCount: function () {
	            var count = 0;

	            return function () {
	                return ++count;
	            };
	        }()
	    },

	    propTypes:  false ? {} : {
	        inputId: React.PropTypes.string,
	        inputName: React.PropTypes.string,
	        className: React.PropTypes.string,
	        autoFocus: React.PropTypes.bool,
	        hoverSelect: React.PropTypes.bool,
	        inputValue: React.PropTypes.string,
	        options: React.PropTypes.array,
	        placeholder: React.PropTypes.string,
	        onChange: React.PropTypes.func,
	        onKeyDown: React.PropTypes.func,
	        onKeyPress: React.PropTypes.func,
	        onKeyUp: React.PropTypes.func,
	        onFocus: React.PropTypes.func,
	        onBlur: React.PropTypes.func,
	        onSelect: React.PropTypes.func,
	        onInputClick: React.PropTypes.func,
	        handleHint: React.PropTypes.func,
	        onComplete: React.PropTypes.func,
	        onOptionClick: React.PropTypes.func,
	        onOptionChange: React.PropTypes.func,
	        onDropdownOpen: React.PropTypes.func,
	        onDropdownClose: React.PropTypes.func,
	        optionTemplate: React.PropTypes.func.isRequired,
	        getMessageForOption: React.PropTypes.func,
	        getMessageForIncomingOptions: React.PropTypes.func
	    },

	    getDefaultProps: function () {
	        return {
	            className: '',
	            inputValue: '',
	            options: [],
	            hoverSelect: true,
	            onFocus: noop,
	            onKeyDown: noop,
	            onChange: noop,
	            onInputClick: noop,
	            handleHint: function () {
	                return '';
	            },
	            onOptionClick: noop,
	            onOptionChange: noop,
	            onComplete: noop,
	            onDropdownOpen: noop,
	            onDropdownClose: noop,
	            getMessageForOption: function () {
	                return '';
	            },
	            getMessageForIncomingOptions: function (number) {
	                return number + ' suggestions are available. Use up and down arrows to select.';
	            }
	        };
	    },

	    getInitialState: function () {
	        return {
	            selectedIndex: -1,
	            isHintVisible: false,
	            isDropdownVisible: false
	        };
	    },

	    componentDidUpdate: function () {
	        this.inputOffset = $(ReactDOM.findDOMNode(this)).find('.react-typeahead-input').offset();
	    },

	    componentWillMount: function () {
	        var _this = this,
	            uniqueId = this.props.inputId || this.constructor.getInstanceCount();

	        _this.userInputValue = null;
	        _this.previousInputValue = null;
	        _this.activeDescendantId = 'react-typeahead-activedescendant-' + uniqueId;
	        _this.optionsId = 'react-typeahead-options-' + uniqueId;
	    },

	    componentDidMount: function () {
	        var addEvent = window.addEventListener,
	            handleWindowClose = this.props.handleWindowClose || this.handleWindowClose;

	        // The `focus` event does not bubble, so we must capture it instead.
	        // This closes Typeahead's dropdown whenever something else gains focus.
	        addEvent('focus', handleWindowClose, true);

	        // If we click anywhere outside of Typeahead, close the dropdown.
	        addEvent('click', handleWindowClose, false);
	    },

	    componentWillUnmount: function () {
	        var removeEvent = window.removeEventListener,
	            handleWindowClose = this.props.handleWindowClos || this.handleWindowClose;

	        removeEvent('focus', handleWindowClose, true);
	        removeEvent('click', handleWindowClose, false);
	    },

	    componentWillReceiveProps: function (nextProps) {
	        var nextValue = nextProps.inputValue || '',
	            nextOptions = nextProps.options,
	            valueLength = nextValue.length,
	            isHintVisible = valueLength > 0 &&
	        // A visible part of the hint must be
	        // available for us to complete it.
	        nextProps.handleHint(nextValue, nextOptions).slice(valueLength).length > 0;

	        this.setState({
	            isHintVisible: isHintVisible
	        });
	    },

	    render: function () {
	        var _this = this;

	        return React.createElement(
	            'div',
	            {
	                style: {
	                    position: 'relative'
	                },
	                className: 'react-typeahead-container ' + _this.props.className },
	            _this.renderInput(),
	            _this.renderDropdown(),
	            _this.renderAriaMessageForOptions(),
	            _this.renderAriaMessageForIncomingOptions()
	        );
	    },

	    renderInput: function () {
	        var _this = this,
	            state = _this.state,
	            props = _this.props,
	            inputValue = props.inputValue,
	            className = 'react-typeahead-input',
	            inputDirection = getTextDirection(inputValue);

	        return React.createElement(
	            'div',
	            {
	                style: {
	                    position: 'relative'
	                },
	                className: 'react-typeahead-input-container' },
	            React.createElement(Input, {
	                disabled: true,
	                role: 'presentation',
	                'aria-hidden': true,
	                dir: inputDirection,
	                className: className + ' react-typeahead-hint',
	                style: {
	                    color: 'silver',
	                    WebkitTextFillColor: 'silver',
	                    position: 'absolute'
	                },
	                value: state.isHintVisible ? props.handleHint(inputValue, props.options) : undefined
	            }),
	            React.createElement(Input, {
	                ref: 'input',
	                role: 'combobox',
	                'aria-owns': _this.optionsId,
	                'aria-expanded': state.isDropdownVisible,
	                'aria-autocomplete': 'both',
	                'aria-activedescendant': _this.activeDescendantId,
	                value: inputValue,
	                spellCheck: false,
	                autoComplete: false,
	                autoCorrect: false,
	                dir: inputDirection,
	                onClick: _this.handleClick,
	                onFocus: _this.handleFocus,
	                onBlur: props.onBlur,
	                onChange: _this.handleChange,
	                onKeyDown: _this.handleKeyDown,
	                id: props.inputId,
	                name: props.inputName,
	                autoFocus: props.autoFocus,
	                placeholder: props.placeholder,
	                onSelect: props.onSelect,
	                onKeyUp: props.onKeyUp,
	                onKeyPress: props.onKeyPress,
	                className: className + ' react-typeahead-usertext',
	                style: {
	                    position: 'relative',
	                    background: 'transparent'
	                }
	            })
	        );
	    },

	    renderDropdown: function () {
	        var _this = this,
	            state = _this.state,
	            props = _this.props,
	            OptionTemplate = props.optionTemplate,
	            selectedIndex = state.selectedIndex,
	            isDropdownVisible = state.isDropdownVisible,
	            activeDescendantId = _this.activeDescendantId;

	        if (this.props.options.length < 1) {
	            return null;
	        }

	        var style = {
	            width: '100%',
	            background: '#fff',
	            position: 'absolute',
	            boxSizing: 'border-box',
	            display: isDropdownVisible ? 'block' : 'none'
	        };

	        if (this.inputOffset) {
	            style.left = this.inputOffset.left;
	            style.top = this.inputOffset.top + 25;
	        }

	        return React.createElement(
	            RenderInBody,
	            null,
	            React.createElement(
	                'ul',
	                { id: _this.optionsId,
	                    ref: 'dropdown',
	                    role: 'listbox',
	                    'aria-hidden': !isDropdownVisible,
	                    style: style,
	                    className: 'react-typeahead-options',
	                    onMouseOut: this.handleMouseOut },
	                props.options.map(function (data, index) {
	                    var isSelected = selectedIndex === index;

	                    return React.createElement(
	                        'li',
	                        { id: isSelected ? activeDescendantId : null,
	                            'aria-selected': isSelected,
	                            role: 'option',
	                            key: index,
	                            onClick: _this.handleOptionClick.bind(_this, index),
	                            onMouseOver: _this.handleOptionMouseOver.bind(_this, index) },
	                        React.createElement(OptionTemplate, {
	                            data: data,
	                            index: index,
	                            userInputValue: _this.userInputValue,
	                            inputValue: props.inputValue,
	                            isSelected: isSelected
	                        })
	                    );
	                })
	            )
	        );
	    },

	    renderAriaMessageForOptions: function () {
	        var _this = this,
	            props = _this.props,
	            inputValue = props.inputValue,
	            option = props.options[_this.state.selectedIndex] || inputValue;

	        return React.createElement(AriaStatus, {
	            message: props.getMessageForOption(option) || inputValue
	        });
	    },

	    renderAriaMessageForIncomingOptions: function () {
	        var props = this.props;

	        return React.createElement(AriaStatus, {
	            message: props.getMessageForIncomingOptions(props.options.length)
	        });
	    },

	    showDropdown: function () {
	        var _this = this;

	        if (!_this.state.isDropdownVisible) {
	            _this.setState({
	                isDropdownVisible: true
	            }, function () {
	                _this.props.onDropdownOpen();
	            });
	        }
	    },

	    hideDropdown: function () {
	        var _this = this;

	        if (_this.state.isDropdownVisible) {
	            _this.setState({
	                isDropdownVisible: false
	            }, function () {
	                _this.props.onDropdownClose();
	            });
	        }
	    },

	    showHint: function () {
	        var _this = this,
	            props = _this.props,
	            inputValue = props.inputValue,
	            inputValueLength = inputValue.length,
	            isHintVisible = inputValueLength > 0 &&
	        // A visible part of the hint must be
	        // available for us to complete it.
	        props.handleHint(inputValue, props.options).slice(inputValueLength).length > 0;

	        _this.setState({
	            isHintVisible: isHintVisible
	        });
	    },

	    hideHint: function () {
	        this.setState({
	            isHintVisible: false
	        });
	    },

	    setSelectedIndex: function (index, callback) {
	        this.setState({
	            selectedIndex: index
	        }, callback);
	    },

	    handleChange: function (event) {
	        var _this = this;

	        _this.props.onChange(event);
	        _this.userInputValue = event.target.value;
	        _this.showHint();
	        _this.showDropdown();
	        _this.setSelectedIndex(-1);
	    },

	    focus: function () {
	        ReactDOM.findDOMNode(this.refs.input).focus();
	    },

	    handleFocus: function (event) {
	        var _this = this;

	        _this.showDropdown();
	        _this.props.onFocus(event);
	    },

	    handleClick: function (event) {
	        var _this = this;

	        _this.showHint();
	        _this.props.onInputClick(event);
	    },

	    navigate: function (direction, callback) {
	        var _this = this,
	            minIndex = -1,
	            maxIndex = _this.props.options.length - 1,
	            index = _this.state.selectedIndex + direction;

	        if (index > maxIndex) {
	            index = minIndex;
	        } else if (index < minIndex) {
	            index = maxIndex;
	        }

	        _this.setSelectedIndex(index, callback);
	    },

	    handleKeyDown: function (event) {
	        var _this = this,
	            key = event.key,
	            props = _this.props,
	            input = _this.refs.input,
	            isDropdownVisible = _this.state.isDropdownVisible,
	            isHintVisible = _this.state.isHintVisible,
	            hasHandledKeyDown = false,
	            index,
	            optionData,
	            dir;

	        switch (key) {
	            case 'End':
	            case 'Tab':
	                if (isHintVisible && !event.shiftKey) {
	                    event.preventDefault();
	                    props.onComplete(event, props.handleHint(props.inputValue, props.options));
	                }
	                break;
	            case 'ArrowLeft':
	            case 'ArrowRight':
	                if (isHintVisible && !event.shiftKey && input.isCursorAtEnd()) {
	                    dir = getTextDirection(props.inputValue);

	                    if (dir === 'ltr' && key === 'ArrowRight' || dir === 'rtl' && key === 'ArrowLeft') {
	                        props.onComplete(event, props.handleHint(props.inputValue, props.options));
	                    }
	                }
	                break;
	            case 'Enter':
	                _this.focus();
	                _this.hideHint();
	                _this.hideDropdown();
	                break;
	            case 'Escape':
	                _this.hideHint();
	                _this.hideDropdown();
	                break;
	            case 'ArrowUp':
	            case 'ArrowDown':
	                if (props.options.length > 0) {
	                    event.preventDefault();

	                    _this.showHint();
	                    _this.showDropdown();

	                    if (isDropdownVisible) {
	                        dir = key === 'ArrowUp' ? -1 : 1;
	                        hasHandledKeyDown = true;

	                        _this.navigate(dir, function () {
	                            var selectedIndex = _this.state.selectedIndex,
	                                previousInputValue = _this.previousInputValue,
	                                optionData = previousInputValue,
	                                optionOffsetTop = 0,
	                                selectedOption,
	                                dropdown;

	                            // We're currently on an option.
	                            if (selectedIndex >= 0) {
	                                // Save the current `input` value,
	                                // as we might arrow back to it later.
	                                if (previousInputValue === null) {
	                                    _this.previousInputValue = props.inputValue;
	                                }

	                                optionData = props.options[selectedIndex];
	                                // Make selected option always scroll to visible
	                                dropdown = ReactDOM.findDOMNode(_this.refs.dropdown);
	                                selectedOption = dropdown.children[selectedIndex];
	                                optionOffsetTop = selectedOption.offsetTop;
	                                if (optionOffsetTop + selectedOption.clientHeight > dropdown.clientHeight || optionOffsetTop < dropdown.scrollTop) {
	                                    dropdown.scrollTop = optionOffsetTop;
	                                }
	                            }

	                            props.onOptionChange(event, optionData, selectedIndex);
	                            props.onKeyDown(event, optionData, selectedIndex);
	                        });
	                    }
	                }

	                break;
	        }

	        if (!hasHandledKeyDown) {
	            index = this.state.selectedIndex;
	            optionData = index < 0 ? props.inputValue : props.options[index];
	            props.onKeyDown(event, optionData, index);
	        }
	    },

	    handleOptionClick: function (selectedIndex, event) {
	        var _this = this,
	            props = _this.props;

	        _this.focus();
	        _this.hideHint();
	        _this.hideDropdown();
	        _this.setSelectedIndex(selectedIndex);
	        props.onOptionClick(event, props.options[selectedIndex], selectedIndex);
	    },

	    handleOptionMouseOver: function (selectedIndex) {
	        var _this = this;

	        if (_this.props.hoverSelect) {
	            _this.setSelectedIndex(selectedIndex);
	        }
	    },

	    handleMouseOut: function () {
	        var _this = this;

	        if (_this.props.hoverSelect) {
	            _this.setSelectedIndex(-1);
	        }
	    },

	    handleWindowClose: function (event) {
	        var _this = this,
	            target = event.target;

	        if (target !== window && !ReactDOM.findDOMNode(this).contains(target)) {
	            _this.hideHint();
	            _this.hideDropdown();
	        }
	    }
	});

	var RenderInBody = React.createClass({
	    displayName: 'RenderInBody',


	    componentDidMount: function () {
	        this.popup = document.createElement("div");
	        document.body.appendChild(this.popup);
	        this._renderLayer();
	    },

	    componentDidUpdate: function () {
	        this._renderLayer();
	    },

	    componentWillUnmount: function () {
	        ReactDOM.unmountComponentAtNode(this.popup);
	        document.body.removeChild(this.popup);
	    },

	    _renderLayer: function () {
	        ReactDOM.render(this.props.children, this.popup);
	    },

	    render: function () {
	        // Render a placeholder
	        return React.DOM.div(this.props);
	    }

	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RTLCharactersRegExp = __webpack_require__(8),
	    NeutralCharactersRegExp = __webpack_require__(7),
	    startsWithRTL = new RegExp('^(?:' + NeutralCharactersRegExp + ')*(?:' + RTLCharactersRegExp + ')'),
	    neutralText = new RegExp('^(?:' + NeutralCharactersRegExp + ')*$');

	module.exports = function (text) {
	    var dir = 'ltr';

	    if (startsWithRTL.test(text)) {
	        dir = 'rtl';
	    } else if (neutralText.test(text)) {
	        dir = null;
	    }

	    return dir;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// DO NOT EDIT!
	// THIS FILE IS GENERATED!

	// All bidi characters except those found in classes 'L' (LTR), 'R' (RTL), and 'AL' (RTL Arabic) as per Unicode 7.0.0.

	// jshint ignore:start
	// jscs:disable maximumLineLength
	module.exports = '[\0-@\[-`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02B9\u02BA\u02C2-\u02CF\u02D2-\u02DF\u02E5-\u02ED\u02EF-\u036F\u0374\u0375\u037E\u0384\u0385\u0387\u03F6\u0483-\u0489\u058A\u058D-\u058F\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0600-\u0607\u0609\u060A\u060C\u060E-\u061A\u064B-\u066C\u0670\u06D6-\u06E4\u06E7-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07F6-\u07F9\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09F2\u09F3\u09FB\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AF1\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0BF3-\u0BFA\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C78-\u0C7E\u0C81\u0CBC\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E3F\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39-\u0F3D\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1390-\u1399\u1400\u1680\u169B\u169C\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DB\u17DD\u17F0-\u17F9\u1800-\u180E\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1940\u1944\u1945\u19DE-\u19FF\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2000-\u200D\u2010-\u2029\u202F-\u2064\u2068\u206A-\u2070\u2074-\u207E\u2080-\u208E\u20A0-\u20BD\u20D0-\u20F0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u2150-\u215F\u2189\u2190-\u2335\u237B-\u2394\u2396-\u23FA\u2400-\u2426\u2440-\u244A\u2460-\u249B\u24EA-\u26AB\u26AD-\u27FF\u2900-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2CE5-\u2CEA\u2CEF-\u2CF1\u2CF9-\u2CFF\u2D7F\u2DE0-\u2E42\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u3004\u3008-\u3020\u302A-\u302D\u3030\u3036\u3037\u303D-\u303F\u3099-\u309C\u30A0\u30FB\u31C0-\u31E3\u321D\u321E\u3250-\u325F\u327C-\u327E\u32B1-\u32BF\u32CC-\u32CF\u3377-\u337A\u33DE\u33DF\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA60D-\uA60F\uA66F-\uA67F\uA69F\uA6F0\uA6F1\uA700-\uA721\uA788\uA802\uA806\uA80B\uA825\uA826\uA828-\uA82B\uA838\uA839\uA874-\uA877\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFB29\uFD3E\uFD3F\uFDFD\uFE00-\uFE19\uFE20-\uFE2D\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD]|\uD800[\uDD01\uDD40-\uDD8C\uDD90-\uDD9B\uDDA0\uDDFD\uDEE0-\uDEFB\uDF76-\uDF7A]|\uD802[\uDD1F\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6\uDF39-\uDF3F]|\uD803[\uDE60-\uDE7E]|[\uD804\uDB40][\uDC01\uDC38-\uDC46\uDC52-\uDC65\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDEDF\uDEE3-\uDEEA\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E\uDCA0-\uDCA3]|\uD834[\uDD67-\uDD69\uDD73-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE00-\uDE45\uDF00-\uDF56]|\uD835[\uDEDB\uDF15\uDF4F\uDF89\uDFC3\uDFCE-\uDFFF]|\uD83A[\uDCD0-\uDCD6]|\uD83B[\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD00-\uDD0C\uDD6A\uDD6B\uDF00-\uDF2C\uDF30-\uDF7D\uDF80-\uDFCE\uDFD4-\uDFF7]|\uD83D[\uDC00-\uDCFE\uDD00-\uDD4A\uDD50-\uDD79\uDD7B-\uDDA3\uDDA5-\uDE42\uDE45-\uDECF\uDEE0-\uDEEC\uDEF0-\uDEF3\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD]';
	// jscs:enable maximumLineLength
	// jshint ignore:end

/***/ },
/* 8 */
/***/ function(module, exports) {

	// DO NOT EDIT!
	// THIS FILE IS GENERATED!

	// All bidi characters found in classes 'R', 'AL', 'RLE', 'RLO', and 'RLI' as per Unicode 7.0.0.

	// jshint ignore:start
	// jscs:disable maximumLineLength
	module.exports = '[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05EA\u05F0-\u05F4\u0608\u060B\u060D\u061B\u061C\u061E-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u070D\u070F\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u08A0-\u08B2\u200F\u202B\u202E\u2067\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC57-\uDC9E\uDCA7-\uDCAF\uDD00-\uDD1B\uDD20-\uDD39\uDD3F\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE40-\uDE47\uDE50-\uDE58\uDE60-\uDE9F\uDEC0-\uDEE4\uDEEB-\uDEF6\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDF99-\uDF9C\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]';
	// jscs:enable maximumLineLength
	// jshint ignore:end

/***/ }
/******/ ])
});
;