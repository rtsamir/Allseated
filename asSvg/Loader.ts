module asSvg {
    export class Loader extends DisplayObject {

        //------------------------------
        // Members
        //------------------------------
        private mCallback: Function;
        private mPath: string;
        private mSVG: SVGElement;
        private mHttpRequest: XMLHttpRequest;

        constructor(pPath: string, pFunction?: Function) {
            super();
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
        * Override methods
        ****************************/
        protected createElement() {
            this.create("g");
        };


        /****************************
        * Methods
        ****************************/
        //_____________________________________________________________________________

        public setSVGDataFromData(pSVG: Node): void {
            this.mSVG = document.importNode(pSVG, true) as SVGElement;
            var a = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "defs");
            var b = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "g");
            for (var i: number = 0; i < a.length; i++) {
                this.mElement.appendChild(a[i]);
            }
            for (var i: number = 0; i < b.length; i++) {
                this.mElement.appendChild(b[i]);
            }
            if (this.mCallback != null) {
                this.mCallback(this);
            }
            //this.mElement.appendChild(this.mSVG);
        }
        //______________________________________________________________________________
        protected onReadyStatecChange() {
            if (this.mHttpRequest.readyState != 4) return;
            
            var aSvg = this.mHttpRequest.responseXML.documentElement;
            
            this.setSVGDataFromData(aSvg);
        }

        

        /****************************
        * Getters and Setters
        ****************************/


        public static get myName(): string {
            return "Loader";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Loader";
        }
        //______________________________________________
    }
}