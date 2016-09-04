/// <reference path="displayobject.ts" />

module asSvg {
    export class Shape extends DisplayObject{

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;
        private mDraw: string
        private mCurrentX: number = 0;
        private mCurrentY: number = 0;

        constructor() {
            super();
            this.mDraw = "";
        }


        /****************************
        * Override methods
        ****************************/
        protected createElement() {
            this.create("path");
        };


        /****************************
        * Methods
        ****************************/


        public clear() {
            this.mDraw = "";
            this.mElement.setAttribute("d", this.mDraw);
        }
        //_________________________________________________________


        public moveTo(x: number, y: number) {
            this.mDraw += "M " + x + " " + y + " ";
            this.mCurrentX = x;
            this.mCurrentY = y;
            this.mElement.setAttribute("d",this.mDraw);
        }
        //_________________________________________________________

        public lineTo(x: number, y: number) {
            this.mDraw += "l " + (x - this.mCurrentX) + " " + (y - this.mCurrentY) + " ";
            this.mCurrentX = x;
            this.mCurrentY = y;
            this.mElement.setAttribute("d", this.mDraw);
        }
        //________________________________________________________

        public quadraticBezierCurve(x1, y1, x2, y2) {
           
            this.mDraw += "q " + (x1 - this.mCurrentX) + " " + (y1 - this.mCurrentY) + " " + (x2 - this.mCurrentX) + " " + (y2 - this.mCurrentY) + " ";
            this.mCurrentX = x2;
            this.mCurrentY = y2;
            this.mElement.setAttribute("d", this.mDraw);
        }
        //________________________________________________________

        public bezierCurveTo(x1, y1, x2, y2, x3, y3) {

            this.mDraw += "c " + (x1 - this.mCurrentX) + " " + (y1 - this.mCurrentY) + " " + (x2 - this.mCurrentX) + " " + (y2 - this.mCurrentY) + " " + (x3 - this.mCurrentX) + " " + (y3 - this.mCurrentY) + " ";
            this.mCurrentX = x3;
            this.mCurrentY = y3;
            this.mElement.setAttribute("d", this.mDraw);
        }
        /****************************
        * Getters and Setters
        ****************************/


        public static get myName(): string {
            return "Shape";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Shape";
        }
        //______________________________________________


    }
}