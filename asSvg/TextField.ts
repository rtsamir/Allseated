module asSvg {
    export class TextField extends DisplayObject{

        //------------------------------
        // Members
        //------------------------------
        private mText: string = "";

        constructor() {
            super();
        }


        /****************************
        * Override methods
        ****************************/

        protected createElement() {
            this.create("text");
        };

        /****************************
        * Methods
        ****************************/



        /****************************
        * Getters and Setters
        ****************************/
        public set fontSize(pFont: number) {
            this.mElement.setAttribute("font-size", pFont.toString());
        }
        public get fontSize(): number {
            return ( Number(this.mElement.getAttribute("font-size")));
        }
        //________________________________________

        public set font(pFont: string) {
            this.mElement.setAttribute("font-family", pFont);
        }
        public get font(): string {
            return (this.mElement.getAttribute("font-family"));
        }
        //________________________________________________________________

        public set text(pVal: string) {
            this.mText = pVal;
           // this.mElement.nodeValue = this.mText;
            this.mElement.textContent = this.mText;
        }

        public get Text(): string {
            return this.mText;
        }
        //________________________________________________

        public static get myName(): string {
            return "TextField";
        }
        //______________________________________________
        public get myClassName(): string {
            return "TextField";
        }
        //______________________________________________


    }
}