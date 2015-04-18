if(typeof Math.imul == "undefined" || (Math.imul(0xffffffff,5) == 0)) {
    Math.imul = function (a, b) {
        var ah  = (a >>> 16) & 0xffff;
        var al = a & 0xffff;
        var bh  = (b >>> 16) & 0xffff;
        var bl = b & 0xffff;
        // the shift by 0 fixes the sign on the high part
        // the final |0 converts the unsigned value into a signed value
        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
    }
}

;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

var h,aa=this;
function r(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
b&&"undefined"==typeof a.call)return"object";return b}function ca(a){return"string"==typeof a}function da(a){return"number"==typeof a}var fa="closure_uid_"+(1E9*Math.random()>>>0),ga=0;function ha(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};function ia(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")}function la(a){return Array.prototype.join.call(arguments,"")}function ma(a,b){return a<b?-1:a>b?1:0}function oa(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})}function pa(a){var b=ca(void 0)?"undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08"):"\\s";return a.replace(new RegExp("(^"+(b?"|["+b+"]+":"")+")([a-z])","g"),function(a,b,e){return b+e.toUpperCase()})};var qa=Array.prototype,sa=qa.indexOf?function(a,b,c){return qa.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(ca(a))return ca(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};function ta(a,b){return a>b?1:a<b?-1:0};var ua;a:{var wa=aa.navigator;if(wa){var xa=wa.userAgent;if(xa){ua=xa;break a}}ua=""};var ya=-1!=ua.indexOf("Opera")||-1!=ua.indexOf("OPR"),Aa=-1!=ua.indexOf("Trident")||-1!=ua.indexOf("MSIE"),Ca=-1!=ua.indexOf("Gecko")&&-1==ua.toLowerCase().indexOf("webkit")&&!(-1!=ua.indexOf("Trident")||-1!=ua.indexOf("MSIE")),Da=-1!=ua.toLowerCase().indexOf("webkit");function Ea(){var a=aa.document;return a?a.documentMode:void 0}
var Ga=function(){var a="",b;if(ya&&aa.opera)return a=aa.opera.version,"function"==r(a)?a():a;Ca?b=/rv\:([^\);]+)(\)|;)/:Aa?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Da&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(ua))?a[1]:"");return Aa&&(b=Ea(),b>parseFloat(a))?String(b):a}(),Ha={};
function Ia(a){var b;if(!(b=Ha[a])){b=0;for(var c=ia(String(Ga)).split("."),d=ia(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",l=RegExp("(\\d*)(\\D*)","g"),m=RegExp("(\\d*)(\\D*)","g");do{var n=l.exec(g)||["","",""],p=m.exec(k)||["","",""];if(0==n[0].length&&0==p[0].length)break;b=ma(0==n[1].length?0:parseInt(n[1],10),0==p[1].length?0:parseInt(p[1],10))||ma(0==n[2].length,0==p[2].length)||ma(n[2],p[2])}while(0==b)}b=Ha[a]=0<=b}return b}
var Ja=aa.document,Ka=Ja&&Aa?Ea()||("CSS1Compat"==Ja.compatMode?parseInt(Ga,10):5):void 0;!Ca&&!Aa||Aa&&Aa&&9<=Ka||Ca&&Ia("1.9.1");Aa&&Ia("9");function La(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}h=La.prototype;h.clone=function(){return new La(this.x,this.y)};h.toString=function(){return"("+this.x+", "+this.y+")"};h.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};h.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};h.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};
h.translate=function(a,b){a instanceof La?(this.x+=a.x,this.y+=a.y):(this.x+=a,da(b)&&(this.y+=b));return this};h.scale=function(a,b){var c=da(b)?b:a;this.x*=a;this.y*=c;return this};function Oa(a,b){this.width=a;this.height=b}h=Oa.prototype;h.clone=function(){return new Oa(this.width,this.height)};h.toString=function(){return"("+this.width+" x "+this.height+")"};h.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};h.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};h.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
h.scale=function(a,b){var c=da(b)?b:a;this.width*=a;this.height*=c;return this};function Pa(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function Qa(a){var b=arguments.length;if(1==b&&"array"==r(arguments[0]))return Qa.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};function Ra(a,b){null!=a&&this.append.apply(this,arguments)}h=Ra.prototype;h.za="";h.set=function(a){this.za=""+a};h.append=function(a,b,c){this.za+=a;if(null!=b)for(var d=1;d<arguments.length;d++)this.za+=arguments[d];return this};h.clear=function(){this.za=""};h.toString=function(){return this.za};if("undefined"===typeof Ta)var Ta=function(){throw Error("No *print-fn* fn set for evaluation environment");};var Ua=null;if("undefined"===typeof Va)var Va=null;function Wa(){return new Xa(null,5,[Ya,!0,Za,!0,$a,!1,ab,!1,cb,null],null)}function v(a){return null!=a&&!1!==a}function db(a){return a instanceof Array}function eb(a){return v(a)?!1:!0}function w(a,b){return a[r(null==b?null:b)]?!0:a._?!0:!1}function fb(a){return null==a?null:a.constructor}
function y(a,b){var c=fb(b),c=v(v(c)?c.Jb:c)?c.Ib:r(b);return Error(["No protocol method ",a," defined for type ",c,": ",b].join(""))}function gb(a){var b=a.Ib;return v(b)?b:""+B(a)}var hb="undefined"!==typeof Symbol&&"function"===r(Symbol)?Symbol.iterator:"@@iterator";function ib(a){for(var b=a.length,c=Array(b),d=0;;)if(d<b)c[d]=a[d],d+=1;else break;return c}
var jb={},kb={},lb=function lb(b){if(b?b.P:b)return b.P(b);var c;c=lb[r(null==b?null:b)];if(!c&&(c=lb._,!c))throw y("ICounted.-count",b);return c.call(null,b)},mb=function mb(b,c){if(b?b.G:b)return b.G(b,c);var d;d=mb[r(null==b?null:b)];if(!d&&(d=mb._,!d))throw y("ICollection.-conj",b);return d.call(null,b,c)},ob={},C=function(){function a(a,b,f){if(a?a.V:a)return a.V(a,b,f);var g;g=c[r(null==a?null:a)];if(!g&&(g=c._,!g))throw y("IIndexed.-nth",a);return g.call(null,a,b,f)}function b(a,b){if(a?a.t:
a)return a.t(a,b);var f;f=c[r(null==a?null:a)];if(!f&&(f=c._,!f))throw y("IIndexed.-nth",a);return f.call(null,a,b)}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.b=a;return c}(),pb={},E=function E(b){if(b?b.M:b)return b.M(b);var c;c=E[r(null==b?null:b)];if(!c&&(c=E._,!c))throw y("ISeq.-first",b);return c.call(null,b)},F=function F(b){if(b?b.T:b)return b.T(b);var c;c=F[r(null==
b?null:b)];if(!c&&(c=F._,!c))throw y("ISeq.-rest",b);return c.call(null,b)},qb={},rb={},sb=function(){function a(a,b,f){if(a?a.A:a)return a.A(a,b,f);var g;g=c[r(null==a?null:a)];if(!g&&(g=c._,!g))throw y("ILookup.-lookup",a);return g.call(null,a,b,f)}function b(a,b){if(a?a.H:a)return a.H(a,b);var f;f=c[r(null==a?null:a)];if(!f&&(f=c._,!f))throw y("ILookup.-lookup",a);return f.call(null,a,b)}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,
c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.b=a;return c}(),tb=function tb(b,c,d){if(b?b.Ha:b)return b.Ha(b,c,d);var e;e=tb[r(null==b?null:b)];if(!e&&(e=tb._,!e))throw y("IAssociative.-assoc",b);return e.call(null,b,c,d)},ub={},vb={},wb=function wb(b){if(b?b.fb:b)return b.fb();var c;c=wb[r(null==b?null:b)];if(!c&&(c=wb._,!c))throw y("IMapEntry.-key",b);return c.call(null,b)},xb=function xb(b){if(b?b.gb:b)return b.gb();var c;c=xb[r(null==b?null:b)];if(!c&&(c=xb._,!c))throw y("IMapEntry.-val",
b);return c.call(null,b)},yb={},Ab=function Ab(b,c,d){if(b?b.hb:b)return b.hb(b,c,d);var e;e=Ab[r(null==b?null:b)];if(!e&&(e=Ab._,!e))throw y("IVector.-assoc-n",b);return e.call(null,b,c,d)},Bb=function Bb(b){if(b?b.Ka:b)return b.Ka(b);var c;c=Bb[r(null==b?null:b)];if(!c&&(c=Bb._,!c))throw y("IDeref.-deref",b);return c.call(null,b)},Cb={},Db=function Db(b){if(b?b.C:b)return b.C(b);var c;c=Db[r(null==b?null:b)];if(!c&&(c=Db._,!c))throw y("IMeta.-meta",b);return c.call(null,b)},Eb={},Fb=function Fb(b,
c){if(b?b.J:b)return b.J(b,c);var d;d=Fb[r(null==b?null:b)];if(!d&&(d=Fb._,!d))throw y("IWithMeta.-with-meta",b);return d.call(null,b,c)},Gb={},Hb=function(){function a(a,b,f){if(a?a.L:a)return a.L(a,b,f);var g;g=c[r(null==a?null:a)];if(!g&&(g=c._,!g))throw y("IReduce.-reduce",a);return g.call(null,a,b,f)}function b(a,b){if(a?a.K:a)return a.K(a,b);var f;f=c[r(null==a?null:a)];if(!f&&(f=c._,!f))throw y("IReduce.-reduce",a);return f.call(null,a,b)}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,
c,e);case 3:return a.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.b=a;return c}(),Ib=function Ib(b,c){if(b?b.n:b)return b.n(b,c);var d;d=Ib[r(null==b?null:b)];if(!d&&(d=Ib._,!d))throw y("IEquiv.-equiv",b);return d.call(null,b,c)},Jb=function Jb(b){if(b?b.w:b)return b.w(b);var c;c=Jb[r(null==b?null:b)];if(!c&&(c=Jb._,!c))throw y("IHash.-hash",b);return c.call(null,b)},Kb={},Lb=function Lb(b){if(b?b.I:b)return b.I(b);var c;c=Lb[r(null==b?null:b)];if(!c&&(c=Lb._,!c))throw y("ISeqable.-seq",
b);return c.call(null,b)},Mb={},G=function G(b,c){if(b?b.pb:b)return b.pb(0,c);var d;d=G[r(null==b?null:b)];if(!d&&(d=G._,!d))throw y("IWriter.-write",b);return d.call(null,b,c)},Nb={},Ob=function Ob(b,c,d){if(b?b.v:b)return b.v(b,c,d);var e;e=Ob[r(null==b?null:b)];if(!e&&(e=Ob._,!e))throw y("IPrintWithWriter.-pr-writer",b);return e.call(null,b,c,d)},Pb=function Pb(b,c,d){if(b?b.ob:b)return b.ob(0,c,d);var e;e=Pb[r(null==b?null:b)];if(!e&&(e=Pb._,!e))throw y("IWatchable.-notify-watches",b);return e.call(null,
b,c,d)},Qb=function Qb(b){if(b?b.Ra:b)return b.Ra(b);var c;c=Qb[r(null==b?null:b)];if(!c&&(c=Qb._,!c))throw y("IEditableCollection.-as-transient",b);return c.call(null,b)},Rb=function Rb(b,c){if(b?b.Va:b)return b.Va(b,c);var d;d=Rb[r(null==b?null:b)];if(!d&&(d=Rb._,!d))throw y("ITransientCollection.-conj!",b);return d.call(null,b,c)},Tb=function Tb(b){if(b?b.Wa:b)return b.Wa(b);var c;c=Tb[r(null==b?null:b)];if(!c&&(c=Tb._,!c))throw y("ITransientCollection.-persistent!",b);return c.call(null,b)},Ub=
function Ub(b,c,d){if(b?b.Ma:b)return b.Ma(b,c,d);var e;e=Ub[r(null==b?null:b)];if(!e&&(e=Ub._,!e))throw y("ITransientAssociative.-assoc!",b);return e.call(null,b,c,d)},Vb=function Vb(b,c,d){if(b?b.nb:b)return b.nb(0,c,d);var e;e=Vb[r(null==b?null:b)];if(!e&&(e=Vb._,!e))throw y("ITransientVector.-assoc-n!",b);return e.call(null,b,c,d)},Wb=function Wb(b){if(b?b.lb:b)return b.lb();var c;c=Wb[r(null==b?null:b)];if(!c&&(c=Wb._,!c))throw y("IChunk.-drop-first",b);return c.call(null,b)},Xb=function Xb(b){if(b?
b.cb:b)return b.cb(b);var c;c=Xb[r(null==b?null:b)];if(!c&&(c=Xb._,!c))throw y("IChunkedSeq.-chunked-first",b);return c.call(null,b)},H=function H(b){if(b?b.eb:b)return b.eb(b);var c;c=H[r(null==b?null:b)];if(!c&&(c=H._,!c))throw y("IChunkedSeq.-chunked-rest",b);return c.call(null,b)},Yb=function Yb(b){if(b?b.bb:b)return b.bb(b);var c;c=Yb[r(null==b?null:b)];if(!c&&(c=Yb._,!c))throw y("IChunkedNext.-chunked-next",b);return c.call(null,b)},Zb=function Zb(b,c){if(b?b.Cb:b)return b.Cb(b,c);var d;d=Zb[r(null==
b?null:b)];if(!d&&(d=Zb._,!d))throw y("IReset.-reset!",b);return d.call(null,b,c)},$b=function(){function a(a,b,c,d,m){if(a?a.Gb:a)return a.Gb(a,b,c,d,m);var n;n=e[r(null==a?null:a)];if(!n&&(n=e._,!n))throw y("ISwap.-swap!",a);return n.call(null,a,b,c,d,m)}function b(a,b,c,d){if(a?a.Fb:a)return a.Fb(a,b,c,d);var m;m=e[r(null==a?null:a)];if(!m&&(m=e._,!m))throw y("ISwap.-swap!",a);return m.call(null,a,b,c,d)}function c(a,b,c){if(a?a.Eb:a)return a.Eb(a,b,c);var d;d=e[r(null==a?null:a)];if(!d&&(d=e._,
!d))throw y("ISwap.-swap!",a);return d.call(null,a,b,c)}function d(a,b){if(a?a.Db:a)return a.Db(a,b);var c;c=e[r(null==a?null:a)];if(!c&&(c=e._,!c))throw y("ISwap.-swap!",a);return c.call(null,a,b)}var e=null,e=function(e,g,k,l,m){switch(arguments.length){case 2:return d.call(this,e,g);case 3:return c.call(this,e,g,k);case 4:return b.call(this,e,g,k,l);case 5:return a.call(this,e,g,k,l,m)}throw Error("Invalid arity: "+arguments.length);};e.a=d;e.b=c;e.j=b;e.u=a;return e}(),ac=function ac(b){if(b?
b.Ta:b)return b.Ta(b);var c;c=ac[r(null==b?null:b)];if(!c&&(c=ac._,!c))throw y("IIterable.-iterator",b);return c.call(null,b)};function bc(a){this.Kb=a;this.p=0;this.g=1073741824}bc.prototype.pb=function(a,b){return this.Kb.append(b)};function cc(a){var b=new Ra;a.v(null,new bc(b),Wa());return""+B(b)}
var dc="undefined"!==typeof Math.imul&&0!==(Math.imul.a?Math.imul.a(4294967295,5):Math.imul.call(null,4294967295,5))?function(a,b){return Math.imul.a?Math.imul.a(a,b):Math.imul.call(null,a,b)}:function(a,b){var c=a&65535,d=b&65535;return c*d+((a>>>16&65535)*d+c*(b>>>16&65535)<<16>>>0)|0};function ec(a){a=dc(a|0,-862048943);return dc(a<<15|a>>>-15,461845907)}function fc(a,b){var c=(a|0)^(b|0);return dc(c<<13|c>>>-13,5)+-430675100|0}
function gc(a,b){var c=(a|0)^b,c=dc(c^c>>>16,-2048144789),c=dc(c^c>>>13,-1028477387);return c^c>>>16}function hc(a){var b;a:{b=1;for(var c=0;;)if(b<a.length){var d=b+2,c=fc(c,ec(a.charCodeAt(b-1)|a.charCodeAt(b)<<16));b=d}else{b=c;break a}}b=1===(a.length&1)?b^ec(a.charCodeAt(a.length-1)):b;return gc(b,dc(2,a.length))}var ic={},jc=0;
function kc(a){255<jc&&(ic={},jc=0);var b=ic[a];if("number"!==typeof b){a:if(null!=a)if(b=a.length,0<b)for(var c=0,d=0;;)if(c<b)var e=c+1,d=dc(31,d)+a.charCodeAt(c),c=e;else{b=d;break a}else b=0;else b=0;ic[a]=b;jc+=1}return a=b}
function lc(a){a&&(a.g&4194304||a.Nb)?a=a.w(null):"number"===typeof a?a=(Math.floor.c?Math.floor.c(a):Math.floor.call(null,a))%2147483647:!0===a?a=1:!1===a?a=0:"string"===typeof a?(a=kc(a),0!==a&&(a=ec(a),a=fc(0,a),a=gc(a,4))):a=a instanceof Date?a.valueOf():null==a?0:Jb(a);return a}function mc(a,b){return a^b+2654435769+(a<<6)+(a>>2)}
function nc(a,b){if(a.fa===b.fa)return 0;var c=eb(a.O);if(v(c?b.O:c))return-1;if(v(a.O)){if(eb(b.O))return 1;c=ta(a.O,b.O);return 0===c?ta(a.name,b.name):c}return ta(a.name,b.name)}function oc(a,b,c,d,e){this.O=a;this.name=b;this.fa=c;this.Ba=d;this.U=e;this.g=2154168321;this.p=4096}h=oc.prototype;h.v=function(a,b){return G(b,this.fa)};h.w=function(){var a=this.Ba;return null!=a?a:this.Ba=a=mc(hc(this.name),kc(this.O))};h.J=function(a,b){return new oc(this.O,this.name,this.fa,this.Ba,b)};h.C=function(){return this.U};
h.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return sb.b(c,this,null);case 3:return sb.b(c,this,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return sb.b(c,this,null)};a.b=function(a,c,d){return sb.b(c,this,d)};return a}();h.apply=function(a,b){return this.call.apply(this,[this].concat(ib(b)))};h.c=function(a){return sb.b(a,this,null)};h.a=function(a,b){return sb.b(a,this,b)};h.n=function(a,b){return b instanceof oc?this.fa===b.fa:!1};
h.toString=function(){return this.fa};h.equiv=function(a){return this.n(null,a)};function I(a){if(null==a)return null;if(a&&(a.g&8388608||a.Ob))return a.I(null);if(db(a)||"string"===typeof a)return 0===a.length?null:new J(a,0);if(w(Kb,a))return Lb(a);throw Error([B(a),B(" is not ISeqable")].join(""));}function L(a){if(null==a)return null;if(a&&(a.g&64||a.La))return a.M(null);a=I(a);return null==a?null:E(a)}function M(a){return null!=a?a&&(a.g&64||a.La)?a.T(null):(a=I(a))?F(a):pc:pc}
function N(a){return null==a?null:a&&(a.g&128||a.Ua)?a.S(null):I(M(a))}
var qc=function(){function a(a,b){return null==a?null==b:a===b||Ib(a,b)}var b=null,c=function(){function a(b,d,k){var l=null;if(2<arguments.length){for(var l=0,m=Array(arguments.length-2);l<m.length;)m[l]=arguments[l+2],++l;l=new J(m,0)}return c.call(this,b,d,l)}function c(a,d,e){for(;;)if(b.a(a,d))if(N(e))a=d,d=L(e),e=N(e);else return b.a(d,L(e));else return!1}a.l=2;a.i=function(a){var b=L(a);a=N(a);var d=L(a);a=M(a);return c(b,d,a)};a.f=c;return a}(),b=function(b,e,f){switch(arguments.length){case 1:return!0;
case 2:return a.call(this,b,e);default:var g=null;if(2<arguments.length){for(var g=0,k=Array(arguments.length-2);g<k.length;)k[g]=arguments[g+2],++g;g=new J(k,0)}return c.f(b,e,g)}throw Error("Invalid arity: "+arguments.length);};b.l=2;b.i=c.i;b.c=function(){return!0};b.a=a;b.f=c.f;return b}();function rc(a){this.q=a}rc.prototype.next=function(){if(null!=this.q){var a=L(this.q);this.q=N(this.q);return{done:!1,value:a}}return{done:!0,value:null}};function sc(a){return new rc(I(a))}
function uc(a,b){var c=ec(a),c=fc(0,c);return gc(c,b)}function vc(a){var b=0,c=1;for(a=I(a);;)if(null!=a)b+=1,c=dc(31,c)+lc(L(a))|0,a=N(a);else return uc(c,b)}var wc=uc(1,0);function xc(a){var b=0,c=0;for(a=I(a);;)if(null!=a)b+=1,c=c+lc(L(a))|0,a=N(a);else return uc(c,b)}var yc=uc(0,0);kb["null"]=!0;lb["null"]=function(){return 0};Date.prototype.Ia=!0;Date.prototype.Ja=function(a,b){return ta(this.valueOf(),b.valueOf())};Date.prototype.n=function(a,b){return b instanceof Date&&this.valueOf()===b.valueOf()};
Ib.number=function(a,b){return a===b};Cb["function"]=!0;Db["function"]=function(){return null};jb["function"]=!0;Jb._=function(a){return a[fa]||(a[fa]=++ga)};function zc(a){this.$=a;this.p=0;this.g=32768}zc.prototype.Ka=function(){return this.$};function Ac(a){return a instanceof zc}function O(a){return Bb(a)}
var Bc=function(){function a(a,b,c,d){for(var l=lb(a);;)if(d<l){var m=C.a(a,d);c=b.a?b.a(c,m):b.call(null,c,m);if(Ac(c))return Bb(c);d+=1}else return c}function b(a,b,c){var d=lb(a),l=c;for(c=0;;)if(c<d){var m=C.a(a,c),l=b.a?b.a(l,m):b.call(null,l,m);if(Ac(l))return Bb(l);c+=1}else return l}function c(a,b){var c=lb(a);if(0===c)return b.s?b.s():b.call(null);for(var d=C.a(a,0),l=1;;)if(l<c){var m=C.a(a,l),d=b.a?b.a(d,m):b.call(null,d,m);if(Ac(d))return Bb(d);l+=1}else return d}var d=null,d=function(d,
f,g,k){switch(arguments.length){case 2:return c.call(this,d,f);case 3:return b.call(this,d,f,g);case 4:return a.call(this,d,f,g,k)}throw Error("Invalid arity: "+arguments.length);};d.a=c;d.b=b;d.j=a;return d}(),Cc=function(){function a(a,b,c,d){for(var l=a.length;;)if(d<l){var m=a[d];c=b.a?b.a(c,m):b.call(null,c,m);if(Ac(c))return Bb(c);d+=1}else return c}function b(a,b,c){var d=a.length,l=c;for(c=0;;)if(c<d){var m=a[c],l=b.a?b.a(l,m):b.call(null,l,m);if(Ac(l))return Bb(l);c+=1}else return l}function c(a,
b){var c=a.length;if(0===a.length)return b.s?b.s():b.call(null);for(var d=a[0],l=1;;)if(l<c){var m=a[l],d=b.a?b.a(d,m):b.call(null,d,m);if(Ac(d))return Bb(d);l+=1}else return d}var d=null,d=function(d,f,g,k){switch(arguments.length){case 2:return c.call(this,d,f);case 3:return b.call(this,d,f,g);case 4:return a.call(this,d,f,g,k)}throw Error("Invalid arity: "+arguments.length);};d.a=c;d.b=b;d.j=a;return d}();function Dc(a){return a?a.g&2||a.tb?!0:a.g?!1:w(kb,a):w(kb,a)}
function Ec(a){return a?a.g&16||a.mb?!0:a.g?!1:w(ob,a):w(ob,a)}function Fc(a,b){this.d=a;this.k=b}Fc.prototype.jb=function(){return this.k<this.d.length};Fc.prototype.next=function(){var a=this.d[this.k];this.k+=1;return a};function J(a,b){this.d=a;this.k=b;this.g=166199550;this.p=8192}h=J.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.t=function(a,b){var c=b+this.k;return c<this.d.length?this.d[c]:null};
h.V=function(a,b,c){a=b+this.k;return a<this.d.length?this.d[a]:c};h.Ta=function(){return new Fc(this.d,this.k)};h.S=function(){return this.k+1<this.d.length?new J(this.d,this.k+1):null};h.P=function(){return this.d.length-this.k};h.w=function(){return vc(this)};h.n=function(a,b){return Gc.a?Gc.a(this,b):Gc.call(null,this,b)};h.K=function(a,b){return Cc.j(this.d,b,this.d[this.k],this.k+1)};h.L=function(a,b,c){return Cc.j(this.d,b,c,this.k)};h.M=function(){return this.d[this.k]};
h.T=function(){return this.k+1<this.d.length?new J(this.d,this.k+1):pc};h.I=function(){return this};h.G=function(a,b){return P.a?P.a(b,this):P.call(null,b,this)};J.prototype[hb]=function(){return sc(this)};
var Hc=function(){function a(a,b){return b<a.length?new J(a,b):null}function b(a){return c.a(a,0)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.c=b;c.a=a;return c}(),Ic=function(){function a(a,b){return Hc.a(a,b)}function b(a){return Hc.a(a,0)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+
arguments.length);};c.c=b;c.a=a;return c}();Ib._=function(a,b){return a===b};
var Kc=function(){function a(a,b){return null!=a?mb(a,b):mb(pc,b)}var b=null,c=function(){function a(b,d,k){var l=null;if(2<arguments.length){for(var l=0,m=Array(arguments.length-2);l<m.length;)m[l]=arguments[l+2],++l;l=new J(m,0)}return c.call(this,b,d,l)}function c(a,d,e){for(;;)if(v(e))a=b.a(a,d),d=L(e),e=N(e);else return b.a(a,d)}a.l=2;a.i=function(a){var b=L(a);a=N(a);var d=L(a);a=M(a);return c(b,d,a)};a.f=c;return a}(),b=function(b,e,f){switch(arguments.length){case 0:return Jc;case 1:return b;
case 2:return a.call(this,b,e);default:var g=null;if(2<arguments.length){for(var g=0,k=Array(arguments.length-2);g<k.length;)k[g]=arguments[g+2],++g;g=new J(k,0)}return c.f(b,e,g)}throw Error("Invalid arity: "+arguments.length);};b.l=2;b.i=c.i;b.s=function(){return Jc};b.c=function(a){return a};b.a=a;b.f=c.f;return b}();
function Q(a){if(null!=a)if(a&&(a.g&2||a.tb))a=a.P(null);else if(db(a))a=a.length;else if("string"===typeof a)a=a.length;else if(w(kb,a))a=lb(a);else a:{a=I(a);for(var b=0;;){if(Dc(a)){a=b+lb(a);break a}a=N(a);b+=1}}else a=0;return a}
var Lc=function(){function a(a,b,c){for(;;){if(null==a)return c;if(0===b)return I(a)?L(a):c;if(Ec(a))return C.b(a,b,c);if(I(a))a=N(a),--b;else return c}}function b(a,b){for(;;){if(null==a)throw Error("Index out of bounds");if(0===b){if(I(a))return L(a);throw Error("Index out of bounds");}if(Ec(a))return C.a(a,b);if(I(a)){var c=N(a),g=b-1;a=c;b=g}else throw Error("Index out of bounds");}}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,
c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.b=a;return c}(),R=function(){function a(a,b,c){if("number"!==typeof b)throw Error("index argument to nth must be a number.");if(null==a)return c;if(a&&(a.g&16||a.mb))return a.V(null,b,c);if(db(a)||"string"===typeof a)return b<a.length?a[b]:c;if(w(ob,a))return C.a(a,b);if(a?a.g&64||a.La||(a.g?0:w(pb,a)):w(pb,a))return Lc.b(a,b,c);throw Error([B("nth not supported on this type "),B(gb(fb(a)))].join(""));}function b(a,b){if("number"!==
typeof b)throw Error("index argument to nth must be a number");if(null==a)return a;if(a&&(a.g&16||a.mb))return a.t(null,b);if(db(a)||"string"===typeof a)return b<a.length?a[b]:null;if(w(ob,a))return C.a(a,b);if(a?a.g&64||a.La||(a.g?0:w(pb,a)):w(pb,a))return Lc.a(a,b);throw Error([B("nth not supported on this type "),B(gb(fb(a)))].join(""));}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);
};c.a=b;c.b=a;return c}(),T=function(){function a(a,b,c){return null!=a?a&&(a.g&256||a.wb)?a.A(null,b,c):db(a)?b<a.length?a[b]:c:"string"===typeof a?b<a.length?a[b]:c:w(rb,a)?sb.b(a,b,c):c:c}function b(a,b){return null==a?null:a&&(a.g&256||a.wb)?a.H(null,b):db(a)?b<a.length?a[b]:null:"string"===typeof a?b<a.length?a[b]:null:w(rb,a)?sb.a(a,b):null}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);
};c.a=b;c.b=a;return c}(),Nc=function(){function a(a,b,c){return null!=a?tb(a,b,c):Mc([b],[c])}var b=null,c=function(){function a(b,d,k,l){var m=null;if(3<arguments.length){for(var m=0,n=Array(arguments.length-3);m<n.length;)n[m]=arguments[m+3],++m;m=new J(n,0)}return c.call(this,b,d,k,m)}function c(a,d,e,l){for(;;)if(a=b.b(a,d,e),v(l))d=L(l),e=L(N(l)),l=N(N(l));else return a}a.l=3;a.i=function(a){var b=L(a);a=N(a);var d=L(a);a=N(a);var l=L(a);a=M(a);return c(b,d,l,a)};a.f=c;return a}(),b=function(b,
e,f,g){switch(arguments.length){case 3:return a.call(this,b,e,f);default:var k=null;if(3<arguments.length){for(var k=0,l=Array(arguments.length-3);k<l.length;)l[k]=arguments[k+3],++k;k=new J(l,0)}return c.f(b,e,f,k)}throw Error("Invalid arity: "+arguments.length);};b.l=3;b.i=c.i;b.b=a;b.f=c.f;return b}();function Oc(a){var b="function"==r(a);return v(b)?b:a?v(v(null)?null:a.sb)?!0:a.Tb?!1:w(jb,a):w(jb,a)}function Pc(a,b){this.e=a;this.o=b;this.p=0;this.g=393217}h=Pc.prototype;
h.call=function(){function a(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,A,S,ka){a=this.e;return Qc.Sa?Qc.Sa(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,A,S,ka):Qc.call(null,a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,A,S,ka)}function b(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,A,S){a=this;return a.e.ra?a.e.ra(b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,A,S):a.e.call(null,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,A,S)}function c(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,A){a=this;return a.e.qa?a.e.qa(b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,
A):a.e.call(null,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,A)}function d(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K){a=this;return a.e.pa?a.e.pa(b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K):a.e.call(null,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K)}function e(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D){a=this;return a.e.oa?a.e.oa(b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D):a.e.call(null,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D)}function f(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z){a=this;return a.e.na?a.e.na(b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z):a.e.call(null,
b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z)}function g(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x){a=this;return a.e.ma?a.e.ma(b,c,d,e,f,g,k,l,m,n,p,q,t,u,x):a.e.call(null,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x)}function k(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u){a=this;return a.e.la?a.e.la(b,c,d,e,f,g,k,l,m,n,p,q,t,u):a.e.call(null,b,c,d,e,f,g,k,l,m,n,p,q,t,u)}function l(a,b,c,d,e,f,g,k,l,m,n,p,q,t){a=this;return a.e.ka?a.e.ka(b,c,d,e,f,g,k,l,m,n,p,q,t):a.e.call(null,b,c,d,e,f,g,k,l,m,n,p,q,t)}function m(a,b,c,d,e,f,g,k,l,m,n,p,q){a=this;
return a.e.ja?a.e.ja(b,c,d,e,f,g,k,l,m,n,p,q):a.e.call(null,b,c,d,e,f,g,k,l,m,n,p,q)}function n(a,b,c,d,e,f,g,k,l,m,n,p){a=this;return a.e.ia?a.e.ia(b,c,d,e,f,g,k,l,m,n,p):a.e.call(null,b,c,d,e,f,g,k,l,m,n,p)}function p(a,b,c,d,e,f,g,k,l,m,n){a=this;return a.e.ha?a.e.ha(b,c,d,e,f,g,k,l,m,n):a.e.call(null,b,c,d,e,f,g,k,l,m,n)}function q(a,b,c,d,e,f,g,k,l,m){a=this;return a.e.ta?a.e.ta(b,c,d,e,f,g,k,l,m):a.e.call(null,b,c,d,e,f,g,k,l,m)}function t(a,b,c,d,e,f,g,k,l){a=this;return a.e.sa?a.e.sa(b,c,
d,e,f,g,k,l):a.e.call(null,b,c,d,e,f,g,k,l)}function u(a,b,c,d,e,f,g,k){a=this;return a.e.Y?a.e.Y(b,c,d,e,f,g,k):a.e.call(null,b,c,d,e,f,g,k)}function x(a,b,c,d,e,f,g){a=this;return a.e.R?a.e.R(b,c,d,e,f,g):a.e.call(null,b,c,d,e,f,g)}function z(a,b,c,d,e,f){a=this;return a.e.u?a.e.u(b,c,d,e,f):a.e.call(null,b,c,d,e,f)}function D(a,b,c,d,e){a=this;return a.e.j?a.e.j(b,c,d,e):a.e.call(null,b,c,d,e)}function K(a,b,c,d){a=this;return a.e.b?a.e.b(b,c,d):a.e.call(null,b,c,d)}function S(a,b,c){a=this;return a.e.a?
a.e.a(b,c):a.e.call(null,b,c)}function ka(a,b){a=this;return a.e.c?a.e.c(b):a.e.call(null,b)}function Na(a){a=this;return a.e.s?a.e.s():a.e.call(null)}var A=null,A=function(A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb,nb,zb,Sb,tc,Xc,Gd,Ye,gg){switch(arguments.length){case 1:return Na.call(this,A);case 2:return ka.call(this,A,Y);case 3:return S.call(this,A,Y,ba);case 4:return K.call(this,A,Y,ba,ea);case 5:return D.call(this,A,Y,ba,ea,ja);case 6:return z.call(this,A,Y,ba,ea,ja,na);case 7:return x.call(this,
A,Y,ba,ea,ja,na,ra);case 8:return u.call(this,A,Y,ba,ea,ja,na,ra,va);case 9:return t.call(this,A,Y,ba,ea,ja,na,ra,va,za);case 10:return q.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba);case 11:return p.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa);case 12:return n.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma);case 13:return m.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa);case 14:return l.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb);case 15:return k.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb,nb);
case 16:return g.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb,nb,zb);case 17:return f.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb,nb,zb,Sb);case 18:return e.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb,nb,zb,Sb,tc);case 19:return d.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb,nb,zb,Sb,tc,Xc);case 20:return c.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb,nb,zb,Sb,tc,Xc,Gd);case 21:return b.call(this,A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb,nb,zb,Sb,tc,Xc,Gd,Ye);case 22:return a.call(this,
A,Y,ba,ea,ja,na,ra,va,za,Ba,Fa,Ma,Sa,bb,nb,zb,Sb,tc,Xc,Gd,Ye,gg)}throw Error("Invalid arity: "+arguments.length);};A.c=Na;A.a=ka;A.b=S;A.j=K;A.u=D;A.R=z;A.Y=x;A.sa=u;A.ta=t;A.ha=q;A.ia=p;A.ja=n;A.ka=m;A.la=l;A.ma=k;A.na=g;A.oa=f;A.pa=e;A.qa=d;A.ra=c;A.vb=b;A.Sa=a;return A}();h.apply=function(a,b){return this.call.apply(this,[this].concat(ib(b)))};h.s=function(){return this.e.s?this.e.s():this.e.call(null)};h.c=function(a){return this.e.c?this.e.c(a):this.e.call(null,a)};
h.a=function(a,b){return this.e.a?this.e.a(a,b):this.e.call(null,a,b)};h.b=function(a,b,c){return this.e.b?this.e.b(a,b,c):this.e.call(null,a,b,c)};h.j=function(a,b,c,d){return this.e.j?this.e.j(a,b,c,d):this.e.call(null,a,b,c,d)};h.u=function(a,b,c,d,e){return this.e.u?this.e.u(a,b,c,d,e):this.e.call(null,a,b,c,d,e)};h.R=function(a,b,c,d,e,f){return this.e.R?this.e.R(a,b,c,d,e,f):this.e.call(null,a,b,c,d,e,f)};
h.Y=function(a,b,c,d,e,f,g){return this.e.Y?this.e.Y(a,b,c,d,e,f,g):this.e.call(null,a,b,c,d,e,f,g)};h.sa=function(a,b,c,d,e,f,g,k){return this.e.sa?this.e.sa(a,b,c,d,e,f,g,k):this.e.call(null,a,b,c,d,e,f,g,k)};h.ta=function(a,b,c,d,e,f,g,k,l){return this.e.ta?this.e.ta(a,b,c,d,e,f,g,k,l):this.e.call(null,a,b,c,d,e,f,g,k,l)};h.ha=function(a,b,c,d,e,f,g,k,l,m){return this.e.ha?this.e.ha(a,b,c,d,e,f,g,k,l,m):this.e.call(null,a,b,c,d,e,f,g,k,l,m)};
h.ia=function(a,b,c,d,e,f,g,k,l,m,n){return this.e.ia?this.e.ia(a,b,c,d,e,f,g,k,l,m,n):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n)};h.ja=function(a,b,c,d,e,f,g,k,l,m,n,p){return this.e.ja?this.e.ja(a,b,c,d,e,f,g,k,l,m,n,p):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n,p)};h.ka=function(a,b,c,d,e,f,g,k,l,m,n,p,q){return this.e.ka?this.e.ka(a,b,c,d,e,f,g,k,l,m,n,p,q):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n,p,q)};
h.la=function(a,b,c,d,e,f,g,k,l,m,n,p,q,t){return this.e.la?this.e.la(a,b,c,d,e,f,g,k,l,m,n,p,q,t):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n,p,q,t)};h.ma=function(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u){return this.e.ma?this.e.ma(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n,p,q,t,u)};h.na=function(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x){return this.e.na?this.e.na(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x)};
h.oa=function(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z){return this.e.oa?this.e.oa(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z)};h.pa=function(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D){return this.e.pa?this.e.pa(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D)};
h.qa=function(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K){return this.e.qa?this.e.qa(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K)};h.ra=function(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S){return this.e.ra?this.e.ra(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S):this.e.call(null,a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S)};
h.vb=function(a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S,ka){var Na=this.e;return Qc.Sa?Qc.Sa(Na,a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S,ka):Qc.call(null,Na,a,b,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S,ka)};h.sb=!0;h.J=function(a,b){return new Pc(this.e,b)};h.C=function(){return this.o};function Rc(a,b){return Oc(a)&&!(a?a.g&262144||a.Rb||(a.g?0:w(Eb,a)):w(Eb,a))?new Pc(a,b):null==a?null:Fb(a,b)}function Sc(a){var b=null!=a;return(b?a?a.g&131072||a.zb||(a.g?0:w(Cb,a)):w(Cb,a):b)?Db(a):null}
function Tc(a){return null==a?!1:a?a.g&1024||a.xb?!0:a.g?!1:w(ub,a):w(ub,a)}function Uc(a){return a?a.g&16384||a.Qb?!0:a.g?!1:w(yb,a):w(yb,a)}function Vc(a){return a?a.p&512||a.Mb?!0:!1:!1}
var Wc=function(){var a=null,b=function(){function a(c){var f=null;if(0<arguments.length){for(var f=0,g=Array(arguments.length-0);f<g.length;)g[f]=arguments[f+0],++f;f=new J(g,0)}return b.call(this,f)}function b(a){return Qc.a?Qc.a(Qa,a):Qc.call(null,Qa,a)}a.l=0;a.i=function(a){a=I(a);return b(a)};a.f=b;return a}(),a=function(a){switch(arguments.length){case 0:return{};default:var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new J(e,0)}return b.f(d)}throw Error("Invalid arity: "+
arguments.length);};a.l=0;a.i=b.i;a.s=function(){return{}};a.f=b.f;return a}();function Yc(a){var b=[];Pa(a,function(a,b){return function(a,c){return b.push(c)}}(a,b));return b}function Zc(a,b,c,d,e){for(;0!==e;)c[d]=a[b],d+=1,--e,b+=1}function $c(a,b,c,d,e){b+=e-1;for(d+=e-1;0!==e;)c[d]=a[b],--d,--e,--b}var ad={};function bd(a){return null==a?!1:a?a.g&64||a.La?!0:a.g?!1:w(pb,a):w(pb,a)}function cd(a){return v(a)?!0:!1}
function dd(a,b){if(a===b)return 0;if(null==a)return-1;if(null==b)return 1;if(fb(a)===fb(b))return a&&(a.p&2048||a.Ia)?a.Ja(null,b):ta(a,b);throw Error("compare on non-nil objects of different types");}
var ed=function(){function a(a,b,c,g){for(;;){var k=dd(R.a(a,g),R.a(b,g));if(0===k&&g+1<c)g+=1;else return k}}function b(a,b){var f=Q(a),g=Q(b);return f<g?-1:f>g?1:c.j(a,b,f,0)}var c=null,c=function(c,e,f,g){switch(arguments.length){case 2:return b.call(this,c,e);case 4:return a.call(this,c,e,f,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.j=a;return c}(),U=function(){function a(a,b,c){for(c=I(c);;)if(c){var g=L(c);b=a.a?a.a(b,g):a.call(null,b,g);if(Ac(b))return Bb(b);c=N(c)}else return b}
function b(a,b){var c=I(b);if(c){var g=L(c),c=N(c);return fd.b?fd.b(a,g,c):fd.call(null,a,g,c)}return a.s?a.s():a.call(null)}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.b=a;return c}(),fd=function(){function a(a,b,c){return c&&(c.g&524288||c.Bb)?c.L(null,a,b):db(c)?Cc.b(c,a,b):"string"===typeof c?Cc.b(c,a,b):w(Gb,c)?Hb.b(c,a,b):U.b(a,b,c)}function b(a,b){return b&&(b.g&
524288||b.Bb)?b.K(null,a):db(b)?Cc.a(b,a):"string"===typeof b?Cc.a(b,a):w(Gb,b)?Hb.a(b,a):U.a(a,b)}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.b=a;return c}();function gd(a){return a}
var hd=function(){function a(a,b,c,g){a=a.c?a.c(b):a.call(null,b);c=fd.b(a,c,g);return a.c?a.c(c):a.call(null,c)}function b(a,b,f){return c.j(a,b,b.s?b.s():b.call(null),f)}var c=null,c=function(c,e,f,g){switch(arguments.length){case 3:return b.call(this,c,e,f);case 4:return a.call(this,c,e,f,g)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.j=a;return c}();
function id(a){a=(a-a%2)/2;return 0<=a?Math.floor.c?Math.floor.c(a):Math.floor.call(null,a):Math.ceil.c?Math.ceil.c(a):Math.ceil.call(null,a)}function jd(a){a-=a>>1&1431655765;a=(a&858993459)+(a>>2&858993459);return 16843009*(a+(a>>4)&252645135)>>24}
var B=function(){function a(a){return null==a?"":la(a)}var b=null,c=function(){function a(b,d){var k=null;if(1<arguments.length){for(var k=0,l=Array(arguments.length-1);k<l.length;)l[k]=arguments[k+1],++k;k=new J(l,0)}return c.call(this,b,k)}function c(a,d){for(var e=new Ra(b.c(a)),l=d;;)if(v(l))e=e.append(b.c(L(l))),l=N(l);else return e.toString()}a.l=1;a.i=function(a){var b=L(a);a=M(a);return c(b,a)};a.f=c;return a}(),b=function(b,e){switch(arguments.length){case 0:return"";case 1:return a.call(this,
b);default:var f=null;if(1<arguments.length){for(var f=0,g=Array(arguments.length-1);f<g.length;)g[f]=arguments[f+1],++f;f=new J(g,0)}return c.f(b,f)}throw Error("Invalid arity: "+arguments.length);};b.l=1;b.i=c.i;b.s=function(){return""};b.c=a;b.f=c.f;return b}();
function Gc(a,b){var c;if(b?b.g&16777216||b.Pb||(b.g?0:w(Mb,b)):w(Mb,b))if(Dc(a)&&Dc(b)&&Q(a)!==Q(b))c=!1;else a:{c=I(a);for(var d=I(b);;){if(null==c){c=null==d;break a}if(null!=d&&qc.a(L(c),L(d)))c=N(c),d=N(d);else{c=!1;break a}}}else c=null;return cd(c)}function kd(a,b,c,d,e){this.o=a;this.first=b;this.va=c;this.count=d;this.m=e;this.g=65937646;this.p=8192}h=kd.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.C=function(){return this.o};
h.S=function(){return 1===this.count?null:this.va};h.P=function(){return this.count};h.w=function(){var a=this.m;return null!=a?a:this.m=a=vc(this)};h.n=function(a,b){return Gc(this,b)};h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.M=function(){return this.first};h.T=function(){return 1===this.count?pc:this.va};h.I=function(){return this};h.J=function(a,b){return new kd(b,this.first,this.va,this.count,this.m)};
h.G=function(a,b){return new kd(this.o,b,this,this.count+1,null)};kd.prototype[hb]=function(){return sc(this)};function ld(a){this.o=a;this.g=65937614;this.p=8192}h=ld.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.C=function(){return this.o};h.S=function(){return null};h.P=function(){return 0};h.w=function(){return wc};h.n=function(a,b){return Gc(this,b)};h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.M=function(){return null};
h.T=function(){return pc};h.I=function(){return null};h.J=function(a,b){return new ld(b)};h.G=function(a,b){return new kd(this.o,b,null,1,null)};var pc=new ld(null);ld.prototype[hb]=function(){return sc(this)};
var md=function(){function a(a){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new J(e,0)}return b.call(this,d)}function b(a){var b;if(a instanceof J&&0===a.k)b=a.d;else a:for(b=[];;)if(null!=a)b.push(a.M(null)),a=a.S(null);else break a;a=b.length;for(var e=pc;;)if(0<a){var f=a-1,e=e.G(null,b[a-1]);a=f}else return e}a.l=0;a.i=function(a){a=I(a);return b(a)};a.f=b;return a}();
function nd(a,b,c,d){this.o=a;this.first=b;this.va=c;this.m=d;this.g=65929452;this.p=8192}h=nd.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.C=function(){return this.o};h.S=function(){return null==this.va?null:I(this.va)};h.w=function(){var a=this.m;return null!=a?a:this.m=a=vc(this)};h.n=function(a,b){return Gc(this,b)};h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.M=function(){return this.first};
h.T=function(){return null==this.va?pc:this.va};h.I=function(){return this};h.J=function(a,b){return new nd(b,this.first,this.va,this.m)};h.G=function(a,b){return new nd(null,b,this,this.m)};nd.prototype[hb]=function(){return sc(this)};function P(a,b){var c=null==b;return(c?c:b&&(b.g&64||b.La))?new nd(null,a,b,null):new nd(null,a,I(b),null)}
function od(a,b){if(a.ca===b.ca)return 0;var c=eb(a.O);if(v(c?b.O:c))return-1;if(v(a.O)){if(eb(b.O))return 1;c=ta(a.O,b.O);return 0===c?ta(a.name,b.name):c}return ta(a.name,b.name)}function V(a,b,c,d){this.O=a;this.name=b;this.ca=c;this.Ba=d;this.g=2153775105;this.p=4096}h=V.prototype;h.v=function(a,b){return G(b,[B(":"),B(this.ca)].join(""))};h.w=function(){var a=this.Ba;return null!=a?a:this.Ba=a=mc(hc(this.name),kc(this.O))+2654435769|0};
h.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return T.a(c,this);case 3:return T.b(c,this,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return T.a(c,this)};a.b=function(a,c,d){return T.b(c,this,d)};return a}();h.apply=function(a,b){return this.call.apply(this,[this].concat(ib(b)))};h.c=function(a){return T.a(a,this)};h.a=function(a,b){return T.b(a,this,b)};h.n=function(a,b){return b instanceof V?this.ca===b.ca:!1};
h.toString=function(){return[B(":"),B(this.ca)].join("")};h.equiv=function(a){return this.n(null,a)};function pd(a){if(a&&(a.p&4096||a.Ab))return a.O;throw Error([B("Doesn't support namespace: "),B(a)].join(""));}
var rd=function(){function a(a,b){return new V(a,b,[B(v(a)?[B(a),B("/")].join(""):null),B(b)].join(""),null)}function b(a){if(a instanceof V)return a;if(a instanceof oc)return new V(pd(a),qd.c?qd.c(a):qd.call(null,a),a.fa,null);if("string"===typeof a){var b=a.split("/");return 2===b.length?new V(b[0],b[1],a,null):new V(null,b[0],a,null)}return null}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);
};c.c=b;c.a=a;return c}();function sd(a,b,c,d){this.o=a;this.Ea=b;this.q=c;this.m=d;this.p=0;this.g=32374988}h=sd.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};function td(a){null!=a.Ea&&(a.q=a.Ea.s?a.Ea.s():a.Ea.call(null),a.Ea=null);return a.q}h.C=function(){return this.o};h.S=function(){Lb(this);return null==this.q?null:N(this.q)};h.w=function(){var a=this.m;return null!=a?a:this.m=a=vc(this)};h.n=function(a,b){return Gc(this,b)};
h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.M=function(){Lb(this);return null==this.q?null:L(this.q)};h.T=function(){Lb(this);return null!=this.q?M(this.q):pc};h.I=function(){td(this);if(null==this.q)return null;for(var a=this.q;;)if(a instanceof sd)a=td(a);else return this.q=a,I(this.q)};h.J=function(a,b){return new sd(b,this.Ea,this.q,this.m)};h.G=function(a,b){return P(b,this)};sd.prototype[hb]=function(){return sc(this)};
function ud(a,b){this.Za=a;this.end=b;this.p=0;this.g=2}ud.prototype.P=function(){return this.end};ud.prototype.add=function(a){this.Za[this.end]=a;return this.end+=1};ud.prototype.ga=function(){var a=new vd(this.Za,0,this.end);this.Za=null;return a};function vd(a,b,c){this.d=a;this.F=b;this.end=c;this.p=0;this.g=524306}h=vd.prototype;h.K=function(a,b){return Cc.j(this.d,b,this.d[this.F],this.F+1)};h.L=function(a,b,c){return Cc.j(this.d,b,c,this.F)};
h.lb=function(){if(this.F===this.end)throw Error("-drop-first of empty chunk");return new vd(this.d,this.F+1,this.end)};h.t=function(a,b){return this.d[this.F+b]};h.V=function(a,b,c){return 0<=b&&b<this.end-this.F?this.d[this.F+b]:c};h.P=function(){return this.end-this.F};
var wd=function(){function a(a,b,c){return new vd(a,b,c)}function b(a,b){return new vd(a,b,a.length)}function c(a){return new vd(a,0,a.length)}var d=null,d=function(d,f,g){switch(arguments.length){case 1:return c.call(this,d);case 2:return b.call(this,d,f);case 3:return a.call(this,d,f,g)}throw Error("Invalid arity: "+arguments.length);};d.c=c;d.a=b;d.b=a;return d}();function xd(a,b,c,d){this.ga=a;this.ea=b;this.o=c;this.m=d;this.g=31850732;this.p=1536}h=xd.prototype;h.toString=function(){return cc(this)};
h.equiv=function(a){return this.n(null,a)};h.C=function(){return this.o};h.S=function(){if(1<lb(this.ga))return new xd(Wb(this.ga),this.ea,this.o,null);var a=Lb(this.ea);return null==a?null:a};h.w=function(){var a=this.m;return null!=a?a:this.m=a=vc(this)};h.n=function(a,b){return Gc(this,b)};h.M=function(){return C.a(this.ga,0)};h.T=function(){return 1<lb(this.ga)?new xd(Wb(this.ga),this.ea,this.o,null):null==this.ea?pc:this.ea};h.I=function(){return this};h.cb=function(){return this.ga};
h.eb=function(){return null==this.ea?pc:this.ea};h.J=function(a,b){return new xd(this.ga,this.ea,b,this.m)};h.G=function(a,b){return P(b,this)};h.bb=function(){return null==this.ea?null:this.ea};xd.prototype[hb]=function(){return sc(this)};function yd(a,b){return 0===lb(a)?b:new xd(a,b,null,null)}function zd(a,b){a.add(b)}function Ad(a){for(var b=[];;)if(I(a))b.push(L(a)),a=N(a);else return b}function Bd(a,b){if(Dc(a))return Q(a);for(var c=a,d=b,e=0;;)if(0<d&&I(c))c=N(c),--d,e+=1;else return e}
var Cd=function Cd(b){return null==b?null:null==N(b)?I(L(b)):P(L(b),Cd(N(b)))},Dd=function(){function a(a,b){return new sd(null,function(){var c=I(a);return c?Vc(c)?yd(Xb(c),d.a(H(c),b)):P(L(c),d.a(M(c),b)):b},null,null)}function b(a){return new sd(null,function(){return a},null,null)}function c(){return new sd(null,function(){return null},null,null)}var d=null,e=function(){function a(c,d,e){var f=null;if(2<arguments.length){for(var f=0,p=Array(arguments.length-2);f<p.length;)p[f]=arguments[f+2],
++f;f=new J(p,0)}return b.call(this,c,d,f)}function b(a,c,e){return function p(a,b){return new sd(null,function(){var c=I(a);return c?Vc(c)?yd(Xb(c),p(H(c),b)):P(L(c),p(M(c),b)):v(b)?p(L(b),N(b)):null},null,null)}(d.a(a,c),e)}a.l=2;a.i=function(a){var c=L(a);a=N(a);var d=L(a);a=M(a);return b(c,d,a)};a.f=b;return a}(),d=function(d,g,k){switch(arguments.length){case 0:return c.call(this);case 1:return b.call(this,d);case 2:return a.call(this,d,g);default:var l=null;if(2<arguments.length){for(var l=
0,m=Array(arguments.length-2);l<m.length;)m[l]=arguments[l+2],++l;l=new J(m,0)}return e.f(d,g,l)}throw Error("Invalid arity: "+arguments.length);};d.l=2;d.i=e.i;d.s=c;d.c=b;d.a=a;d.f=e.f;return d}(),Ed=function(){function a(a,b,c,d){return P(a,P(b,P(c,d)))}function b(a,b,c){return P(a,P(b,c))}var c=null,d=function(){function a(c,d,e,m,n){var p=null;if(4<arguments.length){for(var p=0,q=Array(arguments.length-4);p<q.length;)q[p]=arguments[p+4],++p;p=new J(q,0)}return b.call(this,c,d,e,m,p)}function b(a,
c,d,e,f){return P(a,P(c,P(d,P(e,Cd(f)))))}a.l=4;a.i=function(a){var c=L(a);a=N(a);var d=L(a);a=N(a);var e=L(a);a=N(a);var n=L(a);a=M(a);return b(c,d,e,n,a)};a.f=b;return a}(),c=function(c,f,g,k,l){switch(arguments.length){case 1:return I(c);case 2:return P(c,f);case 3:return b.call(this,c,f,g);case 4:return a.call(this,c,f,g,k);default:var m=null;if(4<arguments.length){for(var m=0,n=Array(arguments.length-4);m<n.length;)n[m]=arguments[m+4],++m;m=new J(n,0)}return d.f(c,f,g,k,m)}throw Error("Invalid arity: "+
arguments.length);};c.l=4;c.i=d.i;c.c=function(a){return I(a)};c.a=function(a,b){return P(a,b)};c.b=b;c.j=a;c.f=d.f;return c}(),Fd=function(){function a(){return Qb(Jc)}var b=null,c=function(){function a(c,d,k){var l=null;if(2<arguments.length){for(var l=0,m=Array(arguments.length-2);l<m.length;)m[l]=arguments[l+2],++l;l=new J(m,0)}return b.call(this,c,d,l)}function b(a,c,d){for(;;)if(a=Rb(a,c),v(d))c=L(d),d=N(d);else return a}a.l=2;a.i=function(a){var c=L(a);a=N(a);var d=L(a);a=M(a);return b(c,d,
a)};a.f=b;return a}(),b=function(b,e,f){switch(arguments.length){case 0:return a.call(this);case 1:return b;case 2:return Rb(b,e);default:var g=null;if(2<arguments.length){for(var g=0,k=Array(arguments.length-2);g<k.length;)k[g]=arguments[g+2],++g;g=new J(k,0)}return c.f(b,e,g)}throw Error("Invalid arity: "+arguments.length);};b.l=2;b.i=c.i;b.s=a;b.c=function(a){return a};b.a=function(a,b){return Rb(a,b)};b.f=c.f;return b}(),Hd=function(){var a=null,b=function(){function a(c,f,g,k){var l=null;if(3<
arguments.length){for(var l=0,m=Array(arguments.length-3);l<m.length;)m[l]=arguments[l+3],++l;l=new J(m,0)}return b.call(this,c,f,g,l)}function b(a,c,d,k){for(;;)if(a=Ub(a,c,d),v(k))c=L(k),d=L(N(k)),k=N(N(k));else return a}a.l=3;a.i=function(a){var c=L(a);a=N(a);var g=L(a);a=N(a);var k=L(a);a=M(a);return b(c,g,k,a)};a.f=b;return a}(),a=function(a,d,e,f){switch(arguments.length){case 3:return Ub(a,d,e);default:var g=null;if(3<arguments.length){for(var g=0,k=Array(arguments.length-3);g<k.length;)k[g]=
arguments[g+3],++g;g=new J(k,0)}return b.f(a,d,e,g)}throw Error("Invalid arity: "+arguments.length);};a.l=3;a.i=b.i;a.b=function(a,b,e){return Ub(a,b,e)};a.f=b.f;return a}();
function Id(a,b,c){var d=I(c);if(0===b)return a.s?a.s():a.call(null);c=E(d);var e=F(d);if(1===b)return a.c?a.c(c):a.c?a.c(c):a.call(null,c);var d=E(e),f=F(e);if(2===b)return a.a?a.a(c,d):a.a?a.a(c,d):a.call(null,c,d);var e=E(f),g=F(f);if(3===b)return a.b?a.b(c,d,e):a.b?a.b(c,d,e):a.call(null,c,d,e);var f=E(g),k=F(g);if(4===b)return a.j?a.j(c,d,e,f):a.j?a.j(c,d,e,f):a.call(null,c,d,e,f);var g=E(k),l=F(k);if(5===b)return a.u?a.u(c,d,e,f,g):a.u?a.u(c,d,e,f,g):a.call(null,c,d,e,f,g);var k=E(l),m=F(l);
if(6===b)return a.R?a.R(c,d,e,f,g,k):a.R?a.R(c,d,e,f,g,k):a.call(null,c,d,e,f,g,k);var l=E(m),n=F(m);if(7===b)return a.Y?a.Y(c,d,e,f,g,k,l):a.Y?a.Y(c,d,e,f,g,k,l):a.call(null,c,d,e,f,g,k,l);var m=E(n),p=F(n);if(8===b)return a.sa?a.sa(c,d,e,f,g,k,l,m):a.sa?a.sa(c,d,e,f,g,k,l,m):a.call(null,c,d,e,f,g,k,l,m);var n=E(p),q=F(p);if(9===b)return a.ta?a.ta(c,d,e,f,g,k,l,m,n):a.ta?a.ta(c,d,e,f,g,k,l,m,n):a.call(null,c,d,e,f,g,k,l,m,n);var p=E(q),t=F(q);if(10===b)return a.ha?a.ha(c,d,e,f,g,k,l,m,n,p):a.ha?
a.ha(c,d,e,f,g,k,l,m,n,p):a.call(null,c,d,e,f,g,k,l,m,n,p);var q=E(t),u=F(t);if(11===b)return a.ia?a.ia(c,d,e,f,g,k,l,m,n,p,q):a.ia?a.ia(c,d,e,f,g,k,l,m,n,p,q):a.call(null,c,d,e,f,g,k,l,m,n,p,q);var t=E(u),x=F(u);if(12===b)return a.ja?a.ja(c,d,e,f,g,k,l,m,n,p,q,t):a.ja?a.ja(c,d,e,f,g,k,l,m,n,p,q,t):a.call(null,c,d,e,f,g,k,l,m,n,p,q,t);var u=E(x),z=F(x);if(13===b)return a.ka?a.ka(c,d,e,f,g,k,l,m,n,p,q,t,u):a.ka?a.ka(c,d,e,f,g,k,l,m,n,p,q,t,u):a.call(null,c,d,e,f,g,k,l,m,n,p,q,t,u);var x=E(z),D=F(z);
if(14===b)return a.la?a.la(c,d,e,f,g,k,l,m,n,p,q,t,u,x):a.la?a.la(c,d,e,f,g,k,l,m,n,p,q,t,u,x):a.call(null,c,d,e,f,g,k,l,m,n,p,q,t,u,x);var z=E(D),K=F(D);if(15===b)return a.ma?a.ma(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z):a.ma?a.ma(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z):a.call(null,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z);var D=E(K),S=F(K);if(16===b)return a.na?a.na(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D):a.na?a.na(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D):a.call(null,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D);var K=E(S),ka=F(S);if(17===b)return a.oa?
a.oa(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K):a.oa?a.oa(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K):a.call(null,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K);var S=E(ka),Na=F(ka);if(18===b)return a.pa?a.pa(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S):a.pa?a.pa(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S):a.call(null,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S);ka=E(Na);Na=F(Na);if(19===b)return a.qa?a.qa(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S,ka):a.qa?a.qa(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S,ka):a.call(null,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S,ka);var A=
E(Na);F(Na);if(20===b)return a.ra?a.ra(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S,ka,A):a.ra?a.ra(c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S,ka,A):a.call(null,c,d,e,f,g,k,l,m,n,p,q,t,u,x,z,D,K,S,ka,A);throw Error("Only up to 20 arguments supported on functions");}
var Qc=function(){function a(a,b,c,d,e){b=Ed.j(b,c,d,e);c=a.l;return a.i?(d=Bd(b,c+1),d<=c?Id(a,d,b):a.i(b)):a.apply(a,Ad(b))}function b(a,b,c,d){b=Ed.b(b,c,d);c=a.l;return a.i?(d=Bd(b,c+1),d<=c?Id(a,d,b):a.i(b)):a.apply(a,Ad(b))}function c(a,b,c){b=Ed.a(b,c);c=a.l;if(a.i){var d=Bd(b,c+1);return d<=c?Id(a,d,b):a.i(b)}return a.apply(a,Ad(b))}function d(a,b){var c=a.l;if(a.i){var d=Bd(b,c+1);return d<=c?Id(a,d,b):a.i(b)}return a.apply(a,Ad(b))}var e=null,f=function(){function a(c,d,e,f,g,t){var u=null;
if(5<arguments.length){for(var u=0,x=Array(arguments.length-5);u<x.length;)x[u]=arguments[u+5],++u;u=new J(x,0)}return b.call(this,c,d,e,f,g,u)}function b(a,c,d,e,f,g){c=P(c,P(d,P(e,P(f,Cd(g)))));d=a.l;return a.i?(e=Bd(c,d+1),e<=d?Id(a,e,c):a.i(c)):a.apply(a,Ad(c))}a.l=5;a.i=function(a){var c=L(a);a=N(a);var d=L(a);a=N(a);var e=L(a);a=N(a);var f=L(a);a=N(a);var g=L(a);a=M(a);return b(c,d,e,f,g,a)};a.f=b;return a}(),e=function(e,k,l,m,n,p){switch(arguments.length){case 2:return d.call(this,e,k);case 3:return c.call(this,
e,k,l);case 4:return b.call(this,e,k,l,m);case 5:return a.call(this,e,k,l,m,n);default:var q=null;if(5<arguments.length){for(var q=0,t=Array(arguments.length-5);q<t.length;)t[q]=arguments[q+5],++q;q=new J(t,0)}return f.f(e,k,l,m,n,q)}throw Error("Invalid arity: "+arguments.length);};e.l=5;e.i=f.i;e.a=d;e.b=c;e.j=b;e.u=a;e.f=f.f;return e}();function Jd(a,b){for(;;){if(null==I(b))return!0;var c;c=L(b);c=a.c?a.c(c):a.call(null,c);if(v(c)){c=a;var d=N(b);a=c;b=d}else return!1}}
function Kd(a,b,c,d){this.state=a;this.o=b;this.Lb=c;this.rb=d;this.g=6455296;this.p=16386}h=Kd.prototype;h.w=function(){return this[fa]||(this[fa]=++ga)};
h.ob=function(a,b,c){for(var d=I(this.rb),e=null,f=0,g=0;;)if(g<f){a=e.t(null,g);var k=R.b(a,0,null);a=R.b(a,1,null);var l=b,m=c;a.j?a.j(k,this,l,m):a.call(null,k,this,l,m);g+=1}else if(a=I(d))d=a,Vc(d)?(e=Xb(d),d=H(d),a=e,f=Q(e),e=a):(a=L(d),k=R.b(a,0,null),a=R.b(a,1,null),e=k,f=b,g=c,a.j?a.j(e,this,f,g):a.call(null,e,this,f,g),d=N(d),e=null,f=0),g=0;else return null};h.C=function(){return this.o};h.Ka=function(){return this.state};h.n=function(a,b){return this===b};
h.equiv=function(a){return this.n(null,a)};
var Nd=function(){function a(a){return new Kd(a,null,null,null)}var b=null,c=function(){function a(c,d){var k=null;if(1<arguments.length){for(var k=0,l=Array(arguments.length-1);k<l.length;)l[k]=arguments[k+1],++k;k=new J(l,0)}return b.call(this,c,k)}function b(a,c){var d=bd(c)?Qc.a(Ld,c):c,e=T.a(d,Md),d=T.a(d,$a);return new Kd(a,d,e,null)}a.l=1;a.i=function(a){var c=L(a);a=M(a);return b(c,a)};a.f=b;return a}(),b=function(b,e){switch(arguments.length){case 1:return a.call(this,b);default:var f=null;
if(1<arguments.length){for(var f=0,g=Array(arguments.length-1);f<g.length;)g[f]=arguments[f+1],++f;f=new J(g,0)}return c.f(b,f)}throw Error("Invalid arity: "+arguments.length);};b.l=1;b.i=c.i;b.c=a;b.f=c.f;return b}();
function Od(a,b){if(a instanceof Kd){var c=a.Lb;if(null!=c&&!v(c.c?c.c(b):c.call(null,b)))throw Error([B("Assert failed: "),B("Validator rejected reference state"),B("\n"),B(function(){var a=md(new oc(null,"validate","validate",1439230700,null),new oc(null,"new-value","new-value",-1567397401,null));return Pd.c?Pd.c(a):Pd.call(null,a)}())].join(""));c=a.state;a.state=b;null!=a.rb&&Pb(a,c,b);return b}return Zb(a,b)}
var Qd=function(){function a(a,b,c,d){if(a instanceof Kd){var e=a.state;b=b.b?b.b(e,c,d):b.call(null,e,c,d);a=Od(a,b)}else a=$b.j(a,b,c,d);return a}function b(a,b,c){if(a instanceof Kd){var d=a.state;b=b.a?b.a(d,c):b.call(null,d,c);a=Od(a,b)}else a=$b.b(a,b,c);return a}function c(a,b){var c;a instanceof Kd?(c=a.state,c=b.c?b.c(c):b.call(null,c),c=Od(a,c)):c=$b.a(a,b);return c}var d=null,e=function(){function a(c,d,e,f,p){var q=null;if(4<arguments.length){for(var q=0,t=Array(arguments.length-4);q<
t.length;)t[q]=arguments[q+4],++q;q=new J(t,0)}return b.call(this,c,d,e,f,q)}function b(a,c,d,e,f){return a instanceof Kd?Od(a,Qc.u(c,a.state,d,e,f)):$b.u(a,c,d,e,f)}a.l=4;a.i=function(a){var c=L(a);a=N(a);var d=L(a);a=N(a);var e=L(a);a=N(a);var f=L(a);a=M(a);return b(c,d,e,f,a)};a.f=b;return a}(),d=function(d,g,k,l,m){switch(arguments.length){case 2:return c.call(this,d,g);case 3:return b.call(this,d,g,k);case 4:return a.call(this,d,g,k,l);default:var n=null;if(4<arguments.length){for(var n=0,p=
Array(arguments.length-4);n<p.length;)p[n]=arguments[n+4],++n;n=new J(p,0)}return e.f(d,g,k,l,n)}throw Error("Invalid arity: "+arguments.length);};d.l=4;d.i=e.i;d.a=c;d.b=b;d.j=a;d.f=e.f;return d}();function Rd(a){this.state=a;this.p=0;this.g=32768}Rd.prototype.Ka=function(){return this.state};Rd.prototype.Hb=function(a){return this.state=a};
var Sd=function(){function a(a,b,c,d){return new sd(null,function(){var f=I(b),p=I(c),q=I(d);if(f&&p&&q){var t=P,u;u=L(f);var x=L(p),z=L(q);u=a.b?a.b(u,x,z):a.call(null,u,x,z);f=t(u,e.j(a,M(f),M(p),M(q)))}else f=null;return f},null,null)}function b(a,b,c){return new sd(null,function(){var d=I(b),f=I(c);if(d&&f){var p=P,q;q=L(d);var t=L(f);q=a.a?a.a(q,t):a.call(null,q,t);d=p(q,e.b(a,M(d),M(f)))}else d=null;return d},null,null)}function c(a,b){return new sd(null,function(){var c=I(b);if(c){if(Vc(c)){for(var d=
Xb(c),f=Q(d),p=new ud(Array(f),0),q=0;;)if(q<f)zd(p,function(){var b=C.a(d,q);return a.c?a.c(b):a.call(null,b)}()),q+=1;else break;return yd(p.ga(),e.a(a,H(c)))}return P(function(){var b=L(c);return a.c?a.c(b):a.call(null,b)}(),e.a(a,M(c)))}return null},null,null)}function d(a){return function(b){return function(){function c(d,e){var f=a.c?a.c(e):a.call(null,e);return b.a?b.a(d,f):b.call(null,d,f)}function d(a){return b.c?b.c(a):b.call(null,a)}function e(){return b.s?b.s():b.call(null)}var f=null,
q=function(){function c(a,b,e){var f=null;if(2<arguments.length){for(var f=0,g=Array(arguments.length-2);f<g.length;)g[f]=arguments[f+2],++f;f=new J(g,0)}return d.call(this,a,b,f)}function d(c,e,f){e=Qc.b(a,e,f);return b.a?b.a(c,e):b.call(null,c,e)}c.l=2;c.i=function(a){var b=L(a);a=N(a);var c=L(a);a=M(a);return d(b,c,a)};c.f=d;return c}(),f=function(a,b,f){switch(arguments.length){case 0:return e.call(this);case 1:return d.call(this,a);case 2:return c.call(this,a,b);default:var g=null;if(2<arguments.length){for(var g=
0,k=Array(arguments.length-2);g<k.length;)k[g]=arguments[g+2],++g;g=new J(k,0)}return q.f(a,b,g)}throw Error("Invalid arity: "+arguments.length);};f.l=2;f.i=q.i;f.s=e;f.c=d;f.a=c;f.f=q.f;return f}()}}var e=null,f=function(){function a(c,d,e,f,g){var t=null;if(4<arguments.length){for(var t=0,u=Array(arguments.length-4);t<u.length;)u[t]=arguments[t+4],++t;t=new J(u,0)}return b.call(this,c,d,e,f,t)}function b(a,c,d,f,g){var k=function x(a){return new sd(null,function(){var b=e.a(I,a);return Jd(gd,b)?
P(e.a(L,b),x(e.a(M,b))):null},null,null)};return e.a(function(){return function(b){return Qc.a(a,b)}}(k),k(Kc.f(g,f,Ic([d,c],0))))}a.l=4;a.i=function(a){var c=L(a);a=N(a);var d=L(a);a=N(a);var e=L(a);a=N(a);var f=L(a);a=M(a);return b(c,d,e,f,a)};a.f=b;return a}(),e=function(e,k,l,m,n){switch(arguments.length){case 1:return d.call(this,e);case 2:return c.call(this,e,k);case 3:return b.call(this,e,k,l);case 4:return a.call(this,e,k,l,m);default:var p=null;if(4<arguments.length){for(var p=0,q=Array(arguments.length-
4);p<q.length;)q[p]=arguments[p+4],++p;p=new J(q,0)}return f.f(e,k,l,m,p)}throw Error("Invalid arity: "+arguments.length);};e.l=4;e.i=f.i;e.c=d;e.a=c;e.b=b;e.j=a;e.f=f.f;return e}(),Td=function(){function a(a,b){return new sd(null,function(){if(0<a){var f=I(b);return f?P(L(f),c.a(a-1,M(f))):null}return null},null,null)}function b(a){return function(b){return function(a){return function(){function c(d,g){var k=Bb(a),l=a.Hb(a.Ka(null)-1),k=0<k?b.a?b.a(d,g):b.call(null,d,g):d;return 0<l?k:Ac(k)?k:new zc(k)}
function d(a){return b.c?b.c(a):b.call(null,a)}function l(){return b.s?b.s():b.call(null)}var m=null,m=function(a,b){switch(arguments.length){case 0:return l.call(this);case 1:return d.call(this,a);case 2:return c.call(this,a,b)}throw Error("Invalid arity: "+arguments.length);};m.s=l;m.c=d;m.a=c;return m}()}(new Rd(a))}}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.c=b;c.a=a;return c}(),
Ud=function(){function a(a,b){return Td.a(a,c.c(b))}function b(a){return new sd(null,function(){return P(a,c.c(a))},null,null)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.c=b;c.a=a;return c}(),Vd=function(){function a(a,c){return new sd(null,function(){var f=I(a),g=I(c);return f&&g?P(L(f),P(L(g),b.a(M(f),M(g)))):null},null,null)}var b=null,c=function(){function a(b,d,k){var l=null;
if(2<arguments.length){for(var l=0,m=Array(arguments.length-2);l<m.length;)m[l]=arguments[l+2],++l;l=new J(m,0)}return c.call(this,b,d,l)}function c(a,d,e){return new sd(null,function(){var c=Sd.a(I,Kc.f(e,d,Ic([a],0)));return Jd(gd,c)?Dd.a(Sd.a(L,c),Qc.a(b,Sd.a(M,c))):null},null,null)}a.l=2;a.i=function(a){var b=L(a);a=N(a);var d=L(a);a=M(a);return c(b,d,a)};a.f=c;return a}(),b=function(b,e,f){switch(arguments.length){case 2:return a.call(this,b,e);default:var g=null;if(2<arguments.length){for(var g=
0,k=Array(arguments.length-2);g<k.length;)k[g]=arguments[g+2],++g;g=new J(k,0)}return c.f(b,e,g)}throw Error("Invalid arity: "+arguments.length);};b.l=2;b.i=c.i;b.a=a;b.f=c.f;return b}(),Wd=function(){function a(a,b,c){a&&(a.p&4||a.ub)?(b=hd.j(b,Fd,Qb(a),c),b=Tb(b),a=Rc(b,Sc(a))):a=hd.j(b,Kc,a,c);return a}function b(a,b){var c;null!=a?a&&(a.p&4||a.ub)?(c=fd.b(Rb,Qb(a),b),c=Tb(c),c=Rc(c,Sc(a))):c=fd.b(mb,a,b):c=fd.b(Kc,pc,b);return c}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,
c,e);case 3:return a.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.b=a;return c}();function Xd(a,b){this.r=a;this.d=b}function Yd(a){return new Xd(a,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null])}function Zd(a){a=a.h;return 32>a?0:a-1>>>5<<5}function $d(a,b,c){for(;;){if(0===b)return c;var d=Yd(a);d.d[0]=c;c=d;b-=5}}
var ae=function ae(b,c,d,e){var f=new Xd(d.r,ib(d.d)),g=b.h-1>>>c&31;5===c?f.d[g]=e:(d=d.d[g],b=null!=d?ae(b,c-5,d,e):$d(null,c-5,e),f.d[g]=b);return f};function be(a,b){throw Error([B("No item "),B(a),B(" in vector of length "),B(b)].join(""));}function ce(a,b){if(b>=Zd(a))return a.Q;for(var c=a.root,d=a.shift;;)if(0<d)var e=d-5,c=c.d[b>>>d&31],d=e;else return c.d}function de(a,b){return 0<=b&&b<a.h?ce(a,b):be(b,a.h)}
var ee=function ee(b,c,d,e,f){var g=new Xd(d.r,ib(d.d));if(0===c)g.d[e&31]=f;else{var k=e>>>c&31;b=ee(b,c-5,d.d[k],e,f);g.d[k]=b}return g};function fe(a,b,c,d,e,f){this.k=a;this.Qa=b;this.d=c;this.wa=d;this.start=e;this.end=f}fe.prototype.jb=function(){return this.k<this.end};fe.prototype.next=function(){32===this.k-this.Qa&&(this.d=ce(this.wa,this.k),this.Qa+=32);var a=this.d[this.k&31];this.k+=1;return a};
function W(a,b,c,d,e,f){this.o=a;this.h=b;this.shift=c;this.root=d;this.Q=e;this.m=f;this.g=167668511;this.p=8196}h=W.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.H=function(a,b){return sb.b(this,b,null)};h.A=function(a,b,c){return"number"===typeof b?C.b(this,b,c):c};h.t=function(a,b){return de(this,b)[b&31]};h.V=function(a,b,c){return 0<=b&&b<this.h?ce(this,b)[b&31]:c};
h.hb=function(a,b,c){if(0<=b&&b<this.h)return Zd(this)<=b?(a=ib(this.Q),a[b&31]=c,new W(this.o,this.h,this.shift,this.root,a,null)):new W(this.o,this.h,this.shift,ee(this,this.shift,this.root,b,c),this.Q,null);if(b===this.h)return mb(this,c);throw Error([B("Index "),B(b),B(" out of bounds  [0,"),B(this.h),B("]")].join(""));};h.Ta=function(){var a=this.h;return new fe(0,0,0<Q(this)?ce(this,0):null,this,0,a)};h.C=function(){return this.o};h.P=function(){return this.h};
h.fb=function(){return C.a(this,0)};h.gb=function(){return C.a(this,1)};h.w=function(){var a=this.m;return null!=a?a:this.m=a=vc(this)};h.n=function(a,b){if(b instanceof W)if(this.h===Q(b))for(var c=ac(this),d=ac(b);;)if(v(c.jb())){var e=c.next(),f=d.next();if(!qc.a(e,f))return!1}else return!0;else return!1;else return Gc(this,b)};
h.Ra=function(){var a=this;return new ge(a.h,a.shift,function(){var b=a.root;return he.c?he.c(b):he.call(null,b)}(),function(){var b=a.Q;return ie.c?ie.c(b):ie.call(null,b)}())};h.K=function(a,b){return Bc.a(this,b)};h.L=function(a,b,c){a=0;for(var d=c;;)if(a<this.h){var e=ce(this,a);c=e.length;a:for(var f=0;;)if(f<c){var g=e[f],d=b.a?b.a(d,g):b.call(null,d,g);if(Ac(d)){e=d;break a}f+=1}else{e=d;break a}if(Ac(e))return b=e,O.c?O.c(b):O.call(null,b);a+=c;d=e}else return d};
h.Ha=function(a,b,c){if("number"===typeof b)return Ab(this,b,c);throw Error("Vector's key for assoc must be a number.");};h.I=function(){if(0===this.h)return null;if(32>=this.h)return new J(this.Q,0);var a;a:{a=this.root;for(var b=this.shift;;)if(0<b)b-=5,a=a.d[0];else{a=a.d;break a}}return je.j?je.j(this,a,0,0):je.call(null,this,a,0,0)};h.J=function(a,b){return new W(b,this.h,this.shift,this.root,this.Q,this.m)};
h.G=function(a,b){if(32>this.h-Zd(this)){for(var c=this.Q.length,d=Array(c+1),e=0;;)if(e<c)d[e]=this.Q[e],e+=1;else break;d[c]=b;return new W(this.o,this.h+1,this.shift,this.root,d,null)}c=(d=this.h>>>5>1<<this.shift)?this.shift+5:this.shift;d?(d=Yd(null),d.d[0]=this.root,e=$d(null,this.shift,new Xd(null,this.Q)),d.d[1]=e):d=ae(this,this.shift,this.root,new Xd(null,this.Q));return new W(this.o,this.h+1,c,d,[b],null)};
h.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.t(null,c);case 3:return this.V(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.t(null,c)};a.b=function(a,c,d){return this.V(null,c,d)};return a}();h.apply=function(a,b){return this.call.apply(this,[this].concat(ib(b)))};h.c=function(a){return this.t(null,a)};h.a=function(a,b){return this.V(null,a,b)};
var ke=new Xd(null,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]),Jc=new W(null,0,5,ke,[],wc);W.prototype[hb]=function(){return sc(this)};function le(a,b,c,d,e,f){this.X=a;this.ua=b;this.k=c;this.F=d;this.o=e;this.m=f;this.g=32375020;this.p=1536}h=le.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.C=function(){return this.o};
h.S=function(){if(this.F+1<this.ua.length){var a;a=this.X;var b=this.ua,c=this.k,d=this.F+1;a=je.j?je.j(a,b,c,d):je.call(null,a,b,c,d);return null==a?null:a}return Yb(this)};h.w=function(){var a=this.m;return null!=a?a:this.m=a=vc(this)};h.n=function(a,b){return Gc(this,b)};h.K=function(a,b){var c=this;return Bc.a(function(){var a=c.X,b=c.k+c.F,f=Q(c.X);return me.b?me.b(a,b,f):me.call(null,a,b,f)}(),b)};
h.L=function(a,b,c){var d=this;return Bc.b(function(){var a=d.X,b=d.k+d.F,c=Q(d.X);return me.b?me.b(a,b,c):me.call(null,a,b,c)}(),b,c)};h.M=function(){return this.ua[this.F]};h.T=function(){if(this.F+1<this.ua.length){var a;a=this.X;var b=this.ua,c=this.k,d=this.F+1;a=je.j?je.j(a,b,c,d):je.call(null,a,b,c,d);return null==a?pc:a}return H(this)};h.I=function(){return this};h.cb=function(){return wd.a(this.ua,this.F)};
h.eb=function(){var a=this.k+this.ua.length;if(a<lb(this.X)){var b=this.X,c=ce(this.X,a);return je.j?je.j(b,c,a,0):je.call(null,b,c,a,0)}return pc};h.J=function(a,b){var c=this.X,d=this.ua,e=this.k,f=this.F;return je.u?je.u(c,d,e,f,b):je.call(null,c,d,e,f,b)};h.G=function(a,b){return P(b,this)};h.bb=function(){var a=this.k+this.ua.length;if(a<lb(this.X)){var b=this.X,c=ce(this.X,a);return je.j?je.j(b,c,a,0):je.call(null,b,c,a,0)}return null};le.prototype[hb]=function(){return sc(this)};
var je=function(){function a(a,b,c,d,l){return new le(a,b,c,d,l,null)}function b(a,b,c,d){return new le(a,b,c,d,null,null)}function c(a,b,c){return new le(a,de(a,b),b,c,null,null)}var d=null,d=function(d,f,g,k,l){switch(arguments.length){case 3:return c.call(this,d,f,g);case 4:return b.call(this,d,f,g,k);case 5:return a.call(this,d,f,g,k,l)}throw Error("Invalid arity: "+arguments.length);};d.b=c;d.j=b;d.u=a;return d}();
function ne(a,b,c,d,e){this.o=a;this.wa=b;this.start=c;this.end=d;this.m=e;this.g=167666463;this.p=8192}h=ne.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.H=function(a,b){return sb.b(this,b,null)};h.A=function(a,b,c){return"number"===typeof b?C.b(this,b,c):c};h.t=function(a,b){return 0>b||this.end<=this.start+b?be(b,this.end-this.start):C.a(this.wa,this.start+b)};h.V=function(a,b,c){return 0>b||this.end<=this.start+b?c:C.b(this.wa,this.start+b,c)};
h.hb=function(a,b,c){var d=this.start+b;a=this.o;c=Nc.b(this.wa,d,c);b=this.start;var e=this.end,d=d+1,d=e>d?e:d;return oe.u?oe.u(a,c,b,d,null):oe.call(null,a,c,b,d,null)};h.C=function(){return this.o};h.P=function(){return this.end-this.start};h.w=function(){var a=this.m;return null!=a?a:this.m=a=vc(this)};h.n=function(a,b){return Gc(this,b)};h.K=function(a,b){return Bc.a(this,b)};h.L=function(a,b,c){return Bc.b(this,b,c)};
h.Ha=function(a,b,c){if("number"===typeof b)return Ab(this,b,c);throw Error("Subvec's key for assoc must be a number.");};h.I=function(){var a=this;return function(b){return function d(e){return e===a.end?null:P(C.a(a.wa,e),new sd(null,function(){return function(){return d(e+1)}}(b),null,null))}}(this)(a.start)};h.J=function(a,b){var c=this.wa,d=this.start,e=this.end,f=this.m;return oe.u?oe.u(b,c,d,e,f):oe.call(null,b,c,d,e,f)};
h.G=function(a,b){var c=this.o,d=Ab(this.wa,this.end,b),e=this.start,f=this.end+1;return oe.u?oe.u(c,d,e,f,null):oe.call(null,c,d,e,f,null)};h.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.t(null,c);case 3:return this.V(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.t(null,c)};a.b=function(a,c,d){return this.V(null,c,d)};return a}();h.apply=function(a,b){return this.call.apply(this,[this].concat(ib(b)))};
h.c=function(a){return this.t(null,a)};h.a=function(a,b){return this.V(null,a,b)};ne.prototype[hb]=function(){return sc(this)};function oe(a,b,c,d,e){for(;;)if(b instanceof ne)c=b.start+c,d=b.start+d,b=b.wa;else{var f=Q(b);if(0>c||0>d||c>f||d>f)throw Error("Index out of bounds");return new ne(a,b,c,d,e)}}
var me=function(){function a(a,b,c){return oe(null,a,b,c,null)}function b(a,b){return c.b(a,b,Q(a))}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.b=a;return c}();function pe(a,b){return a===b.r?b:new Xd(a,ib(b.d))}function he(a){return new Xd({},ib(a.d))}
function ie(a){var b=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];Zc(a,0,b,0,a.length);return b}var qe=function qe(b,c,d,e){d=pe(b.root.r,d);var f=b.h-1>>>c&31;if(5===c)b=e;else{var g=d.d[f];b=null!=g?qe(b,c-5,g,e):$d(b.root.r,c-5,e)}d.d[f]=b;return d};function ge(a,b,c,d){this.h=a;this.shift=b;this.root=c;this.Q=d;this.g=275;this.p=88}h=ge.prototype;
h.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.H(null,c);case 3:return this.A(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.H(null,c)};a.b=function(a,c,d){return this.A(null,c,d)};return a}();h.apply=function(a,b){return this.call.apply(this,[this].concat(ib(b)))};h.c=function(a){return this.H(null,a)};h.a=function(a,b){return this.A(null,a,b)};h.H=function(a,b){return sb.b(this,b,null)};
h.A=function(a,b,c){return"number"===typeof b?C.b(this,b,c):c};h.t=function(a,b){if(this.root.r)return de(this,b)[b&31];throw Error("nth after persistent!");};h.V=function(a,b,c){return 0<=b&&b<this.h?C.a(this,b):c};h.P=function(){if(this.root.r)return this.h;throw Error("count after persistent!");};
h.nb=function(a,b,c){var d=this;if(d.root.r){if(0<=b&&b<d.h)return Zd(this)<=b?d.Q[b&31]=c:(a=function(){return function f(a,k){var l=pe(d.root.r,k);if(0===a)l.d[b&31]=c;else{var m=b>>>a&31,n=f(a-5,l.d[m]);l.d[m]=n}return l}}(this).call(null,d.shift,d.root),d.root=a),this;if(b===d.h)return Rb(this,c);throw Error([B("Index "),B(b),B(" out of bounds for TransientVector of length"),B(d.h)].join(""));}throw Error("assoc! after persistent!");};
h.Ma=function(a,b,c){if("number"===typeof b)return Vb(this,b,c);throw Error("TransientVector's key for assoc! must be a number.");};
h.Va=function(a,b){if(this.root.r){if(32>this.h-Zd(this))this.Q[this.h&31]=b;else{var c=new Xd(this.root.r,this.Q),d=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];d[0]=b;this.Q=d;if(this.h>>>5>1<<this.shift){var d=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],e=this.shift+
5;d[0]=this.root;d[1]=$d(this.root.r,this.shift,c);this.root=new Xd(this.root.r,d);this.shift=e}else this.root=qe(this,this.shift,this.root,c)}this.h+=1;return this}throw Error("conj! after persistent!");};h.Wa=function(){if(this.root.r){this.root.r=null;var a=this.h-Zd(this),b=Array(a);Zc(this.Q,0,b,0,a);return new W(null,this.h,this.shift,this.root,b,null)}throw Error("persistent! called twice");};function re(){this.p=0;this.g=2097152}re.prototype.n=function(){return!1};
re.prototype.equiv=function(a){return this.n(null,a)};var se=new re;function te(a,b){return cd(Tc(b)?Q(a)===Q(b)?Jd(gd,Sd.a(function(a){return qc.a(T.b(b,L(a),se),L(N(a)))},a)):null:null)}function ue(a){this.q=a}ue.prototype.next=function(){if(null!=this.q){var a=L(this.q),b=R.b(a,0,null),a=R.b(a,1,null);this.q=N(this.q);return{done:!1,value:[b,a]}}return{done:!0,value:null}};function ve(a){return new ue(I(a))}
function we(a,b){var c=a.d;if(b instanceof V)a:for(var d=c.length,e=b.ca,f=0;;){if(d<=f){c=-1;break a}var g=c[f];if(g instanceof V&&e===g.ca){c=f;break a}f+=2}else if(d=ca(b),v(v(d)?d:"number"===typeof b))a:for(d=c.length,e=0;;){if(d<=e){c=-1;break a}if(b===c[e]){c=e;break a}e+=2}else if(b instanceof oc)a:for(d=c.length,e=b.fa,f=0;;){if(d<=f){c=-1;break a}g=c[f];if(g instanceof oc&&e===g.fa){c=f;break a}f+=2}else if(null==b)a:for(d=c.length,e=0;;){if(d<=e){c=-1;break a}if(null==c[e]){c=e;break a}e+=
2}else a:for(d=c.length,e=0;;){if(d<=e){c=-1;break a}if(qc.a(b,c[e])){c=e;break a}e+=2}return c}function xe(a,b,c){this.d=a;this.k=b;this.U=c;this.p=0;this.g=32374990}h=xe.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.C=function(){return this.U};h.S=function(){return this.k<this.d.length-2?new xe(this.d,this.k+2,this.U):null};h.P=function(){return(this.d.length-this.k)/2};h.w=function(){return vc(this)};h.n=function(a,b){return Gc(this,b)};
h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.M=function(){return new W(null,2,5,ke,[this.d[this.k],this.d[this.k+1]],null)};h.T=function(){return this.k<this.d.length-2?new xe(this.d,this.k+2,this.U):pc};h.I=function(){return this};h.J=function(a,b){return new xe(this.d,this.k,b)};h.G=function(a,b){return P(b,this)};xe.prototype[hb]=function(){return sc(this)};function ye(a,b,c){this.d=a;this.k=b;this.h=c}ye.prototype.jb=function(){return this.k<this.h};
ye.prototype.next=function(){var a=new W(null,2,5,ke,[this.d[this.k],this.d[this.k+1]],null);this.k+=2;return a};function Xa(a,b,c,d){this.o=a;this.h=b;this.d=c;this.m=d;this.g=16647951;this.p=8196}h=Xa.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.keys=function(){return sc(ze.c?ze.c(this):ze.call(null,this))};h.entries=function(){return ve(I(this))};h.values=function(){return sc(Ae.c?Ae.c(this):Ae.call(null,this))};
h.has=function(a){return T.b(this,a,ad)===ad?!1:!0};h.get=function(a,b){return this.A(null,a,b)};h.forEach=function(a){for(var b=I(this),c=null,d=0,e=0;;)if(e<d){var f=c.t(null,e),g=R.b(f,0,null),f=R.b(f,1,null);a.a?a.a(f,g):a.call(null,f,g);e+=1}else if(b=I(b))Vc(b)?(c=Xb(b),b=H(b),g=c,d=Q(c),c=g):(c=L(b),g=R.b(c,0,null),c=f=R.b(c,1,null),a.a?a.a(c,g):a.call(null,c,g),b=N(b),c=null,d=0),e=0;else return null};h.H=function(a,b){return sb.b(this,b,null)};
h.A=function(a,b,c){a=we(this,b);return-1===a?c:this.d[a+1]};h.Ta=function(){return new ye(this.d,0,2*this.h)};h.C=function(){return this.o};h.P=function(){return this.h};h.w=function(){var a=this.m;return null!=a?a:this.m=a=xc(this)};h.n=function(a,b){if(b&&(b.g&1024||b.xb)){var c=this.d.length;if(this.h===b.P(null))for(var d=0;;)if(d<c){var e=b.A(null,this.d[d],ad);if(e!==ad)if(qc.a(this.d[d+1],e))d+=2;else return!1;else return!1}else return!0;else return!1}else return te(this,b)};
h.Ra=function(){return new Be({},this.d.length,ib(this.d))};h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.Ha=function(a,b,c){a=we(this,b);if(-1===a){if(this.h<Ce){a=this.d;for(var d=a.length,e=Array(d+2),f=0;;)if(f<d)e[f]=a[f],f+=1;else break;e[d]=b;e[d+1]=c;return new Xa(this.o,this.h+1,e,null)}return Fb(tb(Wd.a(De,this),b,c),this.o)}if(c===this.d[a+1])return this;b=ib(this.d);b[a+1]=c;return new Xa(this.o,this.h,b,null)};
h.I=function(){var a=this.d;return 0<=a.length-2?new xe(a,0,null):null};h.J=function(a,b){return new Xa(b,this.h,this.d,this.m)};h.G=function(a,b){if(Uc(b))return tb(this,C.a(b,0),C.a(b,1));for(var c=this,d=I(b);;){if(null==d)return c;var e=L(d);if(Uc(e))c=tb(c,C.a(e,0),C.a(e,1)),d=N(d);else throw Error("conj on a map takes map entries or seqables of map entries");}};
h.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.H(null,c);case 3:return this.A(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.H(null,c)};a.b=function(a,c,d){return this.A(null,c,d)};return a}();h.apply=function(a,b){return this.call.apply(this,[this].concat(ib(b)))};h.c=function(a){return this.H(null,a)};h.a=function(a,b){return this.A(null,a,b)};var Ee=new Xa(null,0,[],yc),Ce=8;
function Fe(a){for(var b=a.length,c=0,d=Qb(Ee);;)if(c<b)var e=c+2,d=Ub(d,a[c],a[c+1]),c=e;else return Tb(d)}Xa.prototype[hb]=function(){return sc(this)};function Be(a,b,c){this.Ca=a;this.Fa=b;this.d=c;this.p=56;this.g=258}h=Be.prototype;
h.Ma=function(a,b,c){var d=this;if(v(d.Ca)){a=we(this,b);if(-1===a)return d.Fa+2<=2*Ce?(d.Fa+=2,d.d.push(b),d.d.push(c),this):Hd.b(function(){var a=d.Fa,b=d.d;return Ge.a?Ge.a(a,b):Ge.call(null,a,b)}(),b,c);c!==d.d[a+1]&&(d.d[a+1]=c);return this}throw Error("assoc! after persistent!");};
h.Va=function(a,b){if(v(this.Ca)){if(b?b.g&2048||b.yb||(b.g?0:w(vb,b)):w(vb,b))return Ub(this,He.c?He.c(b):He.call(null,b),Ie.c?Ie.c(b):Ie.call(null,b));for(var c=I(b),d=this;;){var e=L(c);if(v(e))var f=e,c=N(c),d=Ub(d,function(){var a=f;return He.c?He.c(a):He.call(null,a)}(),function(){var a=f;return Ie.c?Ie.c(a):Ie.call(null,a)}());else return d}}else throw Error("conj! after persistent!");};
h.Wa=function(){if(v(this.Ca))return this.Ca=!1,new Xa(null,id(this.Fa),this.d,null);throw Error("persistent! called twice");};h.H=function(a,b){return sb.b(this,b,null)};h.A=function(a,b,c){if(v(this.Ca))return a=we(this,b),-1===a?c:this.d[a+1];throw Error("lookup after persistent!");};h.P=function(){if(v(this.Ca))return id(this.Fa);throw Error("count after persistent!");};function Ge(a,b){for(var c=Qb(De),d=0;;)if(d<a)c=Hd.b(c,b[d],b[d+1]),d+=2;else return c}function Je(){this.$=!1}
function Ke(a,b){return a===b?!0:a===b||a instanceof V&&b instanceof V&&a.ca===b.ca?!0:qc.a(a,b)}
var Le=function(){function a(a,b,c,g,k){a=ib(a);a[b]=c;a[g]=k;return a}function b(a,b,c){a=ib(a);a[b]=c;return a}var c=null,c=function(c,e,f,g,k){switch(arguments.length){case 3:return b.call(this,c,e,f);case 5:return a.call(this,c,e,f,g,k)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.u=a;return c}(),Me=function(){function a(a,b,c,g,k,l){a=a.Da(b);a.d[c]=g;a.d[k]=l;return a}function b(a,b,c,g){a=a.Da(b);a.d[c]=g;return a}var c=null,c=function(c,e,f,g,k,l){switch(arguments.length){case 4:return b.call(this,
c,e,f,g);case 6:return a.call(this,c,e,f,g,k,l)}throw Error("Invalid arity: "+arguments.length);};c.j=b;c.R=a;return c}();function Ne(a,b,c){this.r=a;this.B=b;this.d=c}h=Ne.prototype;h.Da=function(a){if(a===this.r)return this;var b=jd(this.B),c=Array(0>b?4:2*(b+1));Zc(this.d,0,c,0,2*b);return new Ne(a,this.B,c)};h.Oa=function(){var a=this.d;return Oe.c?Oe.c(a):Oe.call(null,a)};
h.Aa=function(a,b,c,d){var e=1<<(b>>>a&31);if(0===(this.B&e))return d;var f=jd(this.B&e-1),e=this.d[2*f],f=this.d[2*f+1];return null==e?f.Aa(a+5,b,c,d):Ke(c,e)?f:d};
h.ba=function(a,b,c,d,e,f){var g=1<<(c>>>b&31),k=jd(this.B&g-1);if(0===(this.B&g)){var l=jd(this.B);if(2*l<this.d.length){var m=this.Da(a),n=m.d;f.$=!0;$c(n,2*k,n,2*(k+1),2*(l-k));n[2*k]=d;n[2*k+1]=e;m.B|=g;return m}if(16<=l){g=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];g[c>>>b&31]=Pe.ba(a,b+5,c,d,e,f);for(m=k=0;;)if(32>k)0!==(this.B>>>k&1)&&(g[k]=null!=this.d[m]?Pe.ba(a,b+5,lc(this.d[m]),
this.d[m],this.d[m+1],f):this.d[m+1],m+=2),k+=1;else break;return new Qe(a,l+1,g)}n=Array(2*(l+4));Zc(this.d,0,n,0,2*k);n[2*k]=d;n[2*k+1]=e;Zc(this.d,2*k,n,2*(k+1),2*(l-k));f.$=!0;m=this.Da(a);m.d=n;m.B|=g;return m}var p=this.d[2*k],q=this.d[2*k+1];if(null==p)return l=q.ba(a,b+5,c,d,e,f),l===q?this:Me.j(this,a,2*k+1,l);if(Ke(d,p))return e===q?this:Me.j(this,a,2*k+1,e);f.$=!0;return Me.R(this,a,2*k,null,2*k+1,function(){var f=b+5;return Re.Y?Re.Y(a,f,p,q,c,d,e):Re.call(null,a,f,p,q,c,d,e)}())};
h.aa=function(a,b,c,d,e){var f=1<<(b>>>a&31),g=jd(this.B&f-1);if(0===(this.B&f)){var k=jd(this.B);if(16<=k){f=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];f[b>>>a&31]=Pe.aa(a+5,b,c,d,e);for(var l=g=0;;)if(32>g)0!==(this.B>>>g&1)&&(f[g]=null!=this.d[l]?Pe.aa(a+5,lc(this.d[l]),this.d[l],this.d[l+1],e):this.d[l+1],l+=2),g+=1;else break;return new Qe(null,k+1,f)}l=Array(2*(k+1));Zc(this.d,
0,l,0,2*g);l[2*g]=c;l[2*g+1]=d;Zc(this.d,2*g,l,2*(g+1),2*(k-g));e.$=!0;return new Ne(null,this.B|f,l)}var m=this.d[2*g],n=this.d[2*g+1];if(null==m)return k=n.aa(a+5,b,c,d,e),k===n?this:new Ne(null,this.B,Le.b(this.d,2*g+1,k));if(Ke(c,m))return d===n?this:new Ne(null,this.B,Le.b(this.d,2*g+1,d));e.$=!0;return new Ne(null,this.B,Le.u(this.d,2*g,null,2*g+1,function(){var e=a+5;return Re.R?Re.R(e,m,n,b,c,d):Re.call(null,e,m,n,b,c,d)}()))};var Pe=new Ne(null,0,[]);
function Qe(a,b,c){this.r=a;this.h=b;this.d=c}h=Qe.prototype;h.Da=function(a){return a===this.r?this:new Qe(a,this.h,ib(this.d))};h.Oa=function(){var a=this.d;return Se.c?Se.c(a):Se.call(null,a)};h.Aa=function(a,b,c,d){var e=this.d[b>>>a&31];return null!=e?e.Aa(a+5,b,c,d):d};h.ba=function(a,b,c,d,e,f){var g=c>>>b&31,k=this.d[g];if(null==k)return a=Me.j(this,a,g,Pe.ba(a,b+5,c,d,e,f)),a.h+=1,a;b=k.ba(a,b+5,c,d,e,f);return b===k?this:Me.j(this,a,g,b)};
h.aa=function(a,b,c,d,e){var f=b>>>a&31,g=this.d[f];if(null==g)return new Qe(null,this.h+1,Le.b(this.d,f,Pe.aa(a+5,b,c,d,e)));a=g.aa(a+5,b,c,d,e);return a===g?this:new Qe(null,this.h,Le.b(this.d,f,a))};function Te(a,b,c){b*=2;for(var d=0;;)if(d<b){if(Ke(c,a[d]))return d;d+=2}else return-1}function Ue(a,b,c,d){this.r=a;this.xa=b;this.h=c;this.d=d}h=Ue.prototype;h.Da=function(a){if(a===this.r)return this;var b=Array(2*(this.h+1));Zc(this.d,0,b,0,2*this.h);return new Ue(a,this.xa,this.h,b)};
h.Oa=function(){var a=this.d;return Oe.c?Oe.c(a):Oe.call(null,a)};h.Aa=function(a,b,c,d){a=Te(this.d,this.h,c);return 0>a?d:Ke(c,this.d[a])?this.d[a+1]:d};
h.ba=function(a,b,c,d,e,f){if(c===this.xa){b=Te(this.d,this.h,d);if(-1===b){if(this.d.length>2*this.h)return a=Me.R(this,a,2*this.h,d,2*this.h+1,e),f.$=!0,a.h+=1,a;c=this.d.length;b=Array(c+2);Zc(this.d,0,b,0,c);b[c]=d;b[c+1]=e;f.$=!0;f=this.h+1;a===this.r?(this.d=b,this.h=f,a=this):a=new Ue(this.r,this.xa,f,b);return a}return this.d[b+1]===e?this:Me.j(this,a,b+1,e)}return(new Ne(a,1<<(this.xa>>>b&31),[null,this,null,null])).ba(a,b,c,d,e,f)};
h.aa=function(a,b,c,d,e){return b===this.xa?(a=Te(this.d,this.h,c),-1===a?(a=2*this.h,b=Array(a+2),Zc(this.d,0,b,0,a),b[a]=c,b[a+1]=d,e.$=!0,new Ue(null,this.xa,this.h+1,b)):qc.a(this.d[a],d)?this:new Ue(null,this.xa,this.h,Le.b(this.d,a+1,d))):(new Ne(null,1<<(this.xa>>>a&31),[null,this])).aa(a,b,c,d,e)};
var Re=function(){function a(a,b,c,g,k,l,m){var n=lc(c);if(n===k)return new Ue(null,n,2,[c,g,l,m]);var p=new Je;return Pe.ba(a,b,n,c,g,p).ba(a,b,k,l,m,p)}function b(a,b,c,g,k,l){var m=lc(b);if(m===g)return new Ue(null,m,2,[b,c,k,l]);var n=new Je;return Pe.aa(a,m,b,c,n).aa(a,g,k,l,n)}var c=null,c=function(c,e,f,g,k,l,m){switch(arguments.length){case 6:return b.call(this,c,e,f,g,k,l);case 7:return a.call(this,c,e,f,g,k,l,m)}throw Error("Invalid arity: "+arguments.length);};c.R=b;c.Y=a;return c}();
function Ve(a,b,c,d,e){this.o=a;this.ya=b;this.k=c;this.q=d;this.m=e;this.p=0;this.g=32374860}h=Ve.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.C=function(){return this.o};h.w=function(){var a=this.m;return null!=a?a:this.m=a=vc(this)};h.n=function(a,b){return Gc(this,b)};h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.M=function(){return null==this.q?new W(null,2,5,ke,[this.ya[this.k],this.ya[this.k+1]],null):L(this.q)};
h.T=function(){if(null==this.q){var a=this.ya,b=this.k+2;return Oe.b?Oe.b(a,b,null):Oe.call(null,a,b,null)}var a=this.ya,b=this.k,c=N(this.q);return Oe.b?Oe.b(a,b,c):Oe.call(null,a,b,c)};h.I=function(){return this};h.J=function(a,b){return new Ve(b,this.ya,this.k,this.q,this.m)};h.G=function(a,b){return P(b,this)};Ve.prototype[hb]=function(){return sc(this)};
var Oe=function(){function a(a,b,c){if(null==c)for(c=a.length;;)if(b<c){if(null!=a[b])return new Ve(null,a,b,null,null);var g=a[b+1];if(v(g)&&(g=g.Oa(),v(g)))return new Ve(null,a,b+2,g,null);b+=2}else return null;else return new Ve(null,a,b,c,null)}function b(a){return c.b(a,0,null)}var c=null,c=function(c,e,f){switch(arguments.length){case 1:return b.call(this,c);case 3:return a.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.c=b;c.b=a;return c}();
function We(a,b,c,d,e){this.o=a;this.ya=b;this.k=c;this.q=d;this.m=e;this.p=0;this.g=32374860}h=We.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.C=function(){return this.o};h.w=function(){var a=this.m;return null!=a?a:this.m=a=vc(this)};h.n=function(a,b){return Gc(this,b)};h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.M=function(){return L(this.q)};
h.T=function(){var a=this.ya,b=this.k,c=N(this.q);return Se.j?Se.j(null,a,b,c):Se.call(null,null,a,b,c)};h.I=function(){return this};h.J=function(a,b){return new We(b,this.ya,this.k,this.q,this.m)};h.G=function(a,b){return P(b,this)};We.prototype[hb]=function(){return sc(this)};
var Se=function(){function a(a,b,c,g){if(null==g)for(g=b.length;;)if(c<g){var k=b[c];if(v(k)&&(k=k.Oa(),v(k)))return new We(a,b,c+1,k,null);c+=1}else return null;else return new We(a,b,c,g,null)}function b(a){return c.j(null,a,0,null)}var c=null,c=function(c,e,f,g){switch(arguments.length){case 1:return b.call(this,c);case 4:return a.call(this,c,e,f,g)}throw Error("Invalid arity: "+arguments.length);};c.c=b;c.j=a;return c}();
function Xe(a,b,c,d,e,f){this.o=a;this.h=b;this.root=c;this.W=d;this.Z=e;this.m=f;this.g=16123663;this.p=8196}h=Xe.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.keys=function(){return sc(ze.c?ze.c(this):ze.call(null,this))};h.entries=function(){return ve(I(this))};h.values=function(){return sc(Ae.c?Ae.c(this):Ae.call(null,this))};h.has=function(a){return T.b(this,a,ad)===ad?!1:!0};h.get=function(a,b){return this.A(null,a,b)};
h.forEach=function(a){for(var b=I(this),c=null,d=0,e=0;;)if(e<d){var f=c.t(null,e),g=R.b(f,0,null),f=R.b(f,1,null);a.a?a.a(f,g):a.call(null,f,g);e+=1}else if(b=I(b))Vc(b)?(c=Xb(b),b=H(b),g=c,d=Q(c),c=g):(c=L(b),g=R.b(c,0,null),c=f=R.b(c,1,null),a.a?a.a(c,g):a.call(null,c,g),b=N(b),c=null,d=0),e=0;else return null};h.H=function(a,b){return sb.b(this,b,null)};h.A=function(a,b,c){return null==b?this.W?this.Z:c:null==this.root?c:this.root.Aa(0,lc(b),b,c)};h.C=function(){return this.o};h.P=function(){return this.h};
h.w=function(){var a=this.m;return null!=a?a:this.m=a=xc(this)};h.n=function(a,b){return te(this,b)};h.Ra=function(){return new Ze({},this.root,this.h,this.W,this.Z)};h.Ha=function(a,b,c){if(null==b)return this.W&&c===this.Z?this:new Xe(this.o,this.W?this.h:this.h+1,this.root,!0,c,null);a=new Je;b=(null==this.root?Pe:this.root).aa(0,lc(b),b,c,a);return b===this.root?this:new Xe(this.o,a.$?this.h+1:this.h,b,this.W,this.Z,null)};
h.I=function(){if(0<this.h){var a=null!=this.root?this.root.Oa():null;return this.W?P(new W(null,2,5,ke,[null,this.Z],null),a):a}return null};h.J=function(a,b){return new Xe(b,this.h,this.root,this.W,this.Z,this.m)};h.G=function(a,b){if(Uc(b))return tb(this,C.a(b,0),C.a(b,1));for(var c=this,d=I(b);;){if(null==d)return c;var e=L(d);if(Uc(e))c=tb(c,C.a(e,0),C.a(e,1)),d=N(d);else throw Error("conj on a map takes map entries or seqables of map entries");}};
h.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.H(null,c);case 3:return this.A(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.H(null,c)};a.b=function(a,c,d){return this.A(null,c,d)};return a}();h.apply=function(a,b){return this.call.apply(this,[this].concat(ib(b)))};h.c=function(a){return this.H(null,a)};h.a=function(a,b){return this.A(null,a,b)};var De=new Xe(null,0,null,!1,null,yc);
function Mc(a,b){for(var c=a.length,d=0,e=Qb(De);;)if(d<c)var f=d+1,e=e.Ma(null,a[d],b[d]),d=f;else return Tb(e)}Xe.prototype[hb]=function(){return sc(this)};function Ze(a,b,c,d,e){this.r=a;this.root=b;this.count=c;this.W=d;this.Z=e;this.p=56;this.g=258}h=Ze.prototype;h.Ma=function(a,b,c){return $e(this,b,c)};h.Va=function(a,b){return af(this,b)};h.Wa=function(){var a;if(this.r)this.r=null,a=new Xe(null,this.count,this.root,this.W,this.Z,null);else throw Error("persistent! called twice");return a};
h.H=function(a,b){return null==b?this.W?this.Z:null:null==this.root?null:this.root.Aa(0,lc(b),b)};h.A=function(a,b,c){return null==b?this.W?this.Z:c:null==this.root?c:this.root.Aa(0,lc(b),b,c)};h.P=function(){if(this.r)return this.count;throw Error("count after persistent!");};
function af(a,b){if(a.r){if(b?b.g&2048||b.yb||(b.g?0:w(vb,b)):w(vb,b))return $e(a,He.c?He.c(b):He.call(null,b),Ie.c?Ie.c(b):Ie.call(null,b));for(var c=I(b),d=a;;){var e=L(c);if(v(e))var f=e,c=N(c),d=$e(d,function(){var a=f;return He.c?He.c(a):He.call(null,a)}(),function(){var a=f;return Ie.c?Ie.c(a):Ie.call(null,a)}());else return d}}else throw Error("conj! after persistent");}
function $e(a,b,c){if(a.r){if(null==b)a.Z!==c&&(a.Z=c),a.W||(a.count+=1,a.W=!0);else{var d=new Je;b=(null==a.root?Pe:a.root).ba(a.r,0,lc(b),b,c,d);b!==a.root&&(a.root=b);d.$&&(a.count+=1)}return a}throw Error("assoc! after persistent!");}
var Ld=function(){function a(a){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new J(e,0)}return b.call(this,d)}function b(a){a=I(a);for(var b=Qb(De);;)if(a){var e=N(N(a)),b=Hd.b(b,L(a),L(N(a)));a=e}else return Tb(b)}a.l=0;a.i=function(a){a=I(a);return b(a)};a.f=b;return a}();function bf(a,b){this.N=a;this.U=b;this.p=0;this.g=32374988}h=bf.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};
h.C=function(){return this.U};h.S=function(){var a=this.N,a=(a?a.g&128||a.Ua||(a.g?0:w(qb,a)):w(qb,a))?this.N.S(null):N(this.N);return null==a?null:new bf(a,this.U)};h.w=function(){return vc(this)};h.n=function(a,b){return Gc(this,b)};h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.M=function(){return this.N.M(null).fb()};h.T=function(){var a=this.N,a=(a?a.g&128||a.Ua||(a.g?0:w(qb,a)):w(qb,a))?this.N.S(null):N(this.N);return null!=a?new bf(a,this.U):pc};h.I=function(){return this};
h.J=function(a,b){return new bf(this.N,b)};h.G=function(a,b){return P(b,this)};bf.prototype[hb]=function(){return sc(this)};function ze(a){return(a=I(a))?new bf(a,null):null}function He(a){return wb(a)}function cf(a,b){this.N=a;this.U=b;this.p=0;this.g=32374988}h=cf.prototype;h.toString=function(){return cc(this)};h.equiv=function(a){return this.n(null,a)};h.C=function(){return this.U};
h.S=function(){var a=this.N,a=(a?a.g&128||a.Ua||(a.g?0:w(qb,a)):w(qb,a))?this.N.S(null):N(this.N);return null==a?null:new cf(a,this.U)};h.w=function(){return vc(this)};h.n=function(a,b){return Gc(this,b)};h.K=function(a,b){return U.a(b,this)};h.L=function(a,b,c){return U.b(b,c,this)};h.M=function(){return this.N.M(null).gb()};h.T=function(){var a=this.N,a=(a?a.g&128||a.Ua||(a.g?0:w(qb,a)):w(qb,a))?this.N.S(null):N(this.N);return null!=a?new cf(a,this.U):pc};h.I=function(){return this};
h.J=function(a,b){return new cf(this.N,b)};h.G=function(a,b){return P(b,this)};cf.prototype[hb]=function(){return sc(this)};function Ae(a){return(a=I(a))?new cf(a,null):null}function Ie(a){return xb(a)}function qd(a){if(a&&(a.p&4096||a.Ab))return a.name;if("string"===typeof a)return a;throw Error([B("Doesn't support name: "),B(a)].join(""));}
function df(a,b,c,d,e,f,g){var k=Ua;Ua=null==Ua?null:Ua-1;try{if(null!=Ua&&0>Ua)return G(a,"#");G(a,c);if(0===cb.c(f))I(g)&&G(a,function(){var a=ef.c(f);return v(a)?a:"..."}());else{if(I(g)){var l=L(g);b.b?b.b(l,a,f):b.call(null,l,a,f)}for(var m=N(g),n=cb.c(f)-1;;)if(!m||null!=n&&0===n){I(m)&&0===n&&(G(a,d),G(a,function(){var a=ef.c(f);return v(a)?a:"..."}()));break}else{G(a,d);var p=L(m);c=a;g=f;b.b?b.b(p,c,g):b.call(null,p,c,g);var q=N(m);c=n-1;m=q;n=c}}return G(a,e)}finally{Ua=k}}
var ff=function(){function a(a,d){var e=null;if(1<arguments.length){for(var e=0,f=Array(arguments.length-1);e<f.length;)f[e]=arguments[e+1],++e;e=new J(f,0)}return b.call(this,a,e)}function b(a,b){for(var e=I(b),f=null,g=0,k=0;;)if(k<g){var l=f.t(null,k);G(a,l);k+=1}else if(e=I(e))f=e,Vc(f)?(e=Xb(f),g=H(f),f=e,l=Q(e),e=g,g=l):(l=L(f),G(a,l),e=N(f),f=null,g=0),k=0;else return null}a.l=1;a.i=function(a){var d=L(a);a=M(a);return b(d,a)};a.f=b;return a}(),gf={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f",
"\n":"\\n","\r":"\\r","\t":"\\t"};function hf(a){return[B('"'),B(a.replace(RegExp('[\\\\"\b\f\n\r\t]',"g"),function(a){return gf[a]})),B('"')].join("")}
function jf(a,b,c){if(null==a)return G(b,"nil");if(void 0===a)return G(b,"#\x3cundefined\x3e");if(v(function(){var b=T.a(c,$a);return v(b)?(b=a?a.g&131072||a.zb?!0:a.g?!1:w(Cb,a):w(Cb,a))?Sc(a):b:b}())){G(b,"^");var d=Sc(a);X.b?X.b(d,b,c):X.call(null,d,b,c);G(b," ")}return null==a?G(b,"nil"):a.Jb?a.Sb(a,b,c):a&&(a.g&2147483648||a.D)?a.v(null,b,c):fb(a)===Boolean||"number"===typeof a?G(b,""+B(a)):null!=a&&a.constructor===Object?(G(b,"#js "),d=Sd.a(function(b){return new W(null,2,5,ke,[rd.c(b),a[b]],
null)},Yc(a)),kf.j?kf.j(d,X,b,c):kf.call(null,d,X,b,c)):db(a)?df(b,X,"#js ["," ","]",c,a):v(ca(a))?v(Za.c(c))?G(b,hf(a)):G(b,a):Oc(a)?ff.f(b,Ic(["#\x3c",""+B(a),"\x3e"],0)):a instanceof Date?(d=function(a,b){for(var c=""+B(a);;)if(Q(c)<b)c=[B("0"),B(c)].join("");else return c},ff.f(b,Ic(['#inst "',""+B(a.getUTCFullYear()),"-",d(a.getUTCMonth()+1,2),"-",d(a.getUTCDate(),2),"T",d(a.getUTCHours(),2),":",d(a.getUTCMinutes(),2),":",d(a.getUTCSeconds(),2),".",d(a.getUTCMilliseconds(),3),"-",'00:00"'],0))):
a instanceof RegExp?ff.f(b,Ic(['#"',a.source,'"'],0)):(a?a.g&2147483648||a.D||(a.g?0:w(Nb,a)):w(Nb,a))?Ob(a,b,c):ff.f(b,Ic(["#\x3c",""+B(a),"\x3e"],0))}function X(a,b,c){var d=lf.c(c);return v(d)?(c=Nc.b(c,mf,jf),d.b?d.b(a,b,c):d.call(null,a,b,c)):jf(a,b,c)}
var Pd=function(){function a(a){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new J(e,0)}return b.call(this,d)}function b(a){var b=Wa();if(null==a||eb(I(a)))b="";else{var e=B,f=new Ra;a:{var g=new bc(f);X(L(a),g,b);a=I(N(a));for(var k=null,l=0,m=0;;)if(m<l){var n=k.t(null,m);G(g," ");X(n,g,b);m+=1}else if(a=I(a))k=a,Vc(k)?(a=Xb(k),l=H(k),k=a,n=Q(a),a=l,l=n):(n=L(k),G(g," "),X(n,g,b),a=N(k),k=null,l=0),m=0;else break a}b=""+e(f)}return b}
a.l=0;a.i=function(a){a=I(a);return b(a)};a.f=b;return a}();function kf(a,b,c,d){return df(c,function(a,c,d){var k=wb(a);b.b?b.b(k,c,d):b.call(null,k,c,d);G(c," ");a=xb(a);return b.b?b.b(a,c,d):b.call(null,a,c,d)},"{",", ","}",d,I(a))}Rd.prototype.D=!0;Rd.prototype.v=function(a,b,c){G(b,"#\x3cVolatile: ");X(this.state,b,c);return G(b,"\x3e")};J.prototype.D=!0;J.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};sd.prototype.D=!0;
sd.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};Ve.prototype.D=!0;Ve.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};xe.prototype.D=!0;xe.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};le.prototype.D=!0;le.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};nd.prototype.D=!0;nd.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};Xe.prototype.D=!0;Xe.prototype.v=function(a,b,c){return kf(this,X,b,c)};We.prototype.D=!0;
We.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};ne.prototype.D=!0;ne.prototype.v=function(a,b,c){return df(b,X,"["," ","]",c,this)};xd.prototype.D=!0;xd.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};Kd.prototype.D=!0;Kd.prototype.v=function(a,b,c){G(b,"#\x3cAtom: ");X(this.state,b,c);return G(b,"\x3e")};cf.prototype.D=!0;cf.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};W.prototype.D=!0;W.prototype.v=function(a,b,c){return df(b,X,"["," ","]",c,this)};
ld.prototype.D=!0;ld.prototype.v=function(a,b){return G(b,"()")};Xa.prototype.D=!0;Xa.prototype.v=function(a,b,c){return kf(this,X,b,c)};bf.prototype.D=!0;bf.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};kd.prototype.D=!0;kd.prototype.v=function(a,b,c){return df(b,X,"("," ",")",c,this)};W.prototype.Ia=!0;W.prototype.Ja=function(a,b){return ed.a(this,b)};ne.prototype.Ia=!0;ne.prototype.Ja=function(a,b){return ed.a(this,b)};V.prototype.Ia=!0;
V.prototype.Ja=function(a,b){return od(this,b)};oc.prototype.Ia=!0;oc.prototype.Ja=function(a,b){return nc(this,b)};var nf=new V(null,"line-height","line-height",1870784992),of=new V(null,"page-scroll","page-scroll",1014813059),$a=new V(null,"meta","meta",1499536964),ab=new V(null,"dup","dup",556298533),pf=new V(null,"running?","running?",-257884763),qf=new V(null,"page-thresholds","page-thresholds",-1441242523),rf=new V(null,"scroll-width","scroll-width",-752407930),sf=new V(null,"at-medium?","at-medium?",1081071366),Md=new V(null,"validator","validator",-1966190681),tf=new V(null,"at-small?","at-small?",-167447383),
uf=new V(null,"menu-animating?","menu-animating?",1517215179),vf=new V(null,"showing-menu","showing-menu",-1167981781),mf=new V(null,"fallback-impl","fallback-impl",-1501286995),Ya=new V(null,"flush-on-newline","flush-on-newline",-151457939),wf=new V(null,"fix-page-hr","fix-page-hr",1807312781),xf=new V(null,"hiding-menu","hiding-menu",-1280235888),Za=new V(null,"readably","readably",1129599760),ef=new V(null,"more-marker","more-marker",-14717935),yf=new V(null,"at-large?","at-large?",-2111827820),
cb=new V(null,"print-length","print-length",1931866356),zf=new V(null,"fix-menu-nav","fix-menu-nav",-2007096748),Af=new V(null,"fix-menu-hr","fix-menu-hr",-2137897835),Bf=new V(null,"menu-scroll","menu-scroll",-410893256),Cf=new V(null,"show-menu","show-menu",14072792),Df=new V(null,"fix-page-nav","fix-page-nav",-478329062),lf=new V(null,"alt-impl","alt-impl",670969595),Ef=new V(null,"wrapper-width","wrapper-width",2019418684),Ff=new V(null,"menu-showing?","menu-showing?",1400216893),Gf=new V(null,
"menu-thresholds","menu-thresholds",-189405121),Hf=new V(null,"window-width","window-width",2057825599);function If(a){return Array.prototype.slice.call(a)}function Jf(a){return a instanceof V?[B(function(){var b=pd(a);return null==b?null:[B(b),B("/")].join("")}()),B(qd(a))].join(""):a}function Kf(a,b){for(var c=0;;)if(c=a.indexOf(b,c),0<=c){var d;if(d=0===c||" "===a.charAt(c-1)){d=a.length;var e=c+b.length;d=e<=d?e===d||" "===a.charAt(e):null}if(d)return c;c+=b.length}else return null};var Lf=function(){function a(a,b){var c=Jf(b),g=ia(c).split(/\s+/);if(I(g))if(c=a.classList,v(c))for(var g=I(g),k=null,l=0,m=0;;)if(m<l){var n=k.t(null,m);c.add(n);m+=1}else if(g=I(g))k=g,Vc(k)?(g=Xb(k),m=H(k),k=g,l=Q(g),g=m):(g=L(k),c.add(g),g=N(k),k=null,l=0),m=0;else break;else for(c=I(g),g=null,l=k=0;;)if(l<k)m=g.t(null,l),n=a.className,v(Kf(n,m))||(m=""===n?m:[B(n),B(" "),B(m)].join(""),a.className=m),l+=1;else if(c=I(c))Vc(c)?(k=Xb(c),c=H(c),g=k,k=Q(k)):(g=L(c),k=a.className,v(Kf(k,g))||(g=
""===k?g:[B(k),B(" "),B(g)].join(""),a.className=g),c=N(c),g=null,k=0),l=0;else break;return a}var b=null,c=function(){function a(b,d,k){var l=null;if(2<arguments.length){for(var l=0,m=Array(arguments.length-2);l<m.length;)m[l]=arguments[l+2],++l;l=new J(m,0)}return c.call(this,b,d,l)}function c(a,d,e){d=I(Kc.a(e,d));e=null;for(var l=0,m=0;;)if(m<l){var n=e.t(null,m);b.a(a,n);m+=1}else if(d=I(d))e=d,Vc(e)?(d=Xb(e),m=H(e),e=d,l=Q(d),d=m):(d=L(e),b.a(a,d),d=N(e),e=null,l=0),m=0;else break;return a}
a.l=2;a.i=function(a){var b=L(a);a=N(a);var d=L(a);a=M(a);return c(b,d,a)};a.f=c;return a}(),b=function(b,e,f){switch(arguments.length){case 2:return a.call(this,b,e);default:var g=null;if(2<arguments.length){for(var g=0,k=Array(arguments.length-2);g<k.length;)k[g]=arguments[g+2],++g;g=new J(k,0)}return c.f(b,e,g)}throw Error("Invalid arity: "+arguments.length);};b.l=2;b.i=c.i;b.a=a;b.f=c.f;return b}(),Mf=function(){function a(a,b){var c=Jf(b),g=a.classList;if(v(g))g.remove(c);else{g=a.className;
a:for(var k=g;;){var l=k.length,m=Kf(k,c);if(v(m))var n=m+c.length,k=""+B(n<l?[B(k.substring(0,m)),B(k.substr(n+1))].join(""):k.substring(0,m-1));else{c=k;break a}}g!==c&&(a.className=c)}return a}var b=null,c=function(){function a(b,d,k){var l=null;if(2<arguments.length){for(var l=0,m=Array(arguments.length-2);l<m.length;)m[l]=arguments[l+2],++l;l=new J(m,0)}return c.call(this,b,d,l)}function c(a,d,e){d=I(Kc.a(e,d));e=null;for(var l=0,m=0;;)if(m<l){var n=e.t(null,m);b.a(a,n);m+=1}else if(d=I(d))e=
d,Vc(e)?(d=Xb(e),l=H(e),e=d,n=Q(d),d=l,l=n):(n=L(e),b.a(a,n),d=N(e),e=null,l=0),m=0;else return null}a.l=2;a.i=function(a){var b=L(a);a=N(a);var d=L(a);a=M(a);return c(b,d,a)};a.f=c;return a}(),b=function(b,e,f){switch(arguments.length){case 2:return a.call(this,b,e);default:var g=null;if(2<arguments.length){for(var g=0,k=Array(arguments.length-2);g<k.length;)k[g]=arguments[g+2],++g;g=new J(k,0)}return c.f(b,e,g)}throw Error("Invalid arity: "+arguments.length);};b.l=2;b.i=c.i;b.a=a;b.f=c.f;return b}();
Wd.a(Ee,Sd.a(function(a){var b=R.b(a,0,null),c=R.b(a,1,null);return new W(null,2,5,ke,[b,new Fe([c,function(a,b,c){return function(g){return function(){return function(a){var b=a.relatedTarget,c;c=a.Vb;c=v(c)?c:a.currentTarget;b=v(b)?v(c.contains)?c.contains(b):v(c.compareDocumentPosition)?0!=(c.compareDocumentPosition(b)&16):null:b;return v(b)?null:g.c?g.c(a):g.call(null,a)}}(a,b,c)}}(a,b,c)])],null)},new Xa(null,2,[new V(null,"mouseenter","mouseenter",-1792413560),new V(null,"mouseover","mouseover",
-484272303),new V(null,"mouseleave","mouseleave",531566580),new V(null,"mouseout","mouseout",2049446890)],null)));function Nf(a,b,c){ca(b)?Of(a,c,b):Pa(b,ha(Of,a))}function Of(a,b,c){a:if(c=oa(c),void 0===a.style[c]){var d=(Da?"Webkit":Ca?"Moz":Aa?"ms":ya?"O":null)+pa(c);if(void 0!==a.style[d]){c=d;break a}}c&&(a.style[c]=b)}function Pf(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
function Qf(a){var b=Rf,c;a:{c=9==a.nodeType?a:a.ownerDocument||a.document;if(c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))){c=c.display||c.getPropertyValue("display")||"";break a}c=""}if("none"!=(c||(a.currentStyle?a.currentStyle.display:null)||a.style&&a.style.display))return b(a);c=a.style;var d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";a=b(a);c.display=d;c.position=f;c.visibility=e;return a}
function Rf(a){var b=a.offsetWidth,c=a.offsetHeight,d=Da&&!b&&!c;if((void 0===b||d)&&a.getBoundingClientRect){var e;a:{try{e=a.getBoundingClientRect()}catch(f){e={left:0,top:0,right:0,bottom:0};break a}Aa&&a.ownerDocument.body&&(a=a.ownerDocument,e.left-=a.documentElement.clientLeft+a.body.clientLeft,e.top-=a.documentElement.clientTop+a.body.clientTop)}return new Oa(e.right-e.left,e.bottom-e.top)}return new Oa(b,c)};var Sf=!Aa||Aa&&9<=Ka,Tf=Aa&&!Ia("9");!Da||Ia("528");Ca&&Ia("1.9b")||Aa&&Ia("8")||ya&&Ia("9.5")||Da&&Ia("528");Ca&&!Ia("8")||Aa&&Ia("9");function Uf(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.kb=!1}Uf.prototype.stopPropagation=function(){this.kb=!0};Uf.prototype.preventDefault=function(){this.defaultPrevented=!0};function Vf(a){Vf[" "](a);return a}Vf[" "]=function(){};function Wf(a,b){Uf.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.Na=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(Ca){var e;a:{try{Vf(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==
c?d=a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=Da||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=Da||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;
this.metaKey=a.metaKey;this.state=a.state;this.Na=a;a.defaultPrevented&&this.preventDefault()}}(function(){function a(){}a.prototype=Uf.prototype;Wf.qb=Uf.prototype;Wf.prototype=new a;Wf.prototype.constructor=Wf;Wf.Qa=function(a,c,d){return Uf.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}})();Wf.prototype.stopPropagation=function(){Wf.qb.stopPropagation.call(this);this.Na.stopPropagation?this.Na.stopPropagation():this.Na.cancelBubble=!0};
Wf.prototype.preventDefault=function(){Wf.qb.preventDefault.call(this);var a=this.Na;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Tf)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Xf="closure_listenable_"+(1E6*Math.random()|0),Yf=0;function Zf(a,b,c,d,e){this.Ga=a;this.Xa=null;this.src=b;this.type=c;this.ab=!!d;this.ib=e;this.key=++Yf;this.Pa=this.$a=!1}function $f(a){a.Pa=!0;a.Ga=null;a.Xa=null;a.src=null;a.ib=null};function ag(a){this.src=a;this.da={};this.Ya=0}ag.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.da[f];a||(a=this.da[f]=[],this.Ya++);var g=bg(a,b,d,e);-1<g?(b=a[g],c||(b.$a=!1)):(b=new Zf(b,this.src,f,!!d,e),b.$a=c,a.push(b));return b};ag.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.da))return!1;var e=this.da[a];b=bg(e,b,c,d);return-1<b?($f(e[b]),qa.splice.call(e,b,1),0==e.length&&(delete this.da[a],this.Ya--),!0):!1};
function bg(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Pa&&f.Ga==b&&f.ab==!!c&&f.ib==d)return e}return-1};var cg="closure_lm_"+(1E6*Math.random()|0),dg={},eg=0;function fg(a,b,c,d,e){if("array"==r(b))for(var f=0;f<b.length;f++)fg(a,b[f],c,d,e);else if(c=hg(c),a&&a[Xf])a.Ub(b,c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=ig(a);g||(a[cg]=g=new ag(a));c=g.add(b,c,!1,d,e);c.Xa||(d=jg(),c.Xa=d,d.src=a,d.Ga=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(kg(b.toString()),d),eg++)}}
function jg(){var a=lg,b=Sf?function(c){return a.call(b.src,b.Ga,c)}:function(c){c=a.call(b.src,b.Ga,c);if(!c)return c};return b}function kg(a){return a in dg?dg[a]:dg[a]="on"+a}function mg(a,b,c,d){var e=1;if(a=ig(a))if(b=a.da[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.ab==c&&!f.Pa&&(e&=!1!==ng(f,d))}return Boolean(e)}
function ng(a,b){var c=a.Ga,d=a.ib||a.src;if(a.$a&&!da(a)&&a&&!a.Pa){var e=a.src;if(e&&e[Xf])e.Wb(a);else{var f=a.type,g=a.Xa;e.removeEventListener?e.removeEventListener(f,g,a.ab):e.detachEvent&&e.detachEvent(kg(f),g);eg--;if(f=ig(e)){var g=a.type,k;if(k=g in f.da){k=f.da[g];var l=sa(k,a),m;(m=0<=l)&&qa.splice.call(k,l,1);k=m}k&&($f(a),0==f.da[g].length&&(delete f.da[g],f.Ya--));0==f.Ya&&(f.src=null,e[cg]=null)}else $f(a)}}return c.call(d,b)}
function lg(a,b){if(a.Pa)return!0;if(!Sf){var c;if(!(c=b))a:{c=["window","event"];for(var d=aa,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new Wf(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,k=e.length-1;!c.kb&&0<=k;k--)c.currentTarget=e[k],d&=mg(e[k],f,!0,c);for(k=0;!c.kb&&k<e.length;k++)c.currentTarget=
e[k],d&=mg(e[k],f,!1,c)}return d}return ng(a,new Wf(b,this))}function ig(a){a=a[cg];return a instanceof ag?a:null}var og="__closure_events_fn_"+(1E9*Math.random()>>>0);function hg(a){if("function"==r(a))return a;a[og]||(a[og]=function(b){return a.handleEvent(b)});return a[og]};if("undefined"===typeof Z){var Z,pg=Mc([nf,of,pf,qf,rf,uf,Bf,Ef,Ff,Gf],[0,0,!1,new Xa(null,2,[Df,0,wf,0],null),0,!1,0,0,!1,new Xa(null,2,[zf,0,Af,0],null)]);Z=Nd.c?Nd.c(pg):Nd.call(null,pg)}
var qg=If(document.getElementsByTagName("html"))[0],rg=If(document.getElementsByClassName("page"))[0],sg=If(document.getElementsByClassName("wrapper"))[0],tg=If(rg.getElementsByTagName("nav"))[0],ug=If(rg.getElementsByTagName("header"))[0],vg=If(document.getElementsByClassName("menu"))[0],wg=If(vg.getElementsByClassName("wrapper"))[0],xg=If(vg.getElementsByTagName("nav"))[0],yg=If(vg.getElementsByTagName("header"))[0],zg=If(yg.getElementsByTagName("hr"))[0];
function Ag(){var a,b=document;a=Da||"CSS1Compat"!=b.compatMode?b.body||b.documentElement:b.documentElement;b=b.parentWindow||b.defaultView;a=Aa&&Ia("10")&&b.pageYOffset!=a.scrollTop?new La(a.scrollLeft,a.scrollTop):new La(b.pageXOffset||a.scrollLeft,b.pageYOffset||a.scrollTop);return new W(null,2,5,ke,[a.x,a.y],null)}function Bg(a){a=Qf(a);return new W(null,2,5,ke,[a.width,a.height],null)}function Cg(a){return[B(a),B("px")].join("")}
function Dg(a){var b=Bg(ug);R.b(b,0,null);b=R.b(b,1,null);return new Xa(null,2,[Df,a,wf,b-3*a],null)}function Eg(a){var b=Bg(yg);R.b(b,0,null);b=R.b(b,1,null);return new Xa(null,2,[zf,a,Af,b-3*a],null)}
function Fg(){var a=O.c?O.c(Z):O.call(null,Z),b=bd(a)?Qc.a(Ld,a):a,a=T.a(b,uf),c=T.a(b,Ff),d=T.a(b,Bf),b=T.a(b,of),e=Ag();R.b(e,0,null);for(var e=R.b(e,1,null),a=v(a)?new W(null,2,5,ke,[b,d],null):v(c)?new W(null,2,5,ke,[b,e],null):new W(null,2,5,ke,[e,d],null),c=R.b(a,0,null),a=R.b(a,1,null),d=I(qf.c(O.c?O.c(Z):O.call(null,Z))),b=null,f=e=0;;)if(f<e){var g=b.t(null,f),k=R.b(g,0,null),g=R.b(g,1,null);c>=g?Lf.a(qg,k):Mf.a(qg,k);f+=1}else if(d=I(d))Vc(d)?(e=Xb(d),d=H(d),b=e,e=Q(e)):(e=L(d),b=R.b(e,
0,null),e=R.b(e,1,null),c>=e?Lf.a(qg,b):Mf.a(qg,b),d=N(d),b=null,e=0),f=0;else break;c=I(Gf.c(O.c?O.c(Z):O.call(null,Z)));b=null;for(f=e=0;;)if(f<e)k=b.t(null,f),d=R.b(k,0,null),k=R.b(k,1,null),a>=k?Lf.a(qg,d):Mf.a(qg,d),f+=1;else if(c=I(c))Vc(c)?(b=Xb(c),c=H(c),d=b,e=Q(b),b=d):(b=L(c),d=R.b(b,0,null),k=R.b(b,1,null),a>=k?Lf.a(qg,d):Mf.a(qg,d),c=N(c),b=null,e=0),f=0;else return null}
function Gg(){var a=Qf(tg).height/2,b=document.createElement("div");b.style.cssText="overflow:auto;position:absolute;top:0;width:100px;height:100px";var c=document.createElement("div"),d="200px",e;d instanceof Oa?(e=d.height,d=d.width):e="200px";c.style.width=Pf(d);c.style.height=Pf(e);b.appendChild(c);document.body.appendChild(b);c=b.offsetWidth-b.clientWidth;b&&b.parentNode&&b.parentNode.removeChild(b);b=window.innerWidth;Qd.f(Z,Nc,yf,860<=b,Ic([sf,680<=b,tf,460<=b,nf,a,rf,c,Hf,b,Ef,b-c,qf,Dg(a),
Gf,Eg(a)],0));a=I(new W(null,2,5,ke,[sg,wg],null));b=null;for(d=c=0;;)if(d<c){e=b.t(null,d);var f=Cg(Ef.c(O.c?O.c(Z):O.call(null,Z)));Nf(e,"width",f);d+=1}else if(a=I(a))Vc(a)?(c=Xb(a),a=H(a),b=c,c=Q(c)):(b=L(a),c=Cg(Ef.c(O.c?O.c(Z):O.call(null,Z))),Nf(b,"width",c),a=N(a),b=null,c=0),d=0;else break;return Fg()}function Hg(a){return function(b){b.preventDefault();a.c?a.c(b):a.call(null,b);return!1}}
var Ig=function(){function a(a,d){var e=null;if(1<arguments.length){for(var e=0,f=Array(arguments.length-1);e<f.length;)f[e]=arguments[e+1],++e;e=new J(f,0)}return b.call(this,a,e)}function b(a,b){var e=Qc.a(Wc,b);return Nf(a,e)}a.l=1;a.i=function(a){var d=L(a);a=M(a);return b(d,a)};a.f=b;return a}(),Jg=function(){function a(a,d){var e=null;if(1<arguments.length){for(var e=0,f=Array(arguments.length-1);e<f.length;)f[e]=arguments[e+1],++e;e=new J(f,0)}return b.call(this,a,e)}function b(a,b){var e=
Qc.a(Wc,Vd.a(b,Ud.c("")));return Nf(a,e)}a.l=1;a.i=function(a){var d=L(a);a=M(a);return b(d,a)};a.f=b;return a}(),Kg=new W(null,5,5,ke,[new W(null,3,5,ke,[window,"resize",Gg],null),new W(null,3,5,ke,[window,"scroll",Fg],null),new W(null,3,5,ke,[vg,["transitionend","webkitTransitionEnd","msTransitionEnd","oTransitionEnd"],function(a){return function(b){return qc.a(b.target,b.currentTarget)?a.c?a.c(b):a.call(null,b):null}}(function(){if(v(uf.c(O.c?O.c(Z):O.call(null,Z)))){Qd.j(Z,Nc,uf,!1);if(v(Ff.c(O.c?
O.c(Z):O.call(null,Z))))return Mf.a(qg,xf),Qd.j(Z,Nc,Ff,!1);Jg.f(xg,Ic(["position","top"],0));Jg.f(zg,Ic(["position","top"],0));Mf.a(qg,vf);return Qd.j(Z,Nc,Ff,!0)}return null})],null),new W(null,3,5,ke,[If(rg.getElementsByClassName("ellipsis"))[0],"click",Hg(function(){if(v(uf.c(O.c?O.c(Z):O.call(null,Z))))return null;var a=Ag(),b=R.b(a,0,null),a=R.b(a,1,null),c=O.c?O.c(Z):O.call(null,Z),c=bd(c)?Qc.a(Ld,c):c,c=T.a(c,Bf);Qd.f(Z,Nc,of,a,Ic([uf,!0],0));Ig.f(rg,Ic(["top",Cg(-a)],0));Lf.f(qg,Cf,Ic([vf],
0));Jg.f(vg,Ic(["top"],0));return window.scroll(b,c)})],null),new W(null,3,5,ke,[If(vg.getElementsByClassName("ellipsis"))[0],"click",Hg(function(){if(v(uf.c(O.c?O.c(Z):O.call(null,Z))))return null;var a=Ag(),b=R.b(a,0,null),a=R.b(a,1,null),c=O.c?O.c(Z):O.call(null,Z),d=bd(c)?Qc.a(Ld,c):c,e=T.a(d,Gf),c=T.a(d,of),d=T.a(d,yf),f=bd(e)?Qc.a(Ld,e):e,e=T.a(f,Af),f=T.a(f,zf);Qd.f(Z,Nc,Bf,a,Ic([uf,!0],0));a>=f&&Ig.f(xg,Ic(["position","absolute","top",Cg(a)],0));a>=e&&eb(d)&&(d=nf.c(O.c?O.c(Z):O.call(null,
Z)),Ig.f(zg,Ic(["position","absolute","top",Cg(a+2*d)],0)));Lf.a(qg,xf);Ig.f(vg,Ic(["top",Cg(-a)],0));Mf.a(qg,Cf);Jg.f(rg,Ic(["top"],0));return window.scroll(b,c)})],null)],null);
if(!v(pf.c(O.c?O.c(Z):O.call(null,Z)))){Qd.j(Z,Nc,pf,!0);FastClick.attach(document.body);for(var Lg=I(Kg),Mg=null,Ng=0,Og=0;;)if(Og<Ng){var Pg=Mg.t(null,Og),Qg=R.b(Pg,0,null),Rg=R.b(Pg,1,null),Sg=R.b(Pg,2,null);fg(Qg,Rg,Sg);Og+=1}else{var Tg=I(Lg);if(Tg){var Ug=Tg;if(Vc(Ug))var Vg=Xb(Ug),Wg=H(Ug),Xg=Vg,Yg=Q(Vg),Lg=Wg,Mg=Xg,Ng=Yg;else{var Zg=L(Ug),$g=R.b(Zg,0,null),ah=R.b(Zg,1,null),bh=R.b(Zg,2,null);fg($g,ah,bh);Lg=N(Ug);Mg=null;Ng=0}Og=0}else break}Gg();Fg()};