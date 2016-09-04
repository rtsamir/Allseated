/// <reference path="displayobject.ts" />


module asSvg {
    export class Circle extends DisplayObject{

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;


        constructor(pX: number, pY: number, pR: number,pColor:number = 0) {
            super();
            this.update(pX, pY, pR);
            if (pColor != 0) {
                this.setFill(pColor);
            }
        }


        /****************************
        * Override methods
        ****************************/
        protected createElement() {
            this.create("circle");
        }


        /****************************
        * Methods
        ****************************/

        public update(pX?: number, pY?: number, pR?: number) {
            if (pX != null) {
                this.mElement.setAttribute("cx", pX.toString());
            }
            if (pY != null) {
                this.mElement.setAttribute("cy", pY.toString());
            }
            if (pR != null) {
                this.mElement.setAttribute("r", pR.toString());
            }
        }


        /****************************
        * Getters and Setters
        ****************************/


        public static get myName(): string {
            return "Circle";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Circle";
        }
        //______________________________________________


    }
}