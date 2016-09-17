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
            console.log("pPath = " + pPath);
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
            if (pSVG != null) {
                this.mSVG = document.importNode(pSVG, true) as SVGElement;
                let aDefs = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "defs");
                let aGElement = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "g");
                let aElementsArray: Array<SVGAElement> = new Array<SVGAElement>();;
                let i: number;
                let aBefore: SVGElement = aDefs[0];
                this.mElement.appendChild(aBefore);
                for (i = aDefs.length -1; i >= 0; i--) {
                    this.mElement.insertBefore(aDefs[i], aBefore);
                    aBefore = aDefs[i];
                }
                
                aBefore = aGElement[0];
                this.mElement.appendChild(aBefore);
                for (i = aGElement.length - 1; i >= 0; i--) {
                    this.mElement.insertBefore(aGElement[i], aBefore);
                    aBefore = aGElement[i];
                }
            }
            if (this.mCallback != null) {
                this.mCallback(this);
            }
        }
        //______________________________________________________________________________
        protected onReadyStatecChange() {
            if (this.mHttpRequest.readyState != 4) return;
            var aSvg = this.getXMLFromRespose();
            if (aSvg == null) {
                console.log("Error Loading SVG");
                this.setSVGDataFromData(null);
                return;
            }
            this.setSVGDataFromData(aSvg);
        }
         //______________________________________________________________________________
        protected getXMLFromRespose() {
            if (this.mHttpRequest.responseXML != null) {
                return this.mHttpRequest.responseXML.documentElement;
            }
            if (this.mHttpRequest.responseText != null) {
                var div = document.createElement('div');
                div.innerHTML = this.mHttpRequest.responseText;
                var elements = div.childNodes;
                return elements[1];
            }
            return null;
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