/// <reference path="sprite.ts" />


module asSvg {
    export class Stage extends Sprite {

        private mParentDiv: HTMLElement;
        private mEnterFrameList: Array<DisplayObject>;
        private mEnterFrameCallbacks: Array<CallbackHolder>;
        private mMouseLocation: asBase.math.Point;

        constructor(pStage?: HTMLElement) {
            super();
            this.mElement = pStage;
            if (pStage == null) {
                this.create("svg");
            }
           
        }
        //_________________________________________________________

        public activeMouseLocation(): void {
            if (this.mMouseLocation != null) {
                return;
            }
            this.mMouseLocation = new asBase.math.Point();
            document.addEventListener(asBase.events.MouseEvents.MOUSE_MOVE, (e: MouseEvent) => this.onMouseMove(e));
        }
        //_________________________________________________________

        //override
        protected onMouseMove(e: MouseEvent): void {

            this.mMouseLocation.x = e.clientX - this.offsetX;
            this.mMouseLocation.y = e.clientY - this.offsetY;
            ///console.log("addNewObjectToHall >>> " + this.mMouseLocation.x + " , " + this.mMouseLocation.y);
        }
        //_________________________________________________________

        public get offsetX(): number {
            return (this.element as HTMLElement).getBoundingClientRect().left;
        }

        //_________________________________________________________
        public get offsetY(): number {
            return (this.element as HTMLElement).getBoundingClientRect().top;
        }

        //_________________________________________________________

        public static setStage(pStage: HTMLElement): Stage {
            var aStage: Stage = new Stage(pStage);
            return aStage;
        }
        //_________________________________________________________

        public static cretaeStage(pParent: HTMLElement, pWidth: number, pHeight: number): Stage {
            var aStage: Stage = new Stage();
            if (pParent != null) {
                aStage.setParent(pParent);
            }
            aStage.setSize(pWidth, pHeight);
            return aStage;
        }
        //_____________________________________________________
        public setSize(pWidth: number, pHeight: number) {
            this.mElement.setAttribute("width", pWidth.toString());
            this.mElement.setAttribute("height", pHeight.toString());
        }
        //_____________________________________________________

        protected setParent(pParent?: HTMLElement) {
            if (pParent == null) {
                return
            }
            this.mParentDiv = pParent;
            if (this.mElement == null) {
                return
            }
            if (this.mElement.parentNode != this.mParentDiv) {
                this.mParentDiv.appendChild(this.mElement);
            }
        }
        //_____________________________________________________

        protected setSvgElement(pElement?: HTMLElement) {
            if (this.mElement == null) {
                return
            }
            this.mElement = pElement;
            if (this.mParent == null) {
                return
            }
            if (this.mElement.parentNode != this.mParentDiv) {
                this.mParentDiv.appendChild(this.mElement);
            }
        }
        //________________________________________________________
        // Overide
        public static get myName(): string {
            return "Stage";
        }
        //______________________________________________
        // Overide
        public get myClassName(): string {
            return "Stage";
        }
        //______________________________________________
        // Overide
        protected createElement() { }
        //________________________________________________________
        private tick() {
            window.requestAnimationFrame(() => this.tick());
            this.enterFrame();
            if (this.mEnterFrameList == null) {
                return;
            }
            for (let i = 0; i < this.mEnterFrameList.length; i++) {
                this.mEnterFrameList[i].enterFrame();
            }
            for (let i = 0; i < this.mEnterFrameCallbacks.length; i++) {
                this.mEnterFrameCallbacks[i].callback();
            }
        }
        //_________________________________________________________
        // Overide
        public enableEnterFrame(): boolean {
            if (this.mEnterFrameList == null) {
                this.mEnterFrameList = new Array<DisplayObject>();
                window.requestAnimationFrame(() => this.tick());
            }
            return true;
        }
        //_________________________________________________________
        // Overide 
        public disableEnterFrame(): boolean {
            throw "cant stop EnterFrame on Stage";
        }

        //_________________________________________________________

        public addToEnterFrameList(pDisplayObject: DisplayObject) {
            if (this.mEnterFrameList == null) {
                this.enableEnterFrame();
            }
            if (this.mEnterFrameList.indexOf(pDisplayObject) != -1) {
                return;
            }
            this.mEnterFrameList.push(pDisplayObject);
        }
        //_________________________________________________________

        public removeFromEnterFrameList(pDisplayObject: DisplayObject) {
            if (this.mEnterFrameList == null) {
                this.mEnterFrameList = new Array<DisplayObject>();
            }
            if (this.mEnterFrameList.indexOf(pDisplayObject) != -1) {
                return;
            }
            this.mEnterFrameList.push(pDisplayObject);
        }
        //_______________________________________________________________

        public addEnterFrameCallback(pCallback: Function, pOwner: any) {
            if (this.mEnterFrameCallbacks == null) {
                this.mEnterFrameCallbacks = new Array<CallbackHolder>();
            }
            for (let i = this.mEnterFrameCallbacks.length - 1; i >= 0; i--) {
                if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                    return;
                }
            }
            this.mEnterFrameCallbacks.push(new CallbackHolder(pCallback, pOwner));
        } 
        //_______________________________________________________________
        // override
        public get mouseLocation(): asBase.math.Point {
            if (this.mMouseLocation == null) {
                throw ("Use activeMouseLocation() for get the stage mouse location  ");
            }
            return this.mMouseLocation;
        }
        //_______________________________________________________________

        public get mouseX(): number {
            if (this.mMouseLocation == null) {
                throw ("Use activeMouseLocation() for get the stage mouse location  ");
            }
            return this.mMouseLocation.x;
        }
        //_______________________________________________________________

        public get mouseY(): number {
            if (this.mMouseLocation == null) {
                throw ("Use activeMouseLocation() for get the stage mouse location  ");
            }
            return this.mMouseLocation.y;
        }
        //_______________________________________________________________
        public removeEnterFrameCallback(pOwner: any) {
            if (this.mEnterFrameCallbacks == null) {
                return;
            }
            for (let i = this.mEnterFrameCallbacks.length - 1; i >= 0; i--) {
                if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                    if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                        this.mEnterFrameCallbacks.splice(i, 1);
                    }
                }
            }
           
        } 
    }
    //__________________________________________________________________

    class CallbackHolder {
        public callback: Function;
        public owner: any;
        constructor(pCallback: Function, pOwner: any) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
    }
}


