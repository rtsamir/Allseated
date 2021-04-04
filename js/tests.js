///<reference path="../../node_modules/types/asBase.d.ts"/>
///<reference path="../../node_modules/types/AstsModuleData.d.ts"/>
/////    tests.AvatarBot.askForLocationFromServer = true;
var tests;
(function (tests) {
    // tests.AvatarBot.TINKING_TIME = 60000
    // tests.AvatarBot.DELTA_TINK_TIME = 3000
    // tests.AvatarBot.MIN_TINK_TIME = 3000
    //asBase.entity.EntityManager.instance.mNumOfCollabUsers = 25
    class AvatarBot {
        //_____________________________________________________________________
        constructor(pName, pDiv) {
            this.mIsActive = true;
            this.mLastUpdateServetTime = 0;
            this.mLastTimeSetDirection = 0;
            this.mRotationY = 0;
            this.mRotationX = 0;
            this.mIsAlive = true;
            this.mTimeOfDeath = 0;
            this.mIsMoving = false;
            this.mDiv = pDiv;
            this.mIsAlive = true;
            this.mRegularData = new modules.data.avatar.DaAvatarRegularData();
            this.mRegularData.costume.setRandom();
            this.mTinkTime = AvatarBot.MIN_TINK_TIME * Math.random();
            asBase.events.EventManager.addEventListener(asBase.events.EventTypes.LEAVE_OCCASION_EVENT, () => this.leaveOcassion(), this);
            this.mKeepAliveInterval = setInterval(() => this.keepAlive(), 20 * 1000);
            this.mCallMicroServiceInterval = setInterval(() => this.callMicroService(), tests.microservices.AvatarsGridService.GET_UPDATE_FROM_SERVER);
            AvatarBot.mCounter++;
            this.mID = pName + "_" + AvatarBot.mCounter;
            this.updateData(true);
            this.mRequest = new XMLHttpRequest();
            tests.MoFireBaseManager.fireBaseManager.generateBot(this.mID);
        }
        //_____________________________________________________________________
        think() {
            let aDTime = performance.now() - this.mLastUpdateServetTime;
            if (aDTime < AvatarBot.TINKING_TIME) {
                return this.mIsMoving;
            }
            ////////// Remove Avatar
            ////////if (Math.random() < 0.0001) {
            ////////    this.mIsAlive = false;
            ////////    this.leaveOcassion();
            ////////    this.mTimeOfDeath = performance.now();
            ////////    return;
            ////////}
            ////////// Return the Avatar
            ////////if (!this.mIsAlive) {
            ////////    if (performance.now() - this.mTimeOfDeath < 3000) {
            ////////        return;
            ////////    }
            ////////    if (Math.random() < 0.01) {
            ////////        this.mIsAlive = true;
            ////////        MoFireBaseManager.fireBaseManager().generateBot(this.mID);
            ////////    }
            ////////    return;
            ////////}
            this.sendRandomFirebaseStuff();
            if (Math.random() < AvatarBot.UPDATE_REGULAR_DATA_FREQUENCY) {
                this.updateData(true);
            }
            if (aDTime < AvatarBot.UPDATE_HIGH_DATA_FREQUENCY_MOVING) {
                return this.mIsMoving;
            }
            let aLoc = this.getPosition();
            if (performance.now() - this.mLastTimeSetDirection > this.mTinkTime) {
                this.mTinkTime = AvatarBot.MIN_TINK_TIME + Math.random() * AvatarBot.DELTA_TINK_TIME;
                let aRand = Math.random();
                if ((aRand > 0.4) || (this.mDestination == null)) {
                    let aPoint = tests.TestGridNavigator.instance.getNextPoint(aLoc.x, aLoc.z);
                    if (aPoint == null) {
                        console.log("No Way To Go >> " + this.id);
                    }
                    else {
                        this.mDestination = new asBase.math.Point(aPoint.x, aPoint.z);
                        let aDX = this.mDestination.x - aLoc.x;
                        let aDY = this.mDestination.y - aLoc.z;
                        this.mRotationY = Math.atan2(aDX, aDY) + Math.PI;
                        this.mRotationX = 0;
                    }
                    this.mLastTimeSetDirection = performance.now();
                }
            }
            if (this.mDestination == null) {
                this.mIsMoving = false;
                this.updateUI();
                return this.mIsMoving;
            }
            let aDX = this.mDestination.x - aLoc.x;
            let aDY = this.mDestination.y - aLoc.z;
            if ((Math.abs(aDX) < 5) && (Math.abs(aDY) < 5)) {
                if (aDTime < AvatarBot.UPDATE_HIGH_DATA_FREQUENCY_STANDING) {
                    this.mIsMoving = false;
                    this.updateUI();
                    return this.mIsMoving;
                }
                if (this.mRotationX == 0) {
                    this.mRotationX = Math.random() * 0.6 - 0.3;
                }
            }
            aDX /= 5;
            aDY /= 5;
            let aLength = aDX * aDX + aDY * aDY;
            if (aLength > 9) {
                aLength = Math.sqrt(aLength);
                aDX = (aDX / aLength) * 3;
                aDY = (aDY / aLength) * 3;
            }
            if (aLength < 1) {
                this.mIsMoving = false;
                this.updateTransform(this.mDestination.x, this.mDestination.y);
            }
            else {
                this.mIsMoving = true;
                this.updateTransform(aLoc.x + aDX, aLoc.z + aDY);
            }
            return this.mIsMoving;
        }
        //_____________________________________________________________________
        sendRandomFirebaseStuff() {
            this.sendChatMessage();
            if (Math.random() < 0.0001) {
                let aEvent = new tests.EvFireBaseManager(tests.EvFireBaseManager.MANAGER_UPDATE, tests.EvFireBaseManager.IS_MANAGER);
                tests.MoFireBaseManager.fireBaseManager.updateOccasionParticipants(aEvent);
            }
        }
        //_____________________________________________________________________
        sendChatMessage() {
            if (Math.random() < 0.004) {
                let aMsg = `Message from bot: ${this.mID}`;
                if (Math.random() < 0.6) {
                    tests.MoFireBaseManager.fireBaseManager.chatsGw.sendGeneralMessageById(aMsg, this.mID);
                }
                else {
                    let aUserIds = Object.keys(tests.MoFireBaseManager.fireBaseManager.externalUsersDic);
                    if (aUserIds.length > 0) {
                        let aIndex = Math.round(Math.random() * (aUserIds.length - 1));
                        let aKey = aUserIds[aIndex];
                        tests.MoFireBaseManager.fireBaseManager.chatsGw.sendPrivateMessageById(aMsg, this.mID, aKey);
                    }
                }
            }
        }
        //_____________________________________________________________________
        leaveOcassion() {
            this.mRegularData.id = this.mID;
            tests.MoFireBaseManager.fireBaseManager.deleteEntity(this.mRegularData);
            tests.MoFireBaseManager.fireBaseManager.deleteKeepAliveEntity(this.mRegularData.id, [this.mRegularData.zoneId + ",,," + this.mRegularData.id]);
            this.mIsActive = false;
            tests.MoFireBaseManager.fireBaseManager.removeBot(this.mID);
            clearInterval(this.mCallMicroServiceInterval);
            clearInterval(this.mKeepAliveInterval);
            this.mDiv.parentElement.removeChild(this.mDiv);
        }
        //_____________________________________________________________________
        deleteData() {
            this.mRegularData.id = this.mID;
            tests.MoFireBaseManager.fireBaseManager.deleteEntity(this.mRegularData);
            this.mIsActive = false;
        }
        //_____________________________________________________________________
        keepAlive() {
            if (!this.mIsActive) {
                return;
            }
            let aUser = this.mID;
            if (this.mRegularData.zoneId == null) {
                return;
            }
            tests.MoFireBaseManager.fireBaseManager.keepAliveEntity(aUser, [this.mRegularData.zoneId + ",,," + this.mRegularData.id], true);
        }
        //_____________________________________________________________________
        updateData(pWithImages) {
            //if (asBase.entity.EntityManager.instance.uniqueId == null) {
            //     return;
            // }
            this.mIsActive = true;
            if (Math.random() < 0.05) {
                this.mRegularData.meetingID = "eeee_" + Math.random();
            }
            else {
                this.mRegularData.meetingID = "";
                if ((this.mRegularData.firstName == null)) { // || (Math.random() > 0.05)) {
                    let aNames = ["Marylou", "Cara", "Paulina", "Madaline", "Jill", "Meg", "Oliver", "Elaina", "Tomi", "Virgina", "Linsey", "Huong", "Mignon", "Nila", "Vincent", "Hilario", "Ying", "Darell", "Sherly", "Moon", "Trang", "Colene", "Shaneka", "Geraldine", "Ranae", "Carita", "Loree", "Stephaine", "Vanesa", "Ericka", "Yasuko", "Geraldo", "Wally", "Mark", "Pa", "Nam", "Shaun", "Claud", "Kent", "Shona", "Ramonita", "Yasmin", "Leopoldo", "Aleen", "Ilda", "Kaci", "Leia", "Queenie", "Lanita", "Cliff"];
                    let aName = aNames[Math.floor(Math.random() * aNames.length)];
                    this.mRegularData.lastName = "";
                    let aImageNumber = Math.floor(Math.random() * 6);
                    this.mRegularData.firstName = aName; //this.mID;// + ":" + aImageNumber;// this.mID;//aName;
                    //this.mRegularData.firstName = this.mID + ":" + aImageNumber;// this.mID;//aName;
                    // if ((pWithImages) || (this.mRegularData.profilePicUrl == null)) {
                    let aImageIndex = (Math.floor(Math.random() * 17) + 1).toString();
                    if (aImageIndex.length == 1) {
                        aImageIndex = "0" + aImageIndex;
                    }
                    if (aImageNumber < 70) {
                        //let aImageURL = "https://allseated-res.cloudinary.com/image/upload/c_pad,h_128,w_256/v1597663179/faces/letters/" + aImageNumber + ".png";
                        let aImageURL = "https://allseated-res.cloudinary.com/image/upload/b_rgb:484845,c_pad,h_128,w_256/v1597663179/faces/F_0" + aImageIndex + ".jpg";
                        this.mRegularData.profilePicUrl = aImageURL;
                        this.mRegularData.logoUrl = "https://allseated-res.cloudinary.com/image/upload/v1613979992/3Dassets/avatars/logos/SAP_C_grad_sign.jpg";
                    }
                    else {
                        this.mRegularData.profilePicUrl = null;
                        this.mRegularData.logoUrl = null;
                    }
                    //}
                    //if (this.mRegularData != null) {
                    //    console.log("*******************************************************************");
                    //    console.log("send >>> " + this.mRegularData.id + " name = " + (this.mRegularData).firstName + " -- " + (this.mRegularData.profilePicUrl));
                    //}
                }
                this.mRegularData.id = this.mID;
                this.mRegularData.zoneId = asBase.entity.EntityManager.currentZoneId;
                this.mRegularData.state = modules.data.avatar.AvatarState.FIRST_PERSON;
            }
            tests.MoFireBaseManager.fireBaseManager.changeEntity(this.mRegularData, false, false);
        }
        //_____________________________________________________________________
        getPosition() {
            return (this.mAvatarHighFrequencyData.position);
        }
        //_____________________________________________________________________
        updateUI() {
            let aPx = this.mAvatarHighFrequencyData.position.x;
            let aPz = this.mAvatarHighFrequencyData.position.z;
            let aCx = Math.floor(aPx / asBase.entity.grid.GridManager.instance.univCellSize) + asBase.entity.grid.GridManager.GRID_HALF_SIZE;
            let aCy = Math.floor(aPz / asBase.entity.grid.GridManager.instance.univCellSize) + asBase.entity.grid.GridManager.GRID_HALF_SIZE;
            let aString = this.mID;
            aString += "<br>";
            aString += " Cell( " + aCx + " , " + aCy + " )";
            aString += "<br>";
            aString += "Position = " + aPx + " , " + aPz;
            aString += "<br>";
            if (this.mDestination != null) {
                aString += "Destination = " + this.mDestination.x + " , " + this.mDestination.y;
            }
            this.mDiv.innerHTML = aString;
            if (this.mIsMoving) {
                this.mDiv.style.borderColor = "#FF0000";
            }
            else {
                this.mDiv.style.borderColor = "#000000";
            }
        }
        //_____________________________________________________________________
        updateTransform(pX, pZ) {
            this.mLastUpdateServetTime = performance.now();
            this.mAvatarHighFrequencyData = new modules.data.avatar.DaAvatarHighFrequencyData();
            let aBaseCameraY = 120;
            this.mAvatarHighFrequencyData.setPosition(Math.round(pX), tests.Avatars.avatarHeight, Math.round(pZ));
            this.mAvatarHighFrequencyData.setRotation(this.mRotationX, this.mRotationY, 0);
            this.mAvatarHighFrequencyData.id = this.mID;
            this.mAvatarHighFrequencyData.zoneId = null;
            tests.MoFireBaseManager.fireBaseManager.changeEntity(this.mAvatarHighFrequencyData, true, false);
            this.updateUI();
        }
        //____________________________________________________________________
        callMicroService() {
            if (!AvatarBot.askForLocationFromServer) {
                return;
            }
            if (this.mAvatarHighFrequencyData == null) {
                return;
            }
            let aOCID = tests.MoFireBaseManager.fireBaseManager.occasionId;
            let aZoneID = this.mAvatarHighFrequencyData.zoneId;
            let aData = this.mAvatarHighFrequencyData.getSerializeData();
            //// https://msrv.allseated.com/as-avatars?ocID=1295678&zoneID=3&x=1057&y=1006&num=350
            let aURL = "https://msrv.allseated.com/as-avatars?ocID=" + aOCID + "&zoneID=" + aZoneID + "&x=" + aData.cx + "&y=" + aData.cy + "&num=300";
            this.mRequest = new XMLHttpRequest();
            this.mRequest.open("GET", aURL);
            this.mRequest.send();
        }
        // _____________________________________________________________________
        exitFromEntity(iEntity) {
            if (iEntity == null) {
                return;
            }
            asBase.events.EventManager.dispatchEvent(asBase.entity.EvEntity.EXIT_SINGLE_CHANNEL_AREA, this, this.mCurrentEntityForMeeting.id);
            this.mCurrentEntityForMeeting.userExit();
            this.mCurrentEntityForMeeting = null;
        }
        // _____________________________________________________________________
        get id() {
            return this.mID;
        }
    }
    ///tests.AvatarBot.UPDATE_REGULAR_DATA_FREQUENCY = 0.5;
    AvatarBot.UPDATE_REGULAR_DATA_FREQUENCY = 0.005;
    AvatarBot.UPDATE_HIGH_DATA_FREQUENCY_MOVING = 900;
    AvatarBot.UPDATE_HIGH_DATA_FREQUENCY_STANDING = 14000;
    AvatarBot.TINKING_TIME = 500;
    AvatarBot.DELTA_TINK_TIME = 10000;
    AvatarBot.MIN_TINK_TIME = 10000;
    /// tests.AvatarBot.askForLocationFromServer = true;
    AvatarBot.askForLocationFromServer = true;
    AvatarBot.mCounter = 0;
    tests.AvatarBot = AvatarBot;
})(tests || (tests = {}));
// tests.Avatars.addAvatars(300,"ronen");
// tests.Avatars.deleteAvatars(300);
//http://allseated/AllseatedModules/Testing/www/?occasion=1111413&floor=1&avatar_height=16&baseUnivFactor=1&avatars=100
var tests;
(function (tests) {
    class Avatars {
        //_________________________________________________
        static async init() {
            window.onbeforeunload = function () {
                if (Avatars.mAvatars != null) {
                    Avatars.deleteAvatars(Avatars.mAvatars.length);
                }
            };
            let aData = asBase.Utils.parseURLParams();
            if (aData == null) {
                aData = asBase.Utils.parseURLParams("http://allseated/AllseatedModules/Testing/www/?occasion=1295678&floor=3&avatar_height=5&baseUnivFactor=0.0666&cloudVer=11&avatars=2");
            }
            Avatars.mOccasionId = aData.occasion[0];
            Avatars.mFloorId = aData.floor[0];
            Avatars.avatarHeight = parseInt(aData.avatar_height[0]);
            Avatars.mNumOfAvatars = parseInt(aData.avatars[0]);
            Avatars.mCloudVer = aData.cloudVer[0];
            asBase.Globals.sBaseUnivFactor = aData.baseUnivFactor[0];
            new tests.CellMapLoader(Avatars.mOccasionId, Avatars.mFloorId, Avatars.mCloudVer);
            tests.microservices.AvatarsGridService.instance.init("as-server", this.mOccasionId, this.mFloorId);
            tests.MoFireBaseManager.fireBaseManager.setOccasionId(this.mOccasionId, this.mFloorId);
            Avatars.mAvatars = new Array();
            await asBase.Utils.sleep(500);
            let aName = Math.round(Math.random() * 1000).toString();
            let aPerson = prompt("Please enter your first name:", "");
            if (aPerson == null || aPerson == "") {
                alert("You must enter name.");
                window.location.href = window.location.href;
                return;
            }
            else {
                this.mUserName = aPerson + "_" + aName;
            }
            tests.MoFireBaseManager.fireBaseManager.setGlobalsListener();
            Avatars.mHeader = document.getElementById("header_h1");
            Avatars.mHeader.innerHTML = "Num of Avatars: " + 0;
            let aAddButton = document.getElementById("addAvatars_butt");
            let aRemoveButton = document.getElementById("removeAvatars_butt");
            aAddButton.onclick = () => Avatars.addAvatars(10, this.mUserName);
            aRemoveButton.onclick = () => Avatars.deleteAvatars(10);
            await asBase.Utils.sleep(1000);
            if (this.mGlobalLimit == -1) {
                Avatars.addAvatars(this.mNumOfAvatars, this.mUserName);
            }
            Avatars.update();
        }
        //_________________________________________________
        static async setAvatarsNum(pKey, pData) {
            if (pKey != Avatars.mOccasionId) {
                return;
            }
            if (pData.bots == null) {
                return;
            }
            if (pData.bots.num != null) {
                this.mGlobalLimit = pData.bots.num;
                await asBase.Utils.sleep(1000);
                if (Avatars.mAvatars.length == this.mGlobalLimit) {
                    return;
                }
                if (Avatars.mAvatars.length < this.mGlobalLimit) {
                    Avatars.addAvatars(this.mGlobalLimit - Avatars.mAvatars.length, this.mUserName);
                }
                else {
                    Avatars.deleteAvatars(Avatars.mAvatars.length - this.mGlobalLimit);
                }
            }
        }
        //_________________________________________________
        static async addAvatars(pNumber, pName) {
            let aStart = Avatars.mAvatars.length;
            for (let i = aStart; i < (aStart + pNumber); i++) {
                await asBase.Utils.sleep(50);
                let aDiv = document.createElement("div");
                document.body.appendChild(aDiv);
                let aAvatar = new tests.AvatarBot(pName, aDiv);
                Avatars.mAvatars.push(aAvatar);
                let aLoc = tests.TestGridNavigator.instance.getRandomLocation();
                aAvatar.updateTransform(aLoc.x, aLoc.z);
                Avatars.mAvatars[i].updateData(true);
                console.log("Adding : " + Avatars.mAvatars.length);
                Avatars.mHeader.innerHTML = "Num of Avatars: " + Avatars.mAvatars.length;
            }
            console.log("Total : " + Avatars.mAvatars.length);
        }
        //___________________________________________________________
        static deleteAvatars(pNumber) {
            if (pNumber > Avatars.mAvatars.length) {
                pNumber = Avatars.mAvatars.length;
            }
            for (let i = 0; i < pNumber; i++) {
                let aAvatars = Avatars.mAvatars.pop();
                aAvatars.leaveOcassion();
            }
            Avatars.mHeader.innerHTML = "Num of Avatars: " + Avatars.mAvatars.length;
            return ("Total after delete : " + Avatars.mAvatars.length);
        }
        //______________________________________________________________
        static rePos() {
            let aLength = Avatars.mAvatars.length;
            for (let i = 0; i < aLength; i++) {
                let aLoc = tests.TestGridNavigator.instance.getRandomLocation();
                Avatars.mAvatars[i].updateTransform(aLoc.x, aLoc.z);
            }
        }
        //_____________________________________________________________________
        static update() {
            Avatars.mNumOfMoving = 0;
            for (let i = 0; i < Avatars.mAvatars.length; i++) {
                if (Avatars.mAvatars[i].think()) {
                    Avatars.mNumOfMoving++;
                }
            }
            if (Avatars.mHeader != null) {
                Avatars.mHeader.innerHTML = "Num of Avatars: " + Avatars.mAvatars.length + " Moving: " + Avatars.mNumOfMoving;
            }
            setTimeout(Avatars.update, 50);
        }
        //_____________________________________________________________________
        static update_old() {
            let aTime = performance.now();
            for (let i = 0; i < Avatars.mAvatars.length; i++) {
                asBase.Utils.sleep(5);
                if (Math.random() < 0.4) {
                    let aLoc = Avatars.mAvatars[i].getPosition();
                    let aPoint = tests.TestGridNavigator.instance.getNextPoint(aLoc.x, aLoc.z);
                    if (aPoint == null) {
                        console.log("No Way To Go >> " + Avatars.mAvatars[i].id);
                    }
                    else {
                        Avatars.mAvatars[i].updateTransform(aPoint.x, aPoint.z);
                    }
                }
            }
            let aDTime = (performance.now() - aTime);
            aDTime = 250 - aDTime;
            if (aDTime < 0) {
                aDTime = 10;
            }
            setTimeout(Avatars.update, aDTime);
        }
    }
    Avatars.mOccasionId = "1295678";
    Avatars.mFloorId = "1";
    Avatars.avatarHeight = 16;
    Avatars.mNumOfAvatars = 20;
    Avatars.mGlobalLimit = -1;
    Avatars.mNumOfMoving = 0;
    tests.Avatars = Avatars;
})(tests || (tests = {}));
var tests;
(function (tests) {
    var GridNavigator = asBase.entity.grid.GridNavigator;
    var DaExvoFiles = modules.data.DaExvoFiles;
    class CellMapLoader {
        constructor(pOccasionID, pFloorplanID, pCloudVer) {
            let aPath = "https://allseated-res.cloudinary.com/raw/upload/v" + pCloudVer + "//exVo/Occasions";
            aPath += "/" + pOccasionID + "/" + pFloorplanID + "/" + DaExvoFiles.CELL_MAP_FILENAME;
            new asBase.JsonLoader(aPath, (response) => this.onLoad(response), null);
        }
        //_____________________________________________________________________
        onLoad(pResponse) {
            if (pResponse == "error") {
                console.log("Error loading cell map for floorplan ");
            }
            let aData = JSON.parse(pResponse);
            GridNavigator.instance.freeCellsList = aData.freeCells;
            GridNavigator.instance.emptyCellsList = aData.emptyCells;
        }
    }
    tests.CellMapLoader = CellMapLoader;
})(tests || (tests = {}));
var tests;
(function (tests) {
    class DaConnectSession {
        constructor() {
            this.inMeeting = false;
            this.sessionId = "";
            this.isPrivate = false;
            this.isPending = false;
            this.role = DaConnectSession.HOST;
            this.cameraOn = false;
            this.cameraWork = false;
            this.micOn = false;
            this.micWork = false;
            this.speakersOn = false;
            this.managerType = "NoMng";
            this.timestamp = 0;
            this.shareOn = false;
        }
        // public isAgoraProxy:boolean = false;
        reset() {
            this.inMeeting = false;
            this.sessionId = "";
        }
    }
    DaConnectSession.AUDIENCE = "audience";
    DaConnectSession.HOST = "host";
    tests.DaConnectSession = DaConnectSession;
})(tests || (tests = {}));
var tests;
(function (tests) {
    class DaMessage {
        constructor(iMessage = "", iSenderId = "") {
            this.timestamp = -1;
            this.message = iMessage;
            this.senderId = iSenderId;
            // this.timestamp = RealtimeGlobals.sFbServerTimestamp;
            this.timestamp = Date.now();
            this.groupId = "";
            this.joinedSession = false;
            this.leftSession = false;
        }
    }
    tests.DaMessage = DaMessage;
})(tests || (tests = {}));
var tests;
(function (tests) {
    class DaRealtimeUser {
        constructor() {
            this.userId = "";
            this.occasionId = "-1";
            this.timestamp = -1; //firebase.database.ServerValue.TIMESTAMP
            this.firstName = "";
            this.lastName = "";
            this.isManager = false;
            this.sessionData = new tests.DaConnectSession();
            this.dimension = "";
            this.floorplanId = -1;
            this.profilePicUrl = "";
            this.numberNotification = 0;
            this.recentMessageTimestamp = 0;
            this.attendeeId = -1;
            this.joinExvoTimestamp = -1;
        }
        get fullName() {
            return (this.firstName + " " + this.lastName).trim();
        }
    }
    tests.DaRealtimeUser = DaRealtimeUser;
})(tests || (tests = {}));
var tests;
(function (tests) {
    class FbGlobal {
        static getFbAdminRefByStatus(iStatus) {
            if (!iStatus || iStatus == "") {
                return null;
            }
            switch (iStatus) {
                case modules.common.exvoadmin.DaAdminConst.ENTERING:
                    return FbGlobal.ENTERING_REF;
                case modules.common.exvoadmin.DaAdminConst.BROWSING:
                    return FbGlobal.BROWSING_REF;
                case modules.common.exvoadmin.DaAdminConst.NETWORKING:
                    return FbGlobal.NETWORKING_REF;
                case modules.common.exvoadmin.DaAdminConst.BOOTH:
                    return FbGlobal.BOOTH_REF;
                default:
                    return FbGlobal.ONBOARDING_REF;
            }
        }
    }
    //------------------------------
    // Constants
    //------------------------------
    FbGlobal.sServerTimestamp = firebase.database.ServerValue.TIMESTAMP;
    FbGlobal.CHILD_ADD = 'child_added';
    FbGlobal.CHILD_CHANGED = 'child_changed';
    FbGlobal.CHILD_REMOVED = 'child_removed';
    FbGlobal.VALUE = 'value';
    FbGlobal.OCCASIONS_REF = 'occasions';
    FbGlobal.ENTITIES_REF = 'entities';
    FbGlobal.GLOBALS_REF = 'globals';
    FbGlobal.CHECKIN_REF = 'checkin';
    FbGlobal.CHECKED_IN_GUESTS_REF = 'checkedInGuests';
    FbGlobal.USER_DATA_REF = 'userData';
    FbGlobal.FLOORPLANS_REF = 'floorplans';
    FbGlobal.ENTITIES_ZONE_REF = 'zones';
    FbGlobal.ENTITIES_HIGH_FREQUENCY = 'highFrequency';
    FbGlobal.ENTITIES_REGULAR_FREQUENCY = 'data';
    FbGlobal.CHILDREN = 'children';
    FbGlobal.LAYOUT_REF = 'layout';
    FbGlobal.RECENT_OBJECTS_REF = 'recent objects';
    FbGlobal.RECENT_CHANGES_REF = 'recent changes';
    FbGlobal.EXTERNAL_USERS_REF = 'external users';
    FbGlobal.USERS_REF = 'users';
    FbGlobal.ERRORS_REF = 'errors';
    FbGlobal.EVENT_PROPERTIES_REF = "eventProperties";
    FbGlobal.CHANNELS_REF = 'channels';
    FbGlobal.SESSION_DATA_REF = "sessionData";
    FbGlobal.DIMENSION_REF = "dimension";
    FbGlobal.FLOORPLAN_ID_REF = "floorplanId";
    FbGlobal.CHATS_REF = "realtimeChats";
    FbGlobal.GENERAL_CHAT_REF = "realtimeChats/general";
    FbGlobal.PRIVATE_CHATS_REF = "privateChats";
    FbGlobal.GROUP_CHATS_REF = "realtimeChats/groupChats";
    FbGlobal.MESSAGES = "messages";
    FbGlobal.UPDATES = "updates";
    FbGlobal.ENTITIES_HIGH_FREQUENCY_AVATAR = 'highFrequencyAvatars';
    FbGlobal.EXVOADMIN_REF = 'exvoadmin';
    FbGlobal.ENTERING_REF = 'entering';
    FbGlobal.ONBOARDING_REF = 'onboarding';
    FbGlobal.BROWSING_REF = 'browsing';
    FbGlobal.BOOTH_REF = 'booth';
    FbGlobal.NETWORKING_REF = 'networking';
    tests.FbGlobal = FbGlobal;
})(tests || (tests = {}));
/// <reference path="../../../node_modules/types/astsmoduledata.d.ts" />
/// <reference path="../../../node_modules/types/asbase.d.ts" />
var tests;
(function (tests) {
    var microservices;
    (function (microservices) {
        class MicroserviceBase {
            constructor() {
                this.mBaseURL = "";
                this.mIsLastCallBack = 0;
            }
            //______________________________________________________________
            setCallFrequency(mDeltaTimeBetweenCalls) {
                this.mDeltaTimeBetweenCalls = mDeltaTimeBetweenCalls;
                clearInterval(this.mCallServerInterval);
                this.mCallServerInterval = window.setInterval(() => this.callServer(), this.mDeltaTimeBetweenCalls);
            }
            //______________________________________________________________
            callServer() {
                if (this.mURL == null) {
                    return;
                }
                if (this.mIsLastCallBack > 0) {
                    //console.log("mIsLastCallBack = " + this.mIsLastCallBack)
                    this.mIsLastCallBack--;
                    return;
                }
                this.mIsLastCallBack = 5;
                new asBase.JsonLoader(this.mURL, (pData) => this.onLoad(pData), (pHttpRequest) => this.onError(pHttpRequest));
            }
            //______________________________________________________________
            callError(pType) {
                console.error("Error: " + pType + " URL: " + this.mURL);
            }
            //______________________________________________________________
            onError(pHttpRequest) {
                this.mIsLastCallBack = 0;
                this.callError(pHttpRequest.response);
            }
            //______________________________________________________________
            onLoad(pData) {
                this.mIsLastCallBack = 0;
                let aDataObj;
                try {
                    aDataObj = JSON.parse(pData);
                }
                catch (e) {
                    this.callError("bad JSON");
                    return false;
                }
                if ((aDataObj.error != null) && (aDataObj.error != "")) {
                    this.callError(aDataObj.error);
                    return false;
                }
                this.mData = pData;
                return true;
            }
            //_____________________________________________________________
            get data() {
                return this.mData;
            }
            //______________________________________________________________
            close() {
                clearInterval(this.mCallServerInterval);
            }
        }
        MicroserviceBase.SERVER_URL = "https://msrv.allseated.com/";
        microservices.MicroserviceBase = MicroserviceBase;
    })(microservices = tests.microservices || (tests.microservices = {}));
})(tests || (tests = {}));
/// <reference path="MicroserviceBase.ts" />
var tests;
(function (tests) {
    var microservices;
    (function (microservices) {
        class AvatarsGridService extends microservices.MicroserviceBase {
            constructor() {
                super();
            }
            //_________________________________________________________________
            static get instance() {
                if (AvatarsGridService.mInstance == null) {
                    AvatarsGridService.mInstance = new AvatarsGridService();
                }
                return AvatarsGridService.mInstance;
            }
            //________________________________________________________________
            init(pServerName, pOccasionId, pZoneID) {
                if (pOccasionId == null) {
                    return;
                }
                microservices.MicroserviceBase.currentOccasionId = pOccasionId;
                microservices.MicroserviceBase.currentZoneId = pZoneID;
                this.mBaseURL = microservices.MicroserviceBase.SERVER_URL + pServerName;
                this.mBaseURL += AvatarsGridService.CALLS_URL;
                this.mBaseURL = this.mBaseURL.replace("{occasionId}", pOccasionId);
                this.mBaseURL = this.mBaseURL.replace("{zoneId}", pZoneID);
                if (this.mCurrentX != null) {
                    this.updateCallData(this.mCurrentX, this.mCurrentY, this.mNumOfAvatars);
                }
            }
            //______________________________________________________________
            updateCallData(pLocX, pLocY, pNumOfAvatars) {
                if (pLocX == 0) {
                    return;
                }
                this.mCurrentX = pLocX;
                this.mCurrentY = pLocY;
                this.mNumOfAvatars = pNumOfAvatars;
                if (this.mBaseURL == "") {
                    return;
                }
                this.mURL = this.mBaseURL;
                this.mURL = this.mURL.replace("{locX}", pLocX.toString());
                this.mURL = this.mURL.replace("{locY}", pLocY.toString());
                this.mURL = this.mURL.replace("{avatarsNumbre}", pNumOfAvatars.toString());
            }
            //______________________________________________________________
            // overide
            onLoad(pData) {
                if (!super.onLoad(pData)) {
                    return false;
                }
                this.mAvatarsData = JSON.parse(this.mData);
                asBase.events.EventManager.dispatchEvent(asBase.entity.EvEntity.ENTITY_UPDATE_FROM_SERVER_EV, this, this.mAvatarsData);
                return true;
            }
            //______________________________________________________________
            updateGlobalData(pKey, pData) {
                if (pKey == null) {
                    pKey = microservices.MicroserviceBase.currentOccasionId;
                }
                else {
                    this.mCurrentData = pData;
                }
                if (pKey != microservices.MicroserviceBase.currentOccasionId) {
                    return false;
                }
                if (this.mCurrentData == null) {
                    return false;
                }
                if (this.mCurrentData.avatarsZones == null) {
                    this.remove();
                    return false;
                }
                if (this.mCurrentData.avatarsZones[microservices.MicroserviceBase.currentZoneId]) {
                    modules.common.globals.GlobalContext.avatarServer = this.mCurrentData.avatarsServer; // "avatarscalc" 
                    this.init(this.mCurrentData.avatarsServer, microservices.MicroserviceBase.currentOccasionId, microservices.MicroserviceBase.currentZoneId);
                    microservices.AvatarsGridService.instance.setCallFrequency(AvatarsGridService.GET_UPDATE_FROM_SERVER);
                    return true;
                }
                else {
                    this.remove();
                }
                return false;
            }
            //______________________________________________________________
            remove() {
                modules.common.globals.GlobalContext.avatarServer = null;
                this.close();
            }
        }
        /*
         * https://msrv.allseated.com/avatarscalc?ocID=299646&zoneID=10&acction=open_occasion
         * https://msrv.allseated.com/avatarscalc?ocID=299646&zoneID=10&x=1000&y=1000&num=50
         * https://msrv.allseated.com/avatarscalc?ocID=299646&zoneID=10&acction=close_occasion
         */
        AvatarsGridService.CALLS_URL = "?ocID={occasionId}&zoneID={zoneId}&x={locX}&y={locY}&num={avatarsNumbre}";
        AvatarsGridService.GET_UPDATE_FROM_SERVER = 900;
        microservices.AvatarsGridService = AvatarsGridService;
    })(microservices = tests.microservices || (tests.microservices = {}));
})(tests || (tests = {}));
/// <reference path="DaMessage.ts" />
var tests;
(function (tests) {
    class MoChatFirebaseGw {
        constructor(iCollabDatabase) {
            this.mCollabDatabase = iCollabDatabase;
            this.mTimeEntered = Date.now(); //this.myData.timestamp;
            this.mChatsDpHash = {};
        }
        //___________________________________________GENERAL CHAT___________________________________________________
        sendGeneralMessage(iMessageData) {
            // let aMessageData = new DaMessage(iMessage, this.myData.userId);
            this.generalChatRef().push(iMessageData).catch((error) => this.sendPushMessageError(error, iMessageData));
        }
        //_______________________________________________________________
        sendPushMessageError(error, iMessageData) {
        }
        //_______________________________________________________________
        startChatsListeners() {
            this.generalChatRef().on(tests.FbGlobal.CHILD_ADD, (snap) => this.generalMessageAdded_EventHandler(snap));
            this.startPrivateChatsListener();
        }
        //_______________________________________________________________
        stopChatListeners() {
            this.generalChatRef().off();
            this.stopPrivateChatsListener();
        }
        //_______________________________________________________________
        generalMessageAdded_EventHandler(iSnapshot) {
            let aMessage = iSnapshot.val();
            if (aMessage) {
                if (aMessage.senderId == this.myData.userId || this.isTimestampExpired(aMessage.timestamp)) {
                    return;
                }
            }
        }
        //_______________________________________________________________
        removeGeneralChat() {
            this.generalChatRef().remove();
        }
        //___________________________________________GROUP CHAT___________________________________________________
        //_______________________________________________________________
        sendGroupMessage(iMessageData) {
            // MoExvoStat.statistic.sendLogMsg(externalgw.asStatistic.events.LogType.LOG,externalgw.asStatistic.events.LogStringType.SEND_MESSAGE,"GENERAL")
            this.groupChatRef(`${iMessageData.groupId}/${tests.FbGlobal.MESSAGES}`).push(iMessageData).catch((error) => this.sendPushMessageError(error, iMessageData));
        }
        //_______________________________________________________________
        sendGroupUpdate(iUpdate) {
            this.groupChatRef(`${iUpdate.groupId}/${tests.FbGlobal.UPDATES}`).push(iUpdate).catch((error) => {
                console.log("Error sending chat update:", error);
            });
        }
        //_______________________________________________________________
        startGroupChatsListener(iGroupId) {
            // if(this.mChatsDpHash[iGroupId] != iGroupId) {
            this.groupChatRef(`${iGroupId}/${tests.FbGlobal.MESSAGES}`).on(tests.FbGlobal.CHILD_ADD, (snap) => this.groupMessageAdded_EventHandler(snap));
            this.mChatsDpHash[iGroupId] = iGroupId;
            this.groupChatRef(`${iGroupId}/${tests.FbGlobal.UPDATES}`).on(tests.FbGlobal.CHILD_ADD, (snap) => this.groupUpdateAdded_EventHandler(snap));
            // }
        }
        //_______________________________________________________________
        stopGroupChatListeners(iGroupId) {
            this.groupChatRef(`${iGroupId}/${tests.FbGlobal.MESSAGES}`).off();
            this.groupChatRef(`${iGroupId}/${tests.FbGlobal.UPDATES}`).off();
        }
        //_______________________________________________________________
        groupMessageAdded_EventHandler(iSnapshot) {
            let aMessage = iSnapshot.val();
            if (aMessage) {
                if (aMessage.senderId == this.myData.userId || aMessage.timestamp < this.myData.sessionData.timestamp) {
                    return;
                }
            }
        }
        //_______________________________________________________________
        groupUpdateAdded_EventHandler(iSnapshot) {
            let aUpdate = iSnapshot.val();
            if (aUpdate) {
                if (aUpdate.userId == this.myData.userId || aUpdate.timestamp < this.myData.sessionData.timestamp) {
                    this.groupChatRef(`${aUpdate.groupId}/${tests.FbGlobal.UPDATES}/${iSnapshot.key}`).remove();
                    return;
                }
            }
        }
        //_______________________________________________________________
        removeGroupChat(iGroupId) {
            this.groupChatRef(`${iGroupId}/${tests.FbGlobal.MESSAGES}`).remove();
            this.groupChatRef(`${iGroupId}/${tests.FbGlobal.UPDATES}`).remove();
        }
        //___________________________________________PRIVATE CHATS___________________________________________________
        sendPrivateMessage(iMessageData, iUserId) {
            // let aMessageData = new DaMessage(iMessage, this.myData.userId);
            this.privateChatsRef(iUserId).child(`${this.myData.userId}/${tests.FbGlobal.MESSAGES}`).push(iMessageData).catch((error) => this.sendPushMessageError(error, iMessageData));
        }
        //_______________________________________________________________
        startPrivateChatsListener() {
            this.privateChatsRef(this.myData.userId).on(tests.FbGlobal.CHILD_ADD, (snap) => this.privateChatAdded_EventHandler(snap));
        }
        //_______________________________________________________________
        stopPrivateChatsListener() {
            this.privateChatsRef(this.myData.userId).off();
        }
        //_______________________________________________________________
        privateChatAdded_EventHandler(iSnapshot) {
            this.startPrivateChatMessagesListener(iSnapshot.key);
        }
        //_______________________________________________________________
        startPrivateChatMessagesListener(iUserId) {
            if (this.mChatsDpHash[iUserId] != iUserId) {
                this.privateChatsRef(this.myData.userId).child(`${iUserId}/${tests.FbGlobal.MESSAGES}`).on(tests.FbGlobal.CHILD_ADD, (snap) => this.privateChatMessageAdded_EventHandler(snap));
                this.mChatsDpHash[iUserId] = iUserId;
            }
        }
        //_______________________________________________________________
        stopPrivateChatMessagesListener(iUserId) {
            this.privateChatsRef(this.myData.userId).child(`${iUserId}/${tests.FbGlobal.MESSAGES}`).off();
        }
        //_______________________________________________________________
        privateChatMessageAdded_EventHandler(iSnapshot) {
            let aMessage = iSnapshot.val();
            if (aMessage) {
                //this.sendGotPrivateMessage(aMessage);
            }
        }
        //_______________________________________________________________
        sendGeneralMessageById(iMessage, iSendorId) {
            let aMessageData = new tests.DaMessage(iMessage, iSendorId);
            this.generalChatRef().push(aMessageData).catch((error) => this.sendPushMessageError(error, aMessageData));
        }
        //_______________________________________________________________
        sendPrivateMessageById(iMessage, iSendorId, iUserId) {
            let aMessageData = new tests.DaMessage(iMessage, iSendorId);
            this.privateChatsRef(iUserId).child(`${iSendorId}/${tests.FbGlobal.MESSAGES}`).push(aMessageData).catch((error) => this.sendPushMessageError(error, aMessageData));
        }
        //_______________________________________________________________
        chatsRef() {
            return this.mCollabDatabase.ref(`${tests.FbGlobal.OCCASIONS_REF}/${this.myData.occasionId}/${tests.FbGlobal.CHATS_REF}`);
        }
        //_______________________________________________________________
        generalChatRef() {
            return this.mCollabDatabase.ref(`${tests.FbGlobal.OCCASIONS_REF}/${this.myData.occasionId}/${tests.FbGlobal.GENERAL_CHAT_REF}`);
        }
        //_______________________________________________________________
        groupChatRef(iGroupId) {
            return this.mCollabDatabase.ref(`${tests.FbGlobal.OCCASIONS_REF}/${this.myData.occasionId}/${tests.FbGlobal.GROUP_CHATS_REF}/${iGroupId}`);
        }
        //_______________________________________________________________
        privateChatsRef(iUserId) {
            return tests.MoFireBaseManager.fireBaseManager.getUserRef(iUserId).child(tests.FbGlobal.PRIVATE_CHATS_REF);
        }
        //_______________________________________________________________
        isTimestampExpired(iTimestamp) {
            return iTimestamp < this.mTimeEntered;
        }
        /****************************
         * Getters and Setters
         ****************************/
        //_______________________________________________________________
        get myData() {
            return tests.MoFireBaseManager.fireBaseManager.realtimeUserData;
        }
    }
    tests.MoChatFirebaseGw = MoChatFirebaseGw;
})(tests || (tests = {}));
/// <reference path="DaRealtimeUser.ts" />
///<reference path="../../node_modules/types/asBase.d.ts"/>
///<reference path="../../node_modules/types/AstsModuleData.d.ts"/>
/**
 * Levi Dworkin
 */
