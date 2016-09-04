module asSvg {
    export class Graphics {

        //------------------------------
        // Members
        //------------------------------
        private mDraw:string 

        constructor() {
            this.mDraw = "";
        }


        /****************************
        * Override methods
        ****************************/



        /****************************
        * Methods
        ****************************/

        public moveTo(x, y) {
            this.mDraw += "M " + x + " " + y + " ";
        }
        //_________________________________________________________

        public lineTo(x, y) {
            this.mDraw += "l " + x + " " + y + " ";
        }
        //________________________________________________________

        public quadraticBezierCurve(x1, y1,x2,y2) {
            this.mDraw += "q " + x1 + " " + y1 + " " + x2 + " " + y2 + " ";
        }


        /****************************
        * Getters and Setters
        ****************************/
        public set owner(pElement: Element) {

        }

        public static get myName(): string {
            return "Graphics";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Graphics";
        }
        //______________________________________________


    }
}