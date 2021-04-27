export const zoomState = {
    stream: undefined as unknown as MediaStream,
    callAccepted: false,
    callEnded: false,
    receivingCall: false,
    myId: '',
    userId: '',
    myName: '',
    userName: '',
    isVideo: false,
    offer: undefined as unknown as RTCSessionDescription,
    callers: [] as string[],
    answer: undefined as unknown as RTCSessionDescription
};

export type ZoomStateType = typeof zoomState;
