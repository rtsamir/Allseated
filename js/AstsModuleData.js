var modules;
(function (modules) {
    var common;
    (function (common) {
        var allseated;
        (function (allseated) {
            var events;
            (function (events) {
                class EvAllSeated {
                }
                EvAllSeated.LOAD_REGISTER__EV = 'LoadRegister__Event';
                EvAllSeated.LOAD_LOGIN__EV = 'LoadLogin__Event';
                EvAllSeated.UNLOAD_MODULE__EV = 'UnloadModule__Event';
                EvAllSeated.AUTOPILOT_LOGIN_ERROR__EV = 'AutoPilotLoginError__Event';
                events.EvAllSeated = EvAllSeated;
            })(events = allseated.events || (allseated.events = {}));
        })(allseated = common.allseated || (common.allseated = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var asguide;
        (function (asguide) {
            var data;
            (function (data) {
                class DaAsGuide {
                }
                // PAGES
                DaAsGuide.VENDOR_OCCASIONS_LIST = 'VendorOccasionsList';
                DaAsGuide.OCCASION_DASHBOARD = 'OccasionDashboard';
                DaAsGuide.OCCASION_SEATING = 'OccasionSeating';
                DaAsGuide.OCCASION_SEATING_OBJECTS_MENU = 'OccasionSeatingObjectsMenu';
                DaAsGuide.OCCASION_SEATING_3D = 'OccasionSeating3D';
                DaAsGuide.OCCASION_SEATING_3D_REALVIEW = 'OccasionSeating3DRealView';
                // Billing
                DaAsGuide.BILLING_SELECT_PLAN = 'BillingSelectPlan__Page';
                DaAsGuide.BILLING_SELECT_PAYMENT = 'BillingSelectPayment__Page';
                // Seating
                DaAsGuide.OCCASION_SEATING_TABLE_OBJECT_WINDOW = 'OccasionSeating_TableObjectWindow';
                data.DaAsGuide = DaAsGuide;
            })(data = asguide.data || (asguide.data = {}));
        })(asguide = common.asguide || (common.asguide = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var asguide;
        (function (asguide) {
            var data;
            (function (data) {
                class DaAsGuideActions {
                }
                // New Occasion window
                DaAsGuideActions.NEW_OCCASION_WINDOW_CLOSED = 'NewOccasionWindow__Closed';
                DaAsGuideActions.OBJECTS_MENU_OBJECT_SELECTED = 'ObjectsMenu_ObjectSelected';
                DaAsGuideActions.OBJECTS_MENU_OBJECT_POSITIONED = 'ObjectsMenu_ObjectPositioned';
                DaAsGuideActions.LAYOUT_HALL_3D_BUTTON_CLICKED = 'LayoutHall3DButton_Clicked';
                DaAsGuideActions.LAYOUT_HALL_2D_BUTTON_CLICKED = 'LayoutHall2DButton_Clicked';
                DaAsGuideActions.LAYOUT_HALL_3D_READY = 'LayoutHall3D_Ready';
                DaAsGuideActions.LAYOUT_HALL_3D_REALVIEW_READY = 'LayoutHall3D_RealView_Ready';
                DaAsGuideActions.LAYOUT_HALL_3D_SWITCH_TO_FIRST_PERSON = 'LayoutHall3DSwitchTo_FirstPerson';
                DaAsGuideActions.LAYOUT_HALL_3D_SWITCH_TO_FLY_VIEW = 'LayoutHall3DSwitchTo_FlyView';
                DaAsGuideActions.LAYOUT_HALL_3D_NAVIGATION_CLICKED = 'LayoutHall3DNavigation_Clicked';
                DaAsGuideActions.LAYOUT_HALL_ACTIVE_COMPLETE = 'LayoutHallActive_Complete';
                DaAsGuideActions.LAYOUT_HALL_MAP_SELECTOR_VISIBLE = 'LayoutHallMapSelectorVisible_Complete';
                DaAsGuideActions.LAYOUT_VENUE_HALLS_LIST_VISIBLE = 'LayoutVenueHallsListVisible_Complete';
                DaAsGuideActions.LAYOUT_VENUE_HALL_FROM_URL_LOADED = 'LayoutVenueHallFromURL_Loaded';
                DaAsGuideActions.LAYOUT_NEW_FLOORPLAN_DONE_CLICKED = 'LayoutNewFloorPlanDone_Clicked';
                DaAsGuideActions.LAYOUT_NEW_FLOORPLAN_CREATED = 'LayoutNewFloorPlan_Created';
                DaAsGuideActions.RETAKE_TOUR_CLICKED = 'RetakeTour_Clicked';
                DaAsGuideActions.OCCASION_EVENTS_BUTTON_CLICKED = 'OccasionEventsButton_Clicked';
                DaAsGuideActions.SOCIAL_DISTANCING_CLICKED = 'SocialDistancingClicked_Clicked';
                // Billing
                DaAsGuideActions.BILLING_PLAN_SELECTED = 'BillingPlan_Selected';
                // Ongoing Tips
                DaAsGuideActions.SEARCH_MENU_OBJECTS = 'SearchMenuObjects_action';
                DaAsGuideActions.SHOW_HOW_CONNECT_WORKS = 'ShowHowConnectWorks_action';
                data.DaAsGuideActions = DaAsGuideActions;
            })(data = asguide.data || (asguide.data = {}));
        })(asguide = common.asguide || (common.asguide = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var asguide;
        (function (asguide) {
            var data;
            (function (data) {
                class DaAsGuideElements {
                    constructor() {
                    }
                    //____________________________________________________________________
                    buildElementsHash() {
                        this.mElementsHash = new Object();
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_LIST] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_START_TOUR] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_CLOSE_TAKE_TOUR] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_UPLOAD_FLOORPLAN] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_CLOSE_UPLOAD_FLOORPLAN] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_UPLOAD_ANOTHER_FLOORPLAN] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_CLOSE_WORKING_ON_FLOORPLAN] = 0;
                        this.mElementsHash[DaAsGuideElements.DEMO_EVENT_SELECT_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_DETAILS_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_EVENTS_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_NEW_OCCASION_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_DASHBOARD_DETAILS] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_DASHBOARD_COLLABORATORS] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_DASHBOARD_SPS] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_DEMO_FLOORPLAN_ENTRY] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_DEMO_OBJECTS_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_OBJECTS_24_ROUND] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_OBJECTS_36_ROUND] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_OBJECTS_60_ROUND] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_LAYOUT_HALL] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_3D_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_TLAT_2D_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_TLAT_3D_CONTROLS] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_TLAT_FLY_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.INVITE_NEW_VENDOR_EMAIL] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_AIRWALL_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_NEW_OCCASION_WINDOW] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASIONS_NEW_OCCASION_WINDOW_OCCASION_DATE] = 0;
                        this.mElementsHash[DaAsGuideElements.NEW_FLOORPLAN_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.FLOORPLAN_TYPE_VENUE_BUTTON] = 0;
                        this.mElementsHash[DaAsGuideElements.VENUE_HALLS_LIST] = 0;
                        this.mElementsHash[DaAsGuideElements.NEW_FLOORPLAN_NAME_DIV] = 0;
                        this.mElementsHash[DaAsGuideElements.BILLING_PAYMENT_DISCOUNT_CODE] = 0;
                        this.mElementsHash[DaAsGuideElements.BILLING_PAYMENT_APPLY_DISCOUNT_CODE] = 0;
                        this.mElementsHash[DaAsGuideElements.BILLING_PLANS_TABLE] = 0;
                        this.mElementsHash[DaAsGuideElements.OCCASION_SEATING_FLOATING_WINDOW_CHAIRS_TAB] = 0;
                        this.mElementsHash[DaAsGuideElements.QUALITY_BTN] = 0;
                        return this.mElementsHash;
                    }
                }
                DaAsGuideElements.OCCASIONS_LIST = 'occasionsList_div';
                DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER = 'inAppMessageBox_div';
                // Take tour
                DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_START_TOUR = 'asGuideTakeTour_btn';
                DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_CLOSE_TAKE_TOUR = 'closeInAppTakeTour_btn';
                // Upload Floorplan
                DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_UPLOAD_FLOORPLAN = 'inAppMessageBoxUploadFloorPlan_btn';
                DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_CLOSE_UPLOAD_FLOORPLAN = 'closeInAppUploadFloorPlan_btn';
                // Working on FloorPlans
                DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_UPLOAD_ANOTHER_FLOORPLAN = 'inAppMessageBoxUploadAnotherFloorPlan_btn';
                DaAsGuideElements.OCCASIONS_LIST_TOP_BANNER_CLOSE_WORKING_ON_FLOORPLAN = 'closeInAppReceivedFloorPlans_btn';
                // Occasions List Demo Event
                DaAsGuideElements.DEMO_EVENT_ENTRY = 'DemoEvent__Entry';
                DaAsGuideElements.DEMO_EVENT_SELECT_BUTTON = 'DemoEvent__SelectButton';
                // Occasion
                DaAsGuideElements.OCCASION_DETAILS_BUTTON = 'details_btn';
                DaAsGuideElements.OCCASION_SEATING_BUTTON = 'seating_btn';
                DaAsGuideElements.OCCASION_EVENTS_BUTTON = 'events_btn';
                DaAsGuideElements.OCCASION_NEW_OCCASION_BUTTON = 'new_btn';
                // Occasion Dashboard
                DaAsGuideElements.OCCASIONS_DASHBOARD_DETAILS = 'occasionDetails_div';
                DaAsGuideElements.OCCASIONS_DASHBOARD_COLLABORATORS = 'occasionCollaborators_div';
                DaAsGuideElements.OCCASIONS_DASHBOARD_SPS = 'spsDetails_div';
                // New Occasion Window
                DaAsGuideElements.OCCASIONS_NEW_OCCASION_WINDOW = 'occasionNewOccasionWindow';
                DaAsGuideElements.OCCASIONS_NEW_OCCASION_WINDOW_OCCASION_DATE = 'newOccasionOccasionDate_txti';
                // Occasion Seating
                DaAsGuideElements.OCCASION_SEATING_DEMO_FLOORPLAN_ENTRY = 'DemoFloorPlanEntry_div';
                DaAsGuideElements.OCCASION_SEATING_DEMO_OBJECTS_BUTTON = 'objects_btn';
                DaAsGuideElements.OCCASION_SEATING_OBJECTS_24_ROUND = 'Objects24Round';
                DaAsGuideElements.OCCASION_SEATING_OBJECTS_36_ROUND = 'Objects36Round';
                DaAsGuideElements.OCCASION_SEATING_OBJECTS_60_ROUND = 'Objects60Round';
                DaAsGuideElements.OCCASION_SEATING_LAYOUT_HALL = 'layoutHall_div';
                DaAsGuideElements.OCCASION_SEATING_3D_BUTTON = 'tlat_btn';
                DaAsGuideElements.OCCASION_SEATING_TLAT_2D_BUTTON = '_2d_btn';
                DaAsGuideElements.OCCASION_SEATING_TLAT_3D_CONTROLS = 'controls_3d';
                DaAsGuideElements.OCCASION_SEATING_TLAT_FLY_BUTTON = 'fly_view3D_tbtn';
                DaAsGuideElements.NEW_FLOORPLAN_BUTTON = 'addFloorplan_btn';
                DaAsGuideElements.FLOORPLAN_TYPE_VENUE_BUTTON = 'venueHalls_btn';
                DaAsGuideElements.VENUE_HALLS_LIST = 'venueHallsList_list';
                DaAsGuideElements.NEW_FLOORPLAN_NAME_DIV = 'floorPlanName_div';
                DaAsGuideElements.QUALITY_BTN = 'quality_close_tbtn';
                // Seating - menu objects
                DaAsGuideElements.OCCASION_SEATING_AIRWALL_BUTTON = 'airWallTool_btn';
                // Seating - floating window
                DaAsGuideElements.OCCASION_SEATING_FLOATING_WINDOW_CHAIRS_TAB = 'customChairsTab_lbl';
                // Invite New Vendors
                DaAsGuideElements.INVITE_NEW_VENDOR_EMAIL = 'new_vendor_email_txti';
                // Billing
                DaAsGuideElements.BILLING_PAYMENT_DISCOUNT_CODE = 'discountCode_txti';
                DaAsGuideElements.BILLING_PAYMENT_APPLY_DISCOUNT_CODE = 'applyDiscountCode_btn';
                DaAsGuideElements.BILLING_PLANS_TABLE = 'plansTable_div';
                data.DaAsGuideElements = DaAsGuideElements;
            })(data = asguide.data || (asguide.data = {}));
        })(asguide = common.asguide || (common.asguide = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var asguide;
        (function (asguide) {
            var data;
            (function (data) {
                class DaAsGuideMessageBubbles {
                    constructor() {
                    }
                }
                DaAsGuideMessageBubbles.VENUE_INVITED_AS_VENDOR = "VenueInvitesAsVendor__Error";
                DaAsGuideMessageBubbles.HOST_INVITED_AS_VENDOR = "HostInvitesAsVendor__Error";
                DaAsGuideMessageBubbles.REAL_TIME_COLL = "RealTimeColl_Message";
                data.DaAsGuideMessageBubbles = DaAsGuideMessageBubbles;
            })(data = asguide.data || (asguide.data = {}));
        })(asguide = common.asguide || (common.asguide = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var asguide;
        (function (asguide) {
            var data;
            (function (data) {
                class DaAsGuideParam {
                }
                DaAsGuideParam.IS_NEW_USER = 'IsNewUser';
                DaAsGuideParam.REG_VERSION = 'RegVersion';
                DaAsGuideParam.IS_USER_VENUE = 'IsUserVenue';
                DaAsGuideParam.IS_USER_HOST = 'IsUserHost';
                DaAsGuideParam.IS_USER_VENDOR = 'IsUserVendor';
                DaAsGuideParam.IS_VENUE_ACTIVE = 'IsVenueActive';
                DaAsGuideParam.FLOORPLANS_REQUESTS_COUNT = 'FloorPlansRequestsCount';
                DaAsGuideParam.OCCASIONS_COUNT = 'OccasionsCount';
                DaAsGuideParam.TOTAL_OCCASIONS_CREATED = 'TotalOccasionsCreated';
                DaAsGuideParam.IS_FREE_PLAN = 'IsFreePlan';
                DaAsGuideParam.USER_TYPE = 'UserType';
                DaAsGuideParam.USER_PROMOCODE = 'PromoCode';
                data.DaAsGuideParam = DaAsGuideParam;
            })(data = asguide.data || (asguide.data = {}));
        })(asguide = common.asguide || (common.asguide = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var asguide;
        (function (asguide) {
            var data;
            (function (data) {
                class DaAsGuideUserSettings {
                }
                DaAsGuideUserSettings.NEW_VENUE_ONBOARDING = 'NewVenueOnboarding';
                data.DaAsGuideUserSettings = DaAsGuideUserSettings;
            })(data = asguide.data || (asguide.data = {}));
        })(asguide = common.asguide || (common.asguide = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var asguide;
        (function (asguide) {
            var events;
            (function (events) {
                class EvAsGuide {
                }
                // Event
                EvAsGuide.SHOW_OCCASIONS_LIST_BANNER = 'ShowOccasionsListBanner__Event';
                EvAsGuide.CLOSE_OCCASIONS_LIST_BANNER = 'CloseOccasionsListBanner__Event';
                EvAsGuide.ADD_VENUE_DEMO_OCCASION = 'AddVenueDemoOccasion__Event';
                EvAsGuide.RESET_OCCASIONS_LIST = 'ResetOccasionsList__Event';
                EvAsGuide.EXIT_TO_OCCASIONS_LIST = 'ExitToOccasionsList__Event';
                EvAsGuide.SHOW_UPLOAD_FLOORPLAN = 'ShowUploadFloorPlan__Event';
                EvAsGuide.SAVE_JOURNEY_SETTINGS = 'SaveJourneySettings__Event';
                // States
                EvAsGuide.TAKE_TOUR = 'TakeTour__State';
                EvAsGuide.UPLOAD_FLOORPLANS = 'UploadFloorPlans__State';
                EvAsGuide.WORKING_ON_FLOORPLANS = 'WorkingOnFloorPlans__State';
                events.EvAsGuide = EvAsGuide;
            })(events = asguide.events || (asguide.events = {}));
        })(asguide = common.asguide || (common.asguide = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var asts;
        (function (asts) {
            var events;
            (function (events) {
                class EvAsts {
                }
                EvAsts.ASTS_READY = "AstsReady_EV";
                events.EvAsts = EvAsts;
            })(events = asts.events || (asts.events = {}));
        })(asts = common.asts || (common.asts = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var asts;
        (function (asts) {
            var events;
            (function (events) {
                class EvLayout {
                }
                EvLayout.SWITCH_TO_TLAT = "SWITCH_TO_TLAT_EVENT";
                EvLayout.SET_FOLLOW_BUTTONS_ACTIVE = "SET_FOLLOW_BUTTONS_ACTIVE_EVENT";
                EvLayout.SWITCH_FLOORPLAN = "EvLayout_SWITCH_FLOORPLAN_EVENT";
                EvLayout.IS_CLOSED_EVENT = "EvLayout_IS_CLOSED_EVENT";
                EvLayout.IN_GROUP_CALL_EVENT = "EvLayout_IN_GROUP_CALL_EVENT";
                EvLayout.EVENT_STARTED = "EvLayout_EVENT_STARTED";
                events.EvLayout = EvLayout;
            })(events = asts.events || (asts.events = {}));
        })(asts = common.asts || (common.asts = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var cockpit;
        (function (cockpit) {
            var events;
            (function (events) {
                class EvCockpit {
                }
                EvCockpit.COCKPIT_ENTER_SINGLE_CHANNEL_AREA = "COCKPIT_ENTER_SINGLE_CHANNEL_AREA";
                EvCockpit.COCKPIT_EXIT_SINGLE_CHANNEL_AREA = "COCKPIT_EXIT_SINGLE_CHANNEL_AREA";
                EvCockpit.COCKPIT_MUTE_USER_IN_SESSION = "COCKPIT_MUTE_USER_IN_SESSION";
                EvCockpit.COCKPIT_UNMUTE_USER_IN_SESSION = "COCKPIT_UNMUTE_USER_IN_SESSION";
                EvCockpit.COCKPIT_NOTIFY_BOOTH_MANAGER = "COCKPIT_NOTIFY_BOOTH_MANAGER";
                EvCockpit.COCKPIT_NOTIFY_BOOTH_MANAGER_MSG = "Hi, I was looking for you at your booth.";
                EvCockpit.COCKPIT_UPDATE_CANCEL_CALL = "COCKPIT_UPDATE_CANCEL_CALL";
                EvCockpit.COCKPIT_STOP_INVITING_TO_CALL = "COCKPIT_STOP_INVITING_TO_CALL";
                events.EvCockpit = EvCockpit;
            })(events = cockpit.events || (cockpit.events = {}));
        })(cockpit = common.cockpit || (common.cockpit = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var cockpit;
        (function (cockpit) {
            var events;
            (function (events) {
                var AsEvent = asBase.events.AsEvent;
                class EvCockpitGesture extends AsEvent {
                    constructor(type, iGestureType, bubbles = false, iSender) {
                        super(type, bubbles, iSender);
                        this.mGestureType = iGestureType;
                    }
                    //________________________________________________________________________________________
                    get gestureType() {
                        return this.mGestureType;
                    }
                }
                EvCockpitGesture.COCKPIT_SEND_GESTURE = "COCKPIT_SEND_GESTURE";
                EvCockpitGesture.COCKPIT_SEND_GESTURE_LIKE = "like";
                EvCockpitGesture.COCKPIT_SEND_GESTURE_LOVE = "hart_41";
                EvCockpitGesture.COCKPIT_SEND_GESTURE_LAUGH = "smile";
                events.EvCockpitGesture = EvCockpitGesture;
            })(events = cockpit.events || (cockpit.events = {}));
        })(cockpit = common.cockpit || (common.cockpit = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var externalgw;
        (function (externalgw) {
            var data;
            (function (data) {
                let DeviceType;
                (function (DeviceType) {
                    DeviceType["Microphone"] = "audioinput";
                    DeviceType["Camera"] = "videoinput";
                    DeviceType["Speaker"] = "audiooutput";
                })(DeviceType = data.DeviceType || (data.DeviceType = {}));
                class DaConnectDevice {
                    get deviceType() {
                        return this.mDeviceType;
                    }
                    set deviceType(iType) {
                        this.mDeviceType = iType;
                    }
                    get deviceId() {
                        return this.mID;
                    }
                    set deviceId(iID) {
                        this.mID = iID;
                    }
                    get deviceName() {
                        return this.mName;
                    }
                    set deviceName(iName) {
                        this.mName = iName;
                    }
                }
                data.DaConnectDevice = DaConnectDevice;
            })(data = externalgw.data || (externalgw.data = {}));
        })(externalgw = common.externalgw || (common.externalgw = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var externalgw;
        (function (externalgw) {
            var events;
            (function (events) {
                class EvConnectStatistics {
                }
                EvConnectStatistics.MOVE_TO_3D = "MOVE_TO_3D";
                EvConnectStatistics.MOVE_TO_2D = "MOVE_TO_2D";
                EvConnectStatistics.CHANGE_TEXTURE_QUALITY = "CHANGE_TEXTURE_QUALITY";
                EvConnectStatistics.FPS_DECREASE = "FPS_DECREASE";
                EvConnectStatistics.FPS_INCREASE = "FPS_INCREASE";
                EvConnectStatistics.SET_FLY_VIEW = "SET_FLY_VIEW";
                EvConnectStatistics.SET_FPS_VIEW = "SET_FPS_VIEW";
                EvConnectStatistics.WEBGL_CONTEXT_LOST = "WEBGL_CONTEXT_LOST";
                events.EvConnectStatistics = EvConnectStatistics;
            })(events = externalgw.events || (externalgw.events = {}));
        })(externalgw = common.externalgw || (common.externalgw = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var externalgw;
        (function (externalgw) {
            var events;
            (function (events) {
                class EvExvoStatistics {
                }
                EvExvoStatistics.USER_JOINED = "USER_JOINED";
                EvExvoStatistics.EMAIL_INSERT = "EMAIL_INSERT";
                EvExvoStatistics.BOOTH_MNG_ACTIVATE = "BOOTH_MNG_ACTIVATE";
                EvExvoStatistics.AUDIENCE_ACTIVATE = "AUDIENCE_ACTIVATE";
                EvExvoStatistics.REGULAR_SESSION_ACTIVATE = "REGULAR_SESSION_ACTIVATE";
                EvExvoStatistics.CLICK_INTERACTION_EVENT = "CLICK_INTERACTION_EVENT";
                EvExvoStatistics.JOIN_ACCEPTED_MNG = "JOIN_ACCEPTED_MNG";
                EvExvoStatistics.JOIN_REJECTED_MNG = "JOIN_REJECTED_MNG";
                EvExvoStatistics.JOIN_REJECTED_TIMEOUT = "JOIN_REJECTED_TIMEOUT";
                EvExvoStatistics.CREATE_CONVERSATION_ACCEPTED = "CREATE_CONVERSATION_ACCEPTED";
                EvExvoStatistics.CREATE_CONVERSATION_REJECTED = "CREATE_CONVERSATION_REJECTED";
                EvExvoStatistics.CREATE_CONVERSATION_REJECTED_TIMEOUT = "CREATE_CONVERSATION_REJECTED_TIMEOUT";
                EvExvoStatistics.INVITED_CONVERSATION_ACCEPTED = "INVITED_CONVERSATION_ACCEPTED";
                EvExvoStatistics.INVITED_BOOTH_ACCEPTED = "INVITED_BOOTH_ACCEPTED";
                EvExvoStatistics.INVITED_BOOTH_REJECTED = "INVITED_BOOTH_REJECTED";
                EvExvoStatistics.INVITED_TO_CONVERSATION_REJECTED = "INVITED_TO_CONVERSATION_REJECTED";
                EvExvoStatistics.JOIN_CONVERSATION_ACCEPTED = "JOIN_CONVERSATION_ACCEPTED";
                EvExvoStatistics.JOIN_CONVERSATION_REJECTED = "JOIN_CONVERSATION_REJECTED";
                EvExvoStatistics.JOIN_CONVERSATION_REJECTED_TIMEOUT = "JOIN_CONVERSATION_REJECTED_TIMEOUT";
                EvExvoStatistics.INVITE_TO_GROUP = "INVITE_TO_GROUP";
                EvExvoStatistics.INVITE_TO_BOOTH = "INVITE_TO_BOOTH";
                EvExvoStatistics.LEAVE_CONVERSATION = "LEAVE_CONVERSATION";
                EvExvoStatistics.CONVERSATION_END = "CONVERSATION_END";
                EvExvoStatistics.LEAVE_BOOTH = "LEAVE_BOOTH";
                EvExvoStatistics.MNG_LEAVE_BOOTH = "MNG_LEAVE_BOOTH";
                EvExvoStatistics.ENTER_PUBLIC_BOOTH = "ENTER_PUBLIC_BOOTH";
                EvExvoStatistics.SWITCH_FLOORPLAN = "SWITCH_FLOORPLAN";
                EvExvoStatistics.NOTIFY_MANAGER = "NOTIFY_MANAGER";
                EvExvoStatistics.IS_OPEN_CHANGED_EVENT = "IS_OPEN_CHANGED_EVENT_STAT";
                events.EvExvoStatistics = EvExvoStatistics;
            })(events = externalgw.events || (externalgw.events = {}));
        })(externalgw = common.externalgw || (common.externalgw = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var externalgw;
        (function (externalgw) {
            var events;
            (function (events) {
                class EvLiveChannelConnect {
                }
                EvLiveChannelConnect.CHIEF_MANAGER_ANNOUNCEMENT = "CHIEF_MANAGER_ANNOUNCEMENT";
                events.EvLiveChannelConnect = EvLiveChannelConnect;
            })(events = externalgw.events || (externalgw.events = {}));
        })(externalgw = common.externalgw || (common.externalgw = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var externalgw;
        (function (externalgw) {
            var events;
            (function (events) {
                class EvMiniConnect {
                }
                EvMiniConnect.VOICE_STATUS_CHANGED_EVENT = "VOICE_STATUS_CHANGED_EVENT";
                EvMiniConnect.VIDEO_STATUS_CHANGED_EVENT = "CONNECT_VIDEO_STATUS_CHANGED_EVENT";
                EvMiniConnect.ILLEGAL_GATHER_LOCATION = "ILLEGAL_GATHER_LOCATION";
                EvMiniConnect.CONNECTION_STATUS_CHANGED_EVENT = "CONNECTION_STATUS_CHANGED_EVENT";
                EvMiniConnect.COCKPIT_HANGUP_CLICKED = "COCKPIT_HANGUP_CLICKED";
                EvMiniConnect.COCKPIT_CAMERA_CLICKED = "COCKPIT_CAMERA_CLICKED";
                EvMiniConnect.COCKPIT_SHARESCREEN_CLICKED = "COCKPIT_SHARESCREEN_CLICKED";
                EvMiniConnect.COCKPIT_MICROPHONE_CLICKED = "COCKPIT_MICROPHONE_CLICKED";
                EvMiniConnect.COCKPIT_WAVE_CLICKED = "COCKPIT_WAVE_CLICKED";
                EvMiniConnect.COCKPIT_SHOW_WAVE = "COCKPIT_SHOW_WAVE";
                EvMiniConnect.PANEL_SHOW_BOOTH_MANAGER = "PANEL_SHOW_BOOTH_MANAGER";
                EvMiniConnect.EXIT_GUEST_STAGE = "EXIT_GUEST_STAGE";
                EvMiniConnect.GET_ENTITY_BY_OBJECT_ID = "GET_ENTITY_BY_OBJECT_ID";
                EvMiniConnect.UPDATE_COCKPIT_CONTROLS = "UPDATE_COCKPIT_CONTROLS";
                EvMiniConnect.CHANGE_MIC_SETTINGS = "changeMicSettings";
                EvMiniConnect.CHANGE_CAMERA_SETTINGS = "changeCameraSettings";
                EvMiniConnect.CHANGE_SPEAKER_SETTINGS = "changeSpeakerSettings";
                EvMiniConnect.MIC_PERMISSION_DENIED = "MIC_PERMISSION_DENIED";
                EvMiniConnect.SHOW_COCKPIT_MIC_OFF = "SHOW_COCKPIT_MIC_OFF";
                EvMiniConnect.SHOW_COCKPIT_CAMERA_OFF = "SHOW_COCKPIT_CAMERA_OFF";
                EvMiniConnect.SHOW_COCKPIT_SHARE_SCREEN_OFF = "SHOW_COCKPIT_SHARE_SCREEN_OFF";
                EvMiniConnect.COCKPIT_DISABLE_SHARE_SCREEN = "COCKPIT_DISABLE_SHARE_SCREEN";
                EvMiniConnect.COCKPIT_ENABLE_SHARE_SCREEN = "COCKPIT_ENABLE_SHARE_SCREEN";
                EvMiniConnect.BOOTH_BROADCASTING = "BOOTH_BROADCASTING";
                EvMiniConnect.CONNECT_STREAM_PUBLISHED = "CONNECT_STREAM_PUBLISHED";
                EvMiniConnect.SCREEN_SHARE_PUBLISHED = "SCREEN_SHARE_PUBLISHED";
                EvMiniConnect.RESEND_VIDEO_STATUS = "EvMiniConnect_RESEND_VIDEO_STATUS_EVENT";
                events.EvMiniConnect = EvMiniConnect;
            })(events = externalgw.events || (externalgw.events = {}));
        })(externalgw = common.externalgw || (common.externalgw = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var externalgw;
        (function (externalgw) {
            var events;
            (function (events) {
                class EvOnboardingConnectionManager {
                }
                EvOnboardingConnectionManager.VIDEO_TOGGLED_EVENT = "ONBOARDING_VIDEO_TOGGLED_EVENT";
                EvOnboardingConnectionManager.VOLUME_UPDATE_EVENT = "ONBOARDING_VOLUME_UPDATE_EVENT";
                EvOnboardingConnectionManager.PLAY_STREAM_EVENT = "ONBOARDING_PLAY_STREAM_EVENT";
                EvOnboardingConnectionManager.VPN_BLOCKED_JOIN_CHANNEL = "VPN_BLOCKED_JOIN_CHANNEL";
                events.EvOnboardingConnectionManager = EvOnboardingConnectionManager;
            })(events = externalgw.events || (externalgw.events = {}));
        })(externalgw = common.externalgw || (common.externalgw = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var exvoadmin;
        (function (exvoadmin) {
            class DaAdminConst {
                static isBeforeExternal(iStatus) {
                    if (iStatus == this.VALID_EMAIL || iStatus == this.INVALID_EMAIL || iStatus == this.VALID_KEY || iStatus == this.INVALID_KEY || iStatus == this.RESEND_KEY || iStatus == this.PERMISSION || iStatus == this.PERMISSION_FAIL || iStatus == this.ENTERING) {
                        return true;
                    }
                    return false;
                }
            }
            //------------------------------
            // Constants
            //------------------------------
            //___OnBoarding__________________
            DaAdminConst.OnboardingEmail = 0;
            DaAdminConst.OnboardingKey = 1;
            DaAdminConst.OnboardingCustomize = 2;
            DaAdminConst.OnboardingPermissions = 3;
            DaAdminConst.OnboardingDevicesMic = 4;
            DaAdminConst.OnboardingDevicesSpeaker = 5;
            DaAdminConst.OnboardingDevicesCamera = 6;
            DaAdminConst.OnboardingTutorial = 7;
            DaAdminConst.OnboardingTutorialMove = 8;
            DaAdminConst.OnboardingTutorialCall = 9;
            DaAdminConst.OnboardingTutorialEnd = 10;
            DaAdminConst.OnboardingResendKey = 100;
            DaAdminConst.VALID_EMAIL = "Enter email - Waiting for key";
            DaAdminConst.INVALID_EMAIL = "Enter invalid email";
            DaAdminConst.VALID_KEY = "Enter valid key - Customize screen";
            DaAdminConst.INVALID_KEY = "Enter invalid key";
            DaAdminConst.RESEND_KEY = "Resend key";
            DaAdminConst.PERMISSION = "Trying to get permissions";
            DaAdminConst.GOT_PERMISSION = "Got permission - Mic screen";
            DaAdminConst.PERMISSION_FAIL = "didn't get permission - trying again";
            DaAdminConst.MIC_WORK = "Mic Work - Mic screen";
            DaAdminConst.CONFIRM_MIC = "Speakers screen";
            DaAdminConst.CONFIRM_SPEAKERS = "Camera screen";
            DaAdminConst.TUTORIAL = "Ending onboarding - tutorial begin";
            DaAdminConst.TUTORIAL_MOVE = "Tutorial move";
            DaAdminConst.TUTORIAL_CALL = "Tutorial call";
            //______In Event State_____________
            DaAdminConst.ENTERING = "Entering";
            DaAdminConst.BROWSING = "Browsing";
            DaAdminConst.NETWORKING = "Networking";
            DaAdminConst.BOOTH = "Booth";
            exvoadmin.DaAdminConst = DaAdminConst;
        })(exvoadmin = common.exvoadmin || (common.exvoadmin = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class AttendeeVO {
                constructor() {
                }
            }
            servicevo.AttendeeVO = AttendeeVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
///<reference path="../../servicevo/AttendeeVO.ts"/>
var modules;
(function (modules) {
    var common;
    (function (common) {
        var exvoattendees;
        (function (exvoattendees) {
            var data;
            (function (data) {
                var AttendeeVO = modules.common.servicevo.AttendeeVO;
                var EventDispatcher = asBase.events.EventDispatcher;
                class DaAttendee extends EventDispatcher {
                    constructor() {
                        super();
                        this.mAttendeeId = -1;
                        this.mAttendeeRoleTypeId = 0;
                        this.mEntityName = "";
                        this.mEntityId = "";
                    }
                    fillFromVO(iVO) {
                        this.mAttendeeId = iVO.AttendeeId;
                        this.mEmail = iVO.Email;
                        this.mFullName = iVO.Name;
                        this.mCompany = iVO.Company;
                        this.mAttendeeRole = null;
                        this.mAttendeeRoleTypeId = iVO.Role;
                        this.entityId = iVO.Entity;
                    }
                    //_______________________________________________________________
                    createVO() {
                        let aAttendeeVO = new AttendeeVO();
                        aAttendeeVO.AttendeeId = this.mAttendeeId;
                        aAttendeeVO.Email = this.mEmail;
                        aAttendeeVO.Name = this.mFullName;
                        aAttendeeVO.Company = this.mCompany;
                        aAttendeeVO.Role = this.mAttendeeRoleTypeId;
                        aAttendeeVO.Entity = this.mEntityId;
                        return aAttendeeVO;
                    }
                    //_______________________________________________________________
                    dispatchUpdateEmailValue() {
                        this.dispatchEvent("attendeeEmailChanged__Event");
                    }
                    //_______________________________________________________________
                    get attendeeId() {
                        return this.mAttendeeId;
                    }
                    set attendeeId(value) {
                        this.mAttendeeId = value;
                    }
                    //_______________________________________________________________
                    get email() {
                        return this.mEmail;
                    }
                    set email(value) {
                        this.mEmail = value;
                    }
                    //_______________________________________________________________
                    get fullName() {
                        return this.mFullName;
                    }
                    set fullName(value) {
                        this.mFullName = value;
                    }
                    //_______________________________________________________________
                    get company() {
                        return this.mCompany;
                    }
                    set company(value) {
                        this.mCompany = value;
                    }
                    //_______________________________________________________________
                    get entityName() {
                        return this.mEntityName;
                    }
                    set entityName(value) {
                        this.mEntityName = value;
                    }
                    //_______________________________________________________________
                    get entityId() {
                        return this.mEntityId;
                    }
                    set entityId(value) {
                        this.mEntityId = value;
                    }
                    //_______________________________________________________________
                    get attendeeRoleTypeId() {
                        return this.mAttendeeRoleTypeId;
                    }
                    set attendeeRoleTypeId(value) {
                        this.mAttendeeRoleTypeId = value;
                    }
                    //_______________________________________________________________
                    get attendeeRole() {
                        return this.mAttendeeRole;
                    }
                    set attendeeRole(value) {
                        if (this.mAttendeeRole !== value) {
                            this.mAttendeeRole = value;
                            this.mAttendeeRoleTypeId = (this.mAttendeeRole == null) ? 0 : this.mAttendeeRole.roleTypeId;
                            this.dispatchEvent(DaAttendee.ATTENDEE_ROLE_CHANGED, this);
                        }
                    }
                    //_______________________________________________________________
                    get prevEmail() {
                        return this.mPrevEmail;
                    }
                    set prevEmail(value) {
                        this.mPrevEmail = value;
                    }
                    //_______________________________________________________________
                    get prevFullName() {
                        return this.mPrevFullName;
                    }
                    set prevFullName(value) {
                        this.mPrevFullName = value;
                    }
                    //_______________________________________________________________
                    get prevCompany() {
                        return this.mPrevCompany;
                    }
                    set prevCompany(value) {
                        this.mPrevCompany = value;
                    }
                    //_______________________________________________________________
                    get prevAttendeeRoleTypeId() {
                        return this.mPrevAttendeeRoleTypeId;
                    }
                    set prevAttendeeRoleTypeId(value) {
                        this.mPrevAttendeeRoleTypeId = value;
                    }
                    //_______________________________________________________________
                    get prevEntityId() {
                        return this.mPrevEntityId;
                    }
                    set prevEntityId(value) {
                        this.mPrevEntityId = value;
                    }
                    get isEnableEntityId() {
                        if (this.mAttendeeRole == null) {
                            return false;
                        }
                        return this.mAttendeeRole.roleTypeId == DaAttendee.ATTENDEE_ROLE_DJ || this.mAttendeeRole.roleTypeId == DaAttendee.ATTENDEE_ROLE_EXHIBITOR || this.mAttendeeRole.roleTypeId == DaAttendee.ATTENDEE_ROLE_STAGE_MANAGER;
                    }
                }
                //------------------------------
                // Constants
                //------------------------------
                DaAttendee.ATTENDEE_ROLE_CHANGED = "AttendeeRoleChanged__Event";
                DaAttendee.ATTENDEE_ENTITY_NAME_CHANGED = "AttendeeEntityNameChanged__Event";
                DaAttendee.ATTENDEE_ROLE_ATTENDEE = 1;
                DaAttendee.ATTENDEE_ROLE_STAGE_MANAGER = 4;
                DaAttendee.ATTENDEE_ROLE_EXHIBITOR = 2;
                DaAttendee.ATTENDEE_ROLE_DJ = 7;
                data.DaAttendee = DaAttendee;
            })(data = exvoattendees.data || (exvoattendees.data = {}));
        })(exvoattendees = common.exvoattendees || (common.exvoattendees = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
///<reference path="../../servicevo/AttendeeVO.ts"/>
var modules;
(function (modules) {
    var common;
    (function (common) {
        var exvoattendees;
        (function (exvoattendees) {
            var data;
            (function (data) {
                class DaEntityNameForSelection {
                    constructor() {
                    }
                    //____________________________________________________________________
                    get entityId() {
                        return this.mEntityId;
                    }
                    set entityId(value) {
                        this.mEntityId = value;
                    }
                    //____________________________________________________________________
                    get entityName() {
                        return this.mEntityName;
                    }
                    set entityName(value) {
                        this.mEntityName = value;
                    }
                }
                data.DaEntityNameForSelection = DaEntityNameForSelection;
            })(data = exvoattendees.data || (exvoattendees.data = {}));
        })(exvoattendees = common.exvoattendees || (common.exvoattendees = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var exvoattendees;
        (function (exvoattendees) {
            var data;
            (function (data) {
                var AcArray = asBase.baseclasses.AcArray;
                var ArrayCollection = asBase.baseclasses.ArrayCollection;
                class DaExvo {
                    static get exvoData() {
                        if (this.mExvoData == null) {
                            this.mExvoData = new DaExvo();
                        }
                        return this.mExvoData;
                    }
                    //___________________________________________________________________________________
                    get attendeesArray() {
                        if (this.mAttendeesArray == null) {
                            this.mAttendeesArray = new AcArray();
                        }
                        return this.mAttendeesArray;
                    }
                    //___________________________________________________________________________________
                    get exvoRoleTypesArray() {
                        if (this.mExvoRoleTypesArray == null) {
                            this.mExvoRoleTypesArray = new AcArray();
                        }
                        return this.mExvoRoleTypesArray;
                    }
                    //___________________________________________________________________________________
                    set entityNamesArray(value) {
                        this.mEntityNamesArray = value;
                        this.mEntityNamesArrayColl = new ArrayCollection(this.mEntityNamesArray);
                        this.mEntityNamesHash = new Object();
                        for (let i = 0; i < this.mEntityNamesArray.length; i++) {
                            this.mEntityNamesHash[this.mEntityNamesArray[i].entityId] = this.mEntityNamesArray[i];
                        }
                    }
                    //___________________________________________________________________________________
                    get entityNamesArrayCollection() {
                        return this.mEntityNamesArrayColl;
                    }
                    //___________________________________________________________________________________
                    get occasionId() {
                        return this.mOccasionId;
                    }
                    set occasionId(value) {
                        this.mOccasionId = value;
                    }
                    //___________________________________________________________________________________
                    get exvoRoleTypesArrayColl() {
                        if (this.mExvoRoleTypesArrayColl == null) {
                            this.mExvoRoleTypesArrayColl = new ArrayCollection(this.mExvoRoleTypesArray);
                        }
                        return this.mExvoRoleTypesArrayColl;
                    }
                    //___________________________________________________________________________________
                    get entityNamesHash() {
                        return this.mEntityNamesHash;
                    }
                    //___________________________________________________________________________________
                    get roleTypesHash() {
                        return this.mRoleTypesHash;
                    }
                    set roleTypesHash(value) {
                        this.mRoleTypesHash = value;
                    }
                }
                data.DaExvo = DaExvo;
            })(data = exvoattendees.data || (exvoattendees.data = {}));
        })(exvoattendees = common.exvoattendees || (common.exvoattendees = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
///<reference path="../../servicevo/AttendeeVO.ts"/>
var modules;
(function (modules) {
    var common;
    (function (common) {
        var exvoattendees;
        (function (exvoattendees) {
            var data;
            (function (data) {
                class DaExvoRoleType {
                    constructor() {
                    }
                    fillFromVO(iVO) {
                        this.mRoleTypeId = iVO.RoleTypeId;
                        this.mRole = iVO.RoleType;
                        this.mOrderInList = iVO.OrderInList;
                    }
                    //____________________________________________________________________
                    get roleTypeId() {
                        return this.mRoleTypeId;
                    }
                    //____________________________________________________________________
                    get role() {
                        return this.mRole;
                    }
                }
                data.DaExvoRoleType = DaExvoRoleType;
            })(data = exvoattendees.data || (exvoattendees.data = {}));
        })(exvoattendees = common.exvoattendees || (common.exvoattendees = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var panel;
        (function (panel) {
            var events;
            (function (events) {
                class EvPanel {
                }
                EvPanel.PANEL_INIT_ROLES = "PANEL_INIT_ROLES";
                EvPanel.MUTED_STATUS_CHANGED = "MUTED_STATUS_CHANGED";
                EvPanel.PANEL_OPEN_EVERYBODY_CHAT = "PANEL_OPEN_EVERYBODY_CHAT";
                EvPanel.PANEL_OPEN_BOOTH_SESSION_CHAT = "PANEL_OPEN_BOOTH_SESSION_CHAT";
                EvPanel.PANEL_OPEN_BOOTH_SESSION_MANAGER_CHAT = "PANEL_OPEN_BOOTH_SESSION_MANAGER_CHAT";
                EvPanel.PANEL_OPEN_SINGLE_CHAT_BY_ID = "PANEL_OPEN_SINGLE_CHAT_BY_ID";
                EvPanel.PANEL_PRIVATE_CHAT_BACK_BTN = "PANEL_PRIVATE_CHAT_BACK_BTN";
                EvPanel.PANEL_RECEIVED_REJECT_CALL = "panelReceievedRejectCall";
                EvPanel.PANEL_RECEIVED_MISSED_CALL = "panelReceievedMissedCall";
                EvPanel.SPEAKER_CHANGED_EVENT = "EvPanel_SPEAKER_CHANGED_EVENT";
                EvPanel.PANEL_IN_SESSION = "panelInSession";
                EvPanel.PANEL_RECEIVED_GENERAL_MESSAGE = "panelReceievedGeneralMessage";
                EvPanel.PANEL_RECEIVED_PRIVATE_MESSAGE = "panelReceievedPrivateMessage";
                EvPanel.PANEL_SENT_PRIVATE_MESSAGE = "panelSentPrivateMessage";
                EvPanel.PANEL_INITIALIZE_DP = "panelInitializeDP";
                EvPanel.PANEL_CHANGE_IN_VIDEOS_DP = "panelChangeInVideosDP";
                EvPanel.PANEL_UPLOAD_PROFILE_PIC_SETTINGS = 'panelUploadProfilePicSettings';
                EvPanel.PANEL_UPLOAD_LOGO_PIC_SETTINGS = 'panelUploadLogoPicSettings';
                EvPanel.PANEL_UPDATED_NAME_SETTINGS = 'panelUpdatedNameSettings';
                events.EvPanel = EvPanel;
            })(events = panel.events || (panel.events = {}));
        })(panel = common.panel || (common.panel = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class ChairType {
                constructor() {
                }
            }
            ChairType.TRAPEZ_CRESCENT = "trapezCrescent";
            ChairType.REGULAR_CRESCENT = "regularCrescent";
            ChairType.TRAPEZ = "trapeze";
            ChairType.REGULAR = "regular";
            globals.ChairType = ChairType;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class ConnectDeviceSettings {
            }
            ConnectDeviceSettings.MIC_ID = "";
            ConnectDeviceSettings.CAMERA_ID = "";
            ConnectDeviceSettings.SPEAKER_ID = "";
            ConnectDeviceSettings.MUTED = false;
            ConnectDeviceSettings.CAMERA_ON = false;
            ConnectDeviceSettings.SHARE_SCREEN_ON = false;
            ConnectDeviceSettings.CAMERA_ENABLED = false;
            ConnectDeviceSettings.SHARE_SCREEN_ENABLED = false;
            ConnectDeviceSettings.NO_SPEAKERS = false;
            ConnectDeviceSettings.NO_CAMERAS = false;
            ConnectDeviceSettings.NO_MICS = false;
            globals.ConnectDeviceSettings = ConnectDeviceSettings;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var src;
(function (src) {
    var data;
    (function (data) {
        class DaDebugSettings {
            /*
            public static SHOW_KEEP_ALIVE_TRACE: boolean = false;
            public static SHOW_KEYBOARD_TRACE: boolean = false;
            public static SHOW_APP_CHANGE_TRACE: boolean = false;
            public static MARK_APP_CHANGES: boolean = false;
            public static KEEP_ALIVE_TIMEOUT: number = 60000;
            public static CHECKIN_LOG_TIME_INTERVAL: number = 5000;
    
            public static QUICK_CREATE_EVENT: boolean = false;
    
            public static SHOW_MENU_OBJECT_ID: boolean = false;
    
            public static IS_SHOW_CLONED_COUNT_IN_LAYOUT: boolean = false;
            public static IS_SHOW_DYNAMIC_SOURCE_OBJECT_COUNT_IN_LAYOUT: boolean = false;
            public static IS_SHOW_USER_PROFILE_BUTTON_IN_LAYOUT: boolean = true;
    
            */
            DaDebugSettings() {
            }
        }
        DaDebugSettings.SHOW_ENTER_FRAME_TRACE = false;
        DaDebugSettings.SHOW_MOUSE_KEYBOARD_EVENTS_TRACE = false;
        //// TRACE settings
        DaDebugSettings.SHOW_SAVE_RELATED = false;
        DaDebugSettings.SHOW_OCCASION_LOAD_RELATED = false;
        DaDebugSettings.SHOW_SERVICE_RELATED = false;
        DaDebugSettings.SHOW_DATAGRID_RELATED = false;
        DaDebugSettings.SHOW_MODULES_RELATED = false;
        DaDebugSettings.SHOW_OBJECTS_LOAD_RELATED = true;
        DaDebugSettings.SHOW_MEMORY_RELATED = false;
        DaDebugSettings.SHOW_3JS_RELATED = false;
        DaDebugSettings.DEVELOPMENT_MODE = false;
        DaDebugSettings.SHOW_REALTIME_RELATED = true;
        data.DaDebugSettings = DaDebugSettings;
    })(data = src.data || (src.data = {}));
})(src || (src = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaDefaultValues {
                constructor() {
                }
            }
            // chair
            DaDefaultValues.CHAIR_UNIV_WIDTH = 16;
            DaDefaultValues.CHAIR_UNIV_LENGTH = 16;
            DaDefaultValues.CHAIR_UNIV_DIS_TABLE = 0;
            DaDefaultValues.CHAIR_DEFAULT_ID = 4;
            // Minimum distances
            DaDefaultValues.DISTANCE_BETWEEN_TABLES = 0;
            DaDefaultValues.DISTANCE_BETWEEN_TABLES_AND_FURNITURE = 0;
            DaDefaultValues.DISTANCE_NONE = -1;
            DaDefaultValues.SYSTEM_UNITS = "imperial";
            DaDefaultValues.DISTANCE_BETWEEN_TABLES_NONE = -1;
            DaDefaultValues.DISTANCE_BETWEEN_FURNITURE = 0;
            DaDefaultValues.DISTANCE_BETWEEN_TABLES_ZERO = 0;
            DaDefaultValues.DISTANCE_BETWEEN_TABLES_DEFAULT = -2;
            DaDefaultValues.COUCH_ARM_WIDTH = 8;
            DaDefaultValues.MENU_OBJECT_COLOR = 0xFFFFFF;
            DaDefaultValues.MENU_OBJECT_TEXTURE = "";
            DaDefaultValues.DEFAULT_FONT_SIZE = 12;
            DaDefaultValues.DEFAULT_FONT_COLOR = 0xFFFFFF;
            DaDefaultValues.SOCIAL_DISTANCE = 72;
            globals.DaDefaultValues = DaDefaultValues;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaGlobalConsts {
            }
            //------------------------------
            // Constants
            //------------------------------
            // general const
            DaGlobalConsts.NOT_DEFINED = -1;
            DaGlobalConsts.LEAD_CHAIR_OFFSET_NOT_DEFINED = -1000;
            // selected actions
            DaGlobalConsts.SELECTED_ACTION_YES = "SelectedActionYes";
            DaGlobalConsts.SELECTED_ACTION_NO = "SelectedActionNo";
            DaGlobalConsts.SELECTED_ACTION_OK = "SelectedActionOk";
            DaGlobalConsts.SELECTED_ACTION_REFRASH_LIST = "SelectedActionRefrashList";
            DaGlobalConsts.SELECTED_ACTION_CHANGE = "SelectedActionChange";
            DaGlobalConsts.SELECTED_ACTION_CANCEL = "SelectedActionCancel";
            // guests display formats
            DaGlobalConsts.NAME_DISPLAY_FORMAL = 1;
            DaGlobalConsts.NAME_DISPLAY_INFORMAL = 2;
            // aditional type ids
            DaGlobalConsts.TYPE_ID_ALL = -1;
            DaGlobalConsts.TYPE_ID_ALL_INDEX = 0;
            DaGlobalConsts.TYPE_ID_NOT_DEFINED = -2;
            DaGlobalConsts.TYPE_ID_NOT_DEFINED_INDEX = 1;
            // list types
            DaGlobalConsts.SIDE_TYPES = 'sideTypes';
            DaGlobalConsts.RELATION_TYPES = 'relationTypes';
            DaGlobalConsts.RSVP_TYPES = 'rsvpTypes';
            DaGlobalConsts.TITLE_TYPES = 'titleTypes';
            DaGlobalConsts.TITLE_TYPES_NO_COUPLES = 'titleTypesNoCouples';
            DaGlobalConsts.MEAL_TYPES = 'mealTypes';
            // scale types
            DaGlobalConsts.SCALE_BY_DISTANCE = "ScaleByDistance";
            DaGlobalConsts.SCALE_BY_GUESTS_COUNT = "ScaleByGuestsCount";
            DaGlobalConsts.SCALE_BY_CUSTOM = "ScaleByCustom";
            DaGlobalConsts.SCALE_BY_NONE = "ScaleByNone";
            // length units
            DaGlobalConsts.LENGTH_FEET = "feet";
            DaGlobalConsts.LENGTH_INCH = "inch";
            DaGlobalConsts.LENGTH_METERS = "meters";
            // import sources
            DaGlobalConsts.IMPORT_FACEBOOK = "import_from_facebook";
            DaGlobalConsts.IMPORT_GMAIL = "import_from_gmail";
            DaGlobalConsts.IMPORT_EXCEL = "import_from_excel";
            // menu object source
            DaGlobalConsts.MENU_OBJECT_NO_SOURCE = -1;
            // object categories
            DaGlobalConsts.OBJECT_CATEGORY_NUMBERED_TABLES = 1;
            DaGlobalConsts.OBJECT_CATEGORY_NOTNUMBEREDTABLES = 2;
            DaGlobalConsts.OBJECT_CATEGORY_FURNITURE = 3;
            DaGlobalConsts.OBJECT_CATEGORY_FLOORING = 4;
            DaGlobalConsts.OBJECT_CATEGORY_OTHER = 15;
            DaGlobalConsts.OBJECT_CATEGORY_CUSTOMIZED = 5;
            DaGlobalConsts.OBJECT_CATEGORY_CUSTOM = 30;
            // object types
            DaGlobalConsts.OBJECT_TYPE_BAR = 8;
            DaGlobalConsts.OBJECT_TYPE_NOTE = 10;
            DaGlobalConsts.OBJECT_TYPE_THEATRE_CHAIRS = 11;
            DaGlobalConsts.OBJECT_TYPE_RISER = 12;
            DaGlobalConsts.OBJECT_TYPE_HUPA = 13;
            DaGlobalConsts.OBJECT_TYPE_DANCE_FLOOR = 14;
            DaGlobalConsts.OBJECT_TYPE_OTTOMAN = 15;
            DaGlobalConsts.OBJECT_TYPE_STATION = 16;
            DaGlobalConsts.OBJECT_TYPE_LONG_BANQUET_TABLES = 17;
            DaGlobalConsts.OBJECT_TYPE_RECT_SHAPE = 18;
            DaGlobalConsts.OBJECT_TYPE_ELLIPSE_SHAPE = 50;
            DaGlobalConsts.OBJECT_TYPE_HALF_MOON = 19;
            DaGlobalConsts.OBJECT_TYPE_JOINED_TABLE = 20;
            DaGlobalConsts.OBJECT_TYPE_LINE_SHAPE = 21;
            DaGlobalConsts.OBJECT_TYPE_COMBINED_OBJECTS = 22;
            DaGlobalConsts.OBJECT_TYPE_CHAIRS_OBJECTS = 23;
            DaGlobalConsts.OBJECT_TYPE_CUSTOMIZED_COMBINED_OBJECTS = 24;
            DaGlobalConsts.OBJECT_TYPE_BUFFET_OBJECTS = 25;
            // the id is different local and on server!!!!
            // -------------------------------------------------------
            // server
            DaGlobalConsts.OBJECT_TYPE_AIRWALL = 26;
            // -------------------------------------------------------
            // -------------------------------------------------------
            //local
            //		public static OBJECT_TYPE_AIRWALL:number = 25;
            //		 -------------------------------------------------------
            DaGlobalConsts.OBJECT_TYPE_COUCHES = 30;
            DaGlobalConsts.OBJECT_TYPE_VEHICLES = 35;
            DaGlobalConsts.OBJECT_TYPE_CONSOLES = 36;
            DaGlobalConsts.OBJECT_TYPE_PIANOS = 51;
            DaGlobalConsts.OBJECT_TYPE_SERPENTINE = 45;
            // Brand Object Function types
            DaGlobalConsts.FUNCTION_TYPE_NORMAL = 0;
            DaGlobalConsts.FUNCTION_TYPE_ROUND_TABLE = 1;
            DaGlobalConsts.FUNCTION_TYPE_RECT_TABLE = 2;
            DaGlobalConsts.FUNCTION_TYPE_CHAIR = 3;
            DaGlobalConsts.FUNCTION_TYPE_STAGE = 4;
            DaGlobalConsts.FUNCTION_TYPE_TENT = 6;
            // Addon Types
            DaGlobalConsts.ADDON_ASSIGN_SEATS = 1;
            // Addon Status
            DaGlobalConsts.ADDON_NOT_ACTIVE = 0;
            DaGlobalConsts.ADDON_TRIAL = 1;
            DaGlobalConsts.ADDON_ACTIVE = 2;
            // tables status
            DaGlobalConsts.TABLE_OVER = 0xF15A29;
            DaGlobalConsts.TABLE_FULL = 0xFCAF17;
            DaGlobalConsts.TABLE_PART = 0x6EBD44;
            DaGlobalConsts.TABLE_EMPTY = 0xFFFFFF;
            // chairs Status
            DaGlobalConsts.CHAIR_OCCUPIED = 0xF15A29;
            DaGlobalConsts.CHAIR_EMPTY = 0x6EBD44;
            DaGlobalConsts.CHAIR_LEAD = 0xFCAF17;
            //		public static TABLE_FULL:number = 0xFCAF17;
            //		public static TABLE_EMPTY:number = 0xFFFFFF;
            // object label position
            DaGlobalConsts.OBJECT_LABEL_TOP = 1;
            DaGlobalConsts.OBJECT_LABEL_CENTER = 2;
            DaGlobalConsts.OBJECT_LABEL_IS_LABEL = 3;
            // buttons zise
            DaGlobalConsts.BUTTON_SIZE_MED = "BUTTON_SIZE_MED";
            DaGlobalConsts.BUTTON_SIZE_BIG = "BUTTON_SIZE_BIG";
            // general colors
            DaGlobalConsts.GREY_BG_COLOR = 0xF2F2F2;
            DaGlobalConsts.WHITE_BG_COLOR = 0xFFFFFF;
            DaGlobalConsts.ORANGE_ROLLOVER_COLOR = 0xFAE7D6;
            DaGlobalConsts.ORANGE_SELECTION_COLOR = 0xFCC89B;
            DaGlobalConsts.SEPARATOR_LINE_COLOR = 0xe6e7e8;
            DaGlobalConsts.GREY_FILL_COLOR = 0xF0F0F0;
            DaGlobalConsts.POPUP_FILL_COLOR = 0xf1f2f2;
            // public static DYNAMIC_OBJECT_NO_COLOR:number = 0xffffffff;
            DaGlobalConsts.DYNAMIC_OBJECT_NO_COLOR = -100;
            // occasion status
            DaGlobalConsts.OCCASION_STATUS_NORMAL = 0;
            DaGlobalConsts.OCCASION_STATUS_CHECKIN = 1;
            DaGlobalConsts.OCCASION_SESSION_NORMAL = 0;
            DaGlobalConsts.OCCASION_SESSION_READ_ONLY = 1;
            DaGlobalConsts.OCCASION_SESSION_CHECK_IN = 2;
            // server actions
            DaGlobalConsts.ACTION_NEW = 1;
            DaGlobalConsts.ACTION_UPDATE = 2;
            DaGlobalConsts.ACTION_DELETE = 3;
            DaGlobalConsts.TEXT_BACK = "BACK";
            DaGlobalConsts.TEXT_DELETE = "DELETE";
            DaGlobalConsts.TEXT_CANCEL = "CANCEL";
            DaGlobalConsts.TEXT_RESET = "RESET";
            DaGlobalConsts.PROFILE_IMAGE_WIDTH = 260;
            DaGlobalConsts.PROFILE_IMAGE_HEIGHT = 260;
            DaGlobalConsts.PROFILE_MARGIN = 23;
            DaGlobalConsts.PROFILE_GAP = 15;
            DaGlobalConsts.BUFFET_BUILDER_WIDTH = 700;
            DaGlobalConsts.BUFFET_BUILDER_HEIGHT = 500;
            // Brands Ids
            DaGlobalConsts.CORT = 1;
            DaGlobalConsts.AFR = 2;
            DaGlobalConsts.PARTYRENTALS = 3;
            DaGlobalConsts.FORMDECOR = 4;
            DaGlobalConsts.TWO_0_FOUR_EVENTS = 5;
            DaGlobalConsts.HIGH_STYLE_RENTALS = 6;
            DaGlobalConsts.ARCHIVE_RENTALS = 7;
            DaGlobalConsts.BRIGHT_RENTALS = 8;
            DaGlobalConsts.LOUNGE_APPEAL = 9;
            // Occasion Plan Types
            DaGlobalConsts.OCCASION_PLAN_TYPE_LEGACY = 0;
            DaGlobalConsts.OCCASION_PLAN_TYPE_FREE = 1;
            DaGlobalConsts.OCCASION_PLAN_TYPE_SUB = 2;
            DaGlobalConsts.PASSWORD_MAX_CHAR = 19;
            // User Registration Source
            DaGlobalConsts.USER_SOURCE_ALLSEATED = 0;
            DaGlobalConsts.USER_SOURCE_AFR = 1;
            DaGlobalConsts.USER_SOURCE_AFR_EMAIL_PREFIX = "ASAFR";
            // System Units
            DaGlobalConsts.IMPERIAL_UNITS = "imperial";
            DaGlobalConsts.METRIC_UNITS = "metric";
            globals.DaGlobalConsts = DaGlobalConsts;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaServerConst {
                static get isStrpTest() {
                    return (DaServerConst.CURRENT_STRIPE_SERVICE == DaServerConst.STRIPE_TEST_SERVICE); //// DO NOT CHANGE;
                }
                static get strpKey() {
                    if (DaServerConst.CURRENT_STRIPE_SERVICE == DaServerConst.STRIPE_TEST_SERVICE) { //// DO NOT CHANGE
                        return DaServerConst.STRIPE_TEST_KEY;
                    }
                    else {
                        return DaServerConst.STRIPE_KEY;
                    }
                }
            }
            //-------------------------------------------------------------------------------------------
            // DO NOT CHANGE !!!!!!
            //------------------------------------REALTIME_MANAGER_OPTIONS-------------------------------------------------------
            DaServerConst.WEBSITE_URL = "http://www.allseated.com/";
            DaServerConst.LOCAL_SERVER_URL = "http://localhost:8500/";
            DaServerConst.ALLSEATED_SERVER_URL = "https://www.web.allseated.com/";
            DaServerConst.TEST_SERVER_URL = "https://173.213.225.163/"; // "https://va.allseated.com/";
            DaServerConst.WWW_ROOT = "";
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //
            // ONLY CHANGE THIS
            //
            DaServerConst.CURRENT_SERVER_URL = DaServerConst.ALLSEATED_SERVER_URL;
            //-------------------------------------------------------------------------------------------
            // STRIPE SERVICE !!!!!!
            //-------------------------------------------------------------------------------------------
            DaServerConst.STRIPE_SERVICE = "strpSRVTs.cfc";
            DaServerConst.STRIPE_TEST_SERVICE = "strpTestSRVTs.cfc";
            // ------>>>> CHANGE THIS
            DaServerConst.CURRENT_STRIPE_SERVICE = DaServerConst.STRIPE_TEST_SERVICE;
            // ------>>>> CHANGE THIS - MINIFY
            //public static IS_MINIFY:boolean = false;
            // ------>>>> CHANGE THIS - Full Story Identify
            // No more full story for now
            ////public static IS_FULL_STORY_IDENTIFY:boolean = true;
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            ///// DO NOT TOUCH !!!!!!!!!!
            DaServerConst.STRIPE_KEY = "pk_live_W9JymVRrUaIBSSLCCtfGSQxG"; /// AllSeated - Live///
            DaServerConst.STRIPE_TEST_KEY = "pk_test_ydqNOrujQWpJJRX6CNaDiKdD"; /// AllSeated - Test Data ///
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            // DO NOT CHANGE !!!!!!
            //-------------------------------------------------------------------------------------------
            DaServerConst.ALLSEATED_SERVER_SRV = "allseatedbe/servicests/";
            DaServerConst.ALLSEATED_ADMIN_SERVER_SRV = "AllSeatedAdmin/AdminServicesTs/";
            DaServerConst.PROFILE_PICS_PATH = DaServerConst.CURRENT_SERVER_URL + "asupp/";
            globals.DaServerConst = DaServerConst;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
/// <reference path="DaServerConst.ts" />
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaHallMapsConst {
                constructor() {
                }
                //__________________________________________________________________________________
                static privateCollectionURLByBrandName(iBrandName) {
                    return DaHallMapsConst.PRIVATE_COLLECTIONS_BASE_URL + iBrandName.trim() + "/";
                }
                //__________________________________________________________________________________
                static privateCollectionURL3DByBrandName(iBrandName) {
                    return DaHallMapsConst.PRIVATE_COLLECTIONS_BASE_URL + iBrandName.trim() + "_ts/";
                }
                //__________________________________________________________________________________
                static getCloudURL(iCloudVar) {
                    let aURL = DaHallMapsConst.CLOUD_URL.replace('{cloudinaryVer}', iCloudVar.toString());
                    return aURL;
                }
                //__________________________________________________________________________________
                static fixCloudURL(pURL, iCloudVar, pExt) {
                    pURL = pURL.replace("'." + pExt, "." + pExt);
                    let aNameIndex = pURL.lastIndexOf('/');
                    let aExtIndex = pURL.lastIndexOf('.');
                    let aName = pURL.substring(aNameIndex + 1, aExtIndex);
                    let aBaseURL = pURL.substring(0, aNameIndex + 1);
                    aBaseURL = aBaseURL.replace('{cloudinaryVer}', iCloudVar.toString());
                    if (pExt == "png" || pExt == "jpg" || pExt == "svg") {
                        aBaseURL = aBaseURL.replace(".com/raw/upload/", '.com/image/upload/');
                    }
                    else {
                        aBaseURL = aBaseURL.replace('.com/image/upload/', ".com/raw/upload/");
                    }
                    aName = aName.replace("'", "_");
                    aName = aName.replace("'", "_");
                    aName = aName.replace("'", "_");
                    aName = aName.replace("'", "_");
                    aName = aName.replace(".", "_");
                    aName = aName.replace(",", "_");
                    return aBaseURL + aName + "." + pExt;
                }
            }
            // hall map types
            DaHallMapsConst.HALL_MAP_TEMPLATE = 1;
            DaHallMapsConst.HALL_MAP_VENUE = 2;
            DaHallMapsConst.HALL_MAP_USER = 3;
            DaHallMapsConst.HALL_MAP_CUSTOM = 4;
            DaHallMapsConst.CLOUD_URL = "https://allseated-res.cloudinary.com/image/upload/v{cloudinaryVer}/3Dassets/";
            DaHallMapsConst.CLOUD_CHAIRS_URL = "chairs/";
            DaHallMapsConst.CLOUD_BRANDS_URL = "brends/";
            DaHallMapsConst.CLOUD_AS_LIBRARY_URL = "librarymodels/";
            DaHallMapsConst.CLOUD_TABELS_URL = "tables/";
            DaHallMapsConst.HALL_MAPS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/MapsSVG/";
            DaHallMapsConst.DYNAMIC_OBJECT_URL = globals.DaServerConst.CURRENT_SERVER_URL + "asdos/svg/";
            DaHallMapsConst.DYNAMIC_BRAND_URL = globals.DaServerConst.CURRENT_SERVER_URL;
            DaHallMapsConst.TLAT_MAPS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/TlatMaps/";
            DaHallMapsConst.TLAT_REAL_VIEW_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/RealView/";
            DaHallMapsConst.CORT_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/cort/";
            DaHallMapsConst.CORT_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/cort_ts/";
            DaHallMapsConst.AFR_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/afr/";
            DaHallMapsConst.AFR_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/afr_ts/";
            DaHallMapsConst.AFR_RESIDENTIAL_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/afrresidential/";
            DaHallMapsConst.AFR_RESIDENTIAL_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/afrresidential_ts/";
            DaHallMapsConst.PARTYRENTAL_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/partyrentals/";
            DaHallMapsConst.PARTYRENTAL_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/partyrentals_ts/";
            DaHallMapsConst.FORMDECOR_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/formdecor/";
            DaHallMapsConst.FORMDECOR_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/formdecor_ts/";
            DaHallMapsConst.TWO_0_FOUREVENTS_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/two0fourevents/";
            DaHallMapsConst.TWO_0_FOUREVENTS_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/two0fourevents_ts/";
            DaHallMapsConst.HIGH_STYLE_RENTALS_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/highstylerentals/";
            DaHallMapsConst.HIGH_STYLE_RENTALS_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/highstylerentals_ts/";
            DaHallMapsConst.ARCHIVE_RENTALS_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/archiverentals/";
            DaHallMapsConst.ARCHIVE_RENTALS_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/archiverentals_ts/";
            DaHallMapsConst.BRIGHT_RENTALS_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/brightrentals/";
            DaHallMapsConst.BRIGHT_RENTALS_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/brightrentals_ts/";
            DaHallMapsConst.LOUNGE_APPEAL_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/loungeappeal/";
            DaHallMapsConst.LOUNGE_APPEAL_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/loungeappeal_ts/";
            DaHallMapsConst.SO_COOL_EVENTS_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/socoolevents/";
            DaHallMapsConst.SO_COOL_EVENTS_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/socoolevents_ts/";
            DaHallMapsConst.EPIC_PARTY_TEAM_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/epicpartyteam/";
            DaHallMapsConst.EPIC_PARTY_TEAM_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/epicpartyteam_ts/";
            DaHallMapsConst.LUXE_EVENT_RENTALS_ASSETS_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/luxeeventrentals/";
            DaHallMapsConst.LUXE_EVENT_RENTALS_ASSETS_URL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/luxeeventrentals_ts/";
            DaHallMapsConst.TB_ASSETS_URL_3D = DaHallMapsConst.CLOUD_URL + "TableBuilder/tb/";
            DaHallMapsConst.PRIVATE_COLLECTIONS_BASE_URL = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/";
            DaHallMapsConst.PRIVATE_COLLECTIONS_BASEURL_3D = globals.DaServerConst.CURRENT_SERVER_URL + "AllSeatedHalls/brands/";
            // Linens
            DaHallMapsConst.TB_LINEN_ASSETS = DaHallMapsConst.CLOUD_URL + "TableBuilder/tblinens/";
            // map types
            DaHallMapsConst.HALL_MAP_IMAGE = "HallMapImage";
            DaHallMapsConst.HALL_MAP_PDF = "HallMapPDF";
            DaHallMapsConst.HALL_MAP_SWF = "HallMapSwf";
            globals.DaHallMapsConst = DaHallMapsConst;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaReturnValues {
            }
            //------------------------------
            // Constants
            //------------------------------
            // general
            DaReturnValues.OK = 0;
            // application 10 - 20
            DaReturnValues.VERSION_ERROR = 11;
            // users 20 - 30
            DaReturnValues.USER_ALREADY_EXISTS = 21;
            DaReturnValues.LOGIN_ERROR = 22;
            DaReturnValues.USER_ALREADY_SIGNEDIN = 23;
            // users (-2000) - (-2100)
            DaReturnValues.USER_NOT_ADMIN = -2010;
            DaReturnValues.USER_TYPE_DONT_MATCH = -2020;
            // invites 31 - 35
            DaReturnValues.INVITE_NOT_EXISTS = 31;
            DaReturnValues.INVITE_ALREADY_EXISTS = 32;
            DaReturnValues.ALREADY_ASSIGNED_TO_EVENT = 33;
            // venues (-4000) - (-5000)
            DaReturnValues.VENUE_NOT_FOUND = -4010;
            DaReturnValues.USER_NOT_VENUE = -4020;
            DaReturnValues.DEFAULT_HALL_ERROR = -4030;
            DaReturnValues.VENUE_HALL_NOT_FOUND = -4040;
            DaReturnValues.VENDOR_NOT_ALL_SEATED = -4050;
            // DB errors (-5000) - (-6000)
            DaReturnValues.GENERAL_DB_ERROR = -5010;
            DaReturnValues.RECORD_NOT_FOUND = -5030;
            DaReturnValues.RECORD_ALREADY_EXISTS = -5040;
            // File Server Errors (-5000) - (-6000)
            DaReturnValues.FOLDER_CREATE_ERROR = -6010;
            DaReturnValues.SAVE_MAP_ERROR = -6020;
            DaReturnValues.SAVE_FILE_ERROR = -6030;
            DaReturnValues.SAVE_DO_FILE_ERROR = -6040;
            DaReturnValues.SAVE_TLAT_FILE_ERROR = -6050;
            // Campaigns (-7001) - (-7100) ---->
            DaReturnValues.CREDIT_CODE_NOT_FOUND = -7010;
            // file errors (-110) - (-120)
            DaReturnValues.FILE_NOT_FOUND = -111;
            DaReturnValues.FILE_NOT_EXCEL = -112;
            DaReturnValues.FILE_EXCEL_BAD_FORMAT = -113;
            DaReturnValues.FILE_IMAGE_BAD_FORMAT = -114;
            // session error 130 - 150
            DaReturnValues.OCCASION_SESSION_ID_ERROR = 131;
            DaReturnValues.OCCASION_SESSION_NOT_FOUND = 132;
            DaReturnValues.OCCASION_MULTI_SESSION = 133;
            DaReturnValues.OCCASION_SESSION_ERROR = 134;
            DaReturnValues.USER_SESSION_NOT_FOUND = 135;
            DaReturnValues.USER_MULTI_SESSION = 136;
            DaReturnValues.USER_SESSION_ERROR = 137;
            // general session error 150 - 160
            DaReturnValues.SESSION_ERROR = 151;
            globals.DaReturnValues = DaReturnValues;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaSharedObject {
                constructor() {
                }
            }
            DaSharedObject.SO_LOGIN_NAME = 'AllSeatedLogin';
            DaSharedObject.SO_USERNAME = "Username";
            DaSharedObject.SO_PASSWORD = "password";
            DaSharedObject.SO_REMEMBERME = "RememberMe";
            DaSharedObject.SO_TABLE_SETTINGS = "tablesettings";
            DaSharedObject.SO_CHAIR_SIZES = "CHAIR_SIZES";
            DaSharedObject.SO_TEXTURE_QUALITY_3D = "texture_quality_3d";
            globals.DaSharedObject = DaSharedObject;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaSpType {
                constructor() {
                }
                /****************************
                 * Methods
                 ****************************/
                //_______________________________________________________________________________________________________
                fillFromVO(iVO) {
                    this.mId = iVO.Id;
                    this.mNewId = iVO.NewId;
                    this.mType = iVO.VendorType;
                    this.mIconName = iVO.IconName;
                }
                //_______________________________________________________________________________________________________
                get id() {
                    return this.mId;
                }
                //_______________________________________________________________________________________________________
                get newId() {
                    return this.mNewId;
                }
                //_______________________________________________________________________________________________________
                get type() {
                    return this.mType;
                }
                //_______________________________________________________________________________________________________
                get iconName() {
                    return this.mIconName;
                }
            }
            globals.DaSpType = DaSpType;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaTemplateType {
                constructor() {
                }
                /****************************
                 * Methods
                 ****************************/
                //_______________________________________________________________________________________________________
                fillFromVO(iVO) {
                    this.mId = iVO.Id;
                    this.mType = iVO.TemplateType;
                    this.mFileName = iVO.FileName;
                }
                //_______________________________________________________________________________________________________
                get id() {
                    return this.mId;
                }
                //_______________________________________________________________________________________________________
                get type() {
                    return this.mType;
                }
                //_______________________________________________________________________________________________________
                set type(iVal) {
                    this.mType = iVal;
                }
                //_______________________________________________________________________________________________________
                get fileName() {
                    return this.mFileName;
                }
            }
            globals.DaTemplateType = DaTemplateType;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaUserTypes {
                //_____________________________________________________________________________________
                static getUserTypeNameLowerByUserType(iUserTypeId) {
                    if (iUserTypeId == DaUserTypes.USER_TYPE_VENUE) {
                        return DaUserTypes.VENUE_NAME_LOWER;
                    }
                    else if (iUserTypeId == DaUserTypes.USER_TYPE_VENDOR) {
                        return DaUserTypes.PLANNER_NAME_LOWER;
                    }
                    else if (iUserTypeId == DaUserTypes.USER_TYPE_CATERER) {
                        return DaUserTypes.CATERER_NAME_LOWER;
                    }
                    else if (iUserTypeId == DaUserTypes.USER_TYPE_SP) {
                        return DaUserTypes.VENDOR_NAME_LOWER;
                    }
                    return "";
                }
            }
            //------------------------------
            // Constants
            //------------------------------
            // user types
            DaUserTypes.USER_TYPE_ADMIN = 1;
            DaUserTypes.USER_TYPE_USER = 2;
            DaUserTypes.USER_TYPE_VENUE = 3;
            DaUserTypes.USER_TYPE_VENDOR = 4;
            DaUserTypes.USER_TYPE_CATERER = 9;
            DaUserTypes.USER_TYPE_SP = 10;
            DaUserTypes.USER_TYPE_NEW_VENUE = 5;
            DaUserTypes.USER_TYPE_NEW_PLANNER = 6;
            DaUserTypes.USER_TYPE_NEW_OWNER = 7;
            DaUserTypes.USER_TYPE_NEW_CATERER = 8;
            DaUserTypes.USER_TYPE_NEW_SP = 11;
            DaUserTypes.USER_TYPE_MANAGEMENT = 100;
            DaUserTypes.USER_TYPE_SUPPORT = 101;
            DaUserTypes.USER_TYPE_DEVELOPER = 102;
            DaUserTypes.USER_TYPE_OTHER = 103;
            DaUserTypes.SP_USER_LOWER_ID = 50;
            DaUserTypes.SP_USER_HIGHER_ID = 100;
            DaUserTypes.NEW_SP_USER_LOWER_ID = 500;
            // access types
            DaUserTypes.ACCESS_TYPE_ADMIN = 1;
            DaUserTypes.ACCESS_TYPE_OWNER = 2;
            DaUserTypes.ACCESS_TYPE_USER = 3;
            DaUserTypes.ACCESS_TYPE_SP = 4;
            // access types
            DaUserTypes.ACCESS_TYPE_ADMIN_NAME = "Admin";
            DaUserTypes.ACCESS_TYPE_OWNER_NAME = "Owner";
            DaUserTypes.ACCESS_TYPE_USER_NAME = "User";
            DaUserTypes.ACCESS_TYPE_SP_NAME = "Vendor";
            // vendor types
            DaUserTypes.VENDOR_TYPE_EVENT_PLANNER = 1;
            DaUserTypes.VENDOR_TYPE_EVENT_CATERER = 2;
            // vendor type names
            DaUserTypes.VENUE_NAME_LOWER = "venue";
            DaUserTypes.PLANNER_NAME_LOWER = "event planner";
            DaUserTypes.CATERER_NAME_LOWER = "caterer";
            DaUserTypes.HOST_NAME_LOWER = "host";
            DaUserTypes.VENDOR_NAME_LOWER = "vendor";
            DaUserTypes.ENTOURAGE_NAME_LOWER = "entourage";
            DaUserTypes.VENUE_NAME_UPPER = "Venue";
            DaUserTypes.PLANNER_NAME_UPPER = "Event Planner";
            DaUserTypes.CATERER_NAME_UPPER = "Caterer";
            DaUserTypes.HOST_NAME_UPPER = "Host";
            DaUserTypes.VENDOR_NAME_UPPER = "Vendor";
            DaUserTypes.ENTOURAGE_NAME_UPPER = "Entourage";
            // Additional types for the registration pages
            DaUserTypes.REG_PAGE_FOR_ENTOURAGE_ID = 99991;
            DaUserTypes.REG_PAGE_FOR_TEAM_MEMBER_ID = 99992;
            DaUserTypes.REG_PAGE_FOR_ENTOURAGE_NAME = "Entourage";
            DaUserTypes.REG_PAGE_FOR_TEAM_MEMBER_NAME = "Team member";
            //================
            //// Vendor account user types
            DaUserTypes.ACCOUNT_USER_TYPE_ADMIN_TYPE_ID = 1;
            DaUserTypes.ACCOUNT_USER_TYPE_ADMIN_TYPE = "Admin";
            DaUserTypes.ACCOUNT_USER_TYPE_MEMBER_TYPE_ID = 2;
            DaUserTypes.ACCOUNT_USER_TYPE_MEMBER_TYPE = "User";
            // =============================================================
            DaUserTypes.SP_ICON_PATH = "assets.skins.web.shared.icons.Vendors";
            globals.DaUserTypes = DaUserTypes;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
///<reference path="DaUserTypes.ts"/>
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class DaUserSettings {
                constructor() {
                    // Is new user
                    this.mIsNewUser = false;
                    // did the user enter the Tour
                    this.mIsEnteredTour = 0;
                    this.mIsDontShowTour = 0;
                    // does the vendor have a realview
                    this.mIsHasRealView = 0;
                    // WalkMe Journeys
                    this.mVenueFloorPlanUploadedJourney = 0;
                }
                //___________________________________________________________________________________________________________
                static get userSettingsData() {
                    if (!this.mUserSettingsData) {
                        this.mUserSettingsData = new DaUserSettings();
                    }
                    return this.mUserSettingsData;
                }
                //___________________________________________________________________________________________________________
                parseJson(iUserSettings) {
                    // let aUserSettings: any = JSON.parse(iUserSettingsJson as string);
                    let aUserSettings = iUserSettings;
                    // Default chair types
                    this.mDefaultChairTypeId = (aUserSettings.DefaultChairType) ? aUserSettings.DefaultChairType : globals.DaDefaultValues.CHAIR_DEFAULT_ID;
                    this.mDefaultCeremonyChairTypeId = (aUserSettings.DefaultCeremonyChairType) ? aUserSettings.DefaultCeremonyChairType : globals.DaDefaultValues.CHAIR_DEFAULT_ID;
                    // This is dynamic - for showing new versions windows
                    this.mLockObjectsVersion = (aUserSettings.LockObjectsVersion) ? aUserSettings.LockObjectsVersion : 0;
                    // Is used to show pop-up when share floor plan is clicked first time
                    this.mDoUserKnowHowToShare = (aUserSettings.DoUserKnowHowToShare) ? aUserSettings.DoUserKnowHowToShare : false;
                    this.mSystemUnits = (aUserSettings.SystemUnits) ? aUserSettings.SystemUnits : globals.DaDefaultValues.SYSTEM_UNITS;
                    this.mVenueFloorPlanUploadedJourney = (aUserSettings.VenueFloorPlanUploadedJourney) ? aUserSettings.VenueFloorPlanUploadedJourney : 0;
                }
                //___________________________________________________________________________________________________________
                createJson(iUserType, iJourneySettings) {
                    let UserSettings = new Object();
                    // Default chair type
                    UserSettings.DefaultChairType = this.mDefaultChairTypeId;
                    UserSettings.DefaultCeremonyChairType = this.mDefaultCeremonyChairTypeId;
                    // This is dynamic - for showing new versions windows
                    UserSettings.LockObjectsVersion = this.mLockObjectsVersion;
                    // Is used to show pop-up when share floor plan is clicked first time
                    UserSettings.DoUserKnowHowToShare = this.mDoUserKnowHowToShare;
                    UserSettings.SystemUnits = this.mSystemUnits;
                    if (iUserType == globals.DaUserTypes.USER_TYPE_VENUE) {
                        UserSettings.VenueFloorPlanUploadedJourney = this.mVenueFloorPlanUploadedJourney;
                    }
                    UserSettings.Journeys = iJourneySettings;
                    let aJsonFile = JSON.stringify(UserSettings);
                    return aJsonFile;
                }
                // =======================================
                // Getters and Setters
                // =======================================
                //______________________________________________________________________________________
                get defaultChairTypeId() {
                    return this.mDefaultChairTypeId;
                }
                set defaultChairTypeId(value) {
                    this.mDefaultChairTypeId = value;
                }
                //______________________________________________________________________________________
                get defaultCeremonyChairTypeId() {
                    return this.mDefaultCeremonyChairTypeId;
                }
                set defaultCeremonyChairTypeId(value) {
                    this.mDefaultCeremonyChairTypeId = value;
                }
                //______________________________________________________________________________________
                get isNewUser() {
                    return Boolean(this.mIsNewUser);
                }
                set isNewUser(value) {
                    this.mIsNewUser = Boolean(value);
                }
                //______________________________________________________________________________________
                get isEnteredTour() {
                    return this.mIsEnteredTour;
                }
                set isEnteredTour(value) {
                    this.mIsEnteredTour = value;
                }
                //______________________________________________________________________________________
                get isDontShowTour() {
                    return this.mIsDontShowTour;
                }
                set isDontShowTour(value) {
                    this.mIsDontShowTour = value;
                }
                //______________________________________________________________________________________
                get lockObjectsVersion() {
                    return this.mLockObjectsVersion;
                }
                set lockObjectsVersion(value) {
                    this.mLockObjectsVersion = value;
                }
                //______________________________________________________________________________________
                get userKnowHowToShare() {
                    return this.mDoUserKnowHowToShare;
                }
                set userKnowHowToShare(value) {
                    this.mDoUserKnowHowToShare = value;
                }
                //______________________________________________________________________________________
                get isHasRealView() {
                    return this.mIsHasRealView;
                }
                set isHasRealView(value) {
                    this.mIsHasRealView = value;
                }
                //______________________________________________________________________________________
                get venueFloorPlanUploadedJourney() {
                    return this.mVenueFloorPlanUploadedJourney;
                }
                set venueFloorPlanUploadedJourney(value) {
                    this.mVenueFloorPlanUploadedJourney = value;
                }
                //______________________________________________________________________________________
                get isMetricUnits() {
                    return this.mSystemUnits == globals.DaGlobalConsts.METRIC_UNITS;
                }
                //______________________________________________________________________________________
                set systemUnits(value) {
                    this.mSystemUnits = value;
                }
            }
            globals.DaUserSettings = DaUserSettings;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            var EventManager = asBase.events.EventManager;
            class DeviceChanges {
                //_________________________________________________
                static addDeviceChangesListener() {
                    if (navigator.mediaDevices == null) {
                        console.warn("Can't find media devices.");
                        return;
                    }
                    navigator.mediaDevices.enumerateDevices().then((devices) => this.fillDevicesHash_EventHandler(devices)).catch((err) => this.getDevices_FailedHandler(err));
                    navigator.mediaDevices.ondevicechange = () => this.onDeviceChange_EventHandler();
                }
                //_________________________________________________
                static removeDeviceChangesListener() {
                    if (navigator.mediaDevices == null) {
                        console.warn("Can't find media devices.");
                        return;
                    }
                    navigator.mediaDevices.ondevicechange = null;
                }
                //_________________________________________________
                static onDeviceChange_EventHandler() {
                    if (navigator.mediaDevices == null) {
                        console.warn("Can't find media devices.");
                        return;
                    }
                    navigator.mediaDevices.enumerateDevices().then((devices) => this.getDevices_EventHandler(devices)).catch((err) => this.getDevices_FailedHandler(err));
                }
                //__________________________________________________
                static getDevices_FailedHandler(err) {
                    if (err) {
                        console.log("error getting devices in DeviceChanges:", err);
                    }
                }
                //__________________________________________________________________________________________________________
                static fillDevicesHash_EventHandler(iDevices) {
                    this.mAudioInputArray = [];
                    this.mAudioOutputArray = [];
                    this.mCameraArray = [];
                    iDevices.forEach((aDevice) => {
                        if (aDevice.deviceId != "communications" && aDevice.deviceId != "default") {
                            if (aDevice.kind == "audioinput") {
                                this.mAudioInputArray.push(aDevice);
                            }
                            else if (aDevice.kind == "audiooutput") {
                                this.mAudioOutputArray.push(aDevice);
                            }
                            else if (aDevice.kind == "videoinput") {
                                this.mCameraArray.push(aDevice);
                            }
                        }
                    });
                    globals.ConnectDeviceSettings.NO_MICS = this.mAudioInputArray.length == 0;
                    globals.ConnectDeviceSettings.NO_SPEAKERS = this.mAudioOutputArray.length == 0;
                    globals.ConnectDeviceSettings.NO_CAMERAS = this.mCameraArray.length == 0;
                }
                //__________________________________________________________________________________________________________
                static getDevices_EventHandler(iDevices) {
                    let aInputdevices = [];
                    let aOutputdevices = [];
                    let aCameraDevices = [];
                    let aNewDeviceAdded = false;
                    iDevices.forEach((aDevice) => {
                        //Check if device added
                        if (aDevice.deviceId != "communications" && aDevice.deviceId != "default") {
                            let aFound;
                            if (aDevice.kind == "audioinput") {
                                aFound = this.mAudioInputArray.find(device => device.deviceId == aDevice.deviceId);
                                if (aFound == null) {
                                    globals.ConnectDeviceSettings.NO_MICS = false;
                                    this.mAudioInputArray.push(aDevice);
                                    aNewDeviceAdded = true;
                                    this.sendDeviceChangeEvent(globals.EvDeviceChange.ADDED_ACTION, aDevice, globals.EvDeviceChange.MICROPHONE);
                                }
                                aInputdevices.push(aDevice);
                            }
                            else if (aDevice.kind == "audiooutput") {
                                aFound = this.mAudioOutputArray.find(device => device.deviceId == aDevice.deviceId);
                                if (aFound == null) {
                                    globals.ConnectDeviceSettings.NO_SPEAKERS = false;
                                    this.mAudioOutputArray.push(aDevice);
                                    aNewDeviceAdded = true;
                                    this.sendDeviceChangeEvent(globals.EvDeviceChange.ADDED_ACTION, aDevice, globals.EvDeviceChange.SPEAKER);
                                }
                                aOutputdevices.push(aDevice);
                            }
                            else if (aDevice.kind == "videoinput") {
                                aFound = this.mCameraArray.find(device => device.deviceId == aDevice.deviceId);
                                if (aFound == null) {
                                    this.mCameraArray.push(aDevice);
                                    globals.ConnectDeviceSettings.NO_CAMERAS = false;
                                    aNewDeviceAdded = true;
                                    this.sendDeviceChangeEvent(globals.EvDeviceChange.ADDED_ACTION, aDevice, globals.EvDeviceChange.CAMERA);
                                }
                                aCameraDevices.push(aDevice);
                            }
                        }
                    });
                    if (!aNewDeviceAdded) {
                        //Check if device removed
                        if (this.mAudioInputArray.length > aInputdevices.length) {
                            for (let i = 0; i < this.mAudioInputArray.length; i++) {
                                let aDevice = this.mAudioInputArray[i];
                                let aFound = aInputdevices.find(device => device.groupId == aDevice.groupId);
                                if (aFound == null) {
                                    this.mAudioInputArray.splice(i, 1);
                                    if (this.mAudioInputArray.length == 0) {
                                        globals.ConnectDeviceSettings.NO_MICS = true;
                                        globals.ConnectDeviceSettings.MIC_ID = "";
                                    }
                                    this.sendDeviceChangeEvent(globals.EvDeviceChange.REMOVED_ACTION, aDevice, globals.EvDeviceChange.MICROPHONE);
                                }
                            }
                        }
                        if (this.mAudioOutputArray.length > aOutputdevices.length) {
                            for (let i = 0; i < this.mAudioOutputArray.length; i++) {
                                let aDevice = this.mAudioOutputArray[i];
                                let aFound = aOutputdevices.find(device => device.groupId == aDevice.groupId);
                                if (aFound == null) {
                                    this.mAudioOutputArray.splice(i, 1);
                                    if (this.mAudioOutputArray.length == 0) {
                                        globals.ConnectDeviceSettings.NO_SPEAKERS = true;
                                        globals.ConnectDeviceSettings.SPEAKER_ID = "";
                                    }
                                    this.sendDeviceChangeEvent(globals.EvDeviceChange.REMOVED_ACTION, aDevice, globals.EvDeviceChange.SPEAKER);
                                }
                            }
                        }
                        if (this.mCameraArray.length > aCameraDevices.length) {
                            for (let i = 0; i < this.mCameraArray.length; i++) {
                                let aDevice = this.mCameraArray[i];
                                let aFound = aCameraDevices.find(device => device.groupId == aDevice.groupId);
                                if (aFound == null) {
                                    this.mCameraArray.splice(i, 1);
                                    if (this.mCameraArray.length == 0) {
                                        globals.ConnectDeviceSettings.NO_CAMERAS = true;
                                        globals.ConnectDeviceSettings.CAMERA_ID = "";
                                    }
                                    this.sendDeviceChangeEvent(globals.EvDeviceChange.REMOVED_ACTION, aDevice, globals.EvDeviceChange.CAMERA);
                                }
                            }
                        }
                    }
                }
                //__________________________________________________________________________________________________________
                static sendDeviceChangeEvent(iAction, iDevice, iDeviceType) {
                    let aEvent = new globals.EvDeviceChange(iAction, iDevice, iDeviceType);
                    EventManager.dispatchEvent(globals.EvDeviceChange.MEDIA_DEVICE_CHANGE_DETECTED, this, aEvent);
                }
                /****************************
                 * Getters and Setters
                 ****************************/
                static get audioInputDevices() {
                    if (!this.mAudioInputArray) {
                        console.log("Must call DeviceChanges.addDeviceChangesListener first");
                    }
                    return this.mAudioInputArray;
                }
                //____________________________________________
                static get audioOutputDevices() {
                    if (!this.mAudioOutputArray) {
                        console.log("Must call DeviceChanges.addDeviceChangesListener first");
                    }
                    return this.mAudioOutputArray;
                }
                //____________________________________________
                static get cameraDevices() {
                    if (!this.mCameraArray) {
                        console.log("Must call DeviceChanges.addDeviceChangesListener first");
                    }
                    return this.mCameraArray;
                }
            }
            globals.DeviceChanges = DeviceChanges;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class EvDeviceChange {
                constructor(action, deviceData, deviceType) {
                    this.mDeviceType = deviceType;
                    this.mAction = action;
                    this.mDeviceData = deviceData;
                }
                /****************************
                 * Getters and Setters
                 ****************************/
                get deviceData() {
                    if (this.mDeviceData != null) {
                        return this.mDeviceData;
                    }
                    return null;
                }
                //_________________________________________
                set deviceData(deviceData) {
                    this.mDeviceData = deviceData;
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
                get deviceType() {
                    if (this.mDeviceType != null) {
                        return this.mDeviceType;
                    }
                    return this.mDeviceType;
                }
                //_________________________________________
                set deviceType(value) {
                    this.mDeviceType = value;
                }
                get removedLastMic() {
                    return this.deviceType == EvDeviceChange.MICROPHONE && this.action == EvDeviceChange.REMOVED_ACTION && globals.ConnectDeviceSettings.NO_MICS;
                }
                get removedLastSpeaker() {
                    return this.deviceType == EvDeviceChange.SPEAKER && this.action == EvDeviceChange.REMOVED_ACTION && globals.ConnectDeviceSettings.NO_SPEAKERS;
                }
                get removedLastCamera() {
                    return this.deviceType == EvDeviceChange.CAMERA && this.action == EvDeviceChange.REMOVED_ACTION && globals.ConnectDeviceSettings.NO_CAMERAS;
                }
                get addedFirstMic() {
                    return this.deviceType == EvDeviceChange.MICROPHONE && this.action == EvDeviceChange.ADDED_ACTION && globals.DeviceChanges.audioInputDevices.length == 1;
                }
            }
            EvDeviceChange.MEDIA_DEVICE_CHANGE_DETECTED = "MEDIA_DEVICE_CHANGE_DETECTED";
            EvDeviceChange.ADDED_ACTION = "ADDED_ACTION";
            EvDeviceChange.REMOVED_ACTION = "REMOVED_ACTION";
            EvDeviceChange.MICROPHONE = "MICROPHONE";
            EvDeviceChange.SPEAKER = "SPEAKER";
            EvDeviceChange.CAMERA = "CAMERA";
            globals.EvDeviceChange = EvDeviceChange;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            var DaAttendee = modules.common.exvoattendees.data.DaAttendee;
            var DaUnderDevelopment = asBase.constants.DaUnderDevelopment;
            class GlobalContext {
                //____________________________________________________________________________________________
                static setBaseURL() {
                    // For debug on ronen machine
                    if (document.URL.indexOf("http://allseated") == 0) {
                        //GlobalContext.baseURL = "assets/";
                        // GlobalContext.base3DModelsURL = "assets/";
                    }
                }
                //____________________________________________________________________________________________
                static get liveChannels() {
                    if (GlobalContext.mLiveChannels == null) {
                        GlobalContext.mLiveChannels = {};
                    }
                    return GlobalContext.mLiveChannels;
                }
                //____________________________________________________________________________________________
                static get myChannelNames() {
                    if (GlobalContext.sMyChannelNames == null) {
                        GlobalContext.sMyChannelNames = {};
                    }
                    return GlobalContext.sMyChannelNames;
                }
                //____________________________________________________________________________________________
                static setHybridUrlParams() {
                    let aParam = asBase.Utils.parseURLParams(window.location.href);
                    if (aParam.boothMng == "true") {
                        GlobalContext.sExvoRole = ExvoRole.BOOTH_MANAGER;
                    }
                    if (aParam.objectid != null) {
                        this.sObjectId = aParam.objectid[0];
                    }
                    if (aParam.slow == "true") {
                        DaUnderDevelopment.CAMERA_SPEED_SLOW = true;
                    }
                    if (aParam.newChief == "true" || aParam.chiefMng == "true") {
                        GlobalContext.sExvoRole = ExvoRole.CHIEF_MANAGER;
                    }
                    if (aParam.isSales == "true") {
                        GlobalContext.sExvoRole = ExvoRole.ALLSEATED_SALE;
                    }
                    if (aParam.exvoRole != null) {
                        GlobalContext.sExvoRole = aParam.exvoRole;
                    }
                    if (aParam.instance) {
                        asBase.Globals.sInstanceID = "-" + aParam.instance;
                    }
                }
                //____________________________________________________________________________________________
                static setApprovedEntities(iTags) {
                    for (let i = 0; i < iTags.length; i++) {
                        GlobalContext.sApprovedTags[iTags[i]] = true;
                    }
                }
                //____________________________________________________________________________________________
                static localUserHasTag(iTag) {
                    if (GlobalContext.isChiefMng) {
                        return true;
                    }
                    if (!iTag) {
                        return false;
                    }
                    return GlobalContext.sApprovedTags[iTag];
                }
                static get instanceID() {
                    return asBase.Globals.sInstanceID;
                }
                static get isBoothMng() {
                    return this.sExvoRole == ExvoRole.BOOTH_MANAGER || this.sExvoRole == ExvoRole.STAGE_MANAGER || this.isChiefMng;
                }
                static get isSpeaker() {
                    return this.sExvoRole == ExvoRole.KEYNOTE_SPEAKER;
                }
                static get isPanelist() {
                    return this.sExvoRole == ExvoRole.PANELIST;
                }
                static get isChiefMng() {
                    return this.sExvoRole == ExvoRole.CHIEF_MANAGER || this.isSales;
                }
                static get isDJ() {
                    return this.sExvoRole == ExvoRole.DJ || this.isChiefMng;
                }
                static get isSales() {
                    return this.sExvoRole == ExvoRole.ALLSEATED_SALE;
                }
                static get isAnnouncer() {
                    return this.sExvoRole == ExvoRole.ANNOUNCER;
                }
                static get isAttendee() {
                    return this.sExvoRole == ExvoRole.ATTENDEE;
                }
            }
            GlobalContext.WEB_TYPE = "web";
            GlobalContext.MOBILE_TYPE = "mobile";
            GlobalContext.IOS = "IOS";
            GlobalContext.ANDROID = "ANDROID";
            GlobalContext.appType = GlobalContext.WEB_TYPE;
            GlobalContext.os = GlobalContext.WEB_TYPE; // IOS//
            GlobalContext.isDebug = true;
            GlobalContext.baseURL = modules.common.globals.DaServerConst.CURRENT_SERVER_URL + "allseatedhalls/tlat/assets/";
            GlobalContext.base3DModelsURL = modules.common.globals.DaServerConst.CURRENT_SERVER_URL + "allseatedhalls/tlat/assets/";
            //public static baseURL: string = "./assets/";
            //public static base3DModelsURL: string = "./assets/";
            GlobalContext.isTablet = false;
            GlobalContext.version = "2.00";
            GlobalContext.cacheId = Math.random() * 10000000;
            GlobalContext.isMouseAndKeyBoardControl = true;
            // hall map dimensions
            GlobalContext.HALL_WIDTH = 620; // DO NOT CHANGE THIS !!! it's for old version support.
            GlobalContext.HALL_HEIGHT = 494; // DO NOT CHANGE THIS !!! it's for old version support.
            GlobalContext.FLASH_HTML5_DELTA_X = 620 / 2;
            GlobalContext.FLASH_HTML5_DELTA_Y = 515 / 2;
            GlobalContext.HALL_STAGE_DELTA_Y = 140;
            GlobalContext.HALL_STAGE_DELTA_X = 430;
            GlobalContext.MIN_HALL_WIDTH = 670; // 810;
            GlobalContext.MIN_HALL_HEIGHT = 488;
            GlobalContext.attendeeData = new DaAttendee();
            GlobalContext.sObjectId = "";
            GlobalContext.sApprovedTags = {};
            GlobalContext.isOccasionLocked = false;
            GlobalContext.isExvoModuleLoaded = false;
            GlobalContext.sIsFinishedOnboarding = false;
            GlobalContext.sOccasionId = "";
            globals.GlobalContext = GlobalContext;
            let ExvoRole;
            (function (ExvoRole) {
                ExvoRole[ExvoRole["ATTENDEE"] = 1] = "ATTENDEE";
                ExvoRole[ExvoRole["BOOTH_MANAGER"] = 2] = "BOOTH_MANAGER";
                ExvoRole[ExvoRole["KEYNOTE_SPEAKER"] = 3] = "KEYNOTE_SPEAKER";
                ExvoRole[ExvoRole["STAGE_MANAGER"] = 4] = "STAGE_MANAGER";
                ExvoRole[ExvoRole["PANELIST"] = 5] = "PANELIST";
                ExvoRole[ExvoRole["CHIEF_MANAGER"] = 6] = "CHIEF_MANAGER";
                ExvoRole[ExvoRole["DJ"] = 7] = "DJ";
                ExvoRole[ExvoRole["ALLSEATED_SALE"] = 8] = "ALLSEATED_SALE";
                ExvoRole[ExvoRole["ANNOUNCER"] = 9] = "ANNOUNCER";
            })(ExvoRole = globals.ExvoRole || (globals.ExvoRole = {}));
            class LiveChannelData {
            }
            globals.LiveChannelData = LiveChannelData;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            class GlobalFunc {
            }
            globals.GlobalFunc = GlobalFunc;
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var globals;
        (function (globals) {
            let StreamTypes;
            (function (StreamTypes) {
                StreamTypes["CAM"] = "cam";
                StreamTypes["SCR"] = "scr";
                StreamTypes["AUD"] = "aud";
                StreamTypes["QA"] = "qa";
                StreamTypes["PR"] = "pr";
            })(StreamTypes = globals.StreamTypes || (globals.StreamTypes = {}));
        })(globals = common.globals || (common.globals = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var data;
            (function (data) {
                class Da3DBrandData {
                    constructor() {
                    }
                }
                data.Da3DBrandData = Da3DBrandData;
            })(data = hall3d.data || (hall3d.data = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var data;
            (function (data) {
                class Da3DContent {
                    constructor(pData = null) {
                        if (pData == null) {
                            return;
                        }
                        this.rotation = pData.rotation;
                        this.positionX = pData.positionX;
                        this.positionZ = pData.positionZ;
                        this.positionY = pData.positionY;
                        this.scale = pData.scale;
                        this.url = pData.url;
                        this.type = pData.type;
                        this.name = pData.name;
                        this.type = pData.type;
                    }
                }
                data.Da3DContent = Da3DContent;
            })(data = hall3d.data || (hall3d.data = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
/**
 * Created by RT on 12/01/2015.
 */
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var data;
            (function (data) {
                var DaHallMapsConst = modules.common.globals.DaHallMapsConst;
                class Da3DHallData {
                    constructor(pData = null) {
                        this.mapURL = "Venue/GlassHouseFloor21st"; // Venue/test/
                        this.realViewURL = "";
                        this.mapWidth = -1; // Venue/test/
                        this.mapHeight = -1; // Venue/test/
                        this.univFactor = 1;
                        this.scale = 1;
                        this.rotation = 0;
                        this.locationX = 0;
                        this.locationY = 0;
                        this.isCustomFloorPlan = false;
                        this.chairsType = "4";
                        this.backgroundColor = -1;
                        this.fixCenterOnZ = -100;
                        this.objectsData = new Array();
                        if (pData == null) {
                            return;
                        }
                        this.chairData = pData.chairData;
                        this.chairsType = pData.chairsType;
                        this.univFactor = pData.univFactor;
                        this.mapURL = pData.mapURL;
                        this.realViewURL = pData.realViewURL;
                        if (this.realViewURL != "" && this.realViewURL != null) {
                            this.hallId = pData.hallId;
                            if (this.hallId != 0) {
                                this.realViewURL = DaHallMapsConst.TLAT_REAL_VIEW_URL + pData.hallId;
                            }
                        }
                        this.rotation = pData.rotation;
                        this.locationX = pData.locationX;
                        this.locationY = pData.locationY;
                        this.scale = pData.scale;
                        this.mapWidth = pData.mapWidth;
                        this.mapHeight = pData.mapHeight;
                        this.selectedZones = pData.selectedZones;
                        this.closedAirWalls = pData.closedAirWalls;
                        this.zoneDeltaX = pData.zoneDeltaX;
                        this.zoneDeltaY = pData.zoneDeltaY;
                        this.zoneScale = pData.zoneScale;
                        this.isCustomFloorPlan = pData.isCustomFloorPlan;
                        for (var i = 0; i < pData.objectsData.length; i++) {
                            this.objectsData.push(new data.Da3DLayoutObjectData(pData.objectsData[i]));
                        }
                        this.sceneColor = pData.sceneColor;
                        this.brandURLSHash = pData.brandURLSHash;
                        this.fixCenterOnZ = pData.fixCenterOnZ;
                        this.backgroundColor = pData.backgroundColor;
                        this.cloudVer = pData.cloudVer;
                    }
                    /****************************
                     * Getters and Setters
                     ****************************/
                    //___________________________________________________________________
                    get dataAsJson() {
                        return JSON.stringify(this);
                    }
                }
                data.Da3DHallData = Da3DHallData;
            })(data = hall3d.data || (hall3d.data = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
/**
 * Created by RT on 28/12/2014.
 */
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var data;
            (function (data) {
                class Da3DLayoutObjectData {
                    constructor(pData = null) {
                        this.tableNumber = "?";
                        this.tableName = "?";
                        this.fillColor = 0xffffff;
                        this.texture = "";
                        this.brandData = new hall3d.data.Da3DBrandData();
                        this.isSeatItem = false;
                        this.linenColor = -1;
                        this.linenTile = "";
                        this.linenDensity = 10;
                        this.isVase = false;
                        this.isChair = false;
                        if (pData == null) {
                            return;
                        }
                        this.chairs = pData.chairs;
                        this.hiddenChairsIndexes = pData.hiddenChairsIndexes;
                        this.location = { x: 0, y: 0 };
                        this.rotation = pData.rotation;
                        this.zIndex = this.zIndex;
                        this.zOrderParent = this.zOrderParent;
                        this.width = pData.width;
                        this.height = pData.height;
                        this.length = pData.length;
                        this.guest = pData.guest;
                        this.numOfChairs = pData.numOfChairs;
                        this.type = pData.type;
                        this.attacheData = pData.attacheData;
                        this.tableNumber = pData.tableNumber;
                        this.tableName = pData.tableName;
                        this.fillColor = pData.fillColor;
                        this.texture = pData.texture;
                        this.brandData = pData.brandData;
                        this.connectedTo = pData.connectedTo;
                        this.isTBItem = pData.isTBItem;
                        this.connectedItems = pData.connectedItems;
                        this.isSeatItem = pData.isSeatItem;
                        this.isVase = pData.isVase;
                        this.linenColor = pData.linenColor || -1;
                        this.linenTile = pData.linenTile || "";
                        this.heights = pData.heights;
                        if (this.type == Da3DLayoutObjectData.CHAIRS) {
                            this.attacheData = new data.Da3DObjectChairs(pData.attacheData);
                        }
                        else {
                            this.attacheData = pData.attacheData;
                        }
                        if (pData.tableNumber != null) {
                            this.tableNumber = pData.tableNumber;
                        }
                        if (pData.tableName != null) {
                            this.tableName = pData.tableName;
                        }
                        if (pData.texture != null) {
                            this.texture = pData.texture;
                        }
                    }
                }
                Da3DLayoutObjectData.GUEST = "0";
                Da3DLayoutObjectData.ROUND_TABLE = "1";
                Da3DLayoutObjectData.RECT_TABLE = "2";
                Da3DLayoutObjectData.RECT_STAGE = "3";
                Da3DLayoutObjectData.OVAL_STAGE = "5";
                Da3DLayoutObjectData.CHAIRS = "4";
                Da3DLayoutObjectData.BENCH = "6"; // named :Rustique_Bench_Split
                Da3DLayoutObjectData.TABLE_BUILDER = "8";
                Da3DLayoutObjectData.HALF_ROUND_TABLE = "14";
                Da3DLayoutObjectData.PIPE_AND_DRAPE = "15";
                Da3DLayoutObjectData.AIR_WALL = "16";
                // Type 2 New Furniture 5/5/2019
                Da3DLayoutObjectData.ROUND_TABLE_TYPE_30 = "10001";
                Da3DLayoutObjectData.ROUND_TABLE_TYPE_60 = "10002";
                Da3DLayoutObjectData.ROUND_TABLE_TYPE_90 = "10003";
                Da3DLayoutObjectData.RECT_TABLE_TYPE_2 = "20002";
                Da3DLayoutObjectData.CHAIRS_TYPE_2 = "40002";
                Da3DLayoutObjectData.HALF_ROUND_TABLE_TYPE_90 = "140001";
                Da3DLayoutObjectData.HALF_ROUND_TABLE_TYPE_60 = "140002";
                Da3DLayoutObjectData.ENTITY = "999999";
                data.Da3DLayoutObjectData = Da3DLayoutObjectData;
            })(data = hall3d.data || (hall3d.data = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var data;
            (function (data) {
                class Da3DObjectChairs {
                    constructor(pData = null) {
                        if (pData == null) {
                            return;
                        }
                        this.rows = pData.rows;
                        this.chairs = pData.chairs;
                        this.extraChairs = pData.extraChairs;
                        this.arching = pData.arching;
                        this.chairWidth = pData.chairWidth;
                        this.distanceChairs = pData.distanceChairs;
                        this.fillColor = pData.fillColor;
                        this.chairHeight = pData.chairHeight;
                        this.type = pData.type;
                        this.removeChairs = pData.removeChairs;
                        this.distanceRows = pData.distanceRows;
                        this.chairTypeId = pData.chairTypeId;
                        this.chairData = pData.chairData;
                    }
                }
                data.Da3DObjectChairs = Da3DObjectChairs;
            })(data = hall3d.data || (hall3d.data = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var data;
            (function (data) {
                class DaAvatar3DCostume {
                    constructor() {
                        this.hair = 0;
                        this.glasses = -1;
                        this.outfit = 0;
                        this.outfitTexture = 0;
                    }
                    getSerializeData() {
                        let aRetData = {};
                        aRetData.hair = this.hair;
                        aRetData.glasses = this.glasses;
                        aRetData.outfit = this.outfit;
                        aRetData.outfitTexture = this.outfitTexture;
                        return aRetData;
                    }
                    //________________________________________________________________
                    readFromJson(pData) {
                        this.hair = pData.hair;
                        this.glasses = pData.glasses;
                        this.outfit = pData.outfit;
                        this.outfitTexture = pData.outfitTexture;
                    }
                    //________________________________________________________________
                    setRandom() {
                        this.hair = Math.floor(Math.random() * DaAvatar3DCostume.NUM_HAIR);
                        this.glasses = Math.random() > DaAvatar3DCostume.GLASSES_PERCENTAGE ? -1 : Math.floor(Math.random() * DaAvatar3DCostume.NUM_GLASSES);
                        this.outfit = Math.floor(Math.random() * DaAvatar3DCostume.NUM_OUTFITS);
                        this.outfitTexture = Math.floor(Math.random() * DaAvatar3DCostume.NUM_OUTFIT_TEXTURES);
                    }
                    //________________________________________________________________
                    static getRandom() {
                        let aCostume = new DaAvatar3DCostume();
                        aCostume.setRandom();
                        return aCostume;
                    }
                }
                DaAvatar3DCostume.NUM_HAIR = 5;
                DaAvatar3DCostume.NUM_GLASSES = 2;
                DaAvatar3DCostume.GLASSES_PERCENTAGE = 0.5;
                DaAvatar3DCostume.NUM_OUTFITS = 4;
                DaAvatar3DCostume.NUM_OUTFIT_TEXTURES = 2;
                data.DaAvatar3DCostume = DaAvatar3DCostume;
            })(data = hall3d.data || (hall3d.data = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var data;
            (function (data) {
                class DaHall3DSettings {
                    static setData(pData) {
                        DaHall3DSettings.wallWidth = pData.wallWidth;
                        DaHall3DSettings.separatorLineColor = pData.separatorLineColor;
                        DaHall3DSettings.separatorLineWidth = pData.separatorLineWidth;
                        DaHall3DSettings.skyBox = pData.skyBox;
                        DaHall3DSettings.defaultWallOpacity = pData.defaultWallOpacity;
                        DaHall3DSettings.wallOpacityValues = pData.wallOpacityValues;
                        DaHall3DSettings.loadedFromServer = true;
                        if (pData.minWallHeightPercent != null) {
                            DaHall3DSettings.minWallHeightPercent = pData.minWallHeightPercent / 100;
                        }
                    }
                    //______________________________________________________________________________________
                    static get skyBox() {
                        return DaHall3DSettings.mSkyBox;
                    }
                    static set skyBox(value) {
                        DaHall3DSettings.mSkyBox = value;
                    }
                }
                DaHall3DSettings.wallWidth = 1;
                DaHall3DSettings.separatorLineColor = 0x000000;
                DaHall3DSettings.separatorLineWidth = 0.6;
                DaHall3DSettings.mSkyBox = "blue_sky"; //"newYork_2";
                DaHall3DSettings.defaultWallOpacity = 0.6;
                DaHall3DSettings.wallOpacityValues = [0.2, 0.8, 1];
                DaHall3DSettings.loadedFromServer = false;
                DaHall3DSettings.minWallHeightPercent = 0.001;
                data.DaHall3DSettings = DaHall3DSettings;
            })(data = hall3d.data || (hall3d.data = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var data;
            (function (data) {
                class DaVenue3DData {
                    constructor() {
                        this.m3DFactor = 0.6641;
                        this.data = [];
                        this.WallHeightBlack = 30;
                        this.WallHeightBlue = 1;
                        this.WallHeightGray = 1;
                        this.WallHeightLightBlue = 1;
                        this.WallHeightPink = 1;
                        this.WallHeightPurple = 1;
                        this.mFloorTexture = "floor_2";
                        this.mMapSWF_URL = "";
                    }
                    //__________________________________________________________________________
                    static get venue3DData() {
                        if (DaVenue3DData.mVenue3DData == null) {
                            DaVenue3DData.mVenue3DData = new DaVenue3DData();
                        }
                        return DaVenue3DData.mVenue3DData;
                    }
                    //__________________________________________________________________________
                    readData(pData) {
                        this.asmpData = pData;
                        if (modules.common.globals.GlobalContext.appType == modules.common.globals.GlobalContext.MOBILE_TYPE) {
                            this.univFactor = pData.univFactor;
                        }
                        this.data = pData.data;
                        this.WallHeightBlack = (pData.WallHeightBlack * 6) || 180;
                        this.WallHeightBlue = pData.WallHeightBlue * 6 || 180;
                        this.WallHeightGray = pData.WallHeightGray * 6 || 180;
                        this.WallHeightLightBlue = pData.WallHeightLightBlue * 6 || 180;
                        this.WallHeightPink = pData.WallHeightPink * 6 || 180;
                        this.WallHeightPurple = pData.WallHeightPurple * 6 || 180;
                        this.FloorTexture = pData.FloorTexture;
                        if (pData.skybox != null) {
                            modules.common.hall3d.data.DaHall3DSettings.skyBox = pData.skybox;
                        }
                        else {
                            modules.common.hall3d.data.DaHall3DSettings.skyBox = "blue_sky";
                        }
                    }
                    //__________________________________________________________________________
                    get univFactor() {
                        return this.m3DFactor * DaVenue3DData.BASE_FACTOR;
                    }
                    //__________________________________________________________________________
                    set univFactor(value) {
                        this.m3DFactor = value / DaVenue3DData.BASE_FACTOR;
                    }
                    //__________________________________________________________________________
                    get factor3D() {
                        return this.m3DFactor;
                    }
                    //__________________________________________________________________________
                    set FloorTexture(value) {
                        this.mFloorTexture = value;
                    }
                    get FloorTexture() {
                        return this.mFloorTexture;
                    }
                    //__________________________________________________________________________
                    set mapSwfURL(value) {
                        this.mMapSWF_URL = value;
                    }
                    get mapSwfURL() {
                        return this.mMapSWF_URL;
                    }
                }
                DaVenue3DData.BASE_FACTOR = 1;
                data.DaVenue3DData = DaVenue3DData;
            })(data = hall3d.data || (hall3d.data = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var events;
            (function (events) {
                class EvHall3D {
                }
                EvHall3D.MENU_KEY_PRESS = "menuKeyPress__Event";
                EvHall3D.MENU_KEY_RELEASE = "menuKeyRelease__Event";
                EvHall3D.MENU_KEY_CENTER = "menuKeyCenter__Event";
                EvHall3D.MENU_KEY_ZOOM_RELEASE = "menuKeyZoomRelease__Event";
                EvHall3D.MENU_KEY_ZOOM_PRESS = "menuKeyZoomPress__Event";
                EvHall3D.OPEN_3D_WINDOW = "open3DWindow__Event";
                EvHall3D.CLOSE_3D_WINDOW = "Close3DWindow__Event";
                EvHall3D.SET_FPS_VIEW = "setFPS_view__Event";
                EvHall3D.SET_FPS_VIEW_NO_ANIMATION = "setFPS_view_NoAnimation__Event";
                EvHall3D.SET_FLY_VIEW = "setFly_view__Event";
                EvHall3D.SET_ORTH_VIEW = "setOrth_view__Event";
                EvHall3D.SHOW_TABEL_NUMBER = "showTabelNumber__Event";
                EvHall3D.HIDE_TABEL_NUMBER = "hideTabelNumber__Event";
                EvHall3D.SHOW_WALLS = "showWalls__Event";
                EvHall3D.HIDE_WALLS = "hideWalls__Event";
                EvHall3D.SHOW_OBJECTS = "showObjects__Event";
                EvHall3D.HIDE_OBJECTS = "hideObjects__Event";
                EvHall3D.SHOW_REAL_VIEW = "showRealView__Event";
                EvHall3D.HIDE_REAL_VIEW = "hideRealView__Event";
                EvHall3D.REAL_VIEW_LOADED = "realViewLoaded__Event";
                EvHall3D.DISPLAY_WALLS = "DISPLAY_WALLS__Event";
                EvHall3D.VANISH_WALLS = "VANISH_WALLS__Event";
                EvHall3D.SHOW_BACKGROUND = "SHOW_BACKGROUND__Event";
                EvHall3D.HIDE_BACKGROUND = "HIDE_BACKGROUND__Event";
                EvHall3D.SHOW_HELP = "SHOW_HELP__Event";
                EvHall3D.TAKE_3D_SNAPSHOT = "TAKE_3D_SNAPSHOT__Event";
                EvHall3D.PICTURE_3D_READY = "PICTURE_3D_READY__Event";
                EvHall3D.SHOW_MAPS = "SHOW_MAPS__Event";
                EvHall3D.SHOW_FLOOR = "SHOW_FLOOR__Event";
                EvHall3D.SHOW_CONTENT = "SHOW_CONTENT__Event";
                EvHall3D.SHOW_CONTENTS = "SHOW_CONTENTS__Event";
                EvHall3D.HIDE_CONTENTS = "HIDE_CONTENTS__Event";
                EvHall3D.STOP_SCENE = "stopScene__Event";
                EvHall3D.SET_LOW_TRANSPARENCY = "LOW_TRANSPARENCY__Event";
                EvHall3D.SET_MED_TRANSPARENCY = "MED_TRANSPARENCY__Event";
                EvHall3D.SET_HIGH_TRANSPARENCY = "HIGH_TRANSPARENCY__Event";
                EvHall3D.ROTATE_LEFT = "StartRotateLeft__Event";
                EvHall3D.ROTATE_RIGHT = "StartRotateRight__Event";
                EvHall3D.MOVE_FORWARD = "StartMoveForward__Event";
                EvHall3D.MOVE_BACKWORD = "StartMoveBackward__Event";
                EvHall3D.MOVE_LEFT = "StartMoveLeft__Event";
                EvHall3D.MOVE_RIGHT = "StartMoveRight__Event";
                EvHall3D.ZOOM_IN = "ZoomIn__Event";
                EvHall3D.ZOOM_OUT = "ZoomOut__Event";
                EvHall3D.INTENSITY_CHANGE = "INTENSITY_CHANGE";
                EvHall3D.COLOR_CHANGE = "COLOR_CHANGE";
                EvHall3D.CORDINATE_CHANGE = "CORDINATE_CHANGE";
                EvHall3D.LIGHT_ON_OFF_CLICK = "LIGHT_ON_OFF_CLICK";
                EvHall3D.ENABLE_CHNAGE_CORDINATE_CLICK = "ENABLE_CHNAGE_CORDINATE_CLICK";
                EvHall3D.RESET = "reset__Event";
                //light tempates
                EvHall3D.CHANGE_TEMPLATE = 'CHANGE_TEMPLATE';
                EvHall3D.CHANGE_BACKGROUND_COLOR = 'CHANGE_BACKGROUND_COLOR';
                EvHall3D.INIT_BACKGROUND_COLOR = 'INIT_BACKGROUND_COLOR';
                EvHall3D.SHOW_REALVIEW_ELECTRICITY_EV = "SHOW_REALVIEW_ELECTRICITY_EV";
                EvHall3D.HIDE_REALVIEW_ELECTRICITY_EV = "HIDE_REALVIEW_ELECTRICITY_EV";
                EvHall3D.SHOW_REALVIEW_EXITS_EV = "SHOW_REALVIEW_EXITS_EV";
                EvHall3D.HIDE_REALVIEW_EXITS_EV = "HIDE_REALVIEW_EXITS_EV";
                EvHall3D.DISABLE_KEYBOARD = "DISABLE_KEYBOARD";
                events.EvHall3D = EvHall3D;
            })(events = hall3d.events || (hall3d.events = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var hall3d;
        (function (hall3d) {
            var events;
            (function (events) {
                class FuncHall3D {
                }
                FuncHall3D.GET_ELEMENTS_UNDER_MOUSE_FUNC = "GET_ELEMENTS_UNDER_MOUSE_FUNC";
                FuncHall3D.GET_IS_MOVING_FUNC = "GET_IS_MOVING_FUNC";
                events.FuncHall3D = FuncHall3D;
            })(events = hall3d.events || (hall3d.events = {}));
        })(hall3d = common.hall3d || (common.hall3d = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var login;
        (function (login) {
            var data;
            (function (data) {
                class DaLogin {
                }
                data.DaLogin = DaLogin;
            })(data = login.data || (login.data = {}));
        })(login = common.login || (common.login = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
///<reference path="../../globals/DaUserTypes.ts"/>
///<reference path="../../../../../../node_modules/@types/asBase.d.ts"/>
var modules;
(function (modules) {
    var common;
    (function (common) {
        var login;
        (function (login) {
            var data;
            (function (data) {
                var DaUserTypes = modules.common.globals.DaUserTypes;
                class DaUserDetails {
                    constructor() {
                        this.mIsVenueAdmin = false;
                        this.mCurrentCountry = "";
                        this.mCurrentState = "";
                        this.mRegVersion = -1;
                        this.mIsAnsweredConnectSurvey = 0;
                    }
                    //_______________________________________________________________________________________
                    get userId() {
                        return this.mUserId;
                    }
                    set userId(value) {
                        if (value != null) {
                            asBase.entity.EntityManager.instance.uniqueId = value.toString();
                        }
                        this.mUserId = value;
                    }
                    //_________________________________________________________________________________________________
                    get username() {
                        return this.mUsername;
                    }
                    set username(value) {
                        this.mUsername = value;
                    }
                    //_________________________________________________________________________________________________
                    get password() {
                        return this.mPassword;
                    }
                    set password(value) {
                        this.mPassword = value;
                    }
                    //_________________________________________________________________________________________________
                    get userType() {
                        return this.mUserType;
                    }
                    set userType(value) {
                        this.mUserType = value;
                    }
                    //_______________________________________________________________________________________________________
                    get spType() {
                        return this.mSpType;
                    }
                    set spType(value) {
                        this.mSpType = value;
                    }
                    //_______________________________________________________________________________________________________
                    get realUserType() {
                        return this.mRealUserType;
                    }
                    set realUserType(value) {
                        this.mRealUserType = value;
                    }
                    //_________________________________________________________________________________________________
                    get facebookId() {
                        return this.mFacebookId;
                    }
                    //_________________________________________________________________________________________________
                    get firstName() {
                        return this.mFirstName;
                    }
                    set firstName(value) {
                        this.mFirstName = value;
                    }
                    //_________________________________________________________________________________________________
                    get lastName() {
                        return this.mLastName;
                    }
                    set lastName(value) {
                        this.mLastName = value;
                    }
                    //_________________________________________________________________________________________________
                    get fullName() {
                        return this.firstName + " " + this.lastName;
                    }
                    //_______________________________________________________________________________
                    get mobilePhone() {
                        return this.mMobilePhone;
                    }
                    set mobilePhone(value) {
                        this.mMobilePhone = value;
                    }
                    //_______________________________________________________________________________
                    get officePhone() {
                        return this.mOfficePhone;
                    }
                    set officePhone(value) {
                        this.mOfficePhone = value;
                    }
                    //_______________________________________________________________________________
                    get officeExt() {
                        return this.mOfficeExt;
                    }
                    set officeExt(value) {
                        this.mOfficeExt = value;
                    }
                    //_______________________________________________________________________________
                    get role() {
                        return this.mRole;
                    }
                    set role(value) {
                        this.mRole = value;
                    }
                    //_________________________________________________________________________________________________
                    get isPic() {
                        return this.mIsPic;
                    }
                    set isPic(value) {
                        this.mIsPic = value;
                    }
                    //_________________________________________________________________________________________________
                    get venueId() {
                        return this.mVenueId;
                    }
                    set venueId(value) {
                        this.mVenueId = value;
                    }
                    //_________________________________________________________________________________________________
                    get isVenueAdmin() {
                        return this.mIsVenueAdmin;
                    }
                    set isVenueAdmin(value) {
                        this.mIsVenueAdmin = value;
                    }
                    //____________________________________________________________________________________________
                    get isFirstLogin() {
                        return this.mIsFirstLogin;
                    }
                    set isFirstLogin(value) {
                        this.mIsFirstLogin = value;
                    }
                    //____________________________________________________________________________________________
                    get userStatus() {
                        return this.mUserStatus;
                    }
                    set userStatus(value) {
                        this.mUserStatus = value;
                    }
                    //____________________________________________________________________________________________
                    get accessType() {
                        return this.mAccessType;
                    }
                    set accessType(value) {
                        this.mAccessType = value;
                    }
                    //____________________________________________________________________________________________
                    get inviteUID() {
                        return this.mInviteUID;
                    }
                    set inviteUID(value) {
                        this.mInviteUID = value;
                    }
                    //____________________________________________________________________________________________
                    get isUserOwner() {
                        return this.mAccessType == DaUserTypes.ACCESS_TYPE_OWNER;
                    }
                    //____________________________________________________________________________________________
                    get profilePictureUrl() {
                        return this.mProfilePictureUrl;
                    }
                    set profilePictureUrl(value) {
                        this.mProfilePictureUrl = value;
                    }
                    //____________________________________________________________________________________________
                    get promoCode() {
                        return this.mPromoCode;
                    }
                    set promoCode(value) {
                        this.mPromoCode = value;
                    }
                    //____________________________________________________________________________________________
                    get tosVersion() {
                        return this.mTosVersion;
                    }
                    set tosVersion(value) {
                        this.mTosVersion = value;
                    }
                    //____________________________________________________________________________________________
                    get isTesting() {
                        return this.mIsTesting;
                    }
                    set isTesting(value) {
                        this.mIsTesting = value;
                    }
                    //____________________________________________________________________________________________
                    get source() {
                        return this.mSource;
                    }
                    set source(value) {
                        this.mSource = value;
                    }
                    //___________________________________________________________________________________
                    get userSessionId() {
                        return (this.mUserSessionId) ? this.mUserSessionId : "";
                    }
                    set userSessionId(value) {
                        this.mUserSessionId = value;
                    }
                    //___________________________________________________________________________________
                    get currentIp() {
                        return this.mCurrentIp;
                    }
                    set currentIp(value) {
                        this.mCurrentIp = value;
                    }
                    //___________________________________________________________________________________
                    get currentCountry() {
                        return this.mCurrentCountry;
                    }
                    set currentCountry(value) {
                        this.mCurrentCountry = value;
                    }
                    //___________________________________________________________________________________
                    get currentState() {
                        return this.mCurrentState;
                    }
                    set currentState(value) {
                        this.mCurrentState = value;
                    }
                    //___________________________________________________________________________________
                    get regVersion() {
                        return this.mRegVersion;
                    }
                    set regVersion(value) {
                        this.mRegVersion = value;
                    }
                    //___________________________________________________________________________________
                    get checkIn() {
                        return this.mCheckin;
                    }
                    set checkIn(value) {
                        this.mCheckin = value;
                    }
                    //___________________________________________________________________________________
                    get isAnsweredConnectSurvey() {
                        return this.mIsAnsweredConnectSurvey;
                    }
                    set isAnsweredConnectSurvey(value) {
                        this.mIsAnsweredConnectSurvey = value;
                    }
                }
                data.DaUserDetails = DaUserDetails;
            })(data = login.data || (login.data = {}));
        })(login = common.login || (common.login = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var login;
        (function (login) {
            var events;
            (function (events) {
                class EvLogin {
                }
                EvLogin.LOGIN_VALID = 'LoginValid__Event';
                EvLogin.FORGOT_PASSWORD = 'ForgotPassword__Event';
                events.EvLogin = EvLogin;
            })(events = login.events || (login.events = {}));
        })(login = common.login || (common.login = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var register;
        (function (register) {
            var data;
            (function (data) {
                class DaRegister {
                }
                data.DaRegister = DaRegister;
            })(data = register.data || (register.data = {}));
        })(register = common.register || (common.register = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var register;
        (function (register) {
            var events;
            (function (events) {
                class EvRegister {
                }
                events.EvRegister = EvRegister;
            })(events = register.events || (register.events = {}));
        })(register = common.register || (common.register = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class ExvoRoleTypeVO {
                constructor() {
                }
            }
            servicevo.ExvoRoleTypeVO = ExvoRoleTypeVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class InviteVO {
                constructor() {
                    this.InviteStatus = -100;
                    this.IsVenueAdmin = false;
                    this.SfLeadId = "";
                    this.Language = "";
                    this.IsInviteSP = 0;
                    this.IUID = "";
                    this.SfLeadId = "";
                    this.DBError = new servicevo.ServerErrorVO();
                    this.UserSession = new servicevo.UserSessionVO();
                    this.Language = "";
                }
            }
            servicevo.InviteVO = InviteVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class LoginByTokenVO {
                constructor() {
                }
            }
            servicevo.LoginByTokenVO = LoginByTokenVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class LoginVO {
                constructor() {
                    this.IsDeleteSfLead = 0;
                    this.InviteData = new servicevo.InviteVO();
                }
            }
            servicevo.LoginVO = LoginVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class NewPasswordVO {
                constructor() {
                }
            }
            servicevo.NewPasswordVO = NewPasswordVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class OccasionSessionVO {
                constructor() {
                    this.UserId = 0;
                    this.OccasionId = 0;
                    this.SessionId = "";
                    this.IsReadOnly = 0;
                    this.AppVersion = "";
                    this.DBError = new servicevo.ServerErrorVO();
                }
                //____________________________________________________________________________________
                clearData() {
                    this.UserId = -1;
                    this.OccasionId = -1;
                    this.SessionId = "";
                    this.IsReadOnly = 0;
                    //this.AppVersion = DaApp.APP_VERSION;
                    //if (this.DBError)
                    //	this.DBError.clearData();
                }
            }
            servicevo.OccasionSessionVO = OccasionSessionVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class OfflineRegistrationRVO {
                constructor() {
                }
            }
            servicevo.OfflineRegistrationRVO = OfflineRegistrationRVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class ServerErrorVO {
                constructor() {
                    this.IsError = -1;
                    this.ErrorCode = -1;
                    this.ErrorMessage = "";
                    this.DBDetails = "";
                }
                //___________________________________________________________________________________________________________
                clearData() {
                    this.IsError = 0;
                    this.ErrorCode = 0;
                    this.ErrorMessage = "";
                    this.DBDetails = "";
                }
            }
            servicevo.ServerErrorVO = ServerErrorVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class TemplateTypeVO {
                constructor() {
                }
            }
            servicevo.TemplateTypeVO = TemplateTypeVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class UpdateOfflineAsRegisteredRVO {
                constructor() {
                }
            }
            servicevo.UpdateOfflineAsRegisteredRVO = UpdateOfflineAsRegisteredRVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class UserAndOccasionSessionsRVO {
                constructor() {
                }
            }
            servicevo.UserAndOccasionSessionsRVO = UserAndOccasionSessionsRVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class UserContactVO {
                constructor() {
                    this.Id = 0;
                    this.UserType = 0;
                    this.FirstName = "";
                    this.LastName = "";
                    this.Email = "";
                    this.Mobile = "";
                    this.Office = "";
                    this.Ext = "";
                    this.IsPic = 0;
                    this.VendorName = "";
                }
            }
            servicevo.UserContactVO = UserContactVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class usergeolocationVO {
                constructor() {
                }
            }
            servicevo.usergeolocationVO = usergeolocationVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
///<reference path="ServerErrorVO.ts"/>
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class UserSessionVO {
                constructor() {
                    this.UserId = -1;
                    this.SessionId = "";
                    this.DBError = new servicevo.ServerErrorVO();
                }
                //____________________________________________________________________________________
                clearData() {
                    this.UserId = -1;
                    this.SessionId = "";
                    if (this.DBError)
                        this.DBError.clearData();
                }
            }
            servicevo.UserSessionVO = UserSessionVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class UserVO {
                constructor() {
                    this.Id = -1;
                    this.UserName = "";
                    this.Password = "";
                    this.UserType = -1;
                    this.FirstName = "";
                    this.LastName = "";
                    this.Mobile = "";
                    this.Office = "";
                    this.Ext = "";
                    this.IsPic = 0;
                    this.Role = "";
                    this.IsNewUser = -1;
                    this.VenueRef = -1;
                    this.IsVenueAdmin = -1;
                    this.IsLoggedIn = -1;
                    this.IsActive = -1;
                    this.CurrentIp = "";
                    this.PromoCode = "";
                    this.TosVersion = "";
                    this.IsTesting = 0;
                    this.ProfilePicUrl = "";
                    this.Source = 0;
                    this.MobileVersion = "";
                    this.IOSAppLink = "";
                    this.AccessType = -1;
                    this.InviteUID = "";
                    this.UserStatus = -1;
                    this.GeoLocation = [];
                    this.RegVersion = -1;
                    this.IsAnsweredConnectSurvey = 0;
                    this.ServerError = new servicevo.ServerErrorVO();
                    this.UserSession = new servicevo.UserSessionVO();
                }
            }
            servicevo.UserVO = UserVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class VendorTypeVO {
                constructor() {
                }
            }
            servicevo.VendorTypeVO = VendorTypeVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var common;
    (function (common) {
        var servicevo;
        (function (servicevo) {
            class VenueDetailsVO {
                constructor() {
                    this.VendorAdminContact = new servicevo.UserContactVO();
                    this.DBError = new servicevo.ServerErrorVO();
                }
            }
            servicevo.VenueDetailsVO = VenueDetailsVO;
        })(servicevo = common.servicevo || (common.servicevo = {}));
    })(common = modules.common || (modules.common = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var data;
    (function (data) {
        var avatar;
        (function (avatar) {
            class DaAvatarHighFrequencyData extends asBase.entity.DaEntityBase {
                constructor() {
                    super();
                    this.mType = avatar.DaAvatarRegularData.ENTITY_TYPE;
                    this.setPosition(0, 0, 0);
                    this.setRotation(0, 0, 0);
                }
                //_____________________________________________________________
                getSerializeData() {
                    let aRetData = super.getSerializeData(true);
                    if (this.mPosition != null) {
                        aRetData.position = this.mPosition;
                        aRetData.cx = Math.floor(this.mPosition.x / asBase.entity.grid.GridManager.instance.univCellSize) + asBase.entity.grid.GridManager.GRID_HALF_SIZE;
                        aRetData.cy = Math.floor(this.mPosition.z / asBase.entity.grid.GridManager.instance.univCellSize) + asBase.entity.grid.GridManager.GRID_HALF_SIZE;
                    }
                    if (this.mRotation != null) {
                        aRetData.rotation = this.mRotation;
                    }
                    return aRetData;
                }
                //_____________________________________________________________
                readFromJson(pData) {
                    super.readFromJson(pData);
                    if (pData.position != null) {
                        this.mPosition = pData.position;
                    }
                    if (pData.rotation != null) {
                        this.mRotation = pData.rotation;
                    }
                }
                //______________________________________________________________
                setPosition(pX, pY, pZ) {
                    this.mPosition = { x: pX, y: pY, z: pZ };
                }
                //______________________________________________________________
                setRotation(pX, pY, pZ) {
                    this.mRotation = { x: pX, y: pY, z: pZ };
                }
                get position() {
                    return this.mPosition;
                }
                get rotation() {
                    return this.mRotation;
                }
            }
            avatar.DaAvatarHighFrequencyData = DaAvatarHighFrequencyData;
        })(avatar = data.avatar || (data.avatar = {}));
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));
///<reference path="../../../../../node_modules/@types/asBase.d.ts"/>
var modules;
(function (modules) {
    var data;
    (function (data) {
        var avatar;
        (function (avatar) {
            let AvatarState;
            (function (AvatarState) {
                AvatarState[AvatarState["STATE_2D"] = 0] = "STATE_2D";
                AvatarState[AvatarState["FLY"] = 1] = "FLY";
                AvatarState[AvatarState["FIRST_PERSON"] = 2] = "FIRST_PERSON";
            })(AvatarState = avatar.AvatarState || (avatar.AvatarState = {}));
            class DaAvatarRegularData extends asBase.entity.DaEntityBase {
                constructor() {
                    super();
                    this.mColor = DaAvatarRegularData.DEFAULT_COLOR;
                    this.mFollowMe = false;
                    this.mGesture = "Idle2";
                    this.mMeetingID = null;
                    this.mType = DaAvatarRegularData.ENTITY_TYPE;
                    this.mIsToAddToGrid = true;
                    this.mCostume = new modules.data.avatar.DaCostume();
                }
                //_____________________________________________________________
                getSerializeData() {
                    let aRetData = super.getSerializeData(true);
                    if (this.mFirstName != null) {
                        aRetData.firstName = this.mFirstName;
                    }
                    if (this.mLastName != null) {
                        aRetData.lastName = this.mLastName;
                    }
                    if (this.mCompanyName != null) {
                        aRetData.companyName = this.mCompanyName;
                    }
                    if (this.mState != null) {
                        aRetData.state = this.mState;
                    }
                    if (this.mColor != null) {
                        aRetData.color = this.mColor;
                    }
                    if (this.mCostume != null) {
                        aRetData.costume = this.mCostume.getSerializeData();
                    }
                    if (this.mGesture != null) {
                        aRetData.gesture = this.mGesture;
                    }
                    if (this.mFollowMe != null) {
                        aRetData.followMe = this.mFollowMe;
                    }
                    if (this.mFollowID != null) {
                        aRetData.followID = this.mFollowID;
                    }
                    if (this.mProfilePicUrl != null) {
                        aRetData.profilePicUrl = this.mProfilePicUrl;
                    }
                    if (this.mLogoUrl != null) {
                        aRetData.logoUrl = this.mLogoUrl;
                    }
                    if (this.mMeetingID != null) {
                        aRetData.meetingID = this.mMeetingID;
                    }
                    if (this.mIsBusy != null) {
                        aRetData.isBusy = this.mIsBusy;
                    }
                    return aRetData;
                }
                //_____________________________________________________________
                readFromJson(pData) {
                    if (pData.firstName != null) {
                        this.mFirstName = pData.firstName;
                    }
                    if (pData.lastName != null) {
                        this.mLastName = pData.lastName;
                    }
                    if (pData.companyName != null) {
                        this.mCompanyName = pData.companyName;
                    }
                    if (pData.state != null) {
                        this.mState = pData.state;
                    }
                    if (pData.color != null) {
                        this.mColor = pData.color;
                    }
                    if (pData.costume != null) {
                        if (this.mCostume == null) {
                            this.mCostume = new avatar.DaCostume();
                        }
                        this.mCostume.readFromJson(pData.costume);
                    }
                    if (pData.gesture != null) {
                        this.mGesture = pData.gesture;
                    }
                    if (pData.followMe != null) {
                        this.mFollowMe = pData.followMe;
                    }
                    if (pData.followID != null) {
                        this.mFollowID = pData.followID;
                    }
                    if (pData.profilePicUrl != null) {
                        this.mProfilePicUrl = pData.profilePicUrl;
                    }
                    if (pData.logoUrl != null) {
                        this.mLogoUrl = pData.logoUrl;
                    }
                    if (pData.meetingID != null) {
                        this.mMeetingID = pData.meetingID;
                    }
                    if (pData.isBusy != null) {
                        this.mIsBusy = pData.isBusy;
                    }
                    super.readFromJson(pData);
                }
                //________________________________________________________________
                get costume() {
                    if (this.mCostume == null) {
                        this.mCostume = new avatar.DaCostume();
                    }
                    return this.mCostume;
                }
                //_________________________________________________________________
                get firstName() {
                    return this.mFirstName;
                }
                set firstName(pFirstName) {
                    this.mFirstName = pFirstName;
                }
                //_________________________________________________________________
                get lastName() {
                    return this.mLastName;
                }
                set lastName(pLastName) {
                    this.mLastName = pLastName;
                }
                //_____________________________________________________________
                get companyName() {
                    return this.mCompanyName;
                }
                set companyName(pCompanyName) {
                    this.mCompanyName = pCompanyName;
                }
                //_____________________________________________________________
                get fullName() {
                    if (!this.lastName || this.lastName == "") {
                        return this.firstName;
                    }
                    return this.firstName + " " + this.lastName;
                }
                //_____________________________________________________________
                get fullNameWithCompany() {
                    if (!this.companyName) {
                        return this.fullName;
                    }
                    return this.fullName + "\n" + this.companyName;
                }
                //_____________________________________________________________
                get activeArea() {
                    return (this.mActiveArea);
                }
                //_________________________________________________________________
                get state() {
                    return this.mState;
                }
                set state(pState) {
                    this.mState = pState;
                }
                get gesture() {
                    return this.mGesture;
                }
                set gesture(pGesture) {
                    this.mGesture = pGesture;
                }
                get followMe() {
                    return this.mFollowMe;
                }
                set followMe(pFollowMe) {
                    this.mFollowMe = pFollowMe;
                }
                get followID() {
                    return this.mFollowID;
                }
                set followID(pFollowMe) {
                    this.mFollowID = pFollowMe;
                }
                get profilePicUrl() {
                    return this.mProfilePicUrl;
                }
                set profilePicUrl(pUrl) {
                    this.mProfilePicUrl = pUrl;
                }
                get logoUrl() {
                    return this.mLogoUrl;
                }
                set logoUrl(pUrl) {
                    this.mLogoUrl = pUrl;
                }
                get meetingID() {
                    return this.mMeetingID;
                }
                set meetingID(pID) {
                    this.mMeetingID = pID;
                }
                get color() {
                    return this.mColor;
                }
                set color(iColor) {
                    this.mColor = iColor;
                }
                get isBusy() {
                    return this.mIsBusy;
                }
                set isBusy(iBusy) {
                    this.mIsBusy = iBusy;
                }
                get isInMeeting() {
                    return this.meetingID && this.meetingID != "";
                }
            }
            DaAvatarRegularData.ENTITY_TYPE = "entities.avatar.AvatarEntity";
            DaAvatarRegularData.DEFAULT_COLOR = 0xFDFDFD;
            avatar.DaAvatarRegularData = DaAvatarRegularData;
        })(avatar = data.avatar || (data.avatar = {}));
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var data;
    (function (data) {
        var avatar;
        (function (avatar) {
            class DaCostume {
                constructor(pData = null) {
                    this.modelName = "man";
                    this.bodyColor = 0;
                    this.shirtColor = 0;
                    this.suitColor = 0;
                    this.isWithHair = false;
                }
                getSerializeData() {
                    let aRetData = {};
                    aRetData.modelName = this.modelName;
                    aRetData.bodyColor = this.bodyColor;
                    aRetData.shirtColor = this.shirtColor;
                    aRetData.suitColor = this.suitColor;
                    aRetData.isWithHair = this.isWithHair;
                    return aRetData;
                }
                //________________________________________________________________
                readFromJson(pData) {
                    this.modelName = pData.modelName;
                    this.bodyColor = pData.bodyColor;
                    this.shirtColor = pData.shirtColor;
                    this.suitColor = pData.suitColor;
                    this.isWithHair = pData.isWithHair;
                }
                setRandom() {
                    //let aNames = ["robot-30.asgl"];
                    let aNames = ["AvatarV3.asgl"];
                    let aColorBank = [0xffffff];
                    //let aColorBank = [0xcca7a7, 0x0ccb3a7, 0xccbba7, 0xccc8a7, 0xa9cca7, 0xa7ccb3, 0xa7ccc3, 0xa7cccc, 0xa7becc, 0xa7b5cc, 0xaea7cc, 0xbca7cc, 0xcaa7cc, 0xcca7bf, 0xcca7b1, 0xcca7a7,0xffffff];
                    this.modelName = aNames[Math.floor(Math.random() * aNames.length)];
                    this.bodyColor = aColorBank[Math.floor(Math.random() * aColorBank.length)];
                    this.shirtColor = aColorBank[Math.floor(Math.random() * aColorBank.length)];
                    this.suitColor = aColorBank[Math.floor(Math.random() * aColorBank.length)];
                    this.isWithHair = Math.random() > 0.5;
                    return;
                }
            }
            DaCostume.BASE_URL = "https://allseated-res.cloudinary.com/raw/upload/v1/3Dassets/avatars/";
            avatar.DaCostume = DaCostume;
        })(avatar = data.avatar || (data.avatar = {}));
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var data;
    (function (data) {
        var avatar;
        (function (avatar) {
            var events;
            (function (events) {
                class EvMe {
                }
                EvMe.UPDATE_MY_TRANSFORM = "UPDATE_MY_TRANSFORM";
                EvMe.UPDATE_MY_STATE = "UPDATE_MY_STATE";
                EvMe.UPDATE_MY_DATA = "UPDATE_MY_DATA";
                EvMe.UPDATE_MY_FOLLOW_ID = "UPDATE_MY_FOLLOW_ID";
                EvMe.UPDATE_MY_COLOR = "UPDATE_MY_COLOR";
                EvMe.UPDATE_IS_BUSY = "EVME_UPDATE_IS_BUSY";
                EvMe.UPDATE_MEETING_ID = "EVME_UPDATE_MEETING_ID";
                events.EvMe = EvMe;
            })(events = avatar.events || (avatar.events = {}));
        })(avatar = data.avatar || (data.avatar = {}));
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var data;
    (function (data) {
        class DaExvoFiles {
            static get mapFolderRaw() {
                return `https://allseated-res.cloudinary.com/raw/upload/v${DaExvoFiles.VERSION}/exVo/Occasions`;
            }
            static get mapFolderImage() {
                return `https://allseated-res.cloudinary.com/image/upload/v${DaExvoFiles.VERSION}/exVo/Occasions`;
            }
        }
        DaExvoFiles.VERSION = 9;
        DaExvoFiles.sLiveChatGroupsVersion = 7;
        DaExvoFiles.CELL_MAP_FILENAME = "cellMap.json";
        DaExvoFiles.CELL_MAP_SETTINGS_FILENAME = "cellMapSettings.json";
        DaExvoFiles.RADAR_PICTURE_FILENAME = "radar.png";
        DaExvoFiles.RADAR_JSON_FILENAME = "radar.json";
        data.DaExvoFiles = DaExvoFiles;
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var data;
    (function (data) {
        class DaGlobal {
            constructor() {
                //------------------------------
                // Members
                //------------------------------
                this.mFlashParamIUID = "";
                this.mFlashParamType = "";
                // Login Data
                this.mIsNewUser = false;
                this.mIsNewVendor = false;
                // Invite data
                this.mIsInvite = false;
                this.mIsPlannerInvite = false;
                this.mIsCatererInvite = false;
                this.mAcceptInviteType = DaGlobal.ACCEPT_INVITE_NONE;
                this.mAcceptInviteAction = DaGlobal.ACCEPT_INVITE_NONE;
                this.mIsEntourage = "";
                this.mFlashParamResetPassword = "";
                this.mIsResetPassword = false;
                this.mServiceProviderInviteID = -1;
                // Referral
                this.mReferral = 0;
            }
            // get the singelton
            //___________________________________________________________________________________
            static loadConfig() {
                var script = document.createElement('script');
                script.onload = function () {
                    ///console.log("chairsVersion = " + modules.data.DaGlobal.asConfig.chairsVersion);
                };
                script.src = "config.js?r=" + Date.now();
                document.head.appendChild(script);
            }
            //___________________________________________________________________________________
            static get globalData() {
                if (!this.mGlobalData) {
                    this.mGlobalData = new DaGlobal();
                    this.globalData.acceptInviteType = "";
                }
                return this.mGlobalData;
            }
            //___________________________________________________________________________________
            resetOfflineRegistration() {
                this.mIsOfflineRegistration = false;
                this.mOfflineRegistrationVO = null;
            }
            /****************************
             * Getters and Setters
             ****************************/
            //___________________________________________________________________________________
            get flashParamIUID() {
                return this.mFlashParamIUID;
            }
            set flashParamIUID(value) {
                this.mFlashParamIUID = value;
            }
            //___________________________________________________________________________________
            get flashParamType() {
                return this.mFlashParamType;
            }
            set flashParamType(value) {
                this.mFlashParamType = value;
            }
            //___________________________________________________________________________________
            get isNewUser() {
                return this.mIsNewUser;
            }
            set isNewUser(value) {
                this.mIsNewUser = value;
            }
            //___________________________________________________________________________________
            get isNewVendor() {
                return this.mIsNewVendor;
            }
            set isNewVendor(value) {
                this.mIsNewVendor = value;
            }
            //___________________________________________________________________________________
            get isInvite() {
                return this.mIsInvite;
            }
            //___________________________________________________________________________________
            set isInvite(value) {
                this.mIsInvite = value;
            }
            //___________________________________________________________________________________
            get isCatererInvite() {
                return this.mIsCatererInvite;
            }
            set isCatererInvite(value) {
                this.mIsCatererInvite = value;
            }
            //___________________________________________________________________________________
            get isPlannerInvite() {
                return this.mIsPlannerInvite;
            }
            set isPlannerInvite(value) {
                this.mIsPlannerInvite = value;
            }
            //___________________________________________________________________________________
            get isServiceProviderInvite() {
                return (this.mServiceProviderInviteID > -1);
            }
            set serviceProviderInviteID(value) {
                this.mServiceProviderInviteID = value;
            }
            get serviceProviderInviteID() {
                return (this.mServiceProviderInviteID);
            }
            //___________________________________________________________________________________
            get isVendorInvite() {
                return this.isPlannerInvite || this.isCatererInvite || this.isServiceProviderInvite;
            }
            //___________________________________________________________________________________
            get inviteData() {
                return this.mInviteData;
            }
            set inviteData(value) {
                this.mInviteData = value;
            }
            //___________________________________________________________________________________
            get inviteVO() {
                return this.mInviteVO;
            }
            set inviteVO(value) {
                this.mInviteVO = value;
            }
            //___________________________________________________________________________________
            get flashParamResetPassword() {
                return this.mFlashParamResetPassword;
            }
            set flashParamResetPassword(value) {
                this.mFlashParamResetPassword = value;
            }
            //___________________________________________________________________________________
            get isResetPassword() {
                return this.mIsResetPassword;
            }
            set isResetPassword(value) {
                this.mIsResetPassword = value;
            }
            //___________________________________________________________________________________
            get isOfflineRegistration() {
                return this.mIsOfflineRegistration;
            }
            set isOfflineRegistration(value) {
                this.mIsOfflineRegistration = value;
            }
            //___________________________________________________________________________________
            get offlineRegistrationVO() {
                return this.mOfflineRegistrationVO;
            }
            set offlineRegistrationVO(value) {
                this.mOfflineRegistrationVO = value;
            }
            //__________________________________________________________________
            set acceptInviteType(value) {
                this.mAcceptInviteType = value;
            }
            get acceptInviteType() {
                return this.mAcceptInviteType;
            }
            //__________________________________________________________________
            set acceptInviteAction(value) {
                this.mAcceptInviteAction = value;
            }
            get acceptInviteAction() {
                return this.mAcceptInviteAction;
            }
            //___________________________________________________________________________________________________________
            set isEntourage(value) {
                this.mIsEntourage = value;
            }
            get isEntourage() {
                return this.mIsEntourage;
            }
            //___________________________________________________________________________________________________________
            set referral(value) {
                this.mReferral = value;
            }
            get referral() {
                return this.mReferral;
            }
        }
        //------------------------------
        // Statics
        //------------------------------
        DaGlobal.ACCEPT_INVITE_VENDOR = "AcceptInvite_Vendor";
        DaGlobal.ACCEPT_INVITE_USER = "AcceptInvite_User";
        DaGlobal.ACCEPT_INVITE_NONE = "";
        DaGlobal.ACCEPT_INVITE_HAVE_USER = "AcceptInvite_HaveAccount";
        DaGlobal.ACCEPT_INVITE_NEW_USER = "AcceptInvite_NewAccount";
        DaGlobal.ACCEPT_INVITE_IGNORE = "AcceptInvite_Ignore";
        DaGlobal.IS_ENTOURAGE_YES = "IsEntourage_Yes";
        DaGlobal.IS_ENTOURAGE_NO = "IsEntourage_No";
        DaGlobal.BASIC_MAP_X = 630 / 2;
        DaGlobal.BASIC_MAP_Y = 525 / 2;
        DaGlobal.FLASH_HTML5_DELTA_X = 620 / 2;
        DaGlobal.FLASH_HTML5_DELTA_Y = 515 / 2;
        data.DaGlobal = DaGlobal;
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var data;
    (function (data) {
        class DaInvite {
            constructor() {
                this.mInviteUID = "";
                this.mUserId = -1;
                this.mUserEmail = "";
                this.mUserFullName = "";
                this.mOccasionId = -1;
                this.mOccasionName = "";
                this.mVenueId = 0;
                this.mVenueName = "";
                this.mInviteLastName = "";
                this.mInviteFirstName = "";
                this.mInviteEmail = "";
                this.mInviteStatus = -1;
                this.mInviteUserType = 0;
                this.mInviteAccessType = 0;
            }
            /****************************
             * Methods
             ****************************/
            //________________________________________________________________________________________
            clearData() {
                this.mInviteUID = "";
                this.mUserId = -1;
                this.mUserEmail = "";
                this.mUserFullName = "";
                this.mOccasionId = -1;
                this.mOccasionName = "";
                this.mVenueId = -1;
                this.mVenueName = "";
                this.mInviteEmail = "";
                this.mInviteFirstName = "";
                this.mInviteLastName = "";
                this.mInviteStatus = -1;
                this.mInviteUserType = -1;
                this.mInviteAccessType = -1;
            }
            //________________________________________________________________________________________
            fillFromVO(iInviteVO) {
                this.mInviteUID = iInviteVO.IUID;
                this.mInviteEmail = iInviteVO.InviteEmail;
                this.mInviteFirstName = iInviteVO.InviteFirstName;
                this.mInviteLastName = iInviteVO.InviteLastName;
                this.mOccasionId = iInviteVO.OccasionId;
                this.mOccasionName = iInviteVO.OccasionName;
                this.mVenueId = iInviteVO.VenueId;
                this.mVenueName = iInviteVO.VenueName;
                this.mUserEmail = iInviteVO.UserEmail;
                this.mUserFullName = iInviteVO.UserFullName;
                this.mUserId = iInviteVO.UserId;
                this.mInviteStatus = iInviteVO.InviteStatus;
                this.mInviteUserType = iInviteVO.InviteUserType;
                this.mInviteAccessType = iInviteVO.InviteAccessType;
            }
            //________________________________________________________________________________________
            /*public buildVO():InviteVO
            {
                let aInviteVO:InviteVO = new InviteVO();
                
                aInviteVO.InviteEmail = this.mInviteEmail;
                aInviteVO.InviteFirstName = this.mInviteFirstName;
                aInviteVO.InviteLastName = this.mInviteLastName;
                aInviteVO.OccasionId = this.mOccasionId;
                aInviteVO.OccasionName = this.mOccasionName;
                aInviteVO.VenueId = this.mVenueId;
                aInviteVO.VenueName = this.mVenueName;
                aInviteVO.UserEmail = this.mUserEmail;
                aInviteVO.UserFullName = this.mUserFullName;
                aInviteVO.UserId = this.mUserId;
                aInviteVO.InviteUserType = this.mInviteUserType;
                aInviteVO.InviteAccessType = this.mInviteAccessType;
                
                return aInviteVO;
            }*/
            /****************************
             * Getters and Setters
             ****************************/
            //________________________________________________________________________________________
            get userId() {
                return this.mUserId;
            }
            set userId(value) {
                this.mUserId = value;
            }
            //________________________________________________________________________________________
            get userEmail() {
                return this.mUserEmail;
            }
            set userEmail(value) {
                this.mUserEmail = value;
            }
            //________________________________________________________________________________________
            get userFullName() {
                return this.mUserFullName;
            }
            set userFullName(value) {
                this.mUserFullName = value;
            }
            //________________________________________________________________________________________
            get occasionId() {
                return this.mOccasionId;
            }
            set occasionId(value) {
                this.mOccasionId = value;
            }
            //________________________________________________________________________________________
            get occasionName() {
                return this.mOccasionName;
            }
            set occasionName(value) {
                this.mOccasionName = value;
            }
            //________________________________________________________________________________________
            get venueId() {
                return this.mVenueId;
            }
            set venueId(value) {
                this.mVenueId = value;
            }
            //________________________________________________________________________________________
            get venueName() {
                return this.mVenueName;
            }
            set venueName(value) {
                this.mVenueName = value;
            }
            //________________________________________________________________________________________
            get inviteLastName() {
                return this.mInviteLastName;
            }
            set inviteLastName(value) {
                this.mInviteLastName = value;
            }
            //________________________________________________________________________________________
            get inviteFirstName() {
                return this.mInviteFirstName;
            }
            set inviteFirstName(value) {
                this.mInviteFirstName = value;
            }
            //________________________________________________________________________________________
            get inviteEmail() {
                return this.mInviteEmail;
            }
            set inviteEmail(value) {
                this.mInviteEmail = value;
            }
            //________________________________________________________________________________________
            get inviteStatus() {
                return this.mInviteStatus;
            }
            set inviteStatus(value) {
                this.mInviteStatus = value;
            }
            //________________________________________________________________________________________
            get inviteUID() {
                return this.mInviteUID;
            }
            set inviteUID(value) {
                this.mInviteUID = value;
            }
            //________________________________________________________________________________________
            get inviteUserType() {
                return this.mInviteUserType;
            }
            set inviteUserType(value) {
                this.mInviteUserType = value;
            }
            //________________________________________________________________________________________
            get inviteAccessType() {
                return this.mInviteAccessType;
            }
            set inviteAccessType(value) {
                this.mInviteAccessType = value;
            }
        }
        data.DaInvite = DaInvite;
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var data;
    (function (data) {
        class DaOccasionTypesConst {
        }
        DaOccasionTypesConst.OCCASION_TYPE_WEDDING = 1;
        DaOccasionTypesConst.OCCASION_TYPE_CORPORATE = 2;
        DaOccasionTypesConst.OCCASION_TYPE_NONFORPROFIT = 3;
        DaOccasionTypesConst.OCCASION_TYPE_BARBAT_MITZVA = 4;
        DaOccasionTypesConst.OCCASION_TYPE_DINNER_PARTY = 5;
        DaOccasionTypesConst.OCCASION_TYPE_OTHER = 6;
        ///public static OCCASION_TYPE_FASHION_SHOW:number = 7;
        DaOccasionTypesConst.OCCASION_TYPE_EXVO = 7;
        data.DaOccasionTypesConst = DaOccasionTypesConst;
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));
///<reference path="DaGlobal.ts"/>
var modules;
(function (modules) {
    var data;
    (function (data) {
        // import VendorTypeVO = srvgtw.valueobjects.VendorTypeVO;
        class DaSpType {
            constructor() {
            }
            /****************************
             * Methods
             ****************************/
            //_______________________________________________________________________________________________________
            fillFromVO(iVO) {
                this.mId = iVO.Id;
                this.mNewId = iVO.NewId;
                this.mType = iVO.VendorType;
                this.mIconName = iVO.IconName;
            }
            //_______________________________________________________________________________________________________
            get id() {
                return this.mId;
            }
            //_______________________________________________________________________________________________________
            get newId() {
                return this.mNewId;
            }
            //_______________________________________________________________________________________________________
            get type() {
                return this.mType;
            }
            //_______________________________________________________________________________________________________
            get iconName() {
                return this.mIconName;
            }
        }
        data.DaSpType = DaSpType;
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));
var modules;
(function (modules) {
    var data;
    (function (data) {
        var UserSessionVO = modules.common.servicevo.UserSessionVO;
        var ServerErrorVO = modules.common.servicevo.ServerErrorVO;
        var GlobalContext = modules.common.globals.GlobalContext;
        class DaUserSession {
            constructor(a) {
                if (a != 100) {
                    //TODO: handle error
                    //MoAppManager.appManager.throwingErrorMessage('singelton violation',this,'DaUserSession');
                }
            }
            // get the singelton
            //_________________________________________________________________________________________________
            static get userSession() {
                if (!this.mUserSession)
                    this.mUserSession = new DaUserSession(100);
                return this.mUserSession;
            }
            /****************************
             * Methods
             ****************************/
            //_________________________________________________________________________________________________
            clearData() {
                if (this.mUserSessionVO)
                    this.mUserSessionVO.clearData();
            }
            /****************************
             * Getters and Setters
             ****************************/
            //_________________________________________________________________________________________________
            get userSessionVO() {
                if (!this.mUserSessionVO)
                    this.mUserSessionVO = new UserSessionVO();
                this.mUserSessionVO.UserId = this.userId;
                this.mUserSessionVO.SessionId = this.userSessionId;
                this.mUserSessionVO.DBError = new ServerErrorVO();
                return this.mUserSessionVO;
            }
            //_________________________________________________________________________________________________
            get userId() {
                return GlobalContext.userData.userId;
            }
            //_________________________________________________________________________________________________
            get userSessionId() {
                return GlobalContext.userData.userSessionId;
            }
        }
        data.DaUserSession = DaUserSession;
    })(data = modules.data || (modules.data = {}));
})(modules || (modules = {}));