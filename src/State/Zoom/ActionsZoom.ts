import {InferActionsTypes} from "../../Types/InferActionsType";

export const ZOOM_SET_STREAM = 'ZOOM_SET_STREAM';
export const ZOOM_SET_MY_ID = 'ZOOM_SET_MY_ID';
export const ZOOM_SET_USER_ID = 'ZOOM_SET_USER_ID';
export const ZOOM_SET_USER_NAME = 'ZOOM_SET_USER_NAME';
export const ZOOM_SET_RECEIVING_CALL = 'ZOOM_SET_RECEIVING_CALL';
export const ZOOM_SET_CALL_ACCEPTED = 'ZOOM_SET_CALL_ACCEPTED';
export const ZOOM_SET_CALL_ENDED = 'ZOOM_SET_CALL_ENDED';
export const ZOOM_SET_OFFER = 'ZOOM_SET_OFFER';
export const ZOOM_SET_ANSWER = 'ZOOM_SET_ANSWER';
export const ZOOM_SET_CALLER = 'ZOOM_SET_CALLER';
export const ZOOM_SET_CALLERS = 'ZOOM_SET_CALLERS';
export const ZOOM_SET_IS_VIDEO = 'ZOOM_SET_IS_VIDEO';

export const actionZoom = {
    setStream: (stream: MediaStream) => ({type: ZOOM_SET_STREAM, stream} as const),
    setMyId: (id: string) => ({type: ZOOM_SET_MY_ID, id} as const),
    setUserId: (id: string) => ({type: ZOOM_SET_USER_ID, id} as const),
    setUSerName: (userName: string) => ({type: ZOOM_SET_USER_NAME, userName} as const),
    setReceivingCall: (receivingCall: boolean) => ({type: ZOOM_SET_RECEIVING_CALL, receivingCall} as const),
    setCallEnded: (callEnded: boolean) => ({type: ZOOM_SET_CALL_ENDED, callEnded} as const),
    setCallAccepted: (callAccepted: boolean) => ({type: ZOOM_SET_CALL_ACCEPTED, callAccepted} as const),
    setOffer: (offer: RTCSessionDescription) => ({type: ZOOM_SET_OFFER, offer} as const),
    setAnswer: (answer: RTCSessionDescription) => ({type: ZOOM_SET_ANSWER, answer} as const),
    setCaller: (caller: string) => ({type: ZOOM_SET_CALLER, caller} as const),
    setCallers: (callers: { id: string }[]) => ({type: ZOOM_SET_CALLERS, callers} as const),
    setIsVideo: (isVideo: boolean) => ({type: ZOOM_SET_IS_VIDEO, isVideo} as const),
};

export type ActionsZoomType = InferActionsTypes<typeof actionZoom>;
