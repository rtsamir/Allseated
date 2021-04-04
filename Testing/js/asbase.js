var asbase;
(function (asbase) {
    var analytics;
    (function (analytics) {
        class MoTSAnalyticsBase {
            //__________________________________________________________________
            track(pEventType, pValueObject) {
                this.sendData("track", pEventType, pValueObject);
            }
            //__________________________________________________________________
            sendData(pCommand, pName, pValueObject, pIntegrations = null) {
                setSegmentAnalitics(pCommand, pName, pValueObject, pIntegrations);
            }
        }
        analytics.MoTSAnalyticsBase = MoTSAnalyticsBase;
    })(analytics = asbase.analytics || (asbase.analytics = {}));
})(asbase || (asbase = {}));
var asBase;
(function (asBase) {
    var baseclasses;
    (function (baseclasses) {
        class AcArray extends Array {
            constructor(...iItems) {
                super(...iItems);
                this.mAcPushedItems = [];
                Object.setPrototypeOf(this, AcArray.prototype);
            }
            //____________________________________________________________________
            push(...iItems) {
                let aNumItems = super.push.call(this, ...iItems);
                this.notify(AcArray.PUSH, iItems);
                return aNumItems;
            }
            //____________________________________________________________________
            // push without notifying the arrayCollections
            acPush(...iItems) {
                this.mAcPushedItems.push(...iItems);
                return super.push(...iItems);
            }
            //____________________________________________________________________
            // notifies all 'acPush'ed items to their arrayCollections
            refresh() {
                if (this.mAcPushedItems && this.mAcPushedItems.length > 0) {
                    let aTempArr = this.mAcPushedItems.concat();
                    this.mAcPushedItems.length = 0;
                    this.notify(AcArray.REFRESH, aTempArr);
                    return true;
                }
                return false;
            }
            //____________________________________________________________________
            removePushedItems() {
                if (this.mAcPushedItems) {
                    this.mAcPushedItems.length = 0;
                }
            }
            //____________________________________________________________________
            unshift(...iItems) {
                let aUnshifted = super.unshift(...iItems);
                this.notify(AcArray.UNSHIFT, iItems);
                return aUnshifted;
            }
            //____________________________________________________________________
            pop() {
                let aPopped = super.pop.call(this);
                this.notify(AcArray.POP, aPopped);
                return aPopped;
            }
            //____________________________________________________________________
            shift() {
                let aShifted = super.shift();
                this.notify(AcArray.SHIFT, aShifted);
                return aShifted;
            }
            //____________________________________________________________________
            splice(iStart, iDeleteCount, ...iItems) {
                let aSpliced;
                if (iItems && iItems.length > 0) {
                    aSpliced = super.splice.call(this, iStart, iDeleteCount, ...iItems);
                }
                else {
                    if (!iDeleteCount) {
                        iDeleteCount = this.length;
                    }
                    aSpliced = super.splice.call(this, iStart, iDeleteCount);
                }
                this.notify(AcArray.SPLICE, { spliced: aSpliced, items: iItems, index: iStart });
                return aSpliced;
            }
            //____________________________________________________________________
            clone() {
                let aAcArray = new AcArray();
                for (let i = 0; i < this.length; ++i) {
                    aAcArray.push(this[i]);
                }
                return aAcArray;
            }
            typeThis() {
                console.log("Daniel");
            }
            //____________________________________________________________________
            notify(iType, iValue) {
                if (this.acCallbacks) {
                    for (let aCallback of this.acCallbacks) {
                        aCallback.call(this, iType, iValue);
                    }
                }
            }
            //____________________________________________________________________
            clear() {
                this.removePushedItems();
                if (this.length > 0) {
                    this.splice(0, this.length);
                }
            }
            //____________________________________________________________________
            clearAllExcept(iItems) {
                this.removePushedItems();
                let i = 0;
                while (i < this.length) {
                    if (iItems.indexOf(this[i]) > -1) {
                        ++i;
                        continue;
                    }
                    this.splice(i, 1);
                }
            }
            //____________________________________________________________________
            dispose() {
                if (this.acCallbacks) {
                    this.acCallbacks.splice(0);
                }
            }
            //____________________________________________________________________
            addCallback(iUpdatedCallback) {
                if (this.acCallbacks.indexOf(iUpdatedCallback) == -1) {
                    this.acCallbacks.push(iUpdatedCallback);
                }
            }
            //____________________________________________________________________
            removeCallback(iAcCallback) {
                let aRemovedIndex = this.acCallbacks.indexOf(iAcCallback);
                if (aRemovedIndex > -1) {
                    this.acCallbacks.splice(aRemovedIndex, 1);
                }
            }
            //***********************
            //  Getters and Setters
            //***********************
            //____________________________________________________________________
            get hasListeners() {
                return this.acCallbacks.length > 0;
            }
            //____________________________________________________________________
            set acCallbacks(iUpdatedCallbacks) {
                this.mAcCallbacks = iUpdatedCallbacks;
            }
            get acCallbacks() {
                if (!this.mAcCallbacks) {
                    this.mAcCallbacks = new Array();
                }
                return this.mAcCallbacks;
            }
        }
        //------------------------------
        // Static
        //------------------------------
        AcArray.PUSH = "push";
        AcArray.POP = "pop";
        AcArray.SPLICE = "splice";
        AcArray.SHIFT = "shift";
        AcArray.UNSHIFT = "unshift";
        AcArray.REFRESH = "refresh";
        baseclasses.AcArray = AcArray;
    })(baseclasses = asBase.baseclasses || (asBase.baseclasses = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        class MathUtils {
            static interpolate(pP1, pP2, pVal) {
                var aDx = (pP2.x - pP1.x) * pVal;
                var aDy = (pP2.y - pP1.y) * pVal;
                return (new asBase.math.Point(pP1.x + aDx, pP1.y + aDy));
            }
            //_____________________________________________________________________
            static distance(pP1, pP2) {
                var aDx = (pP1.x - pP2.x);
                var aDy = (pP1.y - pP2.y);
                return (Math.sqrt((aDx * aDx) + (aDy * aDy)));
            }
            //_____________________________________________________________________
            static distance2(pX1, pY1, pX2, pY2) {
                var aDx = pX1 - pX2;
                var aDy = pY1 - pY2;
                return (Math.sqrt((aDx * aDx) + (aDy * aDy)));
            }
            //_____________________________________________________________________
            static rotatePoint(pPoint, pAngle) {
                var aRadAngle = pAngle * MathUtils.DEG_TO_RAD;
                var aX = pPoint.x * Math.cos(aRadAngle) - pPoint.y * Math.sin(aRadAngle);
                var aY = pPoint.x * Math.sin(aRadAngle) + pPoint.y * Math.cos(aRadAngle);
                return (new asBase.math.Point(aX, aY));
            }
            //_____________________________________________________________________
            static isRectOverlap(pRect1, pRect2) {
                return !(pRect2.left > pRect1.right ||
                    pRect2.right < pRect1.left ||
                    pRect2.top > pRect1.bottom ||
                    pRect2.bottom < pRect1.top);
            }
            //_____________________________________________________________________
            static combineRectToBaseRect(pBaseRect, pWithRect) {
                pBaseRect.left = Math.min(pBaseRect.left, pWithRect.left);
                pBaseRect.right = Math.max(pBaseRect.right, pWithRect.right);
                pBaseRect.top = Math.min(pBaseRect.top, pWithRect.top);
                pBaseRect.bottom = Math.max(pBaseRect.bottom, pWithRect.bottom);
                return pBaseRect;
            }
        }
        MathUtils.RAD_TO_DEG = 180 / Math.PI;
        MathUtils.DEG_TO_RAD = Math.PI / 180;
        math.MathUtils = MathUtils;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        class Point {
            constructor(iX = 0, iY = 0) {
                this.x = iX;
                this.y = iY;
            }
            /****************************
             * Override methods
             ****************************/
            /****************************
             * Methods
             ****************************/
            clone() {
                return new Point(this.x, this.y);
            }
            subtract(p) {
                return (new Point(this.x - p.x, this.y - p.y));
            }
            //_____________________________________________________________________
            rotatePoint(pAngle) {
                let aRadAngle = pAngle * math.MathUtils.DEG_TO_RAD;
                let aX = this.x * Math.cos(aRadAngle) - this.y * Math.sin(aRadAngle);
                let aY = this.x * Math.sin(aRadAngle) + this.y * Math.cos(aRadAngle);
                return new Point(aX, aY);
            }
            //_____________________________________________________________________
            rotate(pAngle) {
                let aRadAngle = pAngle * math.MathUtils.DEG_TO_RAD;
                let aX = this.x * Math.cos(aRadAngle) - this.y * Math.sin(aRadAngle);
                let aY = this.x * Math.sin(aRadAngle) + this.y * Math.cos(aRadAngle);
                this.x = aX;
                this.y = aY;
            }
            //_____________________________________________________________________
            rotateByRad(pAngle) {
                let aX = this.x * Math.cos(pAngle) - this.y * Math.sin(pAngle);
                let aY = this.x * Math.sin(pAngle) + this.y * Math.cos(pAngle);
                this.x = aX;
                this.y = aY;
            }
            //________________________________________________________________
            add(p) {
                return (new Point(this.x + p.x, this.y + p.y));
            }
            //_____________________________________________________
            normalize(pNewLength = 1) {
                let aFactor = pNewLength / this.length;
                this.x *= aFactor;
                this.y *= aFactor;
            }
            //________________________________________________________________
            static interpolate(p1, p2, pFrac) {
                let aX = p1.x + (p2.x - p1.x) * pFrac;
                let aY = p1.y + (p2.y - p1.y) * pFrac;
                return (new Point(aX, aY));
            }
            //________________________________________________________________
            static polar(pRadius, pAngle) {
                let aX = pRadius * Math.cos(pAngle);
                let aY = pRadius * Math.sin(pAngle);
                return (new Point(aX, aY));
            }
            //________________________________________________________________
            static distanceSqr(p1, p2) {
                let aX = p1.x - p2.x;
                let aY = p1.y - p2.y;
                return (aX * aX + aY * aY);
            }
            //_____________________________________________________________________
            static rotatePoint(pPoint, pAngle) {
                let aRadAngle = pAngle * math.MathUtils.DEG_TO_RAD;
                let aX = pPoint.x * Math.cos(aRadAngle) - pPoint.y * Math.sin(aRadAngle);
                let aY = pPoint.x * Math.sin(aRadAngle) + pPoint.y * Math.cos(aRadAngle);
                return (new asBase.math.Point(aX, aY));
            }
            //________________________________________________________________
            static distance(p1, p2) {
                return (Math.sqrt(this.distanceSqr(p1, p2)));
            }
            /****************************
             * Getters and Setters
             ****************************/
            get length() {
                return (Math.sqrt(this.x * this.x + this.y * this.y));
            }
            //________________________________________________________________
            static get myName() {
                return "Point";
            }
            //______________________________________________
            get myClassName() {
                return "Point";
            }
        }
        math.Point = Point;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
///<reference path="math/MathUtils.ts"/>
///<reference path="math/Point.ts"/>
var asBase;
///<reference path="math/MathUtils.ts"/>
///<reference path="math/Point.ts"/>
(function (asBase) {
    var MathUtils = asBase.math.MathUtils;
    var Point = asBase.math.Point;
    class Utils {
        //_______________________________________________________________
        static getElementIn(pComponent, pId) {
            if (pComponent == null) {
                return null;
            }
            if (pComponent.id == pId) {
                return pComponent;
            }
            for (let i = 0; i < pComponent.childNodes.length; i++) {
                if (pComponent.childNodes[i] != null) {
                    //console.log(`id = ${(pComponent.childNodes[i] as HTMLElement).id}`);
                    if (pComponent.childNodes[i].id == pId) {
                        const aComponent = pComponent.childNodes[i];
                        aComponent.id += this.ID_ITERATOR;
                        this.ID_ITERATOR++;
                        return (aComponent);
                    }
                    const aElement = Utils.getElementIn(pComponent.childNodes[i], pId);
                    if (aElement != null) {
                        return aElement;
                    }
                }
            }
            return null;
        }
        //_________________________________________________________________
        //////public static numericalSort(pSortField:String):Sort{
        //////    var sort:Sort = new Sort();
        //////    var sortField:SortField = new SortField(pSortField, false);
        //////    sortField.numeric = true;
        //////    sort.fields = [sortField];
        //////    return sort;
        //////}
        //_______________________________________________________________
        static isElementIn(pComponent, pElement) {
            if (pComponent == pElement) {
                return true;
            }
            for (let i = 0; i < pComponent.childNodes.length; i++) {
                if (pComponent.childNodes[i] != null) {
                    if (pComponent.childNodes[i] == pElement) {
                        return true;
                    }
                    if (Utils.isElementIn(pComponent.childNodes[i], pElement)) {
                        return true;
                    }
                }
            }
            return false;
        }
        //_______________________________________________________________
        static areIdenticalArrays(iA, iB) {
            if (iA == iB || !iA && !iB) {
                return true;
            }
            if (!iA || !iB) {
                return false;
            }
            if (iA.length == 0 && iB.length == 0) {
                return true;
            }
            if (iA.length != iB.length) {
                return false;
            }
            for (let i = 0; i < iA.length; ++i) {
                if (iA[i] != iB[i]) {
                    return false;
                }
            }
            return true;
        }
        //_______________________________________________________________
        /* HTMLCollection to Array*/
        static toArray(x) {
            for (var i = 0, a = []; i < x.length; i++)
                a.push(x[i]);
            return a;
        }
        //_______________________________________________________________
        static cloneObject(object) {
            const objectCopy = {};
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    objectCopy[key] = object[key];
                }
            }
            return objectCopy;
        }
        //_______________________________________________________________
        static get uniqueId() {
            Utils.ID_ITERATOR++;
            return Utils.ID_ITERATOR;
        }
        //_______________________________________________________________
        static getItemIndex(iItem, iSource) {
            for (let i = 0; i < iSource.length; ++i) {
                if (iSource[i] == iItem)
                    return i;
            }
            return -1;
        }
        //_______________________________________________________________
        static switchIncludeParts(iSkinPart1, iSkinPart2) {
            if (iSkinPart1 && iSkinPart2) {
                if (iSkinPart1.classList.contains("displayNone")) {
                    Utils.includePart(iSkinPart1, true);
                    Utils.includePart(iSkinPart2, false);
                }
                else {
                    Utils.includePart(iSkinPart1, false);
                    Utils.includePart(iSkinPart2, true);
                }
            }
        }
        //_______________________________________________________________
        static includePart(iSkinPart, iIsInclude) {
            if (iSkinPart) {
                if (iIsInclude) {
                    if (iSkinPart.classList.contains("displayNone")) {
                        iSkinPart.classList.remove("displayNone");
                    }
                }
                else {
                    if (iSkinPart.classList.contains("displayNone")) {
                        return;
                    }
                    iSkinPart.classList.add("displayNone");
                }
            }
        }
        //_______________________________________________________________
        static includeSkinPartInLayout(iSkinPart) {
            if (iSkinPart) {
                if (iSkinPart.classList.contains("displayNone")) {
                    iSkinPart.classList.remove("displayNone");
                }
            }
        }
        //_______________________________________________________________
        static removeSkinPartFromLayout(iSkinPart) {
            if (iSkinPart) {
                if (iSkinPart.classList.contains("displayNone")) {
                    return;
                }
                iSkinPart.classList.add("displayNone");
            }
        }
        //_______________________________________________________________
        static enableElement(iSkin) {
            if (iSkin.classList.contains("mouseInactive")) {
                iSkin.classList.remove("mouseInactive");
            }
        }
        //_______________________________________________________________
        static disableElement(iSkin) {
            if (iSkin.classList.contains("mouseInactive")) {
                return;
            }
            iSkin.classList.add("mouseInactive");
        }
        //_______________________________________________________________
        static showPart(iSkinPart, iIsShow) {
            if (!iSkinPart) {
                return;
            }
            if (iIsShow) {
                iSkinPart.classList.remove("visibleNone");
            }
            else {
                if (iSkinPart.classList.contains("visibleNone")) {
                    return;
                }
                iSkinPart.classList.add("visibleNone");
            }
        }
        //_______________________________________________________________
        static showSkinPart(iSkinPart) {
            if (iSkinPart) {
                if (iSkinPart.classList.contains("visibleNone")) {
                    iSkinPart.classList.remove("visibleNone");
                }
            }
        }
        //_______________________________________________________________
        static hideSkinPart(iSkinPart) {
            if (iSkinPart) {
                if (iSkinPart.classList.contains("visibleNone")) {
                    return;
                }
                iSkinPart.classList.add("visibleNone");
            }
        }
        //_______________________________________________________________
        static setInputError(iInputField) {
            if (iInputField) {
                if (iInputField.classList.contains("inputError")) {
                    return;
                }
                iInputField.classList.add("inputError");
            }
        }
        //_______________________________________________________________
        static clearInputError(iInputField) {
            if (iInputField) {
                if (iInputField.classList.contains("inputError")) {
                    iInputField.classList.remove("inputError");
                }
            }
        }
        //_______________________________________________________________
        static setFieldError(iField) {
            if (iField) {
                iField.classList.add("invalid-field");
            }
        }
        //_______________________________________________________________
        static clearFieldError(iField) {
            if (iField) {
                iField.classList.remove("invalid-field");
            }
        }
        //_______________________________________________________________
        static setTextError(iLabelField) {
            if (iLabelField.classList.contains("text--error")) {
                return;
            }
            iLabelField.classList.add("text--error");
        }
        //_______________________________________________________________
        static clearTextError(iLabelField) {
            if (iLabelField) {
                if (iLabelField.classList.contains("text--error")) {
                    iLabelField.classList.remove("text--error");
                }
            }
        }
        //_______________________________________________________________
        static setEnabled(iHTMLElement, iIsEnabled) {
            if (iIsEnabled) {
                iHTMLElement.classList.remove("enabled");
            }
            else {
                iHTMLElement.classList.add("enabled");
            }
        }
        //_______________________________________________________________
        static setToggleButton(iToggleLabel, iToggleButton, iToggleSpan, iIsSelected) {
            if (iIsSelected) {
                iToggleLabel.classList.add("toggle-button-selected");
                iToggleButton.dataset.selected = true;
                iToggleSpan.innerHTML = asBase.LanguageDictionary.getText("Yes", "Yes");
            }
            else {
                iToggleLabel.classList.remove("toggle-button-selected");
                iToggleButton.dataset.selected = false;
                iToggleSpan.innerHTML = asBase.LanguageDictionary.getText("No", "No");
            }
        }
        //_______________________________________________________________
        static setTopNavButton(iHTMLElement, iIsSelected) {
            if (iHTMLElement == null) {
                return;
            }
            if (iIsSelected) {
                iHTMLElement.classList.add(asBase.SkinsCss.TOP_NAV_BUTTON_SELECTED);
            }
            else {
                iHTMLElement.classList.remove(asBase.SkinsCss.TOP_NAV_BUTTON_SELECTED);
            }
        }
        //____________________________________________________________________________________
        static setTab(iHTMLElement, iIsSelected) {
            if (iHTMLElement == null) {
                return;
            }
            if (iIsSelected) {
                Utils.addClassToElement(iHTMLElement, asBase.SkinsCss.SELECTED_TAB);
            }
            else {
                Utils.removeClassFromElement(iHTMLElement, asBase.SkinsCss.SELECTED_TAB);
            }
        }
        //____________________________________________________________________________________
        static setHallMapMenuEnabled(iLiElement, iIsEnabled) {
            if (iIsEnabled) {
                if (iLiElement.classList.contains("disabledButton")) {
                    iLiElement.classList.remove("disabledButton");
                }
            }
            else {
                if (iLiElement.classList.contains("disabledButton")) {
                    return;
                }
                iLiElement.classList.add("disabledButton");
            }
        }
        //____________________________________________________________________________________
        static setButtonMouseActive(iButtonElement, iIsActive) {
            if (iIsActive) {
                if (iButtonElement.classList.contains("mouseDisabled")) {
                    iButtonElement.classList.remove("mouseDisabled");
                }
            }
            else {
                if (iButtonElement.classList.contains("mouseDisabled")) {
                    return;
                }
                iButtonElement.classList.add("mouseDisabled");
            }
        }
        //____________________________________________________________________________________
        static addClassToElement(iElement, iClassName) {
            if (iElement == null) {
                return;
            }
            if (iElement.classList.contains(iClassName)) {
                return;
            }
            iElement.classList.add(iClassName);
        }
        //____________________________________________________________________________________
        static removeClassFromElement(iElement, iClassName) {
            if (iElement == null) {
                return;
            }
            if (iElement.classList.contains(iClassName)) {
                iElement.classList.remove(iClassName);
            }
        }
        //__________________________________________________________________
        static setClassActive(iElement, iClass, iActive) {
            if (iActive) {
                Utils.addClassToElement(iElement, iClass);
            }
            else {
                Utils.removeClassFromElement(iElement, iClass);
            }
        }
        //____________________________________________________________________________________
        static switchClassesOnElement(iElement, iClassName1, iClassName2) {
            if (iElement.classList.contains(iClassName1)) {
                iElement.classList.add(iClassName2);
                iElement.classList.remove(iClassName1);
            }
            else {
                iElement.classList.add(iClassName1);
                iElement.classList.remove(iClassName2);
            }
        }
        //____________________________________________________________________________________
        static getElementByClassName(iElement, iClassName, iIsInclude) {
            let aElements = iElement.getElementsByClassName(iClassName);
            for (let i = 0; i < aElements.length; ++i) {
                let aElement = aElements[i];
                Utils.includePart(aElement, iIsInclude);
            }
        }
        //sets span width by %, with optional scaling and rounding to nearest fraction. Returns true if final fill > 0%, false otherwise.
        //____________________________________________________________________________________
        static setSpanFill(iSpan, iFill, iScale = 1, iRoundToFraction = 1) {
            if (!iSpan) {
                return;
            }
            let aFill = iFill * iScale;
            aFill = Math.floor(aFill * iRoundToFraction) / iRoundToFraction;
            aFill = Math.min(100, aFill * 100);
            iSpan.style.width = aFill + '%';
            return aFill > 0;
        }
        //____________________________________________________________________________________
        static validateEmail(iHTMLElement) {
            return (iHTMLElement.checkValidity());
        }
        //________________________________________________________________
        static getClassName(iClass) {
            return (iClass.constructor.name);
        }
        //________________________________________________________________
        static setRadioButton(iHTMLElement, iIsSelected) {
            iHTMLElement.dataset.checked = (iIsSelected) ? "true" : "false";
        }
        //________________________________________________________________
        static isRadioButtonSelected(iElement) {
            return iElement.dataset.checked == "true";
        }
        //________________________________________________________________
        static fromHTMLColorToNumberColor(pColor) {
            pColor = pColor.replace("#", "0x");
            return (parseInt(pColor));
        }
        //________________________________________________________________
        static fromNumberColorToHTMLColor(pColor) {
            if (pColor == null) {
                pColor = 0;
            }
            let aBase16 = pColor.toString(16);
            while (aBase16.length < 6) {
                aBase16 = "0" + aBase16;
            }
            let aColor = "#" + aBase16;
            return aColor;
        }
        //__________________________________________________________________
        static isValidKeyForNumericField(iKeyCode) {
            /*
            8  - BackSpace
            9  - Tab
            46 - Delete

            37 - Left
            38 - Up
            39 - Right
            40 - Down

            190 - Dot
            110 - Dot in numeric keypad
            */
            if (!iKeyCode) {
                return true;
            }
            if (iKeyCode == 46 || iKeyCode == 8 || iKeyCode == 9 || iKeyCode == 37 || iKeyCode == 38 || iKeyCode == 39 || iKeyCode == 40 || iKeyCode == 190) {
                return true;
            }
            /// numbers and numeric keypad numbers
            if ((iKeyCode >= 48 && iKeyCode <= 57) || (iKeyCode >= 96 && iKeyCode <= 105) || iKeyCode == 110) {
                return true;
            }
            /*
                        if (iKeyCode < 48 || iKeyCode > 57 ) {
                            return false;
                        }
            */
            return false;
        }
        //__________________________________________________________________
        // return true  -  for up
        // return false -  for down
        static getOpenWindowDirectionRelativeToElement(pElement) {
            let aWindowInnerHeight = window.innerHeight;
            let aElementRect = pElement.getBoundingClientRect();
            let aExceedsTop = (aElementRect.top < 0);
            let aExceedsBottom = (aElementRect.bottom > aWindowInnerHeight);
            let aIsOpenAtTop = aExceedsBottom && !aExceedsTop;
            return aIsOpenAtTop;
        }
        //__________________________________________________________________
        static safeRemove(pElement) {
            if (pElement.parentElement != null) {
                pElement.parentElement.removeChild(pElement);
                return true;
            }
            return false;
        }
        //_____________________________________________________________________________________________
        static jsPrint(iB64Array, iFileName = "imgPrint.html", iPrintDetailsArray) {
            if (iFileName == null) {
                iFileName = "imgPrint.html";
            }
            Utils.numOfLogos = iB64Array.length;
            let w = window.open(iFileName);
            w.onload = function () {
                let aPage = w.document.getElementById("page");
                aPage.parentElement.removeChild(aPage);
                for (let i = 0; i < iB64Array.length; i++) {
                    let aNewPage = aPage.cloneNode(true);
                    w.document.body.appendChild(aNewPage);
                    aNewPage.id = "page_" + i;
                    w.document.getElementById("img").setAttribute('src', "data:image/jpg;base64," + iB64Array[i]);
                    w.document.getElementById("img").id = "img_" + i;
                    if (iPrintDetailsArray != null && iPrintDetailsArray[i] && iFileName != "imgPrint.html") {
                        if (iPrintDetailsArray[i][0] != null && iPrintDetailsArray[i][0] != "") {
                            w.document.getElementById("logo").setAttribute('src', iPrintDetailsArray[i][0]);
                            w.document.getElementById("logo").id = "logo_" + i;
                        }
                        if (iPrintDetailsArray[i][1]) {
                            w.document.getElementById("occasionName_lbl").innerHTML = iPrintDetailsArray[i][1];
                            w.document.getElementById("occasionName_lbl").id = "occasionName_lbl_" + i;
                        }
                        if (iPrintDetailsArray[i][2]) {
                            w.document.getElementById("floorPlanName_lbl").innerHTML = iPrintDetailsArray[i][2];
                            w.document.getElementById("floorPlanName_lbl").id = "floorPlanName_lbl_" + i;
                        }
                        if (iPrintDetailsArray[i][3]) {
                            w.document.getElementById("hallMapName_lbl").innerHTML = iPrintDetailsArray[i][3];
                            w.document.getElementById("hallMapName_lbl").id = "hallMapName_lbl_" + i;
                        }
                    }
                }
                if (iFileName == "imgPrintWithLogo.html") {
                    for (let i = 0; i < iB64Array.length; i++) {
                        w.document.getElementById("logo_" + i).onload = function () {
                            if ((--Utils.numOfLogos) == 0) {
                                w.print();
                            }
                        };
                        w.document.getElementById("logo_" + i).onerror = function () {
                            if ((--Utils.numOfLogos) == 0) {
                                w.print();
                            }
                        };
                    }
                }
                else {
                    w.print();
                }
            };
            w.onbeforeunload = /*setTimeout(*/ function () {
                w.close();
            } /*, 500)*/;
            w.onafterprint = /*setTimeout(*/ function () {
                w.close();
            } /*, 500)*/;
        }
        //_____________________________________________________________________________________________
        static parseURLParams(pURL) {
            if (pURL == null) {
                pURL = window.location.href;
            }
            let queryStart = pURL.indexOf("?") + 1, queryEnd = pURL.indexOf("#") + 1 || pURL.length + 1, query = pURL.slice(queryStart, queryEnd - 1), pairs = query.replace(/\+/g, " ").split("&"), parms = {}, i, n, v, nv;
            if (query === pURL || query === "") {
                return;
            }
            for (i = 0; i < pairs.length; i++) {
                nv = pairs[i].split("=");
                n = decodeURIComponent(nv[0]);
                v = decodeURIComponent(nv[1]);
                if (!parms.hasOwnProperty(n)) {
                    parms[n] = [];
                }
                parms[n].push(nv.length === 2 ? v : null);
                if (parms[n].length > 1) {
                    parms[n] = parms[n][0];
                }
            }
            return parms;
        }
        //_____________________________________________________________________________
        static isMobile() {
            let android = navigator.userAgent.match(/Android/i);
            let webos = navigator.userAgent.match(/webOS/i);
            let blackberry = navigator.userAgent.match(/BlackBerry/i);
            let winPhone = navigator.userAgent.match(/Windows Phone/i);
            if (android || webos || blackberry || winPhone || this.isIOS) {
                return true;
            }
            else {
                return false;
            }
        }
        //_____________________________________________________________________________
        static get isFireFox() {
            return (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);
        }
        //_____________________________________________________________
        static get isIOS() {
            let aAgent = navigator.userAgent;
            let iOS = ((aAgent.match(/iPhone|iPad|iPod/i))
                || (aAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2));
            return iOS;
        }
        //_____________________________________________________________________________
        static fixFlashString(pString) {
            //console.log(" fixFlashString >>>> " + pString)
            //for (var x = 0; x < pString.length; x++) {
            //    console.log(pString.charAt(x) + " >> " + pString.charCodeAt(x))
            //}
            let aCounter = 0;
            while ((pString.indexOf('\u2028') > -1) && (aCounter < 1000)) {
                pString = pString.replace('\u2028', '\n');
                aCounter++;
            }
            return pString;
        }
        //____________________________________________________________
        static debugHTMLElement(aEle, pW) {
            let aDebugImagesCont = document.getElementById("debugImage");
            if (aDebugImagesCont == null) {
                aDebugImagesCont = document.createElement("div");
                aDebugImagesCont.id = "debugImage";
                document.body.appendChild(aDebugImagesCont);
                aDebugImagesCont.style.zIndex = "5000";
            }
            aDebugImagesCont.appendChild(aEle);
            aEle.style.position = "fixed";
            aEle.style.top = "300px";
            aEle.style.left = "10px";
            aEle.style.width = pW + "px";
            aEle.style.zIndex = "5000";
        }
        //____________________________________________________________________________
        static replaceAll(pString, pText, pWith) {
            while (pString.indexOf(pText) > -1) {
                pString = pString.replace(pText, pWith);
            }
            return pString;
        }
        //____________________________________________________________________________
        static loadModule(pString, onScriptLoaded) {
            let aScript = document.createElement("script");
            aScript.src = "js/" + pString + ".js";
            aScript.type = "text/javascript";
            aScript.onload = onScriptLoaded;
            document.head.appendChild(aScript);
        }
        //____________________________________________________________________________
        static fromNumberToDollars(iNumber, iFractionDigits = 0, aCurrency = 'USD') {
            let aFormatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: aCurrency,
                minimumFractionDigits: iFractionDigits
            });
            return aFormatter.format(iNumber);
        }
        //____________________________________________________________________________
        static hitTestElements(iSelectedElement, iSiblingsElements) {
            let hitElemets = [];
            for (let i = 0; i < iSiblingsElements.length; i++) {
                if (MathUtils.isRectOverlap(iSelectedElement.getBoundingClientRect(), iSiblingsElements[i].getBoundingClientRect())) {
                    hitElemets.push(iSiblingsElements[i]);
                }
            }
            return hitElemets;
        }
        //____________________________________________________________________
        static getNextSiblings(elem) {
            let aSibs = [];
            while (elem = elem.nextSibling) {
                if (elem.nodeType === 3)
                    continue;
                aSibs.push(elem);
            }
            return aSibs;
        }
        //____________________________________________________________________
        static getPreviousSiblings(elem) {
            let aSibs = [];
            while (elem = elem.previousSibling) {
                if (elem.nodeType === 3)
                    continue;
                aSibs.push(elem);
            }
            return aSibs;
        }
        //____________________________________________________________________
        static getAllSiblings(elem) {
            let aSibs = [];
            elem = elem.parentNode.firstChild;
            do {
                if (elem.nodeType === 3)
                    continue;
                aSibs.push(elem);
            } while (elem = elem.nextSibling);
            return aSibs;
        }
        //Copy to clipboard
        //____________________________________________________________________
        static copyTextToClipboard(iText) {
            let aIsCopied = false;
            if (!navigator['clipboard']) {
                aIsCopied = this.fallbackCopyTextToClipboard(iText);
                return;
            }
            navigator['clipboard'].writeText(iText).then(function () {
                aIsCopied = true;
            }, function (err) {
                //console.error('Async: Could not copy text: ', err);
                aIsCopied = this.fallbackCopyTextToClipboard(iText);
            });
            return aIsCopied;
        }
        //____________________________________________________________________
        static fallbackCopyTextToClipboard(iText) {
            let successful = false;
            let textArea = document.createElement("textarea");
            textArea.value = iText;
            textArea.style.position = 'fixed';
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = '2em';
            textArea.style.height = '2em';
            textArea.style.padding = "0";
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            textArea.style.background = 'transparent';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                successful = document.execCommand('copy');
            }
            catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
            return successful;
        }
        //____________________________________________________________________
        static copyToClipboardClickEvent(text) {
            let textArea = document.createElement('textArea');
            textArea.readOnly = false;
            textArea.contentEditable = "true";
            textArea.value = text;
            document.body.appendChild(textArea);
            const range = document.createRange();
            range.selectNodeContents(textArea);
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range); // Does not work for Firefox if a textarea or input
            if (textArea.nodeName == "TEXTAREA" || textArea.nodeName == "INPUT")
                textArea.select();
            if (textArea.setSelectionRange)
                textArea.setSelectionRange(0, 999999);
            if (document.queryCommandSupported("copy"))
                document.execCommand('copy');
            textArea.blur();
        }
        //____________________________________________________________________
        static getMobileOperatingSystem() {
            let userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/windows phone/i.test(userAgent)) {
                return "WindowsPhone";
            }
            if (/android/i.test(userAgent)) {
                return "Android";
            }
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream || userAgent.toLowerCase().indexOf('macintosh') > -1 && 'ontouchend' in document) {
                return "iOS";
            }
            return Utils.NOT_PHONE;
        }
        //____________________________________________________________________
        static wasTouchMoved(iInitialPosition, iLastPosition, iDeviation) {
            return Point.distance(iInitialPosition, iLastPosition) > iDeviation;
        }
        //____________________________________________________________________
        // Reflection
        static sleep(pMilliseconds) {
            return new Promise((resolve, reject) => {
                setTimeout(function () { resolve(); }, pMilliseconds);
            });
        }
        //____________________________________________________________________
        // Reflection
        static getClassByPath(pPath) {
            if (pPath == null) {
                return null;
            }
            let aParts = pPath.split(".");
            if (window[aParts[0]] == null) {
                console.warn("Class: " + pPath + " not Exist");
                return null;
            }
            let aModule = window[aParts[0]];
            for (let i = 1; i < aParts.length; i++) {
                if (aModule[aParts[i]] == null) {
                    console.warn("Class: " + pPath + " not Exist");
                    return null;
                }
                aModule = aModule[aParts[i]];
            }
            return aModule;
        }
        //_________________________________________________________________________________
        // Reflection
        static getInstanceByClassPath(pPath) {
            let aModule = Utils.getClassByPath(pPath);
            if (aModule == null) {
                return;
            }
            return new aModule();
        }
        //_____________________________________________________________
        static addExitPageEventListener(pCallback) {
            if (asBase.Utils.isMobile()) {
                window.addEventListener('blur', pCallback);
                window.addEventListener('pagehide', pCallback);
            }
            else {
                window.addEventListener('beforeunload', pCallback);
                if (asBase.Globals.isSafari) {
                    window.addEventListener('pagehide', pCallback);
                }
            }
        }
        //_____________________________________________________________
        static removeExitPageEventListener(pCallback) {
            if (asBase.Utils.isMobile()) {
                window.removeEventListener('blur', pCallback);
                window.removeEventListener('pagehide', pCallback);
            }
            else {
                window.removeEventListener('beforeunload', pCallback);
                if (asBase.Globals.isSafari) {
                    window.removeEventListener('pagehide', pCallback);
                }
            }
        }
        //_____________________________________________________________
        static warning(pMsg) {
            console.warn("Allseated: " + pMsg);
        }
        //______________________________________________________________
        static error(pMsg) {
            console.error("Allseated: " + pMsg);
        }
    }
    Utils.ID_ITERATOR = 1;
    Utils.numOfLogos = 0;
    Utils.NOT_PHONE = "Not_PHONE";
    asBase.Utils = Utils;
})(asBase || (asBase = {}));
///<reference path="../Utils.ts"/>
var asBase;
///<reference path="../Utils.ts"/>
(function (asBase) {
    var events;
    (function (events) {
        class MouseEvents {
            static get MOUSE_WHEEL() {
                if (MouseEvents.sValidMouseWheelEvent == "") {
                    let aTmpElement = document.createElement('div');
                    let aEventName = "onmousewheel";
                    let aIsSupported = (aEventName in aTmpElement);
                    if (aIsSupported) {
                        MouseEvents.sValidMouseWheelEvent = "mousewheel";
                        MouseEvents.WHEEL_DELTA_PROPERTY = "wheelDelta";
                    }
                    else {
                        MouseEvents.sValidMouseWheelEvent = "wheel";
                        MouseEvents.WHEEL_DELTA_PROPERTY = "deltaY";
                        MouseEvents.WHELL_FACTOR = -30;
                    }
                }
                return MouseEvents.sValidMouseWheelEvent;
            }
        }
        // public static CLICK: string = Utils.getMobileOperatingSystem() == Utils.NOT_PHONE ? "click" : "touchstart";
        MouseEvents.CLICK = asBase.Utils.getMobileOperatingSystem() == asBase.Utils.NOT_PHONE ? "click" : "touchstart";
        MouseEvents.AS_CLICK = "as_click"; // Cheking if the movment of the mouse less then....
        MouseEvents.FORCE_CLICK = "click";
        MouseEvents.TOGGLE_CLICK = "toggleclick";
        MouseEvents.DOUBLE_CLICK = "dblclick";
        MouseEvents.MOUSE_OVER = "mouseover";
        MouseEvents.MOUSE_OUT = "mouseout";
        MouseEvents.MOUSE_LEAVE = "mouseleave";
        MouseEvents.ROLL_OVER = "mouseenter";
        MouseEvents.ROLL_OUT = "mouseleave";
        MouseEvents.MOUSE_DOWN = asBase.Utils.getMobileOperatingSystem() == asBase.Utils.NOT_PHONE ? "mousedown" : "touchstart";
        MouseEvents.MOUSE_UP = asBase.Utils.getMobileOperatingSystem() == asBase.Utils.NOT_PHONE ? "mouseup" : "touchend";
        MouseEvents.MOUSE_MOVE = asBase.Utils.getMobileOperatingSystem() == asBase.Utils.NOT_PHONE ? "mousemove" : "touchmove";
        //public static MOUSE_WHEEL: string = "mousewheel";
        MouseEvents.TOUCH_MOVE = "touchmove";
        MouseEvents.TOUCH_START = "touchstart";
        MouseEvents.TOUCH_END = "touchend";
        MouseEvents.TOUCH_CANCEL = "touchcancel";
        MouseEvents.DRAG_OVER = "dragover";
        MouseEvents.DRAG_LEAVE = "dragleave";
        MouseEvents.DROP = "drop";
        MouseEvents.SCROLL = "scroll";
        MouseEvents.sValidMouseWheelEvent = "";
        MouseEvents.WHEEL_DELTA_PROPERTY = "";
        MouseEvents.WHELL_FACTOR = 1;
        events.MouseEvents = MouseEvents;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        class EventTypes {
        }
        /*Data*/
        EventTypes.ASBASE_DATA_READY = "ASBASE_DATA_READY";
        // General events
        EventTypes.ADDED_TO_STAGE = "AddedToStage_EV";
        EventTypes.CREATION_COMPLITE = "CREATION_COMPLITE_EV";
        EventTypes.COMPONENT_ACTIVATE = "COMPONENT_ACTIVATE_EV";
        EventTypes.REMOVED_FROM_STAGE = "RemovedFromStage__EV";
        EventTypes.RESIZE_STAGE = "ResizeStage__EV";
        EventTypes.COMPLETE = "Complete_EV";
        EventTypes.CANCEL = "Cancel_EV";
        EventTypes.SELECT = "Select_EV";
        EventTypes.CLOSE = "Close_EV";
        EventTypes.WORKING = "Working_EV";
        EventTypes.NEXT = "Next_EV";
        EventTypes.PREV = "Prev_EV";
        EventTypes.SHOW_POPUP_WINDOW = "ShowPopUpWindow_EV";
        EventTypes.HIDE_POPUP_WINDOW = "HidePopUpWindow_EV";
        EventTypes.SHOW_FLOAT_WINDOW = "ShowFloatWindow_EV";
        EventTypes.HIDE_FLOAT_WINDOW = "HideFloatWindow_EV";
        EventTypes.FLOAT_WINDOW_HEADER_MOUSE_DOWN = "FloatWindowHeaderMouseDown_EV";
        // CHANGE EVENTS
        EventTypes.CHANGE = "change";
        EventTypes.SELECTED_CHANGE = "SelectedChange";
        EventTypes.TB_LINEN_CHANGED_EV = "TB_LINEN_CHANGED_EV";
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
        EventTypes.ENTER_KEY_DOWN = "EnterKeyDown";
        EventTypes.ESC_KEY_DOWN = "EscKeyDown";
        EventTypes.COPY_KEY_DOWN = "CopyKeyDown";
        EventTypes.PASTE_KEY_DOWN = "PasteKeyDown";
        //LOAD EVENTS
        EventTypes.LOAD = "load";
        EventTypes.ERROR = "error";
        //MEDIA EVENTS
        EventTypes.PLAY = "play";
        EventTypes.ENDED = "ended";
        // MODULES EVENTS
        EventTypes.MODULES_INIT_EVENT = "MODULES_INIT_EVENT";
        EventTypes.PASTE = "paste";
        EventTypes.DISABLE_PREVENT_ENTER_DEFAULT = false;
        EventTypes.DISABLE_STOP_IMM_PROP_ENTER_DEFAULT = false;
        //FlORPLAN LOADED
        EventTypes.FLOORPLAN_LOADED = "floorplan_loaded";
        // Walk Me
        EventTypes.ASGUIDE_REGISTER_ELEMENT = "AsGuideRegisterElement";
        EventTypes.LEAVE_OCCASION_EVENT = "LEAVE OCCASION EVENT";
        // Texture Quality
        EventTypes.TEXTURE_QUALITY_CHANGED = "TextureQualityChanged";
        EventTypes.TEXTURE_QUALITY_CHANGED_ON_MEETING = "TextureQualityChangedMeeting";
        events.EventTypes = EventTypes;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        class EventDispatcher {
            constructor() {
            }
            addEventListener(pType, pCallback, pOwner) {
                if (pCallback == undefined) {
                    return;
                }
                if (this.mEventsArray == null) {
                    this.mEventsArray = new Array();
                }
                if (this.mEventsArray[pType] == null) {
                    this.mEventsArray[pType] = new Array();
                }
                const aEventsList = this.mEventsArray[pType];
                for (let i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList[i].callback = pCallback;
                        return;
                    }
                }
                this.mEventsArray[pType].push(new CallbackHolder(pCallback, pOwner));
            }
            //______________________________________________________________
            removeEventListener(pType, pOwner) {
                if (this.mEventsArray == null) {
                    return;
                }
                if (this.mEventsArray[pType] == null) {
                    return;
                }
                const aEventsList = this.mEventsArray[pType];
                for (let i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList.splice(i, 1);
                    }
                }
            }
            //______________________________________________________________
            dispatchEvent(pType, pData) {
                if (this.mEventsArray == null) {
                    return;
                }
                if (this.mEventsArray[pType] == null) {
                    return;
                }
                let aEventsList = this.mEventsArray[pType].slice(0);
                if (pData == null) {
                    for (let i = 0; i < aEventsList.length; i++) {
                        aEventsList[i].callback();
                    }
                }
                else {
                    for (let i = 0; i < aEventsList.length; i++) {
                        aEventsList[i].callback(pData);
                    }
                }
            }
            //________________________________________________________________
            removeAllOwnerEvents(pType, pOwner) {
                if (this.mEventsArray == null) {
                    return;
                }
                for (let aTypes in this.mEventsArray) {
                    const aEventsList = this.mEventsArray[aTypes];
                    for (let i = aEventsList.length - 1; i >= 0; i--) {
                        if (aEventsList[i].owner == pOwner) {
                            aEventsList.splice(i, 1);
                        }
                    }
                }
            }
        }
        events.EventDispatcher = EventDispatcher;
        //__________________________________________________________________
        class CallbackHolder {
            constructor(pCallback, pOwner) {
                this.callback = pCallback;
                this.owner = pOwner;
            }
        }
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
///<reference path="../events/MouseEvents.ts"/>
///<reference path="../events/EventTypes.ts"/>
///<reference path="../events/EventDispatcher.ts"/>
var asBase;
///<reference path="../events/MouseEvents.ts"/>
///<reference path="../events/EventTypes.ts"/>
///<reference path="../events/EventDispatcher.ts"/>
(function (asBase) {
    var baseclasses;
    (function (baseclasses) {
        var MouseEvents = asBase.events.MouseEvents;
        var EventTypes = asBase.events.EventTypes;
        class AppIdle extends asBase.events.EventDispatcher {
            constructor() {
                super();
                this.tick_FUNC = () => this.tick();
                this.reset_FUNC = (event) => this.reset(event);
            }
            //____________________________________________________________________
            start() {
                document.addEventListener(MouseEvents.MOUSE_MOVE, this.reset_FUNC);
                document.addEventListener(EventTypes.KEY_DOWN, this.reset_FUNC);
                this.mIsRunning = true;
                this.mTimer = setInterval(this.tick_FUNC, AppIdle.APP_IDLE_TIMEOUT);
            }
            //____________________________________________________________________
            tick() {
                this.dispatchEvent(AppIdle.APP_IDLE);
            }
            //____________________________________________________________________
            stop() {
                document.removeEventListener(MouseEvents.MOUSE_MOVE, this.reset_FUNC);
                document.removeEventListener(EventTypes.KEY_DOWN, this.reset_FUNC);
                this.mIsRunning = false;
                clearInterval(this.mTimer);
            }
            //____________________________________________________________________
            reset(event) {
                if (event != null) {
                    asBase.Globals.isAltDown = event.altKey;
                    asBase.Globals.isControlDown = event.ctrlKey || event.metaKey;
                    asBase.Globals.isShiftDown = event.shiftKey;
                }
                if (!this.mIsRunning) {
                    this.start();
                    return;
                }
                clearInterval(this.mTimer);
                this.mTimer = setInterval(this.tick_FUNC, AppIdle.APP_IDLE_TIMEOUT);
                // event.preventDefault();
            }
        }
        //------------------------------
        // Event
        //------------------------------
        AppIdle.APP_IDLE = "AppIdle";
        AppIdle.APP_IDLE_TIMEOUT = 15 * 60 * 1000;
        baseclasses.AppIdle = AppIdle;
    })(baseclasses = asBase.baseclasses || (asBase.baseclasses = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var constants;
    (function (constants) {
        class DaUnderDevelopment {
        }
        //------------------------------
        // Constants
        //------------------------------
        DaUnderDevelopment.IS_AGREE_TO_TOS = true;
        DaUnderDevelopment.SHOW_TB_GRID = false;
        DaUnderDevelopment.IS_ALWAYS_ENABLE_COUPON = true;
        /// MUST BE TRUE !!!!!!!
        DaUnderDevelopment.IS_TLAT_CORS_ENABLED = true;
        DaUnderDevelopment.LIGHT_SETTINGS = false;
        DaUnderDevelopment.IS_FULL_SCREEN = false;
        DaUnderDevelopment.SMART_SNAP = false;
        DaUnderDevelopment.MOVE_TO_POINT_IN_3D = false;
        DaUnderDevelopment.IS_AUTO_LAYOUT_ITEMS_PRELOADER = false;
        DaUnderDevelopment.IS_TAKE_TOUR_PLANNER = false;
        DaUnderDevelopment.IS_MY_VENUE_WIDGET = false;
        DaUnderDevelopment.IS_MY_VENUE_WIDGET_FIRST_VERSION = false;
        DaUnderDevelopment.IS_NEW_WINDOW3D = false;
        DaUnderDevelopment.IS_TEXTURE_QUALITY_3D = true;
        DaUnderDevelopment.IS_NEW_OBJECTS_SELECTION = false;
        DaUnderDevelopment.IS_HALL_MAP_LEGEND = false;
        DaUnderDevelopment.IS_CAPTURE_LAYOUT = false;
        DaUnderDevelopment.IS_LINE_ARROWS = false;
        // traces
        DaUnderDevelopment.SHOW_COMBOBOX_RELATED = false;
        DaUnderDevelopment.SHOW_COLLECTION_RELATED = false;
        DaUnderDevelopment.SHOW_DATAGRID_RELATED = false;
        DaUnderDevelopment.SHOW_CENTER_PIECE = false;
        DaUnderDevelopment.SHOW_CONSOLE_LOG = false;
        DaUnderDevelopment.SHOW_CUSTOM_OBJECTS_LOG = false;
        //scene
        DaUnderDevelopment.SHOW_MODEL_HIEGHTS = false;
        DaUnderDevelopment.CAMERA_SPEED_SLOW = false;
        DaUnderDevelopment.CHANGE_CAMERA_POSITION = false;
        //Floorplans
        DaUnderDevelopment.IS_OCASION_SAVED_ON_SHARE = true;
        DaUnderDevelopment.IS_WITH_SHARE_TO_VR = true;
        DaUnderDevelopment.IS_WITH_AS_CONNECT = false;
        DaUnderDevelopment.IS_WITH_CONTENT = false;
        //is Real view
        DaUnderDevelopment.IS_WITH_ZONE_SELECTION = true;
        DaUnderDevelopment.IS_WITH_DRAG_FROM_ASBASE = true;
        DaUnderDevelopment.IS_REALTIME_WEB_TO_WEB = false;
        DaUnderDevelopment.IS_MINI_CONNECT = false;
        DaUnderDevelopment.IS_WITH_AGORA = false;
        DaUnderDevelopment.IS_WITH_ZOOM = false;
        DaUnderDevelopment.IS_WITH_AGORA_4X = false;
        // Banquet Chairs
        DaUnderDevelopment.IS_NEW_BANQUET_CHAIRS_MENU = true;
        // Currency
        DaUnderDevelopment.IS_SUPPORT_CURRENCY = true;
        // EXVO - DANIEL
        DaUnderDevelopment.IS_NEW_EXVO_BUTTON = true;
        // Be careful, make sure the Unity and mobile apps know how to Open Events and 3D as ZIP File.
        DaUnderDevelopment.SAVE_OCCASION_ZIP_FILE = false;
        DaUnderDevelopment.IS_WITH_SAVE_SVG = false;
        //Is with checkin
        DaUnderDevelopment.IS_WITH_CHECKIN = false;
        DaUnderDevelopment.ENABLED_MATTERPORT = false;
        //for widget
        DaUnderDevelopment.IS_CHARTS_MODE = false;
        DaUnderDevelopment.IS_PRESENTATION_MODE = false;
        DaUnderDevelopment.IS_IN_SHARE_MODE = false;
        DaUnderDevelopment.IS_CHARTS_MODE_FIRST_LOAD = false;
        DaUnderDevelopment.USE_ENTITY_CONNECT = false;
        DaUnderDevelopment.IS_AUTO_JOIN = true;
        DaUnderDevelopment.USE_PROXIMITY_GRID = true;
        DaUnderDevelopment.ENABLE_CALL_AREA = true;
        DaUnderDevelopment.ENABLE_WALK_AND_TALK = false;
        DaUnderDevelopment.USE_MUSIC_ENTITY = false;
        //notification panel
        DaUnderDevelopment.SHOW_NOTIFICATION_PANEL = true;
        // navigator
        DaUnderDevelopment.SHOW_NAVIGATOR = true;
        //quality settings
        DaUnderDevelopment.SHOW_QUALITY = true;
        // gestures
        DaUnderDevelopment.IS_WITH_GESTURES = true;
        DaUnderDevelopment.USE_SMART_AVATARS_GRID = true;
        // mute all and speaking indicators
        DaUnderDevelopment.IS_WITH_MUTE_ALL = true;
        DaUnderDevelopment.IS_BOOTH_STAGE_SEPARATED_UI = true;
        DaUnderDevelopment.IS_GROUP_CHAT = true;
        constants.DaUnderDevelopment = DaUnderDevelopment;
    })(constants = asBase.constants || (asBase.constants = {}));
})(asBase || (asBase = {}));
///<reference path="constants/DaUnderDevelopment.ts"/>
var asBase;
///<reference path="constants/DaUnderDevelopment.ts"/>
(function (asBase) {
    class CoComponentBase {
        constructor(pData, pSkin, pContainer, pNoWrapper, pIsAutoCreate = true) {
            this.mSkinPath = "";
            this.mInitialized = false;
            this.mIsNeedSetToActive = false;
            this.mIsVisible = false;
            this.mIsIncludeInLayout = true;
            this.mIsIncludeParentInLayout = true;
            this.mIsEnabled = true;
            this.mIsStartInitialized = false;
            this.isDisposed = false;
            //super();
            CoComponentBase.mInstanceCounter++;
            this.mInstanceID = CoComponentBase.mInstanceCounter;
            this.mData = pData;
            this.mNoWraper = pNoWrapper;
            this.mSkinPath = pSkin;
            this.mContainer = pContainer;
            if ((typeof this.mSkinPath) == "string") {
                this.mContentWrapper = document.createElement("div");
                this.handleContainer(this.mContainer);
            }
            else if (this.mSkinPath != undefined) {
                this.mContentWrapper = this.mSkinPath;
                this.handleContainer(this.mContainer);
            }
            else {
                this.mContentWrapper = this.mContainer;
            }
            if (pIsAutoCreate) {
                this.create();
            }
        }
        //________________________________________________________
        create() {
            this.mIsStartInitialized = true;
            if ((typeof this.mSkinPath) == "string") {
                if (this.mSkinPath.substr(this.mSkinPath.length - 5).toLowerCase() != ".html") {
                    this.mSkinPath += ".html";
                }
                this.mSkinPath = asBase.constants.DaGlobalConsts.WWW_ROOT + CoComponentBase.version + this.mSkinPath;
                //pSkin = asBase.server.DaServerConst.CURRENT_SERVER_URL + pSkin;
                this.loadSkin(this.mContentWrapper, this.mSkinPath, () => this.onSkinReady());
            }
            else {
                setTimeout(() => this.onSkinReady(), 0);
            }
            //this.mContentWrapper.addEventListener("DOMNodeInsertedIntoDocument", () => this.onAddToStage(),false);
            //this.mContentWrapper.addEventListener("DOMNodeRemovedFromDocument", () => this.onRemoveFromStage(),false);
        }
        //______________________________________________________________
        onAddToStage() {
            var e = new asBase.events.AsEvent(asBase.events.EventTypes.ADDED_TO_STAGE, true, this);
            this.dispatchEvent(e.event);
            //alert("onAddToStage"); 
        }
        //______________________________________________________________
        onRemoveFromStage() {
            var e = new asBase.events.AsEvent(asBase.events.EventTypes.REMOVED_FROM_STAGE, true, this);
            this.dispatchEvent(e.event);
            //alert("onRemoveFromStage");
        }
        //______________________________________________________________
        get parentContainer() {
            return this.mParentContainer;
        }
        //______________________________________________________________
        handleContainer(pContainer) {
            if (pContainer != undefined) {
                this.mParentContainer = pContainer;
                if (this.mNoWraper != true) {
                    this.mParentContainer.appendChild(this.mContentWrapper);
                }
            }
        }
        //______________________________________________________________
        loadSkin(pTo, pHTMLPath, pOnLoad) {
            if (pOnLoad != null) {
                $(pTo).load(pHTMLPath, pOnLoad);
            }
            else {
                $(pTo).load(pHTMLPath);
            }
        }
        //______________________________________________________________
        onSkinReady() {
            if (this.isDisposed) {
                return;
            }
            asBase.LanguageDictionary.translate(this.mContentWrapper);
            if (document.body.contains(this.mContentWrapper)) {
                if (this.mSkinPath != "") {
                    this.onAddToStage();
                }
            }
            this.creationComplete();
            if (this.mNoWraper == true) {
                for (let i = 0; i < this.mContentWrapper.childNodes.length; i++) {
                    let aNode = this.mContentWrapper.childNodes[i];
                    this.mParentContainer.appendChild(aNode);
                }
            }
            if (this.mIsNeedSetToActive && this.mData) {
                this.updateData();
            }
            if ((this.mModel != null) && (this.mIsNeedSetToActive) && !this.mModel.isActive) {
                this.mModel.setToActive();
                this.mIsNeedSetToActive = false;
                this.mModel.isActive = true;
            }
            this.mInitialized = true;
            this.dispatchEvent(new asBase.events.AsEvent(asBase.events.EventTypes.CREATION_COMPLITE, false, this).event);
        }
        //______________________________________________________________
        getPart(iID, pHTMLElement) {
            if (pHTMLElement == undefined) {
                pHTMLElement = this.mContentWrapper;
            }
            if (pHTMLElement == undefined) {
                pHTMLElement = this.mParentContainer;
            }
            let aElement = asBase.Utils.getElementIn(pHTMLElement, iID);
            if (aElement == null) {
                //// TURNO ON WHEN TESTING //// console.warn("CommponentBase::getPart -> " + this.mInstanceID + " skin:"+ this.mSkinPath  + " id=" + iID)
            }
            this.registerAsGuideElement(iID, aElement);
            return (aElement);
        }
        //_______________________________________________________________
        registerAsGuideElement(iID, pHTMLElement) {
            if (CoComponentBase.sAsGuideElementsHash) {
                if (CoComponentBase.sAsGuideElementsHash[iID] != null) {
                    let e = new asBase.events.EvAsGuideRegisterElement(iID, pHTMLElement);
                    asBase.events.EventManager.dispatchEvent(asBase.events.EventTypes.ASGUIDE_REGISTER_ELEMENT, this, e);
                    CoComponentBase.sAsGuideElementsHash[iID]++;
                }
            }
        }
        //_______________________________________________________________
        get isInitialized() {
            return (this.mInitialized);
        }
        //________________________________________________________________
        creationComplete() {
        }
        //_______________________________________________________________
        setToActive() {
            if (!this.mInitialized) {
                this.mIsNeedSetToActive = true;
                return;
            }
            if (this.mModel && !this.mModel.isActive) {
                this.mModel.setToActive();
                this.mModel.isActive = true;
            }
            if (this.mData) {
                this.updateData();
            }
            this.dispatchEvent(new asBase.events.AsEvent(asBase.events.EventTypes.COMPONENT_ACTIVATE, false, this).event);
        }
        //_______________________________________________________________
        setToSleep() {
            if (this.mModel && this.mModel.isActive) {
                this.mModel.setToSleep();
                this.mModel.isActive = false;
            }
        }
        //_______________________________________________________________
        dispose() {
            this.remove();
            this.mModel = null;
            this.mContentWrapper = null;
            this.removeAllOwnerEvents(this);
            this.mEvents = null;
            this.mContainer = null;
            this.isDisposed = true;
        }
        //_______________________________________________________________
        remove() {
            if (this.mParentContainer != null) {
                if (this.mNoWraper != true && this.mContentWrapper.parentElement == this.mParentContainer) {
                    this.mParentContainer.removeChild(this.mContentWrapper);
                }
                this.mParentContainer = null;
            }
        }
        //_______________________________________________________________
        addEventListener(pType, pEventListener, pOwner, useCapture) {
            if (this.mEvents == null) {
                this.mEvents = new Array();
            }
            if (this.mEvents[pType] == null) {
                this.mEvents[pType] = Array();
            }
            const aEventsList = this.mEvents[pType];
            for (let i = 0; i < aEventsList.length; i++) {
                if (aEventsList[i].owner == pOwner) {
                    return;
                }
            }
            this.mEvents[pType].push(new EventListenerHolder(pEventListener, pOwner));
            if (this.mContentWrapper == null) {
                return false;
            }
            if (useCapture != null) {
                this.mContentWrapper.addEventListener(pType, pEventListener, useCapture);
                return true;
            }
            this.mContentWrapper.addEventListener(pType, pEventListener);
        }
        //_______________________________________________________________
        removeEventListener(pType, pOwner, useCapture) {
            if (this.mEvents == null) {
                return;
            }
            if (this.mEvents[pType] == null) {
                return;
            }
            let aEventListener;
            const aEventsList = this.mEvents[pType];
            for (let i = aEventsList.length - 1; i >= 0; i--) {
                if (aEventsList[i].owner == pOwner) {
                    aEventListener = aEventsList[i].callback;
                    aEventsList.splice(i, 1);
                }
            }
            if (aEventListener == null) {
                return;
            }
            if (this.mContentWrapper == null) {
                return false;
            }
            if (useCapture != null) {
                this.mContentWrapper.removeEventListener(pType, aEventListener, useCapture);
                return true;
            }
            this.mContentWrapper.removeEventListener(pType, aEventListener);
        }
        //_______________________________________________________________
        removeAllOwnerEvents(pOwner, useCapture) {
            if (this.mEvents == null) {
                return;
            }
            for (let aType in this.mEvents) {
                let aEventListener;
                const aEventsList = this.mEvents[aType];
                for (let i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventListener = aEventsList[i].callback;
                        aEventsList.splice(i, 1);
                        if (this.mContentWrapper == null) {
                            return false;
                        }
                        if (useCapture != null) {
                            this.mContentWrapper.removeEventListener(aType, aEventListener, useCapture);
                        }
                        else {
                            this.mContentWrapper.removeEventListener(aType, aEventListener);
                        }
                    }
                }
            }
        }
        //_______________________________________________________________
        dispatchEvent(pEvent) {
            if (this.mContentWrapper == null) {
                return false;
            }
            this.mContentWrapper.dispatchEvent(pEvent);
            return true;
        }
        //_______________________________________________________________
        addClass(iClassName) {
            if (!this.mContentWrapper) {
                return;
            }
            if (!this.mContentWrapper.classList.contains(iClassName)) {
                this.mContentWrapper.classList.add(iClassName);
            }
        }
        //_______________________________________________________________
        removeClass(iClassName) {
            if (!this.mContentWrapper) {
                return;
            }
            if (this.mContentWrapper.classList.contains(iClassName)) {
                this.mContentWrapper.classList.remove(iClassName);
            }
        }
        //_______________________________________________________________
        setEnabled(iIsEnabled) {
            this.mIsEnabled = iIsEnabled;
        }
        //_______________________________________________________________
        get data() {
            return this.mData;
        }
        //_______________________________________________________________
        set data(pData) {
            this.mData = pData;
        }
        //_______________________________________________________________
        updateData() {
            this.updateView();
        }
        //_______________________________________________________________
        updateView() {
        }
        //________________________________________________________________
        getContentWrapper() {
            return this.mContentWrapper;
        }
        //________________________________________________________________
        get contentWrapper() {
            return this.mContentWrapper;
        }
        //________________________________________________________________
        getInnerContent() {
            return this.getContentWrapper().innerHTML;
        }
        //________________________________________________________________
        get skinPath() {
            return this.mSkinPath;
        }
        //________________________________________________________________
        get myIndex() {
            return $(this.mContentWrapper).index();
        }
        //________________________________________________________________
        get className() {
            return this.constructor.name;
        }
        //________________________________________________________________
        set innerHTML(value) {
            if (!this.mContentWrapper) {
                return;
            }
            this.mContentWrapper.innerHTML = value;
        }
        //________________________________________________________________
        get innerHTML() {
            if (!this.mContentWrapper) {
                return "";
            }
            return this.mContentWrapper.innerHTML;
        }
        //________________________________________________________________
        set visible(value) {
            this.mIsVisible = value;
            asBase.Utils.showPart(this.mContentWrapper, value);
        }
        get visible() {
            return !this.contentWrapper.classList.contains("visibleNone");
        }
        //________________________________________________________________
        set includeInLayout(value) {
            this.mIsIncludeInLayout = value;
            if (this.mContentWrapper) {
                asBase.Utils.includePart(this.mContentWrapper, value);
            }
        }
        //________________________________________________________________
        get includeInLayout() {
            return (this.mIsIncludeInLayout);
        }
        //________________________________________________________________
        set includeParentInLayout(value) {
            this.mIsIncludeParentInLayout = value;
            if (this.mParentContainer) {
                asBase.Utils.includePart(this.mParentContainer, value);
            }
        }
        //________________________________________________________________
        set enabled(value) {
            this.setEnabled(value);
        }
        get enabled() {
            return this.mIsEnabled;
        }
        //________________________________________________________________
        get instanceID() {
            return this.className + ":" + this.mInstanceID;
        }
        //________________________________________________________________
        get isStartInitialized() {
            return this.mIsStartInitialized;
        }
        //_____________________________________________________________________________________________
        get isActive() {
            if (this.mModel) {
                return this.mModel.isActive;
            }
            return true;
        }
    }
    CoComponentBase.mInstanceCounter = 0;
    CoComponentBase.version = "";
    asBase.CoComponentBase = CoComponentBase;
    class EventListenerHolder {
        constructor(pCallback, pOwner) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
    }
})(asBase || (asBase = {}));
/// <reference path="CoComponentBase.ts" />
var asBase;
/// <reference path="CoComponentBase.ts" />
(function (asBase) {
    class CoComponentContainer extends asBase.CoComponentBase {
        constructor(pData, pSkin, pContainer, pNoWrapper) {
            super(pData, pSkin, pContainer, pNoWrapper);
        }
        //_______________________________________________________________
        dispose() {
        }
        //_______________________________________________________________
        addView(pMainView, pIndex) {
            this.mParentContainer = pMainView;
            if (pIndex === undefined) {
                this.mParentContainer.appendChild(this.mContentWrapper);
            }
            else {
                if (pIndex === 0) {
                    const aFirstChild = this.mParentContainer.firstChild;
                    if (aFirstChild == null) {
                        this.mParentContainer.appendChild(this.mContentWrapper);
                    }
                    else {
                        this.mParentContainer.insertBefore(this.mContentWrapper, aFirstChild);
                    }
                }
                else {
                    this.mParentContainer.insertBefore(this.mContentWrapper, this.mParentContainer.children[pIndex]);
                }
            }
        }
        //_______________________________________________________________
        removeView(iIndex) {
            if (this.mParentContainer == null) {
                return;
            }
            if (this.mNoWraper != true) {
                this.mParentContainer.removeChild(this.mContentWrapper);
            }
            else if (iIndex != undefined) {
                let aNoWrapperNode = this.mParentContainer.childNodes[iIndex];
                if (aNoWrapperNode != undefined) {
                    this.mParentContainer.removeChild(aNoWrapperNode);
                }
            }
            this.mParentContainer = null;
        }
    }
    asBase.CoComponentContainer = CoComponentContainer;
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        class AsEvent {
            constructor(pKey, pBubbles = false, pSender, pCancelable = false) {
                this.mKey = pKey;
                this.mBubbles = pBubbles;
                this.mEvent = document.createEvent("CustomEvent");
                this.mEvent.initCustomEvent(pKey, pBubbles, pCancelable, this);
                this.mSender = pSender;
                // this.mEvent.bubbles = (pBubbles != null) ? pBubbles : false
            }
            //_____________________________________________________________
            get event() {
                return (this.mEvent);
            }
            //_____________________________________________________________
            get sender() {
                return (this.mSender);
            }
            //_____________________________________________________________
            get key() {
                return this.mKey;
            }
            //_____________________________________________________________
            get bubbles() {
                return this.mBubbles;
            }
        }
        events.AsEvent = AsEvent;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
/// <reference path="../CoComponentContainer.ts" />
///<reference path="../events/AsEvent.ts"/>
var asBase;
/// <reference path="../CoComponentContainer.ts" />
///<reference path="../events/AsEvent.ts"/>
(function (asBase) {
    var baseclasses;
    (function (baseclasses) {
        var AsEvent = asBase.events.AsEvent;
        class CoDatePicker extends asBase.CoComponentContainer {
            constructor(pData, pContainer) {
                super(pData, undefined, pContainer);
                this.mDatePicker = $('#' + pContainer.id);
            }
            //__________________________________________________________________
            /*override*/
            creationComplete() {
                this.setToActive();
            }
            //________________________________________________________________
            /* override */
            setToActive() {
                this.mDateChangedBindFunc = (event) => this.dispatchDateChanged__EventHandler(event);
                this.init();
            }
            //________________________________________________________________
            /* override */
            setToSleep() {
                this.mDateChangedBindFunc = undefined;
            }
            /*override*/
            //_______________________________________________________________
            dispose() {
                this.setToSleep();
                this.removeView();
                this.data = undefined;
                this.mDatePicker = undefined;
            }
            //__________________________________________________________________
            clear() {
                this.mDatePicker.datepicker('update', '');
            }
            //__________________________________________________________________
            setDates() {
                this.mDatePicker.datepicker('setDates', this.data);
            }
            //__________________________________________________________________
            getDates() {
                return this.mDatePicker.datepicker('getDates');
            }
            //__________________________________________________________________
            getNumOfDates() {
                return this.mDatePicker.datepicker('getDates').length;
            }
            //__________________________________________________________________
            dispatchDateChanged__EventHandler(event) {
                this.data = this.mDatePicker.datepicker('getDates');
                const aDatePickerEvent = new AsEvent(CoDatePicker.DATEPICKER_CHANGE_EVENT, false, this);
                this.dispatchEvent(aDatePickerEvent.event);
            }
            //__________________________________________________________________
            init() {
                this.mDatePicker.datepicker({
                    multidate: true
                });
                this.setDates();
                this.mDatePicker.on('changeDate', this.mDateChangedBindFunc);
            }
            //***********************
            //       get/set        *
            //***********************
            //__________________________________________________________________
            get data() {
                return this.mData;
            }
            set data(value) {
                this.mData = value;
            }
        }
        //------------------------------
        // Static
        //------------------------------
        CoDatePicker.DATEPICKER_CHANGE_EVENT = "DATEPICKER_CHANGE_EVENT";
        baseclasses.CoDatePicker = CoDatePicker;
    })(baseclasses = asBase.baseclasses || (asBase.baseclasses = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        class EventBase {
            constructor(pKey, pCallBack, pOwner, pAttachedData, pFunction) {
                EventBase.mInstanceCounter++;
                this.mInstanceID = EventBase.mInstanceCounter;
                this.mAttachedData = pAttachedData;
                this.mOwner = pOwner;
                this.mKey = pKey;
                this.mCallBack = pCallBack;
            }
            //____________________________________________________________
            get callBack() {
                return this.mCallBack;
            }
            set callBack(value) {
                this.mCallBack = value;
            }
            //____________________________________________________________
            get data() {
                return this.mData;
            }
            set data(value) {
                this.mData = value;
            }
            //____________________________________________________________
            get owner() {
                return this.mOwner;
            }
            set owner(value) {
                this.mOwner = value;
            }
            //____________________________________________________________
            get sender() {
                return this.mSender;
            }
            set sender(value) {
                this.mSender = value;
            }
            //____________________________________________________________
            get attachedData() {
                return this.mAttachedData;
            }
            set attachedData(value) {
                this.mAttachedData = value;
            }
            //____________________________________________________________
            get key() {
                return this.mKey;
            }
            set key(value) {
                this.mKey = value;
            }
        }
        EventBase.mInstanceCounter = 0;
        events.EventBase = EventBase;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
///<reference path="../../asBase/events/EventBase.ts"/>
var gencom;
///<reference path="../../asBase/events/EventBase.ts"/>
(function (gencom) {
    var events;
    (function (events) {
        class EvGeneral extends asBase.events.EventBase {
            constructor(type, bubbles = false) {
                super(type, null, null);
            }
            /****************************
             * Getters and Setters
             ****************************/
            //___________________________________________________________________________________________________________
            get numericValue() {
                return this.mNumericValue;
            }
            set numericValue(value) {
                this.mNumericValue = value;
            }
            //___________________________________________________________________________________________________________
            get booleanValue() {
                return this.mBooleanValue;
            }
            set booleanValue(value) {
                this.mBooleanValue = value;
            }
        }
        //------------------------------
        // Constants
        //------------------------------
        // event
        EvGeneral.CREATE_OBJECT = "CreateNewObject__Event";
        EvGeneral.APP_IDLE = "AppIdle__Event";
        EvGeneral.VENUE_CHANGED = "VenueChanged__Event";
        EvGeneral.HOST_DELETE_OCCASION = "HostDeleteOccasion__Event";
        EvGeneral.MOUSE_UP = "MouseUp__Event";
        EvGeneral.MOUSE_DOWN = "MouseDown__Event";
        EvGeneral.DELETE_KEY_DOWN = "DeleteKeyDown__Event";
        EvGeneral.UNDO_KEY_DOWN = "UndoKeyDown__Event";
        EvGeneral.ENTER_KEY_DOWN = "EnterKeyDown__Event";
        EvGeneral.ESC_KEY_DOWN = "EscKeyDown__Event";
        EvGeneral.C_KEY_DOWN = "CopyKeyDown__Event";
        EvGeneral.V_KEY_DOWN = "PasteKeyDown__Event";
        EvGeneral.ARROW_KEY_DOWN = "DownKeyDown__Event";
        EvGeneral.ARROW_KEY_UP = "ArrowKeyUp__Event";
        EvGeneral.TAB_KEY_DOWN = "TabKeyDown__Event";
        EvGeneral.F_KEY_DOWN = "F_KeyDown__Event";
        EvGeneral.CTRL_KEY_DOWN = "CtrlKeyDown__Event";
        EvGeneral.MOUSE_WHEEL = "MouseWheel__Event";
        EvGeneral.MOUSE_DOWN_HEADER = "MouseDownHeader__Event";
        EvGeneral.MOUSE_UP_HEADER = "MouseUpHeader__Event";
        EvGeneral.CTRL_KEY_UP = "CtrlKeyUp__Event";
        // button events
        EvGeneral.BACK_BTN = "BackBtn__Event";
        EvGeneral.TITLE_CHANGED = "TitleChanged__Event";
        // app errors
        EvGeneral.CONNECTION_LOST_ERROR = "ConnectionLostError__Event";
        EvGeneral.SESSION_ERROR = "SessionError__Event";
        EvGeneral.SERVER_ERROR = "ServerError__Event";
        EvGeneral.RELOAD_APP_FOR_VERSION = "ReloadAppForVersion__Event";
        // general events
        EvGeneral.OCCASION_RELOAD_COMPLETE = "OccasionReloadComplete__Event";
        EvGeneral.RELOAD_OCCASION = "ReloadOccasion__Event";
        EvGeneral.EXIT_OCCASION = "ExitOccasion__Event";
        EvGeneral.LIST_UPDATE_COMPLETE = "ListUpdateComplete__Event";
        EvGeneral.HALL_MAP_ACTIVE_COMPLETE = "HallMapActiveComplete__Event";
        EvGeneral.FLOOR_PLAN_ACTIVE_COMPLETE = "FloorPlanActiveComplete__Event";
        EvGeneral.LAYOUT_MENU_ACTIVE_COMPLETE = "LayoutMenuActiveComplete__Event";
        EvGeneral.MARK_FOR_SAVE = "MarkForSave__Event";
        EvGeneral.RESET_MARK_FOR_SAVE = "ResetMarkForSave__Event";
        // specific app events
        EvGeneral.LAYOUT_START_DRAW = "LayoutStartDraw__Event";
        EvGeneral.LAYOUT_END_DRAW = "LayoutEndDraw__Event";
        // app events
        EvGeneral.APP_MOVED_GUEST_LIST = "MovedToGuestList__Event";
        EvGeneral.APP_MOVED_SEATING = "MovedToSeating__Event";
        EvGeneral.APP_MOVED_REPORTS = "MovedToReports__Event";
        EvGeneral.App_MOVED_DETAILS = "MovedToDetails__Event";
        // window events
        EvGeneral.POPUP_WINDOW_IN_PLACE = "PopupWindowInPlace__Event";
        // Guest List
        EvGeneral.REFRESH_SUBOCCASIONS = "RefreshGuestsSubOccasions__Event";
        EvGeneral.REFRESH_SUBOCCASIONS_RSVP = "RefreshGuestsSubOccasionsRsvp__Event";
        //
        EvGeneral.CAMPAIGN_MANAGER_TMP = "CampaignManagerTmp__Event";
        //
        EvGeneral.UPGRADE_ACCOUNT_BILLING = "UpgradeAccountBilling__Event";
        EvGeneral.UPGRADE_ACCOUNT_BILLING_PLANS = "UpgradeAccountBillingPlans__Event";
        // RFP
        EvGeneral.GET_RFP = "GetRfp__Event";
        events.EvGeneral = EvGeneral;
    })(events = gencom.events || (gencom.events = {}));
})(gencom || (gencom = {}));
var asBase;
(function (asBase) {
    var collections;
    (function (collections) {
        class EvItemRenderer {
        }
        EvItemRenderer.IR_MOUSE_DOWN = "IR_MOUSE_DOWN";
        EvItemRenderer.IR_MOUSE_UP = "IR_MOUSE_UP";
        EvItemRenderer.IR_DELETE = "IR_DELETE";
        EvItemRenderer.IR_MOUSE_OVER = "IR_MOUSE_OVER";
        EvItemRenderer.IR_MOUSE_OUT = "IR_MOUSE_OUT";
        EvItemRenderer.IR_CHANGED = "IR_CHANGED";
        EvItemRenderer.IR_ADDED = "IR_ADDED";
        EvItemRenderer.IR_REFRESH_LIST = "IR_REFRESH_LIST";
        EvItemRenderer.IR_DOUBLE_CLICK = "LIST_IR_DOUBLE_CLICK";
        EvItemRenderer.IR_SELECTION_CHANGED = "IR_SELECTION_CHANGED";
        EvItemRenderer.IR_SELECTIONS_CHANGED = "IR_SELECTIONS_CHANGED";
        EvItemRenderer.IR_SELECT_ALL_CHANGED = "IR_SELECT_ALL_CHANGED";
        EvItemRenderer.IR_DATA_CHANGED = "IR_DATA_CHANGED";
        collections.EvItemRenderer = EvItemRenderer;
    })(collections = asBase.collections || (asBase.collections = {}));
})(asBase || (asBase = {}));
/// <reference path="../constants/DaUnderDevelopment.ts" />
var asBase;
/// <reference path="../constants/DaUnderDevelopment.ts" />
(function (asBase) {
    var events;
    (function (events) {
        var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
        class EventManager {
            constructor() {
            }
            //-----------------------------------------------------
            static dispatchCustomEvent(pEvent) {
                if (EventManager.mEvents == null) {
                    return;
                }
                if (EventManager.mEvents[pEvent.key] == null) {
                    return;
                }
                const aEventsList = EventManager.mEvents[pEvent.key];
                for (let i = 0; i < aEventsList.length; i++) {
                    pEvent.attachedData = aEventsList[i].attachedData;
                    pEvent.owner = aEventsList[i].owner;
                    aEventsList[i].callBack(pEvent);
                }
            }
            //-----------------------------------------------------
            static dispatchEvent(pKey, pOwner, pData) {
                if (EventManager.mEvents == null) {
                    return;
                }
                if (EventManager.mEvents[pKey] == null) {
                    return;
                }
                let aEventsList = EventManager.mEvents[pKey].slice(0);
                for (let i = 0; i < aEventsList.length; i++) {
                    aEventsList[i].data = pData;
                    aEventsList[i].sender = pOwner;
                    aEventsList[i].callBack(aEventsList[i]);
                }
                aEventsList = null;
            }
            //______________________________________________________________
            static callFunction(pKey, pOwner, pData) {
                if (EventManager.mEvents == null) {
                    return null;
                }
                if (EventManager.mEvents[pKey] == null) {
                    return null;
                }
                let aEventsList = EventManager.mEvents[pKey].slice(0);
                for (let i = 0; i < aEventsList.length; i++) {
                    aEventsList[i].data = pData;
                    aEventsList[i].sender = pOwner;
                    return aEventsList[i].callBack(aEventsList[i]);
                }
                aEventsList = null;
                return null;
            }
            //-----------------------------------------------------
            static addEventListener(pKey, pCallback, pOwner, pAtachedData, pFunction) {
                if (EventManager.mEvents == null) {
                    EventManager.mEvents = new Array();
                }
                if (EventManager.mEvents[pKey] == null) {
                    EventManager.mEvents[pKey] = Array();
                }
                if (EventManager.hasEventListener(pKey, pOwner)) {
                    return;
                }
                const aEvent = new events.EventBase(pKey, pCallback, pOwner, pAtachedData, pFunction);
                EventManager.mEvents[pKey].push(aEvent);
            }
            //-----------------------------------------------------
            static hasEventListener(pKey, pOwner) {
                var aArray = EventManager.mEvents[pKey];
                for (let i = 0; i < aArray.length; i++) {
                    if (aArray[i].owner == pOwner) {
                        return true;
                    }
                }
                return false;
            }
            //-----------------------------------------------------
            static removeEventListener(pKey, pOwner) {
                if (EventManager.mEvents == null) {
                    return;
                }
                if (EventManager.mEvents[pKey] == null) {
                    return;
                }
                const aEventsList = EventManager.mEvents[pKey];
                for (let i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList.splice(i, 1);
                    }
                }
            }
            //-----------------------------------------------------
            static removeAllOwnerEvents(pOwner) {
                if (EventManager.mEvents == null) {
                    return;
                }
                for (let aKey in EventManager.mEvents) {
                    let aEventsList = EventManager.mEvents[aKey];
                    if (aEventsList == null) {
                        if (DaUnderDevelopment.SHOW_CONSOLE_LOG) {
                            console.log("Error - EventManager::removeAllOwnerEvents() aKey = " + aKey);
                        }
                        return;
                    }
                    for (let i = aEventsList.length - 1; i >= 0; i--) {
                        if (aEventsList[i].owner == pOwner) {
                            aEventsList.splice(i, 1);
                        }
                    }
                }
            }
        }
        events.EventManager = EventManager;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
/// <reference path="../CoComponentBase.ts" />
/// <reference path="../Utils.ts" />
///<reference path="../events/AsEvent.ts"/>
///<reference path="../constants/DaUnderDevelopment.ts"/>
///<reference path="../../gencom/events/EvGeneral.ts"/>
///<reference path="../collections/EvItemRenderer.ts"/>
///<reference path="../events/MouseEvents.ts"/>
///<reference path="../events/EventManager.ts"/>
var asBase;
/// <reference path="../CoComponentBase.ts" />
/// <reference path="../Utils.ts" />
///<reference path="../events/AsEvent.ts"/>
///<reference path="../constants/DaUnderDevelopment.ts"/>
///<reference path="../../gencom/events/EvGeneral.ts"/>
///<reference path="../collections/EvItemRenderer.ts"/>
///<reference path="../events/MouseEvents.ts"/>
///<reference path="../events/EventManager.ts"/>
(function (asBase) {
    var baseclasses;
    (function (baseclasses) {
        var EvItemRenderer = asBase.collections.EvItemRenderer;
        var AsEvent = asBase.events.AsEvent;
        var MouseEvents = asBase.events.MouseEvents;
        var EventManager = asBase.events.EventManager;
        var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
        // import MoPermissions = com.generalmodels.MoPermissions;
        var EvGeneral = gencom.events.EvGeneral;
        class ItemRenderer extends asBase.CoComponentBase {
            constructor(iData, iSkin, iContainer, iDataField, iNoWrapper, pIsAutoCreate = true) {
                super(iData, iSkin, iContainer, iNoWrapper, pIsAutoCreate);
                //------------------------------
                // Members
                //------------------------------
                this.mSelected = false;
                this.mIsEnabled = true;
                this.mLabel = "";
                this.mIsWithEditor = false;
                this.mIsInEditor = false;
                this.mInView = pIsAutoCreate;
                this.mDataField = iDataField;
            }
            //___________________________________________________________________________
            // overide
            loadSkin(pTo, pHTMLPath, pOnLoad) {
                asBase.collections.IrSkinLoader.loadSkin(pHTMLPath, pOnLoad, pTo);
            }
            //___________________________________________________________________________
            get clientRect() {
                return this.contentWrapper.getBoundingClientRect();
            }
            //__________________________________________________________________
            creationComplete() {
                this.item = asBase.Utils.getElementIn(this.mContentWrapper, "item");
                this.item_lbl = asBase.Utils.getElementIn(this.mContentWrapper, "item_lbl");
                this.setToActive();
            }
            //________________________________________________________________
            setToActive() {
                super.setToActive();
                this.addEventListeners();
            }
            //________________________________________________________________
            setToSleep() {
                super.setToSleep();
                this.removeEventListeners();
            }
            //________________________________________________________________
            addEventListeners() {
                this.mIsActive = true;
                this.addEventListener(MouseEvents.MOUSE_DOWN, (event) => this.mouseDown__EventHandler(event), this);
                this.addEventListener(MouseEvents.MOUSE_UP, (event) => this.mouseUp__EventHandler(event), this);
                this.addEventListener(MouseEvents.MOUSE_OVER, (event) => this.mouseOver__EventHandler(event), this);
                this.addEventListener(MouseEvents.MOUSE_LEAVE, (event) => this.mouseOut__EventHandler(event), this);
                this.addEventListener(MouseEvents.MOUSE_OUT, (event) => this.mouseOut__EventHandler(event), this);
                this.addEventListener(MouseEvents.DOUBLE_CLICK, (event) => this.doubleClick__EventHandler(event), this);
            }
            //________________________________________________________________
            removeEventListeners() {
                this.mIsActive = false;
                this.removeAllOwnerEvents(this);
            }
            //________________________________________________________________
            removeAllOwnerEvents(pOwner, useCapture) {
                this.mIsActive = false;
                return super.removeAllOwnerEvents(this, useCapture);
            }
            //_______________________________________________________________
            mouseOver__EventHandler(event) {
                if (this.mIsActive && this.mIsEnabled) {
                    let e = new AsEvent(EvItemRenderer.IR_MOUSE_OVER, false, this);
                    this.dispatchEvent(e.event);
                }
            }
            //_______________________________________________________________
            mouseOut__EventHandler(event) {
                if (this.mIsActive && this.mIsEnabled) {
                    let e = new AsEvent(EvItemRenderer.IR_MOUSE_OUT, false, this);
                    this.dispatchEvent(e.event);
                }
            }
            //_______________________________________________________________
            mouseDown__EventHandler(event) {
                if (this.isRightClick(event)) {
                    return;
                }
                if (this.mIsActive && this.mIsEnabled) {
                    let e = new AsEvent(EvItemRenderer.IR_MOUSE_DOWN, false, this);
                    this.dispatchEvent(e.event);
                }
                if (this.mIsWithEditor) {
                    this.showItemEditor();
                }
            }
            //_______________________________________________________________
            isRightClick(event) {
                var aRightClick = false;
                if (event.which) {
                    aRightClick = (event.which == 3); // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                }
                else if (event.button) {
                    aRightClick = (event.button == 2); // IE, Opera
                }
                return aRightClick;
            }
            //_______________________________________________________________
            mouseUp__EventHandler(event) {
                if (this.mIsActive && this.mIsEnabled) {
                    let e = new AsEvent(EvItemRenderer.IR_MOUSE_UP, false, this);
                    this.dispatchEvent(e.event);
                }
            }
            //_______________________________________________________________
            doubleClick__EventHandler(event) {
                if (this.mIsActive && this.mIsEnabled) {
                    let e = new AsEvent(EvItemRenderer.IR_DOUBLE_CLICK, false, this);
                    this.dispatchEvent(e.event);
                }
            }
            //__________________________________________________________________
            setHover(value) {
                if (value) {
                    this.addClass(asBase.Styles.ITEM_RENDERER_HOVERED_CLASS_NAME);
                }
                else {
                    this.removeClass(asBase.Styles.ITEM_RENDERER_HOVERED_CLASS_NAME);
                }
            }
            //__________________________________________________________________
            setSelected(value) {
                if (this.mSelected == value) {
                    return;
                }
                this.mSelected = value;
                if (this.mSelected) {
                    this.addClass(asBase.Styles.ITEM_RENDERER_SELECTED_CLASS_NAME);
                }
                else {
                    this.removeClass(asBase.Styles.ITEM_RENDERER_SELECTED_CLASS_NAME);
                }
                this.dispatchIrChangedEvent();
            }
            //_______________________________________________________________
            dispatchIrChangedEvent() {
                if (!this.mIsEnabled) {
                    return;
                }
                let aEvent = new AsEvent(EvItemRenderer.IR_CHANGED, false, this);
                this.dispatchEvent(aEvent.event);
            }
            //__________________________________________________________________
            updateView() {
                if (this.data !== null && this.data !== undefined) { // for simple type: 0
                    if (this.mDataField) {
                        this.label = this.data[this.mDataField];
                    }
                    else { // allow plain array of strings or numbers
                        this.label = this.data.toString();
                    }
                }
                if (this.mSelected) {
                    this.addClass(asBase.Styles.ITEM_RENDERER_SELECTED_CLASS_NAME);
                }
                else {
                    this.removeClass(asBase.Styles.ITEM_RENDERER_SELECTED_CLASS_NAME);
                }
            }
            //_______________________________________________________________
            dispose() {
                this.setToSleep();
                this.item = this.item_lbl = undefined;
                this.mData = this.mLabel = this.mSelected = this.mIsActive = undefined;
                super.dispose();
            }
            //_______________________________________________________________
            insertBefore(iIr) {
                if (this.mParentContainer != undefined) {
                    this.mParentContainer.insertBefore(this.contentWrapper, iIr.contentWrapper);
                }
                else {
                    if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                        console.log("ItemRenderer::insertBefore() this.mParentContainer=" + this.mParentContainer);
                    }
                }
            }
            //________________________________________________________________
            reappend() {
                if (this.mParentContainer != undefined) {
                    this.mParentContainer.appendChild(this.contentWrapper);
                }
                else {
                    if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                        console.log("ItemRenderer::reappend() this.mParentContainer=" + this.mParentContainer);
                    }
                }
            }
            //_______________________________________________________________
            include(value) {
                if (this.mInitialized) {
                    asBase.Utils.includePart(this.contentWrapper, value);
                }
                else {
                    this.mIsPartIncluded = value;
                    this.addEventListener(asBase.events.EventTypes.CREATION_COMPLITE, () => this.creationComplete__EventHandler(), this);
                }
            }
            //_______________________________________________________________
            creationComplete__EventHandler() {
                this.removeEventListener(asBase.events.EventTypes.CREATION_COMPLITE, this);
                if (this.mIsPartIncluded !== undefined) {
                    asBase.Utils.includePart(this.contentWrapper, this.mIsPartIncluded);
                    this.mIsPartIncluded = undefined;
                }
            }
            //_______________________________________________________________
            hide() {
                if (!this.mInView) {
                    return;
                }
                this.mInView = false;
                if (this.mParentContainer == undefined) {
                    return;
                }
                this.mHTMLContent = this.contentWrapper.children[0];
                this.contentWrapper.innerHTML = "";
            }
            //_______________________________________________________________
            show() {
                if (this.mInView) {
                    return;
                }
                if (!this.mIsStartInitialized) {
                    this.create();
                }
                this.mInView = true;
                if (this.mParentContainer == undefined) {
                    return;
                }
                if (this.mHTMLContent != null) {
                    this.contentWrapper.appendChild(this.mHTMLContent);
                }
            }
            //_______________________________________________________________
            updateByResponseObj(iResponseObj) {
            }
            //_______________________________________________________________
            getFocusFunction() {
                return () => this.showItemEditor();
            }
            //_______________________________________________________________
            showItemEditor() {
                if (ItemRenderer.IS_OCCASION_LOCKED) {
                    return false;
                }
                /*if (MoPermissions.permissions.isOccasionLocked(false)){
                    return;
                }*/
                if (!this.mIsWithEditor) {
                    return false;
                }
                if (!this.mIsEnabled) {
                    return false;
                }
                if (this.mIsInEditor) {
                    return false;
                }
                this.mIsInEditor = true;
                this.generalMouseClicked__EventHandler_Func = (event) => this.generalMouseClicked__EventHandler(event);
                window.addEventListener(MouseEvents.MOUSE_DOWN, this.generalMouseClicked__EventHandler_Func);
                EventManager.addEventListener(EvGeneral.ENTER_KEY_DOWN, () => this.enterKeyDown__EventHandler(), this);
                EventManager.addEventListener(EvGeneral.TAB_KEY_DOWN, () => this.tabKeyDown__EventHandler(), this);
                EventManager.addEventListener(EvGeneral.ESC_KEY_DOWN, () => this.cancelByKeyDown__EventHandler(), this);
                let e = new AsEvent(ItemRenderer.GRID_ITEM_EDITOR_START_EV, true, this);
                this.dispatchEvent(e.event);
                return true;
            }
            //_______________________________________________________________
            generalMouseClicked__EventHandler(event) {
                let aCurrentTarget = event.target;
                if (asBase.Utils.isElementIn(this.contentWrapper, aCurrentTarget)) {
                    return;
                }
                window.removeEventListener(MouseEvents.MOUSE_DOWN, this.generalMouseClicked__EventHandler_Func);
                this.generalMouseClicked__EventHandler_Func = null;
                this.saveAndClose();
            }
            //_______________________________________________________________
            enterKeyDown__EventHandler() {
                this.closeByKeyDown__EventHandler();
            }
            //_______________________________________________________________
            tabKeyDown__EventHandler() {
                this.closeByKeyDown__EventHandler();
            }
            //_______________________________________________________________
            closeByKeyDown__EventHandler() {
                this.saveAndClose();
            }
            //_______________________________________________________________
            saveAndClose() {
                this.hideItemEditor();
                let e = new AsEvent(ItemRenderer.GRID_ITEM_EDITOR_SAVE_EV, true, this);
                this.dispatchEvent(e.event);
            }
            //_______________________________________________________________
            cancelByKeyDown__EventHandler() {
                this.hideItemEditor();
                this.editorRevertData();
            }
            //_______________________________________________________________
            editorRevertData() {
                // inherit and implement
            }
            //_______________________________________________________________
            hideItemEditor() {
                this.mIsInEditor = false;
                if (!this.mIsEnabled) {
                    return;
                }
                window.removeEventListener(MouseEvents.MOUSE_DOWN, this.generalMouseClicked__EventHandler_Func);
                this.generalMouseClicked__EventHandler_Func = null;
                EventManager.removeEventListener(EvGeneral.ENTER_KEY_DOWN, this);
                EventManager.removeEventListener(EvGeneral.TAB_KEY_DOWN, this);
                EventManager.removeEventListener(EvGeneral.ESC_KEY_DOWN, this);
            }
            /*
            //_______________________________________________________________
            private wasIClicked(e:MouseEvent):boolean{
                let aRect:ClientRect = this.contentWrapper.getBoundingClientRect();
                return(asBase.math.Rectangle.intersectPoint(aRect,e.clientX,e.clientY))
            }
            */
            //***********************
            //       get/set        *
            //***********************
            //__________________________________________________________________
            get inView() {
                return this.mInView;
            }
            //__________________________________________________________________
            get data() {
                return this.mData;
            }
            //__________________________________________________________________
            get mainItem() {
                return this.item;
            }
            //__________________________________________________________________
            get attachedData() {
                return this.mAttachedData;
            }
            //__________________________________________________________________
            set attachedData(iVal) {
                this.mAttachedData = iVal;
            }
            //__________________________________________________________________
            set selected(value) {
                if (this.mSelected != value) {
                    this.setSelected(value);
                }
            }
            get selected() {
                return this.mSelected;
            }
            //__________________________________________________________________
            set hovered(value) {
                if (this.mIsHovered != value) {
                    this.mIsHovered = value;
                    this.setHover(value);
                }
            }
            get hovered() {
                return this.mIsHovered;
            }
            //__________________________________________________________________
            get dataField() {
                return this.mDataField;
            }
            //__________________________________________________________________
            set dataField(value) {
                this.mDataField = value;
            }
            //__________________________________________________________________
            get label() {
                return this.mLabel;
            }
            set label(value) {
                this.mLabel = value;
                if (this.item_lbl != undefined) {
                    this.item_lbl.innerHTML = value;
                }
            }
            //__________________________________________________________________
            get initialized() {
                return this.mInitialized;
            }
            //__________________________________________________________________
            get itemIndex() {
                return this.myIndex;
            }
            //__________________________________________________________________
            get isInEditor() {
                return this.mIsInEditor;
            }
            //__________________________________________________________________
            static get itemId() {
                return this.ITEM_ID;
            }
            //__________________________________________________________________
            static get itemLabelId() {
                return this.ITEM_LABEL_ID;
            }
        }
        //------------------------------
        // Statics
        //------------------------------
        ItemRenderer.IS_OCCASION_LOCKED = false;
        //------------------------------
        // Events
        //------------------------------
        ItemRenderer.GRID_ITEM_EDITOR_START_EV = "GridItemEditorStart__Event";
        ItemRenderer.GRID_ITEM_EDITOR_SAVE_EV = "GridItemEditorSave__Event";
        //------------------------------
        // Statics
        //------------------------------
        ItemRenderer.ITEM_ID = "item";
        ItemRenderer.ITEM_LABEL_ID = "item_lbl";
        baseclasses.ItemRenderer = ItemRenderer;
    })(baseclasses = asBase.baseclasses || (asBase.baseclasses = {}));
})(asBase || (asBase = {}));
///<reference path="../events/EventManager.ts"/>
///<reference path="../events/MouseEvents.ts"/>
///<reference path="../events/AsEvent.ts"/>
var asBase;
///<reference path="../events/EventManager.ts"/>
///<reference path="../events/MouseEvents.ts"/>
///<reference path="../events/AsEvent.ts"/>
(function (asBase) {
    var baseclasses;
    (function (baseclasses) {
        var EventManager = asBase.events.EventManager;
        var EventTypes = asBase.events.EventTypes;
        var AsEvent = asBase.events.AsEvent;
        class PopUpWindow extends asBase.CoComponentBase {
            constructor(iWindowSkin, iHTMLElement) {
                super(null, iWindowSkin, iHTMLElement);
                this.mIsShow = false;
                this.mIsOpened = false;
                this.mIsBlockApp = false;
                this.mIsWithFullBlockApp = false;
            }
            //____________________________________________________________________
            creationComplete() {
                this.popup_content = this.getPart("popup_content");
                this.popup_div = this.getPart("popup_div");
                if (this.mIsShow) {
                    this.addEventListeners();
                    this.dispatchShowEvent(this.mIsBlockApp, this.mIsWithFullBlockApp);
                    this.mIsShow = false;
                    this.showInit();
                }
                this.popup_div.parentElement.style.height = "auto";
            }
            //____________________________________________________________________
            show(iCallBackFunction = null, iIsBlockApp = false, iIsBlockFullApp = false) {
                if (this.isOpened) {
                    return;
                }
                this.mIsBlockApp = iIsBlockApp;
                this.mIsWithFullBlockApp = iIsBlockFullApp;
                this.mCallBackFunc = iCallBackFunction;
                if (this.popup_div) {
                    this.addEventListeners();
                    this.dispatchShowEvent(iIsBlockApp, iIsBlockFullApp);
                }
                else {
                    this.mIsShow = true;
                }
                this.mIsOpened = true;
                if (this.isInitialized) {
                    this.showInit();
                }
            }
            //____________________________________________________________________
            showInit() {
            }
            //____________________________________________________________________
            hide() {
                if (!this.isOpened) {
                    return;
                }
                this.removeEventListeners();
                this.removeBlockModalListeners();
                this.dispatchHideEvent();
                this.mIsOpened = false;
                this.hideReset();
            }
            //____________________________________________________________________
            hideReset() {
            }
            //____________________________________________________________________
            addEventListeners() {
            }
            //____________________________________________________________________
            removeEventListeners() {
            }
            //____________________________________________________________________
            addBlockModalListeners() {
                this.blockModal__EventHandler_Func = () => this.blockModal__EventHandler();
                this.popup_div.addEventListener(PopUpWindow.BLOCK_POPUP, this.blockModal__EventHandler_Func);
                this.unBlockModal__EventHandler_Func = () => this.unBlockModal__EventHandler();
                this.popup_div.addEventListener(PopUpWindow.UNBLOCK_POPUP, this.unBlockModal__EventHandler_Func);
            }
            //____________________________________________________________________
            removeBlockModalListeners() {
                if (this.blockModal__EventHandler_Func) {
                    this.popup_div.removeEventListener(PopUpWindow.BLOCK_POPUP, this.blockModal__EventHandler_Func);
                    this.blockModal__EventHandler_Func = null;
                }
                if (this.unBlockModal__EventHandler_Func) {
                    this.popup_div.removeEventListener(PopUpWindow.UNBLOCK_POPUP, this.unBlockModal__EventHandler_Func);
                    this.unBlockModal__EventHandler_Func = null;
                }
            }
            //____________________________________________________________________
            dispatchShowEvent(iIsBlockApp = false, iIsBlockFullApp = false) {
                let aData = new Object();
                aData.window = this.popup_div;
                aData.isBlockApp = iIsBlockApp;
                aData.isBlockFullApp = iIsBlockFullApp;
                EventManager.dispatchEvent(EventTypes.SHOW_POPUP_WINDOW, this, aData);
            }
            //____________________________________________________________________
            dispatchHideEvent() {
                EventManager.dispatchEvent(EventTypes.HIDE_POPUP_WINDOW, this, this.popup_div);
                let e = new AsEvent(EventTypes.CLOSE, false, this);
                this.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            blockModal__EventHandler() {
                if (this.popup_content) {
                    asBase.Utils.addClassToElement(this.popup_content, "mouseDisabled");
                }
            }
            //____________________________________________________________________
            unBlockModal__EventHandler() {
                if (this.popup_content) {
                    asBase.Utils.removeClassFromElement(this.popup_content, "mouseDisabled");
                }
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________
            get isOpened() {
                return this.mIsOpened;
            }
        }
        //------------------------------
        // Events
        //------------------------------
        PopUpWindow.BLOCK_POPUP = "BlockModal__EV";
        PopUpWindow.UNBLOCK_POPUP = "UnBlockModal__EV";
        baseclasses.PopUpWindow = PopUpWindow;
    })(baseclasses = asBase.baseclasses || (asBase.baseclasses = {}));
})(asBase || (asBase = {}));
///<reference path="../events/EventDispatcher.ts"/>
var asBase;
///<reference path="../events/EventDispatcher.ts"/>
(function (asBase) {
    var baseclasses;
    (function (baseclasses) {
        class Timer extends asBase.events.EventDispatcher {
            constructor(iDelay, iRepeatCount = 0) {
                super();
                this.mDelay = iDelay;
                this.mRepeatCount = iRepeatCount;
                this.mIsRunning = false;
            }
            //____________________________________________________________________
            start() {
                this.mTimer = 0;
                this.mCurrentCount = 0;
                this.mTimer = setInterval(() => this.tick(), this.mDelay);
                this.mIsRunning = true;
            }
            //____________________________________________________________________
            tick() {
                this.mCurrentCount++;
                this.dispatchEvent(Timer.TIMER);
            }
            //____________________________________________________________________
            stop() {
                this.mIsRunning = false;
                clearInterval(this.mTimer);
            }
            //____________________________________________________________________
            reset() {
                this.stop();
                this.start();
            }
            //____________________________________________________________________
            get running() {
                return this.mIsRunning;
            }
            //____________________________________________________________________
            get currentCount() {
                return this.mCurrentCount;
            }
            set currentCount(value) {
                this.mCurrentCount = value;
            }
        }
        //------------------------------
        // Event
        //------------------------------
        Timer.TIMER = "timer";
        baseclasses.Timer = Timer;
    })(baseclasses = asBase.baseclasses || (asBase.baseclasses = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    class CoClassFactory {
        constructor(iContextWindow) {
            this.iContextWindow = iContextWindow;
        }
        getInstance(iClassPath, ...args) {
            const aClassPathLength = iClassPath.length;
            for (let i = 0; i < aClassPathLength - 1; ++i) {
                this.iContextWindow = this.iContextWindow[iClassPath[i]];
            }
            let aClass = iClassPath[aClassPathLength - 1];
            let aConstructor = this.iContextWindow[aClass];
            if (!aConstructor) {
                throw new Error("CoClassFactory: Class '" + aClass + "' was not found!  ---> Check full path: " + iClassPath.join("."));
            }
            const instance = Object.create(aConstructor.prototype);
            args = [{}].concat(args[0]);
            const factoryFunction = instance.constructor.bind.apply(instance.constructor, args);
            return new factoryFunction();
        }
    }
    asBase.CoClassFactory = CoClassFactory;
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var collections;
    (function (collections) {
        class DaArrayCollection {
            constructor(iData, iIr) {
                if (iData === null || iData === undefined) {
                    return;
                }
                this.mData = iData;
                this.mIr = iIr;
            }
            //__________________________________________________________________
            dispose() {
                this.mData = null;
                this.mIr = null;
            }
            //__________________________________________________________________
            reappend() {
                if (this.mIr) {
                    this.mIr.reappend();
                }
            }
            //__________________________________________________________________
            inView(iVal) {
                if (iVal) {
                    if (this.ir) {
                        this.ir.show();
                    }
                }
                else {
                    if (this.ir) {
                        this.ir.hide();
                    }
                }
            }
            //__________________________________________________________________
            get height() {
                if (this.ir) {
                    let aIrClientRect = this.ir.clientRect;
                    if (aIrClientRect) {
                        return aIrClientRect.height;
                    }
                }
                return 0;
            }
            //***********************
            //       get/set        *
            //***********************
            //__________________________________________________________________
            get data() {
                return this.mData;
            }
            set data(value) {
                this.mData = value;
            }
            //__________________________________________________________________
            get ir() {
                return this.mIr;
            }
            set ir(value) {
                this.mIr = value;
            }
        }
        collections.DaArrayCollection = DaArrayCollection;
    })(collections = asBase.collections || (asBase.collections = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var collections;
    (function (collections) {
        class Sort {
            constructor() {
                this.mNoFieldsDescending = false;
                this.mSortBuilderRepeatFunction = (iDaItems) => this.sortReappend(iDaItems);
            }
            //________________________________________________________________
            findItem(iItems, iValues, iMode, iReturnInsertionIndex, iCompareFunction) {
                var aCompareForFind;
                var aFieldsForCompare;
                if (iItems == undefined) {
                    return -1;
                }
                else if (iItems.length == 0) {
                    return iReturnInsertionIndex ? 1 : -1;
                }
                if (iCompareFunction == null) {
                    aCompareForFind = this.compareFunction;
                    // configure the search criteria
                    if (iValues && this.mFieldList.length > 0) {
                        aFieldsForCompare = [];
                        //build up the fields we can compare, if we skip a field in the
                        //middle throw an error.  it is ok to not have all the fields
                        //though
                        let aFieldName;
                        for (let i = 0; i < this.mFieldList.length; i++) {
                            aFieldName = this.mFieldList[i];
                            if (aFieldName) {
                                let aHasFieldName = false;
                                aHasFieldName = iValues.data[aFieldName] != null;
                                if (aHasFieldName) {
                                    aFieldsForCompare.push(aFieldName);
                                }
                            }
                            else {
                                //this is ok because sometimes a sortfield might
                                //have a custom comparator
                                aFieldsForCompare.push(null);
                            }
                        }
                        if (aFieldsForCompare.length == 0) {
                            return -1;
                        }
                        else {
                            this.initSortFields(iItems[0]);
                        }
                    }
                }
                else {
                    aCompareForFind = iCompareFunction;
                }
                // let's begin searching
                var aFound = false;
                var aObjFound = false;
                var aIndex = 0;
                var aLowerBound = 0;
                var aUpperBound = iItems.length - 1;
                var aObj = null;
                var aDirection = 1;
                while (!aObjFound && (aLowerBound <= aUpperBound)) {
                    aIndex = Math.round((aLowerBound + aUpperBound) / 2);
                    aObj = iItems[aIndex];
                    //if we were given fields for comparison use that method, but
                    //if not the comparator may be for SortField in which case
                    //it'd be an error to pass a 3rd parameter
                    if (aFieldsForCompare) {
                        aDirection = aCompareForFind.call(this, iValues, aObj, aFieldsForCompare);
                    }
                    else {
                        aDirection = aCompareForFind.call(this, iValues, aObj);
                    }
                    switch (aDirection) {
                        case -1:
                            aUpperBound = aIndex - 1;
                            break;
                        case 0:
                            aObjFound = true;
                            switch (iMode) {
                                case Sort.ANY_INDEX_MODE:
                                    aFound = true;
                                    break;
                                case Sort.FIRST_INDEX_MODE:
                                    aFound = (aIndex == aLowerBound);
                                    // start looking towards bof
                                    var aObjIndex = aIndex - 1;
                                    var aMatch = true;
                                    while (aMatch && !aFound && (aObjIndex >= aLowerBound)) {
                                        aObj = iItems[aObjIndex];
                                        var prevCompare = aFieldsForCompare
                                            ? aCompareForFind(iValues, aObj, aFieldsForCompare)
                                            : aCompareForFind(iValues, aObj);
                                        aMatch = (prevCompare == 0);
                                        if (!aMatch || (aMatch && (aObjIndex == aLowerBound))) {
                                            aFound = true;
                                            aIndex = aObjIndex + (aMatch ? 0 : 1);
                                        } // if match
                                        aObjIndex--;
                                    } // while
                                    break;
                                case Sort.LAST_INDEX_MODE:
                                    // if we where already at the edge case then we already found the last value
                                    aFound = (aIndex == aUpperBound);
                                    // start looking towards eof
                                    aObjIndex = aIndex + 1;
                                    aMatch = true;
                                    while (aMatch && !aFound && (aObjIndex <= aUpperBound)) {
                                        aObj = iItems[aObjIndex];
                                        var aNextCompare = aFieldsForCompare
                                            ? aCompareForFind(iValues, aObj, aFieldsForCompare)
                                            : aCompareForFind(iValues, aObj);
                                        aMatch = (aNextCompare == 0);
                                        if (!aMatch || (aMatch && (aObjIndex == aUpperBound))) {
                                            aFound = true;
                                            aIndex = aObjIndex - (aMatch ? 0 : 1);
                                        } // if match
                                        aObjIndex++;
                                    } // while
                                    break;
                                default:
                                    return -1;
                            } // switch
                            break;
                        case 1:
                            aLowerBound = aIndex + 1;
                            break;
                    } // switch
                } // while
                if (!aFound && !iReturnInsertionIndex) {
                    return -1;
                }
                else {
                    return (aDirection > 0) ? aIndex + 1 : aIndex;
                }
            }
            /**
             *  Make sure all SortFields are ready to execute their comparators.
             */
            initSortFields(iItem, iBuildArraySortArgs) {
                let aArraySortArgs = undefined;
                for (let i = 0; i < this.fields.length; i++) {
                    this.fields[i].initializeDefaultCompareFunction(iItem.data);
                }
                if (iBuildArraySortArgs) {
                    aArraySortArgs = { fields: [], options: [] };
                    for (let i = 0; i < this.fields.length; i++) {
                        const aSortField = this.fields[i];
                        const aOptions = aSortField.arraySortOnOptions;
                        if (aOptions == -1) {
                            return null;
                        }
                        else {
                            aArraySortArgs.fields.push(aSortField.name);
                            aArraySortArgs.options.push(aOptions);
                        }
                    }
                }
                return aArraySortArgs;
            }
            /**
         *  If the sort does not have any sort fields nor a custom comparator
         *  just use an empty SortField object and have it use its default
         *  logic.
         */
            noFieldsCompare(iA, iB, iFields) {
                if (!this.mDefaultEmptyField) {
                    this.mDefaultEmptyField = new collections.SortField();
                    this.mDefaultEmptyField.initializeDefaultCompareFunction(iA);
                }
                let oResult = this.mDefaultEmptyField.compareFunction.call(this, [iA, iB]);
                if (this.mNoFieldsDescending) {
                    oResult *= -1;
                }
                return oResult;
            }
            //________________________________________________________________
            propertyAffectsSort(iProperty) {
                if (this.mUsingCustomCompareFunction || this.fields == undefined) {
                    return true;
                }
                for (let i = 0; i < this.fields.length; i++) {
                    var aSortField = this.fields[i];
                    if (aSortField.name == iProperty || aSortField.usingCustomCompareFunction) {
                        return true;
                    }
                }
                return false;
            }
            //________________________________________________________________
            reverse() {
                if (this.fields != undefined) {
                    for (let i = 0; i < this.fields.length; i++) {
                        this.fields[i].reverse();
                    }
                }
                this.mNoFieldsDescending = !this.mNoFieldsDescending;
            }
            //________________________________________________________________
            getIndex(iDaItems, iItem) {
                if (!iDaItems || iDaItems.length < 1) {
                    return 0;
                }
                this.initSortFields(iItem);
                let aSortFunction;
                if (this.mUsingCustomCompareFunction) {
                    aSortFunction = (iA, iB) => this.fixedCompareFunction(iA, iB);
                }
                else {
                    aSortFunction = (iA, iB) => this.internalCompare(iA, iB);
                }
                for (let i = 0; i < iDaItems.length; i++) {
                    if (aSortFunction(iDaItems[i], iItem) > 0) {
                        return (i);
                    }
                }
                return -1;
            }
            //________________________________________________________________
            sort(iDaItems, iReappend = true) {
                if (!iDaItems || iDaItems.length < 1) {
                    return;
                }
                if (this.mUsingCustomCompareFunction) {
                    if (this.unique) {
                        const aUniqueRet1 = iDaItems.sort(this.fixedCompareFunction /*, ArrayCollection.UNIQUESORT*/);
                        if (aUniqueRet1 == 0) {
                            return;
                        }
                    }
                    else {
                        iDaItems.sort(this.fixedCompareFunction);
                    }
                }
                else {
                    if (this.fields && this.fields.length > 0) {
                        //doing the init value each time may be a little inefficient
                        //but allows for the data to change and the comparators
                        //to update correctly
                        //the sortArgs is an object that if non-null means
                        //we can use Array.sortOn which will be much faster
                        //than going through internalCompare.  However
                        //if the Sort is supposed to be unique and fields.length > 1
                        //we cannot use sortOn since it only tests uniqueness
                        //on the first field
                        const sortArgs = this.initSortFields(iDaItems[0], true);
                        if (this.unique) {
                            const aUniqueRet2 = iDaItems.sort((iA, iB) => this.internalCompare(iA, iB) /*, ArrayCollection.UNIQUESORT*/);
                            if (aUniqueRet2 == 0) {
                                return;
                            }
                        }
                        else {
                            iDaItems.sort((iA, iB) => this.internalCompare(iA, iB));
                        }
                    }
                    else {
                        iDaItems.sort((iA, iB) => this.internalCompare(iA, iB));
                    }
                }
                if (iReappend) {
                    this.sortBuilder(iDaItems);
                }
            }
            //_______________________________________________________________
            sortBuilder(iDaItems) {
                this.mStartTime = new Date().getTime();
                if (iDaItems.length > 0) {
                    this.mItemIterator = 0;
                    clearTimeout(this.mBuildProgressTimeout);
                    this.mBuildProgressTimeout = setTimeout(this.mSortBuilderRepeatFunction(iDaItems), 0);
                }
            }
            //__________________________________________________________________
            sortReappend(iDaItems) {
                const aTime = new Date().getTime();
                while ((new Date().getTime() - aTime < 50) && (this.mItemIterator < iDaItems.length)) {
                    iDaItems[this.mItemIterator].reappend();
                    this.mItemIterator++;
                }
                if (this.mItemIterator < iDaItems.length) {
                    clearTimeout(this.mBuildProgressTimeout);
                    this.mBuildProgressTimeout = setTimeout(this.mSortBuilderRepeatFunction(iDaItems), 0);
                }
            }
            /**
             *  Compares the values specified based on the sort field options specified
             *  for this sort.  The fields parameter is really just used to get the
             *  number of fields to check.  We don't look at the actual values
             *  to see if they match the actual sort.
             */
            internalCompare(iA, iB, iFields) {
                let oResult = 0;
                if (!this.mFields) {
                    oResult = this.noFieldsCompare(iA.data, iB.data, iFields);
                }
                else {
                    let aFieldsLength = iFields ? iFields.length : this.mFields.length;
                    for (var i = 0; i < aFieldsLength; i++) {
                        const aSortField = this.mFields[i];
                        oResult = aSortField.compareFunction.call(this, iA.data, iB.data);
                        if (aSortField.descending) {
                            oResult *= -1;
                        }
                        if (oResult != 0) {
                            return oResult;
                        }
                    }
                }
                return oResult;
            }
            //________________________________________________________________
            fixedCompareFunction(iA, iB) {
                // append our fields to the call, since items.sort() won't
                return this.compareFunction.call(this, [iA, iB, this.mFields]);
            }
            //________________________________________________________________
            dispose() {
                if (this.mFields) {
                    this.mFields.splice(0);
                }
                if (this.mFieldList) {
                    this.mFieldList.splice(0);
                }
                this.mSortBuilderRepeatFunction = null;
                if (this.mDefaultEmptyField) {
                    this.mDefaultEmptyField.dispose();
                    this.mDefaultEmptyField = null;
                }
                this.mCompareFunction = null;
            }
            //***********************
            //       get/set        *
            //***********************
            //________________________________________________________________
            get compareFunction() {
                return this.mUsingCustomCompareFunction ? this.mCompareFunction : (iA, iB, iFields) => this.internalCompare(iA, iB, iFields);
            }
            set compareFunction(value) {
                this.mCompareFunction = value;
                this.mUsingCustomCompareFunction = this.mCompareFunction != undefined;
            }
            //________________________________________________________________
            get fields() {
                return this.mFields;
            }
            set fields(value) {
                this.mFields = value;
                this.mFieldList = [];
                if (this.mFields) {
                    for (let i = 0; i < this.mFields.length; i++) {
                        let aSortField = this.mFields[i];
                        this.mFieldList.push(aSortField.name);
                    }
                }
            }
            //________________________________________________________________
            get unique() {
                return this.mUnique;
            }
            set unique(value) {
                this.mUnique = value;
            }
        }
        Sort.ANY_INDEX_MODE = "any";
        Sort.FIRST_INDEX_MODE = "FIRST_INDEX_MODE";
        Sort.LAST_INDEX_MODE = "LAST_INDEX_MODE";
        collections.Sort = Sort;
    })(collections = asBase.collections || (asBase.collections = {}));
})(asBase || (asBase = {}));
/// <reference path="./DaArrayCollection.ts" />
/// <reference path="../../asBase/collections/Sort.ts" />
/// <reference path="../../asBase/collections/ICollectionView.ts" />
/// <reference path="../../asBase/events/EventManager.ts" />
///<reference path="../../asBase/events/EventDispatcher.ts"/>
var asBase;
/// <reference path="./DaArrayCollection.ts" />
/// <reference path="../../asBase/collections/Sort.ts" />
/// <reference path="../../asBase/collections/ICollectionView.ts" />
/// <reference path="../../asBase/events/EventManager.ts" />
///<reference path="../../asBase/events/EventDispatcher.ts"/>
(function (asBase) {
    var baseclasses;
    (function (baseclasses) {
        var Sort = asBase.collections.Sort;
        var DaArrayCollection = asBase.collections.DaArrayCollection;
        var EventManager = asBase.events.EventManager;
        var EventDispatcher = asBase.events.EventDispatcher;
        class ArrayCollection extends EventDispatcher {
            constructor(iDaSource = null, iHasView = true) {
                super();
                //------------------------------
                // Members
                //------------------------------
                this.POSITION_APPEND_INDEX = -1;
                this.POSITION_REMOVE_INDEX = -2;
                this.mIsNeedItemRenderers = true;
                this.mNotifyOnItemAdded = false;
                this.mIsEnabled = true;
                this.mRevision = 0;
                ArrayCollection.mInstanceCounter++;
                this.mId = "AC_" + ArrayCollection.mInstanceCounter;
                if (!iDaSource) {
                    iDaSource = new baseclasses.AcArray();
                }
                this.mHasView = iHasView;
                this.mLocalIndex = null;
                if (iDaSource) {
                    this.mOriginalArray = iDaSource;
                    this.mOriginalArray.removePushedItems();
                    if (this.mOriginalArray.addCallback) {
                        this.mAcCallback = (iType, iValue) => this.originalArrayUpdated(iType, iValue);
                        this.mOriginalArray.addCallback(this.mAcCallback);
                    }
                    this.addItems(iDaSource);
                }
            }
            //_______________________________________________________________
            invalidateList() {
                if (this.mRelatedList) {
                    this.mRelatedList.isInvalidList = true;
                }
            }
            //_______________________________________________________________
            originalArrayUpdated(iType, iValue) {
                this.invalidateList();
                switch (iType) {
                    case baseclasses.AcArray.REFRESH:
                        this.addItems(iValue); // add
                        break;
                    case baseclasses.AcArray.PUSH: // add
                        let aIsArray = iValue instanceof Array;
                        if (aIsArray) {
                            this.addItems(iValue);
                        }
                        else {
                            this.addItems([iValue]);
                        }
                        break;
                    case baseclasses.AcArray.UNSHIFT: // add (array)
                        this.addItems(iValue, 0);
                        break;
                    case baseclasses.AcArray.POP: // remove
                    case baseclasses.AcArray.SHIFT:
                        this.removeItemsNotified([iValue], 0);
                        break;
                    case baseclasses.AcArray.SPLICE: // add or remove
                        if (iValue.spliced.length > 0) { //remove
                            this.removeItemsNotified(iValue.spliced, iValue.index);
                        }
                        else if (iValue.items && iValue.items.length > 0) {
                            this.addItems(iValue.items, iValue.index);
                        }
                        break;
                }
            }
            //_______________________________________________________________
            sourceToDataArray() {
                return this.buildDataArray(this.source);
            }
            //_______________________________________________________________
            localToDataArray() {
                return this.buildDataArray(this.mLocalIndex);
            }
            //_______________________________________________________________
            toDataArray() {
                return this.mLocalIndex != null ? this.localToDataArray() : this.sourceToDataArray();
            }
            //_______________________________________________________________
            get currentArray() {
                return this.mLocalIndex != null ? this.mLocalIndex : this.source;
            }
            //_______________________________________________________________
            get originalArray() {
                return this.mOriginalArray;
            }
            //_______________________________________________________________
            buildDataArray(iItems) {
                let aDataArray = new baseclasses.AcArray();
                if (iItems) {
                    for (let i = 0; i < iItems.length; i++) {
                        let aItem = iItems[i];
                        aDataArray.push(aItem.data);
                    }
                }
                return aDataArray;
            }
            //_______________________________________________________________
            /**
             * Init source array with just the data, the ir will be added later in addDataGroupToSource()
             */
            convertToSourceArray(iDataArray, iIndex = -1) {
                if (iIndex < 0) {
                    iIndex = this.source.length;
                }
                if (iDataArray.length) {
                    let aDataCollectionsArray = new Array();
                    for (let i = 0; i < iDataArray.length; ++i) {
                        aDataCollectionsArray.push(this.createDataCollection(iDataArray[i]));
                    }
                    this.source.splice(iIndex, 0, ...aDataCollectionsArray);
                }
                if (iDataArray.length > 1) {
                    this.mLocalIndex = null;
                }
                if (iDataArray.length) {
                    this.dispatchGetIr(iDataArray, iIndex);
                }
            }
            //_______________________________________________________________
            createDataCollection(iData) {
                this.addDataListener(iData);
                return new DaArrayCollection(iData);
            }
            //_______________________________________________________________
            addDataListener(iData) {
                if (iData.addEventListener) {
                    iData.addEventListener(ArrayCollection.COLLECTION_IR_DATA_CHANGED, (iData) => this.irDataChanged__EventHandler(iData), this);
                }
            }
            //_______________________________________________________________
            removeDataListener(iData) {
                if (iData.removeEventListener) {
                    iData.removeEventListener(ArrayCollection.COLLECTION_IR_DATA_CHANGED, this);
                }
            }
            //_______________________________________________________________
            addIrToSource(iIr) {
                this.setIrByData(iIr);
                let aRepositionIndex = this.getIndexPositionIr(iIr);
                this.repositionIr(iIr, aRepositionIndex);
                if (this.mNotifyOnItemAdded) {
                    this.dispatchEvent(ArrayCollection.COLLECTION_ITEM_ADDED, this.source[this.source.length - 1].data);
                }
                this.isNeedItemRenderers = false;
            }
            //_______________________________________________________________
            repositionIr(iIr, iRepositionIndex) {
                switch (iRepositionIndex) {
                    case this.POSITION_REMOVE_INDEX:
                        let aItem = this.source[this.source.length - 1];
                        this.filterRemoveItem(aItem);
                        break;
                    case this.POSITION_APPEND_INDEX:
                        iIr.reappend();
                        break;
                    default:
                        iIr.insertBefore(this.mLocalIndex[iRepositionIndex].ir);
                        break;
                }
            }
            //_________________________________________________________________________
            getIndexPositionIr(iIr) {
                let aRepositionIndex = this.POSITION_REMOVE_INDEX;
                let aItem = this.source[this.source.length - 1];
                let aIsPassedFilter = true;
                if (this.mFilterFunction != null) {
                    aIsPassedFilter = this.mFilterFunction.call(this, aItem);
                }
                if (aIsPassedFilter) {
                    if (this.mLocalIndex == null || this.mLocalIndex.length == 0) {
                        return this.POSITION_APPEND_INDEX;
                    }
                    if (this.sort != null) {
                        aRepositionIndex = this.sort.getIndex(this.mLocalIndex, aItem);
                    }
                }
                return aRepositionIndex;
            }
            //_______________________________________________________________
            /**
             * Add the ir to the source array
             */
            addDataGroupToSource(iBuiltIrs) {
                for (let aIr of iBuiltIrs) {
                    this.setIrByData(aIr);
                }
                if (this.mNotifyOnItemAdded && iBuiltIrs && iBuiltIrs.length > 0) {
                    this.dispatchEvent(ArrayCollection.COLLECTION_ITEM_ADDED, this.source[this.source.length - 1].data);
                }
                this.isNeedItemRenderers = false;
            }
            //_______________________________________________________________
            irDataChanged__EventHandler(iData) {
                let aIr = this.getItemRendererByData(iData);
                if (aIr && aIr.initialized) {
                    aIr.updateView();
                    this.dispatchEvent(ArrayCollection.COLLECTION_IR_DATA_CHANGED, iData);
                }
            }
            //_______________________________________________________________
            setIrByData(iIr) {
                let aIndex = this.getSourceArrayIndex(iIr.data);
                if (aIndex > -1) {
                    this.source[aIndex].ir = iIr;
                }
            }
            //_______________________________________________________________
            addItems(iDataArray, iIndex = -1) {
                if (iIndex < 0) {
                    iIndex = this.source.length;
                }
                this.convertToSourceArray(iDataArray, iIndex);
            }
            //_______________________________________________________________
            removeItemsNotified(iRemovedDataItems, iIndex) {
                this.removeItemsFromCollection(iRemovedDataItems, iIndex);
            }
            //_______________________________________________________________
            removeItem(iData) {
                for (let i = 0; i < this.length; ++i) {
                    if (this.currentArray[i].data == iData) {
                        this.removeItemAt(i);
                        break;
                    }
                }
            }
            //_______________________________________________________________
            clone() {
                let aNewCollection;
                if (this.mOriginalArray != null) {
                    aNewCollection = new ArrayCollection(this.mOriginalArray.clone());
                }
                else {
                    aNewCollection = new ArrayCollection();
                    aNewCollection.convertToSourceArray(this.sourceToDataArray());
                }
                aNewCollection.filterFunction = this.filterFunction;
                aNewCollection.sort = this.sort;
                return aNewCollection;
            }
            //_______________________________________________________________
            softClone() {
                let aNewCollection;
                if (this.mOriginalArray != null) {
                    aNewCollection = new ArrayCollection(this.mOriginalArray);
                }
                else {
                    aNewCollection = new ArrayCollection();
                    aNewCollection.convertToSourceArray(this.sourceToDataArray());
                }
                aNewCollection.filterFunction = this.filterFunction;
                aNewCollection.sort = this.sort;
                return aNewCollection;
            }
            //_______________________________________________________________
            cloneTypicalData() {
                let aClonedData = {};
                if (this.source.length > 0) {
                    let aTypicalData = this.source[0].data;
                    for (let key in aTypicalData) {
                        if (aTypicalData.hasOwnProperty(key)) {
                            aClonedData[key] = aTypicalData[key];
                        }
                    }
                    return aClonedData;
                }
                return null;
            }
            //_______________________________________________________________
            reappendItem(iData) {
                let aIr = this.getItemRendererByData(iData);
                let aRepositionIndex = this.getIndexPositionIr(aIr);
                this.repositionIr(aIr, aRepositionIndex);
            }
            //_______________________________________________________________
            addItem(iData) {
                this.addItemAt(iData, this.source.length);
            }
            //_______________________________________________________________
            addItemAt(iData, iIndex) {
                if (iIndex > this.source.length || iIndex < 0) {
                    return;
                }
                if (this.mOriginalArray != null) {
                    this.mOriginalArray.splice(iIndex, 0, iData);
                }
                else {
                    this.source.splice(iIndex, 0, this.createDataCollection(iData));
                    this.isNeedItemRenderers = true;
                    this.dispatchGetIr([iData], iIndex);
                }
            }
            //_______________________________________________________________
            dispatchGetIr(iDataArray, iIndex) {
                this.isNeedItemRenderers = true;
                this.dispatchEvent(ArrayCollection.COLLECTION_GET_IR, iDataArray);
            }
            //_______________________________________________________________
            getDataCollectionAt(iIndex) {
                if (iIndex >= this.length || iIndex < 0) {
                    return null;
                }
                return this.currentArray[iIndex];
            }
            //_______________________________________________________________
            getItemAt(iIndex) {
                if (iIndex >= this.length || iIndex < 0) {
                    return ArrayCollection.ITEM_NOT_FOUND;
                }
                return this.currentArray[iIndex].data;
            }
            //_______________________________________________________________
            removeAllIrs() {
                if (this.source.length > 0) {
                    for (let i = 0; i < this.source.length; ++i) {
                        this.removeIrFromItem(this.source[i]);
                    }
                    this.isNeedItemRenderers = true;
                    this.mLocalIndex = null;
                }
            }
            //__________________________________________________________________
            updateAllByResponseObj(iResponseObj) {
                for (let i = 0; i < this.source.length; ++i) {
                    if (this.source[i].ir) {
                        this.updateDataByResponseObj(this.source[i], iResponseObj);
                    }
                }
            }
            //__________________________________________________________________
            updateDataByResponseObj(iItem, iResponseObj) {
                iItem.ir.updateByResponseObj(iResponseObj);
            }
            //_______________________________________________________________
            removeIrFromItem(iItem) {
                if (iItem.ir) {
                    iItem.ir.dispose();
                    iItem.ir = null;
                }
            }
            //_______________________________________________________________
            removeAll() {
                this.clear();
            }
            //_______________________________________________________________
            removeAllArrayCollection() {
                this.mFilterFunction = null;
                if (this.mLocalIndex != null) {
                    this.mLocalIndex.splice(0);
                    this.mLocalIndex = null;
                }
                this.mSort = null;
                while (this.length) {
                    let aDaRemovedItems = this.source.splice(0, 1);
                    this.removeIrFromItem(aDaRemovedItems[0]);
                }
                EventManager.dispatchEvent(ArrayCollection.COLLECTION_ALL_ITEMS_REMOVED, this);
            }
            //_______________________________________________________________
            removeItemAt(iIndex) {
                if (iIndex > this.length || iIndex < 0) {
                    return ArrayCollection.ITEM_NOT_FOUND;
                }
                let aDaRemovedItem = this.getItemAt(iIndex);
                this.mLocalIndex = null;
                let aRemovedIndex = this.getSourceArrayIndex(aDaRemovedItem);
                if (aRemovedIndex > this.length || aRemovedIndex < 0) {
                    return ArrayCollection.ITEM_NOT_FOUND;
                }
                if (this.mOriginalArray != null) {
                    this.mOriginalArray.splice(aRemovedIndex, 1);
                }
                else {
                    this.removeItemsFromCollection([aDaRemovedItem], aRemovedIndex);
                }
                return aDaRemovedItem;
            }
            //_______________________________________________________________
            removeItemsFromCollection(iRemovedDataItems, iIndex) {
                let aLocalIndex = -1;
                let aRemovedFirstSourceIndex;
                for (let i = 0; i < iRemovedDataItems.length; ++i) {
                    let aRemovedData = iRemovedDataItems[i];
                    let aRemovedSourceIndex = this.getSourceArrayIndex(aRemovedData);
                    let aRemovedIr = this.getItemRendererByData(aRemovedData);
                    if (i == 0) {
                        aLocalIndex = this.getCurrentArrayIndex(aRemovedData);
                        aRemovedFirstSourceIndex = aRemovedSourceIndex;
                    }
                    EventManager.dispatchEvent(ArrayCollection.COLLECTION_ITEM_REMOVED, this, {
                        ir: aRemovedIr,
                        index: aRemovedSourceIndex,
                    });
                }
                this.removeItemsFromArrays(iRemovedDataItems, aRemovedFirstSourceIndex, aLocalIndex);
            }
            //_______________________________________________________________
            removeItemsFromArrays(iRemovedDataItems, iRemovedFirstSourceIndex, iLocalIndex) {
                let aIsEmptyingSource = (this.source.length == iRemovedDataItems.length);
                if (iRemovedFirstSourceIndex > -1) {
                    this.source.splice(iRemovedFirstSourceIndex, iRemovedDataItems.length);
                }
                this.removeItemsFromLocal(iRemovedDataItems, iLocalIndex, aIsEmptyingSource);
            }
            //_______________________________________________________________
            removeItemsFromLocal(aRemovedDataItems, iIndex, iIsEmptyingSource) {
                if (this.mLocalIndex) {
                    if (iIsEmptyingSource) {
                        this.mLocalIndex.splice(0);
                        this.mLocalIndex = null;
                    }
                    else if (iIndex > -1) {
                        this.mLocalIndex.splice(iIndex, aRemovedDataItems.length);
                    }
                }
            }
            //_______________________________________________________________
            refresh() {
                if (this.isNeedItemRenderers == false || this.mHasView == false) {
                    let aIsAcRefreshed = false;
                    if (this.originalArray != null) {
                        aIsAcRefreshed = this.originalArray.refresh();
                    }
                    if (!aIsAcRefreshed) {
                        this.internalRefresh();
                        if (this.mRelatedList) {
                            this.mRelatedList.dispatchCollectionRefreshBuildComplete();
                        }
                    }
                }
            }
            //_______________________________________________________________
            areAllIrsInitialized() {
                for (let i = 0; i < this.length; ++i) {
                    let aIr = this.currentArray[i].ir;
                    if (aIr == null || !aIr.initialized) {
                        return false;
                    }
                }
                return true;
            }
            //_______________________________________________________________
            getCurrentArrayIndex(iData) {
                for (let i = 0; i < this.length; ++i) {
                    if (this.currentArray[i].data === iData) {
                        return i;
                    }
                }
                return -1;
            }
            //_______________________________________________________________
            getAllIndices() {
                let aIndices = [];
                for (let i = 0; i < this.source.length; ++i) {
                    aIndices.push(i);
                }
                return aIndices;
            }
            //_______________________________________________________________
            getSourceArrayIndex(iData) {
                for (let i = 0; i < this.source.length; ++i) {
                    if (this.source[i].data == iData) {
                        return i;
                    }
                }
                return -1;
            }
            //_______________________________________________________________
            updateView() {
                let a = new Date().getTime();
                for (let i = 0; i < this.length; ++i) {
                    let aDaItem = this.currentArray[i];
                    let aIr = aDaItem.ir;
                    if (aIr) {
                        if (aIr.initialized) {
                            aIr.updateView();
                        }
                    }
                    else {
                        this.pushToLoadItem(aDaItem);
                    }
                }
                this.loadPushedItems();
                //console.log("ARRAY updateView time= "+(new Date().getTime()-a));
            }
            //_______________________________________________________________
            pushToLoadItem(aDaItem) {
                if (this.mIsRefreshedBeforeBuildingAllList && aDaItem.data) {
                    this.pushedItemsView.push(aDaItem.data);
                }
            }
            //_______________________________________________________________
            loadPushedItems() {
                let aPushed = this.pushedItemsView.splice(0);
                this.mPushedItemsView.length = 0;
                if (this.mIsRefreshedBeforeBuildingAllList && this.mRelatedList && aPushed.length > 0) {
                    this.mRelatedList.list.addItemsView(aPushed);
                }
            }
            //_______________________________________________________________
            internalRefresh() {
                // console.log("internalRefresh")
                let a = new Date().getTime();
                let aSelectedIrsToUnselect = this.getSelectedIrs();
                if (this.mSort == null && this.mFilterFunction == null) {
                    this.mLocalIndex = null;
                    if (this.mIsRemovingFilter) {
                        this.unfilterAllItems();
                    }
                    else if (this.mIsRemovingSort) {
                        this.unsort();
                    }
                }
                else {
                    this.populateLocalIndex();
                    if (this.mFilterFunction) {
                        this.mLocalIndex = this.filterItems();
                    }
                    else if (this.mIsRemovingFilter) {
                        this.unfilterAllItems();
                    }
                    if (this.sort) {
                        this.sortItems();
                    }
                    else if (this.mIsRemovingSort) {
                        this.unsort();
                    }
                    if (this.mRelatedList && this.mRelatedList.displayItemsNum > -1) {
                        let aDiscludedNum = this.mLocalIndex.length - this.mRelatedList.displayItemsNum;
                        for (let i = aDiscludedNum; i > 0; --i) {
                            this.includeItem(this.mLocalIndex[this.mLocalIndex.length - i], false);
                        }
                    }
                }
                this.dispatchSetOrRemoved(aSelectedIrsToUnselect);
                this.updateView();
                ++this.mRevision;
                this.dispatchEvent(ArrayCollection.COLLECTION_REFRESHED, this);
                //console.log("---- refresh time= "+(new Date().getTime()-a)+" ----");
                return true;
            }
            //_______________________________________________________________
            refreshNoView() {
                if (this.mSort == null && this.mFilterFunction == null) {
                    this.mLocalIndex = null;
                }
                else {
                    this.populateLocalIndex();
                    if (this.mFilterFunction) {
                        this.mLocalIndex = this.filterItems();
                    }
                    if (this.sort) {
                        this.sortItems();
                    }
                }
                this.mIsRefreshedBeforeBuildingAllList = true;
                return true;
            }
            //_______________________________________________________________
            dispatchSetOrRemoved(iSelectedIrsToUnselect) {
                if (this.mFilterFunction) {
                    EventManager.dispatchEvent(ArrayCollection.COLLECTION_FILTER_SET, this, iSelectedIrsToUnselect);
                }
                else if (this.mIsRemovingFilter) {
                    this.mIsRemovingFilter = false;
                    EventManager.dispatchEvent(ArrayCollection.COLLECTION_FILTER_REMOVED, this);
                }
                if (this.sort) {
                    EventManager.dispatchEvent(ArrayCollection.COLLECTION_SORT_SET, this, iSelectedIrsToUnselect);
                }
                else if (this.mIsRemovingSort) {
                    this.mIsRemovingSort = false;
                    EventManager.dispatchEvent(ArrayCollection.COLLECTION_SORT_REMOVED, this);
                }
            }
            //_______________________________________________________________
            getSelectedIrs() {
                let aIrs = new Array();
                if (this.mRelatedList) {
                    let aSelectedItems = this.mRelatedList.selectedItems;
                    if (aSelectedItems) {
                        for (let aItem of aSelectedItems) {
                            aIrs.push(this.getItemRendererByData(aItem));
                        }
                    }
                    return aIrs;
                }
                return aIrs;
            }
            //_______________________________________________________________
            sortItems(iReappend = true) {
                let a = new Date().getTime();
                this.sort.sort(this.mLocalIndex, iReappend);
                //console.log("sort time= "+(new Date().getTime()-a))
            }
            //_______________________________________________________________
            unsort() {
                let aDataArray = this.source;
                for (let i = 0; i < aDataArray.length; i++) {
                    this.reappendIrByItem(aDataArray[i]);
                }
            }
            //_______________________________________________________________
            reappendIrByItem(iItem) {
                if (iItem) {
                    iItem.reappend();
                }
            }
            //_______________________________________________________________
            filterItems(iIsHide = true) {
                let a = new Date().getTime();
                let aFilteredItems;
                if (this.mLocalIndex != null) {
                    aFilteredItems = new Array();
                    for (let aItem of this.mLocalIndex) {
                        if (this.mFilterFunction.call(this, aItem)) {
                            aFilteredItems.push(aItem);
                            this.filterAddItem(aItem);
                        }
                        else if (iIsHide) {
                            this.filterRemoveItem(aItem);
                        }
                    }
                }
                //console.log("filter time= "+(new Date().getTime()-a));
                return aFilteredItems;
            }
            //_______________________________________________________________
            unfilterAllItems() {
                for (let i = 0; i < this.source.length; i++) {
                    this.includeItem(this.source[i], true);
                    this.reappendIrByItem(this.source[i]);
                }
            }
            //_______________________________________________________________
            includeItem(iItem, iIsInclude) {
                if (iItem && iItem.ir) {
                    iItem.ir.include(iIsInclude);
                }
            }
            //_______________________________________________________________
            populateLocalIndex() {
                if (this.source.length > 0) {
                    this.mLocalIndex = this.source.concat();
                }
                else {
                    this.mLocalIndex = null; //new Array<DaArrayCollection>();
                }
            }
            //_______________________________________________________________
            filterAddItem(iItem) {
                this.includeItem(iItem, true);
            }
            //_______________________________________________________________
            filterRemoveItem(iItem) {
                this.includeItem(iItem, false);
            }
            //____________________________________________________________________
            dispose() {
                for (let i = 0; i < this.source.length; ++i) {
                    let aDaItem = this.source[i];
                    this.removeDataListener(aDaItem.data);
                    aDaItem.dispose();
                }
                this.source.splice(0);
                this.mSource = null;
                this.mLocalIndex = null;
                if (this.mSort) {
                    this.mSort = null;
                }
                this.mFilterFunction = null;
                this.clearAcCallbacks();
                this.mOriginalArray = null;
            }
            //____________________________________________________________________
            clearAcCallbacks() {
                this.clear();
                if (this.mAcCallback) {
                    this.mOriginalArray.removeCallback(this.mAcCallback);
                    this.mAcCallback = null;
                }
            }
            //_____________ ICollectionView implementation __________________
            //_______________________________________________________________
            contains(iData) {
                return (this.getDataCollectionByData(iData) != ArrayCollection.ITEM_NOT_FOUND);
            }
            //__________________________________________________________________
            updateRenderer(iIr, iItemIndex, iData) {
                if (iItemIndex < 0 || iItemIndex > this.length) {
                    return;
                }
                if (iIr == null) {
                    return;
                }
                let aDataRenderer = this.source[iItemIndex];
                if (!aDataRenderer) {
                    aDataRenderer.ir = iIr;
                    aDataRenderer.data = iData;
                    this.refresh();
                }
            }
            //_______________________________________________________________
            getDataCollectionByData(iItem) {
                let aDaItem;
                for (let i = 0; i < this.length; ++i) {
                    aDaItem = this.currentArray[i];
                    if (aDaItem.data == iItem) {
                        return aDaItem;
                    }
                }
                return ArrayCollection.ITEM_NOT_FOUND;
            }
            //_______________________________________________________________
            getItemRendererByData(iItem) {
                let aSourceLength = this.source.length;
                for (let i = 0; i < aSourceLength; ++i) {
                    let aDaItem = this.source[i];
                    if (aDaItem.data == iItem) {
                        return aDaItem.ir;
                    }
                }
                return ArrayCollection.ITEM_NOT_FOUND;
            }
            //_______________________________________________________________
            getItemRendererAtFromSource(iIndex) {
                if (iIndex >= this.source.length || iIndex < 0) {
                    return ArrayCollection.ITEM_NOT_FOUND;
                }
                return this.source[iIndex].ir;
            }
            //_______________________________________________________________
            getItemRendererAt(iIndex) {
                if (iIndex >= this.length || iIndex < 0) {
                    return ArrayCollection.ITEM_NOT_FOUND;
                }
                return this.currentArray[iIndex].ir;
            }
            //_______________________________________________________________
            getItemIndex(iData) {
                let aDaItem = this.getDataCollectionByData(iData);
                let i;
                let aLength;
                if (this.mLocalIndex) {
                    if (this.mLocalIndex.length > 0 && this.mFilterFunction != null) {
                        aLength = this.mLocalIndex.length;
                        for (i = 0; i < aLength; i++) {
                            if (this.mLocalIndex[i] == aDaItem) {
                                return i;
                            }
                        }
                        return -1;
                    }
                    else if (this.mLocalIndex.length > 0 && this.sort) {
                        let aStartIndex = this.findItem(aDaItem, Sort.FIRST_INDEX_MODE);
                        if (aStartIndex == -1) {
                            return -1;
                        }
                        let aEndIndex = this.findItem(aDaItem, Sort.LAST_INDEX_MODE);
                        for (i = aStartIndex; i <= aEndIndex; i++) {
                            if (this.mLocalIndex[i] == aDaItem)
                                return i;
                        }
                        return -1;
                    }
                    // List is sorted or filtered but refresh has not been called
                    else if (this.mLocalIndex.length > 0) {
                        aLength = this.mLocalIndex.length;
                        for (i = 0; i < aLength; i++) {
                            if (this.mLocalIndex[i] == aDaItem)
                                return i;
                        }
                        return -1;
                    }
                }
                // fallback
                return asBase.Utils.getItemIndex(aDaItem, this.source);
            }
            //__________________________________________________________________
            findItem(iValues, iMode, iInsertIndex = false) {
                if (!this.sort || !this.mLocalIndex) {
                    return -1;
                }
                if (this.mLocalIndex.length == 0)
                    return iInsertIndex ? 0 : -1;
                try {
                    return this.sort.findItem(this.mLocalIndex, iValues, iMode, iInsertIndex);
                }
                catch (e) {
                    // usually because the find critieria is not compatible with the sort.
                }
                return -1;
            }
            //____________________________________________________________________
            clear() {
                if (this.mOriginalArray != null) {
                    this.mOriginalArray.clear();
                    if (this.mOriginalArray.hasListeners == false) {
                        this.removeAllArrayCollection();
                    }
                }
                else {
                    this.removeAllArrayCollection();
                }
            }
            //***********************
            //       get/set        *
            //***********************
            //_______________________________________________________________
            get source() {
                if (!this.mSource) {
                    this.mSource = new Array();
                }
                return this.mSource;
            }
            //__________________________________________________________________
            get filterFunction() {
                return this.mFilterFunction;
            }
            set filterFunction(value) {
                if (this.mFilterFunction != value && value != null && this.mFilterFunction != null) {
                    this.unfilterAllItems();
                }
                this.mIsRemovingFilter = (value == null && this.mFilterFunction != null && this.mFilterFunction != value);
                this.mFilterFunction = value;
            }
            //__________________________________________________________________
            /* returns length of the current active array */
            get length() {
                return this.mLocalIndex != null ? this.mLocalIndex.length : this.source.length;
            }
            //__________________________________________________________________
            get sort() {
                return this.mSort;
            }
            set sort(value) {
                this.mIsRemovingSort = (value == null && this.mSort != null);
                this.mSort = value;
            }
            //__________________________________________________________________
            get relatedList() {
                return this.mRelatedList;
            }
            set relatedList(value) {
                if (this.mRelatedList != null) {
                    this.mRelatedList.selectedIndex = -1;
                }
                this.mRelatedList = value;
            }
            //____________________________________________________________________
            get isNeedItemRenderers() {
                if (this.length == 0) {
                    return false;
                }
                return this.mIsNeedItemRenderers;
            }
            set isNeedItemRenderers(value) {
                this.mIsNeedItemRenderers = value;
            }
            //___________________________________________________________________
            get id() {
                return this.mId;
            }
            //____________________________________________________________________
            set notifyOnItemAdded(value) {
                this.mNotifyOnItemAdded = value;
            }
            //_______________________________________________________________
            set dataField(value) {
                if (this.source.length > 0) {
                    for (let i = 0; i < this.source.length; i++) {
                        if (this.source[i].ir) {
                            this.source[i].ir.dataField = value;
                        }
                    }
                }
            }
            //__________________________________________________________________
            set enabled(value) {
                this.mIsEnabled = value;
                for (let i = 0; i < this.source.length; i++) {
                    if (this.source[i].ir) {
                        this.source[i].ir.enabled = value;
                    }
                }
            }
            get enabled() {
                return this.mIsEnabled;
            }
            //_______________________________________________________________
            get pushedItemsView() {
                if (this.mPushedItemsView == null) {
                    this.mPushedItemsView = new Array();
                }
                return this.mPushedItemsView;
            }
            //______________________________________________________________________
            get localArray() {
                return this.mLocalIndex;
            }
            //______________________________________________________________________
            set isRefreshedBeforeBuildingAllList(value) {
                this.mIsRefreshedBeforeBuildingAllList = value;
            }
        }
        //------------------------------
        // Statics
        //------------------------------
        ArrayCollection.mInstanceCounter = 0;
        ArrayCollection.COLLECTION_REFRESHED = "COLLECTION_REFRESHED";
        ArrayCollection.COLLECTION_FILTER_SET = "COLLECTION_FILTER_SET";
        ArrayCollection.COLLECTION_FILTER_REMOVED = "COLLECTION_FILTER_REMOVED";
        ArrayCollection.COLLECTION_SORT_SET = "COLLECTION_SORT_SET";
        ArrayCollection.COLLECTION_SORT_REMOVED = "COLLECTION_SORT_REMOVED";
        ArrayCollection.COLLECTION_ITEM_REMOVED = "COLLECTION_ITEM_REMOVED";
        ArrayCollection.COLLECTION_ITEM_ADDED = "COLLECTION_ITEM_ADDED";
        ArrayCollection.COLLECTION_ALL_ITEMS_REMOVED = "COLLECTION_ALL_ITEMS_REMOVED";
        ArrayCollection.COLLECTION_GET_IR = "COLLECTION_GET_IR";
        ArrayCollection.COLLECTION_IR_DATA_CHANGED = "COLLECTION_IR_DATA_CHANGED";
        ArrayCollection.EVENT_KIND_ADDED = "EVENT_KIND_ADDED";
        ArrayCollection.EVENT_KIND_REMOVED = "EVENT_KIND_REMOVED";
        ArrayCollection.EVENT_KIND_REFRESH = "EVENT_KIND_REFRESH";
        ArrayCollection.ITEM_NOT_FOUND = null;
        baseclasses.ArrayCollection = ArrayCollection;
    })(baseclasses = asBase.baseclasses || (asBase.baseclasses = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var collections;
    (function (collections) {
        class IrSkinLoader {
            constructor() {
                this.mSkinDictionary = {};
            }
            //_____________________________________________________________
            static loadSkin(iURL, iCallback, iTo, pIsImmediate = false) {
                if (IrSkinLoader.mInstance == null) {
                    IrSkinLoader.mInstance = new IrSkinLoader();
                }
                IrSkinLoader.mInstance.loadSkin(iURL, iCallback, iTo, pIsImmediate);
            }
            //_____________________________________________________________
            loadSkin(iURL, iCallback, iTo, pIsImmediate = false) {
                let aCallerSkins = new CallerSkin();
                aCallerSkins.parentElement = iTo;
                aCallerSkins.callback = iCallback;
                if (this.mSkinDictionary[iURL] == null) {
                    this.mSkinDictionary[iURL] = new SkinLoadData();
                    this.mSkinDictionary[iURL].url = iURL;
                    this.mSkinDictionary[iURL].loadingState = LoadingState.LOADING;
                    this.mSkinDictionary[iURL].callerSkins = new Array();
                    this.mSkinDictionary[iURL].callerSkins.push(aCallerSkins);
                    this.importSkin(iURL);
                    return;
                }
                if (this.mSkinDictionary[iURL].loadingState == LoadingState.LOADING) {
                    this.mSkinDictionary[iURL].callerSkins.push(aCallerSkins);
                    return;
                }
                if (pIsImmediate) {
                    this.setLoadedSkin(iURL, iCallback, iTo);
                }
                else {
                    setTimeout((iURL, iCallback, iTo) => this.setLoadedSkin(iURL, iCallback, iTo), 0, iURL, iCallback, iTo);
                }
            }
            //_____________________________________________________________
            setLoadedSkin(iURL, iCallback, iTo) {
                if (iTo != null) {
                    if (this.mSkinDictionary[iURL].element != undefined) {
                        iTo.innerHTML = this.mSkinDictionary[iURL].element;
                        if (iTo.innerHTML == "") {
                        }
                    }
                }
                iCallback(this.mSkinDictionary[iURL]);
            }
            //_____________________________________________________________
            importSkin(iURL) {
                new collections.SkinLoader(iURL, (iSkinLoader) => this.onLoadSkin(iSkinLoader));
            }
            //______________________________________________________________
            onLoadSkin(iSkinLoader) {
                let aLoadData = this.mSkinDictionary[iSkinLoader.url];
                aLoadData.element = iSkinLoader.element;
                aLoadData.loadingState = LoadingState.LOADED;
                let aCallerSkins = aLoadData.callerSkins;
                for (let i = 0; i < aCallerSkins.length; i++) {
                    if (aCallerSkins[i] == null) {
                        continue;
                    }
                    if (aCallerSkins[i].parentElement != null) {
                        if (aLoadData.element != undefined) {
                            aCallerSkins[i].parentElement.innerHTML = aLoadData.element;
                        }
                    }
                    aCallerSkins[i].callback(aLoadData);
                    aCallerSkins[i].parentElement = null;
                    aCallerSkins[i].callback = null;
                    aCallerSkins[i] = null;
                }
            }
        }
        collections.IrSkinLoader = IrSkinLoader;
    })(collections = asBase.collections || (asBase.collections = {}));
})(asBase || (asBase = {}));
//______________________________________________
var LoadingState;
//______________________________________________
(function (LoadingState) {
    LoadingState[LoadingState["LOADING"] = 0] = "LOADING";
    LoadingState[LoadingState["LOADED"] = 1] = "LOADED";
})(LoadingState || (LoadingState = {}));
//___________________________________________
class CallerSkin {
}
//_________________________________________
class SkinLoadData {
}
var asBase;
(function (asBase) {
    var collections;
    (function (collections) {
        var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
        class SkinLoader {
            constructor(pPath, pFunction) {
                this.mCallback = pFunction;
                this.mPath = pPath;
                if (pPath == null) {
                    return;
                }
                this.mHttpRequest = new XMLHttpRequest;
                this.mHttpRequest.open('get', pPath, true);
                this.mHttpRequest.onreadystatechange = () => this.onReadyStatecChange();
                this.mHttpRequest.send();
            }
            /****************************
            * Methods
            ****************************/
            //_____________________________________________________________________________
            setHtmlDataFromData(pHTML) {
                SkinLoader.mCounter++;
                if (pHTML != null) {
                    this.mHTML = pHTML;
                }
                if (this.mCallback != null) {
                    this.mCallback(this);
                }
            }
            //______________________________________________________________________________
            onReadyStatecChange() {
                if (this.mHttpRequest.readyState != 4)
                    return;
                var aHtml = this.mHttpRequest.responseText;
                if (aHtml == null) {
                    if (DaUnderDevelopment.SHOW_CONSOLE_LOG) {
                        console.log("Error Loading Html");
                    }
                    this.setHtmlDataFromData(null);
                    return;
                }
                this.setHtmlDataFromData(aHtml);
            }
            //______________________________________________________________________________
            /****************************
            * Getters and Setters
            ****************************/
            get url() {
                return this.mPath;
            }
            //___________________________________________________
            get element() {
                return this.mHTML;
            }
            //_______________________________________________
            static get myName() {
                return "SkinLoader";
            }
            //______________________________________________
            get myClassName() {
                return "SkinLoader";
            }
        }
        SkinLoader.mCounter = 0;
        collections.SkinLoader = SkinLoader;
    })(collections = asBase.collections || (asBase.collections = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var collections;
    (function (collections) {
        class SortFieldCompareTypes {
        }
        SortFieldCompareTypes.DATE = "DATE";
        SortFieldCompareTypes.NULL = "NULL";
        SortFieldCompareTypes.NUMERIC = "NUMERIC";
        SortFieldCompareTypes.STRING = "STRING";
        SortFieldCompareTypes.XML = "XML";
        collections.SortFieldCompareTypes = SortFieldCompareTypes;
    })(collections = asBase.collections || (asBase.collections = {}));
})(asBase || (asBase = {}));
/// <reference path="SortFieldCompareTypes.ts" />
/// <reference path="ISortField.ts" />
var asBase;
/// <reference path="SortFieldCompareTypes.ts" />
/// <reference path="ISortField.ts" />
(function (asBase) {
    var collections;
    (function (collections) {
        class SortField {
            constructor(iName, iCaseInsensitive, iDescending, iNumeric, iDate) {
                this.mName = iName;
                this.mCaseInsensitive = iCaseInsensitive;
                this.mDescending = iDescending;
                this.mNumeric = iNumeric;
                this.mDate = iDate;
            }
            //________________________________________________________________
            updateSortCompareType() {
                if (!this.sortCompareType) {
                    return false;
                }
                //Lookup the sortCompareType by its SortFieldCompareTypes value and set the associated compare method.
                switch (this.sortCompareType) {
                    case collections.SortFieldCompareTypes.DATE: {
                        this.compareFunction = (iA, iB) => this.dateCompare(iA, iB);
                        return true;
                    }
                    case collections.SortFieldCompareTypes.NULL: {
                        this.compareFunction = (iA, iB) => this.nullCompare(iA, iB);
                        return true;
                    }
                    case collections.SortFieldCompareTypes.NUMERIC: {
                        this.compareFunction = (iA, iB) => this.numericCompare(iA, iB);
                        return true;
                    }
                    case collections.SortFieldCompareTypes.STRING: {
                        this.compareFunction = (iA, iB) => this.stringCompare(iA, iB);
                        return true;
                    }
                    case collections.SortFieldCompareTypes.XML: {
                        this.compareFunction = (iA, iB) => this.xmlCompare(iA, iB);
                        return true;
                    }
                }
                return false;
            }
            //________________________________________________________________
            nullCompare(iA, iB) {
                let aLeft;
                let aRight;
                let aFound = false;
                // return 0 (ie equal) if both are null
                if (iA == null && iB == null) {
                    return 0;
                }
                // we need to introspect the data a little bit
                if (this.name) {
                    aLeft = iA[this.name];
                    aRight = iB[this.name];
                }
                // return 0 (ie equal) if both are null
                if (aLeft == null && aRight == null)
                    return 0;
                if (aLeft == null && !this.name)
                    aLeft = iA;
                if (aRight == null && !this.name)
                    aRight = iB;
                const aTypeLeft = typeof (aLeft);
                const aTypeRight = typeof (aRight);
                if (aTypeLeft == "string" || aTypeRight == "string") {
                    aFound = true;
                    this.compareFunction = (iA, iB) => this.stringCompare(iA, iB);
                }
                else if (aTypeLeft == "object" || aTypeRight == "object") {
                    if (aLeft instanceof Date || aRight instanceof Date) {
                        aFound = true;
                        this.compareFunction = (iA, iB) => this.dateCompare(iA, iB);
                    }
                }
                else if (aTypeLeft == "xml" || aTypeRight == "xml") {
                    aFound = true;
                    this.compareFunction = (iA, iB) => this.xmlCompare(iA, iB);
                }
                else if (aTypeLeft == "number" || aTypeRight == "number" || aTypeLeft == "boolean" || aTypeRight == "boolean") {
                    aFound = true;
                    this.compareFunction = (iA, iB) => this.numericCompare(iA, iB);
                }
                if (aFound) {
                    return this.compareFunction.call(aLeft, aRight);
                }
                else {
                    return 0;
                    /*var message: String = resourceManager.getString(
                        "collections", "noComparatorSortField", [name]);
                    throw new SortError(message);*/
                }
            }
            //________________________________________________________________
            initializeDefaultCompareFunction(iObj) {
                // if the compare function is not already set then we can set it
                if (!this.usingCustomCompareFunction) {
                    if (this.sortCompareType) {
                        //Attempt to set the compare function based on the sortCompareType
                        if (this.updateSortCompareType()) {
                            return;
                        }
                    }
                    if (this.numeric == true) {
                        this.compareFunction = (iA, iB) => this.numericCompare(iA, iB);
                    }
                    else if (this.date === true) {
                        this.compareFunction = (iA, iB) => this.dateCompare(iA, iB);
                    }
                    else if (this.numeric === false) {
                        this.compareFunction = (iA, iB) => this.stringCompare(iA, iB);
                    }
                    else {
                        // we need to introspect the data a little bit
                        let aValue;
                        if (this.name) {
                            aValue = iObj[this.name];
                        }
                        //this needs to be an == null check because !value will return true
                        //where value == 0 or value == false
                        if (aValue == undefined) {
                            aValue = iObj;
                        }
                        const aType = typeof (aValue);
                        switch (aType) {
                            case "string":
                                this.compareFunction = (iA, iB) => this.stringCompare(iA, iB);
                                break;
                            case "object":
                                if (aValue instanceof Date) {
                                    this.compareFunction = (iA, iB) => this.dateCompare(iA, iB);
                                }
                                else {
                                    this.compareFunction = (iA, iB) => this.stringCompare(iA, iB);
                                }
                                break;
                            case "xml":
                                this.compareFunction = (iA, iB) => this.xmlCompare(iA, iB);
                                break;
                            case "boolean":
                                this.compareFunction = (iA, iB) => this.booleanCompare(iA, iB);
                                break;
                            case "number":
                                this.compareFunction = (iA, iB) => this.numericCompare(iA, iB);
                                break;
                        }
                    } // else
                } // if
            }
            //________________________________________________________________
            reverse() {
                this.descending = !this.descending;
            }
            //________________________________________________________________
            /**
             *  Pull the booleans from the objects and call the implementation.
             */
            booleanCompare(iA, iB) {
                const aA = (this.name == undefined ? iA : iA[this.name]);
                const aB = (this.name == undefined ? iB : iB[this.name]);
                return this.basicBooleanCompare(aA, aB);
            }
            /**
             *  Pull the numbers from the objects and call the implementation.
             */
            numericCompare(iA, iB) {
                const aA = (this.name == undefined ? iA : iA[this.name]);
                const aB = (this.name == undefined ? iB : iB[this.name]);
                return this.basicNumericCompare(aA, aB);
            }
            //________________________________________________________________
            /**
             *  Pull the date objects from the values and compare them.
             */
            dateCompare(iA, iB) {
                const aA = new Date(iA[this.name]);
                const aB = new Date(iB[this.name]);
                return this.basicDateCompare(aA, aB);
            }
            //________________________________________________________________
            /**
             *  Pull the strings from the objects and call the implementation.
             */
            stringCompare(iA, iB) {
                const aA = this.name == undefined ? String(iA) : String(iA[this.name]);
                const aB = this.name == undefined ? String(iB) : String(iB[this.name]);
                return this.basicStringCompare(aA, aB);
            }
            //________________________________________________________________
            /**
             *  Pull the values out fo the XML object, then compare
             *  using the string or numeric comparator depending
             *  on the numeric flag.
             */
            xmlCompare(iA, iB) {
                const aA = this.name == undefined ? iA.toString() : iA[this.name].toString();
                const aB = this.name == undefined ? iB.toString() : iB[this.name].toString();
                if (this.numeric) {
                    return this.basicNumericCompare(Number(aA), Number(aB));
                }
                else {
                    return this.stringCompare(aA, aB);
                }
            }
            //***********************
            //   basic comparisons  *
            //***********************
            /**
             *  Compares two numeric values.
             *
             *  @param iA First number.
             *  @param iB Second number.
             *
             *  @return 0 is both numbers are NaN.
             *  1 if only <code>a</code> is a NaN.
             *  -1 if only <code>b</code> is a NaN.
             *  -1 if <code>a</code> is less than <code>b</code>.
             *  1 if <code>a</code> is greater than <code>b</code>.
             */
            basicNumericCompare(iA, iB) {
                if (isNaN(iA) && isNaN(iB)) {
                    return 0;
                }
                if (isNaN(iA)) {
                    return 1;
                }
                if (isNaN(iB)) {
                    return -1;
                }
                if (Number(iA) < Number(iB)) {
                    return -1;
                }
                if (Number(iA) > Number(iB)) {
                    return 1;
                }
                return 0;
            }
            /**
             *  Compares two String values.
             *
             *  @param iA First String value.
             *  @param iB Second String value.
             *  @param iCaseInsensitive Specifies to perform a case insensitive compare,
             *  <code>true</code>, or not, <code>false</code>.
             *
             *  @return 0 is both Strings are null.
             *  1 if only <code>a</code> is null.
             *  -1 if only <code>b</code> is null.
             *  -1 if <code>a</code> precedes <code>b</code>.
             *  1 if <code>b</code> precedes <code>a</code>.
             */
            basicStringCompare(iA, iB, iCaseInsensitive) {
                if (iA == undefined && iB == undefined)
                    return 0;
                if (iA == undefined)
                    return 1;
                if (iB == undefined)
                    return -1;
                // Convert to lowercase if we are case insensitive.
                if (iCaseInsensitive) {
                    iA = iA.toLocaleLowerCase();
                    iB = iB.toLocaleLowerCase();
                }
                let oResult = iA.localeCompare(iB);
                if (oResult < -1)
                    oResult = -1;
                else if (oResult > 1)
                    oResult = 1;
                return oResult;
            }
            /**
             *  Compares two boolean values.
             *
             *  @param iA First boolean value.
             *  @param iB Second boolean value.
             *  <code>true</code>, or not, <code>false</code>.
             *
             *  @return 0 is both booleans are both either true or false.
             *  1 if only <code>a</code> is false.
             *  -1 if only <code>b</code> is false.
             */
            basicBooleanCompare(iA, iB) {
                if (iA == false && iB == false)
                    return 0;
                if (iA == false)
                    return 1;
                if (iB == false)
                    return -1;
                return 0;
            }
            /**
             *  Compares the two Date objects and returns an integer value
             *  indicating if the first Date object is before, equal to,
             *  or after the second item.
             *
             *  @param iA Date object.
             *  @param iB Date object.
             *
             *  @return 0 if <code>a</code> and <code>b</code> are equal
             *  (or both are <code>null</code>);
             *  -1 if <code>a</code> is before <code>b</code>
             *  (or <code>b</code> is <code>null</code>);
             *  1 if <code>a</code> is after <code>b</code>
             *  (or <code>a</code> is <code>null</code>);
             *  0 is both dates getTime's are NaN;
             *  1 if only <code>a</code> getTime is a NaN;
             *  -1 if only <code>b</code> getTime is a NaN.
             *
             */
            basicDateCompare(iA, iB) {
                if (iA == undefined && iB == undefined)
                    return 0;
                if (iA == undefined)
                    return 1;
                if (iB == undefined)
                    return -1;
                const aA = iA.getTime();
                const aB = iB.getTime();
                if (aA < aB)
                    return -1;
                if (aA > aB)
                    return 1;
                if (isNaN(aA) && isNaN(aB))
                    return 0;
                if (isNaN(aA))
                    return 1;
                if (isNaN(aB))
                    return -1;
                return 0;
            }
            //***********************
            //       get/set        *
            //***********************
            get arraySortOnOptions() {
                if (this.usingCustomCompareFunction
                    || this.name == undefined
                    || this.mCompareFunction == this.xmlCompare
                    || this.mCompareFunction == this.dateCompare) {
                    return -1;
                }
                let oOptions = 0;
                if (this.descending)
                    oOptions |= SortField.DESCENDING;
                if (this.numeric || this.compareFunction == this.numericCompare)
                    oOptions |= SortField.NUMERIC;
                return oOptions;
            }
            //________________________________________________________________
            get compareFunction() {
                return this.mCompareFunction;
            }
            set compareFunction(value) {
                this.mCompareFunction = value;
                this.mUsingCustomCompareFunction = (value != undefined);
            }
            //________________________________________________________________
            get descending() {
                return this.mDescending;
            }
            set descending(value) {
                this.mDescending = value;
            }
            //________________________________________________________________
            get name() {
                return this.mName;
            }
            set name(value) {
                this.mName = value;
            }
            //________________________________________________________________
            get numeric() {
                return this.mNumeric;
            }
            set numeric(value) {
                this.mNumeric = value;
            }
            //________________________________________________________________
            get date() {
                return this.mDate;
            }
            set date(value) {
                this.mDate = value;
            }
            //________________________________________________________________
            get usingCustomCompareFunction() {
                return this.mUsingCustomCompareFunction;
            }
            //________________________________________________________________
            get sortCompareType() {
                return this.mSortCompareType;
            }
            //________________________________________________________________
            dispose() {
                this.mCompareFunction = null;
            }
        }
        SortField.UNIQUESORT = 4;
        SortField.DESCENDING = 2;
        SortField.NUMERIC = 16;
        collections.SortField = SortField;
    })(collections = asBase.collections || (asBase.collections = {}));
})(asBase || (asBase = {}));
var src;
(function (src) {
    var data;
    (function (data) {
        class DaFieldsConst {
            constructor() {
            }
        }
        DaFieldsConst.EMAIL_MAX_CHAR = 49;
        DaFieldsConst.PASSWORD_MAX_CHAR = 19;
        DaFieldsConst.FIRST_NAME_MAX_CHAR = 29;
        DaFieldsConst.LAST_NAME_MAX_CHAR = 29;
        DaFieldsConst.VENDOR_NAME_MAX_CHAR = 49;
        DaFieldsConst.ADDRESS_MAX_CHAR = 99;
        DaFieldsConst.CITY_MAX_CHAR = 49;
        DaFieldsConst.STATE_MAX_CHAR = 29;
        DaFieldsConst.ZIP_MAX_CHAR = 29;
        DaFieldsConst.PHONE_MAX_CHAR = 29;
        DaFieldsConst.EXTENSION_MAX_CHAR = 6;
        DaFieldsConst.OCCASION_NAME_MAX_CHAR = 49;
        DaFieldsConst.PROMO_CODE_MAX_CHAR = 49;
        DaFieldsConst.VENUE_HALL_NAME_MAX_CHAR = 99;
        DaFieldsConst.TEMPLATE_NAME_MAX_CHAR = 34;
        /// Timeline
        DaFieldsConst.TIMELINE_NAME_MAX_CHAR = 99;
        DaFieldsConst.TIMELINE_SECTION_NAME_MAX_CHAR = 254;
        DaFieldsConst.TIMELINE_TASK_WHO_MAX_CHAR = 254;
        DaFieldsConst.TIMELINE_TASK_WHAT_MAX_CHAR = 254;
        DaFieldsConst.TIMELINE_TASK_WHERE_MAX_CHAR = 254;
        DaFieldsConst.TIMELINE_TASK_COMMENTS_MAX_CHAR = 254;
        // TB Setting
        DaFieldsConst.TB_SETTING_NAME_MAX_CHAR = 22;
        data.DaFieldsConst = DaFieldsConst;
    })(data = src.data || (src.data = {}));
})(src || (src = {}));
var asBase;
(function (asBase) {
    var constants;
    (function (constants) {
        class DaGlobalConsts {
        }
        //------------------------------
        // Constants
        //------------------------------
        DaGlobalConsts.WWW_ROOT = "";
        DaGlobalConsts.BASE_URL = "";
        DaGlobalConsts.ALLSEATED_SERVER_SRV = "allseatedbe/servicests/";
        DaGlobalConsts.EXVOSTATS_SERVER_SRV = "exvostats/esservices/";
        DaGlobalConsts.ALLSEATED_CURR_VER = -1;
        DaGlobalConsts.ALLSEATED_REG_VER = -1;
        // general const
        DaGlobalConsts.NOT_DEFINED = -1;
        DaGlobalConsts.LEAD_CHAIR_OFFSET_NOT_DEFINED = -1000;
        // selected actions
        DaGlobalConsts.SELECTED_ACTION_YES = "SelectedActionYes";
        DaGlobalConsts.SELECTED_ACTION_NO = "SelectedActionNo";
        DaGlobalConsts.SELECTED_ACTION_OK = "SelectedActionOk";
        DaGlobalConsts.SELECTED_ACTION_REFRASH_LIST = "SelectedActionRefrashList";
        DaGlobalConsts.SELECTED_ACTION_CHANGE = "SelectedActionChange";
        DaGlobalConsts.SELECTED_ACTION_CANCEL = "SelectedActionCancel";
        // guests display formats
        DaGlobalConsts.NAME_DISPLAY_FORMAL = 1;
        DaGlobalConsts.NAME_DISPLAY_INFORMAL = 2;
        // aditional type ids
        DaGlobalConsts.TYPE_ID_ALL = -1;
        DaGlobalConsts.TYPE_ID_ALL_INDEX = 0;
        DaGlobalConsts.TYPE_ID_NOT_DEFINED = -2;
        DaGlobalConsts.TYPE_ID_NOT_DEFINED_INDEX = 1;
        // list types
        DaGlobalConsts.SIDE_TYPES = 'sideTypes';
        DaGlobalConsts.RELATION_TYPES = 'relationTypes';
        DaGlobalConsts.RSVP_TYPES = 'rsvpTypes';
        DaGlobalConsts.TITLE_TYPES = 'titleTypes';
        DaGlobalConsts.TITLE_TYPES_NO_COUPLES = 'titleTypesNoCouples';
        DaGlobalConsts.MEAL_TYPES = 'mealTypes';
        // scale types
        DaGlobalConsts.SCALE_BY_DISTANCE = "ScaleByDistance";
        DaGlobalConsts.SCALE_BY_GUESTS_COUNT = "ScaleByGuestsCount";
        DaGlobalConsts.SCALE_BY_CUSTOM = "ScaleByCustom";
        DaGlobalConsts.SCALE_BY_NONE = "ScaleByNone";
        // length units
        DaGlobalConsts.LENGTH_FEET = "feet";
        DaGlobalConsts.LENGTH_INCH = "inch";
        DaGlobalConsts.LENGTH_METERS = "meters";
        // import sources
        DaGlobalConsts.IMPORT_FACEBOOK = "import_from_facebook";
        DaGlobalConsts.IMPORT_GMAIL = "import_from_gmail";
        DaGlobalConsts.IMPORT_EXCEL = "import_from_excel";
        // menu object source
        DaGlobalConsts.MENU_OBJECT_NO_SOURCE = -1;
        // object categories
        DaGlobalConsts.OBJECT_CATEGORY_NUMBERED_TABLES = 1;
        DaGlobalConsts.OBJECT_CATEGORY_NOTNUMBEREDTABLES = 2;
        DaGlobalConsts.OBJECT_CATEGORY_FURNITURE = 3;
        DaGlobalConsts.OBJECT_CATEGORY_FLOORING = 4;
        DaGlobalConsts.OBJECT_CATEGORY_OTHER = 15;
        DaGlobalConsts.OBJECT_CATEGORY_CUSTOMIZED = 5;
        DaGlobalConsts.OBJECT_CATEGORY_CUSTOM = 30;
        DaGlobalConsts.OBJECT_CATEGORY_TENT = 91;
        DaGlobalConsts.OBJECT_CATEGORY_BANQUET_CHAIRS = 8;
        // This is used internally when creating the DB for the Banquet Chairs view in the objects menu
        // Its not coming from the DB
        DaGlobalConsts.OBJECT_MENU_MY_BANQUET_CHAIRS = 1;
        DaGlobalConsts.OBJECT_MENU_VENUE_BANQUET_CHAIRS = 2;
        DaGlobalConsts.OBJECT_MENU_ALL_BANQUET_CHAIRS = 3;
        // object types
        DaGlobalConsts.OBJECT_TYPE_BAR = 8;
        DaGlobalConsts.OBJECT_TYPE_NOTE = 10;
        DaGlobalConsts.OBJECT_TYPE_THEATRE_CHAIRS = 11;
        DaGlobalConsts.OBJECT_TYPE_RISER = 12;
        DaGlobalConsts.OBJECT_TYPE_HUPA = 13;
        DaGlobalConsts.OBJECT_TYPE_DANCE_FLOOR = 14;
        DaGlobalConsts.OBJECT_TYPE_OTTOMAN = 15;
        DaGlobalConsts.OBJECT_TYPE_STATION = 16;
        DaGlobalConsts.OBJECT_TYPE_LONG_BANQUET_TABLES = 17;
        DaGlobalConsts.OBJECT_TYPE_RECT_SHAPE = 18;
        DaGlobalConsts.OBJECT_TYPE_ELLIPSE_SHAPE = 50;
        DaGlobalConsts.OBJECT_TYPE_HALF_MOON = 19;
        DaGlobalConsts.OBJECT_TYPE_JOINED_TABLE = 20;
        DaGlobalConsts.OBJECT_TYPE_LINE_SHAPE = 21;
        DaGlobalConsts.OBJECT_TYPE_COMBINED_OBJECTS = 22;
        DaGlobalConsts.OBJECT_TYPE_CHAIRS_OBJECTS = 23;
        DaGlobalConsts.OBJECT_TYPE_CUSTOMIZED_COMBINED_OBJECTS = 24;
        DaGlobalConsts.OBJECT_TYPE_BUFFET_OBJECTS = 25;
        DaGlobalConsts.OBJECT_TYPE_BANQUET_CHAIRS = 61;
        // the id is different local and on server!!!!
        // -------------------------------------------------------
        // server
        DaGlobalConsts.OBJECT_TYPE_AIRWALL = 26;
        // -------------------------------------------------------
        // -------------------------------------------------------
        //local
        //		public static OBJECT_TYPE_AIRWALL:number = 25;
        //		 -------------------------------------------------------
        DaGlobalConsts.OBJECT_TYPE_PIPES = 27;
        DaGlobalConsts.OBJECT_TYPE_COUCHES = 30;
        DaGlobalConsts.OBJECT_TYPE_VEHICLES = 35;
        DaGlobalConsts.OBJECT_TYPE_CONSOLES = 36;
        DaGlobalConsts.OBJECT_TYPE_PIANOS = 51;
        DaGlobalConsts.OBJECT_TYPE_SERPENTINE = 45;
        // Brand Object Function types
        DaGlobalConsts.FUNCTION_TYPE_NORMAL = 0;
        DaGlobalConsts.FUNCTION_TYPE_ROUND_TABLE = 1;
        DaGlobalConsts.FUNCTION_TYPE_RECT_TABLE = 2;
        DaGlobalConsts.FUNCTION_TYPE_CHAIR = 3;
        DaGlobalConsts.FUNCTION_TYPE_STAGE = 4;
        DaGlobalConsts.FUNCTION_TYPE_ONTABLE = 5;
        DaGlobalConsts.FUNCTION_TYPE_TENT = 6;
        // Addon Types
        DaGlobalConsts.ADDON_ASSIGN_SEATS = 1;
        // Addon Status
        DaGlobalConsts.ADDON_NOT_ACTIVE = 0;
        DaGlobalConsts.ADDON_TRIAL = 1;
        DaGlobalConsts.ADDON_ACTIVE = 2;
        // tables status
        DaGlobalConsts.TABLE_OVER = 0xF15A29;
        DaGlobalConsts.TABLE_FULL = 0xFCAF17;
        DaGlobalConsts.TABLE_PART = 0x6EBD44;
        DaGlobalConsts.TABLE_EMPTY = 0xFFFFFF;
        // chairs Status
        DaGlobalConsts.CHAIR_OCCUPIED = 0xF15A29;
        DaGlobalConsts.CHAIR_EMPTY = 0x6EBD44;
        DaGlobalConsts.CHAIR_LEAD = 0xFCAF17;
        //		public static TABLE_FULL:number = 0xFCAF17;
        //		public static TABLE_EMPTY:number = 0xFFFFFF;
        // object label position
        DaGlobalConsts.OBJECT_LABEL_TOP = 1;
        DaGlobalConsts.OBJECT_LABEL_CENTER = 2;
        DaGlobalConsts.OBJECT_LABEL_IS_LABEL = 3;
        // buttons zise
        DaGlobalConsts.BUTTON_SIZE_MED = "BUTTON_SIZE_MED";
        DaGlobalConsts.BUTTON_SIZE_BIG = "BUTTON_SIZE_BIG";
        // general colors
        DaGlobalConsts.GREY_BG_COLOR = 0xF2F2F2;
        DaGlobalConsts.WHITE_BG_COLOR = 0xFFFFFF;
        DaGlobalConsts.ORANGE_ROLLOVER_COLOR = 0xFAE7D6;
        DaGlobalConsts.ORANGE_SELECTION_COLOR = 0xFCC89B;
        DaGlobalConsts.SEPARATOR_LINE_COLOR = 0xe6e7e8;
        DaGlobalConsts.GREY_FILL_COLOR = 0xF0F0F0;
        DaGlobalConsts.POPUP_FILL_COLOR = 0xf1f2f2;
        // public static DYNAMIC_OBJECT_NO_COLOR:number = 0xffffffff;
        DaGlobalConsts.DYNAMIC_OBJECT_NO_COLOR = -100;
        // occasion status
        DaGlobalConsts.OCCASION_STATUS_NORMAL = 0;
        DaGlobalConsts.OCCASION_STATUS_CHECKIN = 1;
        DaGlobalConsts.OCCASION_SESSION_NORMAL = 0;
        DaGlobalConsts.OCCASION_SESSION_READ_ONLY = 1;
        DaGlobalConsts.OCCASION_SESSION_CHECK_IN = 2;
        // server actions
        DaGlobalConsts.ACTION_NEW = 1;
        DaGlobalConsts.ACTION_UPDATE = 2;
        DaGlobalConsts.ACTION_DELETE = 3;
        DaGlobalConsts.TEXT_BACK = "BACK";
        DaGlobalConsts.TEXT_DELETE = "DELETE";
        DaGlobalConsts.TEXT_CANCEL = "CANCEL";
        DaGlobalConsts.TEXT_RESET = "RESET";
        DaGlobalConsts.PROFILE_IMAGE_WIDTH = 260;
        DaGlobalConsts.PROFILE_IMAGE_HEIGHT = 260;
        DaGlobalConsts.PROFILE_MARGIN = 23;
        DaGlobalConsts.PROFILE_GAP = 15;
        DaGlobalConsts.BUFFET_BUILDER_WIDTH = 700;
        DaGlobalConsts.BUFFET_BUILDER_HEIGHT = 500;
        DaGlobalConsts.CHAIR_DISTANCE_AT_FIX_DIRECTION = 3.5;
        // Brands Ids
        DaGlobalConsts.CORT = 1;
        DaGlobalConsts.AFR = 2;
        DaGlobalConsts.PARTYRENTALS = 3;
        DaGlobalConsts.FORMDECOR = 4;
        DaGlobalConsts.TWO_0_FOUR_EVENTS = 5;
        DaGlobalConsts.HIGH_STYLE_RENTALS = 6;
        DaGlobalConsts.ARCHIVE_RENTALS = 7;
        DaGlobalConsts.BRIGHT_RENTALS = 8;
        DaGlobalConsts.LOUNGE_APPEAL = 9;
        DaGlobalConsts.SO_COOL_EVENTS = 10;
        DaGlobalConsts.EPIC_PARTY_TEAM = 11;
        DaGlobalConsts.LUXE_EVENT_RENTALS = 16;
        DaGlobalConsts.AFR_RESIDENTIAL = 30;
        // Occasion Plan Types
        DaGlobalConsts.OCCASION_PLAN_TYPE_LEGACY = 0;
        DaGlobalConsts.OCCASION_PLAN_TYPE_FREE = 1;
        DaGlobalConsts.OCCASION_PLAN_TYPE_SUB = 2;
        // User Registration Source
        DaGlobalConsts.USER_SOURCE_ALLSEATED = 0;
        DaGlobalConsts.USER_SOURCE_AFR = 1;
        DaGlobalConsts.USER_SOURCE_AFR_EMAIL_PREFIX = "ASAFR";
        DaGlobalConsts.IS_CORDOVA_APK = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
        //ASCONNECT LINK
        DaGlobalConsts.AS_CONNECT_URL = "https://www.web.allseated.com/asconnect";
        constants.DaGlobalConsts = DaGlobalConsts;
    })(constants = asBase.constants || (asBase.constants = {}));
})(asBase || (asBase = {}));
/**
 * Created by moran on 14-Jul-16.
 */
var asBase;
/**
 * Created by moran on 14-Jul-16.
 */
(function (asBase) {
    class DivSizeController {
        constructor(pElement, pLeft, pTop, pRight, pButtom, pMinWidth = 0, pMinHeight = 0) {
            this.mElement = pElement;
            this.mLeft = pLeft;
            this.mTop = pTop;
            this.mRight = pRight;
            this.mBottom = pButtom;
            this.mMinWidth = pMinWidth;
            this.mMinHeight = pMinHeight;
            this.mOnResizeFunc = (aEvent) => this.onWindowResize__EventHandler(aEvent);
            window.addEventListener('resize', this.mOnResizeFunc);
            this.onWindowResize__EventHandler(null);
        }
        /****************************
         * Methods
         ****************************/
        //_____________________________________________________________________________________________
        onWindowResize__EventHandler(aEvent) {
            var aD = this.mElement;
            var aWidth = window.innerWidth - this.mLeft - this.mRight;
            if (this.mMinWidth > aWidth) {
                aWidth = this.mMinWidth;
            }
            var aHeight = window.innerHeight - this.mTop - this.mBottom;
            if (this.mMinHeight > aHeight) {
                aHeight = this.mMinHeight;
            }
            aD.style.top = this.mTop + "px";
            aD.style.left = this.mLeft + "px";
            aD.style.width = aWidth + "px";
            aD.style.height = aHeight + "px";
            if (asBase.WindowLocator.currentDialog != null) {
                asBase.WindowLocator.centerOn(asBase.WindowLocator.currentDialogElement, asBase.WindowLocator.currentDialog);
            }
        }
        //_____________________________________________________________________________________________
        destructor() {
            window.removeEventListener('resize', this.mOnResizeFunc);
            this.mOnResizeFunc = null;
            this.mElement = null;
        }
    }
    asBase.DivSizeController = DivSizeController;
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        class ActionBase {
            constructor() {
                this.mIsToSendToFireBase = false;
            }
            //______________________________________________________________
            init(pEntity, pId) {
                this.mEntity = pEntity;
                this.mId = pId;
            }
            //_____________________________________________________________
            get isToSendToFireBase() {
                return this.mIsToSendToFireBase;
            }
        }
        entity.ActionBase = ActionBase;
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        class DaActiveArea {
            constructor(pData) {
                if (pData != null) {
                    this.readFromJson(pData);
                }
            }
            //_____________________________________________________________
            getSerializeData() {
                let aRetData = {};
                if (this.mMeetingRect != null) {
                    aRetData.meetingRect = this.mMeetingRect.getSerializeData();
                }
                if (this.mVisibilityRect != null) {
                    aRetData.visibilityRect = this.mVisibilityRect.getSerializeData();
                }
                if (this.mSqrRadius != null) {
                    aRetData.squareRadius = this.mSqrRadius;
                }
                else {
                    this.calcRadius();
                }
                if (this.mCollideRects != null) {
                    aRetData.collideRects = [];
                    for (let i = 0; i < this.mCollideRects.length; i++) {
                        aRetData.collideRects.push(this.mCollideRects[i].getSerializeData());
                    }
                }
                return aRetData;
            }
            //_____________________________________________________________
            readFromJson(pData) {
                if (pData.meetingRect != null) {
                    if (this.mMeetingRect == null) {
                        this.mMeetingRect = new asBase.math.Rectangle();
                    }
                    this.mMeetingRect.readFromJson(pData.meetingRect);
                    if (this.mMeetingRect.area == 0) {
                        this.mMeetingRect = null;
                    }
                }
                if (pData.visibilityRect != null) {
                    if (this.mVisibilityRect == null) {
                        this.mVisibilityRect = new asBase.math.Rectangle();
                    }
                    this.mVisibilityRect.readFromJson(pData.visibilityRect);
                }
                if (pData.collideRects != null) {
                    this.mCollideRects = [];
                    for (let i = 0; i < pData.collideRects.length; i++) {
                        let aRect = new asBase.math.Rectangle();
                        aRect.readFromJson(pData.collideRects[i]);
                        this.mCollideRects.push(aRect);
                    }
                }
                if (pData.squareRadius != null) {
                    this.mSqrRadius = pData.squareRadius;
                }
                else if (pData.visibilityRect != null) {
                    this.calcRadius();
                }
            }
            //_____________________________________________________________
            calcRadius() {
                if (this.mVisibilityRect == null) {
                    return;
                }
                let aPointA = this.mVisibilityRect.left * this.mVisibilityRect.left + this.mVisibilityRect.top * this.mVisibilityRect.top;
                let aPointB = this.mVisibilityRect.left * this.mVisibilityRect.left + this.mVisibilityRect.bottom * this.mVisibilityRect.bottom;
                let aPointC = this.mVisibilityRect.right * this.mVisibilityRect.right + this.mVisibilityRect.top * this.mVisibilityRect.top;
                let aPointD = this.mVisibilityRect.right * this.mVisibilityRect.right + this.mVisibilityRect.bottom * this.mVisibilityRect.bottom;
                this.mSqrRadius = Math.max(aPointA, aPointB, aPointC, aPointD);
            }
            //_____________________________________________________________
            get meetingRect() {
                return this.mMeetingRect;
            }
            //_____________________________________________________________
            get visibilityRect() {
                return this.mVisibilityRect;
            }
            //_____________________________________________________________
            set meetingRect(iRect) {
                this.mMeetingRect = iRect;
            }
            //_____________________________________________________________
            set visibilityRect(iRect) {
                this.mVisibilityRect = iRect;
            }
            //_____________________________________________________________
            get sqrRadius() {
                return this.mSqrRadius;
            }
            //_____________________________________________________________
            get collideRects() {
                return this.mCollideRects;
            }
        }
        entity.DaActiveArea = DaActiveArea;
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        class DaEntityBase {
            constructor() {
                this.mZoneId = DaEntityBase.GLOBAL;
                this.mLastUpdate = 0;
                this.mDelete = false;
                this.mIsToAddToGrid = false;
                this.mName = "";
                this.mUpdatedFromFirebase = false;
                DaEntityBase.mInstanceCounter++;
            }
            //_____________________________________________________________
            getSerializeData(IsWithLastUpdate) {
                let aRetData = {};
                aRetData.id = this.id;
                if (this.mType) {
                    aRetData.type = this.mType;
                }
                if (this.mZoneId) {
                    aRetData.zoneId = this.mZoneId;
                }
                if (this.m2DMatrix != null) {
                    aRetData.matrix2d = this.m2DMatrix;
                }
                if (this.m3DMatrix != null) {
                    aRetData.matrix3d = this.m3DMatrix;
                }
                //if (IsWithLastUpdate) {
                //    this.mLastUpdate = Date.now();
                //    aRetData.lastUpdate = this.mLastUpdate;
                //}
                if (this.mChildren != null) {
                    aRetData.children = {};
                    for (let aKey in this.mChildren) {
                        aRetData.children[aKey] = this.mChildren[aKey].getSerializeData(IsWithLastUpdate);
                    }
                }
                if (this.mActiveArea != null) {
                    aRetData.activeArea = this.mActiveArea.getSerializeData();
                }
                if (this.mDelete) {
                    aRetData.delete = true;
                }
                if (this.mClickActions) {
                    aRetData.clickActions = this.mClickActions;
                }
                if (this.mName) {
                    aRetData.name = this.mName;
                }
                if (this.mDisabled != null) {
                    aRetData.disabled = this.mDisabled;
                }
                if (this.mTag != null) {
                    aRetData.tag = this.mTag;
                }
                aRetData.unique = (Date.now() - 1600100000000) + Math.random();
                return aRetData;
            }
            //_____________________________________________________________
            readFromJson(pData) {
                this.mID = pData.id;
                if (pData.reset != null) {
                    this.mReset = pData.reset;
                }
                if (pData.zoneId != null) {
                    this.mZoneId = pData.zoneId;
                }
                if (pData.delete) {
                    this.mDelete = pData.delete;
                    return;
                }
                this.m2DMatrix = pData.matrix2d;
                this.m3DMatrix = pData.matrix3d;
                this.mLastUpdate = pData.lastUpdate;
                this.mUnique = pData.unique;
                if (pData.type != null) {
                    this.mType = pData.type;
                }
                if (pData.activeArea != null) {
                    this.mIsToAddToGrid = true;
                    if (this.mActiveArea == null) {
                        this.mActiveArea = new entity.DaActiveArea(pData.activeArea);
                    }
                    else {
                        this.mActiveArea.readFromJson(pData.activeArea);
                    }
                }
                if (pData.clickActions) {
                    this.mClickActions = pData.clickActions;
                }
                // Temp until 20/7
                if (pData.influenceArea != null) {
                    this.mIsToAddToGrid = true;
                    if (this.mActiveArea == null) {
                        this.mActiveArea = new entity.DaActiveArea(pData.influenceArea);
                    }
                    else {
                        this.mActiveArea.readFromJson(pData.influenceArea);
                    }
                }
                if (pData.name != null) {
                    this.mName = pData.name;
                }
                if (pData.disabled != null) {
                    this.mDisabled = pData.disabled;
                }
                if (pData.tag != null) {
                    this.mTag = pData.tag;
                }
                if (pData.children == null) {
                    return;
                }
                this.mChildren = {};
                //////for (let aKey in pData.children) {
                //////    this.mChildren[aKey] = new DaEntityBase();
                //////    this.mChildren[aKey].readFromJson(pData.children[aKey]);
                //////}
            }
            //_____________________________________________________________
            getSettingsSerializeData() {
                let aRetData = {};
                if (this.mActiveArea) {
                    let activeArea = {};
                    activeArea.meetingRect = this.meetingRect;
                    activeArea.visibilityRect = this.visibilityRect;
                    activeArea.collideRects = this.activeArea.collideRects;
                    aRetData.activeArea = activeArea;
                }
                if (this.mID) {
                    aRetData.id = this.mID;
                }
                if (this.mType) {
                    aRetData.type = this.mType;
                }
                if (this.mZoneId) {
                    aRetData.zoneId = this.mZoneId;
                }
                if (this.mName) {
                    aRetData.name = this.mName;
                }
                // if(this.mIsAudience != null){
                //     aRetData.audience = this.mIsAudience;
                // }
                return aRetData;
            }
            //_____________________________________________________________
            getVisualSerializeData() {
                let aRetData = {};
                let aChildren = {};
                for (let aKey in this.children) {
                    aChildren[aKey] = this.children[aKey].getVisualSerializeData();
                }
                aRetData.children = aChildren;
                return aRetData;
            }
            //_____________________________________________________________
            get id() {
                if (this.mID == null) {
                    this.mID = DaEntityBase.ID_CONV_VERSIN + this.constructor.name;
                }
                return (this.mID);
            }
            set id(pID) {
                this.mID = pID;
            }
            //_____________________________________________________________
            set activeArea(pActiveArea) {
                this.mActiveArea = pActiveArea;
            }
            //_____________________________________________________________
            get activeArea() {
                return (this.mActiveArea);
            }
            //_____________________________________________________________
            get matrix2d() {
                return (this.m2DMatrix);
            }
            //_____________________________________________________________
            get matrix3d() {
                return (this.m3DMatrix);
            }
            //_____________________________________________________________
            get delete() {
                return (this.mDelete);
            }
            set delete(pDelete) {
                this.mDelete = pDelete;
            }
            //_____________________________________________________________
            get zoneId() {
                return (this.mZoneId);
            }
            set zoneId(pZoneId) {
                this.mZoneId = pZoneId;
            }
            //_____________________________________________________________
            get unique() {
                return (this.mUnique);
            }
            set unique(pUnique) {
                this.mUnique = pUnique;
            }
            //_____________________________________________________________
            get lastUpdate() {
                return (this.mLastUpdate);
            }
            set lastUpdate(pLastUpdate) {
                this.mLastUpdate = pLastUpdate;
            }
            //_____________________________________________________________
            initChildren() {
                this.mChildren = {};
            }
            //_____________________________________________________________
            get children() {
                return (this.mChildren);
            }
            //_____________________________________________________________
            get type() {
                return (this.mType);
            }
            //_____________________________________________________________
            set isToAddToGrid(pVal) {
                this.mIsToAddToGrid = pVal;
            }
            //_____________________________________________________________
            get isToAddToGrid() {
                return (this.mIsToAddToGrid);
            }
            //_____________________________________________________________
            get clickAction() {
                return (this.mClickActions);
            }
            //_____________________________________________________________
            get meetingRect() {
                if (!this.mActiveArea) {
                    return null;
                }
                return this.mActiveArea.meetingRect;
            }
            //_____________________________________________________________
            get visibilityRect() {
                if (!this.mActiveArea) {
                    return null;
                }
                return this.mActiveArea.visibilityRect;
            }
            set meetingRect(iRect) {
                if (!this.mActiveArea) {
                    this.mActiveArea = new entity.DaActiveArea();
                }
                this.mActiveArea.meetingRect = iRect;
            }
            //_____________________________________________________________
            set visibilityRect(iRect) {
                if (!this.mActiveArea) {
                    this.mActiveArea = new entity.DaActiveArea();
                }
                this.mActiveArea.visibilityRect = iRect;
            }
            //_____________________________________________________________
            get name() {
                return (this.mName);
            }
            set name(iName) {
                this.mName = iName;
            }
            //_____________________________________________________________
            get reset() {
                return (this.mReset);
            }
            get disabled() {
                return this.mDisabled;
            }
            set disabled(iDisabled) {
                this.mDisabled = iDisabled;
            }
            //_____________________________________________________________
            get tag() {
                return (this.mTag);
            }
            //_____________________________________________________________
            set tag(iTag) {
                this.mTag = iTag;
            }
            get updatedFromFirebase() {
                return this.mUpdatedFromFirebase;
            }
            set updatedFromFirebase(iUpdated) {
                this.mUpdatedFromFirebase = iUpdated;
            }
        }
        DaEntityBase.GLOBAL = "Global";
        DaEntityBase.UNIQUE = "unique";
        DaEntityBase.ID_CONV_VERSIN = "v2_";
        DaEntityBase.DISABLED_REF = "disabled";
        //------------------------------
        // Members
        //------------------------------
        DaEntityBase.mInstanceCounter = 0;
        entity.DaEntityBase = DaEntityBase;
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        class EntityBase {
            constructor() {
                //------------------------------
                // Members
                //------------------------------
                // Reflection ech class register it self to EntityBase;
                this.mItemID = -1;
                this.mDoNotDestroy = false;
                this.mLastUpdateDepth = 1000;
                this.mIsInMeeting = false;
                this.mIsActive = false;
                this.mIsInView = false;
                this.mIsInVisibilityRect = false;
                this.mIsInNearbyCell = false;
                this.mIsDeleted = false;
                this.mReceivedFirstUpdate = false;
                this.mChildren = {};
                this.mActions = {};
                this.mGridCells = new Array();
            }
            //_____________________________________________________
            getChildById(pId) {
                return this.mChildren[pId];
            }
            /****************************
             * Methods
             ****************************/
            //_____________________________________________________________
            addGridCell(pCell) {
                if (this.mGridCells.indexOf(pCell) > -1) {
                    return;
                }
                pCell.add(this);
                this.mGridCells.push(pCell);
            }
            //__________________________________________________
            updateOneGridCell(pCell) {
                if (this.mGridCells[0] == pCell) {
                    return;
                }
                if (this.mGridCells[0] != null) {
                    this.mGridCells[0].remove(this);
                }
                this.mGridCells[0] = pCell;
                this.mGridCells[0].add(this);
            }
            //_____________________________________________________________
            userEnter() {
                if (this.disabled) {
                    return false; //TODO check
                }
                this.mIsInMeeting = true;
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].userEnter();
                }
                return true;
            }
            //_____________________________________________________________
            userExit() {
                this.mIsInMeeting = false;
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].userExit();
                }
            }
            //_____________________________________________________________
            get meshesForMouseDown() {
                return [];
            }
            //_____________________________________________________________
            onMouseDown(pMouseEvent) {
            }
            //_____________________________________________________________
            checkIsInVisibilityRect(pPX, pPY) {
                let aVisibilityRect = this.mData.activeArea.visibilityRect;
                if (!aVisibilityRect) {
                    return false;
                }
                if (aVisibilityRect.left > pPX || aVisibilityRect.right < pPX || aVisibilityRect.top > pPY || aVisibilityRect.bottom < pPY) {
                    if (this.mIsInVisibilityRect) {
                        this.exitVisibilityRect(false);
                    }
                    return false;
                }
                if (!this.mIsInVisibilityRect) {
                    this.enterVisibilityRect(false);
                }
                return true;
            }
            //_____________________________________________________________
            proximityCheck(pPosition, pUserX, pUserY) {
                if (this.mData.activeArea == null) {
                    return -1;
                }
                let aUniv = asBase.Globals.sBaseUnivFactor;
                let aPx = (((pUserX - pPosition.x) / aUniv) / EntityBase.FACTOR_FROM_3D_ITEMS_C);
                let aPY = (((pUserY - pPosition.z) / aUniv) / EntityBase.FACTOR_FROM_3D_ITEMS_C);
                if (!this.checkIsInVisibilityRect(aPx, aPY)) {
                    return -1;
                }
                let aMeetingRect = this.mData.activeArea.meetingRect;
                if (aMeetingRect == null) {
                    return -1;
                }
                if (aMeetingRect.left > aPx || aMeetingRect.right < aPx || aMeetingRect.top > aPY || aMeetingRect.bottom < aPY) {
                    return -1;
                }
                let aDX = Math.abs(aMeetingRect.centerX - aPx);
                let aDY = Math.abs(aMeetingRect.centerY - aPY);
                return (aDX + aDY);
            }
            //______________________________________________________________
            get isInView() {
                return this.mIsInView;
            }
            //______________________________________________________________
            set isInView(pIsInView) {
                if (this.isInView == pIsInView) {
                    return;
                }
                this.mIsInView = pIsInView;
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].isInView = pIsInView;
                }
            }
            //______________________________________________________________
            setToActive() {
                if (this.mIsActive) {
                    return false;
                }
                this.mIsActive = true;
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].setToActive();
                }
                return true;
            }
            //______________________________________________________________
            setToInactive() {
                for (let i = 0; i < this.mGridCells.length; i++) {
                    if (this.mGridCells[i].isActive) {
                        return false;
                    }
                }
                if (!this.mIsActive) {
                    return false;
                }
                this.mIsActive = false;
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].setToInactive();
                }
                return true;
            }
            //______________________________________________________________
            enterVisibilityRect(pIsChild) {
                if (this.mIsInVisibilityRect) {
                    return false;
                }
                if (!pIsChild) {
                    entity.grid.ProximityManager.instance.visibilityRectEntities[this.id] = this;
                }
                this.mIsInVisibilityRect = true;
                if (this.disabled) {
                    return false;
                }
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].enterVisibilityRect(true);
                }
                return true;
            }
            //______________________________________________________________
            exitVisibilityRect(pIsChild) {
                if (!this.mIsInVisibilityRect) {
                    return false;
                }
                if (!pIsChild) {
                    delete entity.grid.ProximityManager.instance.visibilityRectEntities[this.id];
                }
                this.mIsInVisibilityRect = false;
                if (this.disabled) {
                    return false;
                }
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].exitVisibilityRect(true);
                }
                return true;
            }
            //_________________________________________________________________
            enterNearbyCell(pIsChild) {
                if (this.mIsInNearbyCell) {
                    return false;
                }
                this.mIsInNearbyCell = true;
                if (this.disabled) {
                    return false;
                }
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].enterNearbyCell(true);
                }
                return true;
            }
            //______________________________________________________________
            exitNearbyCell(pIsChild) {
                if (!this.mIsInNearbyCell) {
                    return false;
                }
                this.mIsInNearbyCell = false;
                if (this.disabled) {
                    return false;
                }
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].exitNearbyCell(true);
                }
                return true;
            }
            //_________________________________________________________________
            updateStateFromParent() {
                this.mIsInVisibilityRect = this.parent.mIsInVisibilityRect;
                this.mIsInMeeting = this.parent.mIsInMeeting;
                this.mIsActive = this.parent.mIsActive;
                this.mIsInView = this.parent.mIsInView;
            }
            //_________________________________________________________________
            addChild(pEntity) {
                if (pEntity == null) {
                    return;
                }
                if (pEntity.parent != null) {
                    pEntity.removeChild(pEntity);
                }
                let aDepth = 1;
                let aParent = this.parent;
                while (aParent) {
                    aDepth++;
                    aParent = aParent.parent;
                }
                pEntity.mLastUpdateDepth = aDepth + 1;
                this.mChildren[pEntity.id] = pEntity;
                if (this.data.zoneId != null) {
                    pEntity.data.zoneId = this.data.zoneId;
                }
                if (this.data.children == null) {
                    this.data.initChildren();
                }
                this.data.children[pEntity.id] = pEntity.data;
                pEntity.parent = this;
                pEntity.updateStateFromParent();
            }
            //_________________________________________________________
            update() {
                for (let aKey in this.mChildren) {
                    if (!this.mChildren[aKey].update()) {
                        this.removeChild(this.mChildren[aKey]);
                    }
                }
                return true;
            }
            //_________________________________________________________
            getKeepAliveKey() {
                return null;
                //pEntities[i].zoneId + "_" + pEntities[i].id;
            }
            //_________________________________________________________
            updateHighFrequencyData(pData) {
                if (this.mHighFrequencyData == null) {
                    this.mHighFrequencyData = this.createHighFrequencyDataObject();
                }
                if (this.mHighFrequencyData.unique != null && this.mHighFrequencyData.unique == pData.unique) {
                    return false;
                }
                this.mHighFrequencyData.readFromJson(pData);
                //this.setId();
                return true;
            }
            //_________________________________________________________
            updateData(pData, pLastUpdateDepth) {
                if (this.data.unique != null && this.data.unique == pData.unique) {
                    return false;
                }
                if (this.mLastUpdateDepth < pLastUpdateDepth) {
                    return false;
                }
                entity.EntityManager.convertFromVideoToSlideshow(pData);
                this.mLastUpdateDepth = pLastUpdateDepth;
                if (!pData.zoneId) { //TODO: check if this is the desired behaviour
                    pData.zoneId = entity.EntityManager.currentZoneId;
                }
                let aWasDisabled = this.disabled;
                this.mData.readFromJson(pData);
                //this.setId();
                if (aWasDisabled != this.disabled) {
                    if (this.disabled) {
                        this.onDisabled();
                    }
                    else {
                        this.onEnabled();
                    }
                }
                this.addClickActions();
                if (this.mChildren) {
                    for (let aKey in this.mChildren) {
                        if (!pData.children[aKey]) {
                            entity.EntityManager.instance.removeEntity(aKey);
                        }
                    }
                }
                if (pData.children != null) {
                    for (let aKey in pData.children) {
                        entity.EntityManager.convertFromVideoToSlideshow(pData.children[aKey]);
                        if (this.mChildren[aKey] == null) {
                            let aEntity = asBase.Utils.getInstanceByClassPath(pData.children[aKey].type);
                            aEntity.mItemID = this.mItemID;
                            aEntity.id;
                            aEntity.updateData(pData.children[aKey], pLastUpdateDepth + 1);
                            this.addChild(aEntity);
                        }
                        else {
                            if (this.mChildren[aKey].data.type != pData.children[aKey].type) {
                                let a3D = this.mChildren[aKey].display3D;
                                let a2D = this.mChildren[aKey].display2D;
                                this.mChildren[aKey].destruct();
                                let aEntity = asBase.Utils.getInstanceByClassPath(pData.children[aKey].type);
                                aEntity.updateData(pData.children[aKey], pLastUpdateDepth + 1);
                                if (a3D != null) {
                                    aEntity.display3D = a3D;
                                }
                                if (a2D != null) {
                                    aEntity.display2D = a2D;
                                }
                                this.addChild(aEntity);
                            }
                            else {
                                this.mChildren[aKey].updateData(pData.children[aKey], pLastUpdateDepth + 1);
                            }
                            this.data.children[aKey] = this.mChildren[aKey].data;
                        }
                    }
                }
                entity.EntityManager.instance.getEntityFromChildren(this);
                if (!this.mReceivedFirstUpdate) {
                    this.onFirstUpdate();
                }
                return true;
            }
            //_________________________________________________________
            onClick(pIntersects, pEvent) {
                let aIsToUpdateFireBase = false;
                for (let aKey in this.mActions) {
                    if (this.mActions[aKey].onClick(pIntersects)) {
                        aIsToUpdateFireBase = true && this.mActions[aKey].isToSendToFireBase;
                    }
                }
                if (aIsToUpdateFireBase) {
                    this.sendDataToFireBase();
                }
            }
            //_________________________________________________________
            addClickActions() {
                if (this.mData.clickAction == null) {
                    return null;
                }
                for (let aKey in this.mData.clickAction) {
                    if (this.mActions[aKey] == null) {
                        this.mActions[aKey] = asBase.Utils.getInstanceByClassPath(this.mData.clickAction[aKey].type);
                        this.mActions[aKey].init(this, aKey);
                    }
                    if (this.mActions[aKey] == null) {
                        return;
                    }
                    this.mActions[aKey].readFromJson(this.mData.clickAction[aKey].data);
                }
            }
            //_________________________________________________________
            removeChild(pEntity) {
                if (pEntity == null) {
                    return;
                }
                if (pEntity.parent == this) {
                    pEntity.parent = null;
                }
                this.mChildren[pEntity.id] = null;
                delete this.mChildren[pEntity.id];
                // TODO: Remove From FireBase
            }
            //__________________________________________________
            removeChildren(pIsWithDestruct = false, pForce = false) {
                for (let aKey in this.mChildren) {
                    let aEntity = this.mChildren[aKey];
                    if (pIsWithDestruct) {
                        aEntity.destruct(pForce);
                    }
                    aEntity.parent = null;
                }
                this.mChildren = {};
                // TODO: Remove From FireBase
            }
            //____________________________________________________
            setFireBaseCallback(pUpdateFireBaseCallback) {
                this.mUpdateFireBaseCallback = pUpdateFireBaseCallback;
            }
            //____________________________________________________
            sendHighFrequencyDataToFireBase() {
                if (!this.mUpdateFireBaseCallback) {
                    return;
                }
                this.mUpdateFireBaseCallback(this.mHighFrequencyData, true, false);
            }
            //____________________________________________________
            deleteFromFireBase() {
                if (!this.mUpdateFireBaseCallback) {
                    return;
                }
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].deleteFromFireBase();
                }
                this.mUpdateFireBaseCallback(this.data, false, true);
            }
            //____________________________________________________
            sendDataToFireBase(iChildPath) {
                if (!this.mUpdateFireBaseCallback) {
                    return;
                }
                if (this.mIsDeleted) {
                    return;
                }
                if (this.mData.clickAction != null) {
                    for (let aKey in this.mData.clickAction) {
                        if (this.mActions[aKey] != null) {
                            this.mData.clickAction[aKey].data = this.mActions[aKey].getSerializeData();
                        }
                    }
                }
                this.mUpdateFireBaseCallback(this.data, false, false, true, iChildPath);
            }
            onEnabled() {
                if (this.mIsInVisibilityRect) {
                    this.mIsInVisibilityRect = false;
                    this.enterVisibilityRect(false);
                }
            }
            //_______________________________________________________________
            onDisabled() {
            }
            //_______________________________________________________________
            onFirstUpdate() {
                this.mReceivedFirstUpdate = true;
            }
            //____________________________________________________
            /****************************
             * Getters and Setters
             ****************************/
            //_____________________________________________________________
            get objectId() {
                if (this.m3DItem == null) {
                    return -1;
                }
                if (this.m3DItem.objectId != null) {
                    return this.m3DItem.objectId;
                }
                if (this.m3DItem.parent == null) {
                    return -1;
                }
                if (this.m3DItem.parent.objectId != null) {
                    return this.m3DItem.parent.objectId;
                }
                return -1;
            }
            //_____________________________________________________________
            get data() {
                if (this.mData == null) {
                    this.mData = this.createDataObject();
                }
                return this.mData;
            }
            //_____________________________________________________________
            set parent(pVal) {
                this.mParent = pVal;
            }
            get parent() {
                return (this.mParent);
            }
            //_________________________________________________________________
            get children() {
                return (this.mChildren);
            }
            //_____________________________________________________
            get channelKey() {
                let aChannel = "";
                let aMaxLength = 63;
                if (asBase.Globals.sInstanceID) {
                    aMaxLength -= asBase.Globals.sInstanceID.length;
                }
                if (this.data.id.length >= aMaxLength) {
                    if (this.objectId != null) {
                        aChannel += `${this.objectId}_`;
                    }
                    aChannel += `${this.data.zoneId}_`;
                    let aLeftToFill = aMaxLength - aChannel.length;
                    if (aLeftToFill > 0) {
                        aChannel += this.data.id.substr(0, aLeftToFill);
                    }
                }
                else {
                    aChannel = this.data.id;
                }
                if (asBase.Globals.sInstanceID) {
                    aChannel += asBase.Globals.sInstanceID;
                }
                return aChannel;
            }
            //___________________________________________________________
            static createId(pName, pItemId, pOldID) {
                if (pItemId == -1) {
                    return pOldID;
                }
                if ((pOldID != null) && (pOldID != "") && (pOldID.indexOf(entity.DaEntityBase.ID_CONV_VERSIN) != 0)) {
                    return pOldID;
                }
                if (pName == null) {
                    if (pOldID == null) {
                        pName = "entity";
                    }
                    else {
                        let aNameParts = pOldID.split("_");
                        if (aNameParts[0] + "_" != entity.DaEntityBase.ID_CONV_VERSIN) {
                            pName = aNameParts[0];
                        }
                        else if (aNameParts.length > 1) {
                            pName = aNameParts[1];
                        }
                        else {
                            pName = "entity";
                        }
                    }
                }
                return (entity.DaEntityBase.ID_CONV_VERSIN + pName + "_" + pItemId);
            }
            //_____________________________________________________
            setItemId(pId) {
                this.mItemID = pId;
                this.setId();
            }
            //_____________________________________________________
            setId() {
                if (this.data.name == "") {
                    this.data.name = this.constructor.name;
                }
                this.mData.id = EntityBase.createId(this.data.name, this.mItemID, this.mData.id);
            }
            //___________________________________________________
            get activeRadius() {
                if (this.mData.activeArea == null) {
                    return 0;
                }
                if (this.mData.activeArea.sqrRadius == null) {
                    return 0;
                }
                return this.mData.activeArea.sqrRadius;
            }
            //___________________________________________________________
            get id() {
                return this.data.id;
            }
            get name() {
                return this.data.name;
            }
            get tag() {
                return this.data.tag;
            }
            get display3D() {
                return this.m3DItem;
            }
            //________________________________________________________
            set display3D(pTHREE_object) {
                this.m3DItem = pTHREE_object;
                if (this.data != null) {
                    if (this.data.activeArea != null) {
                        if (asBase.constants.DaUnderDevelopment.USE_PROXIMITY_GRID) {
                            entity.grid.GridManager.instance.setEntity(this);
                        }
                    }
                }
            }
            get position3D() {
                if (this.m3DItem != null && this.m3DItem.parent != null) {
                    return this.m3DItem.parent.position;
                }
                return null;
            }
            //_____________________________________________________________
            get display2D() {
                return this.m2DItem;
            }
            set display2D(p2DAsSVG_object) {
                this.m2DItem = p2DAsSVG_object;
            }
            //_____________________________________________________________
            get disabled() {
                return this.data.disabled == true;
            }
            get isDeleted() {
                return this.mIsDeleted;
            }
            /****************************
             * destructs
             ****************************/
            //__________________________________________________
            destructChildren(pForce = false) {
                for (let aKey in this.mChildren) {
                    this.mChildren[aKey].destruct(pForce);
                }
                this.mChildren = {};
            }
            //_______________________________________________________________
            removeFromGrid() {
                for (let i = 0; i < this.mGridCells.length; i++) {
                    this.mGridCells[i].remove(this);
                }
            }
            //_______________________________________________________________
            destruct(pForce = false, pWithChildren = true) {
                if ((this.mDoNotDestroy) && (!pForce)) {
                    return;
                }
                this.mIsDeleted = true;
                if (pWithChildren) {
                    this.destructChildren(pForce);
                }
                this.removeFromGrid();
                asBase.events.EventManager.removeAllOwnerEvents(this);
                this.userExit();
                this.exitNearbyCell(false); //TODO: check
                // this.disposeOf3d();
            }
            disposeOf3d() {
                if (this.display3D) {
                    (this.display3D /* as THREE.Mesh*/).traverse(this.disposeOf3dTraversal);
                }
            }
            disposeOf3dTraversal(pObject /*: THREE.Object3D*/) {
                if (pObject && pObject.isMesh && pObject.material) {
                    let aMaterials = pObject.material;
                    if (!Array.isArray(aMaterials)) {
                        aMaterials = [aMaterials];
                    }
                    aMaterials.forEach(pMaterial => {
                        if (pMaterial.map) {
                            pMaterial.map.dispose();
                        }
                        if (pMaterial.lightMap) {
                            pMaterial.lightMap.dispose();
                        }
                        if (pMaterial.matcap) {
                            pMaterial.matcap.dispose();
                        }
                        if (pMaterial.alphaMap) {
                            pMaterial.alphaMap.dispose();
                        }
                        if (pMaterial.bumpMap) {
                            pMaterial.bumpMap.dispose();
                        }
                        if (pMaterial.normalMap) {
                            pMaterial.normalMap.dispose();
                        }
                        if (pMaterial.clearcoatNormalMap) {
                            pMaterial.clearcoatNormalMap.dispose();
                        }
                        if (pMaterial.displacementMap) {
                            pMaterial.displacementMap.dispose();
                        }
                        if (pMaterial.roughnessMap) {
                            pMaterial.roughnessMap.dispose();
                        }
                        if (pMaterial.metalnessMap) {
                            pMaterial.metalnessMap.dispose();
                        }
                        if (pMaterial.specularMap) {
                            pMaterial.specularMap.dispose();
                        }
                        if (pMaterial.envMap) {
                            pMaterial.envMap.dispose();
                        }
                        if (pMaterial.gradientMap) {
                            pMaterial.gradientMap.dispose();
                        }
                        if (pMaterial.aoMap) {
                            pMaterial.aoMap.dispose();
                        }
                        if (pMaterial.emissiveMap) {
                            pMaterial.emissiveMap.dispose();
                        }
                    });
                    pObject.geometry.dispose();
                }
            }
        }
        EntityBase.FACTOR_FROM_3D_ITEMS_C = 4.55;
        entity.EntityBase = EntityBase;
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        class EntityContext {
        }
        EntityContext.AVATAR_HEIGHT_FACTOR = 1 / 6;
        EntityContext.allowPlayVideo = true;
        EntityContext.userEnterTheEvent = false;
        entity.EntityContext = EntityContext;
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
/// <reference path="../constants/DaUnderDevelopment.ts" />
var asBase;
/// <reference path="../constants/DaUnderDevelopment.ts" />
(function (asBase) {
    var entity;
    (function (entity) {
        let DisplayState;
        (function (DisplayState) {
            DisplayState[DisplayState["NO_DISPLAY_STATE"] = 0] = "NO_DISPLAY_STATE";
            DisplayState[DisplayState["DISPLAY_2D"] = 1] = "DISPLAY_2D";
            DisplayState[DisplayState["DISPLAY_3D"] = 2] = "DISPLAY_3D";
        })(DisplayState = entity.DisplayState || (entity.DisplayState = {}));
        class EntityManager {
            //__________________________________________________
            constructor() {
                this.mDisplayState = DisplayState.NO_DISPLAY_STATE;
                this.mEntities3DItems = {};
                this.mEntityColliderDic = {};
                this.mEntityColliders = [];
                this.mEntitiesData = {};
                this.mEntities = {};
                setInterval(() => this.sendKeepAlive(), 10 * 1000);
            }
            static update(pData, pUniqueId, p3DItem) {
                //if (pData.id == null) {
                //    console.error("Missing Entity Id ", pData);
                //    return null;
                //}
                if (EntityManager.mFloorPlanesEntities[pData.id] != null) {
                    pData = EntityManager.mFloorPlanesEntities[pData.id];
                }
                EntityManager.setUniqueId(pData, pUniqueId);
                EntityManager.convertFromVideoToSlideshow(pData);
                let aEntity = EntityManager.instance.mEntities[pData.id];
                if (aEntity == null) {
                    if (pData.type == null) {
                        return null;
                    }
                    aEntity = asBase.Utils.getInstanceByClassPath(pData.type);
                    if (aEntity == null) {
                        return null;
                    }
                    if (p3DItem != null) {
                        aEntity.display3D = p3DItem;
                    }
                }
                aEntity.setItemId(pUniqueId);
                aEntity.updateData(pData, 1);
                EntityManager.setEntitiesNames(pData);
                return aEntity;
            }
            //__________________________________________________
            static deleteFromEntitiesNames(pData) {
                for (let aKey in EntityManager.mEntitiesNames) {
                    if (EntityManager.mEntitiesNames[aKey].id == pData.id) {
                        delete EntityManager.mEntitiesNames[aKey];
                    }
                }
            }
            //__________________________________________________
            static getEntityIdByName(pName) {
                if (EntityManager.mEntitiesNames[pName] == null) {
                    return null;
                }
                return EntityManager.mEntitiesNames[pName];
            }
            //__________________________________________________
            static removeAllEntitiesNames() {
                EntityManager.mEntitiesNames = {};
            }
            //__________________________________________________
            static setEntitiesNames(pData) {
                if (pData.name == null) {
                    return;
                }
                if (pData.id == null) {
                    return;
                }
                EntityManager.mEntitiesNames[pData.name] = pData;
            }
            //__________________________________________________
            static loadEntityFromMicroService(pOCID, pFloorPlan, pEntityId) {
                if (pOCID == null) {
                    pOCID = EntityManager.instance.mCurrentOccasion;
                }
                else {
                    EntityManager.instance.mCurrentOccasion = pOCID;
                }
                if (pFloorPlan == null) {
                    pFloorPlan = parseInt(EntityManager.instance.mCurrentZone);
                }
                else {
                    EntityManager.instance.mCurrentZone = pFloorPlan.toString();
                }
                return new Promise((resolve, reject) => EntityManager.asyncLoadEntityFromMicroService(resolve, reject, pOCID, pFloorPlan, pEntityId));
            }
            //_________________________________________________________________________
            static asyncLoadEntityFromMicroService(pResolve, pReject, pOCID, pFloorPlan, pEntityId) {
                if (pEntityId == null) {
                    EntityManager.mFloorPlanesEntities = {};
                }
                const aData = JSON.stringify({
                    "occasionId": pOCID.toString(),
                    "query": {
                        "id": pEntityId,
                        "zoneId": pFloorPlan
                    },
                    "limit": 0,
                    "skip": 0
                });
                const aXhr = new XMLHttpRequest();
                aXhr.withCredentials = true;
                aXhr.addEventListener("readystatechange", () => EntityManager.onLoadEntityFromMicroService(aXhr, pResolve));
                aXhr.open("POST", EntityManager.ENTITIES_MICRO_SERVICE_URL);
                aXhr.setRequestHeader("Content-Type", "application/json");
                aXhr.send(aData);
            }
            //__________________________________________________
            static onLoadEntityFromMicroService(aXhr, pResolve) {
                if (aXhr.readyState != aXhr.DONE) {
                    return;
                }
                let aObject;
                try {
                    aObject = JSON.parse(aXhr.responseText);
                }
                catch (e) {
                    aObject = {};
                }
                for (let aKey in aObject) {
                    EntityManager.mFloorPlanesEntities[aObject[aKey].id] = aObject[aKey];
                }
                pResolve();
            }
            //__________________________________________________
            getEntityFromChildren(pEntity) {
                EntityManager.instance.mEntities[pEntity.id] = pEntity;
                pEntity.setFireBaseCallback(this.mUpdateFireBaseCallback);
                if (pEntity.children != null) {
                    for (let aKey in pEntity.children) {
                        this.getEntityFromChildren(pEntity.children[aKey]);
                    }
                }
            }
            //__________________________________________________
            sendKeepAlive() {
                let aKeepAliveEntities = new Array();
                for (let aKey in this.mEntities) {
                    let aKeepAliveKey = this.mEntities[aKey].getKeepAliveKey();
                    if (aKeepAliveKey != null) {
                        aKeepAliveEntities.push(aKeepAliveKey);
                    }
                }
                if (aKeepAliveEntities.length > 0) {
                    this.mKeepAliveCallback(this.mUniqueId, aKeepAliveEntities, false);
                }
            }
            //__________________________________________________
            static get instance() {
                if (EntityManager.mInstance == null) {
                    EntityManager.mInstance = new EntityManager();
                }
                return EntityManager.mInstance;
            }
            //__________________________________________________
            initFireBaseListener(pUpdateFireBaseCallback) {
                this.mUpdateFireBaseCallback = pUpdateFireBaseCallback;
                asBase.events.EventManager.addEventListener(asBase.entity.EvEntity.ENTITY_UPDATE_EV, (data) => this.onUpdateFromFireBase(data), this);
                asBase.events.EventManager.addEventListener(asBase.entity.EvEntity.ENTITY_UPDATE_FROM_SERVER_EV, (data) => this.onUpdateFromServer(data), this);
                for (let aKey in this.mEntities) {
                    this.mEntities[aKey].setFireBaseCallback(this.mUpdateFireBaseCallback);
                }
            }
            //_____________________________________________________________________________
            initKeepAlive(pKeepAliveCallback) {
                this.mKeepAliveCallback = pKeepAliveCallback;
            }
            //_____________________________________________________________________________
            updateNumOfUsersInCollab(pNumber) {
                this.mNumOfCollabUsers = pNumber;
            }
            //_____________________________________________________________________________
            updateData(pData, pEntityId, pIsToUpdateEntity = true) {
                this.mEntitiesData[pEntityId] = pData;
                if (pIsToUpdateEntity) {
                    if (this.mEntities[pEntityId] != null) {
                        this.mEntities[pEntityId].updateData(pData, 1);
                    }
                }
            }
            //__________________________________________________
            getEntityData(pEntityID) {
                return this.mEntitiesData[pEntityID];
            }
            //__________________________________________________
            onUpdateFromServer(pData) {
                if (EntityManager.lastUpdateFromServer == null) {
                    EntityManager.lastUpdateFromServer = new Map();
                }
                EntityManager.lastUpdateFromServer.clear();
                let aData = pData.data;
                for (let i = 0; i < aData.list.length; i++) {
                    let aId = aData.list[i].id;
                    let aEntity = this.mEntities[aId];
                    if (aEntity == null) {
                        continue;
                    }
                    EntityManager.lastUpdateFromServer.set(aId, true);
                    aEntity.updateHighFrequencyData(aData.list[i]);
                    aEntity.data.updatedFromFirebase = true;
                }
            }
            //__________________________________________________
            async onUpdateFromFireBase(pData) {
                let aEvent = pData.mData;
                let aEntity = this.mEntities[aEvent.data.id];
                if (aEvent.data.reset) {
                    if (aEntity != null) {
                        this.mEntities3DItems[aEvent.data.id] = aEntity.display3D;
                    }
                    this.removeEntity(aEvent.data.id);
                    aEntity = null;
                    await EntityManager.loadEntityFromMicroService(null, null, aEvent.data.id);
                }
                switch (aEvent.action) {
                    case entity.EvEntity.REGULAR_FREQUENCY:
                        if (aEntity == null) {
                            EntityManager.update(aEvent.data, -1, this.mEntities3DItems[aEvent.data.id]);
                        }
                        else {
                            aEntity.updateData(aEvent.data, 1);
                        }
                        if (aEntity) {
                            aEntity.data.updatedFromFirebase = true;
                        }
                        break;
                    case entity.EvEntity.HIGH_FREQUENCY:
                        if (aEntity == null) {
                            return;
                        }
                        aEntity.updateHighFrequencyData(aEvent.data);
                        aEntity.data.updatedFromFirebase = true;
                        break;
                    case entity.EvEntity.DELETE:
                        if (aEntity == null) {
                            return;
                        }
                        this.removeEntity(aEvent.data.id);
                        break;
                }
            }
            //___________________________________________________
            leavingEvent() {
                for (let aKey in this.mEntities) {
                    this.removeEntity(aKey);
                }
            }
            //___________________________________________________
            removeEntity(pId) {
                if (this.mEntities[pId] != null) {
                    if (this.mEntities[pId].parent) {
                        delete this.mEntities[pId].parent.children[pId];
                    }
                    this.mEntities[pId].destruct();
                    this.mEntities[pId] = null;
                }
                delete this.mEntities[pId];
            }
            //__________________________________________________
            displayStateChange(pType, pPanel) {
                if ((pType == DisplayState.DISPLAY_2D) && (pPanel != null)) {
                    this.m2DPanel = pPanel;
                }
                if ((pType == DisplayState.DISPLAY_3D) && (pPanel != null)) {
                    this.m3DPanel = pPanel;
                }
                if (this.mDisplayState == pType) {
                    return;
                }
                this.mDisplayState = pType;
                for (let aKey in this.mEntities) {
                    this.mEntities[aKey].onStateChange(pType);
                }
            }
            //__________________________________________________
            setZone(pZone) {
                if (asBase.constants.DaUnderDevelopment.USE_PROXIMITY_GRID) {
                    entity.grid.GridManager.instance.clear();
                }
                if (this.mCurrentZone == pZone) {
                    return;
                }
                this.mCurrentZone = pZone;
                this.sendKeepAlive();
                this.removeAllEntitiesNotInThisZone();
            }
            //__________________________________________________
            showAllEntities() {
                for (let aKey in this.mEntities) {
                    if (this.mEntities[aKey].display3D != null) {
                        this.mEntities[aKey].display3D.visible = true;
                    }
                }
            }
            //__________________________________________________
            hideAllEntities() {
                for (let aKey in this.mEntities) {
                    if (this.mEntities[aKey].display3D != null) {
                        this.mEntities[aKey].display3D.visible = false;
                    }
                }
            }
            //__________________________________________________
            removeAllEntities() {
                for (let aKey in this.mEntities) {
                    this.removeEntity(aKey);
                }
            }
            //__________________________________________________
            static convertFromVideoToSlideshow(pData) {
                if (!EntityManager.IS_TO_CONVERT_FROM_VIDEO_TO_SLIDESHOW) {
                    return;
                }
                if (pData.type != "entities.video.VideoEntity") {
                    return;
                }
                pData.type = "entities.slides.SlideShowEntity";
                if (pData.url != null) {
                    pData.urls = [pData.url];
                    pData.isPaused = false;
                }
            }
            //__________________________________________________
            static setUniqueId(pData, pUniqueId) {
                if (pUniqueId == -1) {
                    return;
                }
                pData.id = entity.EntityBase.createId(pData.name, pUniqueId, pData.id);
                let aNames = [];
                for (let aKey in pData.children) {
                    let aNewKey = entity.EntityBase.createId(pData.children[aKey].name, pUniqueId, pData.children[aKey].id);
                    if (aNames.indexOf(aNewKey) != -1) {
                        aNewKey += "_" + aNames.length;
                    }
                    aNames.push(aNewKey);
                    pData.children[aNewKey] = pData.children[aKey];
                    if (aKey != aNewKey) {
                        delete pData.children[aKey];
                    }
                    pData.children[aNewKey].id = aNewKey;
                }
            }
            //__________________________________________________
            removeAllEntitiesNotInThisZone() {
                let aKeepAliveEntities = new Array();
                for (let aKey in this.mEntities) {
                    if ((this.mEntities[aKey].data.zoneId != this.mCurrentZone) && (this.mEntities[aKey].data.zoneId != entity.DaEntityBase.GLOBAL)) {
                        let aKeepAliveKey = this.mEntities[aKey].getKeepAliveKey();
                        if (aKeepAliveKey != null) {
                            aKeepAliveEntities.push(aKeepAliveKey);
                        }
                        this.removeEntity(aKey);
                    }
                }
                if (aKeepAliveEntities.length > 0) {
                    this.mKeepAliveCallback(this.mUniqueId, aKeepAliveEntities, true);
                }
            }
            //__________________________________________________
            addEntityCollider(iID, iCollider) {
                if (this.mEntityColliderDic[iID]) {
                    if (this.mEntityColliderDic[iID] == iCollider) {
                        return; //if unchanged, do nothing
                    }
                    else {
                        this.removeEntityCollider(iID); //if changed, remove and readd
                    }
                }
                this.mEntityColliderDic[iID] = iCollider;
                this.mEntityColliders.push(iCollider);
            }
            //__________________________________________________
            removeEntityCollider(iID) {
                let aCollider = this.mEntityColliderDic[iID];
                if (aCollider == null) {
                    return;
                }
                for (let i = 0; i < this.mEntityColliders.length; i++) {
                    if (this.mEntityColliders[i] == aCollider) {
                        this.mEntityColliders.splice(i, 1);
                    }
                }
                delete this.mEntityColliderDic[iID];
            }
            //__________________________________________________
            get entityColliders() {
                return this.mEntityColliders;
            }
            //__________________________________________________
            get displayState() {
                return this.mDisplayState;
            }
            //__________________________________________________
            get panel2D() {
                return this.m2DPanel;
            }
            //__________________________________________________
            getEntityById(pId) {
                return this.mEntities[pId];
            }
            //__________________________________________________
            getEntitiesByPartId(pPartId) {
                let aEntities = [];
                for (let aKey in this.mEntities) {
                    if (aKey.indexOf(pPartId) > 0) {
                        aEntities.push(this.mEntities[aKey]);
                    }
                }
                return aEntities;
            }
            //_________________________________________________
            getEntitiesOfType(iType) {
                let aEntityList = EntityManager.instance.entityList;
                let aEntities = [];
                for (let aKey in aEntityList) {
                    if (aEntityList[aKey].data.type == iType) {
                        aEntities.push(aEntityList[aKey]);
                    }
                }
                return aEntities;
            }
            //_____________________________________________________________________________________________
            getEntitiesWithTag(iTag) {
                let aEntityList = EntityManager.instance.entityList;
                let aEntities = [];
                for (let aKey in aEntityList) {
                    if (aEntityList[aKey].data.tag == iTag) {
                        aEntities.push(aEntityList[aKey]);
                    }
                }
                return aEntities;
            }
            //_____________________________________________________________________________________________
            getAllTags() {
                let aEntityList = EntityManager.instance.entityList;
                let aTags = {};
                for (let aKey in aEntityList) {
                    aTags[aEntityList[aKey].tag] = true;
                }
                return Object.keys(aTags);
            }
            //_____________________________________________________________________________________________
            get entityList() {
                return this.mEntities;
            }
            //__________________________________________________
            static get currentZoneId() {
                return EntityManager.instance.mCurrentZone;
            }
            //__________________________________________________
            get isManager() {
                return this.mIsManager;
            }
            set isManager(pIsManager) {
                this.mIsManager = pIsManager;
            }
            //__________________________________________________
            get panel3D() {
                return this.m3DPanel;
            }
            //__________________________________________________
            // For deleting me-entity..
            get uniqueId() {
                return this.mUniqueId;
            }
            set uniqueId(pUniqueId) {
                this.mUniqueId = pUniqueId;
            }
            //_______________________________________________
            get numOfCollabUsers() {
                return this.mNumOfCollabUsers;
            }
        }
        EntityManager.ENTITIES_MICRO_SERVICE_URL = "https://msrv.allseated.com/as-hybrid/mongo/read";
        EntityManager.IS_TO_CONVERT_FROM_VIDEO_TO_SLIDESHOW = false;
        EntityManager.mFloorPlanesEntities = {};
        EntityManager.mEntitiesNames = {};
        entity.EntityManager = EntityManager;
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        class EvEntity {
            constructor(type, action, data) {
                this.mType = type;
                this.mAction = action;
                this.mData = data;
                //this.mSenderData = new DaEntityBase();
            }
            /****************************
             * Getters and Setters
             ****************************/
            get data() {
                if (this.mData != null) {
                    return this.mData;
                }
                return null;
            }
            //_________________________________________
            set data(data) {
                this.mData = data;
            }
            //_________________________________________
            get senderData() {
                return this.mSenderData;
            }
            //_________________________________________
            get action() {
                if (this.mAction != null) {
                    return this.mAction;
                }
                return null;
            }
            //_________________________________________
            set action(value) {
                this.mAction = value;
            }
            //_________________________________________
            get type() {
                if (this.mType != null) {
                    return this.mType;
                }
                return this.mType;
            }
            //_________________________________________
            set type(value) {
                this.mType = value;
            }
        }
        EvEntity.ENTITY_UPDATE_FROM_SERVER_EV = 'ENTITY_UPDATE_FROM_SERVER_EVENT';
        EvEntity.ENTITY_UPDATE_EV = 'ENTITY_UPDATE_EVENT';
        EvEntity.BANCH_ENTITY_UPDATE_EV = 'ENTITY_UPDATE_EVENT';
        EvEntity.REGULAR_FREQUENCY = 'REGULAR_FREQUENCY';
        EvEntity.HIGH_FREQUENCY = 'HIGH_FREQUENCY';
        EvEntity.DELETE = 'DELETE_ENTITY';
        EvEntity.OPEN_LIVE_STREAM = 'OPEN_LIVE_STREAM';
        EvEntity.CLOSE_LIVE_STREAM = 'CLOSE_LIVE_STREAM';
        EvEntity.CLOSE_LIVE_STREAM_BY_USER = 'CLOSE_LIVE_STREAM_BY_USER';
        EvEntity.EXIT_SINGLE_CHANNEL_AREA = 'EXIT_SINGLE_CHANNEL_AREA';
        EvEntity.ENTER_SINGLE_CHANNEL_AREA = 'ENTER_SINGLE_CHANNEL_AREA';
        entity.EvEntity = EvEntity;
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        var grid;
        (function (grid) {
            class DaGridPainterSettings {
                constructor() {
                    this.mScale = grid.GridPainter.BASE_SCALE;
                    this.mXOffset = grid.GridPainter.BASE_X_OFFSET;
                    this.mYOffset = grid.GridPainter.BASE_Y_OFFSET;
                }
                getSerializeData() {
                    return { scale: this.scale, x: this.x, y: this.y };
                }
                readFromJson(iData) {
                    if (iData.scale) {
                        this.scale = iData.scale;
                    }
                    if (iData.x) {
                        this.x = iData.x;
                    }
                    if (iData.y) {
                        this.y = iData.y;
                    }
                }
                get scale() {
                    return this.mScale;
                }
                set scale(iScale) {
                    this.mScale = iScale;
                }
                get x() {
                    return this.mXOffset;
                }
                set x(iX) {
                    this.mXOffset = iX;
                }
                get y() {
                    return this.mYOffset;
                }
                set y(iY) {
                    this.mYOffset = iY;
                }
            }
            grid.DaGridPainterSettings = DaGridPainterSettings;
        })(grid = entity.grid || (entity.grid = {}));
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        var grid;
        (function (grid) {
            class GridCell {
                constructor(pCellX, pCellY) {
                    this.mTimeInSight = -1;
                    this.mIsActive = false;
                    this.mIsInSight = false;
                    this.mHasEntities = false;
                    this.mCellX = pCellX;
                    this.mCellY = pCellY;
                    this.mEntities = {};
                }
                //______________________________________________________________________________
                meshesForMouseDown() {
                    let aMeshesForMouseDown = [];
                    for (let aKey in this.mEntities) {
                        aMeshesForMouseDown = aMeshesForMouseDown.concat(this.mEntities[aKey].meshesForMouseDown);
                    }
                    return aMeshesForMouseDown;
                }
                //______________________________________________________________________________
                onMouseDown(pMouseEvent) {
                    for (let aKey in this.mEntities) {
                        this.mEntities[aKey].onMouseDown(pMouseEvent);
                    }
                }
                //_______________________________________________________________________
                inSight(pIsInSight) {
                    if (this.mIsInSight != pIsInSight) {
                        for (let aKey in this.mEntities) {
                            this.mEntities[aKey].isInView = pIsInSight;
                        }
                        this.mIsInSight = pIsInSight;
                    }
                    if (pIsInSight) {
                        if (this.mTimeInSight == -1) {
                            this.mTimeInSight = Date.now();
                        }
                        else if ((Date.now() - this.mTimeInSight) > GridCell.TIME_TO_ACTIVE) {
                            this.setToActive();
                            this.mTimeInSight = -1;
                        }
                    }
                    else {
                        this.mTimeInSight = -1;
                        this.setToInactive();
                    }
                    return this.mIsActive;
                }
                //_______________________________________________________________________
                setToActive() {
                    if (this.mIsActive) {
                        return;
                    }
                    this.mIsActive = true;
                    if (this.mEntities == null) {
                        return;
                    }
                    //// console.log("--------- Active -------------");
                    for (let aKey in this.mEntities) {
                        this.mEntities[aKey].setToActive();
                        //console.log("Active >> " + aKey);
                    }
                }
                //_______________________________________________________________________
                setToInactive() {
                    if (!this.mIsActive) {
                        return;
                    }
                    this.mIsActive = false;
                    if (this.mEntities == null) {
                        return;
                    }
                    //console.log("--------- Inactive -------------");
                    for (let aKey in this.mEntities) {
                        this.mEntities[aKey].setToInactive();
                        //console.log("Inactive >> " + aKey);
                    }
                }
                //_______________________________________________________________________
                add(pEntity) {
                    this.mHasEntities = true;
                    this.mEntities[pEntity.id] = pEntity;
                    if (this.mIsActive) {
                        pEntity.setToActive();
                    }
                    else {
                        pEntity.setToInactive();
                    }
                    if (grid.GridManager.instance.isNearbyCell(this)) {
                        pEntity.enterNearbyCell(false);
                    }
                }
                //_______________________________________________________________________
                get entities() {
                    return this.mEntities;
                }
                //_______________________________________________________________________
                remove(pEntityBase) {
                    this.mEntities[pEntityBase.id] = null;
                    delete this.mEntities[pEntityBase.id];
                    this.mHasEntities = (Object.keys(this.mEntities).length > 0);
                }
                //_______________________________________________________________________
                get hasEntities() {
                    return this.mHasEntities;
                }
                //_______________________________________________________________________
                get isActive() {
                    return this.mIsActive;
                }
                //_______________________________________________________________________
                get cellX() {
                    return this.mCellX;
                }
                //_______________________________________________________________________
                get cellY() {
                    return this.mCellY;
                }
                //_______________________________________________________________________
                get isInSight() {
                    return this.mIsInSight;
                }
            }
            GridCell.TIME_TO_ACTIVE = 2 * 1000;
            grid.GridCell = GridCell;
        })(grid = entity.grid || (entity.grid = {}));
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
/// <reference path="../../events/EventManager.ts" />
/// <reference path="../../events/MouseEvents.ts" />
var asBase;
/// <reference path="../../events/EventManager.ts" />
/// <reference path="../../events/MouseEvents.ts" />
(function (asBase) {
    var entity;
    (function (entity) {
        var grid;
        (function (grid) {
            var MouseEvents = asBase.events.MouseEvents;
            class GridManager {
                constructor() {
                    this.mLastUpdateTime = 0;
                    this.mLastQ = 0;
                    this.mNearbyCellEntities = {};
                    this.mGrid = new Array();
                    this.mActiveCell = new Array();
                    this.mProximityManager = new grid.ProximityManager();
                    this.mGridPainter = new grid.GridPainter();
                    this.mUserCell = { x: 0, y: 0 };
                }
                //__________________________________________________
                static get instance() {
                    if (GridManager.mInstance == null) {
                        GridManager.mInstance = new GridManager();
                    }
                    return GridManager.mInstance;
                }
                //______________________________________________________________________________
                setEntityByRects(pEntity) {
                    this.mUnivCellSize = Math.round(GridManager.CELL_SIZE * asBase.Globals.sBaseUnivFactor);
                    pEntity.removeFromGrid();
                    for (let i = 0; i < pEntity.data.activeArea.collideRects.length; i++) {
                        this.setEntityByRect(pEntity, pEntity.data.activeArea.collideRects[i], false);
                    }
                }
                //______________________________________________________________________________
                setEntityByRect(pEntity, pRect, iResetGrid = true) {
                    if (this.mUnivCellSize == null) {
                        this.mUnivCellSize = Math.round(GridManager.CELL_SIZE * asBase.Globals.sBaseUnivFactor);
                    }
                    if (iResetGrid) {
                        pEntity.removeFromGrid();
                    }
                    let aPos = pEntity.position3D;
                    let aWorldFactor = asBase.Globals.sBaseUnivFactor * entity.EntityBase.FACTOR_FROM_3D_ITEMS_C;
                    let aTop = Math.round(((aPos.z + (pRect.top * aWorldFactor)) / this.mUnivCellSize)) + GridManager.GRID_HALF_SIZE;
                    let aLeft = Math.round(((aPos.x + (pRect.left * aWorldFactor)) / this.mUnivCellSize)) + GridManager.GRID_HALF_SIZE;
                    let aBottom = Math.round(((aPos.z + (pRect.bottom * aWorldFactor)) / this.mUnivCellSize)) + GridManager.GRID_HALF_SIZE;
                    let aRight = Math.round(((aPos.x + (pRect.right * aWorldFactor)) / this.mUnivCellSize)) + GridManager.GRID_HALF_SIZE;
                    for (let j = aLeft; j <= aRight; j++) {
                        for (let k = aTop; k <= aBottom; k++) {
                            this.addGridCell(pEntity, j, k);
                        }
                    }
                }
                //______________________________________________________________________________
                addGridCell(pEntity, pX, pY) {
                    if (this.mGrid[pX] == null) {
                        this.mGrid[pX] = new Array();
                    }
                    if (this.mGrid[pX][pY] == null) {
                        this.mGrid[pX][pY] = new grid.GridCell(pX, pY);
                    }
                    pEntity.addGridCell(this.mGrid[pX][pY]);
                }
                //______________________________________________________________________________
                setEntity(pEntity) {
                    if (!pEntity.data.isToAddToGrid) {
                        return;
                    }
                    if (pEntity.data.activeArea != null) {
                        if ((pEntity.data.activeArea.collideRects != null) && (pEntity.data.activeArea.collideRects.length > 0)) {
                            this.setEntityByRects(pEntity);
                            return;
                        }
                    }
                    this.mUnivCellSize = Math.round(GridManager.CELL_SIZE * asBase.Globals.sBaseUnivFactor);
                    let aPos = pEntity.position3D;
                    if (aPos == null) {
                        return;
                    }
                    let aCellX = this.worldToCell(aPos.x);
                    let aCellZ = this.worldToCell(aPos.z);
                    if (this.mGrid[aCellX] == null) {
                        this.mGrid[aCellX] = new Array();
                    }
                    if (this.mGrid[aCellX][aCellZ] == null) {
                        this.mGrid[aCellX][aCellZ] = new grid.GridCell(aCellX, aCellZ);
                    }
                    pEntity.updateOneGridCell(this.mGrid[aCellX][aCellZ]);
                }
                //______________________________________________________________________________
                onMouseUp(pEvent) {
                    if (this.mMousDownPoint == null) {
                        return;
                    }
                    if (pEvent.type == MouseEvents.ROLL_OUT) {
                        return;
                    }
                    let aEvent = pEvent;
                    if (pEvent.touches) {
                        aEvent = pEvent.touches[0];
                    }
                    let aPoint = new asBase.math.Point(aEvent.clientX, aEvent.clientY);
                    let aDis = asBase.math.Point.distanceSqr(aPoint, this.mMousDownPoint);
                    if (aDis > 10) {
                        this.mMousDownPoint = null;
                        return;
                    }
                    this.mMousDownPoint.subtract(aPoint);
                    let aMeshesForMouseDown = [];
                    for (let i = 0; i < this.mActiveCell.length; i++) {
                        aMeshesForMouseDown = aMeshesForMouseDown.concat(this.mActiveCell[i].meshesForMouseDown());
                    }
                    if (grid.ProximityManager.allAvatarsInPool != null) {
                        for (let i = 0; i < grid.ProximityManager.allAvatarsInPool.length; i++) {
                            if (grid.ProximityManager.allAvatarsInPool[i].isCurrentlyInUse()) {
                                aMeshesForMouseDown = aMeshesForMouseDown.concat(grid.ProximityManager.allAvatarsInPool[i].getAllMeshes());
                            }
                        }
                    }
                    if (aMeshesForMouseDown.length == 0) {
                        return;
                    }
                    let aIntersects = asBase.events.EventManager.callFunction(asBase.events.FuncType.GET_ELEMENTS_UNDER_MOUSE_FUNC, this, { x: aEvent.clientX, y: aEvent.clientY, meshes: aMeshesForMouseDown });
                    if ((aIntersects == null) || (aIntersects.length == 0)) {
                        return;
                    }
                    let aClickedEntity = aIntersects[0].object.entity;
                    aClickedEntity.onClick(aIntersects[0], pEvent);
                }
                //______________________________________________________________________________
                onMouseDown(pEvent) {
                    let aEvent = pEvent;
                    if (pEvent.touches) {
                        aEvent = pEvent.touches[0];
                    }
                    this.mMousDownPoint = new asBase.math.Point(aEvent.clientX, aEvent.clientY);
                }
                //__________________________________________________
                getCellLocation(pX, pZ) {
                    this.mUnivCellSize = Math.round(GridManager.CELL_SIZE * asBase.Globals.sBaseUnivFactor);
                    let aCellX = Math.floor((pX / this.mUnivCellSize) + GridManager.GRID_HALF_SIZE);
                    let aCellZ = Math.floor((pZ / this.mUnivCellSize) + GridManager.GRID_HALF_SIZE);
                    return { cellX: aCellX, cellY: aCellZ };
                }
                //______________________________________________________________________________
                updateUserTransform(pX, pZ, pRotation) {
                    if (!asBase.entity.EntityContext.userEnterTheEvent) {
                        return;
                    }
                    let aPrevUserCell = { x: this.mUserCell.x, y: this.mUserCell.y };
                    this.mUserCell.x = Math.floor((pX / this.mUnivCellSize) + GridManager.GRID_HALF_SIZE);
                    this.mUserCell.y = Math.floor((pZ / this.mUnivCellSize) + GridManager.GRID_HALF_SIZE);
                    let aTime = Date.now();
                    if (aTime - this.mLastUpdateTime >= GridManager.UPDATE_INTERVAL_MS) {
                        this.mLastUpdateTime = aTime;
                        this.updateGrid(pX, pZ, pRotation);
                    }
                    if (aPrevUserCell.x != this.mUserCell.x || aPrevUserCell.y != this.mUserCell.y) {
                        this.onChangeCell();
                    }
                }
                //______________________________________________________________________________
                updateGrid(pX, pZ, pRotation) {
                    let aCells = this.getCells(this.mUserCell.x, this.mUserCell.y, pRotation);
                    this.mGridPainter.drawGrid();
                    this.mGridPainter.drawCell(this.mUserCell.x, this.mUserCell.y, "#ff0000");
                    if (aCells != null) {
                        for (let i = 0; i < this.mActiveCell.length; i++) {
                            if (aCells.indexOf(this.mActiveCell[i]) == -1) {
                                if (this.mActiveCell[i].inSight(false)) {
                                    this.mGridPainter.drawByCell(this.mActiveCell[i], "#66ff66");
                                }
                            }
                        }
                        this.mActiveCell = aCells;
                    }
                    else {
                        this.mGridPainter.drawAllEntityCell();
                    }
                    let aActiveEntities = {};
                    for (let i = 0; i < this.mActiveCell.length; i++) {
                        if (!this.mActiveCell[i].hasEntities) {
                            continue;
                        }
                        if (this.isInFrustumRad(this.mActiveCell[i], pRotation)) {
                            if (this.mActiveCell[i].inSight(true)) {
                                for (let aKey in this.mActiveCell[i].entities) {
                                    aActiveEntities[aKey] = this.mActiveCell[i].entities[aKey];
                                    this.mGridPainter.drawByCell(this.mActiveCell[i], "#00aa00");
                                }
                            }
                        }
                        else {
                            this.mActiveCell[i].inSight(false);
                            this.mGridPainter.drawByCell(this.mActiveCell[i], "#0033ff");
                        }
                    }
                    this.mProximityManager.checkEntities(aActiveEntities, pX, pZ);
                }
                //_____________________________________________________________________________
                onChangeCell() {
                    let aNewCellEntities = {};
                    for (let i = this.mUserCell.x - GridManager.NEARBY_CELL_RADIUS; i <= this.mUserCell.x + GridManager.NEARBY_CELL_RADIUS; i++) {
                        for (let j = this.mUserCell.y - GridManager.NEARBY_CELL_RADIUS; j <= this.mUserCell.y + GridManager.NEARBY_CELL_RADIUS; j++) {
                            let aCell = this.getCell(i, j);
                            if (!aCell || !aCell.hasEntities) {
                                continue;
                            }
                            let aEntities = aCell.entities;
                            for (let aKey in aEntities) {
                                if (!aNewCellEntities[aKey]) {
                                    aEntities[aKey].enterNearbyCell(false);
                                    aNewCellEntities[aKey] = aEntities[aKey];
                                }
                            }
                        }
                    }
                    for (let aKey in this.mNearbyCellEntities) {
                        if (aNewCellEntities[aKey] == null) {
                            this.mNearbyCellEntities[aKey].exitNearbyCell(false);
                        }
                    }
                    this.mNearbyCellEntities = aNewCellEntities;
                }
                //_____________________________________________________________________________
                isInFrustumDeg(pCell, pRotation) {
                    let aDX = this.mUserCell.x - pCell.cellX;
                    let aDY = this.mUserCell.y - pCell.cellY;
                    let aAngle = Math.atan2(aDX, aDY) * asBase.math.MathUtils.RAD_TO_DEG;
                    pRotation *= asBase.math.MathUtils.RAD_TO_DEG;
                    let aDAngle = Math.abs(aAngle - pRotation);
                    if (aDAngle > 180) {
                        aDAngle = 360 - aDAngle;
                    }
                    if (Math.abs(aDAngle) > 45) {
                        return false;
                    }
                    return true;
                }
                //______________________________________________________________________________
                isInFrustumRad(pCell, pRotation) {
                    let aDX = pCell.cellX - this.mUserCell.x;
                    let aDY = pCell.cellY - this.mUserCell.y;
                    if (Math.abs(aDX) + Math.abs(aDY) < 2) {
                        return true;
                    }
                    if (pRotation > Math.PI) {
                        pRotation -= Math.PI;
                    }
                    else {
                        pRotation += Math.PI;
                    }
                    let aAngle = Math.atan2(aDX, aDY);
                    let aDAngle = Math.abs(aAngle - pRotation);
                    if (aDAngle > Math.PI) {
                        aDAngle = GridManager.FULL_ROUND - aDAngle;
                    }
                    if (Math.abs(aDAngle) > GridManager.QUARTER_OF_ROUND) {
                        return false;
                    }
                    return true;
                }
                //______________________________________________________________________________
                getCells(pCellX, pCellZ, pRotation) {
                    if (pRotation < 0) {
                        pRotation = 2 * Math.PI + pRotation;
                    }
                    let aCellsInView = new Array();
                    let aQ = 0;
                    if ((pRotation > GridManager.Q1_START) && (pRotation <= GridManager.Q1_LIMIT)) {
                        aQ = 1;
                    }
                    else if ((pRotation > GridManager.Q1_LIMIT) && (pRotation <= GridManager.Q2_LIMIT)) {
                        aQ = 2;
                    }
                    else if ((pRotation > GridManager.Q2_LIMIT) && (pRotation <= GridManager.Q3_LIMIT)) {
                        aQ = 3;
                    }
                    else {
                        aQ = 4;
                    }
                    if ((aQ == this.mLastQ) && (this.mLastCellX == pCellX) && (this.mLastCellZ == pCellZ)) {
                        return null;
                    }
                    this.mLastQ = aQ;
                    this.mLastCellX = pCellX;
                    this.mLastCellZ = pCellZ;
                    let aFromX;
                    let aFromZ;
                    let aToX;
                    let aToZ;
                    switch (this.mLastQ) {
                        case 1:
                            aToX = pCellX;
                            aFromX = pCellX - GridManager.LENGTH_OF_FORWARD_SIGHT;
                            aFromZ = pCellZ - GridManager.LENGTH_OF_SIDE_SIGHT;
                            aToZ = pCellZ + GridManager.LENGTH_OF_SIDE_SIGHT;
                            break;
                        case 4:
                            aFromX = pCellX - GridManager.LENGTH_OF_SIDE_SIGHT;
                            aToX = pCellX + GridManager.LENGTH_OF_SIDE_SIGHT;
                            aFromZ = pCellZ - GridManager.LENGTH_OF_FORWARD_SIGHT;
                            aToZ = pCellZ;
                            break;
                        case 3:
                            aFromX = pCellX;
                            aToX = pCellX + GridManager.LENGTH_OF_FORWARD_SIGHT;
                            aFromZ = pCellZ - GridManager.LENGTH_OF_SIDE_SIGHT;
                            aToZ = pCellZ + GridManager.LENGTH_OF_SIDE_SIGHT;
                            break;
                        case 2:
                            aFromX = pCellX - GridManager.LENGTH_OF_SIDE_SIGHT;
                            aToX = pCellX + GridManager.LENGTH_OF_SIDE_SIGHT;
                            aToZ = pCellZ + GridManager.LENGTH_OF_FORWARD_SIGHT;
                            aFromZ = pCellZ;
                            break;
                    }
                    this.mGridPainter.cellsInView = [];
                    for (let aX = aFromX; aX <= aToX; aX++) {
                        for (let aZ = aFromZ; aZ <= aToZ; aZ++) {
                            this.mGridPainter.addCellInView(aX, aZ);
                            if (this.mGrid[aX] == null) {
                            }
                            if (this.mGrid[aX] == null) {
                                this.mGrid[aX] = new Array();
                            }
                            if (this.mGrid[aX][aZ] == null) {
                                this.mGrid[aX][aZ] = new grid.GridCell(aX, aZ);
                            }
                            aCellsInView.push(this.mGrid[aX][aZ]);
                        }
                    }
                    return aCellsInView;
                }
                //______________________________________________________________________________
                getCellsInForwardLine(pCellX, pCellZ, pRotation) {
                    let aActiveCell = new Array();
                    pRotation = -pRotation - Math.PI / 2;
                    let x = GridManager.LENGTH_OF_FORWARD_SIGHT * Math.cos(pRotation);
                    let y = GridManager.LENGTH_OF_FORWARD_SIGHT * Math.sin(pRotation);
                    let a = x / y;
                    if (Math.abs(a) < 1) {
                        if (y < 0) {
                            console.log("Q1 << " + (pRotation * 180 / Math.PI));
                            for (let aY1 = 0; aY1 >= y; aY1--) {
                                let aX1 = Math.ceil(a * aY1);
                                let aCellX = pCellX + aX1;
                                let aCellZ = pCellZ + aY1;
                                if ((this.mGrid[aCellX] == null) || (this.mGrid[aCellX][aCellZ] == null)) {
                                    continue;
                                }
                                aActiveCell.push(this.mGrid[aCellX][aCellZ]);
                            }
                        }
                        else {
                            console.log("Q3 << " + (pRotation * 180 / Math.PI));
                            for (let aY1 = 0; aY1 <= y; aY1++) {
                                let aX1 = Math.floor(a * aY1);
                                let aCellX = pCellX + aX1;
                                let aCellZ = pCellZ + aY1;
                                if ((this.mGrid[aCellX] == null) || (this.mGrid[aCellX][aCellZ] == null)) {
                                    continue;
                                }
                                aActiveCell.push(this.mGrid[aCellX][aCellZ]);
                            }
                        }
                    }
                    else {
                        if (x < 0) {
                            console.log("Q2 << " + (pRotation * 180 / Math.PI));
                            for (let aX1 = 0; aX1 >= x; aX1--) {
                                let aY1 = Math.ceil(aX1 / a);
                                let aCellX = pCellX + aX1;
                                let aCellZ = pCellZ + aY1;
                                if ((this.mGrid[aCellX] == null) || (this.mGrid[aCellX][aCellZ] == null)) {
                                    continue;
                                }
                                aActiveCell.push(this.mGrid[aCellX][aCellZ]);
                            }
                        }
                        else {
                            console.log("Q4 << " + (pRotation * 180 / Math.PI));
                            for (let aX1 = 0; aX1 <= x; aX1++) {
                                let aY1 = Math.floor(aX1 / a);
                                let aCellX = pCellX + aX1;
                                let aCellZ = pCellZ + aY1;
                                if ((this.mGrid[aCellX] == null) || (this.mGrid[aCellX][aCellZ] == null)) {
                                    continue;
                                }
                                aActiveCell.push(this.mGrid[aCellX][aCellZ]);
                            }
                        }
                    }
                    return aActiveCell;
                }
                //______________________________________________________________________________
                isNearbyCell(iCell) {
                    return Math.abs(iCell.cellY - this.mUserCell.y) <= GridManager.NEARBY_CELL_RADIUS
                        && Math.abs(iCell.cellX - this.mUserCell.x) <= GridManager.NEARBY_CELL_RADIUS;
                }
                worldToCell(iPos) {
                    return Math.floor((iPos / this.mUnivCellSize) + GridManager.GRID_HALF_SIZE);
                }
                //______________________________________________________________________________
                cellToWorld(iCell) {
                    return (iCell - GridManager.GRID_HALF_SIZE) * this.univCellSize;
                }
                //______________________________________________________________________________
                get userCell() {
                    return this.mUserCell;
                }
                //______________________________________________________________________________
                getUserCellEntities() {
                    let aCell = this.getCell(this.mUserCell.x, this.mUserCell.y);
                    if (!aCell) {
                        return null;
                    }
                    return aCell.entities;
                }
                //_____________________________________________________________________
                getCell(pCellX, pCellZ) {
                    if (this.mGrid[pCellX] == null) {
                        return null;
                    }
                    return this.mGrid[pCellX][pCellZ];
                }
                //_____________________________________________________________________
                get currentEntityInMeeting() {
                    return this.mProximityManager.currentEntityInMeeting;
                }
                //_____________________________________________________________________
                get univCellSize() {
                    return Math.round(GridManager.CELL_SIZE * asBase.Globals.sBaseUnivFactor);
                }
                //______________________________________________________________________________
                clear(pIsAll = false) {
                    if (pIsAll) {
                        this.mGrid = new Array();
                        this.mProximityManager = new grid.ProximityManager();
                        this.mActiveCell = new Array();
                        this.mUserCell = { x: 0, y: 0 };
                        this.mGridPainter.clear();
                    }
                    else {
                        this.mActiveCell = new Array();
                        this.mGridPainter.clear();
                    }
                }
            }
            GridManager.CELL_SIZE = 250;
            GridManager.GRID_HALF_SIZE = 1000;
            GridManager.LENGTH_OF_SIDE_SIGHT = 7;
            GridManager.LENGTH_OF_FORWARD_SIGHT = 12;
            GridManager.FULL_ROUND = Math.PI * 2;
            GridManager.QUARTER_OF_ROUND = Math.PI / 4;
            GridManager.Q1_START = Math.PI / 4;
            GridManager.Q1_LIMIT = GridManager.Q1_START * 3;
            GridManager.Q2_LIMIT = GridManager.Q1_START * 5;
            GridManager.Q3_LIMIT = GridManager.Q1_START * 7;
            GridManager.NEARBY_CELL_RADIUS = 1;
            GridManager.UPDATE_INTERVAL_MS = 1000;
            grid.GridManager = GridManager;
        })(grid = entity.grid || (entity.grid = {}));
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
/// <reference path="../../events/EventManager.ts" />
var asBase;
/// <reference path="../../events/EventManager.ts" />
(function (asBase) {
    var entity;
    (function (entity) {
        var grid;
        (function (grid) {
            class GridNavigator {
                constructor() {
                    //______________________________________________________________________________
                    this.mCellsToCheck = [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }];
                    this.mEmptyCells = [];
                    this.mFreeCells = [];
                    if (GridNavigator.mInstance != null) {
                        this.mEmptyCells = GridNavigator.mInstance.mEmptyCells;
                        this.mEmptyCellsList = GridNavigator.mInstance.mEmptyCellsList;
                        this.mFreeCellsList = GridNavigator.mInstance.mFreeCellsList;
                        this.mFreeCells = GridNavigator.mInstance.mFreeCells;
                    }
                    else {
                        this.mEmptyCells = new Array();
                        this.fillEmptyCellsListByRect(993, 993, 1007, 1007);
                        // let aEmptyCellsList = '[{"x":989,"y":990},{"x":989,"y":991},{"x":989,"y":992},{"x":990,"y":990},{"x":990,"y":991},{"x":990,"y":992},{"x":990,"y":993},{"x":991,"y":991},{"x":991,"y":992},{"x":991,"y":993},{"x":992,"y":992},{"x":992,"y":993},{"x":992,"y":994},{"x":992,"y":995},{"x":993,"y":994},{"x":993,"y":995},{"x":993,"y":996},{"x":994,"y":995},{"x":994,"y":996},{"x":995,"y":995},{"x":995,"y":996},{"x":996,"y":996},{"x":996,"y":997},{"x":997,"y":996},{"x":997,"y":997},{"x":998,"y":996},{"x":998,"y":997},{"x":998,"y":998},{"x":999,"y":997},{"x":999,"y":998},{"x":1000,"y":997},{"x":1000,"y":998},{"x":1001,"y":997},{"x":1001,"y":998},{"x":1002,"y":997},{"x":1002,"y":998},{"x":1002,"y":999},{"x":1003,"y":998},{"x":1003,"y":999},{"x":1004,"y":999},{"x":1004,"y":1000},{"x":1005,"y":999},{"x":1005,"y":1000},{"x":1005,"y":1001},{"x":1006,"y":1000},{"x":1006,"y":1001},{"x":1006,"y":1002},{"x":1007,"y":1001},{"x":1007,"y":1002},{"x":1007,"y":1003},{"x":1007,"y":1004},{"x":1008,"y":1002},{"x":1008,"y":1003},{"x":1008,"y":1004},{"x":1008,"y":1005},{"x":1008,"y":1006},{"x":1009,"y":1003},{"x":1009,"y":1004},{"x":1009,"y":1005},{"x":1009,"y":1006},{"x":1009,"y":1007},{"x":1009,"y":1008},{"x":1010,"y":1006},{"x":1010,"y":1007}]';
                        // this.mEmptyCellsList = JSON.parse(aEmptyCellsList);
                        this.mFreeCellsList = this.mEmptyCellsList.concat();
                        this.getEmptyCells();
                    }
                }
                //__________________________________________________
                static get instance() {
                    if (GridNavigator.mInstance == null) {
                        GridNavigator.mInstance = new GridNavigator();
                    }
                    return GridNavigator.mInstance;
                }
                //_________________________________________________________________
                getRandomFreeCell() {
                    let aIndex = Math.floor(Math.random() * this.mEmptyCellsList.length);
                    if (aIndex >= this.mEmptyCellsList.length) {
                        aIndex = this.mEmptyCellsList.length - 1;
                    }
                    return this.mEmptyCellsList[aIndex];
                }
                //_______________________________________________________________
                getCellValue(mCellX, mCellY) {
                    if (this.mEmptyCells[mCellX] == null) {
                        return false;
                    }
                    if (this.mEmptyCells[mCellX][mCellY] == null) {
                        return false;
                    }
                    return this.mEmptyCells[mCellX][mCellY];
                }
                //_______________________________________________________________
                markEmptyCell(pCellX, pCellY) {
                    if (this.mEmptyCells[pCellX] == null) {
                        this.mEmptyCells[pCellX] = new Array();
                    }
                    this.mEmptyCells[pCellX][pCellY] = true;
                }
                //_______________________________________________________________
                unmarkEmptyCell(pCellX, pCellY) {
                    if (this.mEmptyCells[pCellX] == null) {
                        this.mEmptyCells[pCellX] = new Array();
                    }
                    this.mEmptyCells[pCellX][pCellY] = false;
                }
                //_______________________________________________________________
                markFreeCell(pCellX, pCellY) {
                    if (this.mFreeCells[pCellX] == null) {
                        this.mFreeCells[pCellX] = new Array();
                    }
                    this.mFreeCells[pCellX][pCellY] = true;
                    this.markEmptyCell(pCellX, pCellY);
                }
                //_______________________________________________________________
                unmarkFreeCell(pCellX, pCellY) {
                    if (this.mFreeCells[pCellX] == null) {
                        this.mFreeCells[pCellX] = new Array();
                    }
                    this.mFreeCells[pCellX][pCellY] = false;
                }
                //_______________________________________________________________
                isEmptyCell(pX, pY) {
                    if (!this.mEmptyCells[pX]) {
                        return false;
                    }
                    if (!this.mEmptyCells[pX][pY]) {
                        return false;
                    }
                    return true;
                }
                //_________________________________________________________________
                getCellCenter(pCellX, pCellY) {
                    let aUnivCellSize = Math.round(asBase.entity.grid.GridManager.CELL_SIZE * asBase.Globals.sBaseUnivFactor);
                    pCellX -= asBase.entity.grid.GridManager.GRID_HALF_SIZE;
                    pCellY -= asBase.entity.grid.GridManager.GRID_HALF_SIZE;
                    let aX = pCellX * aUnivCellSize + aUnivCellSize / 2;
                    let aZ = pCellY * aUnivCellSize + aUnivCellSize / 2;
                    return ({ x: aX, z: aZ });
                }
                //_________________________________________________________________
                getEmptyCells() {
                    if (this.mEmptyCells == null) {
                        this.mEmptyCells = new Array();
                    }
                    if (this.mEmptyCellsList == null) {
                        this.mEmptyCellsList = new Array();
                    }
                    for (let i = 0; i < this.mEmptyCellsList.length; i++) {
                        if (this.mEmptyCells[this.mEmptyCellsList[i].x] == null) {
                            this.mEmptyCells[this.mEmptyCellsList[i].x] = new Array();
                        }
                        this.mEmptyCells[this.mEmptyCellsList[i].x][this.mEmptyCellsList[i].y] = true;
                    }
                }
                //_________________________________________________________________
                fillEmptyCellsListByRect(pFromX, pFromY, pToX, pToY) {
                    this.mEmptyCellsList = [];
                    for (let x = pFromX; x <= pToX; x++) {
                        for (let y = pFromY; y <= pToY; y++) {
                            this.mEmptyCellsList.push({ x: x, y: y });
                        }
                    }
                }
                //_____________________________________________________________________________
                getFreeCells() {
                    if (this.mFreeCells == null) {
                        this.mFreeCells = new Array();
                    }
                    if (this.mFreeCellsList == null) {
                        this.mFreeCellsList = new Array();
                    }
                    for (let i = 0; i < this.mFreeCellsList.length; i++) {
                        if (this.mFreeCells[this.mFreeCellsList[i].x] == null) {
                            this.mFreeCells[this.mFreeCellsList[i].x] = new Array();
                        }
                        this.mFreeCells[this.mFreeCellsList[i].x][this.mFreeCellsList[i].y] = true;
                    }
                    return;
                }
                //_________________________________________________________________
                isFreeCell(pX, pY) {
                    if (!this.mFreeCells) {
                        return false;
                    }
                    if (!this.mFreeCells[pX]) {
                        return false;
                    }
                    return this.mFreeCells[pX][pY];
                }
                /****************************
                 * Getters & Setters
                 ****************************/
                //_____________________________________________________________________________
                getFreeCellsList() {
                    return this.mFreeCellsList;
                }
                set freeCellsList(iFreeCellsList) {
                    this.mFreeCellsList = iFreeCellsList;
                    this.mFreeCells = null;
                    this.getFreeCells();
                }
                //_____________________________________________________________________________
                getEmptyCellsList() {
                    return this.mEmptyCellsList;
                }
                set emptyCellsList(iEmptyCellsList) {
                    this.mEmptyCellsList = iEmptyCellsList;
                    this.mEmptyCells = null;
                    this.getEmptyCells();
                }
                //_____________________________________________________________________________
                setEmptyCellListFromJson(iEmptyCellsList) {
                    this.mEmptyCellsList = JSON.parse(iEmptyCellsList);
                    this.mEmptyCells = null;
                    this.getEmptyCells();
                }
                //_____________________________________________________________________________
                setFreeCellListFromJson(iFreeCellsList) {
                    this.mFreeCellsList = JSON.parse(iFreeCellsList);
                    this.mFreeCells = null;
                    this.getFreeCells();
                }
            }
            grid.GridNavigator = GridNavigator;
        })(grid = entity.grid || (entity.grid = {}));
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        var grid;
        (function (grid) {
            class GridPainter {
                constructor() {
                    this.mFrom = Math.round(grid.GridManager.GRID_HALF_SIZE - GridPainter.GRID_PAINTER_HALF_SIZE);
                    this.mTo = Math.round(grid.GridManager.GRID_HALF_SIZE + GridPainter.GRID_PAINTER_HALF_SIZE);
                    this.mScale = GridPainter.BASE_SCALE;
                    this.mSettings = new grid.DaGridPainterSettings();
                    this.mLastCell = null;
                    if (GridPainter.isEditingMode) {
                        grid.GridNavigator.instance.getEmptyCells();
                    }
                    this.mAvatarsGridClass = asBase.Utils.getClassByPath("entities.avatar.AvatarsGridManager");
                    GridPainter.instance = this;
                }
                //__________________________________________________________________
                createCanvas() {
                    if (!GridPainter.isToDrawGrid) {
                        return;
                    }
                    this.removeGrid();
                    this.mDebugCanvas = document.createElement('canvas');
                    this.mContext = this.mDebugCanvas.getContext("2d");
                    this.setGrid(GridPainter.BASE_SCALE, GridPainter.BASE_X_OFFSET, GridPainter.BASE_Y_OFFSET);
                    if (GridPainter.isEditingMode) {
                        this.mDebugCanvas.addEventListener("click", (e) => this.onClick(e));
                    }
                }
                //_____________________________________________________________________________
                removeGrid() {
                    if (!this.mDebugCanvas) {
                        return;
                    }
                    this.mDebugCanvas.remove();
                }
                //_____________________________________________________________________________
                setGrid(pScale, pX, pY, pOpacity = GridPainter.BASE_OPACITY) {
                    if (this.mDebugCanvas == null) {
                        this.createCanvas();
                    }
                    this.mScale = pScale * asBase.Globals.sBaseUnivFactor;
                    this.mFrom = Math.round(grid.GridManager.GRID_HALF_SIZE - GridPainter.GRID_PAINTER_HALF_SIZE / asBase.Globals.sBaseUnivFactor);
                    this.mTo = Math.round(grid.GridManager.GRID_HALF_SIZE + GridPainter.GRID_PAINTER_HALF_SIZE / asBase.Globals.sBaseUnivFactor) + 200;
                    this.mDebugCanvas.width = GridPainter.BASE_SIZE_X;
                    this.mDebugCanvas.height = GridPainter.BASE_SIZE_Y;
                    this.mContext = this.mDebugCanvas.getContext("2d");
                    document.body.appendChild(this.mDebugCanvas);
                    this.mDebugCanvas.style.position = "fixed"; //absolute?
                    this.mDebugCanvas.style.width = this.mDebugCanvas.width + "px";
                    this.mDebugCanvas.style.height = this.mDebugCanvas.width + "px";
                    this.mDebugCanvas.style.top = pX + "px";
                    this.mDebugCanvas.style.left = pY + "px";
                    this.mDebugCanvas.style.zIndex = "50000";
                    this.mDebugCanvas.style.backgroundColor = "#eeeeee66";
                    this.mDebugCanvas.style.opacity = pOpacity.toString();
                    this.drawGrid();
                }
                //_______________________________________________________________________
                drawGrid() {
                    if (this.cellsInView == null) {
                        return;
                    }
                    if (!GridPainter.isToDrawGrid) {
                        return;
                    }
                    if (this.mDebugCanvas == null) {
                        this.createCanvas();
                    }
                    this.mContext.clearRect(0, 0, this.mDebugCanvas.width, this.mDebugCanvas.height);
                    let aloc1 = (this.mTo - this.mFrom) * grid.GridManager.CELL_SIZE * this.mScale;
                    for (let i = this.mFrom; i < this.mTo; i++) {
                        let aloc2 = (i - this.mFrom) * grid.GridManager.CELL_SIZE * this.mScale;
                        this.mContext.beginPath();
                        this.mContext.moveTo(0, aloc2);
                        this.mContext.lineTo(aloc1, aloc2);
                        this.mContext.moveTo(aloc2, 0);
                        this.mContext.lineTo(aloc2, aloc1);
                        this.mContext.stroke();
                    }
                    this.drawViewCells();
                    this.drawAllEntityCell();
                    if (GridPainter.isDrawAvatarFrustumCells) {
                        this.drawAvatarFrustumCells();
                    }
                }
                //_______________________________________________________________
                drawAvatarFrustumCells() {
                    if (!GridPainter.isToDrawGrid) {
                        return;
                    }
                    let aFrustumCells = this.mAvatarsGridClass.frustumCells;
                    if (aFrustumCells == null) {
                        return;
                    }
                    for (let i = 0; i < aFrustumCells.length; i++) {
                        this.drawCell(aFrustumCells[i].x, aFrustumCells[i].y, "#FF00FF");
                    }
                    let aUserCell = asBase.entity.grid.GridManager.instance.userCell;
                    //this.drawCell(aUserCell.x, aUserCell.y, "#FF00FF");
                }
                //_______________________________________________________________
                drawViewCells() {
                    if (!GridPainter.isToDrawGrid) {
                        return;
                    }
                    if (this.cellsInView == null) {
                        return;
                    }
                    for (let i = 0; i < this.cellsInView.length; i += 2) {
                        this.drawCell(this.cellsInView[i], this.cellsInView[i + 1], "#bbbbbbbb");
                    }
                }
                //_______________________________________________________________
                drawAllEntityCell() {
                    if (!GridPainter.isToDrawGrid) {
                        return;
                    }
                    if (this.mDebugCanvas == null) {
                        this.createCanvas();
                    }
                    for (let x = this.mFrom; x < this.mTo; x++) {
                        for (let y = this.mFrom; y < this.mTo; y++) {
                            let aCell = grid.GridManager.instance.getCell(x, y);
                            if ((aCell != null) && (Object.keys(aCell.entities).length > 0)) {
                                this.drawCell(x, y, "#66ff66");
                            }
                            if (GridPainter.isEditingMode) {
                                if (grid.GridNavigator.instance.isEmptyCell(x, y)) {
                                    this.drawCell(x, y, "#6666ff");
                                }
                                if (grid.GridNavigator.instance.isFreeCell(x, y)) {
                                    this.drawCell(x, y, "#000000");
                                }
                            }
                        }
                    }
                }
                //_______________________________________________________________
                printEmptyCell() {
                    let aJson = JSON.stringify(this.getEmptyCellArray());
                    ////// console.log(aJson);
                }
                //_______________________________________________________________
                getEmptyCellArray() {
                    let aArray = new Array();
                    for (let x = this.mFrom; x < this.mTo; x++) {
                        for (let y = this.mFrom; y < this.mTo; y++) {
                            if (grid.GridNavigator.instance.isEmptyCell(x, y)) {
                                aArray.push({ x: x, y: y });
                            }
                        }
                    }
                    return aArray;
                }
                //_______________________________________________________________
                getFreeCellArray() {
                    let aArray = new Array();
                    for (let x = this.mFrom; x < this.mTo; x++) {
                        for (let y = this.mFrom; y < this.mTo; y++) {
                            if (grid.GridNavigator.instance.isFreeCell(x, y)) {
                                aArray.push({ x: x, y: y });
                            }
                        }
                    }
                    return aArray;
                }
                //_______________________________________________________________
                onClick(e) {
                    let aRect = this.mDebugCanvas.getBoundingClientRect();
                    let aX = e.clientX - aRect.left;
                    let aY = e.clientY - aRect.top;
                    let aCellX = this.mFrom + Math.floor(aX / (grid.GridManager.CELL_SIZE * this.mScale));
                    let aCellY = this.mFrom + Math.floor(aY / (grid.GridManager.CELL_SIZE * this.mScale));
                    if (e.ctrlKey && this.mLastCell) {
                        this.drawRectangle(this.mLastCell, { x: aCellX, y: aCellY });
                        this.mLastCell = null;
                    }
                    else {
                        if (e.shiftKey) {
                            if (grid.GridNavigator.instance.isFreeCell(aCellX, aCellY)) {
                                grid.GridNavigator.instance.unmarkFreeCell(aCellX, aCellY);
                            }
                            else {
                                grid.GridNavigator.instance.markFreeCell(aCellX, aCellY);
                            }
                        }
                        else {
                            if (grid.GridNavigator.instance.isEmptyCell(aCellX, aCellY)) {
                                grid.GridNavigator.instance.unmarkEmptyCell(aCellX, aCellY);
                            }
                            else {
                                grid.GridNavigator.instance.markEmptyCell(aCellX, aCellY);
                            }
                        }
                        if (e.ctrlKey) {
                            this.mLastCell = { x: aCellX, y: aCellY };
                        }
                        else {
                            this.mLastCell = null;
                        }
                    }
                    console.log('Clicked: {"x":' + aCellX + ', "y":' + aCellY + ' },');
                    this.drawGrid();
                    this.printEmptyCell();
                }
                //_______________________________________________________________
                drawByCell(pCell, pColor) {
                    if (!GridPainter.isToDrawGrid) {
                        return;
                    }
                    this.drawCell(pCell.cellX, pCell.cellY, pColor);
                }
                //_______________________________________________________________
                addCellInView(pX, pY) {
                    if (!GridPainter.isToDrawGrid) {
                        return;
                    }
                    if (this.cellsInView != null) {
                        this.cellsInView.push(pX, pY);
                    }
                }
                //_______________________________________________________________
                drawCell(pX, pY, pColor) {
                    if (!GridPainter.isToDrawGrid) {
                        return;
                    }
                    if (this.mDebugCanvas == null) {
                        this.createCanvas();
                    }
                    let aX = (pX - this.mFrom) * grid.GridManager.CELL_SIZE * this.mScale;
                    let aY = (pY - this.mFrom) * grid.GridManager.CELL_SIZE * this.mScale;
                    this.mContext.fillStyle = pColor;
                    this.mContext.fillRect(aX, aY, grid.GridManager.CELL_SIZE * this.mScale, grid.GridManager.CELL_SIZE * this.mScale);
                }
                //_______________________________________________________________
                drawRectangle(pStart, pEnd, pDrawFreeCells = false) {
                    let aWidth = Math.abs(pStart.x - pEnd.x);
                    let aHeight = Math.abs(pStart.y - pEnd.y);
                    let aMinX = Math.min(pStart.x, pEnd.x);
                    let aMinY = Math.min(pStart.y, pEnd.y);
                    for (let i = aMinX; i <= aMinX + aWidth; i++) {
                        for (let j = aMinY; j <= aMinY + aHeight; j++) {
                            if (pDrawFreeCells) {
                                grid.GridNavigator.instance.markFreeCell(i, j);
                            }
                            else {
                                grid.GridNavigator.instance.markEmptyCell(i, j);
                            }
                        }
                    }
                }
                //_________________________________________________________________
                clear() {
                    this.drawGrid();
                }
                //_________________________________________________________________
                scaleStep(iFactor) {
                    let BASE_STEP = 0.01;
                    this.mSettings.scale += BASE_STEP * iFactor;
                    this.drawUsingSettings();
                }
                //_________________________________________________________________
                moveStep(iFactor, iIsY) {
                    let BASE_STEP = 10;
                    if (iIsY) {
                        this.mSettings.y += BASE_STEP * iFactor;
                    }
                    else {
                        this.mSettings.x += BASE_STEP * iFactor;
                    }
                    this.drawUsingSettings();
                }
                //_________________________________________________________________
                resetSettings() {
                    this.gridSettings = new grid.DaGridPainterSettings();
                    this.drawUsingSettings();
                }
                //_________________________________________________________________
                drawUsingSettings() {
                    this.setGrid(this.mSettings.scale, this.mSettings.x, this.mSettings.y);
                }
                //_________________________________________________________________
                get gridSettings() {
                    return this.mSettings;
                }
                //_________________________________________________________________
                set gridSettings(iSettings) {
                    this.mSettings = new grid.DaGridPainterSettings();
                    this.mSettings.readFromJson(iSettings);
                }
            }
            GridPainter.BASE_OPACITY = 0.5;
            GridPainter.BASE_SIZE_X = 2500;
            GridPainter.BASE_SIZE_Y = 2500;
            GridPainter.BASE_SCALE = 0.168;
            GridPainter.BASE_X_OFFSET = 150;
            GridPainter.BASE_Y_OFFSET = 365;
            GridPainter.GRID_PAINTER_HALF_SIZE = 10;
            //asBase.entity.grid.GridPainter.isToDrawGrid = true;
            //asBase.entity.grid.GridPainter.isEditingMode = true;
            GridPainter.isToDrawGrid = false;
            GridPainter.isEditingMode = false;
            GridPainter.isDrawAvatarFrustumCells = false;
            grid.GridPainter = GridPainter;
        })(grid = entity.grid || (entity.grid = {}));
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var entity;
    (function (entity) {
        var grid;
        (function (grid) {
            class ProximityManager {
                //_______________________________________________________________________
                constructor() {
                    this.mLastTimeExitMeeting = 0;
                    this.mVisibilityRectEntities = {};
                    ProximityManager.mInstance = this;
                }
                //__________________________________________________
                static get instance() {
                    if (ProximityManager.mInstance == null) {
                        ProximityManager.mInstance = new ProximityManager();
                    }
                    return ProximityManager.mInstance;
                }
                //_______________________________________________________________________
                checkEntities(pEntityList, pUserX, pUserZ) {
                    for (let aKey in this.mVisibilityRectEntities) {
                        if (pEntityList[aKey] == null) {
                            let aEntityPosition = this.mVisibilityRectEntities[aKey].position3D;
                            if (!aEntityPosition) {
                                continue;
                            }
                            let aUniv = asBase.Globals.sBaseUnivFactor;
                            let aPx = (((pUserX - aEntityPosition.x) / aUniv) / entity.EntityBase.FACTOR_FROM_3D_ITEMS_C);
                            let aPY = (((pUserZ - aEntityPosition.z) / aUniv) / entity.EntityBase.FACTOR_FROM_3D_ITEMS_C);
                            this.mVisibilityRectEntities[aKey].checkIsInVisibilityRect(aPx, aPY);
                        }
                    }
                    if (this.mCandidateEntityForMeeting != null) {
                        let aEntityDistance = this.getEntityDistance(this.mCandidateEntityForMeeting, pUserX, pUserZ);
                        if ((aEntityDistance == Number.MAX_SAFE_INTEGER) || (aEntityDistance == -1)) {
                            this.exitFromEntityMeeting();
                        }
                    }
                    if (this.mCandidateEntityForMeeting != null) {
                        for (let aKey in pEntityList) {
                            if (pEntityList[aKey].disabled) {
                                continue;
                            }
                            this.getEntityDistance(pEntityList[aKey], pUserX, pUserZ);
                        }
                        return;
                    }
                    let aIsMoving = asBase.events.EventManager.callFunction(asBase.events.FuncType.GET_IS_MOVING_FUNC, this);
                    if (aIsMoving) {
                        return;
                    }
                    let aMinDistance = Number.MAX_SAFE_INTEGER;
                    let aMinDistanceEntity = null;
                    for (let aKey in pEntityList) {
                        if (pEntityList[aKey].disabled) {
                            continue;
                        }
                        let aEntityDistance = this.getEntityDistance(pEntityList[aKey], pUserX, pUserZ);
                        if (aEntityDistance < aMinDistance) {
                            aMinDistance = aEntityDistance;
                            aMinDistanceEntity = pEntityList[aKey];
                        }
                    }
                    if ((Date.now() - this.mLastTimeExitMeeting) < ProximityManager.NEXT_TIME_TO_DELAY_CHECK) {
                        return;
                    }
                    if (aMinDistanceEntity != null) {
                        this.enterMeetingZone(aMinDistanceEntity);
                    }
                }
                //_____________________________________________________________________
                enterMeetingZone(pEntity) {
                    if (this.mCandidateEntityForMeeting == pEntity) {
                        return;
                    }
                    this.mCandidateEntityForMeeting = pEntity;
                    asBase.events.EventManager.dispatchEvent(asBase.entity.EvEntity.ENTER_SINGLE_CHANNEL_AREA, this, pEntity);
                }
                //_____________________________________________________________________
                enterFromMeeting() {
                    if (this.mCandidateEntityForMeeting == null || this.mCandidateEntityForMeeting == this.mCurrentEntityForMeeting) {
                        return;
                    }
                    this.mCurrentEntityForMeeting = this.mCandidateEntityForMeeting;
                    this.mCurrentEntityForMeeting.userEnter();
                }
                //_____________________________________________________________________
                exitFromMeeting() {
                    this.mCandidateEntityForMeeting = null;
                    this.mLastTimeExitMeeting = Date.now();
                    if (this.mCurrentEntityForMeeting != null) {
                        this.mCurrentEntityForMeeting.userExit();
                        this.mCurrentEntityForMeeting = null;
                    }
                }
                //_____________________________________________________________________
                enterMeetingByEntity(iEntity) {
                    this.mCandidateEntityForMeeting = iEntity;
                    this.mCurrentEntityForMeeting = iEntity;
                    this.mCurrentEntityForMeeting.setToActive();
                    this.mCurrentEntityForMeeting.enterVisibilityRect(false);
                    this.mCurrentEntityForMeeting.userEnter();
                }
                //_____________________________________________________________________
                exitFromEntityMeeting() {
                    if (this.mCandidateEntityForMeeting == null) {
                        return;
                    }
                    asBase.events.EventManager.dispatchEvent(asBase.entity.EvEntity.EXIT_SINGLE_CHANNEL_AREA, this, this.mCandidateEntityForMeeting.id);
                }
                //_____________________________________________________________________
                enterIfCandidate(pEntity) {
                    if (pEntity == this.mCandidateEntityForMeeting) {
                        asBase.events.EventManager.dispatchEvent(asBase.entity.EvEntity.ENTER_SINGLE_CHANNEL_AREA, this, pEntity);
                    }
                }
                //_____________________________________________________________________
                getEntityDistance(iEntity, aUserX, aUserZ) {
                    if (iEntity.position3D == null) {
                        return Number.MAX_SAFE_INTEGER;
                    }
                    if (iEntity.data.activeArea == null) {
                        return Number.MAX_SAFE_INTEGER;
                    }
                    if (iEntity.data.activeArea.sqrRadius <= 0) {
                        return Number.MAX_SAFE_INTEGER;
                    }
                    if (iEntity.display3D == null) {
                        return Number.MAX_SAFE_INTEGER;
                    }
                    let aEntityPosition = iEntity.position3D;
                    if (aEntityPosition == null) {
                        return Number.MAX_SAFE_INTEGER;
                    }
                    let aDX = aEntityPosition.x - aUserX;
                    let aDZ = aEntityPosition.z - aUserZ;
                    let aProximityMeasurement = aDX * aDX + aDZ * aDZ;
                    aProximityMeasurement = ((aProximityMeasurement / asBase.Globals.sBaseUnivFactor) / ProximityManager.WORLD_TO_INCH_FACTOR);
                    if (aProximityMeasurement > iEntity.data.activeArea.sqrRadius) {
                        iEntity.exitVisibilityRect(false);
                        return Number.MAX_SAFE_INTEGER;
                    }
                    aProximityMeasurement = iEntity.proximityCheck(aEntityPosition, aUserX, aUserZ);
                    if (aProximityMeasurement == -1) {
                        return Number.MAX_SAFE_INTEGER;
                    }
                    return aProximityMeasurement;
                }
                //_____________________________________________________________________
                get currentEntityInMeeting() {
                    return this.mCurrentEntityForMeeting;
                }
                //_____________________________________________________________________
                get candidateEntityForMeeting() {
                    return this.mCandidateEntityForMeeting;
                }
                //_____________________________________________________________________
                get visibilityRectEntities() {
                    return this.mVisibilityRectEntities;
                }
            }
            //  hall3d.ItemsController.FACTOR
            ProximityManager.WORLD_TO_INCH_FACTOR = 4.55;
            ProximityManager.NEXT_TIME_TO_DELAY_CHECK = 4000;
            grid.ProximityManager = ProximityManager;
        })(grid = entity.grid || (entity.grid = {}));
    })(entity = asBase.entity || (asBase.entity = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        class AddToDOMListener {
            constructor() {
            }
            //-----------------------------------------------------
            static add(pElement, pCallback, pTime, pOwner, pAtachedData) {
                if (pElement == null) {
                    return;
                }
                if (pElement.getBoundingClientRect().width != 0) {
                    pCallback(pElement, pAtachedData);
                    return;
                }
                if (AddToDOMListener.mElements == null) {
                    AddToDOMListener.mElements = new Array();
                    setInterval(AddToDOMListener.cleanListByTime, AddToDOMListener.CHECK_TIME);
                }
                let aElementListenerObject = new ElementListenerObject();
                aElementListenerObject.element = pElement;
                aElementListenerObject.callback = pCallback;
                aElementListenerObject.time = pTime;
                aElementListenerObject.owner = pOwner;
                aElementListenerObject.atachedData = pAtachedData;
                aElementListenerObject.element.addEventListener('DOMNodeInserted', AddToDOMListener.onElementInserted, false);
                AddToDOMListener.mElements.push(aElementListenerObject);
            }
            //-----------------------------------------------------
            static onElementInserted(pElement) {
                let aElementObject = AddToDOMListener.getElementObject(pElement.currentTarget);
                if (aElementObject.element.getBoundingClientRect().width != 0) {
                    aElementObject.callback(aElementObject.element, aElementObject.atachedData);
                    AddToDOMListener.removeElementFromList(aElementObject, aElementObject.index);
                }
                else {
                    aElementObject.isOnDOM = true;
                }
            }
            //-----------------------------------------------------
            static removeElementFromList(pElement, pIndex) {
                pElement.element.removeEventListener('DOMNodeInserted', AddToDOMListener.onElementInserted, false);
                AddToDOMListener.mElements.splice(pIndex, 1);
            }
            //-----------------------------------------------------
            static cleanListByTime(pElement) {
                let aLength = AddToDOMListener.mElements.length - 1;
                for (let i = aLength; i > -1; i--) {
                    if (AddToDOMListener.mElements[i].isOnDOM) {
                        if (AddToDOMListener.mElements[i].element.getBoundingClientRect().width != 0) {
                            AddToDOMListener.mElements[i].callback(AddToDOMListener.mElements[i].element, AddToDOMListener.mElements[i].atachedData);
                            AddToDOMListener.removeElementFromList(AddToDOMListener.mElements[i], i);
                            continue;
                        }
                    }
                    AddToDOMListener.mElements[i].time -= AddToDOMListener.CHECK_TIME;
                    if (AddToDOMListener.mElements[i].time <= 0) {
                        AddToDOMListener.removeElementFromList(AddToDOMListener.mElements[i], i);
                    }
                }
            }
            //-----------------------------------------------------
            static getElementObject(pElement) {
                if (AddToDOMListener.mElements == null) {
                    return null;
                }
                for (let i = 0; i < AddToDOMListener.mElements.length; i++) {
                    if (AddToDOMListener.mElements[i].element == pElement) {
                        AddToDOMListener.mElements[i].index = i;
                        return AddToDOMListener.mElements[i];
                    }
                }
                return null;
            }
            //-----------------------------------------------------
            static hasElementListener(pElement) {
                if (AddToDOMListener.getElementObject(pElement) == null) {
                    return false;
                }
                return true;
            }
            //-----------------------------------------------------
            static removeElementListener(pElement, pOwner) {
                let pObject = AddToDOMListener.getElementObject(pElement);
                if (pObject == null) {
                    return false;
                }
                if ((pOwner != null) && (pObject.owner != pOwner)) {
                    return false;
                }
                AddToDOMListener.mElements[pObject.index].element.removeEventListener('DOMNodeInserted', AddToDOMListener.onElementInserted, false);
                AddToDOMListener.mElements.splice(pObject.index, 1);
                return true;
            }
            //-----------------------------------------------------
            static removeAllOwnerElements(pOwner) {
                if (AddToDOMListener.mElements == null) {
                    return;
                }
                for (let i = AddToDOMListener.mElements.length - 1; i > -1; i--) {
                    if (AddToDOMListener.mElements[i].owner == pOwner) {
                        AddToDOMListener.mElements[i].element.removeEventListener('DOMNodeInserted', AddToDOMListener.onElementInserted, false);
                        AddToDOMListener.mElements.splice(i, 1);
                    }
                }
            }
        }
        AddToDOMListener.CHECK_TIME = 500;
        events.AddToDOMListener = AddToDOMListener;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
//____________________________________________________________
class ElementListenerObject {
    constructor() {
        this.isOnDOM = false;
    }
}
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        class EvAsGuideRegisterElement {
            constructor(iKey, iElement) {
                this.Key = iKey;
                this.Element = iElement;
            }
        }
        events.EvAsGuideRegisterElement = EvAsGuideRegisterElement;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        class FuncType {
        }
        FuncType.GET_ELEMENTS_UNDER_MOUSE_FUNC = "GET_ELEMENTS_UNDER_MOUSE_FUNC";
        FuncType.GET_IS_MOVING_FUNC = "GET_IS_MOVING_FUNC";
        events.FuncType = FuncType;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        class KeyboardCodes {
        }
        KeyboardCodes.TAB = 9;
        KeyboardCodes.ENTER = 13;
        KeyboardCodes.ENTER_KEY = "Enter";
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
        KeyboardCodes.SPACE = 32;
        KeyboardCodes.DELETE = 46;
        KeyboardCodes.HYPHEN = 109;
        KeyboardCodes.DIGIT_0 = 48;
        KeyboardCodes.LETTER_Z = 90;
        KeyboardCodes.LOWEST_INPUT_CHAR = 48;
        KeyboardCodes.HIGHEST_INPUT_CHAR = 90;
        KeyboardCodes.LETTER_S = 83; // for save
        KeyboardCodes.LETTER_C = 67;
        KeyboardCodes.LETTER_V = 86;
        events.KeyboardCodes = KeyboardCodes;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    class Globals {
        static urlGetParameter(pVal) {
            if (Globals.urlGetParameters == null) {
                return false;
            }
            if (Globals.urlGetParameters[pVal] == null) {
                return false;
            }
            if (Globals.urlGetParameters[pVal].toLowerCase() == "false") {
                return false;
            }
            if (Globals.urlGetParameters[pVal].toLowerCase() == "true") {
                return true;
            }
            return (Globals.urlGetParameters[pVal]);
        }
        static set isAltDown(pVal) {
            this.mIsAltDown = pVal;
        }
        static get isAltDown() {
            return (this.mIsAltDown);
        }
        //__________________________________________
        static set isControlDown(pVal) {
            this.mIsControlDown = pVal;
        }
        static get isControlDown() {
            return (this.mIsControlDown);
        }
        //__________________________________________
        static set isShiftDown(pVal) {
            this.mIsShiftDown = pVal;
        }
        static get isShiftDown() {
            return (this.mIsShiftDown);
        }
        //_____________________________________________
        static get isTBMode2() {
            return (Globals.isTableTBMode || Globals.isChairTBMode || Globals.isBuffetTBMode || Globals.isOtherTBMode);
        }
        //_____________________________________________
        static get isTBMode() {
            return (Globals.isTableTBMode || Globals.isChairTBMode || Globals.isBuffetTBMode || Globals.isOtherTBMode);
        }
        //__________________________________________
        static setBrowserName(value) {
            this.browserName = value;
            switch (value) {
                case Globals.chrome:
                    Globals.isChrome = true;
                    break;
                case Globals.firefox:
                    Globals.isFirefox = true;
                    break;
                case Globals.safari:
                    Globals.isSafari = true;
                    break;
                case Globals.edge:
                    Globals.isEdge = true;
                    break;
            }
        }
        //__________________________________________
        static startInFocusListener() {
            if (this.sFocusFunc == null) {
                this.sFocusFunc = () => this.focused_EventHandler();
                this.sBlurFunc = () => this.blurred_EventHandler();
            }
            window.addEventListener("blur", this.sBlurFunc);
            window.addEventListener("focus", this.sFocusFunc);
        }
        //__________________________________________
        static stopInFocusListener() {
            window.removeEventListener("blur", this.sBlurFunc);
            window.removeEventListener("focus", this.sFocusFunc);
            this.sBlurFunc = null;
            this.sFocusFunc = null;
        }
        //__________________________________________
        static blurred_EventHandler() {
            this.sIsInFocus = false;
        }
        //__________________________________________
        static focused_EventHandler() {
            this.sIsInFocus = true;
        }
        static get browser() {
            return (this.browserName);
        }
        static get isMobile() {
            return asBase.Utils.isMobile();
        }
        static get isInFocus() {
            return this.sIsInFocus;
        }
    }
    Globals.mIsAltDown = false;
    Globals.mIsControlDown = false;
    Globals.mIsShiftDown = false;
    Globals.sUnivFactor = 1;
    Globals.sBaseUnivFactor = 1;
    Globals.isChairTBMode = false;
    Globals.isTableTBMode = false;
    Globals.isBuffetTBMode = false;
    Globals.isOtherTBMode = false;
    Globals.isAdminMode = false;
    Globals.isMiniMode = false;
    Globals.isTlatMode = false;
    Globals.isVRApp = false;
    Globals.isMatterPort = false;
    Globals.isHybrid = false;
    Globals.isMinify = false;
    Globals.isAFRWhiteLabel = false;
    Globals.isResidential = false;
    Globals.isWhiteLabelDemo = false;
    Globals.whiteLabelFolderName = "";
    Globals.whiteLabelWidgetName = "";
    Globals.whiteLabelConnectLink = "";
    Globals.isMiniOccasionMode = false;
    // public static isMobile: boolean = false;
    Globals.tableColor = -1;
    Globals.chrome = "Chrome";
    Globals.firefox = "Firefox";
    Globals.safari = "Safari";
    Globals.edge = "Edge";
    Globals.texturesQuality3D = -1;
    Globals.sIsInFocus = true;
    asBase.Globals = Globals;
})(asBase || (asBase = {}));
///<reference path="constants/DaUnderDevelopment.ts"/>
var asBase;
///<reference path="constants/DaUnderDevelopment.ts"/>
(function (asBase) {
    var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
    class JsonLoader {
        constructor(pPath, pCallBack, pErrorCallBack, pReqHeader = "application/json", pParams = null) {
            var aHttpRequest = new XMLHttpRequest();
            aHttpRequest.open(pParams != null ? "POST" : "GET", pPath);
            aHttpRequest.setRequestHeader("Content-type", pReqHeader);
            aHttpRequest.onreadystatechange = function () {
                if (aHttpRequest.readyState === 4) {
                    if ((aHttpRequest.status === 200) || (aHttpRequest.status === 201)) {
                        const data = aHttpRequest.responseText;
                        if (pCallBack) {
                            pCallBack(data);
                        }
                        else {
                            if (pErrorCallBack) {
                                pErrorCallBack(aHttpRequest);
                            }
                        }
                    }
                }
                else {
                    if (DaUnderDevelopment.SHOW_CONSOLE_LOG) {
                        console.log(`httpRequest.readyState = ${aHttpRequest.readyState}`);
                    }
                }
            };
            if (pParams == null) {
                aHttpRequest.send();
            }
            else {
                aHttpRequest.send(pParams);
            }
        }
    }
    asBase.JsonLoader = JsonLoader;
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    class LanguageDictionary {
        //_______________________________________________
        static get currentLanguage() {
            return LanguageDictionary.mCurrentLanguage;
        }
        //_______________________________________________
        static set currentLanguage(pVal) {
            if (LanguageDictionary.mCurrentLanguage == pVal) {
                return;
            }
            if ((LanguageDictionary.COLLECT_MISSING_TRANSLATIONS) && (LanguageDictionary.mMissingInDictionary == null)) {
                LanguageDictionary.mMissingInDictionary = {};
                if (pVal != 'EN') {
                    // setTimeout(LanguageDictionary.printMissingTranslation, 1000 * 30);
                }
            }
            LanguageDictionary.mCurrentLanguage = pVal;
        }
        //_______________________________________________
        static set currentDictionary(pDIC) {
            LanguageDictionary.mDictionary = pDIC;
        }
        //_______________________________________________
        static getText(pKey, pOrginalText) {
            if (LanguageDictionary.mDictionary == null) {
                return pOrginalText;
            }
            if ((LanguageDictionary.COLLECT_MISSING_TRANSLATIONS) && (LanguageDictionary.mDictionary[pKey] == null)) {
                LanguageDictionary.mMissingInDictionary[pKey] = pOrginalText;
                return pOrginalText;
            }
            return (LanguageDictionary.mDictionary[pKey]);
        }
        //____________________________________________
        static getComplexText(pComplexText, pPartsArray, pIsNameArray) {
            let aFullComplexText = pComplexText;
            for (let i = 0; i < pPartsArray.length; i++) {
                let aReplace = "<p" + (i + 1) + ">";
                let aRegEx = new RegExp(aReplace, "g");
                aFullComplexText = aFullComplexText.replace(aRegEx, pPartsArray[i]);
            }
            if (LanguageDictionary.mDictionary == null) {
                return aFullComplexText;
            }
            let aKey = "complex-" + pComplexText.replace(/ /g, "-");
            aKey = aKey.replace(/"/g, '');
            aKey = aKey.replace(/'/g, '');
            let aValue = [pComplexText, aFullComplexText];
            if ((LanguageDictionary.COLLECT_MISSING_TRANSLATIONS) && (LanguageDictionary.mDictionary[aKey] == null)) {
                LanguageDictionary.mMissingInDictionary[aKey] = aValue;
                let aText = pComplexText;
                for (let i = 0; i < pPartsArray.length; i++) {
                    let aReplace = "<p" + (i + 1) + ">";
                    let aRegEx = new RegExp(aReplace, "g");
                    if (pIsNameArray == null || !pIsNameArray[i]) {
                        aText = aText.replace(aRegEx, this.getText("get-text-within-complex-" + pPartsArray[i], pPartsArray[i]));
                    }
                    else {
                        aText = aText.replace(aRegEx, pPartsArray[i]);
                    }
                }
                return aText;
            }
            let aText = LanguageDictionary.mDictionary[aKey];
            for (let i = 0; i < pPartsArray.length; i++) {
                let aReplace = "<p" + (i + 1) + ">";
                let aRegEx = new RegExp(aReplace, "g");
                if (pIsNameArray == null || !pIsNameArray[i]) {
                    aText = aText.replace(aRegEx, this.getText("get-text-within-complex-" + pPartsArray[i], pPartsArray[i]));
                }
                else {
                    aText = aText.replace(aRegEx, pPartsArray[i]);
                }
            }
            return aText;
        }
        //____________________________________________
        static translate(pHTMLElement) {
            if (pHTMLElement == null) {
                return;
            }
            let aTranslatedElements = pHTMLElement.querySelectorAll('[data-translate]');
            for (let i = 0; i < aTranslatedElements.length; i++) {
                let aElement = aTranslatedElements[i];
                let aKey = aElement.dataset.translate;
                // if element is input => translate placeholder
                if (aElement.nodeName === "INPUT" || aElement.nodeName === "TEXTAREA") {
                    // set translation from t object
                    aElement.placeholder = LanguageDictionary.getText(aKey, aElement.placeholder);
                }
                else if (aElement.dataset.originalTitle) {
                    // if element has tooltip
                    aElement.dataset.originalTitle = LanguageDictionary.getText(aKey, aElement.dataset.originalTitle);
                }
                else {
                    // change inner text
                    aElement.innerHTML = LanguageDictionary.getText(aKey, aElement.innerHTML);
                }
            }
        }
        //_____________________________________________
        static translateFromService(pOriginalText) {
            let aKey = pOriginalText.replace(/ |\//g, '-');
            return this.getText(aKey, pOriginalText);
        }
        //____________________________________________
        static printMissingTranslation() {
            console.log(LanguageDictionary.mMissingInDictionary);
            console.log("{");
            for (let aKey in LanguageDictionary.mMissingInDictionary) {
                console.log(aKey + ':"' + LanguageDictionary.mMissingInDictionary[aKey] + '",');
            }
            console.log("}");
        }
    }
    LanguageDictionary.COLLECT_MISSING_TRANSLATIONS = true;
    LanguageDictionary.mCurrentLanguage = "";
    asBase.LanguageDictionary = LanguageDictionary;
})(asBase || (asBase = {}));
///<reference path="../../asBase/Utils.ts"/>
var gencom;
///<reference path="../../asBase/Utils.ts"/>
(function (gencom) {
    var buttonwithpreloader;
    (function (buttonwithpreloader) {
        var CoComponentBase = asBase.CoComponentBase;
        var Utils = asBase.Utils;
        class CoButtonWithPreloader extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                //------------------------------
                // Comps
                //------------------------------
                //------------------------------
                // Members
                //------------------------------
                this.mLabel = "";
            }
            //____________________________________________________________________
            creationComplete() {
                this.btn_spn = this.getPart("btn_spn");
                this.btn_pl = this.getPart("btn_pl");
                this.updateOkButtonLabel();
            }
            //____________________________________________________________________
            updateOkButtonLabel() {
                if (this.mLabel == "") {
                    this.mLabel = (this.btn_spn) ? this.btn_spn.innerHTML : this.innerHTML;
                }
                else {
                    if (this.btn_spn) {
                        this.btn_spn.innerHTML = this.mLabel;
                    }
                    else {
                        this.innerHTML = this.mLabel;
                    }
                }
            }
            //____________________________________________________________________
            setPreloader(iIsShow) {
                if (!this.btn_spn || !this.btn_pl) {
                    return;
                }
                this.btn_spn.innerHTML = (iIsShow) ? "" : this.mLabel;
                if (iIsShow) {
                    Utils.showSkinPart(this.btn_pl);
                }
                else {
                    Utils.hideSkinPart(this.btn_pl);
                }
            }
            //____________________________________________________________________
            setPreloaderRight(iIsShow) {
                if (!this.btn_spn || !this.btn_pl) {
                    return;
                }
                if (iIsShow) {
                    Utils.addClassToElement(this.btn_pl, "spinner");
                }
                else {
                    Utils.removeClassFromElement(this.btn_pl, "spinner");
                }
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________
            set label(value) {
                this.mLabel = value;
                if (this.isInitialized) {
                    this.updateOkButtonLabel();
                }
            }
        }
        buttonwithpreloader.CoButtonWithPreloader = CoButtonWithPreloader;
    })(buttonwithpreloader = gencom.buttonwithpreloader || (gencom.buttonwithpreloader = {}));
})(gencom || (gencom = {}));
///<reference path="../../asBase/events/MouseEvents.ts"/>
///<reference path="../buttonwithpreloader/CoButtonWithPreloader.ts"/>
///<reference path="../../asBase/baseclasses/PopUpWindow.ts"/>
///<reference path="../../asBase/constants/DaGlobalConsts.ts"/>
var PopUpWindow = asBase.baseclasses.PopUpWindow;
var com;
(function (com) {
    var entry;
    (function (entry) {
        var messagewindow;
        (function (messagewindow) {
            var MouseEvents = asBase.events.MouseEvents;
            var CoButtonWithPreloader = gencom.buttonwithpreloader.CoButtonWithPreloader;
            var DaGlobalConsts = asBase.constants.DaGlobalConsts;
            var EventTypes = asBase.events.EventTypes;
            var EventManager = asBase.events.EventManager;
            class CoOkCancelWindow extends PopUpWindow {
                constructor(iSkin, iHTMLElement) {
                    super(iSkin, iHTMLElement);
                    this.mIsOkButtonWithPreloader = false;
                    this.mOkButtonLabel = "";
                }
                //____________________________________________________________________
                creationComplete() {
                    this.close_btn = this.getPart("close_btn");
                    this.cancel_btn = this.getPart("cancel_btn");
                    this.ok_btn = this.getPart("ok_btn");
                    if (this.mIsOkButtonWithPreloader) {
                        this.ok_btn_with_preloader_com = new CoButtonWithPreloader(this.ok_btn);
                    }
                    if (this.mOkButtonLabel != "") {
                        this.updateOkButtonLabel();
                    }
                    super.creationComplete();
                }
                //____________________________________________________________________
                addEventListeners() {
                    this.ok__EventHandler_Func = (event) => this.ok__EventHandler(event);
                    this.ok_btn.addEventListener(MouseEvents.CLICK, this.ok__EventHandler_Func);
                    if (this.close_btn) {
                        this.close__EventHandler_Func = () => this.close__EventHandler();
                        this.close_btn.addEventListener(MouseEvents.CLICK, this.close__EventHandler_Func);
                    }
                    if (this.cancel_btn) {
                        this.cancel__EventHandler_Func = () => this.cancel__EventHandler();
                        this.cancel_btn.addEventListener(MouseEvents.CLICK, this.cancel__EventHandler_Func);
                    }
                    EventManager.addEventListener(EventTypes.ENTER_KEY_DOWN, () => this.enterClicked__EventHandler(), this);
                    EventManager.addEventListener(EventTypes.ESC_KEY_DOWN, () => this.escClicked__EventHandler(), this);
                }
                //____________________________________________________________________
                removeEventListeners() {
                    this.ok_btn.removeEventListener(MouseEvents.CLICK, this.ok__EventHandler_Func);
                    this.ok__EventHandler_Func = null;
                    if (this.close_btn) {
                        this.close_btn.removeEventListener(MouseEvents.CLICK, this.close__EventHandler_Func);
                        this.close__EventHandler_Func = null;
                    }
                    if (this.cancel_btn) {
                        this.cancel_btn.removeEventListener(MouseEvents.CLICK, this.cancel__EventHandler_Func);
                        this.cancel__EventHandler_Func = null;
                    }
                    EventManager.removeEventListener(EventTypes.ENTER_KEY_DOWN, this);
                    EventManager.removeEventListener(EventTypes.ESC_KEY_DOWN, this);
                }
                //____________________________________________________________________
                showInit() {
                    this.setPreloader(false);
                }
                //____________________________________________________________________
                reset() {
                }
                //____________________________________________________________________
                enterClicked__EventHandler() {
                    this.ok__EventHandler();
                }
                //____________________________________________________________________
                escClicked__EventHandler() {
                    this.cancel__EventHandler();
                }
                //____________________________________________________________________
                ok__EventHandler(event = null) {
                    if (event) {
                        event.stopImmediatePropagation();
                        event.preventDefault();
                    }
                    this.mSelectedAction = DaGlobalConsts.SELECTED_ACTION_OK;
                    if (this.mCallBackFunc) {
                        this.mCallBackFunc(this.mSelectedAction);
                    }
                }
                //____________________________________________________________________
                cancel__EventHandler() {
                    this.mSelectedAction = DaGlobalConsts.SELECTED_ACTION_CANCEL;
                    if (this.mCallBackFunc) {
                        this.mCallBackFunc(this.mSelectedAction);
                    }
                    else {
                        this.hide();
                    }
                }
                //____________________________________________________________________
                close__EventHandler() {
                    this.hide();
                }
                //____________________________________________________________________
                hideReset() {
                    super.hideReset();
                }
                //____________________________________________________________________
                updateOkButtonLabel() {
                    if (this.mIsOkButtonWithPreloader) {
                        this.ok_btn_with_preloader_com.label = this.mOkButtonLabel;
                    }
                    else {
                        this.ok_btn.innerHTML = this.mOkButtonLabel;
                    }
                }
                //____________________________________________________________________
                setPreloader(iIsShow) {
                    if (this.ok_btn_with_preloader_com) {
                        this.ok_btn_with_preloader_com.setPreloader(iIsShow);
                    }
                }
                /****************************
                 * Getters & Setters
                 ****************************/
                //____________________________________________________________________
                set isOkButtonWithPreloader(value) {
                    this.mIsOkButtonWithPreloader = value;
                    if (this.mIsOkButtonWithPreloader && this.ok_btn) {
                        this.ok_btn_with_preloader_com = new CoButtonWithPreloader(this.ok_btn);
                    }
                }
                //____________________________________________________________________
                set okButtonLabel(value) {
                    this.mOkButtonLabel = value;
                    if (this.isInitialized) {
                        this.updateOkButtonLabel();
                    }
                }
                //____________________________________________________________________
                get selectedAction() {
                    return this.mSelectedAction;
                }
            }
            messagewindow.CoOkCancelWindow = CoOkCancelWindow;
        })(messagewindow = entry.messagewindow || (entry.messagewindow = {}));
    })(entry = com.entry || (com.entry = {}));
})(com || (com = {}));
///<reference path="../asBase/events/MouseEvents.ts"/>
var gencom;
///<reference path="../asBase/events/MouseEvents.ts"/>
(function (gencom) {
    var checkbox;
    (function (checkbox) {
        var CoComponentBase = asBase.CoComponentBase;
        var MouseEvents = asBase.events.MouseEvents;
        var EventTypes = asBase.events.EventTypes;
        var AsEvent = asBase.events.AsEvent;
        var Utils = asBase.Utils;
        class CoCheckBox extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                //------------------------------
                // Comps
                //------------------------------
                //------------------------------
                // Members
                //------------------------------
                this.mIsSelected = false;
                this.mLabel = "";
                this.mIsListenToClickOnLabel = false;
                this.mIsHalfOpacity = false;
            }
            //____________________________________________________________________
            creationComplete() {
                this.checkBox_chb = this.getPart("checkBox_chb");
                this.checkBoxLabel_spn = this.getPart("checkBoxLabel_spn");
                this.checkBox_chb.addEventListener(MouseEvents.CLICK, (event) => this.checkBoxClicked__EventHandler(event));
                if (this.mIsListenToClickOnLabel) {
                    this.checkBoxLabel_spn.addEventListener(MouseEvents.CLICK, () => this.labelClicked__EventHandler());
                }
                this.selected = this.mIsSelected;
                if (this.mLabel != "") {
                    this.label = this.mLabel;
                }
                if (!this.mIsEnabled) {
                    Utils.addClassToElement(this.checkBox_chb, CoCheckBox.DISABLED);
                }
                if (this.mIsHalfOpacity) {
                    Utils.addClassToElement(this.contentWrapper, CoCheckBox.HALF_OPACITY);
                }
            }
            //____________________________________________________________________
            checkBoxClicked__EventHandler(event) {
                event.stopImmediatePropagation();
                if (this.mIsSelected) {
                    this.setSelectedFalse();
                }
                else {
                    this.setSelectedTrue();
                }
                let e = new AsEvent(EventTypes.CHANGE, false, this);
                this.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            setSelectedTrue() {
                this.checkBox_chb.dataset.selected = "true";
                this.checkBox_chb.classList.add("checked");
                this.mIsSelected = true;
                this.clearError();
            }
            //____________________________________________________________________
            setSelectedFalse() {
                this.checkBox_chb.dataset.selected = "false";
                this.checkBox_chb.classList.remove("checked");
                this.mIsSelected = false;
            }
            //____________________________________________________________________
            labelClicked__EventHandler() {
                let e = new AsEvent(CoCheckBox.LABEL_CLICKED, true, this);
                this.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            setError() {
                Utils.setTextError(this.checkBoxLabel_spn);
            }
            //____________________________________________________________________
            clearError() {
                Utils.clearTextError(this.checkBoxLabel_spn);
            }
            //____________________________________________________________________
            addClassToCheckBox(iClassName) {
                if (this.checkBox_chb && !this.checkBox_chb.classList.contains(iClassName)) {
                    this.checkBox_chb.classList.add(iClassName);
                }
            }
            //____________________________________________________________________
            removeClassFromCheckBox(iClassName) {
                if (this.checkBox_chb && this.checkBox_chb.classList.contains(iClassName)) {
                    this.checkBox_chb.classList.remove(iClassName);
                }
            }
            //____________________________________________________________________
            setEnabled(value) {
                this.mIsEnabled = value;
                if (!this.contentWrapper) {
                    return;
                }
                if (value) {
                    Utils.removeClassFromElement(this.contentWrapper, CoCheckBox.DISABLED);
                }
                else {
                    Utils.addClassToElement(this.contentWrapper, CoCheckBox.DISABLED);
                }
            }
            //____________________________________________________________________
            setHalfOpacity() {
                this.mIsHalfOpacity = true;
                if (!this.contentWrapper) {
                    return;
                }
                Utils.addClassToElement(this.contentWrapper, CoCheckBox.HALF_OPACITY);
            }
            //____________________________________________________________________
            setNoOpacity() {
                this.mIsHalfOpacity = false;
                if (!this.contentWrapper) {
                    return;
                }
                Utils.removeClassFromElement(this.contentWrapper, CoCheckBox.HALF_OPACITY);
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________
            set isListenToClickOnLabel(value) {
                this.mIsListenToClickOnLabel = value;
                if (this.mIsListenToClickOnLabel && this.checkBoxLabel_spn) {
                    this.checkBoxLabel_spn.addEventListener(MouseEvents.CLICK, () => this.labelClicked__EventHandler());
                }
            }
            //____________________________________________________________________
            get selected() {
                return this.mIsSelected;
            }
            set selected(value) {
                this.mIsSelected = value;
                if (!this.checkBox_chb) {
                    return;
                }
                if (this.mIsSelected) {
                    this.setSelectedTrue();
                }
                else {
                    this.setSelectedFalse();
                }
            }
            //____________________________________________________________________
            set label(value) {
                this.mLabel = value;
                if (this.checkBoxLabel_spn) {
                    this.checkBoxLabel_spn.innerHTML = value;
                }
            }
            //____________________________________________________________________
            get label() {
                return this.mLabel;
            }
        }
        //------------------------------
        // Structure
        //------------------------------
        /*
         <label id="???">
         <span id="checkBox_chb" class="chb-square"></span>
         <span id="checkBoxLabel_spn">Label</span>
         </label>
         */
        //------------------------------
        // Events
        //------------------------------
        CoCheckBox.LABEL_CLICKED = "LabelClicked__Event";
        //------------------------------
        // Class
        //------------------------------
        CoCheckBox.DISABLED = "disabled-checkbox";
        CoCheckBox.HALF_OPACITY = "halfOpacity";
        checkbox.CoCheckBox = CoCheckBox;
    })(checkbox = gencom.checkbox || (gencom.checkbox = {}));
})(gencom || (gencom = {}));
///<reference path="CoOkCancelWindow.ts"/>
///<reference path="../../asBase/baseclasses/PopUpWindow.ts"/>
///<reference path="../CoCheckBox.ts"/>
var com;
///<reference path="CoOkCancelWindow.ts"/>
///<reference path="../../asBase/baseclasses/PopUpWindow.ts"/>
///<reference path="../CoCheckBox.ts"/>
(function (com) {
    var entry;
    (function (entry) {
        var messagewindow;
        (function (messagewindow) {
            var EventManager = asBase.events.EventManager;
            var EventTypes = asBase.events.EventTypes;
            var MouseEvents = asBase.events.MouseEvents;
            var PopUpWindow = asBase.baseclasses.PopUpWindow;
            var CoCheckBox = gencom.checkbox.CoCheckBox;
            var Utils = asBase.Utils;
            class CoMessageWindow extends PopUpWindow {
                constructor(iHTMLElement, iSkin) {
                    super(iSkin ? iSkin : "./skins/gencom/messagewindow/SkMessageWindow", iHTMLElement);
                    //------------------------------
                    // Members
                    //------------------------------
                    this.mTitle = "";
                    this.mMessage = "";
                    this.mMessageIcon = "";
                    this.mIsWithImSure = false;
                    this.mYesBtnLabel = "OK";
                    this.mNoBtnLabel = "CANCEL";
                }
                //____________________________________________________________________
                creationComplete() {
                    this.title_lbl = this.getPart("title_lbl");
                    this.title_lbl.innerHTML = this.mTitle;
                    this.message_lbl = this.getPart("message_lbl");
                    this.message_lbl.innerHTML = this.mMessage;
                    this.no_btn = this.getPart("no_btn");
                    //Levi changed translate
                    this.no_btn.innerHTML = asBase.LanguageDictionary.getText("CANCEL", this.mNoBtnLabel);
                    this.yes_btn = this.getPart("yes_btn");
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", this.mYesBtnLabel);
                    this.messageIcon_span = this.getPart("messageIcon_span");
                    this.messageIcon_span.className = "";
                    this.messageIcon_span.classList.add(CoMessageWindow.QUESTION);
                    this.imSure_chb = this.getPart("imSure_chb");
                    this.imSure_chb_com = new CoCheckBox(this.imSure_chb);
                    this.imSure_chb_com.includeInLayout = this.mIsWithImSure;
                    super.creationComplete();
                }
                //____________________________________________________________________
                show(iCallBackFunction = null) {
                    if (this.imSure_chb_com) {
                        this.imSure_chb_com.includeInLayout = this.mIsWithImSure;
                        this.imSure_chb_com.selected = false;
                        this.imSure_chb_com.clearError();
                    }
                    super.show(iCallBackFunction);
                }
                //____________________________________________________________________
                hide() {
                    this.mIsWithImSure = false;
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    this.mYesBtnLabel = "OK";
                    this.no_btn.innerHTML = asBase.LanguageDictionary.getText("CANCEL", "CANCEL");
                    this.mNoBtnLabel = "CANCEL";
                    super.hide();
                }
                //____________________________________________________________________
                addEventListeners() {
                    EventManager.addEventListener(EventTypes.ESC_KEY_DOWN, () => this.escClicked__EventHandler(), this);
                    this.yes__EventHandler_Func = () => this.yes__EventHandler();
                    this.yes_btn.addEventListener(MouseEvents.CLICK, this.yes__EventHandler_Func);
                    this.no__EventHandler_Func = () => this.no__EventHandler();
                    this.no_btn.addEventListener(MouseEvents.CLICK, this.no__EventHandler_Func);
                    this.imSure_chb_com.addEventListener(EventTypes.CHANGE, () => this.imSureChanged__EventHandler(), this);
                }
                //____________________________________________________________________
                removeEventListeners() {
                    EventManager.removeEventListener(EventTypes.ESC_KEY_DOWN, this);
                    this.yes_btn.removeEventListener(MouseEvents.CLICK, this.yes__EventHandler_Func);
                    this.no_btn.removeEventListener(MouseEvents.CLICK, this.no__EventHandler_Func);
                }
                //________________________________________________________________________________________________________
                escClicked__EventHandler() {
                    this.no__EventHandler();
                }
                //____________________________________________________________________
                switchToQuestion() {
                    this.mMessageIcon = CoMessageWindow.QUESTION;
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                        //this.messageIcon_span.classList.add(this.mMessageIcon);
                    }
                    Utils.showSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToYesNoQuestion() {
                    this.mMessageIcon = CoMessageWindow.QUESTION;
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                        //this.messageIcon_span.classList.add(this.mMessageIcon);
                    }
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("message-window-yes-button", "YES");
                    this.no_btn.innerHTML = asBase.LanguageDictionary.getText("message-window-no-button", "NO");
                    Utils.showSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToNotification() {
                    this.mMessageIcon = CoMessageWindow.NOTIFICATION;
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToNotificationWithCancel() {
                    this.mMessageIcon = CoMessageWindow.NOTIFICATION;
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    Utils.showSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToLocked() {
                    this.mMessageIcon = CoMessageWindow.LOCK;
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToNotAllowed() {
                    this.mMessageIcon = CoMessageWindow.NOT_ALLOWED;
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToError() {
                    this.mMessageIcon = CoMessageWindow.ERROR;
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToCreditCardError() {
                    this.mMessageIcon = CoMessageWindow.CREDIT_CARD_ERROR;
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                yes__EventHandler() {
                    if (this.mIsWithImSure && !this.imSure_chb_com.selected) {
                        this.imSure_chb_com.setError();
                        return;
                    }
                    this.mSelectedAction = CoMessageWindow.SELECTED_ACTION_YES;
                    if (this.mCallBackFunc) {
                        this.mCallBackFunc(this.mSelectedAction);
                    }
                    this.hide();
                }
                //____________________________________________________________________
                no__EventHandler() {
                    this.mSelectedAction = CoMessageWindow.SELECTED_ACTION_NO;
                    if (this.mCallBackFunc) {
                        this.mCallBackFunc(this.mSelectedAction);
                    }
                    this.hide();
                }
                //_____________________________________________________________________
                imSureChanged__EventHandler() {
                    if (this.imSure_chb_com.selected) {
                        this.imSure_chb_com.clearError();
                    }
                }
                /****************************
                 * Getters & Setters
                 ****************************/
                //____________________________________________________________________
                set title(value) {
                    this.mTitle = value;
                    if (this.title_lbl) {
                        this.title_lbl.innerHTML = this.mTitle;
                    }
                }
                //____________________________________________________________________
                set message(value) {
                    this.mMessage = value;
                    if (this.message_lbl) {
                        this.message_lbl.innerHTML = this.mMessage;
                    }
                }
                //____________________________________________________________________
                set isWithImSure(value) {
                    this.mIsWithImSure = value;
                }
                //____________________________________________________________________
                set yesBtnLabel(value) {
                    this.mYesBtnLabel = value;
                    if (this.yes_btn) {
                        this.yes_btn.innerHTML = value;
                    }
                }
                //____________________________________________________________________
                set noBtnLabel(value) {
                    this.mNoBtnLabel = value;
                    if (this.no_btn) {
                        this.no_btn.innerHTML = value;
                    }
                }
            }
            CoMessageWindow.SELECTED_ACTION_YES = "SelectedActionYes";
            CoMessageWindow.SELECTED_ACTION_NO = "SelectedActionNo";
            //------------------------------
            // icons
            //------------------------------
            CoMessageWindow.WARNING = "icon_penguin_warning";
            CoMessageWindow.QUESTION = "icon_penguin_question";
            CoMessageWindow.ERROR = "icon_penguin_error";
            CoMessageWindow.CREDIT_CARD_ERROR = "icon_penguin_card_error";
            CoMessageWindow.NOTIFICATION = "icon_penguin_notice";
            CoMessageWindow.LOCK = "icon_penguin_locked";
            CoMessageWindow.NOT_ALLOWED = "icon_penguin_notallowed";
            messagewindow.CoMessageWindow = CoMessageWindow;
        })(messagewindow = entry.messagewindow || (entry.messagewindow = {}));
    })(entry = com.entry || (com.entry = {}));
})(com || (com = {}));
///<reference path="../../gencom/messagewindow/CoMessageWindow.ts"/>
var asBase;
///<reference path="../../gencom/messagewindow/CoMessageWindow.ts"/>
(function (asBase) {
    var managers;
    (function (managers) {
        var CoMessageWindow = com.entry.messagewindow.CoMessageWindow;
        class MoAppErrorManagerBase {
            // get the singelton
            //___________________________________________________________________________________________________________
            static get appErrorManagerBase() {
                if (!this.mAppErrorManagerBase) {
                    this.mAppErrorManagerBase = new MoAppErrorManagerBase();
                }
                return this.mAppErrorManagerBase;
            }
            //___________________________________________________________________________________________________________
            setToActive() {
                this.isErrorInApp = false;
            }
            //___________________________________________________________________________________________________________
            resetOccasion__EventHandler() {
                this.isErrorInApp = false;
            }
            //____________________________________________________________________________________________
            sessionError() {
                CoMessageWindow.sMessageWindow.switchToNotification();
                //Levi changed translate
                CoMessageWindow.sMessageWindow.title = asBase.LanguageDictionary.getText("message-window-title-session-error", "Session Error");
                CoMessageWindow.sMessageWindow.message = asBase.LanguageDictionary.getText("message-window-message-login-again", "Please login again to continue.");
                CoMessageWindow.sMessageWindow.show(() => this.exitAndGoToHomePage());
            }
            //____________________________________________________________________________________________
            connectionLostError() {
                CoMessageWindow.sMessageWindow.switchToNotification();
                CoMessageWindow.sMessageWindow.title = asBase.LanguageDictionary.getText("message-window-title-connection-error", "Connection Error");
                CoMessageWindow.sMessageWindow.message = asBase.LanguageDictionary.getText("message-window-message-login-again", "Please login again to continue.");
                CoMessageWindow.sMessageWindow.show(() => this.exitAndGoToHomePage());
            }
            //____________________________________________________________________________________________
            versionError() {
                CoMessageWindow.sMessageWindow.switchToNotification();
                CoMessageWindow.sMessageWindow.title = asBase.LanguageDictionary.getText("message-window-title-general-error", "General Error");
                CoMessageWindow.sMessageWindow.message = asBase.LanguageDictionary.getText("message-window-message-login-again", "Please login again to continue.");
                CoMessageWindow.sMessageWindow.show(() => this.exitAndGoToHomePage());
            }
            //____________________________________________________________________________________________
            exitAndGoToHomePage() {
                ///TODO ///MoOccasion.occasion.emptyHardExitMessage();
                location.reload(true);
            }
            //____________________________________________________________________________________________
            appAidle() {
                CoMessageWindow.sMessageWindow.switchToNotification();
                CoMessageWindow.sMessageWindow.title = asBase.LanguageDictionary.getText("message-window-title-re-login", "Please Re-Login");
                CoMessageWindow.sMessageWindow.message = asBase.LanguageDictionary.getText("message-window-message-re-login", "You have been idle for too long, please login again to continue");
                CoMessageWindow.sMessageWindow.show(() => this.appIdleConfirmed());
            }
            //____________________________________________________________________________________________
            appIdleConfirmed() {
                this.exitAndGoToHomePage();
            }
            //____________________________________________________________________________________________
            exitWithMessage(iIsActive) {
                if (iIsActive) {
                    window.onbeforeunload = function () {
                        return "Are you sure?";
                    };
                }
                else {
                    window.onbeforeunload = null;
                }
            }
            //____________________________________________________________________________________________
            handleServerError(iEventType, iServiceName, iServiceMethod, iErrorCode = -1) {
                this.lockApp(false);
                if (this.isErrorInApp) {
                    return;
                }
                asBase.MoPopupManager.popupManager.hideAllOpenWindows();
                this.lockApp(false);
                this.throwingErrorMessage("DB Error: " + iErrorCode, iServiceName, iServiceMethod);
                this.isErrorInApp = true;
                this.exitWithMessage(false);
            }
            //____________________________________________________________________________________________
            throwingErrorMessage(iError, iSender, iFunctionName, iAlowSaving = true) {
                if (this.isErrorInApp) {
                    return;
                }
                asBase.MoPopupManager.popupManager.hideAllOpenWindows();
                com.entry.messagewindow.CoMessageWindow.sMessageWindow.switchToError();
                CoMessageWindow.sMessageWindow.title = asBase.LanguageDictionary.getText("sorry-something-went-wrong", "Sorry, something went wrong");
                CoMessageWindow.sMessageWindow.message = asBase.LanguageDictionary.getText("message-window-message-something-went-wrong", "Seems that you might need to re-login to AllSeated. <br /><br />Note: If you get this message more than once, send us an email to support@allseated.com.<br /><br />");
                CoMessageWindow.sMessageWindow.show(() => this.exitAndGoToHomePage());
                this.isErrorInApp = true;
                this.exitWithMessage(false);
            }
            //____________________________________________________________________________________________
            lockApp(iIsLock) {
                // FlexGlobals.topLevelApplication.mouseEnabled = FlexGlobals.topLevelApplication.mouseChildren = !iIsLock;
            }
            //____________________________________________________________________________________________
            set isErrorInApp(value) {
                MoAppErrorManagerBase.mIsErrorInApp = value;
            }
            get isErrorInApp() {
                return MoAppErrorManagerBase.mIsErrorInApp;
            }
        }
        //------------------------------
        // Members
        //------------------------------
        MoAppErrorManagerBase.mIsErrorInApp = false;
        managers.MoAppErrorManagerBase = MoAppErrorManagerBase;
    })(managers = asBase.managers || (asBase.managers = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var managers;
    (function (managers) {
        class MoBrowserWindowObjectManagerBase {
            //____________________________________________________________________________________________
            updateWindowObject(iName, iValue) {
                window[iName] = iValue;
            }
        }
        managers.MoBrowserWindowObjectManagerBase = MoBrowserWindowObjectManagerBase;
    })(managers = asBase.managers || (asBase.managers = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        class Line {
            constructor(iStart, iEnd) {
                this.start = iStart;
                this.end = iEnd;
                if (this.end.x < this.start.x) {
                    let aTemp = this.end;
                    this.end = this.start;
                    this.start = aTemp;
                }
            }
            get slope() {
                return (this.end.y - this.start.y) / (this.end.x - this.start.x);
            }
            //____________________________________________________________________
            getYAt(iX) {
                if (iX > this.end.x || iX < this.start.x) {
                    return null;
                }
                return this.start.y + this.slope * iX;
            }
            //____________________________________________________________________
            getXAt(iY) {
                let aX = this.start.x + (iY - this.start.y) * (this.end.x - this.start.x) / (this.end.y - this.start.y);
                if (aX > this.end.x || aX < this.start.x) {
                    return null;
                }
                return aX;
            }
        }
        math.Line = Line;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
/*
Base On:
https://github.com/epistemex/transformation-matrix-js/blob/master/src/matrix.js

*/
var asBase;
/*
Base On:
https://github.com/epistemex/transformation-matrix-js/blob/master/src/matrix.js

*/
(function (asBase) {
    var math;
    (function (math) {
        class Matrix {
            constructor() {
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
            static fromSVGMatrix(svgMatrix) {
                return new Matrix().multiply(svgMatrix);
            }
            ;
            //______________________________________________________
            static fromDOMMatrix(domMatrix) {
                return new Matrix().multiply(domMatrix);
            }
            ;
            //______________________________________________________
            translate(pX, pY) {
                this.e += pX;
                this.f += pY;
            }
            ;
            flipX() {
                return (this.transform(-1, 0, 0, 1, 0, 0));
            }
            ;
            //______________________________________________________
            flipY() {
                return (this.transform(1, 0, 0, -1, 0, 0));
            }
            ;
            //______________________________________________________
            applyToPoint(x, y) {
                let aPoint = new math.Point();
                aPoint.x = x * this.a + y * this.c + this.e;
                aPoint.y = x * this.b + y * this.d + this.f;
                return (aPoint);
            }
            ;
            //______________________________________________________
            reflectVector(x, y) {
                var v = this.applyToPoint(0, 1), d = (v.x * x + v.y * y) * 2;
                x -= d * v.x;
                y -= d * v.y;
                return (new math.Point(x, y));
            }
            ;
            //______________________________________________________
            determinant() {
                return (this.a * this.d - this.b * this.c);
            }
            ;
            //______________________________________________________
            indent() {
                return (this.setTransform(1, 0, 0, 1, 0, 0));
            }
            ;
            //______________________________________________________
            rotate(pAngle) {
                var cos = Math.cos(pAngle), sin = Math.sin(pAngle);
                return this.transform(cos, sin, -sin, cos, 0, 0);
            }
            ;
            //____________________________________________________
            divideScalar(pScalar) {
                this.a /= pScalar;
                this.b /= pScalar;
                this.c /= pScalar;
                this.d /= pScalar;
                this.e /= pScalar;
                this.f /= pScalar;
            }
            ;
            //____________________________________________________
            setTransform(pA, pB, pC, pD, pE, pF) {
                this.a = pA;
                this.b = pB;
                this.c = pC;
                this.d = pD;
                this.e = pE;
                this.f = pF;
                return this;
            }
            ;
            //____________________________________________________
            transform(pA, pB, pC, pD, pE, pF) {
                let a1 = this.a;
                let b1 = this.b;
                let c1 = this.c;
                let d1 = this.d;
                let e1 = this.e;
                let f1 = this.f;
                this.a = a1 * pA + c1 * pB;
                this.b = b1 * pA + d1 * pB;
                this.c = a1 * pC + c1 * pD;
                this.d = b1 * pC + d1 * pD;
                this.e = a1 * pE + c1 * pF + e1;
                this.f = b1 * pE + d1 * pF + f1;
                return this;
            }
            ;
            //____________________________________________________
            multiply(pMatrix) {
                return (this.transform(pMatrix.a, pMatrix.b, pMatrix.c, pMatrix.d, pMatrix.e, pMatrix.f));
            }
            //____________________________________________________
            inverse() {
                let aRet = new Matrix();
                let dt = this.determinant();
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
            }
            ;
            //____________________________________________________
            interpolate(pMatrix, pT) {
                var aRet = new Matrix();
                aRet.a = this.a + (pMatrix.a - this.a) * pT;
                aRet.b = this.b + (pMatrix.b - this.b) * pT;
                aRet.c = this.c + (pMatrix.c - this.c) * pT;
                aRet.d = this.d + (pMatrix.d - this.d) * pT;
                aRet.e = this.e + (pMatrix.e - this.e) * pT;
                aRet.f = this.f + (pMatrix.f - this.f) * pT;
                return aRet;
            }
            ;
            //____________________________________________________
            q(p1, p2) {
                return (Math.abs(p1 - p2) < 1e-14);
            }
            /****************************
            * Getters and Setters
            ****************************/
            static get myName() {
                return "Matrix";
            }
            //______________________________________________
            get myClassName() {
                return "Matrix";
            }
        }
        math.Matrix = Matrix;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        class Rectangle {
            constructor(pClientRect) {
                //------------------------------
                // Members
                //------------------------------
                this.left = 0;
                this.right = 0;
                this.top = 0;
                this.bottom = 0;
                if (pClientRect != null) {
                    this.left = pClientRect.left;
                    this.right = pClientRect.right;
                    this.top = pClientRect.top;
                    this.bottom = pClientRect.bottom;
                }
            }
            //____________________________________
            getSerializeData() {
                let pData = {};
                pData.left = this.left;
                pData.right = this.right;
                pData.top = this.top;
                pData.bottom = this.bottom;
                return pData;
            }
            //____________________________________
            readFromJson(pData) {
                if (pData == null) {
                    return;
                }
                this.left = pData.left;
                this.right = pData.right;
                this.top = pData.top;
                this.bottom = pData.bottom;
            }
            //____________________________________
            joinWith(pRectA) {
                if (pRectA.left < this.left) {
                    this.left = pRectA.left;
                }
                if (pRectA.right > this.right) {
                    this.right = pRectA.right;
                }
                if (pRectA.top < this.top) {
                    this.top = pRectA.top;
                }
                if (pRectA.bottom > this.bottom) {
                    this.bottom = pRectA.bottom;
                }
            }
            //____________________________________
            joinWithRect(pRectA) {
                if (pRectA.left < this.left) {
                    this.left = pRectA.left;
                }
                if (pRectA.right > this.right) {
                    this.right = pRectA.right;
                }
                if (pRectA.top < this.top) {
                    this.top = pRectA.top;
                }
                if (pRectA.bottom > this.bottom) {
                    this.bottom = pRectA.bottom;
                }
            }
            //____________________________________
            include(pRectB) {
                return (pRectB.left > this.left &&
                    pRectB.right < this.right &&
                    pRectB.top > this.top &&
                    pRectB.bottom < this.bottom);
            }
            //____________________________________
            get area() {
                return (this.width * this.height);
            }
            //____________________________________
            subtractRectangle(pRectB) {
                let aRect = new Rectangle();
                aRect.left = Math.max(this.left, pRectB.left);
                aRect.top = Math.max(this.top, pRectB.top);
                aRect.right = Math.min(this.right, pRectB.right);
                aRect.bottom = Math.min(this.bottom, pRectB.bottom);
                return aRect;
            }
            //____________________________________
            intersects(pRectB) {
                return !(pRectB.left > this.right ||
                    pRectB.right < this.left ||
                    pRectB.top > this.bottom ||
                    pRectB.bottom < this.top);
            }
            //____________________________________
            static intersectRect(pRectA, pRectB) {
                return !(pRectB.left > pRectA.right ||
                    pRectB.right < pRectA.left ||
                    pRectB.top > pRectA.bottom ||
                    pRectB.bottom < pRectA.top);
            }
            //____________________________________
            static intersectPoint(pRectA, iX, iY) {
                return !(pRectA.left > iX ||
                    pRectA.right < iX ||
                    pRectA.top > iY ||
                    pRectA.bottom < iY);
            }
            //____________________________________
            static create(iX, iY, iWidth, iHeight) {
                let aRet = new Rectangle();
                aRet.left = iX;
                aRet.right = iX + iWidth;
                aRet.top = iY;
                aRet.bottom = iY + iHeight;
                return aRet;
            }
            /****************************
             * Methods
             ****************************/
            /****************************
             * Getters and Setters
             ****************************/
            get height() {
                return Math.abs(this.top - this.bottom);
            }
            set height(pVal) {
                this.bottom = this.top + pVal;
            }
            //_____________________________________________________
            get width() {
                return Math.abs(this.left - this.right);
            }
            set width(pVal) {
                this.right = this.left + pVal;
            }
            //_____________________________________________________
            get y() {
                return this.top;
            }
            set y(pVal) {
                this.top = pVal;
            }
            //_____________________________________________________
            get x() {
                return this.left;
            }
            set x(pVal) {
                this.left = pVal;
            }
            //_____________________________________________________
            get centerX() {
                return (this.left + this.width / 2);
            }
            //_____________________________________________________
            get centerY() {
                return (this.top + this.height / 2);
            }
            //_____________________________________________________
            static get myClassName() {
                return "Rectangle";
            }
            //______________________________________________
            get myClassName() {
                return "Rectangle";
            }
        }
        math.Rectangle = Rectangle;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
///<reference path="events/MouseEvents.ts"/>
///<reference path="events/KeyboardCodes.ts"/>
var asBase;
///<reference path="events/MouseEvents.ts"/>
///<reference path="events/KeyboardCodes.ts"/>
(function (asBase) {
    var MouseEvents = asBase.events.MouseEvents;
    var KeyboardCodes = asBase.events.KeyboardCodes;
    class MoFocusManager {
        constructor() {
            this.mNextTabTable = {};
            this.mGroupsTable = {};
            this.mElementsGroupTable = {};
            this.mElementsCallbackTable = {};
            MoFocusManager.mWaitingList = new Array();
            setInterval(() => this.checkWaitingList(), 2000);
            window.onfocus = () => this.setAppActive(true);
            window.onblur = () => this.setAppActive(false);
        }
        //________________________________________________________________________________
        setAppActive(pIsActive) {
            asBase.MoFocusManager.mIsAppInFocus = pIsActive;
            ////console.log("asBase.MoFocusManager.mIsAppActive  = " + asBase.MoFocusManager.mIsAppInFocus);
        }
        //________________________________________________________________________________
        static get isAppInFocus() {
            return asBase.MoFocusManager.mIsAppInFocus;
            //return true;
        }
        //________________________________________________________________________________
        static addHTMLElementToGroup(pElement, pGroupId, pIndex, pCallback) {
            if (pElement instanceof HTMLElement) {
                if (pElement.id == "") {
                    pElement.id = "ID_FROM_FM_" + asBase.Utils.uniqueId;
                }
                MoFocusManager.instance.addElementToGroup(pElement, pGroupId, pIndex, pCallback);
            }
            else {
                let aWaitingListItem = new WaitingListItem();
                aWaitingListItem.callback = pCallback;
                aWaitingListItem.elementCallback = pElement;
                aWaitingListItem.groupId = pGroupId;
                aWaitingListItem.index = pIndex;
                MoFocusManager.mWaitingList.push(aWaitingListItem);
            }
        }
        //________________________________________________________________________________
        static addHTMLElement(pElement, pWithElement, pCallback) {
            if ((pElement instanceof HTMLElement) && (pWithElement instanceof HTMLElement)) {
                if (pElement.id == "") {
                    pElement.id = "ID_FROM_FM_" + asBase.Utils.uniqueId;
                }
                if (pWithElement.id == "") {
                    pWithElement.id = "ID_FROM_FM_" + asBase.Utils.uniqueId;
                }
                MoFocusManager.instance.addElement(pElement, pWithElement, pCallback);
            }
            else {
                console.log("Not implomented yet ");
            }
        }
        //_______________________________________________________________________________
        checkWaitingList() {
            for (let i = MoFocusManager.mWaitingList.length - 1; i >= 0; i--) {
                if (MoFocusManager.mWaitingList[i].elementCallback() != null) {
                    let aWLI = MoFocusManager.mWaitingList[i];
                    MoFocusManager.addHTMLElementToGroup(aWLI.elementCallback(), aWLI.groupId, aWLI.index, aWLI.callback);
                    MoFocusManager.mWaitingList.splice(i, 1);
                }
            }
        }
        //_______________________________________________________________________________
        static setNextfocuse(pComponen) {
            let aToElement = MoFocusManager.mInstance.mNextTabTable[pComponen.id];
            if (aToElement != null) {
                console.log("from : " + pComponen.id);
                return (MoFocusManager.instance.setFocuseTo(aToElement));
            }
            else {
                return (MoFocusManager.instance.setNextfocuseByGroup(pComponen));
            }
        }
        //________________________________________________________________
        static get instance() {
            if (MoFocusManager.mInstance == null) {
                MoFocusManager.mInstance = new MoFocusManager();
            }
            return MoFocusManager.mInstance;
        }
        //________________________________________________________________________________
        setNextfocuseByGroup(pElement) {
            let aId = pElement.id;
            let aGroup = this.mElementsGroupTable[aId];
            let aGroupList = this.mGroupsTable[aGroup];
            if (aGroupList == null) {
                return true;
            }
            let aIndex = aGroupList.indexOf(pElement) + 1;
            for (let i = aIndex; i < aGroupList.length; i++) {
                if ((aGroupList[i] != null) && (aGroupList[i].getBoundingClientRect().width > 0)) {
                    return (this.setTheFocus(aGroupList[i]));
                }
            }
            for (let i = 0; i < aGroupList.length; i++) {
                if ((aGroupList[i] != null) && (aGroupList[i].getBoundingClientRect().width > 0)) {
                    return (this.setTheFocus(aGroupList[i]));
                }
            }
        }
        //________________________________________________________________________________
        static isIncluded(pElement) {
            return MoFocusManager.instance.isInFocusManager(pElement);
        }
        //________________________________________________________________________________
        isInFocusManager(pElement) {
            if (this.mElementsGroupTable[pElement.id] != null) {
                return true;
            }
            if (this.mNextTabTable[pElement.id] != null) {
                return true;
            }
            return false;
        }
        //________________________________________________________________________________
        addElementToGroup(pElement, pGroupId, pIndex, pCallback) {
            this.mElementsCallbackTable[pElement.id] = pCallback;
            let aGroupList;
            if (this.mGroupsTable[pGroupId] == null) {
                this.mGroupsTable[pGroupId] = new Array();
            }
            aGroupList = this.mGroupsTable[pGroupId];
            if (aGroupList.indexOf(pElement) > -1) {
                aGroupList[aGroupList.indexOf(pElement)] = null;
            }
            aGroupList[pIndex] = pElement;
            this.mElementsGroupTable[pElement.id] = pGroupId;
            pElement.addEventListener(asBase.events.EventTypes.KEY_DOWN, function (event) {
                asBase.Globals.isAltDown = event.altKey;
                asBase.Globals.isControlDown = event.ctrlKey || event.metaKey;
                let aCode = event.keyCode || event.location;
                if (aCode == KeyboardCodes.TAB) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    asBase.MoFocusManager.setNextfocuse(event.currentTarget);
                }
            });
        }
        //_______________________________________________________________________________
        setFocuseTo(pToElement) {
            console.log("to : " + pToElement.id);
            if (pToElement.getBoundingClientRect().width == 0) {
                if (this.mNextTabTable[pToElement.id] != null) {
                    return (this.setFocuseTo(this.mNextTabTable[pToElement.id]));
                }
                return false;
            }
            return (this.setTheFocus(pToElement));
        }
        //______________________________________________________________
        setTheFocus(pElement) {
            if (this.mElementsCallbackTable[pElement.id] != null) {
                window.dispatchEvent((new MouseEvent(MouseEvents.MOUSE_DOWN)));
                this.mElementsCallbackTable[pElement.id]();
                return true;
            }
            window.setTimeout(function (aElement) {
                if (aElement instanceof HTMLInputElement) {
                    aElement.select();
                }
                else {
                    aElement.focus();
                }
            }, 0, pElement);
            return false;
        }
        //_______________________________________________________________________________
        addElement(pComponen, pWithComponen, pCallback) {
            this.mNextTabTable[pComponen.id] = pWithComponen;
            this.mElementsCallbackTable[pComponen.id] = pCallback;
            pComponen.addEventListener(asBase.events.EventTypes.KEY_DOWN, function (event) {
                asBase.Globals.isAltDown = event.altKey;
                asBase.Globals.isControlDown = event.ctrlKey || event.metaKey;
                let aCode = event.keyCode || event.location;
                if (aCode == 9) {
                    event.stopImmediatePropagation();
                    event.stopPropagation();
                    if (asBase.MoFocusManager.setNextfocuse(event.currentTarget)) {
                        event.preventDefault();
                    }
                }
            });
        }
        /****************************
        * Getters and Setters
        ****************************/
        static get myName() {
            return "MoFocusManager";
        }
        //______________________________________________
        get myClassName() {
            return "MoFocusManager";
        }
    }
    MoFocusManager.mIsAppInFocus = true;
    asBase.MoFocusManager = MoFocusManager;
    class WaitingListItem {
    }
})(asBase || (asBase = {}));
///<reference path="events/EventDispatcher.ts"/>
var asBase;
///<reference path="events/EventDispatcher.ts"/>
(function (asBase) {
    class MoModelBase extends asBase.events.EventDispatcher {
        constructor(iCom) {
            super();
            this.mCom = iCom;
            this.mIsActive = false;
        }
        /****************************
        * Methods
        ****************************/
        //_______________________________________________________________
        setToActive() {
        }
        //_______________________________________________________________
        setToSleep() {
        }
        //_______________________________________________________________
        dispose() {
        }
        /****************************
        * Getters and Setters
        ****************************/
        //______________________________________________
        static get myName() {
            return "MoModelBase";
        }
        //______________________________________________
        get myClassName() {
            return "MoModelBase";
        }
        //______________________________________________
        set isActive(value) {
            this.mIsActive = value;
        }
        //______________________________________________
        get isActive() {
            return this.mIsActive;
        }
    }
    asBase.MoModelBase = MoModelBase;
})(asBase || (asBase = {}));
///<reference path="events/EventManager.ts"/>
///<reference path="events/EventTypes.ts"/>
///<reference path="../gencom/messagewindow/CoMessageWindow.ts"/>
var asBase;
///<reference path="events/EventManager.ts"/>
///<reference path="events/EventTypes.ts"/>
///<reference path="../gencom/messagewindow/CoMessageWindow.ts"/>
(function (asBase) {
    var EventManager = asBase.events.EventManager;
    var EventTypes = asBase.events.EventTypes;
    var CoMessageWindow = com.entry.messagewindow.CoMessageWindow;
    class MoPopupManager {
        constructor(a) {
            if (a != 100) {
                //TODO
                // MoAppManager.appManager.throwingErrorMessage("Singelton Violation - DaGlobal",this,"MoPopupManager");
                return;
            }
        }
        // get the singelton
        //___________________________________________________________________________________________________________
        static get popupManager() {
            if (!this.mPopupManager) {
                this.mPopupManager = new MoPopupManager(100);
                this.mPopupManager.mOpenWindows = new Object();
            }
            return this.mPopupManager;
        }
        //___________________________________________________________________________________________________________
        setToActive() {
            EventManager.addEventListener(EventTypes.SHOW_POPUP_WINDOW, (event) => this.showMessageWindow(event), this);
            EventManager.addEventListener(EventTypes.HIDE_POPUP_WINDOW, (event) => this.hideMessageWindow(event), this);
        }
        //___________________________________________________________________________________________________________
        hideAllOpenWindows() {
            for (let iWindowEntry in this.mOpenWindows) {
                if (this.mOpenWindows[iWindowEntry]) {
                    CoMessageWindow.sMessageWindow.hide();
                    this.mOpenWindows[iWindowEntry].classList.remove("show-the-modal");
                }
            }
            this.mOpenWindows.length = 0;
        }
        //___________________________________________________________________________________________________________
        showMessageWindow(event) {
            let aWindowDiv = event.data.window;
            let aIsBlockApp = event.data.isBlockApp;
            let aIsBlockFullApp = event.data.isBlockFullApp;
            if (!aWindowDiv.id) {
                console.error("Window needs to have an id");
            }
            this.addWindowToList(aWindowDiv);
            aWindowDiv.classList.add("show-the-modal");
            if (aIsBlockApp) {
                aWindowDiv.classList.add("modalBlockLayer");
            }
            else if (aIsBlockFullApp) {
                aWindowDiv.classList.add("modalBlockLayerFull");
            }
        }
        //___________________________________________________________________________________________________________
        hideMessageWindow(event) {
            let aWindowDiv = event.data;
            this.removeWindowFromList(aWindowDiv);
            aWindowDiv.classList.remove("show-the-modal");
            if (aWindowDiv.classList.contains("modalBlockLayer")) {
                aWindowDiv.classList.remove("modalBlockLayer");
            }
            if (aWindowDiv.classList.contains("modalBlockLayerFull")) {
                aWindowDiv.classList.remove("modalBlockLayerFull");
            }
        }
        //___________________________________________________________________________________________________________
        addWindowToList(iWindow) {
            this.mOpenWindows[iWindow.id] = iWindow;
        }
        //___________________________________________________________________________________________________________
        removeWindowFromList(iWindow) {
            delete this.mOpenWindows[iWindow.id];
        }
    }
    asBase.MoPopupManager = MoPopupManager;
})(asBase || (asBase = {}));
///<reference path="../gencom/events/EvGeneral.ts"/>
///<reference path="managers/MoAppErrorManagerBase.ts"/>
var asBase;
///<reference path="../gencom/events/EvGeneral.ts"/>
///<reference path="managers/MoAppErrorManagerBase.ts"/>
(function (asBase) {
    var MoAppErrorManagerBase = asBase.managers.MoAppErrorManagerBase;
    var EvGeneral = gencom.events.EvGeneral;
    class MoService extends asBase.events.EventDispatcher {
        constructor() {
            super();
        }
        asyncCallService(iService, iData) {
            this.mService = iService;
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: this.serviceURL + iService,
                    data: iData,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (data) {
                        resolve(data);
                    }
                });
            });
        }
        //___________________________________________________________________________________________________________
        callService(iService, iData, iSuccessFun, iFailFunc = (iData) => this.resultError__EventHandler(iData)) {
            this.mService = iService;
            $.ajax({
                type: "POST",
                url: this.serviceURL + iService,
                data: iData,
                success: function (data) {
                    ///TODO
                    /*
                    if (DaDebugSettings.SHOW_SERVICE_RELATED){
                        console.log ("Back from Service ---->" + iService);
                    }
                    */
                    iSuccessFun(data);
                },
                error: function (data) {
                    iFailFunc(data);
                }
            });
        }
        //____________________________________________________________________________________
        resultError__EventHandler(iData) {
            MoAppErrorManagerBase.appErrorManagerBase.throwingErrorMessage("error in service - " + this.mService, this, "resultError__Eventhandler");
        }
        //____________________________________________________________________________________
        handleServerError(iErrorCode, iServiceMethod) {
            MoAppErrorManagerBase.appErrorManagerBase.handleServerError(EvGeneral.SERVER_ERROR, "MoGlobalDataService", iServiceMethod, iErrorCode);
        }
        //____________________________________________________________________________________
        get serviceURL() {
            return asBase.constants.DaGlobalConsts.BASE_URL + asBase.constants.DaGlobalConsts.ALLSEATED_SERVER_SRV;
        }
    }
    asBase.MoService = MoService;
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    class MoSharedObject {
        constructor() {
        }
        //___________________________________________________________________________________________________________
        static get sharedObject() {
            if (this.mSharedObject == null) {
                this.mSharedObject = new MoSharedObject();
            }
            return this.mSharedObject;
        }
        //___________________________________________________________________________________________________________
        saveToSharedObject(iKey, iValue) {
            if (!localStorage) {
                return "";
            }
            localStorage.setItem(iKey, iValue);
        }
        //___________________________________________________________________________________________________________
        readFromSharedObject(iKey) {
            if (!localStorage) {
                return "";
            }
            let aValue = localStorage.getItem(iKey);
            return (aValue) ? aValue : "";
        }
    }
    asBase.MoSharedObject = MoSharedObject;
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    class SkinsCss {
    }
    // COM
    SkinsCss.COM = "com.";
    SkinsCss.COM_ACCOUNTPAGE = "com.accountpage.";
    SkinsCss.COM_CAMPAIGN = "com.campaignmgr.";
    SkinsCss.COM_CAMPAIGN_LOCATION = SkinsCss.COM_CAMPAIGN + "campaignlocation.";
    SkinsCss.COM_CAMPAIGN_STEPS = SkinsCss.COM_CAMPAIGN + "campaignsteps.";
    SkinsCss.COM_CAMPAIGN_ACTIVE = SkinsCss.COM_CAMPAIGN + "campaignactive.";
    SkinsCss.COM_CAMPAIGN_WINDOW = SkinsCss.COM_CAMPAIGN + "campaignwindows.";
    SkinsCss.COM_SEARCHVENDORWINDOW = "com.searchvendorwindow.";
    SkinsCss.COM_OCCASIONSPS = "com.occasionspsdisplay.";
    SkinsCss.COM_ENTOURAGEDISPLAY = "com.entouragedisplay.";
    SkinsCss.COM_LAYOUTMENU = "com.layoutmenu.";
    SkinsCss.COM_LAYOUTMENU_SELECT_SUBOCCASION = SkinsCss.COM_LAYOUTMENU + "selectsuboccasionwindow.";
    SkinsCss.COM_LAYOUTMENU_GUESTS = SkinsCss.COM_LAYOUTMENU + "layoutmenuguests.";
    SkinsCss.COM_BOTTOMMENU = "com.bottommenu.";
    SkinsCss.COM_ADMIN_BOTTOMMENU = "com.adminbottommenu.";
    SkinsCss.COM_LAYOUT_HALLMAPSELECTOR = "com.layout.hallmapselector.";
    SkinsCss.COM_LAYOUT_FLOATINGWINDOW = "com.layout.layoutfloatingwindow.";
    SkinsCss.COM_LAYOUT_TEMPLATES = "com.layout.layouttemplates.";
    SkinsCss.COM_LAYOUT_TABLEBUILDER = "com.layout.tablebuilder.";
    SkinsCss.COM_LAYOUT_TBMENU = "com.layout.tbmenu.";
    SkinsCss.COM_LAYOUT_TBMENU_GENERAL = SkinsCss.COM_LAYOUT_TBMENU + "tbgeneral.";
    SkinsCss.COM_GENCOM = "gencom.";
    SkinsCss.COM_DATAGRID = SkinsCss.COM_GENCOM + "datagrid.";
    SkinsCss.COM_GUESTS_LIST = "com.guestslist.";
    SkinsCss.COM_GUESTS_LIST_PANEL = "com.guestslistpanel.";
    SkinsCss.COM_REPORTS_PANEL = "com.reportspanel.";
    SkinsCss.COM_ASSIGN_MANAGER = "com.assignmanager.";
    // STYLES
    SkinsCss.STYLES = "./styles/";
    SkinsCss.IMAGES = SkinsCss.STYLES + "img/";
    // SKINS
    SkinsCss.SKINS = "./skins/";
    SkinsCss.SKINS_COM = SkinsCss.SKINS + "com/";
    SkinsCss.SKINS_COM_ACCOUNT_PAGE = SkinsCss.SKINS_COM + "accountpage/";
    SkinsCss.SKINS_COM_PROFILE_PAGE = SkinsCss.SKINS_COM + "profilepage/";
    SkinsCss.SKINS_COM_FORMS = SkinsCss.SKINS_COM + "profilepage/forms/";
    SkinsCss.SKINS_COM_MODALS = SkinsCss.SKINS_COM + "profilepage/modalwindows/";
    SkinsCss.SKINS_GENCOM = SkinsCss.SKINS + "gencom/";
    SkinsCss.SKINS_CALENDAR = SkinsCss.SKINS_GENCOM + "calendar/";
    SkinsCss.SKINS_DATAGRID = SkinsCss.SKINS_GENCOM + "datagrid/";
    SkinsCss.SKINS_CHECKBOX = SkinsCss.SKINS_GENCOM + "checkbox/";
    SkinsCss.SKINS_CAMPAIGN = SkinsCss.SKINS_COM + "campaignmgr/";
    SkinsCss.SKINS_CAMPAIGN_STEPS = SkinsCss.SKINS_CAMPAIGN + "campaignsteps/";
    SkinsCss.SKINS_CAMPAIGN_ACTIVE = SkinsCss.SKINS_CAMPAIGN + "campaignactive/";
    SkinsCss.SKINS_CAMPAIGN_LOCATION = SkinsCss.SKINS_CAMPAIGN + "campaignlocation/";
    SkinsCss.SKINS_CAMPAIGN_WINDOWS = SkinsCss.SKINS_CAMPAIGN + "campaignwindows/";
    SkinsCss.SKINS_COM_OCCASIONSLIST = SkinsCss.SKINS_COM + "occasionslist/";
    SkinsCss.SKINS_COM_OCCASIONSPS = SkinsCss.SKINS_COM + "occasionspsdisplay/";
    SkinsCss.SKINS_COM_ENTOURAGEDISPLAY = SkinsCss.SKINS_COM + "entouragedisplay/";
    SkinsCss.SKINS_COM_LAYOUTMENU = SkinsCss.SKINS_COM + "layoutmenu/";
    SkinsCss.SKINS_COM_LAYOUTMENU_SELECT_SUBOCCASION = SkinsCss.SKINS_COM_LAYOUTMENU + "selectsuboccasionwindow/";
    SkinsCss.SKINS_COM_LAYOUTMENU_GUESTS = SkinsCss.SKINS_COM_LAYOUTMENU + "layoutmenuguests/";
    SkinsCss.SKINS_COM_BOTTOMMENU = SkinsCss.SKINS_COM + "bottommenu/";
    SkinsCss.SKINS_COM_ADMIN_BOTTOMMENU = SkinsCss.SKINS_COM + "adminbottommenu/";
    SkinsCss.SKINS_COM_LAYOUT_HALLMAPSELECTOR = SkinsCss.SKINS_COM + "layout/hallmapselector/";
    SkinsCss.SKINS_COM_LAYOUT_TEMPLATES = SkinsCss.SKINS_COM + "layout/layouttemplates/";
    SkinsCss.SKINS_COM_LAYOUT_TABLEBUILDER = SkinsCss.SKINS_COM + "layout/tablebuilder/";
    SkinsCss.SKINS_GUESTS_LIST = SkinsCss.SKINS_COM + "guestslist/";
    SkinsCss.SKINS_GUESTS_LIST_PANEL = SkinsCss.SKINS_COM + "guestlistpanel/";
    SkinsCss.SKINS_REPORTS_PANEL = SkinsCss.SKINS_COM + "reportspanel/";
    // Floating Windows Skins
    // Layout Windows ----------------->
    SkinsCss.SKINS_COM_LAYOUT = SkinsCss.SKINS_COM + "layout/";
    SkinsCss.SKINS_COM_LAYOUT_FLOATINGWINDOW = SkinsCss.SKINS_COM + "layout/layoutfloatingwindow/";
    SkinsCss.SKINS_COM_LAYOUT_WINDOWS = SkinsCss.SKINS_COM_LAYOUT + "windows/";
    SkinsCss.SKINS_COM_LAYOUT_REAL_TIME = SkinsCss.SKINS_COM_LAYOUT + "realtimecollaboration/";
    SkinsCss.LAYOUT_OBJECT_WINDOW = SkinsCss.SKINS_COM_LAYOUT + "layoutfloatingwindow/SkFloatingObjectWindow.html";
    SkinsCss.TABLES_STATUS_INDEX_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkTablesStatusIndex.html";
    SkinsCss.GET_RFP_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkGetRfpWindow.html";
    SkinsCss.FLOORPLANS_STATS_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkFloorPlanStatsWindow.html";
    SkinsCss.REALTIME_SETTINGS_WINDOW = SkinsCss.SKINS_COM_LAYOUT_REAL_TIME + "SkRealTimeSettings.html";
    SkinsCss.REALTIME_MANAGER_OPTIONS = SkinsCss.SKINS_COM_LAYOUT_REAL_TIME + "SkManagerOptions.html";
    SkinsCss.USERS_DISPLAY = SkinsCss.SKINS_COM_LAYOUT_REAL_TIME + "SkUsersDisplay.html";
    SkinsCss.LAYOUT_OBJECTS_SETTINGS_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkLayoutObjectsSettingsMenu.html";
    SkinsCss.LAYOUT_OBJECTS_DISPLAY_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkLayoutObjectsDisplayMenu.html";
    SkinsCss.LAYOUT_TEMPLATES_WINDOW = SkinsCss.SKINS_COM_LAYOUT_TEMPLATES + "SkTemplatesModal.html";
    SkinsCss.LAYOUT_ZOOM_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkHallMapZoomMenu.html";
    SkinsCss.LAYOUT_GRID_SETTINGS_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkGridSettingsWindow.html";
    SkinsCss.LAYOUT_RULER_ACTIONS_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkRulerActionsWindow.html";
    SkinsCss.LAYOUT_TLAT_CONTROLLER_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkTlatControllerWindow.html";
    SkinsCss.LAYOUT_EDIT_TB_SETTING_NAME_WINDOW = SkinsCss.SKINS_COM_LAYOUT_WINDOWS + "SkEditTBSettingNameWindow.html";
    SkinsCss.LAYOUT_CEREMONY_SETTINGS_WINDOW = SkinsCss.SKINS_COM_LAYOUT + "chairssettingwindow/SkCeremonyChairsSettingsWindow.html";
    // -----------------> Layout Windows
    // Layout Menu Windows ----------------->
    SkinsCss.SKINS_LAYOUTMENU_OBJECT_PROPERTIES = SkinsCss.SKINS_COM_LAYOUTMENU + "menuobjectproperties/";
    // -----------------> Layout TB Menu
    SkinsCss.SKINS_COM_LAYOUT_TBMENU = SkinsCss.SKINS_COM_LAYOUT + "tbmenu/";
    SkinsCss.SKINS_COM_LAYOUT_TBMENU_GENERAL = SkinsCss.SKINS_COM_LAYOUT_TBMENU + "tbgeneral/";
    SkinsCss.SKINS_COM_LAYOUT_TBMENU_CHAIRS_LAYOUT = SkinsCss.SKINS_COM_LAYOUT_TBMENU + "tbchairslayout/";
    SkinsCss.SKINS_COM_LAYOUT_TBMENU_REPORTS = SkinsCss.SKINS_COM_LAYOUT_TBMENU + "tbreports/";
    SkinsCss.TB_CHAIRS_LAYOUT_SETTINGS_SLIDER = SkinsCss.SKINS_COM_LAYOUT_TBMENU_CHAIRS_LAYOUT + "SkTBSettingsSliders.html";
    SkinsCss.LAYOUT_TB_SETTINGS_SLIDER_GRID = SkinsCss.SKINS_COM_LAYOUT_TBMENU_CHAIRS_LAYOUT + "SkTBGridSlider.html";
    //// Item renderers ------>
    SkinsCss.IR_CHECKBOX_SKIN = SkinsCss.SKINS_GENCOM + "checkbox/IrCheckBox.html";
    SkinsCss.IR_CHECKBOX_CLASS = SkinsCss.COM_GENCOM + "IrCheckBox";
    // class names
    SkinsCss.TOP_NAV_BUTTON_SELECTED = "selected-navItem";
    SkinsCss.SELECTED_TAB = "selected-tab";
    SkinsCss.CALENDAR_IR_CLASS_NAME = "calendar-item";
    SkinsCss.DISABLED = "disabled";
    SkinsCss.NORMAL_CURSOR = "normal-cursor";
    SkinsCss.ACTIVE = "active";
    // Z-Indexes
    SkinsCss.LAYOUT_WINDOWS_ZINDEX = "15";
    SkinsCss.LAYOUT_TOP_WINDOW_ZINDEX = "20";
    SkinsCss.LAYOUT_TB_REPORT_WINDOW = "20";
    // Hybrid Windows ----------------->
    SkinsCss.SKINS_COM_HYBRID = SkinsCss.SKINS_COM + "hybrid/";
    asBase.SkinsCss = SkinsCss;
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    class Styles {
    }
    Styles.ITEM_RENDERER_CLASS_NAME = "ir";
    Styles.ITEM_RENDERER_SELECTED_CLASS_NAME = "selected";
    Styles.ITEM_RENDERER_HOVERED_CLASS_NAME = "hovered";
    Styles.ITEM_RENDERER_EXPIRED_CLASS_NAME = "expired";
    Styles.ITEM_RENDERER_HEADER_CLASS_NAME = "header";
    Styles.ITEM_RENDERER_NEW_CLASS_NAME = "new";
    Styles.ITEM_RENDERER_FILTER_ON_CLASS_NAME = "filter-on";
    Styles.ITEM_RENDERER_FILTER_OFF_CLASS_NAME = "filter-off";
    Styles.COMBO_BOX_MAX_LINES_CLASS_NAME = "max-";
    asBase.Styles = Styles;
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    class SVGLoader {
        constructor(pUrl, pFunction) {
            this.XmlhttpCall(null, pUrl, pFunction);
        }
        ajaxCall(pJsonObj, pUrl, pFunction) {
            this.mCallback = pFunction;
            var aJQueryAjaxSettings; //: //JQueryAjaxSettings = new Object();
            aJQueryAjaxSettings.url = pUrl;
            aJQueryAjaxSettings.data = JSON.stringify(pJsonObj);
            aJQueryAjaxSettings.type = "POST";
            aJQueryAjaxSettings.success = (pResult) => this.loadSuccessAjax(pResult);
            // $.ajax(aJQueryAjaxSettings);
        }
        //______________________________________________________________
        loadSuccessAjax(pResult) {
            //alert(pResult);
            this.mCallback(pResult);
        }
        //______________________________________________________________
        XmlhttpCall(pJsonObj, pUrl, pFunction) {
            this.mCallback = pFunction;
            this.mXmlhttp = new XMLHttpRequest();
            this.mXmlhttp.open("GET", pUrl, true);
            this.mXmlhttp.setRequestHeader('Content-Type', 'application/json');
            this.mXmlhttp.onreadystatechange = () => this.loadXmlhttp();
            this.mXmlhttp.send();
        }
        //______________________________________________________________
        loadXmlhttp() {
            if (this.mXmlhttp.readyState == 4 && this.mXmlhttp.status == 200) {
                //alert(this.mXmlhttp.responseText);
                this.mCallback(this.mXmlhttp.responseText);
            }
        }
    }
    asBase.SVGLoader = SVGLoader;
})(asBase || (asBase = {}));
var zip = zip;
zip.workerScriptsPath = './js/';
var asBase;
(function (asBase) {
    class UnZip {
        constructor(pURL, pCallback, pProgressCallback) {
            this.mCallback = pCallback;
            this.mProgressCallback = pProgressCallback;
            this.getZipFile(pURL);
        }
        //--------------------------------------------
        getZipFile(pURL) {
            let aURl = pURL;
            let self = this;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", aURl, true);
            //////////////xhr.setRequestHeader("Content-type", "application/json");
            //////////////xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        self.onDownloadZip(xhr.response);
                    }
                    else {
                        self.mCallback("ERROR");
                    }
                }
            };
            xhr.onprogress = function (pProgress) {
                self.mProgressCallback(pProgress);
            };
            xhr.responseType = "arraybuffer";
            xhr.send();
        }
        //__________________________________
        onLoaded(pText) {
            this.mCallback(pText);
            // text contains the entry data as a String
            //console.log(text);
            ////////var script = document.createElement('script');
            ////////script.innerHTML = text;
            ////////script.type = 'text/javascript';
            ////////document.body.appendChild(script);
            ////////document.body.removeChild(document.body.lastChild);
            ////////close the zip reader
            this.mReader.close(function () {
                // onclose callback
            });
        }
        //_________________________________
        onEntries(entries) {
            for (let i = 0; i < entries.length; i++) {
                // get first entry content as text
                entries[i].getData(new zip.TextWriter(), (text) => this.onLoaded(text), function (current, total) {
                    // onprogress callback
                });
            }
            //if (entries.length) {
            //}
        }
        //__________________________________
        onReader(reader) {
            this.mReader = reader;
            // get all entries from the zip
            reader.getEntries((entries) => this.onEntries(entries));
        }
        //__________________________________
        onDownloadZip(pFile) {
            var blob = new Blob([pFile], { type: "octet/stream" });
            // use a BlobReader to read the zip from a Blob object
            //let aURl = "../www/js/siteaware-js.zip";
            zip.createReader(new zip.BlobReader(blob), (reader) => this.onReader(reader), function (error) {
                // onerror callback
            });
        }
    }
    asBase.UnZip = UnZip;
})(asBase || (asBase = {}));
/**
 * Created by moran on 06-Jul-16.
 */
var asBase;
/**
 * Created by moran on 06-Jul-16.
 */
(function (asBase) {
    class WindowLocator {
        //______________________________________________________________
        static centerOn(pElement, pCom, pExtraHeight) {
            let body = document.body;
            // let html = document.documentElement;
            let aBodyHeight = body.clientHeight;
            let aWindowHeight = pElement.clientHeight;
            if (pExtraHeight != undefined) {
                aWindowHeight += pExtraHeight;
            }
            let aTop = (aBodyHeight - aWindowHeight) / 2 - 30;
            if (aTop < 0) {
                aTop = 0;
            }
            pElement.style.marginTop = aTop + "px";
            WindowLocator.currentDialog = pCom;
            WindowLocator.currentDialogElement = pElement;
        }
    }
    asBase.WindowLocator = WindowLocator;
})(asBase || (asBase = {}));
var gencom;
(function (gencom) {
    class DaCalendar {
        constructor() {
        }
        /****************************
         * Getters and Setters
         ****************************/
        //___________________________________________________________________
        get selectedDates() {
            return this.mSelectedDates;
        }
        set selectedDates(value) {
            this.mSelectedDates = value;
        }
        //___________________________________________________________________
        get selectedItemsAllMonths() {
            if (this.mSelectedItemsAllMonths == null) {
                this.mSelectedItemsAllMonths = new Array();
            }
            return this.mSelectedItemsAllMonths;
        }
        //___________________________________________________________________
        set selectedItemsAllMonths(value) {
            this.mSelectedItemsAllMonths = value;
        }
    }
    gencom.DaCalendar = DaCalendar;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var list;
    (function (list) {
        class EvList {
        }
        /* list */
        //public static LIST_DATA_READY: string = "LIST_DATA_READY";
        EvList.LIST_DATA_CHANGED = "LIST_DATA_CHANGED";
        EvList.LIST_IR_DELETE = "LIST_IR_DELETE";
        EvList.LIST_IR_CLICK = "LIST_IR_CLICK";
        EvList.LIST_BUILDER_COMPLETE = "LIST_BUILDER_COMPLETE";
        EvList.LIST_BUILDER_COMPLETE_ONE = "LIST_BUILDER_COMPLETE_ONE";
        EvList.LIST_CREATION_COMPLETE = "LIST_CREATION_COMPLETE";
        list.EvList = EvList;
    })(list = gencom.list || (gencom.list = {}));
})(gencom || (gencom = {}));
///<reference path="../../asBase/events/AsEvent.ts"/>
var gencom;
///<reference path="../../asBase/events/AsEvent.ts"/>
(function (gencom) {
    var AsEvent = asBase.events.AsEvent;
    class EvCalendar extends AsEvent {
        constructor(pKey, pBubbles = false, pSender, pCancelable = false) {
            super(pKey, pBubbles, pSender, pCancelable);
        }
        /****************************
         * Getters and Setters
         ****************************/
        //________________________________________________________________
        get data() {
            return this.mData;
        }
        set data(value) {
            this.mData = value;
        }
    }
    //------------------------------
    // Const
    //------------------------------
    //event
    EvCalendar.GET_CALENDAR_EV = "GET_CALENDAR_EV";
    EvCalendar.SET_CALENDAR_EV = "SET_CALENDAR_EV";
    gencom.EvCalendar = EvCalendar;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var preloader;
    (function (preloader) {
        class EvPreloader {
        }
        EvPreloader.SHOW_PRELOADER = "ShowPreloader_EV";
        EvPreloader.HIDE_PRELOADER = "HidePreloader_EV";
        EvPreloader.SHOW_PRELOADER_AUTO_PILOT = "ShowPreloaderAutoPilot_EV";
        EvPreloader.HIDE_PRELOADER_AUTO_PILOT = "HidePreloaderAutoPilot_EV";
        EvPreloader.BLOCK_APP = "BlockApp_EV";
        EvPreloader.UNBLOCK_APP = "UnBlockApp_EV";
        preloader.EvPreloader = EvPreloader;
    })(preloader = gencom.preloader || (gencom.preloader = {}));
})(gencom || (gencom = {}));
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
/// <reference path="../../asBase/CoClassFactory.ts"/>
/// <reference path="../list/EvList.ts" />
/// <reference path="../../asBase/collections/DaArrayCollection.ts" />
///<reference path="../../node_modules/types/moment/moment.d.ts"/>
///<reference path="EvCalendar.ts"/>
///<reference path="../preloader/EvPreloader.ts"/>
var gencom;
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
/// <reference path="../../asBase/CoClassFactory.ts"/>
/// <reference path="../list/EvList.ts" />
/// <reference path="../../asBase/collections/DaArrayCollection.ts" />
///<reference path="../../node_modules/types/moment/moment.d.ts"/>
///<reference path="EvCalendar.ts"/>
///<reference path="../preloader/EvPreloader.ts"/>
(function (gencom) {
    var MouseEvents = asBase.events.MouseEvents;
    var SkinsCss = asBase.SkinsCss;
    var EvItemRenderer = asBase.collections.EvItemRenderer;
    var EvList = gencom.list.EvList;
    var ArrayCollection = asBase.baseclasses.ArrayCollection;
    var AsEvent = asBase.events.AsEvent;
    var ItemRenderer = asBase.baseclasses.ItemRenderer;
    var EventManager = asBase.events.EventManager;
    var AcArray = asBase.baseclasses.AcArray;
    var CoClassFactory = asBase.CoClassFactory;
    var EvPreloader = gencom.preloader.EvPreloader;
    class MoCalendar extends asBase.MoModelBase {
        constructor(iCom) {
            super(iCom);
            //------------------------------
            // Const
            //------------------------------
            this.NUM_DAYS_IN_TABLE = 35;
            this.NUM_DAYS_IN_WEEK = 7;
            this.LEFT_ARROW_IMG_ENABLED = SkinsCss.IMAGES + "left-arrow-selected.png";
            this.LEFT_ARROW_IMG_DISABLED = SkinsCss.IMAGES + "left-arrow.png";
            MoCalendar.CLIENT_MOMENT_DATE = moment(new Date());
        }
        //_______________________________________________________________
        getMonthStr(aCurrMonth) {
            let aCurrMonthStr = aCurrMonth.toString();
            if (aCurrMonth < 10) {
                aCurrMonthStr = "0" + aCurrMonthStr;
            }
            return aCurrMonthStr;
        }
        //_______________________________________________________________
        setToActive() {
            this.prevBtnClick__EventHandler_Func = (event) => this.prevBtnClick__EventHandler(event);
            this.com.prevMonth_btn.addEventListener(MouseEvents.CLICK, this.prevBtnClick__EventHandler_Func);
            this.nextBtnClick__EventHandler_Func = (event) => this.nextBtnClick__EventHandler(event);
            this.com.nextMonth_btn.addEventListener(MouseEvents.CLICK, this.nextBtnClick__EventHandler_Func);
            if (this.com.calendar_list_com) {
                this.addListListeners();
            }
            if (!this.mCalendarDP) {
                this.loadCalendarData();
            }
            else {
                this.clearCalendar();
                this.callCalendarService(this.mCalendarMomentDate);
            }
            EventManager.addEventListener(MoCalendar.EV_CALENDAR_DELETE_DATA, (event) => this.calendarDeleteData__EventHandler(event), this);
        }
        //_______________________________________________________________
        setToSleep() {
            this.com.prevMonth_btn.removeEventListener(MouseEvents.CLICK, this.prevBtnClick__EventHandler_Func);
            this.prevBtnClick__EventHandler_Func = null;
            this.com.nextMonth_btn.removeEventListener(MouseEvents.CLICK, this.nextBtnClick__EventHandler_Func);
            this.nextBtnClick__EventHandler_Func = null;
            if (this.com.calendar_list_com) {
                this.removeListListeners();
            }
            EventManager.removeAllOwnerEvents(this);
        }
        //_______________________________________________________________
        dispose() {
            this.setToSleep();
            this.clearCalendar();
            this.com.calendar_list_com.dispose();
            this.selectedItemsAllMonths.splice(0);
            this.mSelectedItemsAllMonths = null;
            this.mDummies = null;
        }
        //_______________________________________________________________
        createList() {
            this.com.calendar_list_com = new gencom.list.CoList(this.com.calendarList_list, true);
            this.com.calendar_list_com.irClass = this.com.irClass;
            this.com.calendar_list_com.irSkin = this.com.irSkin;
            this.addListListeners();
        }
        //________________________________________________________________
        addListListeners() {
            this.com.calendar_list_com.addEventListener(EvList.LIST_BUILDER_COMPLETE, (event) => this.buildListComplete__EventHandler(event), this);
            this.com.calendar_list_com.addEventListener(EvItemRenderer.IR_SELECTION_CHANGED, (event) => this.listIrSelectionChanged__EventHandler(event), this);
            this.com.calendar_list_com.addEventListener(EvItemRenderer.IR_SELECTIONS_CHANGED, (event) => this.listIrSelectionsChanged__EventHandler(event), this);
        }
        //________________________________________________________________
        removeListListeners() {
            this.com.calendar_list_com.removeAllOwnerEvents(this);
        }
        //________________________________________________________________
        prevBtnClick__EventHandler(event) {
            if (!this.mIsEnabledPrevBtn) {
                return;
            }
            this.saveMonthItems();
            this.clearCalendar();
            --this.mMonthsIterator;
            let aData = this.mCalendarDP.getItemAt(0);
            let aFirstDayOfMonth = aData.date;
            var aPrevDate = moment(aFirstDayOfMonth).subtract(1, 'days');
            this.callCalendarService(aPrevDate);
        }
        //________________________________________________________________
        nextBtnClick__EventHandler(event) {
            this.saveMonthItems();
            this.clearCalendar();
            ++this.mMonthsIterator;
            let aData = this.mCalendarDP.getItemAt(this.mCalendarDP.length - 1);
            let aLastDayOfMonth = aData.date;
            var aNextDate = moment(aLastDayOfMonth).add(1, 'days');
            this.callCalendarService(aNextDate);
        }
        //________________________________________________________________
        clearCalendar() {
            while (this.dummies.length > 0) {
                this.com.calendarList_list.removeChild(this.dummies.splice(0, 1)[0]);
            }
        }
        //________________________________________________________________
        saveMonthItems() {
            let aSelectedItems = this.com.calendar_list_com.selectedItems;
            if (this.selectedItemsAllMonths.length == this.mMonthsIterator) {
                this.selectedItemsAllMonths.push(aSelectedItems.concat());
            }
            else {
                this.selectedItemsAllMonths[this.mMonthsIterator] = aSelectedItems.concat();
            }
            this.updateDataItemsAllMonths();
        }
        //________________________________________________________________
        listIrSelectionChanged__EventHandler(event) {
            let aData = event.detail.sender;
            this.saveMonthItems();
            this.dispatchEventIrSelectionChanged(aData);
        }
        //________________________________________________________________
        listIrSelectionsChanged__EventHandler(event) {
            let aDataIndices = event.detail.sender;
            for (let aDataIndex of aDataIndices) {
                let aData = this.mCalendarDP.getItemAt(aDataIndex);
                aData.isSelected = true;
            }
        }
        //__________________________________________________________________
        createDummyIrSkin() {
            let aDiv = document.createElement("div");
            aDiv.classList.add(asBase.Styles.ITEM_RENDERER_CLASS_NAME);
            aDiv.innerHTML = '<div id="' + ItemRenderer.itemId + '" class="' + SkinsCss.CALENDAR_IR_CLASS_NAME + ' ' + SkinsCss.NORMAL_CURSOR + '"></div>';
            this.dummies.push(aDiv);
            return aDiv;
        }
        //____________________________________________________________________
        buildListComplete__EventHandler(event) {
            let aData = this.mCalendarDP.getItemAt(0);
            let aIrFirstDate = aData.date;
            this.com.dateTitle_lbl.innerHTML = moment(aIrFirstDate).format('MMMM YYYY');
            let aWeekday = moment(aIrFirstDate).weekday();
            let aNumDaysInMonth = moment(aIrFirstDate).daysInMonth();
            let aFirstChildNode = this.com.calendarList_list.firstChild;
            for (let i = 0; i < aWeekday; ++i) {
                this.com.calendarList_list.insertBefore(this.createDummyIrSkin(), aFirstChildNode);
            }
            let aNumTo = this.NUM_DAYS_IN_TABLE - aWeekday - aNumDaysInMonth;
            if (aNumTo < 0) {
                aNumTo += this.NUM_DAYS_IN_WEEK;
            }
            for (let i = 0; i < aNumTo; ++i) {
                this.com.calendarList_list.appendChild(this.createDummyIrSkin());
            }
            this.com.calendar_list_com.firstItemIndex = aWeekday;
            this.com.calendar_list_com.selectedIndices = this.selectedIndices;
            this.saveMonthItems();
            this.com.calendar_list_com.updateAllByResponseObj(this.mResponseObj);
            this.com.showPreloader(false);
        }
        //____________________________________________________________________________________________
        loadCalendarData() {
            this.initSelectedIndicesAllMonths();
            this.mMonthsIterator = 0;
            this.callCalendarService(MoCalendar.CLIENT_MOMENT_DATE);
        }
        //____________________________________________________________________________________________
        callCalendarService(iCurrentDate) {
            this.com.showPreloader(true);
            this.mCalendarMomentDate = iCurrentDate;
            let aYear = this.mCalendarMomentDate.year();
            let aMonth = this.mCalendarMomentDate.month() + 1;
            EventManager.dispatchEvent(EvPreloader.BLOCK_APP, this);
            // year, month, state, occasionType
            EventManager.addEventListener(gencom.EvCalendar.SET_CALENDAR_EV, (event) => this.setCalendar__ResultHandler(event), this);
            EventManager.dispatchEvent(gencom.EvCalendar.GET_CALENDAR_EV, this, { Year: aYear, Month: aMonth });
        }
        //____________________________________________________________________________________________
        setCalendar__ResultHandler(event) {
            EventManager.dispatchEvent(EvPreloader.UNBLOCK_APP, this);
            EventManager.removeEventListener(gencom.EvCalendar.SET_CALENDAR_EV, this);
            this.mCalendarDP = this.getCalendarDP(event.data);
            this.dataProvider = this.mCalendarDP;
        }
        //____________________________________________________________________________________
        getCalendarDP(iResponseObj) {
            this.mResponseObj = iResponseObj;
            let aYear = this.mCalendarMomentDate.year();
            let aMonth = this.mCalendarMomentDate.month();
            let aDaysInMonths = this.mCalendarMomentDate.daysInMonth();
            let aIsThisCurrentMonth = aMonth == MoCalendar.CLIENT_MOMENT_DATE.month() && aYear == MoCalendar.CLIENT_MOMENT_DATE.year();
            this.enablePrevBtn(!aIsThisCurrentMonth);
            let aDates = [];
            for (let i = 0; i < aDaysInMonths; ++i) {
                let aDate = new Date();
                aDate.setHours(0);
                aDate.setMinutes(0);
                aDate.setSeconds(0);
                aDate.setMilliseconds(0);
                aDate.setFullYear(aYear, aMonth, (i + 1));
                aDates.push(aDate);
            }
            let aSelectedDatesItems = this.getMonthSelectedItems();
            let aCalendarArray = new AcArray();
            let aClientMomentDate = MoCalendar.CLIENT_MOMENT_DATE.date();
            for (let i = 0; i < aDates.length; ++i) {
                let aDate = aDates[i];
                let aEnabled = aIsThisCurrentMonth ? (i + 1 >= aClientMomentDate) : true;
                let aSelected = this.getSelectedItemByDay(aDate.getDate(), aSelectedDatesItems) ? true : false;
                let aTempVo = { CmDate: aDate, Selected: aSelected, Enabled: aEnabled };
                let aData = this.createIrData();
                aData.fillFromVO(aTempVo);
                aCalendarArray.push(aData);
            }
            return new ArrayCollection(aCalendarArray);
        }
        //____________________________________________________________________________________________
        createIrData() {
            let aIrDataPath = this.com.irData.split(".");
            let aDataFactory = new CoClassFactory(window);
            let aData = aDataFactory.getInstance(aIrDataPath);
            return aData;
        }
        //____________________________________________________________________________________________
        getSelectedItemByDay(iDay, iDatesArray) {
            for (let aIr of iDatesArray) {
                if (aIr.date.getDate() == iDay) {
                    return aIr;
                }
            }
            return null;
        }
        //____________________________________________________________________________________________
        sortByDate(iA, iB) {
            let aDate1 = moment(iA.date);
            let aDate2 = moment(iB.date);
            if (aDate1.isAfter(aDate2)) {
                return 1;
            }
            else if (aDate1.isBefore(aDate2)) {
                return -1;
            }
            return 0;
        }
        //____________________________________________________________________________________________
        initSelectedIndicesAllMonths() {
            let aIrSelectedDates = this.com.data.selectedDates;
            // let aSortByDate_Func = (iA:DaIrCalendar, iB:DaIrCalendar)=>this.sortByDate(iA, iB);
            // aIrSelectedDates.sort(aSortByDate_Func);
            let aCurrentClientYear = MoCalendar.CLIENT_MOMENT_DATE.year();
            let aCurrentClientMonth = MoCalendar.CLIENT_MOMENT_DATE.month();
            let aMonthsIterator = 0;
            let aCurrIrMonthIndex = 0;
            let aPrevIrMonthIndex;
            // build 5 year's months
            for (let i = 0; i < 5 * 12; ++i, ++aMonthsIterator) {
                this.initSelectedNewMonth(aMonthsIterator);
            }
            for (let i = 0; i < aIrSelectedDates.length; ++i) {
                let aIrDate = aIrSelectedDates[i];
                let aIrDateMoment = moment(aIrDate.date);
                if (aIrDateMoment.endOf('day').isBefore(MoCalendar.CLIENT_MOMENT_DATE)) {
                    continue;
                }
                let aCurrDateDay = aIrDateMoment.date();
                let aCurrDateMonth = aIrDateMoment.month();
                let aCurrDateYear = aIrDateMoment.year();
                let aIndex = (aCurrDateYear - aCurrentClientYear) * 12 + (aCurrDateMonth - aCurrentClientMonth);
                this.selectedItemsAllMonths[aIndex].push(aIrDate);
            }
            this.updateDataItemsAllMonths();
        }
        //________________________________________________________________
        initSelectedNewMonth(iMonthsIterator) {
            if (this.selectedItemsAllMonths[iMonthsIterator] == null) {
                this.selectedItemsAllMonths.push(new Array());
            }
        }
        //________________________________________________________________
        updateDataItemsAllMonths() {
            this.com.data.selectedItemsAllMonths = this.selectedItemsAllMonths;
        }
        //________________________________________________________________
        static areSimilarDates(iDate1, iDate2) {
            return (iDate1.getDate() == iDate2.getDate() && iDate1.getMonth() == iDate2.getMonth() && iDate1.getFullYear() == iDate2.getFullYear());
        }
        //________________________________________________________________
        calendarDeleteData__EventHandler(event) {
            let aIrData = event.data;
            let aMomentIrDate = moment(aIrData.date);
            let aIrMonth = aMomentIrDate.month();
            //------------------------------
            let aIndexOfMonthInArray = aMomentIrDate.endOf('month').diff(MoCalendar.CLIENT_MOMENT_DATE, 'months');
            let aSelectedItemsMonth = this.com.data.selectedItemsAllMonths[aIndexOfMonthInArray];
            if (aSelectedItemsMonth) {
                for (let i = 0; i < aSelectedItemsMonth.length; ++i) {
                    let aDaIrCalendar = aSelectedItemsMonth[i];
                    if (MoCalendar.areSimilarDates(aDaIrCalendar.date, aIrData.date)) {
                        if (aIrMonth == this.mCalendarMomentDate.month()) {
                            // calendar is shown - remove from it
                            this.com.calendar_list_com.selectedItem = this.com.data.selectedItemsAllMonths[aIndexOfMonthInArray][i];
                            this.saveMonthItems();
                        }
                        else {
                            // calendar is not shown - thus remove from data
                            this.com.data.selectedItemsAllMonths[aIndexOfMonthInArray].splice(i, 1);
                        }
                        break;
                    }
                }
            }
            this.updateDataItemsAllMonths();
        }
        //________________________________________________________________
        dispatchEventIrSelectionChanged(iData) {
            let aEvent = new AsEvent(EvItemRenderer.IR_SELECTION_CHANGED, false, iData);
            this.com.dispatchEvent(aEvent.event);
        }
        //________________________________________________________________
        getMonthSelectedItems() {
            let aSelectedItems = this.selectedItemsAllMonths[this.mMonthsIterator];
            if (!aSelectedItems) {
                aSelectedItems = [];
            }
            return aSelectedItems;
        }
        //_______________________________________________________________
        isValid() {
            for (let i = 0; i < this.selectedItemsAllMonths.length; ++i) {
                let aSelectedItemsMonth = this.selectedItemsAllMonths[i];
                if (aSelectedItemsMonth.length > 0) {
                    return true;
                }
            }
            return false;
        }
        /****************************
         * Getters & Setters
         ****************************/
        //____________________________________________________________________________________
        get selectedItemsAllMonths() {
            if (!this.mSelectedItemsAllMonths) {
                this.mSelectedItemsAllMonths = new Array();
            }
            return this.mSelectedItemsAllMonths;
        }
        //____________________________________________________________________________________
        get dummies() {
            if (!this.mDummies) {
                this.mDummies = new Array();
            }
            return this.mDummies;
        }
        //________________________________________________________________
        enablePrevBtn(value) {
            if (this.mIsEnabledPrevBtn != value) {
                this.mIsEnabledPrevBtn = value;
                let aImg = value ? this.LEFT_ARROW_IMG_ENABLED : this.LEFT_ARROW_IMG_DISABLED;
                this.com.prevArrow_img.src = aImg;
                if (value) {
                    this.com.prevMonth_btn.classList.remove(SkinsCss.DISABLED);
                }
                else {
                    this.com.prevMonth_btn.classList.add(SkinsCss.DISABLED);
                }
            }
        }
        //____________________________________________________________________________________
        get com() {
            return this.mCom;
        }
        //____________________________________________________________________
        set dataProvider(value) {
            if (!this.com.calendar_list_com) {
                this.createList();
            }
            this.com.dataProvider = value;
        }
        get dataProvider() {
            return this.com.dataProvider;
        }
        //____________________________________________________________________________________________
        get selectedIndices() {
            let aSelectedIndices = [];
            let aDatesDataArray = this.com.dataProvider.toDataArray();
            for (let i = 0; i < aDatesDataArray.length; ++i) {
                if (aDatesDataArray[i].isSelected) {
                    aSelectedIndices.push(i);
                }
            }
            return aSelectedIndices;
        }
    }
    MoCalendar.EV_CALENDAR_DELETE_DATA = "EV_CALENDAR_DELETE_DATA";
    gencom.MoCalendar = MoCalendar;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var preloader;
    (function (preloader) {
        var CoComponentBase = asBase.CoComponentBase;
        class CoPreloader extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, "./skins/com/appmain/SkPreloader.html", iHtmlElement);
                this.mPreloaderMessage = "Loading...";
                this.mMyDiv = iHtmlElement;
            }
            //____________________________________________________________________
            creationComplete() {
                // this.hide();
                this.preloader_lbl = this.getPart("preloader_lbl");
            }
            //_______________________________________________________________
            show() {
                if (this.mParentContainer.classList.contains("displayNone")) {
                    this.mParentContainer.classList.remove("displayNone");
                }
            }
            //_______________________________________________________________
            hide() {
                if (this.mParentContainer.classList.contains("displayNone")) {
                    return;
                }
                this.mParentContainer.classList.add("displayNone");
            }
            //------------------------------
            // Getters & Setters
            //------------------------------
            set preloaderMessage(value) {
                this.mPreloaderMessage = value;
                if (this.preloader_lbl) {
                    this.preloader_lbl.innerHTML = this.mPreloaderMessage;
                }
            }
        }
        preloader.CoPreloader = CoPreloader;
    })(preloader = gencom.preloader || (gencom.preloader = {}));
})(gencom || (gencom = {}));
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
/// <reference path="../../asBase/SkinsCss.ts" />
///<reference path="DaCalendar.ts"/>
///<reference path="MoCalendar.ts"/>
///<reference path="../preloader/CoPreloader.ts"/>
var gencom;
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
/// <reference path="../../asBase/SkinsCss.ts" />
///<reference path="DaCalendar.ts"/>
///<reference path="MoCalendar.ts"/>
///<reference path="../preloader/CoPreloader.ts"/>
(function (gencom) {
    var CoComponentBase = asBase.CoComponentBase;
    var SkinsCss = asBase.SkinsCss;
    var CoPreloader = gencom.preloader.CoPreloader;
    var Utils = asBase.Utils;
    class CoCalendar extends CoComponentBase {
        constructor(iHTMLElement, iIrSkin, iIrClass, iIrData, iSkin) {
            super(null, iSkin ? iSkin + "SkCalendar.html" : SkinsCss.SKINS_CALENDAR + "SkCalendar.html", iHTMLElement);
            this.IR_CALENDAR_COM = SkinsCss.COM_GENCOM + "IrCalendar";
            this.IR_CALENDAR_SKIN = SkinsCss.SKINS_CALENDAR + "IrCalendar";
            this.IR_CALENDAR_DATA = SkinsCss.COM_GENCOM + "DaIrCalendar";
            this.irSkin = iIrSkin;
            this.irClass = iIrClass;
            this.irData = iIrData;
            this.createModel();
        }
        //____________________________________________________________________
        creationComplete() {
            this.calendarList_list = this.getPart("calendarList_list");
            this.dateTitle_lbl = this.getPart("dateTitle_lbl");
            this.prevMonth_btn = this.getPart("prevMonth_btn");
            this.nextMonth_btn = this.getPart("nextMonth_btn");
            this.prevArrow_img = this.getPart("prevArrow_img");
            this.blockLayer_div = this.getPart("blockLayer_div");
            // preloader
            this.preloader_div = this.getPart("preloader_div");
            this.preloader_com = new CoPreloader(this.preloader_div);
        }
        //_______________________________________________________________
        createModel() {
            this.mModel = new gencom.MoCalendar(this);
        }
        //_______________________________________________________________
        isValid() {
            return this.mModel.isValid();
        }
        //____________________________________________________________________
        showPreloader(iIsShow) {
            if (iIsShow) {
                this.preloader_com.show();
                Utils.includePart(this.blockLayer_div, true);
            }
            else {
                this.preloader_com.hide();
                Utils.includePart(this.blockLayer_div, false);
            }
        }
        //***********************
        //       get/set        *
        //***********************
        //_______________________________________________________________
        /* override */
        get data() {
            return this.mData;
        }
        set data(pData) {
            this.mData = pData;
            this.updateView();
        }
        //____________________________________________________________________
        get selectedItems() {
            if (this.calendar_list_com) {
                return this.calendar_list_com.selectedItems;
            }
            return null;
        }
        set selectedItems(values) {
            if (this.calendar_list_com) {
                this.calendar_list_com.selectedItems = values;
            }
        }
        //____________________________________________________________________
        get dataProvider() {
            if (this.calendar_list_com) {
                return this.calendar_list_com.dataProvider;
            }
            return null;
        }
        set dataProvider(value) {
            if (this.calendar_list_com) {
                this.calendar_list_com.dataProvider = value;
            }
        }
        //____________________________________________________________________
        get irClass() {
            return this.IR_CALENDAR_COM;
        }
        set irClass(value) {
            this.IR_CALENDAR_COM = value;
        }
        //____________________________________________________________________
        get irSkin() {
            return this.IR_CALENDAR_SKIN;
        }
        set irSkin(value) {
            this.IR_CALENDAR_SKIN = value;
        }
        //____________________________________________________________________
        get irData() {
            return this.IR_CALENDAR_DATA;
        }
        set irData(value) {
            this.IR_CALENDAR_DATA = value;
        }
    }
    gencom.CoCalendar = CoCalendar;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    class DaIrCalendar {
        constructor() {
        }
        //___________________________________________________________________
        fillFromVO(iCmDateVO) {
            this.mDate = moment(iCmDateVO.CmDate).toDate();
            this.mSelected = iCmDateVO.Selected;
            this.mEnabled = iCmDateVO.Enabled;
        }
        //___________________________________________________________________
        getFormattedDate(iFormat) {
            return moment(this.date).format(iFormat);
        }
        /****************************
         * Getters and Setters
         ****************************/
        //___________________________________________________________________
        get date() {
            return this.mDate;
        }
        set date(value) {
            this.mDate = value;
        }
        //___________________________________________________________________
        get isSelected() {
            return this.mSelected;
        }
        set isSelected(value) {
            this.mSelected = value;
        }
        //___________________________________________________________________
        get isEnabled() {
            return this.mEnabled;
        }
        set isEnabled(value) {
            this.mEnabled = value;
        }
        //___________________________________________________________________
        get expired() {
            return moment(this.mDate).endOf('day').isBefore(gencom.MoCalendar.CLIENT_MOMENT_DATE);
        }
    }
    gencom.DaIrCalendar = DaIrCalendar;
})(gencom || (gencom = {}));
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
var gencom;
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
(function (gencom) {
    var ItemRenderer = asBase.baseclasses.ItemRenderer;
    class IrCalendar extends ItemRenderer {
        //------------------------------
        // Members
        //------------------------------
        //------------------------------
        // Listeners
        //------------------------------
        constructor(iData, iSkin, iContainer, iDataField) {
            super(iData, iSkin, iContainer, iDataField);
        }
        //____________________________________________________________________
        creationComplete() {
            this.date_div = this.getPart("date_div");
            super.creationComplete();
        }
        //__________________________________________________________________
        updateView() {
            if (this.mIsActive && this.data) {
                super.updateView();
                this.enabled = this.data.isEnabled;
                if (this.date_div) {
                    this.date_div.innerHTML = this.data.date.getDate().toString();
                }
            }
        }
        //__________________________________________________________________
        updateByResponseObj(iResponseObj) {
            if (this.mIsActive && this.data) {
                this.updateView();
            }
        }
        /****************************
         * Getters & Setters
         ****************************/
        //__________________________________________________________________
        get data() {
            return this.mData;
        }
        //__________________________________________________________________
        set selected(value) {
            if (this.mSelected != value) {
                this.data.isSelected = value;
                this.setSelected(value);
            }
        }
        get selected() {
            return this.mSelected;
        }
    }
    gencom.IrCalendar = IrCalendar;
})(gencom || (gencom = {}));
/// <reference path="IItemRendererOwner.ts" />
/// <reference path="IList.ts" />
/// <reference path="../../asBase/collections/IItemRenderer.ts" />
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
/// <reference path="../../asBase/baseclasses/ItemRenderer.ts" />
/// <reference path="../../asBase/collections/ArrayCollection.ts" />
var gencom;
/// <reference path="IItemRendererOwner.ts" />
/// <reference path="IList.ts" />
/// <reference path="../../asBase/collections/IItemRenderer.ts" />
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
/// <reference path="../../asBase/baseclasses/ItemRenderer.ts" />
/// <reference path="../../asBase/collections/ArrayCollection.ts" />
(function (gencom) {
    var list;
    (function (list) {
        var EvItemRenderer = asBase.collections.EvItemRenderer;
        var ArrayCollection = asBase.baseclasses.ArrayCollection;
        var ItemRenderer = asBase.baseclasses.ItemRenderer;
        var EventManager = asBase.events.EventManager;
        class List {
            constructor(iCoList, iIsMultiSelection = false) {
                this.mIrSkinPath = "";
                this.mSelectable = true;
                this.mIterator = 0;
                this.mBuildProgressTimeout = 0;
                this.mListSelectedIndex = -1;
                this.mFirstItemIndex = 0;
                this.mListHoveredIndex = -1;
                //------------------------------
                // Consts
                //------------------------------
                this.SEND_JUST_BUILT_IRS = true;
                if (iCoList.contentWrapper == null) {
                    throw new Error("List container is invalid!");
                }
                if (iCoList.mCallback_Func == undefined) {
                    throw new Error("List callback function is missing!");
                }
                this.mCom = iCoList;
                this.callback_Func = iCoList.mCallback_Func;
                this.listBuilder_Func = (iDataArray) => this.listBuilder(iDataArray);
                this.mListContainer = iCoList.contentWrapper;
                this.mIrClassPath = iCoList.mIrClassPath;
                this.mIrSkinPath = iCoList.mIrSkinPath;
                this.mIsMultiSelection = iIsMultiSelection;
                this.setToActive();
            }
            //________________________________________________________________
            setToActive() {
                this.addEventManagerListeners();
                this.addDataProviderListeners();
                for (let aIr of this.dataGroup) {
                    this.addIrListeners(aIr);
                }
            }
            //________________________________________________________________
            setToSleep() {
                EventManager.removeAllOwnerEvents(this);
                this.removeDataProviderListeners();
                for (let aIr of this.dataGroup) {
                    this.removeIrListeners(aIr);
                }
            }
            //_______________________________________________________________
            addItems(iDataArray) {
                this.mDataProvider.addItems(iDataArray);
            }
            //_______________________________________________________________
            collectionRefreshed__EventHandler() {
                this.updateSelectedIndex();
                this.callback_Func(ArrayCollection.COLLECTION_REFRESHED, this.mDataProvider);
            }
            //_______________________________________________________________
            updateSelectedIndex() {
                if (this.selectedItem) {
                    this.selectedIndex = this.getItemIndex(this.selectedItem);
                }
            }
            //_______________________________________________________________
            addItemsView__EventHandler(iDataArray) {
                if (iDataArray == undefined) {
                    iDataArray = this.selectedItems;
                }
                if (iDataArray.length > 0) {
                    this.mIterator = 0;
                    clearTimeout(this.mBuildProgressTimeout);
                    // TODO ronen ronen ronen - why? :)
                    // this.mBuildProgressTimeout = setTimeout((iDataArray: Array<any>) => this.listBuilder(iDataArray), 0, iDataArray);
                    this.mBuildProgressTimeout = setTimeout(this.listBuilder_Func(iDataArray), 0);
                }
                else {
                    this.finishBuildingList();
                }
            }
            //_______________________________________________________________
            addItemsView(iDataArray) {
                if (iDataArray.length > 0) {
                    this.mIterator = 0;
                    clearTimeout(this.mBuildProgressTimeout);
                    this.mBuildProgressTimeout = setTimeout(this.listBuilder_Func(iDataArray), 0);
                }
                else {
                    this.finishBuildingList();
                }
            }
            //_______________________________________________________________
            itemDataChanged__EventHandler(iData) {
                this.callback_Func(EvItemRenderer.IR_DATA_CHANGED, iData);
            }
            //_______________________________________________________________
            itemAdded__EventHandler(iData) {
                setTimeout((iData) => this.ensureItemIsVisible(iData), 0, iData);
            }
            //__________________________________________________________________
            listBuilder(iDataArray) {
                let aTime = new Date().getTime();
                let aIr;
                while ((new Date().getTime() - aTime < 50) && (this.mIterator < iDataArray.length)) {
                    let aData = iDataArray[this.mIterator];
                    aIr = this.createItemRenderer(aData);
                    this.addIrListeners(aIr);
                    this.dataGroup.push(aIr);
                    if (this.SEND_JUST_BUILT_IRS) {
                        this.builtIrs.push(aIr);
                    }
                    this.mIterator++;
                }
                if (this.mIterator < iDataArray.length) {
                    clearTimeout(this.mBuildProgressTimeout);
                    this.mBuildProgressTimeout = setTimeout(() => this.listBuilder(iDataArray), 0);
                }
                else if ((iDataArray.length == 1) && (this.mDataProvider.length > 1)) {
                    this.completeBuildOne(aIr);
                }
                else {
                    this.completeBuild();
                }
            }
            //__________________________________________________________________
            completeBuildOne(aIr) {
                if (this.builtIrs.length > 0 || this.dataGroup.length > 0) {
                    this.mDataProvider.addIrToSource(aIr);
                    this.finishBuildingOne();
                }
            }
            //__________________________________________________________________
            completeBuild() {
                if (this.SEND_JUST_BUILT_IRS) {
                    if (this.builtIrs.length > 0) {
                        this.mDataProvider.addDataGroupToSource(this.builtIrs);
                        this.mDataProvider.isNeedItemRenderers = false;
                        this.finishBuildingList();
                        this.mDataProvider.refresh();
                    }
                }
                else {
                    if (this.dataGroup.length > 0) {
                        this.mDataProvider.addDataGroupToSource(this.dataGroup);
                        this.mDataProvider.isNeedItemRenderers = false;
                        this.finishBuildingList();
                        this.mDataProvider.refresh();
                    }
                }
            }
            //__________________________________________________________________
            addEventManagerListeners() {
                EventManager.addEventListener(ArrayCollection.COLLECTION_SORT_SET, (event) => this.collectionSortSet__EventHandler(event), this);
                EventManager.addEventListener(ArrayCollection.COLLECTION_SORT_REMOVED, (event) => this.collectionSortRemoved__EventHandler(event), this);
                EventManager.addEventListener(ArrayCollection.COLLECTION_FILTER_SET, (event) => this.collectionFilterSet__EventHandler(event), this);
                EventManager.addEventListener(ArrayCollection.COLLECTION_FILTER_REMOVED, (event) => this.collectionFilterRemoved__EventHandler(event), this);
                EventManager.addEventListener(ArrayCollection.COLLECTION_ALL_ITEMS_REMOVED, (event) => this.collectionAllItemsRemovedComplete__EventHandler(event), this);
                EventManager.addEventListener(ArrayCollection.COLLECTION_ITEM_REMOVED, (event) => this.collectionItemRemovedComplete__EventHandler(event), this);
            }
            //__________________________________________________________________
            addDataProviderListeners() {
                if (this.mDataProvider) {
                    this.mDataProvider.addEventListener(ArrayCollection.COLLECTION_REFRESHED, () => this.collectionRefreshed__EventHandler(), this);
                    this.mDataProvider.addEventListener(ArrayCollection.COLLECTION_GET_IR, (iDataArray) => this.addItemsView__EventHandler(iDataArray), this);
                    this.mDataProvider.addEventListener(ArrayCollection.COLLECTION_IR_DATA_CHANGED, (iData) => this.itemDataChanged__EventHandler(iData), this);
                    this.mDataProvider.addEventListener(ArrayCollection.COLLECTION_ITEM_ADDED, (iData) => this.itemAdded__EventHandler(iData), this);
                }
            }
            //__________________________________________________________________
            removeDataProviderListeners() {
                if (this.mDataProvider) {
                    this.mDataProvider.removeEventListener(ArrayCollection.COLLECTION_REFRESHED, this);
                    this.mDataProvider.removeEventListener(ArrayCollection.COLLECTION_GET_IR, this);
                    this.mDataProvider.removeEventListener(ArrayCollection.COLLECTION_IR_DATA_CHANGED, this);
                    this.mDataProvider.removeEventListener(ArrayCollection.COLLECTION_ITEM_ADDED, this);
                }
            }
            //__________________________________________________________________
            addIrListeners(iIr) {
                if (this.mSelectable) {
                    iIr.addEventListener(EvItemRenderer.IR_MOUSE_DOWN, (event) => this.irMouseDown__EventHandler(event), this);
                    iIr.addEventListener(EvItemRenderer.IR_MOUSE_UP, (event) => this.irMouseUp__EventHandler(event), this);
                    iIr.addEventListener(EvItemRenderer.IR_MOUSE_OVER, (event) => this.irMouseOver__EventHandler(event), this);
                    iIr.addEventListener(EvItemRenderer.IR_MOUSE_OUT, (event) => this.irMouseOut__EventHandler(event), this);
                    iIr.addEventListener(EvItemRenderer.IR_DOUBLE_CLICK, (event) => this.irMouseDoubleClick__EventHandler(event), this);
                    iIr.addEventListener(EvItemRenderer.IR_CHANGED, (event) => this.irChanged__EventHandler(event), this);
                    iIr.addEventListener(EvItemRenderer.IR_DELETE, (event) => this.irDeleted__EventHandler(event), this);
                }
            }
            //__________________________________________________________________
            removeIrListeners(iIr) {
                if (this.mSelectable) {
                    iIr.removeAllOwnerEvents(this);
                }
            }
            //________________________________________________________________
            buildFirstUniqueIr(iData) {
                if (this.mFirstUniqueIr) {
                    this.mFirstUniqueIr.dispose();
                }
                this.mFirstUniqueIr = this.createUniqueRenderer(iData);
                this.addIrListeners(this.mFirstUniqueIr);
                this.addUniqueCss();
                this.mListContainer.insertBefore(this.mFirstUniqueIr.contentWrapper, this.mListContainer.childNodes[0]);
            }
            //__________________________________________________________________
            addUniqueCss() {
                this.mFirstUniqueIr.addClass("select-all");
            }
            //__________________________________________________________________
            getFirstUniqueIr() {
                return (this.mFirstUniqueIr);
            }
            //__________________________________________________________________
            createUniqueRenderer(iData, iContainer) {
                return this.createItemRenderer(iData, iContainer);
            }
            //__________________________________________________________________
            createDefaultIrSkin() {
                let aMainDiv = document.createElement("div");
                aMainDiv.classList.add(asBase.Styles.ITEM_RENDERER_CLASS_NAME);
                aMainDiv.innerHTML = '<div id="' + ItemRenderer.itemId + '"><label id="' + ItemRenderer.itemLabelId + '"></label></div>';
                return aMainDiv;
            }
            //_______________________________________________________________
            createItemRenderer(iData, iContainer) {
                if (!iContainer) {
                    iContainer = this.mListContainer;
                }
                let aSkin = (typeof this.mIrSkinPath == "string") ? this.mIrSkinPath : this.createDefaultIrSkin();
                this.mIrArgs = [iData, aSkin, iContainer, this.mDataField];
                let aIrFactory = new asBase.CoClassFactory(window);
                let aIr = aIrFactory.getInstance(this.mIrClassPath, this.mIrArgs);
                aIr.addClass(asBase.Styles.ITEM_RENDERER_CLASS_NAME);
                return aIr;
            }
            //_______________________________________________________________
            collectionFilterSet__EventHandler(event) {
                if (event.sender == this.mDataProvider) {
                    this.handleIrsOnSet(event.data);
                    this.callback_Func(ArrayCollection.COLLECTION_FILTER_SET, this.mDataProvider);
                }
            }
            //_______________________________________________________________
            collectionFilterRemoved__EventHandler(event) {
                if (event.sender == this.mDataProvider) {
                    this.handleIrsOnRemove();
                    this.callback_Func(ArrayCollection.COLLECTION_FILTER_REMOVED, this.mDataProvider);
                }
            }
            //_______________________________________________________________
            collectionSortSet__EventHandler(event) {
                if (event.sender == this.mDataProvider) {
                    this.handleIrsOnSet(event.data);
                    this.callback_Func(ArrayCollection.COLLECTION_SORT_SET, this.mDataProvider);
                }
            }
            //_______________________________________________________________
            collectionSortRemoved__EventHandler(event) {
                if (event.sender == this.mDataProvider) {
                    this.handleIrsOnRemove();
                    this.callback_Func(ArrayCollection.COLLECTION_SORT_REMOVED, this.mDataProvider);
                }
            }
            //_______________________________________________________________
            handleIrsOnSet(iIrs) {
                if (iIrs == null) {
                    return;
                }
                for (let aIr of iIrs) {
                    if (aIr) {
                        let aSelectedIndex = this.mDataProvider.getItemIndex(aIr.data);
                        // unselect IRs which didn't pass the filtering/sorting
                        if (aSelectedIndex == -1) {
                            this.selectIr(aIr, false);
                            continue;
                        }
                        this.selectedIndex = aSelectedIndex;
                        // create selectedItems for the remove filter/sort
                        if (this.selectedItemsOnRemove.indexOf(aIr.data) == -1) {
                            this.selectedItemsOnRemove.push(aIr.data);
                        }
                    }
                }
                this.unhoverAll();
                this.ensureIndexIsVisible(this.firstItemIndex);
            }
            //_______________________________________________________________
            handleIrsOnRemove() {
                if (this.mSelectedItemsOnRemove == null || this.mSelectedItemsOnRemove.length == 0) {
                    return;
                }
                // create new indices on removing filter/sort
                for (let aItem of this.mSelectedItemsOnRemove) {
                    let aSelectedIndexOnFilter = this.dataProvider.getItemIndex(aItem);
                    if (aSelectedIndexOnFilter > -1) {
                        this.selectedIndex = aSelectedIndexOnFilter;
                    }
                }
                this.mSelectedItemsOnRemove.length = 0;
                this.mSelectedItemsOnRemove = null;
                this.unhoverAll();
            }
            //_______________________________________________________________
            collectionAllItemsRemovedComplete__EventHandler(event) {
                if (event.sender == this.mDataProvider) {
                    this.disposeDataProvider();
                }
            }
            //_______________________________________________________________
            collectionItemRemovedComplete__EventHandler(event) {
                if (event.sender == this.mDataProvider) {
                    this.removeItemView(event.data.ir, event.data.index);
                    this.collectionRefreshed__EventHandler();
                }
            }
            //_______________________________________________________________
            irMouseOver__EventHandler(event) {
                let aIr = event.detail.sender;
                this.callback_Func(EvItemRenderer.IR_MOUSE_OVER, aIr);
            }
            //_______________________________________________________________
            irMouseOut__EventHandler(event) {
                let aIr = event.detail.sender;
                this.callback_Func(EvItemRenderer.IR_MOUSE_OUT, aIr);
            }
            //_______________________________________________________________
            irMouseDown__EventHandler(event) {
                let aIr = event.detail.sender;
                this.selectedIndex = this.getItemIndex(aIr.data);
                if (this.mDataProvider.filterFunction || this.mDataProvider.sort) {
                    this.selectedItemsOnRemove.push(aIr.data);
                }
                this.callback_Func(EvItemRenderer.IR_MOUSE_DOWN, aIr);
                this.callback_Func(EvItemRenderer.IR_SELECTION_CHANGED, aIr.data);
            }
            //_______________________________________________________________
            irMouseUp__EventHandler(event) {
                // let aIr: IItemRenderer = event.detail.sender;
                // this.selectedIndex = this.getItemIndex(aIr);
            }
            //_______________________________________________________________
            irMouseDoubleClick__EventHandler(event) {
                let aIr = event.detail.sender;
                this.callback_Func(EvItemRenderer.IR_DOUBLE_CLICK, aIr);
            }
            //_______________________________________________________________
            irChanged__EventHandler(event) {
                let aIr = event.detail.sender;
                this.callback_Func(EvItemRenderer.IR_CHANGED, aIr);
            }
            //_______________________________________________________________
            irDeleted__EventHandler(event) {
                let aIr = event.detail.sender;
                this.callback_Func(list.EvList.LIST_IR_DELETE, aIr.data);
            }
            //_______________________________________________________________
            /*override*/
            dispose() {
                clearTimeout(this.mBuildProgressTimeout);
                this.disposeDataProvider();
                this.mDataGroup = null;
                this.mListContainer = null;
                this.listBuilder_Func = null;
                this.callback_Func = null;
            }
            //_______________________________________________________________
            disposeDataGroup() {
                for (let aIr of this.dataGroup) {
                    this.removeIrListeners(aIr);
                }
                this.mDataProvider.removeAllIrs();
                this.dataGroup.splice(0);
            }
            //_______________________________________________________________
            refresh() {
                if (this.mDataProvider) {
                    this.mDataProvider.refresh();
                }
            }
            //_______________________________________________________________
            itemRendererOffsetTop(iIr) {
                return iIr.contentWrapper.offsetTop;
            }
            /////////// IList - implementation functions
            //_______________________________________________________________
            removeItem(iData) {
                this.mDataProvider.removeItem(iData);
            }
            //_______________________________________________________________
            ensureItemIsVisible(iData) {
                let aIr = this.getItemRendererByData(iData);
                if (aIr) {
                    let aIrRect = aIr.contentWrapper.getBoundingClientRect();
                    let aListRect = this.com.contentWrapper.getBoundingClientRect();
                    if ((aIrRect.top < aListRect.top) || (aIrRect.bottom > aListRect.bottom)) {
                        this.com.contentWrapper.scrollTop = this.itemRendererOffsetTop(aIr);
                    }
                }
                else {
                    this.com.contentWrapper.scrollTop = 0;
                }
            }
            //_______________________________________________________________
            ensureIndexIsVisible(iIndex) {
                if (iIndex < 0) {
                    iIndex = 0;
                }
                if (iIndex < this.mDataProvider.currentArray.length) {
                    this.ensureItemIsVisible(this.getItemAt(iIndex));
                }
            }
            //_______________________________________________________________
            contains(iData) {
                return this.mDataProvider.contains(iData);
            }
            //_______________________________________________________________
            reappendItem(iData) {
                this.mDataProvider.reappendItem(iData);
            }
            //_______________________________________________________________
            addItem(iData) {
                this.mDataProvider.addItem(iData);
            }
            //_______________________________________________________________
            addItemAt(iData, iIndex) {
                this.mDataProvider.addItemAt(iData, iIndex);
            }
            //_______________________________________________________________
            getItemAt(iIndex) {
                if (this.mDataProvider) {
                    return this.mDataProvider.getItemAt(iIndex);
                }
                return null;
            }
            //_______________________________________________________________
            getItemRendererByData(iData) {
                if (this.mDataProvider && iData) {
                    return this.mDataProvider.getItemRendererByData(iData);
                }
                return null;
            }
            //_______________________________________________________________
            getItemRendererAt(iIndex) {
                if (this.mDataProvider) {
                    return this.mDataProvider.getItemRendererAt(iIndex);
                }
                return null;
            }
            //_______________________________________________________________
            isIndexValid(iIndex) {
                if (!this.mDataProvider) {
                    return false;
                }
                return (iIndex > -1) && (iIndex < this.mDataProvider.length);
            }
            //_______________________________________________________________
            getItemIndex(iData) {
                if (this.mDataProvider) {
                    return this.mDataProvider.getItemIndex(iData);
                }
                return -1;
            }
            //_______________________________________________________________
            itemUpdated(iIr, property, oldValue, newValue) {
                // todo
            }
            //_______________________________________________________________
            removeItemView(iRemovedIr, iRemovedIndex) {
                let aDataGroupIndex = this.dataGroup.indexOf(iRemovedIr);
                if (aDataGroupIndex > -1) {
                    let aIr = this.dataGroup.splice(aDataGroupIndex, 1)[0];
                    this.removeIrListeners(aIr);
                    aIr.dispose();
                }
                this.updateSelectedIndexOnRemove(iRemovedIndex);
            }
            //_______________________________________________________________
            unhoverAll() {
                for (let aIr of this.dataGroup) {
                    aIr.hovered = false;
                }
                this.mListHoveredIndex = -1;
            }
            //_______________________________________________________________
            removeAll() {
                if (this.mDataProvider) {
                    this.mDataProvider.removeAll();
                }
                if (this.selectedIndex > -1) {
                    this.selectedIndex = -1;
                }
            }
            //__________________________________________________________________
            updateAllByResponseObj(iResponseObj) {
                if (this.mDataProvider) {
                    this.mDataProvider.updateAllByResponseObj(iResponseObj);
                }
            }
            //_______________________________________________________________
            removeItemAt(iIndex) {
                let aData = this.mDataProvider.removeItemAt(iIndex);
                return aData;
            }
            // IItemRendererOwner functions
            //__________________________________________________________________
            itemToLabel(iData) {
                if (iData == undefined) {
                    return " ";
                }
                if (iData.hasOwnProperty("data")) {
                    if (iData["data"].hasOwnProperty("label")) {
                        return iData["label"];
                    }
                }
                return " ";
            }
            //__________________________________________________________________
            updateRenderer(iIr, iItemIndex, iData) {
                this.mDataProvider.updateRenderer(iIr, iItemIndex, iData);
            }
            //_______________________________________________________________
            itemRendererFunction() {
                return this.createItemRenderer;
            }
            //_______________________________________________________________
            beforeSetDataProviderStoreItems() {
                this.mStoreSelectedItem = this.selectedItem;
            }
            //_______________________________________________________________
            afterSetDataProviderRestoreItems() {
                if (this.mStoreSelectedItem != null) {
                    this.ensureItemIsVisible(this.mStoreSelectedItem);
                }
            }
            //_______________________________________________________________
            updateSelectedIndexOnRemove(iRemovedIndex) {
                if (this.selectedIndex >= iRemovedIndex) {
                    this.selectedIndex = -1;
                }
                else if (this.selectedIndex >= iRemovedIndex) {
                    --this.selectedIndex;
                }
            }
            //_______________________________________________________________
            unselectSelected() {
                let aSelectedIndex = this.selectedIndex;
                this.unselectItemByIndex(aSelectedIndex);
            }
            //_______________________________________________________________
            unselectSpecificItem(aSelectedIndex) {
                this.unselectItemByIndex(aSelectedIndex);
            }
            //_______________________________________________________________
            unselectItemByIndex(aSelectedIndex) {
                let aSelectedItem = this.mDataProvider.getItemAt(aSelectedIndex);
                let aSelectedIndexInRemoveArray = this.selectedItemsOnRemove.indexOf(aSelectedItem);
                if (aSelectedIndexInRemoveArray > -1) {
                    this.selectedItemsOnRemove.splice(aSelectedIndexInRemoveArray, 1);
                }
                this.selectItemAt(aSelectedIndex, false);
            }
            //_______________________________________________________________
            unselectHovered() {
                this.hoverItemAt(this.mListHoveredIndex, false);
            }
            //_______________________________________________________________
            clearRelatedList() {
                this.mDataProvider.relatedList = null;
            }
            //_______________________________________________________________
            hoverItemAt(iIndex, iSelect) {
                if (this.isIndexValid(iIndex)) {
                    let aIr = this.getItemRendererAt(iIndex);
                    if (aIr && aIr.initialized) {
                        aIr.hovered = iSelect;
                    }
                    this.mListHoveredIndex = (iSelect) ? iIndex : -1;
                }
            }
            //_______________________________________________________________
            selectItemAt(iIndex, iSelect) {
                if (this.isIndexValid(iIndex)) {
                    this.selectIr(this.getItemRendererAt(iIndex), iSelect);
                    if (iSelect) {
                        this.listSelectedIndex = iIndex;
                    }
                }
            }
            //_______________________________________________________________
            selectIr(iIr, iSelect) {
                if (iIr) {
                    iIr.selected = iSelect;
                }
            }
            //_______________________________________________________________
            disposeDataProvider() {
                if (this.mDataProvider) {
                    this.disposeDataGroup();
                    this.clearRelatedList();
                    this.removeDataProviderListeners();
                    this.mDataProvider = null;
                }
            }
            //_______________________________________________________________
            saveInCollection() {
                if (this.mDataProvider) {
                    if (this.mDataProvider.relatedList != null) {
                        throw new Error("This ArrayCollection is already attached to a list.");
                    }
                    this.mDataProvider.relatedList = this.com;
                }
            }
            //_______________________________________________________________
            setDataProvider(value) {
                if (this.mDataProvider == value && this.mDataProvider != null) {
                    this.mDataProvider.refresh();
                    return;
                }
                this.beforeSetDataProviderStoreItems();
                this.disposeDataProvider();
                this.mDataProvider = value;
                if (this.mDataProvider) {
                    this.saveInCollection();
                    this.addDataProviderListeners();
                    if (this.mDataProvider.isNeedItemRenderers) {
                        this.addItemsView__EventHandler(this.mDataProvider.toDataArray());
                    }
                    else {
                        this.finishBuildingList();
                    }
                }
                else {
                    this.finishBuildingList();
                }
                this.afterSetDataProviderRestoreItems();
            }
            //__________________________________________________________________
            finishBuildingOne() {
                this.emptyBuiltIrsArray();
                this.callback_Func(list.EvList.LIST_BUILDER_COMPLETE_ONE, this);
            }
            //__________________________________________________________________
            finishBuildingList() {
                this.emptyBuiltIrsArray();
                this.callback_Func(list.EvList.LIST_BUILDER_COMPLETE, this);
            }
            //__________________________________________________________________
            emptyBuiltIrsArray() {
                if (this.SEND_JUST_BUILT_IRS) {
                    this.builtIrs.length = 0;
                }
            }
            //__________________________________________________________________
            getSelectedItem() {
                let aSelectedIndex = this.listSelectedIndex;
                if (aSelectedIndex > -1) {
                    return this.getItemAt(aSelectedIndex);
                }
                return null;
            }
            setSelectedItem(iData) {
                if (this.dataProvider) {
                    this.selectedIndex = this.getItemIndex(iData);
                }
            }
            //_______________________________________________________________
            setUnselectItem(iData) {
                this.unselectItem(iData);
            }
            //__________________________________________________________________
            getSelectedItems() {
                let aSelectedItems = new Array();
                if (this.dataProvider) {
                    for (let i = 0; i < this.dataProvider.length; ++i) {
                        let aIr = this.dataProvider.getItemRendererAt(i);
                        if (aIr && aIr.selected) {
                            aSelectedItems.push(aIr.data);
                        }
                    }
                }
                return aSelectedItems;
            }
            setSelectedItems(values) {
                if (asBase.Utils.areIdenticalArrays(this.selectedItems, values)) {
                    return;
                }
                this.unselectSelected();
                if (this.dataProvider && values) {
                    for (let aValue of values) {
                        for (let i = 0; i < this.dataProvider.length; ++i) {
                            let aIr = this.getItemRendererAt(i);
                            if (aIr && aIr.data == aValue) {
                                aIr.selected = true;
                                break;
                            }
                        }
                    }
                    this.callback_Func(EvItemRenderer.IR_SELECTIONS_CHANGED, values);
                }
            }
            //_______________________________________________________________
            getSelectedIndex() {
                return this.mListSelectedIndex - this.mFirstItemIndex;
            }
            //_______________________________________________________________
            setSelectedIndex(value) {
                if (this.listSelectedIndex > -1) {
                    if (!this.mIsMultiSelection) {
                        this.unselectSelected();
                    }
                    this.listSelectedIndex = -1;
                }
                if (this.dataProvider) {
                    if (value > -1 && value < this.dataProvider.length) {
                        this.selectItemAt(value, true);
                    }
                }
            }
            //__________________________________________________________________
            getSelectedIndices() {
                return [this.getSelectedIndex()];
            }
            setSelectedIndices(values) {
                this.setSelectedIndex(values[0]);
            }
            //__________________________________________________________________
            setSelectedItemOnFilterRemove(value) {
                this.selectedItemsOnRemove.length = 0;
                this.selectedItemsOnRemove.push(value);
            }
            //***********************
            //       get/set        *
            //***********************
            //__________________________________________________________________
            get com() {
                return this.mCom;
            }
            //__________________________________________________________________
            get dataGroup() {
                if (this.mDataGroup == undefined) {
                    this.mDataGroup = new Array();
                }
                return this.mDataGroup;
            }
            //__________________________________________________________________
            get length() {
                return this.mDataProvider == null ? 0 : this.mDataProvider.length;
            }
            //__________________________________________________________________
            get dataProvider() {
                return this.mDataProvider;
            }
            set dataProvider(value) {
                this.setDataProvider(value);
            }
            //_______________________________________________________________
            set dataField(value) {
                this.mDataField = value;
                if (this.mDataProvider) {
                    this.mDataProvider.dataField = value;
                }
            }
            //_______________________________________________________________
            get width() {
                return this.mWidth;
            }
            set width(value) {
                this.mWidth = value;
                this.mListContainer.style.width = value + "px";
            }
            //_______________________________________________________________
            get height() {
                return this.mHeight;
            }
            set height(value) {
                this.mHeight = value;
                this.mListContainer.style.height = value + "px";
            }
            //_______________________________________________________________
            get itemRenderer() {
                if (this.mIrArgs != undefined) {
                    return this.createItemRenderer();
                }
                return null;
            }
            //_______________________________________________________________
            get editable() {
                return this.mEditable;
            }
            set editable(value) {
                this.mEditable = value;
            }
            //_______________________________________________________________
            set selectable(value) {
                this.mSelectable = value;
            }
            //__________________________________________________________________
            get hoveredItem() {
                if (this.mListHoveredIndex > -1) {
                    return this.getItemAt(this.mListHoveredIndex);
                }
                return null;
            }
            set hoveredItem(iData) {
                if (this.hoveredItem == iData) {
                    return;
                }
                if (this.dataProvider) {
                    this.hoveredIndex = this.getItemIndex(iData);
                }
            }
            //__________________________________________________________________
            get selectedItem() {
                return this.getSelectedItem();
            }
            set selectedItem(iData) {
                this.setSelectedItem(iData);
            }
            //__________________________________________________________________
            set unselectItem(iData) {
                this.setUnselectItem(iData);
            }
            //__________________________________________________________________
            get selectedItems() {
                return this.getSelectedItems();
            }
            set selectedItems(values) {
                this.setSelectedItems(values);
            }
            //__________________________________________________________________
            get hoveredIndex() {
                return this.mListHoveredIndex;
            }
            set hoveredIndex(value) {
                if (this.mListHoveredIndex == value) {
                    return;
                }
                if (this.mListHoveredIndex > -1) {
                    this.unselectHovered();
                }
                this.hoverItemAt(value, true);
            }
            //__________________________________________________________________
            get selectedIndex() {
                return this.getSelectedIndex();
            }
            set selectedIndex(value) {
                this.setSelectedIndex(value);
            }
            //__________________________________________________________________
            get selectedIndices() {
                return this.getSelectedIndices();
            }
            set selectedIndices(values) {
                this.setSelectedIndices(values);
            }
            //__________________________________________________________________
            get firstItemIndex() {
                return this.mFirstItemIndex;
            }
            set firstItemIndex(value) {
                this.mFirstItemIndex = value;
            }
            //__________________________________________________________________
            get listSelectedIndex() {
                return this.mListSelectedIndex;
            }
            set listSelectedIndex(value) {
                this.mListSelectedIndex = value;
            }
            //_______________________________________________________________
            set irClass(iIrClassPath) {
                this.mIrClassPath = iIrClassPath;
            }
            //_______________________________________________________________
            set irSkin(iIrSkinPath) {
                this.mIrSkinPath = iIrSkinPath;
            }
            //__________________________________________________________________
            set enabled(value) {
                if (this.dataProvider) {
                    this.dataProvider.enabled = value;
                }
            }
            get enabled() {
                return this.dataProvider.enabled;
            }
            //_______________________________________________________________
            get selectedItemsOnRemove() {
                if (this.mSelectedItemsOnRemove == null) {
                    this.mSelectedItemsOnRemove = new Array();
                }
                return this.mSelectedItemsOnRemove;
            }
            //_______________________________________________________________
            //*
            get builtIrs() {
                if (this.mBuiltIrs == null) {
                    this.mBuiltIrs = new Array();
                }
                return this.mBuiltIrs;
            }
        }
        list.List = List;
    })(list = gencom.list || (gencom.list = {}));
})(gencom || (gencom = {}));
///<reference path="List.ts"/>
var gencom;
///<reference path="List.ts"/>
(function (gencom) {
    var list;
    (function (list) {
        class ListSingleSelection extends list.List {
            //------------------------------
            // Members
            //------------------------------
            constructor(iCoList) {
                super(iCoList);
            }
        }
        list.ListSingleSelection = ListSingleSelection;
    })(list = gencom.list || (gencom.list = {}));
})(gencom || (gencom = {}));
/// <reference path="../../asBase/collections/IItemRenderer.ts" />
///<reference path="List.ts"/>
var gencom;
/// <reference path="../../asBase/collections/IItemRenderer.ts" />
///<reference path="List.ts"/>
(function (gencom) {
    var list;
    (function (list) {
        var EvItemRenderer = asBase.collections.EvItemRenderer;
        class ListMultiSelection extends list.List {
            constructor(iCoList) {
                super(iCoList);
                //------------------------------
                // Consts
                //------------------------------
                this.INDEX_SELECT_NONE = -1;
                this.mIsDragSelection = false;
            }
            //_______________________________________________________________
            dispose() {
                super.dispose();
                this.mStoreSelectedItems = null;
            }
            //_______________________________________________________________
            irMouseDown__EventHandler(event) {
                this.mIrMouseDown = event.detail.sender;
                super.irMouseDown__EventHandler(event);
            }
            //_______________________________________________________________
            irMouseUp__EventHandler(event) {
                if (this.mIsDragSelection) {
                    let aIrMouseUp = event.detail.sender;
                    if (this.isMouseUpDiffThanDown(aIrMouseUp)) {
                        let aItemIndexDown = this.getItemIndex(this.mIrMouseDown.data);
                        let aItemIndexUp = this.getItemIndex(aIrMouseUp.data);
                        let aMaxItemIndex = Math.max(aItemIndexDown, aItemIndexUp);
                        let aMinItemIndex = Math.min(aItemIndexDown, aItemIndexUp);
                        while (aMinItemIndex <= aMaxItemIndex) {
                            let aIr = this.getItemRendererAt(aMinItemIndex);
                            if (aIr.selected != this.mIrMouseDown.selected) {
                                this.selectedIndex = aMinItemIndex;
                            }
                            ++aMinItemIndex;
                        }
                    }
                    this.mIrMouseDown = null;
                }
            }
            //________________________________________________________________
            isMouseUpDiffThanDown(iIrMouseUp) {
                return iIrMouseUp != this.mIrMouseDown && this.mIrMouseDown != null;
            }
            //_______________________________________________________________
            removeAll() {
                if (this.selectedIndices) {
                    this.selectedIndices.splice(0);
                }
                super.removeAll();
            }
            //_______________________________________________________________
            updateSelectedIndex() {
                // empty
            }
            //__________________________________________________________________
            setSelectedItemOnFilterRemove(value) {
                this.selectedItemsOnRemove.push(value);
            }
            /////////// IList - implementation functions
            //_______________________________________________________________
            updateSelectedItemOnRemove(iData) {
                if (iData.isSelected) {
                    this.callback_Func(EvItemRenderer.IR_SELECTION_CHANGED, iData);
                }
            }
            //_______________________________________________________________
            beforeSetDataProviderStoreItems() {
                this.mStoreSelectedItems = this.selectedItems;
            }
            //_______________________________________________________________
            afterSetDataProviderRestoreItems() {
                if (this.mStoreSelectedItems.length > 0) {
                    this.ensureItemIsVisible(this.mStoreSelectedItems[this.mStoreSelectedItems.length - 1]);
                    this.mStoreSelectedItems = null;
                }
            }
            //_______________________________________________________________
            unselectSelected() {
                let aSelectedIndices = this.selectedIndices;
                if (aSelectedIndices.length > 0) {
                    for (let aSelectedIndex of aSelectedIndices) {
                        this.unselectItemByIndex(aSelectedIndex);
                    }
                }
            }
            //_______________________________________________________________
            createNewSelectedIndices(iDataArray, iGetIndicesArrayFunc) {
                let aNewSelectedIndices = new Array();
                for (let aData of iDataArray) {
                    aNewSelectedIndices.push(iGetIndicesArrayFunc.call(this, aData));
                }
                return aNewSelectedIndices;
            }
            //_______________________________________________________________
            selectToggle(iIndex) {
                let aIr = this.dataProvider.getItemRendererAt(iIndex);
                if (aIr) {
                    aIr.selected = !aIr.selected;
                    this.listSelectedIndex = aIr.selected ? iIndex : this.lastSelectedIndex;
                }
            }
            //__________________________________________________________________
            getSelectedItem() {
                return this.firstSelectedItem;
            }
            //__________________________________________________________________
            setSelectedItem(iData) {
                this.selectedIndex = this.getItemIndex(iData);
            }
            //__________________________________________________________________
            getSelectedIndex() {
                return this.firstSelectedIndex - this.mFirstItemIndex;
            }
            //__________________________________________________________________
            setSelectedIndex(value) {
                this.selectToggle(value);
            }
            //__________________________________________________________________
            getSelectedItems() {
                let aSelectedItems = new Array();
                if (this.dataProvider) {
                    for (let i = 0; i < this.dataProvider.length; ++i) {
                        let aIr = this.dataProvider.getItemRendererAt(i);
                        if (aIr && aIr.selected) {
                            aSelectedItems.push(aIr.data);
                        }
                    }
                }
                return aSelectedItems;
            }
            setSelectedItems(values) {
                if (asBase.Utils.areIdenticalArrays(this.selectedItems, values)) {
                    return;
                }
                this.unselectSelected();
                if (this.dataProvider && values) {
                    for (let aValue of values) {
                        for (let i = 0; i < this.dataProvider.length; ++i) {
                            let aIr = this.getItemRendererAt(i);
                            if (aIr && aIr.data == aValue) {
                                aIr.selected = true;
                                break;
                            }
                        }
                    }
                    this.callback_Func(EvItemRenderer.IR_SELECTIONS_CHANGED, values);
                }
            }
            //__________________________________________________________________
            getIrIndex(aIr) {
                return aIr.itemIndex - this.mFirstItemIndex;
            }
            //__________________________________________________________________
            getSelectedIndices() {
                let aSelectedIndices = new Array();
                if (this.dataProvider) {
                    for (let i = 0; i < this.dataProvider.length; ++i) {
                        let aIr = this.dataProvider.getItemRendererAt(i);
                        if (aIr && aIr.selected) {
                            aSelectedIndices.push(this.getIrIndex(aIr));
                        }
                    }
                }
                return aSelectedIndices;
            }
            //__________________________________________________________________
            areIdenticalArrays(values) {
                return asBase.Utils.areIdenticalArrays(this.selectedIndices, values);
            }
            //__________________________________________________________________
            setSelectedIndices(values) {
                if (this.areIdenticalArrays(values)) {
                    return;
                }
                this.unselectSelected();
                if (values && this.dataProvider && values.length > 0 && values.length <= this.dataProvider.source.length) {
                    for (let i = 0; i < values.length; ++i) {
                        let aIrIndex = values[i];
                        this.selectItemAt(aIrIndex, true);
                    }
                    this.callback_Func(EvItemRenderer.IR_SELECTIONS_CHANGED, values);
                }
            }
            //***********************
            //       get/set        *
            //***********************
            //__________________________________________________________________
            get firstSelectedIndex() {
                let aSelectedIndices = this.selectedIndices;
                if (aSelectedIndices.length > 0) {
                    return aSelectedIndices[0]; // first selected index
                }
                return -1;
            }
            //__________________________________________________________________
            get firstSelectedItem() {
                let aSelectedItems = this.selectedItems;
                if (aSelectedItems.length > 0) {
                    return aSelectedItems[0]; // first selected item
                }
                return null;
            }
            //__________________________________________________________________
            get lastSelectedIndex() {
                let aSelectedIndices = this.selectedIndices;
                if (aSelectedIndices.length > 0) {
                    return aSelectedIndices[aSelectedIndices.length - 1]; // last selected index
                }
                return -1;
            }
            //__________________________________________________________________
            get lastSelectedItem() {
                let aSelectedItems = this.selectedItems;
                if (aSelectedItems.length > 0) {
                    return aSelectedItems[aSelectedItems.length - 1]; // last selected item
                }
                return null;
            }
        }
        list.ListMultiSelection = ListMultiSelection;
    })(list = gencom.list || (gencom.list = {}));
})(gencom || (gencom = {}));
///<reference path="ListMultiSelection.ts"/>
var gencom;
///<reference path="ListMultiSelection.ts"/>
(function (gencom) {
    var list;
    (function (list) {
        var EvItemRenderer = asBase.collections.EvItemRenderer;
        class ListMultiSelectionAll extends list.ListMultiSelection {
            constructor(iCoList) {
                super(iCoList);
                this.mFirstItemIndex = 1;
            }
            //_______________________________________________________________
            /*override*/
            dispose() {
                super.dispose();
                this.mIrSelectAll = null;
            }
            //_______________________________________________________________
            irMouseDown__EventHandler(event) {
                this.mIrMouseDown = event.detail.sender;
                if (this.mIrMouseDown != this.mIrSelectAll) {
                    super.irMouseDown__EventHandler(event);
                }
                else {
                    this.mIrSelectAll.selected = !this.mIrSelectAll.selected;
                    this.sendSelectAllChangedEvent();
                }
            }
            //________________________________________________________________
            sendSelectAllChangedEvent() {
                this.callback_Func(EvItemRenderer.IR_SELECT_ALL_CHANGED, this.mIrSelectAll);
            }
            //________________________________________________________________
            isMouseUpDiffThanDown(iIrMouseUp) {
                return super.isMouseUpDiffThanDown(iIrMouseUp) && iIrMouseUp != this.mIrSelectAll;
            }
            //________________________________________________________________
            buildFirstUniqueIr(iData) {
                if (this.mIrSelectAll) {
                    this.mIrSelectAll.dispose();
                }
                this.mIrSelectAll = this.createItemRenderer(iData);
                this.addIrListeners(this.mIrSelectAll);
                this.mIrSelectAll.addClass("select-all");
                this.mListContainer.insertBefore(this.mIrSelectAll.contentWrapper, this.mListContainer.childNodes[0]);
            }
            //_______________________________________________________________
            removeAll() {
                if (this.mIrSelectAll) {
                    this.mIrSelectAll.dispose();
                    this.mIrSelectAll = null;
                }
                super.removeAll();
            }
            //__________________________________________________________________
            setUnselectItem(iData) {
                if (iData.id == ListMultiSelectionAll.SELECT_ALL_TAG_ID) {
                    this.mIrSelectAll.selected = false;
                    this.sendSelectAllChangedEvent();
                }
                else {
                    let aUnselectedIndex = this.getItemIndex(iData);
                    this.selectItemAt(aUnselectedIndex, false);
                }
            }
            //__________________________________________________________________
            setSelectedItem(iData) {
                if (iData.id == ListMultiSelectionAll.SELECT_ALL_TAG_ID) {
                    if (this.mIrSelectAll != null) {
                        if (this.mIrSelectAll.selected != iData.isSelected) {
                            this.mIrSelectAll.selected = iData.isSelected;
                            this.sendSelectAllChangedEvent();
                        }
                    }
                }
                else {
                    this.selectedIndex = this.getItemIndex(iData);
                }
            }
            //__________________________________________________________________
            getSelectedItems() {
                if (this.mIrSelectAll && this.mIrSelectAll.selected) {
                    return [this.mIrSelectAll.data];
                }
                return super.getSelectedItems();
            }
            //__________________________________________________________________
            setSelectedIndex(value) {
                if (value == -1) {
                    return;
                }
                if (this.mIrSelectAll.selected) {
                    this.mIrSelectAll.selected = false;
                }
                this.selectToggle(value);
            }
            //_______________________________________________________________
            itemRendererOffsetTop(iIr) {
                return iIr.contentWrapper.offsetTop - iIr.contentWrapper.clientHeight;
            }
            //_______________________________________________________________
            getItemRendererAt(iIndex) {
                return super.getItemRendererAt(iIndex);
            }
        }
        //------------------------------
        // Consts
        //------------------------------
        ListMultiSelectionAll.SELECT_ALL_TAG_ID = -2;
        list.ListMultiSelectionAll = ListMultiSelectionAll;
    })(list = gencom.list || (gencom.list = {}));
})(gencom || (gencom = {}));
/// <reference path="List.ts" />
/// <reference path="ICoList.ts" />
/// <reference path="List.ts" />
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
///<reference path="EvList.ts"/>
///<reference path="ListSingleSelection.ts"/>
///<reference path="ListMultiSelection.ts"/>
///<reference path="../../asBase/CoComponentContainer.ts"/>
///<reference path="ListMultiSelectionAll.ts"/>
var gencom;
/// <reference path="List.ts" />
/// <reference path="ICoList.ts" />
/// <reference path="List.ts" />
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
///<reference path="EvList.ts"/>
///<reference path="ListSingleSelection.ts"/>
///<reference path="ListMultiSelection.ts"/>
///<reference path="../../asBase/CoComponentContainer.ts"/>
///<reference path="ListMultiSelectionAll.ts"/>
(function (gencom) {
    var list;
    (function (list) {
        var ArrayCollection = asBase.baseclasses.ArrayCollection;
        var EvItemRenderer = asBase.collections.EvItemRenderer;
        var AsEvent = asBase.events.AsEvent;
        var CoComponentContainer = asBase.CoComponentContainer;
        var Utils = asBase.Utils;
        class CoList extends CoComponentContainer {
            constructor(iContainer, iIsMultiSelection = false, iFirstUniqueIrData = null) {
                super(undefined, undefined, iContainer);
                this.mIsNeedToUpdate = true;
                this.mDisplayItemsNum = -1;
                this.mSelectable = true;
                this.mIsInvalidList = false;
                this.mIsGrid = false;
                this.mTutorialIndex = -1;
                this.mInitSelectedIndex = -1;
                //------------------------------
                // Const
                //------------------------------
                this.DEFAULT_IR_CLASS_NAME = "asBase.baseclasses.ItemRenderer";
                this.irClass = undefined;
                this.mIsMultiSelection = iIsMultiSelection;
                if (iFirstUniqueIrData) {
                    this.mFirstUniqueIrData = iFirstUniqueIrData;
                }
            }
            //__________________________________________________________________
            creationComplete() {
                this.setToActive();
                this.createList();
            }
            //________________________________________________________________
            setToActive() {
                this.mCallback_Func = (iType, iSender) => this.callback(iType, iSender);
                if (this.mList) {
                    this.mList.setToActive();
                }
            }
            //________________________________________________________________
            setToSleep() {
                this.mCallback_Func = null;
                if (this.mList) {
                    this.mList.setToSleep();
                }
            }
            //__________________________________________________________________
            updateView() {
                if (this.mIsNeedToUpdate && this.mList && this.mDataProvider) {
                    this.mIsNeedToUpdate = false;
                    this.mList.dataField = this.mDataField;
                    this.mList.dataProvider = this.mDataProvider;
                }
            }
            //__________________________________________________________________
            callback(iType, iSender) {
                if (!this.mIsEnabled) {
                    return;
                }
                switch (iType) {
                    case list.EvList.LIST_BUILDER_COMPLETE:
                        this.onListBuilderComplete__EventHandler();
                        break;
                    case EvItemRenderer.IR_SELECT_ALL_CHANGED:
                        this.dispatchType__EventHandler(iType, iSender);
                        break;
                    case list.EvList.LIST_BUILDER_COMPLETE_ONE:
                    case EvItemRenderer.IR_CHANGED:
                    case EvItemRenderer.IR_SELECTION_CHANGED:
                    case EvItemRenderer.IR_SELECTIONS_CHANGED:
                    case EvItemRenderer.IR_MOUSE_OVER:
                    case EvItemRenderer.IR_MOUSE_OUT:
                    case ArrayCollection.COLLECTION_REFRESHED:
                    case ArrayCollection.COLLECTION_FILTER_SET:
                    case ArrayCollection.COLLECTION_FILTER_REMOVED:
                    case ArrayCollection.COLLECTION_SORT_SET:
                    case ArrayCollection.COLLECTION_SORT_REMOVED:
                    case EvItemRenderer.IR_DATA_CHANGED:
                    case list.EvList.LIST_IR_DELETE:
                    case EvItemRenderer.IR_DOUBLE_CLICK:
                        this.dispatchType__EventHandler(iType, iSender);
                        break;
                }
            }
            //_______________________________________________________________
            onListBuilderComplete__EventHandler() {
                this.buildFirstUniqueIr(this.mFirstUniqueIrData);
                this.mFirstUniqueIrData = null;
                this.selectInited();
                if (this.mIsEnabled) {
                    this.dispatchBuildComplete();
                }
            }
            //_______________________________________________________________
            dispatchBuildComplete() {
                if (this.mDataProvider.length == 0 || this.mDataProvider.areAllIrsInitialized()) {
                    this.dispatchEvent(new AsEvent(list.EvList.LIST_BUILDER_COMPLETE, false, this).event);
                }
                else {
                    clearTimeout(this.mBuildCompleteTimeout);
                    this.mBuildCompleteTimeout = setTimeout(() => this.dispatchBuildComplete(), 500);
                }
            }
            //_______________________________________________________________
            selectInited() {
                if (this.mInitSelectedIndex > -1) {
                    this.mList.selectedIndex = this.mInitSelectedIndex;
                    this.ensureSelectedIsVisible();
                    this.mInitSelectedIndex = -1;
                }
                else if (this.mInitSelectedIndices) {
                    this.mList.selectedIndices = this.mInitSelectedIndices;
                    this.ensureSelectedIsVisible();
                    this.mInitSelectedIndices = null;
                }
                else if (this.mInitSelectedItem) {
                    this.mList.selectedItem = this.mInitSelectedItem;
                    this.ensureSelectedIsVisible();
                    this.mInitSelectedItem = null;
                }
                else if (this.mInitSelectedItems) {
                    this.mList.selectedItems = this.mInitSelectedItems;
                    this.ensureSelectedIsVisible();
                    this.mInitSelectedItems = null;
                }
            }
            //_______________________________________________________________
            get header() {
                if (this.mList == null) {
                    return null;
                }
                return (this.mList.getFirstUniqueIr());
            }
            //_______________________________________________________________
            buildFirstUniqueIr(iData) {
                if (iData) {
                    this.mList.buildFirstUniqueIr(iData);
                }
            }
            //__________________________________________________________________
            createUniqueRenderer(iData, iContainer) {
                if (this.mList) {
                    return this.mList.createUniqueRenderer(iData, iContainer);
                }
                return null;
            }
            //_______________________________________________________________
            dispatchType__EventHandler(iType, iSender) {
                let aEvent = new AsEvent(iType, false, iSender);
                this.dispatchEvent(aEvent.event);
            }
            //_______________________________________________________________
            dispatchCollectionRefreshBuildComplete() {
                this.onListBuilderComplete__EventHandler();
                // let aEvent:AsEvent = new AsEvent(EvList.LIST_BUILDER_COMPLETE, false, this);
                // this.dispatchEvent(aEvent.event);
            }
            //_______________________________________________________________
            dispose() {
                this.setToSleep();
                this.removeView();
                if (this.mList) {
                    this.mList.setToSleep();
                    this.mList.dispose();
                    this.mList = undefined;
                }
                this.data = undefined;
            }
            //__________________________________________________________________
            removeView() {
                if (this.mList) {
                    this.mList.removeAll();
                }
                super.removeView();
            }
            //__________________________________________________________________
            updateAllByResponseObj(iResponseObj) {
                if (this.mList) {
                    this.mList.updateAllByResponseObj(iResponseObj);
                }
            }
            //_______________________________________________________________
            setEnabled(iIsEnabled) {
                if (this.mList && this.mIsEnabled != iIsEnabled) {
                    this.mIsEnabled = iIsEnabled;
                    this.mList.enabled = iIsEnabled;
                }
            }
            //__________________________________________________________________
            createList() {
                this.mList = this.createListObject();
                this.mList.selectable = this.mSelectable;
                this.mIsNeedToUpdate = true;
                this.updateView();
            }
            //__________________________________________________________________
            createListObject() {
                if (this.mFirstUniqueIrData) {
                    return new list.ListMultiSelectionAll(this); //, this.mContentWrapper, this.mCallback_Func, this.mIrClassPath, this.mIrSkinPath);
                }
                else if (this.mIsMultiSelection) {
                    return new list.List /*ListMultiSelection*/(this, this.mIsMultiSelection); //, this.mContentWrapper, this.mCallback_Func, this.mIrClassPath, this.mIrSkinPath);
                }
                return new list.List(this); //, this.mContentWrapper, this.mCallback_Func, this.mIrClassPath, this.mIrSkinPath);
            }
            //________________________________________________________________
            setDataProvider(value) {
                if (this.mDataProvider == value && this.mDataProvider != null) {
                    this.mDataProvider.refresh();
                    return;
                }
                this.mDataProvider = value;
                if (value == null && this.mList) {
                    this.mList.dataProvider = null;
                    return;
                }
                this.mIsNeedToUpdate = true;
                this.updateView();
            }
            //________________________________________________________________
            setError() {
                if (this.contentWrapper) {
                    Utils.setFieldError(this.contentWrapper);
                }
            }
            //________________________________________________________________
            clearError() {
                if (this.contentWrapper) {
                    Utils.clearFieldError(this.contentWrapper);
                }
            }
            //_______________________________________________________________
            addLabelToItem(iLabel) {
                if (this.labelToItem_Func) {
                    let aNewData = this.labelToItem_Func(iLabel);
                    this.mList.addItem(aNewData);
                }
            }
            //_______________________________________________________________
            ensureItemIsVisible(iData) {
                if (this.mList) {
                    this.mList.ensureItemIsVisible(iData);
                }
            }
            /////////// ICoList - implementation functions
            //_______________________________________________________________
            addItems(iDataArray) {
                if (this.mList) {
                    this.mList.addItems(iDataArray);
                }
            }
            //_______________________________________________________________
            removeItem(iData) {
                if (this.mList) {
                    this.mList.removeItem(iData);
                }
            }
            //__________________________________________________________________
            refresh() {
                if (this.mList) {
                    this.mList.refresh();
                    this.mIsInvalidList = false;
                }
            }
            //_______________________________________________________________
            reappendItem(iData) {
                if (this.mList) {
                    this.mList.reappendItem(iData);
                }
            }
            //_______________________________________________________________
            addItem(iData) {
                if (this.mList) {
                    this.mList.addItem(iData);
                }
            }
            //_______________________________________________________________
            addItemAt(iData, iIndex) {
                if (this.mList) {
                    return this.mList.addItemAt(iData, iIndex);
                }
            }
            //_______________________________________________________________
            getItemAt(iIndex) {
                if (this.mList) {
                    return this.mList.getItemAt(iIndex);
                }
                return null;
            }
            //_______________________________________________________________
            removeAll() {
                if (this.mList) {
                    this.mList.removeAll();
                }
            }
            //_______________________________________________________________
            removeItemAt(iIndex) {
                if (this.mList) {
                    return this.mList.removeItemAt(iIndex);
                }
                return null;
            }
            //_______________________________________________________________
            getItemIndex(iData) {
                if (this.mList) {
                    return this.mList.getItemIndex(iData);
                }
                return -1;
            }
            //_______________________________________________________________
            setVisible(value) {
                this.contentWrapper.hidden = !value;
            }
            //_______________________________________________________________
            ensureIndexIsVisible(iIndex) {
                if (this.mList) {
                    this.mList.ensureIndexIsVisible(iIndex);
                }
            }
            //_______________________________________________________________
            ensureSelectedIsVisible() {
                if (this.mList) {
                    this.mList.ensureItemIsVisible(this.selectedItem);
                }
            }
            //_______________________________________________________________
            contains(iData) {
                if (this.mList) {
                    return this.mList.contains(iData);
                }
                return false;
            }
            //***********************
            //       get/set        *
            //***********************
            //__________________________________________________________________
            get data() {
                if (this.mData == undefined) {
                    this.mData = new Array();
                }
                return this.mData;
            }
            set data(value) {
                this.mData = value;
                if (this.mList) {
                    this.refresh();
                }
            }
            //_______________________________________________________________
            get editable() {
                if (this.mList) {
                    return this.mList.editable;
                }
                return false;
            }
            set editable(value) {
                if (this.mList) {
                    this.mList.editable = value;
                }
            }
            //_______________________________________________________________
            set selectable(value) {
                this.mSelectable = value;
                if (this.mList) {
                    this.mList.selectable = value;
                }
            }
            //_______________________________________________________________
            set irClass(iPath) {
                if (iPath == undefined) {
                    iPath = this.DEFAULT_IR_CLASS_NAME;
                }
                this.mIrClassPath = iPath.split(".");
                if (this.list) {
                    this.list.irClass = this.mIrClassPath;
                }
            }
            //_______________________________________________________________
            get dataGroup() {
                return (this.list.dataGroup);
            }
            //_______________________________________________________________
            set irSkin(iPath) {
                this.mIrSkinPath = iPath;
                if (this.list) {
                    this.list.irSkin = this.mIrSkinPath;
                }
            }
            //_______________________________________________________________
            get dataProvider() {
                return this.mDataProvider;
            }
            set dataProvider(value) {
                this.setDataProvider(value);
            }
            //_______________________________________________________________
            get dataField() {
                return this.mDataField;
            }
            set dataField(value) {
                if (this.mDataField != value) {
                    this.mDataField = value;
                    this.mIsNeedToUpdate = true;
                    this.updateView();
                }
            }
            //__________________________________________________________________
            get hoveredIndex() {
                if (this.mList) {
                    return this.mList.hoveredIndex;
                }
                return -1;
            }
            set hoveredIndex(value) {
                if (this.mList) {
                    this.mList.hoveredIndex = value;
                }
            }
            //__________________________________________________________________
            get selectedIndex() {
                if (this.mList) {
                    return this.mList.selectedIndex;
                }
                return -1;
            }
            set selectedIndex(value) {
                if (this.mList) {
                    this.mList.selectedIndex = value;
                }
                else {
                    this.mInitSelectedIndex = value;
                }
            }
            //__________________________________________________________________
            get hoveredItem() {
                if (this.mList) {
                    return this.mList.hoveredItem;
                }
                return null;
            }
            //__________________________________________________________________
            get selectedItem() {
                if (this.mList) {
                    return this.mList.selectedItem;
                }
                return null;
            }
            set selectedItem(value) {
                if (this.mList) {
                    this.mList.selectedItem = value;
                }
                else {
                    this.mInitSelectedItem = value;
                }
            }
            //__________________________________________________________________
            get selectedItems() {
                if (this.mList) {
                    return this.mList.selectedItems;
                }
                return null;
            }
            set selectedItems(values) {
                if (this.mList) {
                    this.mList.selectedItems = values;
                }
                else {
                    this.mInitSelectedItems = values;
                }
            }
            //__________________________________________________________________
            get selectedIndices() {
                if (this.mList) {
                    return this.mList.selectedIndices;
                }
                return null;
            }
            set selectedIndices(values) {
                if (this.mList) {
                    this.mList.selectedIndices = values;
                }
                else {
                    this.mInitSelectedIndices = values;
                }
            }
            //__________________________________________________________________
            get firstItemIndex() {
                if (this.mList) {
                    return this.mList.firstItemIndex;
                }
                return null;
            }
            set firstItemIndex(value) {
                if (this.mList) {
                    this.mList.firstItemIndex = value;
                }
                else {
                    this.mInitFirstItemIndex = value;
                }
            }
            //__________________________________________________________________
            set unselectItem(value) {
                if (!value) {
                    return;
                }
                if (this.mList) {
                    this.mList.unselectItem = value;
                }
            }
            //__________________________________________________________________
            unselectSelected() {
                if (this.mList) {
                    this.mList.unselectSelected();
                }
            }
            //__________________________________________________________________
            get length() {
                if (this.mDataProvider) {
                    return this.mDataProvider.length;
                }
                return -1;
            }
            //__________________________________________________________________
            get displayItemsNum() {
                return this.mDisplayItemsNum;
            }
            set displayItemsNum(value) {
                this.mDisplayItemsNum = value;
            }
            //__________________________________________________________________
            get isGrid() {
                return this.mIsGrid;
            }
            //__________________________________________________________________
            get list() {
                return this.mList;
            }
            //__________________________________________________________________
            get isInvalidList() {
                return this.mIsInvalidList;
            }
            set isInvalidList(value) {
                this.mIsInvalidList = value;
            }
            //_______________________________________________________________
            set tutorialIndex(value) {
                this.mTutorialIndex = value;
            }
            //__________________________________________________________________
            set labelToItem_Func(value) {
                this.mLabelToItem_Func = value;
            }
            get labelToItem_Func() {
                return this.mLabelToItem_Func;
            }
            //__________________________________________________________________
            set firstUniqueIrData(value) {
                if (value) {
                    this.mFirstUniqueIrData = value;
                }
            }
            //__________________________________________________________________
            set selectedItemOnFilterRemove(value) {
                if (this.mList) {
                    this.mList.setSelectedItemOnFilterRemove(value);
                }
            }
        }
        list.CoList = CoList;
    })(list = gencom.list || (gencom.list = {}));
})(gencom || (gencom = {}));
///<reference path="../list/CoList.ts"/>
var gencom;
///<reference path="../list/CoList.ts"/>
(function (gencom) {
    var MouseEvents = asBase.events.MouseEvents;
    var AcArray = asBase.baseclasses.AcArray;
    var ArrayCollection = asBase.baseclasses.ArrayCollection;
    class CoChangeLanguageWindow extends PopUpWindow {
        constructor(iHTMLElement, iIsDropDownView = false) {
            super("./skins/com/languagewindow/SkChangeLanguage", iHTMLElement);
            this.mIsDropDownView = iIsDropDownView;
        }
        //____________________________________________________________________
        creationComplete() {
            this.close_btn = this.getPart("close_btn");
            this.languagesList_div = this.getPart("languagesList_div");
            this.languagesList_div_com = new gencom.list.CoList(this.languagesList_div);
            this.languagesList_div_com.irClass = "gencom.IrLanguages";
            this.languagesList_div_com.irSkin = "./skins/com/languagewindow/IrLanguages.html";
            this.languagesList_div_com.dataProvider = new ArrayCollection(this.getLanguagesArray());
            super.creationComplete();
            if (this.mIsDropDownView) {
                this.popup_content.classList.add("is-dropdown-view");
                this.popup_div.classList.add("transparent-background");
            }
        }
        //________________________________________________________________________________________________________
        addEventListeners() {
            this.outClickClose__EventHandler_Func = (iMouseEvent) => this.outClickClose__EventHandler(iMouseEvent);
            this.popup_div.addEventListener(MouseEvents.CLICK, this.outClickClose__EventHandler_Func);
            this.close__EventHandler_Func = () => this.close__EventHandler();
            this.close_btn.addEventListener(MouseEvents.CLICK, this.close__EventHandler_Func);
        }
        //________________________________________________________________________________________________________
        removeEventListeners() {
            this.outClickClose__EventHandler_Func = (iMouseEvent) => this.outClickClose__EventHandler(iMouseEvent);
            this.popup_div.addEventListener(MouseEvents.CLICK, this.outClickClose__EventHandler_Func);
            this.close_btn.removeEventListener(MouseEvents.CLICK, this.close__EventHandler_Func);
            this.close__EventHandler_Func = null;
        }
        outClickClose__EventHandler(iMouseEvent) {
            if (iMouseEvent.target == this.popup_div) {
                this.close__EventHandler();
            }
        }
        //________________________________________________________________________________________________________
        close__EventHandler() {
            if (this.mCallBackFunc) {
                this.mCallBackFunc(CoChangeLanguageWindow.CLOSED_NO_LANGUAGE_CHANGE);
            }
            this.hide();
            this.removeEventListeners();
        }
        /****************************
         * Getters & Setters
         ****************************/
        //____________________________________________________________________
        getLanguagesArray() {
            let aLanguagesArray = new AcArray();
            let languageUS = new gencom.DaIrLanguages();
            languageUS.longName = "English (US)";
            languageUS.shortName = "US";
            aLanguagesArray.push(languageUS);
            let languageDE = new gencom.DaIrLanguages();
            languageDE.longName = "Deutsch";
            languageDE.shortName = "DE";
            aLanguagesArray.push(languageDE);
            return aLanguagesArray;
        }
    }
    //------------------------------
    // Constants
    //------------------------------
    CoChangeLanguageWindow.CLOSED_NO_LANGUAGE_CHANGE = "Closed_with_no_language_change";
    gencom.CoChangeLanguageWindow = CoChangeLanguageWindow;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    class DaIrLanguages {
        constructor() {
        }
        //___________________________________________________________________
        fillFromVO(iCmDateVO) {
            this.mLongName = iCmDateVO.LongName;
            this.mShortName = iCmDateVO.ShortName;
        }
        /****************************
         * Getters and Setters
         ****************************/
        //___________________________________________________________________
        get longName() {
            return this.mLongName;
        }
        set longName(value) {
            this.mLongName = value;
        }
        //___________________________________________________________________
        get shortName() {
            return this.mShortName;
        }
        set shortName(value) {
            this.mShortName = value;
        }
    }
    gencom.DaIrLanguages = DaIrLanguages;
})(gencom || (gencom = {}));
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
var gencom;
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
(function (gencom) {
    var ItemRenderer = asBase.baseclasses.ItemRenderer;
    var MouseEvents = asBase.events.MouseEvents;
    var DaGlobalConsts = asBase.constants.DaGlobalConsts;
    class IrLanguages extends ItemRenderer {
        constructor(iData, iSkin, iContainer, iDataField) {
            super(iData, iSkin, iContainer, iDataField);
        }
        //____________________________________________________________________
        creationComplete() {
            this.languageFlagImage_span = this.getPart('languageFlagImage_span');
            this.languageLongName_span = this.getPart('languageLongName_span');
            super.creationComplete();
        }
        //____________________________________________________________________
        addEventListeners() {
            super.addEventListeners();
            this.changeLanguageClicked__EventHandler_Func = () => this.changeLanguageClicked__EventHandler();
            this.addEventListener(MouseEvents.FORCE_CLICK, this.changeLanguageClicked__EventHandler_Func, this);
        }
        //____________________________________________________________________
        removeEventListeners() {
            super.removeEventListeners();
            this.removeEventListener(MouseEvents.FORCE_CLICK, this.changeLanguageClicked__EventHandler_Func);
            this.changeLanguageClicked__EventHandler_Func = null;
        }
        //__________________________________________________________________
        updateView() {
            if (!this.data) {
                return;
            }
            this.languageLongName_span.innerHTML = this.data.longName;
            this.languageFlagImage_span.classList.add(`lng_${this.data.shortName}`);
        }
        //________________________________________________________________________________________________________
        changeLanguageClicked__EventHandler() {
            if (!DaGlobalConsts.IS_CORDOVA_APK) {
                let aUrl = document.location.href.split("?")[0];
                document.location.href = `${aUrl}?lng=${this.data.shortName}`;
            }
            else {
                // EvFireBaseManager.LANGUAGE_LOADED
                localStorage.setItem('languageLoaded_Event', this.data.shortName);
                window.location.reload();
            }
        }
        /****************************
         * Getters & Setters
         ****************************/
        //__________________________________________________________________
        get data() {
            return this.mData;
        }
    }
    gencom.IrLanguages = IrLanguages;
})(gencom || (gencom = {}));
/// <reference path="../../asBase/SkinsCss.ts" />
var gencom;
/// <reference path="../../asBase/SkinsCss.ts" />
(function (gencom) {
    var CoComponentBase = asBase.CoComponentBase;
    var SkinsCss = asBase.SkinsCss;
    var MouseEvents = asBase.events.MouseEvents;
    var AsEvent = asBase.events.AsEvent;
    var Styles = asBase.Styles;
    var EventTypes = asBase.events.EventTypes;
    class CoCheckBox extends CoComponentBase {
        constructor(iData, iContainer, iSkin, iDataField) {
            super(iData, iSkin ? iSkin : SkinsCss.SKINS_GENCOM + "checkbox/SkCheckBox.html", iContainer);
            //------------------------------
            // Members
            //------------------------------
            this.mDataField = "name";
            this.mDataField = iDataField;
        }
        //____________________________________________________________________
        creationComplete() {
            this.checkBox_chb = this.getPart("checkBox_chb");
            this.checkBoxLabel_spn = this.getPart("checkBoxLabel_spn");
            this.setToActive();
        }
        //________________________________________________________________
        setToActive() {
            super.setToActive();
            this.addEventListeners();
            this.updateView();
        }
        //________________________________________________________________
        setToSleep() {
            super.setToSleep();
            this.removeEventListeners();
        }
        //________________________________________________________________
        addEventListeners() {
            this.addEventListener(MouseEvents.MOUSE_DOWN, () => this.checkBoxClicked__EventHandler(), this);
        }
        //________________________________________________________________
        removeEventListeners() {
            this.removeEventListener(MouseEvents.MOUSE_DOWN, this);
        }
        //____________________________________________________________________
        checkBoxClicked__EventHandler() {
            if (this.data.isSelected) {
                this.setSelectedFalse();
            }
            else {
                this.setSelectedTrue();
            }
            let e = new AsEvent(EventTypes.CHANGE, false, this);
            this.dispatchEvent(e.event);
        }
        //____________________________________________________________________
        setSelectedTrue() {
            this.checkBox_chb.dataset.selected = "true";
            this.checkBox_chb.classList.add("checked");
            this.data.isSelected = true;
        }
        //____________________________________________________________________
        setSelectedFalse() {
            this.checkBox_chb.dataset.selected = "false";
            this.checkBox_chb.classList.remove("checked");
            this.data.isSelected = false;
        }
        //__________________________________________________________________
        updateView() {
            if (this.checkBoxLabel_spn && this.checkBox_chb) {
                this.checkBoxLabel_spn.innerHTML = this.data[this.mDataField];
                this.check();
            }
        }
        //__________________________________________________________________
        check() {
            if (this.data.isSelected) {
                this.checkBox_chb.classList.add("checked");
            }
            else {
                this.checkBox_chb.classList.remove("checked");
            }
        }
        //__________________________________________________________________
        setSelected(value) {
            if (value) {
                this.addClass(Styles.ITEM_RENDERER_SELECTED_CLASS_NAME);
            }
            else {
                this.removeClass(Styles.ITEM_RENDERER_SELECTED_CLASS_NAME);
            }
        }
        /****************************
         * Getters & Setters
         ****************************/
        //__________________________________________________________________
        get data() {
            return this.mData;
        }
        //__________________________________________________________________
        /* override */
        set selected(value) {
            this.setSelected(value);
            this.data.isSelected = value;
            this.updateView();
        }
        get selected() {
            return this.data.isSelected;
        }
    }
    gencom.CoCheckBox = CoCheckBox;
})(gencom || (gencom = {}));
/// <reference path="../../asBase/events/EventDispatcher.ts" />
/// <reference path="../../asBase/events/EventTypes.ts" />
var gencom;
/// <reference path="../../asBase/events/EventDispatcher.ts" />
/// <reference path="../../asBase/events/EventTypes.ts" />
(function (gencom) {
    var EventTypes = asBase.events.EventTypes;
    class DaCheckBox extends asBase.events.EventDispatcher {
        constructor() {
            super();
            this.mId = -1;
        }
        //___________________________________________________________________
        fillFromVO(iCheckBoxVO) {
            this.mName = iCheckBoxVO.Name;
            this.mChecked = iCheckBoxVO.Checked;
        }
        /****************************
         * Getters and Setters
         ****************************/
        //___________________________________________________________________
        get id() {
            return this.mId;
        }
        set id(value) {
            this.mId = value;
        }
        //___________________________________________________________________
        get name() {
            return this.mName;
        }
        set name(value) {
            this.mName = value;
        }
        //___________________________________________________________________
        get city() {
            return this.mCity;
        }
        set city(value) {
            this.mCity = value;
        }
        //___________________________________________________________________
        get isSelected() {
            return this.mChecked;
        }
        set isSelected(value) {
            if (this.mChecked != value) {
                this.mChecked = value;
                this.dispatchEvent(EventTypes.SELECTED_CHANGE, this);
            }
        }
    }
    gencom.DaCheckBox = DaCheckBox;
})(gencom || (gencom = {}));
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
///<reference path="./DaCheckBox.ts"/>
var gencom;
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
///<reference path="./DaCheckBox.ts"/>
(function (gencom) {
    var ItemRenderer = asBase.baseclasses.ItemRenderer;
    var EventTypes = asBase.events.EventTypes;
    class IrCheckBox extends ItemRenderer {
        //------------------------------
        // Members
        //------------------------------
        constructor(iData, iSkin, iContainer, iDataField) {
            super(iData, iSkin, iContainer, iDataField);
        }
        //____________________________________________________________________
        creationComplete() {
            this.checkBox_chb = this.getPart("checkBox_chb");
            this.checkBox_lbl = this.getPart("checkBox_lbl");
            super.creationComplete();
        }
        //________________________________________________________________
        addEventListeners() {
            super.addEventListeners();
            this.data.addEventListener(EventTypes.SELECTED_CHANGE, (iData) => this.selectedChangedByData__EventHandler(iData), this);
        }
        //________________________________________________________________
        removeEventListeners() {
            super.removeEventListeners();
            this.data.removeEventListener(EventTypes.SELECTED_CHANGE, this);
        }
        //__________________________________________________________________
        selectedChangedByData__EventHandler(iData) {
            this.setSelected(iData.isSelected);
        }
        //__________________________________________________________________
        updateView() {
            if (this.mIsActive && this.data) {
                super.updateView();
                this.checkBox_lbl.innerHTML = this.label;
                if (this.mIsEnabled) {
                    if (this.mSelected) {
                        this.checkBox_chb.classList.add("checked");
                    }
                    else {
                        this.checkBox_chb.classList.remove("checked");
                    }
                }
                else {
                    this.checkBox_chb.classList.remove("checked");
                }
            }
        }
        //__________________________________________________________________
        setSelected(value) {
            if (this.mSelected == value) {
                return;
            }
            super.setSelected(value);
            this.updateView();
        }
        //__________________________________________________________________
        setEnabled(value) {
            this.updateView();
        }
        /****************************
         * Getters & Setters
         ****************************/
        //__________________________________________________________________
        get data() {
            return this.mData;
        }
        //__________________________________________________________________
        get checked() {
            return this.data.isSelected;
        }
        set checked(value) {
            this.data.isSelected = value;
        }
        //__________________________________________________________________
        set selected(value) {
            if (this.mSelected != value) {
                this.checked = value;
                this.setSelected(value);
            }
        }
        get selected() {
            return this.mSelected;
        }
    }
    gencom.IrCheckBox = IrCheckBox;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var colorpicker;
    (function (colorpicker) {
        var CoComponentBase = asBase.CoComponentBase;
        var Utils = asBase.Utils;
        class CoColorPicker extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                this.mSelectedColor = "";
                this.mSelectedColorInt = -1;
                this.mColorFromMove = false;
            }
            //____________________________________________________________________
            creationComplete() {
                $(this.mContentWrapper).spectrum({
                    preferredFormat: "hex",
                    showInput: true,
                    clickoutFiresChange: false,
                    showPalette: true,
                    showSelectionPalette: false,
                    palette: [
                        [
                            "#f35d60", "#f8bb58", "#fef665", "#a3df6f", "#52b43a", "#65d9e5", "#4eb5fb", "#5778fa", "#b068e2", "#f367b0"
                        ]
                    ],
                    change: (iColor) => this.colorChanged__EventHandler(iColor),
                    move: (iColor) => this.colorChanged__EventHandler(iColor, true),
                    dragstop: (iColor) => this.colorChanged__EventHandler(iColor)
                });
                if (this.mSelectedColorInt != -1) {
                    this.selectedColor = this.mSelectedColorInt;
                }
                // $(this.mContentWrapper).change = (iColor:any)=>this.colorChanged__EventHandler(iColor);
            }
            //________________________________________________________________________________________________________
            reset() {
                this.mSelectedColor = CoColorPicker.COLOR_WHITE;
                this.mSelectedColorInt = Utils.fromHTMLColorToNumberColor(this.mSelectedColor);
                $(this.mContentWrapper).spectrum("set", this.mSelectedColor);
                /*
                if (defaultColor_chb){
                    defaultColor_chb.selected = false;
                }
                */
            }
            //________________________________________________________________________________________________________
            resetToBlack() {
                this.mSelectedColor = CoColorPicker.COLOR_BLACK;
                this.mSelectedColorInt = Utils.fromHTMLColorToNumberColor(this.mSelectedColor);
                $(this.mContentWrapper).spectrum("set", this.mSelectedColor);
            }
            //____________________________________________________________________
            colorChanged__EventHandler(iColor, iMove = false) {
                this.mSelectedColor = iColor.toHexString();
                this.mSelectedColorInt = Utils.fromHTMLColorToNumberColor(this.mSelectedColor);
                // TODO ///// defaultColor_chb.selected = false;
                this.mColorFromMove = iMove;
                let e = new colorpicker.EvColor(colorpicker.EvColor.COLOR_CHANGED, this.mSelectedColorInt, null, false, this);
                this.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            hideColorPicker() {
                $(this.mContentWrapper).spectrum("hide");
            }
            /****************************
             * Getters & Setters
             ****************************/
            //________________________________________________________________________________________________________
            get selectedColor() {
                return this.mSelectedColorInt;
            }
            set selectedColor(value) {
                this.mSelectedColorInt = value;
                this.mSelectedColor = Utils.fromNumberColorToHTMLColor(this.mSelectedColorInt);
                $(this.mContentWrapper).spectrum("set", this.mSelectedColor);
                //// TODO //////
                /*
                 if (defaultColor_chb){
                 defaultColor_chb.selected = (mSelectedColor == asBase.constants.DaGlobalConsts.DYNAMIC_OBJECT_NO_COLOR);
                 }
                 */
            }
            set selectedColorString(value) {
                this.mSelectedColor = value;
                $(this.mContentWrapper).spectrum("set", this.mSelectedColor);
                //// TODO //////
                /*
                 if (defaultColor_chb){
                 defaultColor_chb.selected = (mSelectedColor == asBase.constants.DaGlobalConsts.DYNAMIC_OBJECT_NO_COLOR);
                 }
                 */
            }
            //__________________________________________
            get colorFromMove() {
                return this.mColorFromMove;
            }
        }
        //------------------------------
        // Statics
        //------------------------------
        CoColorPicker.COLOR_WHITE = "#FFFFFF";
        CoColorPicker.COLOR_BLACK = "#000000";
        colorpicker.CoColorPicker = CoColorPicker;
    })(colorpicker = gencom.colorpicker || (gencom.colorpicker = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var colorpicker;
    (function (colorpicker) {
        var CoComponentBase = asBase.CoComponentBase;
        var DaGlobalConsts = asBase.constants.DaGlobalConsts;
        var EventTypes = asBase.events.EventTypes;
        class CoObjectColor extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                //------------------------------
                // Members
                //------------------------------
                this.mIsWithDefaultColor = false;
            }
            //____________________________________________________________________
            creationComplete() {
                this.fillColor_colpic = this.getPart("fillColor_colpic");
                this.fillColor_colpic_com = new colorpicker.CoColorPicker(this.fillColor_colpic);
                this.fillColor_colpic_com.addEventListener(colorpicker.EvColor.COLOR_CHANGED, () => this.fillColorChanged__EventHandler(), this);
                this.defaultColor_chb = this.getPart("defaultColor_chb");
                this.defaultColor_chb_com = new gencom.CoCheckBox(this.defaultColor_chb);
                this.defaultColor_chb_com.addEventListener(EventTypes.CHANGE, () => this.defaultColorChanged__EventHandler(), this);
            }
            //________________________________________________________________________________________________________
            fillColorChanged__EventHandler() {
                if (this.mIsWithDefaultColor) {
                    this.defaultColor_chb_com.selected = false;
                }
                let e = new colorpicker.EvObjectColor(colorpicker.EvObjectColor.PROPERTY_FILL_COLOR, true, this);
                e.fillColor = this.fillColor_colpic_com.selectedColor;
                this.dispatchEvent(e.event);
            }
            //________________________________________________________________________________________________________
            defaultColorChanged__EventHandler() {
                this.fillColor_colpic_com.reset();
                let e = new colorpicker.EvObjectColor(colorpicker.EvObjectColor.PROPERTY_FILL_COLOR, true, this);
                e.fillColor = DaGlobalConsts.DYNAMIC_OBJECT_NO_COLOR;
                this.dispatchEvent(e.event);
            }
            //________________________________________________________________________________________________________
            resetToBlack() {
                this.fillColor_colpic_com.resetToBlack();
                let e = new colorpicker.EvObjectColor(colorpicker.EvObjectColor.PROPERTY_FILL_COLOR, true, this);
                e.fillColor = this.fillColor_colpic_com.selectedColor;
                this.dispatchEvent(e.event);
            }
            /****************************
             * Getters & Setters
             ****************************/
            //_____________________________________________________________________________________________
            set isWithDefaultColor(value) {
                this.mIsWithDefaultColor = value;
            }
            //_____________________________________________________________________________________________
            get selectedColor() {
                return this.fillColor_colpic_com.selectedColor;
            }
            set selectedColor(value) {
                this.fillColor_colpic_com.selectedColor = value;
            }
        }
        colorpicker.CoObjectColor = CoObjectColor;
    })(colorpicker = gencom.colorpicker || (gencom.colorpicker = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var colorpicker;
    (function (colorpicker) {
        var AsEvent = asBase.events.AsEvent;
        class EvColor extends AsEvent {
            constructor(type, iSelectedColor, iObjectType = null, bubbles = false, owner) {
                super(type, bubbles, owner);
                this.mObjectType = iObjectType;
                this.mSelectedColor = iSelectedColor;
            }
            /****************************
             * Getters and Setters
             ****************************/
            //________________________________________________________________________________________________________
            get selectedColor() {
                return this.mSelectedColor;
            }
            //________________________________________________________________________________________________________
            get objectType() {
                return this.mObjectType;
            }
        }
        // event
        EvColor.COLOR_CHANGED = "ColorChanged__Event";
        colorpicker.EvColor = EvColor;
    })(colorpicker = gencom.colorpicker || (gencom.colorpicker = {}));
})(gencom || (gencom = {}));
///<reference path="../../asBase/events/AsEvent.ts"/>
var gencom;
///<reference path="../../asBase/events/AsEvent.ts"/>
(function (gencom) {
    var colorpicker;
    (function (colorpicker) {
        var AsEvent = asBase.events.AsEvent;
        class EvObjectColor extends AsEvent {
            constructor(type, bubbles = false, iOwner) {
                super(type, bubbles, iOwner);
            }
            /****************************
             * Getters and Setters
             ****************************/
            //________________________________________________________________________________________________________
            get fillColor() {
                return this.mFillColor;
            }
            set fillColor(value) {
                this.mFillColor = value;
            }
        }
        // event
        EvObjectColor.PROPERTY_FILL_COLOR = "PropertyFillColorChanged__Event";
        colorpicker.EvObjectColor = EvObjectColor;
    })(colorpicker = gencom.colorpicker || (gencom.colorpicker = {}));
})(gencom || (gencom = {}));
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
/// <reference path="../../asBase/SkinsCss.ts" />
/// <reference path="../../asBase/collections/DaArrayCollection.ts" />
///<reference path="../../asBase/events/KeyboardCodes.ts"/>
///<reference path="../list/CoList.ts"/>
///<reference path="../../asBase/constants/DaUnderDevelopment.ts"/>
///<reference path="../../asBase/MoFocusManager.ts"/>
///<reference path="../../asBase/collections/ArrayCollection.ts"/>
///<reference path="../list/EvList.ts"/>
var gencom;
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
/// <reference path="../../asBase/SkinsCss.ts" />
/// <reference path="../../asBase/collections/DaArrayCollection.ts" />
///<reference path="../../asBase/events/KeyboardCodes.ts"/>
///<reference path="../list/CoList.ts"/>
///<reference path="../../asBase/constants/DaUnderDevelopment.ts"/>
///<reference path="../../asBase/MoFocusManager.ts"/>
///<reference path="../../asBase/collections/ArrayCollection.ts"/>
///<reference path="../list/EvList.ts"/>
(function (gencom) {
    var ArrayCollection = asBase.baseclasses.ArrayCollection;
    var EvItemRenderer = asBase.collections.EvItemRenderer;
    var EvList = gencom.list.EvList;
    var EventTypes = asBase.events.EventTypes;
    var KeyboardCodes = asBase.events.KeyboardCodes;
    var CoComponentBase = asBase.CoComponentBase;
    var MouseEvents = asBase.events.MouseEvents;
    var SkinsCss = asBase.SkinsCss;
    var AsEvent = asBase.events.AsEvent;
    var Utils = asBase.Utils;
    var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
    var MoFocusManager = asBase.MoFocusManager;
    class CoBasicComboBox extends CoComponentBase {
        constructor(iContainer, iSkin) {
            super(null, iSkin ? iSkin : SkinsCss.SKINS_GENCOM + "combobox/SkBasicComboBox.html", iContainer);
            //------------------------------
            // Const
            //------------------------------
            this.IS_MULTI_SELECTION = false;
            this.DROPDOWN_OPENED = "dropdown-opened";
            this.DROPDOWN_BOTTOM = "dropdown-open-bottom";
            this.PAGE_UP_STEP = 5;
            this.mPlaceholder = "";
            this.mPattern = "";
            this.mTopTitle = "";
            this.mSearchCurrentValueLowercase = "";
            this.mSearchPrevValueLowercase = "";
            this.mSearchMode = false;
            this.mEditable = false;
            this.mAllowSearch = true;
            this.mFirstKeyDown = true;
            this.mIsNeedToUpdate = true;
            this.mDirection = 1;
            this.mListIterator = -1;
            this.mTutorialIndex = -1;
            this.mMaxLines = 0;
            this.mInitSelectedIndex = -1;
            this.mIsWithFloatingPromt = false;
            this.mGetLabelCallbacksHash = {};
        }
        //_____________________________________________________
        loadSkin(pTo, pHTMLPath, pOnLoad) {
            asBase.collections.IrSkinLoader.loadSkin(pHTMLPath, pOnLoad, pTo);
        }
        //__________________________________________________________________
        creationComplete() {
            this.comboBox_txti = this.getPart("comboBox_txti");
            this.comboBox_txti.readOnly = !this.mAllowSearch;
            this.setEnabled(this.mIsEnabled);
            this.comboBoxList_div = this.getPart("comboBoxList_div");
            this.topTitle_spn = this.getPart("topTitle_spn");
            this.topTitle_spn.innerHTML = this.mTopTitle;
            if (this.mLabelToItemFunc == null) {
                this.mLabelToItemFunc = (iLabel) => this.labelToItem(iLabel);
            }
            // create list
            this.mList_com = this.createListComponent();
            this.mList_com.irClass = this.mIrClassPath;
            this.mList_com.irSkin = this.mIrSkinPath;
            this.mList_com.labelToItem_Func = this.mLabelToItemFunc;
            this.addComboMaxLines();
            this.setToActive();
            this.updateView();
        }
        //________________________________________________________________
        addComboMaxLines() {
            if (this.mMaxLines > 0 && this.mList_com) {
                this.mList_com.addClass(asBase.Styles.COMBO_BOX_MAX_LINES_CLASS_NAME + this.mMaxLines);
            }
        }
        //________________________________________________________________
        createListComponent() {
            return new gencom.list.CoList(this.comboBoxList_div, this.IS_MULTI_SELECTION);
        }
        //________________________________________________________________
        setToActive() {
            this.addEventListeners();
        }
        //________________________________________________________________
        setToSleep() {
            this.removeEventListeners();
        }
        //________________________________________________________________
        addEventListeners() {
            // list
            this.mList_com.addEventListener(EvList.LIST_BUILDER_COMPLETE, (event) => this.listBuildComplete__EventHandler(event), this);
            this.mList_com.addEventListener(ArrayCollection.COLLECTION_REFRESHED, (event) => this.collectionRefreshed__EventHandler(event), this);
            this.searchFilter_Func = (iDaItem) => this.filterSearch(iDaItem);
            this.irCreationComplete_Func = (event) => this.irCreationComplete(event);
            // input
            this.inputKeyUp__EventHandler_Func = (event) => this.inputKeyUp__EventHandler(event);
            this.comboBox_txti.addEventListener(EventTypes.KEY_UP, this.inputKeyUp__EventHandler_Func);
            this.inputKeyDown__EventHandler_Func = (event) => this.inputKeyDown__EventHandler(event);
            this.comboBox_txti.addEventListener(EventTypes.KEY_DOWN, this.inputKeyDown__EventHandler_Func);
            this.inputBlur__EventHandler_Func = (event) => this.inputBlur__EventHandler(event);
            this.comboBox_txti.addEventListener(EventTypes.FOCUSOUT, this.inputBlur__EventHandler_Func);
            this.inputFocusIn__EventHandler_Func = (event) => this.inputFocusIn__EventHandler(event);
            this.comboBox_txti.addEventListener(EventTypes.FOCUSIN, this.inputFocusIn__EventHandler_Func);
            this.inputClick__EventHandler_Func = () => this.inputClick__EventHandler();
            this.comboBox_txti.addEventListener(MouseEvents.CLICK, this.inputClick__EventHandler_Func);
        }
        //________________________________________________________________
        removeEventListeners() {
            // list
            this.mList_com.removeAllOwnerEvents(this);
            this.searchFilter_Func = null;
            this.irCreationComplete_Func = null;
            // input
            this.comboBox_txti.removeEventListener(EventTypes.KEY_DOWN, this.inputKeyDown__EventHandler_Func);
            this.inputKeyDown__EventHandler_Func = null;
            this.comboBox_txti.removeEventListener(EventTypes.KEY_UP, this.inputKeyUp__EventHandler_Func);
            this.inputKeyUp__EventHandler_Func = null;
            this.comboBox_txti.removeEventListener(EventTypes.FOCUSOUT, this.inputBlur__EventHandler_Func);
            this.inputBlur__EventHandler_Func = null;
            this.comboBox_txti.removeEventListener(EventTypes.FOCUSIN, this.inputFocusIn__EventHandler_Func);
            this.inputFocusIn__EventHandler_Func = null;
            this.comboBox_txti.removeEventListener(MouseEvents.CLICK, this.inputClick__EventHandler_Func);
            this.inputClick__EventHandler_Func = null;
            asBase.events.EventManager.removeAllOwnerEvents(this);
        }
        //_____________________________________________________________________________
        irDataChanged__EventListener(event) {
            this.updateView();
        }
        //_____________________________________________________________________________
        windowResized__EventHandler() {
            if (Utils.getMobileOperatingSystem() == Utils.NOT_PHONE) {
                this.exitDropdown();
            }
            else {
                setTimeout(() => {
                    this.closeDropdown();
                    this.setDropdownDirection();
                    this.openDropdown();
                }, 100);
            }
        }
        //_____________________________________________________________________________
        exitDropdown() {
            if (this.mIsDropdownOpen) {
                this.keyEsc();
            }
        }
        //_____________________________________________________________________________
        floatWindowMoved__EventHandler() {
            if (Utils.getMobileOperatingSystem() == Utils.NOT_PHONE) {
                this.exitDropdown();
            }
        }
        //_____________________________________________________________________________
        windowMouseWheel__EventHandler(event) {
            let aTarget = event.target;
            if (Utils.isElementIn(this.contentWrapper, aTarget)) {
                return;
            }
            this.exitDropdown();
        }
        //_______________________________________________________________
        changeSystemUnits() {
            if (this.mDataProvider == null) {
                return;
            }
            for (let i = 0; i < this.mDataProvider.length; ++i) {
                this.mDataProvider.getItemAt(i).updateLabelTexts();
            }
            this.updateView();
        }
        //_______________________________________________________________
        updateView() {
            this.setPlaceHolder();
            this.setPattern();
            if (this.mList_com && this.mDataProvider) {
                if (this.mIsNeedToUpdate) {
                    this.mIsNeedToUpdate = false;
                    this.mList_com.dataField = this.mDataField;
                    this.mList_com.dataProvider = this.mDataProvider;
                }
                else {
                    this.updateItem(this.selectedItem);
                }
            }
        }
        //________________________________________________________________
        setPlaceHolder() {
            if (this.comboBox_txti && this.comboBox_txti.placeholder != this.mPlaceholder) {
                this.comboBox_txti.placeholder = this.mPlaceholder;
            }
        }
        //________________________________________________________________
        setPattern() {
            if (this.comboBox_txti && this.comboBox_txti.pattern != this.mPattern) {
                this.comboBox_txti.pattern = this.mPattern;
            }
        }
        //________________________________________________________________
        setTopTitle() {
            if (this.topTitle_spn) {
                this.topTitle_spn.innerHTML = this.mTopTitle;
            }
        }
        //________________________________________________________________
        hoverItem(iData, iIsEnsure = true) {
            if (iData) {
                this.selectItemView(iData, iIsEnsure);
                this.mListIterator = this.hoveredIndex;
            }
        }
        //________________________________________________________________
        updateItem(iData) {
            this.selectItemView(iData);
            this.mListIterator = this.selectedIndex;
        }
        //________________________________________________________________
        selectItemView(iData, iIsEnsure = true) {
            if (iData != null) {
                let aLabel = this.getLabel(iData, (iData, iIsEnsure = true) => this.selectItemView(iData, iIsEnsure), iData, iIsEnsure);
                if (aLabel) {
                    this.comboBox_txti.value = aLabel;
                    if (iIsEnsure) {
                        this.ensureOnSelection(iData);
                    }
                }
                else {
                    if (DaUnderDevelopment.SHOW_COMBOBOX_RELATED) {
                        if (DaUnderDevelopment.SHOW_CONSOLE_LOG) {
                            console.log("CoBasicComboBox::selectItemView() wait for ir to be initialized");
                        }
                    }
                }
            }
            else {
                this.clearInput();
            }
        }
        //________________________________________________________________
        inputClick__EventHandler() {
            if (this.mIsOpenedByFocusIn) {
                return;
            }
            if (this.mIsDropdownOpen) {
                this.keyEsc();
            }
        }
        //________________________________________________________________
        inputFocusIn__EventHandler(event) {
            this.mIsOpenedByFocusIn = true;
            if (this.mIsWithFloatingPromt) {
                this.topTitle_spn.innerHTML = this.comboBox_txti.placeholder;
                this.addClass("floating-promt");
            }
            if (!this.mIsEnabled) {
                return;
            }
            this.openCombo();
            setTimeout(() => this.resetFocusIn(), 500);
        }
        //________________________________________________________________
        resetFocusIn() {
            this.mIsOpenedByFocusIn = false;
        }
        //________________________________________________________________
        openCombo() {
            this.mPrevSelectedItem = this.selectedItem;
            if (this.mIsDropdownOpen) {
                this.keyEsc();
            }
            else {
                this.openDropdown();
            }
        }
        //________________________________________________________________
        inputBlur__EventHandler(event) {
            if (!this.mIsEnabled) {
                return;
            }
            if (this.mIsWithFloatingPromt && this.comboBox_txti.value == "") {
                this.topTitle_spn.innerHTML = "";
                this.removeClass("floating-promt");
            }
            if (this.mIsEditing) {
                this.setNearestItem();
                this.mDirection = 1;
                this.mIsEditing = false;
            }
            else if (this.mListIterator == -1 && this.mPrevSelectedItem != null) {
                this.reselectPrevSelection();
            }
            this.closeCombo();
        }
        //________________________________________________________________
        closeCombo() {
            this.resetOnBlur();
            this.closeDropdown();
        }
        //________________________________________________________________
        resetOnBlur() {
            this.clearSearchMode();
            this.cancelHover();
            this.mPrevSelectedItem = null;
            this.mFirstKeyDown = true;
        }
        //_______________________________________________________________
        addWindowListeners() {
            this.floatWindowMoved__EventHandler_Func = () => this.floatWindowMoved__EventHandler();
            asBase.events.EventManager.addEventListener(EventTypes.FLOAT_WINDOW_HEADER_MOUSE_DOWN, this.floatWindowMoved__EventHandler_Func, this);
            this.windowResized__EventHandler_Func = () => this.windowResized__EventHandler();
            window.addEventListener("resize", this.windowResized__EventHandler_Func);
            if (this.mListenToWheelMove) {
                this.windowMouseWheel__EventHandler_Func = (event) => this.windowMouseWheel__EventHandler(event);
                window.addEventListener(MouseEvents.MOUSE_WHEEL, this.windowMouseWheel__EventHandler_Func);
            }
        }
        //_______________________________________________________________
        removeWindowListeners() {
            asBase.events.EventManager.removeEventListener(EventTypes.FLOAT_WINDOW_HEADER_MOUSE_DOWN, this.floatWindowMoved__EventHandler_Func);
            this.floatWindowMoved__EventHandler_Func = null;
            window.removeEventListener("resize", this.windowResized__EventHandler_Func);
            this.windowResized__EventHandler_Func = null;
            if (this.mListenToWheelMove) {
                window.removeEventListener(MouseEvents.MOUSE_WHEEL, this.windowMouseWheel__EventHandler_Func);
                this.windowMouseWheel__EventHandler_Func = null;
            }
        }
        //_______________________________________________________________
        closeDropdown() {
            this.mIsDropdownOpen = false;
            if (this.comboBox_txti.classList.contains(this.DROPDOWN_OPENED)) {
                this.comboBox_txti.classList.remove(this.DROPDOWN_OPENED);
            }
            this.mList_com.removeClass(this.DROPDOWN_BOTTOM);
            this.removeWindowListeners();
        }
        //_______________________________________________________________
        openDropdown() {
            this.mIsDropdownOpen = true;
            this.removeDropdownFilterFunction();
            if (this.mAllowSearch) {
                this.comboBox_txti.select();
            }
            this.setDropdownDirection();
            if (!this.comboBox_txti.classList.contains(this.DROPDOWN_OPENED)) {
                this.comboBox_txti.classList.add(this.DROPDOWN_OPENED);
            }
            this.ensureItemIsVisible(this.selectedItem);
            this.addWindowListeners();
        }
        //________________________________________________________________
        removeDropdownFilterFunction() {
            if (this.mDataProvider && this.mDataProvider.filterFunction) {
                this.mDataProvider.filterFunction = this.mComboFilterFunction;
                this.mDataProvider.refresh();
            }
        }
        //________________________________________________________________
        setDropdownDirection() {
            let aWindowInnerHeight = window.innerHeight;
            let aComboTxtiRect = this.comboBox_txti.getBoundingClientRect();
            let aComboListRect = this.comboBoxList_div.getBoundingClientRect();
            let aExceedsTop = (aComboTxtiRect.top - aComboListRect.height < 0);
            let aExceedsBottom = (aComboTxtiRect.bottom + aComboListRect.height > aWindowInnerHeight);
            let aIsOpenAtTop = aExceedsBottom && !aExceedsTop;
            this.comboBoxList_div.style.left = aComboTxtiRect.left + "px";
            this.comboBoxList_div.style.width = aComboTxtiRect.width + "px";
            this.comboBoxList_div.style.top = aIsOpenAtTop ? (aComboTxtiRect.top - aComboListRect.height) + "px" : aComboTxtiRect.bottom + "px";
            this.mList_com.addClass(this.DROPDOWN_BOTTOM);
            if (this.mListIterator == -1) {
                this.mListIterator = (aIsOpenAtTop) ? this.length : -1;
            }
        }
        //________________________________________________________________
        storeSelectedItem() {
            if (this.mFirstKeyDown) {
                this.mFirstKeyDown = false;
                this.mPrevSelectedItem = this.selectedItem;
            }
        }
        //________________________________________________________________
        inputKeyDown__EventHandler(event) {
            asBase.Globals.isAltDown = event.altKey;
            asBase.Globals.isControlDown = event.ctrlKey || event.metaKey;
            asBase.Globals.isShiftDown = event.shiftKey;
            if (!this.mIsEnabled) {
                return;
            }
            this.storeSelectedItem();
            switch (event.which) {
                case KeyboardCodes.ENTER:
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    this.keyEnter();
                    break;
                case KeyboardCodes.TAB:
                    if (!MoFocusManager.isIncluded(this.getFocusField())) {
                        event.stopImmediatePropagation();
                        event.preventDefault();
                    }
                    this.keyEnter();
                    break;
                case KeyboardCodes.ESC:
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    this.keyEsc();
                    break;
                case KeyboardCodes.HOME:
                    /*if(event.ctrlKey || event.metaKey) {
                     event.preventDefault();
                     if (this.length > 0) {
                     this.selectedItem = this.dataProvider.currentArray[0].ir;
                     }
                     }*/
                    break;
                case KeyboardCodes.END:
                    /*if(event.ctrlKey || event.metaKey){
                     event.preventDefault();
                     if (this.length > 0) {
                     this.selectedItem = this.dataProvider.currentArray[this.length - 1].ir;
                     }
                     }*/
                    break;
                case KeyboardCodes.ARROW_DOWN:
                    this.hoverNextIr(1);
                    break;
                case KeyboardCodes.ARROW_UP:
                    this.hoverNextIr(-1);
                    break;
                case KeyboardCodes.PAGE_UP:
                    this.hoverNextIr(-1, this.PAGE_UP_STEP);
                    break;
                case KeyboardCodes.PAGE_DOWN:
                    this.hoverNextIr(1, this.PAGE_UP_STEP);
                    break;
                case KeyboardCodes.DELETE:
                case KeyboardCodes.BACKSPACE:
                default:
                    this.mIsEditing = true;
                    break;
            }
        }
        //________________________________________________________________
        keyEnter() {
            this.comboBox_txti.blur();
            this.mDirection = 1;
            if (!this.mIsWaitingForNewAddedItem) {
                this.dispatchComboEnterClicked();
            }
        }
        //________________________________________________________________
        keyEsc() {
            this.mIsEditing = false;
            this.comboBox_txti.blur();
            this.mDirection = 1;
            this.closeDropdown();
            this.dispatchComboEscClicked();
        }
        //________________________________________________________________
        inputKeyUp__EventHandler(event) {
            if (!this.mIsEnabled) {
                return;
            }
            if (this.mAllowSearch) {
                if (event.which != KeyboardCodes.ENTER && event.which != KeyboardCodes.TAB && event.which != KeyboardCodes.ESC && !(event.ctrlKey || event.metaKey)) {
                    if (this.isInputValid(event.which)) {
                        this.searchByText(this.comboBox_txti.value);
                    }
                }
            }
        }
        //_______________________________________________________________
        isInputValid(iWhichKey) {
            let aResult = false;
            if ((iWhichKey >= KeyboardCodes.LOWEST_INPUT_CHAR && iWhichKey <= KeyboardCodes.HIGHEST_INPUT_CHAR) ||
                iWhichKey == KeyboardCodes.SPACE ||
                iWhichKey == KeyboardCodes.HYPHEN ||
                iWhichKey == KeyboardCodes.HOME ||
                iWhichKey == KeyboardCodes.END ||
                iWhichKey == KeyboardCodes.BACKSPACE ||
                iWhichKey == KeyboardCodes.DELETE) {
                aResult = true;
            }
            return aResult;
        }
        //_______________________________________________________________
        hoverNextIr(iDirection, iStep = 1) {
            this.mDirection = iDirection;
            this.nextIterator(iStep);
            this.setHoveredIndex(this.mListIterator);
        }
        //_______________________________________________________________
        nextIterator(iStep) {
            this.mListIterator += (this.mDirection * iStep);
            if (this.mListIterator < 0) {
                this.mListIterator = 0;
            }
            else if (this.mListIterator >= this.length) {
                this.mListIterator = this.length - 1;
            }
        }
        //_______________________________________________________________
        ensureItemIsVisible(iData) {
            if (this.mList_com) {
                this.mList_com.ensureItemIsVisible(iData);
            }
        }
        //_______________________________________________________________
        ensureIndexIsVisible(iIndex) {
            if (this.mList_com) {
                this.mList_com.ensureIndexIsVisible(iIndex);
            }
        }
        //_______________________________________________________________
        setNearestItem() {
            let aInput = this.comboBox_txti.value;
            let aIsFound = false;
            let aIsInputEmpty = aInput == "";
            let aData;
            if (!aIsInputEmpty) {
                let aDataArray = this.mDataProvider.toDataArray();
                if (aDataArray) {
                    for (let i = 0; i < aDataArray.length; ++i) {
                        let aLabel = this.getLabel(aDataArray[i], () => this.setNearestItem());
                        if (aLabel) {
                            if (aInput.toLowerCase() == aLabel.toLowerCase()) {
                                aData = this.mDataProvider.getItemAt(i);
                                this.selectedItem = aData;
                                this.mList_com.selectedItemOnFilterRemove = aData;
                                this.clearSearchMode();
                                this.comboBox_txti.value = aLabel;
                                aIsFound = true;
                                this.dispatchComboChangedEvent();
                                break;
                            }
                        }
                        else {
                            if (DaUnderDevelopment.SHOW_COMBOBOX_RELATED) {
                                if (DaUnderDevelopment.SHOW_CONSOLE_LOG) {
                                    console.log("CoBasicComboBox::setNearestItem() wait for ir to be initialized");
                                }
                            }
                            return;
                        }
                    }
                }
                if (!aIsFound) {
                    if (this.mEditable) {
                        this.clearSearchMode();
                        this.mIsWaitingForNewAddedItem = true;
                        this.mList_com.dataProvider.notifyOnItemAdded = true;
                        this.mList_com.addLabelToItem(aInput);
                        return;
                    }
                    else if (this.dataProvider.length > 0) {
                        aData = this.dataProvider.getItemAt(0);
                        this.mList_com.selectedItemOnFilterRemove = aData;
                        this.chooseFirstItem(aData);
                        this.updateItem(aData);
                        return;
                    }
                    else {
                        this.reselectPrevSelection();
                    }
                }
            }
            else { // input is empty
                this.selectedIndex = -1;
                this.mPrevSelectedItem = null;
                this.dispatchComboChangedEvent();
            }
        }
        //__________________________________________________________________
        chooseFirstItem(iData) {
            this.mList_com.selectedItem = iData;
        }
        //__________________________________________________________________
        labelToItem(iLabel) {
            let aNewData = this.dataProvider.cloneTypicalData();
            this.setLabel(iLabel, aNewData);
            return aNewData;
        }
        //__________________________________________________________________
        removeAll() {
            if (this.mList_com) {
                this.mList_com = null;
                this.mDataProvider = null;
            }
        }
        //__________________________________________________________________
        removeView() {
        }
        //__________________________________________________________________
        resetField() {
            this.clearSearchMode();
            this.clearInput();
            this.mDirection = 1;
            this.mFirstKeyDown = true;
        }
        //__________________________________________________________________
        clearInput() {
            if (this.comboBox_txti) {
                this.comboBox_txti.value = "";
            }
        }
        //__________________________________________________________________
        reselectPrevSelection() {
            this.removeDropdownFilterFunction();
            if (this.mPrevSelectedItem != null) {
                if (this.selectedItem != this.mPrevSelectedItem) {
                    this.selectItemView(this.mPrevSelectedItem);
                    this.selectedItem = this.mPrevSelectedItem;
                }
                this.mPrevSelectedItem = null;
            }
            else {
                this.clearInput();
            }
        }
        //________________________________________________________________
        getLabel(iItem, iCallBack = null, ...callbackArgs) {
            if (this.mDataField != null) {
                return iItem[this.mDataField];
            }
            let aItemLabel;
            let aIr = this.mDataProvider.getItemRendererByData(iItem);
            if (aIr) {
                if (aIr.initialized) {
                    aItemLabel = aIr.label;
                }
                else if (iCallBack) {
                    this.mGetLabelCallbacksHash[aIr.data[aIr.dataField]] = { func: iCallBack, args: callbackArgs };
                    aIr.addEventListener(EventTypes.CREATION_COMPLITE, this.irCreationComplete_Func, this);
                }
            }
            return aItemLabel;
        }
        //________________________________________________________________
        irCreationComplete(event) {
            let aIr = event.detail.sender;
            let aHashObj = this.mGetLabelCallbacksHash[aIr.data[aIr.dataField]];
            aIr.removeEventListener(EventTypes.CREATION_COMPLITE, this);
            if (aHashObj && aHashObj.func) {
                if (aHashObj.args && aHashObj.args.length > 0) {
                    aHashObj.func(...aHashObj.args);
                }
                else {
                    aHashObj.func();
                }
                delete (this.mGetLabelCallbacksHash[aIr.data[aIr.dataField]]);
            }
        }
        //________________________________________________________________
        setLabel(iLabel, iItem) {
            let aHasDataField = iItem.hasOwnProperty(this.mDataField);
            if (aHasDataField) {
                iItem[this.mDataField] = iLabel;
            }
            else { // allow plain array of strings
                iItem = iLabel;
            }
        }
        //_______________________________________________________________
        collectionFilterSet__EventHandler(event) {
            this.mListIterator = 0;
            this.ensureIndexIsVisible(this.mListIterator);
        }
        //_______________________________________________________________
        collectionRefreshed__EventHandler(event) {
            if (!this.mIsEditing) {
                this.updateView();
            }
        }
        //_______________________________________________________________
        collectionFilterRemoved__EventHandler(event) {
            this.mListIterator = this.selectedIndex;
            this.ensureIndexIsVisible(this.mListIterator);
            this.updateView();
        }
        //_______________________________________________________________
        listIrOver__EventHandler(event) {
            this.cancelHover();
        }
        //_______________________________________________________________
        listIrSelectionChanged__EventHandler(event) {
            let aData = event.detail.sender;
            if (aData == null) {
                if (this.mFirstKeyDown) {
                    this.resetField();
                }
                else {
                    this.clearInput();
                }
                this.dispatchComboChangedEvent();
                return;
            }
            this.actionsOnSelectionChange();
        }
        //_______________________________________________________________
        ensureOnSelection(iData) {
            this.ensureItemIsVisible(iData);
            this.mDirection = 1;
            let aHoveredIndex = this.hoveredIndex;
            this.mListIterator = aHoveredIndex > -1 ? aHoveredIndex : this.selectedIndex;
        }
        //_______________________________________________________________
        actionsOnSelectionChange() {
            this.updateView();
            this.clearError();
            this.dispatchComboChangedEvent();
        }
        //_______________________________________________________________
        cancelHover(iIsEnsure = false) {
            if (this.hoveredIndex > -1) {
                this.setHoveredIndex(-1, iIsEnsure);
                this.mListIterator = this.selectedIndex;
            }
        }
        //________________________________________________________________
        dispatchComboEnterClicked() {
            let e = new AsEvent(gencom.EvComboBox.COMBO_ENTER_CLICKED_AC, true, this);
            this.dispatchEvent(e.event);
        }
        //________________________________________________________________
        dispatchComboEscClicked() {
            let e = new AsEvent(gencom.EvComboBox.COMBO_ESC_CLICKED_AC, true, this);
            this.dispatchEvent(e.event);
        }
        //_______________________________________________________________
        dispatchComboChangedEvent() {
            let aEvent = new AsEvent(gencom.EvComboBox.COMBO_CHANGED_AC, false, this);
            this.dispatchEvent(aEvent.event);
            this.dispatchComboEnterClicked();
        }
        //_______________________________________________________________
        dispatchComboAddedEvent() {
            let aEvent = new AsEvent(gencom.EvComboBox.COMBO_ADDED_AC, false, this);
            this.dispatchEvent(aEvent.event);
            this.dispatchComboEnterClicked();
        }
        //_______________________________________________________________
        dispatchComboRemovedEvent() {
            let aEvent = new AsEvent(gencom.EvComboBox.COMBO_REMOVED_AC, false, this);
            this.dispatchEvent(aEvent.event);
        }
        //_______________________________________________________________
        dispatchComboListBuildCompleteEvent() {
            let aEvent = new AsEvent(gencom.EvComboBox.COMBO_BUILD_COMPLETE_AC, false, this);
            this.dispatchEvent(aEvent.event);
        }
        //_______________________________________________________________
        dispose() {
            this.setToSleep();
            this.removeAll();
            this.resetField();
        }
        // search
        //________________________________________________________________
        searchByText(iText) {
            this.mSearchMode = true;
            this.mSearchPrevValueLowercase = this.mSearchCurrentValueLowercase;
            this.mSearchCurrentValueLowercase = iText.toLowerCase();
            this.mList_com.unselectSelected();
            this.mDataProvider.filterFunction = this.searchFilter_Func;
            this.mDataProvider.refresh();
            this.mListIterator = -1;
            this.setDropdownDirection();
        }
        //________________________________________________________________________________________
        isSearchInName(iName) {
            let aInd = iName.toLowerCase().indexOf(this.mSearchCurrentValueLowercase);
            return aInd == 0;
        }
        //_______________________________________________________________
        filterSearch(iDaItem) {
            let aIsFound = false;
            if (this.mComboFilterFunction) {
                aIsFound = this.mComboFilterFunction(iDaItem);
                if (!aIsFound) {
                    return false;
                }
            }
            let aItem = iDaItem.data;
            let aLabel = this.getLabel(aItem);
            if (aLabel) {
                aIsFound = this.isSearchInName(aLabel);
            }
            else {
                if (DaUnderDevelopment.SHOW_COMBOBOX_RELATED) {
                    if (DaUnderDevelopment.SHOW_CONSOLE_LOG) {
                        console.log("CoBasicComboBox::filterSearch() ir not initialized");
                    }
                }
            }
            return aIsFound;
        }
        //________________________________________________________________________________________
        clearSearchMode() {
            if (this.mSearchMode) {
                this.mSearchPrevValueLowercase = "";
                this.mSearchCurrentValueLowercase = "";
                this.mSearchMode = false;
            }
        }
        //________________________________________________________________
        listBuildComplete__EventHandler(event) {
            this.mList_com.removeEventListener(EvList.LIST_BUILDER_COMPLETE, this);
            this.addListEventListener();
            this.selectInited();
            this.updateView();
            this.dispatchComboListBuildCompleteEvent();
        }
        //________________________________________________________________
        addDpListener() {
            this.mDataProvider.addEventListener(ArrayCollection.COLLECTION_ITEM_ADDED, (iData) => this.labelToItemAdded__EventHandler(iData), this);
        }
        //________________________________________________________________
        removeDpListener() {
            this.mDataProvider.removeEventListener(ArrayCollection.COLLECTION_ITEM_ADDED, this);
        }
        //________________________________________________________________
        labelToItemAdded__EventHandler(iData) {
            this.mList_com.dataProvider.notifyOnItemAdded = false;
            setTimeout((iData) => this.labelToItemAdded(iData), 0, iData);
        }
        //________________________________________________________________
        labelToItemAdded(iData) {
            this.mIsWaitingForNewAddedItem = false;
            this.mList_com.dataProvider.refresh();
            this.selectedItem = iData;
            this.dispatchComboAddedEvent();
        }
        //________________________________________________________________
        addListEventListener() {
            this.mList_com.addEventListener(EvItemRenderer.IR_SELECTION_CHANGED, (event) => this.listIrSelectionChanged__EventHandler(event), this);
            this.mList_com.addEventListener(EvItemRenderer.IR_MOUSE_OVER, (event) => this.listIrOver__EventHandler(event), this);
            this.mList_com.addEventListener(ArrayCollection.COLLECTION_FILTER_SET, (event) => this.collectionFilterSet__EventHandler(event), this);
            this.mList_com.addEventListener(ArrayCollection.COLLECTION_FILTER_REMOVED, (event) => this.collectionFilterRemoved__EventHandler(event), this);
            this.mList_com.addEventListener(EvItemRenderer.IR_DATA_CHANGED, (event) => this.irDataChanged__EventListener(event), this);
            this.mList_com.addEventListener(MouseEvents.MOUSE_DOWN, (event) => this.mouseDown__EventListener(event), this);
        }
        //________________________________________________________________
        mouseDown__EventListener(event) {
            if (event.target == this.mList_com.contentWrapper) {
                event.stopImmediatePropagation();
                event.preventDefault();
            }
        }
        //________________________________________________________________
        selectInited() {
            if (this.mInitSelectedItem) {
                this.mList_com.selectedItem = this.mInitSelectedItem;
                this.mInitSelectedItem = null;
            }
            else if (this.mInitSelectedIndex > -1) {
                this.mList_com.selectedIndex = this.mInitSelectedIndex;
                this.mInitSelectedIndex = -1;
            }
        }
        //________________________________________________________________
        setError() {
            if (this.comboBox_txti) {
                Utils.setInputError(this.comboBox_txti);
            }
        }
        //________________________________________________________________
        clearError() {
            if (this.comboBox_txti) {
                Utils.clearInputError(this.comboBox_txti);
            }
        }
        //________________________________________________________________
        focus() {
            this.comboBox_txti.focus();
        }
        //________________________________________________________________
        setEnabled(value) {
            super.setEnabled(value);
            if (this.comboBox_txti) {
                if (value) {
                    if (this.comboBox_txti.classList.contains(SkinsCss.DISABLED)) {
                        this.comboBox_txti.classList.remove(SkinsCss.DISABLED);
                    }
                }
                else {
                    if (!this.comboBox_txti.classList.contains(SkinsCss.DISABLED)) {
                        this.comboBox_txti.classList.add(SkinsCss.DISABLED);
                    }
                }
                this.comboBox_txti.disabled = !value;
            }
        }
        //_______________________________________________________________
        setHoveredIndex(value, iIsEnsure = true) {
            if (this.mList_com && this.mList_com.hoveredIndex != value) {
                this.mList_com.hoveredIndex = value;
                let aHoveredItem = this.hoveredItem;
                if (aHoveredItem) {
                    this.hoverItem(aHoveredItem, iIsEnsure);
                }
                else {
                    this.selectItemView(this.selectedItem, iIsEnsure);
                    this.mListIterator = this.selectedIndex;
                }
                this.mIsEditing = true;
            }
        }
        //_______________________________________________________________
        getFocusField() {
            return this.comboBox_txti;
        }
        //***********************
        //       get/set        *
        //***********************
        //__________________________________________________________________
        set dataField(value) {
            if (this.mDataField != value) {
                this.mDataField = value;
                this.mIsNeedToUpdate = true;
                this.updateView();
            }
        }
        get dataField() {
            return this.mDataField;
        }
        //__________________________________________________________________
        set dataProvider(value) {
            let aIsSameDataProvider = false;
            if (this.mDataProvider != null) {
                this.removeDpListener();
                aIsSameDataProvider = (this.mDataProvider == value);
            }
            this.mDataProvider = value;
            if (this.mDataProvider != null) {
                this.addDpListener();
            }
            this.mComboFilterFunction = this.mDataProvider ? this.mDataProvider.filterFunction : null;
            this.mIsNeedToUpdate = true;
            this.updateView();
            if (aIsSameDataProvider) {
                this.dispatchComboListBuildCompleteEvent();
            }
        }
        get dataProvider() {
            return this.mDataProvider;
        }
        //__________________________________________________________________
        set editable(value) {
            this.mEditable = value;
        }
        //__________________________________________________________________
        set allowSearch(value) {
            this.mAllowSearch = value;
            if (this.comboBox_txti) {
                this.comboBox_txti.readOnly = !this.mAllowSearch;
            }
        }
        //__________________________________________________________________
        get length() {
            return this.dataProvider.length;
        }
        //__________________________________________________________________
        /*public set selectedIndexFilterRemoved(value: number) {
         if(this.mList_com) {
         this.mList_com.selectedIndex = value;
         this.mIsNeedToUpdate = true;
         this.updateView();
         }
         }*/
        //__________________________________________________________________
        set hoveredIndex(value) {
            if (this.mList_com && this.mList_com.hoveredIndex != value) {
                this.mList_com.hoveredIndex = value;
                this.hoverItem(this.hoveredItem);
            }
        }
        get hoveredIndex() {
            if (this.mList_com) {
                return this.mList_com.hoveredIndex;
            }
            return -1;
        }
        //__________________________________________________________________
        get hoveredItem() {
            if (this.mList_com) {
                return this.mList_com.hoveredItem;
            }
            return null;
        }
        //__________________________________________________________________
        set selectedIndex(value) {
            if (this.mList_com && this.mList_com.selectedIndex != value) {
                this.mList_com.selectedIndex = value;
            }
            else {
                this.mInitSelectedIndex = value;
            }
            this.updateView();
        }
        get selectedIndex() {
            if (this.mList_com) {
                return this.mList_com.selectedIndex;
            }
            return -1;
        }
        //__________________________________________________________________
        set selectedItem(iData) {
            if (this.mList_com) {
                this.mList_com.selectedItem = iData;
                this.mIsNeedToUpdate = true;
                this.updateView();
            }
            else {
                this.mInitSelectedItem = iData;
            }
        }
        get selectedItem() {
            if (this.mList_com) {
                return this.mList_com.selectedItem;
            }
            return null;
        }
        //__________________________________________________________________
        set placeholder(value) {
            this.mPlaceholder = value;
            this.setPlaceHolder();
        }
        get placeholder() {
            return this.mPlaceholder;
        }
        //__________________________________________________________________
        set isWithFloatingPromt(value) {
            this.mIsWithFloatingPromt = value;
        }
        get isWithFloatingPromt() {
            return this.mIsWithFloatingPromt;
        }
        //__________________________________________________________________
        set pattern(value) {
            this.mPattern = value;
            this.setPattern();
        }
        //__________________________________________________________________
        set topTitle(value) {
            this.mTopTitle = value;
            this.setTopTitle();
        }
        //_______________________________________________________________
        set irClass(iPath) {
            this.mIrClassPath = iPath;
        }
        //_______________________________________________________________
        set irSkin(iPath) {
            this.mIrSkinPath = iPath;
        }
        //_______________________________________________________________
        set tutorialIndex(value) {
            this.mTutorialIndex = value;
        }
        //_______________________________________________________________
        set maxLines(value) {
            this.mMaxLines = value;
            this.addComboMaxLines();
        }
        //_______________________________________________________________
        get list() {
            return this.mList_com;
        }
        //_______________________________________________________________
        get isOpen() {
            return this.mIsDropdownOpen;
        }
        //_______________________________________________________________
        set labelToItemFunc(value) {
            this.mLabelToItemFunc = value;
            if (this.mList_com) {
                this.mList_com.labelToItem_Func = this.mLabelToItemFunc;
            }
        }
        //_______________________________________________________________
        set listenToWheelMove(value) {
            this.mListenToWheelMove = value;
        }
    }
    gencom.CoBasicComboBox = CoBasicComboBox;
})(gencom || (gencom = {}));
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
///<reference path="CoBasicComboBox.ts"/>
///<reference path="../../asBase/events/KeyboardCodes.ts"/>
///<reference path="../../asBase/events/EventManager.ts"/>
var gencom;
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
///<reference path="CoBasicComboBox.ts"/>
///<reference path="../../asBase/events/KeyboardCodes.ts"/>
///<reference path="../../asBase/events/EventManager.ts"/>
(function (gencom) {
    var SkinsCss = asBase.SkinsCss;
    var MouseEvents = asBase.events.MouseEvents;
    var DaCheckBox = gencom.DaCheckBox;
    var EventManager = asBase.events.EventManager;
    var EvItemRenderer = asBase.collections.EvItemRenderer;
    var Utils = asBase.Utils;
    var AsEvent = asBase.events.AsEvent;
    var ListMultiSelectionAll = gencom.list.ListMultiSelectionAll;
    class CoMultiComboBox extends gencom.CoBasicComboBox {
        constructor(iContainer, iSelectAllText = "") {
            super(iContainer, SkinsCss.SKINS_GENCOM + "combobox/SkMultiComboBox.html");
            //------------------------------
            // Const
            //------------------------------
            this.OPEN_DROPDOWN_CLASS = "multi-select-open-list";
            //------------------------------
            // Comp
            //------------------------------
            //------------------------------
            // Members
            //------------------------------
            this.mIsWindowClickActive = false;
            this.IS_MULTI_SELECTION = true;
            if (iSelectAllText != "") {
                this.selectAllText(iSelectAllText);
            }
        }
        //__________________________________________________________________
        creationComplete() {
            this.multi_para = this.getPart("multi_para");
            this.multi_ul = this.getPart("multi_ul");
            this.multi_ul.classList.add("generic-modal-full-height");
            this.multi_div = this.getPart("multi_div");
            super.creationComplete();
        }
        //________________________________________________________________
        createListComponent() {
            return new gencom.list.CoList(this.comboBoxList_div, this.IS_MULTI_SELECTION, this.mSelectAllData);
        }
        //________________________________________________________________
        addEventListeners() {
            super.addEventListeners();
            this.enableSelectedTags(true);
        }
        //________________________________________________________________
        removeEventListeners() {
            super.removeEventListeners();
            if (this.mIsWindowClickActive) {
                EventManager.removeEventListener(MouseEvents.CLICK, this);
                this.mIsWindowClickActive = false;
            }
            this.enableSelectedTags(false);
        }
        //________________________________________________________________
        addListEventListener() {
            super.addListEventListener();
            this.mList_com.addEventListener(EvItemRenderer.IR_SELECTIONS_CHANGED, (event) => this.listIrSelectionsChanged__EventHandler(event), this);
            this.mList_com.addEventListener(EvItemRenderer.IR_SELECT_ALL_CHANGED, (event) => this.listIrSelectAllChanged__EventHandler(event), this);
        }
        //_______________________________________________________________
        enableSelectedTags(value) {
            for (let i = 0; i < this.selectedTags.length; ++i) {
                let aTag_com = this.selectedTags[i];
                if (value) {
                    aTag_com.addEventListener(gencom.EvTag.DELETE_TAG, (event) => this.deleteTag__EventHandler(event), this);
                }
                else {
                    aTag_com.removeEventListener(gencom.EvTag.DELETE_TAG, this);
                }
            }
        }
        //_______________________________________________________________
        windowClick__EventHandler(event) {
            if (!this.mIsEnabled) {
                return;
            }
            if (!this.isClickedInCombo(event.data.target)) {
                EventManager.removeEventListener(MouseEvents.CLICK, this);
                this.mIsWindowClickActive = false;
                this.closeDropdown();
            }
        }
        //_______________________________________________________________
        isClickedInCombo(iElement) {
            return Utils.isElementIn(this.contentWrapper, iElement);
        }
        //_______________________________________________________________
        listIrSelectAllChanged__EventHandler(event) {
            if (event.detail.sender.isSelected) {
                this.clearAllTags();
                this.addTag(this.mSelectAllData);
            }
            else {
                this.clearAllTags();
                this.initTagsView();
            }
            this.dispatchComboChangedEvent();
        }
        //_______________________________________________________________
        listIrSelectionsChanged__EventHandler(event) {
            this.clearAllTags();
            this.initTagsView();
            this.actionsOnSelectionChange();
            this.closeDropdown();
        }
        //_______________________________________________________________
        inputFocusIn__EventHandler(event) {
            super.inputFocusIn__EventHandler(event);
            if (!this.mIsWindowClickActive) {
                this.mIsWindowClickActive = true;
                EventManager.addEventListener(MouseEvents.CLICK, (event) => this.windowClick__EventHandler(event), this);
            }
        }
        //_______________________________________________________________
        closeDropdown() {
            super.closeDropdown();
            this.multi_ul.classList.remove(this.OPEN_DROPDOWN_CLASS);
        }
        //_______________________________________________________________
        openDropdown() {
            super.openDropdown();
            this.multi_ul.classList.add(this.OPEN_DROPDOWN_CLASS);
            this.ensureIndexIsVisible(this.selectedIndex);
        }
        //________________________________________________________________
        initTagsView() {
            for (let aData of this.selectedItems) {
                this.handleChb(aData);
            }
        }
        //________________________________________________________________
        handleChb(iData) {
            if (iData != null) {
                if (iData.isSelected) {
                    this.addTag(iData);
                }
                else {
                    this.removeTag(iData.name);
                }
                this.dispatchComboAddedOrRemovedEvent(iData);
            }
        }
        //_______________________________________________________________
        dispatchComboAddedOrRemovedEvent(iData) {
            let aEventType = iData.isSelected ? "COMBO_ITEM_ADDED_AC" : "COMBO_ITEM_REMOVED_AC";
            let aEvent = new AsEvent(aEventType, false, iData);
            this.dispatchEvent(aEvent.event);
        }
        //_______________________________________________________________
        addTag(iData) {
            Utils.includePart(this.multi_para, true);
            let aTagElement = document.createElement("span");
            this.multi_para.appendChild(aTagElement);
            let aTag_com = new gencom.CoTag(iData, aTagElement);
            aTag_com.addEventListener(gencom.EvTag.DELETE_TAG, (event) => this.deleteTag__EventHandler(event), this);
            this.selectedTags.push(aTag_com);
        }
        //_______________________________________________________________
        removeTag(iLabel) {
            for (let i = 0; i < this.selectedTags.length; ++i) {
                let aTag_com = this.selectedTags[i];
                if (aTag_com.label == iLabel) {
                    this.removeTagElement(aTag_com, i);
                    break;
                }
            }
        }
        //_______________________________________________________________
        removeTagElement(iTag, iTagIndex, iIsToDeleteFromTagsArray = true) {
            iTag.removeEventListener(gencom.EvTag.DELETE_TAG, this);
            this.multi_para.removeChild(iTag.tagElement);
            iTag.dispose();
            if (iIsToDeleteFromTagsArray && iTagIndex > -1) {
                this.selectedTags.splice(iTagIndex, 1);
            }
            if (this.multi_para.children.length == 0) {
                Utils.includePart(this.multi_para, false);
            }
        }
        //_______________________________________________________________
        clearAllTags() {
            for (let i = 0; i < this.selectedTags.length; ++i) {
                let aTag_com = this.selectedTags[i];
                this.removeTagElement(aTag_com, i, false);
            }
            this.selectedTags.splice(0);
        }
        //________________________________________________________________
        selectItemView(iData) {
            this.clearSearchMode();
        }
        //________________________________________________________________
        updateItem() {
            if (this.mChangedData && !this.mSelectAllData.isSelected) {
                this.selectItemView(this.mChangedData);
            }
            this.mListIterator = this.selectedIndex;
            this.mChangedData = null;
        }
        //_______________________________________________________________
        listIrSelectionChanged__EventHandler(event) {
            this.mListIterator = this.selectedIndex;
            this.actionsOnSelectionChange();
        }
        //________________________________________________________________________________________
        clearSearchMode() {
            super.clearSearchMode();
            this.comboBox_txti.value = "";
        }
        //__________________________________________________________________
        removeAll() {
            this.removeView();
            this.selectedIndices = [];
        }
        //__________________________________________________________________
        removeView() {
            this.clearAllTags();
        }
        //_______________________________________________________________
        deleteTag__EventHandler(event) {
            let aTag_com = event.detail.sender;
            let aData = aTag_com.data;
            this.mList_com.selectedItem = aData; // toggle
            this.removeTag(aTag_com.label);
        }
        //________________________________________________________________
        keyEnterOrTab() {
            this.setNearestItem();
        }
        //_______________________________________________________________
        selectNextIr(iDirection, iStep = 1) {
            // do nothing
        }
        //__________________________________________________________________
        reselectPrevSelection() {
        }
        //________________________________________________________________
        closeCombo() {
            if (this.dataProvider) {
                this.clearSearchMode();
            }
        }
        //________________________________________________________________
        storeSelectedItem() {
        }
        //________________________________________________________________
        setError() {
            if (this.multi_div) {
                Utils.setFieldError(this.multi_div);
            }
        }
        //________________________________________________________________
        clearError() {
            if (this.multi_div) {
                Utils.clearFieldError(this.multi_div);
            }
        }
        //__________________________________________________________________
        selectAllText(value) {
            if (!this.mSelectAllData) {
                this.mSelectAllData = new DaCheckBox();
                this.mSelectAllData.name = value;
                this.mSelectAllData.isSelected = false;
                this.mSelectAllData.id = ListMultiSelectionAll.SELECT_ALL_TAG_ID;
                this.mIsNeedToUpdate = true;
                this.updateView();
            }
        }
        //__________________________________________________________________
        isAllSelected() {
            return this.mSelectAllData.isSelected;
        }
        //***********************
        //       get/set        *
        //***********************
        //__________________________________________________________________
        get selectAllData() {
            return this.mSelectAllData;
        }
        //__________________________________________________________________
        set selectedIndices(values) {
            if (this.mList_com) {
                this.mList_com.selectedIndices = values;
                this.mIsNeedToUpdate = true;
                this.updateView();
            }
        }
        get selectedIndices() {
            if (this.mList_com) {
                return this.mList_com.selectedIndices;
            }
            return null;
        }
        //__________________________________________________________________
        set selectedItems(value) {
            if (this.mList_com) {
                this.mList_com.selectedItems = value;
                this.mIsNeedToUpdate = true;
                this.updateView();
            }
        }
        get selectedItems() {
            if (this.mList_com) {
                return this.mList_com.selectedItems;
            }
            return null;
        }
        //__________________________________________________________________
        get selectedTags() {
            if (!this.mSelectedTags) {
                this.mSelectedTags = new Array();
            }
            return this.mSelectedTags;
        }
    }
    gencom.CoMultiComboBox = CoMultiComboBox;
})(gencom || (gencom = {}));
///<reference path="../../asBase/events/AsEvent.ts"/>
var gencom;
///<reference path="../../asBase/events/AsEvent.ts"/>
(function (gencom) {
    var AsEvent = asBase.events.AsEvent;
    class EvComboBox extends AsEvent {
        constructor(pKey, pAction, pBubbles = false, pSender, pCancelable = false) {
            super(pKey, pBubbles, pSender, pCancelable);
            this.mAction = pAction;
        }
        /****************************
         * Getters and Setters
         ****************************/
        //________________________________________________________________
        get action() {
            return this.mAction;
        }
        //________________________________________________________________
        get data() {
            return this.mData;
        }
        set data(value) {
            this.mData = value;
        }
    }
    //------------------------------
    // Const
    //------------------------------
    //event
    EvComboBox.COMBO_BOX_EV = "COMBO_BOX_EV";
    // actions
    EvComboBox.COMBO_BUILD_COMPLETE_AC = "COMBO_BUILD_COMPLETE_AC";
    EvComboBox.COMBO_CHANGED_AC = "COMBO_CHANGED_AC";
    EvComboBox.COMBO_ADDED_AC = "COMBO_ADDED_AC";
    EvComboBox.COMBO_REMOVED_AC = "COMBO_REMOVED_AC";
    EvComboBox.COMBO_ENTER_CLICKED_AC = "COMBO_ENTER_CLICKED_AC";
    EvComboBox.COMBO_ESC_CLICKED_AC = "COMBO_ESC_CLICKED_AC";
    gencom.EvComboBox = EvComboBox;
})(gencom || (gencom = {}));
///<reference path="../asBase/events/MouseEvents.ts"/>
var gencom;
///<reference path="../asBase/events/MouseEvents.ts"/>
(function (gencom) {
    var checkbox;
    (function (checkbox) {
        var CoComponentBase = asBase.CoComponentBase;
        var MouseEvents = asBase.events.MouseEvents;
        var EventTypes = asBase.events.EventTypes;
        var AsEvent = asBase.events.AsEvent;
        var Utils = asBase.Utils;
        class CoRadioButton extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                //------------------------------
                // Members
                //------------------------------
                this.mIsSelected = false;
                this.mLabel = "";
                this.mIsListenToClickOnLabel = false;
                this.mIsHalfOpacity = false;
            }
            //____________________________________________________________________
            creationComplete() {
                this.radio_btn = this.getPart("radio_btn");
                this.radio_lbl = this.getPart("radio_lbl");
                this.radio_btn.addEventListener(MouseEvents.CLICK, (event) => this.radioBtnClicked__EventHandler(event));
                this.labelClicked__EventHandler_Func = () => this.labelClicked__EventHandler();
                if (this.mIsListenToClickOnLabel) {
                    this.radio_lbl.addEventListener(MouseEvents.CLICK, this.labelClicked__EventHandler_Func);
                }
                this.selected = this.mIsSelected;
                if (this.mLabel != "") {
                    this.label = this.mLabel;
                }
                if (!this.mIsEnabled) {
                    Utils.addClassToElement(this.radio_btn, CoRadioButton.DISABLED);
                }
                if (this.mIsHalfOpacity) {
                    Utils.addClassToElement(this.contentWrapper, CoRadioButton.HALF_OPACITY);
                }
            }
            //____________________________________________________________________
            radioBtnClicked__EventHandler(event) {
                event.stopImmediatePropagation();
                let e = new AsEvent(EventTypes.CHANGE, false, this);
                this.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            setSelectedTrue() {
                this.radio_btn.dataset.selected = "true";
                this.radio_btn.classList.add("checked");
                this.mIsSelected = true;
                this.clearError();
            }
            //____________________________________________________________________
            setSelectedFalse() {
                this.radio_btn.dataset.selected = "false";
                this.radio_btn.classList.remove("checked");
                this.mIsSelected = false;
            }
            //____________________________________________________________________
            labelClicked__EventHandler() {
                let e = new AsEvent(CoRadioButton.LABEL_CLICKED, true, this);
                this.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            setError() {
                Utils.setTextError(this.radio_lbl);
            }
            //____________________________________________________________________
            clearError() {
                Utils.clearTextError(this.radio_lbl);
            }
            //____________________________________________________________________
            addClassToCheckBox(iClassName) {
                if (this.radio_btn && !this.radio_btn.classList.contains(iClassName)) {
                    this.radio_btn.classList.add(iClassName);
                }
            }
            //____________________________________________________________________
            removeClassFromCheckBox(iClassName) {
                if (this.radio_btn && this.radio_btn.classList.contains(iClassName)) {
                    this.radio_btn.classList.remove(iClassName);
                }
            }
            //____________________________________________________________________
            setEnabled(value) {
                this.mIsEnabled = value;
                if (!this.contentWrapper) {
                    return;
                }
                if (value) {
                    Utils.removeClassFromElement(this.contentWrapper, CoRadioButton.DISABLED);
                }
                else {
                    Utils.addClassToElement(this.contentWrapper, CoRadioButton.DISABLED);
                }
            }
            //____________________________________________________________________
            setHalfOpacity() {
                this.mIsHalfOpacity = true;
                if (!this.contentWrapper) {
                    return;
                }
                Utils.addClassToElement(this.contentWrapper, CoRadioButton.HALF_OPACITY);
            }
            //____________________________________________________________________
            setNoOpacity() {
                this.mIsHalfOpacity = false;
                if (!this.contentWrapper) {
                    return;
                }
                Utils.removeClassFromElement(this.contentWrapper, CoRadioButton.HALF_OPACITY);
            }
            //____________________________________________________________________
            showLabel() {
                Utils.includeSkinPartInLayout(this.radio_lbl);
            }
            //____________________________________________________________________
            hideLabel() {
                Utils.removeSkinPartFromLayout(this.radio_lbl);
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________
            set isListenToClickOnLabel(value) {
                this.mIsListenToClickOnLabel = value;
                if (this.radio_lbl) {
                    if (this.mIsListenToClickOnLabel) {
                        this.radio_lbl.addEventListener(MouseEvents.CLICK, this.labelClicked__EventHandler_Func);
                    }
                    else {
                        this.radio_lbl.removeEventListener(MouseEvents.CLICK, this.labelClicked__EventHandler_Func);
                    }
                }
            }
            //____________________________________________________________________
            get selected() {
                return this.mIsSelected;
            }
            set selected(value) {
                this.mIsSelected = value;
                if (!this.radio_btn) {
                    return;
                }
                if (this.mIsSelected) {
                    this.setSelectedTrue();
                }
                else {
                    this.setSelectedFalse();
                }
            }
            //____________________________________________________________________
            set label(value) {
                this.mLabel = value;
                if (this.radio_lbl) {
                    this.radio_lbl.innerHTML = value;
                }
            }
            get label() {
                return this.mLabel;
            }
            //____________________________________________________________________
            get radioBtnInstance() {
                return this.radio_btn;
            }
        }
        //------------------------------
        // Structure
        //------------------------------
        /*
         <label id="???">
         <span id="radio_btn" class="chb-square"></span>
         <span id="radio_lbl">Label</span>
         </label>
         */
        //------------------------------
        // Events
        //------------------------------
        CoRadioButton.LABEL_CLICKED = "LabelClicked__Event";
        //------------------------------
        // Class
        //------------------------------
        CoRadioButton.DISABLED = "disabled-radiobutton";
        CoRadioButton.HALF_OPACITY = "halfOpacity";
        checkbox.CoRadioButton = CoRadioButton;
    })(checkbox = gencom.checkbox || (gencom.checkbox = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var datagrid;
    (function (datagrid) {
        class EvDataGrid {
        }
        EvDataGrid.DG_BUILDER_COMPLETE = "DG_BUILDER_COMPLETE";
        EvDataGrid.DG_COLUMN_BUILDER_COMPLETE = "DG_COLUMN_BUILDER_COMPLETE";
        EvDataGrid.DG_COLUMN_BUILDER_COMPLETE_ONE = "DG_COLUMN_BUILDER_COMPLETE_ONE";
        EvDataGrid.DG_COLUMN_SELECTION_CHANGED = "DG_COLUMN_SELECTION_CHANGED";
        EvDataGrid.DG_COLUMN_WIDTH_CHANGED = "DG_COLUMN_WIDTH_CHANGED";
        EvDataGrid.DG_REFRESHED = "DG_REFRESHED";
        EvDataGrid.DG_UPDATED = "DG_UPDATED";
        datagrid.EvDataGrid = EvDataGrid;
    })(datagrid = gencom.datagrid || (gencom.datagrid = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var datagrid;
    (function (datagrid) {
        var EventTypes = asBase.events.EventTypes;
        class DaGridColumn extends asBase.events.EventDispatcher {
            constructor() {
                super();
                this.mColumnWidth = -1;
                this.mMinWidth = 0;
                this.mMaxWidth = 0;
                this.mPercentWidth = -1;
                this.mUseOriginalDP = false;
                this.mActualColumnWidth = -1;
                this.mIsSetByUser = false;
                DaGridColumn.mUniqueCounter++;
                this.mUniqueID = "Column_" + DaGridColumn.mUniqueCounter;
            }
            //___________________________________________________________________
            fillFromVO(value) {
            }
            //___________________________________________________________________
            dispose() {
                this.visible = false;
            }
            /****************************
             * Getters and Setters
             ****************************/
            //___________________________________________________
            get dataField() {
                return this.mDataField;
            }
            set dataField(value) {
                if (value == null) {
                    throw new Error("DataField of class DaGridColumn cannot be null!");
                }
                else if (value == "") {
                    throw new Error("DataField of class DaGridColumn cannot be empty!");
                }
                this.mDataField = value;
            }
            //___________________________________________________________________
            set dataHash(value) {
                this.mDataHash = value;
            }
            get dataHash() {
                return this.mDataHash;
            }
            //___________________________________________________________________
            set isSetByUser(value) {
                this.mIsSetByUser = value;
            }
            get isSetByUser() {
                return this.mIsSetByUser;
            }
            //___________________________________________________________________
            set useOriginalDP(value) {
                this.mUseOriginalDP = value;
            }
            get useOriginalDP() {
                return this.mUseOriginalDP;
            }
            //___________________________________________________________________
            get relationTypeId() {
                return this.mRelationTypeId;
            }
            set relationTypeId(value) {
                this.mRelationTypeId = value;
            }
            //___________________________________________________________________
            get cssClass() {
                return this.mCssClass;
            }
            set cssClass(value) {
                this.mCssClass = value;
            }
            //___________________________________________________________________
            get irSkinPath() {
                return this.mIrSkinPath;
            }
            set irSkinPath(value) {
                this.mIrSkinPath = value;
            }
            //___________________________________________________________________
            get irClassPath() {
                return this.mIrClassPath;
            }
            set irClassPath(value) {
                this.mIrClassPath = value;
            }
            //___________________________________________________________________
            get irHeaderSkinPath() {
                return this.mIrHeaderSkinPath;
            }
            set irHeaderSkinPath(value) {
                this.mIrHeaderSkinPath = value;
            }
            //___________________________________________________________________
            get irHeaderClassPath() {
                return this.mIrHeaderClassPath;
            }
            set irHeaderClassPath(value) {
                this.mIrHeaderClassPath = value;
            }
            //___________________________________________________________________
            get irHeaderTitle() {
                return this.mIrHeaderTitle;
            }
            set irHeaderTitle(value) {
                this.mIrHeaderTitle = value;
                this.dispatchEvent(EventTypes.CHANGE, this);
            }
            //___________________________________________________________________
            get columnsMultiSelection() {
                return this.mColumnsMultiSelection;
            }
            set columnsMultiSelection(value) {
                this.mColumnsMultiSelection = value;
            }
            //___________________________________________________________________
            get columnElement() {
                return this.mColumnElement;
            }
            set columnElement(value) {
                this.mColumnElement = value;
            }
            //___________________________________________________________________
            get headerElement() {
                return this.mHeaderElement;
            }
            set headerElement(value) {
                this.mHeaderElement = value;
            }
            //___________________________________________________________________
            get columnsDataProvider() {
                return this.mColumnsDataProvider;
            }
            set columnsDataProvider(value) {
                this.mColumnsDataProvider = value;
            }
            //___________________________________________________________________
            set columnWidth(value) {
                this.mColumnWidth = value;
                this.mActualColumnWidth = value;
                this.mIsSetByUser = true;
            }
            get columnWidth() {
                return this.mColumnWidth;
            }
            //___________________________________________________________________
            set actualColumnWidth(value) {
                this.mActualColumnWidth = value;
            }
            get actualColumnWidth() {
                return this.mActualColumnWidth;
            }
            //___________________________________________________________________
            set percentWidth(value) {
                this.mPercentWidth = value;
            }
            get percentWidth() {
                return this.mPercentWidth;
            }
            //___________________________________________________________________
            set maxWidth(value) {
                this.mMaxWidth = value;
            }
            get maxWidth() {
                return this.mMaxWidth;
            }
            //___________________________________________________________________
            set minWidth(value) {
                this.mMinWidth = value;
            }
            get minWidth() {
                return this.mMinWidth;
            }
            //___________________________________________________________________
            set visible(value) {
                this.mVisible = value;
            }
            get visible() {
                return this.mVisible;
            }
            //___________________________________________________________________
            set columnData(value) {
                this.mColumnData = value;
            }
            get columnData() {
                return this.mColumnData;
            }
        }
        DaGridColumn.mUniqueCounter = 0;
        datagrid.DaGridColumn = DaGridColumn;
    })(datagrid = gencom.datagrid || (gencom.datagrid = {}));
})(gencom || (gencom = {}));
///<reference path="EvDataGrid.ts"/>
var gencom;
///<reference path="EvDataGrid.ts"/>
(function (gencom) {
    var datagrid;
    (function (datagrid) {
        var ArrayCollection = asBase.baseclasses.ArrayCollection;
        var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
        class GridCollection extends ArrayCollection {
            constructor(iDaSource = null, iHasView = true) {
                super(iDaSource, iHasView);
                GridCollection.mGridInstanceCounter++;
                this.mId = "GC_" + GridCollection.mGridInstanceCounter;
            }
            //_______________________________________________________________*
            createDataCollection(iData) {
                return new datagrid.DaGridCollection(iData);
            }
            //_______________________________________________________________
            includeItem(iItem, iIsInclude) {
                if (iItem) {
                    let aIrsHash = iItem.getIrsHash();
                    for (let aField in aIrsHash) {
                        let aIr = aIrsHash[aField];
                        if (aIr) {
                            aIr.include(iIsInclude);
                        }
                    }
                }
                else {
                    if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                        console.log("GridCollection::includeItem() iItem is null");
                    }
                }
            }
            //_______________________________________________________________
            filterAddItem(iItem) {
                this.includeItem(iItem, true);
            }
            //_______________________________________________________________
            filterRemoveItem(iItem) {
                this.includeItem(iItem, false);
            }
            //_________________________________________________________________________*
            repositionRow(iItem, iRepositionIndex) {
                switch (iRepositionIndex) {
                    case this.POSITION_REMOVE_INDEX:
                        this.filterRemoveItem(iItem);
                        break;
                    case this.POSITION_APPEND_INDEX:
                        iItem.reappend();
                        break;
                    default:
                        this.insertItemBefore(iItem, iRepositionIndex);
                        break;
                }
            }
            //_________________________________________________________________________*
            repositionIr(iIr, iRepositionIndex) {
                let aItem = this.source[this.source.length - 1];
                this.repositionRow(aItem, iRepositionIndex);
                if (this.mLocalIndex && iRepositionIndex > -1) {
                    this.mLocalIndex.splice(iRepositionIndex, 0, aItem);
                }
            }
            //_________________________________________________________________________
            insertItemBefore(iInsertedItem, iIndex) {
                let aOtherItem = this.mLocalIndex[iIndex];
                if (aOtherItem) {
                    let aOtherIrsHash = aOtherItem.getIrsHash();
                    let aInsertedIrsHash = iInsertedItem.getIrsHash();
                    if (aInsertedIrsHash) {
                        for (let aField in aOtherIrsHash) {
                            let aInsertedIr = aInsertedIrsHash[aField];
                            let aOtherIr = aOtherIrsHash[aField];
                            if (aOtherIr && aInsertedIr) {
                                aInsertedIr.insertBefore(aOtherIr);
                            }
                            else {
                                if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                                    console.log("GridCollection::insertItemBefore() aOtherIr=" + aOtherIr + " aInsertedIr=" + aInsertedIr);
                                }
                            }
                        }
                    }
                }
                else {
                    if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                        console.log("GridCollection::insertItemBefore() aOtherItem is null");
                    }
                }
            }
            //_______________________________________________________________
            updateView() {
                for (let i = 0; i < this.length; ++i) {
                    let aItem = this.getDataCollectionAt(i);
                    if (aItem) {
                        let aIrsHash = aItem.getIrsHash();
                        for (let aField in aIrsHash) {
                            let aIr = aIrsHash[aField];
                            if (aIr) {
                                if (aIr.initialized) {
                                    aIr.updateView();
                                }
                            }
                        }
                    }
                    else {
                        if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                            console.log("GridCollection::updateView() aItem is null");
                        }
                    }
                }
            }
            //_______________________________________________________________*
            irDataChanged__EventHandler(iData) {
                let aItem = this.getDataCollectionByData(iData);
                if (aItem) {
                    let aIrsHash = aItem.getIrsHash();
                    for (let aField in aIrsHash) {
                        let aIr = aIrsHash[aField];
                        if (aIr && aIr.initialized) {
                            aIr.updateView();
                        }
                    }
                }
                else {
                    if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                        console.log("GridCollection::irDataChanged__EventHandler() aItem is null");
                    }
                }
                this.dispatchEvent(ArrayCollection.COLLECTION_IR_DATA_CHANGED, iData);
            }
            //_______________________________________________________________*
            irMouseOver(iIr) {
                if (!iIr.isInEditor) {
                    this.hover(iIr, true);
                }
            }
            //_______________________________________________________________*
            irMouseOut(iIr) {
                if (!iIr.isInEditor) {
                    this.hover(iIr, false);
                }
            }
            //_______________________________________________________________*
            irMouseDown(iIr) {
                if (!iIr.isInEditor) {
                    this.select(iIr);
                }
            }
            //_______________________________________________________________
            selectRow(iItem, iIsSelect) {
                let aIrsHash = iItem.getIrsHash();
                for (let aField in aIrsHash) {
                    let aIr = aIrsHash[aField];
                    if (aIr) {
                        aIr.selected = iIsSelect;
                    }
                }
            }
            //_______________________________________________________________
            convertToSourceArray(iDataArray, iIndex = -1) {
                if (iIndex < 0) {
                    iIndex = this.source.length;
                }
                if (iDataArray.length) {
                    let aDataCollectionsArray = new Array();
                    for (let i = 0; i < iDataArray.length; ++i) {
                        aDataCollectionsArray.push(this.createDataCollection(iDataArray[i]));
                    }
                    this.source.splice(iIndex, 0, ...aDataCollectionsArray);
                }
                if (iDataArray.length) {
                    this.mIsAddingMoreThanOneItem = (iDataArray.length > 1);
                    this.dispatchGetIr(iDataArray, iIndex);
                }
            }
            //_______________________________________________________________
            dispatchGetIr(iDataArray, iIndex) {
                if (this.dataGrid) {
                    for (let i = 0; i < iDataArray.length; ++i) {
                        this.createIrAt(iDataArray[i], iIndex + i);
                    }
                }
            }
            //_______________________________________________________________
            addItemAt(iData, iIndex) {
                if (iIndex > this.source.length || iIndex < 0) {
                    return;
                }
                if (this.mOriginalArray != null) {
                    this.mOriginalArray.splice(iIndex, 0, iData);
                }
                else {
                    this.createIrAt(iData, iIndex);
                }
            }
            //_______________________________________________________________
            createIrAt(iData, iIndex) {
                if (this.dataGrid == null) {
                    return;
                }
                let aIr;
                let aGridColumns = this.dataGrid.gridColumnData;
                let aIsEmpty = this.isDataGridEmpty();
                for (let i = 0; i < aGridColumns.length; ++i) {
                    let aColumnData = aGridColumns[i];
                    if (aColumnData.columnElement == null) {
                        continue;
                    }
                    if ((!aIsEmpty) && (aColumnData.columnElement.innerHTML == "")) {
                        continue;
                    }
                    aIr = this.dataGrid.createIr(aColumnData, iIndex, iData);
                    this.addIrToSource(aIr);
                }
                this.isNeedItemRenderers = false;
                if (this.mLocalIndex == null || this.mIsAddingMoreThanOneItem) {
                    this.refresh();
                    this.mIsAddingMoreThanOneItem = false;
                }
                else if (aIr) {
                    let aRepositionIndex = this.getIndexPositionIr(aIr);
                    this.repositionIr(aIr, aRepositionIndex);
                }
                else {
                    if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                        console.log("GridCollection::createIrAt() aIr is null");
                    }
                }
            }
            //_______________________________________________________________
            isDataGridEmpty() {
                let aGridColumns = this.dataGrid.gridColumnData;
                for (let i = 0; i < aGridColumns.length; ++i) {
                    if (aGridColumns[i].columnElement == null) {
                        continue;
                    }
                    if (aGridColumns[i].columnElement.innerHTML != "") {
                        return false;
                    }
                }
                return true;
            }
            //_______________________________________________________________
            addIrToSource(iIr) {
                this.setIrByData(iIr);
                if (this.mNotifyOnItemAdded) {
                    this.dispatchEvent(ArrayCollection.COLLECTION_ITEM_ADDED, this.source[this.source.length - 1].data);
                }
            }
            //_______________________________________________________________*
            setIrByData(iIr) {
                // super.setIrByData(iIr);
                this.addIrToHash(iIr);
            }
            //_______________________________________________________________*
            addIrToHash(iIr) {
                let aKey = this.getHashKey(iIr.data);
                if (this.dataHash[aKey] == null) {
                    this.dataHash[aKey] = new Array();
                }
                if (this.dataHash[aKey].indexOf(iIr) < 0) {
                    this.dataHash[aKey].push(iIr);
                }
                //return this.dataHash[aKey];
            }
            //_______________________________________________________________
            refresh() {
                if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                    console.log("GridCollection::refresh() mRevision= " + this.mRevision);
                }
                let aIsAcRefreshed = false;
                if (this.originalArray != null) {
                    aIsAcRefreshed = this.originalArray.refresh();
                }
                if (!aIsAcRefreshed) {
                    this.internalRefresh();
                    if (this.mDataGrid) {
                        this.mDataGrid.completeRefresh();
                    }
                }
            }
            //_______________________________________________________________*
            areAllIrsInitialized() {
                for (let aDaItem of this.currentArray) {
                    let aIrsHash = aDaItem.getIrsHash();
                    for (let aField in aIrsHash) {
                        let aIr = aIrsHash[aField];
                        if (aIr == null || !aIr.initialized) {
                            if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                                console.log("not all IRs initiated");
                            }
                            return false;
                        }
                    }
                }
                if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                    console.log("all IRs initiated");
                }
                return true;
            }
            //_______________________________________________________________*
            getHashKey(iData) {
                return iData[this.mUniqueField];
            }
            //_______________________________________________________________*
            clone() {
                let aNewCollection;
                if (this.mOriginalArray != null) {
                    aNewCollection = new GridCollection(this.mOriginalArray.clone());
                }
                else {
                    aNewCollection = new GridCollection();
                    aNewCollection.convertToSourceArray(this.sourceToDataArray());
                }
                aNewCollection.filterFunction = this.filterFunction;
                aNewCollection.sort = this.sort;
                return aNewCollection;
            }
            //_______________________________________________________________*
            softClone() {
                let aNewCollection;
                if (this.mOriginalArray != null) {
                    aNewCollection = new GridCollection(this.mOriginalArray);
                }
                else {
                    aNewCollection = new GridCollection();
                    aNewCollection.convertToSourceArray(this.sourceToDataArray());
                }
                aNewCollection.filterFunction = this.filterFunction;
                aNewCollection.sort = this.sort;
                return aNewCollection;
            }
            //__________________________________________________________________*
            updateDataByResponseObj(iItem, iResponseObj) {
                let aKey = this.getHashKey(iItem.data);
                let aIrsRow = this.dataHash[aKey];
                for (let i = 0; i < aIrsRow.length; ++i) {
                    let aIr = aIrsRow[i];
                    aIr.updateByResponseObj(iResponseObj);
                }
            }
            //_______________________________________________________________
            removeItemAt(iIndex) {
                if (iIndex > this.length || iIndex < 0) {
                    return ArrayCollection.ITEM_NOT_FOUND;
                }
                let aDaRemovedItem = this.getItemAt(iIndex);
                let aRemovedIndex = this.getSourceArrayIndex(aDaRemovedItem);
                if (aRemovedIndex > this.source.length || aRemovedIndex < 0) {
                    return ArrayCollection.ITEM_NOT_FOUND;
                }
                if (this.mOriginalArray != null) {
                    this.mOriginalArray.splice(aRemovedIndex, 1);
                }
                else {
                    this.removeItemsFromCollection([aDaRemovedItem], aRemovedIndex);
                }
                return aDaRemovedItem;
            }
            //_______________________________________________________________
            removeItemsFromCollection(iRemovedDataItems, iIndex) {
                let aLocalIndex = -1;
                for (let i = 0; i < iRemovedDataItems.length; ++i) {
                    let aRemovedData = iRemovedDataItems[i];
                    if (i == 0) {
                        aLocalIndex = this.getCurrentArrayIndex(aRemovedData);
                    }
                    let aItem = this.getDataCollectionByData(aRemovedData);
                    this.removeIrFromItem(aItem);
                }
                this.removeItemsFromArrays(iRemovedDataItems, iIndex, aLocalIndex);
            }
            //_______________________________________________________________
            removeItemsFromArrays(iRemovedDataItems, iRemovedFirstSourceIndex, iLocalIndex) {
                let aIsEmptyingSource = (this.source.length == iRemovedDataItems.length);
                if (iRemovedFirstSourceIndex > -1) {
                    this.source.splice(iRemovedFirstSourceIndex, iRemovedDataItems.length);
                }
                this.removeItemsFromLocal(iRemovedDataItems, iLocalIndex, aIsEmptyingSource);
            }
            //_______________________________________________________________
            removeIrFromItem(iItem) {
                if (iItem) {
                    let aIrsHash = iItem.getIrsHash();
                    let aIrKey;
                    for (let aField in aIrsHash) {
                        let aIr = aIrsHash[aField];
                        if (aIr) {
                            aIrKey = this.getHashKey(aIr.data);
                            aIr.removeAllOwnerEvents(this.dataGrid);
                            aIr.dispose();
                        }
                    }
                    iItem.dispose();
                    if (aIrKey) {
                        this.dataHash[aIrKey].splice(0);
                        delete (this.dataHash[aIrKey]);
                    }
                }
                else {
                    if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                        console.log("GridCollection::removeIrFromItem() iItem is null");
                    }
                }
            }
            //_______________________________________________________________
            getCurrentArrayIndex(iData) {
                return super.getCurrentArrayIndex(iData);
            }
            //_______________________________________________________________
            getSourceArrayIndex(iData) {
                for (let i = 0; i < this.source.length; ++i) {
                    if (this.source[i].data == iData) {
                        return i;
                    }
                }
                return -1;
            }
            //____________________________________________________________________
            dispose() {
                /*this.mDataGrid = null;
                if(this.mOriginalArray != null) {
                    for (let aDaItem of this.mOriginalArray) {
                        let aIrsHash: Object = (aDaItem as DaGridCollection).getIrsHash();
                        for (let aField in aIrsHash) {
                            delete(this.mDataHash[aField]);
                        }
                    }
                }
    
                this.mDataHash = null;*/
                super.dispose();
            }
            //_____________ ICollectionView implementation __________________
            //_______________________________________________________________
            getItemRenderersByData(iItem) {
                let aSourceLength = this.source.length;
                for (let i = 0; i < aSourceLength; ++i) {
                    let aDaItem = this.source[i];
                    if (aDaItem.data == iItem) {
                        return aDaItem.getIrsHash();
                    }
                }
                return ArrayCollection.ITEM_NOT_FOUND;
            }
            //_______________________________________________________________
            getItemRendererAtFromSource(iIndex) {
                return super.getItemRendererAtFromSource(iIndex);
            }
            //_______________________________________________________________
            getItemRendererAt(iIndex) {
                return super.getItemRendererAt(iIndex);
            }
            //____________________________________________________________________
            clear() {
                super.clear();
            }
            //____________________________________________________________________
            reselect() {
                if (this.mSelectedItem) {
                    this.selectRow(this.mSelectedItem, true);
                }
            }
            //____________________________________________________________________
            select(iIr) {
                this.hover(iIr, false);
                let aItem;
                if (iIr == null) {
                    aItem = this.mSelectedItem;
                }
                else {
                    aItem = this.getDataCollectionByData(iIr.data);
                }
                if (aItem) {
                    if (this.mSelectedItem != null) {
                        if (aItem != this.mSelectedItem) {
                            this.selectRow(this.mSelectedItem, false);
                        }
                    }
                    this.selectRow(aItem, true);
                    this.mSelectedItem = aItem;
                }
                else {
                    if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                        console.log("GridCollection::select() no item");
                    }
                }
            }
            //____________________________________________________________________
            hover(iIr, iValue) {
                let aItem = this.getDataCollectionByData(iIr.data);
                if (aItem) {
                    let aIrsHash = aItem.getIrsHash();
                    for (let aField in aIrsHash) {
                        let aIr = aIrsHash[aField];
                        if (aIr && aIr.initialized) {
                            aIr.hovered = iValue;
                        }
                    }
                }
                else {
                    if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                        console.log("GridCollection::hover() no item");
                    }
                }
            }
            //***********************
            //       get/set        *
            //***********************
            //_________________________________________________________________*
            get dataHash() {
                if (this.mDataHash == null) {
                    this.mDataHash = {};
                }
                return this.mDataHash;
            }
            //_________________________________________________________________*
            get uniqueField() {
                return this.mUniqueField;
            }
            set uniqueField(value) {
                this.mUniqueField = value;
            }
            //_________________________________________________________________*
            get dataGrid() {
                return this.mDataGrid;
            }
            set dataGrid(value) {
                this.mDataGrid = value;
            }
            //__________________________________________________________________
            set enabled(value) {
                this.mIsEnabled = value;
                for (let i = 0; i < this.source.length; i++) {
                    let aItem = this.source[i];
                    if (aItem) {
                        let aIrsHash = aItem.getIrsHash();
                        for (let aField in aIrsHash) {
                            let aIr = aIrsHash[aField];
                            if (aIr) {
                                aIr.enabled = value;
                            }
                        }
                    }
                    else {
                        if (DaUnderDevelopment.SHOW_COLLECTION_RELATED) {
                            console.log("GridCollection::set enabled() aItem is null");
                        }
                    }
                }
            }
            get enabled() {
                return this.mIsEnabled;
            }
            get selectedItem() {
                return this.mSelectedItem;
            }
        }
        //------------------------------
        // Statics
        //------------------------------
        GridCollection.mGridInstanceCounter = 0;
        datagrid.GridCollection = GridCollection;
    })(datagrid = gencom.datagrid || (gencom.datagrid = {}));
})(gencom || (gencom = {}));
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
///<reference path="../../asBase/CoComponentBase.ts"/>
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
///<reference path="./EvDataGrid.ts"/>
///<reference path="../../asBase/collections/IItemRenderer.ts"/>
///<reference path="./DaGridColumn.ts"/>
///<reference path="./GridCollection.ts"/>
///<reference path="../../asBase/constants/DaUnderDevelopment.ts"/>
var gencom;
/// <reference path="../../asBase/collections/EvItemRenderer.ts" />
///<reference path="../../asBase/CoComponentBase.ts"/>
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
///<reference path="./EvDataGrid.ts"/>
///<reference path="../../asBase/collections/IItemRenderer.ts"/>
///<reference path="./DaGridColumn.ts"/>
///<reference path="./GridCollection.ts"/>
///<reference path="../../asBase/constants/DaUnderDevelopment.ts"/>
(function (gencom) {
    var datagrid;
    (function (datagrid) {
        var CoComponentBase = asBase.CoComponentBase;
        var ItemRenderer = asBase.baseclasses.ItemRenderer;
        var EvDataGrid = gencom.datagrid.EvDataGrid;
        var AsEvent = asBase.events.AsEvent;
        var Utils = asBase.Utils;
        var EvItemRenderer = asBase.collections.EvItemRenderer;
        var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
        /**
         *
         *
         * @export
         * @class CoDataGrid
         * @extends {CoComponentBase}
         */
        class CoDataGrid extends CoComponentBase {
            //------------------------------
            // Listeners
            //------------------------------
            //------------------------------
            // Const
            //------------------------------
            /**
             * Creates an instance of CoDataGrid.
             *
             * @param {HTMLDivElement} [iContainer] - GuestList Body element ( the Html Div Element that include the lists)
             * @param {HTMLDivElement} [iGuestsListHeader=null] - GuestList Body element ( the Html Div Element that include the lists Headers)
             *
             * @memberOf CoDataGrid
             */
            constructor(iContainer, iGuestsListHeader = null) {
                super(null, null, iContainer);
                this.DEFAULT_IR_CLASS_NAME = "asBase.baseclasses.ItemRenderer";
                this.mIsWidthHorizontalScroll = false;
                //this.mHeaders = new Array<HTMLElement>();
                //this.mColumns = new Array<HTMLElement>();
                if (iGuestsListHeader != null) {
                    this.mHeader = iGuestsListHeader;
                    this.mHeader.style.overflowX = "hidden";
                }
                this.mBody = iContainer;
                this.mBody.style.overflowX = "hidden";
                this.mOnResizeCallback = (aEvent) => this.onWindowResize__EventHandler(aEvent);
                window.addEventListener('resize', this.mOnResizeCallback);
                this.mStartResizeColumnCallback = (e) => this.onStartResizeColumn(e);
                this.mResizeColumnCallback = (e) => this.onResizeColumn(e);
                this.mMouseUpCalBack = (e) => this.onStopResizeColumn(e);
                window.addEventListener(asBase.events.MouseEvents.MOUSE_UP, this.mMouseUpCalBack);
                this.mRearrangeHadersCallback = () => this.rearrangeHaders();
            }
            //_______________________________________________________________________________________________________
            /**
             * insert the initiate column to the grid.
             *
             * @param {Array<DaGridColumn>} iColumnsDataArray
             * @param {string} pUniqueField
             *
             * @memberOf CoDataGrid
             */
            initColumns(iColumnsDataArray, pUniqueField) {
                if (this.mGridColumnData != null) {
                    console.error("Erroe: CoDataGrid::initColumns() - use this function only once. Use CoDataGrid::showColumns() insted");
                    return;
                }
                this.mNumColumnsToBuild = iColumnsDataArray.length;
                this.mGridColumnData = iColumnsDataArray.slice();
                this.mUniqueField = pUniqueField;
                let aColumnsDataArrayInView = new Array();
                for (let i = 0; i < this.gridColumnData.length; i++) {
                    if (this.mGridColumnData[i].visible) {
                        aColumnsDataArrayInView.push(this.mGridColumnData[i]);
                        this.createHeader(this.mGridColumnData[i]);
                        this.createColumn(this.mGridColumnData[i]);
                    }
                }
                this.refrashOrder(aColumnsDataArrayInView);
            }
            /**
             * Update the columns that shows in the data grid. The Data Grid will show only the columns that in iColumnsDataArray.
             * You can Add new columns in that function
             *
             * @param {Array<DaGridColumn>} iColumnsDataArray - Columns to show
             * @returns
             *
             * @memberOf CoDataGrid
             */
            setColumns(iColumnsDataArray) {
                let aIsCreatedNewColumns = false;
                if (this.mGridColumnData == null) {
                    console.error("Erroe: CoDataGrid::showColumns() - You must use CoDataGrid::initColumns() isted");
                    return;
                }
                this.mNumColumnsToBuild = iColumnsDataArray.length;
                this.removeColumnsByOrder();
                for (let i = 0; i < this.mGridColumnData.length; i++) {
                    this.mGridColumnData[i].visible = false;
                }
                for (let i = 0; i < iColumnsDataArray.length; i++) {
                    iColumnsDataArray[i].visible = true;
                    if (iColumnsDataArray[i].columnElement == null) {
                        this.createHeader(iColumnsDataArray[i]);
                        this.createColumn(iColumnsDataArray[i]);
                        this.createItemsForNewColumn(iColumnsDataArray[i]);
                        aIsCreatedNewColumns = true;
                    }
                    else if (iColumnsDataArray[i].columnElement.innerHTML == "") {
                        this.createItemsForNewColumn(iColumnsDataArray[i]);
                        aIsCreatedNewColumns = true;
                    }
                }
                for (let i = 0; i < iColumnsDataArray.length; i++) {
                    if (this.mGridColumnData.indexOf(iColumnsDataArray[i]) == -1) {
                        this.mGridColumnData.push(iColumnsDataArray[i]);
                    }
                }
                this.refrashOrder(iColumnsDataArray);
                if (!aIsCreatedNewColumns) {
                    this.completeColumnsBuild();
                }
            }
            //________________________________________________________________________________________
            showColumns(iShowColumnsDataArray, iHideColumnsDataArray) {
                if (iShowColumnsDataArray == null) {
                    iShowColumnsDataArray = new Array();
                }
                if (iHideColumnsDataArray == null) {
                    iHideColumnsDataArray = new Array();
                }
                let aColumnsArray = iShowColumnsDataArray.concat();
                for (let c = this.mGridColumnByOrder.length - 1; c >= 0; c--) {
                    if ((aColumnsArray.indexOf(this.mGridColumnByOrder[c]) == -1) && (iHideColumnsDataArray.indexOf(this.mGridColumnByOrder[c]) == -1)) {
                        aColumnsArray.unshift(this.mGridColumnByOrder[c]);
                    }
                    else {
                        this.mGridColumnByOrder[c].actualColumnWidth = this.mGridColumnByOrder[c].columnWidth;
                        this.mGridColumnByOrder[c].isSetByUser = false;
                    }
                }
                //for (let c = aColumnsArray.length - 1; c >= 0; c--) {
                //    if (iHideColumnsDataArray.indexOf(aColumnsArray[c]) >= 0) {
                //        aColumnsArray.splice(c, 1);
                //    }
                //}
                if (this.isEqual(this.mGridColumnByOrder, aColumnsArray)) {
                    return;
                }
                this.setColumns(aColumnsArray);
                if (this.dataProvider) {
                    this.dataProvider.select();
                }
            }
            //__________________________________________________________________
            /**
             * * Update the columns that shows in the data grid by list of DataFields.
             *
             * @param {Array<string>} pFields
             *
             * @memberOf CoDataGrid
             */
            showColumnsByFields(pFields) {
                let aColumnsDataArray = new Array();
                for (let i = 0; i < pFields.length; i++) {
                    let aDaGridColumn = this.getColumnData(pFields[i]);
                    aColumnsDataArray.push(aDaGridColumn);
                }
                this.setColumns(aColumnsDataArray);
            }
            //__________________________________________________________________
            /**
             *  Move the column to be the first column
             *
             * @param {DaGridColumn} pColumnData
             * @returns
             *
             * @memberOf CoDataGrid
             */
            moveToHead(pColumnData) {
                if (pColumnData.headerElement == null) {
                    return;
                }
                let aIndex = this.mGridColumnByOrder.indexOf(pColumnData);
                if (aIndex <= 0) {
                    return;
                }
                this.mHeader.insertBefore(pColumnData.headerElement, this.mGridColumnByOrder[0].headerElement);
                this.mBody.insertBefore(pColumnData.columnElement, this.mGridColumnByOrder[0].columnElement);
                this.mGridColumnByOrder.splice(aIndex, 1);
                this.mGridColumnByOrder.unshift(pColumnData);
                this.updateColumnsLocation();
            }
            //__________________________________________________________________________
            set onProgress(pCallback) {
                this.mOnProgress = pCallback;
            }
            get onProgress() {
                return (this.mOnProgress);
            }
            //__________________________________________________________________________
            isEqual(aColumnsArray1, aColumnsArray2) {
                if (aColumnsArray1.length != aColumnsArray2.length) {
                    return false;
                }
                for (let i = 0; i < aColumnsArray1.length; i++) {
                    if (aColumnsArray1[i] != aColumnsArray2[i]) {
                        return false;
                    }
                }
                return true;
            }
            //__________________________________________________________________________
            removeChild(pElement) {
                Utils.showPart(pElement, false);
                if (this.mIsWidthHorizontalScroll) {
                    if (pElement.parentElement != null) {
                        pElement.parentElement.removeChild(pElement);
                    }
                }
            }
            //__________________________________________________________________________
            appendChild(pParent, pElement) {
                if (pParent != pElement.parentElement) {
                    pParent.appendChild(pElement);
                }
                Utils.showPart(pElement, true);
            }
            //__________________________________________________________________________
            removeColumnsByOrder() {
                if (this.mGridColumnByOrder != null) {
                    for (let i = 0; i < this.mGridColumnByOrder.length; i++) {
                        this.removeChild(this.mGridColumnByOrder[i].headerElement);
                        this.removeChild(this.mGridColumnByOrder[i].columnElement);
                    }
                    this.mGridColumnByOrder.length = 0;
                }
                else {
                    this.mHeader.innerHTML = "";
                    this.mBody.innerHTML = "";
                }
            }
            //__________________________________________________________________________
            refrashOrder(pColumnsDataArray) {
                this.mGridColumnByOrder = new Array();
                for (let i = 0; i < pColumnsDataArray.length; i++) {
                    this.appendChild(this.mHeader, pColumnsDataArray[i].headerElement);
                    this.appendChild(this.mBody, pColumnsDataArray[i].columnElement);
                    this.mGridColumnByOrder.push(pColumnsDataArray[i]);
                }
                this.rearrangeHaders();
            }
            //___________________________________________________________________
            showColumn(iColumnData) {
            }
            //___________________________________________________________________
            createItemsForNewColumn(iColumnData) {
                let aIr;
                if (this.mDataProvider && this.gridColumnData.length > 0) {
                    for (let j = 0; j < this.mDataProvider.source.length; ++j) {
                        aIr = this.createIr(iColumnData, j);
                        this.mDataProvider.addIrToSource(aIr);
                    }
                    this.completeColumnsBuild();
                }
            }
            //______________________________________________________________
            onWindowResize__EventHandler(aEvent) {
                this.rearrangeHaders();
            }
            //_______________________________________________________________________________________________________
            getColumnElement(iDataField) {
                let aDaGridColumn = this.getColumnData(iDataField);
                if (aDaGridColumn == null) {
                    return null;
                }
                return aDaGridColumn.columnElement;
            }
            //_______________________________________________________________________________________________________
            getColumnData(iDataField) {
                for (let i = 0; i < this.gridColumnData.length; ++i) {
                    let aData = this.mGridColumnData[i];
                    if (aData.dataField == iDataField) {
                        return aData;
                    }
                }
                return null;
            }
            //__________________________________________________________________________________
            // Create the header DIV
            createHeader(iColumnData) {
                //let aHeader = this.createDefaultHeader(iColumnData);
                //iColumnData.headerElement = aHeader;
                //return aHeader;
                let aSkin = (typeof iColumnData.irHeaderSkinPath == "string") ? iColumnData.irHeaderSkinPath : this.createDefaultHeader(iColumnData);
                let aIrArgs = [iColumnData, aSkin, this.mHeader, iColumnData.irHeaderTitle];
                let aIrFactory = new asBase.CoClassFactory(window);
                let aIrClass = this.getIrClass(iColumnData.irHeaderClassPath);
                let aIr = aIrFactory.getInstance(aIrClass, aIrArgs);
                aIr.addClass(asBase.Styles.ITEM_RENDERER_CLASS_NAME);
                iColumnData.headerElement = aIr.contentWrapper;
                aIr.contentWrapper.ir = aIr;
                return aIr.contentWrapper;
            }
            //_______________________________________________________________________________
            createDefaultHeader(pData) {
                let aHeaderIr = document.createElement("div");
                aHeaderIr.classList.add('ir', 'header');
                aHeaderIr.style.overflow = 'hidden';
                let aHeaderItem = document.createElement("div");
                aHeaderItem.id = 'item' + Utils.uniqueId;
                aHeaderItem.classList.add('grid-column', 'clearfix', 'ui-resizable', pData.cssClass);
                let aLabel = document.createElement("label");
                aLabel.innerHTML = pData.irHeaderTitle;
                aHeaderItem.appendChild(aLabel);
                let aHandle = document.createElement("div");
                aHandle.classList.add('resize-handle-right');
                aHandle.style.zIndex = '90';
                aHeaderItem.appendChild(aHandle);
                aHeaderIr.appendChild(aHeaderItem);
                return aHeaderIr;
            }
            //__________________________________________________________________________________
            addMouseEvents() {
                let aElements = this.mHeader.getElementsByClassName("resize-handle-right");
                for (let i = 0; i < aElements.length; i++) {
                    aElements[i].removeEventListener(asBase.events.MouseEvents.MOUSE_DOWN, this.mStartResizeColumnCallback);
                    aElements[i].addEventListener(asBase.events.MouseEvents.MOUSE_DOWN, this.mStartResizeColumnCallback);
                }
            }
            //__________________________________________________________________________________
            rearrangeHaders() {
                if (this.mGridColumnByOrder == null) {
                    return;
                }
                let aNumOfCulomns = this.mGridColumnByOrder.length;
                let aLastIndex = aNumOfCulomns - 1;
                if (aNumOfCulomns == 0) {
                    return;
                }
                if (!this.mIsWidthHorizontalScroll) {
                    this.mGridColumnByOrder[aLastIndex].columnWidth = -1;
                    this.mGridColumnByOrder[aLastIndex].isSetByUser = false;
                }
                clearTimeout(this.mRearrangeHadersTimeOut);
                if (this.mBody.getBoundingClientRect().width == 0) {
                    this.mRearrangeHadersTimeOut = setTimeout(this.mRearrangeHadersCallback, 100);
                    return;
                }
                for (let i = 0; i < aNumOfCulomns; i++) {
                    if ((this.mGridColumnByOrder[i].headerElement == null) || (this.mGridColumnByOrder[i].headerElement.getBoundingClientRect().width == 0)) {
                        this.mRearrangeHadersTimeOut = setTimeout(this.mRearrangeHadersCallback, 100);
                        return;
                    }
                }
                this.addMouseEvents();
                let aWidth = this.mBody.getBoundingClientRect().width - 1;
                let aNumOfResizebalColumn = this.mGridColumnByOrder.length;
                for (let c = 0; c < aNumOfCulomns; c++) {
                    //******** this.mGridColumnByOrder[c].isSetByUser ************
                    // if (this.mGridColumnByOrder[c].actualColumnWidth > 0) {
                    if (this.mGridColumnByOrder[c].isSetByUser || this.isFixSize(this.mGridColumnByOrder[c])) {
                        aWidth -= this.mGridColumnByOrder[c].actualColumnWidth;
                        aNumOfResizebalColumn--;
                    }
                }
                if ((aNumOfResizebalColumn == 0) && (aWidth > 0)) {
                    this.mGridColumnByOrder[aLastIndex].actualColumnWidth += aWidth;
                }
                else {
                    let aColumnSize = aWidth / aNumOfResizebalColumn;
                    for (let c = 0; c < aNumOfCulomns; c++) {
                        if (!this.mGridColumnByOrder[c].isSetByUser && !this.isFixSize(this.mGridColumnByOrder[c])) {
                            this.mGridColumnByOrder[c].actualColumnWidth = aColumnSize;
                        }
                    }
                }
                for (let c = 0; c < aNumOfCulomns; c++) {
                    if (this.mIsWidthHorizontalScroll) {
                        if (this.mGridColumnByOrder[c].actualColumnWidth < this.mGridColumnByOrder[c].minWidth) {
                            this.mGridColumnByOrder[c].actualColumnWidth = this.mGridColumnByOrder[c].minWidth;
                        }
                    }
                    this.mGridColumnByOrder[c].headerElement.style.width = (this.mGridColumnByOrder[c].actualColumnWidth - CoDataGrid.COL_GAP) + "px";
                    this.mGridColumnByOrder[c].columnElement.style.width = (this.mGridColumnByOrder[c].actualColumnWidth - CoDataGrid.COL_GAP) + "px";
                }
                this.updateColumnsLocation();
            }
            //__________________________________________________________________________________
            isFixSize(pGridColumn) {
                if (pGridColumn.minWidth == 0) {
                    return false;
                }
                return (pGridColumn.minWidth == pGridColumn.maxWidth);
            }
            //__________________________________________________________________________________
            updateColumnsLocation() {
                let aLocation = 1;
                for (let i = 0; i < this.mGridColumnByOrder.length; i++) {
                    this.mGridColumnByOrder[i].headerElement.style.position = "absolute";
                    this.mGridColumnByOrder[i].headerElement.style.left = aLocation + "px";
                    this.mGridColumnByOrder[i].columnElement.style.left = aLocation + "px";
                    aLocation += this.mGridColumnByOrder[i].actualColumnWidth;
                }
            }
            //__________________________________________________________________________________
            sortToTheLeft(a, b) {
                if (a.headerElement.getBoundingClientRect().left > b.headerElement.getBoundingClientRect().left) {
                    return 1;
                }
                return -1;
            }
            //__________________________________________________________________________________
            onResizeColumn(pMouseEvent) {
                pMouseEvent.preventDefault();
                if (DaUnderDevelopment.SHOW_DATAGRID_RELATED) {
                    console.log("Datagrid - >>> on Resize Column");
                }
                let aDeltaX = pMouseEvent.clientX - this.mLastMouseX;
                this.mLastMouseX = pMouseEvent.clientX;
                let aCurrenColumnSize = this.mCurrentResizeColumn.actualColumnWidth + aDeltaX;
                let aEffectedColumnSize = this.mEffectedRisizeColumn.actualColumnWidth - aDeltaX;
                let aMin = (this.mCurrentResizeColumn.minWidth > CoDataGrid.MIN_COL_WIDTH) ? this.mCurrentResizeColumn.minWidth : CoDataGrid.MIN_COL_WIDTH;
                if (aCurrenColumnSize <= aMin) {
                    return;
                }
                if (this.mCurrentResizeColumn.maxWidth > 0) {
                    if (aCurrenColumnSize >= this.mCurrentResizeColumn.maxWidth) {
                        return;
                    }
                }
                aMin = (this.mEffectedRisizeColumn.minWidth > CoDataGrid.MIN_COL_WIDTH) ? this.mEffectedRisizeColumn.minWidth : CoDataGrid.MIN_COL_WIDTH;
                if (aEffectedColumnSize <= aMin) {
                    return;
                }
                if (this.mEffectedRisizeColumn.maxWidth > 0) {
                    if (aEffectedColumnSize >= this.mEffectedRisizeColumn.maxWidth) {
                        return;
                    }
                }
                this.mCurrentResizeColumn.actualColumnWidth = aCurrenColumnSize;
                this.mEffectedRisizeColumn.actualColumnWidth = aEffectedColumnSize;
                this.mCurrentResizeColumn.headerElement.style.width = (this.mCurrentResizeColumn.actualColumnWidth - CoDataGrid.COL_GAP) + "px";
                this.mCurrentResizeColumn.columnElement.style.width = (this.mCurrentResizeColumn.actualColumnWidth - CoDataGrid.COL_GAP) + "px";
                this.mEffectedRisizeColumn.headerElement.style.width = (this.mEffectedRisizeColumn.actualColumnWidth - CoDataGrid.COL_GAP) + "px";
                this.mEffectedRisizeColumn.columnElement.style.width = (this.mEffectedRisizeColumn.actualColumnWidth - CoDataGrid.COL_GAP) + "px";
                this.updateColumnsLocation();
            }
            //__________________________________________________________________________________
            onStopResizeColumn(pMouseEvent) {
                window.removeEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this.mResizeColumnCallback);
            }
            //__________________________________________________________________________________
            onStartResizeColumn(pMouseEvent) {
                if (DaUnderDevelopment.SHOW_DATAGRID_RELATED) {
                    console.log("Datagrid - > Start Resize Column");
                }
                this.mCurrentResizeColumn = this.getHeaderElementFromChild(pMouseEvent.target);
                if (this.isFixSize(this.mCurrentResizeColumn)) {
                    return;
                }
                this.mCurrentResizeColumn.isSetByUser = true;
                this.mEffectedRisizeColumn = this.getEffectedColumn(this.mCurrentResizeColumn);
                if (this.mEffectedRisizeColumn == null) {
                    return;
                }
                this.mLastMouseX = pMouseEvent.clientX;
                window.removeEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this.mResizeColumnCallback);
                window.addEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this.mResizeColumnCallback);
            }
            //_____________________________________________________________________________________
            getEffectedColumn(pDaGridColumn) {
                let aFromIndex = this.mGridColumnByOrder.indexOf(pDaGridColumn) + 1;
                for (let c = aFromIndex; c < this.mGridColumnByOrder.length; c++) {
                    if (!this.isFixSize(this.mGridColumnByOrder[c])) {
                        return this.mGridColumnByOrder[c];
                    }
                }
                return null;
            }
            //_____________________________________________________________________________________
            getHeaderElementFromChild(pHTMLElement) {
                while ((pHTMLElement.parentElement != null) && (pHTMLElement.parentElement != this.mHeader)) {
                    pHTMLElement = pHTMLElement.parentElement;
                }
                for (let i = 0; i < this.mGridColumnByOrder.length; i++) {
                    if (this.mGridColumnByOrder[i].headerElement == pHTMLElement) {
                        return this.mGridColumnByOrder[i];
                    }
                }
                return null;
            }
            //___________________________________________________________________________________
            // Create the column DIV
            createColumn(pData) {
                let aColumnItem = document.createElement("div");
                aColumnItem.style.position = "absolute";
                aColumnItem.style.top = "0px";
                aColumnItem.id = 'item' + Utils.uniqueId;
                aColumnItem.classList.add('grid-column', 'clearfix', 'ui-resizable', pData.cssClass);
                pData.columnElement = aColumnItem;
                return aColumnItem;
            }
            //_______________________________________________________________________________________________________
            getColumnIndexByField(iDataField) {
                for (let i = 0; i < this.gridColumnData.length; ++i) {
                    let aData = this.mGridColumnData[i];
                    if (aData.dataField == iDataField) {
                        return i;
                    }
                }
                return -1;
            }
            //_________________________________________________________________
            createItems(pFrom = 0) {
                let aIr;
                let aSourceLength = this.mDataProvider.length;
                let aTo = (pFrom + 40 < aSourceLength) ? (pFrom + 40) : aSourceLength;
                ///console.log("create From :" + pFrom + " To : " + aTo);
                if (this.mDataProvider && this.gridColumnData.length > 0) {
                    for (let j = pFrom; j < aTo; ++j) {
                        let aData = this.mDataProvider.getItemAt(j);
                        let aSourceArrayIndex = this.mDataProvider.getSourceArrayIndex(aData);
                        for (let i = 0; i < this.mGridColumnByOrder.length; ++i) {
                            aIr = this.createIr(this.mGridColumnByOrder[i], aSourceArrayIndex, aData);
                            this.mDataProvider.addIrToSource(aIr);
                        }
                    }
                    if (aTo != aSourceLength) {
                        setTimeout((aTo) => this.createItems(aTo), 20, aTo);
                        if (this.onProgress != null) {
                            this.onProgress(aTo, aSourceLength);
                        }
                        if (DaUnderDevelopment.SHOW_DATAGRID_RELATED) {
                            console.log("Build " + aTo + " / " + aSourceLength + "  Time :" + (((new Date().getTime()) - this.mBuildStartTime) / 1000));
                        }
                    }
                    else {
                        if (DaUnderDevelopment.SHOW_DATAGRID_RELATED) {
                            console.log(" Data Grid Build Time = " + (((new Date().getTime()) - this.mBuildStartTime) / 1000));
                        }
                        this.completeBuild();
                    }
                }
            }
            //__________________________________________________________________
            setHeaderText(pColumnData, pText) {
                if (pColumnData.headerElement == null) {
                    pColumnData.irHeaderTitle = pText;
                }
                else {
                    let aIr = pColumnData.headerElement.ir;
                    aIr.label = pText;
                }
            }
            //__________________________________________________________________
            createIr(iColumnData, i, iNewData) {
                let aDaGridCollection;
                if (iNewData == null) {
                    // on all source
                    aDaGridCollection = this.mDataProvider.source[i];
                    iNewData = aDaGridCollection.data;
                }
                else {
                    aDaGridCollection = this.mDataProvider.source[i];
                }
                let aIr = this.createItemRenderer(iNewData, iColumnData.columnElement, iColumnData);
                this.addIrListeners(aIr);
                //aIr.dataField = iColumnData.dataField;
                aDaGridCollection.addIr(iColumnData.dataField, aIr);
                return aIr;
            }
            //__________________________________________________________________
            completeRefresh() {
                this.dispatchEvent(new AsEvent(EvDataGrid.DG_REFRESHED, false, this).event);
            }
            //__________________________________________________________________
            completeColumnsBuild() {
                if (this.mDataProvider.length == 0 || this.mDataProvider.areAllIrsInitialized() && this.mNumColumnsToBuild == this.mGridColumnByOrder.length) {
                    clearTimeout(this.mDoColumnsBuildCompleteTimeOut);
                    this.mDoColumnsBuildCompleteTimeOut = setTimeout(() => this.dispatchBuildColumnsComplete(), 10);
                }
                else {
                    clearTimeout(this.mColumnsBuildCompleteTimeOut);
                    this.mColumnsBuildCompleteTimeOut = setTimeout(() => this.completeColumnsBuild(), 500);
                }
            }
            //_______________________________________________________________
            dispatchBuildColumnsComplete() {
                this.dispatchEvent(new AsEvent(EvDataGrid.DG_COLUMN_BUILDER_COMPLETE, false, this).event);
            }
            //__________________________________________________________________
            completeBuild() {
                clearTimeout(this.mBuildCompleteTimeout);
                this.mBuildCompleteTimeout = setTimeout(() => this.dispatchBuildComplete(), 10);
            }
            //_______________________________________________________________
            dispatchBuildComplete() {
                if (this.mDataProvider.length == 0 || this.mDataProvider.areAllIrsInitialized()) {
                    this.dispatchEvent(new AsEvent(EvDataGrid.DG_BUILDER_COMPLETE, false, this).event);
                }
                else {
                    clearTimeout(this.mBuildCompleteTimeout);
                    this.mBuildCompleteTimeout = setTimeout(() => this.dispatchBuildComplete(), 500);
                }
            }
            //__________________________________________________________________
            addIrListeners(iIr) {
                iIr.addEventListener(EvItemRenderer.IR_MOUSE_OVER, (event) => this.irGridMouseOver(event), this);
                iIr.addEventListener(EvItemRenderer.IR_MOUSE_OUT, (event) => this.irGridMouseOut(event), this);
                iIr.addEventListener(EvItemRenderer.IR_MOUSE_DOWN, (event) => this.irGridMouseDown(event), this);
            }
            //__________________________________________________________________
            irGridMouseOver(event) {
                this.mDataProvider.irMouseOver(event.detail.sender);
            }
            //__________________________________________________________________
            irGridMouseOut(event) {
                this.mDataProvider.irMouseOut(event.detail.sender);
            }
            //__________________________________________________________________
            irGridMouseDown(event) {
                this.mDataProvider.irMouseDown(event.detail.sender);
            }
            //_______________________________________________________________
            createItemRenderer(iData, iContainer, iColumnData) {
                let aSkin = (typeof iColumnData.irSkinPath == "string") ? iColumnData.irSkinPath : this.createDefaultIrSkin();
                let aIrArgs = [iData, aSkin, iContainer, iColumnData.dataField];
                let aIrFactory = new asBase.CoClassFactory(window);
                let aIrClass = this.getIrClass(iColumnData.irClassPath);
                let aIr = aIrFactory.getInstance(aIrClass, aIrArgs);
                aIr.addClass(asBase.Styles.ITEM_RENDERER_CLASS_NAME);
                return aIr;
            }
            //_______________________________________________________________
            getIrClass(iPath) {
                if (iPath == undefined) {
                    iPath = this.DEFAULT_IR_CLASS_NAME;
                }
                let aIrClass = iPath.split(".");
                return aIrClass;
            }
            //__________________________________________________________________
            createDefaultIrSkin() {
                let aMainDiv = document.createElement("div");
                aMainDiv.classList.add(asBase.Styles.ITEM_RENDERER_CLASS_NAME);
                aMainDiv.innerHTML = '<div id="' + ItemRenderer.itemId + '" class="guest-item clearfix"><label id="' + ItemRenderer.itemLabelId + '"></label></div>';
                return aMainDiv;
            }
            //_______________________________________________________________
            handShake() {
                this.mDataProvider.uniqueField = this.mUniqueField;
                this.mDataProvider.dataGrid = this;
            }
            //__________________________________________________________________
            /////////// ICoDataGrid - implementation functions
            //***********************
            //       get/set        *
            //***********************
            //_____________________________________________________________________
            /**
             * set the DataProvider
             *
             * @memberOf CoDataGrid
             */
            set dataProvider(value) {
                if ((this.mGridColumnData == null) || (this.mGridColumnData.length == 0)) {
                    if (DaUnderDevelopment.SHOW_DATAGRID_RELATED) {
                        console.log("Error: Can't add GridCollection before setting Column Data. Call CoDataGrid::initColumns() first) ");
                    }
                    return;
                }
                if (this.mDataProvider == value) {
                    this.completeBuild();
                    return;
                }
                else if (this.mDataProvider != null) {
                    this.mDataProvider.dataGrid = null;
                }
                this.mDataProvider = value;
                this.handShake();
                this.clearColumns();
                this.mBuildStartTime = (new Date().getTime());
                this.mDataProvider.refreshNoView();
                this.createItems();
            }
            //_________________________________________________________________
            clearColumns() {
                for (let i = 0; i < this.gridColumnData.length; ++i) {
                    if (this.gridColumnData[i].columnElement != null) {
                        this.gridColumnData[i].columnElement.innerHTML = "";
                    }
                }
            }
            //_____________________________________________________________________
            /**
             * get the current dataProvider.
             *
             * @type {GridCollection}
             * @memberOf CoDataGrid
             */
            get dataProvider() {
                return this.mDataProvider;
            }
            //_____________________________________________________________________
            /**
             * get the columns
             *
             * @readonly
             * @type {Array<DaGridColumn>}
             * @memberOf CoDataGrid
             */
            get gridColumnData() {
                return this.mGridColumnData;
            }
            //_____________________________________________________________________
            get width() {
                return this.mContentWrapper.getBoundingClientRect().width;
            }
            //__________________________________________________________________
            /**
             * Kill The DataGrid
             *
             *
             * @memberOf CoDataGrid
             */
            dispose() {
                window.removeEventListener('resize', this.mOnResizeCallback);
                this.mGridColumnByOrder = null;
                clearTimeout(this.mRearrangeHadersTimeOut);
                this.mRearrangeHadersCallback = null;
                this.mOnResizeCallback = null;
                this.setToSleep();
                this.data = undefined;
                window.removeEventListener(asBase.events.MouseEvents.MOUSE_UP, this.mMouseUpCalBack);
                this.mStartResizeColumnCallback = null;
                this.mResizeColumnCallback = null;
                this.mRearrangeHadersCallback = null;
                this.mHeader.innerHTML = "";
                this.mBody.innerHTML = "";
            }
            //__________________________________________________________________
            get isWidthHorizontalScroll() {
                return this.mIsWidthHorizontalScroll;
            }
            set isWidthHorizontalScroll(iValue) {
                this.mIsWidthHorizontalScroll = iValue;
            }
        }
        //------------------------------
        // Members
        //------------------------------
        CoDataGrid.MIN_COL_WIDTH = 20;
        CoDataGrid.COL_GAP = 0;
        datagrid.CoDataGrid = CoDataGrid;
    })(datagrid = gencom.datagrid || (gencom.datagrid = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var datagrid;
    (function (datagrid) {
        var DaArrayCollection = asBase.collections.DaArrayCollection;
        class DaGridCollection extends DaArrayCollection {
            constructor(iData, iIr) {
                super(iData, iIr);
                this.mHash = {};
            }
            //__________________________________________________________________
            dispose() {
                for (let aField in this.mHash) {
                    delete (this.mHash[aField]);
                }
                this.mHash = null;
                super.dispose();
            }
            getIrsHash() {
                return this.mHash;
            }
            //__________________________________________________________________
            addIr(iField, iIr) {
                this.mHash[iField] = iIr;
            }
            //__________________________________________________________________
            select(value) {
                for (let aField in this.mHash) {
                    let aIr = this.mHash[aField];
                    aIr.selected = value;
                }
            }
            //__________________________________________________________________
            reappend() {
                for (let aField in this.mHash) {
                    let aIr = this.mHash[aField];
                    aIr.reappend();
                }
            }
            //__________________________________________________________________
            inView(iVal) {
                for (let aField in this.mHash) {
                    let aIr = this.mHash[aField];
                    iVal ? aIr.show() : aIr.hide();
                }
            }
        }
        datagrid.DaGridCollection = DaGridCollection;
    })(datagrid = gencom.datagrid || (gencom.datagrid = {}));
})(gencom || (gencom = {}));
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
var gencom;
///<reference path="../../asBase/baseclasses/ItemRenderer.ts"/>
(function (gencom) {
    var datagrid;
    (function (datagrid) {
        var ItemRenderer = asBase.baseclasses.ItemRenderer;
        class IrGridHeader extends ItemRenderer {
            /****************************
             * Declarations
             ****************************/
            //------------------------------
            // Skin parts
            //------------------------------
            //------------------------------
            // Members
            //------------------------------
            constructor(iData, iSkin, iContainer, iDataField, iNoWrapper) {
                super(iData, iSkin, iContainer, iDataField, iNoWrapper);
            }
            //__________________________________________________________________
            updateView() {
                if (this.data !== null && this.data !== undefined) { // for simple type: 0
                    if (this.mDataField) {
                        if (this.data[this.mDataField] == null) {
                            this.label = this.mDataField;
                        }
                        else {
                            this.label = this.data[this.mDataField];
                        }
                    }
                    else { // allow plain array of strings
                        this.label = this.data;
                    }
                }
                if (this.mSelected) {
                    this.addClass(asBase.Styles.ITEM_RENDERER_SELECTED_CLASS_NAME);
                }
                else {
                    this.removeClass(asBase.Styles.ITEM_RENDERER_SELECTED_CLASS_NAME);
                }
            }
        }
        datagrid.IrGridHeader = IrGridHeader;
    })(datagrid = gencom.datagrid || (gencom.datagrid = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var filedrag;
    (function (filedrag) {
        var MouseEvents = asBase.events.MouseEvents;
        var EventTypes = asBase.events.EventTypes;
        class CoFileDrag {
            constructor(iFileDrag_div, iFileBrowse_btn, iFilesInput, iCallBackFunction, iIsWithMultiUpload = false) {
                this.fileDrag_div = iFileDrag_div;
                this.fileBrowse_btn = iFileBrowse_btn;
                this.mFilesInput = iFilesInput;
                this.mCallBackFunction = iCallBackFunction;
                this.mIsWithMultiUpload = iIsWithMultiUpload;
                this.mFileReader = new FileReader();
                this.setToActive();
            }
            //____________________________________________________________________
            setToActive() {
                if (this.fileDrag_div != null) {
                    this.fileDragOver__EventHandler_Func = (event) => this.onDragOverFile__EventHandler(event);
                    this.fileDrag_div.addEventListener(MouseEvents.DRAG_OVER, this.fileDragOver__EventHandler_Func);
                    this.onDragLeaveFile__EventHandler_Func = (event) => this.onDragLeaveFile__EventHandler(event);
                    this.fileDrag_div.addEventListener(MouseEvents.DRAG_LEAVE, this.onDragLeaveFile__EventHandler_Func);
                    this.fileDragDrop__EventHandler_Func = (event) => this.onDropFile__EventHandler(event);
                    this.fileDrag_div.addEventListener(MouseEvents.DROP, this.fileDragDrop__EventHandler_Func);
                    this.onNoneDrag__EventHandler_Func = (pEvent) => this.onNoneDrag__EventHandler(pEvent);
                    document.body.addEventListener(MouseEvents.DRAG_OVER, this.onNoneDrag__EventHandler_Func);
                    document.body.addEventListener(MouseEvents.DRAG_LEAVE, this.onNoneDrag__EventHandler_Func);
                    document.body.addEventListener(MouseEvents.DROP, this.onNoneDrag__EventHandler_Func);
                }
                if (this.fileBrowse_btn != null) {
                    this.mOnBrowseBind__EventHandler_Func = () => this.onBrowseBind__EventHandler();
                    this.fileBrowse_btn.addEventListener(MouseEvents.CLICK, this.mOnBrowseBind__EventHandler_Func);
                    this.onFileSelect__EventHandler_Func = (pEvent) => this.onFileSelect__EventHandler(pEvent);
                    this.mFilesInput.addEventListener(EventTypes.CHANGE, this.onFileSelect__EventHandler_Func);
                }
                this.onFileReaded__EventHandler_Func = (pEvent) => this.onFileReaded__EventHandler(pEvent);
                this.mFileReader.onload = this.onFileReaded__EventHandler_Func;
            }
            //_______________________________________________________________
            setToSleep() {
                if (this.fileDrag_div != null) {
                    this.fileDrag_div.removeEventListener(MouseEvents.DRAG_OVER, this.fileDragOver__EventHandler_Func);
                    this.fileDrag_div.removeEventListener(MouseEvents.DRAG_LEAVE, this.fileDragOver__EventHandler_Func);
                    this.fileDragOver__EventHandler_Func = null;
                    this.fileDrag_div.removeEventListener(MouseEvents.DROP, this.fileDragDrop__EventHandler_Func);
                    this.fileDragDrop__EventHandler_Func = null;
                }
                if (this.fileBrowse_btn != null) {
                    this.fileBrowse_btn.removeEventListener(MouseEvents.CLICK, this.mOnBrowseBind__EventHandler_Func);
                    this.mOnBrowseBind__EventHandler_Func = null;
                    this.mFilesInput.removeEventListener(EventTypes.CHANGE, this.onFileSelect__EventHandler_Func);
                    this.onFileSelect__EventHandler_Func = null;
                }
                this.mFileReader.onload = null;
                this.onFileReaded__EventHandler_Func = null;
            }
            //________________________________________________________________
            onBrowseBind__EventHandler() {
                this.mFilesInput.value = "";
                this.mFilesInput.click();
            }
            //__________________________________________________________________
            onFileSelect__EventHandler(pEvent) {
                if (pEvent.target.files.length > 0) {
                    //Create handler
                    if (!filedrag.FileUtil.getIsFileOk(pEvent.target.files[0])) {
                        return;
                    }
                    if (this.mIsWithMultiUpload) {
                        this.mCallBackFunction(pEvent.target.files);
                    }
                    else {
                        this.mFileReader.readAsDataURL(pEvent.target.files[0]);
                    }
                }
            }
            //__________________________________________________________________
            onFileReaded__EventHandler(pEvent) {
                //Create handler
                if (!filedrag.FileUtil.getIsImgDimenssionsValid(pEvent.target.result)) {
                    return;
                }
                this.mCallBackFunction(pEvent.target.result);
            }
            //__________________________________________________________________
            onNoneDrag__EventHandler(pEvent) {
                pEvent.stopPropagation();
                pEvent.preventDefault();
            }
            //__________________________________________________________________
            onDragOverFile__EventHandler(pEvent) {
                pEvent.stopPropagation();
                pEvent.preventDefault();
                filedrag.FileUtil.setDragFileOver(this.fileDrag_div);
                filedrag.FileUtil.clearDragFileOut(this.fileDrag_div);
            }
            //__________________________________________________________________
            onDragLeaveFile__EventHandler(pEvent) {
                pEvent.stopPropagation();
                pEvent.preventDefault();
                filedrag.FileUtil.setDragFileOut(this.fileDrag_div);
                filedrag.FileUtil.clearDragFileOver(this.fileDrag_div);
            }
            //__________________________________________________________________
            onDropFile__EventHandler(pEvent) {
                this.onDragLeaveFile__EventHandler(pEvent);
                const files = pEvent.target.files || pEvent.dataTransfer.files;
                if (files.length > 0) {
                    if (this.mIsWithMultiUpload) {
                        this.mCallBackFunction(files);
                    }
                    else {
                        if (!filedrag.FileUtil.getIsFileOk(files[0])) {
                            return;
                        }
                        this.mFileReader.readAsDataURL(files[0]);
                    }
                }
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________
            get uploadedFiles() {
                return this.mUploadedFiles;
            }
        }
        filedrag.CoFileDrag = CoFileDrag;
    })(filedrag = gencom.filedrag || (gencom.filedrag = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var filedrag;
    (function (filedrag) {
        var EventDispatcher = asBase.events.EventDispatcher;
        class DaFileDragData extends EventDispatcher {
            constructor(file, id) {
                super();
                this.mIsError = false;
                this.mErrorMessage = "";
                this.mIsUploaded = false;
                this.mFile = file;
                this.mFileName = file.name;
                this.mFileId = id;
            }
            //___________________________________________________________________________________
            setError(iIsError, iErrorMessage = "") {
                this.mIsError = iIsError;
                this.mErrorMessage = iErrorMessage;
                if (this.mIsError) {
                    this.dispatchEvent(filedrag.EvFileDrag.FILE_ERROR);
                }
                else {
                    this.dispatchEvent(filedrag.EvFileDrag.CLEAR_FILE_ERROR);
                }
            }
            //------------------------------
            // Getters & Setters
            //------------------------------
            //___________________________________________________________________________________
            get name() {
                return this.mFileName;
            }
            //___________________________________________________________________________________
            get id() {
                return this.mFileId;
            }
            set id(value) {
                this.mFileId = value;
            }
            //___________________________________________________________________________________
            get isError() {
                return this.mIsError;
            }
            //___________________________________________________________________________________
            get errorMessage() {
                return this.mErrorMessage;
            }
            //___________________________________________________________________________________
            get isUploaded() {
                return this.mIsUploaded;
            }
            set isUploaded(value) {
                this.mIsUploaded = value;
                if (this.mIsUploaded) {
                    this.dispatchEvent(filedrag.EvFileDrag.FILE_UPLOAD_COMPLETE);
                }
            }
            //___________________________________________________________________________________
            get file() {
                return this.mFile;
            }
            //___________________________________________________________________________________
            set fileDownloadUrl(value) {
                this.mFileDownloadUrl = value;
            }
            get fileDownloadUrl() {
                return this.mFileDownloadUrl;
            }
        }
        filedrag.DaFileDragData = DaFileDragData;
    })(filedrag = gencom.filedrag || (gencom.filedrag = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var filedrag;
    (function (filedrag) {
        class EvFileDrag {
        }
        EvFileDrag.FILE_ERROR = "FileDragComponent_FileError";
        EvFileDrag.FILE_UPLOAD_COMPLETE = "FileDragComponent_FileUploadComplete";
        EvFileDrag.CLEAR_FILE_ERROR = "FileDragComponent_ClearFileError";
        EvFileDrag.FILE_DRAG_OVER = "FileDragComponent_ClearFileError";
        EvFileDrag.FILE_DRAG_LEAVE = "FileDragComponent_ClearFileError";
        filedrag.EvFileDrag = EvFileDrag;
    })(filedrag = gencom.filedrag || (gencom.filedrag = {}));
})(gencom || (gencom = {}));
///<reference path="../messagewindow/CoMessageWindow.ts"/>
/**
 * Created by moran on 13-Jul-16.
 */
var gencom;
///<reference path="../messagewindow/CoMessageWindow.ts"/>
/**
 * Created by moran on 13-Jul-16.
 */
(function (gencom) {
    var filedrag;
    (function (filedrag) {
        var CoMessageWindow = com.entry.messagewindow.CoMessageWindow;
        class FileUtil {
            //***********************
            //       functions      *
            //***********************
            //________________________________________________________________________
            static getIsImgTypeValid(iFile) {
                // return (iFile.type == "image/jpeg" || iFile.type == "image/png");
                return true;
            }
            //________________________________________________________________________
            static getIsImgSizeValid(iFile) {
                if (iFile.size > FileUtil.MAX_SIZE) {
                    CoMessageWindow.sMessageWindow.switchToNotification();
                    CoMessageWindow.sMessageWindow.title = asBase.LanguageDictionary.getText("file-size-limit", "File Size Limit");
                    CoMessageWindow.sMessageWindow.message = asBase.LanguageDictionary.getText("cannot-load-file", "The file can not be uploaded because it exceeds the maximum file-size (3MB) allowed.");
                    CoMessageWindow.sMessageWindow.yesBtnLabel = asBase.LanguageDictionary.getText("OK", "OK");
                    CoMessageWindow.sMessageWindow.show();
                    return false;
                }
                return true;
            }
            //________________________________________________________________________
            static getIsImgDimenssionsValid(iFileReadResult) {
                let aImg = document.createElement("IMG");
                aImg.src = iFileReadResult;
                let aFileHeight = aImg.height;
                let aFileWidth = aImg.width;
                let aDimenssions = aFileHeight * aFileWidth;
                let aReturnValue = aDimenssions < FileUtil.MAX_DIMENSSIONS;
                if (!aReturnValue) {
                }
                return aReturnValue;
            }
            //_______________________________________________________________
            static setDragFileOver(iSkinPart) {
                iSkinPart.classList.add("vdpg-drag-over");
            }
            //_______________________________________________________________
            static clearDragFileOver(iSkinPart) {
                iSkinPart.classList.remove("vdpg-drag-over");
            }
            //_______________________________________________________________
            static setDragFileOut(iSkinPart) {
                iSkinPart.classList.add("vdpg-drag-no");
            }
            //_______________________________________________________________
            static clearDragFileOut(iSkinPart) {
                iSkinPart.classList.remove("vdpg-drag-no");
            }
            //________________________________________________________________________
            static getIsFileOk(iFile) {
                if (!FileUtil.getIsImgTypeValid(iFile) || !FileUtil.getIsImgSizeValid(iFile)) {
                    return false;
                }
                return true;
            }
        }
        FileUtil.MAX_SIZE = 3 * 1000 * 1000;
        FileUtil.MAX_DIMENSSIONS = 6250000;
        filedrag.FileUtil = FileUtil;
    })(filedrag = gencom.filedrag || (gencom.filedrag = {}));
})(gencom || (gencom = {}));
/// <reference path="../../asBase/SkinsCss.ts" />
///<reference path="../../asBase/baseclasses/PopUpWindow.ts"/>
///<reference path="../../asBase/CoComponentBase.ts"/>
///<reference path="../../asBase/events/MouseEvents.ts"/>
var gencom;
/// <reference path="../../asBase/SkinsCss.ts" />
///<reference path="../../asBase/baseclasses/PopUpWindow.ts"/>
///<reference path="../../asBase/CoComponentBase.ts"/>
///<reference path="../../asBase/events/MouseEvents.ts"/>
(function (gencom) {
    var floatwindow;
    (function (floatwindow) {
        var MouseEvents = asBase.events.MouseEvents;
        var PopUpWindow = asBase.baseclasses.PopUpWindow;
        var SkinsCss = asBase.SkinsCss;
        var EventManager = asBase.events.EventManager;
        var EventTypes = asBase.events.EventTypes;
        class CoFloatWindow extends PopUpWindow {
            constructor(iWindowSkin, iHTMLElement) {
                super(iWindowSkin, iHTMLElement ? iHTMLElement : asBase.Globals.MAIN_DIV);
                this.mWindowX = -1;
                this.mWindowY = -1;
            }
            //____________________________________________________________________
            creationComplete() {
                this.header_div = this.getPart("header_div");
                this.close_btn = this.getPart("close_btn");
                super.creationComplete();
                let aWindowX = (this.mWindowX > 0) ? this.mWindowX : 200;
                let aWindowY = (this.mWindowY > 0) ? this.mWindowY : 200;
                this.popup_content.style.top = aWindowY + 'px';
                this.popup_content.style.left = aWindowX + 'px';
                this.popup_content.style.zIndex = SkinsCss.LAYOUT_WINDOWS_ZINDEX;
            }
            //____________________________________________________________________
            addEventListeners() {
                super.addEventListeners();
                this.header_div.addEventListener(MouseEvents.MOUSE_DOWN, (event) => this.headerMouseDown__EventHandler(event));
                this.closeClicked__EventHandler_Func = () => this.closeClicked__EventHandler();
                this.close_btn.addEventListener(MouseEvents.CLICK, this.closeClicked__EventHandler_Func);
                this.windowClicked__EventHandler_Func = () => this.windowClicked__EventHandler();
                this.popup_div.addEventListener(MouseEvents.MOUSE_DOWN, this.windowClicked__EventHandler_Func);
            }
            //____________________________________________________________________
            removeEventListeners() {
                super.removeEventListeners();
                this.close_btn.removeEventListener(MouseEvents.CLICK, this.closeClicked__EventHandler_Func);
                this.closeClicked__EventHandler_Func = null;
                this.popup_div.removeEventListener(MouseEvents.MOUSE_DOWN, this.windowClicked__EventHandler_Func);
                this.windowClicked__EventHandler_Func = null;
            }
            //____________________________________________________________________
            windowClicked__EventHandler() {
                if (CoFloatWindow.sCurrentTopWindow) {
                    if (CoFloatWindow.sCurrentTopWindow != this.popup_content) {
                        CoFloatWindow.sCurrentTopWindow.style.zIndex = SkinsCss.LAYOUT_WINDOWS_ZINDEX;
                    }
                }
                this.popup_content.style.zIndex = SkinsCss.LAYOUT_TOP_WINDOW_ZINDEX;
                CoFloatWindow.sCurrentTopWindow = this.popup_content;
            }
            //____________________________________________________________________
            headerMouseDown__EventHandler(mouseEvent) {
                mouseEvent.preventDefault();
                mouseEvent.stopImmediatePropagation();
                EventManager.dispatchEvent(EventTypes.FLOAT_WINDOW_HEADER_MOUSE_DOWN, this);
                this.windowClicked__EventHandler();
                let event = mouseEvent;
                if (mouseEvent.touches) {
                    event = mouseEvent.touches[0];
                }
                this.mOffsetX = (event.clientX - (parseInt(this.popup_content.style.left)));
                this.mOffsetY = (event.clientY - (parseInt(this.popup_content.style.top)));
                if (!this.startDrag_Func) {
                    this.startDrag_Func = (event) => this.startDrag(event);
                    document.addEventListener(MouseEvents.MOUSE_MOVE, this.startDrag_Func);
                }
                if (!this.headerMouseUp__EventHandler_Func) {
                    this.headerMouseUp__EventHandler_Func = (event) => this.headerMouseUp__EventHandler(event);
                    document.addEventListener(MouseEvents.MOUSE_UP, this.headerMouseUp__EventHandler_Func);
                }
                this.mDocumentRect = document.body.getBoundingClientRect();
            }
            //____________________________________________________________________
            startDrag(mouseEvent) {
                if (mouseEvent.cancelable) {
                    mouseEvent.preventDefault();
                    mouseEvent.stopImmediatePropagation();
                }
                let event = mouseEvent;
                if (mouseEvent.touches) {
                    event = mouseEvent.touches[0];
                }
                if (event.clientX < this.mDocumentRect.left
                    || event.clientX > this.mDocumentRect.right
                    || event.clientY < this.mDocumentRect.top
                    || event.clientY > this.mDocumentRect.bottom) {
                    return;
                }
                this.popup_content.style.top = (event.clientY - this.mOffsetY) + 'px';
                this.popup_content.style.left = (event.clientX - this.mOffsetX) + 'px';
            }
            //____________________________________________________________________
            headerMouseUp__EventHandler(event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                this.removeDragListeners();
            }
            //____________________________________________________________________
            removeDragListeners() {
                document.removeEventListener(MouseEvents.MOUSE_UP, this.headerMouseUp__EventHandler_Func);
                this.headerMouseUp__EventHandler_Func = null;
                document.removeEventListener(MouseEvents.MOUSE_MOVE, this.startDrag_Func);
                this.startDrag_Func = null;
            }
            //____________________________________________________________________
            closeClicked__EventHandler() {
                this.hide();
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________
            set windowX(value) {
                this.mWindowX = value;
                if (this.popup_content) {
                    this.popup_content.style.top = 200 + 'px';
                }
            }
            //____________________________________________________________________
            set windowY(value) {
                this.mWindowY = value;
                if (this.popup_content) {
                    this.popup_content.style.left = 200 + 'px';
                }
            }
        }
        floatwindow.CoFloatWindow = CoFloatWindow;
    })(floatwindow = gencom.floatwindow || (gencom.floatwindow = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var fontsizeselector;
    (function (fontsizeselector) {
        var ArrayCollection = asBase.baseclasses.ArrayCollection;
        var AcArray = asBase.baseclasses.AcArray;
        var Utils = asBase.Utils;
        class CoFontSizeSelector extends gencom.CoBasicComboBox {
            constructor(iContainer) {
                super(iContainer);
            }
            //____________________________________________________________________
            creationComplete() {
                super.creationComplete();
                this.dataProvider = this.fontSizeDP;
            }
            //________________________________________________________________________________________
            createDP() {
                this.mFontSizeArray = new AcArray();
                this.mFontSizeArray.splice(0, 0, 4, 6, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72);
                this.mFontSizeDP = new ArrayCollection(this.mFontSizeArray);
            }
            //________________________________________________________________________________________
            updateSelected() {
                if (this.isInitialized) {
                    this.selectedItem = this.mSelectedFontSize;
                }
            }
            //________________________________________________________________
            inputKeyDown__EventHandler(event) {
                if (!Utils.isValidKeyForNumericField(event.keyCode)) {
                    event.preventDefault();
                }
                super.inputKeyDown__EventHandler(event);
            }
            /****************************
             * Getters & Setters
             ****************************/
            //________________________________________________________________________________________
            get fontSizeDP() {
                if (!this.mFontSizeDP) {
                    this.createDP();
                }
                return this.mFontSizeDP;
            }
            //________________________________________________________________________________________
            get selectedFontSize() {
                return this.selectedItem;
            }
            set selectedFontSize(value) {
                this.mSelectedFontSize = value;
                this.updateSelected();
            }
        }
        fontsizeselector.CoFontSizeSelector = CoFontSizeSelector;
    })(fontsizeselector = gencom.fontsizeselector || (gencom.fontsizeselector = {}));
})(gencom || (gencom = {}));
///<reference path="../../asBase/events/KeyboardCodes.ts"/>
var gencom;
///<reference path="../../asBase/events/KeyboardCodes.ts"/>
(function (gencom) {
    var textinputwithprompt;
    (function (textinputwithprompt) {
        var Utils = asBase.Utils;
        var EventTypes = asBase.events.EventTypes;
        var AsEvent = asBase.events.AsEvent;
        var SkinsCss = asBase.SkinsCss;
        var KeyboardCodes = asBase.events.KeyboardCodes;
        class CoTextInput extends asBase.CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                //------------------------------
                // Comps
                //------------------------------
                //------------------------------
                // Members
                //------------------------------
                this.mValue = "";
                this.mIsTopPrompt = false;
                this.mTopTitle = "";
                this.mPlaceholder = "";
                this.mDefaultPlaceholder = "";
                this.mPattern = "";
                this.mReadOnly = false;
                this.mIsNumericOnly = false;
                this.mIsPositiveNum = false;
                this.mIsNaturalNum = false;
                this.mMaxChars = -1;
                this.mIsWithFloatingPromt = false;
            }
            //____________________________________________________________________
            creationComplete() {
                this.prompt = this.getPart("prompt");
                this.topTitle_spn = this.getPart("topTitle_spn");
                this.bottomTitle_spn = this.getPart("bottomTitle_spn");
                if (this.topTitle_spn && this.mTopTitle != "") {
                    this.topTitle_spn.innerHTML = this.mTopTitle;
                }
                this.input_txti = this.getPart("input_txti");
                if (this.input_txti == null) {
                    return;
                }
                if (this.mMaxChars > 0) {
                    this.input_txti.maxLength = this.mMaxChars;
                }
                if (this.mIsPositiveNum) {
                    this.input_txti.min = "0";
                }
                if (this.mIsNaturalNum) {
                    this.input_txti.min = "1";
                }
                this.input_txti.addEventListener(EventTypes.INPUT, (event) => this.inputChanged__EventHandler(event));
                this.input_txti.addEventListener(EventTypes.KEY_DOWN, (event) => this.keyDown__EventHandler(event));
                this.input_txti.addEventListener(EventTypes.FOCUS, () => this.focusIn__EventHandler());
                this.input_txti.addEventListener(EventTypes.BLUR, () => this.focusOut__EventHandler());
                this.input_txti.value = this.mValue;
                if (this.mPlaceholder != "") {
                    this.input_txti.placeholder = this.mPlaceholder;
                }
                this.mDefaultPlaceholder = this.input_txti.placeholder;
                this.input_txti.readOnly = this.mReadOnly;
                this.setTopPrompt();
                this.enabled = this.mIsEnabled;
            }
            //____________________________________________________________________
            inputChanged__EventHandler(event) {
                event.stopImmediatePropagation();
                if (this.text != "") {
                    this.clearError();
                }
                // let e:AsEvent = new AsEvent(EventTypes.CHANGE, true, this);
                //// CHANGED TO INPUT
                let e = new AsEvent(EventTypes.INPUT, true, this);
                this.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            keyDown__EventHandler(event) {
                if (event.keyCode != KeyboardCodes.ENTER && event.keyCode != KeyboardCodes.ESC) {
                    event.stopImmediatePropagation();
                }
                if (!this.mIsNumericOnly) {
                    return;
                }
                if (!Utils.isValidKeyForNumericField(event.keyCode)) {
                    event.preventDefault();
                }
            }
            //____________________________________________________________________
            focusIn__EventHandler() {
                this.input_txti.select();
                if (this.mIsWithFloatingPromt) {
                    this.topTitle_spn.innerHTML = this.input_txti.placeholder;
                    this.addClass("floating-promt");
                }
                if (this.mIsTopPrompt) {
                    Utils.showSkinPart(this.prompt);
                }
            }
            //____________________________________________________________________
            focusOut__EventHandler() {
                if (this.mIsTopPrompt) {
                    Utils.hideSkinPart(this.prompt);
                }
                if (this.mIsWithFloatingPromt && this.input_txti.value == "") {
                    this.topTitle_spn.innerHTML = "";
                    this.removeClass("floating-promt");
                }
            }
            //____________________________________________________________________
            trim() {
                if (this.input_txti) {
                    this.input_txti.value = this.input_txti.value.trim();
                }
            }
            //____________________________________________________________________
            setError() {
                if (this.input_txti) {
                    Utils.setInputError(this.input_txti);
                    Utils.setTextError(this.input_txti);
                }
                if (this.bottomTitle_spn) {
                    Utils.showSkinPart(this.bottomTitle_spn);
                }
            }
            //____________________________________________________________________
            clearError() {
                if (this.input_txti) {
                    Utils.clearInputError(this.input_txti);
                    Utils.clearTextError(this.input_txti);
                }
                if (this.bottomTitle_spn) {
                    Utils.hideSkinPart(this.bottomTitle_spn);
                }
            }
            //____________________________________________________________________
            setFormError() {
                if (!this.input_txti) {
                    return;
                }
                if (this.input_txti.classList.contains("success")) {
                    this.input_txti.classList.remove("success");
                }
                if (this.input_txti.classList.contains("error")) {
                    this.input_txti.classList.add("error");
                }
            }
            //____________________________________________________________________
            clearFromError() {
                if (!this.input_txti) {
                    return;
                }
                if (this.input_txti.classList.contains("success")) {
                    this.input_txti.classList.add("success");
                }
                if (this.input_txti.classList.contains("error")) {
                    this.input_txti.classList.remove("error");
                }
            }
            //____________________________________________________________________
            setSuccess() {
                if (this.input_txti) {
                    Utils.addClassToElement(this.input_txti, CoTextInput.SUCCESS);
                }
            }
            //____________________________________________________________________
            clearSuccess() {
                if (this.input_txti) {
                    Utils.removeClassFromElement(this.input_txti, CoTextInput.SUCCESS);
                }
            }
            //________________________________________________________________
            clear() {
                this.clearError();
                this.clearSuccess();
                this.value = "";
            }
            //________________________________________________________________
            setTopTitle() {
                if (this.topTitle_spn) {
                    this.topTitle_spn.innerHTML = this.mTopTitle;
                }
            }
            //________________________________________________________________
            setTopPrompt() {
                if (!this.mIsTopPrompt) {
                    return;
                }
                if (this.prompt && this.input_txti) {
                    this.prompt.innerHTML = this.input_txti.placeholder;
                }
            }
            //________________________________________________________________
            setFloatingPromtText(iPromtText = null) {
                if (iPromtText != null) {
                    this.topTitle_spn.innerHTML = iPromtText;
                }
            }
            //________________________________________________________________
            setEnabled(value) {
                this.mIsEnabled = value;
                if (this.input_txti) {
                    if (value) {
                        if (this.input_txti.classList.contains(SkinsCss.DISABLED)) {
                            this.input_txti.classList.remove(SkinsCss.DISABLED);
                        }
                    }
                    else {
                        if (!this.input_txti.classList.contains(SkinsCss.DISABLED)) {
                            this.input_txti.classList.add(SkinsCss.DISABLED);
                        }
                    }
                    this.input_txti.disabled = !value;
                }
            }
            //________________________________________________________________
            select() {
                if (this.isInitialized) {
                    this.input_txti.select();
                }
            }
            //________________________________________________________________
            focus() {
                if (this.isInitialized) {
                    this.input_txti.focus();
                }
            }
            //________________________________________________________________
            blur() {
                if (this.isInitialized) {
                    this.input_txti.blur();
                }
            }
            //____________________________________________________________________
            isEqual(iInput) {
                return (this.text == iInput.text);
            }
            //__________________________________________________________________
            resetPlaceholder() {
                this.placeholder = this.mDefaultPlaceholder;
            }
            //____________________________________________________________________
            getFocusField() {
                return this.input_txti;
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________
            set isTopPrompt(value) {
                this.mIsTopPrompt = value;
                if (!this.isInitialized) {
                    return;
                }
                this.setTopPrompt();
                /*
                            if (value) {
                                this.mContentWrapper.classList.add(CoTextInput.TOP_PROMPT_CLASS_NAME);
                            }
                            else {
                                this.mContentWrapper.classList.remove(CoTextInput.TOP_PROMPT_CLASS_NAME);
                            }
                */
            }
            //____________________________________________________________________
            set value(value) {
                this.mValue = value;
                if (this.input_txti) {
                    this.input_txti.value = value;
                }
                if (this.mIsWithFloatingPromt && value != '' && this.topTitle_spn != null) {
                    this.topTitle_spn.innerHTML = this.input_txti.placeholder;
                    this.addClass("floating-promt");
                }
            }
            //____________________________________________________________________
            get value() {
                if (this.input_txti) {
                    return this.input_txti.value;
                }
                else {
                    return "";
                }
            }
            //____________________________________________________________________
            set text(value) {
                this.mValue = value;
                if (this.input_txti) {
                    this.input_txti.value = value;
                }
            }
            //____________________________________________________________________
            get text() {
                if (this.input_txti) {
                    return this.input_txti.value;
                }
                else {
                    return "";
                }
            }
            //__________________________________________________________________
            set isWithFloatingPromt(value) {
                this.mIsWithFloatingPromt = value;
            }
            get isWithFloatingPromt() {
                return this.mIsWithFloatingPromt;
            }
            //__________________________________________________________________
            set topTitle(value) {
                this.mTopTitle = value;
                this.setTopTitle();
            }
            //__________________________________________________________________
            set placeholder(value) {
                this.mPlaceholder = value;
                if (this.input_txti) {
                    this.input_txti.placeholder = this.mPlaceholder;
                }
                this.setTopPrompt();
            }
            //____________________________________________________________________
            set pattern(value) {
                this.mPattern = value;
                if (this.input_txti) {
                    this.input_txti.pattern = this.mPattern;
                }
            }
            //____________________________________________________________________
            get isEmpty() {
                this.trim();
                return (this.input_txti.value == "");
            }
            //____________________________________________________________________
            get isEmptyNoTrim() {
                if (!this.input_txti) {
                    return true;
                }
                return (this.input_txti.value == "");
            }
            //____________________________________________________________________________________
            get isValidEmail() {
                if (!this.input_txti) {
                    return false;
                }
                return (this.input_txti.checkValidity());
            }
            //____________________________________________________________________
            set readOnly(value) {
                this.mReadOnly = value;
                if (this.input_txti) {
                    this.input_txti.readOnly = value;
                }
            }
            //____________________________________________________________________
            set isNumericOnly(value) {
                this.mIsNumericOnly = value;
            }
            //____________________________________________________________________
            set isPositiveNum(value) {
                this.mIsPositiveNum = value;
                if (this.input_txti) {
                    this.input_txti.min = (this.mIsPositiveNum ? 0 : Number.MIN_VALUE).toString();
                }
            }
            //____________________________________________________________________
            set isNaturalNum(value) {
                this.mIsNaturalNum = value;
                if (this.input_txti) {
                    this.input_txti.min = (this.mIsNaturalNum ? 1 : Number.MIN_VALUE).toString();
                }
            }
            //____________________________________________________________________
            set maxChars(value) {
                this.mMaxChars = value;
                if (this.input_txti) {
                    this.input_txti.maxLength = this.mMaxChars;
                }
            }
        }
        CoTextInput.TOP_PROMPT_CLASS_NAME = "user-input";
        CoTextInput.SUCCESS = "passwordMatch";
        textinputwithprompt.CoTextInput = CoTextInput;
    })(textinputwithprompt = gencom.textinputwithprompt || (gencom.textinputwithprompt = {}));
})(gencom || (gencom = {}));
///<reference path="../textinput/CoTextInput.ts"/>
var gencom;
///<reference path="../textinput/CoTextInput.ts"/>
(function (gencom) {
    var geoplaces;
    (function (geoplaces) {
        var CoComponentBase = asBase.CoComponentBase;
        var CoTextInput = gencom.textinputwithprompt.CoTextInput;
        class CoGeoPlaces extends CoComponentBase {
            constructor(iContainer, iPrompt, iPlaceHolder = null, iOptions = null) {
                super(null, "./skins/gencom/geoplaces/SkGeoPlaces.html", iContainer);
                this.mIsTopPrompt = false;
                this.mIsPlaceSelected = false;
                this.mIsAddressChanged = false;
                this.txtInputsWithFloatingPromt = false;
                this.mModel = new geoplaces.MoGeoPlaces(this);
                this.mIsTopPrompt = iPrompt;
                this.mInputPlaceHolder = iPlaceHolder;
                this.mOptions = iOptions;
            }
            //____________________________________________________________________
            creationComplete() {
                this.geoAutocomplete_txti = this.getPart("geoAutocomplete_txti");
                this.geoAutocomplete_txti_com = new CoTextInput(this.geoAutocomplete_txti);
                this.geoAutocomplete_txti_com.isTopPrompt = this.mIsTopPrompt;
                this.placesAutoComplete_txti = this.getPart("input_txti");
                this.addressInformation_div = this.getPart("businesAddresInformation_div");
                if (this.mInputPlaceHolder != null) {
                    this.placesAutoComplete_txti.placeholder = this.mInputPlaceHolder;
                }
                this.geoAutoComplete = new google.maps.places.Autocomplete(this.placesAutoComplete_txti, this.mOptions);
                this.mModel.setToActive();
            }
            //________________________________________________________________
            fillWithAddress(iFullAddress) {
                this.placesAutoComplete_txti.value = iFullAddress;
            }
            //________________________________________________________________
            clear() {
                if (this.placesAutoComplete_txti) {
                    this.placesAutoComplete_txti.value = "";
                }
                this.mIsPlaceSelected = false;
            }
            //________________________________________________________________
            setError() {
                if (this.placesAutoComplete_txti) {
                    asBase.Utils.setInputError(this.placesAutoComplete_txti);
                }
            }
            //________________________________________________________________
            clearError() {
                if (this.placesAutoComplete_txti) {
                    asBase.Utils.clearInputError(this.placesAutoComplete_txti);
                }
            }
            //________________________________________________________________
            focus() {
                if (this.geoAutocomplete_txti) {
                    this.geoAutocomplete_txti.focus();
                }
            }
            /****************************
             * Getters and Setters
             ****************************/
            //_______________________________________________________________________________
            get isEmpty() {
                return this.placesAutoComplete_txti.value.trim() == "";
            }
            //_______________________________________________________________________________
            get isEmptyNoTrim() {
                if (this.placesAutoComplete_txti == null) {
                    return true;
                }
                return this.placesAutoComplete_txti.value == "";
            }
            //_______________________________________________________________________________
            set formattedAddress(value) {
                if (value == "") {
                }
                if (!this.placesAutoComplete_txti) {
                    return;
                }
                this.placesAutoComplete_txti.value = value;
            }
            get formattedAddress() {
                return this.placesAutoComplete_txti.value;
            }
            //_______________________________________________________________________________
            set isPlaceSelected(value) {
                this.mIsPlaceSelected = value;
            }
            get isPlaceSelected() {
                return this.mIsPlaceSelected;
            }
            //_______________________________________________________________________________
            set isAddressChanged(value) {
                this.mIsAddressChanged = value;
            }
            get isAddressChanged() {
                return this.mIsAddressChanged;
            }
            //_______________________________________________________________________________
            set placeSelected(value) {
                this.mPlaceSelected = value;
            }
            get placeSelected() {
                if (!this.mPlaceSelected) {
                    this.mPlaceSelected = new geoplaces.DaPlace();
                }
                return this.mPlaceSelected;
            }
            //_______________________________________________________________________________
            set setFloatingPromt(iIsPromt) {
                this.txtInputsWithFloatingPromt = iIsPromt;
            }
            //_______________________________________________________________________________
            get floatingPromt() {
                return this.txtInputsWithFloatingPromt;
            }
            //_______________________________________________________________________________
            get geoAutocomplete() {
                return this.geoAutocomplete_txti_com;
            }
        }
        geoplaces.CoGeoPlaces = CoGeoPlaces;
    })(geoplaces = gencom.geoplaces || (gencom.geoplaces = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var geoplaces;
    (function (geoplaces) {
        class DaPlace {
            constructor() {
                // Members
                this.mBusinessPlaceId = "";
                this.mBusinessName = "";
                this.mPhoneNumber = "";
                this.mBusinessPlaceURL = "";
                this.mAddressPlaceId = "";
                this.mCountry = "";
                this.mState = "";
                this.mCity = "";
                this.mStreet = "";
                this.mStreetNumber = "";
                this.mPostalCode = "";
                this.mFormattedAddress = "";
                this.mLat = -1;
                this.mLng = -1;
            }
            //___________________________________________________________
            fillNameFromSelectedPlace(iSelected) {
                if (iSelected == null) {
                    return;
                }
                this.clearBusinessName();
                this.mBusinessPlaceId = iSelected[DaPlace.PLACE_ID];
                this.mBusinessName = iSelected[DaPlace.NAME];
                this.mPhoneNumber = iSelected[DaPlace.PHONE_NUMBER];
                this.mBusinessPlaceURL = iSelected[DaPlace.URL];
            }
            //___________________________________________________________
            fillAddressFromSelectedPlace(iSelected) {
                if (iSelected == null) {
                    return;
                }
                let address_components = iSelected.address_components;
                if (address_components == null) {
                    return;
                }
                this.clearAddress();
                for (let index = 0; index < address_components.length; index++) {
                    if (address_components[index].types[0] == DaPlace.STREET_NUMBER) {
                        this.mStreetNumber = address_components[index].long_name;
                    }
                    if (address_components[index].types[0] == DaPlace.STREET_NAME) {
                        this.mStreet = address_components[index].long_name;
                    }
                    if (address_components[index].types[0] == DaPlace.CITY) {
                        this.mCity = address_components[index].long_name;
                    }
                    if (address_components[index].types[0] == DaPlace.STATE) {
                        this.mState = address_components[index].short_name;
                    }
                    if (address_components[index].types[0] == DaPlace.POSTAL_CODE) {
                        this.mPostalCode = address_components[index].long_name;
                    }
                    if (address_components[index].types[0] == DaPlace.COUNTRY) {
                        this.mCountry = address_components[index].long_name;
                    }
                }
                this.mFormattedAddress = iSelected[DaPlace.FORMATTED_ADDRESS];
                this.mLat = iSelected[DaPlace.GEOMETRY][DaPlace.LOCATION][DaPlace.LAT]();
                this.mLng = iSelected[DaPlace.GEOMETRY][DaPlace.LOCATION][DaPlace.LNG]();
                this.mAddressPlaceId = iSelected[DaPlace.PLACE_ID];
            }
            //___________________________________________________________
            clearBusinessName() {
                this.mBusinessName = "";
                this.mPhoneNumber = "";
                this.mBusinessPlaceURL = "";
            }
            //___________________________________________________________
            clearAddress() {
                this.mAddressPlaceId = "";
                this.mStreetNumber = "";
                this.mStreet = "";
                this.mCity = "";
                this.mState = "";
                this.mPostalCode = "";
                this.mCountry = "";
                this.mFormattedAddress = "";
                this.mLat = -1;
                this.mLng = -1;
            }
            //___________________________________________________________
            fillAddressFromPlace(iPlace) {
                this.mStreetNumber = iPlace.streetNumber;
                this.mStreet = iPlace.street;
                this.mCity = iPlace.city;
                this.mState = iPlace.state;
                this.mPostalCode = iPlace.postalCode;
                this.mCountry = iPlace.country;
                this.mFormattedAddress = iPlace.formattedAddress;
                this.mLat = iPlace.lat;
                this.mLng = iPlace.lng;
            }
            /****************************
             * Methods
             ****************************/
            //___________________________________________________________
            get businessPlaceId() {
                return this.mBusinessPlaceId;
            }
            //___________________________________________________________
            get businessName() {
                return this.mBusinessName;
            }
            //___________________________________________________________
            get businessPlaceURL() {
                return this.mBusinessPlaceURL;
            }
            //___________________________________________________________
            get addressPlaceId() {
                return this.mAddressPlaceId;
            }
            //___________________________________________________________
            get streetNumber() {
                return this.mStreetNumber;
            }
            //___________________________________________________________
            get street() {
                return this.mStreet;
            }
            //___________________________________________________________
            get city() {
                return this.mCity;
            }
            //___________________________________________________________
            get state() {
                return this.mState;
            }
            //___________________________________________________________
            get postalCode() {
                return this.mPostalCode;
            }
            //___________________________________________________________
            get country() {
                return this.mCountry;
            }
            //___________________________________________________________
            get formattedAddress() {
                return this.mFormattedAddress;
            }
            //___________________________________________________________
            get lat() {
                return this.mLat;
            }
            //___________________________________________________________
            get lng() {
                return this.mLng;
            }
            //___________________________________________________________
            get phoneNumber() {
                return this.mPhoneNumber;
            }
        }
        DaPlace.PLACE_ID = 'place_id';
        DaPlace.NAME = 'name';
        DaPlace.PHONE_NUMBER = 'international_phone_number';
        DaPlace.URL = "url";
        DaPlace.STREET_NUMBER = 'street_number';
        DaPlace.STREET_NAME = 'route';
        DaPlace.CITY = 'locality';
        DaPlace.STATE = 'administrative_area_level_1';
        DaPlace.POSTAL_CODE = 'postal_code';
        DaPlace.COUNTRY = 'country';
        DaPlace.FORMATTED_ADDRESS = 'formatted_address';
        DaPlace.GEOMETRY = 'geometry';
        DaPlace.LOCATION = 'location';
        DaPlace.LAT = 'lat';
        DaPlace.LNG = 'lng';
        geoplaces.DaPlace = DaPlace;
    })(geoplaces = gencom.geoplaces || (gencom.geoplaces = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var geoplaces;
    (function (geoplaces) {
        var MoModelBase = asBase.MoModelBase;
        var EventTypes = asBase.events.EventTypes;
        var AsEvent = asBase.events.AsEvent;
        class MoGeoPlaces extends MoModelBase {
            //------------------------------
            // Members
            //------------------------------
            constructor(iCom) {
                super(iCom);
            }
            //____________________________________________________________________
            setToActive() {
                this.placesSelected__EventHandler__Func = () => this.placesSelected__EventHandler();
                this.com.geoAutoComplete.addListener(MoGeoPlaces.PLACE_SELECTED, this.placesSelected__EventHandler__Func);
                this.placesInput__EventHandler__Func = (event) => this.placesInput__EventHandler(event);
                this.com.placesAutoComplete_txti.addEventListener(EventTypes.INPUT, this.placesInput__EventHandler__Func);
                this.placesFocus__EventHandler__Func = () => this.placesFocus__EventHandler();
                this.com.placesAutoComplete_txti.addEventListener(EventTypes.FOCUS, this.placesFocus__EventHandler__Func);
                this.placesBlur__EventHandler__Func = (event) => this.placesBlur__EventHandler(event);
                this.com.placesAutoComplete_txti.addEventListener(EventTypes.BLUR, this.placesBlur__EventHandler__Func);
            }
            //____________________________________________________________________
            setToSleep() {
                this.com.geoAutoComplete.removeListener(MoGeoPlaces.PLACE_SELECTED, this.placesSelected__EventHandler__Func);
                this.placesSelected__EventHandler__Func = null;
                this.com.placesAutoComplete_txti.removeEventListener(EventTypes.INPUT, this.placesInput__EventHandler__Func);
                this.placesInput__EventHandler__Func = null;
                this.com.geoAutoComplete.removeListener(EventTypes.FOCUS, this.placesFocus__EventHandler__Func);
                this.placesFocus__EventHandler__Func = null;
                this.com.placesAutoComplete_txti.removeEventListener(EventTypes.BLUR, this.placesBlur__EventHandler__Func);
                this.placesBlur__EventHandler__Func = null;
            }
            //____________________________________________________________________
            placesInput__EventHandler(event) {
                // If there was a change in the input - means a location is no longer selected
                // The value changes in placesSelected__EventHandler
                this.com.isPlaceSelected = false;
                let e = new AsEvent(EventTypes.SELECTED_CHANGE, true, this.com);
                this.com.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            placesSelected__EventHandler() {
                let selected = this.com.geoAutoComplete.getPlace();
                if (selected == null || !selected.place_id) {
                    return;
                }
                this.com.isPlaceSelected = true;
                this.com.placeSelected.fillNameFromSelectedPlace(selected);
                this.com.placeSelected.fillAddressFromSelectedPlace(selected);
                let e = new AsEvent(EventTypes.SELECTED_CHANGE, true, this.com);
                this.com.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            placesFocus__EventHandler() {
                if (this.com.floatingPromt) {
                    this.com.geoAutocomplete.setFloatingPromtText(this.com.placesAutoComplete_txti.placeholder);
                    this.com.geoAutocomplete_txti.classList.add("floating-promt");
                }
                this.com.isAddressChanged = false;
            }
            //____________________________________________________________________
            placesBlur__EventHandler(event) {
                if (this.com.floatingPromt && this.com.placesAutoComplete_txti.value == "") {
                    this.com.geoAutocomplete.setFloatingPromtText("");
                    this.com.geoAutocomplete_txti.classList.remove("floating-promt");
                }
                setTimeout(() => {
                    this.com.isAddressChanged = true;
                    let e = new AsEvent(EventTypes.SELECTED_CHANGE, true, this.com);
                    this.com.dispatchEvent(e.event);
                }, 500);
            }
            //=====================================
            // Getters & Setters
            //=====================================
            //____________________________________________________________________
            get com() {
                return this.mCom;
            }
        }
        //------------------------------
        // Events
        //------------------------------
        MoGeoPlaces.PLACE_SELECTED = 'place_changed';
        geoplaces.MoGeoPlaces = MoGeoPlaces;
    })(geoplaces = gencom.geoplaces || (gencom.geoplaces = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
    class ImageCropper {
        constructor(aImg, aImgCon) {
            this.mIsMouseDown = false;
            this.mBaseWidth = -1;
            this.mBaseHeight = -1;
            this.mScale = 1;
            this.mZoomSpeed = 0;
            this.mZoomDirection = 0;
            this.mBaseURL = "";
            this.mIsInUpload = false;
            this.mImg = aImg;
            aImg.draggable = false;
            aImg.ondragstart = function () { return false; };
            this.mEnterFrame = () => this.enterFrame();
            this.mImgCon = aImgCon;
            this.setToActive();
            this.enterFrame();
        }
        /****************************
         * Methods
         ****************************/
        //_________________________________________________________
        setImage() {
            this.mBaseURL = "";
            this.mBaseWidth = this.mImg.clientWidth;
            this.mBaseHeight = this.mImg.clientHeight;
            this.mPicWidth = Number(this.mImgCon.style.width.replace("px", ""));
            this.mPicHeight = Number(this.mImgCon.style.height.replace("px", ""));
            let aHScale = this.mPicHeight / this.mBaseHeight;
            let aWScale = this.mPicWidth / this.mBaseWidth;
            this.mImageMinScale = Math.min(aHScale, aWScale);
            this.mScale = this.mImageMinScale;
            this.mImg.style.width = (this.mImageMinScale * this.mBaseWidth) + "px";
            this.mCurrentX = Number(this.mImg.style.left.replace("px", ""));
            this.mCurrentY = Number(this.mImg.style.top.replace("px", ""));
        }
        //_______________________________________________________
        setToActive() {
            this.mImgCon.onmousedown = (pEvent) => this.onMouseDown__EventListener(pEvent);
            this.mImgCon.onmousemove = (pEvent) => this.onMouseMove__EventListener(pEvent);
            document.addEventListener("mouseup", (pEvent) => this.onMouseUP__EventListener(pEvent));
            //document.body.onmouseup = (pEvent) => this.onMouseUP__EventListener(pEvent);
        }
        //_______________________________________________________
        setImageInBorder() {
            if (this.mIsInUpload) {
                return;
            }
            if (this.mScale < this.mImageMinScale) {
                this.mScale = this.mImageMinScale;
            }
            if (this.mCurrentX > 0) {
                this.mCurrentX = 0;
            }
            if (this.mCurrentY > 0) {
                this.mCurrentY = 0;
            }
            var aWidth = this.mImg.clientWidth;
            var aHeight = this.mImg.clientHeight;
            if (this.mCurrentX < this.mPicWidth - aWidth) {
                this.mCurrentX = this.mPicWidth - aWidth;
            }
            if (this.mCurrentY < this.mPicHeight - aHeight) {
                this.mCurrentY = this.mPicHeight - aHeight;
            }
        }
        //______________________________________________________
        enterFrame() {
            if (this.mIsInUpload) {
                return;
            }
            requestAnimationFrame(this.mEnterFrame);
            if (this.mBaseHeight == -1) {
                return;
            }
            var aDZoomSpeed = this.mZoomDirection - this.mZoomSpeed;
            if (Math.abs(aDZoomSpeed) > 0.0001) {
                this.mZoomSpeed += aDZoomSpeed / ((this.mZoomDirection == 0) ? 5 : 50);
                this.scale(this.mZoomSpeed);
            }
        }
        //______________________________________________________
        scale(pVal) {
            if (this.mIsInUpload) {
                return;
            }
            this.mScale += pVal;
            var aCenterX = (this.mPicWidth / 2 - this.mCurrentX);
            var aCenterY = (this.mPicHeight / 2 - this.mCurrentY);
            var aWidth = (this.mScale * this.mBaseWidth);
            var aHeigth = (this.mScale * this.mBaseHeight);
            this.mCurrentX = -((aCenterX) * (1 + pVal) - this.mPicWidth / 2);
            this.mCurrentY = -((aCenterY) * (1 + pVal) - this.mPicHeight / 2);
            this.setImageInBorder();
            this.mImg.style.width = aWidth + "px";
            this.mImg.style.left = this.mCurrentX + "px";
            this.mImg.style.top = this.mCurrentY + "px";
        }
        //_______________________________________________________
        zoomIn() {
            this.mZoomDirection = ImageCropper.MAX_ZOOM_SPEED;
            this.setImageCenter();
        }
        //_______________________________________________________
        zoomOut() {
            this.mZoomDirection = -ImageCropper.MAX_ZOOM_SPEED;
            this.setImageCenter();
        }
        //_______________________________________________________
        stopZoom() {
            this.mZoomDirection = 0;
        }
        //_______________________________________________________
        setImageCenter() {
            this.mZoomCenterX = (this.mPicWidth / 2 - this.mCurrentX) / this.mScale;
        }
        //_______________________________________________________
        uploadImage(pCallback) {
            if (this.baseURL != "") {
                var aURL = this.getCropeURL();
                setTimeout(pCallback, 10, aURL);
                return false;
            }
            this.mHelpImg = new Image();
            //////// document.body.appendChild(this.mHelpImg);
            this.mHelpImg.onload = () => this.createCanvasAndUpload();
            this.mHelpImg.src = this.mImg.src;
            this.mUploadCallback = pCallback;
            return true;
        }
        //__________________________________________________________________
        createCanvasAndUpload() {
            let aCanvas = document.createElement("Canvas");
            let aContext = aCanvas.getContext('2d');
            let aWidht;
            let aHeight;
            aWidht = this.mHelpImg.width;
            aHeight = this.mHelpImg.height;
            aCanvas.width = aWidht;
            aCanvas.height = aHeight;
            aContext.drawImage(this.mHelpImg, 0, 0, aWidht, aHeight);
            this.saveImageFromElement(ImageCropper.PICTURES_SERVER_URL, aCanvas.toDataURL("image/jpeg"), (pData) => this.onUpload(pData));
        }
        //_______________________________________________
        saveImageFromElement(pURL, pCanvasData, pCallBAck) {
            var xmlHttpReq = false;
            var aAjax = new XMLHttpRequest();
            aAjax.open('POST', pURL, true);
            aAjax.setRequestHeader('Content-Type', 'application/jpeg');
            aAjax.setRequestHeader("name", "image" + Math.random() + new Date().getMilliseconds());
            aAjax.setRequestHeader("folder", "test/image");
            aAjax.onreadystatechange = function () {
                if (aAjax.readyState == 4) {
                    if (aAjax.status == 200) {
                        pCallBAck(aAjax.responseText);
                        if (DaUnderDevelopment.SHOW_CONSOLE_LOG) {
                            console.log(aAjax.responseText);
                        }
                    }
                    else {
                        pCallBAck(ImageCropper.UPLOAD_ERROR);
                    }
                }
            };
            aAjax.send(pCanvasData.toString());
        }
        //***********************
        //    Event Handlers    *
        //***********************
        //_______________________________________________________
        onMouseUP__EventListener(pEvent) {
            this.mIsMouseDown = false;
        }
        //_______________________________________________________
        onMouseMove__EventListener(pEvent) {
            if (!this.mIsMouseDown) {
                return;
            }
            let aX = pEvent.x || pEvent.clientX;
            let aY = pEvent.y || pEvent.clientY;
            this.mCurrentX = this.mFromX + (aX - this.mLastMouseX);
            this.mCurrentY = this.mFromY + (aY - this.mLastMouseY);
            this.setImageInBorder();
            this.mImg.style.left = this.mCurrentX + "px";
            this.mImg.style.top = this.mCurrentY + "px";
        }
        //_______________________________________________________
        onMouseDown__EventListener(pEvent) {
            // let aa: asBase.events.AsEvent = new asBase.events.AsEvent("aaa", this, this.mImg.src, true);
            //this.dispatchEvent(aa.event);
            this.mFromX = Number(this.mImg.style.left.replace("px", ""));
            if (this.mFromX == NaN) {
                this.mFromX = 0;
            }
            if (this.mFromY == NaN) {
                this.mFromY = 0;
            }
            this.mFromY = Number(this.mImg.style.top.replace("px", ""));
            this.mIsMouseDown = true;
            if (DaUnderDevelopment.SHOW_CONSOLE_LOG) {
                console.log("onMouseDown = " + this.mLastMouseX);
            }
            this.mLastMouseX = pEvent.x || pEvent.clientX;
            this.mLastMouseY = pEvent.y || pEvent.clientY;
        }
        //____________________________________________________________________
        onUpload(pData) {
            if (pData == ImageCropper.UPLOAD_ERROR) {
                this.mUploadCallback(ImageCropper.UPLOAD_ERROR);
                return;
            }
            this.mIsInUpload = false;
            this.mImg.style.height = this.mForUploadHeight;
            this.mImg.style.width = this.mForUploadWidth;
            var aURLParts = pData.split("http");
            let aDataObject = JSON.parse(pData);
            this.mBaseURL = aDataObject.secure_url;
            var aURL = this.getCropeURL();
            this.mUploadCallback(aURL);
        }
        /****************************
         * Getters and Setters
         ****************************/
        //_______________________________________________________
        set baseURL(pBaseURL) {
            this.mBaseURL = pBaseURL;
        }
        //_______________________________________________________
        get baseURL() {
            return (this.mBaseURL);
        }
        //_______________________________________________________
        static getLimitFillParams(pWidth, pHeight, pBaseURL) {
            var aParam = "c_lfill,w_" + pWidth + ",h_" + pHeight;
            return (ImageCropper.getCloudinaryURL(aParam, pBaseURL));
        }
        //_______________________________________________________
        static getLimitPadParams(pWidth, pHeight, pBaseURL) {
            var aParam = "c_lpad";
            if (pHeight > -1) {
                aParam += ",h_" + pHeight;
            }
            if (pWidth > -1) {
                aParam += ",w_" + pWidth;
            }
            return (ImageCropper.getCloudinaryURL(aParam, pBaseURL));
        }
        //_______________________________________________________
        static getLimitParams(pWidth, pHeight, pBaseURL) {
            var aParam = "c_limit";
            //var aParam: string = "c_lpad"
            if (pHeight > -1) {
                aParam += ",h_" + pHeight;
            }
            if (pWidth > -1) {
                aParam += ",w_" + pWidth;
            }
            return (ImageCropper.getCloudinaryURL(aParam, pBaseURL));
        }
        //_______________________________________________________
        static getFillParams(pWidth, pHeight, pBaseURL) {
            var aParam = "c_fill";
            if (pHeight > -1) {
                aParam += ",h_" + pHeight;
            }
            if (pWidth > -1) {
                aParam += ",w_" + pWidth;
            }
            return (ImageCropper.getCloudinaryURL(aParam, pBaseURL));
        }
        //_______________________________________________________
        static getCloudinaryURL(pSubString, pBaseURL) {
            var aURLParts = pBaseURL.split("upload/");
            return (aURLParts[0] + "upload/" + pSubString + "/" + aURLParts[1]);
        }
        //_______________________________________________________
        getCropeURL() {
            var aWidth = Math.round(this.mScale * this.mBaseWidth);
            var aHeight = Math.round(this.mScale * this.mBaseHeight);
            var aX = Math.round(this.mCurrentX) * -1;
            var aY = Math.round(this.mCurrentY) * -1;
            var aParam = "c_scale,w_" + aWidth + ",h_" + aHeight + "/c_crop,w_" + this.mPicWidth + ",h_" + this.mPicHeight + ",x_" + aX + ",y_" + aY;
            return (ImageCropper.getCloudinaryURL(aParam, this.mBaseURL));
        }
        //_______________________________________________________
        toString() {
            return ("ImageCropper");
        }
        //_______________________________________________________
        get baseHeight() {
            return this.mBaseHeight;
        }
        //_______________________________________________________
        get baseWidth() {
            return this.mBaseWidth;
        }
    }
    /****************************
     * Declarations
     ****************************/
    ImageCropper.PICTURES_SERVER_URL = "https://asexvo.azurewebsites.net/image"; //private server url
    ImageCropper.MAX_ZOOM_SPEED = 0.01;
    ImageCropper.UPLOAD_ERROR = "UPLOAD_ERROR";
    gencom.ImageCropper = ImageCropper;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var Rectangle = asBase.math.Rectangle;
    var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
    var MouseEvents = asBase.events.MouseEvents;
    class ImageCropperNew {
        constructor(iImg, iImgCon, iIsStretchImage = false) {
            this.mIsMouseDown = false;
            this.mBaseWidth = -1;
            this.mBaseHeight = -1;
            this.mScale = 1;
            this.mZoomSpeed = 0;
            this.mZoomDirection = 0;
            this.mBaseURL = "";
            this.mIsInUpload = false;
            this.mIsTransformEnable = false;
            this.mImg = iImg;
            iImg.draggable = false;
            iImg.ondragstart = function () { return false; };
            this.mImgCon = iImgCon;
            this.mIsStretchImage = iIsStretchImage;
            // this.setToActive();
            //this.enterFrame();
        }
        /****************************
         * Methods
         ****************************/
        //_________________________________________________________
        setImage() {
            ImageCropperNew.mActiveCropper = this;
            if (this.mImg.naturalHeight == 0) {
                setTimeout(() => this.setImage(), 100);
                return;
            }
            this.mBaseURL = "";
            this.mPicWidth = Math.floor(this.mImgCon.getBoundingClientRect().width);
            this.mPicHeight = Math.floor(this.mImgCon.getBoundingClientRect().height);
            if (this.mPicWidth == 0) {
                setTimeout(() => this.setImage(), 100);
                return;
            }
            this.mBaseWidth = this.mImg.naturalWidth;
            this.mBaseHeight = this.mImg.naturalHeight;
            let aHScale = this.mPicHeight / this.mBaseHeight;
            let aWScale = this.mPicWidth / this.mBaseWidth;
            if (this.mIsStretchImage) {
                this.mScale = Math.max(aHScale, aWScale);
            }
            else {
                this.mScale = Math.min(aHScale, aWScale);
            }
            this.mImageMinScale = Math.min(aHScale, aWScale) * 0.8;
            let aWidth = Math.round(this.mScale * this.mImg.naturalWidth);
            let aHeight = Math.round(this.mScale * this.mImg.naturalHeight);
            this.mImg.style.width = aWidth + "px";
            this.mImg.style.height = aHeight + "px";
            this.mCurrentX = Math.round((this.mPicWidth - aWidth) / 2);
            this.mCurrentY = Math.round((this.mPicHeight - aHeight) / 2);
            if (this.mImg != null) {
                this.mImg.style.left = this.mCurrentX + "px";
                this.mImg.style.top = this.mCurrentY + "px";
            }
        }
        //_______________________________________________________
        setToActive() {
            this.mImgCon.onmousedown = (pEvent) => this.onMouseDown__EventListener(pEvent);
            this.mImgCon.onmousemove = (pEvent) => this.onMouseMove__EventListener(pEvent);
            this.onMouseWheel__EventListener__Func = (pEvent) => this.onMouseWheel__EventListener(pEvent);
            this.mImgCon.addEventListener(MouseEvents.MOUSE_WHEEL, this.onMouseWheel__EventListener__Func);
            document.addEventListener("mouseup", (pEvent) => this.onMouseUP__EventListener(pEvent));
            document.body.onmouseup = (pEvent) => this.onMouseUP__EventListener(pEvent);
            this.mIsTransformEnable = true;
        }
        //_______________________________________________________
        setToSleep() {
            this.mImgCon.onmousedown = null;
            this.mImgCon.onmousemove = null;
            this.mImgCon.removeEventListener(MouseEvents.MOUSE_WHEEL, this.onMouseWheel__EventListener__Func);
            this.onMouseWheel__EventListener__Func = null;
            document.removeEventListener("mouseup", document.body.onmouseup);
            document.body.onmouseup = null;
            this.mIsTransformEnable = false;
        }
        //_______________________________________________________
        enableTransform() {
            this.mIsTransformEnable = true;
        }
        //_______________________________________________________
        disableTransform() {
            this.mIsTransformEnable = false;
        }
        //_______________________________________________________
        setImageInBorder() {
            if (this.mIsInUpload) {
                return;
            }
            if (this.mScale < this.mImageMinScale) {
                this.mScale = this.mImageMinScale;
            }
            var aWidth = this.mImg.clientWidth;
            var aHeight = this.mImg.clientHeight;
            if (this.mPicWidth <= this.mImg.clientWidth) {
                if (this.mCurrentX > 0) {
                    this.mCurrentX = 0;
                }
                if (this.mCurrentX < this.mPicWidth - aWidth) {
                    this.mCurrentX = this.mPicWidth - aWidth;
                }
            }
            else {
                this.mCurrentX = Math.round((this.mPicWidth - aWidth) / 2);
            }
            if (this.mPicHeight < this.mImg.clientHeight) {
                if (this.mCurrentY > 0) {
                    this.mCurrentY = 0;
                }
                if (this.mCurrentY < this.mPicHeight - aHeight) {
                    this.mCurrentY = this.mPicHeight - aHeight;
                }
            }
            else {
                this.mCurrentY = Math.round((this.mPicHeight - aHeight) / 2);
            }
        }
        //______________________________________________________
        scale(pVal) {
            if (this.mIsInUpload) {
                return;
            }
            let aNextScale = this.mScale + pVal * this.mScale * 2;
            if (aNextScale > 50) {
                return;
            }
            if (aNextScale < this.mImageMinScale) {
                aNextScale = this.mImageMinScale;
            }
            if (aNextScale == this.mScale) {
                return;
            }
            /// var aStrWidth = this.mImg.style.width.replace("px", "");
            var aStartX = Number(this.mImg.style.left.replace("px", ""));
            var aStartY = Number(this.mImg.style.top.replace("px", ""));
            var aCenterX = -aStartX + this.mPicWidth / 2;
            var aCenterY = -aStartY + this.mPicHeight / 2;
            aCenterX *= 1 / this.mScale;
            aCenterY *= 1 / this.mScale;
            aCenterX *= aNextScale;
            aCenterY *= aNextScale;
            this.mCurrentX = this.mPicWidth / 2 - aCenterX;
            this.mCurrentY = this.mPicHeight / 2 - aCenterY;
            var aWidth = Math.round(aNextScale * this.mImg.naturalWidth);
            var aHeigth = Math.round(aNextScale * this.mImg.naturalHeight);
            /*console.log("aWidth: " + aWidth);
            console.log("aHeigth: " + aHeigth);
            console.log("this.mPicWidth: " + this.mPicWidth);
            console.log("this.mPicHeight: " + this.mPicHeight);*/
            //////////////if (aWidth < this.mPicWidth) {
            //////////////    return;
            //////////////}
            //////////////if (aHeigth < this.mPicHeight) {
            //////////////    return;
            //////////////}
            this.mImg.style.width = aWidth + "px";
            this.mImg.style.height = aHeigth + "px";
            this.setImageInBorder();
            this.mImg.style.left = this.mCurrentX + "px";
            this.mImg.style.top = this.mCurrentY + "px";
            this.mScale = aNextScale;
        }
        //_______________________________________________________
        zoomIn() {
            this.scale(120 / 10000);
            this.mZoomDirection = ImageCropperNew.MAX_ZOOM_SPEED;
            this.setImageCenter();
        }
        //_______________________________________________________
        zoomOut() {
            this.scale(-120 / 10000);
            this.mZoomDirection = -ImageCropperNew.MAX_ZOOM_SPEED;
            this.setImageCenter();
        }
        //_______________________________________________________
        stopZoom() {
            this.mZoomDirection = 0;
        }
        //_______________________________________________________
        setImageCenter() {
            this.mZoomCenterX = (this.mPicWidth / 2 - this.mCurrentX) / this.mScale;
        }
        //_______________________________________________________
        uploadImage(pCallback) {
            if (this.baseURL != "") {
                let aURL = this.getCropeURL();
                setTimeout(pCallback, 10, aURL);
                return false;
            }
            this.mHelpImg = new Image();
            //////// document.body.appendChild(this.mHelpImg);
            this.mHelpImg.onload = () => this.createCanvasAndUpload();
            this.mHelpImg.src = this.mImg.src;
            this.mUploadCallback = pCallback;
            return true;
        }
        //__________________________________________________________________
        createCanvasAndUpload() {
            let aCanvas = document.createElement("Canvas");
            let aContext = aCanvas.getContext('2d');
            let aWidht;
            let aHeight;
            aWidht = this.mHelpImg.width;
            aHeight = this.mHelpImg.height;
            aCanvas.width = aWidht;
            aCanvas.height = aHeight;
            aContext.fillStyle = "#FFFFFF";
            aContext.fillRect(0, 0, aWidht, aHeight);
            aContext.drawImage(this.mHelpImg, 0, 0, aWidht, aHeight);
            this.saveImageFromElement(ImageCropperNew.PICTURES_SERVER_URL, aCanvas.toDataURL("image/jpeg"), (pData) => this.onUpload(pData));
            ///asBase.Utils.debugHTMLElement(aCanvas, 200)
        }
        //_______________________________________________
        saveImageFromElement(pURL, pCanvasData, pCallBAck) {
            var xmlHttpReq = false;
            var aAjax = new XMLHttpRequest();
            aAjax.open('POST', pURL, true);
            aAjax.setRequestHeader('Content-Type', 'image/jpeg');
            aAjax.setRequestHeader("name", "profile" + Math.random() + new Date().getMilliseconds());
            aAjax.setRequestHeader("folder", "image/profile");
            aAjax.onreadystatechange = function () {
                if (aAjax.readyState == 4) {
                    if (aAjax.status == 200) {
                        if (aAjax.responseText == "don't cors") {
                            pCallBAck(ImageCropperNew.UPLOAD_ERROR);
                        }
                        else {
                            pCallBAck(aAjax.responseText);
                        }
                        if (DaUnderDevelopment.SHOW_CONSOLE_LOG) {
                            console.log(aAjax.responseText);
                        }
                    }
                    else {
                        pCallBAck(ImageCropperNew.UPLOAD_ERROR);
                    }
                }
            };
            aAjax.send(pCanvasData.toString());
        }
        //_______________________________________________________
        getCropeURL() {
            let aWidth = Math.round(this.mScale * this.mBaseWidth);
            let aHeight = Math.round(this.mScale * this.mBaseHeight);
            let aX = Math.round(this.mCurrentX) * -1;
            let aY = Math.round(this.mCurrentY) * -1;
            let aParam = "c_scale,w_" + aWidth + ",h_" + aHeight + "/c_crop,w_" + this.mPicWidth + ",h_" + this.mPicHeight + ",x_" + aX + ",y_" + aY;
            return (ImageCropperNew.getCloudinaryURL(aParam, this.mBaseURL));
        }
        //_______________________________________________________
        static getCloudinaryURL(pSubString, pBaseURL) {
            var aURLParts = pBaseURL.split("upload/");
            return (aURLParts[0] + "upload/" + pSubString + "/" + aURLParts[1]);
        }
        //____________________________________________________________________
        onUpload(pData) {
            this.mIsInUpload = false;
            if (pData == ImageCropperNew.UPLOAD_ERROR) {
                this.mUploadCallback(ImageCropperNew.UPLOAD_ERROR);
                return;
            }
            this.mImg.style.height = this.mForUploadHeight;
            this.mImg.style.width = this.mForUploadWidth;
            // var aURLParts = pData.split("http");
            let aDataObject = JSON.parse(pData);
            this.mBaseURL = (aDataObject.secure_url);
            var aURL = this.getCropeURL();
            this.mUploadCallback(aURL);
        }
        //***********************
        //    Event Handlers    *
        //***********************
        //_______________________________________________________
        onMouseWheel__EventListener(e) {
            if (!this.mIsTransformEnable) {
                return;
            }
            this.scale(e.wheelDelta / 10000);
        }
        //_______________________________________________________
        onMouseUP__EventListener(pEvent) {
            if (!this.mIsTransformEnable) {
                return;
            }
            this.mIsMouseDown = false;
        }
        //_______________________________________________________
        onMouseMove__EventListener(pEvent) {
            if (!this.mIsTransformEnable) {
                return;
            }
            if (!this.mIsMouseDown) {
                return;
            }
            let aX = pEvent.x || pEvent.clientX;
            let aY = pEvent.y || pEvent.clientY;
            this.mCurrentX = this.mFromX + (aX - this.mLastMouseX);
            this.mCurrentY = this.mFromY + (aY - this.mLastMouseY);
            this.setImageInBorder();
            this.mImg.style.left = this.mCurrentX + "px";
            this.mImg.style.top = this.mCurrentY + "px";
        }
        //_______________________________________________________
        onMouseDown__EventListener(pEvent) {
            // let aa: asBase.events.AsEvent = new asBase.events.AsEvent("aaa", this, this.mImg.src, true);
            //this.dispatchEvent(aa.event);
            if (!this.mIsTransformEnable) {
                return;
            }
            this.mFromX = Number(this.mImg.style.left.replace("px", ""));
            if (this.mFromX == NaN) {
                this.mFromX = 0;
            }
            if (this.mFromY == NaN) {
                this.mFromY = 0;
            }
            this.mFromY = Number(this.mImg.style.top.replace("px", ""));
            this.mIsMouseDown = true;
            this.mLastMouseX = pEvent.x || pEvent.clientX;
            this.mLastMouseY = pEvent.y || pEvent.clientY;
        }
        //______________________________________________________
        getViewPicBoundry() {
            let aRect = new Rectangle();
            aRect.x = -this.mCurrentX / this.mScale;
            aRect.y = -this.mCurrentY / this.mScale;
            aRect.width = this.mPicWidth / this.mScale;
            aRect.height = this.mPicHeight / this.mScale;
            return aRect;
        }
        /****************************
         * Getters and Setters
         ****************************/
        static get activeCropper() {
            return ImageCropperNew.mActiveCropper;
        }
        //_______________________________________________________
        get offsetX() {
            return this.mCurrentX;
        }
        //_______________________________________________________
        get offsetY() {
            return this.mCurrentY;
        }
        //______________________________________________________
        get picScale() {
            return this.mScale;
        }
        //_______________________________________________________
        get currentScale() {
            return (this.mScale / this.mImageMinScale);
        }
        //_______________________________________________________
        set baseURL(pBaseURL) {
            this.mBaseURL = pBaseURL;
        }
        get baseURL() {
            return (this.mBaseURL);
        }
        //_______________________________________________________
        toString() {
            return ("ImageCropperNew");
        }
    }
    /****************************
     * Declarations
     ****************************/
    ImageCropperNew.PICTURES_SERVER_URL = "https://asexvo.azurewebsites.net/image"; //private server url
    ImageCropperNew.MAX_ZOOM_SPEED = 0.01;
    ImageCropperNew.UPLOAD_ERROR = "UPLOAD_ERROR";
    ImageCropperNew.LOAD_ERROR = "LOAD_ERROR";
    gencom.ImageCropperNew = ImageCropperNew;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var CoComponentBase = asBase.CoComponentBase;
    var Utils = asBase.Utils;
    var MouseEvents = asBase.events.MouseEvents;
    class CoImageEditModal extends CoComponentBase {
        constructor(iContainer) {
            super(null, "./skins/asModules/imagecropper/SkImageEditModal.html", iContainer);
            this.mPx = "px";
            this.mCanCloseOnOutClick = true;
            this.mModel = new gencom.MoImageEditModal(this);
        }
        //____________________________________________________________________
        creationComplete() {
            this.imageCropper_div = this.getPart("imageCropper_div");
            this.cropModalTitle_div = this.getPart('cropModalTitle_div');
            this.cropperCt_div = this.getPart('cropperCt_div');
            this.backgroundImage_img = this.getPart('backgroundImage_img');
            this.cropperBoxCt_div = this.getPart('cropperBoxCt_div');
            this.resizerLeft = this.getPart('resizerLeft');
            this.resizerRight = this.getPart('resizerRight');
            this.resizerTop = this.getPart('resizerTop');
            this.resizerBottom = this.getPart('resizerBottom');
            this.cropperCorner_tl = this.getPart("cropperCorner_tl");
            this.cropperCorner_tr = this.getPart("cropperCorner_tr");
            this.cropperCorner_bl = this.getPart("cropperCorner_bl");
            this.cropperCorner_br = this.getPart("cropperCorner_br");
            this.insideImg_img = this.getPart('insideImg_img');
            this.cropeEdit_btn = this.getPart('cropeEdit_btn');
            this.cropRemoveFile_btn = this.getPart('cropRemoveFile_btn');
            this.cropApply_btn = this.getPart('cropApply_btn');
            this.cropCancel_btn = this.getPart('cropCancel_btn');
            this.cropButtonsCropInactive_div = this.getPart('cropButtonsCropInactive_div');
            this.cropButtonsCropActive_div = this.getPart('cropButtonsCropActive_div');
            this.setToActive();
        }
        //___________________________________________________________________________________
        init() {
            this.handleOutSideClick__EventHandler__Function = (event) => this.handleOutSideClick__EventHandler(event);
            document.addEventListener(MouseEvents.MOUSE_DOWN, this.handleOutSideClick__EventHandler__Function);
        }
        //___________________________________________________________________________________
        handleOutSideClick__EventHandler(event) {
            if (this.contentWrapper.contains(event.target)) {
                return;
            }
            else if (this.mCanCloseOnOutClick) {
                this.hide();
                document.removeEventListener(MouseEvents.MOUSE_DOWN, this.handleOutSideClick__EventHandler__Function, false);
                this.handleOutSideClick__EventHandler__Function = null;
                let aEvent = new gencom.EvImageEditor(gencom.EvImageEditor.IMAGE_EDITOR, gencom.EvImageEditor.CLOSED, false, this);
                this.dispatchEvent(aEvent.event);
            }
        }
        dispatchImageRemoved() {
            let aEvent = new gencom.EvImageEditor(gencom.EvImageEditor.IMAGE_EDITOR, gencom.EvImageEditor.REMOVED, false, this);
            this.dispatchEvent(aEvent.event);
            this.hide();
        }
        dispatchImageCroped() {
            let aMultipler = this.backgroundImage_img.naturalWidth / this.backgroundImage_img.width;
            let aTransformation = new gencom.DaImageEditTransformations();
            aTransformation.width = Math.ceil(this.cropperBoxCt_div.getBoundingClientRect().width * aMultipler);
            aTransformation.height = Math.ceil(this.cropperBoxCt_div.getBoundingClientRect().height * aMultipler);
            let aXPosition = this.cropperBoxCt_div.getBoundingClientRect().left - this.cropperCt_div.getBoundingClientRect().left;
            let aYPosition = this.cropperBoxCt_div.getBoundingClientRect().top - this.cropperCt_div.getBoundingClientRect().top;
            aTransformation.x = Math.ceil(aXPosition * aMultipler);
            aTransformation.y = Math.ceil(aYPosition * aMultipler);
            aTransformation.crop = "crop";
            let aEvent = new gencom.EvImageEditor(gencom.EvImageEditor.IMAGE_EDITOR, gencom.EvImageEditor.CROPED, false, this);
            aEvent.imageLink = this.mImageLink;
            aEvent.transformations = aTransformation;
            this.dispatchEvent(aEvent.event);
            this.showCropInactive();
        }
        showCropActive() {
            this.cropModalTitle_div.innerText = asBase.LanguageDictionary.getText("crop-file", "Crop file");
            ;
            Utils.removeSkinPartFromLayout(this.cropButtonsCropInactive_div);
            Utils.includeSkinPartInLayout(this.cropButtonsCropActive_div);
            this.imageCropper_div.classList.add('crop-active');
            this.imageCropper_div.classList.remove('crop-inactive');
            this.cropperBoxCt_div.classList.add('crop-active');
            this.cropperBoxCt_div.classList.remove('crop-inactive');
        }
        showCropInactive() {
            this.cropModalTitle_div.innerText = asBase.LanguageDictionary.getText("File", "File");
            Utils.removeSkinPartFromLayout(this.cropButtonsCropActive_div);
            Utils.includeSkinPartInLayout(this.cropButtonsCropInactive_div);
            this.imageCropper_div.classList.remove('crop-active');
            this.imageCropper_div.classList.add('crop-inactive');
            this.cropperBoxCt_div.classList.remove('crop-active');
            this.cropperBoxCt_div.classList.add('crop-inactive');
        }
        //___________________________________________________________________________________
        loadImageWithAscpectRatio(iFileLink, iSvgWidth, iSvgHeight) {
            this.mImageLink = iFileLink;
            this.mSvgWidth = iSvgWidth;
            this.mSvgHeight = iSvgHeight;
            this.backgroundImage_img.src = iFileLink;
            this.insideImg_img.src = iFileLink;
            this.backgroundImage_img.onload = () => this.imageWithAspectRatioLoaded__eventHandler();
        }
        //__________________________________________________________________________
        imageWithAspectRatioLoaded__eventHandler() {
            this.show();
            this.mImgWidth = Math.round(this.backgroundImage_img.clientWidth); // (no decimals)
            this.mImgHeight = Math.round(this.backgroundImage_img.clientHeight); // (no decimals)
            this.mImgRatio = parseFloat((this.mImgWidth / this.mImgHeight).toFixed(2)); //only 2 decimals
            this.mSvgRatio = parseFloat((this.mSvgWidth / this.mSvgHeight).toFixed(2)); //only 2 decimals
            if (this.mSvgRatio > this.mImgRatio) {
                console.log("case 1: this.mSvgRatio > this.mImgRatio");
                // set the cropper box width/height
                this.cropperBoxCt_div.style.width = this.mImgWidth + this.mPx;
                this.cropperBoxCt_div.style.height = Math.round(this.mImgWidth / this.mSvgRatio) + this.mPx;
                // set position of cropper box
                this.mPushTop = Math.round((this.cropperCt_div.getBoundingClientRect().height - this.cropperBoxCt_div.getBoundingClientRect().height) / 2);
                this.mPushBottom = this.mImgHeight - Math.round(this.mImgWidth / this.mSvgRatio) - this.mPushTop;
                this.mPushLeft = 0;
                this.mPushRight = 0;
                this.cropperBoxCt_div.style.top = this.mPushTop + this.mPx;
                this.cropperBoxCt_div.style.bottom = this.mPushBottom + this.mPx;
                this.cropperBoxCt_div.style.left = this.mPushLeft + this.mPx;
                this.cropperBoxCt_div.style.right = this.mPushRight + this.mPx;
                // translate the inside image to fit over the main image
                this.mTranslateX = 0;
                this.mTranslateY = -this.mPushTop;
                this.translateImg();
                // update inside img width
                this.insideImgWH();
            }
            else if (this.mSvgRatio < this.mImgRatio) {
                console.log("case 2: this.mSvgRatio < this.mImgRatio");
                // set the cropper box width/height
                this.cropperBoxCt_div.style.width = Math.round(this.mSvgRatio * this.mImgHeight) + this.mPx;
                this.cropperBoxCt_div.style.height = this.mImgHeight + this.mPx;
                // set position of cropper box
                this.mPushTop = 0;
                this.mPushBottom = 0;
                this.mPushLeft = Math.round((this.cropperCt_div.getBoundingClientRect().width - this.cropperBoxCt_div.getBoundingClientRect().width) / 2);
                this.mPushRight = this.mImgWidth - Math.round(this.mSvgRatio * this.mImgHeight) - this.mPushLeft;
                this.cropperBoxCt_div.style.top = this.mPushTop + this.mPx;
                this.cropperBoxCt_div.style.bottom = this.mPushBottom + this.mPx;
                this.cropperBoxCt_div.style.left = this.mPushLeft + this.mPx;
                this.cropperBoxCt_div.style.right = this.mPushRight + this.mPx;
                //because the container width is reduced we have to set the width to the original img
                //this.insideImg_img.style.width = this.mImgWidth + this.mPx;
                // translate the inside image to fit over the main image
                this.mTranslateX = -this.mPushLeft;
                this.mTranslateY = 0;
                this.translateImg();
                // update inside img width
                this.insideImgWH();
            }
            else {
                console.log("case 3: this.mSvgRatio = this.mImgRatio");
                // set the cropper box width/height
                this.cropperBoxCt_div.style.width = this.mImgWidth + this.mPx;
                this.cropperBoxCt_div.style.height = this.mImgHeight + this.mPx;
                // set position of cropper box
                this.mPushTop = this.mPushBottom = this.mPushLeft = this.mPushRight = 0;
                this.cropperBoxCt_div.style.top = this.mPushTop + this.mPx;
                this.cropperBoxCt_div.style.bottom = this.mPushBottom + this.mPx;
                this.cropperBoxCt_div.style.left = this.mPushLeft + this.mPx;
                this.cropperBoxCt_div.style.right = this.mPushRight + this.mPx;
                // translate the inside image to fit over the main image
                this.mTranslateX = this.mTranslateY = 0;
                this.translateImg();
                // update inside img width
                this.insideImgWH();
            }
        }
        //___________________________________________________________________________________
        loadImage(iFileLink, iTransformations) {
            this.mTransformationApplied = iTransformations;
            this.mImageLink = iFileLink;
            this.backgroundImage_img.src = iFileLink;
            this.insideImg_img.src = iFileLink;
            this.backgroundImage_img.onload = () => this.imageLoaded__eventHandler();
        }
        imageLoaded__eventHandler() {
            this.show();
            let aDivider = this.backgroundImage_img.naturalWidth / this.backgroundImage_img.width;
            this.mImgWidth = Math.round(this.backgroundImage_img.clientWidth); // (no decimals)
            this.mImgHeight = Math.round(this.backgroundImage_img.clientHeight); // (no decimals)
            if (this.mTransformationApplied == null) {
                this.cropperBoxCt_div.style.width = this.mImgWidth + this.mPx;
                this.cropperBoxCt_div.style.height = this.mImgHeight + this.mPx;
                // set position of cropper box
                this.mPushTop = this.mPushBottom = this.mPushLeft = this.mPushRight = 0;
                this.cropperBoxCt_div.style.top = this.mPushTop + this.mPx;
                this.cropperBoxCt_div.style.bottom = this.mPushBottom + this.mPx;
                this.cropperBoxCt_div.style.left = this.mPushLeft + this.mPx;
                this.cropperBoxCt_div.style.right = this.mPushRight + this.mPx;
                // translate the inside image to fit over the main image
                this.mTranslateX = this.mTranslateY = 0;
                this.translateImg();
                // update inside img width
                this.insideImgWH();
            }
            else {
                let aCropedWidth = Math.round(this.mTransformationApplied.width / aDivider);
                let aCropedHeght = Math.round(this.mTransformationApplied.height / aDivider);
                let aCropedTop = Math.round(this.mTransformationApplied.y / aDivider);
                let aCropedLeft = Math.round(this.mTransformationApplied.x / aDivider);
                this.cropperBoxCt_div.style.width = aCropedWidth + this.mPx;
                this.cropperBoxCt_div.style.height = aCropedHeght + this.mPx;
                this.mPushTop = aCropedTop;
                this.mPushBottom = this.mImgHeight - aCropedTop - aCropedHeght;
                this.mPushLeft = aCropedLeft;
                this.mPushRight = this.mImgWidth - aCropedLeft - aCropedWidth;
                this.mTranslateY = -this.mPushTop;
                this.mTranslateX = -this.mPushLeft;
                this.translateImg();
                this.pushCropper();
                this.insideImgWH();
            }
        }
        //___________________________________________________________________________________
        show() {
            Utils.includeSkinPartInLayout(this.imageCropper_div);
        }
        //___________________________________________________________________________________
        hide() {
            Utils.removeSkinPartFromLayout(this.imageCropper_div);
            this.showCropInactive();
        }
        //___________________________________________________________________________________
        pushCropper() {
            this.cropperBoxCt_div.style.left = this.mPushLeft + this.mPx;
            this.cropperBoxCt_div.style.right = this.mPushRight + this.mPx;
            this.cropperBoxCt_div.style.top = this.mPushTop + this.mPx;
            this.cropperBoxCt_div.style.bottom = this.mPushBottom + this.mPx;
        }
        //___________________________________________________________________________________
        insideImgWH() {
            this.insideImg_img.style.height = this.mImgHeight + this.mPx;
            this.insideImg_img.style.width = this.mImgWidth + this.mPx;
        }
        //___________________________________________________________________________________
        updateCropperDimensions(iWidth, iHeight) {
            this.cropperBoxCt_div.style.width = iWidth + this.mPx;
            this.cropperBoxCt_div.style.height = iHeight + this.mPx;
        }
        //___________________________________________________________________________________
        updateCropperWidth(iWidth) {
            this.cropperBoxCt_div.style.width = iWidth + this.mPx;
        }
        //___________________________________________________________________________________
        updateCropperHeight(iHeight) {
            this.cropperBoxCt_div.style.height = iHeight + this.mPx;
        }
        //___________________________________________________________________________________
        translateImg() {
            this.insideImg_img.style.transform = "translateX(" + this.mTranslateX + "px) translateY(" + this.mTranslateY + "px)";
        }
        //------------------------------
        // Getters & Setters
        //------------------------------
        //___________________________________________________________________________________
        get cropperContainer() {
            return this.cropperCt_div;
        }
        //___________________________________________________________________________________
        get cropper() {
            return this.cropperBoxCt_div;
        }
        //___________________________________________________________________________________
        set pushBottom(iValue) {
            this.mPushBottom = iValue;
        }
        get pushBottom() {
            return this.mPushBottom;
        }
        //___________________________________________________________________________________
        set pushTop(iValue) {
            this.mPushTop = iValue;
        }
        get pushTop() {
            return this.mPushTop;
        }
        //___________________________________________________________________________________
        set pushLeft(iValue) {
            this.mPushLeft = iValue;
        }
        get pushLeft() {
            return this.mPushLeft;
        }
        //___________________________________________________________________________________
        set pushRight(iValue) {
            this.mPushRight = iValue;
        }
        get pushRight() {
            return this.mPushRight;
        }
        //___________________________________________________________________________________
        set translateX(iValue) {
            this.mTranslateX = iValue;
        }
        get translateX() {
            return this.mTranslateX;
        }
        //___________________________________________________________________________________
        set translateY(iValue) {
            this.mTranslateY = iValue;
        }
        get translateY() {
            return this.mTranslateY;
        }
        //___________________________________________________________________________________
        get svgWidth() {
            return this.mSvgWidth;
        }
        //___________________________________________________________________________________
        get svgHeight() {
            return this.mSvgHeight;
        }
        //___________________________________________________________________________________
        get imgWidth() {
            return this.mImgWidth;
        }
        //___________________________________________________________________________________
        get imgHeight() {
            return this.mImgHeight;
        }
        //___________________________________________________________________________________
        get svgRatio() {
            return this.mSvgRatio;
        }
        //___________________________________________________________________________________
        set canCloseOnOutClick(iValue) {
            this.mCanCloseOnOutClick = iValue;
        }
        get canCloseOnOutClick() {
            return this.mCanCloseOnOutClick;
        }
    }
    gencom.CoImageEditModal = CoImageEditModal;
})(gencom || (gencom = {}));
// check in DaCloudinaryTransformations what types accept next parameters
//             angle
//             colorSpace
//             crop
//             fetchFormat
//             format
//             flags
//             gravity
var gencom;
// check in DaCloudinaryTransformations what types accept next parameters
//             angle
//             colorSpace
//             crop
//             fetchFormat
//             format
//             flags
//             gravity
(function (gencom) {
    class DaImageEditTransformations {
        constructor() {
        }
    }
    gencom.DaImageEditTransformations = DaImageEditTransformations;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var AsEvent = asBase.events.AsEvent;
    class EvImageEditor extends AsEvent {
        constructor(type, iAction, bubbles, pOwner, pCallBack) {
            super(type, bubbles, pOwner);
            this.mSelectedAction = iAction;
        }
        /****************************
         * Getters and Setters
         ****************************/
        //________________________________________________________________________________________________________
        get selectedAction() {
            return this.mSelectedAction;
        }
        //________________________________________________________________________________________________________
        get transformations() {
            return this.mTransformations;
        }
        set transformations(value) {
            this.mTransformations = value;
        }
        //________________________________________________________________________________________________________
        get imageLink() {
            return this.mImageLink;
        }
        set imageLink(value) {
            this.mImageLink = value;
        }
    }
    //------------------------------
    // Constants
    //------------------------------
    // event
    EvImageEditor.IMAGE_EDITOR = "ImageCroper__Event";
    // actions
    EvImageEditor.CLOSED = "ModalClosed__Action";
    EvImageEditor.CROPED = "Croped__Action";
    EvImageEditor.REMOVED = "Removed__Action";
    gencom.EvImageEditor = EvImageEditor;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var MoModelBase = asBase.MoModelBase;
    var MouseEvents = asBase.events.MouseEvents;
    class MoImageEditModal extends MoModelBase {
        constructor(iCom) {
            super(iCom);
        }
        //____________________________________________________________________
        setToActive() {
            this.initDragRight__EventHandler_Function = (event) => this.initDragRight__EventHandler(event);
            this.com.resizerRight.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragRight__EventHandler_Function, false);
            this.initDragLeft__EventHandler_Function = (event) => this.initDragLeft__EventHandler(event);
            this.com.resizerLeft.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragLeft__EventHandler_Function, false);
            this.initDragTop__EventHandler_Function = (event) => this.initDragTop__EventHandler(event);
            this.com.resizerTop.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragTop__EventHandler_Function, false);
            this.initDragBotom__EventHandler_Function = (event) => this.initDragBotom__EventHandler(event);
            this.com.resizerBottom.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragBotom__EventHandler_Function, false);
            this.initDragCornerTl__EventHandler_Function = (event) => this.initDragTl__EventHandler(event);
            this.com.cropperCorner_tl.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragCornerTl__EventHandler_Function, false);
            this.initDragCornerTr__EventHandler_Function = (event) => this.initDragTr__EventHandler(event);
            this.com.cropperCorner_tr.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragCornerTr__EventHandler_Function, false);
            this.initDragCornerBr__EventHandler_Function = (event) => this.initDragBr__EventHandler(event);
            this.com.cropperCorner_br.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragCornerBr__EventHandler_Function, false);
            this.initDragCornerBl__EventHandler_Function = (event) => this.initDragBl__EventHandler(event);
            this.com.cropperCorner_bl.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragCornerBl__EventHandler_Function, false);
            this.initDragCropArea__EventHandler_Function = (event) => this.initDragCropArea__EventHandler(event);
            this.com.cropperBoxCt_div.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragCropArea__EventHandler_Function, false);
            this.com.cropApply_btn.addEventListener(MouseEvents.CLICK, () => this.cropApplyClick__EvventHandler());
            this.com.cropeEdit_btn.addEventListener(MouseEvents.CLICK, () => this.cropEditClick__EvventHandler());
            this.com.cropCancel_btn.addEventListener(MouseEvents.CLICK, () => this.cropCancelClick__EvventHandler());
            this.com.cropRemoveFile_btn.addEventListener(MouseEvents.CLICK, () => this.cropRemoveFileClick__EvventHandler());
        }
        //____________________________________________________________________
        setToSleep() {
            this.com.resizerRight.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragRight__EventHandler_Function, false);
            this.com.resizerLeft.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragLeft__EventHandler_Function, false);
            this.com.resizerTop.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragTop__EventHandler_Function, false);
            this.com.resizerBottom.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragBotom__EventHandler_Function, false);
            this.com.cropperCorner_tl.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragCornerTl__EventHandler_Function, false);
            this.com.cropperCorner_tr.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragCornerTr__EventHandler_Function, false);
            this.com.cropperCorner_bl.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragCornerBl__EventHandler_Function, false);
            this.com.cropperCorner_br.addEventListener(MouseEvents.MOUSE_DOWN, this.initDragCornerBr__EventHandler_Function, false);
            this.stopDrag__EventHandler_Function();
            this.initDragRight__EventHandler_Function = null;
            this.initDragLeft__EventHandler_Function = null;
            this.initDragTop__EventHandler_Function = null;
            this.initDragBotom__EventHandler_Function = null;
            this.initDragCornerTl__EventHandler_Function = null;
            this.initDragCornerTr__EventHandler_Function = null;
            this.initDragCornerBr__EventHandler_Function = null;
            this.initDragCornerBl__EventHandler_Function = null;
        }
        cropApplyClick__EvventHandler() {
            this.com.dispatchImageCroped();
        }
        cropEditClick__EvventHandler() {
            this.com.showCropActive();
        }
        cropCancelClick__EvventHandler() {
            this.com.showCropInactive();
        }
        cropRemoveFileClick__EvventHandler() {
            this.com.dispatchImageRemoved();
        }
        //____________________________________________________________________
        initDragRight__EventHandler(event) {
            event.preventDefault();
            event.stopPropagation();
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            this.mStartX = e.clientX;
            this.com.canCloseOnOutClick = false;
            this.mStartWidth = this.com.cropperBoxCt_div.getBoundingClientRect().width;
            this.mStartHeight = this.com.cropperBoxCt_div.getBoundingClientRect().height;
            this.stopDrag__EventHandler_Function = (event) => this.stopDrag__EventHandler(event);
            this.doDrag__EventHandler_Function = (event) => this.doDragRight__EventHandler(event);
            document.addEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
            document.addEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
        }
        //____________________________________________________________________
        initDragLeft__EventHandler(event) {
            event.preventDefault();
            event.stopPropagation();
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            this.mStartX = e.clientX;
            this.com.canCloseOnOutClick = false;
            this.mStartWidth = this.com.cropperBoxCt_div.getBoundingClientRect().width;
            this.mStartHeight = this.com.cropperBoxCt_div.getBoundingClientRect().height;
            this.stopDrag__EventHandler_Function = (event) => this.stopDrag__EventHandler(event);
            this.doDrag__EventHandler_Function = (event) => this.doDragLeft__EventHandler(event);
            document.addEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
            document.addEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
        }
        //____________________________________________________________________
        initDragTop__EventHandler(event) {
            event.preventDefault();
            event.stopPropagation();
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            this.mStartY = e.clientY;
            this.com.canCloseOnOutClick = false;
            this.mStartWidth = this.com.cropperBoxCt_div.getBoundingClientRect().width;
            this.mStartHeight = this.com.cropperBoxCt_div.getBoundingClientRect().height;
            this.stopDrag__EventHandler_Function = (event) => this.stopDrag__EventHandler(event);
            this.doDrag__EventHandler_Function = (event) => this.doDragTop__EventHandler(event);
            document.addEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
            document.addEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
        }
        //____________________________________________________________________
        initDragBotom__EventHandler(event) {
            event.preventDefault();
            event.stopPropagation();
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            this.mStartY = e.clientY;
            this.com.canCloseOnOutClick = false;
            this.mStartWidth = this.com.cropperBoxCt_div.getBoundingClientRect().width;
            this.mStartHeight = this.com.cropperBoxCt_div.getBoundingClientRect().height;
            this.stopDrag__EventHandler_Function = (event) => this.stopDrag__EventHandler(event);
            this.doDrag__EventHandler_Function = (event) => this.doDragBottom__EventHandler(event);
            document.addEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
            document.addEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
        }
        //____________________________________________________________________
        initDragTl__EventHandler(event) {
            event.preventDefault();
            event.stopPropagation();
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            this.mStartY = e.clientY;
            this.mStartX = e.clientX;
            this.com.canCloseOnOutClick = false;
            this.mStartWidth = this.com.cropperBoxCt_div.getBoundingClientRect().width;
            this.mStartHeight = this.com.cropperBoxCt_div.getBoundingClientRect().height;
            this.stopDrag__EventHandler_Function = (event) => this.stopDrag__EventHandler(event);
            this.doDrag__EventHandler_Function = (event) => this.doDragTl__EventHandler(event);
            document.addEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
            document.addEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
            // to do
        }
        //____________________________________________________________________
        initDragTr__EventHandler(event) {
            event.preventDefault();
            event.stopPropagation();
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            this.mStartY = e.clientY;
            this.mStartX = e.clientX;
            this.com.canCloseOnOutClick = false;
            this.mStartWidth = this.com.cropperBoxCt_div.getBoundingClientRect().width;
            this.mStartHeight = this.com.cropperBoxCt_div.getBoundingClientRect().height;
            this.stopDrag__EventHandler_Function = (event) => this.stopDrag__EventHandler(event);
            this.doDrag__EventHandler_Function = (event) => this.doDragTr__EventHandler(event);
            document.addEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
            document.addEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
            // to do
        }
        //____________________________________________________________________
        initDragBl__EventHandler(event) {
            event.preventDefault();
            event.stopPropagation();
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            this.mStartY = e.clientY;
            this.mStartX = e.clientX;
            this.com.canCloseOnOutClick = false;
            this.mStartWidth = this.com.cropperBoxCt_div.getBoundingClientRect().width;
            this.mStartHeight = this.com.cropperBoxCt_div.getBoundingClientRect().height;
            this.stopDrag__EventHandler_Function = (event) => this.stopDrag__EventHandler(event);
            this.doDrag__EventHandler_Function = (event) => this.doDragBl__EventHandler(event);
            document.addEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
            document.addEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
            // to do
        }
        //____________________________________________________________________
        initDragBr__EventHandler(event) {
            event.preventDefault();
            event.stopPropagation();
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            this.mStartY = e.clientY;
            this.mStartX = e.clientX;
            this.com.canCloseOnOutClick = false;
            this.mStartWidth = this.com.cropperBoxCt_div.getBoundingClientRect().width;
            this.mStartHeight = this.com.cropperBoxCt_div.getBoundingClientRect().height;
            this.stopDrag__EventHandler_Function = (event) => this.stopDrag__EventHandler(event);
            this.doDrag__EventHandler_Function = (event) => this.doDragBr__EventHandler(event);
            document.addEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
            document.addEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
            // to do
        }
        //____________________________________________________________________
        initDragCropArea__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            if (e.target.classList.contains('crop-active') || e.target.parentElement.classList.contains('crop-active')) {
                this.mStartX = e.clientX;
                this.mStartY = e.clientY;
                this.com.canCloseOnOutClick = false;
                this.stopDrag__EventHandler_Function = (event) => this.stopDrag__EventHandler(event);
                this.doDrag__EventHandler_Function = (event) => this.doDragCropArea__EventHandler(event);
                document.addEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
                document.addEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
            }
        }
        //____________________________________________________________________
        doDragRight__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            let aNewWidth;
            aNewWidth = this.mStartWidth + e.clientX - this.mStartX;
            // make sure it doesn't get outside the container & no lower than 20px
            if ((this.com.pushLeft + aNewWidth <= this.com.imgWidth) && (aNewWidth > 19)) {
                this.com.pushRight = this.com.imgWidth - this.com.pushLeft - aNewWidth;
                this.com.updateCropperWidth(aNewWidth);
            }
            //keep the inside image the same width/height
            this.com.insideImgWH();
            // apply push / translate
            this.com.pushCropper();
            // translate - remains unchanged
        }
        //____________________________________________________________________
        doDragLeft__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            let aNewWidth;
            aNewWidth = this.mStartWidth + this.mStartX - e.clientX;
            // make sure it doesn't get outside the container & no lower than 20px
            if ((this.com.pushRight + aNewWidth <= this.com.imgWidth) && (aNewWidth > 19)) {
                this.com.pushLeft = this.com.imgWidth - this.com.pushRight - aNewWidth;
                this.com.updateCropperWidth(aNewWidth);
            }
            //keep the inside image the same width/height
            this.com.insideImgWH();
            // apply push / translate
            this.com.pushCropper();
            //inside img should be moved
            this.com.translateX = -this.com.pushLeft;
            //apply translations to inside img
            this.com.translateImg();
        }
        //____________________________________________________________________
        doDragTop__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            let aNewHeight;
            aNewHeight = this.mStartHeight + this.mStartY - e.clientY;
            if ((this.com.pushBottom + aNewHeight <= this.com.imgHeight) && (aNewHeight > 19)) {
                this.com.pushTop = this.com.imgHeight - this.com.pushBottom - aNewHeight;
                this.com.updateCropperHeight(aNewHeight);
            }
            //keep the inside image the same width/height
            this.com.insideImgWH();
            // apply push / translate
            this.com.pushCropper();
            //inside img should be moved
            this.com.translateY = -this.com.pushTop;
            //apply translations to inside img
            this.com.translateImg();
        }
        //____________________________________________________________________
        doDragBottom__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            let aNewHeight;
            aNewHeight = this.mStartHeight - (this.mStartY - e.clientY);
            if ((this.com.pushTop + aNewHeight <= this.com.imgHeight) && (aNewHeight > 19)) {
                this.com.pushBottom = this.com.imgHeight - this.com.pushTop - aNewHeight;
                this.com.updateCropperHeight(aNewHeight);
            }
            //keep the inside image the same width/height
            this.com.insideImgWH();
            // apply push / translate
            this.com.pushCropper();
        }
        //____________________________________________________________________
        doDragTl__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            let aNewHeight;
            let aNewWidth;
            aNewHeight = this.mStartHeight + this.mStartY - e.clientY;
            aNewWidth = this.mStartWidth + this.mStartX - e.clientX;
            if ((this.com.pushBottom + aNewHeight <= this.com.imgHeight) && (aNewHeight > 19) && (this.com.pushRight + aNewWidth <= this.com.imgWidth) && (aNewWidth > 19)) {
                this.com.pushTop = this.com.imgHeight - this.com.pushBottom - aNewHeight;
                this.com.pushLeft = this.com.imgWidth - this.com.pushRight - aNewWidth;
                this.com.updateCropperHeight(aNewHeight);
                this.com.updateCropperWidth(aNewWidth);
            }
            //keep the inside image the same width/height
            this.com.insideImgWH();
            // apply push / translate
            this.com.pushCropper();
            //inside img should be moved
            this.com.translateX = -this.com.pushLeft;
            this.com.translateY = -this.com.pushTop;
            //apply translations to inside img
            this.com.translateImg();
        }
        //____________________________________________________________________
        doDragTr__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            let aNewHeight;
            let aNewWidth;
            aNewWidth = this.mStartWidth + e.clientX - this.mStartX;
            aNewHeight = this.mStartHeight + this.mStartY - e.clientY;
            if ((this.com.pushLeft + aNewWidth <= this.com.imgWidth) && (aNewWidth > 19) && (this.com.pushBottom + aNewHeight <= this.com.imgHeight) && (aNewHeight > 19)) {
                this.com.pushTop = this.com.imgHeight - this.com.pushBottom - aNewHeight;
                this.com.pushRight = this.com.imgWidth - this.com.pushLeft - aNewWidth;
                this.com.updateCropperHeight(aNewHeight);
                this.com.updateCropperWidth(aNewWidth);
            }
            //keep the inside image the same width/height
            this.com.insideImgWH();
            // apply push / translate
            this.com.pushCropper();
            //inside img should be moved
            this.com.translateY = -this.com.pushTop;
            //apply translations to inside img
            this.com.translateImg();
        }
        //____________________________________________________________________
        doDragBl__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            let aNewHeight;
            let aNewWidth;
            aNewWidth = this.mStartWidth + this.mStartX - e.clientX;
            aNewHeight = this.mStartHeight - (this.mStartY - e.clientY);
            if ((this.com.pushTop + aNewHeight <= this.com.imgHeight) && (aNewHeight > 19) && (this.com.pushRight + aNewWidth <= this.com.imgWidth) && (aNewWidth > 19)) {
                this.com.pushBottom = this.com.imgHeight - this.com.pushTop - aNewHeight;
                this.com.pushLeft = this.com.imgWidth - this.com.pushRight - aNewWidth;
                this.com.updateCropperHeight(aNewHeight);
                this.com.updateCropperWidth(aNewWidth);
            }
            //keep the inside image the same width/height
            this.com.insideImgWH();
            // apply push / translate
            this.com.pushCropper();
            //inside img should be moved
            this.com.translateX = -this.com.pushLeft;
            //apply translations to inside img
            this.com.translateImg();
        }
        //____________________________________________________________________
        doDragBr__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            let aNewHeight;
            let aNewWidth;
            aNewHeight = this.mStartHeight - (this.mStartY - e.clientY);
            aNewWidth = this.mStartWidth + e.clientX - this.mStartX;
            if ((this.com.pushTop + aNewHeight <= this.com.imgHeight) && (aNewHeight > 19) && (this.com.pushLeft + aNewWidth <= this.com.imgWidth) && (aNewWidth > 19)) {
                this.com.pushBottom = this.com.imgHeight - this.com.pushTop - aNewHeight;
                this.com.pushRight = this.com.imgWidth - this.com.pushLeft - aNewWidth;
                this.com.updateCropperHeight(aNewHeight);
                this.com.updateCropperWidth(aNewWidth);
            }
            //keep the inside image the same width/height
            this.com.insideImgWH();
            // apply push / translate
            this.com.pushCropper();
        }
        //____________________________________________________________________
        doDragCropArea__EventHandler(event) {
            let e = event;
            if (event.touches) {
                e = event.touches[0];
            }
            if (this.com.cropper.contains(event.target)) {
                let aLocalpushBottom = this.com.pushBottom;
                let aLocalpushTop = this.com.pushTop;
                let aLocalpushLeft = this.com.pushLeft;
                let aLocalpushRight = this.com.pushRight;
                aLocalpushBottom += this.mStartY - e.clientY;
                aLocalpushTop -= this.mStartY - e.clientY;
                aLocalpushLeft -= this.mStartX - e.clientX;
                aLocalpushRight += this.mStartX - e.clientX;
                let aAreAllPositive = aLocalpushBottom >= 0 && aLocalpushTop >= 0 && aLocalpushLeft >= 0 && aLocalpushRight >= 0;
                if (aAreAllPositive) {
                    this.com.pushBottom = aLocalpushBottom;
                    this.com.pushTop = aLocalpushTop;
                    this.com.pushLeft = aLocalpushLeft;
                    this.com.pushRight = aLocalpushRight;
                    this.com.translateY = -this.com.pushTop;
                    this.com.translateX = -this.com.pushLeft;
                    this.com.translateImg();
                    this.com.pushCropper();
                }
                this.mStartY = e.clientY;
                this.mStartX = e.clientX;
            }
        }
        //____________________________________________________________________
        stopDrag__EventHandler(e) {
            this.com.canCloseOnOutClick = true;
            document.removeEventListener(MouseEvents.MOUSE_MOVE, this.doDrag__EventHandler_Function, false);
            document.removeEventListener(MouseEvents.MOUSE_UP, this.stopDrag__EventHandler_Function, false);
            this.stopDrag__EventHandler_Function = null;
            this.doDrag__EventHandler_Function = null;
        }
        //------------------------------
        // Getters & Setters
        //------------------------------
        //____________________________________________________________________
        get com() {
            return this.mCom;
        }
    }
    gencom.MoImageEditModal = MoImageEditModal;
})(gencom || (gencom = {}));
///<reference path="CoOkCancelWindow.ts"/>
///<reference path="../../asBase/baseclasses/PopUpWindow.ts"/>
///<reference path="../CoCheckBox.ts"/>
var com;
///<reference path="CoOkCancelWindow.ts"/>
///<reference path="../../asBase/baseclasses/PopUpWindow.ts"/>
///<reference path="../CoCheckBox.ts"/>
(function (com) {
    var entry;
    (function (entry) {
        var messagewindow;
        (function (messagewindow) {
            var EventManager = asBase.events.EventManager;
            var EventTypes = asBase.events.EventTypes;
            var MouseEvents = asBase.events.MouseEvents;
            var PopUpWindow = asBase.baseclasses.PopUpWindow;
            var CoCheckBox = gencom.checkbox.CoCheckBox;
            var Utils = asBase.Utils;
            class CoMessageWindowCloseBtn extends PopUpWindow {
                constructor(iHTMLElement, iSkin) {
                    super(iSkin ? iSkin : "./skins/gencom/messagewindow/SkMessageWindowCloseBtn", iHTMLElement);
                    //------------------------------
                    // Members
                    //------------------------------
                    this.mTitle = "";
                    this.mMessage = "";
                    this.mFootNote = "";
                    this.mMessageIcon = "";
                    this.mIsWithImSure = false;
                    this.mYesBtnLabel = "OK";
                    this.mNoBtnLabel = "CANCEL";
                    this.mNotSupported = false;
                    this.mBrowserModal = false;
                }
                //____________________________________________________________________
                creationComplete() {
                    this.title_lbl = this.getPart("title_lbl");
                    this.title_lbl.innerHTML = this.mTitle;
                    this.message_lbl = this.getPart("message_lbl");
                    this.message_lbl.innerHTML = this.mMessage;
                    this.footNote_lbl = this.getPart("footNote_lbl");
                    this.footNote_lbl.innerHTML = this.mFootNote;
                    this.no_btn = this.getPart("no_btn");
                    //Levi changed translate
                    this.no_btn.innerHTML = asBase.LanguageDictionary.getText("CANCEL", this.mNoBtnLabel);
                    this.close_btn = this.getPart("close_btn");
                    this.yes_btn = this.getPart("yes_btn");
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", this.mYesBtnLabel);
                    this.messageIcon_span = this.getPart("messageIcon_span");
                    this.messageIcon_span.className = "";
                    this.imSure_chb = this.getPart("imSure_chb");
                    this.imSure_chb_com = new CoCheckBox(this.imSure_chb);
                    this.imSure_chb_com.includeInLayout = this.mIsWithImSure;
                    super.creationComplete();
                }
                //____________________________________________________________________
                show(iCallBackFunction = null) {
                    if (this.imSure_chb_com) {
                        this.imSure_chb_com.includeInLayout = this.mIsWithImSure;
                        this.imSure_chb_com.selected = false;
                        this.imSure_chb_com.clearError();
                    }
                    super.show(iCallBackFunction);
                }
                //____________________________________________________________________
                hide() {
                    this.removeBrowserModalClass();
                    this.removeNotSupportedClass();
                    Utils.removeSkinPartFromLayout(this.footNote_lbl);
                    this.mIsWithImSure = false;
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    this.mYesBtnLabel = "OK";
                    this.no_btn.innerHTML = asBase.LanguageDictionary.getText("CANCEL", "CANCEL");
                    this.mNoBtnLabel = "CANCEL";
                    super.hide();
                }
                //____________________________________________________________________
                addEventListeners() {
                    EventManager.addEventListener(EventTypes.ESC_KEY_DOWN, () => this.escClicked__EventHandler(), this);
                    this.yes__EventHandler_Func = () => this.yes__EventHandler();
                    this.yes_btn.addEventListener(MouseEvents.CLICK, this.yes__EventHandler_Func);
                    this.no__EventHandler_Func = () => this.no__EventHandler();
                    this.no_btn.addEventListener(MouseEvents.CLICK, this.no__EventHandler_Func);
                    this.close_btn.addEventListener(MouseEvents.CLICK, this.no__EventHandler_Func);
                    this.imSure_chb_com.addEventListener(EventTypes.CHANGE, () => this.imSureChanged__EventHandler(), this);
                }
                //____________________________________________________________________
                removeEventListeners() {
                    EventManager.removeEventListener(EventTypes.ESC_KEY_DOWN, this);
                    this.yes_btn.removeEventListener(MouseEvents.CLICK, this.yes__EventHandler_Func);
                    this.no_btn.removeEventListener(MouseEvents.CLICK, this.no__EventHandler_Func);
                }
                //________________________________________________________________________________________________________
                escClicked__EventHandler() {
                    this.no__EventHandler();
                }
                //____________________________________________________________________
                switchToQuestion() {
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                        //this.messageIcon_span.classList.add(this.mMessageIcon);
                    }
                    Utils.showSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToYesNoQuestion() {
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                        //this.messageIcon_span.classList.add(this.mMessageIcon);
                    }
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("message-window-yes-button", "YES");
                    this.no_btn.innerHTML = asBase.LanguageDictionary.getText("message-window-no-button", "NO");
                    Utils.showSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToNotification() {
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToNotificationWithCancel() {
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    Utils.showSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToLocked() {
                    if (this.messageIcon_span) {
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToBrowserNotSupported() {
                    this.mMessageIcon = CoMessageWindowCloseBtn.BROWSER_NOT_SUPPORTED_CHROME;
                    if (this.messageIcon_span) {
                        if (asBase.Utils.isIOS) {
                            this.mMessageIcon = CoMessageWindowCloseBtn.BROWSER_NOT_SUPPORTED_SAFARI;
                        }
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    this.popup_div.classList.add("not-supported");
                    this.mNotSupported = true;
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("Got-it", "Got it");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToBrowserPermission() {
                    if (this.messageIcon_span) {
                        if (asBase.Globals.isChrome && !asBase.Globals.isMobile) {
                            this.mMessageIcon = CoMessageWindowCloseBtn.BROWSER_PERMISSION_CHROME_WEB;
                        }
                        else if (Utils.isIOS) {
                            this.mMessageIcon = CoMessageWindowCloseBtn.BROWSER_PERMISSION_SAFARI_IOS;
                        }
                        else if (asBase.Globals.isChrome && asBase.Globals.isMobile) {
                            this.mMessageIcon = CoMessageWindowCloseBtn.BROWSER_PERMISSION_CHROME_TABLET;
                        }
                        else if (asBase.Globals.isSafari) {
                            this.mMessageIcon = CoMessageWindowCloseBtn.BROWSER_PERMISSION_SAFARI;
                        }
                        else {
                            this.mMessageIcon = CoMessageWindowCloseBtn.BROWSER_PERMISSION_CHROME_TABLET;
                        }
                        this.messageIcon_span.className = this.mMessageIcon;
                    }
                    this.popup_div.classList.add("browser-modal");
                    Utils.includeSkinPartInLayout(this.footNote_lbl);
                    this.mBrowserModal = true;
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("Got-it", "Got it");
                    Utils.hideSkinPart(this.no_btn);
                }
                //__________________________________________________________________________
                switchToError() {
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                switchToCreditCardError() {
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", "OK");
                    Utils.hideSkinPart(this.no_btn);
                }
                //____________________________________________________________________
                yes__EventHandler() {
                    if (this.mIsWithImSure && !this.imSure_chb_com.selected) {
                        this.imSure_chb_com.setError();
                        return;
                    }
                    this.mSelectedAction = messagewindow.CoMessageWindow.SELECTED_ACTION_YES;
                    if (this.mCallBackFunc) {
                        this.mCallBackFunc(this.mSelectedAction);
                    }
                    this.hide();
                }
                //____________________________________________________________________
                no__EventHandler() {
                    this.mSelectedAction = messagewindow.CoMessageWindow.SELECTED_ACTION_NO;
                    if (this.mCallBackFunc) {
                        this.mCallBackFunc(this.mSelectedAction);
                    }
                    this.hide();
                }
                //_____________________________________________________________________
                imSureChanged__EventHandler() {
                    if (this.imSure_chb_com.selected) {
                        this.imSure_chb_com.clearError();
                    }
                }
                //____________________________________________________________________
                removeNotSupportedClass() {
                    if (this.mNotSupported) {
                        this.mNotSupported = false;
                        this.popup_div.classList.remove("not-supported");
                    }
                }
                //____________________________________________________________________
                removeBrowserModalClass() {
                    if (this.mBrowserModal) {
                        this.mBrowserModal = false;
                        this.popup_div.classList.remove("browser-modal");
                    }
                }
                //____________________________________________________________________
                showFootNote() {
                    Utils.includeSkinPartInLayout(this.footNote_lbl);
                }
                /****************************
                 * Getters & Setters
                 ****************************/
                //____________________________________________________________________
                set title(value) {
                    this.mTitle = value;
                    if (this.title_lbl) {
                        this.title_lbl.innerHTML = this.mTitle;
                    }
                }
                //____________________________________________________________________
                set message(value) {
                    this.mMessage = value;
                    if (this.message_lbl) {
                        this.message_lbl.innerHTML = this.mMessage;
                    }
                }
                //____________________________________________________________________
                set footNote(value) {
                    this.mFootNote = value;
                    if (this.footNote_lbl) {
                        this.footNote_lbl.innerHTML = this.mFootNote;
                    }
                }
                //____________________________________________________________________
                set isWithImSure(value) {
                    this.mIsWithImSure = value;
                }
                //____________________________________________________________________
                set yesBtnLabel(value) {
                    this.mYesBtnLabel = value;
                    if (this.yes_btn) {
                        this.yes_btn.innerHTML = value;
                    }
                }
                //____________________________________________________________________
                set noBtnLabel(value) {
                    this.mNoBtnLabel = value;
                    if (this.no_btn) {
                        this.no_btn.innerHTML = value;
                    }
                }
            }
            CoMessageWindowCloseBtn.SELECTED_ACTION_YES = "SelectedActionYes";
            CoMessageWindowCloseBtn.SELECTED_ACTION_NO = "SelectedActionNo";
            //------------------------------
            // icons
            //------------------------------
            CoMessageWindowCloseBtn.BROWSER_NOT_SUPPORTED_CHROME = "browser_not_supported_chrome";
            CoMessageWindowCloseBtn.BROWSER_NOT_SUPPORTED_SAFARI = "browser_not_supported_safari";
            CoMessageWindowCloseBtn.BROWSER_PERMISSION_CHROME_WEB = "browser-chrome-web";
            CoMessageWindowCloseBtn.BROWSER_PERMISSION_CHROME_TABLET = "browser-chrome-tablet";
            CoMessageWindowCloseBtn.BROWSER_PERMISSION_SAFARI = "browser-safari-web";
            CoMessageWindowCloseBtn.BROWSER_PERMISSION_SAFARI_IOS = "browser-safari-ios";
            messagewindow.CoMessageWindowCloseBtn = CoMessageWindowCloseBtn;
        })(messagewindow = entry.messagewindow || (entry.messagewindow = {}));
    })(entry = com.entry || (com.entry = {}));
})(com || (com = {}));
///<reference path="CoOkCancelWindow.ts"/>
///<reference path="../../asBase/baseclasses/PopUpWindow.ts"/>
///<reference path="../CoCheckBox.ts"/>
var com;
///<reference path="CoOkCancelWindow.ts"/>
///<reference path="../../asBase/baseclasses/PopUpWindow.ts"/>
///<reference path="../CoCheckBox.ts"/>
(function (com) {
    var entry;
    (function (entry) {
        var messagewindow;
        (function (messagewindow) {
            var EventManager = asBase.events.EventManager;
            var EventTypes = asBase.events.EventTypes;
            var MouseEvents = asBase.events.MouseEvents;
            var PopUpWindow = asBase.baseclasses.PopUpWindow;
            var Utils = asBase.Utils;
            var SkinsCss = asBase.SkinsCss;
            class CoMessageWindowReview extends PopUpWindow {
                constructor(iHTMLElement, iSkin) {
                    super(iSkin ? iSkin : "./skins/gencom/messagewindow/SkMessageWindowReview", iHTMLElement);
                    //------------------------------
                    // Members
                    //------------------------------
                    this.mTitle = "";
                    this.mMessage = "";
                    this.mIsWithImSure = false;
                    this.mYesBtnLabel = "OK";
                    this.mNoBtnLabel = "CANCEL";
                    this.mCurrentScore = 0;
                }
                //____________________________________________________________________
                creationComplete() {
                    this.title_lbl = this.getPart("title_lbl");
                    this.message_lbl = this.getPart("message_lbl");
                    this.yes_btn = this.getPart("yes_btn");
                    this.yes_btn.innerHTML = asBase.LanguageDictionary.getText("OK", this.mYesBtnLabel);
                    this.disableYesBtn();
                    this.review_txti = this.getPart("review_txti");
                    this.close_btn = this.getPart("close_btn");
                    this.star1_lbl = this.getPart("star1_lbl");
                    this.star2_lbl = this.getPart("star2_lbl");
                    this.star3_lbl = this.getPart("star3_lbl");
                    this.star4_lbl = this.getPart("star4_lbl");
                    this.star5_lbl = this.getPart("star5_lbl");
                    this.review_lbl = this.getPart("review_lbl");
                    super.creationComplete();
                }
                //____________________________________________________________________
                show(iCallBackFunction = null) {
                    EventManager.dispatchEvent(CoMessageWindowReview.DISABLE_KEYBOARD, this);
                    super.show(iCallBackFunction);
                }
                //____________________________________________________________________
                hide() {
                    EventManager.dispatchEvent(CoMessageWindowReview.ENABLE_KEYBOARD, this);
                    this.star1_lbl_EventHandler();
                    this.star1_lbl.classList.remove("fill");
                    this.star1_lbl.classList.add("empty");
                    this.mCurrentScore = 0;
                    this.disableYesBtn();
                    this.review_txti.value = "";
                    super.hide();
                    this.removeEventListeners();
                }
                disableYesBtn() {
                    Utils.addClassToElement(this.yes_btn, SkinsCss.DISABLED);
                    this.yes_btn.disabled = true;
                }
                enableYesBtn() {
                    Utils.removeClassFromElement(this.yes_btn, SkinsCss.DISABLED);
                    this.yes_btn.disabled = false;
                }
                //____________________________________________________________________
                addEventListeners() {
                    this.esc__EventHandler_Func = () => this.escClicked__EventHandler();
                    EventManager.addEventListener(EventTypes.ESC_KEY_DOWN, this.esc__EventHandler_Func, this);
                    this.yes__EventHandler_Func = () => this.yes__EventHandler();
                    this.yes_btn.addEventListener(MouseEvents.CLICK, this.yes__EventHandler_Func);
                    this.close_btn.addEventListener(MouseEvents.CLICK, this.esc__EventHandler_Func);
                    this.star1_lbl_EventHandler_Func = () => this.star1_lbl_EventHandler();
                    this.star1_lbl.addEventListener(MouseEvents.CLICK, this.star1_lbl_EventHandler_Func);
                    this.star2_lbl_EventHandler_Func = () => this.star2_lbl_EventHandler();
                    this.star2_lbl.addEventListener(MouseEvents.CLICK, this.star2_lbl_EventHandler_Func);
                    this.star3_lbl_EventHandler_Func = () => this.star3_lbl_EventHandler();
                    this.star3_lbl.addEventListener(MouseEvents.CLICK, this.star3_lbl_EventHandler_Func);
                    this.star4_lbl_EventHandler_Func = () => this.star4_lbl_EventHandler();
                    this.star4_lbl.addEventListener(MouseEvents.CLICK, this.star4_lbl_EventHandler_Func);
                    this.star5_lbl_EventHandler_Func = () => this.star5_lbl_EventHandler();
                    this.star5_lbl.addEventListener(MouseEvents.CLICK, this.star5_lbl_EventHandler_Func);
                }
                //____________________________________________________________________
                removeEventListeners() {
                    EventManager.removeEventListener(EventTypes.ESC_KEY_DOWN, this);
                    this.yes_btn.removeEventListener(MouseEvents.CLICK, this.yes__EventHandler_Func);
                    this.close_btn.removeEventListener(MouseEvents.CLICK, this.esc__EventHandler_Func);
                    this.star1_lbl.removeEventListener(MouseEvents.CLICK, this.star1_lbl_EventHandler_Func);
                    this.star2_lbl.removeEventListener(MouseEvents.CLICK, this.star2_lbl_EventHandler_Func);
                    this.star3_lbl.removeEventListener(MouseEvents.CLICK, this.star3_lbl_EventHandler_Func);
                    this.star4_lbl.removeEventListener(MouseEvents.CLICK, this.star4_lbl_EventHandler_Func);
                    this.star5_lbl.removeEventListener(MouseEvents.CLICK, this.star5_lbl_EventHandler_Func);
                }
                //________________________________________________________________________________________________________
                escClicked__EventHandler() {
                    this.no__EventHandler();
                }
                //____________________________________________________________________
                yes__EventHandler() {
                    this.mSelectedAction = messagewindow.CoMessageWindow.SELECTED_ACTION_YES;
                    if (this.mCallBackFunc) {
                        this.mCallBackFunc(this.mCurrentScore, this.review_txti.value);
                    }
                    this.hide();
                }
                //____________________________________________________________________
                star1_lbl_EventHandler() {
                    this.enableYesBtn();
                    this.star1_lbl.classList.remove("empty");
                    this.star1_lbl.classList.add("fill");
                    this.star2_lbl.classList.remove("fill");
                    this.star2_lbl.classList.add("empty");
                    this.star3_lbl.classList.remove("fill");
                    this.star3_lbl.classList.add("empty");
                    this.star4_lbl.classList.remove("fill");
                    this.star4_lbl.classList.add("empty");
                    this.star5_lbl.classList.remove("fill");
                    this.star5_lbl.classList.add("empty");
                    this.mCurrentScore = 1;
                }
                //____________________________________________________________________
                star2_lbl_EventHandler() {
                    this.enableYesBtn();
                    this.star1_lbl.classList.remove("empty");
                    this.star1_lbl.classList.add("fill");
                    this.star2_lbl.classList.remove("empty");
                    this.star2_lbl.classList.add("fill");
                    this.star3_lbl.classList.remove("fill");
                    this.star3_lbl.classList.add("empty");
                    this.star4_lbl.classList.remove("fill");
                    this.star4_lbl.classList.add("empty");
                    this.star5_lbl.classList.remove("fill");
                    this.star5_lbl.classList.add("empty");
                    this.mCurrentScore = 2;
                }
                //____________________________________________________________________
                star3_lbl_EventHandler() {
                    this.enableYesBtn();
                    this.star1_lbl.classList.remove("empty");
                    this.star1_lbl.classList.add("fill");
                    this.star2_lbl.classList.remove("empty");
                    this.star2_lbl.classList.add("fill");
                    this.star3_lbl.classList.remove("empty");
                    this.star3_lbl.classList.add("fill");
                    this.star4_lbl.classList.remove("fill");
                    this.star4_lbl.classList.add("empty");
                    this.star5_lbl.classList.remove("fill");
                    this.star5_lbl.classList.add("empty");
                    this.mCurrentScore = 3;
                }
                //____________________________________________________________________
                star4_lbl_EventHandler() {
                    this.enableYesBtn();
                    this.star1_lbl.classList.remove("empty");
                    this.star1_lbl.classList.add("fill");
                    this.star2_lbl.classList.remove("empty");
                    this.star2_lbl.classList.add("fill");
                    this.star3_lbl.classList.remove("empty");
                    this.star3_lbl.classList.add("fill");
                    this.star4_lbl.classList.remove("empty");
                    this.star4_lbl.classList.add("fill");
                    this.star5_lbl.classList.remove("fill");
                    this.star5_lbl.classList.add("empty");
                    this.mCurrentScore = 4;
                }
                //____________________________________________________________________
                star5_lbl_EventHandler() {
                    this.enableYesBtn();
                    this.star1_lbl.classList.remove("empty");
                    this.star1_lbl.classList.add("fill");
                    this.star2_lbl.classList.remove("empty");
                    this.star2_lbl.classList.add("fill");
                    this.star3_lbl.classList.remove("empty");
                    this.star3_lbl.classList.add("fill");
                    this.star4_lbl.classList.remove("empty");
                    this.star4_lbl.classList.add("fill");
                    this.star5_lbl.classList.remove("empty");
                    this.star5_lbl.classList.add("fill");
                    this.mCurrentScore = 5;
                }
                //____________________________________________________________________
                no__EventHandler() {
                    this.hide();
                    if (this.mCallBackFunc) {
                        this.mCallBackFunc(0, "NO REVIEW");
                    }
                }
                /****************************
                 * Getters & Setters
                 ****************************/
                //____________________________________________________________________
                set yesBtnLabel(value) {
                    this.mYesBtnLabel = value;
                    if (this.yes_btn) {
                        this.yes_btn.innerHTML = value;
                    }
                }
                //____________________________________________________________________
                set noBtnLabel(value) {
                    this.mNoBtnLabel = value;
                    if (this.no_btn) {
                        this.no_btn.innerHTML = value;
                    }
                }
            }
            CoMessageWindowReview.SELECTED_ACTION_YES = "SelectedActionYes";
            CoMessageWindowReview.SELECTED_ACTION_NO = "SelectedActionNo";
            CoMessageWindowReview.DISABLE_KEYBOARD = "DISABLE_KEYBOARD";
            CoMessageWindowReview.ENABLE_KEYBOARD = "ENABLE_KEYBOARD";
            messagewindow.CoMessageWindowReview = CoMessageWindowReview;
        })(messagewindow = entry.messagewindow || (entry.messagewindow = {}));
    })(entry = com.entry || (com.entry = {}));
})(com || (com = {}));
///<reference path="../textinput/CoTextInput.ts"/>
///<reference path="../../asBase/constants/DaFieldsConst.ts"/>
var gencom;
///<reference path="../textinput/CoTextInput.ts"/>
///<reference path="../../asBase/constants/DaFieldsConst.ts"/>
(function (gencom) {
    var password;
    (function (password) {
        var CoComponentBase = asBase.CoComponentBase;
        var EventTypes = asBase.events.EventTypes;
        var DaFieldsConst = src.data.DaFieldsConst;
        var CoTextInput = gencom.textinputwithprompt.CoTextInput;
        class CoPassword extends CoComponentBase {
            constructor(iContainer) {
                super(null, "./skins/gencom/password/SkPassword.html", iContainer);
                this.txtInputsWithFloatingPromt = false;
            }
            //____________________________________________________________________
            creationComplete() {
                this.password_txti = this.getPart("password_txti");
                this.password_txti_com = new CoTextInput(this.password_txti);
                this.password_txti_com.isTopPrompt = true;
                this.password_txti_com.maxChars = DaFieldsConst.PASSWORD_MAX_CHAR;
                this.password_txti_com.isWithFloatingPromt = this.txtInputsWithFloatingPromt;
                this.retypePassword_txti = this.getPart("retypePassword_txti");
                this.retypePassword_txti_com = new CoTextInput(this.retypePassword_txti);
                this.retypePassword_txti_com.isTopPrompt = true;
                this.retypePassword_txti_com.maxChars = DaFieldsConst.PASSWORD_MAX_CHAR;
                this.retypePassword_txti_com.isWithFloatingPromt = this.txtInputsWithFloatingPromt;
                // add the listeners
                this.password_txti_com.addEventListener(EventTypes.INPUT, () => this.passwordChanged__EventHandler(), this);
                this.password_txti_com.addEventListener(EventTypes.FOCUSIN, () => this.passwordChanged__EventHandler(), this);
                this.retypePassword_txti_com.addEventListener(EventTypes.INPUT, () => this.retypePasswordChanged__EventHandler(), this);
            }
            //_______________________________________________________________________________
            passwordChanged__EventHandler() {
                if (this.password_txti_com.value.length == 0) {
                    //Levi changed translate
                    this.password_txti_com.placeholder = asBase.LanguageDictionary.getText("Password", "Password");
                }
                else if (this.password_txti_com.value.length < CoPassword.MIN_PASS_LENGTH) {
                    this.password_txti_com.placeholder = asBase.LanguageDictionary.getText("too-short-placeholder", "Too short");
                }
                else {
                    this.password_txti_com.placeholder = asBase.LanguageDictionary.getText("Password", "Password");
                }
                this.password_txti_com.clearError();
                this.retypePassword_txti_com.clearError();
                if (this.isPasswordsOkAndMatch()) {
                    this.updatePasswordsAsOkAndMatch();
                }
                else {
                    this.clearPasswordsAsOkAndMatch();
                }
            }
            //_______________________________________________________________________________
            retypePasswordChanged__EventHandler() {
                if (this.retypePassword_txti_com.value.length == 0) {
                    //Levi changed translate
                    this.retypePassword_txti_com.placeholder = asBase.LanguageDictionary.getText("retype-password", "Retype password");
                }
                else if (this.retypePassword_txti_com.value.length < CoPassword.MIN_PASS_LENGTH) {
                    let passwordsMatchButTooShort = asBase.LanguageDictionary.getText("passwords-match-but-too-short-placeholder", "Passwords match but to short");
                    let passwordsDontMatch = asBase.LanguageDictionary.getText("passwords-dont-match-placeholder", "Passwords don't match");
                    this.retypePassword_txti_com.placeholder = (this.password_txti_com.value == this.retypePassword_txti_com.value) ? passwordsMatchButTooShort : passwordsDontMatch;
                }
                else {
                    let passwordsMatch = asBase.LanguageDictionary.getText("passwords-match-placeholder", "Passwords match");
                    let passwordsDontMatch = asBase.LanguageDictionary.getText("passwords-dont-match-placeholder", "Passwords don't match");
                    this.retypePassword_txti_com.placeholder = (this.password_txti_com.value == this.retypePassword_txti_com.value) ? passwordsMatch : passwordsDontMatch;
                }
                this.password_txti_com.clearError();
                this.retypePassword_txti_com.clearError();
                if (this.isPasswordsOkAndMatch()) {
                    this.updatePasswordsAsOkAndMatch();
                }
                else {
                    this.clearPasswordsAsOkAndMatch();
                }
            }
            //____________________________________________________________________
            updatePasswordsAsOkAndMatch() {
                this.password_txti_com.setSuccess();
                this.retypePassword_txti_com.setSuccess();
            }
            //____________________________________________________________________
            clearPasswordsAsOkAndMatch() {
                this.password_txti_com.clearSuccess();
                this.retypePassword_txti_com.clearSuccess();
            }
            //____________________________________________________________________
            isPasswordEmpty() {
                let aIsFieldEmpty = false;
                this.password_txti_com.trim();
                if (this.password_txti_com.value == '') {
                    aIsFieldEmpty = true;
                }
                this.retypePassword_txti_com.trim();
                if (this.retypePassword_txti_com.value == '') {
                    aIsFieldEmpty = true;
                }
                if (this.password_txti_com.value != this.retypePassword_txti_com.value) {
                    aIsFieldEmpty = true;
                }
                return (aIsFieldEmpty);
            }
            //____________________________________________________________________
            isPasswordsOkAndMatch() {
                if (this.password_txti_com.value.length < CoPassword.MIN_PASS_LENGTH) {
                    return false;
                }
                if (this.retypePassword_txti_com.value.length < CoPassword.MIN_PASS_LENGTH) {
                    return false;
                }
                if (this.password_txti_com.value != this.retypePassword_txti_com.value) {
                    return false;
                }
                return true;
            }
            //____________________________________________________________________
            setAsErrors() {
                if (this.password_txti_com) {
                    this.password_txti_com.setError();
                }
                if (this.retypePassword_txti_com) {
                    this.retypePassword_txti_com.setError();
                }
            }
            //_______________________________________________________________________________
            clearErrors() {
                if (this.password_txti_com) {
                    this.password_txti_com.clearError();
                }
                if (this.retypePassword_txti_com) {
                    this.retypePassword_txti_com.clearError();
                }
            }
            //_______________________________________________________________________________
            clearFields() {
                if (this.password_txti_com) {
                    this.password_txti_com.clear();
                    //Levi changed translate
                    this.password_txti_com.placeholder = asBase.LanguageDictionary.getText("Password", "Password");
                }
                if (this.retypePassword_txti_com) {
                    this.retypePassword_txti_com.clear();
                    this.retypePassword_txti_com.placeholder = asBase.LanguageDictionary.getText("retype-password", "Retype password");
                }
            }
            /****************************
             * Getters and Setters
             ****************************/
            //_______________________________________________________________________________
            get password() {
                return this.password_txti_com.value;
            }
            //_______________________________________________________________________________
            set setFloatingPromt(iIsPromt) {
                this.txtInputsWithFloatingPromt = iIsPromt;
            }
        }
        //------------------------------
        // Constants
        //------------------------------
        CoPassword.MIN_PASS_LENGTH = 6;
        password.CoPassword = CoPassword;
    })(password = gencom.password || (gencom.password = {}));
})(gencom || (gencom = {}));
///<reference path="../password/CoPassword.ts"/>
var gencom;
///<reference path="../password/CoPassword.ts"/>
(function (gencom) {
    var newpassword;
    (function (newpassword) {
        var CoComponentBase = asBase.CoComponentBase;
        var CoPassword = gencom.password.CoPassword;
        var MouseEvents = asBase.events.MouseEvents;
        // import MoUsersService = srvgtw.model.MoUsersService;
        var EventTypes = asBase.events.EventTypes;
        var AsEvent = asBase.events.AsEvent;
        var CoButtonWithPreloader = gencom.buttonwithpreloader.CoButtonWithPreloader;
        class CoNewPassword extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, "./skins/gencom/newpassword/SkNewPasswordNew.html", iHtmlElement);
                this.mCurrentState = CoNewPassword.STATE_NEW_PASSWORD;
            }
            //____________________________________________________________________
            creationComplete() {
                this.newPassword_div = this.getPart("newPassword_div");
                this.newPassword_div_com = new CoPassword(this.newPassword_div);
                this.ok_btn = this.getPart("ok_btn");
                this.ok_btn_com = new CoButtonWithPreloader(this.ok_btn);
                this.ok_btn_com.addEventListener(MouseEvents.CLICK, () => this.okClicked__EventHandler(), this);
                this.cancel_btn = this.getPart("cancel_btn");
                this.cancel_btn.addEventListener(MouseEvents.CLICK, () => this.cancelClicked__EventHandler());
                this.backToLogin_lbl = this.getPart("backToLogin_lbl");
                this.error_lbl = this.getPart("error_lbl");
            }
            //____________________________________________________________________________________________
            reset() {
                if (this.newPassword_div_com) {
                    this.newPassword_div_com.clearFields();
                }
            }
            //____________________________________________________________________________________________
            okClicked__EventHandler() {
                //// TODO need to handle the case where there the request doesnt exist anymore in the DB
                /*
                 if (this.mCurrentState == CoNewPassword.STATE_NEW_PASSWORD_ERROR){
                 let e:AsEvent
                 this.dispatchEvent(EventTypes.CLOSE);
                 return;
                 }
                 */
                if (this.newPassword_div_com.isPasswordEmpty()) {
                    this.newPassword_div_com.setAsErrors();
                    return;
                }
                if (!this.newPassword_div_com.isPasswordsOkAndMatch()) {
                    this.newPassword_div_com.setAsErrors();
                    return;
                }
                ///TODO //// MoCursorManager.cursorManager.setWorking();
                this.ok_btn_com.setPreloader(true);
                let e = new AsEvent(EventTypes.COMPLETE, true, this);
                this.dispatchEvent(e.event);
            }
            //____________________________________________________________________________________________
            updateServer() {
                /*
                            // add the return listener
                            this.usersService.addEventListener(EventTypes.COMPLETE, ()=>this.updateServerCompelete__EventHandler(), this);
                
                            this.usersService.newPassword(this.newPassword_div_com.password);*!/
                */
            }
            //____________________________________________________________________________________________
            updateServerCompelete__EventHandler() {
                // remove the return listener
                /*this.usersService.removeEventListener(EventTypes.COMPLETE, this);
    
                this.ok_btn_com.setPreloader(false);
    
                ////TODO ///MoCursorManager.cursorManager.setWorking(false);
    
                ///TODO ///
                /!*
                 if (!this.usersService.isValid)
                 {
                 mCurrentState = STATE_NEW_PASSWORD_ERROR;
                 invalidateSkinState();
                 return;
                 }
    
                 if (mCurrentState == STATE_NEW_PASSWORD_ERROR)
                 {
                 dispatchEvent(new Event(Event.CLOSE));
                 return;
                 }
    
                 if (!usersService.isValid)
                 {
                 mCurrentState = STATE_NEW_PASSWORD_ERROR;
                 invalidateSkinState();
                 return;
                 }
                 *!/
    
                let e:AsEvent = new asBase.events.AsEvent(EventTypes.COMPLETE, false, this);
                this.dispatchEvent(e.event);*/
            }
            //____________________________________________________________________________________________
            cancelClicked__EventHandler() {
                let e = new asBase.events.AsEvent(EventTypes.CANCEL, true, this);
                this.dispatchEvent(e.event);
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________________________________
            get newPassword() {
                return this.newPassword_div_com.password;
            }
        }
        //------------------------------
        // Constants
        //------------------------------
        // states
        CoNewPassword.STATE_NEW_PASSWORD = "NewPassword";
        CoNewPassword.STATE_NEW_PASSWORD_ERROR = "NewPasswordError";
        newpassword.CoNewPassword = CoNewPassword;
    })(newpassword = gencom.newpassword || (gencom.newpassword = {}));
})(gencom || (gencom = {}));
///<reference path="CoPreloader.ts"/>
var gencom;
///<reference path="CoPreloader.ts"/>
(function (gencom) {
    var preloader;
    (function (preloader) {
        var Timer = asBase.baseclasses.Timer;
        class CoAutoPilotPreloader extends preloader.CoPreloader {
            constructor(iHtmlElement) {
                super(iHtmlElement);
            }
            //____________________________________________________________________
            creationComplete() {
                super.creationComplete();
                this.background_div = this.getPart("background_div");
                this.background_div.style.opacity = "1";
                this.mUpdaterTimer = new Timer(150);
                this.mUpdaterTimer.addEventListener(Timer.TIMER, () => this.timerAction__EventHandler(), this);
                this.mUpdaterTimer.start();
            }
            //___________________________________________________________________________________________________________
            timerAction__EventHandler() {
                this.setMessage(this.mUpdaterTimer.currentCount);
                if (this.mUpdaterTimer.currentCount == 100) {
                    this.mUpdaterTimer.stop();
                }
            }
            //___________________________________________________________________________________________________________
            setMessage(iCount) {
                //Levi changed translate
                this.mPreloaderMessage = asBase.LanguageDictionary.getText("preloader-loading", "Loading...") + iCount + "%";
                if (this.preloader_lbl) {
                    this.preloader_lbl.innerHTML = this.mPreloaderMessage;
                }
            }
            //------------------------------
            // Getters & Setters
            //------------------------------
            //------------------------------
            set preloaderMessage(value) {
                let aCount = Number(value);
                if (this.mUpdaterTimer) {
                    this.mUpdaterTimer.currentCount = Math.max(aCount, this.mUpdaterTimer.currentCount);
                }
                else {
                    this.setMessage(aCount);
                }
            }
        }
        preloader.CoAutoPilotPreloader = CoAutoPilotPreloader;
    })(preloader = gencom.preloader || (gencom.preloader = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var preloader;
    (function (preloader) {
        var CoComponentBase = asBase.CoComponentBase;
        var Globals = asBase.Globals;
        class CoMiniPreloader extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, "./skins/hybrid/appmain/SkHybridPreloader.html", iHtmlElement);
                this.mPreloaderMessage = "Loading...";
                this.mMyDiv = iHtmlElement;
            }
            //____________________________________________________________________
            creationComplete() {
                // this.hide();
                this.preloader_lbl = this.getPart("preloader_lbl");
                this.main_preloader_img = this.getPart("main_preloader_img");
                this.moving_space_lbl = this.getPart("moving_space_lbl");
                if (Globals.isMiniOccasionMode) {
                    this.main_preloader_img.style.backgroundImage = 'url(logo.png)';
                }
                else {
                    this.main_preloader_img.style.backgroundImage = 'url(https://www.web.allseated.com/allseatedhalls/miniassets/' + Number(asBase.Globals.urlGetParameter("vendorid")) + '/logo.png)';
                }
            }
            //_______________________________________________________________
            show() {
                if (this.mParentContainer.classList.contains("displayNone")) {
                    this.mParentContainer.classList.remove("displayNone");
                }
            }
            //_______________________________________________________________
            hide() {
                if (this.mParentContainer.classList.contains("displayNone")) {
                    return;
                }
                this.mParentContainer.classList.add("displayNone");
            }
            //------------------------------
            // Getters & Setters
            //------------------------------
            set preloaderMessage(value) {
                this.mPreloaderMessage = value;
                if (this.preloader_lbl) {
                    this.preloader_lbl.innerHTML = this.mPreloaderMessage;
                }
            }
        }
        preloader.CoMiniPreloader = CoMiniPreloader;
    })(preloader = gencom.preloader || (gencom.preloader = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var preloader;
    (function (preloader) {
        class EvMiniPreloader {
        }
        EvMiniPreloader.SHOW_MINI_PRELOADER = "ShowMiniPreloader_EV";
        EvMiniPreloader.SHOW_MINI_PRELOADER_FPCHANGE = "ShowMiniPreloaderFpchange_EV";
        EvMiniPreloader.SHOW_MINI_PRELOADER_BLACK = "ShowMiniPreloaderBlack_EV";
        EvMiniPreloader.HIDE_MINI_PRELOADER = "HideMiniPreloader_EV";
        preloader.EvMiniPreloader = EvMiniPreloader;
    })(preloader = gencom.preloader || (gencom.preloader = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var CoComponentBase = asBase.CoComponentBase;
    var MouseEvents = asBase.events.MouseEvents;
    var AsEvent = asBase.events.AsEvent;
    class CoTag extends CoComponentBase {
        constructor(iData, iElement) {
            super(iData, iElement);
            this.mContentWrapper = iElement;
            this.mContentWrapper.innerHTML = this.newTag(iData.name);
            this.mTagLabel = iData.name;
        }
        //____________________________________________________________________
        /* override */
        creationComplete() {
            this.removeTag_spn = this.getPart("removeTag_spn");
            this.setToActive();
        }
        //____________________________________________________________________
        /* override */
        setToActive() {
            this.mDelete__EventHandler_Func = () => this.delete__EventHandler();
            this.removeTag_spn.addEventListener(MouseEvents.CLICK, this.mDelete__EventHandler_Func);
        }
        //____________________________________________________________________
        /* override */
        setToSleep() {
            if (this.mDelete__EventHandler_Func) {
                this.removeTag_spn.removeEventListener(MouseEvents.CLICK, this.mDelete__EventHandler_Func);
                this.mDelete__EventHandler_Func = null;
            }
        }
        //____________________________________________________________________
        dispose() {
            this.setToSleep();
            super.dispose();
        }
        //____________________________________________________________________
        delete__EventHandler() {
            let e = new AsEvent(gencom.EvTag.DELETE_TAG, true, this);
            this.dispatchEvent(e.event);
        }
        //____________________________________________________________________
        newTag(iLabel) {
            return '<span class="multiSel" title="' + iLabel + '">' + iLabel + ' ' + '<span id="removeTag_spn" class="remove-tag">x</span></span>';
        }
        //____________________________________________________________________
        set className(iClassName) {
            this.mContentWrapper.classList.add(iClassName);
        }
        //____________________________________________________________________
        get tagElement() {
            return this.mContentWrapper;
        }
        //____________________________________________________________________
        get tagParent() {
            return this.mParentContainer;
        }
        //____________________________________________________________________
        get label() {
            return this.mTagLabel;
        }
        //____________________________________________________________________
        get tagData() {
            return this.mData;
        }
    }
    gencom.CoTag = CoTag;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    class EvTag {
    }
    EvTag.DELETE_TAG = "DeleteTag";
    gencom.EvTag = EvTag;
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var tbutton;
    (function (tbutton) {
        var CoComponentBase = asBase.CoComponentBase;
        var MouseEvents = asBase.events.MouseEvents;
        var AsEvent = asBase.events.AsEvent;
        class CoTButton extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                //------------------------------
                // Comps
                //------------------------------
                //------------------------------
                // Members
                //------------------------------
                this.mSelected = false;
            }
            //____________________________________________________________________
            creationComplete() {
                this.toggle_btn = this.getPart("toggle_btn");
                this.toggleLable_lbl = this.getPart("toggleLable_lbl");
                this.contentWrapper.addEventListener(MouseEvents.CLICK, (event) => this.click__EventHandler(event));
                //EventManager.dispatchEvent(EvHallMapMenu._2D, (e:CustomEvent)=>this.tlatHallMapMenuAction__EventHandler(e), this);
            }
            //____________________________________________________________________
            click__EventHandler(event) {
                event.stopImmediatePropagation();
                event.preventDefault();
                this.mSelected = !this.mSelected;
                if (this.mSelected) {
                    if (!this.mContentWrapper.classList.contains(CoTButton.SELECTED_CLASS)) {
                        this.mContentWrapper.classList.add(CoTButton.SELECTED_CLASS);
                    }
                }
                else {
                    this.mContentWrapper.classList.remove(CoTButton.SELECTED_CLASS);
                }
                let e = new AsEvent(MouseEvents.TOGGLE_CLICK, false, this);
                this.dispatchEvent(e.event);
            }
            //_______________________________________________________________
            setEnabled(iIsEnabled) {
                super.setEnabled(iIsEnabled);
                if (iIsEnabled) {
                    if (this.contentWrapper.classList.contains(CoTButton.DISABLED_CLASS)) {
                        this.contentWrapper.classList.remove(CoTButton.DISABLED_CLASS);
                    }
                }
                else {
                    if (this.contentWrapper.classList.contains(CoTButton.DISABLED_CLASS)) {
                        return;
                    }
                    this.contentWrapper.classList.add(CoTButton.DISABLED_CLASS);
                }
            }
            //_______________________________________________________________
            resetButton() {
                if (this.mSelected) {
                    this.mContentWrapper.classList.remove(CoTButton.SELECTED_CLASS);
                }
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________
            get selected() {
                return this.mSelected;
            }
            set selected(value) {
                if (value == true) {
                    if (!this.mContentWrapper.classList.contains(CoTButton.SELECTED_CLASS)) {
                        this.mContentWrapper.classList.add(CoTButton.SELECTED_CLASS);
                    }
                }
                this.mSelected = value;
            }
        }
        //------------------------------
        // Structure
        //------------------------------
        CoTButton.SELECTED_CLASS = "selected";
        CoTButton.DISABLED_CLASS = "disabled";
        tbutton.CoTButton = CoTButton;
    })(tbutton = gencom.tbutton || (gencom.tbutton = {}));
})(gencom || (gencom = {}));
/**
 * Created by moran on 10-Oct-16.
 */
var gencom;
/**
 * Created by moran on 10-Oct-16.
 */
(function (gencom) {
    var timeinput;
    (function (timeinput) {
        var CoComponentBase = asBase.CoComponentBase;
        var ArrayCollection = asBase.baseclasses.ArrayCollection;
        class CoTimeInput extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                this.mMaxHrsLines = 5;
                this.mMaxMinsLines = 5;
            }
            /****************************
             * Override Methods
             ****************************/
            //____________________________________________________________________
            creationComplete() {
                this.hours_cb = this.getPart("hrs_cb");
                this.hours_cb_com = new gencom.CoBasicComboBox(this.hours_cb);
                //Levi changed translate
                this.hours_cb_com.placeholder = asBase.LanguageDictionary.getText("hours-placeholder", "hr");
                this.hours_cb_com.maxLines = this.mMaxHrsLines;
                this.hours_cb_com.dataField = "mForDisplay";
                this.hours_cb_com.dataProvider = this.hoursDP;
                this.minutes_cb = this.getPart("min_cb");
                this.minutes_cb_com = new gencom.CoBasicComboBox(this.minutes_cb);
                this.minutes_cb_com.placeholder = asBase.LanguageDictionary.getText("minutes-placeholder", "min");
                this.minutes_cb_com.maxLines = this.mMaxMinsLines;
                this.minutes_cb_com.dataField = "mForDisplay";
                this.minutes_cb_com.dataProvider = this.minutesDP;
                this.dayPart_cb = this.getPart("ampm_cb");
                this.dayPart_cb_com = new gencom.CoBasicComboBox(this.dayPart_cb);
                this.dayPart_cb_com.placeholder = asBase.LanguageDictionary.getText("am-or-pm-placeholder", "am/pm");
                this.dayPart_cb_com.dataField = "mForDisplay";
                this.dayPart_cb_com.dataProvider = this.dayPartDP;
                if (this.mCurrentTime) {
                    this.parseCurrentTime();
                }
            }
            /*TODO  convert to creation complete
                  //_______________________________________________________________________________________________________
                    /!*override*!/
                    protected partAdded(partName:string, instance:Object):void
                    {
                        if (instance == hour_cb)
                        {
                            hour_cb.addEventListener(IndexChangeEvent.CHANGE, this.timeChanged__EventHandler);
                            hour_cb.dataProvider = this.hoursDP;
                        }
            
                        if (instance == this.minutes_cb)
                        {
                            this.minutes_cb.addEventListener(IndexChangeEvent.CHANGE, this.timeChanged__EventHandler);
                            this.minutes_cb.dataProvider = this.this.minutesDP;
                        }
            
                        if (instance == dayPart_cb)
                        {
                            dayPart_cb.addEventListener(IndexChangeEvent.CHANGE, this.timeChanged__EventHandler);
                            dayPart_cb.dataProvider = this.dayPartDP;
                        }
            
                    }*/
            /****************************
             * Methods
             ****************************/
            //_______________________________________________________________________________________________________
            /*override*/
            reset(iIsToResetLines) {
                if (this.hours_cb_com) {
                    this.hours_cb_com.selectedIndex = -1;
                    this.hours_cb_com.clearError();
                }
                if (this.minutes_cb_com) {
                    this.minutes_cb_com.selectedIndex = -1;
                    this.minutes_cb_com.clearError();
                }
                if (this.dayPart_cb_com) {
                    this.dayPart_cb_com.selectedIndex = -1;
                    this.dayPart_cb_com.clearError();
                }
                if (iIsToResetLines) {
                    this.mMaxHrsLines = 5;
                    this.mMaxMinsLines = 5;
                    this.hours_cb_com.maxLines = this.mMaxHrsLines;
                    this.minutes_cb_com.maxLines = this.mMaxMinsLines;
                }
            }
            //_______________________________________________________________________________________________________
            /*override*/
            isFieldsOk() {
                let aIsErrorInFields = false;
                if (this.hours_cb_com.selectedIndex < 0) {
                    this.hours_cb_com.setError();
                    aIsErrorInFields = true;
                }
                if (this.minutes_cb_com.selectedIndex < 0) {
                    this.minutes_cb_com.setError();
                    aIsErrorInFields = true;
                }
                if (this.dayPart_cb_com.selectedIndex < 0) {
                    this.dayPart_cb_com.setError();
                    aIsErrorInFields = true;
                }
                if (aIsErrorInFields)
                    return false;
                return true;
            }
            /*TODO see how to make it fit
                   //______________________________________________________________________________________
                    private timeChanged__EventHandler(event:IndexChangeEvent):void
                    {
                        let aCombo:CoBasicComboBox = event.currentTarget as CoBasicComboBox;
            
                        aCombo.clearError();
                    }*/
            //______________________________________________________________________________________
            parseCurrentTime() {
                /*if (!this.isInitialized)
                    return;
                */
                if (this.mCurrentTime == null) {
                    return;
                }
                let aDayPart = CoTimeInput.AM;
                let aTimeParts = this.mCurrentTime.split(" ");
                aDayPart = aTimeParts[1];
                aTimeParts = aTimeParts[0].split(":");
                let aHour = aTimeParts[0];
                let aMinutes = aTimeParts[1];
                if (this.hours_cb_com) {
                    this.hours_cb_com.selectedItem = this.getDPEntry(this.mHoursDP, aHour);
                }
                if (this.minutes_cb_com) {
                    this.minutes_cb_com.selectedItem = this.getDPEntry(this.mMinutesDP, aMinutes);
                }
                if (this.dayPart_cb_com) {
                    this.dayPart_cb_com.selectedItem = this.getDPEntry(this.mDayPartDP, aDayPart);
                }
            }
            //_______________________________________________________________________________________________________
            getDPEntry(iDP, iValue) {
                let aArray = iDP.toDataArray();
                for (let iTimeEntry of aArray) {
                    if (iTimeEntry.forDisplay == iValue)
                        return iTimeEntry;
                }
                return null;
            }
            /****************************
             * Getters and Setters
             ****************************/
            //______________________________________________________________________________________
            /*override*/
            get time() {
                //TODO
                let aIsAm = this.dayPart_cb_com.selectedItem.isAM;
                let aSelectedHour = this.hours_cb_com.selectedItem.getRealHour(aIsAm);
                let aTime = aSelectedHour + ":" + this.minutes_cb_com.selectedItem.forDisplay;
                return aTime;
            }
            //_______________________________________________________________________________________________________
            /*override*/
            set time(value) {
                this.mCurrentTime = value;
                this.parseCurrentTime();
            }
            //______________________________________________________________________________________
            /*override*/
            get timeAM_PM() {
                let aTime = this.hours_cb_com.selectedItem.forDisplay + ":" + this.minutes_cb_com.selectedItem.forDisplay + " " + this.dayPart_cb_com.selectedItem.forDisplay;
                return aTime;
            }
            //_______________________________________________________________________________________________________
            /*override*/
            getMinutes(nextDay) {
                if (!this.isFieldsOk()) {
                    return 0;
                }
                let aTimeConvertion = this.dayPart_cb_com.selectedItem.forDisplay == "AM" ? 0 : 12;
                let h = Number(this.hours_cb_com.selectedItem.forDisplay); //TODO Was int - see if needs math.round
                if (h == 12) {
                    h = 0;
                }
                let hourInMinutes = (h + aTimeConvertion) * 60;
                let min = Number(this.minutes_cb_com.selectedItem.forDisplay); //TODO Was int - see if needs math.round
                return hourInMinutes + min;
                //suffix = (hours >= 12)? 'pm' : 'am';
            }
            //_______________________________________________________________________________________________________
            get hoursDP() {
                if (!this.mHoursDP) {
                    let aHour;
                    this.mHoursDP = new ArrayCollection();
                    aHour = new timeinput.DaTimePart("01");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("02");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("03");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("04");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("05");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("06");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("07");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("08");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("09");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("10");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("11");
                    this.mHoursDP.addItem(aHour);
                    aHour = new timeinput.DaTimePart("12");
                    this.mHoursDP.addItem(aHour);
                }
                return this.mHoursDP;
            }
            //_______________________________________________________________________________________________________
            get minutesDP() {
                if (!this.mMinutesDP) {
                    this.mMinutesDP = new ArrayCollection();
                    let aMinute;
                    aMinute = new timeinput.DaTimePart("00");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("05");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("10");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("15");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("20");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("25");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("30");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("35");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("40");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("45");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("50");
                    this.mMinutesDP.addItem(aMinute);
                    aMinute = new timeinput.DaTimePart("55");
                    this.mMinutesDP.addItem(aMinute);
                }
                return this.mMinutesDP;
            }
            //_______________________________________________________________________________________________________
            get dayPartDP() {
                if (!this.mDayPartDP) {
                    this.mDayPartDP = new ArrayCollection();
                    let aData;
                    aData = new timeinput.DaTimePart(timeinput.DaTimePart.AM_STRING);
                    this.mDayPartDP.addItem(aData);
                    aData = new timeinput.DaTimePart(timeinput.DaTimePart.PM_STRING);
                    this.mDayPartDP.addItem(aData);
                }
                return this.mDayPartDP;
            }
            //_____________________________________________________________________________________________
            set hrsMaxLines(value) {
                if (this.hours_cb_com) {
                    this.hours_cb_com.maxLines = value;
                }
                this.mMaxHrsLines = value;
            }
            //_____________________________________________________________________________________________
            set minsMaxLines(value) {
                if (this.minutes_cb_com) {
                    this.minutes_cb_com.maxLines = value;
                }
                this.mMaxMinsLines = value;
            }
        }
        CoTimeInput.AM = "AM";
        CoTimeInput.PM = "PM";
        timeinput.CoTimeInput = CoTimeInput;
    })(timeinput = gencom.timeinput || (gencom.timeinput = {}));
})(gencom || (gencom = {}));
/**
 * Created by moran on 10-Oct-16.
 */
var gencom;
/**
 * Created by moran on 10-Oct-16.
 */
(function (gencom) {
    var timeinput;
    (function (timeinput) {
        class DaTimePart {
            constructor(iHourDisplay) {
                this.mForDisplay = iHourDisplay;
            }
            /****************************
             * Methods
             ****************************/
            //_______________________________________________________________________________________________________
            getRealHour(iIsAm) {
                if (iIsAm)
                    return this.mForDisplay;
                let aHour = Number(this.mForDisplay) + 12;
                return aHour.toString();
            }
            /****************************
             * Getters and Setters
             ****************************/
            //_______________________________________________________________________________________________________
            get forDisplay() {
                return this.mForDisplay;
            }
            //_______________________________________________________________________________________________________
            get isAM() {
                return (this.mForDisplay == DaTimePart.AM_STRING);
            }
        }
        DaTimePart.AM_STRING = "AM";
        DaTimePart.PM_STRING = "PM";
        timeinput.DaTimePart = DaTimePart;
    })(timeinput = gencom.timeinput || (gencom.timeinput = {}));
})(gencom || (gencom = {}));
///<reference path="../../asBase/Utils.ts"/>
var gencom;
///<reference path="../../asBase/Utils.ts"/>
(function (gencom) {
    var togglebutton;
    (function (togglebutton) {
        var CoComponentBase = asBase.CoComponentBase;
        var MouseEvents = asBase.events.MouseEvents;
        var Utils = asBase.Utils;
        var EventTypes = asBase.events.EventTypes;
        var AsEvent = asBase.events.AsEvent;
        class CoToggleButton extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                //------------------------------
                // Members
                //------------------------------
                this.mIsReadOnly = false;
                this.mIsSelected = false;
                this.mIsChanged = false;
                this.mLabel = "";
            }
            //____________________________________________________________________
            creationComplete() {
                this.toggle_lbl = this.getPart("toggle_lbl");
                this.toggle_btn = this.getPart("toggle_btn");
                this.toggle_span = this.getPart("toggle_span");
                this.toggleLabel_span = this.getPart("toggleLabel_span");
                this.toggleClicked__EventHandler_Func = () => this.toggleClicked__EventHandler();
                this.toggle_btn.addEventListener(MouseEvents.CLICK, this.toggleClicked__EventHandler_Func);
                if (this.mLabel != "") {
                    this.toggleLabel_span.innerHTML = this.mLabel;
                }
                this.updateReadOnly();
                this.updateSelected();
            }
            //____________________________________________________________________
            reset() {
                this.mIsChanged = false;
                this.mIsReadOnly = false;
                this.mIsVisible = true;
                this.mIsSelected = false;
                this.mLabel = "";
            }
            //____________________________________________________________________
            resetIsChanged() {
                this.mIsChanged = false;
            }
            //____________________________________________________________________
            toggleClicked__EventHandler() {
                let aSelected = !this.selected;
                this.selected = aSelected;
                let e = new AsEvent(EventTypes.CHANGE);
                this.dispatchEvent(e.event);
            }
            //____________________________________________________________________
            updateSelected() {
                Utils.setToggleButton(this.toggle_lbl, this.toggle_btn, this.toggle_span, this.mIsSelected);
                this.mIsChanged = true;
            }
            //____________________________________________________________________
            updateReadOnly() {
                if (this.mIsReadOnly) {
                    this.toggle_btn.setAttribute("disabled", "true");
                }
                else {
                    this.toggle_btn.removeAttribute("disabled");
                }
            }
            /****************************
             * Getters & Setters
             ****************************/
            //____________________________________________________________________
            set selected(value) {
                this.mIsSelected = value;
                if (!this.isInitialized) {
                    return;
                }
                this.updateSelected();
            }
            get selected() {
                return this.toggle_btn.dataset.selected == "true";
            }
            //____________________________________________________________________
            set readOnly(value) {
                this.mIsReadOnly = value;
                if (!this.toggle_btn) {
                    return;
                }
                this.updateReadOnly();
            }
            //____________________________________________________________________
            set label(value) {
                this.mLabel = value;
                if (this.toggleLabel_span) {
                    this.toggleLabel_span.innerHTML = this.mLabel;
                }
            }
            //____________________________________________________________________
            get isChanged() {
                return this.mIsChanged;
            }
        }
        togglebutton.CoToggleButton = CoToggleButton;
    })(togglebutton = gencom.togglebutton || (gencom.togglebutton = {}));
})(gencom || (gencom = {}));
var gencom;
(function (gencom) {
    var xydimensionsinput;
    (function (xydimensionsinput) {
        var CoComponentBase = asBase.CoComponentBase;
        var CoTextInput = gencom.textinputwithprompt.CoTextInput;
        var EventTypes = asBase.events.EventTypes;
        var AsEvent = asBase.events.AsEvent;
        class CoXYDimensionsInput extends CoComponentBase {
            constructor(iHtmlElement) {
                super(null, iHtmlElement, null);
                //------------------------------
                // Members
                //------------------------------
                this.mUnivWidth = 0;
                this.mUnivHeight = 0;
                this.mIsChanged = false;
            }
            //____________________________________________________________________
            creationComplete() {
                this.width_txti = this.getPart("width_txti");
                this.width_txti_com = new CoTextInput(this.width_txti);
                this.width_txti_com.isNumericOnly = true;
                this.width_txti_com.isTopPrompt = true;
                this.height_txti = this.getPart("height_txti");
                this.height_txti_com = new CoTextInput(this.height_txti);
                this.height_txti_com.isNumericOnly = true;
                this.height_txti_com.isTopPrompt = true;
                this.width_txti_com.addEventListener(EventTypes.INPUT, (e) => this.textChanged__EventHandler(e), this);
                this.height_txti_com.addEventListener(EventTypes.INPUT, (e) => this.textChanged__EventHandler(e), this);
                this.width_txti_com.value = this.mUnivWidth.toString();
                this.height_txti_com.value = this.mUnivHeight.toString();
            }
            //___________________________________________________________________________________________________________
            textChanged__EventHandler(e) {
                e.stopImmediatePropagation();
                this.mIsChanged = true;
                let event = new AsEvent(EventTypes.CHANGE, false, this);
                this.dispatchEvent(event.event);
            }
            //___________________________________________________________________________________________________________
            isFieldsOk() {
                let aIsErrorInField = false;
                this.width_txti_com.trim();
                if (this.width_txti_com.value == "") {
                    this.width_txti_com.setError();
                    aIsErrorInField = true;
                }
                this.height_txti_com.trim();
                if (this.height_txti_com.value == "") {
                    this.height_txti_com.setError();
                    aIsErrorInField = true;
                }
                if (aIsErrorInField) {
                    return false;
                }
                return true;
            }
            /****************************
             * Getters & Setters
             ****************************/
            //___________________________________________________________________________________________________________
            get univWidth() {
                return Number(this.width_txti_com.value);
            }
            set univWidth(value) {
                this.mUnivWidth = value;
                if (this.width_txti_com)
                    this.width_txti_com.value = value.toString();
            }
            //___________________________________________________________________________________________________________
            get univHeight() {
                return Number(this.height_txti_com.value);
            }
            set univHeight(value) {
                this.mUnivHeight = value;
                if (this.height_txti_com)
                    this.height_txti_com.value = value.toString();
            }
            //___________________________________________________________________________________________________________
            get isChanged() {
                return this.mIsChanged;
            }
        }
        xydimensionsinput.CoXYDimensionsInput = CoXYDimensionsInput;
    })(xydimensionsinput = gencom.xydimensionsinput || (gencom.xydimensionsinput = {}));
})(gencom || (gencom = {}));