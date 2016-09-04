module asBase.events {
    export class EventTypes {       
        /*Data*/
        public static ASBASE_DATA_READY: string = "ASBASE_DATA_READY";

        // General events
        public static ADDED_TO_STAGE: string = "AddedToStage_EV";
        public static REMOVED_FROM_STAGE: string = "RemovedFromStage__EV";
        
        public static COMPLETE: string = "Complete_EV";
        public static CANCEL: string = "Cancel_EV";
        public static SELECT: string = "Select_EV";
        public static CLOSE: string = "Close_EV";
        public static WORKING: string = "Working_EV";

        public static NEXT: string = "Next_EV";
        public static PREV: string = "Prev_EV";

        public static SHOW_POPUP_WINDOW: string = "ShowPopUpWindow_EV";
        public static HIDE_POPUP_WINDOW: string = "HidePopUpWindow_EV";

        // CHANGE EVENTS
        public static CHANGE: string = "change";

        // INPUT TEXT FIELDS EVENTS
        public static INPUT: string = "input";
        public static FOCUS: string = "focus";
        public static FOCUSIN: string = "focusin";
        public static FOCUSOUT: string = "focusout";
        public static BLUR: string = "blur";
        public static OVER: string = "over";

        // KEYBOARD EVENTS
        public static KEY_DOWN:string = "keydown";
        public static KEY_UP:string = "keyup";
        
        //LOAD EVENTS
        public static LOAD: string = "load";
    }
}