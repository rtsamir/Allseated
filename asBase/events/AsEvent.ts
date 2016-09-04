module asBase.events {

    export class AsEvent  {
        private mKey: string;
        private mSender: any;
        private mEvent: CustomEvent;

        constructor(pKey: string, pBubbles: boolean = false, pSender?: any, pCancelable: boolean = false) {

            this.mEvent = document.createEvent("CustomEvent");
            this.mEvent.initCustomEvent(pKey, pBubbles, pCancelable,this);
            this.mSender = pSender;
           // this.mEvent.bubbles = (pBubbles != null) ? pBubbles : false
        }
        //_____________________________________________________________

        public get event(): CustomEvent {
            return (this.mEvent);
        }
        //_____________________________________________________________

        public get sender(): any {
            return (this.mSender);
        }
    }
}