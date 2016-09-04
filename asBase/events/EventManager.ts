module asBase.events
{
    export class EventManager
    {
        private static mEvents: Array<Array<EventBase>>;

        constructor()
        {
        }
        //-----------------------------------------------------

        public static dispatchCustomEvent(pEvent: EventBase): void {
            if (EventManager.mEvents == null) {
                return;
            }
            if (EventManager.mEvents[pEvent.key] == null) {
                return;
            }
            const aEventsList: Array<EventBase> = EventManager.mEvents[pEvent.key];
            for (let i = 0; i < aEventsList.length; i++) {
                pEvent.attachedData = aEventsList[i].attachedData;
                pEvent.owner = aEventsList[i].owner;
                aEventsList[i].callBack(pEvent);
            }
        }
        //-----------------------------------------------------

        public static dispatchEvent(pKey: string, pOwner: any, pData?: any): void
        {
            if (EventManager.mEvents == null)
            {
                return;
            }
            if (EventManager.mEvents[pKey] == null)
            {
                return;
            }
            const aEventsList: Array<EventBase> = EventManager.mEvents[pKey];
            for (let i = 0; i < aEventsList.length; i++)
            {
                aEventsList[i].data = pData;
                aEventsList[i].sender = pOwner;
                aEventsList[i].callBack(aEventsList[i]);
            }
        }
        //-----------------------------------------------------

        public static addEventListener(pKey: string, pCallback: Function, pOwner: any, pAtachedData ?: any, pFunction?: Function): void
        {
            if (EventManager.mEvents == null)
            {
                EventManager.mEvents = new Array<Array<EventBase>>();
            }
            if (EventManager.mEvents[pKey] == null)
            {
                EventManager.mEvents[pKey] = Array<EventBase>();
            }
            if (EventManager.hasEventListener(pKey, pOwner)) {
                return;
            }
            const aEvent = new EventBase(pKey, pCallback, pOwner, pAtachedData, pFunction);
            EventManager.mEvents[pKey].push(aEvent);
        }
        //-----------------------------------------------------

        public static hasEventListener(pKey: string, pOwner: any): boolean {
            var aArray: Array<EventBase> = EventManager.mEvents[pKey];
            for (let i: number = 0; i < aArray.length; i++) {
                if (aArray[i].owner == pOwner) {
                    return true;
                }
            }
            return false
        }
        //-----------------------------------------------------

        public static removeEventListener(pKey: string, pOwner: any): void
        {
            if (EventManager.mEvents == null)
            {
                return;
            }
            if (EventManager.mEvents[pKey] == null)
            {
                return;
            }
            const aEventsList: Array<EventBase> = EventManager.mEvents[pKey];
            for (let i = aEventsList.length - 1; i >= 0; i--)
            {
                if (aEventsList[i].owner == pOwner)
                {
                    aEventsList.splice(i, 1);
                }
            }
        }
        //-----------------------------------------------------

        public static removeAllOwnerEvents( pOwner: any): void {
            if (EventManager.mEvents == null) {
                return;
            }
            for (let aKey in EventManager.mEvents) {
                let aEventsList: Array<EventBase> = EventManager.mEvents[aKey];
                for (let i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList.splice(i, 1);
                    }
                }
            }
        }
    }
}