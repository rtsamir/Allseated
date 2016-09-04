var asBase;
(function (asBase) {
    var events;
    (function (events) {
        var AsEvent = (function () {
            function AsEvent(pKey, pBubbles, pSender, pCancelable) {
                if (pBubbles === void 0) { pBubbles = false; }
                if (pCancelable === void 0) { pCancelable = false; }
                this.mEvent = document.createEvent("CustomEvent");
                this.mEvent.initCustomEvent(pKey, pBubbles, pCancelable, this);
                this.mSender = pSender;
                // this.mEvent.bubbles = (pBubbles != null) ? pBubbles : false
            }
            Object.defineProperty(AsEvent.prototype, "event", {
                //_____________________________________________________________
                get: function () {
                    return (this.mEvent);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AsEvent.prototype, "sender", {
                //_____________________________________________________________
                get: function () {
                    return (this.mSender);
                },
                enumerable: true,
                configurable: true
            });
            return AsEvent;
        }());
        events.AsEvent = AsEvent;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        var EventBase = (function () {
            function EventBase(pKey, pCallBack, pOwner, pAttachedData, pFunction) {
                this.mAttachedData = pAttachedData;
                this.mOwner = pOwner;
                this.mKey = pKey;
                this.mCallBack = pCallBack;
            }
            Object.defineProperty(EventBase.prototype, "callBack", {
                //____________________________________________________________
                get: function () {
                    return this.mCallBack;
                },
                set: function (value) {
                    this.mCallBack = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "data", {
                //____________________________________________________________
                get: function () {
                    return this.mData;
                },
                set: function (value) {
                    this.mData = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "owner", {
                //____________________________________________________________
                get: function () {
                    return this.mOwner;
                },
                set: function (value) {
                    this.mOwner = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "sender", {
                //____________________________________________________________
                get: function () {
                    return this.mSender;
                },
                set: function (value) {
                    this.mSender = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "attachedData", {
                //____________________________________________________________
                get: function () {
                    return this.mAttachedData;
                },
                set: function (value) {
                    this.mAttachedData = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "key", {
                //____________________________________________________________
                get: function () {
                    return this.mKey;
                },
                set: function (value) {
                    this.mKey = value;
                },
                enumerable: true,
                configurable: true
            });
            return EventBase;
        }());
        events.EventBase = EventBase;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        var EventDispatcher = (function () {
            function EventDispatcher() {
            }
            EventDispatcher.prototype.addEventListener = function (pType, pCallback, pOwner) {
                if (pCallback == undefined) {
                    return;
                }
                if (this.mEventsArray == null) {
                    this.mEventsArray = new Array();
                }
                if (this.mEventsArray[pType] == null) {
                    this.mEventsArray[pType] = new Array();
                }
                var aEventsList = this.mEventsArray[pType];
                for (var i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        return;
                    }
                }
                this.mEventsArray[pType].push(new CallbackHolder(pCallback, pOwner));
            };
            //______________________________________________________________
            EventDispatcher.prototype.removeEventListener = function (pType, pOwner) {
                if (this.mEventsArray == null) {
                    return;
                }
                if (this.mEventsArray[pType] == null) {
                    return;
                }
                var aEventsList = this.mEventsArray[pType];
                for (var i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList.splice(i, 1);
                    }
                }
            };
            //______________________________________________________________
            EventDispatcher.prototype.dispatchEvent = function (pType, pData) {
                if (this.mEventsArray == null) {
                    return;
                }
                if (this.mEventsArray[pType] == null) {
                    return;
                }
                if (pData == null) {
                    for (var i = 0; i < this.mEventsArray[pType].length; i++) {
                        this.mEventsArray[pType][i].callback();
                    }
                }
                else {
                    for (var i = 0; i < this.mEventsArray[pType].length; i++) {
                        this.mEventsArray[pType][i].callback(pData);
                    }
                }
            };
            //________________________________________________________________
            EventDispatcher.prototype.removeAllOwnerEvents = function (pType, pOwner) {
                if (this.mEventsArray == null) {
                    return;
                }
                for (var aTypes in this.mEventsArray) {
                    var aEventsList = this.mEventsArray[aTypes];
                    for (var i = aEventsList.length - 1; i >= 0; i--) {
                        if (aEventsList[i].owner == pOwner) {
                            aEventsList.splice(i, 1);
                        }
                    }
                }
            };
            return EventDispatcher;
        }());
        events.EventDispatcher = EventDispatcher;
        //__________________________________________________________________
        var CallbackHolder = (function () {
            function CallbackHolder(pCallback, pOwner) {
                this.callback = pCallback;
                this.owner = pOwner;
            }
            return CallbackHolder;
        }());
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        var EventManager = (function () {
            function EventManager() {
            }
            //-----------------------------------------------------
            EventManager.dispatchCustomEvent = function (pEvent) {
                if (EventManager.mEvents == null) {
                    return;
                }
                if (EventManager.mEvents[pEvent.key] == null) {
                    return;
                }
                var aEventsList = EventManager.mEvents[pEvent.key];
                for (var i = 0; i < aEventsList.length; i++) {
                    pEvent.attachedData = aEventsList[i].attachedData;
                    pEvent.owner = aEventsList[i].owner;
                    aEventsList[i].callBack(pEvent);
                }
            };
            //-----------------------------------------------------
            EventManager.dispatchEvent = function (pKey, pOwner, pData) {
                if (EventManager.mEvents == null) {
                    return;
                }
                if (EventManager.mEvents[pKey] == null) {
                    return;
                }
                var aEventsList = EventManager.mEvents[pKey];
                for (var i = 0; i < aEventsList.length; i++) {
                    aEventsList[i].data = pData;
                    aEventsList[i].sender = pOwner;
                    aEventsList[i].callBack(aEventsList[i]);
                }
            };
            //-----------------------------------------------------
            EventManager.addEventListener = function (pKey, pCallback, pOwner, pAtachedData, pFunction) {
                if (EventManager.mEvents == null) {
                    EventManager.mEvents = new Array();
                }
                if (EventManager.mEvents[pKey] == null) {
                    EventManager.mEvents[pKey] = Array();
                }
                if (EventManager.hasEventListener(pKey, pOwner)) {
                    return;
                }
                var aEvent = new events.EventBase(pKey, pCallback, pOwner, pAtachedData, pFunction);
                EventManager.mEvents[pKey].push(aEvent);
            };
            //-----------------------------------------------------
            EventManager.hasEventListener = function (pKey, pOwner) {
                var aArray = EventManager.mEvents[pKey];
                for (var i = 0; i < aArray.length; i++) {
                    if (aArray[i].owner == pOwner) {
                        return true;
                    }
                }
                return false;
            };
            //-----------------------------------------------------
            EventManager.removeEventListener = function (pKey, pOwner) {
                if (EventManager.mEvents == null) {
                    return;
                }
                if (EventManager.mEvents[pKey] == null) {
                    return;
                }
                var aEventsList = EventManager.mEvents[pKey];
                for (var i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList.splice(i, 1);
                    }
                }
            };
            //-----------------------------------------------------
            EventManager.removeAllOwnerEvents = function (pOwner) {
                if (EventManager.mEvents == null) {
                    return;
                }
                for (var aKey in EventManager.mEvents) {
                    var aEventsList = EventManager.mEvents[aKey];
                    for (var i = aEventsList.length - 1; i >= 0; i--) {
                        if (aEventsList[i].owner == pOwner) {
                            aEventsList.splice(i, 1);
                        }
                    }
                }
            };
            return EventManager;
        }());
        events.EventManager = EventManager;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        var EventTypes = (function () {
            function EventTypes() {
            }
            /*Data*/
            EventTypes.ASBASE_DATA_READY = "ASBASE_DATA_READY";
            // General events
            EventTypes.ADDED_TO_STAGE = "AddedToStage_EV";
            EventTypes.REMOVED_FROM_STAGE = "RemovedFromStage__EV";
            EventTypes.COMPLETE = "Complete_EV";
            EventTypes.CANCEL = "Cancel_EV";
            EventTypes.SELECT = "Select_EV";
            EventTypes.CLOSE = "Close_EV";
            EventTypes.WORKING = "Working_EV";
            EventTypes.NEXT = "Next_EV";
            EventTypes.PREV = "Prev_EV";
            EventTypes.SHOW_POPUP_WINDOW = "ShowPopUpWindow_EV";
            EventTypes.HIDE_POPUP_WINDOW = "HidePopUpWindow_EV";
            // CHANGE EVENTS
            EventTypes.CHANGE = "change";
            // INPUT TEXT FIELDS EVENTS
            EventTypes.INPUT = "input";
            EventTypes.FOCUS = "focus";
            EventTypes.FOCUSIN = "focusin";
            EventTypes.FOCUSOUT = "focusout";
            EventTypes.BLUR = "blur";
            EventTypes.OVER = "over";
            // KEYBOARD EVENTS
            EventTypes.KEY_DOWN = "keydown";
            EventTypes.KEY_UP = "keyup";
            //LOAD EVENTS
            EventTypes.LOAD = "load";
            return EventTypes;
        }());
        events.EventTypes = EventTypes;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        var KeyboardCodes = (function () {
            function KeyboardCodes() {
            }
            KeyboardCodes.TAB = 9;
            KeyboardCodes.ENTER = 13;
            KeyboardCodes.ESC = 27;
            KeyboardCodes.PAGE_UP = 33;
            KeyboardCodes.PAGE_DOWN = 34;
            KeyboardCodes.END = 35;
            KeyboardCodes.HOME = 36;
            KeyboardCodes.ARROW_UP = 38;
            KeyboardCodes.ARROW_LEFT = 37;
            KeyboardCodes.ARROW_RIGHT = 39;
            KeyboardCodes.ARROW_DOWN = 40;
            KeyboardCodes.F1 = 112;
            KeyboardCodes.F2 = 113;
            KeyboardCodes.NUM_1 = 49;
            KeyboardCodes.NUM_2 = 50;
            KeyboardCodes.NUM_3 = 51;
            KeyboardCodes.BACKSPACE = 8;
            KeyboardCodes.DELETE = 46;
            KeyboardCodes.DIGIT_0 = 48;
            KeyboardCodes.LETTER_Z = 90;
            return KeyboardCodes;
        }());
        events.KeyboardCodes = KeyboardCodes;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        var MouseEvents = (function () {
            function MouseEvents() {
            }
            MouseEvents.CLICK = "click";
            MouseEvents.DOUBLE_CLICK = "dblclick";
            MouseEvents.MOUSE_OVER = "mouseover";
            MouseEvents.MOUSE_OUT = "mouseout";
            MouseEvents.MOUSE_DOWN = "mousedown";
            MouseEvents.MOUSE_UP = "mouseup";
            MouseEvents.MOUSE_MOVE = "mousemove";
            MouseEvents.TOUCH_MOVE = "touchmove";
            MouseEvents.TOUCH_START = "touchstart";
            MouseEvents.TOUCH_END = "touchend";
            MouseEvents.DRAG_OVER = "dragover";
            MouseEvents.DRAG_LEAVE = "dragleave";
            MouseEvents.DROP = "drop";
            return MouseEvents;
        }());
        events.MouseEvents = MouseEvents;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        var MathUtils = (function () {
            function MathUtils() {
            }
            MathUtils.interpolate = function (pP1, pP2, pVal) {
                var aDx = (pP2.x - pP1.x) * pVal;
                var aDy = (pP2.y - pP1.y) * pVal;
                return (new asBase.math.Point(pP1.x + aDx, pP1.y + aDy));
            };
            //_____________________________________________________________________
            MathUtils.distance = function (pP1, pP2) {
                var aDx = (pP1.x - pP2.x);
                var aDy = (pP1.y - pP2.y);
                return (Math.sqrt((aDx * aDx) + (aDy * aDy)));
            };
            //_____________________________________________________________________
            MathUtils.rotatePoint = function (pPoint, pAngle) {
                var aRadAngle = pAngle * MathUtils.DEG_TO_RAD;
                var aX = pPoint.x * Math.cos(aRadAngle) - pPoint.y * Math.sin(aRadAngle);
                var aY = pPoint.x * Math.sin(aRadAngle) + pPoint.y * Math.cos(aRadAngle);
                return (new asBase.math.Point(aX, aY));
            };
            //_____________________________________________________________________
            MathUtils.isRectOverlap = function (pRect1, pRect2) {
                return !(pRect2.left > pRect1.right ||
                    pRect2.right < pRect1.left ||
                    pRect2.top > pRect1.bottom ||
                    pRect2.bottom < pRect1.top);
            };
            //_____________________________________________________________________
            MathUtils.combineRectToBaseRect = function (pBaseRect, pWithRect) {
                pBaseRect.left = Math.min(pBaseRect.left, pWithRect.left);
                pBaseRect.right = Math.max(pBaseRect.right, pWithRect.right);
                pBaseRect.top = Math.min(pBaseRect.top, pWithRect.top);
                pBaseRect.bottom = Math.max(pBaseRect.bottom, pWithRect.bottom);
                return pBaseRect;
            };
            MathUtils.RAD_TO_DEG = 180 / Math.PI;
            MathUtils.DEG_TO_RAD = Math.PI / 180;
            return MathUtils;
        }());
        math.MathUtils = MathUtils;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
/*
Base On:
https://github.com/epistemex/transformation-matrix-js/blob/master/src/matrix.js

*/
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        var Matrix = (function () {
            function Matrix() {
                //------------------------------
                // Members
                //------------------------------
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.e = 0; //X
                this.f = 0; //Y
            }
            /****************************
            * Methods
            ****************************/
            Matrix.fromSVGMatrix = function (svgMatrix) {
                return new Matrix().multiply(svgMatrix);
            };
            ;
            //______________________________________________________
            Matrix.fromDOMMatrix = function (domMatrix) {
                return new Matrix().multiply(domMatrix);
            };
            ;
            //______________________________________________________
            Matrix.prototype.flipX = function () {
                return (this.transform(-1, 0, 0, 1, 0, 0));
            };
            ;
            //______________________________________________________
            Matrix.prototype.flipY = function () {
                return (this.transform(1, 0, 0, -1, 0, 0));
            };
            ;
            //______________________________________________________
            Matrix.prototype.applyToPoint = function (x, y) {
                var aPoint = new math.Point();
                aPoint.x = x * this.a + y * this.c + this.e;
                aPoint.y = x * this.b + y * this.d + this.f;
                return (aPoint);
            };
            ;
            //______________________________________________________
            Matrix.prototype.reflectVector = function (x, y) {
                var v = this.applyToPoint(0, 1), d = (v.x * x + v.y * y) * 2;
                x -= d * v.x;
                y -= d * v.y;
                return (new math.Point(x, y));
            };
            ;
            //______________________________________________________
            Matrix.prototype.determinant = function () {
                return (this.a * this.d - this.b * this.c);
            };
            ;
            //______________________________________________________
            Matrix.prototype.indent = function () {
                return (this.setTransform(1, 0, 0, 1, 0, 0));
            };
            ;
            //______________________________________________________
            Matrix.prototype.rotate = function (pAngle) {
                var cos = Math.cos(pAngle), sin = Math.sin(pAngle);
                return this.transform(cos, sin, -sin, cos, 0, 0);
            };
            ;
            //____________________________________________________
            Matrix.prototype.divideScalar = function (pScalar) {
                this.a /= pScalar;
                this.b /= pScalar;
                this.c /= pScalar;
                this.d /= pScalar;
                this.e /= pScalar;
                this.f /= pScalar;
            };
            ;
            //____________________________________________________
            Matrix.prototype.setTransform = function (pA, pB, pC, pD, pE, pF) {
                this.a = pA;
                this.b = pB;
                this.c = pC;
                this.d = pD;
                this.e = pE;
                this.f = pF;
                return this;
            };
            ;
            //____________________________________________________
            Matrix.prototype.transform = function (pA, pB, pC, pD, pE, pF) {
                var a1 = this.a;
                var b1 = this.b;
                var c1 = this.c;
                var d1 = this.d;
                var e1 = this.e;
                var f1 = this.f;
                this.a = a1 * pA + c1 * pB;
                this.b = b1 * pA + d1 * pB;
                this.c = a1 * pC + c1 * pD;
                this.d = b1 * pC + d1 * pD;
                this.e = a1 * pE + c1 * pF + e1;
                this.f = b1 * pE + d1 * pF + f1;
                return this;
            };
            ;
            //____________________________________________________
            Matrix.prototype.multiply = function (pMatrix) {
                return (this.transform(pMatrix.a, pMatrix.b, pMatrix.c, pMatrix.d, pMatrix.e, pMatrix.f));
            };
            //____________________________________________________
            Matrix.prototype.inverse = function () {
                var aRet = new Matrix();
                var dt = this.determinant();
                if (this.q(dt, 0)) {
                    throw "Matrix not invertible.";
                }
                aRet.a = this.d / dt;
                aRet.b = -this.b / dt;
                aRet.c = -this.c / dt;
                aRet.d = this.a / dt;
                aRet.e = (this.c * this.f - this.d * this.e) / dt;
                aRet.f = -(this.a * this.f - this.b * this.e) / dt;
                return aRet;
            };
            ;
            //____________________________________________________
            Matrix.prototype.interpolate = function (pMatrix, pT) {
                var aRet = new Matrix();
                aRet.a = this.a + (pMatrix.a - this.a) * pT;
                aRet.b = this.b + (pMatrix.b - this.b) * pT;
                aRet.c = this.c + (pMatrix.c - this.c) * pT;
                aRet.d = this.d + (pMatrix.d - this.d) * pT;
                aRet.e = this.e + (pMatrix.e - this.e) * pT;
                aRet.f = this.f + (pMatrix.f - this.f) * pT;
                return aRet;
            };
            ;
            //____________________________________________________
            Matrix.prototype.q = function (p1, p2) {
                return (Math.abs(p1 - p2) < 1e-14);
            };
            Object.defineProperty(Matrix, "myName", {
                /****************************
                * Getters and Setters
                ****************************/
                get: function () {
                    return "Matrix";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix.prototype, "myClassName", {
                //______________________________________________
                get: function () {
                    return "Matrix";
                },
                enumerable: true,
                configurable: true
            });
            return Matrix;
        }());
        math.Matrix = Matrix;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        var Point = (function () {
            function Point(iX, iY) {
                if (iX === void 0) { iX = 0; }
                if (iY === void 0) { iY = 0; }
                this.x = iX;
                this.y = iY;
            }
            /****************************
            * Override methods
            ****************************/
            /****************************
            * Methods
            ****************************/
            Point.prototype.subtract = function (p) {
                return (new Point(this.x - p.x, this.y - p.y));
            };
            //________________________________________________________________
            Point.prototype.add = function (p) {
                return (new Point(this.x + p.x, this.y + p.y));
            };
            //________________________________________________________________
            Point.interpolate = function (p1, p2, pFrac) {
                var aX = p1.x + (p2.x - p1.x) * pFrac;
                var aY = p1.y + (p2.y - p1.y) * pFrac;
                return (new Point(aX, aY));
            };
            Object.defineProperty(Point.prototype, "length", {
                get: function () {
                    return (Math.sqrt(this.x * this.x + this.y * this.y));
                },
                /****************************
                * Getters and Setters
                ****************************/
                set: function (pVal) {
                    var aV = this.length / pVal;
                    this.x /= aV;
                    this.y /= aV;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Point, "myName", {
                //________________________________________________________________
                get: function () {
                    return "Point";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Point.prototype, "myClassName", {
                //______________________________________________
                get: function () {
                    return "Point";
                },
                enumerable: true,
                configurable: true
            });
            return Point;
        }());
        math.Point = Point;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
var asSvg;
(function (asSvg) {
    var DisplayObject = (function () {
        function DisplayObject() {
            this.mX = 0;
            this.mY = 0;
            this.mRotation = 0;
            this.mScaleX = 1;
            this.mScaleY = 1;
            this.mVisible = true;
            this.createElement();
            this.mLastGlobalMousePoint = new asBase.math.Point(-Number.MAX_VALUE, -Number.MAX_VALUE);
            this.mCallbacks = {};
        }
        /****************************
        * Override methods
        ****************************/
        /****************************
        * Methods
        ****************************/
        DisplayObject.prototype.createElement = function () { };
        ;
        //_______________________________________________________________________
        DisplayObject.prototype.create = function (pType) {
            this.mElement = document.createElementNS("http://www.w3.org/2000/svg", pType);
            this.mElement.displayObject = this;
        };
        ;
        //_______________________________________________________
        DisplayObject.prototype.setLineStyle = function (pWidth, pColor, pOpacity, pLinecap, pLinejoin) {
            if (pWidth != null) {
                this.mElement.setAttribute("stroke-width", pWidth.toString());
            }
            if (pColor != null) {
                var aColor = "#" + pColor.toString(16);
                while (aColor.length < 7) {
                    aColor += "0";
                }
                this.mElement.setAttribute("stroke", aColor);
            }
            else {
                this.mElement.setAttribute("stroke", "none");
            }
            if (pOpacity != null) {
                this.mElement.setAttribute("stroke-opacity", pOpacity.toString());
            }
            if (pLinecap != null) {
                this.mElement.setAttribute("stroke-linecap", pLinecap);
            }
            if (pLinejoin != null) {
                this.mElement.setAttribute("stroke-linejoin", pLinejoin);
            }
        };
        //________________________________________________________
        DisplayObject.prototype.setFill = function (pColor, pOpacity) {
            if (pColor != null) {
                var aColor = "#" + pColor.toString(16);
                this.mElement.setAttribute("fill", aColor);
            }
            if (pOpacity != null) {
                this.mElement.setAttribute("fill-opacity", pOpacity.toString());
            }
            if (pColor == null) {
                this.mElement.setAttribute("fill", "none");
            }
        };
        //_____________________________________________________________
        DisplayObject.prototype.getLocalBounds = function () {
            return (this.mElement.getBoundingClientRect());
        };
        //_____________________________________________________________
        DisplayObject.prototype.getBounds = function () {
            return (this.mElement.getBoundingClientRect());
        };
        //________________________________________________________________
        DisplayObject.prototype.hitTest = function (pElement) {
            var mRect1 = this.mElement.getBoundingClientRect();
            var mRect2 = pElement.getBounds();
            return !(mRect2.left > mRect1.right ||
                mRect2.right < mRect1.left ||
                mRect2.top > mRect1.bottom ||
                mRect2.bottom < mRect1.top);
        };
        Object.defineProperty(DisplayObject.prototype, "matrix", {
            //_________________________________________________________________
            get: function () {
                if (this.mMatrix == null) {
                    this.mMatrix = new asBase.math.Matrix();
                    var a = this.mRotation * Math.PI / 180;
                    this.mMatrix.setTransform(this.mScaleX * Math.cos(a), this.mScaleY * Math.sin(a), -this.mScaleX * Math.sin(a), this.mScaleY * Math.cos(a), this.mX, this.mY);
                }
                return (this.mMatrix);
            },
            enumerable: true,
            configurable: true
        });
        //________________________________________________________________________
        DisplayObject.prototype.localToGlobalMatrix = function () {
            var aMatrixArray = this.matrixsStuck;
            if (aMatrixArray.length == 0) {
                return new asBase.math.Matrix();
            }
            var aMat = new asBase.math.Matrix();
            for (var i = 0; i < aMatrixArray.length; i++) {
                aMat.multiply(aMatrixArray[i]);
            }
            return aMat;
        };
        //________________________________________________________________________
        DisplayObject.prototype.localToGlobal = function (pPoint) {
            var aMat = this.localToGlobalMatrix();
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        };
        //_________________________________________________________________________
        DisplayObject.prototype.globalToLocalMatrix = function () {
            var aMatrixArray = this.matrixsStuck;
            if (aMatrixArray.length == 0) {
                return new asBase.math.Matrix();
            }
            var aMat = new asBase.math.Matrix();
            for (var i = aMatrixArray.length - 1; i >= 0; i--) {
                aMat = aMat.multiply(aMatrixArray[i]);
            }
            aMat = aMat.inverse();
            return aMat;
        };
        //________________________________________________________________________
        DisplayObject.prototype.globalToLocal = function (pPoint) {
            var aMat = this.globalToLocalMatrix();
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        };
        Object.defineProperty(DisplayObject.prototype, "matrixsStuck", {
            //__________________________________________________________________________________
            get: function () {
                var aMatrixArray = new Array();
                if (this.stage == null) {
                    return aMatrixArray;
                }
                if (this.myClassName == asSvg.Stage.myName) {
                    return aMatrixArray;
                }
                var aCurrent = this.parent;
                while (aCurrent.myClassName != asSvg.Stage.myName) {
                    aMatrixArray.push(aCurrent.matrix);
                    aCurrent = aCurrent.parent;
                }
                aMatrixArray.push(aCurrent.matrix);
                return aMatrixArray;
            },
            enumerable: true,
            configurable: true
        });
        //________________________________________________________________________
        DisplayObject.prototype.hitTestPoint = function (pX, pY, pIsShape) {
            var mRect = this.mElement.getBoundingClientRect();
            if (pX < mRect.left) {
                return false;
            }
            if (pX > mRect.right) {
                return false;
            }
            if (pY > mRect.bottom) {
                return false;
            }
            if (pY < mRect.top) {
                return false;
            }
            if (!pIsShape) {
                return true;
            }
            // TODO - Shape Hit Test ;
            /* Options :
                NodeList getIntersectionList ( in SVGRect rect, in SVGElement referenceElement );
                NodeList getEnclosureList ( in SVGRect rect, in SVGElement referenceElement );
                boolean checkIntersection ( in SVGElement element, in SVGRect rect );
                boolean checkEnclosure
            */
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "rotation", {
            get: function () {
                return (this.mRotation);
            },
            /****************************
            * Getters and Setters
            ****************************/
            set: function (pVal) {
                this.mRotation = pVal;
                this.updateTransform();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "x", {
            get: function () {
                return (this.mX);
            },
            //___________________________________________________
            set: function (pVal) {
                this.mX = pVal;
                this.updateTransform();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "y", {
            get: function () {
                return (this.mY);
            },
            //___________________________________________________
            set: function (pVal) {
                this.mY = pVal;
                this.updateTransform();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleY", {
            get: function () {
                return (this.mScaleY);
            },
            //___________________________________________________
            set: function (pVal) {
                this.mScaleY = pVal;
                this.updateTransform();
            },
            enumerable: true,
            configurable: true
        });
        //___________________________________________________
        DisplayObject.prototype.setScale = function (pVal) {
            this.mScaleY = pVal;
            this.mScaleX = pVal;
            this.updateTransform();
        };
        Object.defineProperty(DisplayObject.prototype, "scaleX", {
            get: function () {
                return (this.mScaleX);
            },
            //___________________________________________________
            set: function (pVal) {
                this.mScaleX = pVal;
                this.updateTransform();
            },
            enumerable: true,
            configurable: true
        });
        //___________________________________________________
        DisplayObject.prototype.updateTransform = function () {
            this.mMatrix = null;
            var aMat = this.matrix;
            var aTransform = "matrix(" + aMat.a + "," + aMat.b + "," + aMat.c + "," + aMat.d + "," + aMat.e + "," + aMat.f + ")";
            this.mElement.setAttribute("transform", aTransform);
        };
        //___________________________________________________
        DisplayObject.prototype.updateTransformOld = function () {
            var aTransform = "";
            if ((this.mX != 0) || (this.mY != 0)) {
                aTransform += "translate(" + this.mX + "," + this.mY + ") "; // rotate(20)";
            }
            if (this.mRotation != 0) {
                aTransform += "rotate(" + this.mRotation + ") "; // rotate(20)";
            }
            if ((this.mScaleX != 1) || (this.mScaleY != 1)) {
                aTransform += "scale(" + this.mScaleX + "," + this.mScaleY + ")"; // rotate(20)";
            }
            this.mElement.setAttribute("transform", aTransform);
        };
        //____________________________________________________________
        DisplayObject.prototype.show = function (pVal) {
            this.mVisible = pVal;
            if (this.mParent == null) {
                return;
            }
            if (!this.mVisible) {
                if (this.mParent.element == this.mElement.parentNode) {
                    this.mParent.element.removeChild(this.mElement);
                }
            }
            else {
                this.mParent.element.appendChild(this.mElement);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "visible", {
            get: function () {
                return (this.mVisible);
            },
            //_____________________________________________________________
            set: function (pVal) {
                this.show(pVal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "alpha", {
            get: function () {
                return (this.mAlpha);
            },
            //_____________________________________________________________
            set: function (pVal) {
                this.setLineStyle(null, null, pVal);
                this.setFill(null, pVal);
                this.mAlpha = pVal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "height", {
            //_____________________________________________________________
            get: function () {
                return (this.mElement.getBoundingClientRect().height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "width", {
            //_____________________________________________________________
            get: function () {
                return (this.mElement.getBoundingClientRect().width);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "parent", {
            get: function () {
                return (this.mParent);
            },
            //_____________________________________________________________
            set: function (pVal) {
                this.mParent = pVal;
                if (pVal == null) {
                    this.mStage = null;
                }
                this.mStage = this.stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "element", {
            //_____________________________________________________________
            get: function () {
                return this.mElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject, "myName", {
            get: function () {
                return "DisplayObject";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "DisplayObject";
            },
            enumerable: true,
            configurable: true
        });
        //______________________________________________
        DisplayObject.prototype.addEventListenerOld = function (pKey, pEventListener, pUseCapture) {
            if (this.mCallbacks[pKey] != null) {
                this.mCallbacks[pKey].push(pEventListener);
            }
            else {
                this.mCallbacks[pKey] = [pEventListener];
            }
            this.mElement.addEventListener(pKey, pEventListener, pUseCapture);
        };
        //______________________________________________
        DisplayObject.prototype.removeEventListenerOld = function (pKey, pEventListener) {
            if (this.mCallbacks[pKey] != null) {
                for (var i = 0; i < this.mCallbacks[pKey].length; i++) {
                    if (pEventListener != null) {
                        if (this.mCallbacks[pKey] == pEventListener) {
                            this.mElement.removeEventListener(pKey, pEventListener);
                        }
                    }
                    else {
                        this.mElement.removeEventListener(pKey, this.mCallbacks[pKey]);
                    }
                }
            }
        };
        //_________________________________________________
        DisplayObject.prototype.removeAllEvents = function () {
            for (var aKey in this.mCallbacks) {
                if (this.mCallbacks[aKey] != null) {
                    this.removeEventListener(aKey, this);
                }
            }
        };
        //_________________________________________________
        DisplayObject.prototype.destract = function () {
            this.removeAllEvents();
        };
        Object.defineProperty(DisplayObject.prototype, "stage", {
            //_________________________________________________
            get: function () {
                if (this.mStage != null) {
                    return this.mStage;
                }
                if (this.parent == null) {
                    return null;
                }
                if (this.parent.myClassName == asSvg.Stage.myName) {
                    return this.parent;
                }
                this.mStage = this.parent.stage;
                return (this.mStage);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "onEnterFrame", {
            //_________________________________________________________
            get: function () {
                return this.mEnterFrameCallback;
            },
            //_________________________________________________________
            set: function (pEnterFrameCallback) {
                this.mEnterFrameCallback = pEnterFrameCallback;
                if (pEnterFrameCallback == null) {
                    this.disableEnterFrame();
                    return;
                }
                this.enableEnterFrame();
            },
            enumerable: true,
            configurable: true
        });
        //_________________________________________________________
        DisplayObject.prototype.enableEnterFrame = function () {
            var aStage = this.stage;
            if (aStage == null) {
                return false;
            }
            aStage.addToEnterFrameList(this);
            return true;
        };
        //_________________________________________________________
        DisplayObject.prototype.disableEnterFrame = function () {
            var aStage = this.stage;
            if (aStage == null) {
                return false;
            }
            aStage.addToEnterFrameList(this);
            return true;
        };
        //________________________________________________________
        DisplayObject.prototype.enterFrame = function () {
            if (this.mEnterFrameCallback != null) {
                this.mEnterFrameCallback();
            }
        };
        Object.defineProperty(DisplayObject.prototype, "mouseX", {
            //____________________________________________________________
            get: function () {
                return this.parentMouseLocation.x - this.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "mouseY", {
            //____________________________________________________________
            get: function () {
                return this.parentMouseLocation.y - this.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "instanceName", {
            get: function () {
                return this.element.id;
            },
            //____________________________________________________________
            set: function (pVal) {
                this.element.id = pVal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "parentMouseLocation", {
            //____________________________________________________________
            get: function () {
                if ((this.mLastGlobalMousePoint.x == this.stage.mouseLocation.x) && (this.mLastGlobalMousePoint.y == this.stage.mouseLocation.y)) {
                    return this.mLastLocalMousePoint;
                }
                this.mLastGlobalMousePoint.x = this.stage.mouseLocation.x;
                this.mLastGlobalMousePoint.y = this.stage.mouseLocation.y;
                this.mLastLocalMousePoint = this.globalToLocal(this.stage.mouseLocation);
                return (this.mLastLocalMousePoint);
            },
            enumerable: true,
            configurable: true
        });
        //____________________________________________________________
        DisplayObject.prototype.startDrag = function (pLockCenter) {
            var _this = this;
            if (pLockCenter === void 0) { pLockCenter = true; }
            if (pLockCenter) {
                this.mDragingVector = new asBase.math.Point();
            }
            else {
                this.mDragingVector = new asBase.math.Point(this.mouseX, this.mouseY);
            }
            if (this.mMouseMoveCallback == null) {
                this.mMouseMoveCallback = function (e) { return _this.onMouseMove(e); };
            }
            if (this.mStage != null) {
                this.mStage.addEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this.mMouseMoveCallback, this);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "isInDrag", {
            //____________________________________________________________
            get: function () {
                return (this.mDragingVector != null);
            },
            enumerable: true,
            configurable: true
        });
        //____________________________________________________________
        DisplayObject.prototype.stopDrag = function () {
            if (this.mMouseMoveCallback == null) {
                return;
            }
            this.mDragingVector = null;
            this.mStage.removeEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this);
        };
        //____________________________________________________________
        DisplayObject.prototype.onMouseMove = function (e) {
            //let aLocalPoint: asBase.math.Point = this.globalToLocal(this.mStage.mouseLocation);
            var aLocalPoint = this.globalToLocal(new asBase.math.Point(e.clientX - this.mStage.offsetX, e.clientY - this.mStage.offsetY));
            this.x = aLocalPoint.x + this.mDragingVector.x;
            this.y = aLocalPoint.y + this.mDragingVector.y;
        };
        //_______________________________________________________________
        DisplayObject.prototype.addEventListener = function (pType, pEventListener, pOwner, useCapture) {
            if (this.mEvents == null) {
                this.mEvents = new Array();
            }
            if (this.mEvents[pType] == null) {
                this.mEvents[pType] = Array();
            }
            var aEventsList = this.mEvents[pType];
            for (var i = 0; i < aEventsList.length; i++) {
                if (aEventsList[i].owner == pOwner) {
                    return;
                }
            }
            this.mEvents[pType].push(new EventListenerHolder(pEventListener, pOwner));
            if (this.mElement == null) {
                return false;
            }
            if (useCapture != null) {
                this.mElement.addEventListener(pType, pEventListener, useCapture);
                return true;
            }
            this.mElement.addEventListener(pType, pEventListener);
        };
        //_______________________________________________________________
        DisplayObject.prototype.removeEventListener = function (pType, pOwner, useCapture) {
            if (this.mEvents == null) {
                return;
            }
            if (this.mEvents[pType] == null) {
                return;
            }
            var aEventListener;
            var aEventsList = this.mEvents[pType];
            for (var i = aEventsList.length - 1; i >= 0; i--) {
                if (aEventsList[i].owner == pOwner) {
                    aEventListener = aEventsList[i].callback;
                    aEventsList.splice(i, 1);
                }
            }
            if (aEventListener == null) {
                return;
            }
            if (this.mElement == null) {
                return false;
            }
            if (useCapture != null) {
                this.mElement.removeEventListener(pType, aEventListener, useCapture);
                return true;
            }
            this.mElement.removeEventListener(pType, aEventListener);
        };
        //_______________________________________________________________
        DisplayObject.prototype.removeAllOwnerEvents = function (pOwner, useCapture) {
            if (this.mEvents == null) {
                return;
            }
            for (var aType in this.mEvents) {
                var aEventListener = void 0;
                var aEventsList = this.mEvents[aType];
                for (var i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventListener = aEventsList[i].callback;
                        aEventsList.splice(i, 1);
                        if (this.mElement == null) {
                            return false;
                        }
                        if (useCapture != null) {
                            this.mElement.removeEventListener(aType, aEventListener, useCapture);
                        }
                        else {
                            this.mElement.removeEventListener(aType, aEventListener);
                        }
                    }
                }
            }
        };
        //_______________________________________________________________
        DisplayObject.prototype.dispatchEvent = function (pEvent) {
            if (this.mElement == null) {
                return false;
            }
            this.mElement.dispatchEvent(pEvent);
            return true;
        };
        return DisplayObject;
    }());
    asSvg.DisplayObject = DisplayObject;
    var EventListenerHolder = (function () {
        function EventListenerHolder(pCallback, pOwner) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
        return EventListenerHolder;
    }());
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var asSvg;
(function (asSvg) {
    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle(pX, pY, pR, pColor) {
            if (pColor === void 0) { pColor = 0; }
            _super.call(this);
            this.update(pX, pY, pR);
            if (pColor != 0) {
                this.setFill(pColor);
            }
        }
        /****************************
        * Override methods
        ****************************/
        Circle.prototype.createElement = function () {
            this.create("circle");
        };
        /****************************
        * Methods
        ****************************/
        Circle.prototype.update = function (pX, pY, pR) {
            if (pX != null) {
                this.mElement.setAttribute("cx", pX.toString());
            }
            if (pY != null) {
                this.mElement.setAttribute("cy", pY.toString());
            }
            if (pR != null) {
                this.mElement.setAttribute("r", pR.toString());
            }
        };
        Object.defineProperty(Circle, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            get: function () {
                return "Circle";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Circle";
            },
            enumerable: true,
            configurable: true
        });
        return Circle;
    }(asSvg.DisplayObject));
    asSvg.Circle = Circle;
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
(function (asSvg) {
    var Ellipse = (function (_super) {
        __extends(Ellipse, _super);
        function Ellipse(pX, pY, pRx, pRy) {
            _super.call(this);
            this.update(pX, pY, pRx, pRy);
        }
        /****************************
        * Override methods
        ****************************/
        Ellipse.prototype.createElement = function () {
            this.create("ellipse");
        };
        ;
        /****************************
        * Methods
        ****************************/
        Ellipse.prototype.update = function (pX, pY, pRx, pRy) {
            if (pX != null) {
                this.mElement.setAttribute("cx", pX.toString());
            }
            if (pY != null) {
                this.mElement.setAttribute("cy", pY.toString());
            }
            if (pRx != null) {
                this.mElement.setAttribute("rx", pRx.toString());
            }
            if (pRy != null) {
                this.mElement.setAttribute("ry", pRy.toString());
            }
        };
        Object.defineProperty(Ellipse, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            get: function () {
                return "Ellipse";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipse.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Ellipse";
            },
            enumerable: true,
            configurable: true
        });
        return Ellipse;
    }(asSvg.DisplayObject));
    asSvg.Ellipse = Ellipse;
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    var Graphics = (function () {
        function Graphics() {
            this.mDraw = "";
        }
        /****************************
        * Override methods
        ****************************/
        /****************************
        * Methods
        ****************************/
        Graphics.prototype.moveTo = function (x, y) {
            this.mDraw += "M " + x + " " + y + " ";
        };
        //_________________________________________________________
        Graphics.prototype.lineTo = function (x, y) {
            this.mDraw += "l " + x + " " + y + " ";
        };
        //________________________________________________________
        Graphics.prototype.quadraticBezierCurve = function (x1, y1, x2, y2) {
            this.mDraw += "q " + x1 + " " + y1 + " " + x2 + " " + y2 + " ";
        };
        Object.defineProperty(Graphics.prototype, "owner", {
            /****************************
            * Getters and Setters
            ****************************/
            set: function (pElement) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphics, "myName", {
            get: function () {
                return "Graphics";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphics.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Graphics";
            },
            enumerable: true,
            configurable: true
        });
        return Graphics;
    }());
    asSvg.Graphics = Graphics;
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader(pPath, pFunction) {
            var _this = this;
            _super.call(this);
            this.mCallback = pFunction;
            this.mPath = pPath;
            if (pPath == null) {
                return;
            }
            this.mHttpRequest = new XMLHttpRequest;
            this.mHttpRequest.open('get', pPath, true);
            this.mHttpRequest.onreadystatechange = function () { return _this.onReadyStatecChange(); };
            this.mHttpRequest.send();
        }
        /****************************
        * Override methods
        ****************************/
        Loader.prototype.createElement = function () {
            this.create("g");
        };
        ;
        /****************************
        * Methods
        ****************************/
        //_____________________________________________________________________________
        Loader.prototype.setSVGDataFromData = function (pSVG) {
            this.mSVG = document.importNode(pSVG, true);
            var a = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "defs");
            var b = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "g");
            for (var i = 0; i < a.length; i++) {
                this.mElement.appendChild(a[i]);
            }
            for (var i = 0; i < b.length; i++) {
                this.mElement.appendChild(b[i]);
            }
            if (this.mCallback != null) {
                this.mCallback(this);
            }
            //this.mElement.appendChild(this.mSVG);
        };
        //______________________________________________________________________________
        Loader.prototype.onReadyStatecChange = function () {
            if (this.mHttpRequest.readyState != 4)
                return;
            var aSvg = this.mHttpRequest.responseXML.documentElement;
            this.setSVGDataFromData(aSvg);
        };
        Object.defineProperty(Loader, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            get: function () {
                return "Loader";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Loader.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Loader";
            },
            enumerable: true,
            configurable: true
        });
        return Loader;
    }(asSvg.DisplayObject));
    asSvg.Loader = Loader;
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
(function (asSvg) {
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect(pX, pY, pWidth, pHeight, pRx, pRy) {
            _super.call(this);
            this.update(pX, pY, pWidth, pHeight, pRx, pRy);
        }
        /****************************
        * Override methods
        ****************************/
        Rect.prototype.createElement = function () {
            this.create("rect");
        };
        ;
        /****************************
        * Methods
        ****************************/
        Rect.prototype.update = function (pX, pY, pWidth, pHeight, pRx, pRy) {
            if (pX != null) {
                this.mElement.setAttribute("x", pX.toString());
            }
            if (pY != null) {
                this.mElement.setAttribute("y", pY.toString());
            }
            if (pWidth != null) {
                this.mElement.setAttribute("width", pWidth.toString());
            }
            if (pHeight != null) {
                this.mElement.setAttribute("height", pHeight.toString());
            }
            if (pRx != null) {
                this.mElement.setAttribute("rx", pRx.toString());
            }
            if (pRy != null) {
                this.mElement.setAttribute("ry", pRy.toString());
            }
        };
        Object.defineProperty(Rect, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            get: function () {
                return "Rect";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Rect";
            },
            enumerable: true,
            configurable: true
        });
        return Rect;
    }(asSvg.DisplayObject));
    asSvg.Rect = Rect;
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
(function (asSvg) {
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape() {
            _super.call(this);
            this.mCurrentX = 0;
            this.mCurrentY = 0;
            this.mDraw = "";
        }
        /****************************
        * Override methods
        ****************************/
        Shape.prototype.createElement = function () {
            this.create("path");
        };
        ;
        /****************************
        * Methods
        ****************************/
        Shape.prototype.clear = function () {
            this.mDraw = "";
            this.mElement.setAttribute("d", this.mDraw);
        };
        //_________________________________________________________
        Shape.prototype.moveTo = function (x, y) {
            this.mDraw += "M " + x + " " + y + " ";
            this.mCurrentX = x;
            this.mCurrentY = y;
            this.mElement.setAttribute("d", this.mDraw);
        };
        //_________________________________________________________
        Shape.prototype.lineTo = function (x, y) {
            this.mDraw += "l " + (x - this.mCurrentX) + " " + (y - this.mCurrentY) + " ";
            this.mCurrentX = x;
            this.mCurrentY = y;
            this.mElement.setAttribute("d", this.mDraw);
        };
        //________________________________________________________
        Shape.prototype.quadraticBezierCurve = function (x1, y1, x2, y2) {
            this.mDraw += "q " + (x1 - this.mCurrentX) + " " + (y1 - this.mCurrentY) + " " + (x2 - this.mCurrentX) + " " + (y2 - this.mCurrentY) + " ";
            this.mCurrentX = x2;
            this.mCurrentY = y2;
            this.mElement.setAttribute("d", this.mDraw);
        };
        //________________________________________________________
        Shape.prototype.bezierCurveTo = function (x1, y1, x2, y2, x3, y3) {
            this.mDraw += "c " + (x1 - this.mCurrentX) + " " + (y1 - this.mCurrentY) + " " + (x2 - this.mCurrentX) + " " + (y2 - this.mCurrentY) + " " + (x3 - this.mCurrentX) + " " + (y3 - this.mCurrentY) + " ";
            this.mCurrentX = x3;
            this.mCurrentY = y3;
            this.mElement.setAttribute("d", this.mDraw);
        };
        Object.defineProperty(Shape, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            get: function () {
                return "Shape";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Shape";
            },
            enumerable: true,
            configurable: true
        });
        return Shape;
    }(asSvg.DisplayObject));
    asSvg.Shape = Shape;
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
(function (asSvg) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            _super.call(this);
            this.mChildren = new Array();
        }
        /****************************
        * Override methods
        ****************************/
        Sprite.prototype.createElement = function () {
            this.create("g");
        };
        ;
        Object.defineProperty(Sprite.prototype, "parent", {
            get: function () {
                return (this.mParent);
            },
            //____________________________________________________
            set: function (pVal) {
                this.mParent = pVal;
                if (pVal == null) {
                    this.mStage = null;
                }
                this.mStage = this.stage;
                for (var i = 0; i < this.mChildren.length; i++) {
                    this.mChildren[i].parent = this;
                }
            },
            enumerable: true,
            configurable: true
        });
        /****************************
        * Methods
        ****************************/
        Sprite.prototype.addChild = function (pElement) {
            this.mChildren.push(pElement);
            pElement.parent = this;
            if (pElement.visible) {
                this.mElement.appendChild(pElement.element);
            }
        };
        //_________________________________________________________
        Sprite.prototype.removeChild = function (pElement) {
            var aIndex = this.mChildren.indexOf(pElement);
            if (aIndex > -1) {
                this.mChildren.splice(aIndex, 1);
            }
            if (pElement.parent != this) {
                return;
            }
            if (this.mElement.parentNode == this.mElement) {
                return;
            }
            this.mElement.removeChild(pElement.element);
            pElement.parent = null;
        };
        Object.defineProperty(Sprite.prototype, "children", {
            //__________________________________________________
            get: function () {
                return (this.mChildren);
            },
            enumerable: true,
            configurable: true
        });
        //__________________________________________________
        Sprite.prototype.addChildAt = function (pDisplayObject, pIndex) {
            if ((pIndex > this.mChildren.length) || (this.mChildren.length == 0)) {
                this.addChild(pDisplayObject);
                return;
            }
            if (pIndex <= 0) {
                this.element.insertBefore(pDisplayObject.element, this.mChildren[0].element);
                this.mChildren.unshift(pDisplayObject);
                return;
            }
            this.element.insertBefore(pDisplayObject.element, this.mChildren[pIndex].element);
            this.mChildren.splice(pIndex, 0, pDisplayObject);
            return (this.mChildren);
        };
        //__________________________________________________
        Sprite.prototype.getChildIndex = function (pElement) {
            return (this.mChildren.indexOf(pElement));
        };
        //__________________________________________________
        Sprite.prototype.removeChildren = function () {
            for (var i = 0; i < this.mChildren.length; i++) {
                var aElement = this.mChildren[i];
                if (aElement.parent != this) {
                    return;
                }
                if (this.mElement.parentNode == this.mElement) {
                    return;
                }
                this.mElement.removeChild(aElement.element);
                aElement.parent = null;
            }
            this.mChildren = new Array();
        };
        Object.defineProperty(Sprite, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            get: function () {
                return "Sprite";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Sprite";
            },
            enumerable: true,
            configurable: true
        });
        return Sprite;
    }(asSvg.DisplayObject));
    asSvg.Sprite = Sprite;
})(asSvg || (asSvg = {}));
/// <reference path="sprite.ts" />
var asSvg;
(function (asSvg) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage(pStage) {
            _super.call(this);
            this.mElement = pStage;
            if (pStage == null) {
                this.create("svg");
            }
        }
        //_________________________________________________________
        Stage.prototype.activeMouseLocation = function () {
            var _this = this;
            if (this.mMouseLocation != null) {
                return;
            }
            this.mMouseLocation = new asBase.math.Point();
            document.addEventListener(asBase.events.MouseEvents.MOUSE_MOVE, function (e) { return _this.onMouseMove(e); });
        };
        //_________________________________________________________
        //override
        Stage.prototype.onMouseMove = function (e) {
            this.mMouseLocation.x = e.clientX - this.offsetX;
            this.mMouseLocation.y = e.clientY - this.offsetY;
            ///console.log("addNewObjectToHall >>> " + this.mMouseLocation.x + " , " + this.mMouseLocation.y);
        };
        Object.defineProperty(Stage.prototype, "offsetX", {
            //_________________________________________________________
            get: function () {
                return this.element.getBoundingClientRect().left;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "offsetY", {
            //_________________________________________________________
            get: function () {
                return this.element.getBoundingClientRect().top;
            },
            enumerable: true,
            configurable: true
        });
        //_________________________________________________________
        Stage.setStage = function (pStage) {
            var aStage = new Stage(pStage);
            return aStage;
        };
        //_________________________________________________________
        Stage.cretaeStage = function (pParent, pWidth, pHeight) {
            var aStage = new Stage();
            if (pParent != null) {
                aStage.setParent(pParent);
            }
            aStage.setSize(pWidth, pHeight);
            return aStage;
        };
        //_____________________________________________________
        Stage.prototype.setSize = function (pWidth, pHeight) {
            this.mElement.setAttribute("width", pWidth.toString());
            this.mElement.setAttribute("height", pHeight.toString());
        };
        //_____________________________________________________
        Stage.prototype.setParent = function (pParent) {
            if (pParent == null) {
                return;
            }
            this.mParentDiv = pParent;
            if (this.mElement == null) {
                return;
            }
            if (this.mElement.parentNode != this.mParentDiv) {
                this.mParentDiv.appendChild(this.mElement);
            }
        };
        //_____________________________________________________
        Stage.prototype.setSvgElement = function (pElement) {
            if (this.mElement == null) {
                return;
            }
            this.mElement = pElement;
            if (this.mParent == null) {
                return;
            }
            if (this.mElement.parentNode != this.mParentDiv) {
                this.mParentDiv.appendChild(this.mElement);
            }
        };
        Object.defineProperty(Stage, "myName", {
            //________________________________________________________
            // Overide
            get: function () {
                return "Stage";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "myClassName", {
            //______________________________________________
            // Overide
            get: function () {
                return "Stage";
            },
            enumerable: true,
            configurable: true
        });
        //______________________________________________
        // Overide
        Stage.prototype.createElement = function () { };
        //________________________________________________________
        Stage.prototype.tick = function () {
            var _this = this;
            window.requestAnimationFrame(function () { return _this.tick(); });
            this.enterFrame();
            if (this.mEnterFrameList == null) {
                return;
            }
            for (var i = 0; i < this.mEnterFrameList.length; i++) {
                this.mEnterFrameList[i].enterFrame();
            }
            for (var i = 0; i < this.mEnterFrameCallbacks.length; i++) {
                this.mEnterFrameCallbacks[i].callback();
            }
        };
        //_________________________________________________________
        // Overide
        Stage.prototype.enableEnterFrame = function () {
            var _this = this;
            if (this.mEnterFrameList == null) {
                this.mEnterFrameList = new Array();
                window.requestAnimationFrame(function () { return _this.tick(); });
            }
            return true;
        };
        //_________________________________________________________
        // Overide 
        Stage.prototype.disableEnterFrame = function () {
            throw "cant stop EnterFrame on Stage";
        };
        //_________________________________________________________
        Stage.prototype.addToEnterFrameList = function (pDisplayObject) {
            if (this.mEnterFrameList == null) {
                this.enableEnterFrame();
            }
            if (this.mEnterFrameList.indexOf(pDisplayObject) != -1) {
                return;
            }
            this.mEnterFrameList.push(pDisplayObject);
        };
        //_________________________________________________________
        Stage.prototype.removeFromEnterFrameList = function (pDisplayObject) {
            if (this.mEnterFrameList == null) {
                this.mEnterFrameList = new Array();
            }
            if (this.mEnterFrameList.indexOf(pDisplayObject) != -1) {
                return;
            }
            this.mEnterFrameList.push(pDisplayObject);
        };
        //_______________________________________________________________
        Stage.prototype.addEnterFrameCallback = function (pCallback, pOwner) {
            if (this.mEnterFrameCallbacks == null) {
                this.mEnterFrameCallbacks = new Array();
            }
            for (var i = this.mEnterFrameCallbacks.length - 1; i >= 0; i--) {
                if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                    return;
                }
            }
            this.mEnterFrameCallbacks.push(new CallbackHolder(pCallback, pOwner));
        };
        Object.defineProperty(Stage.prototype, "mouseLocation", {
            //_______________________________________________________________
            // override
            get: function () {
                if (this.mMouseLocation == null) {
                    throw ("Use activeMouseLocation() for get the stage mouse location  ");
                }
                return this.mMouseLocation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "mouseX", {
            //_______________________________________________________________
            get: function () {
                if (this.mMouseLocation == null) {
                    throw ("Use activeMouseLocation() for get the stage mouse location  ");
                }
                return this.mMouseLocation.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "mouseY", {
            //_______________________________________________________________
            get: function () {
                if (this.mMouseLocation == null) {
                    throw ("Use activeMouseLocation() for get the stage mouse location  ");
                }
                return this.mMouseLocation.y;
            },
            enumerable: true,
            configurable: true
        });
        //_______________________________________________________________
        Stage.prototype.removeEnterFrameCallback = function (pOwner) {
            if (this.mEnterFrameCallbacks == null) {
                return;
            }
            for (var i = this.mEnterFrameCallbacks.length - 1; i >= 0; i--) {
                if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                    if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                        this.mEnterFrameCallbacks.splice(i, 1);
                    }
                }
            }
        };
        return Stage;
    }(asSvg.Sprite));
    asSvg.Stage = Stage;
    //__________________________________________________________________
    var CallbackHolder = (function () {
        function CallbackHolder(pCallback, pOwner) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
        return CallbackHolder;
    }());
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            _super.call(this);
            //------------------------------
            // Members
            //------------------------------
            this.mText = "";
        }
        /****************************
        * Override methods
        ****************************/
        TextField.prototype.createElement = function () {
            this.create("text");
        };
        ;
        Object.defineProperty(TextField.prototype, "fontSize", {
            get: function () {
                return (Number(this.mElement.getAttribute("font-size")));
            },
            /****************************
            * Methods
            ****************************/
            /****************************
            * Getters and Setters
            ****************************/
            set: function (pFont) {
                this.mElement.setAttribute("font-size", pFont.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "font", {
            get: function () {
                return (this.mElement.getAttribute("font-family"));
            },
            //________________________________________
            set: function (pFont) {
                this.mElement.setAttribute("font-family", pFont);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "text", {
            //________________________________________________________________
            set: function (pVal) {
                this.mText = pVal;
                // this.mElement.nodeValue = this.mText;
                this.mElement.textContent = this.mText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "Text", {
            get: function () {
                return this.mText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField, "myName", {
            //________________________________________________
            get: function () {
                return "TextField";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "TextField";
            },
            enumerable: true,
            configurable: true
        });
        return TextField;
    }(asSvg.DisplayObject));
    asSvg.TextField = TextField;
})(asSvg || (asSvg = {}));
/// <reference path="assvg/sprite.ts" />
/// <reference path="assvg/stage.ts" />
var SvgSample1 = (function () {
    function SvgSample1(pElement) {
        this.initStage(pElement);
        for (var i = 0; i < 5; i++) {
            this.addSpaceShip();
        }
    }
    //____________________________________________________
    SvgSample1.prototype.initStage = function (pElement) {
        var _this = this;
        var w = window.innerWidth - 30;
        var h = window.innerHeight - 30;
        this.mStage = asSvg.Stage.cretaeStage(pElement, w, h);
        this.mStage.addEventListener(asBase.events.MouseEvents.MOUSE_UP, function (e) { return _this.onMouseUp(e); }, this);
        this.setTitel(w / 2);
    };
    //____________________________________________________
    SvgSample1.prototype.setTitel = function (pX) {
        var aText = new asSvg.TextField();
        aText.setFill(0x990000);
        aText.setLineStyle(2, 0x10aa00);
        aText.text = "Drag & Drop";
        aText.fontSize = 50;
        aText.font = "arial";
        this.mStage.addChild(aText);
        aText.x = pX - aText.width / 2;
        aText.y = 80;
    };
    //____________________________________________________
    SvgSample1.prototype.addSpaceShip = function () {
        var _this = this;
        var aLoader = new asSvg.Loader("assets/svgs/SpaceShip01.svg");
        aLoader.x = Math.random() * 500 + 200;
        aLoader.y = Math.random() * 500 + 200;
        aLoader.rotation = Math.random() * 360;
        aLoader.scaleX = aLoader.scaleY = Math.random() * 0.5 + 0.4;
        this.mStage.addChild(aLoader);
        aLoader.addEventListener(asBase.events.MouseEvents.MOUSE_DOWN, function (e) { return _this.onMouseDown(e); }, this);
    };
    //____________________________________________________
    SvgSample1.prototype.onMouseUp = function (e) {
        if (this.mSelected == null) {
            return;
        }
        this.mSelected.stopDrag();
    };
    //____________________________________________________
    SvgSample1.prototype.onMouseDown = function (e) {
        if (this.mSelected != null) {
            this.mSelected.stopDrag();
        }
        this.mSelected = e.currentTarget.displayObject;
        if (this.mSelected == null) {
            return;
        }
        this.mSelected.startDrag();
    };
    return SvgSample1;
}());
//_______________________________________________________________________
/// <reference path="assvg/sprite.ts" />
/// <reference path="assvg/stage.ts" />
var SvgSample2 = (function () {
    function SvgSample2(pElement) {
        var _this = this;
        this.init(pElement);
        var aFPS = 30;
        setInterval(function () { return _this.enterFrame(); }, 1000 / aFPS);
    }
    //____________________________________________________
    SvgSample2.prototype.init = function (pElement) {
        var w = window.innerWidth - 30;
        var h = window.innerHeight - 30;
        this.mStage = asSvg.Stage.cretaeStage(pElement, w, h);
        this.mStage.activeMouseLocation();
        this.addSpaceShip(w / 2, h / 2);
        this.setTitel(w / 2);
    };
    //____________________________________________________
    SvgSample2.prototype.setTitel = function (pX) {
        var aText = new asSvg.TextField();
        aText.setFill(0x990000);
        aText.setLineStyle(2, 0x10aa00);
        aText.text = "Turn to the cursor";
        aText.fontSize = 50;
        aText.font = "arial";
        this.mStage.addChild(aText);
        aText.x = pX - aText.width / 2;
        aText.y = 80;
    };
    //____________________________________________________
    SvgSample2.prototype.addSpaceShip = function (pX, pY) {
        this.mSpaceShip = new asSvg.Loader("assets/svgs/SpaceShip01.svg");
        this.mSpaceShip.x = pX;
        this.mSpaceShip.y = pY;
        this.mStage.addChild(this.mSpaceShip);
    };
    //____________________________________________________
    SvgSample2.prototype.enterFrame = function () {
        var aAngle = Math.atan2(this.mSpaceShip.mouseY, this.mSpaceShip.mouseX);
        var aDeltaAngle = aAngle * 180 / Math.PI - this.mSpaceShip.rotation;
        if (aDeltaAngle > 180) {
            aDeltaAngle -= 360;
        }
        if (aDeltaAngle < -180) {
            aDeltaAngle += 360;
        }
        this.mSpaceShip.rotation += aDeltaAngle / 10;
    };
    return SvgSample2;
}());
//_______________________________________________________________________
/// <reference path="assvg/sprite.ts" />
/// <reference path="assvg/stage.ts" />
var SvgSample3 = (function () {
    function SvgSample3(pElement) {
        var _this = this;
        this.init(pElement);
        var aFPS = 120;
        setInterval(function () { return _this.enterFrame(); }, 1000 / aFPS);
    }
    //____________________________________________________
    SvgSample3.prototype.init = function (pElement) {
        var w = window.innerWidth - 30;
        var h = window.innerHeight - 30;
        this.mStage = asSvg.Stage.cretaeStage(pElement, w, h);
        this.mStage.activeMouseLocation();
        this.addSpaceShip(w / 2, h / 2);
        this.setTitel(w / 2);
    };
    //____________________________________________________
    SvgSample3.prototype.setTitel = function (pX) {
        var aText = new asSvg.TextField();
        aText.setFill(0x990000);
        aText.setLineStyle(2, 0x10aa00);
        aText.text = "Chase the cursor";
        aText.fontSize = 50;
        aText.font = "arial";
        this.mStage.addChild(aText);
        aText.x = pX - aText.width / 2;
        aText.y = 80;
    };
    //____________________________________________________
    SvgSample3.prototype.addSpaceShip = function (pX, pY) {
        this.mSpaceShip = new asSvg.Loader("assets/svgs/SpaceShip01.svg");
        this.mSpaceShip.x = pX;
        this.mSpaceShip.y = pY;
        this.mStage.addChild(this.mSpaceShip);
    };
    //____________________________________________________
    SvgSample3.prototype.enterFrame = function () {
        var aDelatX = this.mStage.mouseX - this.mSpaceShip.x;
        var aDelatY = this.mStage.mouseY - this.mSpaceShip.y;
        var aAngle = Math.atan2(aDelatY, aDelatX);
        var aDeltaAngle = aAngle * 180 / Math.PI - this.mSpaceShip.rotation;
        if (aDeltaAngle > 180) {
            aDeltaAngle -= 360;
        }
        if (aDeltaAngle < -180) {
            aDeltaAngle += 360;
        }
        this.mSpaceShip.rotation += aDeltaAngle / 40;
        var aDistanceFromMouse = Math.sqrt(aDelatY * aDelatY + aDelatX * aDelatX);
        var aSpeed = aDistanceFromMouse / 40;
        if (aSpeed > 10) {
            aSpeed = 10;
        }
        var aCurrentRotation = this.mSpaceShip.rotation * Math.PI / 180;
        this.mSpaceShip.x += aSpeed * Math.cos(aCurrentRotation);
        this.mSpaceShip.y += aSpeed * Math.sin(aCurrentRotation);
    };
    return SvgSample3;
}());
//_______________________________________________________________________
//# sourceMappingURL=app.js.map