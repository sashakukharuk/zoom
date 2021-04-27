import {ZoomStateType} from "./StateZoom";
import {ActionsZoomType} from "./ActionsZoom";

export const preloaderZoom = (state: ZoomStateType, action: ActionsZoomType) => {
    switch (action.type) {
        case "ZOOM_SET_CALL_ACCEPTED": {
            return {...state, callAccepted: action.callAccepted};
        }
        case "ZOOM_SET_CALL_ENDED": {
            return {...state, callEnded: action.callEnded};
        }
        case "ZOOM_SET_MY_ID": {
            return {...state, myId: action.id};
        }
        case "ZOOM_SET_USER_ID": {
            return {...state, userId: action.id};
        }
        case "ZOOM_SET_RECEIVING_CALL": {
            return {...state, receivingCall: action.receivingCall};
        }
        case "ZOOM_SET_STREAM": {
            return {...state, stream: action.stream};
        }
        case "ZOOM_SET_USER_NAME": {
            return {...state, userName: action.userName};
        }
        case "ZOOM_SET_OFFER": {
            return {...state, offer: action.offer};
        }
        case "ZOOM_SET_ANSWER": {
            return {...state, answer: action.answer};
        }
        case "ZOOM_SET_CALLER": {
            return {...state, callers: [...state.callers, action.caller]};
        }
        case "ZOOM_SET_CALLERS": {
            return {...state, callers: action.callers.map(item => item.id)};
        }
        case "ZOOM_SET_IS_VIDEO": {
            return {...state, isVideo: action.isVideo};
        }

        default: return state;
    }
}
