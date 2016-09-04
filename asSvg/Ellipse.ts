/// <reference path="displayobject.ts" />

module asSvg {
    export class Ellipse  extends DisplayObject{

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;


        constructor(pX: number, pY: number, pRx: number, pRy: number) {
            super();
            this.update(pX, pY, pRx, pRy);
        }


        /****************************
        * Override methods
        ****************************/
        protected createElement() {
            this.create("ellipse");
        };


        /****************************
        * Methods
        ****************************/

        public update(pX?: number, pY?: number, pRx?: number, pRy?: number) {
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
        }


        /****************************
        * Getters and Setters
        ****************************/


        public static get myName(): string {
            return "Ellipse";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Ellipse";
        }
        //______________________________________________


    }
}