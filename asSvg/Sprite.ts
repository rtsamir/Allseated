/// <reference path="displayobject.ts" />

module asSvg {
    export class Sprite extends DisplayObject {

        //------------------------------
        // Members
        //------------------------------
        
        private mChildren : Array<DisplayObject>;

        constructor() {
            super();
            this.mChildren = new Array<DisplayObject>();
           

        }


        /****************************
        * Override methods
        ****************************/
        protected createElement() {
            this.create("g");
        };
        //____________________________________________________

        public set parent(pVal: asSvg.Sprite) {
            this.mParent = pVal;
            if (pVal == null) {
                this.mStage = null;
            }
            this.mStage = this.stage;
            for (let i = 0; i < this.mChildren.length; i++) {
                this.mChildren[i].parent = this;
            }
        }
        public get parent(): asSvg.Sprite {
            return (this.mParent);
        }
        /****************************
        * Methods
        ****************************/

        addChild(pElement: DisplayObject) {
            this.mChildren.push(pElement);
             pElement.parent = this;
             if (pElement.visible) {
                 this.mElement.appendChild(pElement.element);
             }
        }
        //_________________________________________________________

        public removeChild(pElement: DisplayObject) {
            var aIndex: number = this.mChildren.indexOf(pElement);
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
        }
        //__________________________________________________

        public get children(): Array<DisplayObject> {
            return (this.mChildren);
        }
        //__________________________________________________

        public addChildAt(pDisplayObject: DisplayObject, pIndex: number) {
            if ((pIndex > this.mChildren.length) || (this.mChildren.length == 0)) {
                this.addChild(pDisplayObject);
                return;
            }
            if (pIndex <= 0 ) {
                this.element.insertBefore(pDisplayObject.element, this.mChildren[0].element);
                this.mChildren.unshift(pDisplayObject);
                return;
            }
            this.element.insertBefore(pDisplayObject.element, this.mChildren[pIndex].element);
            this.mChildren.splice(pIndex, 0, pDisplayObject);
            return (this.mChildren);
        }

        //__________________________________________________

        public getChildIndex(pElement: DisplayObject):number {
            return (this.mChildren.indexOf(pElement));
        }
        //__________________________________________________

        public removeChildren() {
            for (let i: number = 0; i < this.mChildren.length; i++) {
                let aElement: DisplayObject = this.mChildren[i];
                if (aElement.parent != this) {
                    return;
                }
                if (this.mElement.parentNode == this.mElement) {
                    return;
                }
                this.mElement.removeChild(aElement.element);
                aElement.parent = null;
            }
            this.mChildren = new Array<DisplayObject>();
         }
        /****************************
        * Getters and Setters
        ****************************/

        public static get myName(): string {
            return "Sprite";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Sprite";
        }
        //______________________________________________


    }
}