var tests;
(function (tests) {
    var DaEntityBase = asBase.entity.DaEntityBase;
    var EntityManager = asBase.entity.EntityManager;
    class MoFireBaseManager {
        //_________________________________________________________________________
        constructor() {
            this.mCurrentEntitiesZone = "";
            this.mSignedIn = false;
            this.mServiceError = false;
            this.mCollabAuthId = "";
            this.mExternalUsersDic = {};
            this.mConfig = {
                apiKey: "AIzaSyBCujhlAUsrMDAvuGlBdBmBnMtpFVOBXDM",
                authDomain: "vrcollab-fcfed.firebaseapp.com",
                projectId: "vrcollab-fcfed",
                appId: "1:428371963908:web:4894bcf819a3fb2c88c551"
            };
            this.createCollaborationConnection();
        }
        //_________________________________________________________________________
        createCollaborationConnection() {
            //Database- vrcollab/collaboration-allseated
            this.mRealtimeUserData = new tests.DaRealtimeUser();
            this.mConfig.databaseURL = "https://collaboration-allseated.firebaseio.com/";
            this.mCollabApp = firebase.initializeApp(this.mConfig, 'collaboration');
            this.mCollabDatabase = firebase.database(this.mCollabApp);
            this.mCollabApp.auth().signInAnonymously().then((snap) => this.onGetCollabAuthId(snap)).catch((error) => this.failGetCollabAuthId(error));
            this.mConfig.databaseURL = "https://collaboration-keepalive.firebaseio.com";
            let aKeepAliveApp = firebase.initializeApp(this.mConfig, 'collaboration-keepalive');
            aKeepAliveApp.auth().signInAnonymously().then((snap) => this.onGetCollabAuthId(snap)).catch((error) => {
                let errorMessage = error.message;
                console.log(`Error keepalive anon auth:\n${errorMessage}`);
            });
            this.mKeepAliveDatabase = firebase.database(aKeepAliveApp);
        }
        //_________________________________________________________________________
        onGetCollabAuthId(snap) {
            this.mCollabAuthId = snap.uid;
            this.mSignedIn = true;
            // MoExternalService.requestFirebaseToken(this.mCollabAuthId,(data:any)=>this.onGetToken(data), ()=>this.mServiceError = true);
        }
        //_________________________________________________________________________
        failGetCollabAuthId(error) {
            this.mServiceError = true;
            let errorMessage = error.message;
            console.log(`Error collab anon auth:\n${errorMessage}`);
        }
        //_________________________________________________________________________
        static get fireBaseManager() {
            if (MoFireBaseManager.mFireBaseManager == null) {
                this.mFireBaseManager = new MoFireBaseManager();
            }
            return this.mFireBaseManager;
        }
        //_________________________________________________________________________
        setOccasionId(iOccasionId, iZone) {
            this.occasionId = iOccasionId;
            this.mRealtimeUserData.occasionId = iOccasionId;
            this.mCurrentEntitiesZone = iZone;
        }
        //_________________________________________________________________________
        changeEntity(iEntity, iIsHighFrequency, iDelete, iWithLastUpdate = true, iChildPath) {
            if (iEntity.zoneId == null || iEntity.zoneId == "") {
                if (this.mCurrentEntitiesZone == null || this.mCurrentEntitiesZone == "") {
                    if (EntityManager.currentZoneId == null || EntityManager.currentZoneId == "") {
                        console.log("no current zone id in changeEntity");
                        return;
                    }
                    this.mCurrentEntitiesZone = EntityManager.currentZoneId;
                }
                iEntity.zoneId = this.mCurrentEntitiesZone;
            }
            if (iDelete) {
                this.deleteEntity(iEntity);
                return;
            }
            iEntity.lastUpdate = firebase.database.ServerValue.TIMESTAMP;
            let aSendObject = iEntity.getSerializeData(iWithLastUpdate);
            let aDataType = (iIsHighFrequency) ? tests.FbGlobal.ENTITIES_HIGH_FREQUENCY : tests.FbGlobal.ENTITIES_REGULAR_FREQUENCY;
            if ((modules.common.globals.GlobalContext.avatarServer != null) && (iIsHighFrequency)) {
                if (iEntity.type == modules.data.avatar.DaAvatarRegularData.ENTITY_TYPE) {
                    aDataType = tests.FbGlobal.ENTITIES_HIGH_FREQUENCY_AVATAR;
                }
            }
            if ((iEntity.zoneId != this.mCurrentEntitiesZone) || (this.occasionId == "-1")) {
                this.deleteEntity(iEntity);
            }
            if (iEntity.zoneId == "") {
                return;
            }
            if (this.occasionId != "-1") {
                let aFloorplanRef = this.mCollabDatabase.ref(`${tests.FbGlobal.ENTITIES_REF}/${this.occasionId}/${tests.FbGlobal.ENTITIES_ZONE_REF}/${iEntity.zoneId}`);
                aFloorplanRef.child(`${aDataType}/${iEntity.id}`).update(aSendObject);
            }
        }
        //_________________________________________________________________________
        deleteEntity(iEntity, iDeleteGlobal = false) {
            if (iEntity.zoneId == null || iEntity.zoneId == "") {
                if (this.mCurrentEntitiesZone == null || this.mCurrentEntitiesZone == "") {
                    if (EntityManager.currentZoneId == null || EntityManager.currentZoneId == "") {
                        console.log("no current zone id in changeEntity");
                        return;
                    }
                    this.mCurrentEntitiesZone = EntityManager.currentZoneId;
                }
                iEntity.zoneId = this.mCurrentEntitiesZone;
            }
            if (iEntity.zoneId == DaEntityBase.GLOBAL && !iDeleteGlobal) {
                return;
            }
            if (!iDeleteGlobal) {
                iEntity.zoneId = this.mCurrentEntitiesZone;
            }
            let aRegularData = this.mCollabDatabase.ref(`${tests.FbGlobal.ENTITIES_REF}/${this.occasionId}/${tests.FbGlobal.ENTITIES_ZONE_REF}/${iEntity.zoneId}`);
            let aEntity = EntityManager.instance.getEntityById(iEntity.id);
            if (aEntity && aEntity.parent) {
                aRegularData.child(`${tests.FbGlobal.ENTITIES_REGULAR_FREQUENCY}/${aEntity.parent.id}/children/${iEntity.id}`).remove();
                if (aEntity.parent.data.unique == null) {
                    aEntity.parent.data.unique = "1";
                }
                aRegularData.child(`${tests.FbGlobal.ENTITIES_REGULAR_FREQUENCY}/${aEntity.parent.id}/${DaEntityBase.UNIQUE}`).set(aEntity.parent.data.unique + 1);
            }
            aRegularData.child(`${tests.FbGlobal.ENTITIES_REGULAR_FREQUENCY}/${iEntity.id}`).remove();
            let aHighFrequencyData = this.mCollabDatabase.ref(`${tests.FbGlobal.ENTITIES_REF}/${this.occasionId}/${tests.FbGlobal.ENTITIES_ZONE_REF}/${iEntity.zoneId}`);
            aHighFrequencyData.child(`${tests.FbGlobal.ENTITIES_HIGH_FREQUENCY}/${iEntity.id}`).remove();
            let aHighFrequencyAvatarData = this.mCollabDatabase.ref(`${tests.FbGlobal.ENTITIES_REF}/${this.occasionId}/${tests.FbGlobal.ENTITIES_ZONE_REF}/${iEntity.zoneId}`);
            aHighFrequencyAvatarData.child(`${tests.FbGlobal.ENTITIES_HIGH_FREQUENCY_AVATAR}/${iEntity.id}`).remove();
        }
        //_________________________________________________________________________
        deleteHighFrequencyEntity(pDeleteType, pUserId, pZoneId) {
            if (pDeleteType == tests.FbGlobal.ENTITIES_HIGH_FREQUENCY) {
                let aHighFrequencyData = this.mCollabDatabase.ref(`${tests.FbGlobal.ENTITIES_REF}/${this.occasionId}/${tests.FbGlobal.ENTITIES_ZONE_REF}/${pZoneId}`);
                aHighFrequencyData.child(`${tests.FbGlobal.ENTITIES_HIGH_FREQUENCY}/${pUserId}`).remove();
            }
            else {
                let aHighFrequencyAvatarData = this.mCollabDatabase.ref(`${tests.FbGlobal.ENTITIES_REF}/${this.occasionId}/${tests.FbGlobal.ENTITIES_ZONE_REF}/${pZoneId}`);
                aHighFrequencyAvatarData.child(`${tests.FbGlobal.ENTITIES_HIGH_FREQUENCY_AVATAR}/${pUserId}`).remove();
            }
        }
        //_______________________________________________________________
        setGlobalsListener() {
            let aGlobalRef = this.mCollabDatabase.ref(tests.FbGlobal.GLOBALS_REF);
            aGlobalRef.on(tests.FbGlobal.CHILD_ADD, (snapshot) => {
                let aData = snapshot.val();
                tests.Avatars.setAvatarsNum(snapshot.key, aData);
                if (tests.microservices.AvatarsGridService.instance.updateGlobalData(snapshot.key, aData)) {
                    this.deleteHighFrequencyEntity(tests.FbGlobal.ENTITIES_HIGH_FREQUENCY, this.userId, this.mCurrentEntitiesZone);
                }
                else {
                    EntityManager.lastUpdateFromServer = null;
                    this.deleteHighFrequencyEntity(tests.FbGlobal.ENTITIES_HIGH_FREQUENCY_AVATAR, this.userId, this.mCurrentEntitiesZone);
                }
            });
            aGlobalRef.on(tests.FbGlobal.CHILD_CHANGED, (snapshot) => {
                let aData = snapshot.val();
                tests.Avatars.setAvatarsNum(snapshot.key, aData);
                if (tests.microservices.AvatarsGridService.instance.updateGlobalData(snapshot.key, aData)) {
                    this.deleteHighFrequencyEntity(tests.FbGlobal.ENTITIES_HIGH_FREQUENCY, this.userId, this.mCurrentEntitiesZone);
                }
                else {
                    EntityManager.lastUpdateFromServer = null;
                    this.deleteHighFrequencyEntity(tests.FbGlobal.ENTITIES_HIGH_FREQUENCY_AVATAR, this.userId, this.mCurrentEntitiesZone);
                }
            });
            aGlobalRef.on(tests.FbGlobal.CHILD_REMOVED, (snapshot) => {
                let aData = snapshot.val();
                tests.Avatars.setAvatarsNum(snapshot.key, aData);
                if (snapshot.key != this.occasionId) {
                    return;
                }
                EntityManager.lastUpdateFromServer = null;
                tests.microservices.AvatarsGridService.instance.remove();
                this.deleteHighFrequencyEntity(tests.FbGlobal.ENTITIES_HIGH_FREQUENCY_AVATAR, this.userId, this.mCurrentEntitiesZone);
            });
        }
        //_________________________________________________________________________
        removeBot(iId) {
            if (!iId || iId == "") {
                console.log("User ID is empty in removeBot");
                return;
            }
            this.getRefByID(iId, true).remove();
            let aServerKeepAlive = `active/${this.occasionId},,,${this.userTypeChar},,,${iId}`;
            this.mKeepAliveDatabase.ref(aServerKeepAlive).remove();
        }
        //_____________________________________________________________________________
        //_________________________________________________________________________
        generateBot(iId) {
            if (!this.mCollabDatabase) {
                return;
            }
            if (!iId || iId == "") {
                console.log("User ID is empty in generateBot");
                return;
            }
            let aExternalUserRef = this.getRefByID(iId, true);
            let aData = new tests.DaRealtimeUser();
            aData.userId = iId;
            aData.firstName = iId;
            let aImageIndex = (Math.floor(Math.random() * 17) + 1).toString();
            if (aImageIndex.length == 1) {
                aImageIndex = "0" + aImageIndex;
            }
            let aImageURL = "https://allseated-res.cloudinary.com/image/upload/b_rgb:484845,c_pad,h_128,w_256/v1597663179/faces/F_0" + aImageIndex + ".jpg";
            aData.profilePicUrl = aImageURL;
            aData.occasionId = this.occasionId;
            aData.timestamp = firebase.database.ServerValue.TIMESTAMP;
            aExternalUserRef.child(tests.FbGlobal.USER_DATA_REF).set(aData).then((snap) => {
                aExternalUserRef.on(tests.FbGlobal.VALUE, (snapshot) => {
                    let aData = snapshot.val();
                    if (aData != null) {
                        Object.keys(aData).forEach((key) => {
                            //if (this.isEventKey(key)) {
                            //    aExternalUserRef.child(key).remove();
                            //}
                        });
                    }
                });
                aExternalUserRef.child(tests.FbGlobal.USER_DATA_REF).update({
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                });
                MoFireBaseManager.fireBaseManager.externalUsersDic[iId] = aData;
                let aServerKeepAlive = `active/${this.occasionId},,,${this.userTypeChar},,,${iId}`;
                this.mKeepAliveDatabase.ref(aServerKeepAlive).set(firebase.database.ServerValue.TIMESTAMP);
            });
        }
        //_________________________________________________________________________
        updateOccasionParticipants(iEvent) {
            this.updateOtherOccasionUsers(iEvent);
            this.updateExternalUsers(iEvent);
        }
        //_________________________________________________________________________
        updateExternalUsers(iEvent) {
            let aExternalRef = this.externalUsersRef;
            for (let aKey in this.externalUsersDic) {
                if (aKey != null && aKey != "" && aKey != this.userId) {
                    aExternalRef.child(`${aKey}/${iEvent.type}`).set(iEvent);
                }
            }
        }
        //_________________________________________________________________________
        get externalUsersDic() {
            return this.mExternalUsersDic;
        }
        //_________________________________________________________________________
        get externalUsersRef() {
            let aOccasionRef = this.occasionRef;
            if (!aOccasionRef) {
                return null;
            }
            return aOccasionRef.child(tests.FbGlobal.EXTERNAL_USERS_REF);
        }
        //_________________________________________________________________________
        updateOtherOccasionUsers(iEvent) {
            let aOccasionUsersRef = this.occasionUsersRef;
            aOccasionUsersRef.once(tests.FbGlobal.VALUE, (snapshot) => {
                if (snapshot.exists()) {
                    let aData = snapshot.val();
                    Object.keys(aData).forEach((aKey) => {
                        if (aKey != null && aKey != "" && aKey != this.userId.toString()) {
                            aOccasionUsersRef.child(`${aKey}/${iEvent.type}`).set(iEvent);
                        }
                    });
                }
            });
            //TODO just send to user ids from layoutUserDic like so
            // let aOccasionUserRef = this.occasionUsersRef;
            // for (let aKey in this.layoutUsersDic){
            //     if (aKey != this.userId) {
            //         aOccasionUserRef.child(`${aKey}/${iEvent.type}`).set(iEvent);
            //     }
            // }
        }
        //_________________________________________________________________________
        get occasionUsersRef() {
            let aOccasionRef = this.occasionRef;
            if (!aOccasionRef) {
                return null;
            }
            return aOccasionRef.child(tests.FbGlobal.USERS_REF);
        }
        //_____________________________________________________________________________
        getRefByID(iUserID, iIsExternal) {
            if (iUserID == null || iUserID == "") {
                console.trace("getRefByID: userID is null");
                return null;
            }
            let aUserRefPath = iIsExternal ? tests.FbGlobal.EXTERNAL_USERS_REF : tests.FbGlobal.USERS_REF;
            return this.occasionRef.child(`${aUserRefPath}/${iUserID}/`);
        }
        //___________________________________________________________________________
        get userTypeChar() {
            return 'u'; //b
        }
        //_________________________________________________________________________
        get occasionRef() {
            if (this.occasionId == null) {
                return null;
            }
            return this.mCollabDatabase.ref(`${tests.FbGlobal.OCCASIONS_REF}/${this.occasionId}`);
        }
        //________________________________________________________________
        deleteKeepAliveEntity(pUniqueId, pKeys) {
            this.keepAliveEntity(pUniqueId, pKeys, true);
        }
        //_________________________________________________________________________
        keepAliveEntity(pUniqueId, pKeys, pIsActive) {
            if (this.mKeepAliveDatabase == null) {
                return;
            }
            let aBaseKey = this.occasionId + ",,,";
            this.mKeepAliveDatabase.ref("entities/users/" + pUniqueId).set(firebase.database.ServerValue.TIMESTAMP);
            for (let i = 0; i < pKeys.length; i++) {
                if (pIsActive) {
                    this.mKeepAliveDatabase.ref("entities/keys/" + pUniqueId + "/" + aBaseKey + pKeys[i]).remove();
                }
                else {
                    this.mKeepAliveDatabase.ref("entities/keys/" + pUniqueId + "/" + aBaseKey + pKeys[i]).set(true);
                }
            }
        }
        //_________________________________________________________________________
        get chatsGw() {
            if (!this.mChatsGw) {
                this.mChatsGw = new tests.MoChatFirebaseGw(this.mCollabDatabase);
            }
            return this.mChatsGw;
        }
        //_________________________________________________________________________
        getUserRef(iUserID) {
            let aIsExternal;
            if (iUserID == this.userId) {
                aIsExternal = asBase.Globals.isMiniMode;
            }
            else {
                aIsExternal = this.mExternalUsersDic[iUserID] != null;
            }
            return this.getRefByID(iUserID, aIsExternal);
        }
        //_________________________________________________________________________
        get userId() {
            if (this.mRealtimeUserData == null) {
                return "";
            }
            return this.mRealtimeUserData.userId;
        }
        //_________________________________________________________________________
        set userId(iUserId) {
            if (this.mRealtimeUserData == null) {
                return;
            }
            this.mRealtimeUserData.userId = iUserId;
        }
        //_________________________________________________________________________
        get realtimeUserData() {
            return this.mRealtimeUserData;
        }
    }
    tests.MoFireBaseManager = MoFireBaseManager;
})(tests || (tests = {}));
var tests;
(function (tests) {
    class TestGridNavigator extends asBase.entity.grid.GridNavigator {
        //______________________________________________________________________________
        constructor() {
            super();
        }
        //__________________________________________________
        static get instance() {
            if (TestGridNavigator.mNavigator == null) {
                TestGridNavigator.mNavigator = new TestGridNavigator();
            }
            return TestGridNavigator.mNavigator;
        }
        //_________________________________________________________________
        getRandomLocation() {
            let aUnivCellSize = Math.round(asBase.entity.grid.GridManager.CELL_SIZE * asBase.Globals.sBaseUnivFactor);
            let aCell = this.getRandomFreeCell();
            let aCenter = this.getCellCenter(aCell.x, aCell.y);
            aCenter.x += (-aUnivCellSize / 2 + Math.floor(Math.random() * aUnivCellSize));
            aCenter.z += (-aUnivCellSize / 2 + Math.floor(Math.random() * aUnivCellSize));
            return aCenter;
        }
        //_________________________________________________________________
        getNextPoint(pX, pZ) {
            let aUnivCellSize = Math.round(asBase.entity.grid.GridManager.CELL_SIZE * asBase.Globals.sBaseUnivFactor);
            let aCellX = Math.floor((pX / aUnivCellSize) + asBase.entity.grid.GridManager.GRID_HALF_SIZE);
            let aCellZ = Math.floor((pZ / aUnivCellSize) + asBase.entity.grid.GridManager.GRID_HALF_SIZE);
            let aCell = this.getRandomFreeCellNear(aCellX, aCellZ);
            if (aCell == null) {
                return null;
            }
            let aCenter = this.getCellCenter(aCell.x, aCell.y);
            aCenter.x += (-aUnivCellSize / 2 + Math.floor(Math.random() * aUnivCellSize));
            aCenter.z += (-aUnivCellSize / 2 + Math.floor(Math.random() * aUnivCellSize));
            return aCenter;
        }
        //_____________________________________________________________________
        getRandomFreeCellNear(pCellX, pCellY) {
            let aAlowCell = new Array();
            for (let i = 0; i < this.mCellsToCheck.length; i++) {
                if (this.isEmptyCell(pCellX + this.mCellsToCheck[i].x, pCellY + this.mCellsToCheck[i].y)) {
                    aAlowCell.push(i);
                }
            }
            if (aAlowCell.length == 0) {
                return null;
            }
            let aIndex = Math.floor(Math.random() * aAlowCell.length);
            if (aIndex >= aAlowCell.length) {
                aIndex = aAlowCell.length - 1;
            }
            return { x: (this.mCellsToCheck[aAlowCell[aIndex]].x + pCellX), y: (this.mCellsToCheck[aAlowCell[aIndex]].y + pCellY) };
        }
    }
    tests.TestGridNavigator = TestGridNavigator;
})(tests || (tests = {}));
var tests;
(function (tests) {
    class EvFireBaseManager {
        constructor(type, action, data) {
            this.mType = type == undefined ? null : type;
            this.mAction = action == undefined ? null : action;
            this.mData = data == undefined ? null : data;
        }
        //_________________________________________
        updateSenderData(iUsername, iFirstName, iLastName, iUserID) {
            this.mSenderData = {};
            this.mSenderData.username = iUsername;
            this.mSenderData.firstName = iFirstName;
            this.mSenderData.lastName = iLastName;
            if (iUserID != undefined) {
                this.mSenderData.userId = iUserID;
            }
        }
        /****************************
         * Getters and Setters
         ****************************/
        get data() {
            if (this.mData != null) {
                return this.mData;
            }
            return null;
        }
        //_________________________________________
        set data(data) {
            this.mData = data;
        }
        //_________________________________________
        get senderData() {
            return this.mSenderData;
        }
        //_________________________________________
        get action() {
            if (this.mAction != null) {
                return this.mAction;
            }
            return null;
        }
        //_________________________________________
        set action(value) {
            this.mAction = value;
        }
        //_________________________________________
        get type() {
            if (this.mType != null) {
                return this.mType;
            }
            return this.mType;
        }
        //_________________________________________
        set type(value) {
            this.mType = value;
        }
    }
    EvFireBaseManager.SHOW_PRELOADER = "Collaboration__ShowPreloader";
    EvFireBaseManager.HIDE_PRELOADER = "Collaboration__HidePreloader";
    // Events
    EvFireBaseManager.LANGUAGE_LOADED = 'languageLoaded_Event';
    EvFireBaseManager.ACCOUNT_COLLABORATOR_EXIT = "accountCollaboratorExit_Event";
    EvFireBaseManager.ACCOUNT_COLLABORATOR_ENTER = "accountCollaboratorEnter_Event";
    EvFireBaseManager.UPDATE_OCCASIONS_LIST = 'updateOccasionsList_Event';
    EvFireBaseManager.ACCOUNT_PAGE_USER = 'accountPageUser_Event';
    EvFireBaseManager.ACCOUNT_PAGE_PROFILE = 'accountPageProfile_Event';
    EvFireBaseManager.ACCOUNT_PAGE_PERMISSIONS = 'accountPagePermissions_Event';
    EvFireBaseManager.UPDATE_OCCASION_VENDORS = 'updateOccasionVendors_Event';
    EvFireBaseManager.UPDATE_OCCASION_DETAILS = 'updateOccasionDetails_Event';
    EvFireBaseManager.UPDATE_OCCASION_SPS = 'updateOccasionSps_Event';
    EvFireBaseManager.UPDATE_OCCASION_ENTOURAGE = 'updateOccasionEntourage_Event';
    EvFireBaseManager.LAYOUT_HALL_MAP = 'layoutHallMapFB_Event';
    EvFireBaseManager.LAYOUT_OBJECT = 'updateLayoutObject_Event';
    EvFireBaseManager.MANAGER_UPDATE = 'collaborationUpdateManager_Event';
    EvFireBaseManager.ADMIN_UPDATE = 'collaborationUpdateAdmin_Event';
    EvFireBaseManager.REALTIME_CHATS = "realtimeChats_Event";
    EvFireBaseManager.ILLEGAL_GATHER_LOCATION = "illegalGatherLocation_Event";
    EvFireBaseManager.CALL_REJECTED_EVENT = "callRejected_Event";
    EvFireBaseManager.REQUEST_JOIN_CALL_EVENT = "requestJoinCall_event";
    EvFireBaseManager.REQUEST_JOIN_ACCEPTED_EVENT = "requestJoinAccepted_event";
    EvFireBaseManager.STOP_CALLING = "stopCalling_Event";
    EvFireBaseManager.INVITE_TO_CALL_EVENT = "inviteToCall_Event";
    EvFireBaseManager.INVITE_TO_CALL_RESPONSE_EVENT = "inviteToCallResponse_Event";
    EvFireBaseManager.USER_FLYVIEW_CHANGED = "collaborationUserFlyviewChanged_Event";
    EvFireBaseManager.RESTART_MEETING_UNLOAD_CANCEL = "restartMeetingUnloadCancel_Event";
    EvFireBaseManager.SHOW_TOAST = "showToast_Event";
    EvFireBaseManager.QA_IN_QUEUE = "qaInQueue_Event";
    EvFireBaseManager.QA_REQUEST_ACCEPTED = "qaRequestAccepted_Event";
    EvFireBaseManager.SEND_CHAT_MESSAGE_FAIL = "sendChatMessageFail_Event";
    EvFireBaseManager.GOT_FIREBASE_USER_ID = "gotFirebaseUserId_Event";
    EvFireBaseManager.MINI_CONNECT_UPDATES = "miniConnectUpdates_Event";
    EvFireBaseManager.USER_ASSIGNED_TO_DISPLAY = "userAssignedToDisplay_Event";
    EvFireBaseManager.REMOVE_ASSIGNED_FROM_DISPLAY = "removeAssignedFromDisplay_Event";
    EvFireBaseManager.SPEAKER_INVITED_TO_STAGE = "speakerInvitedToStage_Event";
    EvFireBaseManager.ADMIN_HANGUP = "admin_hangup_Event";
    //Actions
    EvFireBaseManager.ADD_ACTION = "add_Action";
    EvFireBaseManager.DELETE_ACTION = "delete_Action";
    EvFireBaseManager.CHANGE_ACTION = "change_Action";
    EvFireBaseManager.REFRESH_ACTION = 'refresh_Action';
    EvFireBaseManager.DELETE_OCCASION = "deleteOccasion_Action";
    EvFireBaseManager.DELETE_PAST_OCCASION = 'deletePastOccasion_Action';
    EvFireBaseManager.ACCEPTED_INVITE = 'acceptedInvite_Action';
    EvFireBaseManager.UPDATE_PARA_PROFILE = 'updateParaProfile_Action';
    EvFireBaseManager.ADD_MEDIA_PROFILE = 'addMediaProfile_Action';
    EvFireBaseManager.UPDATE_MEDIA_PROFILE = 'updateMediaProfile_Action';
    EvFireBaseManager.DELETE_MEDIA_PROFILE = 'deleteMediaProfile_Action';
    EvFireBaseManager.ADD_ALBUM_PROFILE = 'addAlbumProfile_Action';
    EvFireBaseManager.UPDATE_ALBUM_PROFILE = 'updateAlbumProfile_Action';
    EvFireBaseManager.DELETE_ALBUM_PROFILE = 'deleteAlbumProfile_Action';
    EvFireBaseManager.ADD_SERVICE_TAG_PROFILE = 'addServiceTagProfile_Action';
    EvFireBaseManager.DELETE_SERVICE_TAG_PROFILE = 'deleteServiceTagProfile_Action';
    EvFireBaseManager.UPDATE_CONTACT_PROFILE = 'updateContactProfile_Action';
    EvFireBaseManager.UPDATE_SOCIALS_PROFILE = 'updateSocialsProfile_Action';
    EvFireBaseManager.UPDATE_LOGO_PROFILE = 'updateLogoProfile_Action';
    EvFireBaseManager.UPDATE_COVER_PROFILE = 'updateCoverProfile_Action';
    EvFireBaseManager.UPDATE_WEBSITE_PROFILE = 'updateWebsiteProfile_Action';
    EvFireBaseManager.LOCK_OCCASION_VENDOR = 'lockOccasionVendor_Action';
    EvFireBaseManager.UNLOCK_OCCASION_VENDOR = 'unlockOccasionVendor_Action';
    EvFireBaseManager.UPDATE_PERMISSIONS = 'updatePermissions_Action';
    EvFireBaseManager.IS_MANAGER = 'collaborationIsManager_Action';
    EvFireBaseManager.SHARE_ACTION = 'collabShare_Action';
    EvFireBaseManager.STOP_SHARE_ACTION = 'collabStopShare_Action';
    EvFireBaseManager.CHAIR_TYPE_CHANGED = 'chairTypeChanged_Action';
    EvFireBaseManager.FLOORPLAN_SELECTED = 'floorplanSelected_Action';
    EvFireBaseManager.SESSION_STARTED = 'sessionStarted_Action';
    EvFireBaseManager.REMOVE_USER_FROM_SESSION = 'removeUserFromMeeting_Action';
    EvFireBaseManager.MUTE_USER_IN_SESSION = 'muteUserInSession_Action';
    EvFireBaseManager.UNMUTE_USER_IN_SESSION = 'unmuteUserInSession_Action';
    EvFireBaseManager.MICROPHONE_STATUS_CHANGED = 'microphoneStatusChanged_Action';
    EvFireBaseManager.LOCK_SHARE_SCREEN = 'lockShareScreen_Action';
    EvFireBaseManager.UNLOCK_SHARE_SCREEN = 'unlockShareScreen_Action';
    EvFireBaseManager.IN_MEETING = 'inMeeting_Event';
    EvFireBaseManager.REMOVE_OCCASION_PARTICIPANT = 'removeOccasionParticipant_Action';
    EvFireBaseManager.UPDATE_AGORA_PROXY = 'updateAgoraProxy_Action';
    EvFireBaseManager.CONNECTING_AUDIO = 'connectingAudio_Action';
    EvFireBaseManager.CONNECTING_CAMERA = 'connectingCamera_Action';
    EvFireBaseManager.GATHER_ALL = 'gatherAll_Action';
    EvFireBaseManager.PRIVATE_JOIN_REQUEST = 'privateJoinRequest_Action';
    EvFireBaseManager.PRIVATE_JOIN_RESPONSE = 'privateJoinResponse_Action';
    EvFireBaseManager.DIMENSION_CHANGE = 'dimensionChange_Action';
    EvFireBaseManager.ALL_TO_OTHER_DIMENSION = 'allToOtherDimension_Action';
    EvFireBaseManager.FLOORPLAN_ID_CHANGE = 'floorplanIdChange_Action';
    EvFireBaseManager.GENERAL_MESSAGE = "generalMessage_Action";
    EvFireBaseManager.PRIVATE_MESSAGE = "privateMessage_Action";
    EvFireBaseManager.GROUP_MESSAGE = "groupMessage_Action";
    EvFireBaseManager.QA_REQUEST = "qaRequest_Action";
    EvFireBaseManager.QA_REMOVE_BROADCAST = "qaRemoveBroadcast_Action";
    EvFireBaseManager.USER_DATA_CHANGED = "userDataChanged_Action";
    EvFireBaseManager.UPDATE_FLOORPLANS_USER_NUM = "updateFloorplansUserNum_Action";
    EvFireBaseManager.CHANGED_SESSION_ROLE = "changedSessionRole_Event";
    EvFireBaseManager.GET_ALL_ACTIVE_CHECKIN_USERS = 'getAllActiveUsers_Action';
    EvFireBaseManager.CHECK_IN_GUEST_UPDATED = 'checkInGuestsUpdated_Action';
    EvFireBaseManager.CHECK_IN_ENDED = 'checkInEnded_Action';
    EvFireBaseManager.CHECK_IN_STARTED = 'checkInStarted_Action';
    EvFireBaseManager.CHECKIN_BUBBLE_NOTIFICATION = 'checkInBubbleNotification_Action';
    EvFireBaseManager.USER_LEFT_CHECKIN_NOTIFICATION = "userLeftCheckinNotification_Action";
    EvFireBaseManager.ALLOW_USER_TO_CHECK_IN_NOTIFICATION = "allowUserToCheckInNotification_Action";
    EvFireBaseManager.USER_ALLOWED_TO_CHECK_IN_NOTIFICATION = "UserAllowedToCheckInNotification_Action";
    EvFireBaseManager.CALL_REJECTED_TIMEOUT_ACTION = "callRejectedTimeout_Action";
    EvFireBaseManager.CALL_REJECTED_DECLINE_ACTION = "callRejectedDecline_Action";
    EvFireBaseManager.CALL_REQUEST_CALL_AREA_ACTION = "callRequestCallArea_Action";
    EvFireBaseManager.CALL_REQUEST_BOOTH_ACTION = "callRequestBooth_Action";
    EvFireBaseManager.SHARE_ACTION_ENTERING = 'collabShareEntering_Action';
    EvFireBaseManager.SHARE_ACTION_ONBOARDING = 'collabShareOnboarding_Action';
    EvFireBaseManager.SHARE_ACTION_BROWSING = 'collabShareBrowsing_Action';
    EvFireBaseManager.SHARE_ACTION_NETWORKING = 'collabShareNetworkinging_Action';
    EvFireBaseManager.SHARE_ACTION_BOOTH = 'collabShareBooth_Action';
    EvFireBaseManager.STOP_SHARE_ACTION_ENTERING = 'collabStopShareEntering_Action';
    EvFireBaseManager.STOP_SHARE_ACTION_ONBOARDING = 'collabStopShareOnboarding_Action';
    EvFireBaseManager.STOP_SHARE_ACTION_BROWSING = 'collabStopShareBrowsing_Action';
    EvFireBaseManager.STOP_SHARE_ACTION_NETWORKING = 'collabStopShareNetworking_Action';
    EvFireBaseManager.STOP_SHARE_ACTION_BOOTH = 'collabStopShareBooth_Action';
    EvFireBaseManager.ENTERING_CHANGE = 'collabEnteringChange_Action';
    EvFireBaseManager.SHARE_ACTION_ONBOARDING_CHANGE = 'collabShareOnboardingChange_Action';
    EvFireBaseManager.BROWSING_CHANGE = 'collabBrowsingChange_Action';
    EvFireBaseManager.NETWORKING_CHANGE = 'collabNetworkingChange_Action';
    EvFireBaseManager.BOOTH_CHANGE = 'collabBoothChange_Action';
    EvFireBaseManager.CHANNEL_ADD_ACTION = "channel_add_Action";
    EvFireBaseManager.CHANNEL_REMOVE_ACTION = "channel_remove_Action";
    EvFireBaseManager.CHANNEL_CHANGE_ACTION = "channel_change_Action";
    EvFireBaseManager.CHAT_TYPING = "chat_typing_Action";
    EvFireBaseManager.SEEN_MESSAGE = "seen_message_Action";
    tests.EvFireBaseManager = EvFireBaseManager;
})(tests || (tests = {}));
//# sourceMappingURL=tests.js.map