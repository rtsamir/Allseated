/// <reference path="displayobject.ts" />

module asSvg {
    export class Rect extends DisplayObject{

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;


        constructor(pX: number, pY: number, pWidth: number, pHeight: number, pRx?: number, pRy?: number) {
            super();
            this.update(pX, pY, pWidth, pHeight, pRx, pRy);
        }


        /****************************
        * Override methods
        ****************************/
        protected createElement() {
            this.create("rect");
        };


        /****************************
        * Methods
        ****************************/

        public update(pX?: number, pY?: number, pWidth?: number, pHeight?: number, pRx?: number, pRy?: number) {
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
        }


        /****************************
        * Getters and Setters
        ****************************/


        public static get myName(): string {
            return "Rect";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Rect";
        }
        //______________________________________________


    }
}