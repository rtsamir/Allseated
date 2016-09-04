module asSvg {
    export class DisplayObject {

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;
        protected mParent: asSvg.Sprite;
        protected mX: number = 0;
        protected mY: number = 0;
        protected mRotation: number = 0;
        protected mScaleX: number = 1;
        protected mScaleY: number = 1;
        protected mVisible: boolean = true;
        protected mCallbacks: {};
        protected mAlpha: number;
        protected mMatrix: asBase.math.Matrix;
        protected mEnterFrameCallback: Function;
        protected mMouseMoveCallback: EventListener;
        protected mStage: Stage;
        protected mDragingVector: asBase.math.Point;
        private mEvents: Array<Array<EventListenerHolder>>;
        protected mLastGlobalMousePoint: asBase.math.Point;
        protected mLastLocalMousePoint: asBase.math.Point;

        constructor() {
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
        protected createElement() { };
        //_______________________________________________________________________

        protected create(pType: string) {
            this.mElement = document.createElementNS("http://www.w3.org/2000/svg", pType);
            (this.mElement as any).displayObject = this;
        };
        //_______________________________________________________

        public setLineStyle(pWidth?: number, pColor?: number, pOpacity?: number, pLinecap?: string, pLinejoin?: string) {

            if (pWidth != null) {
                this.mElement.setAttribute("stroke-width", pWidth.toString());
            }
            if (pColor != null) {
                let aColor = "#" + pColor.toString(16);
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

        }
        //________________________________________________________
        public setFill(pColor?: number, pOpacity?: number) {
            if (pColor != null) {
                let aColor = "#" + pColor.toString(16);
                this.mElement.setAttribute("fill", aColor);
            }
            if (pOpacity != null) {
                this.mElement.setAttribute("fill-opacity", pOpacity.toString());
            }
            if (pColor == null) {
                this.mElement.setAttribute("fill", "none");
            }
        }
        //_____________________________________________________________

        public getLocalBounds(): ClientRect {
            return (this.mElement.getBoundingClientRect());
        }
        //_____________________________________________________________

        public getBounds(): ClientRect {
            return (this.mElement.getBoundingClientRect());
        }
        //________________________________________________________________

        public hitTest(pElement: DisplayObject): boolean {
            let mRect1: ClientRect = this.mElement.getBoundingClientRect();
            let mRect2: ClientRect = pElement.getBounds();
            return !(mRect2.left > mRect1.right ||
                mRect2.right < mRect1.left ||
                mRect2.top > mRect1.bottom ||
                mRect2.bottom < mRect1.top);
        }
        //_________________________________________________________________

        public get matrix(): asBase.math.Matrix {
            if (this.mMatrix == null) {
                this.mMatrix = new asBase.math.Matrix();
                var a = this.mRotation * Math.PI / 180;
                this.mMatrix.setTransform(this.mScaleX * Math.cos(a), this.mScaleY * Math.sin(a), -this.mScaleX * Math.sin(a), this.mScaleY * Math.cos(a), this.mX, this.mY);
                //this.mMatrix.setTransform(this.mScaleX, 0,0, this.mScaleY, this.mX, this.mY);
            }
            return (this.mMatrix);
        }
        //________________________________________________________________________
        public localToGlobalMatrix(): asBase.math.Matrix {

            let aMatrixArray: Array<asBase.math.Matrix> = this.matrixsStuck;

            if (aMatrixArray.length == 0) {
                return new asBase.math.Matrix();
            }
            var aMat: asBase.math.Matrix = new asBase.math.Matrix();
            for (var i: number = 0; i < aMatrixArray.length; i++) {
                aMat.multiply(aMatrixArray[i]);
            }
            return aMat;
        }
        //________________________________________________________________________
        public localToGlobal(pPoint: asBase.math.Point): asBase.math.Point {
            let aMat = this.localToGlobalMatrix();
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        }
        //_________________________________________________________________________

        public globalToLocalMatrix(): asBase.math.Matrix {

            let aMatrixArray: Array<asBase.math.Matrix> = this.matrixsStuck;

            if (aMatrixArray.length == 0) {
                return new asBase.math.Matrix();
            }
            var aMat: asBase.math.Matrix = new asBase.math.Matrix();
            for (var i: number = aMatrixArray.length - 1; i >= 0; i--) {
                aMat = aMat.multiply(aMatrixArray[i]);
            }
            aMat = aMat.inverse();
            return aMat;
        }
    
        //________________________________________________________________________
        public globalToLocal(pPoint: asBase.math.Point): asBase.math.Point {

            let aMat: asBase.math.Matrix  = this.globalToLocalMatrix();
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        }
        //__________________________________________________________________________________

        private get matrixsStuck(): Array<asBase.math.Matrix> {
            let aMatrixArray: Array<asBase.math.Matrix> = new Array<asBase.math.Matrix>();
            if (this.stage == null) {
                return aMatrixArray;
            }
            if (this.myClassName == Stage.myName) {
                return aMatrixArray;
            }
            let aCurrent: Sprite = this.parent
            while (aCurrent.myClassName != Stage.myName) {
                aMatrixArray.push(aCurrent.matrix);
                aCurrent = aCurrent.parent;
            }
            aMatrixArray.push(aCurrent.matrix);
            return aMatrixArray;

        }


        //________________________________________________________________________
        public hitTestPoint(pX: number, pY: number, pIsShape: boolean): boolean {
            let mRect: ClientRect = this.mElement.getBoundingClientRect();
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

        }
        /****************************
        * Getters and Setters
        ****************************/
        public set rotation(pVal: number) {
            this.mRotation = pVal;
            this.updateTransform();
        }
        public get rotation(): number {
            return (this.mRotation);
        }
        //___________________________________________________
        public set x(pVal: number) {
            this.mX = pVal;
            this.updateTransform();
        }
        public get x(): number {
            return (this.mX);
        }
        //___________________________________________________

        public set y(pVal: number) {
            this.mY = pVal;
            this.updateTransform();

        }
        public get y(): number {
            return (this.mY);
        }
        //___________________________________________________

        public set scaleY(pVal: number) {
            this.mScaleY = pVal;
            this.updateTransform();

        }
        public get scaleY(): number {
            return (this.mScaleY);
        }
        //___________________________________________________

        public setScale(pVal: number) {
            this.mScaleY = pVal;
            this.mScaleX = pVal;
            this.updateTransform();

        }
        //___________________________________________________

        public set scaleX(pVal: number) {
            this.mScaleX = pVal;
            this.updateTransform();

        }
        public get scaleX(): number {
            return (this.mScaleX);
        }
        //___________________________________________________

        public updateTransform() {            
            this.mMatrix = null;
            var aMat = this.matrix;
            var aTransform = "matrix(" + aMat.a + "," + aMat.b + "," + aMat.c + "," + aMat.d + "," + aMat.e + "," + aMat.f + ")";
            this.mElement.setAttribute("transform", aTransform);
        }
        //___________________________________________________
        
        public updateTransformOld() {
            var aTransform = "";
            if ((this.mX != 0) || (this.mY != 0)) {
                aTransform += "translate(" + this.mX + "," + this.mY + ") "// rotate(20)";
            }
            if (this.mRotation != 0) {
                aTransform += "rotate(" + this.mRotation + ") "// rotate(20)";
            }
            if ((this.mScaleX != 1) || (this.mScaleY != 1)) {
                aTransform += "scale(" + this.mScaleX + "," + this.mScaleY + ")"// rotate(20)";
            }
            this.mElement.setAttribute("transform", aTransform);
        }
        //____________________________________________________________
        public show(pVal: boolean) {
            this.mVisible = pVal;
            if (this.mParent == null) {
                return;
            }
            if (!this.mVisible) {
                if (this.mParent.element == this.mElement.parentNode) {
                    this.mParent.element.removeChild(this.mElement);
                }
            } else {
                this.mParent.element.appendChild(this.mElement);
            }
        }
        //_____________________________________________________________

        public set visible(pVal: boolean) {
            this.show(pVal);
        }

        public get visible(): boolean {
            return (this.mVisible);
        }
        //_____________________________________________________________

        public set alpha(pVal: number) {
            this.setLineStyle(null, null, pVal);
            this.setFill(null, pVal);
            this.mAlpha = pVal;
        }
        public get alpha(): number {
            return (this.mAlpha);
        }
        //_____________________________________________________________

        public get height(): number {
            return (this.mElement.getBoundingClientRect().height);

        }
        //_____________________________________________________________

        public get width(): number {
            return (this.mElement.getBoundingClientRect().width);

        }
        //_____________________________________________________________

        public set parent(pVal: asSvg.Sprite) {
            this.mParent = pVal;
            if (pVal == null) {
                this.mStage = null;
            }
            this.mStage = this.stage;

        }
        public get parent(): asSvg.Sprite {
            return (this.mParent);
        }
        //_____________________________________________________________
        

        public get element(): Element {
            return this.mElement;
        }

        public static get myName(): string {
            return "DisplayObject";
        }
        //______________________________________________
        public get myClassName(): string {
            return "DisplayObject";
        }
        //______________________________________________

        public addEventListenerOld(pKey: string, pEventListener: EventListener, pUseCapture?: boolean) {
            if (this.mCallbacks[pKey] != null) {
                this.mCallbacks[pKey].push(pEventListener);

            }
            else {
                this.mCallbacks[pKey] = [pEventListener];
            }
            this.mElement.addEventListener(pKey, pEventListener, pUseCapture);

        }
        //______________________________________________

       public removeEventListenerOld(pKey: string, pEventListener?: EventListener) {
            if (this.mCallbacks[pKey] != null) {
                for (let i = 0; i < this.mCallbacks[pKey].length; i++) {
                    if (pEventListener != null) {
                        if (this.mCallbacks[pKey] == pEventListener) {
                            this.mElement.removeEventListener(pKey, pEventListener);
                        }
                    } else {
                        this.mElement.removeEventListener(pKey, this.mCallbacks[pKey]);
                    }
                }
            }
        }
        //_________________________________________________

        public removeAllEvents() {
            for (let aKey in this.mCallbacks) {
                if (this.mCallbacks[aKey] != null) {
                    this.removeEventListener(aKey,this);
                }
            }
        }
        //_________________________________________________

        public destract() {
            this.removeAllEvents();
        }
        //_________________________________________________

        public get stage(): Stage {
            if (this.mStage != null) {
                return this.mStage;
            }
            if (this.parent == null) {
                return null;
            }
            if (this.parent.myClassName == Stage.myName) {
                return this.parent as Stage;
            }
            this.mStage = this.parent.stage;
            return (this.mStage);

        }
        //_________________________________________________________
        public get onEnterFrame(): Function {
            return this.mEnterFrameCallback
        }
        //_________________________________________________________
        public set onEnterFrame(pEnterFrameCallback: Function) {
           
            this.mEnterFrameCallback = pEnterFrameCallback;
            if (pEnterFrameCallback == null) {
                this.disableEnterFrame();
                return;
            }
            this.enableEnterFrame();
        }
        //_________________________________________________________

        public enableEnterFrame(): boolean {
            let aStage: Stage = this.stage;
            if (aStage == null) {
                return false;
            }
            aStage.addToEnterFrameList(this);
            return true;
        }
        //_________________________________________________________

        public disableEnterFrame(): boolean {
            let aStage: Stage = this.stage;
            if (aStage == null) {
                return false;
            }
            aStage.addToEnterFrameList(this);
            return true;
        }

        //________________________________________________________
  
        public enterFrame() {
            if (this.mEnterFrameCallback != null) {
                this.mEnterFrameCallback();
            }
        }
        //____________________________________________________________

        public get mouseX(): number {
            return this.parentMouseLocation.x - this.x;
        }
        //____________________________________________________________

        public get mouseY(): number {
            return this.parentMouseLocation.y - this.y;
        }
        //____________________________________________________________
 
        public set instanceName(pVal:string) {
            this.element.id = pVal;
        }
        public get instanceName(): string {
            return this.element.id;
        }
        //____________________________________________________________

        public get parentMouseLocation(): asBase.math.Point {
            if ((this.mLastGlobalMousePoint.x == this.stage.mouseLocation.x) && (this.mLastGlobalMousePoint.y == this.stage.mouseLocation.y)) {
                return this.mLastLocalMousePoint;
            }
            this.mLastGlobalMousePoint.x = this.stage.mouseLocation.x;
            this.mLastGlobalMousePoint.y = this.stage.mouseLocation.y;
            this.mLastLocalMousePoint = this.globalToLocal(this.stage.mouseLocation);
            return (this.mLastLocalMousePoint);
        }
        //____________________________________________________________
        public startDrag(pLockCenter: boolean = true) {
            if (pLockCenter) {
                this.mDragingVector = new asBase.math.Point();
            } else {
                this.mDragingVector = new asBase.math.Point(this.mouseX, this.mouseY);
            }
            
            if (this.mMouseMoveCallback == null) {
                this.mMouseMoveCallback = (e: MouseEvent) => this.onMouseMove(e);
            }
            if (this.mStage != null) {
                this.mStage.addEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this.mMouseMoveCallback,this);
            }
        }
        //____________________________________________________________

        public get isInDrag(): boolean {
            return (this.mDragingVector != null);
        }
        //____________________________________________________________
        public stopDrag() {
            if (this.mMouseMoveCallback == null) {
                return;
            }
            this.mDragingVector = null;
            this.mStage.removeEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this);
        }
        //____________________________________________________________
        protected onMouseMove(e: MouseEvent) {
            //let aLocalPoint: asBase.math.Point = this.globalToLocal(this.mStage.mouseLocation);
            let aLocalPoint: asBase.math.Point = this.globalToLocal(new asBase.math.Point(e.clientX - this.mStage.offsetX, e.clientY - this.mStage.offsetY));
            this.x = aLocalPoint.x + this.mDragingVector.x;
            this.y = aLocalPoint.y + this.mDragingVector.y;
        }
        //_______________________________________________________________

        public addEventListener(pType: string, pEventListener: EventListener, pOwner: any, useCapture?: boolean): boolean {
            if (this.mEvents == null) {
                this.mEvents = new Array<Array<EventListenerHolder>>();
            }
            if (this.mEvents[pType] == null) {
                this.mEvents[pType] = Array<EventListenerHolder>();
            }

            const aEventsList: Array<EventListenerHolder> = this.mEvents[pType];
            for (let i = 0; i < aEventsList.length; i++) {
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
        }
        //_______________________________________________________________

        public removeEventListener(pType: string, pOwner: any, useCapture?: boolean): boolean {

            if (this.mEvents == null) {
                return;
            }
            if (this.mEvents[pType] == null) {
                return;
            }
            let aEventListener: EventListener;
            const aEventsList: Array<EventListenerHolder> = this.mEvents[pType];
            for (let i = aEventsList.length - 1; i >= 0; i--) {
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
        }

        //_______________________________________________________________

        public removeAllOwnerEvents(pOwner: any, useCapture?: boolean): boolean {

            if (this.mEvents == null) {
                return;
            }
            for (let aType in this.mEvents) {
                let aEventListener: EventListener;
                const aEventsList: Array<EventListenerHolder> = this.mEvents[aType];
                for (let i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventListener = aEventsList[i].callback;
                        aEventsList.splice(i, 1);
                        if (this.mElement == null) {
                            return false;
                        }
                        if (useCapture != null) {
                            this.mElement.removeEventListener(aType, aEventListener, useCapture);

                        } else {
                            this.mElement.removeEventListener(aType, aEventListener);
                        }
                    }
                }
            }
        }
        //_______________________________________________________________

        public dispatchEvent(pEvent: Event): boolean {
            if (this.mElement == null) {
                return false;
            }
            this.mElement.dispatchEvent(pEvent);
            return true;
        }

        //_______________________________________________________________


    }

    class EventListenerHolder {
        public callback: EventListener;
        public owner: any;
        constructor(pCallback: EventListener, pOwner: any) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
    }
}